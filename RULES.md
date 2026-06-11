# Project Rules — Targilim Hebrew Math Exercise Generator

Repository: `yanivmizrachiy/targilim`

Hebrew project name: `תרגילים`

Last updated: 2026-06-11

---

## 0. Governance — read this first

Every worker (human or AI) must read this file and `PROJECT_STATUS.md` before any change.

### 0.1 Product definition

- The product is a Hebrew smart math exercise generator for Grades 7–8 only.
- No active Grade 9. Grade 9 may exist only as locked source/reference material, never as active product.
- No worksheet mode. No booklet mode. No PDF workbook mode.
- No `engine2`. No `new-engine`. There is one engine; improve it in place.
- No fake controls.

### 0.2 Preservation rule

- Do not delete or restart existing working engines.
- The 25 existing working engine topics are preserved by default.
- Existing working engines must be improved in place, not replaced or rewritten from scratch.

### 0.3 Content authority

- Source files/pages uploaded to the repo (`sources/`, `source-materials/`, `source-learning/`) are the content authority.
- Current engine code is implementation, not content authority.
- If engine IDs differ from source topic IDs: do not delete engines — map/remap and document the mapping.
- Every active topic must be traceable to: source file, source topic/skill, question families, and visual requirement when relevant.

### 0.4 Pedagogy rules

- Questions must be pedagogically aligned with the sources, not generic math filler.
- Difficulty must be mathematically real, not just longer text.
- MCQ distractors must represent real student misconceptions.
- True/false items must be non-trivial.
- Mistake/critique questions must test real misconceptions.
- UI must be Hebrew, teacher-friendly, and grammatically correct.

### 0.5 Worker obligations

- Every worker must update `PROJECT_STATUS.md` and `docs/WORKLOG.md` after real work.
- Do not claim DONE without evidence/tests.
- Progress percentage (`REAL_PROGRESS_PERCENT` in `PROJECT_STATUS.md`) is an honest estimate weighing: engines existing in code, source alignment completed, pedagogical audit completed, visual/UI completion, and live verification. It only moves with evidence.

### 0.6 Status vocabulary

Use only these statuses for work items: `DONE`, `PARTIAL`, `NOT DONE`, `NEEDS REVIEW`, `BLOCKED`.

---

## 1. Product scope

The product is a **smart Hebrew math exercise generator for Grades 7–8 only**.

Removed from active project scope:

- Grade 9.
- Worksheet mode.
- Booklet mode.
- PDF workbook mode.
- Bulk A4 worksheet generation.

Do not plan, design, or implement removed scope unless Yaniv explicitly reopens it later.

---

## 2. Roles

Yaniv is the product owner and teacher.

Claude is the project manager / pedagogy / design decision-maker.

ChatGPT/Codex are execution assistants.

Execution rule:

- Claude decides strategy, pedagogy, design direction, source interpretation, and quality gates.
- ChatGPT/Codex execute approved repository changes while preserving repository reality.
- Yaniv must not be forced to manage routine technical decisions.
- No agent may ask Yaniv to repeat the generator vision already documented in the repo.

---

## 3. Current true status

Completed or present:

- Source audit and source-learning phase completed.
- Repository structure is modular and organized.
- Public generator exists under `generator/`.
- GitHub Pages deployment workflow exists.
- `generator/.nojekyll` exists.
- `phase2-loader.js` exists.
- Static verifier exists.
- Browser batch verifier exists.
- Pages healthcheck workflow exists.
- `PROJECT_STATUS.md` exists and must remain truthful.
- Premium mobile-first RTL CSS redesign has been applied.
- 25 code-active legacy slices exist for Grades 7–8.
- Yaniv's true generator vision is documented in `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`.
- A formal Phase 3A gate issue exists: `https://github.com/yanivmizrachiy/targilim/issues/1`.
- Phase 3A engine code exists for six topics: `G7-03-ENGINE`, `N8-01-ENGINE`, `N8-02-ENGINE`, `N8-03-ENGINE`, `N8-04-ENGINE`, and `N8-05-ENGINE`.

Current limitation:

- The live system is beyond the initial MVP but still not the full intelligent generator.
- Most topics are still legacy slices, not full source-bound engine templates.
- Full conversion of all 25 legacy topics to the engine has not yet been built.
- Dynamic diagram/graphics coverage is not complete for every visual topic.
- Real difficulty logic across all topics has not yet been built.

---

## 4. Active generator slices

The project currently has 25 code-active legacy slices.

### Grade 7

