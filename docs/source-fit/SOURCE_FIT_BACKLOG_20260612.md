# Source-Fit Backlog — 2026-06-12

This backlog preserves the next improvement plan after the verified Claude source-fit sprints.

## Already completed and verified

1. `claude/source-fit-coordinate-chart-v1` — commit `7236537bc28a3b049468287d5e8c0782e5af64b9`
   - N7-01 coordinate-system engine.
   - Coordinate grid SVG.
   - Bar chart SVG.
   - U7-01 bar-chart reading family.
   - Active engine count became 26.

2. `claude/source-fit-visual-expansion-v2` — commit `288ed07723f8e039f0a4dc98bb08f86b46231c05`
   - U7-01 relative-frequency group comparison.
   - Double-bar visual.
   - A8-02 applied graph reading for fuel/heating contexts.

3. `claude/source-fit-critical-charts-v3` — commit `6bec2314f5a703ac22da96330e3f285d51009131`
   - U7-01 pie-chart reading/construction.
   - U7-01 misleading-graph critique.
   - Pie chart SVG.
   - Misleading bar chart SVG.

4. `chatgpt-ledger` — commit `1c1ec7ad506d167e307c83ec5e71d16f56f0d4a7`
   - Added `docs/CHATGPT_CLAUDE_SOURCE_FIT_LEDGER_20260612.md` so future work can continue from the verified state.

## Next highest-impact sprint

### v4 — Empirical graphs

Target branch: `claude/source-fit-empirical-graphs-v4`

Source basis:

- File 02, Grade 8 algebra graph-reading tasks.
- Algebra principles file 08: moving between visual, verbal, table, and graph representations.

Build:

- Empirical graph helper for measured data, not just y=mx+b.
- Kinneret-style or similar contextual graph-reading family.
- Interval behavior: increasing, decreasing, constant.
- Domain/range interpretation in context.
- Mistake variants: reading x as y, ignoring units, confusing highest point with last point, assuming every graph is formula-based.

Why this matters:

After v1-v3, uncertainty visual representation is much stronger. The next main mismatch is Grade 8 algebra reading from a given graph.

## Later sprints

### v5 — Four-quadrant coordinate system

Source basis: File 05.

Build:

- Coordinate grid with four quadrants.
- Read and plot points with negative coordinates.
- Reflect across axes.
- Segment length on horizontal/vertical lines.
- Misconceptions: sign swap, quadrant confusion, distance as signed value.

### v5b — Pictogram

Source basis: File 06.

Build:

- Pictogram SVG helper.
- Read value from symbols.
- Half-symbol or scaled-symbol interpretation.
- Misconception: counting icons without using the key.

### v6 — Sequences to expression with drawings

Source basis: File 01.

Build:

- Shape/tile/cup pattern drawings.
- Convert drawing sequence to expression.
- Identify constant difference and first term correction.
- Misconception: using step*n without adjusting first term.

### v6b — Circle geometry extension

Source basis: File 04.

Build:

- Point inside/on/outside circle.
- Central angle and arc fraction.
- Radius/diameter relationship in diagrams.
- Misconceptions: diameter vs radius, percent of circle vs degrees.

### v7 — Geometry proof and 3D

Source basis: File 04 and geometry principles file 09.

Build:

- Cylinder surface/volume/net.
- Parallel-line angle diagrams.
- Congruent triangles with tick marks.
- Isosceles triangle property.

## Permanent quality rule

Every new family must include:

- source evidence;
- visual helper if the source uses a diagram;
- open, MCQ, true/false, and mistake variants when suitable;
- misconception handling;
- answer explanation;
- mobile/print readability;
- verifier or harness coverage;
- truthful docs update.

## Review protocol for future Claude outputs

When a future output ends with `SAVED_TO_GITHUB: <branch> <sha>`:

1. Fetch and verify the commit.
2. Check that the branch/commit matches the report.
3. Check changed files.
4. Check whether engine count changed.
5. Ensure no existing engine was deleted or renamed.
6. Confirm docs and status were updated honestly.
7. Add the sprint to the ledger/backlog if verified.
8. Continue with the next source-backed gap.
