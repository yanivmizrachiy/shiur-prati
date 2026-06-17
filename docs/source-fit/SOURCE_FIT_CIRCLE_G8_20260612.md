# Grade 8 circle source-fit — 2026-06-12

## What was added

Two active Grade 8 circle topics were added to strengthen alignment with the uploaded Grade 8 geometry curriculum.

## Commits

- `1743b5c` — active Grade 8 circle topics in `generator/g8-01.js`.
- `c88227d` — verifier updated to include Grade 8 circle source-fit topics.

## Active topics added

### `G8-05` — זווית מרכזית וחלק מעיגול

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Relate central angle to fraction of circle.
2. Convert degrees to a sector fraction.
3. Compute approximate sector area.
4. Compute approximate arc length.

### `G8-06` — קוטר רדיוס ומיתר

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Connect radius and diameter.
2. Distinguish diameter from chord.
3. Explain that every diameter is a chord through the center, but not every chord is a diameter.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that these active topics exist in `generator/g8-01.js`:

- `G8-05`
- `זווית מרכזית וחלק מעיגול ✦ מקור`
- `G8-06`
- `קוטר רדיוס ומיתר ✦ מקור`

## Current source-fit clusters on main

1. N7-01 coordinate system Q1.
2. U7-03 relative-frequency comparison.
3. A8-01 applied graph/function reading.
4. U7-04 bar-chart reading.
5. G8-02 cylinder and net.
6. G8-03 parallel-line angles.
7. U7-05 pie chart and relative frequency.
8. U7-06 misleading graph critique.
9. A7-04 equivalent expressions and simplification.
10. A7-05 value tables and first-quadrant graphing.
11. G7-05 transformations.
12. G7-06 composite area.
13. G8-05 central angle and sector.
14. G8-06 diameter, radius, and chord.

## Still pending for Grade 8 geometry

1. Full smart-engine mixed-mode version of `G8-05` and `G8-06`.
2. Congruence tick-mark diagrams.
3. Isosceles triangle properties.
4. Similarity and shadow problems.
5. Richer circle exercises including circumference/area reasoning traps.
