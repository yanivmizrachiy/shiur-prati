# Claude Phase 1 Task — Source Upload Verification and Deep Learning

Date: 2026-06-09
Repository: `yanivmizrachiy/targilim`
Hebrew product name: `תרגילים`

## Current truth

Claude implementation has not started.

The project is still in planning, source-material intake, and source-learning preparation.

`RULES.md` is the main source of truth.

The deep source-learning protocol is located at:

```text
docs/CLAUDE_DEEP_SOURCE_LEARNING_AND_QUALITY_PROTOCOL.md
```

## Phase 1 objective

Before building any generator UI or generation logic, Claude must verify that the ten source PDFs are present in the repository, then study them deeply one by one and create a structured curriculum map.

## Required first checks

Claude must begin by checking:

1. `RULES.md`
2. `PROJECT_STATUS.md`
3. `docs/CLAUDE_DEEP_SOURCE_LEARNING_AND_QUALITY_PROTOCOL.md`
4. `sources/intake/2026-06-09/MANIFEST.md`
5. The actual presence of all expected PDF files under `sources/intake/2026-06-09/`

Claude must not trust a manifest alone. Claude must verify actual file presence.

## Required source files

Expected files:

1. `01_grade-7_algebra_curriculum.pdf`
2. `02_grade-8_algebra_curriculum.pdf`
3. `03_grade-7_pre_deductive_geometry_curriculum.pdf`
4. `04_grade-8_geometry_curriculum.pdf`
5. `05_grade-7_numeric_domain_curriculum.pdf`
6. `06_uncertainty_domain_curriculum_examples.pdf`
7. `07_numeric_domain_principles_grades-7-8.pdf`
8. `08_algebra_domain_principles_grades-7-8.pdf`
9. `09_geometry_domain_principles_grades-7-8.pdf`
10. `10_grade-8_teaching_sequence_2026-2027.pdf`

Claude must check both the per-source folders and the preserved `originals` folder.

## If files are missing

If any PDF is missing from GitHub, Claude must stop source learning and report the missing files clearly.

Claude must not pretend the source upload is complete.

Claude must not build the generator before the files are present or before Yaniv explicitly approves continuing from alternate uploaded copies.

## If files are present

If all source PDFs are present, Claude must create a source-learning folder:

```text
source-learning/2026-06-09/
```

For each PDF, create a separate learning note:

```text
source-learning/2026-06-09/01_grade-7_algebra_curriculum.learning.md
source-learning/2026-06-09/02_grade-8_algebra_curriculum.learning.md
...
```

Each learning note must include:

- verified source path;
- grade or grade range;
- mathematical domain;
- major topics;
- subtopics;
- required skills;
- prerequisite knowledge;
- example question patterns;
- visual representations;
- diagrams and drawing requirements;
- graph, coordinate-system, number-line, table, chart, or geometry requirements;
- Hebrew wording and punctuation patterns;
- mathematical notation requirements;
- teacher-configurable variables;
- safe variation rules;
- printable worksheet opportunities;
- limitations or missing information.

## Curriculum map deliverable

After studying all source files, Claude must create:

```text
curriculum-map/CURRICULUM_MAP.md
curriculum-map/grade-7.md
curriculum-map/grade-8.md
curriculum-map/grade-9.md
curriculum-map/domains/algebra.md
curriculum-map/domains/geometry.md
curriculum-map/domains/numeric.md
curriculum-map/domains/uncertainty.md
```

The curriculum map must make clear what is supported by the uploaded sources and what is still missing, especially for grade 9 if no grade 9 source file has been uploaded yet.

## Question-pattern extraction deliverable

Claude must create:

```text
question-patterns/PATTERN_INDEX.md
```

Every reusable question pattern extracted from the sources must include:

- source file;
- grade;
- domain;
- topic;
- skill;
- question type;
- visual representation type;
- teacher-changeable parameters;
- valid ranges;
- answer logic;
- Hebrew wording template;
- punctuation notes;
- drawing or diagram requirements;
- print/export notes.

## Tooling requirement

Claude must choose strong safe tools and libraries only after understanding the source requirements.

Claude may use terminal commands to inspect the repository, install safe dependencies, and run tests, but must document every dependency and why it is needed.

Claude must consider high-quality rendering methods for:

- mathematical notation;
- SVG diagrams;
- coordinate systems;
- geometry drawings;
- charts;
- tables;
- RTL Hebrew layout;
- image export;
- clipboard image copy;
- PNG fallback download;
- A4 printing.

## Quality gates

Claude must not mark Phase 1 complete until:

- all ten source files are verified present, or missing files are explicitly documented;
- each source file has a learning note;
- the curriculum map exists;
- the question-pattern index exists;
- `RULES.md` and `PROJECT_STATUS.md` are updated honestly;
- no implementation is started prematurely.

## Output format for Claude

At the end of Phase 1, Claude must report:

```text
STATUS:
DONE:
EVIDENCE:
BLOCKERS:
FILES_CHANGED:
NEXT:
PERCENT:
```
