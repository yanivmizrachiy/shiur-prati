# Targilim

Repository: yanivmizrachiy/targilim

Hebrew RTL math exercise generator for Grades 7-8.

Current status:

- 50 מנועי ENGINE פעילים.
- 0 נושאי fallback.
- Main quality gate: `npm run verify:deep`.
- Local/GitHub sync gate: `npm run verify:sync`.
- Workbench gate before continuing feature work: `npm run verify:workbench`.
- Active local worktree note: `docs/reference/ACTIVE_WORKTREE_AND_SYNC.md`.

Entry points:

- generator/index.html
- generator/gallery.html
- generator/visual-qa.html
- generator/book.html
- docs/README.md
- tools/README.md

Verification:

```bash
npm install
npm run verify:sync
npm run verify:workbench
npm run verify:deep
```
