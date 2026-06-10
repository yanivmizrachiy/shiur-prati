# Project Rules — Targilim Hebrew Math Exercise Generator

Repository: `yanivmizrachiy/targilim`

Hebrew project name: `תרגילים`

Last updated: 2026-06-10

---

## 1. Binding documents

`RULES.md` is the binding execution rulebook for this repository.

The full product vision is preserved in:

`docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`

That file is mandatory reading before any Phase 3 planning or coding.

Future agents must not ask Yaniv to restate the full vision from scratch.

The repository has already passed major Phase 1 and Phase 2 work. Future agents must not restart the project from old assumptions.

---

## 2. Roles

Yaniv is the product owner and teacher.

Claude is the project manager / brain / pedagogy / design decision-maker.

ChatGPT is the GitHub executor / implementation assistant.

Execution rule:

- Claude decides strategy, pedagogy, design direction, source interpretation, and quality gates.
- ChatGPT executes approved repository changes while preserving repository reality.
- Yaniv must not be forced to manage routine technical decisions.
- No agent may ask Yaniv to repeat work or restate the full vision already documented in `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`.

---

## 3. Current true status

As of 2026-06-10, the project is not at the beginning.

Completed:

- Source audit and source-learning phase completed.
- Legacy root files archived.
- Repository structure is modular and organized.
- Public generator exists under `generator/`.
- GitHub Pages deployment workflow exists.
- `generator/.nojekyll` exists.
- `phase2-loader.js` exists.
- Static verifier exists.
- Browser batch verifier exists.
- Pages healthcheck workflow exists.
- `PROJECT_STATUS.md` exists and must remain truthful.
- Phase 2 execution report exists under `docs/reports/`.
- Premium mobile-first RTL CSS redesign has been applied.
- `core.js` contains minimal `qmeta` markup alignment for premium card styling.
- Grade 9 remains locked because real worked example sources are missing.
- 25 code-active slices exist for Grades 7–8.
- Yaniv's true generator vision is documented in `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`.
- A formal Phase 3A gate issue exists: `https://github.com/yanivmizrachiy/targilim/issues/1`.

Current limitation:

- The live system is a useful MVP, not the final intelligent generator.
- Phase 3 true generator engine has not yet been built.
- Worksheet mode has not yet been built.
- Real question-type engine has not yet been built.
- Dynamic unknown-switching engine has not yet been built.
- Full dynamic diagram/graphics engine has not yet been built.
- Real difficulty logic across all topics has not yet been built.

---

## 4. Active generator slices

The project currently has 25 code-active slices.

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

### Grade 9

Grade 9 is locked.

Do not implement Grade 9 generator slices until Yaniv supplies real worked example question sources or Claude explicitly approves source-backed examples.

---

## 5. Do not repeat completed work

Future work must not repeat these completed actions:

- Do not recreate the source-learning phase.
- Do not recreate the curriculum map from scratch.
- Do not recreate the pattern index from scratch.
- Do not re-archive legacy files that are already archived.
- Do not rebuild the modular architecture from scratch.
- Do not rewrite `index.html` wholesale.
- Do not rewrite `core.js` wholesale.
- Do not rewrite `phase2-loader.js` unless there is a real loader failure.
- Do not rewrite `export.js` unless export is proven broken.
- Do not re-add the same 25 slices.
- Do not create duplicate topic IDs.
- Do not mark `Live ✅` without actual verification.
- Do not ask Yaniv to repeat the full Phase 3 generator vision.

Every future change must first inspect repository reality.

---

## 6. Protected files and folders

Do not touch these unless there is explicit need and a clear reason:

- `sources/`
- `archive/`
- `knowledge-base/`
- `generator/export.js`, unless export is proven broken.
- `generator/phase2-loader.js`, unless a loader failure is proven.
- all slice files, unless fixing a real mathematical/UI/runtime issue.
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

If a topic lacks source-backed examples, mark it locked or pending.

---

## 8. True generator vision rule

Phase 3 must not be another set of shallow slices.

Phase 3 must build toward the real generator described in `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`.

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
- full worksheet mode: 5/10/15 questions, with/without answers, answer key, A4 print;
- mobile, print, and export compatibility;
- no fake controls;
- no demo-only UI.

