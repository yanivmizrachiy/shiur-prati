# REPO_CLEANUP_EXECUTION_20260614

מטרת פעולה זו: סדר ריפו בלבד, בלי שינוי מוצר ובלי שינוי מנועים.

## בוצע
- נמחקו שני דוחות live verification ישנים שהציגו `Status: FAIL` ועלולים להטעות:
  - `docs/verification/generator-live-latest.md`
  - `docs/verification/generator-live-latest.json`
- נוסף `docs/verification/README.md` כדי להבהיר את מדיניות תיקיית verification.

## לא בוצע
- לא נמחקו קבצי מקור PDF.
- לא נמחקו מנועים.
- לא שונה קוד מוצר ב-`generator/`.
- לא שונו verifier tools.
- לא נמחקה תמונת `generator-live-smoke.png`; מחיקת קובץ PNG דרך כלי GitHub נחסמה, ולכן הושארה ללא שינוי במקום לעקוף בכוח.

## סיבת המחיקה
הדוחות שנמחקו היו artifacts נוצרים אוטומטית של בדיקת live ישנה, לא מקור אמת. הם הציגו FAIL בגלל בעיית selector בבדיקה (`.qtext` מרובה), לא בגלל הוכחת כשל מוצר.

## בטיחות
השינוי נעשה בענף ניקוי ייעודי:
`cleanup/remove-stale-live-fail-report-20260614`

לא בוצעה דחיפה ישירה ל-main.
