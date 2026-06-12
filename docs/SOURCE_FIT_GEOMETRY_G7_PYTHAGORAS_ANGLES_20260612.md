# Grade 7 geometry — Pythagoras and angle source-fit expansion — 2026-06-12

## Goal

Strengthen File 03 and File 09 coverage with more diagram-based Grade 7 geometry tasks.

## Commits

- `866c004` — expanded `generator/g7-02.js` with Pythagoras and angle source-fit topics.
- `cbb4371` — updated the focused Grade 7 geometry verifier.

## Active topics added

### `G7-09` — פיתגורס בבעיה מצוירת

Student task families:

1. Read a right-triangle diagram.
2. Identify the two legs and the hypotenuse.
3. Use known Pythagorean triples.
4. Connect a real context such as ladder/path to a mathematical right triangle.

### `G7-10` — זוויות סביב ישר ונקודה

Student task families:

1. Read angle data from a diagram.
2. Use adjacent angles on a straight line.
3. Complete to 180 degrees.
4. Explain angle reasoning verbally.

## Verification

`tools/verify-geometry-g7-source-fit.mjs` now checks:

- `G7-09`
- `פיתגורס בבעיה מצוירת ✦ מקור`
- `G7-10`
- `זוויות סביב ישר ונקודה ✦ מקור`

## Progress update

Current estimated whole-product completion: **66%**.

Reason:

- Grade 7 geometry now includes more source-backed diagram families.
- The project is closer to the 70% source-family coverage gate.
- The biggest remaining gap is converting more active fallback topics into full smart engines and tightening diagram precision.

## Next recommended sprint

Move toward 70% by improving Grade 8 geometry smart coverage:

1. More congruence variants.
2. More isosceles triangle reasoning.
3. More similarity and shadows variants.
4. Cleaner reusable SVG helpers for diagrams.
