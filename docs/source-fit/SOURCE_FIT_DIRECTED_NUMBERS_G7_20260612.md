# Directed numbers source-fit expansion — 2026-06-12

## Goal

Strengthen alignment with uploaded File 05: Grade 7 numeric domain curriculum.

This sprint expands directed-number reasoning beyond routine calculations by adding mistake-analysis and real-world-context tasks.

## Commits

- `7191f3f` — expanded `generator/n7-04.js` with directed-number mistake and context topics.
- `13553b5` — updated `tools/verify-chatgpt-source-fit-sync.mjs` to verify the new directed-number topics.

## Active topics added

### `N7-10` — טעויות בחיבור וחיסור מכוונים

Source basis:

- File 05: Grade 7 numeric domain curriculum.
- File 07: numeric-domain principles grades 7–8.

Student task families:

1. Identify mistakes when adding numbers with different signs.
2. Identify mistakes in subtracting a negative number.
3. Identify sign errors when adding two negative numbers.
4. Explain correction using magnitude and sign reasoning.

### `N7-11` — חיבור וחיסור מכוונים בהקשר

Source basis:

- File 05: Grade 7 numeric domain curriculum.
- File 07: numeric-domain principles grades 7–8.

Student task families:

1. Temperature changes.
2. Elevator floors below and above zero.
3. Debt / payment context.
4. Gain/loss point context.

## Verification

`tools/verify-chatgpt-source-fit-sync.mjs` now checks that `generator/n7-04.js` includes:

- `N7-10`
- `טעויות בחיבור וחיסור מכוונים ✦ מקור`
- `N7-11`
- `חיבור וחיסור מכוונים בהקשר ✦ מקור`

## Progress update

Current estimated whole-product completion: **56%**.

Reason:

- File 05 now has additional representation through mistake-analysis and contextual directed-number tasks.
- The project continues to move from isolated examples to teacher-usable families of question types.
- Verification was expanded accordingly.

## Next recommended sprint

Continue File 05 numeric coverage with:

1. Multiplication/division of directed numbers.
2. Directed-number sign rules with mistake analysis.
3. Powers with negative bases and parentheses.
4. Square-root reasoning traps and estimation.
