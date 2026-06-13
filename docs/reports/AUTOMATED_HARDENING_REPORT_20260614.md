# Automated Hardening Report — 2026-06-14

## Scope

This pass hardens the PR without changing the math engines themselves.

## Added

1. **GitHub Actions deep gate**
   - `.github/workflows/verify.yml`
   - Runs `npm install` and `npm run verify:deep` on PRs, branch pushes and manual dispatch.

2. **Repository hygiene verifier**
   - `tools/verify-repo-hygiene.mjs`
   - Uses `git ls-files` so local untracked `.claude/` or `_audit/` folders do not fail a developer run.
   - Fails if forbidden local artifacts are tracked.
   - Checks `.gitignore` still protects `_audit/`, `.claude/`, `TARGILIM_*_AUDIT*.txt`, `TARGILIM_*_INTEL*.txt`, and `node_modules/`.

3. **Visual QA dashboard**
   - `generator/visual-qa.html`
   - Builds from live `SOURCE_REGISTRY`.
   - Covers all 50 `*-ENGINE` topics.
   - Supports grade/domain/status/search filters, global difficulty/qtype selectors, lazy sample generation, 4-question preview, local notes, review statuses and JSON export.
   - Human QA statuses are stored only in browser `localStorage`.

4. **Visual QA verifier**
   - `tools/verify-visual-qa-dashboard.mjs`
   - Ensures the dashboard exists, loads the full engine stack, builds from the live registry, exposes review statuses, uses localStorage, exports JSON, and can reach every engine sample.

5. **NPM script wiring**
   - Version bumped to `0.76.0`.
   - Added `verify:hygiene` and `verify:visual-qa`.
   - `verify:deep` now includes the visual QA dashboard gate.

6. **Navigation and docs**
   - `generator/index.html` links to `visual-qa.html` from the teacher panel.
   - `README.md` now reflects the current 50-engine product state instead of the old planning-only status.

## Not changed

- No engine logic was weakened.
- No verifier was weakened.
- No merge to `main` was performed.
- No force push, reset, cleanup delete, or old-branch merge was performed.

## Required next check

Run locally or in CI:

```bash
npm install
npm run verify:deep
```

Expected additional gates:

```text
REPO_HYGIENE_PASS
VISUAL_QA_DASHBOARD_PASS
```
