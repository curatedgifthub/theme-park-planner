#!/usr/bin/env node
/**
 * Pre-ship checks for the built story. Run: npm run verify [runs]
 *
 *   1. story.js is current with ink/            (build drift)
 *   2. random play-throughs raise no runtime errors and can reach an ending
 *   3. every knot declared in ink/ is actually reachable   (orphans)
 *   4. no rendered paragraph carries an expired date       (task 1.12 rot)
 *
 * Exit code is non-zero if any check fails, so this can gate CI later (2.09).
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const RUNS = parseInt(process.argv[2], 10) || 1500;
let failed = 0;
const ok = (label, good, detail = '') => {
  console.log(`${good ? '  ok  ' : ' FAIL '} ${label}${detail ? '  — ' + detail : ''}`);
  if (!good) failed++;
};

// 1 -------------------------------------------------------------- build drift
try {
  execFileSync(process.execPath, [path.join(root, 'tools', 'build.js'), '--check'], { stdio: 'pipe' });
  ok('story.js is up to date with ink/', true);
} catch {
  ok('story.js is up to date with ink/', false, 'run `npm run build`');
}

// Load the shipped runtime and story exactly as the browser does. Both files
// declare globals, so each gets its own Function scope rather than leaking into
// this module (and `var storyContent` would collide with any local of that name).
const inkjs = new Function(
  'exports', 'module',
  fs.readFileSync(path.join(root, 'ink.js'), 'utf8') + '\nreturn exports;'
)({}, { exports: {} });
const storyContent = new Function(
  fs.readFileSync(path.join(root, 'story.js'), 'utf8') + '\nreturn storyContent;'
)();

// 2, 3, 4 ------------------------------------------------- play-through sweep
const seenText = new Set();
let errors = 0, ends = 0;

for (let r = 0; r < RUNS; r++) {
  const s = new inkjs.Story(storyContent);
  let steps = 0;
  try {
    while (steps++ < 800) {
      while (s.canContinue) {
        const t = s.Continue().trim();
        if (t) seenText.add(t);
      }
      if (s.currentChoices.length === 0) { ends++; break; }
      s.ChooseChoiceIndex(Math.floor(Math.random() * s.currentChoices.length));
    }
  } catch (e) {
    if (errors === 0) console.log('    first error: ' + e.message);
    errors++;
  }
}

ok(`${RUNS} play-throughs, no runtime errors`, errors === 0, `${errors} error(s)`);
ok('an ending is reachable', ends > 0, `${ends}/${RUNS} runs reached -> END`);

// Reachability by static divert graph rather than by random walk: random play
// only proves a path was *sampled*, and rare deep branches produce false orphans.
// Walking the graph is exact and also catches diverts to knots that don't exist.
const RESERVED = new Set(['END', 'DONE', 'START']);
const edges = new Map();   // knot -> Set(targets)
let current = null;
for (const f of fs.readdirSync(path.join(root, 'ink')).filter((f) => f.endsWith('.ink'))) {
  for (const line of fs.readFileSync(path.join(root, 'ink', f), 'utf8').split('\n')) {
    const knot = line.match(/^\s*={2,}\s*([A-Za-z0-9_]+)/);
    if (knot) { current = knot[1]; if (!edges.has(current)) edges.set(current, new Set()); continue; }
    if (!current || line.trim().startsWith('//')) continue;
    // `-> knot`, and the tunnel form `-> -> knot`; the second arrow is optional
    // as a whole (a bare `->?` would wrongly demand a second hyphen).
    for (const m of line.matchAll(/->\s*(?:->\s*)?([A-Za-z0-9_]+)/g)) edges.get(current).add(m[1]);
  }
}
const declared = new Set(edges.keys());

// diverts pointing at something that was never declared
const dangling = [];
for (const [from, tos] of edges)
  for (const to of tos)
    if (!declared.has(to) && !RESERVED.has(to)) dangling.push(`${from} -> ${to}`);
ok('no divert points at a missing knot', dangling.length === 0, dangling.slice(0, 5).join(', '));

// BFS from start
const reached = new Set(['start']);
const queue = ['start'];
while (queue.length) {
  for (const to of edges.get(queue.pop()) || [])
    if (!reached.has(to) && declared.has(to)) { reached.add(to); queue.push(to); }
}
const orphans = [...declared].filter((k) => !reached.has(k));
ok(`all ${declared.size} knots reachable from start`, orphans.length === 0,
   orphans.length ? orphans.slice(0, 8).join(', ') : '');

// expired-date rot: a future-tense claim about a date already gone
const now = new Date();
const SEASON = { spring: 5, summer: 8, fall: 11, autumn: 11, winter: 12 };
const stale = [];
for (const t of seenText) {
  const m = t.match(/\b(spring|summer|fall|autumn|winter|early|late)\s+(20\d\d)\b/i);
  if (!m) continue;
  const yr = +m[2];
  const endMonth = SEASON[m[1].toLowerCase()] || 12;
  const passed = yr < now.getFullYear() ||
    (yr === now.getFullYear() && endMonth < now.getMonth() + 1);
  if (passed && /\b(will|expected|announced|reopening|opening|coming)\b/i.test(t)) {
    stale.push(t.slice(0, 100));
  }
}
ok('no reachable paragraph makes a promise about a past date', stale.length === 0,
   stale.slice(0, 3).join(' | '));

// 5 ------------------------------------------------------- footer freshness
// The footer's "last checked" date is hand-maintained, because a build-injected
// date would claim a re-verification that never happened — fixing a typo would
// silently reset the clock. So it is checked instead: 180 days is the same
// window task 2.09 will apply to per-knot VERIFIED tags.
const MAX_AGE_DAYS = 180;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const stamp = html.match(/data-verified="(\d{4}-\d{2}-\d{2})"/);
if (!stamp) {
  ok('footer carries a last-verified date', false, 'no data-verified attribute in index.html');
} else {
  const age = Math.floor((Date.now() - Date.parse(stamp[1])) / 86400000);
  ok(`footer verified within ${MAX_AGE_DAYS} days`, age <= MAX_AGE_DAYS,
     `${stamp[1]} is ${age} day(s) old`);
  const shown = html.match(/<time datetime="(\d{4}-\d{2}-\d{2})"/);
  ok('footer <time> matches data-verified', !!shown && shown[1] === stamp[1],
     shown ? `${shown[1]} vs ${stamp[1]}` : 'no <time datetime>');
}

// 6 ------------------------------------------------------- shareability
// The done-bar for this project is literally "you can text someone a link", so
// the preview card is the first thing a recipient ever sees. Without these the
// link renders as a bare URL.
const needTags = [
  ['meta name="description"',        /<meta name="description" content="[^"]{40,}"/],
  ['og:title',                       /property="og:title" content="[^"]+"/],
  ['og:description',                 /property="og:description" content="[^"]{40,}"/],
  ['og:image',                       /property="og:image" content="[^"]+"/],
  ['twitter:card',                   /name="twitter:card"/],
  ['favicon',                        /rel="icon"/],
];
const missing = needTags.filter(([, re]) => !re.test(html)).map(([n]) => n);
ok('link-preview tags present', missing.length === 0, missing.join(', '));

// og:image must be an ABSOLUTE url. The spec requires it; Facebook and LinkedIn
// reject relative paths and other scrapers are inconsistent. The origin isn't
// known until the repo exists, so this fails loudly rather than shipping a card
// that silently never renders.
const ogImg = html.match(/property="og:image" content="([^"]+)"/);
const absolute = ogImg && /^https?:\/\//.test(ogImg[1]);
ok('og:image is an absolute URL', !!absolute,
   ogImg ? `"${ogImg[1]}" — replace REPLACE_WITH_SITE_URL with the published origin once the repo exists`
         : 'no og:image');

// and the files those tags point at must actually exist
const assets = ['assets/share-card.png', 'assets/favicon.svg', 'assets/apple-touch-icon.png'];
const absent = assets.filter((a) => !fs.existsSync(path.join(root, a)));
ok('referenced share assets exist', absent.length === 0, absent.join(', '));

console.log(`\n${seenText.size} distinct paragraphs rendered, ${declared.size} knots in the graph.`);
console.log(failed ? `\n${failed} check(s) FAILED.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
