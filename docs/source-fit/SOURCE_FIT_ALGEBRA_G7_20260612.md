# Grade 7 algebra source-fit — 2026-06-12

## What was added

Two active Grade 7 algebra topics were added to strengthen source-fit coverage for the uploaded Grade 7 algebra curriculum.
2026-06-17 sync update: `A7-05` is now the table/value-graph topic from File 01; expression-mistake work lives under the `A7-04` mistake family.

## Commit

- `034ff89` style follow-up family: active fallback integration in `generator/a7-02.js`.
- `614469a` — verifier updated to include Grade 7 algebra source-fit topics.

## Active topics added

### `A7-04` — ביטויים שקולים ופישוט

Source basis:

- File 01: Grade 7 algebra curriculum.
- File 08: algebra domain principles.

Student task families:

1. Open parentheses.
2. Combine like terms.
3. Identify equivalent expressions.
4. Avoid common distractors such as adding unlike terms or forgetting distribution.

### `A7-05` — טבלת ערכים וגרף ברביע ראשון

Source basis:

- File 01: Grade 7 algebra curriculum.
- File 08: algebra domain principles.

Student task families:

1. Build a value table from a verbal rule.
2. Plot table points in the first quadrant.
3. Read a requested value from a table or graph.
4. Connect verbal rule, expression, table, and graph.

## Why this matters

The earlier source-fit sprints emphasized visual topics: coordinate systems, charts, graphs, cylinder/net, and parallel lines. This sprint closes the Grade 7 algebra gap by pairing expression-equivalence tasks with source-style table/graph representation tasks.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that these active topics exist in `generator/a7-02.js`:

- `A7-04`
- `ביטויים שקולים ופישוט ✦ מקור`
- `A7-05`
- `טבלת ערכים וגרף ברביע ראשון ✦ מקור`

## Still pending for Grade 7 algebra

1. More matching-expression and equal-for-all-values variants.
2. Additional equations from verbal contexts.
3. Additional table/graph/algebra representation matching contexts.
4. Two-variable expression contexts.
