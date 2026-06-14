# דוח יצירת שאלות המשך (Follow-up) — 2026-06-14

## מטרה (Step 4)
פונקציה אמיתית `E.generateFollowUpQuestion(engineId, baseMeta, mode)` המייצרת
שאלת המשך **קשורה** לשאלת הבסיס, לפי מצב פדגוגי. הוספת
`tools/verify-follow-up-generation.mjs` + `verify:followups`.

## ששת המצבים (E.FOLLOW_UP_MODES)
| mode | מה מייצר |
|---|---|
| `same_skill` | אותו נושא ואותה משפחה — מופע חדש |
| `easier` | אותו נושא, רמת קושי נמוכה בדרגה |
| `harder` | אותו נושא, רמת קושי גבוהה בדרגה |
| `same_misconception` | אותה משפחה (הנושאת את התפיסה השגויה), כ"מצא את הטעות" |
| `different_representation` | אותו נושא, **סוג שאלה שונה** מבנית מהבסיס |
| `visual_variant` | אותו נושא, מופק מחדש עד שמתקבל שרטוט/טבלה |

## מנגנון
- `E.generateOne(id, diff, qtype)` — גישה אחידה למנוע יחיד (pilot דרך
  `generate<Base>Engine`, source-fit דרך `getEngineExercise`) שמחזירה
  `{questionHTML, answerHTML, meta}` כולל provenance מדויק (F3).
- `generateFollowUpQuestion` בונה "תכנית" (diff/qtype/family/visual) למצב,
  ודוגם עד 30 הפקות, מנקד כל מועמדת (פגיעה במשפחה / סוג שונה / שרטוט קיים /
  שונה מהבסיס) ומחזיר את הטובה ביותר, עם עצירה מוקדמת בהתאמה מושלמת.
- מצב לא חוקי נופל בבטחה ל-`same_skill`.

## תוצאה (verify:followups)
| מדד | ערך |
|---|---|
| מנועים | 50 |
| מצבים | 6 |
| שאלות המשך שנוצרו | **300** (50×6), 0 ריקות |
| מצבים ממוקדי-משפחה ששמרו את המשפחה | **100 / 100** |
| `visual_variant` שהפיק שרטוט בנושאים חזותיים | **33 / 33** |

נבדק לכל מנוע: אותו נושא נשמר בכל מצב; `easier`/`harder` משנים רמה בכיוון
הנכון; `same_misconception` מפיק פריט "מצא את הטעות" באותה משפחה;
`different_representation` מפיק סוג שאלה שונה מבנית מהבסיס; אין undefined/NaN.

## בדיקות
- `verify:followups` → FOLLOW_UP_PASS.
- `verify:all` / `verify:family` / `verify:variety` / `verify:stress` → PASS.
