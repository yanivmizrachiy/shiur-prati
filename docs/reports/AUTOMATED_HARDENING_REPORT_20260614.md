# Automated Hardening Report — 2026-06-14

## Scope

This pass hardens the PR without changing the math engines themselves.

## Added

1. GitHub Actions deep gate
   - `.github/workflows/verify.yml`
   - Runs `npm install` and `npm run verify:deep` on PRs, branch pushes and manual dispatch.

2. Repository hygiene verifier
   - `tools/verify-repo-hygiene.mjs`
   - Uses `git ls-files` so local untracked `.claude/` or `_audit/` folders do not fail a developer run.
   - Checks `.gitignore` still protects local-only artifacts and `node_modules/`.

3. Visual QA dashboard
   - `generator/visual-qa.html`
   - Builds from live `SOURCE_REGISTRY`.
   - Covers all 50 `*-ENGINE` topics.
   - Supports grade/domain/status/search filters, global difficulty/qtype selectors, lazy sample generation, 4-question preview, local notes, review statuses and JSON export.
   - Human QA statuses are stored only in browser `localStorage`.

4. Visual QA verifier
   - `tools/verify-visual-qa-dashboard.mjs`
   - Ensures the dashboard exists, loads the full engine stack, builds from the live registry, exposes review statuses, uses localStorage, exports JSON, and can reach every engine sample.

5. Release readiness documentation gate
   - `docs/RELEASE_CHECKLIST.md`
   - `tools/verify-release-readiness-docs.mjs`
   - Keeps README, PROJECT_STATUS and release checklist aligned with the current 50-engine product state.

6. NPM script wiring
   - Version bumped to `0.77.0`.
   - Added `verify:hygiene`, `verify:visual-qa`, and `verify:release-docs`.
   - `verify:deep` now includes the visual QA dashboard gate and the release-docs gate.

7. Navigation and docs
   - `generator/index.html` links to `visual-qa.html` from the teacher panel.
   - `README.md` reflects the current 50-engine product state.
   - `PROJECT_STATUS.md` now reflects PR #7 release-readiness status.

## Not changed

- No engine logic was changed.
- No verifier was weakened.
- No merge to `main` was performed.

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
RELEASE_DOCS_PASS
```
