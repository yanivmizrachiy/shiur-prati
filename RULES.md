# Project Rules — Hebrew Math Exercise Generator

## 1. Repository identity

Technical repository: `yanivmizrachiy/targilim`.

Hebrew project name: `תרגילים`.

Project purpose: create a real, curriculum-based Hebrew mathematics exercise generator for grades 7, 8, and 9.

## 2. Date and work-log rule

All work performed today must be recorded under this date:

- Gregorian date: 2026-06-09
- Day: Tuesday

Every work session by Yaniv, ChatGPT, or Claude must keep its date context clear.

## 3. Current phase

The project is currently in requirements collection, source-material intake, and planning.

The generator is not implemented yet.

Allowed now:

- Maintain `RULES.md` as the main source of truth.
- Keep Claude's working instructions inside `RULES.md`.
- Collect and organize Yaniv's requirements.
- Prepare source-material intake, documentation, and planning.

Forbidden now:

- Do not build the generator yet.
- Do not create demo behavior.
- Do not invent curriculum content.
- Do not generate fake exercises.
- Do not create fake working buttons.
- Do not delete old project files until Yaniv explicitly approves cleanup.
- Do not claim that any feature works before it is implemented and tested.

## 4. RULES.md is both requirements and live status

`RULES.md` is not only a static requirements document.

It is also the live project status and work-log document.

Claude must treat `RULES.md` as the place where both of the following are always current:

1. Yaniv's product requirements.
2. The real project state after every meaningful work session.

At the end of every meaningful Claude work session, Claude must update `RULES.md` and `PROJECT_STATUS.md` with:

- What Claude attempted.
- What Claude completed successfully.
- What repository files Claude changed.
- What Claude could not complete.
- Any blockers, missing files, missing permissions, failed tests, unsupported browser behavior, or unclear requirements.
- What remains to do.
- The next planned work step.
- Whether the relevant feature is planned, partial, implemented but untested, implemented and tested, or blocked.
- The real updated completion estimate.

Claude must never leave the documentation claiming that something is completed if it is only planned, untested, blocked, or partial.

## 5. Mandatory rules-file organization audit

Before every meaningful continuation of the project, Claude must inspect `RULES.md` and verify that it is organized, current, complete, and contradiction-free.

Claude must check that Yaniv's requirements are organized by professional topics, not scattered randomly.

Required topic groups include:

- Repository identity and current phase.
- Source of truth, live status, and progress tracking.
- Curriculum and source-material learning.
- Grade 7, grade 8, and grade 9 curriculum mapping.
- Source-file intake, learning, naming, and organization.
- Deep source learning from the 10 curriculum files.
- Exercise generator requirements.
- Teacher menu and configurable question editing.
- Hebrew wording, punctuation, and RTL quality.
- Mathematical notation and mathematical writing quality.
- Geometry, coordinate-system, diagram, graph, and visual representation quality.
- Color modes and design palettes.
- Print-only worksheet output.
- Navigation buttons and app buttons.
- Copy-as-image and download-as-image features.
- Automated quality gates and tests.
- Claude implementation responsibility.
- What Yaniv has done, what ChatGPT has done, what Claude has done, and what remains.

If `RULES.md` is disorganized, duplicated, unclear, incomplete, or contradictory, Claude must fix the rules file before implementing product code.

Claude must not start implementation while the rules are unclear.

## 6. Product language rules

All user-facing product content must be in Hebrew only.

This includes:

- Generator UI.
- Navigation buttons.
- Action buttons.
- Teacher controls.
- Teacher menus.
- Question editing menus.
- Student-facing questions.
- Worksheet content.
- Mathematical explanations.
- Error and status messages shown in the product.
- Exported or printed worksheet content.

Technical planning files may be written in English.

## 7. Hebrew wording, punctuation, and RTL quality

The final product must use excellent Hebrew, not merely understandable Hebrew.

Every generated question must be checked for:

- Correct Hebrew wording.
- Correct Hebrew punctuation.
- Clear mathematical Hebrew.
- Natural sentence flow.
- Correct use of commas, periods, colons, question marks, parentheses, and mathematical punctuation.
- No awkward automatic translation.
- Correct RTL order.
- Correct placement of numbers, variables, units, and mathematical symbols inside Hebrew text.
- Appropriate wording for Israeli middle-school mathematics.
- Clear instruction verbs such as חשבו, מצאו, השלימו, הסבירו, סמנו, סרטטו, קבעו, נמקו, when pedagogically appropriate.

