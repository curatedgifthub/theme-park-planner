# Theme Park Planner — Get-Well Plan

## Northstar (draft — edit until it sounds like you)

> The Disney day-plan that reads like a friend who's been a hundred times — one that
> knows who's in your party, tells the truth about what's closed, and sounds like
> Main Street while you read it.

## Goal

- A public GitHub Pages URL. Disney only. Four parks, all sixteen day-plans reachable, no dead ends.
- Zero claims about a date that has already passed. Every park page carries a visible "last verified" date.
- Atmosphere carried entirely by prose. Zero images, zero audio, zero icons — no layout shift,
  no buffering, nothing between the tap and the next paragraph.
- Any single fact lives in exactly one place. A full refresh takes under 30 minutes, quarterly.

## Current state

| | |
|---|---|
| Words written | 64,042 |
| Knots / choices | 107 / 271 |
| Broken diverts | 0 |
| Git commits | **0** |
| Published anywhere | **0** — nothing compiled or committed yet |
| Finished content unreachable | **24 KB** (getting_to_orlando.ink, where_to_stay.ink) |
| Ink variables read | **0 of 4** |
| Ink conditionals / LISTs / tags | **0 / 0 / 0** |
| "Big Thunder reopens Spring 2026" | **6 places** |
| "Current Closures as of Early 2026" | **4 places** |
| Hardcoded to a summer trip | **67 places** |

---

## Shipping to GitHub Pages — confirmed, this works

Ink compiles to JSON, and **inkjs** runs that JSON in the browser. No server, no backend.
A published ink story is just static files, which is exactly what GitHub Pages serves.
This is the normal way ink games ship on the web.

Two lanes. Start with A, move to B when the manual step starts to sting.

### Exporting from Inky (live today, ~15 minutes)

In Inky: **File -> Export for web...**

That writes a self-contained folder — `index.html`, `style.css`, a small player script, and
the `ink.js` runtime with your compiled story. Drop that folder in a repo, push, then
**Settings -> Pages -> Deploy from a branch -> main / (root)**. That is the whole deployment.

- Works offline, works on a phone, no build tooling at all.
- The exported player is deliberately minimal: text, choices, a fade. **It does not read tags**,
  so it gives you no images and no audio.
- It's a manual re-export every time you change a word.
- Its `main.js` is short and readable, so extending it later is a continuation, not a rewrite.

### Building it yourself with npm (push a .ink edit, the site redeploys itself)

**This may now be optional.** Its main justification was tags driving images and audio, and
that's gone. What's left is convenience — removing the manual re-export — plus the CI staleness
check in 2.09. If Inky's export plus a hand-edited `style.css` is doing the job, exporting from
Inky can be the permanent answer.

