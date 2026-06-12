# Grade 8 algebra — graph interpretation expansion — 2026-06-12

## Goal

Strengthen File 02 and File 08 coverage for applied graph interpretation and representation matching.

## Commits

- `db2f17d` — expanded `generator/a8-02.js` with graph interpretation topics.
- `26a2e85` — updated the Grade 8 algebra focused verifier.

## Active topics added

### `A8-07` — קריאת גרף קווי בהקשר

Student task families:

1. Read a line graph in a real-world context.
2. Identify an increasing section.
3. Identify a horizontal/constant section.
4. Interpret graph shape as a story: heating, distance, or filling a tank.

### `A8-08` — התאמת גרף לסיפור

Student task families:

1. Match a graph to a verbal story.
2. Interpret increasing distance.
3. Interpret standing still from a horizontal section.
4. Interpret returning from a decreasing section.

## Verification

`tools/verify-algebra-g8-source-fit.mjs` now checks:

- `A8-07`
- `קריאת גרף קווי בהקשר ✦ מקור`
- `A8-08`
- `התאמת גרף לסיפור ✦ מקור`

## Progress update

Current estimated whole-product completion: **70%**.

Reason:

- The project reached the 70% source-family coverage gate.
- Grade 8 algebra now has richer graph-representation coverage beyond one engine.
- Multiple source files now have active source-fit families plus focused verifiers.

## Next gate: 82%

To reach 82%, the next work must focus less on adding fallback topics and more on product quality:

1. Convert fallback topics into full smart engines.
2. Add teacher presets for source-family worksheets.
3. Improve diagram precision and reusable SVG helpers.
4. Strengthen print/A4 output and answer-key control.
