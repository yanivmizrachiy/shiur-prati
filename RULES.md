# Project Rules — Hebrew Math Exercise Generator

## 1. Repository identity

Technical repository: `yanivmizrachiy/targilim`.

Hebrew project name: `תרגילים`.

Project purpose: create a real, curriculum-based Hebrew mathematics exercise generator for grades 7, 8, and 9.

## 2. Current date and work-log rule

All work performed today must be recorded under this date:

- Gregorian date: 2026-06-09
- Day: Tuesday

Whenever work is done today by Yaniv, ChatGPT, or Claude later, the documentation must keep the date context clear and must not mix today's work with earlier or future work without an explicit date.

## 3. Current phase

The project is currently in requirements collection, source-material intake, and planning.

The generator is not implemented yet.

Allowed now:

- Use this repository as the working repository for the new project.
- Create and maintain this `RULES.md` file.
- Keep the Claude working prompt inside this `RULES.md` file.
- Collect Yaniv's requirements.
- Organize requirements in a professional, contradiction-free order.
- Prepare source-material intake folders and documentation for curriculum files, drawings, examples, and uploaded learning materials.

Forbidden now:

- Do not build the generator yet.
- Do not create demo behavior.
- Do not invent curriculum content.
- Do not generate fake exercises.
- Do not create fake working buttons.
- Do not delete repository files until Yaniv explicitly approves the final conversion/cleanup step.
- Do not claim that any feature works before it is implemented and tested.

## 4. Mandatory rules-file organization audit

Before every meaningful continuation of the project, Claude must first inspect `RULES.md` and verify that it is truly organized, current, complete, and contradiction-free.

Claude must check that Yaniv's requirements are organized by professional topics, not scattered randomly.

The required topic groups include at least:

- Repository identity and current phase.
- Source of truth and progress tracking.
- Curriculum and source-material learning.
- Grade 7, grade 8, and grade 9 curriculum mapping.
- Source-file intake, learning, naming, and organization.
- Exercise generator requirements.
- Teacher-controlled generation parameters.
- Teacher menu and question-editing workflow.
- Hebrew wording, punctuation, and RTL quality.
- Mathematical notation and mathematical writing quality.
- Graphics, diagrams, tables, graphs, and visual representation quality.
- Color modes and design palettes.
- Print-only worksheet output.
- Navigation buttons and app buttons.
- Copy-as-image and download-as-image features.
- Claude implementation responsibility.
- What Yaniv has done, what ChatGPT has done, what Claude has done, and what remains.

If Claude finds that `RULES.md` is disorganized, incomplete, duplicated, unclear, or contradictory, Claude must fix the rules file first before implementing or changing product code.

Claude must not start implementation while the rules are unclear.

## 5. Source of truth and progress tracking

`RULES.md` is the main source of truth for this project.

Every new requirement from Yaniv must be added here in a professional order.

Every update must preserve previous requirements unless Yaniv explicitly cancels or replaces them.

Contradictions must be detected and resolved explicitly.

The repository must never contain documentation that contradicts the current project rules.

`RULES.md` and `PROJECT_STATUS.md` must always show the real project state.

They must clearly distinguish:

- What Yaniv has already done.
- What ChatGPT has already done.
- What Claude has already done.
- What has not been done yet.
- What remains to do next.
- Which requirements are documented.
- Which features are only planned.
- Which features are implemented and tested.

Claude has not started implementation yet.

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
- No awkward automatic translation.
- Correct RTL order.
- Correct placement of numbers, variables, units, and mathematical symbols inside Hebrew text.
- Appropriate wording for Israeli middle-school mathematics.
- Clear instruction verbs such as חשבו, מצאו, השלימו, הסבירו, סמנו, סרטטו, קבעו, נמקו, when pedagogically appropriate.

If a teacher changes the topic, numbers, context, quantity, representation type, or any other generator parameter, the Hebrew wording must adapt intelligently and remain grammatically correct.

Changing a value must not create broken Hebrew, mismatched singular/plural forms, mismatched gender forms, unclear references, or incorrect punctuation.

## 8. Curriculum and source-material rule

The generator must be based only on curriculum information, topics, skills, drawings, visual examples, and sample questions supplied by Yaniv.

The generator is for:

- Grade 7.
- Grade 8.
- Grade 9.

Claude must first store, organize, study, and understand the supplied curriculum information and uploaded source materials inside the repository before implementing exercise generation.

Source materials may include:

- Text explanations.
- Curriculum documents.
- Tables.
- Images.
- Drawings.
- Diagrams.
- Sample questions.
- Teacher examples.
- Mathematical visual representations.

Every source file uploaded for Claude to study must initially be stored safely in the repository without losing information.

Claude must inspect and understand each source file before renaming it.

After understanding a file, Claude must give it a meaningful professional filename and place it in the correct folder according to grade, topic, skill, or source-material type.