**Important:** GitHub Actions cannot run Inky — it's a GUI app. Automated builds need either
the `inklecate` CLI (a binary you'd have to vendor) or **inkjs, which compiles as well as runs**.
inkjs is pure npm, so it works identically on your Mac and on a CI runner. That's why the build
script below uses it.

Starting with the Inky export wastes nothing either way — same story JSON, same runtime.

---

## Stage 1 — Make it real and make it true

Nothing in Stage 2 matters until a stranger can open a link.

- [x] **1.01** ~~`git init` and commit everything as-is, before any edit~~ — **done.** Repo root is
      `theme-park-planner/`, branch `main`, commit `77df200`. The import captures the tree with 1.04a
      already applied, since that edit predates the repo. Local only — no remote until Q1 is answered.
- [x] **1.02** ~~Restructure: `ink/` `web/` `assets/` `tools/`, gitignore `dist/`~~ — **done.**
      1.01 had already made the repo root `theme-park-planner/`, so `ink/` existed; this was the
      other three folders plus one cleanup — the three planning docs moved out of `ink/` up to the
      root, leaving `ink/` as ink source and nothing else. `web/` `assets/` `tools/` each carry a
      README saying what lands there and which task fills it, since git won't track an empty
      directory. `.gitignore` already held `dist/`. The six `INCLUDE` lines are bare filenames and
      every `.ink` file stayed together, so nothing needed rewiring. **One thing this surfaced, and
      it lands in 1.08:** 1.09 deploys from `main` / root, which wants `index.html` at the repo
      root rather than in `web/` — `web/README.md` lays out the two ways to settle that.
- [x] **1.03** ~~Delete `universal_usf.ink` and `universal_ioa.ink`, both INCLUDEs, and the
      `universal_park_picker` knot in `main.ink`~~ — **done.** Both files were placeholders — nine
      lines each, "coming soon", no source content — so nothing was lost. Four deletions in all: the
      two files, the two INCLUDEs, the knot, and one the task list didn't name — the
      "Universal Orlando (Coming soon)" choice in `choose_destination`, which was the knot's only
      inbound divert and would have failed to compile once the knot went. `main.ink` is 194 -> 176
      lines and compiles clean. **What this deliberately left standing:** the Universal *prose*, all
      of it comparison copy the later tasks already own — ~11 passages in the `resort_comparison_*`
      knots (1.04b), the "Disney World vs. Universal" opening of `start` (1.05), the two
      `stay_universal_*` knots in `where_to_stay.ink` (1.06), and 5 incidental mentions in
      `getting_to_orlando.ink`, which is a real Orlando-logistics question and probably stays.
- [x] **1.04a** ~~Delete `resort_comparison_summer`~~ — **done.** Nothing was salvaged and nothing
      needed to be: every fact in it already lived in the park guides, in context and better
      written (storms alone appear 71 times across the four Disney files). It was a fifth copy
      wearing a slide-deck layout — label-colon bullets, two sentences of throat-clearing, and a
      title about "both" resorts. Removed from `main.ink`; the `resort_comparison` divert now
      goes straight to `resort_comparison_size`.
- [x] **1.04b** ~~Delete the remaining 7 `resort_comparison_*` knots, the `choose_destination` knot,
      and the `resort` variable~~ — **done.** All three named deletions landed, plus the four
      inbound diverts that would otherwise have dangled: the two in `start` (`main.ink:23-24`),
      and one apiece at the tail of `getting_to_orlando.ink` and `where_to_stay.ink`. Those two
      files aren't INCLUDEd yet, so they couldn't have broken today's compile — but they'd have
      broken 1.06's, so they were fixed now rather than left as a trap. Both now offer
      `+ [Pick a park →] -> disney_park_picker` where they used to offer a destination choice and
      a comparison link; a forward-compile with both files INCLUDEd confirms the new target
      resolves. `main.ink` is 176 -> 42 lines and compiles clean, no warnings. **What this
      deliberately left standing, for 1.05:** the body of `start` is still the "Disney World vs.
      Universal" comparison opener, now ending in a single choice into the park picker. 1.05 owns
      that prose and replaces the whole knot, so rewriting it here would have been doing 1.05
      twice. One knock-on for 1.05 to absorb: `disney_park_picker`'s last choice still reads
      "Back to resort picker", which stops being true the moment `start` becomes a Disney hub.
- [x] **1.05** ~~Rewrite `start` as a Disney hub: Pick a park / Getting to Orlando / Where to stay~~
      — **done.** The whole knot went, as planned. The new one is titled
      `Walt Disney World Trip Planner` and carries three paragraphs of Disney-only prose: what the
      guide covers, where to start, and why the park guides are split by who you're traveling with.
      The three choices sit in the order the task named — `disney_park_picker`,
      `getting_to_orlando`, `where_to_stay` — with the prose making the case for reading the two
      logistics sections first anyway, since a hotel and a landing time constrain a park calendar
      more than the reverse. The knock-on 1.04b flagged is absorbed: `disney_park_picker`'s last choice now
      reads "Back to start", the same label the tails of both guide files were already using.
      **What this absorbed from 1.06:** the two `INCLUDE` lines. Two of the three hub choices point
      into files that weren't included, so without them the compile is red — the same call 1.03 and
      1.04b made about dangling diverts, and for the same reason. `main.ink` is 42 -> 49 lines,
      compiles clean with no warnings, and a scripted play-through confirms each of the three
      branches opens and returns to the hub. **One thing this hands 1.06 in worse shape than it
      found it:** including `where_to_stay.ink` makes its two `stay_universal_*` knots reachable
      from the live story instead of merely orphaned. Nothing is published yet, so nobody can see
      them, but the Universal strip is now the thing standing between the hub and a Disney-only
      story.
- [x] **1.06** ~~INCLUDE + link the two orphaned files~~ *(done in 1.05)*. ~~In `where_to_stay.ink`
      delete the `stay_universal_on_property` and `stay_universal_strategy` knots, the "On-Property
      at Universal" choice, the "Compare to Universal" divert, the Universal clause in the intro
      paragraph, and the Universal mention in `stay_disney_tradeoffs`~~ — **done.** All five landed.
      One correction to the task text: the "Compare to Universal On-Property" divert lives in
      `stay_disney_on_property`, not `stay_disney_tiers` — same divert, wrong knot named. Deleting
      it leaves that knot with two choices (on to the tiers, back to the hub), which is the shape
      every other knot in the file already has. The tradeoffs list lost "Anyone who's going to be at
      Universal half the time" from *who should not stay on-property*, leaving two entries that
      still carry the point. **Beyond the five, three off-property clauses that only make sense on a
      Universal trip:** the definition ("everything not on Disney *or Universal* land"), the parking
      line ("$30+ per day, *Universal is similar*"), and I-Drive's closing recommendation ("the
      practical pick for travelers splitting time between Disney and Universal") — that last one is
      advice for a resort this guide no longer covers, and the other two are half-sentences that go
      stale the moment the Universal sections do. **What stayed, on purpose:** two geographic
      anchors — I-Drive sits "roughly equidistant between Disney and Universal", Kissimmee is
      "closer to Disney than Universal". Those are facts about where Orlando's hotel zones are, not
      Universal trip planning, and 1.03 already made this call for the five mentions in
      `getting_to_orlando.ink`. `where_to_stay.ink` is 173 -> 133 lines, 9 knots -> 7. Compiles
      clean, no warnings, and a scripted play-through reaches all seven knots and returns to the hub.
- [x] **1.07** ~~Add `-> END` terminals and a way home on every guide's last page~~ — **done.**
      **18 last pages**, counting a "last page" as any knot with no *Continue to...* step left in it:
      the 16 park day-plan terminals (four group types x four parks), plus `orlando_driving` and
      `stay_dvc_renting`, which close the two logistics guides. The 16 park terminals already had a
      way home — `Start over` has been on every one of them since the import — so the missing half
      was the ending: **zero `-> END` in 4,900 lines**, which meant the story literally could not
      finish. Every knot in the project has choices, so flow never ran out and inklecate never
      warned; it just looped forever.
      **One ending, not eighteen.** New `the_end` knot in `main.ink` — a sign-off (book the things
      that run out, arrive earlier than feels reasonable, drop the plan when it stops helping) and
      then `-> END`. All 18 last pages get the same fourth choice,
      `+ [Done — close the guide] -> the_end`, sitting last because it's the most terminal thing on
      the page. Sharing one knot keeps the closing words in a single place to edit, which is 2.01's
      rule applied before 2.01.
      **The two logistics terminals also gained `+ [Back to start] -> start`.** They offered
      *Pick a park* and *Back to <section hub>* and nothing else, so the top of the story was two
      taps away where the park terminals had it in one. Now all 18 reach both `start` and
      `the_end` in a single choice.
      **`-> END` really ends it** — the exported player shows the text and no further choices, so
      the last line of `the_end` says so and tells the reader to refresh. That's honest about the
      medium rather than a dead end left by accident.
      Also fixed in passing: `disney_mk.ink` had no trailing newline, which is why its fourth
      terminal didn't match the same edit as the other fifteen.
      **One thing corrected while writing the sign-off:** the first draft said dining reservations
      open 60 days ahead. That's the on-property window — `where_to_stay.ink` correctly has 60 on,
      30 off. The number came out rather than getting restated: a closing page shouldn't carry a
      fact that can go stale in a second place.
      **Deliberately out of scope:** mid-chain knots (`ak_big_group_morning` and its ~50 siblings)
      still offer only *Continue* and *Pick a different group type*, putting `start` two or three
      taps away. They aren't last pages and they aren't dead ends, so they stay as they are.
      `main.ink` 49 -> 67 lines, 93 knots -> 94. Compiles clean, no warnings, and three scripted
      play-throughs — a park terminal, a `where_to_stay` terminal, a `getting_to_orlando` terminal —
      each reach `the_end` and stop, with no "ran out of content" warning.
- [x] **1.08** ~~Inky -> File -> Export for web. Commit the exported folder.~~ — **done.** Five
      files, at the **repo root** rather than in `web/`. That settles the question 1.02 parked:
      1.09 deploys from `main` / root, and the alternative — export to the root *and* keep copies
      in `web/` — meant two of everything with nothing to reconcile them, at a point where not one
      of the three hand-editable files has been hand-edited. `web/README.md` now carries the
      decision, a table of which file comes from where, and the re-export trap.
      **What the five are:** `story.js` (403 KB, `var storyContent = <compiled main.ink>;`) is
      generated; `ink.js` is the inkjs 2.2.3 runtime vendored verbatim; `index.html`, `style.css`
      and `main.js` are Inky's export template. Only `story.js` changes when the ink changes.
      **How it was produced:** headlessly, with the binary and flags Inky's own menu item uses —
      the `inkjs-compatible` `inklecate_mac` (not the default one; web export needs the JSON
      dialect inkjs reads), `-c -o`, then the same two substitutions into the same template. Same
      inputs, same code path, same output as clicking the menu.
      **Two source edits it forced, both caused by the export itself:**
      1. `# title: Walt Disney World Trip Planner` added as a global tag to `main.ink`. Inky reads
         that tag for `<title>` and `<h1>`, and *falls back to the export folder's name* when it
         is absent — which at the root would have shipped a page titled "theme-park-planner". The
         title now comes from the source, not from wherever the export lands.
      2. `start`'s opening line, the bare "Walt Disney World Trip Planner", deleted. It was the
         story's own heading back when there was no shell around it; with the template's permanent
         `<h1>` above it, the landing page printed the title twice, the second time as body copy.
      **Verified three ways:** the compile is clean with no warnings; 20,000 scripted paths driven
      through the exported `story.js` by the exported `ink.js` produced zero runtime errors, with
      82 of them reaching `-> END`; and the page was loaded, played through a park branch, and
      checked at 375 px, where it stays inside its measure with no horizontal overflow.
      **Deliberately not done:** no build script in `tools/`. `tools/README.md` says empty on
      purpose until 1.10, and a shell wrapper around a GUI app's bundled binary is the wrong
      permanent answer — 1.10 wants inkjs, which runs on a CI box too. The CLI recipe is written
      down in `web/README.md` so it isn't lost. No `.nojekyll` either: nothing at the root has
      Liquid syntax or a leading underscore, so Jekyll is harmless here, and the real question it
      raises — a root deploy also serves the three planning `.md` files — is 1.09's call, flagged
      on 1.09's row in the checklist.
- [ ] **1.09** Settings -> Pages -> Deploy from a branch -> `main` / root. **You now have a live URL.**
      — **started; the last two steps belong to Aaron.** Everything that does not require the
      `curatedgifthub` credentials has landed.
      **Where it lives — the answered half of Q1:** `github.com/curatedgifthub`, public, next to
      `emoji-charades`. This is a Curated Gift Hub property, not a personal one. That account is a
      *user*, not an organization, and GitHub has no grant that lets one user create a repo under
      another user's account — so the fact that this checkout authenticates as `8139CAUSAL` (a
      measurement account) isn't a permissions gap to fix, it's the wrong account entirely. Repo
      creation and the Pages switch have to be run signed in as `curatedgifthub`.
      **What landed here:** `_config.yml`. A root deploy publishes the whole root, so the two
      get-well documents, `PAGINATION_PLAN.md` and the three folder READMEs are excluded from the
      built site. They carry the open questions and the re-export traps — working notes, not pages
      a reader should land on. They stay in the repo and in git history; they stop being fetchable
      at the live URL. `ink/` is deliberately still served: the sources are the actual work and
      they're readable on a public repo regardless. One trap is recorded in the file itself —
      Jekyll's `exclude` *replaces* its default list rather than extending it, which will matter
      the moment 1.10 adds a `Gemfile` or `node_modules`.
      **A correction to what 1.08 left here:** none of those Markdown files carries YAML front
      matter, so Jekyll would have copied them through as raw text rather than rendering them as
      pages. Fetchable either way, so the decision doesn't change — but the note was wrong.
      **Verified for a project page:** this serves from `curatedgifthub.github.io/<repo>/`, a
      subpath rather than a domain root, which is where relative-vs-absolute asset paths usually
      bite. Every reference in `index.html` is relative, `main.js` has no `fetch` and no absolute
      URL, and the only `url()` in `style.css` is the Google Fonts import over https. Nothing
      needs a base path. Separately: no secrets, no local filesystem paths and no personal
      identifiers in any hand-written tracked file.
      **Precedent worth copying:** `curatedgifthub/emoji-charades` already runs exactly this
      configuration — `build_type: legacy`, source `main` / `/`, live at
      `https://curatedgifthub.github.io/emoji-charades/`.
      **The two steps left, signed in as `curatedgifthub`:**
      1. `gh repo create curatedgifthub/<name> --public --source=. --remote=origin --push` — or
         create it in the web UI, then `git remote add origin git@github.com:curatedgifthub/<name>.git`
         and `git push -u origin main`.
      2. Settings -> Pages -> Deploy from a branch -> `main` / `/ (root)`. The first build takes a
         minute or two; the URL is `https://curatedgifthub.github.io/<name>/`.
      **Still blocked on:** `<name>` — the open half of Q1. It fixes the URL, and renaming the
      repo later moves the URL with it, breaking anything already shared.
