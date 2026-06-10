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
| Grade 9 generator | 🔲 Needs example questions |
| Analytics | 🔲 Deferred |

## Active generator slices (9)
| ID | Topic | Domain | Grade |
|---|---|---|---|
| G7-03 | Pythagoras — missing side | Geometry | 7 |
| G7-04 | Missing angle in triangle | Geometry | 7 |
| N7-06 | Powers: (−a)ⁿ vs −aⁿ | Numeric | 7 |
| N7-07 | Square root — exact and estimation | Numeric | 7 |
| A7-03 | First-degree equations | Algebra | 7 |
| U8-01 | Mean, median, range | Uncertainty | 8 |
| N8-02 | Proportion | Numeric | 8 |
| N8-04 | Static percentages | Numeric | 8 |
| N8-05 | Dynamic percentages | Numeric | 8 |

## Architecture
- generator/index.html — modular loader
- generator/core.js — TOPICS registry + router
- generator/geo.js — geometry slices
- generator/algebra.js — algebra slices
- generator/numeric.js — numeric slices
- generator/stats.js — uncertainty slices
- generator/export.js — copy/PNG/print
- generator/style.css — styles

## Recommended next slices
1. N7-04 — חיבור/חיסור מספרים מכוונים (numeric, grade 7)
2. G7-02 — שטחי צורות שטוחות (geometry, grade 7)
3. U8-02 — הסתברות בסיסית (uncertainty, grade 8)

## Live URL
https://yanivmizrachiy.github.io/targilim/