Claude must not rename files blindly.

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

## 9. Source-file intake and renaming workflow

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

## 10. Uploaded source-material manifest — 2026-06-09

A detailed one-by-one manifest for the uploaded PDFs is located here:

```text
source-materials/raw/2026-06-09/MANIFEST.md
```

The 10 source PDFs identified today are:

1. `targilim1.pdf` — Algebra, grade 7.
2. `targilim2.pdf` — Algebra, grade 8.
3. `targilim3.pdf` — Geometry, grade 7.
4. `targilim4.pdf` — Geometry, grade 8.
5. `targilim5.pdf` — Numeric domain, grade 7.
6. `targilim6.pdf` — Uncertainty/statistics/probability, cross-grade.
7. `targilim7.pdf` — Numeric domain principles, grades 7 and 8.
8. `targilim8.pdf` — Algebra domain principles, grades 7 and 8.
9. `targilim9.pdf` — Geometry domain principles, grades 7 and 8.
10. `targilim10.pdf` — Grade 8 teaching sequence for 2026-2027.

Each source file must be studied separately.

Every exercise appearing in the source files must be analyzed as a possible pattern for the future exercise generator.

## 11. Exercise generator requirements

Claude must eventually code all documented rules into the future exercise machine.

The exercise generator must not merely replace numbers. It must understand the mathematical structure of the exercise, the topic, the required skill, and the Hebrew wording pattern.

The machine must learn:

- What is taught in grade 7.
- What is taught in grade 8.
- What is taught in grade 9.
- Which topics belong to each grade.
- Which skills belong to each topic.
- Which example questions appear in the source files.
- Which visual representations appear in the source files.
- Which question structures can be safely turned into configurable generator templates.

## 12. Teacher menu and configurable generation parameters

The future generator must provide a comfortable, clear, Hebrew-only teacher menu.

The teacher must be able to choose a topic and then adjust meaningful changes and edits to the generated questions through a convenient interface.

Claude must think professionally about what each question type should allow the teacher to generate, edit, and update automatically. The generator must expose useful controls, not random controls.

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

Changing a teacher-controlled parameter must never leave stale text, wrong numbers, incorrect answers, mismatched graphics, broken Hebrew, or outdated visual elements.

Each generated question should have a simple editing path: choose topic, adjust parameters, preview the question, copy as image, download as image, or add to worksheet.

## 13. Exercise output rule

All generated exercises are for print-oriented worksheets only.

The generator is not being built as a system for assigning computerized tasks to students.

The target output is printable mathematics content that a teacher can place into a worksheet, Word document, Canva document, Google Docs document, PowerPoint slide, or A4 print layout.

## 14. Graphics and mathematical writing rule

Every generated question must use the strongest and highest-quality visual and mathematical presentation the system can produce.

This includes:

- Clear Hebrew RTL layout.
- Accurate mathematical notation.
- Clean diagrams when diagrams are required.
- High-quality tables, graphs, coordinate systems, number lines, geometric drawings, and visual representations when relevant.
- Print-ready visual clarity.
- No cropped text.
- No low-quality placeholder graphics.
- No fake visuals.

Claude must use its strongest available tools and implementation judgment to satisfy these requirements. Yaniv defines what the product must do; Claude must choose the best technical tools and implementation methods.

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

Buttons must be understandable to teachers and should not use awkward wording.

The app must not include buttons that appear to work but do nothing.

## 17. Copy-as-image and download-as-image requirement

Every generated question must be exportable and copyable as a rendered image, not only as text.

Each generated question must have a real working button that copies the final rendered question as an image, so the teacher can paste it into:

- Microsoft Word.
- Canva.
- Google Docs.
- PowerPoint.
- Any print-oriented editor.

Each generated question must also have a real working option to download the rendered question as an image.

The copied or downloaded image must include the full rendered Hebrew question, including RTL layout, mathematical notation, tables, diagrams, graphs, coordinate systems, number lines, or other visuals if used.

If direct browser image clipboard copying is not supported, the app must provide an honest fallback such as PNG download.

## 18. Claude working prompt inside RULES.md

Yaniv can tell Claude:

```text
Read RULES.md carefully and follow the Claude working prompt inside it.
```

Claude working prompt:

You are Claude, managing repository `yanivmizrachiy/targilim` for Yaniv Mizrachi.

The Hebrew product name is `תרגילים`.

Build a real Hebrew mathematics exercise generator for grades 7, 8, and 9 only after planning and source learning are complete.

Use only Yaniv-supplied curriculum materials, examples, drawings, diagrams, and requirements.

Do not invent curriculum content.

Do not create demo data.

Do not generate fake questions.

Do not create fake working buttons.

All product-facing content must be Hebrew-only and RTL.

