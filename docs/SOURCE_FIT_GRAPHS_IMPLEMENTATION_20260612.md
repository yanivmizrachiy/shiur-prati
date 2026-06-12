# Source-fit graph implementation — 2026-06-12

## What was added

Two more source-backed engines were added after the coordinate and relative-frequency sprint.

## Commits

- `9d84a10` — `feat: add source-backed applied graph engines`
- `8a67e98` — `chore: load source-fit graph engines`

## Files changed

### Added

`generator/engine/source-fit-graphs.js`

### Updated

`generator/index.html`

The page now loads the graph extension after `source-fit-extensions.js` and before `exercise-set.js`:

`engine/source-fit-graphs.js?v=20260612-source-fit-2`

## New engines

### `A8-01-ENGINE` — גרפים יישומיים ופונקציות

Source basis:

- File 02: grade 8 algebra curriculum.
- File 08: algebra principles grades 7–8.
- Pattern index: `A8-01` applied graphs.

Question families:

1. Fuel-cost graph reading.
2. Heating-liquid graph/rate of change.
3. Linear rule/table value substitution.
4. Function identification.

Visuals:

- Applied line graph SVG.

Supported formats:

- Open question.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode through exercise-set.

### `U7-04-ENGINE` — קריאה מתרשים עמודות

Source basis:

- File 06: uncertainty examples.
- Pattern U-03: read from bar chart.

Question families:

1. Read highest category.
2. Compute total from all bars.
3. Detect the mistake of treating the highest bar as the total.

Visuals:

- Bar-chart SVG.

Supported formats:

- Open question.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode through exercise-set.

## Current source-fit progress

Implemented source-backed visual clusters so far:

1. Coordinate system Q1.
2. Relative-frequency group comparison.
3. Applied graphs and function identification.
4. Bar-chart reading.

Still pending:

1. Bar-chart construction.
2. Pie chart construction.
3. Misleading graph critique.
4. Cylinder/net.
5. Congruence / tick-mark diagrams.
6. Parallel-line angle diagrams.
