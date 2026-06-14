# TRUE GENERATOR VISION REQUIREMENTS — Targilim

> **הערת מצב 2026-06-14:** חזון האיכות כאן **תקף ונשמר**, אך פרטי-מצב מסוימים
> מיושנים: המצב הנוכחי הוא **50 engine topics / 0 fallback** (לא 25 slices);
> **Phase 3A הוא היסטורי**, לא המצב הנוכחי; **כיתה ט׳ נעולה / מחוץ לתחום**;
> אסור ליצור שאלות ממקור חיצוני שאינו אחד מ-10 קבצי המקור. מקור-אמת עדכני:
> `PROJECT_STATUS.md`, `REQUIREMENTS_STATUS.md`, `docs/SOURCE_BIBLE.md`.

Date: 2026-06-10
Owner: Yaniv
Project: `yanivmizrachiy/targilim`
Live URL: https://yanivmizrachiy.github.io/targilim/

---

## 1. Purpose

This document preserves Yaniv's full product vision for the Targilim project.

The target product is a **smart Hebrew math exercise generator**.

The target product is **not** a booklet system, not a worksheet builder, and not a PDF-workbook product.

Future agents must not ask Yaniv to restate this vision from scratch.

---

## 2. Current honest status

The current system is a live MVP with a growing smart-generator engine.

It includes:

- live GitHub Pages site;
- 25 code-active legacy slices for Grades 7–8;
- Grade 9 locked;
- premium mobile-first RTL CSS;
- copy-as-image / PNG / print;
- `RULES.md`;
- `PROJECT_STATUS.md`;
- health endpoint;
- verification workflows;
- Phase 3A engine topics in code: `G7-03-ENGINE`, `N8-01-ENGINE`, `N8-02-ENGINE`, `N8-03-ENGINE`, `N8-04-ENGINE`, and `N8-05-ENGINE`.

The system is not yet the full intelligent generator because most topics are still legacy slices and have not yet been converted into full source-bound engine templates.

---

## 3. Yaniv's true requirement

Yaniv does not want only a demo or a collection of isolated example questions.

Yaniv wants a serious Hebrew math exercise generator that learned the uploaded source PDFs and can create rich, varied, source-bound exercises.

The generator must create many questions from each mathematical structure, not only one fixed question.

No booklet mode is required for the final target unless Yaniv explicitly asks for it later.

---

## 4. Core generator requirements

The true generator must support:

1. Many questions per topic.
2. Multiple mathematical pattern families per topic.
3. Data changes: numbers, measures, quantities, percentages, dimensions, dataset values.
4. Unknown changes: the unknown can move between different values in the same structure.
5. Hebrew wording variation: direct math wording, real-world context, classroom wording, reasoning wording, error-detection wording.
6. Context changes while staying faithful to the source material.
7. Dynamic diagrams generated from the generated data.
8. Diagram labels that change according to given and unknown values.
9. Controlled visual themes and colors.
10. Multiple question types.
11. Real difficulty levels.
12. Hebrew RTL, mobile, print, and export compatibility.
13. Mathematical correctness with safe parameter constraints.
14. Source-bound coverage only.

Out of scope unless Yaniv explicitly reopens it:

- booklet generation;
- worksheet mode;
- PDF workbook generation;
- bulk A4 worksheet builder.

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
- compare-two-methods question;
- read-from-diagram question;
- table-based question;
- graph/chart-based question when source-backed.

Each question type must affect both:

- the rendered question UI;
- the answer/solution format.

No fake controls are allowed.

---

## 6. Difficulty system required

The current difficulty selector is only partially real.

The true engine must define real difficulty behavior.

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
- misconception targeting;
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

Graphics are a first-class part of the generator, not decoration.

The final product must look and feel like a premium educational tool, not a technical demo.

Dynamic SVG diagram engine must support, when source-backed:

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
- bar chart when useful.

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
- print/export-safe theme.

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

## 10. Explicit non-goal: worksheets/booklets

The final target is a smart exercise generator.

Do not plan or implement:

- booklet mode;
- worksheet mode;
- 5/10/15 question worksheet builder;
- answer-key workbook mode;
- PDF booklet generation;
- bulk A4 worksheet generation.

These are not current goals.

They may be reconsidered only if Yaniv explicitly requests them later.

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
- common misconceptions.

No generic, unsupported curriculum invention.

Grade 9 stays locked until real worked source examples are available.

---

## 12. Engine architecture requirement

The project must move from isolated slice functions toward a true template/pattern engine.

Expected model:

Topic → Pattern family → Variant type → Parameters → Constraints → Given data → Unknown target → Question type → Wording template → Diagram template → Solution template → Difficulty → Export mode

The engine must be additive and must not break existing 25 slices.

---

## 13. Phase 3A requirement

Phase 3A must not attempt the entire product at once.

Phase 3A should:

- add the engine foundation beside the existing system;
- preserve the live MVP;
- keep existing 25 slices working;
- implement serious pilot topics with real engine behavior;
- include multiple pattern families;
- change data;
- change unknown target;
- change Hebrew wording;
- support multiple real question types;
- implement real difficulty behavior;
- include dynamic premium graphics when visual;
- use controlled visual themes;
- update documentation truthfully;
- add verification.

Current Phase 3A pilots:

- `G7-03-ENGINE` — Pythagoras, graphics + unknown switching;
- `N8-01-ENGINE` — ratio, source-bound families + unknown switching + ratio SVG;
- `N8-02-ENGINE` — proportion, source-bound families + unknown switching + table SVG;
- `N8-03-ENGINE` — scale, dynamic data + unknown switching + map/scale SVG;
- `N8-04-ENGINE` — static percentages, data/unknown/question-type logic;
- `N8-05-ENGINE` — dynamic percentages, increase/decrease/original/two-step logic + percent-change SVG.

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
- ask Yaniv to restate this vision again from scratch;
- build worksheets/booklets unless Yaniv explicitly reopens that scope.

---

## 15. Acceptance criteria for the true generator milestone

The next real milestone is not “more slices.”

It is accepted only if:

- a true engine exists beside the old system;
- engine topics generate multiple families;
- engine topics change data;
- engine topics change unknowns;
- engine topics change wording;
- engine topics support multiple question types;
- engine topics support real difficulty;
- engine topics have correct solution generation;
- visual engine topics have dynamic premium graphics;
- mobile/export/print still work;
- old 25 slices still work;
- documentation reflects truth.

---

## 16. Binding instruction for future Claude/ChatGPT/Codex work

Future work must focus on the smart generator only.

Do not work on booklets, worksheets, PDF workbook output, or bulk A4 worksheet mode.

Future Claude responses must not give only small isolated patches unless explicitly requested.

Claude must produce source-to-generator blueprints and implementation-ready patch packs.

ChatGPT/Codex must execute only approved generator-engine work, preserve the current MVP, and report truthfully.
