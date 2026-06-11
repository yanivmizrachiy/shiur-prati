# Worklog — chronological batch record

Append-only. Every worker adds an entry after real work (see `RULES.md` §0.5).
Statuses: DONE / PARTIAL / NOT DONE / NEEDS REVIEW / BLOCKED.

---

## Before Batch 2 (state as of 2026-06-11)

- 25 engine topics exist in code; Phase 2/3A static verifiers pass locally and in CI.
- Live site returns 200 for home/core/style/pattern-engine.
- Batches 1/1.1/1.2 merged into main; main HEAD `9956ba9` (CI live-report commit on top of `e678e85`).
- Source alignment, pedagogical audit, visual modes, UI polish: NOT DONE.

## Batch 1 — commit `a72625f` (2026-06-11) — DONE

- Removed `STAGE2_RUN_LOG.txt`.
- Fixed "משוואות מד ראשונה" → "משוואות מדרגה ראשונה" (core.js TOPICS, pattern-engine A7-03-ENGINE label).
- Added site-only header credit: האתר מנוהל על ידי יניב רז.
- Added site-only `#mainTitle` (תחום — נושא) outside the qcard, hidden in print.
- export.js untouched. Tests: phase2/phase3a static verifiers PASS, node --check PASS.

## Batch 1.1 — commit `8333446` (2026-06-11) — DONE

- Removed from qcard markup (both render paths): technical/ENGINE id, topic title span, "מנוע חדש ✦" badge — copied PNG/print stay clean.
- `setMainTitle` now uses teacher-facing domain nouns (אלגברה / גאומטריה / תחום מספרי / אי־ודאות) and strips engine suffixes.
- `.engine-badge` CSS kept (verifier guardrail). Tests: both verifiers PASS, setMainTitle unit test PASS.

## Batch 1.2 — commit `e678e85` (2026-06-11) — DONE

- Added `data-html2canvas-ignore="true"` to the expbar in both render paths: export buttons stay usable on site, excluded from copied PNG.
- export.js untouched. Tests: both verifiers PASS.
- Open follow-up: manual copy-image browser check by Yaniv recommended (NEEDS REVIEW, non-blocking).

## Batch 2 — branch `claude/batch2-governance-status` (2026-06-11) — DONE

- Governance docs only; no engine/export/UI code touched.
- `RULES.md`: added §0 Governance (product definition, preservation rule, content authority, pedagogy rules, worker obligations, status vocabulary).
- `PROJECT_STATUS.md`: added Snapshot (REAL_PROGRESS_PERCENT: 35%, batch statuses, engine count, risks, not-done list, next major work).
- Created `docs/WORKLOG.md` (this file).
- Tests run: `node tools/verify-phase3a-static.mjs`, `node tools/verify-phase2-static.mjs`, `git diff --check` — all PASS.

## Batch 3 — branch `claude/batch3-source-alignment-map` (2026-06-11) — DONE

- Commit: see branch head (docs-only; no engine/export/UI code touched).
- Created `docs/SOURCE_ALIGNMENT.md`: full alignment matrix for all 25 engines — engine ID, site name, grade, domain, source file, source topic/pattern, skills, question families, visual requirement, status, reason, action.
- Key finding: engine IDs follow PATTERN_INDEX pattern IDs, not curriculum topic IDs; canonical translation table added (G7-01↔pattern G7-04, G7-04↔pattern G7-01, G8-04↔pattern G8-02, U7-02↔pattern U8-02, N7 numbering off by one vs curriculum, A8-03↔curriculum A8-04). No deletions, no code renames — REMAP is documentation-only.
- Statuses: KEEP 16, REMAP 4, PATCH QUESTIONS 2 (A7-01, A8-02), ADD MISSING FAMILY 3 (N7-03, N7-04, U7-01). Gap list of unimplemented source patterns recorded.
- `PROJECT_STATUS.md`: REAL_PROGRESS_PERCENT 35% → 45% (map complete for 25/25); map DONE, implementation NOT DONE.
- Tests: `verify-phase3a-static.mjs` PASS, `verify-phase2-static.mjs` PASS, `git diff --check` clean.

## Batch 4.1 — branch `claude/batch4-1-n7-04-source-fix` (2026-06-11) — DONE

- Files: `generator/engine/pilot-n7-04.js`, `docs/SOURCE_ALIGNMENT.md`, `PROJECT_STATUS.md`, this file.
- Added `estimate` family per source pattern N7-04 ("בלי לחשב..."): open (classify 3 exercises by sign with reasoning), mcq (exactly one negative result among 4), tf/mistake (misconception: "הספרה הגדולה ⇒ תוצאה חיובית"). Extended missing-addend with 3 cases. No other engines touched; export untouched.
- Map correction: Batch 3 map wrongly said N7-04 had compute only — missing-addend already existed; real gap was estimation. N7-04 now KEEP.
- Tests: node --check PASS; sample harness 2,400 generations (3 diff × 4 types × 200) — 0 failures, MCQ always exactly 1 correct, estimation family active; both static verifiers PASS; git diff --check clean.
- Progress: 45% → 48%.

## Next action

- Batch 4.2+ (pending Yaniv approval): remaining targeted fixes — N7-03 (number-line families), U7-01 (relative frequency), A7-01/A8-02 (PATCH QUESTIONS). Then UI/variety/visual modes. No rewrites.
