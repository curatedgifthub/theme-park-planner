# Pagination Plan — Theme Park Planner Ink Files

> **Status: done, 2026-08-31.** Every knot over 600 words has been split. The project went from
> 94 knots to 218 pages — mean 271 words, median 257, max 596. Nothing in here is outstanding;
> it is kept as the record of the rule that was followed and the one place the plan was wrong.
>
> **Where this plan misjudged the problem:** the priority table below is measured in *ink lines*,
> and a line in these files is an entire paragraph. That made a 1,290-word wall look like "~30
> lines," which is why the four `*_intro` knots — ranked 17–20, three of them marked "OK as-is" —
> were in fact the worst pages in the project, and the ones every reader hits first. Word count is
> the measure that matters. The two targets below ("40-50 lines", "none over ~60") worked out to
> roughly **250–450 words a page, hard ceiling 600**, which is what was actually applied.
>
> **Two additions to "What Does NOT Change":** page headers were written where a split fell in
> prose that had none (the plan's own "every choice loads the next section header" rule requires
> one), and the group-type fork moved to its own `{park}_pick_group` knot so the ~19 "Pick a
> different group type" diverts per park land on the fork instead of the top of a re-paginated
> intro. No prose was rewritten, reordered or removed.

**Goal:** Break long text walls into manageable pages using ink choices. No content changes — only inserting `+ [Continue]` choices and navigation options at natural break points.

---

## The Rule

**Every choice loads the next section header.** The reader taps "Continue to Morning Strategy →" and the next thing they see is the Morning Strategy header and its content. No orphaned headers sitting above a Continue button.

This means each long knot gets split into **sub-knots** at its existing header boundaries. The text between headers becomes a single page.

---

## Target

