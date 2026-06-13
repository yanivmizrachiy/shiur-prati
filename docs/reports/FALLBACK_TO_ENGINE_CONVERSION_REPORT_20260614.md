# Fallback-to-Engine Conversion Report — 2026-06-14

## Before
17 logical fallback topics were source-tagged but served by a generic renderer
(not dedicated engines).

## Converted this sprint (8) -> dedicated engines
| topic | engine id | source | visual |
|---|---|---|---|
| pie chart + relative frequency | U7-05-ENGINE | 06 | pie SVG |
| misleading graph critique | U7-06-ENGINE | 06 | truncated-axis bar + break mark |
| frequency table + relative frequency | U7-07-ENGINE | 06 | table |
| mean / median / range | U7-08-ENGINE | 06 | — (not needed) |
| diameter / radius / chord | G8-06-ENGINE | 04 | circle SVG |
| isosceles triangle | G8-08-ENGINE | 04 | triangle SVG |
| number-line comparison | N7-08-ENGINE | 05 | number line SVG |
| opposite & absolute value | N7-09-ENGINE | 05 | number line SVG |

Each: open/mcq/tf/mistake × basic/standard/challenge, balanced TF, MCQ exactly
one correct (>=3 choices), mistake-with-correction, full pedagogy + meta.
Implemented in `generator/engine/source-fit-dedicated.js`; registered dedicated
in source-registry + pedagogy (3 families each), removed from the fallback set.

## Effect
Engine universe 33 -> 41. Fallback 17 -> 9. STRONG 33 -> 41. NO_CLEAR_SOURCE 0.
stress 1650 -> 2050 generations, 0 fails.

## NOT converted yet (9 remaining fallbacks)
N7-10, N7-11, N7-12, N7-13 (directed-number mistake/context),
G7-05 transformations, G7-06 composite area,
G8-05 central angle/sector, G8-07 congruence markings, G8-09 similarity/shadows.
These still run through the generic renderer; they are the next conversion batch.

## Recommended progress
Target met (>=8). 9 remain for the next sprint.