If a teacher changes a topic, number, quantity, context, representation type, or any other generator parameter, the Hebrew wording must adapt intelligently and remain grammatically correct.

Changing a value must not create broken Hebrew, mismatched singular/plural forms, mismatched gender forms, unclear references, stale text, or incorrect punctuation.

## 8. Curriculum and source-material rule

The generator must be based only on curriculum information, topics, skills, drawings, visual examples, and sample questions supplied by Yaniv.

The generator is for:

- Grade 7.
- Grade 8.
- Grade 9.

Claude must first store, organize, study, and understand the supplied curriculum information and source materials inside the repository before implementing exercise generation.

Source materials may include:

- Curriculum documents.
- Tables.
- Images.
- Drawings.
- Diagrams.
- Sample questions.
- Teacher examples.
- Mathematical visual representations.

Every generated question must map to:

- Grade level.
- Curriculum domain.
- Topic.
- Subtopic.
- Skill taught.
- Prerequisite knowledge.
- Difficulty level.
- Mathematical representation type.
- Question type.
- Expected learning goal.
- Common misconception addressed, if relevant.
- Source file or example used, if relevant.

## 9. Ten source-file learning requirement

Claude must learn the 10 curriculum/source files identified for this project before building the exercise generator.

The 10 source files identified today are:

1. `targilim1.pdf` — Algebra, grade 7.
2. `targilim2.pdf` — Algebra, grade 8.
3. `targilim3.pdf` — Geometry, grade 7.
4. `targilim4.pdf` — Geometry, grade 8.
5. `targilim5.pdf` — Numeric domain, grade 7.
6. `targilim6.pdf` — Uncertainty, statistics, probability, cross-grade.
7. `targilim7.pdf` — Numeric domain principles, grades 7 and 8.
8. `targilim8.pdf` — Algebra domain principles, grades 7 and 8.
9. `targilim9.pdf` — Geometry domain principles, grades 7 and 8.
10. `targilim10.pdf` — Grade 8 teaching sequence for 2026-2027.

Before learning them, Claude must verify whether the raw PDF files are actually present in the repository. If any file is missing, Claude must mark source learning as blocked for that file and document the blocker honestly.

For each source file Claude must extract and document:

- Grade level or grade range.
- Curriculum domain.
- Topics and subtopics.
- Skills and prerequisite skills.
- Question types.
- Exercise structures.
- Examples that can become generator templates.
- Required drawings or diagrams.
- Coordinate-system uses.
- Geometry objects, markings, and constructions.
- Tables, charts, graphs, bar charts, pie charts, number lines, and visual representations.
- Mathematical notation conventions.
- Hebrew wording patterns.
- Expected answer types.
- Common mistakes or misconceptions when visible.

Claude must not rename any source file blindly.

Claude may only rename or reorganize a source file after understanding its content.

Every source file must remain traceable back to its original uploaded file.

## 10. Source-file intake and renaming workflow

When Yaniv uploads learning files to the repository, Claude must follow this workflow:

1. Store the original file in a safe raw-intake location.
2. Do not overwrite or delete the original file during the learning stage.
3. Read and inspect the file carefully.
4. Extract the mathematical topics, skills, examples, drawings, diagrams, and pedagogical ideas.
5. Decide the correct grade, topic, subtopic, and skill categories.
6. Rename the file only after understanding its content.
7. Move or copy it into the correct organized folder.
8. Document what was learned from it.
9. Connect the file to future question-generation rules.
10. Update `RULES.md` and `PROJECT_STATUS.md` when the project state changes.

## 11. Exercise generator requirements

Claude must eventually code all documented rules into the future exercise machine.

The generator must not merely replace numbers. It must understand the mathematical structure of the exercise, the topic, the required skill, the visual representation, and the Hebrew wording pattern.

The machine must learn:

- What is taught in grade 7.
- What is taught in grade 8.
- What is taught in grade 9.
- Which topics belong to each grade.
- Which skills belong to each topic.
- Which example questions appear in the source files.
- Which visual representations appear in the source files.
- Which question structures can be safely turned into configurable generator templates.

Every exercise appearing in the source files must be studied as a possible pattern for the future exercise generator.

