# TRUE GENERATOR — DETAILED TEACHER CONTROLS REQUIREMENTS

Date: 2026-06-10
Owner: Yaniv
Project: Targilim / תרגילים
Repository: `yanivmizrachiy/targilim`

---

## 1. Purpose

This document preserves Yaniv's detailed teacher-control requirements for the real Targilim generator.

It expands `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md`.

Future Claude/ChatGPT work must not ask Yaniv to repeat these requirements.

---

## 2. Core expectation

The system must not be a demo and must not be a collection of isolated example questions.

The system must become a real teacher-facing generator based on deep study of the 10 uploaded source files and official/source-learning notes.

Claude must learn deeply:

- what students are required to know;
- what students are expected to do;
- what mathematical thinking each source file teaches;
- what question structures appear in the files;
- what types of mistakes and misconceptions students may have;
- what teachers need in order to generate varied, accurate, editable, printable questions.

---

## 3. Source-learning requirement

For each of the 10 source files, Claude must extract:

- grade;
- domain;
- topic;
- mathematical objective;
- required student skill;
- question families;
- recurring wording patterns;
- diagram patterns;
- table/data patterns;
- known solution methods;
- misconception patterns;
- allowed values and safe numeric ranges;
- when answers should be integer/fraction/decimal/percent;
- what makes a question basic, standard, advanced, or challenge;
- what can be varied safely;
- what must not be varied.

The generator must be built from this learning, not from generic curriculum guesses.

---

## 4. Teacher control panel requirements

The teacher must be able to control generation in a detailed but simple way.

Required controls:

1. Grade selection.
2. Domain selection.
3. Topic selection.
4. Specific skill / subtopic selection.
5. Number of questions:
   - 1 question;
   - 5 questions;
   - 10 questions;
   - 15 questions;
   - custom count later if safe.
6. Difficulty level — four real levels:
   - remedial / foundation;
   - standard;
   - advanced;
   - challenge / thinking.
7. Question type:
   - open question;
   - multiple-choice question;
   - completion question;
   - true/false question;
   - matching / draw-a-line question;
   - choose the correct answer;
   - identify the mistake;
   - explain reasoning;
   - build an equation;
   - verify a solution.
8. Answer display:
   - no answers;
   - answer only;
   - full solution;
   - answer key at end;
   - separate answer page.
9. Diagram setting:
   - include diagrams where relevant;
   - no diagram if not needed;
   - dynamic diagram labels;
   - unknown marked with `x` / `?` / blank.
10. Visual style/theme:
   - default premium;
   - geometry;
   - algebra;
   - numeric;
   - statistics/uncertainty;
   - print worksheet.
11. Worksheet mode:
   - single topic worksheet;
   - mixed topic worksheet;
   - mixed domains only when pedagogically safe.
12. Regeneration:
   - regenerate one question;
   - regenerate whole worksheet;
   - preserve selected controls.

No UI control may be fake. Every visible control must affect generation.

---

## 5. Four-level difficulty model

The difficulty system must be pedagogical, not cosmetic.

### Level 1 — Remedial / Foundation

- direct wording;
- small clean numbers;
- one-step reasoning;
- strong scaffolding;
- direct unknown;
- simple diagrams;
- no traps;
- suitable for students who need support.

### Level 2 — Standard

- normal curriculum-level question;
- standard numbers;
- one or two steps;
- normal wording;
- standard diagram;
- direct or mildly varied unknown.

### Level 3 — Advanced

- less direct wording;
- reverse unknowns;
- more steps;
- larger or less obvious numbers;
- more reasoning;
- may combine two ideas from the same source-backed topic;
- includes common misconception traps only when answer explains them.

### Level 4 — Challenge / Thinking

- deeper reasoning;
- unknown can move to a non-obvious position;
- may require choosing method;
- may require explaining why;
- may compare two approaches;
- may detect an error;
- may include multi-stage data;
- still must remain source-bound and solvable.

Difficulty must affect actual parameters, wording, unknown choice, diagram complexity, and solution depth.

---

## 6. Data variation requirements

The generator must allow controlled data variation.

Examples of controls and variation logic:

- whole is given, find part;
- part is given, find whole;
- whole and part are given, find percent;
- original value is unknown after increase/decrease;
- final value is unknown after increase/decrease;
- one side of a ratio is unknown;
- total of a ratio is unknown;
- scale factor is unknown;
- base/height/area may be unknown;
- radius/circumference/area may be unknown;
- dataset values may change while mean/median/range remain controlled;
- equation unknown can appear on one side or both sides when source-supported.

