# Visual Quality Audit — Generator Diagrams

**Date:** 2026-06-11 | **Sprint:** full-completion-sprint | Statuses: KEEP / IMPROVED / ADDED / NEEDS REVIEW

Principle: visuals must support teaching (accurate values, clear labels, RTL-safe), not decoration. Items marked KEEP were left untouched on purpose.

## Engine SVG helpers (`generator/engine/diagrams.js`)

| Helper | Used by | Verdict | Notes |
|---|---|---|---|
| `rightTriangleSvg` | G7-03 | KEEP | Dynamic proportions, unknown highlighted; live-verified previously |
| `rectangleDiagonalSvg` | G7-03 | KEEP | |
| `scaleMapSvg` | N8-03 | KEEP | |
| `ratioBarSvg` | N8-01 | KEEP | |
| `proportionTableSvg` | N8-02 | KEEP | |
| `percentChangeSvg` | N8-05 | KEEP | |
| `rectangleSvg`, `boxSvg` | G7-01 | KEEP | |
| `triangleBaseHeightSvg` | G7-02 | KEEP | Dashed height shown |
| `triangleAnglesSvg` | G7-04 | KEEP | Unknown angle highlighted |
| `circleSvg` | G8-01 | KEEP | |
| `similarTrianglesSvg` | G8-04 | KEEP | Also reused for the new area-ratio family (sides 1 and k) |
| `numberLineSvg` | N7-03 | IMPROVED | New `step` parameter; placement family uses −6..6 with step 2 so fraction points are readable |
| `linearGraphSvg` | A8-02 | ADDED | Axes with arrows, light grid, integer tick labels, blue line, labeled red points; auto-ranges around the data |
| `freqTableHtml` | U7-01, U8-02 | KEEP | HTML table, not SVG — unaffected by visual mode (acceptable: already monochrome) |

## Legacy slice inline SVGs (`geo.js`, `g7-01.js`, `g7-02.js`, `g8-01.js`)

Verdict: KEEP for now. Static but mathematically labeled and print-safe. They predate the engine and are scheduled for replacement as engine topics take over; investing in them now is wasted work. NEEDS REVIEW only if a teacher reports label overlap on small screens.

## Visual mode (added this sprint)

- Teacher control "תצוגת שרטוטים": צבע / גווני אפור / שחור-לבן.
- Implemented by rewriting SVG `fill`/`stroke` attributes in the DOM (originals cached), so copy-image/PNG/print all honor the mode.
- Verified by unit test (gray luminance mapping, BW mapping, restore-to-color). NEEDS REVIEW (human, in browser): B/W renders the light grid of `linearGraphSvg` in black — legible but denser than the color version; judge with teacher eyes.

## Known visual gaps (future work)

- Coordinate-system patterns N7-01/N7-02/A7-04 and applied-graph A8-01 have no engines yet (see SOURCE_ALIGNMENT gap list) — `linearGraphSvg` is the building block when they are approved.
- U7-01 could gain a bar-chart SVG (pattern U7-02) in a variety batch.
