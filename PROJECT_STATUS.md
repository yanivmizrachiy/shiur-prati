# Project Status — Targilim תרגילים

**Last updated:** 2026-06-11

## Product target

Smart Hebrew math exercise generator for Grades 7–8 only.

Removed from active scope:

- Grade 9.
- Worksheet / booklet / PDF workbook mode.

Future work focuses only on generator intelligence: source-bound patterns, dynamic data, unknown switching, Hebrew wording variation, real question types, real difficulty, premium SVG when useful, KaTeX math writing, and preserved export/copy/PNG/print.

---

## Phase status

| Phase | Status |
|---|---|
| Source learning | ✅ Done |
| Phase 1 audit | ✅ Done |
| Phase 2 generator MVP | ✅ Done |
| Live basic deployment | ✅ Passed |
| Phase 2 full browser batch | ✅ Passed after readiness-check fix |
| Obsolete workflow cleanup | ✅ Done |
| Verification hardening | ✅ Done |
| Rules sync / anti-duplication guard | ✅ Done |
| True generator vision captured in repo rules | ✅ Done |
| Phase 3A true engine topics | Code ✅ — G7-03-ENGINE, N8-01-ENGINE, N8-02-ENGINE, N8-03-ENGINE, N8-04-ENGINE, and N8-05-ENGINE exist; Wave 1 passed local static/runtime harness; browser/live verification pending for Wave 1 |
| Phase 3A engine.css | ✅ Added |
| Phase 3A dedicated live workflow | ✅ Added |
| Phase 3A static audit automation | ✅ Added — local run PASS |
| Pages hardening | ✅ Done |
| Legacy archive | ✅ Done |
| Grade 9 generator | 🔒 Locked — needs real example question sources |
| Worksheet/booklet mode | 🚫 Out of scope — do not build unless Yaniv explicitly reopens it |
| Analytics | 🔲 Deferred |

---

## External URL

https://yanivmizrachiy.github.io/targilim/

## Static health endpoint

https://yanivmizrachiy.github.io/targilim/site-health.json

---

## Latest local Phase 3A verification

Verified locally on 2026-06-11:

| Check | Result |
|---|---|
| `node tools/verify-phase3a-static.mjs` | PASS ✅ |
| `node tools/verify-phase2-static.mjs` | PASS ✅ |
| Wave 1 engine runtime harness | PASS ✅ — `N8-01-ENGINE`, `N8-02-ENGINE`, and `N8-05-ENGINE` generated 36 difficulty/type combinations plus adapter/export markup checks |
| Wave 1 browser/live verification | Pending ⚠️ — not completed in this run |

Previous local browser verification from 2026-06-10 remains recorded for `G7-03-ENGINE`, `N8-03-ENGINE`, and `N8-04-ENGINE`.

Conclusion: Phase 2 remains statically verified. ALL 25 ENGINE TOPICS EXIST IN CODE — Stage 2A (5 geometry), Stage 2B (5 numeric + 3 algebra grade 7), Stage 2C (2 grade-7 uncertainty + 2 grade-8 algebra + 2 grade-8 uncertainty) completed 2026-06-11. Runtime harness: 6840 generations (19 new engines × 3 difficulties × 4 question types × 30 runs) — 0 failures. Live ✅ pending verify-phase3a.yml browser run. Wave 1 adds `N8-01-ENGINE`, `N8-02-ENGINE`, and `N8-05-ENGINE` with source-bound template families, dynamic data, unknown switching, Hebrew wording variation, real question types, real difficulty behavior, dynamic SVG where relevant, and preserved legacy topics. Browser/live verification is still required before marking the Wave 1 topics live.

---

## Architecture

- `generator/index.html` — modular loader, mobile viewport, theme color, Phase 3A engine panel and engine script loading.
- `generator/site-health.json` — static Pages health endpoint independent of JavaScript.
- `generator/core.js` — base registry/router/renderCard with Grade 9 locked-notice UI.
- `generator/export.js` — copy-as-image / PNG / print.
- `generator/geo.js` — base geometry slices.
- `generator/algebra.js` — base algebra slices.
- `generator/numeric.js` — base numeric slices.
- `generator/stats.js` — base uncertainty/statistics slices.
- `generator/phase2-loader.js` — loads Phase 2 slice modules.
- `generator/.nojekyll` — GitHub Pages artifact hardening marker.
- `generator/style.css` — premium mobile-first RTL styles.
- `generator/engine/engine.css` — Phase 3A engine-specific UI styles.
- `generator/engine/schema.js` — Phase 3A engine marker/schema notes.
- `generator/engine/random.js` — Phase 3A random utilities.
- `generator/engine/validators.js` — Phase 3A validation helpers.
- `generator/engine/themes.js` — Phase 3A visual theme tokens.
- `generator/engine/diagrams.js` — Phase 3A dynamic SVG builders.
- `generator/engine/question-types.js` — Phase 3A question type renderers.
- `generator/engine/pilot-g7-03.js` — Phase 3A Pythagoras engine pilot.
- `generator/engine/pilot-n8-01.js` — Phase 3A ratio engine topic.
- `generator/engine/pilot-n8-02.js` — Phase 3A proportion engine topic.
- `generator/engine/pilot-n8-03.js` — Phase 3A scale engine topic.
- `generator/engine/pilot-n8-04.js` — Phase 3A percentages engine pilot.
- `generator/engine/pilot-n8-05.js` — Phase 3A dynamic-percentages engine topic.
- `generator/engine/pattern-engine.js` — Phase 3A engine registration/render adapter.

