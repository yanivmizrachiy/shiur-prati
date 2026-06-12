# Project Rules — Targilim Hebrew Math Exercise Generator

Repository: `yanivmizrachiy/targilim`

Hebrew project name: `תרגילים`

Last updated: 2026-06-12

---

## 0. Governance — read this first

Every worker, human or AI, must read this file and `PROJECT_STATUS.md` before any change.

### 0.1 Product definition

- The product is a Hebrew smart math exercise generator for Grades 7–8 only.
- In scope: browser-based multi-exercise generation for the selected topic, including count control, mixed question types, numbered exercise set, browser print, and answer key inside the web app.
- Removed from active scope: Grade 9, separate booklet mode, PDF workbook mode, bulk A4 workbook generation, and separate answer-key booklet systems.
- The in-browser exercise-set generator is not considered the removed PDF/booklet scope.
- These removed items are not backlog items and must not be treated as pending work unless Yaniv explicitly reopens them.
- No `engine2`. No `new-engine`. There is one engine; improve it in place.
- No fake controls.
- No demo-only UI.

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
- Progress percentage (`REAL_PROGRESS_PERCENT` in `PROJECT_STATUS.md`) is an honest estimate based on evidence.

### 0.6 Status vocabulary

Use only these statuses for work items: `DONE`, `PARTIAL`, `NOT DONE`, `NEEDS REVIEW`, `BLOCKED`.

---

## 1. Product scope

The approved product is a **smart Hebrew math exercise generator for Grades 7–8 only**.

Active in-scope browser behavior:

- single-question generation for quick checking;
- multi-exercise browser set generation;
- question count selection;
- mixed question types;
- numbered exercise set rendering;
- answer key inside the web app;
- browser print/export compatibility.

Removed from active project scope:

- Grade 9.
- Separate booklet mode.
- PDF workbook mode.
- Bulk A4 workbook generation.
- Separate answer-key booklet system.

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
- Static verifiers exist.
- Browser/live verification workflows exist.
- Pages healthcheck workflow exists.
- `PROJECT_STATUS.md` exists and must remain truthful.
- Premium mobile-first RTL CSS redesign has been applied.
- 25 code-active legacy slices exist for Grades 7–8.
- 25 active engine topics exist in code for the approved Grades 7–8 scope.
- Browser-based exercise-set generation exists in code.
- Yaniv's generator vision is documented in the repo.

Current limitation:

- Human live browser QA, copy-image pixel review, print-output review, and teacher feedback are recommended non-blocking checks.
- Optional future improvements may include larger case pools and additional source-backed topics beyond the current 25, only if explicitly approved.

---

## 4. Active generator slices and engines

The project has 25 approved source-mapped topics for Grades 7–8.

### Grade 7

- `G7-01` / `G7-01-ENGINE` — Rectangle and box.
- `G7-02` / `G7-02-ENGINE` — Flat shape areas.
- `G7-03` / `G7-03-ENGINE` — Pythagoras.
- `G7-04` / `G7-04-ENGINE` — Missing angle.
- `N7-03` / `N7-03-ENGINE` — Negative numbers on number line.
- `N7-04` / `N7-04-ENGINE` — Signed addition/subtraction.
- `N7-05` / `N7-05-ENGINE` — Signed multiplication/division.
- `N7-06` / `N7-06-ENGINE` — Powers.
- `N7-07` / `N7-07-ENGINE` — Square root.
- `A7-01` / `A7-01-ENGINE` — Algebraic expressions.
- `A7-02` / `A7-02-ENGINE` — Substitution.
- `A7-03` / `A7-03-ENGINE` — First-degree equations.
- `U7-01` / `U7-01-ENGINE` — Frequency table.
- `U7-02` / `U7-02-ENGINE` — Basic probability.

### Grade 8

- `G8-01` / `G8-01-ENGINE` — Circle circumference and area.
- `G8-04` / `G8-04-ENGINE` — Similarity / scale factor.
- `N8-01` / `N8-01-ENGINE` — Ratio.
- `N8-02` / `N8-02-ENGINE` — Proportion.
- `N8-03` / `N8-03-ENGINE` — Scale.
- `N8-04` / `N8-04-ENGINE` — Static percentages.
- `N8-05` / `N8-05-ENGINE` — Dynamic percentages.
- `A8-02` / `A8-02-ENGINE` — Slope and line equation.
- `A8-03` / `A8-03-ENGINE` — Systems of equations.
- `U8-01` / `U8-01-ENGINE` — Mean, median, range.
- `U8-02` / `U8-02-ENGINE` — Probability from table.

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
- Do not recreate the engine foundation already present under `generator/engine/`.
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
- legacy slice files, unless fixing a real mathematical/UI/runtime issue.
- `RULES.md`, except for truth/status/rule updates.
- `PROJECT_STATUS.md`, except for truthful status updates.

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

If a topic lacks source-backed examples, mark it pending or keep it outside active scope.

---

## 8. True generator vision rule

Phase work must not become shallow slices.

Required generator capabilities include:

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
- print layout;
- browser-based exercise-set print/export.

Do not change `export.js` unless the export pipeline is proven broken.

---

## 11. Deployment and verification rules

Public URL:

`https://yanivmizrachiy.github.io/targilim/`

Required verification assets:

- `tools/verify-phase2-static.mjs`
- `tools/verify-phase3a-static.mjs`
- `tools/harness-engines.mjs`
- `tools/release-audit.mjs`
- `.github/workflows/verify-phase2-static.yml`
- `.github/workflows/pages-healthcheck.yml`
- `.github/workflows/verify-phase2-batch.yml`
- `.github/workflows/verify-phase3a.yml`
- `.github/workflows/verify-phase3a-static.yml`

Before claiming final public release quality, verify:

- all 25 engine topics appear and generate correctly;
- browser-based exercise-set generation works for count > 1;
- answer key toggle works;
- engine panel controls are real and affect output;
- supported question types work;
- difficulty levels work;
- export buttons remain present;
- mobile view has no horizontal scroll;
- `PROJECT_STATUS.md` matches observed results.

No `Live ✅` without real live verification.

---

## 12. Documentation truth rule

`PROJECT_STATUS.md` must describe the current truth.

Never write fake PASS, fake live verification, fake production readiness, fake test results, or claims that a workflow passed if it was not actually observed.

Use honest statuses:

- `Code ✅` for code that exists and is registered.
- `Live ⚠️` for code that is not yet live/browser verified.
- `Live ✅` only after real verification.
- `Local Live ✅` for local browser verification.

---

## 13. Current next action

The approved core scope is complete in code. Future work should be limited to:

1. Human live browser QA.
2. Visual-mode review.
3. Copy-image pixel review.
4. Print output review.
5. Teacher feedback and small pedagogical refinements.
6. Larger case pools or new source-backed Grade 7–8 topics only if explicitly approved.
7. Small browser-based exercise-set UX improvements that preserve the current scope.

Do not start Grade 9, separate booklet mode, PDF workbook mode, bulk A4 workbook generation, or separate answer-key booklet systems.

Report truth only.
