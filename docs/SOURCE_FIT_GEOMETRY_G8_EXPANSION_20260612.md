# Grade 8 geometry source-fit expansion — 2026-06-12

## Goal

Strengthen alignment with uploaded File 04: Grade 8 geometry curriculum, and File 09: geometry principles grades 7–8.

## Commits

- `9829c5d` — expanded `generator/g8-04.js` with additional triangle congruence and similarity topics.
- `b9a4128` — added focused Grade 8 geometry verifier.

## Active topics added

### `G8-10` — חפיפה — מה חסר להוכחה

Student task families:

1. Read triangle markings.
2. Identify that two sides alone are not enough for congruence.
3. Explain what additional condition is required.
4. Connect data to congruence rules such as SSS or SAS.

### `G8-11` — דמיון — יחס שטחים והיקפים

Student task families:

1. Use similarity ratio for corresponding lengths and perimeters.
2. Use square of similarity ratio for areas.
3. Distinguish perimeter scaling from area scaling.
4. Explain why area ratio is not the same as side ratio.

## New focused verifier

A new verifier was added:

`tools/verify-geometry-g8-source-fit.mjs`

It checks:

1. Source files 04 and 09 are listed.
2. Circle source-fit topics exist.
3. Cylinder/net and parallel-line engines exist.
4. Triangle congruence/similarity/isoceles topics exist.
5. New topics `G8-10` and `G8-11` exist.

## Progress update

Current estimated whole-product completion: **68%**.

Reason:

- Grade 8 geometry now covers more source-family variations.
- Congruence is no longer only a positive example; it now includes a “what is missing” reasoning task.
- Similarity now includes both shadow-context and perimeter/area-ratio reasoning.

## Next recommended sprint

Reach the 70% gate by doing one of the following:

1. Add a teacher preset layer for source-family worksheets.
2. Add one more missing family from Grade 8 algebra or Grade 7 geometry.
3. Convert another fallback cluster into a full smart engine.
