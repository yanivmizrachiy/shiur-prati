# Grade 7 geometry source-fit expansion — 2026-06-12

## Goal

Strengthen alignment with uploaded File 03: Grade 7 pre-deductive geometry curriculum, and File 09: geometry principles grades 7–8.

## Commits

- `fe6da48` — expanded `generator/g7-01.js` with nets and cuboid source-fit topics.
- `0105cfe` — added focused Grade 7 geometry verifier.

## Active topics added

### `G7-07` — פריסת תיבה וזיהוי פאות

Student task families:

1. Recognize the six rectangular faces of a cuboid.
2. Understand base, lid, and four side faces.
3. Decide what makes a net valid.
4. Explain missing or overlapping faces.

### `G7-08` — נפח תיבה מתוך פריסה

Student task families:

1. Use length, width, and height.
2. Compute volume.
3. Compute surface area.
4. Connect a 3D cuboid to its 2D net and face areas.

## New focused verifier

A new verifier was added:

`tools/verify-geometry-g7-source-fit.mjs`

It checks:

1. Source files 03 and 09 are listed.
2. `G7-07` and `G7-08` exist in `generator/g7-01.js`.
3. Existing transformation and composite-area topics exist.
4. Existing Pythagoras and angle smart engines exist.

## Progress update

Current estimated whole-product completion: **64%**.

Reason:

- Grade 7 geometry now has better source coverage across rectangles/cuboids, nets, volume/surface area, transformations, composite area, Pythagoras, and angle reasoning.
- This moves the project closer to the 70% source-family coverage gate.

## Next recommended sprint

Improve diagram quality and source coverage for:

1. More precise nets and surface-area variants.
2. Pythagoras application diagrams.
3. Angle-chasing diagrams from Grade 7 geometry.
4. Convert fallback geometry topics into smart engines.
