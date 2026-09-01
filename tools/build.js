#!/usr/bin/env node
/**
 * Regenerates story.js from ink/main.ink — and nothing else.
 *
 * This exists to replace Inky's "File -> Export for web", which overwrites all
 * five web files: story.js, ink.js, index.html, style.css and main.js. Four of
 * those are generated or vendored, but index.html and style.css are hand-edited
 * (the footer and the typography pass), and an export destroys them silently.
 *
 * Only story.js is derived from the ink, so only story.js is rewritten here.
 *
 * The compiler is inkjs, pinned in package.json to 2.2.3 — the same version as
 * the vendored ink.js runtime. Keep those two in lockstep: a compiler newer than
 * the runtime can emit a JSON dialect the runtime cannot read.
 *
 * Usage:  npm run build          rebuild story.js
 *         npm run build -- --check   verify story.js is up to date, write nothing
 *                                     (exit 1 if stale — for CI, task 2.09)
 */
const fs = require('fs');
const path = require('path');
const { Compiler } = require('inkjs/compiler/Compiler');

const root = path.resolve(__dirname, '..');
const entry = path.join(root, 'ink', 'main.ink');
const target = path.join(root, 'story.js');
const checkOnly = process.argv.includes('--check');

// inkjs resolves INCLUDE via this hook; all our INCLUDEs are bare filenames in ink/.
const fileHandler = {
  ResolveInkFilename: (name) => path.join(root, 'ink', name),
  LoadInkFileContents: (p) => fs.readFileSync(p, 'utf8'),
};

const errors = [];
const compiler = new Compiler(fs.readFileSync(entry, 'utf8'), {
  sourceFilename: entry,
  fileHandler,
  errorHandler: (msg, type) => errors.push({ msg: msg.trim(), type }),
  // Inky's web export passes inklecate `-c`, i.e. count visits to every knot,
  // not just the ones something reads. inkjs defaults this to false, which
  // silently drops all 748 `#f` flags from the JSON. Nothing in the guide reads
  // a visit count today, so the difference is currently inert — but a Stage 2
  // sequence or once-only choice would break in a way that is very hard to
  // trace back to the build. Match the reference compiler instead.
  countAllVisits: true,
});

let story;
try {
  story = compiler.Compile();
} catch (e) {
  errors.push({ msg: e.message, type: 'FATAL' });
}

const fatal = errors.filter((e) => e.type !== 'WARNING' && e.type !== 1);
if (fatal.length || !story) {
  console.error(`Compile failed with ${fatal.length} error(s):`);
  fatal.forEach((e) => console.error('  ' + e.msg));
  process.exit(1);
}
errors.filter((e) => !fatal.includes(e)).forEach((e) => console.warn('warning: ' + e.msg));

// Byte-identical to what Inky's web export writes: `var storyContent = <json>;`
const next = 'var storyContent = ' + story.ToJson() + ';';
const prev = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;

if (checkOnly) {
  if (prev === next) {
    console.log('story.js is up to date.');
    process.exit(0);
  }
  console.error('story.js is STALE — run `npm run build` and commit the result.');
  process.exit(1);
}

if (prev === next) {
  console.log(`story.js already current (${Buffer.byteLength(next)} bytes) — not rewritten.`);
} else {
  fs.writeFileSync(target, next, 'utf8');
  console.log(`story.js written: ${Buffer.byteLength(next)} bytes.`);
}
