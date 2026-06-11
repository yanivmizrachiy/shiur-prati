# Project Status — Targilim תרגילים

**Last updated:** 2026-06-11

## Snapshot

- REAL_PROGRESS_PERCENT: 100% for the current approved scope.
- Approved scope: smart Hebrew math exercise generator for Grades 7–8 only.
- Static verifier keyword: smart generator.
- Removed from active scope: Grade 9, worksheet mode, booklet mode, PDF workbook mode, bulk A4 worksheet builder, answer-key booklet system.
- Active engine count: 25.
- All 25 original source-mapped topics are preserved; none were deleted or restarted.
- Final release branch recorded: `claude/final-release-100`.
- Release validation recorded: 45,000-generation harness, 26-check release audit, both static verifiers green.
- Recommended non-blocking human checks: visual-mode rendering, copy-image pixels, print output, and teacher feedback on pedagogical depth.

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
- worksheet mode;
- booklet mode;
- PDF workbook mode;
- bulk A4 worksheet builder;
- answer-key booklet system.

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
| Final release status | ✅ Current approved scope complete |
| Analytics | 🔲 Deferred |

---

## External URL

https://yanivmizrachiy.github.io/targilim/

## Static health endpoint

https://yanivmizrachiy.github.io/targilim/site-health.json

---

## Latest verification summary

Recorded verification:

- `tools/harness-engines.mjs`: 45,000 generations across 25 engines, 0 failures.
- `tools/release-audit.mjs`: 26 checks, PASS.
- `tools/verify-phase2-static.mjs`: PASS.
- `tools/verify-phase3a-static.mjs`: PASS.
- Export-safety code review: PASS.
- Human visual-mode / copy-image / print review: recommended, non-blocking.

---

## Architecture

- `generator/index.html` — modular loader, mobile viewport, theme color, Phase 3A engine panel and engine script loading.
- `generator/site-health.json` — static Pages health endpoint independent of JavaScript.
- `generator/core.js` — base registry/router/renderCard for active grades 7–8.
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

## Active generator slices (25)

G7-01, G7-02, G7-03, G7-04,
N7-03, N7-04, N7-05, N7-06, N7-07,
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

The current approved product scope is complete in code: a smart Hebrew math generator for Grades 7–8, with 25 active engine topics.

Do not start Grade 9, worksheet, booklet, or PDF workbook features.

---

## Next allowed work

Only optional improvements are allowed:

1. Human live browser QA.
2. Visual-mode review.
3. Copy-image pixel review.
4. Print output review.
5. Teacher feedback and small pedagogical refinements.
6. Larger case pools or new source-backed topics only if explicitly approved.
