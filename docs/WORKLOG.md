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

## Next action

- Batch 3 (pending Yaniv approval): source alignment map — trace each of the 25 engines to source file, topic/skill, question families, visual requirement. Then UI/variety/visual modes.
