# Repository Organization Audit — 2026-06-09

Repository: `yanivmizrachiy/targilim`
Hebrew product name: `תרגילים`

## Audit result

The repository is now organized enough for the next planning/source-learning stage, but it is not yet fully clean.

## What is organized well

### Source materials

The source intake is organized clearly under:

```text
sources/intake/2026-06-09/
```

Each source file appears separately in its own folder.

A preserved copy also exists under:

```text
sources/intake/2026-06-09/originals/
```

The manifest confirms ten real source files and no missing files.

### Claude planning documents

The repository includes planning documents for Claude, including:

```text
docs/CLAUDE_DEEP_SOURCE_LEARNING_AND_QUALITY_PROTOCOL.md
docs/CLAUDE_PHASE_1_SOURCE_LEARNING_TASK.md
```

These documents correctly prevent Claude from starting implementation before source verification, deep learning, curriculum mapping, and question-pattern extraction.

### RULES.md

`RULES.md` is broadly well organized by professional topics, including:

- repository identity;
- current phase;
- source of truth and progress tracking;
- Hebrew language and punctuation quality;
- source-material learning;
- source-file workflow;
- exercise generator requirements;
- teacher controls;
- graphics and mathematical rendering;
- color modes;
- copy-as-image;
- Claude working rules;
- current work status.

## What is not fully clean yet

### Old project files still exist

The repository was converted from an older private-lesson project. Some old files still exist and should be cleaned only after Yaniv explicitly approves cleanup.

### README is outdated

`README.md` still describes the old project `שיעור פרטי`. It must be replaced with a `תרגילים` README before Claude implementation begins.

### RULES.md status needs one final synchronization

`RULES.md` still contains a status line saying that verification of the ten PDF files is not done yet. After the final PowerShell repair, the source manifest and local/remote verification showed all expected source PDFs present.

This status should be updated before Claude starts source learning.

## Current truthful status

- Repository renamed to `targilim`: done.
- Ten source files uploaded: done.
- Twenty PDF repository entries exist because there are ten organized files plus ten preserved originals.
- Source manifest: done.
- Claude protocol documents: done.
- Source learning by Claude: not started.
- Curriculum map: not started.
- Question-pattern extraction: not started.
- Generator implementation: not started.
- Copy-as-image implementation: not started.
- Full old-project cleanup: not done.

## Recommendation before Claude begins

Before giving Claude implementation control, do these cleanup/sync steps:

1. Replace `README.md` with a correct `תרגילים` project README.
2. Update `RULES.md` status so it no longer says the PDFs are unverified.
3. Keep old project files untouched until Yaniv explicitly approves cleanup.
4. Ask Claude to begin Phase 1 only: verify sources, learn sources, create curriculum map, and create question-pattern index.

## Completion estimate

Repository organization for planning/source-learning: 80%.

Full repository cleanup: not complete.

Generator implementation: 0%.
