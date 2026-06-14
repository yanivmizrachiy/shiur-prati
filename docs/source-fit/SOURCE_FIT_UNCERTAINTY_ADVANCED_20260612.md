# Advanced uncertainty source-fit — 2026-06-12

## What was added

Added two additional source-backed uncertainty topics for Grade 7.

## Commits

- `8d3dafa` — added `generator/engine/source-fit-uncertainty-advanced.js`
- `034ff89` — added active legacy fallback generators in `generator/u7-02.js`

## Active topics added to the UI

### `U7-05` — דיאגרמת עוגה ושכיחות יחסית

Source basis:

- File 06: uncertainty examples.
- Topic family: pie chart / relative frequency.

Student task:

- Read a pie-chart context.
- Compute relative frequency: frequency divided by total.
- Convert to percent.
- Convert to central angle in degrees.

### `U7-06` — תרשים מטעה — ביקורת

Source basis:

- File 06: misleading graph critique.

Student task:

- Inspect a graph that visually exaggerates differences.
- Identify that the vertical axis does not start at zero.
- Explain how to correct the representation.

## Implementation note

A fuller engine file was created as `generator/engine/source-fit-uncertainty-advanced.js`.
Because the main script-loader update was blocked, the active UI fallback was synced into `generator/u7-02.js`, which is already loaded by the existing phase-2 loader. This makes the two new topics visible and usable without changing the loader again.

## Source-fit progress so far

Implemented visual/source clusters:

1. Coordinate system Q1.
2. Relative-frequency group comparison.
3. Applied graphs and function identification.
4. Bar-chart reading.
5. Cylinder and cylinder net.
6. Parallel-line angle diagram.
7. Pie chart / relative frequency.
8. Misleading graph critique.

Still pending:

1. Full mixed-mode engine support for `U7-05` and `U7-06`.
2. Bar-chart construction, not only reading.
3. Congruent-triangle tick-mark diagrams.
4. Isosceles triangle properties.
5. Transformations / intuitive congruence.
