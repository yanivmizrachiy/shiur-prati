# Grade 8 algebra source-fit expansion — 2026-06-12

## Goal

Strengthen alignment with uploaded Grade 8 algebra sources:

- File 02: Grade 8 algebra curriculum.
- File 08: Algebra principles grades 7–8.
- File 10: Grade 8 teaching sequence 2026–2027.

## Commits

- `40b18de` — expanded `generator/a8-03.js` with Grade 8 algebra source-fit topics.
- `8ff1de3` — added focused Grade 8 algebra source-fit verifier.

## Active topics added

### `A8-04` — אי־שוויונות ומגבלות

Student task families:

1. Solve one-variable inequalities.
2. Model constraints from real contexts.
3. Interpret “at most” and upper bound.
4. Use budget / taxi / tickets contexts.

### `A8-05` — משוואות אחוזים

Student task families:

1. Find original price after discount.
2. Find original amount after percentage increase.
3. Compute percentage of a quantity.
4. Reverse percentage-change equations.

### `A8-06` — טבלה ביטוי וגרף של פונקציה

Student task families:

1. Substitute into a linear function.
2. Infer a linear expression from a table pattern.
3. Interpret the constant term in a real context.
4. Identify increasing/decreasing behavior from coefficient sign.

## Existing Grade 8 algebra smart coverage already considered

- `A8-01-ENGINE` — applied graph and function reading.
- `A8-02-ENGINE` — slope and line equation.
- `A8-03-ENGINE` — systems of equations.

## New focused verifier

A new verifier was added:

`tools/verify-algebra-g8-source-fit.mjs`

It checks:

1. The relevant Grade 8 source files are present in the source manifest.
2. Applied graph/function engine exists.
3. Slope and line smart engine exists.
4. Systems smart engine exists.
5. Active fallback source-fit topics `A8-04`, `A8-05`, and `A8-06` exist.

## Progress update

Current estimated whole-product completion: **62%**.

Reason:

- Grade 8 algebra now covers applied graphs, slope/line, systems, inequalities, percentage equations, and representation links.
- The project is moving from isolated exercise snippets toward source-family coverage.
- Verification is expanding by domain instead of relying only on a single large verifier.

## Next recommended sprint

Continue with Grade 7 geometry and Grade 8 geometry quality:

1. Pythagoras applications.
2. Angle-chasing from diagrams.
3. Nets and 3D reasoning.
4. Similarity/congruence smart-engine conversion.
