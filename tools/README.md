# tools/ — build and check scripts

Two scripts. Both are plain node, no CI required, and both run on a Mac and on a
CI runner identically.

| Command | What it does |
|---|---|
| `npm run build` | Compiles `ink/main.ink` → `story.js`. **Nothing else.** |
| `npm run check` | Exits 1 if `story.js` is stale. Writes nothing. |
| `npm run verify [runs]` | The pre-ship gate. Defaults to 1500 play-throughs. |

## build.js — and why it only writes one file

Inky's *File → Export for web* overwrites all five web files: `story.js`, `ink.js`,
`index.html`, `style.css` and `main.js`. Two of those are hand-written — the footer
lives in `index.html` and the whole typography pass lives in `style.css` — so a
re-export silently destroys real work. That trap is what this script removes.

Only `story.js` is derived from the ink, so only `story.js` is rewritten.

**The compiler is pinned.** `package.json` holds `inkjs` at exactly `2.2.3`, matching
the vendored `ink.js` runtime. Not a caret range: a compiler ahead of its runtime can
emit a JSON dialect the runtime cannot read. If you upgrade one, upgrade both.

**`countAllVisits` must stay on.** Inky passes `inklecate -c`; inkjs defaults the same
option to `false`. Without it the build silently drops every `#f` flag from the JSON —
748 of them here. Nothing in the guide reads a visit count *today* (zero once-only
choices, zero alternatives), so it was inert, but a Stage 2 sequence or a `*` choice
would break in a way almost impossible to trace back to the build step.

With the option set, the output is deep-equal to what `inklecate` produces. The only
difference is the order of keys in the JSON, which is not significant.

## verify.js — the pre-ship gate

Eight checks. Exits non-zero on any failure, so **2.09** can call it from CI as-is.

1. `story.js` is current with `ink/` — catches "edited the ink, forgot to build".
2. N random play-throughs raise no runtime errors.
3. An ending is reachable.
4. No divert points at a knot that does not exist.
5. Every knot is reachable from `start`.
6. No rendered paragraph promises something for a date that has already passed.
7. The footer's last-checked date is under 180 days old.
8. The footer's `<time>` and `data-verified` agree.

Check 5 walks the divert graph statically rather than sampling random play. A random
walk only proves a path *was sampled*; a rare deep branch would read as a false orphan.

Check 6 is the automated half of **1.12**. It parses "spring 2026", "early 2027" and
similar out of the rendered text and fails if the season has passed *and* the sentence
is still making a promise ("will", "expected", "reopening"). It cannot know whether a
fact is true — only that a claim has expired. Confirming truth is still a human job,
and **2.04**'s per-knot `# VERIFIED:` tags are the structure for it.

## Still queued

- **2.04** — `# VERIFIED: YYYY-MM-DD` per fact-bearing knot, so check 7 can move from
  one site-wide date to real per-page coverage.
- **2.09** — run `npm run verify` in GitHub Actions on every push.
- **1.10, the remaining half** — an Action that builds and deploys, so `story.js` need
  not be committed at all. The script above is the local half; only the workflow is
  left, and it needs the repo to exist first.
