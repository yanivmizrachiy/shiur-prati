# ChatGPT Auto Improvement Plan — Targilim

Date: 2026-06-12

## Current repository reality

The live code now contains a browser-based multi-exercise set layer:

- `generator/index.html` includes `מספר תרגילים` with 1/5/10/15/20.
- `generator/index.html` includes `סוג שאלות` with `מעורב`.
- `generator/exercise-set.js` implements `generateSet`, `renderExerciseSet`, `toggleAnswerKey`, and `printExerciseSet`.
- `generator/style.css` includes exercise-set and print layout styles.

This means the old single-question-only diagnosis is no longer the current GitHub `main` truth. It was true for an older local/runtime state, but the repository has since been upgraded.

## Immediate automatic improvements that are safe for ChatGPT/Codex

These can be done without re-reading all source PDFs:

1. Sync governance language:
   - Clarify that browser-based exercise sets are in scope.
   - Keep Grade 9, PDF workbook, booklet mode, and bulk A4 workbook generation out of scope.
   - Remove ambiguous wording that could block the existing exercise-set generator.

2. Strengthen exercise-set export UX:
   - Add copy-as-image for the full exercise set.
   - Add PNG download for the full exercise set.
   - Add explicit print-without-answers and print-with-answers actions.
   - Preserve old count=1 single-card export behavior.

3. Keep documentation truthful:
   - No 100% claim.
   - Keep human teacher QA as required before raising product readiness.

## Work that should be deferred to Claude/Claude Code

These need deeper pedagogical/source review and should not be rushed automatically:

1. Expand weak/basic engines using the source PDFs.
2. Add richer source-backed case pools per topic.
3. Improve distractors by real misconception mapping.
4. Add source citations for G7-03 and N8-01..N8-05.
5. Review printed worksheets as a teacher on actual paper.

## Recommended next sprint

Name: `chatgpt/exercise-set-export-and-rules-sync`

Scope:

- Update `RULES.md` scope wording.
- Update `generator/exercise-set.js` action buttons and print behavior.
- Update `PROJECT_STATUS.md` or `docs/WORKLOG.md` truthfully.
- Run verifiers locally after pulling the branch.

Suggested local checks:

```bash
node tools/verify-real-generator-runtime.mjs
node tools/verify-variety.mjs
node tools/release-audit.mjs
node tools/verify-phase2-static.mjs
node tools/verify-phase3a-static.mjs
git diff --check
```
