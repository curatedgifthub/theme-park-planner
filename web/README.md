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
| `index.html` | Inky's template, with the title substituted in | Yes |
| `style.css` | Inky's template, verbatim | Yes — **2.05 is this file** |
| `main.js` | Inky's template, verbatim | Yes |

`story.js` is a build product; it's committed only because Pages deploys from the branch and
there's no build step yet. `ink.js` is a vendored dependency. The other three are the shell.

## Re-exporting: read this before you do

**Inky's *File → Export for web* overwrites all five files.** Four of those are safe to lose —
they're generated or vendored. The fifth is `style.css`, and after 2.05 it will hold the entire
typography pass. A blind re-export destroys it silently.

Only `story.js` actually changes when you edit the ink. So the safe move once 2.05 has landed is
to export somewhere scratch and copy `story.js` across, or use *File → Export to JS* and wrap the
JSON yourself. 1.10 removes the trap entirely by generating only `story.js`.

## The title

`main.ink` carries `# title: Walt Disney World Trip Planner` as a global tag. Inky reads that tag
and substitutes it into `<title>` and `<h1>`. Without it, Inky falls back to the *export folder's
name* — which at the root would have published the page as "theme-park-planner". The tag is there
so the title comes from the source, not from wherever the export happened to land.

`main.js` also honours `# author: Name` (it fills the empty `.byline`) and `# theme: dark`.
Neither is set: the byline waits on **Q1**, and the shell already ships a light/dark toggle that
remembers the reader's choice in `localStorage`.