## 12. Teacher menu and configurable generation parameters

The future generator must provide a comfortable, clear, Hebrew-only teacher menu.

The teacher must be able to choose a topic and adjust meaningful changes and edits to the generated questions through a convenient interface.

Claude must think professionally about what each question type should allow the teacher to generate, edit, and update automatically.

The generator must expose useful controls, not random controls.

Teacher controls may include:

- Grade.
- Mathematical domain.
- Topic.
- Subtopic.
- Skill.
- Difficulty level.
- Number of questions.
- Total quantity in a problem, when relevant.
- Given numbers and numerical ranges.
- Ratio, percentage, part-whole structure, or other mathematical structure when relevant.
- Number of objects, categories, data points, bars, sectors, points, angles, segments, or shapes when relevant.
- Context or story theme.
- Names, objects, and scenario details when pedagogically useful.
- Representation type: text, table, diagram, graph, coordinate system, number line, geometric drawing, bar chart, pie chart, or another source-supported representation.
- Whether the question requires drawing.
- Whether answers are included.
- Whether hints are included.
- Whether solution notes are included.
- Print layout size.
- Visual style.
- Color mode.
- Black-and-white mode.
- Grayscale mode.
- Full-color mode.

The menu must help the teacher choose sensible options according to the selected grade, topic, and skill.

The menu must not show irrelevant controls that do not fit the selected exercise type.

When a teacher changes the topic, context, quantity, numbers, or any important data, the generator must automatically update:

- The mathematical validity of the question.
- The Hebrew wording.
- The punctuation.
- The RTL layout.
- The visual representation.
- The answer, if answers are enabled.
- The hint or solution notes, if enabled.
- The copy-as-image output.
- The download-as-image output.

Changing a teacher-controlled parameter must never leave stale text, wrong numbers, incorrect answers, mismatched graphics, broken Hebrew, outdated drawings, or outdated visual elements.

Each generated question should have a simple editing path: choose topic, adjust parameters, preview the question, copy as image, download as image, or add to worksheet.

## 13. Print-only output rule

All generated exercises are for print-oriented worksheets only.

The generator is not being built as a computerized task-assignment system for students.

The target output is printable mathematics content that a teacher can place into a worksheet, Word document, Canva document, Google Docs document, PowerPoint slide, or A4 print layout.

## 14. Mathematical graphics and textbook-quality rendering

Every generated question must use the strongest and highest-quality visual and mathematical presentation the system can produce.

The required quality target is textbook-quality mathematical rendering.

This includes:

- Clear Hebrew RTL layout.
- Accurate mathematical notation.
- High-quality geometry drawings.
- Correct geometric labels and markings.
- Accurate coordinate systems.
- Clear axes, scale marks, plotted points, rays, segments, angles, polygons, circles, and other mathematical objects when relevant.
- Correct use of line styles, arrows, labels, congruence markings, angle markings, tick marks, and measurement notation when relevant.
- High-quality tables, graphs, number lines, bar charts, pie charts, and visual representations when relevant.
- Print-ready visual clarity.
- No cropped text.
- No low-quality placeholder graphics.
- No fake visuals.

The rendered result must be suitable for direct copying as a high-quality image and pasting into Word, Canva, Google Docs, PowerPoint, or another print-oriented editor.

## 15. Color, grayscale, and visual style rule

The generator must support strong visual design choices suitable for teachers.

Required visual modes:

- Clean black-and-white mode for simple printing.
- Rich grayscale mode with multiple gray palettes, textures, borders, and worksheet-friendly contrast options.
- Full-color mode with a wide range of high-quality color palettes.
- Elegant dark-color palettes only when they remain printable, readable, and pedagogically clear.

Color must never reduce readability.

Visual style must support mathematics, not distract from it.

Teachers should be able to choose the style when creating or exporting exercises.

## 16. App buttons and navigation rule

All app buttons must be in Hebrew only.

The app must include clear, useful, working buttons. No fake buttons are allowed.

Required button categories include:

- Navigation buttons.
- Generate exercise buttons.
- Regenerate or adjust exercise buttons.
- Copy exercise as image.
- Download exercise as image.
- Add exercise to worksheet.
- Export worksheet for printing.
- Back, next, and previous actions when relevant.

Buttons must be understandable to teachers and must not use awkward wording.

The app must not include buttons that appear to work but do nothing.

