# Source Bible Implementation Report — 2026-06-14

Branch: `feat/source-bible-variety-dedicated-engines` (base `chore/max-source-smart-generator`).

## What was done
Built the knowledge layer the generator was missing: it now knows, per topic,
WHAT it may create, WHY, which skill, which misconception, which visual, and
which follow-ups.
- `generator/engine/pedagogy-registry.js`: 50 topics (41 active engines + 9
  fallback), 155 question families. Each topic: learningGoal, teacherPurpose,
  skill, misconceptions, followUpIdeas, requiredVisual, families. Each family:
  questionFamily, sourceExampleOrPattern, commonMisconception, allowedVariations,
  fixedConstraints, qtypes, difficulties, answerFormat, explanationFormat.
  sourceFile/grade/domain inherited from `source-registry.js` (DRY).
- `docs/SOURCE_BIBLE.md`: auto-generated human view (per domain) via
  `tools/gen-source-bible.mjs`.
- `tools/verify-source-bible.mjs` (`verify:source-bible`, in verify:all):
  enforces completeness and that **no family cites file 10**.

## Files changed
new: pedagogy-registry.js, gen-source-bible.mjs, verify-source-bible.mjs, SOURCE_BIBLE.md.
edited: index.html (load), package.json.

## Tests
`verify:source-bible` → SOURCE_BIBLE_PASS (50 topics, 155 families, 0 demo, 0 file-10).
`verify:all` / `verify:deep` → PASS.

## What remains
- Family granularity is per-template, not per-individual-question.
- 9 fallback topics still have 1 documented family each (vs 3+ for engines).

## Recommended progress
Knowledge layer: **complete for the active set.**