- [~] **1.10** *(was deferred; the local half landed early out of necessity)* Replace the Inky
      export with inkjs + Actions — **local half done.** It stopped being optional the moment 1.13
      and 2.05 needed to hand-edit `index.html` and `style.css`, the two files Inky's export
      destroys. `tools/build.js` recompiles `story.js` and nothing else; `tools/verify.js` is an
      eight-check pre-ship gate that CI can call unchanged. inkjs is pinned to exactly 2.2.3 to
      match the vendored runtime. The one subtlety: Inky passes `inklecate -c` and inkjs defaults
      `countAllVisits` to false, which silently dropped all 748 `#f` flags — inert today, a
      landmine for Stage 2. Set it, and the output is deep-equal to inklecate's. **Left:** the
      Actions workflow, which needs the repo to exist; and `dist/`, which Pages-from-root doesn't
      need.
- [ ] **1.11** Read the whole thing on your phone, once, start to finish. Take pacing notes.
- [x] **1.12** ~~Purge every expired date~~ — **done, and every claim was verified rather than
      assumed.** Big Thunder reopened 2026-05-03, Buzz 2026-04-08, the Muppets coaster 2026-05-26,
      the Disney Jr. show 2026-05-26. The four "Early 2026" headers became an undated "Closures and
      Refurbishments". Added one closure the guide didn't know about: the WDW Railroad is down
      entirely 2026-09-28 to 2026-10-29. `verify.js` check 6 now fails the build on any future-tense
      claim whose season has passed, so this specific rot cannot come back silently.