- `G7-01` — Rectangle and box.
- `G7-02` — Flat shape areas.
- `G7-03` — Pythagoras — missing side.
- `G7-04` — Missing angle in triangle.
- `N7-03` — Negative numbers on number line.
- `N7-04` — Signed addition/subtraction.
- `N7-05` — Signed multiplication/division.
- `N7-06` — Powers: `(−a)^n` vs `−a^n`.
- `N7-07` — Square root — exact and estimation.
- `A7-01` — Algebraic expressions.
- `A7-02` — Substitution in expression.
- `A7-03` — First-degree equations.
- `U7-01` — Frequency table.
- `U7-02` — Basic probability.

### Grade 8

- `G8-01` — Circle circumference and area.
- `G8-04` — Similarity / triangle scale factor.
- `N8-01` — Ratio.
- `N8-02` — Proportion.
- `N8-03` — Scale.
- `N8-04` — Static percentages.
- `N8-05` — Dynamic percentages.
- `A8-02` — Slope and line equation.
- `A8-03` — Systems of equations.
- `U8-01` — Mean, median, range.
- `U8-02` — Basic probability.

### Phase 3A engine topics

- `G7-03-ENGINE` — Pythagoras true engine pilot: dynamic data, unknown switching, question types, real difficulty, dynamic SVG.
- `N8-01-ENGINE` — Ratio true engine topic: source-bound ratio families, dynamic data, unknown switching, question types, real difficulty, dynamic ratio SVG.
- `N8-02-ENGINE` — Proportion true engine topic: proportion/missing/rate families, dynamic data, question types, real difficulty, dynamic proportion-table SVG.
- `N8-03-ENGINE` — Scale true engine topic: dynamic scale data, unknown switching, question types, real difficulty, dynamic map/scale SVG.
- `N8-04-ENGINE` — Static percentages engine pilot: percent families, unknown switching, question types, real difficulty.
- `N8-05-ENGINE` — Dynamic percentages true engine topic: increase/decrease/original/two-step families, dynamic data, question types, real difficulty, dynamic percent-change SVG.

---

## 5. Do not repeat completed work

Future work must not repeat these completed actions:

- Do not recreate the source-learning phase.
- Do not recreate the curriculum map from scratch.
- Do not rebuild the modular architecture from scratch.
- Do not rewrite `index.html` wholesale.
- Do not rewrite `core.js` wholesale.
- Do not rewrite `phase2-loader.js` unless there is a proven loader failure.
- Do not rewrite `export.js` unless export is proven broken.
- Do not re-add the same 25 legacy slices.
- Do not recreate the Phase 3A engine foundation already present under `generator/engine/`.
- Do not create duplicate topic IDs.
- Do not mark `Live ✅` without actual verification.

Every future change must first inspect repository reality.

---

## 6. Protected files and folders

Do not touch these unless there is explicit need and a clear reason:

- `sources/`
- `archive/`
- `knowledge-base/`
- `generator/export.js`, unless export is proven broken.
- `generator/phase2-loader.js`, unless a loader failure is proven.
- all legacy slice files, unless fixing a real mathematical/UI/runtime issue.
- `RULES.md`, except for truth/status/rule updates.
- `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`, except for approved vision refinements.

Do not delete files without explicit approval.

---

## 7. Source-bound rule

Every exercise must remain source-bound.

No generic curriculum invention.

Every generated topic/template must map to:

- grade;
- domain;
- topic;
- skill;
- source or approved source-learning note;
- safe parameter set;
- correct answer logic;
- diagram need, if relevant;
- question type behavior, if relevant;
- difficulty behavior, if relevant.

If a topic lacks source-backed examples, mark it pending.

---

## 8. True generator vision rule

Phase 3 must not be another set of shallow slices.

Required future capabilities include:

- many questions per topic;
- multiple mathematical pattern families per topic;
- dynamic data generation;
- unknown switching;
- Hebrew wording variation;
- controlled visual themes;
- dynamic SVG diagrams;
- multiple question types: open, multiple choice, completion, true/false, matching, reasoning, mistake identification;
- real difficulty levels: basic, standard, challenge;
- mobile, print, and export compatibility;
- No fake controls;
- no demo-only UI.

---

## 9. Source-based question variety and mathematical writing

The generator must create varied question types based on the actual question patterns found in the source PDFs and source-learning notes.

For each source-backed topic, identify which of the following are appropriate and supported by the sources:

- open calculation questions;
- multiple-choice questions;
- completion questions;
- true/false questions;
- matching questions;
- explanation/reasoning questions;
- identify-the-mistake questions;
- build-an-equation questions;
- read-from-diagram questions;
- diagram-construction or label-the-diagram questions;
- word problems;
- table-based questions;
- graph/chart-based questions when source-backed.

The mathematical writing layer must be strong and professional:

