# Grade 7 geometry source-fit — 2026-06-12

## What was added

Two active Grade 7 geometry topics were added to strengthen alignment with the uploaded Grade 7 pre-deductive geometry curriculum.

## Commits

- `28b86bd` — active Grade 7 geometry fallback topics in `generator/g7-02.js`.
- `375e917` — verifier updated to include Grade 7 geometry source-fit topics.

## Active topics added

### `G7-05` — הזזות שיקופים וסיבובים

Source basis:

- File 03: Grade 7 pre-deductive geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Identify reflection by mirror-image symmetry across a line.
2. Identify translation by same shape moved in one direction and distance.
3. Identify rotation by changed orientation around a fixed point.
4. Explain the reasoning, not only name the transformation.

### `G7-06` — שטח צורה מורכבת

Source basis:

- File 03: Grade 7 pre-deductive geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Compute area of a composite shape.
2. Decompose / subtract areas.
3. Avoid confusing perimeter with area.
4. Use labeled diagram dimensions.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that these active topics exist in `generator/g7-02.js`:

- `G7-05`
- `הזזות שיקופים וסיבובים ✦ מקור`
- `G7-06`
- `שטח צורה מורכבת ✦ מקור`

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
10. A7-05 expression mistake analysis.
11. G7-05 transformations.
12. G7-06 composite area.

## Still pending for Grade 7 geometry

1. Full smart-engine mixed-mode version of `G7-05` and `G7-06`.
2. More angle-chasing problems.
3. Pythagoras application stories.
4. Nets and 3D solids for Grade 7.
5. Informal congruence through transformations.
