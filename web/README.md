# web/ — the player shell

**Empty, and the shell is at the repo root instead.** That's the answer to the question 1.02
parked here, and 1.08 settled it.

## Why the root

1.09 sets Pages to *Deploy from a branch → `main` / root*, which needs `index.html` at the repo
root. The README used to offer two ways out — export to the root and keep hand-edited sources
in here, or skip ahead to 1.10 and deploy `dist/`. Neither survived contact:

- **Duplicating into `web/`** would mean two copies of `index.html`, `style.css` and `main.js`
  with nothing to reconcile them, at a moment when *zero* of the three has been hand-edited yet.
  All cost, no benefit, and a guaranteed divergence the first time someone edits the wrong one.
- **Jumping to 1.10** is a real option, but it's deferred on purpose, and 1.09 doesn't need it.

So the five exported files live at the repo root, `web/` keeps this README, and the folder
becomes the shell's real home when 1.10 moves the build to `dist/`.

## What the export writes

Five files, all at the root:

| File | Where it comes from | Hand-editable? |
|---|---|---|
| `story.js` | **generated** — `var storyContent = <compiled main.ink>;` | Never. Rebuild it. |
| `ink.js` | inkjs 2.2.3 runtime, vendored verbatim from Inky | No — replace wholesale on upgrade |
| `index.html` | Inky's template **+ the site footer (1.13)** | Yes — hand-edited |
| `style.css` | **Rewritten by the typography pass (2.05)** | Yes — hand-edited |
| `main.js` | Inky's template, verbatim | Yes — untouched so far |

`story.js` is a build product; it's committed only because Pages deploys from the branch, so
the served files must be in git. `ink.js` is a vendored dependency, pinned in lockstep with the
`inkjs` compiler in `package.json`. **Two of the remaining three now hold work that exists
nowhere else** — the footer and the typography — which is exactly why `npm run build` rewrites
`story.js` alone.

## Re-exporting: don't. Use the build script.

**This trap is closed as of 1.10's local half.** It used to read: *Inky's File → Export
for web overwrites all five files, and after 2.05 lands, a blind re-export destroys the
typography pass.* Both of those things are now true and load-bearing — `index.html`
carries the footer and `style.css` carries the whole typography pass — so the export is
no longer the way to rebuild.

```
npm run build      # recompiles story.js from ink/main.ink, and touches nothing else
npm run verify     # eight pre-ship checks; see tools/README.md
```

`story.js` is the only file derived from the ink, so it is the only file the build
writes. Do not use *File → Export for web* again unless you are deliberately taking a
new copy of Inky's template, in which case diff it against `index.html` and `style.css`
first and expect to re-apply both by hand.

The old CLI recipe (`inkjs-compatible/inklecate_mac -c -o`) still works and still
produces byte-equivalent output, but it has no advantage over `npm run build` and it
depends on a GUI app's bundled binary being installed.

## The title

`main.ink` carries `# title: Walt Disney World Trip Planner` as a global tag. Inky reads that tag
and substitutes it into `<title>` and `<h1>`. Without it, Inky falls back to the *export folder's
name* — which at the root would have published the page as "theme-park-planner". The tag is there
so the title comes from the source, not from wherever the export happened to land.

`main.js` also honours `# author: Name` (it fills the empty `.byline`) and `# theme: dark`.
Neither is set: the byline waits on **Q1**, and the shell already ships a light/dark toggle that
remembers the reader's choice in `localStorage`.