---

## Verification assets

- `tools/verify-phase2-static.mjs` — strict repository static verifier.
- `tools/verify-phase3a-static.mjs` — fast Phase 3A structural audit.
- `.github/workflows/verify-phase2-static.yml` — static CI verification.
- `.github/workflows/pages-healthcheck.yml` — public Pages healthcheck.
- `.github/workflows/verify-phase2-batch.yml` — full 25-slice browser/live verification.
- `.github/workflows/verify-generator-live-report.yml` — live report workflow for generator topics.
- `.github/workflows/verify-phase3a.yml` — dedicated Phase 3A live workflow.
- `.github/workflows/verify-phase3a-static.yml` — dedicated Phase 3A static audit workflow.

---

## Status codes

- `Code ✅` — generator code exists and is registered.
- `Live ⚠️` — not yet live/browser verified in the latest relevant batch.
- `Live ✅` — verified by browser/workflow/manual live test.
- `🔒 Locked` — intentionally blocked because source examples are missing.

---

## Active generator slices (25)

G7-01 Live ⚠️
G7-02 Live ⚠️
G7-03 ✅
G7-04 ✅
N7-03 Live ⚠️
N7-04 Live ⚠️
N7-05 Live ⚠️
N7-06 ✅
N7-07 Live ⚠️
A7-01 Live ⚠️
A7-02 Live ⚠️
A7-03 ✅
U7-01 Live ⚠️
U7-02 Live ⚠️
G8-01 Live ⚠️
G8-04 Live ⚠️
N8-01 Live ⚠️
N8-02 Live ⚠️
N8-03 Live ⚠️
N8-04 ✅
N8-05 ✅
A8-02 Live ⚠️
A8-03 Live ⚠️
U8-01 ✅
U8-02 Live ⚠️

---

## Phase 3A engine topics

| ID | Topic | Grade | Domain | Code | Live |
|---|---|---|---|---|---|
| G7-03-ENGINE | Pythagoras — true engine pilot | 7 | Geometry | ✅ | Local Live ✅ |
| N8-01-ENGINE | Ratio — true engine topic | 8 | Numeric | ✅ | ⚠️ |
| N8-02-ENGINE | Proportion — true engine topic | 8 | Numeric | ✅ | ⚠️ |
| N8-03-ENGINE | Scale — true engine topic | 8 | Numeric | ✅ | Local Live ✅ |
| N8-04-ENGINE | Static percentages — engine pilot | 8 | Numeric | ✅ | Local Live ✅ |
| N8-05-ENGINE | Dynamic percentages — true engine topic | 8 | Numeric | ✅ | ⚠️ |
| G7-01-ENGINE | Rectangle and box — true engine topic | 7 | Geometry | ✅ | ⚠️ |
| G7-02-ENGINE | Flat shape areas — true engine topic | 7 | Geometry | ✅ | ⚠️ |
| G7-04-ENGINE | Missing angle — true engine topic | 7 | Geometry | ✅ | ⚠️ |
| G8-01-ENGINE | Circle circumference and area — true engine topic | 8 | Geometry | ✅ | ⚠️ |
| G8-04-ENGINE | Triangle similarity — true engine topic | 8 | Geometry | ✅ | ⚠️ |
| N7-03-ENGINE | Negative numbers on number line | 7 | Numeric | ✅ | ⚠️ |
| N7-04-ENGINE | Signed addition/subtraction | 7 | Numeric | ✅ | ⚠️ |
| N7-05-ENGINE | Signed multiplication/division | 7 | Numeric | ✅ | ⚠️ |
| N7-06-ENGINE | Powers (−a)ⁿ vs −aⁿ | 7 | Numeric | ✅ | ⚠️ |
| N7-07-ENGINE | Square root exact/estimation | 7 | Numeric | ✅ | ⚠️ |
| A7-01-ENGINE | Algebraic expressions | 7 | Algebra | ✅ | ⚠️ |
| A7-02-ENGINE | Substitution in expression | 7 | Algebra | ✅ | ⚠️ |
| A7-03-ENGINE | First-degree equations | 7 | Algebra | ✅ | ⚠️ |
| U7-01-ENGINE | Frequency table | 7 | Uncertainty | ✅ | ⚠️ |
| U7-02-ENGINE | Basic probability | 7 | Uncertainty | ✅ | ⚠️ |
| A8-02-ENGINE | Slope and line equation | 8 | Algebra | ✅ | ⚠️ |
| A8-03-ENGINE | Systems of equations | 8 | Algebra | ✅ | ⚠️ |
| U8-01-ENGINE | Mean, median, range | 8 | Uncertainty | ✅ | ⚠️ |
| U8-02-ENGINE | Probability from table | 8 | Uncertainty | ✅ | ⚠️ |


