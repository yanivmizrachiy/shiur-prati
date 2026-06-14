# תרגילים

Repository: `yanivmizrachiy/targilim`

מחולל תרגילי מתמטיקה בעברית לכיתות ז׳–ח׳, מבוסס חומרי מקור אמיתיים, עם מנועים ייעודיים, גרפיקה, מצב מורה, גלריית מנועים, ודף QA חזותי.

## מצב נוכחי

- 50 מנועי `*-ENGINE` פעילים.
- 0 נושאי fallback.
- כל מנוע ממופה למקור, כיתה, תחום, מיומנות ומשפחות שאלה.
- כל מנוע נבדק דרך verifiers ולא דרך דמו.
- `verify:deep` הוא שער האיכות הראשי.
- GitHub Actions מריץ את `verify:deep` אוטומטית.
- PR #7 מחזיק את שכבת השיפור הנוכחית לפני מיזוג ל־`main`.

## כניסה מהירה

- מחולל: `generator/index.html`
- גלריית מנועים: `generator/gallery.html`
- QA חזותי: `generator/visual-qa.html`
- ספר מקורות דיגיטלי: `generator/book.html`
- מקור אמת תוכני: `docs/SOURCE_BIBLE.md`
- צ׳ק־ליסט שחרור: `docs/RELEASE_CHECKLIST.md`

## הרצת בדיקות

```bash
npm install
npm run verify:deep
```

בדיקות מרכזיות:

- `verify:source-lock` — כל מנוע נעול למקור תקף.
- `verify:source-bible` — מיפוי נושאים ומשפחות שאלות.
- `verify:variety` — גיוון סוגי שאלות ומשפחות.
- `verify:visual` — תקינות SVG/גרפיקה.
- `verify:family` — provenance מדויק של משפחת שאלה.
- `verify:followups` — שאלות המשך.
- `verify:teacher` — מצב מורה מתקדם.
- `verify:gallery` — גלריית 50 מנועים.
- `verify:visual-qa` — דף QA חזותי לכל המנועים.
- `verify:hygiene` — מניעת הכנסת קבצי audit/editor מקומיים.
- `verify:release-docs` — מניעת סטייה בין מצב המוצר למסמכי השחרור.

## כללי בטיחות

- לא ממזגים ל־`main` בלי אישור מפורש.
- לא מחלישים verifier כדי לעבור בדיקה.
- לא מכניסים `_audit/`, `.claude/`, `TARGILIM_*_AUDIT*.txt`, `TARGILIM_*_INTEL*.txt` או `node_modules/`.
- לא משתמשים בקובץ מקור 10 כמקור ישיר לשאלה; הוא משמש לתכנון רצף/הוראה בלבד.
- כל ממשק המשתמש והפלט לתלמיד בעברית ו־RTL.
- הקרדיט הגלוי נשאר: `יניב רז`.

## סטטוס מוצר

המנועים עצמם חזקים ומכוסים. השלב הבא הוא איכות מוצר: QA חזותי אנושי, בדיקת הדפסה A4 בפועל, ודיוק חוויית מורה לפני החלטת merge.
