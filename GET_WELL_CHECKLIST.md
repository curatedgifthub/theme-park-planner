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

**Where we are:** Stage 1 — 3 of 14 done (1.01, 1.02 and 1.04a). Stage 2 — 0 of 12 done.
The repo is local only — no remote. Nothing is compiled, pushed, or published.

---

## Stage 1 — Make it real and make it true

| # | Task | Status | Evidence / notes |
|---|---|---|---|
| 1.01 | `git init` and commit everything as-is | **Done** | Repo root is `theme-park-planner/`, so the existing `ink/` folder is already the one 1.02 wants. Commit `77df200` "Import: 64k words of park guides, pre-refactor" — 13 files, 4,901 lines, branch `main`. `.gitignore` holds `dist/ node_modules/ .DS_Store assets/_source/`. No remote yet; nothing pushed. |
| 1.02 | Restructure into `ink/` `web/` `assets/` `tools/`, gitignore `dist/` | **Done** | `ink/` came free with 1.01. Added `web/` `assets/` `tools/`, each with a README naming what lands there and which task fills it — git won't track an empty directory. Moved `GET_WELL_PLAN.md`, `GET_WELL_CHECKLIST.md` and `PAGINATION_PLAN.md` out of `ink/` to the repo root, so `ink/` is source only; `git mv`, so history follows. `.gitignore` already had `dist/`. INCLUDEs are bare filenames and all nine `.ink` files stayed put, so no rewiring. Surfaced for 1.08: 1.09's root deploy wants `index.html` at the root, not in `web/`. |
| 1.03 | Delete the two Universal files, both INCLUDEs, and `universal_park_picker` | To do | `universal_usf.ink` and `universal_ioa.ink` still present; INCLUDEs at `main.ink:10-11`; knot at `main.ink:183`. |
| 1.04a | Delete `resort_comparison_summer` | **Done** | Removed; `resort_comparison` now diverts straight to `resort_comparison_size`. |
| 1.04b | Delete the remaining 7 `resort_comparison_*` knots, `choose_destination`, and `VAR resort` | To do | 7 knots run from `main.ink:28` to `main.ink:149`; `choose_destination` at `main.ink:150`; `VAR resort` at `main.ink:1`. Four inbound diverts to clean up: `main.ink:26`, `main.ink:160`, `getting_to_orlando.ink:91`, `where_to_stay.ink:173`. |
| 1.05 | Rewrite `start` as a Disney hub (park / getting there / where to stay) | To do | `main.ink:15` still opens on Disney vs. Universal. Blocked by 1.03 and 1.04b. |
| 1.06 | INCLUDE and link the two orphaned files; strip Universal from `where_to_stay.ink` | To do | No INCLUDE for `getting_to_orlando.ink` or `where_to_stay.ink` — 24 KB of finished content is unreachable. |
| 1.07 | `-> END` terminals and a way home on every guide's last page | To do | Zero `-> END` in the entire project. |
| 1.08 | Inky → Export for web; commit the exported folder | To do | Nothing compiled. No exported folder in the tree. |
| 1.09 | Pages → Deploy from a branch → `main` / root — **live URL** | To do | Blocked by 1.08, and by a GitHub remote that does not exist yet (see Q1). |
| 1.10 | Replace the manual export with inkjs + Actions | To do *(deferred)* | Optional by design — do it when the manual re-export starts to sting, or when 2.09 needs CI. |
| 1.11 | Read the whole thing on your phone, start to finish; take pacing notes | To do | Blocked by 1.09. |
| 1.12 | Purge every expired date | To do | All of it is in `disney_mk.ink`: 7 "Spring 2026", 4 "Current Closures as of Early 2026" (lines 314, 677, 945, 1279). Wider sweep: 13 `202x` hits in `disney_mk.ink`, 3 in `disney_hs.ink`, 1 each in `main.ink` and `where_to_stay.ink`. |
| 1.13 | Footer on every page: last-updated, trademark disclaimer, sources | To do | Depends on the export shipping first (1.08). |

**Done when:** you can text someone a link, they open it on a phone, pick a park and a group
type, read a full day-plan, and every fact in it is true today.

---

## Stage 2 — Make ink earn its keep

Do 2.01 **before** 2.02 — deduplicate first, then add conditionals.

| # | Task | Status | Evidence / notes |
|---|---|---|---|
| 2.01 | Tunnel the repeated blocks (closures, hours, Rider Swap, TTC parking, Skyliner, buses) | To do | Zero tunnels (`->->`) in the project. |
| 2.02 | Party `LIST` + 30-second intake, replacing the four-way `group_type` fork | To do | Zero LISTs. `VAR group_type` at `main.ink:3`. |
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
