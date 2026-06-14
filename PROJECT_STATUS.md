# Project Status — Targilim תרגילים

**Last updated:** 2026-06-14  
**Default branch:** `main`  
**Current repo state:** Phase 1 merged and active on `main`.  
**Package version:** `0.78.0`

## Executive snapshot

- Product scope: smart Hebrew RTL math exercise generator for Grades 7–8.
- Active `*-ENGINE` topics: **50**.
- Fallback topics: **0 fallback**.
- The generator is source-bound to the approved intake PDFs.
- Source file 10 is sequencing/teaching context only; it is not a direct question source.
- Teacher Advanced Mode is implemented and opt-in.
- Engine gallery is implemented at `generator/gallery.html`.
- Human visual QA dashboard is implemented at `generator/visual-qa.html`.
- Visual coverage is enforced by `verify:visual-coverage` inside `verify:deep`.
- Copy/export includes copy-as-image for whole question cards, including drawings.
- Documentation is indexed with `docs/README.md` and `tools/README.md`.
- GitHub Pages publishes the `generator/` directory from `main`.

## Recently merged work

- PR #7 merged the 50-engine source-backed generator, teacher mode, visual QA, copy/export, documentation organization, and verification gates.
- PR #8 merged the final Phase 1 integration into `main`, including the 1–10 exercise selector, MCQ single/multi UI support, mobile Hebrew fixes, and deterministic stress fixes for true/false sampling.
- PR #9 is repository cleanup only: stale generated live-verification FAIL artifacts and documentation policy. It does not change product behavior.

## Current verification gates

Primary gate:

```bash
npm install
npm run verify:deep
```

`verify:deep` includes:

- repository hygiene check;
- baseline and branding checks;
- source lock and source bible checks;
- coverage and stress checks;
- question variety checks;
- SVG/visual/graphics checks;
- visual coverage checks;
- question-family provenance checks;
- follow-up generation checks;
- gallery and visual QA dashboard checks;
- Teacher Advanced Mode checks;
- teacher controls checks;
- copy/export checks, including copy-as-image entry points;
- print-layout checks;
- release documentation freshness check.

## Current product capabilities

### Student / worksheet layer

- Generate one exercise or a numbered exercise set.
- Support **1–10** exercises in the main selector.
- Support mixed question types.
- Support answer key toggle.
- Support browser print.
- Student print hides teacher-only controls/cards.
- Includes writing space shaped by question type.

### Engine layer

- 50 active engine topics.
- 0 fallback topics.
- Open / MCQ / true-false / mistake question types.
- Basic / standard / challenge difficulty support.
- Pedagogic metadata attached to each output.
- Per-question source/family provenance.
- Follow-up generation support.

### MCQ layer

- Single-answer mode exists and prints a single-answer instruction.
- Multi-answer wording exists and the answer key supports 1..N correct answers.
- Current engine content still emits exactly one correct answer per MCQ; real multi-correct content remains a Phase 2 item and must not be claimed as completed.

### Teacher layer

- Teacher Advanced Mode toggle.
- Per-question teacher card.
- Refresh / easier / harder / change type / new numbers controls.
- Follow-up modes.
- Show/hide solution, source and graphic.
- Copy question / question+solution / teacher card.
- Copy whole question card as image for Word/Canva-style workflows.
- Export HTML / PNG.
- Add-to-worksheet flow.

### Visual and QA layer

- `generator/gallery.html` displays engines from the live registry.
- `generator/visual-qa.html` lets a teacher perform human visual QA on engines.
- Visual QA statuses: יפה, צריך תיקון, בעיה בשרטוט, בעיה בהדפסה, בעיה בטקסט.
- Visual QA notes are stored locally in the browser and can be exported as JSON.
- Visual expectation badges identify topics where drawings are essential/recommended/optional.
- Empty-registry diagnostic prevents silent 0/0 failures.
- Cache-busting protects QA/gallery pages from stale browser bundles.

### Repo organization layer

- `README.md` documents the high-level repository structure.
- `docs/README.md` indexes documentation folders and source-of-truth files.
- `tools/README.md` maps verifiers, generators, harnesses and standalone tools.
- Historical unreferenced docs are organized under purpose folders.
- Protected source PDFs and GitHub Pages marker files are not deleted.

## Release and cleanup safety

Do not do any of the following without explicit approval:

- merge feature PRs to `main`;
- force push;
- reset or clean destructively;
- weaken a verifier;
- delete protected source PDFs;
- delete historical reports without an index/superseded decision;
- begin new feature work during cleanup-only work;
- commit `_audit/`, `.claude/`, `TARGILIM_*_AUDIT*.txt`, `TARGILIM_*_INTEL*.txt`, `node_modules/`, secrets, tokens or temp logs.

## Live / static entry points

Repository paths:

- Main generator: `generator/index.html`
- Engine gallery: `generator/gallery.html`
- Visual QA dashboard: `generator/visual-qa.html`
- Digital source book: `generator/book.html`
- Source Bible: `docs/SOURCE_BIBLE.md`
- Release checklist: `docs/RELEASE_CHECKLIST.md`
- Documentation index: `docs/README.md`
- Tools index: `tools/README.md`
- Phase 1 requirements status: `REQUIREMENTS_STATUS.md`
- Cleanup execution log: `docs/reports/REPO_CLEANUP_EXECUTION_20260614.md`

## Remaining high-value work

1. Human visual QA across all 50 engines using `generator/visual-qa.html`.
2. Real A4 print review, with and without answer key.
3. Confirm teacher-only content never appears in student print/export.
4. Manual copy-as-image paste test into Word/Canva/Docs.
5. Decide whether to keep duplicate source PDFs in `originals/`.
6. Decide whether to consolidate overlapping fallback reports.
7. Optional future feature after approval only: source-question coverage gap for inequalities / A8-05.
8. Optional future feature after approval only: real multi-correct MCQ content.