## Stage 2A geometry engines (2026-06-11)

Added in code, pending live browser verification:
- `G7-01-ENGINE` — families: rect_area, rect_perimeter, rect_missing_side_area, rect_missing_side_perimeter, box_volume, box_missing_dim. SVG: dynamic rectangle and cuboid.
- `G7-02-ENGINE` — families: tri_area, para_area, trap_area, tri_missing_height. SVG: triangle/parallelogram/trapezoid with dashed height.
- `G7-04-ENGINE` — families: missing_angle, possible_triangle (validity check). SVG: triangle with dynamic angle labels, unknown highlighted.
- `G8-01-ENGINE` — families: circ_from_radius, area_from_radius, circ_from_diameter, radius_from_circ, formula_distinction. Exact π answers plus decimal approximation. SVG: circle with radius/diameter.
- `G8-04-ENGINE` — families: scale_factor, corresponding_side, is_similar. SVG: paired similar triangles.

All five support open / mcq / true-false / mistake question types and basic / standard / challenge difficulty. Runtime harness: 1800 generations (5 engines × 3 difficulties × 4 types × 30 runs), 0 failures, MCQ always exactly one correct choice.

Capabilities implemented in `G7-03-ENGINE`:

- dynamic Pythagorean triples;
- unknown switching: leg or hypotenuse;
- basic/standard/challenge difficulty behavior;
- question types: open, multiple choice, true/false, identify mistake;
- dynamic right-triangle SVG;
- dynamic rectangle-diagonal SVG;
- KaTeX-compatible mathematical solution steps;
- existing export/PNG/print buttons preserved through the existing export pipeline.

Capabilities implemented in `N8-04-ENGINE`:

- percent of a number;
- find the whole from a percentage;
- find the percentage from part/whole;
- basic/standard/challenge difficulty behavior;
- question types: open, multiple choice, true/false, identify mistake;
- KaTeX-compatible mathematical solution steps;
- existing export/PNG/print buttons preserved through the existing export pipeline.

Capabilities implemented in `N8-01-ENGINE`:

- source-bound ratio template families: simplify, divide by ratio, find missing part;
- dynamic safe parameter sets;
- unknown switching across simplified ratio, distributed shares, and missing part;
- basic/standard/challenge difficulty behavior;
- question types: open, multiple choice, true/false, identify mistake;
- dynamic ratio-bar SVG;
- KaTeX-compatible mathematical solution steps;
- existing export/PNG/print buttons preserved through the existing export pipeline.

Capabilities implemented in `N8-02-ENGINE`:

- source-bound proportion template families: missing value, direct-rate use, proportionality check;
- dynamic safe parameter sets;
- unknown switching across numerator, denominator, rate result, and verification;
- basic/standard/challenge difficulty behavior;
- question types: open, multiple choice, true/false, identify mistake;
- dynamic proportion-table SVG;
- KaTeX-compatible mathematical solution steps;
- existing export/PNG/print buttons preserved through the existing export pipeline.

Capabilities implemented in `N8-03-ENGINE`:

- source-bound scale template families;
- find real distance from map/drawing distance;
- find map/drawing distance from real distance;
- find the scale factor from map and real distances;
- basic/standard/challenge difficulty behavior;
- question types: open, multiple choice, true/false, identify mistake;
- dynamic map/scale SVG;
- KaTeX-compatible mathematical solution steps;
- existing export/PNG/print buttons preserved through the existing export pipeline.

Capabilities implemented in `N8-05-ENGINE`:

- source-bound dynamic-percentage template families: increase, decrease, original value, two-step change;
- dynamic safe parameter sets;
- unknown switching across final value and original value;
- basic/standard/challenge difficulty behavior;
- question types: open, multiple choice, true/false, identify mistake;
- dynamic percent-change SVG;
- KaTeX-compatible mathematical solution steps;
- existing export/PNG/print buttons preserved through the existing export pipeline.

---

## Current honest status

The public external link is reachable. Phase 2 static verifier and full browser batch pass after the readiness-check fix. The generator has 25 code-active legacy slices. Phase 3A includes six engine topics: `G7-03-ENGINE`, `N8-01-ENGINE`, `N8-02-ENGINE`, `N8-03-ENGINE`, `N8-04-ENGINE`, and `N8-05-ENGINE`. The three Wave 1 topics passed local static/runtime verification on 2026-06-11 and still need browser/live verification.

The project direction is **smart generator only**.

Do not start worksheet/booklet/PDF workbook features.

---

## Next required action

Continue generator intelligence only:

1. Convert additional legacy topics into true engine topics.
2. Add source-bound template families.
3. Add dynamic data and unknown switching.
4. Add real question types and real difficulty behavior.
5. Preserve export/copy/PNG/print.
