# Directed multiplication and division source-fit expansion — 2026-06-12

## Goal

Strengthen File 05 / File 07 coverage for Grade 7 directed-number multiplication and division.

## Commits

- `4dec25c` — expanded `generator/n7-05.js` with directed multiplication/division source-fit topics.
- `9d3a344` — updated `tools/verify-chatgpt-source-fit-sync.mjs` to verify the new topics.

## Active topics added

### `N7-12` — טעויות בכפל וחילוק מכוונים

Student task families:

1. Two negatives in multiplication.
2. Different signs in division.
3. Two negatives in division.
4. Negative times positive.

Goal:

Students identify the sign mistake and correct the computation.

### `N7-13` — כללי סימנים בכפל וחילוק

Student task families:

1. Determine result sign before full calculation.
2. Same signs produce positive result.
3. Different signs produce negative result.
4. Apply the rule in both multiplication and division.

## Verification

The verifier now checks that `generator/n7-05.js` contains:

- `N7-12`
- `טעויות בכפל וחילוק מכוונים ✦ מקור`
- `N7-13`
- `כללי סימנים בכפל וחילוק ✦ מקור`

## Progress update

Current estimated whole-product completion: **58%**.

Reason:

- File 05 numeric coverage is now broader across comparison, opposite/absolute value, addition/subtraction, and multiplication/division.
- The project has more source-backed families that teachers can generate from the UI.
- The verification script was expanded accordingly.

## Next recommended sprint

Continue File 05 numeric coverage with:

1. Powers with negative bases and parentheses.
2. Square-root reasoning traps and estimation.
3. More number-line diagrams.
4. Convert numeric fallback topics into full smart engines where needed.
