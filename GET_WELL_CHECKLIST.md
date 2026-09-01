# Get-Well Plan — Status Checklist

Companion to [GET_WELL_PLAN.md](GET_WELL_PLAN.md). The plan says *what* and *why*; this file
says *where we are*. Update the status cell when you start and when you finish — nothing else.

**Status snapshot taken:** 2026-08-31, from the working tree.

| Status | Meaning |
|---|---|
| To do | Not begun. |
| Started | Some of it has landed, but it isn't being worked on right now. |
| Doing | Actively in flight this session. |
| Done | Finished and verified in the files. |

**Where we are:** Stage 1 — 10 of 14 done (1.01–1.08 and 1.12); 1.09 and 1.13 are started. Stage 2 — 0 of 12 done.
Plus [PAGINATION_PLAN.md](PAGINATION_PLAN.md), which sits outside both stages and is now finished:
every knot over 600 words is split, 94 knots → 218 pages, max page 596 words. The story compiles
and the exported site sits at the repo root. The repo is still local only — no remote, nothing
pushed or published, so there is no URL yet. 1.09 has done everything a machine here can do; the
push and the Pages switch belong to the `curatedgifthub` account, which this checkout cannot
authenticate as. It now waits on a repo name, which is the open half of Q1.

---

## Stage 1 — Make it real and make it true

