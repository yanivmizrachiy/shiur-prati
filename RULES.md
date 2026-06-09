# Project Rules — Hebrew Math Exercise Generator

## Repository identity

Technical repository: `yanivmizrachiy/targilim`.

Hebrew project name: `תרגילים`.

Project purpose: create a real, curriculum-based Hebrew mathematics exercise generator for grades 7, 8, and 9.

## Current phase

The project is currently in the requirements collection and planning phase.

Allowed now:
- Use this repository as the working repository for the new project.
- Create and maintain this `RULES.md` file.
- Collect Yaniv's requirements.
- Organize requirements in a professional, contradiction-free order.
- Prepare one large professional English prompt for Claude after Yaniv finishes providing all requirements.

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

## Curriculum rule

The generator must be based only on curriculum information, topics, skills, and sample questions supplied by Yaniv.

The generator is for:
- Grade 7
- Grade 8
- Grade 9

Claude must first store, organize, study, and understand the supplied curriculum information inside the repository before implementing exercise generation.

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

## Source-of-truth rule

`RULES.md` is the main source of truth for this project.

Every new requirement from Yaniv must be added here in a professional order.
Every update must preserve previous requirements unless Yaniv explicitly cancels or replaces them.
Contradictions must be detected and resolved explicitly.
The repository must never contain documentation that contradicts the current project rules.

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

## Repository conversion rule

This repository originally served a different project. It is now being converted into the `תרגילים` project.

No destructive cleanup is allowed until Yaniv explicitly approves it.
Before cleanup, preserve only what is intentionally needed; remove or archive irrelevant old material only after approval.

## Planning rule

After this initial rules file is created, the project remains in planning mode until Yaniv says he has finished giving all requirements.

Only after the planning phase is complete should Claude receive one large professional English prompt and begin building the repository and generator according to the complete plan.

## Current completion estimate

Repository renamed to `yanivmizrachiy/targilim`: completed.
Initial repository rules: created.
Full requirements collection: in progress.
Generator implementation: not started.
Estimated project planning completion: 38%.
