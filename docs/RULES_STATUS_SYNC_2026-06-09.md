# RULES Status Synchronization — 2026-06-09

Repository: `yanivmizrachiy/targilim`
Hebrew project name: `תרגילים`

## Purpose

This document records the current synchronization state after the source PDF upload and documentation repair.

`RULES.md` remains the main source of truth for project requirements.

`PROJECT_STATUS.md` is the current source of truth for live implementation/progress status after the PDF upload repair.

## Verified source status

The repository now contains the expected PDF source entries for the source-intake stage.

Important clarification:

- There are 10 real source PDF files.
- There are 20 PDF entries in the repository because each real source appears once in an organized folder and once as a preserved original copy.
- Claude must learn the 10 real source files only.
- The preserved originals are safety copies, not separate curriculum sources.

## Verified result from PowerShell repair

```text
REMOTE_EXPECTED_FOUND_COUNT=20
REMOTE_EXPECTED_TOTAL=20
TARGILIM_FULL_REPAIR_AND_UPLOAD_OK
```

## Current corrected status

Completed:

- Repository renamed to `targilim`.
- 10 source PDFs uploaded.
- Source originals preserved.
- Source manifest created.
- README replaced with a Targilim README.
- `PROJECT_STATUS.md` synchronized after the PDF upload.
- Claude deep source-learning protocol created.
- Claude Phase 1 source-learning task created.

Not started:

- Claude source learning.
- Curriculum map.
- Question-pattern index.
- Final pedagogical renaming after learning.
- Generator implementation.
- Copy-as-image implementation.
- Print/export implementation.
- Full old-project cleanup.

## Required Claude behavior

Claude must read, in this order:

1. `RULES.md`
2. `PROJECT_STATUS.md`
3. `docs/RULES_STATUS_SYNC_2026-06-09.md`
4. `docs/CLAUDE_DEEP_SOURCE_LEARNING_AND_QUALITY_PROTOCOL.md`
5. `docs/CLAUDE_PHASE_1_SOURCE_LEARNING_TASK.md`
6. `sources/intake/2026-06-09/MANIFEST.md`

If `RULES.md` contains any older status line that conflicts with `PROJECT_STATUS.md` or this sync document, Claude must update `RULES.md` before implementation.

Claude must not start generator implementation until Phase 1 source learning and curriculum mapping are complete.

## Completion estimate

Repository organization for planning/source-learning: 92%.

Source PDF upload: 100%.

Claude source learning: 0%.

Generator implementation: 0%.