---

## 9. Source-based question variety and mathematical writing

The generator must create varied question types based on the actual question patterns found in the source PDFs and source-learning notes.

Claude must prove source learning by mapping source question patterns into generator families.

For each source-backed topic, Claude must identify which of the following are appropriate and supported by the sources:

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

Do not create plain text-only questions when a source-based visual or mathematical representation is appropriate.

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

Dynamic visual work must follow the vision document and preserve:

- premium educational visual quality;
- clean drawings and diagrams;
- controlled colors;
- strong visual hierarchy;
- no overlap;
- export-safe SVG/HTML;
- mobile-safe layout;
- print-safe layout;
- A4-safe worksheet rendering;
- classroom-ready appearance.

For every visual question family, define:

- what diagram is needed;
- what data controls the diagram;
- what labels appear;
- what changes between versions;
- what colors are used;
- how overlap is prevented;
- how the diagram appears in worksheet mode.

The following must remain working:

- copy as image;
- PNG download fallback;
- print layout.

Do not change `export.js` unless the export pipeline is proven broken.

---

## 11. Deployment and verification rules

Public URL:

`https://yanivmizrachiy.github.io/targilim/`

Deployment model:

- GitHub Pages through GitHub Actions artifact deployment.
- `.github/workflows/deploy-pages.yml` deploys `generator/`.
- `generator/.nojekyll` must remain in the artifact.

Required verification assets:

- `tools/verify-phase2-static.mjs`
- `.github/workflows/verify-phase2-static.yml`
- `.github/workflows/pages-healthcheck.yml`
- `.github/workflows/verify-phase2-batch.yml`

Before claiming Phase 2 complete, verify:

- public URL returns 200;
- static verifier passes;
- browser batch verifier passes or equivalent live browser test passes;
- all 25 slices appear in selectors;
- each active slice generates a card;
- answer opens;
- export buttons exist;
- geometry SVGs fit where relevant;
- mobile view has no horizontal scroll;
- Grade 9 stays locked;
- `PROJECT_STATUS.md` matches reality.

No `Live ✅` without real live verification.

---

## 12. Documentation truth rule

`PROJECT_STATUS.md` must describe the current truth.

Execution reports under `docs/reports/` must describe only real changes.

Never write:

- fake PASS;
- fake live verification;
- fake production readiness;
- fake test results;
- claims that a workflow passed if it was not actually observed.

Use honest statuses:

- `Code ✅` for code that exists and is registered.
- `Live ⚠️` for code that is not yet live/browser verified.
- `Live ✅` only after real verification.
- `🔒 Locked` for topics intentionally blocked.

---

## 13. Phase 3 execution rule

Before Phase 3 code:

1. Claude must read `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`.
2. Claude must read `docs/prompts/CLAUDE_PHASE3A_TRUE_ENGINE_REQUEST.md`.
3. Claude must read GitHub Issue #1.
4. Claude must produce a source-to-generator blueprint.
5. Claude must provide an implementation-ready Phase 3A patch pack.
6. ChatGPT must execute Phase 3A only.
7. Existing 25 slices must continue working.
8. The current MVP must remain live.
9. No Grade 9.
10. No fake controls.
11. No shallow demo.
12. Report truth only.

Phase 3A acceptance requires:

- a real engine foundation beside the old system;
- one pilot topic using the engine;
- changing data;
- changing unknown target;
- changing Hebrew wording;
- at least two question types;
- real difficulty behavior;
- correct solution generation;
- dynamic premium graphics if relevant;
- strong mathematical writing;
- old 25 slices still working;
- mobile/export/print still working;
- documentation updated truthfully.

---

## 14. Current next action

The next meaningful action is not more content slices.

The next meaningful action is for Claude to produce a true Phase 3A generator-engine blueprint and exact patch pack, based on:

- `RULES.md`;
- `PROJECT_STATUS.md`;
- `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`;
- `docs/prompts/CLAUDE_PHASE3A_TRUE_ENGINE_REQUEST.md`;
- GitHub Issue #1.

ChatGPT should not build Phase 3 blindly without that approved pack.