| # | Task | Status | Evidence / notes |
|---|---|---|---|
| 1.01 | `git init` and commit everything as-is | **Done** | Repo root is `theme-park-planner/`, so the existing `ink/` folder is already the one 1.02 wants. Commit `77df200` "Import: 64k words of park guides, pre-refactor" — 13 files, 4,901 lines, branch `main`. `.gitignore` holds `dist/ node_modules/ .DS_Store assets/_source/`. No remote yet; nothing pushed. |
| 1.02 | Restructure into `ink/` `web/` `assets/` `tools/`, gitignore `dist/` | **Done** | `ink/` came free with 1.01. Added `web/` `assets/` `tools/`, each with a README naming what lands there and which task fills it — git won't track an empty directory. Moved `GET_WELL_PLAN.md`, `GET_WELL_CHECKLIST.md` and `PAGINATION_PLAN.md` out of `ink/` to the repo root, so `ink/` is source only; `git mv`, so history follows. `.gitignore` already had `dist/`. INCLUDEs are bare filenames and all nine `.ink` files stayed put, so no rewiring. Surfaced for 1.08: 1.09's root deploy wants `index.html` at the root, not in `web/`. |
| 1.03 | Delete the two Universal files, both INCLUDEs, and `universal_park_picker` | **Done** | Both files were 9-line "coming soon" placeholders — nothing salvaged. Removed the files, the two INCLUDEs, the knot, and its only inbound divert (the "Universal Orlando (Coming soon)" choice in `choose_destination`), which the task list didn't name but which would have broken the compile. `main.ink` 194 → 176 lines; compiles clean via Inky's `inklecate`. Universal prose left standing on purpose — it belongs to 1.04b, 1.05 and 1.06. |
| 1.04a | Delete `resort_comparison_summer` | **Done** | Removed; `resort_comparison` now diverts straight to `resort_comparison_size`. |
| 1.04b | Delete the remaining 7 `resort_comparison_*` knots, `choose_destination`, and `VAR resort` | **Done** | All 7 knots, `choose_destination` and `VAR resort` gone, plus all four inbound diverts. `start`'s two choices became one `-> disney_park_picker`; the tails of `getting_to_orlando.ink` and `where_to_stay.ink` got the same choice in place of their destination/comparison pair — those two aren't INCLUDEd yet, so they were 1.06 traps rather than live breakage. `main.ink` 176 -> 42 lines; compiles clean, and a forward-compile with both orphan files INCLUDEd also passes. Left for 1.05: `start`'s prose is still the Universal comparison opener, and `disney_park_picker`'s "Back to resort picker" label. |
| 1.05 | Rewrite `start` as a Disney hub (park / getting there / where to stay) | **Done** | Whole knot replaced: new title `Walt Disney World Trip Planner`, three paragraphs of Disney-only prose, and three choices — `disney_park_picker`, `getting_to_orlando`, `where_to_stay`. Choices sit in the order the task named, with the prose arguing for reading the two logistics sections first anyway. `disney_park_picker`'s last choice is now "Back to start", matching the label both guide files already used. **Absorbed from 1.06:** the two `INCLUDE` lines, without which the two new diverts don't compile. `main.ink` 42 → 49 lines; compiles clean, no warnings, and a play-through confirms all three branches round-trip back to the hub. |
| 1.06 | INCLUDE and link the two orphaned files; strip Universal from `where_to_stay.ink` | **Done** | INCLUDE and link landed with 1.05. The strip landed here: both `stay_universal_*` knots, the "On-Property at Universal" choice, the "Compare to Universal On-Property" divert (in `stay_disney_on_property`, not `stay_disney_tiers` as the task said), the intro clause, and the `stay_disney_tradeoffs` mention. Plus three off-property clauses that presume a Universal trip — the "or Universal land" definition, "Universal is similar" on parking, and I-Drive's split-trip recommendation. Kept two geographic anchors (I-Drive equidistant, Kissimmee closer to Disney), same call 1.03 made for `getting_to_orlando.ink`. 173 → 133 lines, 9 knots → 7; compiles clean, play-through reaches all seven and returns to the hub. |
| 1.07 | `-> END` terminals and a way home on every guide's last page | **Done** | 18 last pages — the 16 park day-plan terminals plus `orlando_driving` and `stay_dvc_renting`. The 16 already had `Start over`; what was missing was any ending at all (zero `-> END`, so the story looped forever). One shared `the_end` knot in `main.ink` — sign-off prose, then `-> END` — reached from all 18 via `+ [Done — close the guide]`. The two logistics terminals also gained `Back to start`, which they lacked. All 18 now reach both `start` and `the_end` in one tap. `main.ink` 49 → 67 lines, 93 → 94 knots; compiles clean, three scripted play-throughs end cleanly. Mid-chain knots left alone on purpose — not last pages. |
| 1.08 | Inky → Export for web; commit the exported folder | **Done** | Five files at the repo root, not in `web/` — 1.09 deploys from `main` / root, and duplicating a shell nobody has hand-edited yet would only invite divergence; `web/README.md` records the call and what it costs. `story.js` (403 KB, `var storyContent = …`) is generated, `ink.js` is inkjs 2.2.3 vendored, `index.html` `style.css` `main.js` are Inky's template. Produced headlessly with the same binary and flags Inky's menu item uses (`inkjs-compatible/inklecate_mac -c -o`) and the same substitutions, so it is byte-for-byte the GUI's output. **Two source edits it forced:** `# title:` global tag added to `main.ink` — without it Inky names the page after the export folder, i.e. "theme-park-planner" — and `start`'s opening prose line deleted, which had become a literal second copy of the `<h1>` the shell now supplies. Verified: clean compile, no warnings; 20,000 scripted paths through the exported `story.js` under the exported `ink.js` with zero runtime errors and 82 reaching `-> END`; and the page rendered, played and stayed within its measure at 375 px. |
| 1.09 | Pages → Deploy from a branch → `main` / root — **live URL** | **Started** | **Everything that can be done from this machine is done; the last two steps need the account owner.** The destination is settled: `github.com/curatedgifthub`, which is a *user* account, not an org — so no collaborator grant lets another account create a repo under it. The local checkout is authenticated as `8139CAUSAL` (a measurement account, the wrong home), so the `gh repo create` and the Pages switch are Aaron's to run; the recipe is in the plan. **Landed here:** `_config.yml`, excluding the two get-well documents, `PAGINATION_PLAN.md` and the three folder READMEs from the built site — they stay in the repo and in history, just off the live URL. Public repo, per the same decision. **Verified for the subpath:** a project page serves at `curatedgifthub.github.io/<repo>/`, and every asset reference in `index.html` is relative, with no `fetch` and no `url()` outside the Google Fonts import — so nothing needs a base path. Also checked: no secrets, no local paths and no personal identifiers in any hand-written tracked file. **Precedent:** `curatedgifthub/emoji-charades` already runs this exact configuration — legacy Jekyll build, source `main` / `/`. |
| 1.10 | Replace the manual export with inkjs + Actions | To do *(deferred)* | Optional by design — do it when the manual re-export starts to sting, or when 2.09 needs CI. |
| 1.11 | Read the whole thing on your phone, start to finish; take pacing notes | To do | Blocked by 1.09. Pacing changed a lot underneath this task: pagination took the mean page to 271 words, so the read is now ~218 taps rather than a handful of walls. Judge tap count and whether the `Skip to picking your group →` hatches land in the right places. |
| 1.12 | Purge every expired date | **Done** | Every future-tense claim in the guide named a date that had already passed — today is 2026-08-31. Each was verified against current sources rather than assumed. **Corrected:** Big Thunder Mountain Railroad reopened 2026-05-03 (7 mentions); Buzz Lightyear's Space Ranger Spin reopened 2026-04-08 with new vehicles, handheld blasters and onboard scoring (6); Rock 'n' Roller Coaster Starring The Muppets opened 2026-05-26, 48", three inversions (6); Disney Jr. Mickey Mouse Clubhouse Live! opened 2026-05-26 in Animation Courtyard (1). The four `Current Closures as of Early 2026` headers, eight months stale, became an undated `Closures and Refurbishments` — 2.04's `VERIFIED` tags are the real fix for currency, not a hand-typed stamp that rots again. **Added:** a closure the guide didn't know about — the WDW Railroad shuttle is down entirely 2026-09-28 to 2026-10-29. **Checked and left standing:** Tom Sawyer Island and Rivers of America (permanently closed July 2025), the Monstropolis construction zone, the railroad's Frontierland omission, and the historical dates (Magical Express ended Jan 2022, Country Bear refresh 2024, Aerosmith version closed Mar 2026). **Scope note:** this swept every *dated* and every *closure* claim in all six files. It was not a line-by-line re-verification of all ~200 attraction facts — that's what 2.04 is for. |
| 1.13 | Footer on every page: last-updated, trademark disclaimer, sources | **Started** | **Disclaimer done, and it's a header rather than a footer.** An italic preamble is now the first paragraph a reader sees, under the `<h1>`: what this is (a choose-your-own-adventure planning tool), that it is not affiliated with, endorsed by or connected to the Walt Disney Company, and that hours and closures change so confirm with Disney before booking. **Where it lives matters:** inline `<em>` inside `main.ink`, rendered through `main.js`'s `innerHTML` (main.js:156). Nothing was added to `index.html` or `style.css`, so the re-export trap `web/README.md` warns about can't destroy it. Up front beat a footer because the disclaimer has to be seen, and 218 pages means a per-page footer is really a shell-template job. **Still to do:** last-updated stamp and sources. Both want the shell or 2.04's tags, not 218 hand-edits. |