- [x] **1.13** ~~Footer on every page: last-updated, trademark disclaimer, sources~~ — **done.**
      The disclaimer went to the *top* rather than the bottom, as an italic preamble under the h1:
      it has to be seen. The footer proper sits outside `#story`, where `main.js`'s `removeAll()`
      can't reach it, so it persists across all 217 pages without editing a single knot. The date is
      hand-maintained on purpose and policed by `verify.js` at 180 days.

**Done when:** you can text someone a link, they open it on a phone, pick a park and a
group type, read a full day-plan, and every fact in it is true today.

---

## Stage 2 — Make ink earn its keep

Do 2.01 **before** 2.02 — deduplicate first, then add conditionals.

- [ ] **2.01** Tunnel the repeated blocks (closures, park hours, Rider Swap, TTC parking, Skyliner, bus timing)
- [ ] **2.02** Party `LIST` + a 30-second intake, replacing the four-way `group_type` fork
- [ ] **2.03** Actually read the variables; give `current_location` a real job
- [ ] **2.04** One tag, not eight: `# VERIFIED: YYYY-MM-DD` on each fact-bearing knot. That's the
      only thing the player needs to read, and only so CI can fail on stale content.
- [ ] **2.05** Typography pass on the CSS: type scale, measure, rhythm between paragraph and
      choice list. This is the entire presentation layer now. Inky's exported `style.css` is
      the starting point.
