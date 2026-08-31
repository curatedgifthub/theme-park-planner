# web/ — the player shell

Everything the reader's browser loads: `index.html`, `style.css`, `main.js`.

Nothing is here yet. **1.08** fills it with Inky's *File → Export for web* output, dropped in
whole. **2.05** is the typography pass on the exported `style.css`, which is the entire
presentation layer now that the project is text-only.

The story JSON is *not* hand-edited and does not belong in source control as a source file —
it's a build product of `ink/`. Today Inky writes it alongside the export; once **1.10** lands,
`tools/` compiles it into `dist/`, which is gitignored.

**Unresolved, and it lands in 1.08:** 1.09 sets Pages to *Deploy from a branch → `main` / root*,
which needs `index.html` at the repo root, not in here. Two ways out, pick one when the export
actually exists:
1. Export to the repo root and keep `web/` for the hand-edited sources that get copied there, or
2. Go straight to **1.10** — Actions builds, Pages source becomes "GitHub Actions", and the
   deployed directory is `dist/`, so `web/` stays the real home.
