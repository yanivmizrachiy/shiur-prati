# Uncertainty source-fit expansion — 2026-06-12

## Goal

Strengthen alignment with uploaded File 06: uncertainty-domain examples.

This sprint expands the uncertainty area beyond a single fixed example by adding more source-backed families that teachers can generate from the project.

## Commits

- `4de184a` — expanded `generator/u7-02.js` with additional source-fit uncertainty topics and more variation.
- `e7e46a` — updated `tools/verify-chatgpt-source-fit-sync.mjs` to verify the expanded uncertainty topics.

## Active topics strengthened / added

### `U7-05` — דיאגרמת עוגה ושכיחות יחסית

Expanded from one fixed example into multiple contexts:

- sports preferences;
- transport to school;
- pets.

Students compute:

- absolute frequency;
- relative frequency;
- approximate percentage;
- approximate sector angle in degrees.

### `U7-06` — תרשים מטעה — ביקורת

Keeps a source-backed visual critique task:

- identify that the vertical axis does not start from 0;
- explain why the visual impression is exaggerated;
- propose a correction.

### `U7-07` — טבלת שכיחויות ושכיחות יחסית

New source-fit active topic.

Students work with a frequency table and compute relative frequency from a category and the total.

### `U7-08` — ממוצע חציון וטווח

New source-fit active topic.

Students compute:

- mean;
- median;
- range.

## Verification

The verifier now checks that `generator/u7-02.js` contains:

- `U7-05` — pie chart / relative frequency;
- `U7-06` — misleading chart critique;
- `U7-07` — frequency table / relative frequency;
- `U7-08` — mean, median, and range.

## Progress update

Current estimated whole-product completion: **52%**.

Reason:

- The project has crossed the 50% gate by adding a Grade 7 algebra smart engine.
- This sprint expands source coverage for File 06 with two additional active topic families.
- The next major jump requires converting these uncertainty fallback topics into full smart engines with `open`, `mcq`, `tf`, `mistake`, and `mixed` support.

## Next recommended sprint

Convert `U7-05` and `U7-06` into full smart engines, or continue filling missing source families in Grade 8 algebra and Grade 7 numeric domain.
