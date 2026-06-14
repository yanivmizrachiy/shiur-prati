# Release Readiness Checklist

מסמך בדיקות ושחרור כללי לפרויקט `targilim` אחרי מיזוג Phase 1 ל-`main`.

## Current baseline

- Default branch: `main`.
- Product version: `0.78.0`.
- Current product state: 50 source-backed engines, 0 fallback topics, Hebrew RTL worksheet generator for Grades 7–8.
- Phase 1 has been merged through PR #7 and PR #8.
- Cleanup-only changes must not touch product code unless explicitly approved.

## Automated gates required before merge

Run locally and in GitHub Actions for feature/product PRs:

```bash
npm install
npm run verify:deep
```

Required gates inside `verify:deep`:

- `verify:hygiene`
- `verify:baseline`
- `verify:brand`
- `verify:source-lock`
- `verify:source-bible`
- `verify:coverage`
- `verify:stress`
- `verify:variety`
- `verify:visual`
- `verify:family`
- `verify:followups`
- `verify:graphics-quality`
- `verify:visual-coverage`
- `verify:gallery`
- `verify:visual-qa`
- `verify:teacher`
- `verify:teacher-controls`
- `verify:copy-export`
- `verify:print-layout`
- `verify:release-docs`

## Product facts that must stay true

- 50 active `*-ENGINE` topics.
- 0 fallback topics.
- All engines are locked to approved source material.
- Source file 10 is sequencing/teaching context only and not a direct question source.
- Teacher Advanced Mode remains opt-in and hidden from student print/export.
- `generator/gallery.html` and `generator/visual-qa.html` build from the live registry.
- Essential visual topics must produce visuals.
- Copy-as-image remains available for the teacher workflow and has a PNG fallback when browser clipboard image writing is blocked.
- UI and student-facing output remain Hebrew RTL.
- Visible owner credit remains `יניב רז`.
- Documentation indexes remain present: `docs/README.md`, `tools/README.md`, `PROJECT_STATUS.md`, and `REQUIREMENTS_STATUS.md`.
- Main exercise count selector remains 1–10 unless a future requirement explicitly changes it.
- MCQ multi-answer UI wording exists, but real multi-correct content is still a future item and must not be claimed as complete until implemented and verified.

## Human QA required before product release

Automated checks are necessary but not enough. Before releasing product behavior changes:

1. Open `generator/visual-qa.html`.
2. Confirm the dashboard shows engines after a hard reload.
3. Generate samples for visible engines.
4. Mark each engine as: יפה / צריך תיקון / בעיה בשרטוט / בעיה בהדפסה / בעיה בטקסט.
5. Export the QA JSON from the dashboard when doing a formal visual QA pass.
6. Print at least one A4 worksheet with diagrams.
7. Print at least one A4 worksheet with answer key open.
8. Confirm teacher-only controls/cards do not appear in student print.
9. In a real browser, click “העתק כתמונה” on a question containing a diagram.
10. Paste the result into Word/Canva/Docs and confirm both Hebrew text and drawing are present.

## Repo organization checks before merge

- `docs/` root contains only load-bearing/cross-linked docs.
- Historical docs remain organized under purpose folders.
- `docs/README.md` links to current source-of-truth reports.
- `tools/README.md` maps wired verifiers, standalone verifiers, generators and harnesses.
- Protected source material was not removed without explicit approval.
- `generator/.nojekyll` remains present.
- No stale audit/temp/editor files are committed.
- Generated FAIL reports are not treated as source of truth if they are known stale or caused by a verifier bug.

## Known open decisions

These are not hidden; keep them explicit:

1. Duplicate PDF originals under `sources/intake/2026-06-09/originals/` — keep unless יניב explicitly approves a cleanup.
2. Overlapping fallback reports — keep as history unless יניב approves consolidation.
3. Future enhancement: inequalities / A8-05 source-question coverage gap — do not begin without approval.
4. Future enhancement: real multi-correct MCQ content — do not claim as complete until engines actually emit more than one correct answer and verifiers distinguish single from multi mode.
5. Final live site URL/status — verify after deployment before presenting it as active.

## Safety rule

- Do not merge feature/product PRs to `main` without explicit approval from Yaniv.
- Do not force-push.
- Do not weaken verifiers.
- Do not delete protected source PDFs.
- Do not mix product feature work into cleanup-only PRs.

## Merge decision

For product/feature PRs, merge only after all are true:

```text
GitHub Actions verify:deep = success
Local or Termux verify:deep = success
Human visual QA = acceptable when visuals are affected
Human print QA = acceptable when print/layout is affected
Manual copy-as-image paste test = acceptable when copy/export is affected
Yaniv explicitly approves the merge
```

For cleanup-only PRs, the PR body must prove that product code, engines, sources and verifier logic were not touched.
