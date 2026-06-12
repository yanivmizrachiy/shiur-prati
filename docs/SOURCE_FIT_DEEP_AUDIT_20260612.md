# Source Fit Deep Audit — 2026-06-12

## Purpose

This audit checks whether the generator's current question engines and visuals fit the ten uploaded source files. It focuses on:

- question types found in the sources;
- required graphics and drawings;
- what the current engines already match;
- what is missing or too narrow;
- the highest-value source-backed improvement order.

This audit does **not** claim that the PDFs were re-OCRed now. It is based on the repository's source-learning notes, curriculum map, question-pattern index, source alignment map, and inspected engine files.

## Source files learned

| # | Source identity | Main role |
|---|---|---|
| 01 | Grade 7 algebra curriculum | expressions, equal expressions, equations, graph/table intro |
| 02 | Grade 8 algebra curriculum | applied graphs, functions, slope, inequalities, systems |
| 03 | Grade 7 pre-deductive geometry | angles, transformations, area, Pythagoras, 3D shapes |
| 04 | Grade 8 geometry | circle, cylinder, parallel lines, congruence, isosceles, similarity |
| 05 | Grade 7 numeric curriculum | coordinates, negative numbers, directed operations, powers, roots |
| 06 | Uncertainty examples | frequency tables, bar/pie charts, relative frequency, misleading graphs, probability |
| 07 | Numeric principles 7–8 | numeric scope and cross-topic reasoning |
| 08 | Algebra principles 7–8 | representations: verbal/algebraic/table/graph |
| 09 | Geometry principles 7–8 | visual reasoning and required diagrams |
| 10 | Grade 8 teaching sequence | priority/timing, not exercise examples |

## Source question-type taxonomy

The sources contain these recurring question types:

1. Open calculation questions.
2. Multi-part questions: א/ב/ג.
3. Completion / fill-in-blank questions.
4. Multiple choice.
5. True/false with explanation.
6. Identify-the-mistake / critique a student's work.
7. Match expression to verbal description.
8. Build equation from context.
9. Verify whether a value is a solution.
10. Estimate / reason without exact calculation.
11. Read from graph / table / diagram.
12. Construct table / graph / chart.
13. Draw or complete a geometric figure.
14. Explain or justify in words.
15. Compare groups by relative, not absolute, quantities.
16. Detect misleading graph representation.

Current generator support is strongest for open, MCQ, true/false, and mistake questions. It is weaker for matching, completion, graph/table construction, drawing tasks, misleading-graph critique, and multi-representation algebra.

## Source visual taxonomy

The source files require these visual types:

| Visual type | Source basis | Current status |
|---|---|---|
| number line | numeric negative numbers, roots, inequalities | present for negative numbers; inequality line not fully covered |
| coordinate system Q1 / 4 quadrants | numeric and algebra graph topics | major gap; source-backed topics exist but no active engine for N7-01/N7-02/A7-04/A8-01 |
| value table | algebra graph/function work | partial or missing; not a strong active generator behavior |
| linear graph | grade 8 slope/function | present in A8-02 |
| applied graph | Kinneret, fuel cost, Ferris wheel, heating liquid | major gap; not implemented as source-backed applied graph engine |
| right triangle | Pythagoras | present |
| angle diagram with arcs | grade 7 angle work | present for triangle angle sum; angle ordering/classification visuals need more coverage |
| polygon with height | area of triangle/parallelogram/trapezoid | present |
| 3D box | volume/surface area | present |
| circle with radius/diameter | circle area/circumference | present, but source also has central angles and point location relative to circle gaps |
| cylinder + net | grade 8 geometry | missing |
| congruent triangles with tick marks | grade 8 congruence | missing |
| similar triangles with ratio | grade 8 similarity | present |
| frequency table | uncertainty | present |
| bar chart | uncertainty | missing as active generator behavior |
| pie chart | uncertainty | missing |
| pictogram / double bar chart | uncertainty | missing |
| misleading graph | uncertainty critical reading | missing |

## Current fit by source file

### File 01 — Grade 7 Algebra

Source examples include fuel-price expressions, tower of cups, rectangle side relationships, two-variable cost expressions, matching expressions to descriptions, equal expressions, verifying solutions, identifying which equation has a given solution, and building equations from word problems.

Current fit:

- A7-01 is source-aligned for basic verbal expression, simplifying like terms, cup-tower, and rectangle perimeter/area patterns.
- A7-03 covers first-degree equations, checking and word-problem equation building.

Gaps:

- Matching expression to description is not a first-class engine family.
- Equal expressions / identities are underrepresented.
- Two-variable cost expressions are underrepresented.
- Graph/table work from A7-04 is not an active source-backed engine.

Priority action:

- Add A7 matching-expression family.
- Add A7 equal-expression/identity family.
- Add A7 graph-table intro engine later, tied to coordinate visuals.

