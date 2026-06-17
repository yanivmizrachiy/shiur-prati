# Project Status — Targilim תרגילים

**Last updated:** 2026-06-17 · baseline 2026-06-14
**Central rules:** see `RULES.md` (authoritative operating guide; this file is the status snapshot).  
**Default branch:** `main`.
**Live site:** GitHub Pages serves `generator/` from `main` — https://yanivmizrachiy.github.io/targilim/ . The live site reflects `main` only.  
**Current repo state:** Phase 1 + PRs #21–#34 + PRs #46–#52 + main commit `7db6ab4` are merged into `main`. Local/GitHub sync is checked by `npm run verify:sync`.
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
- Cleanup pass removed stale generated live-verification FAIL artifacts and added documentation policy. It did not change product behavior.
- PRs #15–#18 merged: A7-04 work, stress PER raised to 100 (#16), a standalone A7-04 multi-correct guard (#17, see caveat in the MCQ layer), and a PDF duplicate audit with no deletion (#18). PDF inventory is 20 files (10 working + 10 originals; no accidental duplicates).

## Changelog — merged improvements (newest first)

All merged to `main`, live, and `verify:deep`-green.

| PR | Date | Improvement |
|---|---|---|
| #52 | 2026-06-17 | A8-03 count-and-value system word problem (coins/stamps elimination). |
| `7db6ab4` | 2026-06-17 | Source-fit/UI sync: A7-05 value tables + first-quadrant graphs, A7-03/U7-01/U8-01 family expansion, copy-image-only mobile dock, premium typography guards. |
| #51 | 2026-06-17 | A7-02 expression-value-range family. |
| #50 | 2026-06-17 | Topic dropdown dedupe/order cleanup. |
| #49 | 2026-06-17 | Registry and source-bible sync for shipped families. |
| #48 | 2026-06-17 | A7-01 polygon perimeter with algebraic sides and labeled diagram. |
| #47 | 2026-06-17 | Source-level families: applied-formula substitution and equal-expressions. |
| #46 | 2026-06-17 | Real רמה 1/2/3 integration for new families. |
| #34 | 2026-06-16 | Pythagoras (legacy G7-03): diagram marks the unknown side `?` instead of revealing the answer; fixed the clipped "ס\"מ" label; precise Hebrew ("חשבו את אורך היתר"); premium student answer box (5 comfortable 40px ruled lines). |
| #33 | 2026-06-16 | Source-faithful topic labels: G7-02 → "שטחי מצולעים"; G8-04 → "דמיון משולשים" (U7-01 "טבלת תדירות" kept — source uses "תדירות"). |
| #32 | 2026-06-16 | Removed the landing splash — the main page opens directly to the topic-selection tool; `landing.css` deleted. |
| #30 | 2026-06-16 | Level selector shows **רמה 1 / רמה 2 / רמה 3** and the visible selector actually drives difficulty. |
| #20 | 2026-06-15 | Central rules + status refresh. |
| #28 | 2026-06-15 | Real A7-04 multi-correct (forward `mcqMode`; `verify:multi-correct` in `verify:deep`). |
| #27 | 2026-06-15 | Worksheet polish — sharp math rectangles + no question-type badge. |
| #21–#24 | 2026-06-15 | UI premium round — professional card + typography; single untitled answer box; premium image export + color/שחור-לבן only; `verify:premium-ui` guard. |

The book/learning-material viewer is served from the site (no GitHub Pages 404). `verify:deep` now includes `verify:premium-ui`, `verify:worksheet-polish` and `verify:multi-correct`.

## Current verification gates

Primary gate:

```bash
npm install
npm run verify:sync
npm run verify:workbench
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
- **Real multi-correct MCQ is `DONE` and merged (PR #28).** Root cause: the `getEngineExercise` wrapper chain dropped the `mcqMode` argument, so the already-implemented A7-04 multi-correct path was unreachable (emitted one correct even in multi mode). PR #28 (`fix/a704-multi-correct-clean-v2`, the clean path — the earlier #25 was closed/superseded) forwards `opts` through every wrapper and wires `tools/verify-multi-correct-coverage.mjs` into `verify:deep`. Verified: A7-04 multi → 2 correct, single → 1 correct.

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
- `docs/reference/ACTIVE_WORKTREE_AND_SYNC.md` documents the active local worktree and sync checks.
- `tools/README.md` maps verifiers, generators, harnesses and standalone tools.
- Historical unreferenced docs are organized under purpose folders.
- Protected source PDFs and GitHub Pages marker files are not deleted.
- Cleanup-only work must not touch product code, engines, sources or verifier logic.

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

1. **Legacy ↔ engine topic dedup (flagged, needs approval).** Several topics appear twice in the dropdown — a legacy generator (e.g. `geo.js` G7-03) and a `*-ENGINE` "גרסה חכמה". The legacy generators are lower quality (the #33/#34 fixes were on legacy files). Unifying each topic to its single smart engine would prevent label/diagram inconsistencies at the root.
2. **U7-03 single-answer MCQ already exists** in `source-fit-extensions.js` (verified: U7-03-ENGINE emits MCQ with choices). Do **not** duplicate it. Select next content work only after checking existing engine coverage.
3. Human visual QA across engines using `generator/visual-qa.html`.
4. Real A4 print review, with and without answer key.
5. Confirm teacher-only content never appears in student print/export.
6. Manual copy-as-image paste test into Word/Canva/Docs.
7. Optional future feature after approval only: source-question coverage gap for inequalities / A8-05.

## Release / CI gate

Before any merge to `main`, GitHub Actions must pass.

The required GitHub Actions gate is `npm run verify:deep`.

Do not merge unless `verify:deep` passes in GitHub Actions and Yaniv gives explicit approval.
