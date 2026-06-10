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

Conclusion: Phase 2 remains statically verified. Phase 3A contains six engine topics in code. Wave 1 adds `N8-01-ENGINE`, `N8-02-ENGINE`, and `N8-05-ENGINE` with source-bound template families, dynamic data, unknown switching, Hebrew wording variation, real question types, real difficulty behavior, dynamic SVG where relevant, and preserved legacy topics. Browser/live verification is still required before marking the Wave 1 topics live.

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
