# tools/ — build and check scripts

Empty on purpose. Nothing is automated while the Inky export is doing the job by hand.

Queued for it:
- **1.10** — the inkjs build. `npm run build` compiles `ink/main.ink` → `dist/story.json`, and an
  Action deploys `dist/`. inkjs, not `inklecate`: it compiles as well as runs, it's pure npm, and
  it works identically on your Mac and on a CI runner. Inky itself is a GUI app and cannot run in
  Actions.
- **2.09** — the link checker. Fails CI on dead diverts and on any `# VERIFIED:` tag older than
  180 days. Needs the tags from **2.04** and the build above.
