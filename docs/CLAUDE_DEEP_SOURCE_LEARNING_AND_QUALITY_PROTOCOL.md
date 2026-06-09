# Claude Deep Source Learning and Quality Protocol

Date: 2026-06-09
Repository: `yanivmizrachiy/targilim`
Hebrew product name: `תרגילים`

## Purpose

This protocol strengthens the project rules for Claude before implementation begins.

Claude must use this protocol together with `RULES.md`, `PROJECT_STATUS.md`, the source manifest, and all source cards.

## Binding rule

Claude must not start building the exercise generator until it has completed a deep study pass over the ten source files currently stored in the repository.

The purpose is not to skim the files. Claude must understand the curriculum structure, the mathematical domains, the topics, the skills, the example question patterns, the drawings, the diagrams, the graph types, the wording style, and the printable worksheet requirements.

## Ten-file learning requirement

Claude must study all ten source files one by one:

1. Grade 7 algebra curriculum.
2. Grade 8 algebra curriculum.
3. Grade 7 pre-deductive geometry curriculum.
4. Grade 8 geometry curriculum.
5. Grade 7 numeric domain curriculum.
6. Uncertainty domain curriculum and examples.
7. Numeric domain principles for grades 7-8.
8. Algebra domain principles for grades 7-8.
9. Geometry domain principles for grades 7-8.
10. Grade 8 teaching sequence for 2026-2027.

For each file, Claude must produce or update a structured learning note that includes:

- source filename;
- grade or grade range;
- mathematical domain;
- major topics;
- subtopics;
- required skills;
- prerequisite knowledge;
- example question patterns;
- visual representations;
- drawing and diagram requirements;
- graph, coordinate-system, number-line, table, chart, or geometry requirements;
- Hebrew wording patterns;
- mathematical notation rules;
- possible teacher controls;
- printable worksheet opportunities;
- limitations or missing information.

## Curriculum map requirement

Claude must build a curriculum map before building generation logic.

The curriculum map must answer:

- What is taught in grade 7?
- What is taught in grade 8?
- What is taught in grade 9?
- Which domains exist in each grade?
- Which topics belong to each domain?
- Which skills belong to each topic?
- Which question types appear in the source files?
- Which diagrams or visual representations are required for each question type?
- Which source file supports each topic and skill?

Claude must not generate any exercise unless it can map the exercise to the curriculum map.

## Question-pattern extraction requirement

Every exercise or example appearing in the source files must be treated as a potential pattern for the future exercise machine.

Claude must extract question patterns, not only copy examples.

For every reusable pattern, Claude must identify:

- the mathematical idea;
- the skill being practiced;
- the variable data that a teacher may change;
- which changes are mathematically safe;
- which changes would break the question;
- the expected answer logic;
- the required drawing, graph, table, diagram, or representation;
- the Hebrew wording template;
- punctuation requirements;
- print-layout requirements;
- copy-as-image requirements.

## Strong mathematical rendering requirement

The generated questions must look like high-quality textbook material, not like rough web text.

Claude must choose the strongest appropriate rendering tools and implementation methods available in the project environment.

The final implementation should support, when relevant:

- precise mathematical notation;
- high-quality SVG diagrams;
- clean coordinate systems;
- accurate geometric constructions;
- labeled points, segments, rays, angles, circles, polygons, solids, number lines, graphs, tables, bar charts, and pie charts;
- accurate Hebrew RTL layout around mathematical notation;
- print-quality PNG output;
- A4 worksheet layout;
- readable typography;
- no cropped labels;
- no distorted diagrams;
- no fake visuals.

## Tooling and terminal rule

Claude must not wait for Yaniv to specify exact low-level tools when the product requirement is clear.

Claude must inspect the repository and choose the best safe toolchain for the implementation.

Claude may use the terminal to install or configure safe project dependencies when needed, but only inside the project and without exposing secrets.

Claude should consider strong, appropriate tools for:

- mathematical notation rendering;
- SVG or Canvas rendering;
- diagram generation;
- geometry drawing;
- coordinate-system drawing;
- chart rendering;
- HTML-to-image or DOM-to-image export;
- copy-to-clipboard image support;
- PNG fallback download;
- print and A4 layout;
- automated tests;
- Hebrew RTL validation.

Claude must document every new dependency it adds and why it is needed.

Claude must not install random, unneeded, unsafe, abandoned, or unrelated packages.

Claude must not use fake placeholder code instead of a real working implementation.

## Quality gates before claiming success

Claude must run checks before claiming that a feature is complete.

Required quality gates include:

1. Source-learning check: every source file has a learning note and is linked to the curriculum map.
2. Curriculum check: every generated question maps to grade, domain, topic, subtopic, skill, and source reference.
3. Mathematical correctness check: generated answers, diagrams, graphs, tables, and representations are mathematically valid.
4. Hebrew quality check: wording, punctuation, grammar, RTL order, and mathematical Hebrew are correct.
5. Rendering check: the question is visually clear, aligned, uncropped, and print-ready.
6. Copy-as-image check: the rendered question can be copied as an image where supported.
7. Fallback check: if clipboard image copy is blocked, PNG download works honestly.
8. Print check: the output fits A4 worksheet use.
9. Parameter-change check: changing teacher parameters updates wording, numbers, answer, drawing, and exported image consistently.
10. No-demo check: no fake data, fake buttons, fake success states, or invented curriculum content.

If any check fails, Claude must report the failure honestly and mark the feature as partial, blocked, or not complete.

## Hebrew punctuation and question wording requirement

Claude must treat Hebrew punctuation as a first-class quality requirement.

Generated questions must use correct Hebrew punctuation, including appropriate use of:

- comma;
- period;
- colon;
- question mark;
- quotation marks when needed;
- dash when useful and natural;
- line breaks for readability;
- clear mathematical instruction phrasing.

The product must never output broken Hebrew, awkward translation, incorrect singular/plural agreement, wrong gender agreement, stale values, or unclear references after teacher parameter changes.

## Teacher controls and safe variation requirement

The generator must allow teachers to change meaningful variables, but only when the changes remain mathematically valid.

For each question type, Claude must define:

- what the teacher can change;
- what must remain fixed;
- valid numerical ranges;
- valid diagram changes;
- valid representation choices;
- valid color or black-and-white styles;
- when a warning is needed;
- when regeneration is safer than direct editing.

The system must not allow a teacher to accidentally create an invalid mathematical exercise.

## Visual style requirement

The final generator must support strong print-oriented visual styles:

- black-and-white;
- grayscale palettes;
- full-color palettes;
- elegant dark palettes only when readable and printable;
- borders;
- textures;
- high-contrast labels;
- clean textbook-like layout.

Visual style must support the mathematics and must not distract from the task.

## Implementation discipline

Claude must work in ordered stages:

1. Read `RULES.md`.
2. Verify that source files are present.
3. Learn each source file deeply.
4. Create source-learning notes.
5. Create the curriculum map.
6. Extract question patterns.
7. Design the data model.
8. Choose the rendering/export toolchain.
9. Implement the smallest real generator slice.
10. Test Hebrew, math, rendering, print, and copy-as-image.
11. Update documentation honestly.
12. Continue domain by domain.

Claude must not jump directly to a UI before source learning and curriculum mapping are complete.

## Status rule

As of this protocol, Claude implementation has not started.

This protocol is a planning and quality document. It does not prove that the generator works.

After Claude starts work, Claude must update `RULES.md` and `PROJECT_STATUS.md` with what was actually completed and tested.
