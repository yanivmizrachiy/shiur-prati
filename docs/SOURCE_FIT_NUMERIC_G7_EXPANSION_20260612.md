# Grade 7 numeric source-fit expansion — 2026-06-12

## Goal

Strengthen alignment with uploaded File 05: Grade 7 numeric domain curriculum.

This sprint expands the numeric area with source-backed active topics around directed numbers, the number line, opposite numbers, and absolute value.

## Commits

- `485be74` — expanded `generator/n7-03.js` with Grade 7 numeric source-fit topics.
- `e22b529` — updated `tools/verify-chatgpt-source-fit-sync.mjs` to verify the new numeric topics.

## Active topics added

### `N7-08` — ציר מספרים והשוואת שליליים

Source basis:

- File 05: Grade 7 numeric domain curriculum.
- File 07: numeric-domain principles grades 7–8.

Student task families:

1. Compare positive and negative numbers.
2. Use number-line position to justify inequality.
3. Avoid the common misconception that a larger absolute value always means a larger number.
4. Read direction on a number line.

### `N7-09` — מספר נגדי וערך מוחלט בהקשר

Source basis:

- File 05: Grade 7 numeric domain curriculum.
- File 07: numeric-domain principles grades 7–8.

Student task families:

1. Opposite number.
2. Absolute value as distance from zero.
3. Contexts such as temperature, elevator floors, and debt.
4. Distinguish value from distance.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that `generator/n7-03.js` includes:

- `N7-08`
- `ציר מספרים והשוואת שליליים ✦ מקור`
- `N7-09`
- `מספר נגדי וערך מוחלט בהקשר ✦ מקור`

## Progress update

Current estimated whole-product completion: **54%**.

Reason:

- File 05 coverage has been strengthened beyond the existing coordinate-system work.
- Numeric reasoning now includes explicit number-line and context-based absolute-value tasks.
- Verification was updated.

## Next recommended sprint

Continue File 05 coverage with:

1. Directed addition/subtraction mistake analysis.
2. Multiplication/division of directed numbers.
3. Powers and square-root reasoning traps.
4. More number-line diagrams and table/graph connections.
