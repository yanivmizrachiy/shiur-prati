# Project Status — Targilim תרגילים
**Last updated:** 2026-06-10

## Phase status
| Phase | Status |
|---|---|
| 10 source PDFs + official curriculum | ✅ learned |
| Phase 1: Audit + source learning | ✅ Done |
| Phase 2: Archive + KB + generator MVP | ✅ Done |
| Phase 2 continued: slice expansion | 🔄 Active |
| Legacy archive | ✅ Done |
| Grade 9 generator | 🔒 Locked — needs real example question sources |
| Analytics | 🔲 Deferred |

## External URL
https://yanivmizrachiy.github.io/targilim/

## Architecture
- generator/index.html — modular loader
- generator/core.js — base registry/router/renderCard
- generator/export.js — copy-as-image / PNG / print
- generator/geo.js — base geometry slices
- generator/algebra.js — base algebra slices
- generator/numeric.js — base numeric slices
- generator/stats.js — base uncertainty/statistics slices
- generator/phase2-loader.js — loads Phase 2 slice modules
- generator/style.css — styles

## Status codes
| Code | Meaning |
|---|---|
| Code ✅ | generator code exists and is loaded by the app |
| Live ⚠️ | not yet live/browser verified after this batch |
| Live ✅ | verified by browser/workflow/manual live test |
| 🔒 | locked because source examples are missing |

## Active generator slices (22)
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
| G8-01 | Circle circumference and area | 8 | Geometry | ✅ | ⚠️ |
| N8-01 | Ratio | 8 | Numeric | ✅ | ⚠️ |
| N8-02 | Proportion | 8 | Numeric | ✅ | ⚠️ |
| N8-03 | Scale | 8 | Numeric | ✅ | ⚠️ |
| N8-04 | Static percentages | 8 | Numeric | ✅ | ✅ |
| N8-05 | Dynamic percentages | 8 | Numeric | ✅ | ✅ |
| A8-02 | Slope and line equation | 8 | Algebra | ✅ | ⚠️ |
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
- generator/phase2-loader.js

## Current honest status
The generator has 22 code-active slices. The original MVP slices were previously browser/workflow verified. The Phase 2 batch is connected through `phase2-loader.js` and is code-active, but it still needs one end-of-batch browser/live verification before marking those new slices Live ✅.

## Next required action
Run final end-of-batch verification on the public URL. Do not add more content slices before confirming the Phase 2 batch loads and the selectors contain the new topics.