- [ ] **2.06** Save & resume via `story.state.toJson()` into localStorage (try/catch)
- [ ] **2.07** Encode the party profile in the query string — shareable plan URLs
- [ ] **2.08** Print stylesheet + one-page day sheet
- [ ] **2.09** CI link checker: fail on dead diverts and on `VERIFIED` older than 180 days
- [ ] **2.10** **Make season a variable.** Ask when they're going, then condition on it. The
      summer advice is correct and stays — it just stops being the only advice. See the design
      section below.
- [ ] **2.11** **Write the atmospheric layer in prose.** Sensory openers and shuffles at each
      land entry and each time-of-day transition, conditioned on season. This replaces what was
      going to be 38 images and 12 audio loops. See the design section below.
- [ ] **2.12** Service worker for offline. With no assets to cache this is close to free —
      the story JSON, one CSS file, one JS file. Park Wi-Fi is bad; being the guide that still
      works is a real advantage.

---

## Seasonality — the design for 2.10

The summer writing is good and it's right. The bug is that it's unconditional: someone going
the second week of January reads a guide built around 97°F and a 2 p.m. thunderstorm, and
none of it applies. Summer becomes one branch instead of the assumption.

Scale of the job: 67 summer mentions, but **111 passages are strategy that actually flips**
by season and only 18 are throwaway adjectives. Most of this content is load-bearing.

