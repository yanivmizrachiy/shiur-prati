# Release Readiness Checklist — PR #7

## Current branch

- Branch: `feat/source-bible-variety-dedicated-engines`
- Target: `main`
- Status: keep as draft PR review branch until explicit approval from יניב.
- Canonical status report: `docs/reports/FINAL_PR7_RELEASE_STATUS_20260614.md`.

## Automated gates required before merge

Run locally and in GitHub Actions:

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
- Documentation indexes remain present: `docs/README.md`, `tools/README.md`, and `docs/reports/FINAL_PR7_RELEASE_STATUS_20260614.md`.

## Human QA required before merge

Automated checks are necessary but not enough. Before marking the PR ready or merging:

1. Open `generator/visual-qa.html`.
2. Confirm the dashboard shows all 50 engines after a hard reload.
3. Generate at least one sample for every visible engine.
4. Mark each engine as: יפה / צריך תיקון / בעיה בשרטוט / בעיה בהדפסה / בעיה בטקסט.
5. Export the QA JSON from the dashboard.
6. Print at least one A4 worksheet with diagrams.
7. Print at least one A4 worksheet with answer key open.
8. Confirm teacher-only controls/cards do not appear in student print.
9. In a real browser, click “העתק כתמונה” on a question containing a diagram.
10. Paste the result into Word/Canva/Docs and confirm both Hebrew text and drawing are present.

## Repo organization checks before merge

- `docs/` root contains only load-bearing/cross-linked docs.
- Historical docs remain organized under purpose folders.
- `docs/README.md` links to the current source-of-truth reports.
- `tools/README.md` maps wired verifiers, standalone verifiers, generators and harnesses.
- Protected source material was not removed without explicit approval.
- `generator/.nojekyll` remains present.
- No stale audit/temp/editor files are committed.

## Known open decisions

These are not hidden; keep them explicit:

1. Duplicate PDF originals under `sources/intake/2026-06-09/originals/` — keep unless יניב explicitly approves a cleanup.
2. Overlapping fallback reports — keep as history unless יניב approves consolidation.
3. Future enhancement: inequalities / A8-05 source-question coverage gap — do not begin before release-readiness approval.
4. Final live site URL — verify after deployment/merge before presenting it as active.

## Merge decision

Merge only after all are true:

```text
GitHub Actions verify:deep = success
Local or Termux verify:deep = success
Human visual QA = acceptable
Human print QA = acceptable
Manual copy-as-image paste test = acceptable
Yaniv explicitly approves the merge
```
