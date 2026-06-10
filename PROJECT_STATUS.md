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
| Premium mobile-first UI redesign | ⚠️ Applied — pending full visual/browser batch verification |
| Live basic deployment | ✅ Passed — external Termux check |
| Obsolete workflow cleanup | ✅ Done |
| Verification hardening | ✅ Done — pending workflow results |
| Rules sync / anti-duplication guard | ✅ Done |
| True generator vision captured in repo rules | ✅ Done |
| Pages hardening | ✅ Done |
| Legacy archive | ✅ Done |
| Grade 9 generator | 🔒 Locked — needs real example question sources |
| Analytics | 🔲 Deferred |

## External URL
https://yanivmizrachiy.github.io/targilim/

## Static health endpoint
https://yanivmizrachiy.github.io/targilim/site-health.json

## Binding vision and rules
The current live system is a useful MVP, not the final intelligent generator Yaniv ultimately requested.

Yaniv's full no-demo product vision is now preserved in:

- `RULES.md`
- `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`

Future Claude/ChatGPT work must not ask Yaniv to repeat the full vision from scratch.

The next product direction is **not** more shallow slices and **not** starting over. The next direction is to preserve the existing live MVP and add a real generator engine beside it.

Phase 3 must build toward:

- source-bound template/pattern engine;
- many questions per topic;
- dynamic data generation;
- unknown switching;
- Hebrew wording variation;
- multiple question types: open, multiple choice, completion, true/false, matching, reasoning, mistake identification;
- real difficulty levels: basic, standard, challenge;
- dynamic premium SVG graphics with controlled colors/themes;
- full worksheet mode: 5/10/15 questions, with/without answers, answer key, A4 print;
- export/copy/PNG/print preserved;
- no fake controls;
- no demo-only UI;
- no Grade 9 until real worked source examples exist.

Claude remains the project manager/brain. ChatGPT is the GitHub executor. Claude does not need to work directly in GitHub; ChatGPT executes repository changes after Claude provides the approved blueprint/patch pack.

## Latest external verification
Verified externally from Termux on 2026-06-10:

| Check | HTTP |
|---|---|
| `site-health.json` | 200 |
| app shell `/targilim/` | 200 |
| `style.css` | 200 |
| `core.js` | 200 |

Observed GitHub Actions:

| Workflow | Status | Conclusion | Commit |
|---|---|---|---|
| Deploy targilim to GitHub Pages | completed | success | `1afaff9` |
| Verify Phase 2 static structure | completed | success | `1afaff9` |
| Pages healthcheck | completed | success | `9238a60` |

Conclusion: public basic deployment is working. Full browser batch verification for all 25 slices is still pending.

## Architecture
- generator/index.html — modular loader, mobile viewport, theme color
- generator/site-health.json — static Pages health endpoint independent of JavaScript
- generator/core.js — base registry/router/renderCard with `qmeta` class for premium card header styling and Grade 9 locked-notice UI
- generator/export.js — copy-as-image / PNG / print
- generator/geo.js — base geometry slices
- generator/algebra.js — base algebra slices
- generator/numeric.js — base numeric slices
- generator/stats.js — base uncertainty/statistics slices
- generator/phase2-loader.js — loads Phase 2 slice modules
- generator/.nojekyll — GitHub Pages artifact hardening marker
- generator/style.css — premium mobile-first RTL styles

## Verification assets
- tools/verify-phase2-static.mjs — strict repository static verifier: 25 slice IDs, loader coverage, export functions, site-health, anti-stub guard, mobile meta, Grade 9 lock, and truthful status checks
- .github/workflows/verify-phase2-static.yml — static CI verification
- .github/workflows/pages-healthcheck.yml — public Pages healthcheck that first checks `site-health.json`, then the app shell
- .github/workflows/verify-phase2-batch.yml — full 25-slice browser/live verification against the public Pages URL; checks selectors, generation, question text, answer reveal, export buttons, required SVGs, and no horizontal scroll on mobile viewport; uploads mobile screenshot artifact

## Workflow cleanup
Disabled obsolete one-time apply workflows by removing their active `.yml` files from `.github/workflows/`:

- `.github/workflows/apply-u8-01-slice.yml` — removed in commit `2a2ec16`
- `.github/workflows/apply-n8-05-slice.yml` — removed in commit `90e2a51`
- `.github/workflows/apply-claude-handoff-2026-06-09.yml` — removed in commit `8c36de0`

Reason: those workflows attempted to re-apply already completed work and polluted GitHub Actions with false failures. They remain recoverable from Git history if ever needed.

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

## Delta repairs completed after Claude audit
- N8-01 Ratio: expanded from one hardcoded question to 4 randomized variants.
- N8-03 Scale: expanded from one hardcoded question to 4 randomized variants.
- G8-04 Similarity: expanded from one hardcoded question to 4 randomized variants.
- A8-03 Systems: expanded from one hardcoded question to 4 randomized variants, with integer-safe examples only.
- Static verifier strengthened with Phase 2 file-size guard, export function checks, site-health checks, and mobile meta/status checks.
- Browser workflow strengthened to verify all 25 slices, mobile viewport, answer reveal, export buttons, required SVGs, and no horizontal scroll.
- Pages deployment hardened with `generator/.nojekyll` and a clean redeploy trigger.
- Lightweight Pages healthcheck workflow added for fast 200/403/404 diagnosis.
- Static `generator/site-health.json` endpoint added so Pages serving can be diagnosed without JavaScript.

## Premium mobile-first UI redesign
- `generator/style.css` was fully replaced according to Claude's premium mobile-first RTL design system.
- `generator/index.html` received `<meta name="theme-color" content="#0f172a">` only.
- `generator/core.js` received only a minimal `class="qmeta"` markup alignment so Claude's premium CSS applies to the card metadata row.
- `generator/core.js` also received a minimal Grade 9 locked-notice UI fix: selecting Grade 9 opens the existing `g9notice` block and shows a clear locked/pending option instead of an empty selector.
- No slice files, `export.js`, `phase2-loader.js`, sources, archive, or Grade 9 generator logic were changed.
- Status: applied in code; public files are reachable; full visual/browser batch verification remains pending.

## Current honest status
The public external link is reachable and basic deployment is verified externally: `site-health.json`, app shell, `style.css`, and `core.js` all returned HTTP 200 from Termux. Deploy Pages and static structure workflows completed successfully on commit `1afaff9`. Obsolete one-time apply workflows were disabled. The strict static verifier and full browser batch workflow were strengthened. The generator has 25 code-active slices. The current system is an MVP, not the final intelligent generator. Yaniv's full requirements are now preserved in `RULES.md` and `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`. The next major work is Phase 3A: a real source-bound generator engine beside the current MVP, with no fake controls and no demo-only UI.

## Known caveat
`G8-04` is currently implemented as Hebrew text-only with 4 variants. It is code-active and student-facing in Hebrew, but SVG can be added later if needed.

## Next required action
Before Phase 3 coding, Claude must produce a true Phase 3A generator-engine blueprint and exact patch pack based on `RULES.md` and `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`. ChatGPT should execute the approved pack in GitHub. Do not start from scratch, do not add shallow slices, do not implement Grade 9, and do not create fake UI controls.