### One enum won't work — heat and crowds are independent

In Orlando they don't move together, and conflating them produces wrong advice:

| Period | Heat | Crowds | Why it breaks a single enum |
|---|---|---|---|
| Jan – mid Feb | mild | low | Coolest and emptiest. Also peak refurbishment season. |
| Late Feb – Mar | warm | moderate | Presidents week and spring break spike hard inside it. |
| Apr – May | warm | moderate | Humidity climbing, hours lengthening. |
| Jun – Aug | brutal | peak | The current default. Heat *and* crowds. |
| Sep – early Oct | brutal | low | Still 90s, but the emptiest stretch of the year. |
| Late Oct – Nov | mild | moderate | Best weather of the year. Thanksgiving week spikes. |
| Dec | mild | moderate → extreme | First three weeks fine; Christmas–New Year is the busiest week of the year. |

So September and July share a heat plan but nothing else. October and January share a crowd
plan but nothing else. Derive **separate** values at intake.

### Intake

Seven periods, not twelve months — easier to answer and each maps cleanly. Then a follow-up
for the spike weeks, which are the real traps and cut across periods: Presidents Day week,
spring break, Easter, July 4, Thanksgiving week, Christmas–New Year. Those bump `crowds` to
peak regardless of period.

```ink
VAR heat   = 0      // 0 mild · 1 warm · 2 brutal
VAR crowds = 0      // 0 low  · 1 moderate · 2 peak
VAR storms = false  // daily afternoon thunderstorm window
VAR late   = false  // parks routinely open past 9 p.m.

== when_are_you_going ==
When are you going? It changes almost everything below.

+ [January to mid-February]
    ~ heat = 0 ~ crowds = 0
    -> spike_weeks
+ [June to August]
    ~ heat = 2 ~ crowds = 2 ~ storms = true ~ late = true
    -> spike_weeks
+ [September to early October]
    ~ heat = 2 ~ crowds = 0 ~ storms = true
    -> spike_weeks
+ [Late October to November]
    ~ heat = 0 ~ crowds = 1
    -> spike_weeks
// ...and the rest
```

