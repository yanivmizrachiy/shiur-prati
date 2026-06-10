# CLAUDE PHASE 3A TRUE ENGINE REQUEST — Targilim

Date: 2026-06-10
For: Claude
Executor after approval: ChatGPT
Repository: `yanivmizrachiy/targilim`
Live URL: https://yanivmizrachiy.github.io/targilim/

---

## Your role

Claude, you are the project manager, math pedagogy brain, source-learning expert, design director, graphics architect, and final decision-maker for the Targilim project.

ChatGPT is only the GitHub executor.

Yaniv does not want to manage technical details and does not want to repeat the full vision again.

You must not work directly in GitHub. You must return an implementation-ready plan/patch pack for ChatGPT to execute.

---

## Mandatory reading

Before answering, treat these repository files as binding:

- `RULES.md`
- `PROJECT_STATUS.md`
- `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`
- `docs/reports/PHASE2_BATCH_EXECUTION_REPORT_2026-06-10.md`

Do not ask Yaniv to restate what is already written there.

---

## Current repository reality

The project already has:

- live GitHub Pages site;
- 25 code-active slices for Grades 7–8;
- Grade 9 locked;
- single-question generator;
- premium mobile-first RTL CSS;
- copy-as-image / PNG / print buttons;
- modular files: `core.js`, `geo.js`, `algebra.js`, `numeric.js`, `stats.js`, `phase2-loader.js`;
- `RULES.md`;
- `PROJECT_STATUS.md`;
- `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`;
- `site-health.json`;
- static and browser verification workflows;
- obsolete apply workflows disabled.

Do not recreate this work.

Do not start from scratch.

Do not add shallow slices.

Do not implement Grade 9.

---

## Current limitation

The current system is a useful live MVP, but it is not the final product Yaniv requested.

It does not yet have:

- true template/pattern engine;
- many question families per topic;
- real data-changing engine;
- real unknown-switching engine;
- Hebrew wording variation engine;
- multiple question-type engine;
- true difficulty behavior across topics;
- full worksheet mode;
- dynamic premium diagram/graphics engine;
- controlled visual theme engine.

---

## Non-negotiable rule

No demo.

No fake controls.

No UI option that does nothing.

No shallow proof-of-concept pretending to be the product.

Every new button/control must have real behavior.

Every generator decision must be mathematically correct and source-bound.

---

## What Yaniv wants now

Yaniv wants Phase 3A to begin the real engine, while preserving everything that already works.

The goal is not to complete all of Phase 3 at once.

The goal is to create a real, additive engine foundation and one serious pilot topic that proves the model.

The pilot must be strong enough to demonstrate the true future product:

- changing data;
- changing unknown;
- changing wording;
- multiple question types;
- real difficulty;
- correct solutions;
- premium dynamic graphics if visual;
- export/print/mobile compatibility.

Recommended pilot:

- `G7-03` Pythagoras if focusing on dynamic graphics and unknown switching;
- or `N8-04` percentages if focusing on data/unknown/question-type logic.

Choose the better pilot and explain why.

---

## Graphics requirement

Graphics are first-class.

The pilot must not have ugly/basic diagrams.

If the pilot is visual, its SVG must be:

- dynamic;
- mobile-safe;
- print-safe;
- export-safe;
- visually premium;
- controlled by theme colors;
- labeled according to given/unknown data;
- free of overlap;
- suitable for teacher classroom use.

If the pilot is not visual, you must still create the theme/graphics architecture needed for future diagrams.

---

## Required answer structure

Return a complete Phase 3A implementation pack.

Use this exact structure:

### SECTION 1 — VERDICT

Answer:

- Is the current system a live MVP?
- Is it enough for Yaniv's full vision?
- What must Phase 3A build next?
- Which existing files must be preserved?

### SECTION 2 — EXISTING WORK NOT TO REPEAT

List:

- existing generator files;
- existing slices;
- existing UI/export;
- existing rules/status docs;
- existing workflows;
- what must not be recreated.

### SECTION 3 — PHASE 3A SCOPE

Define exactly what Phase 3A includes and excludes.

It must include one real pilot topic and engine foundation.

It must exclude Grade 9, full conversion of all 25 topics, analytics, and fake controls.

### SECTION 4 — ENGINE ARCHITECTURE

Design the additive engine architecture.

Expected concepts:

- template schema;
- random/data generator;
- validators;
- unknown target logic;
- wording variants;
- question types;
- difficulty mapping;
- themes;
- diagram generation;
- render adapter to existing `renderCard()`;
- worksheet compatibility later.

### SECTION 5 — PILOT TOPIC DESIGN

For the chosen pilot, define:

- source-backed concept;
- pattern families;
- variables;
- possible givens;
- possible unknowns;
- safe parameter sets;
- rejection rules;
- difficulty behavior;
- question types;
- Hebrew wording variants;
- solution templates;
- diagram requirements if any;
- export/print behavior.

### SECTION 6 — VISUAL/THEME DESIGN

Define controlled themes:

- default;
- geometry;
- numeric;
- algebra;
- uncertainty;
- worksheet print.

For each relevant theme define:

- background;
- card color;
- tag colors;
- SVG fill;
- stroke;
- helper line;
- unknown highlight;
- answer box;
- print behavior.

### SECTION 7 — FILE OPERATIONS FOR CHATGPT

Give exact implementation-ready file operations.

Use this format only:

FILE_OPERATION: create/update
PATH:
WHY:
CONTENT or PATCH:

Potential files:

- `generator/engine/schema.js`
- `generator/engine/random.js`
- `generator/engine/validators.js`
- `generator/engine/question-types.js`
- `generator/engine/themes.js`
- `generator/engine/diagrams.js`
- `generator/engine/pattern-engine.js`
- `generator/engine/pilot-g7-03.js` or `generator/engine/pilot-n8-04.js`
- minimal update to `generator/index.html` only if script includes are required
- minimal update to `generator/core.js` only if a hook is required
- minimal update to `generator/style.css` only for real new UI/diagram classes
- update verification if needed
- update docs truthfully

Do not touch `export.js` unless you prove it is broken.

### SECTION 8 — VERIFICATION PLAN

Define exact verification:

- existing 25 slices still work;
- pilot engine generates;
- pilot changes data;
- pilot changes unknown;
- pilot changes wording;
- pilot supports at least two question types;
- pilot has real difficulty;
- pilot solution is correct;
- mobile has no horizontal scroll;
- export buttons remain;
- print remains;
- Grade 9 remains locked.

### SECTION 9 — ACCEPTANCE CRITERIA

Phase 3A is accepted only if:

- existing MVP remains live;
- existing 25 slices still work;
- engine files exist;
- one pilot topic uses the engine;
- no fake controls exist;
- no Grade 9 added;
- pilot is not a demo;
- documentation is truthful.

### SECTION 10 — DIRECTIVE TO CHATGPT

End with a direct execution instruction:

ChatGPT, execute Phase 3A only.
Preserve the current live MVP.
Do not rewrite everything.
Do not add Grade 9.
Do not create fake controls.
Do not add shallow slices.
Build the true engine foundation and one serious pilot.
Report truth only.

END EXACTLY WITH:
READY_FOR_CHATGPT_PHASE3A_TRUE_ENGINE_EXECUTION: YES
