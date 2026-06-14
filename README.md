# Targilim

Repository: `yanivmizrachiy/targilim`

Hebrew RTL math exercise generator for Grades 7-8.

## Current status

- 50 active engines.
- 0 fallback topics.
- Main quality gate: `npm run verify:deep`.
- PR #7 is the active review branch before merge to `main`.
- Final PR status report: `docs/reports/FINAL_PR7_RELEASE_STATUS_20260614.md`.

## Quick entry points

- Generator: `generator/index.html`
- Engine gallery: `generator/gallery.html`
- Visual QA: `generator/visual-qa.html`
- Digital source book: `generator/book.html`
- Source Bible: `docs/SOURCE_BIBLE.md`
- Release checklist: `docs/RELEASE_CHECKLIST.md`
- Documentation index: `docs/README.md`
- Tools index: `tools/README.md`

## Verification

```bash
npm install
npm run verify:deep
```

## Safety

- Do not merge to `main` without explicit approval.
- Do not weaken verifiers to pass.
- Student-facing UI and output remain Hebrew and RTL.

## Product status

Before merge, complete human visual QA, A4 print QA, manual copy/export QA, and explicit approval from Yaniv.
