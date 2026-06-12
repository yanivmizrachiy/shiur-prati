# Grade 8 triangle source-fit — 2026-06-12

## What was added

Three active Grade 8 triangle topics were added to strengthen alignment with the uploaded Grade 8 geometry curriculum and geometry-domain principles.

## Commits

- `549ff4a` — active Grade 8 triangle topics in `generator/g8-04.js`.
- `7659cb8` — verifier updated to include Grade 8 triangle source-fit topics.

## Active topics added

### `G8-07` — חפיפת משולשים לפי סימונים

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Read congruence markings from a diagram.
2. Identify matching equal sides and equal included angle.
3. Conclude triangle congruence by side-angle-side.
4. Explain the reasoning in words.

### `G8-08` — משולש שווה שוקיים

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Use equal sides to infer equal base angles.
2. Compute the second base angle.
3. Use the triangle-angle sum to compute the vertex angle.
4. Avoid treating all three angles as equal unless the triangle is equilateral.

### `G8-09` — דמיון וצללים

Source basis:

- File 04: Grade 8 geometry curriculum.
- File 09: geometry principles grades 7–8.

Student task families:

1. Build a ratio from two similar right triangles.
2. Use shadow lengths to find an unknown height.
3. Preserve corresponding sides in a proportion.
4. Explain why same-time shadows produce similar triangles.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that these active topics exist in `generator/g8-04.js`:

- `G8-07`
- `חפיפת משולשים לפי סימונים ✦ מקור`
- `G8-08`
- `משולש שווה שוקיים ✦ מקור`
- `G8-09`
- `דמיון וצללים ✦ מקור`

## Current source-fit clusters on main

1. N7-01 coordinate system Q1.
2. U7-03 relative-frequency comparison.
3. A8-01 applied graph/function reading.
4. U7-04 bar-chart reading.
5. G8-02 cylinder and net.
6. G8-03 parallel-line angles.
7. U7-05 pie chart and relative frequency.
8. U7-06 misleading graph critique.
9. A7-04 equivalent expressions and simplification.
10. A7-05 expression mistake analysis.
11. G7-05 transformations.
12. G7-06 composite area.
13. G8-05 central angle and sector.
14. G8-06 diameter, radius, and chord.
15. G8-07 triangle congruence markings.
16. G8-08 isosceles triangle.
17. G8-09 similarity and shadows.

## Still pending for Grade 8 triangles

1. Full smart-engine mixed-mode versions of `G8-07`, `G8-08`, and `G8-09`.
2. More congruence criteria and non-congruence traps.
3. Similarity scale-factor with area/perimeter traps.
4. Richer proof-style explanation prompts.
