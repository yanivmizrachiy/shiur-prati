# Project Status — Targilim תרגילים

**Last updated:** 2026-06-12

## Snapshot

- REAL_PROGRESS_PERCENT: 80% toward the full teacher-facing product (the previous "100%" referred to a narrower single-question scope; the runtime was honestly re-baselined).
- Approved scope: smart Hebrew math exercise generator for Grades 7–8 only, source-bound to the 10 intake PDFs.
- Static verifier keyword: smart generator.
- Removed from active scope: Grade 9, booklet mode, PDF workbook mode, bulk A4 worksheet builder, answer-key booklet system.
- Scope clarification (2026-06-12): a **browser-based multi-exercise set generator** (count control, מעורב, numbered set, answer key, browser print) is in scope and is now implemented. This is not a PDF workbook/booklet product.
- Active engine count: 26 (25 original + N7-01 coordinate-system engine added 2026-06-12 per source file 05).
- All 25 original source-mapped topics are preserved; none were deleted or restarted.
- New runtime layer (branch `fix/deep-real-generator-upgrade-v1`): exercise-set generation on top of the existing 25 engines — מספר תרגילים (1/5/10/15/20), סוג שאלות including מעורב, numbered set renderer, מפתח תשובות toggle, browser print, duplicate avoidance. Single-card mode (count=1) with copy/PNG/print preserved.
- True/false balance fixed in ALL 25 engines (measured 25–56% true; enforced by tools/verify-variety.mjs). Four real truth-mislabeling bugs fixed on the way (A7-03, G7-01, U8-01, N8-05 edge cases).
- RTL/math display fixed at the root: KaTeX forced LTR (equations no longer mirror on the RTL page), SVG labels use plaintext bidi (negative tick labels render correctly).
- Worksheet ergonomics: ruled writing space per exercise (by question type), print-only name/date line, A4 page rule.
- Source-grounded dynamic case generation in N7-03/N7-04/N7-05/N7-06/A7-02 (ranges from learning file 05 / PATTERN_INDEX); diagram orientation/aspect variation in diagrams.js.
- Round 3 (textbook quality): central E.fmt math layer (∢B=80^\circ, no raw math in Hebrew prose — scanned over 7,500 generations); triangleAnglesSvg rebuilt angle-faithful with arcs/bisector labels/vertex letters; G7-04 deep upgrade (12 phrasings, classify family, 50/50 unique questions+SVGs); professional slate palette; per-type answer areas (דרך/תשובה, נכון-שגוי+תיקון, הטעות+תיקון, נימוק); print is flat textbook layout with name/date line and answer key on its own page. Pre-existing N8-01 "undefined:NaN" MCQ filler bug found and fixed.
- New tools: verify-math-bidi-quality.mjs, verify-worksheet-print-quality.mjs, verify-geometry-diagram-quality.mjs.
- Source-fit sprints (2026-06-12): N7-01 coordinate engine + bar-chart reading (v1); compare_groups_relative_frequency in U7-01 with guaranteed U-05 trap + E.doubleBarSvg, and applied_graph_read in A8-02 (fuel/heating per file 02) with Hebrew-labeled applied graphs (v2).
- Release validation recorded: 45,000-generation harness, 26-check release audit, both static verifiers green, plus tools/verify-real-generator-runtime.mjs (40 checks incl. VM runtime smoke) green.
- Required before claiming more: human teacher QA of generated sets, answer-key print check on a real device, and source-citation review for G7-03 / N8-01..05.

---

## Product target

The product target is a **smart Hebrew math exercise generator**.

It is not a Grade 9 generator, not a worksheet builder, not a booklet product, and not a PDF workbook system.

Future work, if any, should focus only on generator intelligence:

- source-bound template/pattern families;
- dynamic data generation;
- unknown switching;
- Hebrew wording variation;
- multiple real question types;
- real difficulty behavior;
- premium SVG graphics where useful;
- strong KaTeX-compatible mathematical writing;
- preserved export/copy/PNG/print;
- no fake controls;
- no demo-only UI.

---

## Explicitly removed from active scope

These are **not backlog items** and must not be treated as pending work:

- Grade 9;
- booklet mode;
- PDF workbook mode;
- bulk A4 worksheet builder;
- answer-key booklet system.

Note: "worksheet mode" previously appeared here and was interpreted too broadly.
Per the 2026-06-12 scope correction, the in-browser exercise-set generator
(count, mixed types, answer key, browser print) is in scope; a separate
PDF/booklet workbook product remains out of scope.

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
| Phase 3A true engine topics | ✅ Done in code for all 25 approved topics |
| Visual mode | ✅ Done in code; human visual review recommended |
| Final QA polish | ✅ Done |
| Automated release hardening | ✅ Done |
| Final release status (single-question scope) | ✅ Complete for that narrower scope |
| Exercise-set runtime layer (count, מעורב, answer key, print) | ✅ Done in code; Live ⚠️ human QA pending |
| TF truth-balance fixes (all 25 engines) | ✅ Done; enforced by verify-variety |
| RTL/math display fix (KaTeX LTR, SVG plaintext bidi) | ✅ Done; verified live |
| Worksheet writing space + A4 print polish | ✅ Done in code; paper check pending |
| Dynamic source-range case generation (N7-03/04/05/06, A7-02) | ✅ Done |
| Diagram orientation/aspect variation | ✅ Done; verified live (10/10 distinct) |
| Deeper source-bound engine expansion | 🔲 Open (see NEEDS SOURCE REVIEW list) |
| Analytics | 🔲 Deferred |

---

## External URL

https://yanivmizrachiy.github.io/targilim/

## Static health endpoint

https://yanivmizrachiy.github.io/targilim/site-health.json

---

## Latest verification summary

Recorded verification:

- `tools/harness-engines.mjs`: 45,000 generations across 25 engines, 0 failures (re-run 2026-06-12 after TF fixes).
- `tools/release-audit.mjs`: 26 checks, PASS.
- `tools/verify-phase2-static.mjs`: PASS.
- `tools/verify-phase3a-static.mjs`: PASS.
- `tools/verify-real-generator-runtime.mjs`: 40 checks incl. VM smoke of set generation (engine topic mixed×10/×20, legacy topic ×5, count=1 compatibility), PASS.
- `tools/verify-variety.mjs`: per-engine unique-question/SVG floors + TF balance 25–75%, PASS (8 consecutive runs).
- Export-safety code review: PASS.
- Human visual-mode / copy-image / print / generated-set review: required before raising progress.

---

## Architecture

- `generator/index.html` — modular loader, mobile viewport, theme color, Phase 3A engine panel and engine script loading.
- `generator/site-health.json` — static Pages health endpoint independent of JavaScript.
- `generator/core.js` — base registry/router/renderCard for active grades 7–8; dispatches to set mode when מספר תרגילים > 1.
- `generator/exercise-set.js` — exercise-set runtime layer: buildTypePlan (מעורב), generateSet, renderExerciseSet, answer-key toggle, print.
- `generator/export.js` — copy-as-image / PNG / print.
- `generator/geo.js` — base geometry slices.
- `generator/algebra.js` — base algebra slices.
- `generator/numeric.js` — base numeric slices.
- `generator/stats.js` — base uncertainty/statistics slices.
- `generator/phase2-loader.js` — loads Phase 2 slice modules.
- `generator/.nojekyll` — GitHub Pages artifact hardening marker.
- `generator/style.css` — premium mobile-first RTL styles.
- `generator/engine/` — true generator engine files, pilots, topic registry, adapters, diagrams, question types, validation and visual themes.

---

## Verification assets

- `tools/verify-phase2-static.mjs`
- `tools/verify-phase3a-static.mjs`
- `tools/harness-engines.mjs`
- `tools/release-audit.mjs`
- `tools/verify-real-generator-runtime.mjs`
- `tools/verify-variety.mjs`
- `.github/workflows/verify-phase2-static.yml`
- `.github/workflows/pages-healthcheck.yml`
- `.github/workflows/verify-phase2-batch.yml`
- `.github/workflows/verify-generator-live-report.yml`
- `.github/workflows/verify-phase3a.yml`
- `.github/workflows/verify-phase3a-static.yml`

---

## Status codes