## 17. Copy-as-image and download-as-image requirement

Every generated question must be exportable and copyable as a rendered image, not only as text.

Each generated question must have a real working button that copies the final rendered question as an image.

Each generated question must also have a real working option to download the rendered question as an image.

The copied or downloaded image must include the full rendered Hebrew question, including RTL layout, mathematical notation, tables, diagrams, graphs, coordinate systems, number lines, or other visuals if used.

If direct browser image clipboard copying is not supported, the app must provide an honest fallback such as PNG download.

## 18. Toolchain, automation, and terminal-work requirement for Claude

Claude must use the strongest appropriate tools, libraries, architecture, data structures, rendering methods, export methods, and quality checks needed to satisfy Yaniv's requirements.

Yaniv defines what the product must do; Claude chooses how to implement it professionally.

Claude may and should use terminal commands, package installation, rendering libraries, geometry/graphing libraries, mathematical typesetting tools, build tools, test tools, audit scripts, or other professional automation when appropriate.

Claude should prefer smart automation over manual repetitive work.

Claude must not use fake technical success messages.

If a tool, browser API, package, clipboard feature, rendering method, or automation path is unsupported, unsafe, unavailable, or blocked, Claude must document that honestly and provide the best safe fallback.

## 19. Continuous quality gates and testing

Claude must continuously check whether the work is correct.

Quality checks must include, when relevant:

- Hebrew wording review.
- Hebrew punctuation review.
- RTL layout review.
- Mathematical correctness review.
- Answer correctness review.
- Geometry and coordinate-system accuracy review.
- Diagram and graph visual accuracy review.
- Copy-as-image behavior verification.
- Download-as-image behavior verification.
- Print-readiness review.
- No stale text after parameter changes.
- No stale answers after parameter changes.
- No stale drawings after parameter changes.
- No fake data.
- No demo-only behavior.
- No fake working buttons.

Claude must create or use appropriate automated tests and manual validation steps where needed.

Claude must document which checks passed, failed, were skipped, or are blocked.

## 20. Claude working prompt inside RULES.md

Yaniv can tell Claude:

```text
Read RULES.md carefully and follow the Claude working prompt inside it.
```

Claude working prompt:

You are Claude, managing repository `yanivmizrachiy/targilim` for Yaniv Mizrachi.

The Hebrew product name is `תרגילים`.

`RULES.md` is both the requirements document and the live project status document. You must read it before working and update it after every meaningful work session.

Build a real Hebrew mathematics exercise generator for grades 7, 8, and 9 only after planning and source learning are complete.

Use only Yaniv-supplied curriculum materials, examples, drawings, diagrams, and requirements.

Do not invent curriculum content, create demo data, generate fake questions, or create fake working buttons.

Before implementation, inspect `RULES.md` and verify that it is organized by topic, current, complete, and contradiction-free. If it is not, fix the rules before coding.

Before implementation, verify whether the 10 source PDF files are actually present in the repository. If any source file is missing, document the blocker honestly.

Study each source file deeply, one by one. Extract grade, topic, skill, question types, examples, drawings, diagrams, coordinate systems, geometry objects, mathematical notation, Hebrew wording patterns, and template opportunities.

Build the curriculum knowledge base from the source files before creating exercise-generation logic.

Every generated question must be mapped to grade, domain, topic, subtopic, skill, prerequisites, difficulty, representation type, question type, learning goal, misconception if relevant, and source reference if relevant.

All generated exercises are for print-oriented worksheets only, not computerized task assignment.

Every question must be suitable for A4 printing and for placement in Word, Canva, Google Docs, PowerPoint, or another print-oriented editor.

Every question must include real working options to copy the final rendered question as an image and download it as an image, with a useful PNG fallback when needed.

The future generator must provide a comfortable Hebrew-only teacher menu for choosing topics and editing meaningful question parameters.

When a teacher changes a parameter, the generator must automatically update the exercise content, Hebrew wording, punctuation, mathematical answer, visual representation, copy-as-image output, and download-as-image output.

The future generator must provide textbook-quality graphics, correct Hebrew punctuation, accurate mathematical notation, strong geometry and coordinate-system rendering, high-quality visual design, teacher-controlled parameters, Hebrew-only buttons, continuous quality gates, and print-ready output.