**Done when:** you can text someone a link, they open it on a phone, pick a park and a group
type, read a full day-plan, and every fact in it is true today.

---

## Pagination — outside the stages, done

Tracked in [PAGINATION_PLAN.md](PAGINATION_PLAN.md), which predates the get-well plan and was
partly executed before it. Finished 2026-08-31.

| # | Task | Status | Evidence / notes |
|---|---|---|---|
| P.1 | Split the four `*_intro` knots | **Done** | The plan ranked these 17–20 and marked three "OK as-is" on a ~30-*line* estimate — but a line here is a paragraph, so in words they were the worst pages in the project (ak 1290, hs 1282, ep 1198, mk 1029) and the ones every reader passes through. Now 8/9/7/5 pages, none over 300 words. |
| P.2 | Move the group-type fork to `{park}_pick_group` | **Done** | Forced by P.1: ~19 day-plan pages per park link back with "Pick a different group type", and after the split that divert would have dropped the reader at the top of an eight-page intro. Every intro page also gained `Skip to picking your group →`. |
| P.3 | Split every remaining knot over 600 words | **Done** | 44 knots were over 600, 13 over 900. Split at the headers the prose already carried — most needed no new text at all. Two pages needed a header written ("The Storm Window", "Driving, Boats and Rideshare"). Per-file max: mk 1611→596, hs 1229→401, ep 1170→432, ak 838→385. |
| P.4 | Verify | **Done** | Compiles clean; every knot reachable from `start`; no dangling diverts; 20,000 scripted paths with zero runtime errors. Four `Continue to …` labels that named sections the split had moved were corrected. |