- use KaTeX-compatible notation where appropriate;
- support fractions, roots, powers, percentages, equations, ratios, units, tables, and structured solution steps;
- preserve Hebrew RTL clarity;
- avoid plain-text-only math when proper mathematical notation is needed;
- keep printed and exported math readable.

Do not create unsupported generic question types.

---

## 10. UI, graphics, export and print rules

The public site must remain:

- Hebrew-only for user-facing text;
- RTL;
- mobile-first;
- visually premium;
- readable on phone;
- teacher-friendly;
- suitable for print/export;
- free of demo labels and fake controls.

Graphics are first-class product behavior, not decoration.

Dynamic visual work must preserve:

- premium educational visual quality;
- clean drawings and diagrams;
- controlled colors;
- strong visual hierarchy;
- no overlap;
- export-safe SVG/HTML;
- mobile-safe layout;
- print-safe layout;
- classroom-ready appearance.

The following must remain working:

- copy as image;
- PNG download fallback;
- print layout.

Do not change `export.js` unless the export pipeline is proven broken.

---

## 11. Deployment and verification rules

Public URL:

`https://yanivmizrachiy.github.io/targilim/`

Required verification assets:

- `tools/verify-phase2-static.mjs`
- `.github/workflows/verify-phase2-static.yml`
- `.github/workflows/pages-healthcheck.yml`
- `.github/workflows/verify-phase2-batch.yml`
- `tools/verify-phase3a-static.mjs`
- `.github/workflows/verify-phase3a-static.yml`
- `.github/workflows/verify-phase3a.yml`

Before claiming Phase 3A complete, verify:

- `G7-03-ENGINE` appears in selector and generates correctly;
- `N8-01-ENGINE` appears in selector and generates correctly;
- `N8-02-ENGINE` appears in selector and generates correctly;
- `N8-03-ENGINE` appears in selector and generates correctly;
- `N8-04-ENGINE` appears in selector and generates correctly;
- `N8-05-ENGINE` appears in selector and generates correctly;
- engine panel controls are real and affect output;
- open / MCQ / true-false / mistake question types work;
- basic / standard / challenge difficulty works;
- Pythagoras dynamic SVG renders;
- legacy `G7-03`, `N8-01`, `N8-02`, `N8-03`, `N8-04`, and `N8-05` still work;
- export buttons remain present;
- mobile view has no horizontal scroll;
- `PROJECT_STATUS.md` and the Phase 3A report match observed results.

No `Live ✅` without real live verification.

---

## 12. Documentation truth rule

`PROJECT_STATUS.md` must describe the current truth.

Never write fake PASS, fake live verification, fake production readiness, fake test results, or claims that a workflow passed if it was not actually observed.

Use honest statuses:

- `Code ✅` for code that exists and is registered.
- `Live ⚠️` for code that is not yet live/browser verified.
- `Live ✅` only after real verification.

---

## 13. Current next action

Phase 3A code now exists. Future work must not restart Phase 3A.

Before continuing beyond Phase 3A:

1. Verify `.github/workflows/verify-phase3a-static.yml`.
2. Verify `.github/workflows/verify-phase3a.yml` or equivalent live/browser checks.
3. If they pass, update `PROJECT_STATUS.md` and `docs/reports/PHASE3A_ENGINE_REPORT_2026-06-10.md` truthfully.
4. If they fail, fix only the exact failing item.
5. Existing 25 slices must continue working.
6. The current MVP must remain live.
7. No Grade 9.
8. No fake controls.
9. No shallow demo.
10. No worksheet/booklet mode.
11. Report truth only.

Phase 3A acceptance requires:

- a real engine foundation beside the old system;
- six engine topics currently present in code: `G7-03-ENGINE`, `N8-01-ENGINE`, `N8-02-ENGINE`, `N8-03-ENGINE`, `N8-04-ENGINE`, and `N8-05-ENGINE`;
- changing data;
- changing unknown target;
- changing Hebrew wording;
- at least two question types;
- real difficulty behavior;
- correct solution generation;
- dynamic premium graphics for `G7-03-ENGINE`, `N8-01-ENGINE`, `N8-02-ENGINE`, `N8-03-ENGINE`, and `N8-05-ENGINE`;
- strong mathematical writing;
- old 25 slices still working;
- mobile/export/print still working;
- documentation updated truthfully.

---

## 15. Current next action

The next meaningful action is to continue building the smart generator engine only.

Do not build worksheets/booklets.

Next generator-engine work should convert additional legacy topics into true engine topics with:

- source-bound template families;
- dynamic data;
- unknown switching;
- Hebrew wording variation;
- real question types;
- real difficulty behavior;
- premium visual layer where relevant.