### File 02 — Grade 8 Algebra

Source examples include fuel-cost graphs, Kinneret graph reading, domain interpretation, function identification, Ferris wheel graph, temperature conversion, heating-liquid rate, staircase slope, two-point slope, value-table completion, percentage equations, inequalities, and systems.

Current fit:

- A8-02 has slope from two points, value at x, rising/falling, equation from points, and a linear graph visual.
- A8-03 covers simple systems of equations.

Gaps:

- Applied graph reading is a major missing source pattern.
- Function identification is missing.
- Ferris wheel / Kinneret / real graph contexts are missing.
- Table completion is weak.
- Inequalities are missing.
- Equations with percentages are missing.
- Staircase/heating-liquid contextual slope should be added.

Priority action:

- Add A8 applied-graph engine before adding more abstract slope drills.
- Add function-identification and table-completion families.
- Add inequalities on number line.

### File 03 — Grade 7 Geometry

Source examples include identifying angle types, ordering angles, angle-size misconception independent of ray length, missing angle in triangle, translations/rotations, areas, composed area, side from area, Pythagoras, verify right triangle, perimeter after Pythagoras, coordinate Pythagoras, nets, volume, and surface area.

Current fit:

- G7-04 strongly covers triangle angle sum, possible triangle, and angle classification.
- G7-02 covers areas with polygon/height visuals.
- G7-03 covers Pythagoras side-finding, right-triangle verification, and rectangle diagonal.
- G7-01 covers rectangle/box volume/surface.

Gaps:

- Angle ordering / estimate angle / ray-length misconception is not fully covered.
- Transformations and intuitive congruence are missing.
- Coordinate-system Pythagoras is missing.
- Nets of cube/box are missing.
- More composed-area questions are needed.

Priority action:

- Add angle misconception/order family.
- Add net-identification for 3D box.
- Add coordinate Pythagoras once coordinate visuals exist.

### File 04 — Grade 8 Geometry

Source examples include wheel circumference, points on/inside/outside a circle, inscribed hexagon π approximation, central angles/arcs, cylinder surface/volume/net, parallel-line angles, congruence proofs, corresponding parts, isosceles triangle, similarity, area ratio, and real-world shadow similarity.

Current fit:

- G8-01 covers circle circumference/area, diameter, inverse radius, and formula distinction.
- G8-04 covers similarity ratio, corresponding side, is-similar, and area ratio.

Gaps:

- Circle point-location relative to center/radius is missing.
- Central angle / arc fraction is missing.
- Hexagon π approximation is missing.
- Cylinder and cylinder net are missing.
- Parallel lines angle work is missing.
- Congruence proof/corresponding-parts engine is missing.
- Isosceles triangle property is missing.
- Real-world shadow similarity is missing.

Priority action:

- Add G8-01 central-angle and point-location families.
- Add G8-04 shadow-similarity family.
- Add a separate G8 cylinder/net topic only if approved.

### File 05 — Grade 7 Numeric

Source examples include coordinate plotting in quadrant I, missing coordinate, rectangle area on coordinate system, negative number real-world contexts, opposite-number reasoning, directed add/sub including estimate and missing addend, multiplication/division sign rules, order of operations, powers distinction, square roots including two roots vs principal root, and side from square area.

Current fit:

- N7-03 covers ordering, comparing, opposite/absolute value, and placement with negative fractions.
- N7-04 covers directed add/sub with estimation and missing addend.
- N7-05 covers signed multiply/divide.
- N7-06 covers powers distinction.
- N7-07 covers square roots.

Gaps:

- Coordinate-system Q1 tasks N7-01/N7-02 are missing.
- Real-world negative-number context is underrepresented.
- Two-addend fill to fractional result is missing.
- Triple product and order-of-operations depth should be checked/expanded.
- Two roots versus principal square root needs stronger family support.

Priority action:

- Build coordinate-system engine first among numeric gaps.
- Add real-world negative-number context family.
- Add root concept family: two square roots vs √ symbol.

### File 06 — Uncertainty

Source examples include raw data → frequency table, bar chart construction, reading bar charts, relative frequency as fraction/decimal/percent, comparing groups by rate not count, pie charts, misleading graph critique, mean/median/range, effect of changes on measures, and probability.

Current fit:

- U7-01 covers frequency table reading, total, missing frequency, and relative frequency.
- U8-01 covers mean, median, range, and missing value from mean.
- U7-02/U8-02 cover probability basics/table probability.

Gaps:

- Raw-data → table construction is not fully implemented.
- Bar chart construction and reading are missing.
- Pie chart construction is missing.
- Compare two groups by relative frequency is missing.
- Misleading graph critique is missing.
- Effect of adding k to all values / changing one value is underrepresented.
- Pictogram and double bar chart are missing.

Priority action:

- Add compare-groups trap as a high-value source family.
- Add bar-chart read/construct visuals.
- Add misleading-graph critique later.

