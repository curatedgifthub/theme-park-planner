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

**Where we are:** Stage 1 — 8 of 14 done (1.01 through 1.07). Stage 2 — 0 of 12 done.
The repo is local only — no remote. Nothing is compiled, pushed, or published.

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
| 1.08 | Inky → Export for web; commit the exported folder | To do | Nothing compiled. No exported folder in the tree. |
| 1.09 | Pages → Deploy from a branch → `main` / root — **live URL** | To do | Blocked by 1.08, and by a GitHub remote that does not exist yet (see Q1). |
| 1.10 | Replace the manual export with inkjs + Actions | To do *(deferred)* | Optional by design — do it when the manual re-export starts to sting, or when 2.09 needs CI. |
| 1.11 | Read the whole thing on your phone, start to finish; take pacing notes | To do | Blocked by 1.09. |
| 1.12 | Purge every expired date | To do | All of it is in `disney_mk.ink`: 7 "Spring 2026", 4 "Current Closures as of Early 2026" (lines 314, 677, 945, 1279). Wider sweep: 13 `202x` hits in `disney_mk.ink`, 3 in `disney_hs.ink`, 1 in `where_to_stay.ink`. `main.ink`'s single hit ("Epic Universe ... opened in 2025") went out with 1.04b. |
| 1.13 | Footer on every page: last-updated, trademark disclaimer, sources | To do | Depends on the export shipping first (1.08). |

**Done when:** you can text someone a link, they open it on a phone, pick a park and a group
type, read a full day-plan, and every fact in it is true today.

---

## Stage 2 — Make ink earn its keep

Do 2.01 **before** 2.02 — deduplicate first, then add conditionals.

| # | Task | Status | Evidence / notes |
|---|---|---|---|
| 2.01 | Tunnel the repeated blocks (closures, hours, Rider Swap, TTC parking, Skyliner, buses) | To do | Zero tunnels (`->->`) in the project. |
| 2.02 | Party `LIST` + 30-second intake, replacing the four-way `group_type` fork | To do | Zero LISTs. `VAR group_type` at `main.ink:2`. |
| 2.03 | Actually read the variables; give `current_location` a real job | To do | 4 variables declared, 0 read. |
| 2.04 | One tag per fact-bearing knot: `# VERIFIED: YYYY-MM-DD` | To do | Zero tags in the project. |
| 2.05 | Typography pass on the CSS — the entire presentation layer | To do | Starts from Inky's exported `style.css`, so blocked by 1.08. |
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
| Q1 | What is this called, and where does it live? | Open | Highest-leverage IP decision; the wordmark can't be drawn until it's settled. Locally it is now a standalone repo — nothing else in the CGH tree is under git, so that was the only arrangement available, and it is reversible. Still open: the name, and the remote it gets pushed to, which 1.09 needs. |
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
