# Source-fit geometry implementation — 2026-06-12

## What was added

Two source-backed Grade 8 geometry visual engines were added.

## Commits

- `1d17706` — `feat: add source-backed geometry visual engines`
- `d70c7aa` — `chore: load source-fit geometry engines`

## Files changed

### Added

`generator/engine/source-fit-geometry.js`

### Updated

`generator/index.html`

The page now loads:

`engine/source-fit-geometry.js?v=20260612-source-fit-3`

## New engines

### `G8-02-ENGINE` — גליל ופריסה

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Question families:

1. Cylinder volume.
2. Total surface area.
3. Cylinder net identification.
4. Find-the-mistake cases: using lateral area as volume, forgetting the two circular bases, choosing a box net for a cylinder.

Visuals:

- Cylinder SVG.
- Cylinder net SVG: rectangle + two equal circles.

Supported formats:

- Open question.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode through exercise-set.

### `G8-03-ENGINE` — זוויות בין מקבילים

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Question families:

1. Corresponding / alternate angles are equal.
2. Same-side interior angles sum to 180 degrees.
3. Find-the-mistake: treating every angle near parallel lines as equal.

Visuals:

- Parallel-line diagram with transversal, marked known angle, and unknown angle.

Supported formats:

- Open question.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode through exercise-set.

## Source-fit progress so far

Implemented source-backed visual clusters:

1. Coordinate system Q1.
2. Relative-frequency group comparison.
3. Applied graphs and function identification.
4. Bar-chart reading.
5. Cylinder and cylinder net.
6. Parallel-line angle diagram.

Still pending:

1. Bar-chart construction.
2. Pie-chart construction.
3. Misleading graph critique.
4. Congruent-triangle tick-mark diagrams.
5. Isosceles triangle property engine.
6. Transformations / intuitive congruence.