Before any implementation, first inspect `RULES.md` and verify that it is organized by topic, current, complete, and contradiction-free. If it is not, fix the rules before coding.

Before implementation, study each uploaded source file one by one.

Preserve the raw file, understand it, classify it by grade/domain/topic/skill, then rename and organize it professionally.

Build the curriculum knowledge base from the source files before creating exercise-generation logic.

Every generated question must be mapped to grade, domain, topic, subtopic, skill, prerequisites, difficulty, representation type, question type, learning goal, misconception if relevant, and source reference if relevant.

All generated exercises are for print-oriented worksheets only, not computerized task assignment.

Every question must be suitable for A4 printing and for placement in Word, Canva, Google Docs, PowerPoint, or another print-oriented editor.

Every question must include real working options to copy the final rendered question as an image and download it as an image, with a useful PNG fallback when needed.

The future generator must provide a comfortable Hebrew-only teacher menu for choosing topics and editing meaningful question parameters.

When a teacher changes a parameter, the generator must automatically update the exercise content, Hebrew wording, mathematical answer, visual representation, copy-as-image output, and download-as-image output.

The future generator must provide strong graphics, correct Hebrew punctuation, accurate mathematical notation, high-quality visual design, teacher-controlled parameters, Hebrew-only buttons, and print-ready output.

Claude must choose the strongest appropriate tools, libraries, architecture, data structures, rendering methods, export methods, and quality checks to satisfy Yaniv's requirements. Yaniv defines what the product must do; Claude chooses how to implement it professionally.

Keep `RULES.md` and `PROJECT_STATUS.md` synchronized after every meaningful change.

Always document what Yaniv did, what ChatGPT did, what Claude did, what remains, what is only planned, and what is implemented and tested.

Today's work belongs under Tuesday, 2026-06-09.

Claude implementation has not started yet.

Start by validating the repository documentation and source-material manifest, then wait for the raw PDF files to be present in the repository before learning and implementation.

## 19. Claude responsibility rule

Claude must work at a very high professional level.

Yaniv's instructions define the required product behavior, quality, and constraints.

Claude must not wait for Yaniv to specify low-level technical methods when the requirement is clear.

Claude must choose the strongest appropriate tools, libraries, architecture, data structures, rendering methods, export methods, and quality checks to satisfy the requirements.

Claude must still remain honest: if a requirement is impossible, unsafe, unsupported by the browser, or blocked by missing data, Claude must say so clearly and provide the best safe fallback.

## 20. Repository conversion rule

This repository originally served a different project. It is now being converted into the `תרגילים` project.

No destructive cleanup is allowed until Yaniv explicitly approves it.

Before cleanup, preserve only what is intentionally needed; remove or archive irrelevant old material only after approval.

## 21. Planning rule

The project remains in planning mode until Yaniv says he has finished giving all requirements.

Only after the planning phase is complete should Claude begin building the repository and generator according to the complete plan.

## 22. Today's completed work — 2026-06-09, Tuesday

ChatGPT has done:

- Selected and converted the existing repository into the planning repository for `תרגילים`.
- Verified that the repository was renamed to `yanivmizrachiy/targilim`.
- Updated `RULES.md` as the main source of truth.
- Created or updated planning documentation, including project status and AI handoff files.
- Added initial product requirements for a Hebrew curriculum-based math exercise generator.
- Added initial generator specification files for question metadata and Hebrew RTL rules.
- Added the requirement that source files must be learned before they are renamed and organized.
- Added the requirement that generated exercises are for print-oriented worksheets only.
- Added source-material intake documentation.
- Added a source-material manifest for the 10 uploaded PDFs.
- Added the Claude working prompt inside `RULES.md`.
- Reorganized `RULES.md` by professional requirement topics.
- Added the mandatory pre-work rules-file organization audit.
- Added detailed requirements for Hebrew punctuation quality, graphics, colors, visual styles, app buttons, navigation, copy-as-image, download-as-image, and teacher-controlled generation parameters.
- Added detailed requirements for a comfortable Hebrew-only teacher menu and automatic question updates when teacher parameters change.

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

Claude has done:

- Nothing yet. Claude has not started implementation.

Not done yet:

- Raw upload of the 10 PDF files into the GitHub repository.
- Final cleanup of old project files.
- Full curriculum intake.
- Organization of source files inside GitHub.
- Claude implementation.
- Exercise generator UI.
- Teacher menu implementation.
- Automatic parameter-update engine.
- Copy-as-image implementation.
- Download-as-image implementation.
- Print/export implementation.
- Testing.

## 23. Current completion estimate

Repository renamed to `yanivmizrachiy/targilim`: completed.

Initial repository rules: created, reorganized, and updated for today's requirements.

Source-material manifest: created.

Full requirements collection: in progress.

Generator implementation: not started.

Estimated project planning completion: 54%.