- `Code ✅` — generator code exists and is registered.
- `Live ⚠️` — not yet live/browser verified in the latest relevant browser batch.
- `Live ✅` — verified by browser/workflow/manual live test.
- `Local Live ✅` — verified locally by browser test, separate from public GitHub Actions.

---

## Active generator slices (26)

G7-01, G7-02, G7-03, G7-04,
N7-01, N7-03, N7-04, N7-05, N7-06, N7-07,
A7-01, A7-02, A7-03,
U7-01, U7-02,
G8-01, G8-04,
N8-01, N8-02, N8-03, N8-04, N8-05,
A8-02, A8-03,
U8-01, U8-02.

---

## Active engine topics (25)

| ID | Topic | Grade | Domain | Code |
|---|---|---|---|---|
| G7-01-ENGINE | Rectangle and box | 7 | Geometry | ✅ |
| N7-01-ENGINE | Coordinate system Quadrant I | 7 | Numeric | ✅ |
| G7-02-ENGINE | Flat shape areas | 7 | Geometry | ✅ |
| G7-03-ENGINE | Pythagoras | 7 | Geometry | ✅ |
| G7-04-ENGINE | Missing angle | 7 | Geometry | ✅ |
| N7-03-ENGINE | Negative numbers on number line | 7 | Numeric | ✅ |
| N7-04-ENGINE | Signed addition/subtraction | 7 | Numeric | ✅ |
| N7-05-ENGINE | Signed multiplication/division | 7 | Numeric | ✅ |
| N7-06-ENGINE | Powers | 7 | Numeric | ✅ |
| N7-07-ENGINE | Square root | 7 | Numeric | ✅ |
| A7-01-ENGINE | Algebraic expressions | 7 | Algebra | ✅ |
| A7-02-ENGINE | Substitution | 7 | Algebra | ✅ |
| A7-03-ENGINE | First-degree equations | 7 | Algebra | ✅ |
| U7-01-ENGINE | Frequency table | 7 | Uncertainty | ✅ |
| U7-02-ENGINE | Basic probability | 7 | Uncertainty | ✅ |
| G8-01-ENGINE | Circle circumference and area | 8 | Geometry | ✅ |
| G8-04-ENGINE | Similarity / scale factor | 8 | Geometry | ✅ |
| N8-01-ENGINE | Ratio | 8 | Numeric | ✅ |
| N8-02-ENGINE | Proportion | 8 | Numeric | ✅ |
| N8-03-ENGINE | Scale | 8 | Numeric | ✅ |
| N8-04-ENGINE | Static percentages | 8 | Numeric | ✅ |
| N8-05-ENGINE | Dynamic percentages | 8 | Numeric | ✅ |
| A8-02-ENGINE | Slope and line equation | 8 | Algebra | ✅ |
| A8-03-ENGINE | Systems of equations | 8 | Algebra | ✅ |
| U8-01-ENGINE | Mean, median, range | 8 | Uncertainty | ✅ |
| U8-02-ENGINE | Probability from table | 8 | Uncertainty | ✅ |

---

## Current honest status

Previous runtime was a single-question generator (one card per click). Branch
`fix/deep-real-generator-upgrade-v1` adds the real browser-based exercise-set
layer on top of the existing 25 engines: exercise count, mixed question types,
numbered set, answer key, browser print. This is NOT a PDF workbook/booklet.

The 10 intake PDFs remain the content authority. Several engines still need
deeper source-based expansion (small case pools; 11 engines still have
always-false true/false; G7-03 and N8-01..05 lack per-file source citations).

This is not 100%. Human teacher QA of generated sets is still required.

Do not start Grade 9, booklet, or PDF workbook features.

---

## Next allowed work

1. Human live QA of the exercise-set flow on a real phone + a real printed A4.
2. Source-citation review for G7-03, N8-01..N8-05 (NEEDS SOURCE REVIEW) by
   re-reading the PDFs; expand geometry/uncertainty case pools from them.
3. Question-type support for legacy (non-engine) topics, or migrate them to engines.
4. Teacher feedback and pedagogical refinements (wording variety in geometry).
5. New source-backed topics only if explicitly approved.
