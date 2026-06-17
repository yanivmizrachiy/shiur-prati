# Extreme completion plan — targilim — 2026-06-12

## Core requirement

Every question family that appears in the 10 uploaded source files must be represented in the project, and then expanded into variations:

- easier versions;
- harder versions;
- changed numbers;
- changed contexts;
- open questions;
- multiple choice;
- true/false;
- find-the-mistake;
- clean worksheet output.

No topic should be added without a clear source-file connection.

## Quality requirement

The final generator must be teacher-grade:

- accurate mathematics;
- precise diagrams;
- precise graphs;
- correct Hebrew and right-to-left display;
- clean categories by grade/domain/topic;
- no random clutter in the repository;
- updated worklog and coverage docs after every sprint;
- verification scripts for source coverage and topic registration.

## Current progress estimate

**Current estimated completion: 46%.**

This is an estimate of the whole vision, not merely number of commits.

What is already strong:

1. Source files are present and catalogued.
2. Multi-exercise worksheet runtime exists.
3. Many source-fit visual clusters are active.
4. Several new fallback topics were added in algebra, geometry, uncertainty, and graphs.
5. Verification scripts now check key source-fit files and active topics.
6. Documentation exists for many sprints.

What is not yet complete:

1. Many fallback topics still need to become full smart engines.
2. Not every source-file question family has a generator yet.
3. Browser-level verification is still needed.
4. Some categories need consolidation to avoid duplicate topic families.
5. A full source coverage matrix is still needed.

## Percentage gates

### 50% — Source coverage matrix and category cleanup

Deliverables:

- Add `docs/SOURCE_COVERAGE_MATRIX_20260612.md`.
- Map every uploaded source file to active generator topics.
- Mark every family as: `active`, `partial`, `missing`, or `needs smart engine`.
- Identify duplicate / messy category entries.

### 60% — Convert high-value fallback topics into smart engines

Priority targets:

- `A7-04` equivalent expressions.
- `A7-05` value tables and first-quadrant graphing.
- `U7-05` pie chart and relative frequency.
- `U7-06` misleading graph critique.
- `G8-07` triangle congruence.
- `G8-08` isosceles triangle.
- `G8-09` similarity and shadows.

Each smart engine must support:

- `open`;
- `mcq`;
- `tf`;
- `mistake`;
- `mixed`;
- multiple numeric/context variations;
- robust answer explanation.

### 70% — Fill missing source-file families

Targets:

- Grade 7 algebra: matching expressions, equations, tables, verbal contexts.
- Grade 8 algebra: systems, inequalities, percentage equations, slopes.
- Grade 7 geometry: angle chasing, nets, Pythagoras applications.
- Grade 8 geometry: more congruence, similarity, isosceles, circle reasoning.
- Uncertainty: bar-chart construction, pie-chart construction, relative frequency in tables.
- Numeric: roots, powers, negative-number operation traps.

### 82% — Teacher options and worksheet output

Targets:

- Choose question type mix.
- Choose difficulty mix.
- Choose number of exercises.
- Choose visual mode: color / grayscale / black-white.
- Better printed A4 layout.
- Better answer key.
- Cleaner student work area.

### 92% — Verification and anti-breakage

Targets:

- Static topic registry verifier.
- Source coverage verifier.
- Engine output verifier.
- SVG sanity verifier.
- KaTeX/undefined/NaN verifier.
- Print layout smoke verifier.

### 100% — Product-grade release

Targets:

- Clean docs.
- Clean topic structure.
- No duplicate confusing topics.
- Full source coverage report.
- All high-priority topics as smart engines.
- GitHub Pages verified.
- Release tag / final status doc.

## Active source-fit clusters already on main

1. N7-01 coordinate system Q1.
2. U7-03 relative-frequency comparison.
3. A8-01 applied graph/function reading.
4. U7-04 bar-chart reading.
5. G8-02 cylinder and net.
6. G8-03 parallel-line angles.
7. U7-05 pie chart and relative frequency.
8. U7-06 misleading graph critique.
9. A7-04 equivalent expressions and simplification.
10. A7-05 value tables and first-quadrant graphing.
11. G7-05 transformations.
12. G7-06 composite area.
13. G8-05 central angle and sector.
14. G8-06 diameter, radius, and chord.
15. G8-07 triangle congruence markings.
16. G8-08 isosceles triangle.
17. G8-09 similarity and shadows.

## Next automatic sprint

Start with the 50% gate:

1. Build the source coverage matrix.
2. Mark every family from the 10 source files.
3. Decide which missing families are highest priority.
4. Then convert the highest-value fallback topic into a full smart engine.
