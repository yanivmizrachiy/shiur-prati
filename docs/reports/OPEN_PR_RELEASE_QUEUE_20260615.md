# Open PR Release Queue — 2026-06-15

Release-manager snapshot of all open PRs, their dependencies, a verified local
merge preflight, and a recommended merge order. Authoritative operating rules are
in `RULES.md`; current status is in `PROJECT_STATUS.md`. This file is the detailed
queue and is referenced from `RULES.md` §7.

## 1. Snapshot

- **main HEAD:** `ba1a0ee` (includes merged PRs #15–#18).
- **Live site:** https://yanivmizrachiy.github.io/targilim/ — HTTP 200, serves `main`.
  Verified `main`-only: `גווני אפור` present (1), `הורד כתמונה` absent (0) ⇒ the UI
  round is **not live yet**.
- **verify:deep on each open branch:** PASS (GitHub Actions `Verify Targilim Deep` = success on #20–#25).
- **Open PRs (ours):** 6 (#20–#25). **External/draft:** #19.
- **Highest risk:** #24 is stacked on #21–#23 (must not merge first); #24 and #25
  both edit the `package.json` `verify:deep` line (trivial conflict).
- **Recommended first merge:** #21.

## 2. PR queue table

| Order | PR | Branch | Purpose | Key files | CI | Depends on | Conflict risk | Action |
|---|---|---|---|---|---|---|---|---|
| 1 | [#21](https://github.com/yanivmizrachiy/targilim/pull/21) | design/professional-exercise-card-v1 | UI: card + typography | index.html, style.css | ✅ | — | shares index.html/style.css with #23/#24, #19 | Merge 1st |
| 2 | [#22](https://github.com/yanivmizrachiy/targilim/pull/22) | design/student-answer-box | UI: single answer box | exercise-set.js, style.css | ✅ | after #21 | shares files with #23/#24 | Merge 2nd |
| 3 | [#23](https://github.com/yanivmizrachiy/targilim/pull/23) | feature/premium-image-export-and-bw-mode | UI: image export + color/BW | exercise-set.js, export.js, index.html, style.css, teacher-mode.js, release-audit.mjs | ✅ | after #22 | shares index.html (#sv) with #19 | Merge 3rd |
| 4 | [#24](https://github.com/yanivmizrachiy/targilim/pull/24) | test/premium-ui-guards | QA guard (verify:premium-ui) | (incl. #21–#23 files) + package.json + verify-premium-exercise-ui.mjs | ✅ | **#21,#22,#23** | package.json line vs #25 | **STACKED — merge only after #21–#23** |
| 5 | [#25](https://github.com/yanivmizrachiy/targilim/pull/25) | fix/forward-mcqmode-multi-correct | Real A7-04 multi-correct (dispatch) | 7 engine wrappers + package.json | ✅ | independent | package.json line vs #24 | Merge after #24; resolve package.json |
| 6 | [#20](https://github.com/yanivmizrachiy/targilim/pull/20) | docs/update-central-ai-rules | Central rules + status + this queue | RULES.md, PROJECT_STATUS.md, this doc | ✅ | should reflect final state | none (docs) | Merge last |
| — | [#19](https://github.com/yanivmizrachiy/targilim/pull/19) | design/luxury-landing-page | Marketing landing page (additive) | index.html (+448), landing.css | draft | — | **high** vs #21/#23 (index.html head + #sv region) | **Hold (draft); rebase after UI round** |

Superseded: `docs/refresh-status-after-ui-and-pages` (the old "PR5") — **superseded by #20, do not merge.**

## 3. Dependency graph

```text
#21 ──▶ #22 ──▶ #23 ──▶ #24 (guard; STACKED on #21–#23)
                          │
                          └── package.json verify:deep line ⇄ #25 (trivial conflict)
#25 (A7-04 dispatch fix) — independent of the UI files
#20 (docs) — no code; should describe the final merged state
#19 (landing) — external, draft, additive; conflicts with #21/#23 on index.html
```

## 4. Merge order options

### Option A — Conservative (docs first)
```text
1. #20  docs/rules (lands the truth + queue early)
2. #21  UI typography
3. #22  answer box
4. #23  image export + BW
5. #24  UI guard
6. #25  A7-04 fix (resolve package.json: keep both scripts)
7. re-check #19
```
Risk: #20 documents the round as "in review", so it would be slightly behind after
the code lands (acceptable; it is explicitly merge-order-aware).

### Option B — Product-first (recommended)
```text
1. #21  UI typography
2. #22  answer box
3. #23  image export + BW
4. #24  UI guard (after #21–#23)
5. #25  A7-04 fix (resolve package.json: keep both scripts)
6. #20  docs/rules last (matches final reality exactly)
7. #19  rebase on updated main, then review
```

**Recommendation: Option B.** Ship the product changes in dependency order, run the
live checklist after #23/#24, then land docs (#20) so the documented state matches
`main` exactly with no follow-up doc drift. #19 is rebased and reviewed only after
the queue is clean.

## 5. Verified local integration preflight (2026-06-15)

Branch `tmp/integration-preflight-20260615` (local only, not pushed), merging
`origin` refs in order:

```text
merge design/professional-exercise-card-v1   → OK
merge design/student-answer-box              → OK
merge feature/premium-image-export-and-bw-mode → OK
merge test/premium-ui-guards                 → OK
merge fix/forward-mcqmode-multi-correct       → CONFLICT (package.json only)
```

- **Only conflict:** `package.json` — both #24 and #25 edit the `verify:deep` line
  and add a sibling `verify:*` script.
- **Resolution (keep both):**
  - scripts: keep `"verify:premium-ui"` **and** `"verify:multi-correct"`.
  - `verify:deep`: `… && npm run verify:copy-export && npm run verify:premium-ui && npm run verify:multi-correct && npm run verify:print-layout && npm run verify:release-docs`.
- After resolving: **`npm run verify:deep` = PASS (EXIT 0, 0 failures)**, including
  `PREMIUM_UI_PASS` and `MULTI_CORRECT_COVERAGE PASS`. No conflict markers remain.

**Integration preflight: PASS** — the whole queue integrates cleanly with the one
documented package.json resolution.

## 6. Live verification

```text
GET https://yanivmizrachiy.github.io/targilim/  → HTTP 200
title: תרגילים — מחולל תרגילי מתמטיקה
"גווני אפור": present (main not yet updated)
"הורד כתמונה": absent (UI round not merged)
```
Do not claim the UI round is live until #21–#24 merge and Pages redeploys.

## 7. Feature freeze

`feat: U7-03 single-answer MCQ` and any new content work are **paused** until this
queue is merged in order, the live site is verified after the UI round, and #19 is
resolved. Do not open U7-03 before then.
