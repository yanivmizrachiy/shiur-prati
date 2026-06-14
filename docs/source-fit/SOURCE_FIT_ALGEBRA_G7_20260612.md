# Grade 7 algebra source-fit — 2026-06-12

## What was added

Two active Grade 7 algebra topics were added to strengthen source-fit coverage for the uploaded Grade 7 algebra curriculum.

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

### `A7-05` — מציאת טעות בביטויים

Source basis:

- File 01: Grade 7 algebra curriculum.
- File 08: algebra domain principles.

Student task families:

1. Distribution mistakes, such as `2(x+5)=2x+5`.
2. Like-term mistakes, such as `3a+4a=7a^2`.
3. Sign mistakes when opening parentheses with subtraction.

## Why this matters

The earlier source-fit sprints emphasized visual topics: coordinate systems, charts, graphs, cylinder/net, and parallel lines. This sprint begins closing the algebra Grade 7 gap by adding expression-equivalence and mistake-analysis tasks aligned to the source files.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that these active topics exist in `generator/a7-02.js`:

- `A7-04`
- `ביטויים שקולים ופישוט ✦ מקור`
- `A7-05`
- `מציאת טעות בביטויים ✦ מקור`

## Still pending for Grade 7 algebra

1. Full smart-engine mixed-mode version of `A7-04` and `A7-05`.
2. Matching-expression tasks.
3. Equations from verbal contexts.
4. Table/graph/algebra representation matching.
5. Two-variable expression contexts.
