# Project Rules — Hebrew Math Exercise Generator

## Repository identity

Technical repository: `yanivmizrachiy/targilim`.

Hebrew project name: `תרגילים`.

Project purpose: create a real, curriculum-based Hebrew mathematics exercise generator for grades 7, 8, and 9.

## Today / work-log date rule

All work performed today must be recorded under this date:

- Gregorian date: 2026-06-09
- Day: Tuesday

Whenever work is done today by Yaniv, ChatGPT, or Claude later, the project documentation must keep the date context clear and must not mix today's work with earlier or future work without an explicit date.

## Current phase

The project is currently in the requirements collection and planning phase.

Allowed now:
- Use this repository as the working repository for the new project.
- Create and maintain this `RULES.md` file.
- Collect Yaniv's requirements.
- Organize requirements in a professional, contradiction-free order.
- Keep the Claude working prompt inside this `RULES.md` file.
- Prepare source-material intake folders and documentation for curriculum files, drawings, examples, and uploaded learning materials.

Forbidden now:
- Do not build the generator yet.
- Do not create demo behavior.
- Do not invent curriculum content.
- Do not generate fake exercises.
- Do not delete repository files until Yaniv explicitly approves the final conversion/cleanup step.
- Do not claim that any feature works before it is implemented and tested.

## Language rules

All user-facing product content must be in Hebrew only.

This includes:
- Generator UI
- Buttons
- Teacher controls
- Student-facing questions
- Worksheet content
- Mathematical explanations
- Error/status messages shown in the product
- Exported or printed worksheet content

Technical planning files may be written in English.

## Curriculum and source-material rule

The generator must be based only on curriculum information, topics, skills, drawings, visual examples, and sample questions supplied by Yaniv.

The generator is for:
- Grade 7
- Grade 8
- Grade 9

Claude must first store, organize, study, and understand the supplied curriculum information and uploaded source materials inside the repository before implementing exercise generation.

Source materials may include:
- Text explanations
- Curriculum documents
- Tables
- Images
- Drawings
- Diagrams
- Sample questions
- Teacher examples
- Mathematical visual representations

Every source file uploaded for Claude to study must initially be stored safely in the repository without losing information.

Claude must inspect and understand each source file before renaming it.

After understanding a file, Claude must give it a meaningful professional filename and place it in the correct folder according to grade, topic, skill, or source-material type.

Claude must not rename files blindly.

Every generated question must map to:
- Grade level
- Curriculum domain
- Topic
- Subtopic
- Skill taught
- Prerequisite knowledge
- Difficulty level
- Mathematical representation type
- Question type
- Expected learning goal
- Common misconception addressed, if relevant
- Source file or example used, if relevant

## Source-file intake and renaming workflow

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

## Exercise output rule

All generated exercises are for print-oriented worksheets only.

The generator is not being built as a system for assigning computerized tasks to students.

The target output is printable mathematics content that a teacher can place into a worksheet, Word document, Canva document, Google Docs document, PowerPoint slide, or A4 print layout.

## Graphics and mathematical writing rule

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

## Source-of-truth rule

`RULES.md` is the main source of truth for this project.

Every new requirement from Yaniv must be added here in a professional order.
Every update must preserve previous requirements unless Yaniv explicitly cancels or replaces them.
Contradictions must be detected and resolved explicitly.
The repository must never contain documentation that contradicts the current project rules.

## Claude working prompt inside RULES.md

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
Before implementation, study each uploaded source file one by one.
Preserve the raw file, understand it, classify it by grade/domain/topic/skill, then rename and organize it professionally.
Build the curriculum knowledge base from the source files before creating exercise-generation logic.
Every generated question must be mapped to grade, domain, topic, subtopic, skill, prerequisites, difficulty, representation type, question type, learning goal, misconception if relevant, and source reference if relevant.
All generated exercises are for print-oriented worksheets only, not computerized task assignment.
Every question must be suitable for A4 printing and for placement in Word, Canva, Google Docs, PowerPoint, or another print-oriented editor.
Every question must include a real working option to copy the final rendered question as an image, with a useful PNG fallback when needed.
Keep `RULES.md` and `PROJECT_STATUS.md` synchronized after every meaningful change.
Always document what Yaniv did, what ChatGPT did, what Claude did, what remains, what is only planned, and what is implemented and tested.
Today's work belongs under Tuesday, 2026-06-09.
Claude implementation has not started yet.
Start by validating the repository documentation and source-material manifest, then wait for the raw PDF files to be present in the repository before learning and implementation.

## Progress tracking rule

`RULES.md` and `PROJECT_STATUS.md` must always show the real project state.

They must clearly distinguish:
- What ChatGPT has already done.
- What Yaniv has already done.
- What Claude has already done.
- What has not been done yet.
- What remains to do next.
- Which requirements are already documented.
- Which features are only planned.
- Which features are implemented and tested.

Claude has not started implementation yet.

## Copy-as-image requirement

Every generated question must be exportable and copyable as a rendered image, not only as text.

Each generated question must have a real working button that copies the final rendered question as an image, so the teacher can paste it into:
- Microsoft Word
- Canva
- Google Docs
- PowerPoint
- Any print-oriented editor

The copied image must include the full rendered Hebrew question, including RTL layout, mathematical notation, tables, diagrams, graphs, coordinate systems, number lines, or other visuals if used.

If direct browser image clipboard copying is not supported, the app must provide an honest fallback such as PNG download.

## Uploaded source-material manifest — 2026-06-09

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

## Repository conversion rule

This repository originally served a different project. It is now being converted into the `תרגילים` project.

No destructive cleanup is allowed until Yaniv explicitly approves it.
Before cleanup, preserve only what is intentionally needed; remove or archive irrelevant old material only after approval.

## Planning rule

The project remains in planning mode until Yaniv says he has finished giving all requirements.

Only after the planning phase is complete should Claude begin building the repository and generator according to the complete plan.

## Today's completed work — 2026-06-09, Tuesday

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

Yaniv has done:
- Chose the project direction.
- Approved using and converting an existing repository.
- Renamed the repository to `targilim`.
- Provided the core requirements for source-material learning, file renaming after understanding, print-only output, strong graphics, and progress tracking.
- Uploaded 10 curriculum/source PDFs in ChatGPT for intake and classification.
- Required the Claude prompt to live inside `RULES.md`.

Claude has done:
- Nothing yet. Claude has not started implementation.

Not done yet:
- Raw upload of the 10 PDF files into the GitHub repository.
- Final cleanup of old project files.
- Full curriculum intake.
- Organization of source files inside GitHub.
- Claude implementation.
- Exercise generator UI.
- Copy-as-image implementation.
- Print/export implementation.
- Testing.

## Current completion estimate

Repository renamed to `yanivmizrachiy/targilim`: completed.
Initial repository rules: created and updated for today's requirements.
Source-material manifest: created.
Full requirements collection: in progress.
Generator implementation: not started.
Estimated project planning completion: 48%.
