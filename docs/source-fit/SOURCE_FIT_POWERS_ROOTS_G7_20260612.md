# Grade 7 powers and roots source-fit verification — 2026-06-12

## Goal

Strengthen the File 05 / File 07 numeric-domain track by explicitly verifying that powers and square-root smart engines are present and aligned to source requirements.

## Commits

- `4dec25c` — expanded directed multiplication/division topics.
- `9d3a344` — verified directed multiplication/division topics in the main verifier.
- `2476ad0` — added focused Grade 7 numeric verifier.

## Smart engines verified

### `N7-06-ENGINE` — חזקות

Existing smart engine:

- `generator/engine/pilot-n7-06.js`

Verified capabilities:

- powers with negative bases;
- distinction between `(-a)^n` and `-a^n`;
- open questions;
- multiple choice;
- true/false;
- find-the-mistake;
- sign traps with even and odd exponents.

### `N7-07-ENGINE` — שורש ריבועי

Existing smart engine:

- `generator/engine/pilot-n7-07.js`

Verified capabilities:

- exact square roots;
- estimating roots between perfect squares;
- missing square side length;
- square-root sum trap;
- open questions;
- multiple choice;
- true/false;
- find-the-mistake.

## New focused verifier

A new verifier was added:

`tools/verify-numeric-g7-source-fit.mjs`

It checks:

1. File 05 and File 07 are listed in the source manifest.
2. `N7-08` and `N7-09` exist for number line / absolute value.
3. `N7-10` and `N7-11` exist for directed add/sub reasoning.
4. `N7-12` and `N7-13` exist for directed multiplication/division.
5. `N7-06-ENGINE` powers smart engine exists.
6. `N7-07-ENGINE` roots smart engine exists.

## Progress update

Current estimated whole-product completion: **60%**.

Reason:

- The 50% gate was reached when Grade 7 algebra moved into smart engines.
- The numeric File 05 track now has broad verified coverage: number line, opposite/absolute value, directed addition/subtraction, multiplication/division, powers, and roots.
- Coverage is still not complete, but the numeric backbone is now much stronger and more verifiable.

## Next recommended sprint

Move to Grade 8 algebra source gaps:

1. Systems of equations.
2. Inequalities.
3. Percentage equations.
4. More table/function/graph matching.