### File 07 — Numeric principles 7–8

This file confirms numeric scope and cross-topic expectations: critical thinking, justification, multiple solution routes, real-world connections, and error identification.

Current fit:

- The generator has mistake and TF modes across many numeric engines.

Gaps:

- Some numeric questions remain computational rather than reasoning-rich.
- Coordinate-system and real-world negative contexts remain missing.

Priority action:

- Do not add generic drills; add source-style reasoning/mistake families.

### File 08 — Algebra principles 7–8

This file requires movement between verbal, algebraic, table, and graph representations.

Current fit:

- A7/A8 engines include some verbal/algebraic representation.
- A8-02 has graph support.

Gaps:

- Table representation is weak.
- Graph-reading and graph-construction are not broad enough.
- Function identification is missing.

Priority action:

- Build representation-switching families: verbal ↔ expression ↔ table ↔ graph.

### File 09 — Geometry principles 7–8

This file emphasizes visual reasoning, physical-to-abstract development, and required diagrams.

Current fit:

- Several visuals exist: right triangle, triangle angles, area polygons, rectangle, box, circle, similarity.

Gaps:

- Missing visuals: cylinder/net, congruence tick marks, coordinate geometry, parallel-line angle diagrams, bar/pie style statistics charts.
- Some diagrams are computational aids but not construction/read-from-diagram tasks.

Priority action:

- Prioritize visuals that unlock source-backed missing topics, not decorative redesign.

### File 10 — Grade 8 teaching sequence

This file is scheduling and priority guidance, not a question source. It confirms that ratio/proportion/scale/percentages, relative frequency, functions, linear graphs/slope, systems, probability, similarity/congruence, and Pythagoras in 3D are important Grade 8 strands.

Current fit:

- Numeric grade 8 topics are present.
- Algebra slope and systems are partially present.
- Similarity is present.

Gaps:

- Functions/applied graphs, uncertainty graph-reading, congruence, and 3D Pythagoras/cylinder need future attention.

## Engine-to-source fit summary

| Area | Fit level | Reason |
|---|---|---|
| Grade 7 algebra core | Medium | A7-01/A7-03 strong; matching/equivalence/graph gaps remain |
| Grade 8 algebra | Medium-low | slope and systems exist; applied graphs/functions/inequalities missing |
| Grade 7 numeric | Medium | negative/directed/powers/roots exist; coordinates and some concept depth missing |
| Grade 8 numeric | Medium-high | ratio/proportion/scale/percentages present; needs source-citation review and richer contexts |
| Grade 7 geometry | Medium | angles/areas/Pythagoras/box present; transformations/nets/composed area gaps |
| Grade 8 geometry | Low-medium | circle/similarity present; cylinder/congruence/parallel/isoceles/central angle gaps |
| Uncertainty | Low-medium | tables/probability/mean-median-range present; charts/misleading graph/group comparison gaps |

## Highest-value source-backed backlog

### Priority 1 — unlock missing source visuals

1. `N7-01/N7-02 coordinate system` — plot/read points, segment length, area on axes.
2. `A7-04/A8-01 applied graph/table` — fuel, Kinneret, value tables, graph reading.
3. `U7 chart package` — bar chart read/construct, relative frequency comparison, misleading graph.

### Priority 2 — deepen currently present engines

4. `A7-01` — add matching expressions and two-variable cost expressions.
5. `A7-02/A7-03` — equal expressions, identities, solution verification variations.
6. `N7-07` — two roots vs principal root.
7. `G8-01` — central angles/arcs and point inside/outside circle.
8. `G8-04` — real-world shadow similarity.
9. `U8-01` — effect of adding k to every value and replacing one value.

### Priority 3 — larger geometry scope, only after approval

10. Cylinder + net.
11. Parallel lines angle diagrams.
12. Formal congruence/corresponding parts.
13. Isosceles triangle properties.
14. Transformations / intuitive congruence.

## Product-quality rule from this audit

Future source-backed improvements must not only add more random numbers. Each new family must include:

- source file reference;
- exact question type from the source;
- required visual if the source uses one;
- at least one misconception/distractor family;
- open + MCQ + TF + mistake behavior when pedagogically appropriate;
- difficulty behavior that changes mathematical thinking, not only text length.

## Automatic next build recommendation

The next safe build should not touch all 25 engines. It should add one source-backed missing visual cluster:

**Recommended sprint:** `source-fit-coordinate-and-chart-v1`

Scope:

1. Add coordinate-system SVG helper.
2. Add N7 coordinate topic engine for Q1 plotting/read/segment/area.
3. Add bar-chart SVG helper.
4. Add U7 compare-groups or bar-chart reading family.
5. Add tests to verify the new helpers and source-backed behavior.

This will address the biggest source mismatch: the uploaded source files contain many drawing/graph/chart tasks, while the current generator is stronger in symbolic/calculation tasks.
