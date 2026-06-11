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

## Batch 4.2 — branch `claude/batch4-2-u7-01-relative-frequency` (2026-06-11) — DONE

- Files: `generator/engine/pilot-u7-01.js`, `docs/SOURCE_ALIGNMENT.md`, `PROJECT_STATUS.md`, this file.
- Added `rel_freq` family per source file 06 ("חשבו תדירות יחסית... הביעו כשבר/עשרוני/אחוז"): open = fraction + decimal + percent with simplification steps; mcq = percent answer, distractors include the absolute count (real misconception); tf/mistake = student reads the absolute count as the relative frequency. All totals 20 → clean fractions/decimals/percents.
- Existing families (read_freq, most_frequent, total_check, missing_freq) and table SVG preserved. No other engines touched; export untouched.
- Noted in map: raw-data→table construction family still NOT DONE (future variety batch).
- Tests: node --check PASS; sample harness 2,400 generations — 0 failures, MCQ exactly 1 correct + unique choices, rel_freq active (598×); both static verifiers PASS; git diff --check clean.
- Progress: 48% → 51%.

## Completion sprint — branch `claude/full-completion-sprint` (2026-06-11) — DONE (scope), product NEEDS REVIEW

- Commits: Sprint 1/3 engine fixes, Sprint 2/3 visual mode, Sprint 3/3 docs.
- Engine fixes (closes all SOURCE_ALIGNMENT actions): A7-01 rectangle k-times-side family (perimeter 2(x+kx), area kx²; perimeter/area-confusion mistake type); N7-03 fraction placement family on number line (incl. −3.5 style, finer ticks via new step param) + fixed pre-existing MCQ filler collision; A8-02 new `linearGraphSvg` (axes/grid/line/labeled points) wired into all 4 families; G8-04 area-ratio family (k² rule; ×k misconception distractor).
- Visual mode: תצוגת שרטוטים = צבע / גווני אפור / שחור-לבן; rewrites SVG fill/stroke in the DOM (originals cached) so copy/PNG/print honor it; auto-applied in both render paths. Unit-tested in Node; browser check pending.
- Docs: created `docs/VISUAL_QUALITY_AUDIT.md`; SOURCE_ALIGNMENT rows N7-03/A7-01/A8-02 → KEEP, G8-04 family gap closed; PROJECT_STATUS rewritten (51% → 72%).
- Tests: node --check on all edited JS; harness 9,600 generations across 4 engines — 0 failures, MCQ exactly-1-correct + unique choices; visual-mode unit test (gray/bw/restore) PASS; both static verifiers PASS; git diff --check clean.
- Not touched: export.js, digital-pdf-book, legacy slice files, unrelated engines, RULES.md.

## Final QA polish sprint — branch `claude/final-qa-polish-sprint` (2026-06-11) — DONE (scope)

- Hebrew/UI: dropdown "— מנוע מלא ✦" → "— גרסה חכמה ✦" (25 topics + 25 card titles); panel label "רמת מנוע" → "רמת קושי"; mainTitle strip regex extended; fixed A7-01 singular-form bug ("כרטיסיס"/"מחבריס") with proper gendered forms; answer wording uses the actual item.
- Question quality: G8-04 is-similar MCQ now has 3 options ("אי אפשר לקבוע לפי הנתונים") — no longer guessable coin flip. Audited N7-03/N7-04/A8-02/U7-01 wording — no further clear issues found (deeper judgment left to human review).
- Visual: linearGraphSvg gained italic x/y axis letters. Other diagrams KEEP per audit.
- Export risk review (code evidence): expbar data-html2canvas-ignore in both render paths ✓; applyVisualMode runs on render and on mode change (DOM current before copy) ✓; credit/title outside qcard and hidden in print ✓; engine panel hidden in print ✓.
- Docs: created docs/QA_CHECKLIST.md (manual live QA list); VISUAL_QUALITY_AUDIT updated; PROJECT_STATUS 75% → 80%.
- Tests: node --check (5 files) PASS; harness 10,800 generations across 6 engines (N7-03, N7-04, A7-01, A8-02, G8-04, U7-01) — 0 failures, MCQ exactly-1-correct + unique choices, non-word guard clean; mainTitle strip unit test PASS; both static verifiers PASS; git diff --check clean.

## Automated release hardening — branch `claude/automated-release-hardening` (2026-06-11) — DONE (scope)

- New permanent tools: `tools/harness-engines.mjs` (loads all engine files in a Node VM, generates every difficulty × question type; checks empty/undefined/NaN, MCQ exactly-1-correct, unique choices, SVG roots) and `tools/release-audit.mjs` (23 static invariants: files/registrations, no teacher-facing jargon, credit/title site-only, export exclusions, visual-mode wiring, collision-safe MCQ fillers, docs coherence).
- Real bug found by the harness and fixed: G8-01 radius-from-circumference MCQ duplicate choices (distractor r×2 always equals Ck). Fix: distractor replaced with r² (area confusion) + collision-safe filler.
- Systematic hardening: the shared unsafe MCQ filler loop (`while(values.length<4) values.push(...)`) replaced with a collision-safe loop in 16 engine files.
- Hebrew/UI static scan: zero hits for מנוע מלא / רמת מנוע / מנוע חדש; no visible technical ids; credit + main title verified site-only by audit.
- Visual/export code inspection: all invariants PASS (see release-audit output). No bug found in export path; export.js untouched.
- Tests: harness 45,000 generations — 0 failures; release audit 23/23 PASS; node --check on all 25 pilots; both static verifiers PASS; git diff --check clean.
- Progress: 82% → 90%. Remaining to 100%: human live-browser QA only (docs/QA_CHECKLIST.md sections C+D especially), plus optional gap-list topics.

## Final release — branch `claude/final-release-100` (2026-06-11) — DONE

- Header credit: wording changed to exact האתר מנוהל ע"י יניב רז, color white (#ffffff on the dark header), small (0.68rem). Site-only guarantees unchanged: lives in the header (hidden in @media print), outside the qcard (never captured by copy-image/PNG).
- `tools/release-audit.mjs` extended: exact credit wording, white+small CSS, credit-outside-qcard — 26 checks total, all PASS.
- Full release validation: harness 45,000 generations 0 failures; release audit PASS; both static verifiers PASS; git diff --check clean; jargon scan 0 hits; רמת קושי and visual-mode options verified present.
- REAL_PROGRESS_PERCENT: 100% per owner's release criteria (all automated checks pass; no code-side blocker). Human live checks in QA_CHECKLIST C/D remain recommended post-release validation, not blockers.

## Next action

- Merge to main, let Pages deploy, spot-check the live header credit. Future work is optional enhancement only.
