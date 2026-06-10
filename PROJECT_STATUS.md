# Project Status — Targilim תרגילים

**Last updated:** 2026-06-10

## Product target

The product target is a **smart Hebrew math exercise generator**.

It is **not** a booklet product, not a worksheet builder, and not a PDF workbook system.

All future work should focus on generator intelligence:

- source-bound template/pattern engine;
- many question variations per topic;
- dynamic data generation;
- unknown switching;
- Hebrew wording variation;
- multiple real question types;
- real difficulty levels;
- dynamic premium SVG graphics where relevant;
- strong KaTeX-compatible mathematical writing;
- export/copy/PNG/print preserved;
- no fake controls;
- no demo-only UI;
- no Grade 9 until real worked source examples exist.

---

## Phase status

| Phase | Status |
|---|---|
| 10 source PDFs + official curriculum | ✅ learned |
| Phase 1: Audit + source learning | ✅ Done |
| Phase 2: Archive + KB + generator MVP | ✅ Done |
| Phase 2 continued: slice expansion | ✅ Done |
| Delta repair: weak slices + verification | ✅ Done |
| Premium mobile-first UI redesign | ✅ Applied |
| Live basic deployment | ✅ Passed |
| Phase 2 full browser batch | ✅ Passed after readiness-check fix |
| Obsolete workflow cleanup | ✅ Done |
| Verification hardening | ✅ Done |
| Rules sync / anti-duplication guard | ✅ Done |
| True generator vision captured in repo rules | ✅ Done |
| Phase 3A true engine pilots | Local Live ✅ — G7-03-ENGINE and N8-04-ENGINE passed local Phase 3A browser verification; public Actions visible green on latest commit screenshot |
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

Verified from local Codex browser run on 2026-06-10 against `http://127.0.0.1`:

| Check | Result |
|---|---|
| `node tools/verify-phase3a-static.mjs` | PASS ✅ |
| `G7-03-ENGINE` browser generation | PASS ✅ — 12 difficulty/type combinations |
| `N8-04-ENGINE` browser generation | PASS ✅ — 12 difficulty/type combinations |
| Engine controls affect output | PASS ✅ — MCQ / true-false / mistake markup verified |
| Legacy `G7-03` | PASS ✅ |
| Legacy `N8-04` | PASS ✅ |
| Grade 9 locked notice | PASS ✅ |
| export buttons | PASS ✅ |
| mobile horizontal scroll | PASS ✅ — none detected at 390px viewport |
| browser console errors | PASS ✅ — none detected |

Conclusion: Phase 2 is live and verified. Phase 3A contains two locally browser-verified engine pilots. `G7-03-ENGINE` and `N8-04-ENGINE` passed local Phase 3A verification after the missing N8 engine script load and question-type control fidelity were fixed.

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
- `generator/engine/pilot-n8-04.js` — Phase 3A percentages engine pilot.
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

## Active generator slices (25)

| ID | Topic | Grade | Domain | Code | Live |
|---|---|---|---|---|---|
| G7-03 | Pythagoras — missing side | 7 | Geometry | ✅ | ✅ |
| G7-04 | Missing angle in triangle | 7 | Geometry | ✅ | ✅ |
| G7-01 | Rectangle and box | 7 | Geometry | ✅ | ⚠️ |
| G7-02 | Flat shape areas | 7 | Geometry | ✅ | ⚠️ |
| N7-03 | Negative numbers on number line | 7 | Numeric | ✅ | ⚠️ |
| N7-04 | Signed addition/subtraction | 7 | Numeric | ✅ | ⚠️ |
| N7-05 | Signed multiplication/division | 7 | Numeric | ✅ | ⚠️ |
| N7-06 | Powers: (−a)ⁿ vs −aⁿ | 7 | Numeric | ✅ | ✅ |
| N7-07 | Square root — exact and estimation | 7 | Numeric | ✅ | ⚠️ |
| A7-01 | Algebraic expressions | 7 | Algebra | ✅ | ⚠️ |
| A7-02 | Substitution in expression | 7 | Algebra | ✅ | ⚠️ |
| A7-03 | First-degree equations | 7 | Algebra | ✅ | ✅ |
| U7-01 | Frequency table | 7 | Uncertainty | ✅ | ⚠️ |
| U7-02 | Basic probability | 7 | Uncertainty | ✅ | ⚠️ |
| G8-01 | Circle circumference and area | 8 | Geometry | ✅ | ⚠️ |
| G8-04 | Similarity / triangle scale factor | 8 | Geometry | ✅ | ⚠️ |
| N8-01 | Ratio | 8 | Numeric | ✅ | ⚠️ |
| N8-02 | Proportion | 8 | Numeric | ✅ | ⚠️ |
| N8-03 | Scale | 8 | Numeric | ✅ | ⚠️ |
| N8-04 | Static percentages | 8 | Numeric | ✅ | ✅ |
| N8-05 | Dynamic percentages | 8 | Numeric | ✅ | ✅ |
| A8-02 | Slope and line equation | 8 | Algebra | ✅ | ⚠️ |
| A8-03 | Systems of equations | 8 | Algebra | ✅ | ⚠️ |
| U8-01 | Mean, median, range | 8 | Uncertainty | ✅ | ✅ |
| U8-02 | Basic probability | 8 | Uncertainty | ✅ | ⚠️ |

---

## Phase 3A engine topics

| ID | Topic | Grade | Domain | Code | Live |
|---|---|---|---|---|---|
| G7-03-ENGINE | Pythagoras — true engine pilot | 7 | Geometry | ✅ | Local Live ✅ |
| N8-04-ENGINE | Static percentages — engine pilot | 8 | Numeric | ✅ | Local Live ✅ |

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

---

## Current honest status

The public external link is reachable. Phase 2 static verifier and full browser batch pass after the readiness-check fix. The generator has 25 code-active legacy slices. Phase 3A includes two engine pilots: `G7-03-ENGINE` and `N8-04-ENGINE`. Both passed local static and browser verification on 2026-06-10.

The project direction is **smart generator only**.

Do not start worksheet/booklet/PDF workbook features.

---

## Next required action

Continue generator intelligence work only:

1. Convert additional legacy topics into true engine topics.
2. Add source-bound template families.
3. Add dynamic data and unknown switching.
4. Add Hebrew wording variation.
5. Add real question types.
6. Add real difficulty behavior.
7. Add premium SVG graphics where relevant.
8. Keep Grade 9 locked until real source examples exist.
9. Keep export/copy/PNG/print working.
