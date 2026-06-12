# Source-Fit Deep Audit — 2026-06-12

**Note:** this file was referenced by the task brief but did not exist in the
repository; it was created on branch `claude/source-fit-coordinate-chart-v1`
to record the finding and what was done about it.

## Critical finding (carried from the task brief, verified against sources)

The generator is stronger in **symbolic calculation** questions than in the
source-style **coordinate, graph, table, chart, drawing and interpretation**
tasks that dominate the 10 intake files:

- File 05 opens Grade-7 numeric with the coordinate system (Quadrant I:
  plot/connect points to a named shape, read coordinates, axis-parallel
  segment lengths, rectangle area on the grid incl. "area=…, find the
  coordinate") — **no engine covered it** before this branch.
- File 06 builds the uncertainty domain around representations: bar chart,
  double bar chart, pie chart, pictogram, frequency table, misleading graphs
  (patterns U-02/U-03 construct/read bar chart) — engines used tables only;
  **no chart visual existed**.
- PATTERN_INDEX lists N7-01/N7-02 with visual `coordinate_system_q1` and
  U7-02 with visual `bar_chart` — neither visual helper existed.

## What this branch adds (all source-mapped)

| Addition | Where | Source evidence |
|---|---|---|
| Quadrant-I coordinate grid SVG (axes, ticks, labeled points, polygon/polyline, highlighted segment, rectangle) | `generator/engine/diagrams.js` → `E.coordinateGridSvg` | File 05 §N7-01; PATTERN_INDEX N7-01/N7-02 (`coordinate_system_q1`) |
| Bar chart SVG (3–6 Hebrew categories, y from zero, optional values, RTL category order) | `generator/engine/diagrams.js` → `E.barChartSvg` | File 06 patterns U-02/U-03 (`bar_chart`) |
| **N7-01-ENGINE** מערכת צירים — רביע ראשון: families `plot_and_shape` (incl. the source rhombus A(4,1)B(2,3)C(4,5)D(6,3) family), `read_coordinate`, `segment_length_axis_parallel`, `rectangle_area_on_grid` (+ challenge: missing vertex / area→coordinate) | `generator/engine/pilot-n7-01.js` | File 05 §N7-01 examples; PATTERN_INDEX N7-01/N7-02; CURRICULUM_MAP N7-01/N7-07 |
| `bar_chart_read` family (read value / highest-lowest / total) | `generator/engine/pilot-u7-01.js` | File 06 pattern U-03 verbatim template |

Misconceptions implemented as distractors/mistake-prompts, per the brief and
file 05/06: swapped (x,y); counting grid points instead of intervals (len+1);
adding coordinates instead of subtracting; area vs perimeter; reading the
neighboring bar; "tallest = first/total" without checking the scale.

## Remaining source-fit gaps (honest, still open)

- Four-quadrant coordinate work (file 05, Grade-7 round 2) — not yet built.
- Pie chart, pictogram, double-bar chart, misleading-graph critique (file 06,
  patterns U-06 and the critical-reading strand) — not yet built.
- Linear-function graph READING tasks beyond A8-02's drawn graphs (file 02:
  interpret a given graph, rate-of-change stories) — partial.
- Sequences→expression with drawings (file 01, A7-02 curricular round 1) —
  text-only today.
- Compare-groups relative-frequency trap (pattern U-05) exists in U8-02's
  compare family in table form; a double-bar-chart visual version is open.

## Verdict

Coordinate + bar-chart strands are now represented with real engines and real
visuals, mapped line-by-line to files 05/06. The representation-vs-symbolic
balance is improved but NOT closed; the gaps above are the next priorities.
