# Question Coverage After Repair — 2026-06-14

Companion to the machine-generated `QUESTION_COVERAGE_CENSUS_LATEST.md`.

## Before (audit census)
```
strong: 0
partial: 24
noClearSource: 24
```
Many engines, much graphics, broad question-type support — but no clear source
metadata, so nothing graded STRONG.

## After (tools/verify-question-coverage-deep.mjs)
```
engineIdsScanned: 33
strong: 33
partial: 0
noClearSource: 0
withSvgOrVisual: 22
withMcq: 33   withTf: 33   withMistake: 33
fallbackLogicalTopics: 17
```
STRONG spans all 4 domains: numeric, algebra, geometry, uncertainty.

## What changed it (not a counting trick)
The 33 engines already produced 4 question types, 3 difficulties, answers with
explanations, and visuals where needed — they only lacked machine-readable
source metadata. The repair supplied that (source registry), and **real engine
fixes** removed the genuine blockers the census/stress surfaced:
- G8-03: an `undefined`-labelled MCQ choice (5 candidates into a 4-label array)
  → `ch()` now dedupes, keeps the correct option, caps at 4 before labeling.
- N7-01, U7-03, A8-01, U7-04, G8-02, A7-05: true/false was always FALSE
  → each now flips ~50% to a correct statement using the engine's own value.
- U7-03, U7-04: difficulty-keyed datasets for real variety.

## STRONG criteria used
valid source metadata + ≥3 of {open,mcq,tf,mistake} + explanation in the answer
+ all of basic/standard/challenge + visual when the skill needs one.

## Stress (tools/verify-all-engines-stress.mjs)
50 generations per topic × all qtypes × all difficulties = 1650 generations,
**0 fails**. Gates: question/answer/explanation/source present; no undefined/NaN;
no leaked engine ids; MCQ exactly-one-correct; required visual; mistake
correction; TF both verdicts per topic; ≥4 distinct questions.

## Files changed
engine fixes: `source-fit-geometry.js`, `source-fit-extensions.js`,
`source-fit-graphs.js`, `source-fit-algebra-g7.js`. New tooling: `engine-load.mjs`,
`verify-question-coverage-deep.mjs`, `verify-all-engines-stress.mjs`.

## Remaining / risk
- 17 fallback topics are source-tagged but not yet dedicated engines.
- `withSvgOrVisual=22/33` is correct: numeric/algebra symbolic engines don't all
  need a figure; every geometry/uncertainty/coordinate/graph engine has one.

## Recommended progress
- Engine source-coverage: **complete for the active set**; depth/fallbacks ongoing.