### Reading it

Ink's switch keeps this readable at 111 call sites:

```ink
{ heat:
  - 2: You are taking a midday break. It is not optional and this guide will keep saying so.
  - 1: A midday break is worth it, but you can push through if everyone's holding up.
  - 0: Skip the break. The heat isn't your problem today — the 6 p.m. close is.
}
```

Whole seasonal blocks gate the same way, tunnelled so the text lives in one place:

```ink
{ storms: -> afternoon_storm_plan -> }
{ late:   -> last_two_hours -> }
```

### Three tiers of migration work

- **Tier A — strategy that flips (~15 sites, must be conditioned).** The midday break, the
  evening-is-the-best-window claim, the storm response, park closing times. The sharpest
  example: "the last two hours of the night are the most valuable hours of your day" is true
  in July and actively wrong in January, when Animal Kingdom closes at 5 or 6 p.m. and there
  is no night.
- **Tier B — seasonal flavour (~18 sites, just neutralise).** "In 95 degree heat" becomes
  "in the heat"; "a long summer day" becomes "a long day". No conditional needed, no
  information lost.
- **Tier C — blocks that are wholly seasonal (the rest).** Wrap in `{ storms: ... }` or
  `{ heat == 2: ... }` rather than rewriting sentence by sentence.

Raw numbers — 93–97°F highs, heat index 105°F+, the 2–5 p.m. storm window, typical closing
times per park — go in one tunnelled knot per season. Stated once, quoted nowhere.

---

## Atmosphere in prose — the design for 2.11

Replaces the whole of what was Stage 3. Ink's loop is read, tap, next paragraph. An image
decoding or an audio buffer is a stall at exactly the point the medium is fastest, and it
costs layout shift and a maintenance burden besides. The text does the theming instead.

**Cost comparison, for the record:** 38 images + 12 loops + 14 icons was weeks of production,
several MB of repo, an image pipeline, an audio player with crossfade and persistence, and a
standing IP exposure on every park photo. The prose version is roughly 60–100 written lines,
zero bytes of asset, and no new player code at all.

### The four conditions atmosphere varies on

Season and time of day are already variables from 2.10. Land comes from where the reader is.
Crowd level falls out of season. That's the whole system — no new state needed.

| Axis | Source | What it changes |
|---|---|---|
| Season | `heat`, `storms` from 2.10 | Air, smell, light, what the pavement is doing |
| Time of day | the guide's own morning/afternoon/evening structure | Light, sound, crowd density, what's open |
| Land | current knot | Music drifting from somewhere, surface underfoot, architecture |
| Crowds | `crowds` from 2.10 | Whether the street reads as a sea of strollers or nearly empty |

### Pick the right sequence type — this is where re-readers are won

People plan a Disney trip over weeks and re-read these pages. Ink gives four kinds of
alternative and they behave very differently on a second visit:

| Syntax | Behaviour | Use it for |
|---|---|---|
| `{~ a\|b\|c }` | random each time | Ambient texture. The default for atmosphere. |
| `{& a\|b\|c }` | cycles in order, loops | Variety that shouldn't repeat back-to-back |
| `{! a\|b\|c }` | plays each once, then nothing | First-visit-only framing that shouldn't nag |
| `{ a\|b\|c }` | advances, then sticks on the last | An opener that settles into a steady version |

The high-value pattern: `{!}` for the first-time-through line, then a `{~}` shuffle underneath
it for every visit after. The reader gets the arrival moment once and fresh texture forever.

```ink
{! You come up out of the tunnel and the whole street opens in front of you. }
{~The ragtime piano from the parlor is competing with the crowd and losing.
 |A horse-drawn trolley clops past, the driver calling a warning to a wandering toddler.
 |The firehouse bell dings twice and nobody looks up.}
```

### Craft rules for the sensory lines

- **Specific beats evocative.** "The smell of warm sugar and melting asphalt" works. "Magical
  atmosphere" does not.
- **Name what a photograph couldn't hold.** Smell, temperature, sound, the feel of the
  brickwork. That's the argument for prose over images, so lean on it.
