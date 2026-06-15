# Merge Runbook — 2026-06-15

One short, actionable document to merge the open queue safely without guessing.
Detailed queue/dependency graph: `docs/reports/OPEN_PR_RELEASE_QUEUE_20260615.md`.
Operating rules: `RULES.md`. Status: `PROJECT_STATUS.md`.

> Nothing is merged yet. Do not merge without Yaniv's explicit approval.
> No force push. No remote branch deletion.

## 1. Current `main`
- HEAD `ba1a0ee` (includes merged #15–#18). The UI round and the A7-04 fix are **not** in `main`.

## 2. Live site
- https://yanivmizrachiy.github.io/targilim/ — HTTP 200, serves `main`.
- Verified `main`-only: `גווני אפור` **present**, `הורד כתמונה` **absent** ⇒ UI round **not live**.

## 3. Open PRs (#19–#25)

| PR | Branch | What | State | Decision |
|---|---|---|---|---|
| #21 | design/professional-exercise-card-v1 | card + typography | CI ✅ | **Merge #1** |
| #22 | design/student-answer-box | single answer box | CI ✅ | **Merge #2** |
| #23 | feature/premium-image-export-and-bw-mode | image export + color/BW | CI ✅ | **Merge #3** |
| #24 | test/premium-ui-guards | verify:premium-ui guard | CI ✅ | **Merge #4 — STACKED, not before #21–#23** |
| #25 | fix/forward-mcqmode-multi-correct | real A7-04 multi-correct | CI ✅ | **Merge #5 — resolve package.json** |
| #20 | docs/update-central-ai-rules | rules + status + boards | CI ✅ | **Merge #6 (last)** |
| #19 | design/luxury-landing-page | marketing landing page | **Draft** | **HOLD** |

## 4. Ready to merge
- #21, #22, #23, #24, #25, #20 — all green on GitHub Actions `verify:deep`.

## 5. Do NOT merge
- #24 **before** #21–#23 (it is stacked on them).
- #19 (draft; overlaps `generator/index.html` with #21/#23).
- `docs/refresh-status-after-ui-and-pages` (old "PR5").

## 6. Hold
- **#19** — keep as draft. After the queue lands, rebase on updated `main`, re-run `verify:deep`, then mark Ready.

## 7. Superseded
- **`docs/refresh-status-after-ui-and-pages` (old PR5)** — superseded by **#20**. Do not merge; close it.

## 8. Final merge order
```text
#21 → #22 → #23 → #24 → #25 → #20
```
Notes:
- #24 is **stacked** on #21–#23 — never merge it first.
- #25 conflicts with #24 **only** in `package.json`.
- #20 merges **last** so the documented state matches `main` exactly.
- After the queue: rebase & review #19.

## 9. The single known conflict
- **File:** `package.json` (the `verify:deep` line + the new sibling `verify:*` script).
- **Between:** #24 (`verify:premium-ui`) and #25 (`verify:multi-correct`).
- **Surfaces when:** merging #25 after #24 (verified in local preflight).

## 10. Exact resolution for `package.json`
Keep **both** scripts. In the `scripts` block:
```json
"verify:copy-export": "node tools/verify-copy-export.mjs",
"verify:premium-ui": "node tools/verify-premium-exercise-ui.mjs",
"verify:multi-correct": "node tools/verify-multi-correct-coverage.mjs",
"verify:graphics-quality": "node tools/verify-graphics-quality.mjs",
```
And the `verify:deep` line must contain **both**, in this order:
```text
… && npm run verify:copy-export && npm run verify:premium-ui && npm run verify:multi-correct && npm run verify:print-layout && npm run verify:release-docs
```
Verified: after this resolution the integrated `npm run verify:deep` = **PASS** (EXIT 0; `PREMIUM_UI_PASS` + `MULTI_CORRECT_COVERAGE PASS`).

## 11. After EACH merge
- Confirm GitHub Actions `Verify Targilim Deep` = success on `main`.
- If red: stop, do not merge the next PR, fix forward or revert (§13).

### Specifically after #23 (UI complete on the worksheet)
- Locally or on a preview: generate a set; check **color** and **שחור־לבן**; **העתק כתמונה** + **הורד כתמונה**; open the PNG; confirm **all drawings** appear; check **mobile** and **print**; confirm teacher-only chrome is not in the export.

### Specifically after #25 (multi-correct)
- `node tools/verify-multi-correct-coverage.mjs` → PASS (A7-04 multi → ≥2 correct; single → 1).
- `npm run verify:deep` → PASS (the guard is now part of it).

## 12. After Pages redeploys (post-merge)
At https://yanivmizrachiy.github.io/targilim/ :
- site loads (HTTP 200), no 404, no critical console errors;
- view selector shows **only** `צבע` / `שחור־לבן` (no `גווני אפור`);
- each card shows **העתק כתמונה** / **הורד כתמונה**;
- single clean **untitled** answer box (no title/label, no split `דרך:`/`תשובה:`);
- copied/downloaded image includes the drawing;
- only then say the site reflects the new UI.

## 13. Rollback plan (short)
- A merge made `main` red or broke the site? **Revert the merge commit:**
  `git revert -m 1 <merge-commit-sha>` on a branch → PR → merge; or use GitHub's
  **Revert** button on the merged PR.
- Re-run `verify:deep` after the revert. Do not force-push `main`.
- The feature branch stays intact for a fixed re-attempt.

## 14. Feature freeze
**Do not start U7-03 (or any new feature)** until: the whole queue (#21→#20) is
merged, GitHub Actions is green on `main`, and the live site is verified per §12.
Only then open `feat: add source-backed MCQ single to U7-03-ENGINE` (source 06).
