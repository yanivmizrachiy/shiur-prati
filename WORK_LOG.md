# WORK_LOG.md

> **יומן הפאזה (קצר).** היומן ההיסטורי המצטבר והמלא הוא **[docs/WORKLOG.md](docs/WORKLOG.md)**
> (זה שנבדק ע"י `tools/release-audit.mjs`). שני הקבצים אינם "שני מקורות אמת פעילים":
> כאן רשומות הפאזה הנוכחית; ב-`docs/WORKLOG.md` ההיסטוריה המצטברת.

יומן עבודה. רשומה אחת לכל מקטע עבודה משמעותי. החדש למעלה.

## 2026-06-17 — ניקוי generated noise ושערי verify נקיים
**ענף:** main · **מטרה:** למנוע מצב שבו `verify:deep` או כלי בדיקה משאירים קבצים modified ומבלבלים בין שינוי אמיתי לבין דוח שנוצר.

### שונה/נוסף
0. `tools/verify-readonly-verifiers.mjs` + `verify:readonly` — guard שמוודא שכלי `verify-*` הם read-only כברירת מחדל, ושכתיבת דוחות מותרת רק מאחורי `--write`.
1. `tools/verify-question-coverage-deep.mjs` — כברירת מחדל לא כותב מחדש את `QUESTION_COVERAGE_CENSUS_LATEST.md`; רענון רק עם `--write` או `TARGILIM_UPDATE_REPORTS=1`.
2. `tools/verify-visual-coverage.mjs` — כברירת מחדל לא כותב מחדש את `VISUAL_COVERAGE_MATRIX.json`; רענון רק עם `--write` או `TARGILIM_UPDATE_REPORTS=1`.
3. `tools/README.md`, `docs/README.md`, `tools/gen-visual-coverage-report.mjs` — תיעוד הרצת דוחות ידנית.
4. `PROJECT_RULES.md`, `RULES.md` — נוסף כלל: verifiers הם read-only כברירת מחדל.
5. מחוץ לריפו GitHub, ב-wrapper המקומי, נמחקו רק תיקיות generated: `node_modules/`, `tmp/` ו-`output/`.

### בדיקות
- `npm run verify:coverage` ו-`npm run verify:visual-coverage` עברו בלי לשנות `docs/reports`.

## 2026-06-17 — פיתגורס: מינוח עברי תקני
**ענף:** main · **מטרה:** להסיר ניסוח מבלבל "רגל/הרגל השנייה" משאלות פיתגורס ולמנוע חזרה שלו.

### שונה/נוסף
1. `generator/geo.js` — G7-03 legacy עבר ל"ניצב/ניצבים/הניצב השני".
2. `generator/engine/pilot-g7-03.js` — המנוע החכם, פתרונות, נכון/שגוי ואיתור טעות עברו ל"ניצב/ניצבים/הניצב החסר".
3. `generator/engine/pedagogy-registry.js` + `docs/SOURCE_BIBLE.md` — מצב מורה והפדגוגיה עודכנו לאותו מינוח.
4. `tools/verify-geometry-terminology.mjs` + `verify:geometry-language` — guard שמדגים את המנוע הישן והחכם ומונע חזרת "רגל/רגליים" לפיתגורס.
5. `generator/index.html` — cache-bust הועלה ל-`20260617d` כדי שהדפדפן והאתר יטענו את קבצי JS החדשים.

### בדיקות
- `npm run verify:deep` עבר מלא.
- בדפדפן המקומי: 25 הפקות UI של פיתגורס, 0 מופעי "רגל", ונצפו שאלות "ניצב אחד... הניצב החסר".

## 2026-06-17 — סדר ריפו וסנכרון עבודה
**ענף:** main · **מטרה:** למנוע בלבול בין עותקי עבודה ולהגדיר שער עבודה נוח.

### שונה/נוסף
1. `tools/verify-repo-sync.mjs` — בדיקה שהעותק המקומי נקי, על `main`, מחובר ל-`yanivmizrachiy/targilim`, וזהה ל-`origin/main` ול-GitHub.
2. `package.json` — נוספו `verify:sync` ו-`verify:workbench`.
3. `docs/reference/ACTIVE_WORKTREE_AND_SYNC.md` — מסמך עבודה שמבהיר שהריפו הפעיל הוא `.repo-inspect`, ומה מריצים לפני המשך פיתוח.
4. `README.md`, `docs/README.md`, `tools/README.md`, `PROJECT_RULES.md` — קישורים והוראות סנכרון.
5. `PROJECT_STATUS.md`, `RULES.md`, `REQUIREMENTS_STATUS.md`, `NEXT_STEPS.md` — עודכנו כדי להסיר בלבול אחרי PRs #46–#52 וקומיט `7db6ab4`.

### בדיקות
- להריץ לפני סגירה: `npm run verify:sync`, `npm run verify:workbench`, `git diff --check`.

## 2026-06-14 — Phase 1 (דרישות יסוד)
**ענף:** feat/source-bible-variety-dedicated-engines · **שער:** `npm run verify:deep` = 23/23 PASS.

### נבדק ונמצא תקין — לא שונה (שימור)
- אין דמו/mock/placeholder/TODO ב-generator/ (סריקה → 0).
- עיגון-מקור: 50 מנועים נעולים ל-10 המקורות, 0 fallback, קובץ 10 לא בשימוש כמקור.
- רב־ברירה: ערבוב אמיתי (התפלגות א/ב/ג/ד), אי-דליפה (`.exset .mcq-correct` ניטרלי),
  בדיוק תשובה נכונה אחת, מפתח תשובות חושף למורה בלבד.
- print-first: דף-עבודה, מפתח מוסתר, CSS הדפסה, בקרות מורה מוסתרות בהדפסה.
- KaTeX + SVG textbook-quality.

### שונה/נוסף (חסר→מומש, מינימלי)
1. `generator/index.html` — בורר `#sn` מ-{1,5,10,15,20} ל-{1,2,…,10}, ברירת מחדל 5.
2. `generator/index.html` — נוסף בורר `#selMcqMode`: "תשובה אחת נכונה" / "ייתכן יותר מאחת".
3. `generator/exercise-set.js` — שורת הנחיית רב־ברירה מודפסת לפי המצב; מפתח תשובות
   מציג את כל התשובות הנכונות (1..N); המצב נשמר ב-`__exsetCtx`.
4. `generator/style.css` — סגנון `.mcq-instruction` (מודפס, נקי).
5. `tools/verify-real-generator-runtime.mjs` — **תוקן** לאמת 1–10 ולאסור אופציה מעל 10
   (היה מאמת 15/20 — סתר את דרישת פאזה 1). זהו תיקון לדרישה הנכונה, לא החלשה.
6. קבצי זיכרון: PROJECT_RULES.md (עודכן print-first/no-demo/sources), REQUIREMENTS_STATUS.md,
   WORK_LOG.md, NEXT_STEPS.md (נוצרו).

### אומת בדפדפן (שרת סטטי, אמיתי)
- `#sn` = 1..10; N=1/3/7/10 → רונדרו בדיוק N, כולם distinct.
- הנחיית רב־ברירה: single="סמנו את התשובה הנכונה (אחת בלבד):",
  multi="ייתכן שיותר מתשובה אחת נכונה — סמנו את כל התשובות הנכונות:".
- מפתח תשובות מציג "התשובה הנכונה: ג"; הבחירה הנכונה ניטרלית בכרטיס התלמיד (אין דליפה).
- 0 שגיאות קונסול.

### בדיקות
- `npm run verify:deep` → 23/23 PASS (לאחר תיקון verify-real-generator-runtime).