**Left alone on purpose:** 19 pages sit between 450 and 596 words. All are knots the earlier
pagination pass produced, and they are inside the range that pass already established. Splitting
them would be a second opinion on someone else's finished work, not a fix.

---

## Stage 2 — Make ink earn its keep

Do 2.01 **before** 2.02 — deduplicate first, then add conditionals.

| # | Task | Status | Evidence / notes |
|---|---|---|---|
| 2.01 | Tunnel the repeated blocks (closures, hours, Rider Swap, TTC parking, Skyliner, buses) | To do | Zero tunnels (`->->`) in the project. |
| 2.02 | Party `LIST` + 30-second intake, replacing the four-way `group_type` fork | To do | Zero LISTs. `VAR group_type` at `main.ink:2`. |
| 2.03 | Actually read the variables; give `current_location` a real job | To do | 4 variables declared, 0 read. |
| 2.04 | One tag per fact-bearing knot: `# VERIFIED: YYYY-MM-DD` | To do | Zero tags in the project. |
| 2.05 | Typography pass on the CSS — the entire presentation layer | To do | Unblocked — `style.css` is at the repo root now. Read `web/README.md` first: a later *Export for web* overwrites this file, and it is the only one of the five whose loss would hurt. First impressions from the 375 px check: the vertical rhythm is very loose and the measure runs long on desktop. |
| 2.06 | Save & resume via `story.state.toJson()` into localStorage | To do | |
| 2.07 | Encode the party profile in the query string — shareable plan URLs | To do | Depends on 2.02. |
| 2.08 | Print stylesheet + one-page day sheet | To do | |
| 2.09 | CI link checker: dead diverts, `VERIFIED` older than 180 days | To do | Needs 2.04 and the Actions build (1.10). |
| 2.10 | Make season a variable (`heat`, `crowds`, `storms`, `late`) | To do | 57 lines mention "summer" across six files — `disney_epcot.ink` 18, `disney_mk.ink` 18, `disney_ak.ink` 10, `disney_hs.ink` 6, `where_to_stay.ink` 3, `getting_to_orlando.ink` 2. Design is written up in the plan; migration splits into strategy that flips (~15 sites), flavour to neutralise (~18), and wholly seasonal blocks. |
| 2.11 | Write the atmospheric layer in prose | To do | ~20 land and area entry points, 60–100 lines. Depends on 2.10 for the season conditionals. |
| 2.12 | Service worker for offline | To do | Cheap now — story JSON, one CSS file, one JS file, no assets. |

---

## Open questions — still unanswered

| # | Question | Status | Why it's blocking |
|---|---|---|---|
| Q1 | What is this called, and where does it live? | **Half answered** | *Where it lives* is settled: `github.com/curatedgifthub`, public, alongside `emoji-charades` — this is a Curated Gift Hub property, not a personal one. *What it's called* is still open, and 1.09 needs a repo name to create the repo, which fixes the live URL. A repo can be renamed later, but the URL moves with it, so anything already shared breaks. The wordmark still waits on the name. |
| Q2 | Is this monetized? | Open | Sets the disclaimer wording (1.13) and whether affiliate links belong in the heat, storm, and big-group knots. |
| Q3 | Ship date? | Open | Stage 1 alone gets a shareable URL; Stage 2 is where it gets good. |

---

## Quarterly refresh — recurring, not part of the stages

Schedule after Disney announcement waves, not on a fixed quarter boundary. Target: under 30 minutes.

| Step | Status | Last run |
|---|---|---|
| `grep -rn "202[5-9]" ink/` — every hit is historical or a liability | Not yet run as a ritual | — |
| Check `VERIFIED` tags (CI takes this over once 2.09 ships) | Blocked on 2.04 | — |
| Reconcile Disney's closures page against the four `*_closures` knots | To do | — |
| Bump the footer date and commit | Blocked on 1.13 | — |
