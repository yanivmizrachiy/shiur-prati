# Source-fit engine implementation — 2026-06-12

## Repository

`yanivmizrachiy/targilim`

## What was implemented automatically

### Commit `ab7a47a`

Added:

`generator/engine/source-fit-extensions.js`

This new runtime extension adds two source-backed engines without deleting or renaming existing engines.

### Commit `09829fe`

Updated:

`generator/index.html`

The page now loads:

`engine/source-fit-extensions.js?v=20260612-source-fit-1`

The extension loads after the existing smart engines and before `exercise-set.js`, so the new engines are available both in single-question mode and in multi-exercise worksheet mode.

## New source-backed engines

### `N7-01-ENGINE` — מערכת צירים, רביע ראשון

Source basis:

- File 05: Grade 7 numeric curriculum.
- Pattern index: `N7-01`, `N7-02`.

Question families added:

1. Plot points and identify the resulting shape.
2. Read/compute length of a segment parallel to an axis.
3. Compute area of a rectangle on the coordinate system.
4. Complete a missing coordinate of a rectangle.

Visual added:

- Coordinate-system SVG for quadrant I.

Supported question types:

- Open question.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode through the existing exercise-set runtime.

### `U7-03-ENGINE` — השוואת קבוצות לפי תדירות יחסית

Source basis:

- File 06: uncertainty examples.
- Pattern `U-05`: compare two groups by relative frequency, not absolute count.

Question family added:

- Compare two classes/groups where one group has a larger absolute count but a lower relative rate.

Visual added:

- Two-group comparison visual showing part/whole for each group.

Supported question types:

- Open question.
- Multiple choice.
- True/false.
- Find-the-mistake.
- Mixed mode through the existing exercise-set runtime.

## Why this was the correct automatic action

The deep source-fit audit found that the generator was already strong in calculation-style questions but weaker in source-style graph, table, chart, and construction tasks. The highest-priority source-backed backlog was to add coordinate-system and uncertainty comparison visuals. This implementation addresses that gap directly.

## Still pending

1. Full bar-chart read/construct engine.
2. Pie-chart construction.
3. Misleading graph critique.
4. Applied graph/table engine for algebra.
5. Cylinder/net and congruence visuals.

## Manual check after GitHub Pages refresh

- Grade 7 → Numeric should include `מערכת צירים — רביע ראשון ✦ מקור`.
- Grade 7 → Uncertainty should include `השוואת קבוצות — תדירות יחסית ✦ מקור`.
- Each new topic should work with 1, 5, 10, 15, and 20 exercises.
- Mixed question mode should produce varied formats.
