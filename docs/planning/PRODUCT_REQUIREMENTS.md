# Product Requirements — Targilim

> **⚠️ מסמך היסטורי — לא מצב נוכחי.**
> נכתב בשלב התכנון הראשוני. המוצר יושם ועבר verify:deep.
> מצב עדכני ומחייב: [`PROJECT_STATUS.md`](../../PROJECT_STATUS.md) · [`RULES.md`](../../RULES.md) · [`PROJECT_TRUTH.md`](../../PROJECT_TRUTH.md)
> שינויים ספציפיים: שורת "Requirements collection and planning only" **מיושנת** — המוצר פעיל ב-production.
> כיתה ט' **נעולה** עד שיסופקו מקורות. הטבלה "Required teacher controls" **חלקית** — ראו RULES.md.

## Product name

Hebrew product name: `תרגילים`.

## Product purpose

Build a real Hebrew mathematics exercise generator. The current source-backed scope is grades 7 and 8. Grade 9 remains locked until real worked source examples are supplied.

The generator must help teachers create printable, curriculum-based Hebrew mathematics exercise cards.

The final product is not a booklet product, not a worksheet builder, and not a PDF workbook system.

## Current phase

Requirements collection and planning only.

Do not implement the generator until Yaniv confirms that the full requirement list is complete.

## Core product rules

- The final product must be fully Hebrew for all user-facing content.
- The product must support RTL layout.
- The product must be based only on curriculum data and sample questions supplied by Yaniv.
- No fake exercises are allowed.
- No demo data is allowed.
- No fake working buttons are allowed.
- No feature may be marked complete before implementation and testing.

## Target grades

- Grade 7
- Grade 8
- Grade 9

## Curriculum dependency

Before exercise generation begins, the repository must store and organize the curriculum information supplied by Yaniv.

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

## Required teacher controls

The final generator should allow the teacher to control, at minimum:

- Grade
- Topic
- Subtopic
- Skill
- Difficulty
- Question type
- Numerical range
- Representation type
- Context/theme
- Whether the solution is shown
- Whether hints are included
- Whether the output is for classwork, homework, practice, assessment, or enrichment

## Copy-as-image requirement

Every generated question must include a real working option to copy the final rendered question as an image.

The image must be suitable for pasting into:

- Word
- Canva
- Google Docs
- PowerPoint
- Other print-oriented editors

If direct image clipboard copying is not supported by the browser, the product must provide an honest fallback such as PNG download.

## Print requirement

Generated exercise cards must be suitable for printing.

The layout must be clean, readable, Hebrew RTL, and classroom-ready.
