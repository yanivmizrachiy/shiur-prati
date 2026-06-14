# Project Status — Targilim תרגילים

**Last updated:** 2026-06-14  
**Active PR:** #7 — `feat/source-bible-variety-dedicated-engines` → `main`  
**Current release branch version:** `0.78.0`  
**Current status:** Draft PR / release-readiness review branch. Do not merge without explicit approval from יניב.

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
- Documentation has been reorganized with `docs/README.md` and `tools/README.md`.
- GitHub Actions runs `npm run verify:deep` automatically.
- Do not merge to `main` until יניב explicitly approves.

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

## Latest automated status

- Latest verified GitHub Actions before the final documentation status pass: `Verify Targilim Deep` completed with `success` on PR branch HEAD `de256635f0dbf969630a3bd85d74085f2b81589e`.
- This status file is part of the final documentation/readiness pass and should be followed by a fresh GitHub Actions check on the new HEAD.

## Current product capabilities

### Student / worksheet layer

- Generate one exercise or a numbered exercise set.
- Support 1 / 5 / 10 / 15 / 20 exercises.
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

- `generator/gallery.html` displays all 50 engines from the live registry.
- `generator/visual-qa.html` lets a teacher perform human visual QA on all 50 engines.
- Visual QA statuses: יפה, צריך תיקון, בעיה בשרטוט, בעיה בהדפסה, בעיה בטקסט.
- Visual QA notes are stored locally in the browser and can be exported as JSON.
- Visual expectation badges identify topics where drawings are essential/recommended/optional.
- Empty-registry diagnostic prevents silent 0/0 failures.
- Cache-busting protects QA/gallery pages from stale browser bundles.

### Repo organization layer

- `README.md` documents the high-level repository structure.
- `docs/README.md` indexes documentation folders and source-of-truth files.
- `tools/README.md` maps verifiers, generators, harnesses and standalone tools.
- Historical unreferenced docs were moved with `git mv` into purpose folders.
- Protected source PDFs and GitHub Pages marker files were not deleted.

## Release readiness decision

This branch is technically strong, but merge readiness requires all confirmations below:

```text
GitHub Actions verify:deep = success
Local or Termux verify:deep = success
Human visual QA = acceptable
Human print QA = acceptable
Manual copy-as-image test into Word/Canva/Docs = acceptable
Yaniv explicitly approves merge
```

## Merge safety

Do not do any of the following without explicit approval:

- merge to `main`;
- mark PR #7 ready for review;
- force push;
- reset or clean the branch destructively;
- weaken a verifier;
- merge old PR branches directly;
- delete protected source PDFs;
- delete historical reports without an index/superseded decision;
- begin new feature work before PR readiness is accepted;
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
- Final PR status report: `docs/reports/FINAL_PR7_RELEASE_STATUS_20260614.md`

Do not publish a URL as the final live site until GitHub Pages/deployment is verified after merge/deploy.

## Remaining high-value work

1. Human visual QA across all 50 engines using `generator/visual-qa.html`.
2. Real A4 print review, with and without answer key.
3. Confirm teacher-only content never appears in student print/export.
4. Manual copy-as-image paste test into Word/Canva/Docs.
5. Decide whether to keep duplicate source PDFs in `originals/`.
6. Decide whether to consolidate overlapping fallback reports.
7. Optional future feature after approval only: source-question coverage gap for inequalities / A8-05.
8. Only after approval: mark PR ready and merge to `main`.
