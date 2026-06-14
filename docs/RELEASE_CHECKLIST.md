# Release Readiness Checklist — PR #7

## Current branch

- Branch: `feat/source-bible-variety-dedicated-engines`
- Target: `main`
- Status: keep as PR review branch until human approval.

## Automated gates required before merge

Run locally and in GitHub Actions:

```bash
npm install
npm run verify:deep
```

Required gates inside `verify:deep`:

- `verify:hygiene`
- `verify:source-lock`
- `verify:source-bible`
- `verify:coverage`
- `verify:stress`
- `verify:variety`
- `verify:visual`
- `verify:family`
- `verify:followups`
- `verify:graphics-quality`
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
- All engines source-locked to the approved intake PDFs.
- Source file 10 is never used as a direct question source.
- Teacher Advanced Mode remains opt-in and hidden from student print/export.
- `generator/gallery.html` and `generator/visual-qa.html` build from the live registry.
- UI and student-facing output remain Hebrew RTL.
- Visible owner credit remains `יניב רז`.

## Human QA required before merge

Automated checks are necessary but not enough. Before marking the PR ready or merging:

1. Open `generator/visual-qa.html`.
2. Generate at least one sample for every visible engine.
3. Mark each engine as:
   - יפה
   - צריך תיקון
   - בעיה בשרטוט
   - בעיה בהדפסה
   - בעיה בטקסט
4. Export the QA JSON from the dashboard.
5. Print at least one A4 worksheet with diagrams.
6. Print at least one A4 worksheet with answer key open.
7. Confirm teacher-only controls/cards do not appear in student print.

## Hard safety rules

- Do not merge to `main` without explicit approval from יניב.
- Do not force push.
- Do not weaken any verifier to pass.
- Do not merge old PR branches directly.
- Do not commit `_audit/`, `.claude/`, `TARGILIM_*_AUDIT*.txt`, `TARGILIM_*_INTEL*.txt`, or `node_modules/`.

## Human QA

Human QA means a teacher checks the actual generated examples in the browser, not only the automated test output.

## Merge decision

Merge only after all three are true:

```text
GitHub Actions verify:deep = success
Local or Termux verify:deep = success
Human visual/print QA = acceptable
```
