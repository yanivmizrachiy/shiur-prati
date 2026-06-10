# TRUE GENERATOR VISION REQUIREMENTS — Targilim

Date: 2026-06-10
Owner: Yaniv
Project: `yanivmizrachiy/targilim`
Live URL: https://yanivmizrachiy.github.io/targilim/

---

## 1. Purpose

This document preserves Yaniv's full, ultimate vision for the Targilim project.

It exists because the current live system is a useful MVP, but it is not yet the full intelligent generator Yaniv originally requested.

Future agents must not ask Yaniv to restate the whole vision from scratch. This document is the source of truth for the next development stage.

---

## 2. Honest current status

The current system is a live MVP.

It includes:

- live GitHub Pages site;
- 25 code-active slices for Grades 7–8;
- Grade 9 locked;
- single-question generation;
- some randomized variants;
- some SVG diagrams;
- premium mobile-first RTL CSS;
- copy-as-image / PNG / print;
- `RULES.md`;
- `PROJECT_STATUS.md`;
- health endpoint;
- verification workflows.

But it does not yet include the true generator engine described below.

---

## 3. Yaniv's true requirement

Yaniv does not want only a demo or a collection of isolated example questions.

Yaniv wants a serious Hebrew math question generator that learned the uploaded source PDFs and can create rich, varied, source-bound questions and worksheets.

The generator must be able to generate many questions from each mathematical structure, not only one fixed question.

---

## 4. Core generator requirements

The true generator must support:

1. Many questions per topic.
2. Multiple mathematical pattern families per topic.
3. Data changes: numbers, measures, quantities, percentages, dimensions, dataset values.
4. Unknown changes: the unknown can move between different values in the same structure.
5. Wording changes: direct mathematical wording, real-world context, classroom wording, reasoning wording, error-detection wording.
6. Context changes while staying faithful to the source material.
7. Dynamic diagrams generated from data.
8. Diagram labels that change according to given and unknown values.
9. Controlled visual themes and colors.
10. Multiple question types.
11. Real difficulty levels.
12. Full worksheet generation.
13. Hebrew RTL, mobile, print, and export compatibility.
14. Mathematical correctness with safe parameter constraints.
15. Source-bound coverage only.

---

## 5. Question types required

The engine must support, per mathematical pattern where appropriate:

- open question;
- multiple-choice question;
- completion question;
- true/false question;
- matching question;
- explanation/reasoning question;
- identify-the-mistake question;
- build-an-equation question;
- verify-a-solution question;
- compare-two-methods question.

Each question type must affect both:

- the rendered question UI;
- the answer/solution/answer-key format.

No fake controls are allowed.

---

## 6. Difficulty system required

The current difficulty selector is mostly not a real system.

The true engine must define real difficulty behavior:

### Basic

- simpler numbers;
- direct unknown;
- fewer steps;
- cleaner diagrams;
- shorter wording;
- more scaffolding.

### Standard

- normal curriculum-level numbers;
- one or two steps;
- standard diagram labels;
- regular solution explanation.

### Challenge

- reverse unknowns;
- multi-step reasoning;
- less direct wording;
- possible distractor/misconception targeting;
- more complex but safe parameter values;
- richer explanation requirements.

Every difficulty level must change actual generation logic, not only UI labels.

---

## 7. Dynamic data and unknown engine

For each template, the engine must know:

- what variables exist;
- which variables may be given;
- which variables may become unknown;
- which values are allowed;
- which values must be rejected;
- how to ensure integer/fraction/decimal answers are appropriate;
- how to generate a correct solution;
- how to update diagrams and labels.

Examples:

- Pythagoras: missing hypotenuse, missing leg, check if triangle is right.
- Percentages: find part, whole, percent, original value, final value after increase/decrease, two-step change.
- Ratio: find first part, second part, total, multiplier, missing proportional value.
- Circle: find circumference, area, radius from circumference, radius from area.
- Algebra: write expression, substitute, solve, build equation from text, verify solution.
- Statistics: mean, median, range, missing value from mean, frequency table, probability.

---

## 8. Graphics and diagram requirements

Graphics are a first-class part of the product, not decoration.

The final product must look and feel like a premium educational tool, not a technical demo.

Dynamic SVG diagram engine must support:

- right triangle;
- general triangle;
- missing angle triangle;
- rectangle;
- box/cuboid;
- parallelogram;
- trapezoid;
- circle;
- number line;
- similar triangles;
- frequency table;
- bar chart when useful;
- worksheet layout blocks;
- answer-key layout.

Each diagram type must define:

- SVG viewBox;
- responsive mobile sizing;
- print-safe sizing;
- labels;
- unknown marker;
- color theme;
- line style;
- dashed helper lines;
- arrows when useful;
- Hebrew/RTL labels;
- data-to-diagram mapping;
- unknown visual treatment;
- overlap prevention;
- export PNG safety;
- modern teacher-quality appearance.

