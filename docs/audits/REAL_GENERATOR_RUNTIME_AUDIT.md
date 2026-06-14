# Real Generator Runtime Audit — branch `fix/deep-real-generator-upgrade-v1`

**Date:** 2026-06-12

## What was true before this branch

- The runtime produced **one question card per click** (`out.innerHTML` overwrite in
  `renderCard` / `E.renderEngineCard`).
- No exercise-count control, no mixed-type mode, no set renderer, no answer key.
- The 25 engines themselves were real and harness-validated, but they were only
  exposed through the single-card path.

## What this branch adds (browser runtime, not a PDF workbook)

| Capability | Where | Status |
|---|---|---|
| מספר תרגילים (1/5/10/15/20, default 10) | `generator/index.html` (`#sn`) | ✅ |
| סוג שאלות incl. מעורב (default) | `generator/index.html` (`#selQType`) | ✅ |
| Engine access layer (structured exercise, no UI) | `pattern-engine.js` → `E.getEngineExercise` | ✅ |
| Set generation + duplicate avoidance (count×8 retry, best-effort) | `generator/exercise-set.js` → `generateSet` | ✅ |
| Mixed distribution open/mcq/tf/mistake + per-item open fallback | `buildTypePlan` / `makeExercise` | ✅ |
| Numbered RTL set renderer with diagrams, KaTeX, visual mode | `renderExerciseSet` | ✅ |
| מפתח תשובות (הצג תשובות ⇄ הסתר תשובות), printable only when open | `toggleAnswerKey` + `style.css` print rules | ✅ |
| הדפס דף תרגילים (browser print; controls hidden) | `printExerciseSet` + `@media print` | ✅ |
| Legacy (non-engine) topics also produce sets | `renderCard` capture hook in `core.js` | ✅ (open type only) |
| count=1 keeps old single card with copy/PNG/print | `generate()` dispatch in `core.js` | ✅ |
| MCQ correct choice hidden on worksheet, shown in answer key | `.exset .mcq-correct` neutralized + `correctLabel` | ✅ |

Verified by `tools/verify-real-generator-runtime.mjs` (40 checks, including a
Node VM smoke run of the real runtime files).

## Known limitations (honest)

- **Copy-image / PNG per exercise** exists only in single-card mode (count=1).
  Multi-exercise sets are exported via browser print; per-card export buttons were
  not duplicated into set cards to keep the worksheet clean. Documented limitation.
- **Legacy (non-engine) topics** ignore סוג שאלות (they predate question types);
  sets from them are open questions only.
- **Small case pools** mean a 15–20 exercise set from a single narrow topic may
  repeat after the retry budget is exhausted (best set is still rendered).

## Engine quality status (updated after round 2, 2026-06-12)

TF truth-balance **fixed in all 25 engines** (measured 25–56% true over 1,000
draws each; floor enforced by tools/verify-variety.mjs). Statements use only
existing case data — no invented content. Four real truth-mislabeling bugs were
found and fixed during this pass:
- A7-03: verify-family TF could show a ✓/✗ verdict contradicting the statement.
- G7-01: the 6×3 rectangle (area = perimeter = 18) made the "false" claim true.
- U8-01: one dataset was pre-sorted, so the "unsorted middle" median claim was true.
- N8-03/N8-05: guarded scale/percent edge cases where the distractor equals the truth.

RTL/math root fix: `.katex{direction:ltr}` + `svg text{unicode-bidi:plaintext}`
(equations and negative labels no longer mirror on the RTL page) — verified live.

Dynamic source-range generation (values are teacher-changeable per learning
file 05 / PATTERN_INDEX): N7-03, N7-04, N7-05, N7-06, A7-02 — unique-question
rate 37/40 vs ~11–15 for the remaining pool-based engines.

Diagram variation: right-triangle orientation ×4, triangle apex ×15, circle
radius angle ×5, rectangle aspect from values, similar-triangles side swap.

## NEEDS SOURCE REVIEW (do not invent — re-read PDFs first)

- Per-file source citations missing in engine headers: G7-03, N8-01, N8-02,
  N8-03, N8-04, N8-05 (topics themselves are present in CURRICULUM_MAP v1.1).
- Case-pool expansion for the smallest engines (N7-06, A7-02, U7-02, N7-05)
  must come from source-learning / PATTERN_INDEX numbers, not invention.
- Number-line visuals for N7-04/N7-05 are specified in PATTERN_INDEX but the
  engines currently pass empty SVG.

## Authority and honesty statement

- The 10 PDFs in `sources/intake/2026-06-09/` remain the content authority.
- This branch used the derived learning files for grounding; no curriculum
  content was invented.
- REAL_PROGRESS_PERCENT: 72%. Not 100%. Human teacher QA of generated sets,
  real-device print checks, and the NEEDS SOURCE REVIEW items are still open.
