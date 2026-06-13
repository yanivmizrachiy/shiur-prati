# דוח Provenance של משפחת שאלה (questionFamily) — 2026-06-14

## מטרה (Step 3)
לוודא ש-`meta.questionFamily` **מדויק לכל הפקה** — משקף את המשפחה שנוצרה בפועל,
ולא תמיד `families[0]`. הוספת `tools/verify-question-family-provenance.mjs` +
`verify:family`.

## מנגנון
1. כל מנוע מסמן על אובייקט התוצאה את המשפחה שבחר באותה הפקה
   (`r.questionFamily`), דרך `render(..., family)`.
2. `asExercise` מעביר אותה הלאה; במנועי dedicated.js הקוד הקצר מתורגם ל-
   `questionFamily` הקנוני שברשם דרך `FAM_CANON`.
3. `E.buildMeta(id, qtype, diff, family)` מאמת שהמשפחה רשומה לאותו נושא:
   - אם כן → `questionFamily=family`, `familyProvenance='exact'`, וה-misconception
     נלקח מאותה משפחה ספציפית.
   - אם לא סופקה משפחה → נופלים ל-`families[0]`, `familyProvenance='default'`.
4. נוסף שדה `questionFamilyId` (id המשפחה) ו-`familyProvenance` ('exact'/'default').

## תוצאה (verify:family)
| מדד | ערך |
|---|---|
| מנועים נבדקו | 50 |
| מנועים שפולטים אך ורק משפחות רשומות (correctness) | **50 / 50** |
| מנועים עם provenance מדויק לכל הפקה ('exact') | **17** |
| מנועים שנופלים למשפחה ראשית ('default') | 33 |
| הפקות שנדגמו | 14,400 |
| צמדים (engine::family) נצפו | 84 |

17 המנועים הייעודיים (dedicated.js + dedicated-2.js) פולטים provenance מדויק:
כל אחד נצפה פולט את **כל 3 המשפחות** הרשומות שלו, וה-misconception תואם למשפחה.
דוגמאות לבחירה אמיתית מתוך המנוע:
- U7-06 (תרשים מטעה): identify_misleading · propose_fair_representation · real_change
- G7-06 (שטח מורכב): subtract · decompose · perimeter
- N7-11 (הקשר): find_result · find_change · find_start
- N7-13 (סימנים): product_sign · quotient_sign · three_factor_sign

## יושרה (ללא זיוף)
33 מנועי ה-pilot וה-source-fit המוקדמים **אינם מתחזים** ל-provenance שאין להם:
הם מסומנים `familyProvenance='default'` ופולטים את המשפחה הראשית של הנושא,
שהיא משפחה רשומה חוקית (correctness עובר). התשתית (`render(...,family)` +
`buildMeta(...,family)`) מאפשרת לחווט גם אותם בהמשך ללא שינוי ארכיטקטוני.
הווריפייר מדווח את החלוקה exact/default בגלוי ואינו "מכשיל" מנוע default,
אך **כן מכשיל** מנוע שמתיימר ל-exact ולא משתנה, או שפולט משפחה שאינה רשומה
או שייכת לנושא אחר.

## בדיקות
- `verify:family` → FAMILY_PROVENANCE_PASS (50 correctness, 17 exact).
- `verify:all` → PASS. `verify:variety/stress/visual/coverage` → PASS.