Keep each page under ~40-50 lines of prose. Some pages will be shorter (that's fine). None should exceed ~60.

---

## How It Works in Ink

A section like `mk_day_no_kids` (currently 157 continuous lines) gets split:

**Before:**
```
== mk_day_no_kids ==
[Who this is for... Getting There... Morning Strategy... Afternoon... Evening... Dining... When the Plan Breaks... all 157 lines]
+ [Pick a different group type] -> mk_intro
```

**After:**
```
== mk_day_no_kids ==
[Who this is for + Getting There — ~40 lines]
+ [Continue to Morning Strategy →] -> mk_no_kids_morning
+ [Pick a different group type] -> mk_intro
+ [Pick a different park] -> disney_park_picker

== mk_no_kids_morning ==
[Morning Strategy content — ~35 lines]
+ [Continue to Afternoon Strategy →] -> mk_no_kids_afternoon
+ [Pick a different group type] -> mk_intro
+ [Pick a different park] -> disney_park_picker

== mk_no_kids_afternoon ==
[Afternoon content — ~40 lines]
+ [Continue to Evening →] -> mk_no_kids_evening
+ [Pick a different group type] -> mk_intro

== mk_no_kids_evening ==
[Evening content — ~35 lines]
+ [Continue to Dining & Wrap-Up →] -> mk_no_kids_dining
+ [Pick a different group type] -> mk_intro

== mk_no_kids_dining ==
[Dining + When the Plan Breaks + End of Night — remainder]
+ [Pick a different group type] -> mk_intro
+ [Pick a different park] -> disney_park_picker
+ [Start over] -> start
```

---

## Break Points by Section

The existing headers in each guide follow a consistent pattern. These are the natural page breaks:

### Standard Guide Structure (most sections follow this)

| Page | Content | Break before header |
|------|---------|-------------------|
| 1 | Who this is for + Getting There (+ transportation details) | — |
| 2 | Lightning Lane + Rope Drop | "Morning Strategy" |
| 3 | Morning Strategy | "Afternoon Strategy" |
| 4 | Afternoon Strategy (+ storm window) | "Evening" |
| 5 | Evening (+ Extended Evening Hours if applicable) | "Dining" |
| 6 | Dining + When the Plan Breaks + End of Night | — (final page) |

Some sections have additional headers that create natural sub-breaks (e.g., "The World Showcase," "Galaxy's Edge," "The Safari," "The Trails"). Use those when a page would otherwise exceed ~50 lines.

### Intro Sections (mk_intro, ep_intro, ak_intro, hs_intro)

These are the park overview pages that end with group-type selection. They're long but the group-type choice at the bottom IS the meaningful interaction. Still break them if they exceed ~50 lines, using the existing ride/show description headers as break points.

### Resort Comparison (main.ink: resort_comparison) — *moot; the knot was deleted in 1.04b*

This is the longest single text block in main.ink. Break at the existing headers:
- "The Short Version"
- "What Summer Does to Both"
- "Size and Scope"
- "Rides and Attractions"
- "Atmosphere and Theming"
- "Food and Dining"
- "Cost"
- "Who Should Go Where"

Each becomes a page with "Continue →" plus "Skip to choosing a destination →" as an escape hatch.

---

## Navigation Choices at Each Break

Every pagination break gets:

1. **Continue →** (always first, always present)
2. **Contextual escape hatch** (varies by position):
   - Inside a park guide: `+ [Pick a different group type]` → back to that park's intro
   - Inside a park guide: `+ [Pick a different park]` → back to park picker (on first and last pages only, to avoid clutter)
   - Inside the resort comparison: `+ [Skip to choosing a destination →]` → choose_destination
   - On the final page of any guide: full navigation back to group type, park picker, and start

---

## Naming Convention for Sub-Knots

Pattern: `{park}_{group}_{section}`

Examples:
- `mk_no_kids_morning`
- `mk_no_kids_afternoon`
- `mk_no_kids_evening`
- `mk_no_kids_dining`
- `ep_mixed_ages_morning`
- `ep_mixed_ages_world_showcase`
- `ak_big_group_safari`
- `hs_young_kids_afternoon`
- `resort_comparison_rides`
- `resort_comparison_cost`

This keeps knot names readable, unique, and traceable to their parent section.

---

## Sections That Need Pagination (Ranked by Priority)

These are the sections with 60+ lines of continuous text before any choice:

| Priority | Section | File | Lines | Est. Pages After Split |
|----------|---------|------|-------|----------------------|
| 1 | ak_day_no_kids | disney_ak.ink | 212 | 6-7 |
| 2 | mk_day_young_kids | disney_mk.ink | 161 | 5-6 |
| 3 | mk_day_no_kids | disney_mk.ink | 157 | 5-6 |
| 4 | mk_day_mixed_ages | disney_mk.ink | 157 | 5-6 |
| 5 | ep_day_mixed_ages | disney_epcot.ink | 149 | 5 |
| 6 | ep_day_young_kids | disney_epcot.ink | 132 | 4-5 |
| 7 | mk_day_big_group | disney_mk.ink | 95 | 3-4 |
| 8 | resort_comparison | main.ink | 80+ | 4-5 |
| 9 | ep_day_big_group | disney_epcot.ink | 78 | 3 |
| 10 | ak_day_mixed_ages | disney_ak.ink | 68 | 3 |
| 11 | hs_day_big_group | disney_hs.ink | 68 | 3 |
| 12 | ak_day_big_group | disney_ak.ink | 65 | 3 |
| 13 | hs_day_no_kids | disney_hs.ink | 64 | 3 |
| 14 | ep_day_no_kids | disney_epcot.ink | 63 | 3 |
| 15 | hs_day_mixed_ages | disney_hs.ink | 62 | 3 |
| 16 | hs_day_young_kids | disney_hs.ink | 61 | 3 |
| 17 | mk_intro | disney_mk.ink | ~40 | 2 (borderline) |
| 18 | ep_intro | disney_epcot.ink | ~25 | OK as-is |
| 19 | ak_intro | disney_ak.ink | ~30 | OK as-is |
| 20 | hs_intro | disney_hs.ink | ~30 | OK as-is |

---

## What Does NOT Change

- No text is rewritten, reordered, or removed
- No new content is added (except the choice lines themselves)
- The group_type, park, and resort variables are untouched
- The final navigation choices at the end of each guide stay the same
- Short sections (under ~50 lines) are left alone