The teacher should eventually be able to specify constraints such as:

- answer must be an integer;
- answer may be decimal;
- answer may be fraction;
- number divisible by 3;
- number divisible by 4;
- clean percentages only;
- clean ratio totals only;
- avoid negative result;
- include negative numbers;
- no zero answer;
- with or without diagram;
- direct unknown or reverse unknown.

These controls must be implemented only where mathematically relevant and source-backed.

---

## 7. Question type generation requirements

The same mathematical structure should be transformable into different question formats.

### Open question

Student solves and writes answer.

### Multiple choice

Must include:

- one correct answer;
- plausible distractors;
- distractors based on common mistakes;
- no ambiguous answers.

### Completion question

Must include a blank inside calculation, sentence, table, or diagram.

### True/false

Must include a statement and require explanation when pedagogically useful.

### Matching / draw-a-line

Must match expressions, values, diagrams, verbal descriptions, or solution steps.

### Choose the correct answer

Can be shorter than full multiple-choice but must still include controlled distractors.

### Identify the mistake

Must show a realistic wrong solution and ask the student to identify/fix it.

### Explain reasoning

Must require a mathematical explanation, not only a numeric answer.

---

## 8. Diagram and graphics requirements

The generator must generate premium dynamic graphics, not static decorative shapes.

Required dynamic diagram families:

- number line for negative numbers;
- right triangle for Pythagoras;
- triangle for missing angle;
- rectangle;
- box/cuboid;
- triangle area;
- parallelogram area;
- trapezoid area;
- circle radius/diameter/circumference/area;
- similar triangles;
- frequency table;
- bar chart when useful;
- worksheet answer-key visual blocks.

Each graphic must support:

- generated numeric labels;
- unknown labels;
- visual highlighting of unknown;
- controlled color themes;
- mobile-safe size;
- print-safe size;
- export-safe rendering;
- no overlap;
- modern teacher-quality appearance;
- Hebrew/RTL labels where relevant.

Graphics are part of correctness. A diagram must match the generated data.

---

## 9. Worksheet requirements

The real product must support worksheets, not only one question at a time.

Worksheet controls:

- question count: 5 / 10 / 15;
- same topic or mixed topics;
- difficulty level;
- question types;
- with answers / without answers;
- full solution / answer key only;
- title and metadata;
- A4 print;
- mobile preview;
- regenerate one question;
- regenerate all;
- copy/export worksheet.

Worksheet output must:

- be visually premium;
- fit A4;
- avoid clutter;
- preserve RTL;
- include diagrams when needed;
- optionally place answer key at bottom or separate page;
- be useful for a real math teacher in class.

---

## 10. Topic conversion requirement

Every existing active slice should eventually be converted or mapped into the true engine.

For each topic, Claude must decide:

- keep current slice as legacy/simple mode;
- refactor into template engine;
- expand into multiple pattern families;
- add dynamic diagrams;
- add four-level difficulty;
- add question-type variants;
- add worksheet support.

No shallow conversion is acceptable.

---

## 11. No-demo policy

Yaniv repeatedly stated: no demo.

Therefore:

- no fake UI controls;
- no controls that do not affect output;
- no placeholder question types;
- no hardcoded one-question “engine”;
- no shallow graphics;
- no pretending the MVP is final;
- no adding features that only look complete.

A feature is allowed only if it works for real in at least the pilot scope and is documented truthfully.

---

## 12. Required Claude output before Phase 3 coding

Before ChatGPT executes Phase 3, Claude must provide:

1. Source-to-generator blueprint.
2. Topic-by-topic conversion table.
3. Pattern families for the pilot topic.
4. Data/unknown/difficulty/question-type rules.
5. Diagram rules for the pilot.
6. Exact Phase 3A patch pack.
7. Verification criteria.

ChatGPT must not invent this plan alone.

---

## 13. Phase 3A pilot acceptance

Phase 3A is accepted only if the pilot topic can actually demonstrate:

- multiple families;
- data changes;
- unknown changes;
- wording changes;
- at least two question types;
- four real difficulty levels or a documented pilot subset that is real;
- dynamic graphics if visual;
- correct answer/solution generation;
- worksheet compatibility path;
- no breakage of existing MVP.
