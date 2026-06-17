# Grade 7 algebra smart engines — 2026-06-12

## Goal

Move the project from active fallback questions to smart source-fit engines, starting with the highest-value Grade 7 algebra families from the uploaded source files.

## Commits

- `a4e8a66` — added `generator/engine/source-fit-algebra-g7.js`.
- `dcbcaa0` — fixed the smart-engine syntax before active loading.
- `a53b146` — loaded `source-fit-algebra-g7.js` in `generator/index.html` before `exercise-set.js`.
- `aa8da1e` — updated the verifier to check the Grade 7 algebra smart engines.

## Smart engines added

### `A7-04-ENGINE` — ביטויים שקולים ופישוט

Source basis:

- File 01: Grade 7 algebra curriculum.
- File 08: Algebra principles grades 7–8.

Capabilities:

- Open questions.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode.
- Changing numbers.
- Changing variables: `x`, `a`, `m`, `y`.
- Distribution with plus.
- Distribution with subtraction.
- Like terms.
- Factoring by common factor.
- Common algebraic distractors.

### `A7-05-ENGINE` — טבלת ערכים וגרף ברביע ראשון

Source basis:

- File 01: Grade 7 algebra curriculum.
- File 08: Algebra principles grades 7–8.

Capabilities:

- Open questions.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode.
- Value-table completion.
- First-quadrant coordinate plotting.
- Reading a requested value from the graph.
- Matching verbal rule, expression, table, and graph.

## Runtime connection

The engine file is loaded in `generator/index.html` before `exercise-set.js`:

```html
<script src="engine/source-fit-algebra-g7.js?v=20260617b"></script>
```

This keeps the engine available to both single-question generation and multi-exercise worksheet generation.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks:

- The engine file exists.
- The engine is loaded before `exercise-set.js`.
- The IDs `A7-04-ENGINE` and `A7-05-ENGINE` exist.
- The source labels exist.
- The engine includes `open`, `mcq`, `tf`, `mistake`, and `mixed` support.

## Progress update

Current estimated whole-product completion: **50%**.

Reason:

- The 50% gate required moving beyond fallback-only work.
- The first high-value fallback family has now been converted into smart engines.
- The source coverage matrix and extreme completion plan already exist.

## Next recommended smart-engine conversion

Convert `U7-05` and `U7-06` into full smart engines:

- Pie chart and relative frequency.
- Misleading graph critique.
- Bar/pie/chart variants aligned to File 06.
