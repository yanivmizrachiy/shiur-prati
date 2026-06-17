# סביבת עבודה פעילה וסנכרון

מסמך זה נועד למנוע בלבול בין עותקי עבודה מקומיים.

## הריפו הפעיל

הריפו שמחובר ל-GitHub הוא:

```powershell
C:\Users\yaniv\OneDrive\Dokumente\targilim\.repo-inspect
```

ה-remote שלו:

```text
https://github.com/yanivmizrachiy/targilim.git
```

התיקייה החיצונית:

```powershell
C:\Users\yaniv\OneDrive\Dokumente\targilim
```

היא wrapper מקומי ריק שיש בו `.git` בלי commits ובלי remote. אין לעבוד ממנו על הפרויקט.

## בדיקת סנכרון מהירה

להריץ מתוך הריפו הפעיל:

```powershell
npm run verify:sync
```

הבדיקה מאמתת:

- נמצאים בריפו עם `package.json`.
- ה-remote הוא `yanivmizrachiy/targilim`.
- הענף הוא `main`.
- אין שינויים לא מקומטים.
- `HEAD`, `origin/main`, ו-`main` ב-GitHub הם אותו hash.

## בדיקת עבודה לפני המשך פיתוח

```powershell
git fetch origin
npm run verify:sync
npm run verify:workbench
```

`verify:workbench` מריץ את בדיקות הסנכרון והבדיקות המרכזיות שאינן מייצרות דוחות מתוארכים.

## בדיקת עומק לפני מיזוג או פרסום שינוי

```powershell
npm run verify:deep
git status --short --branch
```

אם `verify:deep` יוצר או מעדכן דוחות ב-`docs/reports/`, יש לבדוק אותם, להריץ מחדש מחוללי דוחות נדרשים, ואז לקמֵט ולדחוף.

## מקור אמת להמשך עבודה

- `RULES.md` — חוקי עבודה.
- `PROJECT_STATUS.md` — מצב נוכחי.
- `NEXT_STEPS.md` — משימות המשך.
- `docs/SOURCE_BIBLE.md` — מקור→מנוע→משפחות שאלה.
- `generator/engine/source-registry.js` — רשימת 50 המנועים.
- `tools/README.md` — כלי בדיקה ותחזוקה.