---

## 9. Visual theme requirements

Themes must be controlled, not random.

Required theme system:

- default premium theme;
- geometry theme;
- algebra theme;
- numeric theme;
- statistics/uncertainty theme;
- worksheet print theme.

Each theme should define:

- background;
- card color;
- tag colors;
- SVG fill color;
- stroke color;
- helper line color;
- unknown highlight color;
- answer box color;
- print behavior.

Design quality bar:

- clean;
- modern;
- premium;
- Hebrew-first;
- RTL;
- mobile-first;
- printable;
- classroom-ready;
- visually consistent;
- not childish;
- not corporate;
- not cluttered;
- not a plain demo.

---

## 10. Worksheet engine requirements

The system must support full worksheet generation.

Required UI:

- choose grade;
- choose domain;
- choose topic or mixed topics;
- choose number of questions: 5 / 10 / 15;
- choose difficulty;
- choose question types;
- choose with answers / without answers;
- choose answer key at bottom or separate page;
- choose visual style/theme;
- generate worksheet;
- regenerate one question inside worksheet;
- print A4;
- export PNG/PDF if feasible;
- copy entire worksheet.

Worksheet output must:

- look premium;
- be printable;
- be readable;
- use correct Hebrew RTL layout;
- include diagrams where needed;
- avoid A4 overflow;
- support answer keys;
- preserve export/copy compatibility.

---

## 11. Source-bound requirement

The generator must remain tied to the uploaded source PDFs and source-learning notes.

For every topic/template, Claude must provide or approve:

- source file / learning note reference;
- mathematical concept;
- question families found in source;
- possible givens;
- possible unknowns;
- safe ranges;
- rejection rules;
- diagram needs;
- question types supported;
- difficulty levels;
- solution template;
- common misconceptions;
- worksheet support.

No generic, unsupported curriculum invention.

Grade 9 stays locked until real worked source examples are available.

---

## 12. Engine architecture requirement

The next major build must move from isolated slice functions toward a true template/pattern engine.

The expected model:

Topic → Pattern family → Variant type → Parameters → Constraints → Given data → Unknown target → Question type → Wording template → Diagram template → Solution template → Difficulty → Export/worksheet mode

Possible files for Phase 3A:

- `generator/engine/schema.js`
- `generator/engine/random.js`
- `generator/engine/validators.js`
- `generator/engine/question-types.js`
- `generator/engine/themes.js`
- `generator/engine/diagrams.js`
- `generator/engine/pattern-engine.js`
- `generator/engine/pilot-g7-03.js` or `generator/engine/pilot-n8-04.js`

The engine must be additive and must not break existing 25 slices.

---

## 13. Phase 3A requirement

Phase 3A must not attempt the entire product at once.

Phase 3A should:

- add the engine foundation beside the existing system;
- preserve the live MVP;
- keep existing 25 slices working;
- implement one pilot topic with real engine behavior;
- pilot must include multiple pattern families;
- pilot must change data;
- pilot must change unknown target;
- pilot must change Hebrew wording;
- pilot must support at least two question types;
- pilot must implement real difficulty behavior;
- pilot must include dynamic premium graphics if visual;
- pilot must use controlled visual themes;
- update documentation truthfully;
- add verification.

Recommended pilot:

- `G7-03` Pythagoras, if the focus is graphics and unknown switching;
- or `N8-04` percentages, if the focus is data/unknown/question-type logic.

---

## 14. What not to do

Do not:

- claim the current MVP is the final product;
- add random generic questions;
- add Grade 9;
- rebuild existing infrastructure;
- remove the current 25 slices;
- create UI controls that do nothing;
- produce shallow one-off slices;
- produce ugly/basic diagrams;
- mark Phase 3 complete without verification;
- ask Yaniv to restate this vision again from scratch.

---

## 15. Acceptance criteria for true next milestone

The next real milestone is not “more slices.”

The next milestone is accepted only if:

- a true engine exists beside the old system;
- one pilot topic uses the engine;
- pilot generates multiple families;
- pilot changes data;
- pilot changes unknown;
- pilot changes wording;
- pilot supports multiple question types;
- pilot supports real difficulty;
- pilot has correct solution generation;
- pilot has dynamic premium graphics if relevant;
- mobile/export/print still work;
- old 25 slices still work;
- documentation reflects truth.

---

## 16. Binding instruction for future Claude/ChatGPT work

Future Claude responses must not give only small isolated patches unless explicitly requested.

Claude must first produce a source-to-generator blueprint and implementation-ready Phase 3A patch pack.

ChatGPT must execute only the approved Phase 3A patch pack, preserve the current MVP, and report truthfully.
