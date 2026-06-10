# Project Status — Targilim תרגילים
**Last updated:** 2026-06-10

## Phase status
| Phase | Status |
|---|---|
| 10 source PDFs + official curriculum | ✅ learned |
| Phase 1: Audit + source learning | ✅ Done |
| Phase 2: Archive + KB + generator MVP | ✅ Done |
| Phase 2 continued: slice expansion | 🔄 Active |
| Delta repair: weak slices + verification | ✅ Done |
| Premium mobile-first UI redesign | ⚠️ Applied — pending live visual verification |
| Pages hardening | ✅ Done |
| Legacy archive | ✅ Done |
| Grade 9 generator | 🔒 Locked — needs real example question sources |
| Analytics | 🔲 Deferred |

## External URL
https://yanivmizrachiy.github.io/targilim/

## Architecture
- generator/index.html — modular loader, mobile viewport, theme color
- generator/core.js — base registry/router/renderCard with `qmeta` class for premium card header styling
- generator/export.js — copy-as-image / PNG / print
- generator/geo.js — base geometry slices
- generator/algebra.js — base algebra slices
- generator/numeric.js — base numeric slices
- generator/stats.js — base uncertainty/statistics slices
- generator/phase2-loader.js — loads Phase 2 slice modules
- generator/.nojekyll — GitHub Pages artifact hardening marker
- generator/style.css — premium mobile-first RTL styles

## Deployment
- .github/workflows/deploy-pages.yml deploys the `generator/` folder through GitHub Actions Pages.
- The workflow uses `actions/configure-pages`, `actions/upload-pages-artifact` with `path: "generator"`, and `actions/deploy-pages`.
- A `.nojekyll` marker was added to the generator artifact to harden Pages serving and trigger a clean redeploy.

## Verification assets
- tools/verify-phase2-static.mjs — strict repository static verifier, including non-stub Phase 2 file-size guard
- .github/workflows/verify-phase2-static.yml — static CI verification
- .github/workflows/pages-healthcheck.yml — lightweight public Pages HTTP healthcheck with retries
- .github/workflows/verify-phase2-batch.yml — browser/live-style verification against the public Pages URL; fails clearly on 403/404, waits for async loader registration, checks selectors/cards/answers/export buttons, and checks SVG for geometry slices that require SVG

## Status codes
| Code | Meaning |
|---|---|
| Code ✅ | generator code exists and is loaded by the app |
| Live ⚠️ | not yet live/browser verified after this batch |
| Live ✅ | verified by browser/workflow/manual live test |
| 🔒 | locked because source examples are missing |

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

## Phase 2 batch files added
- generator/n7-03.js
- generator/n7-04.js
- generator/n7-05.js
- generator/n8-ratio.js
- generator/n8-03.js
- generator/u8-02.js
- generator/u7-01.js
- generator/a7-01.js
- generator/a7-02.js
- generator/a8-02.js
- generator/g8-01.js
- generator/g7-02.js
- generator/g7-01.js
- generator/a8-03.js
- generator/u7-02.js
- generator/g8-04.js
- generator/phase2-loader.js
- generator/.nojekyll

## Delta repairs completed after Claude audit
- N8-01 Ratio: expanded from one hardcoded question to 4 randomized variants.
- N8-03 Scale: expanded from one hardcoded question to 4 randomized variants.
- G8-04 Similarity: expanded from one hardcoded question to 4 randomized variants.
- A8-03 Systems: expanded from one hardcoded question to 4 randomized variants, with integer-safe examples only.
- Static verifier strengthened with a Phase 2 file-size guard to catch stub-like files.
- Browser workflow strengthened to fail clearly on Pages 403/404 and to check SVG for relevant geometry slices.
- Pages deployment hardened with `generator/.nojekyll` and a clean redeploy trigger.
- Lightweight Pages healthcheck workflow added for fast 200/403/404 diagnosis.

## Premium mobile-first UI redesign
- `generator/style.css` was fully replaced according to Claude's premium mobile-first RTL design system.
- `generator/index.html` received `<meta name="theme-color" content="#0f172a">` only.
- `generator/core.js` received only a minimal `class="qmeta"` markup alignment so Claude's premium CSS applies to the card metadata row.
- No generator logic, slice files, `export.js`, `phase2-loader.js`, sources, archive, or Grade 9 logic were changed.
- Status: applied in code, pending live visual verification.

## Current honest status
The generator has 25 code-active slices. The original MVP slices were previously browser/workflow verified. The Phase 2 batch is connected through `phase2-loader.js` and is code-active. Claude-identified weak slices were repaired. A strict static verifier now checks repository structure, all 25 slice IDs, non-stub Phase 2 files, and Grade 9 lock. The browser workflow now handles async loader registration and Pages 403/404 clearly. Pages deployment is through GitHub Actions artifact upload from `generator/`, `.nojekyll` was added to harden artifact serving, and a lightweight Pages healthcheck workflow was added. Claude's premium mobile-first CSS redesign was applied and the card metadata markup was aligned minimally. The batch still needs one end-of-batch browser/live and visual verification before marking the new slices Live ✅.

## Known caveat
`G8-04` is currently implemented as Hebrew text-only with 4 variants. It is code-active and student-facing in Hebrew, but SVG can be added later if needed.

## Next required action
Run final end-of-batch verification on the public URL. Do not add more content slices before confirming the Phase 2 batch loads and the selectors contain the new topics.
