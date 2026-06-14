# Project Status — Targilim תרגילים

**Last updated:** 2026-06-14  
**Active PR:** #7 — `feat/source-bible-variety-dedicated-engines` → `main`  
**Current release branch version:** `0.77.0`

## Executive snapshot

- Product scope: smart Hebrew RTL math exercise generator for Grades 7–8.
- Active `*-ENGINE` topics: **50**.
- Fallback topics: **0 fallback**.
- The generator is source-bound to the approved intake PDFs.
- Source file 10 is sequencing/teaching context only; it is not a direct question source.
- Teacher Advanced Mode is implemented and opt-in.
- Engine gallery is implemented at `generator/gallery.html`.
- Human visual QA dashboard is implemented at `generator/visual-qa.html`.
- GitHub Actions now runs `npm run verify:deep` automatically.
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
- question-family provenance checks;
- follow-up generation checks;
- gallery and visual QA dashboard checks;
- Teacher Advanced Mode checks;
- copy/export and print-layout checks;
- release documentation freshness check.

## Latest automated status

- Local/Termux verification on commit `713e4a9`: `VERIFY_DEEP: PASS`.
- GitHub Actions verification on commit `0aad360`: `Verify Targilim Deep` completed with `success`.
- The current branch adds CI and stronger release-readiness guardrails after the Termux pass.

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
- Export HTML / PNG.
- Add-to-worksheet flow.

### Visual and QA layer

- `generator/gallery.html` displays all 50 engines from the live registry.
- `generator/visual-qa.html` lets a teacher perform human visual QA on all 50 engines.
- Visual QA statuses: יפה, צריך תיקון, בעיה בשרטוט, בעיה בהדפסה, בעיה בטקסט.
- Visual QA notes are stored locally in the browser and can be exported as JSON.

## Release readiness decision

This branch is technically strong, but merge readiness requires three confirmations:

```text
GitHub Actions verify:deep = success
Local or Termux verify:deep = success
Human visual/print QA = acceptable
```

## Merge safety

Do not do any of the following without explicit approval:

- merge to `main`;
- force push;
- reset or clean the branch destructively;
- weaken a verifier;
- merge old PR branches directly;
- commit `_audit/`, `.claude/`, `TARGILIM_*_AUDIT*.txt`, `TARGILIM_*_INTEL*.txt`, or `node_modules/`.

## Live / static entry points

- Main generator: `generator/index.html`
- Engine gallery: `generator/gallery.html`
- Visual QA dashboard: `generator/visual-qa.html`
- Digital source book: `generator/book.html`
- Source Bible: `docs/SOURCE_BIBLE.md`
- Release checklist: `docs/RELEASE_CHECKLIST.md`
- Hardening report: `docs/reports/AUTOMATED_HARDENING_REPORT_20260614.md`

## Remaining high-value work

1. Human visual QA across all 50 engines using `generator/visual-qa.html`.
2. Real A4 print review, with and without answer key.
3. Confirm teacher-only content never appears in student print/export.
4. Optional: improve selected visuals or wording only after the QA dashboard identifies concrete issues.
5. Only after approval: mark PR ready and merge to `main`.