- **Keep them short and cuttable.** One or two sentences. They sit between the reader and
  their answer; earn the space or lose the line.
- **Never contradict a conditioned fact.** A shuffle line about a hot afternoon must not fire
  when `heat == 0`. Put land lines inside the season conditional, not beside it.
- **No characters, no lyrics, no ride dialogue.** Environment only. This is the choice that
  drops IP exposure to essentially nothing.

### Budget

Roughly 20 land and area entry points across the four parks. Three to five lines each, times
two or three season branches on the ones that need it. Call it 60–100 lines. One good writing
session, and it's the most distinctive thing on the site when it's done.

## IP guardrails

*Not legal advice. This is the posture independent fan-guide publishers generally operate under.*

Going text-only removed most of this section. No park photos, no music, no icon set means the
copyright surface is close to nil — what's left is trademark and accuracy, both cheap to handle.

**Trademark.** Naming rides, lands, hotels and shows in prose is referential use and is fine;
that's how every guidebook works. What breaks it is implying affiliation.
- Safe: naming things throughout the prose. This is now essentially your only use of Disney IP.
- Not safe: Disney fonts, the script wordmark, the castle logo, the ear silhouette in *your* branding.
- **Highest-risk single decision left in the project: a domain or product name containing
  "Disney."** Pick a distinctive name and the whole category disappears.
- Required: footer disclaimer on *every* page — "An independent guide. Not affiliated with,
  endorsed by, or sponsored by The Walt Disney Company."

**Copyright.** Nothing to manage on the asset side any more. Two rules for the prose:
- Never quote ride dialogue, show scripts, or song lyrics. Describe, don't reproduce.
- Atmospheric lines describe *environments*, never characters. That's a craft rule from 2.11
  and it doubles as the copyright rule.

**The "Aladdin and Jasmine are in Fantasyland today" idea.** The names aren't the problem.
Two other things are: (a) it fabricates live data it cannot know, which is a reader harm and
makes the site look like an official feed; (b) it's factually off — Aladdin and Jasmine have
historically met near Agrabah Bazaar in *Adventureland*. Fix the tense, not the idea:

```ink
Character meets rotate daily and the app is the only source of truth for your date.
That said, the usual shape of it:
{~
  - Adventureland often runs an Aladdin and Jasmine meet near Agrabah Bazaar.
  - Princess Fairytale Hall in Fantasyland usually has two princesses at a time.
  - Town Square Theater is where Mickey himself tends to be.
}
```

Keep a handful of these for utility. Spend the creative energy on the environment lines — they
carry the atmosphere now, and they're entirely yours.

---

## GitHub and the update ritual

Run once, before touching anything:

```bash
git init && printf 'dist/\nnode_modules/\n.DS_Store\nassets/_source/\n' > .gitignore && git add -A && git commit -m "Import: 64k words of park guides, pre-refactor"
```

While you're exporting from Inky by hand, you re-export and commit; the push is the deploy.
Once Actions is deploying (1.10), every push to `main` republishes the site — "updating GitHub
when done" stops being a step and becomes a side effect of saving.

**Commit prefixes** so the log doubles as a changelog:
`content(mk):` facts about a park · `feat:` new capability · `refactor:` structure only ·
`prose:` atmospheric and seasonal writing · `fix:` something broken.

**Quarterly refresh, under 30 minutes:**
1. `grep -rn "202[5-9]" ink/` — every hit is either historical or a liability
2. Check `VERIFIED` tags (once 2.09 ships, CI does this for you)
3. Reconcile Disney's closures page against the four `*_closures` knots
4. Bump the footer date and commit — the push is the deploy

Schedule it *after* Disney announcement waves, not on a fixed quarter boundary.

---

## Open questions

1. **What is this called, and where does it live?** Highest-leverage IP decision in the project;
   the wordmark can't be drawn until it's settled. Standalone repo or a folder in the CGH site?
2. **Is this monetized?** Affects disclaimer wording and whether contextual affiliate links
   belong in the knots where a need appears (heat section, storm window, big-group supplies).
3. **Ship date?** Stage 1 alone gets a shareable URL. Stage 2 is where the project gets good.
