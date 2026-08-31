VAR park = ""
VAR group_type = ""
VAR current_location = ""

INCLUDE disney_ak.ink
INCLUDE disney_epcot.ink
INCLUDE disney_hs.ink
INCLUDE disney_mk.ink
INCLUDE getting_to_orlando.ink
INCLUDE where_to_stay.ink

-> start

== start ==
~ park = ""
~ group_type = ""

Walt Disney World Trip Planner

Four parks, dozens of hotels, and a few hundred small decisions that add up to either a good week or an expensive slog. This guide covers the three that matter most: which park gets each day, how you get to Orlando, and where you sleep once you're here.

The park guides are the heart of it, so they come first. Each one is broken down by who you're traveling with, because a day at Magic Kingdom with a four year old and a day at Magic Kingdom with four adults are not the same day, and most planning advice online is written as though they were.

If the flights and the hotel aren't booked yet, read those two sections first anyway. Where you sleep and when you land constrain everything that comes after them, and it's easier to build a park calendar around a hotel than to move a hotel around a park calendar.

+ [Pick a park →] -> disney_park_picker
+ [Getting to Orlando →] -> getting_to_orlando
+ [Where to stay →] -> where_to_stay

== disney_park_picker ==
~ park = ""

Walt Disney World
Which park gets your day?
There are four parks, they're wildly different, and the right one depends entirely on who you're traveling with. This page breaks down each one so you can pick with confidence or jump straight to the one you already know you want.

+ [Animal Kingdom]
    ~ park = "animal_kingdom"
    -> ak_intro
+ [EPCOT]
    ~ park = "epcot"
    -> ep_intro
+ [Hollywood Studios]
    ~ park = "hollywood_studios"
    -> hs_intro
+ [Magic Kingdom]
    ~ park = "magic_kingdom"
    -> mk_intro
+ [Back to start] -> start