Use the strongest appropriate tools and automation you can safely use. Use terminal commands, packages, rendering libraries, geometry/graphing tools, mathematical typesetting tools, build tools, and tests when they help satisfy the requirements.

Keep `RULES.md` and `PROJECT_STATUS.md` synchronized after every meaningful change.

At the end of every meaningful work session, update `RULES.md` and `PROJECT_STATUS.md` with what you attempted, completed, changed, failed, blocked, what remains, the next plan, status of features, and the real updated completion estimate.

Never claim that a feature is complete unless it is implemented and tested.

Today's work belongs under Tuesday, 2026-06-09.

Claude implementation has not started yet.

## 21. Repository conversion rule

This repository originally served a different project. It is now being converted into the `תרגילים` project.

No destructive cleanup is allowed until Yaniv explicitly approves it.

Before cleanup, preserve only what is intentionally needed; remove or archive irrelevant old material only after approval.

## 22. Planning rule

The project remains in planning mode until Yaniv says he has finished giving all requirements.

Only after the planning phase is complete should Claude begin building the repository and generator according to the complete plan.

## 23. Today's completed work — 2026-06-09, Tuesday

ChatGPT has done:

- Selected and converted the existing repository into the planning repository for `תרגילים`.
- Verified that the repository was renamed to `yanivmizrachiy/targilim`.
- Updated `RULES.md` as the main source of truth.
- Added initial product requirements for a Hebrew curriculum-based math exercise generator.
- Added initial generator specification files for question metadata and Hebrew RTL rules.
- Added source-material intake documentation and a source-material manifest for the 10 uploaded PDFs.
- Added the Claude working prompt inside `RULES.md`.
- Reorganized `RULES.md` by professional requirement topics.
- Added the mandatory pre-work rules-file organization audit.
- Added detailed requirements for Hebrew punctuation quality, graphics, colors, visual styles, app buttons, navigation, copy-as-image, download-as-image, and teacher-controlled generation parameters.
- Added detailed requirements for a comfortable Hebrew-only teacher menu and automatic question updates when teacher parameters change.
- Clarified that `RULES.md` is both the requirements document and the live status/work-log document.
- Added a mandatory end-of-session documentation update rule for Claude.
- Added deep learning requirements for the 10 source files.
- Added toolchain, terminal automation, geometry, coordinate-system, textbook-quality rendering, and continuous quality-gate requirements for Claude.

Yaniv has done:

- Chose the project direction.
- Approved using and converting an existing repository.
- Renamed the repository to `targilim`.
- Provided the core requirements for source-material learning, file renaming after understanding, print-only output, strong graphics, and progress tracking.
- Uploaded 10 curriculum/source PDFs in ChatGPT for intake and classification.
- Required the Claude prompt to live inside `RULES.md`.
- Required `RULES.md` to be checked and organized before continued work.
- Required strong Hebrew punctuation and wording quality.
- Required high-quality graphics and color/style controls.
- Required Hebrew-only app buttons and navigation buttons.
- Required one-click copy-as-image and download-as-image actions for generated questions.
- Required intelligent teacher-controlled generation parameters and adaptive Hebrew wording when teacher parameters change.
- Required a comfortable teacher menu for selecting topics and editing generated questions.
- Required professional thinking about which fields teachers should be allowed to change for each question type.
- Required Claude to update `RULES.md` after each work session with completed work, failed work, blockers, remaining tasks, and next work plan.
- Required Claude to use the strongest appropriate tools, automation, terminal workflows, rendering tools, tests, and quality checks to produce textbook-quality printable exercises.

Claude has done:

- Nothing yet. Claude has not started implementation.

Not done yet:

- Verification that the 10 raw PDF files are actually present in GitHub.
- Final cleanup of old project files.
- Full curriculum intake.
- Deep source-file learning by Claude.
- Organization of source files inside GitHub after learning.
- Claude implementation.
- Exercise generator UI.
- Teacher menu implementation.
- Automatic parameter-update engine.
- Copy-as-image implementation.
- Download-as-image implementation.
- Print/export implementation.
- Continuous quality gates and testing.

## 24. Current completion estimate

Repository renamed to `yanivmizrachiy/targilim`: completed.

Initial repository rules: created, reorganized, and updated for today's requirements.

Source-material manifest: created.

Full requirements collection: in progress.

Generator implementation: not started.

Estimated project planning completion: 58%.
