# WORK_LOG.md

> **יומן הפאזה (קצר).** היומן ההיסטורי המצטבר והמלא הוא **[docs/WORKLOG.md](docs/WORKLOG.md)**
> (זה שנבדק ע"י `tools/release-audit.mjs`). שני הקבצים אינם "שני מקורות אמת פעילים":
> כאן רשומות הפאזה הנוכחית; ב-`docs/WORKLOG.md` ההיסטוריה המצטברת.

יומן עבודה. רשומה אחת לכל מקטע עבודה משמעותי. החדש למעלה.

## 2026-06-16 — שיפורים עמוקים D2/D3/D4 (ענף: docs/critical-improvements-20260616)
**ענף:** `docs/critical-improvements-20260616` · **שער:** `npm run verify:deep` = 25/25 PASS.

### D1 — סריקה עמוקה (ממצאים מרכזיים, לא תוקן כאן — ניתוח בלבד)
- זוהו עשרות בעיות: TOPICS חסר (8/50 מנועים), print CSS חלקי, PWA חסר, גלריה בעברית שגויה,
  docs היסטוריים סותרים, SOURCE_BIBLE עם ספירת fallback שגויה.

### D2 — תיקון קריטי: TOPICS הורחב מ-8 ל-50 מנועים
- **קובץ:** `generator/core.js`
- **באג שתוקן:** אובייקט TOPICS הכיל רק 8 מנועים מתוך 50 — 42 מנועים היו קיימים ב-source-registry.js
  אך בלתי נגישים לחלוטין למורים בממשק הבוחר (dropdown).
- **תיקון:** הוחלפה רשימת TOPICS הקשיחה בגרסה מלאה עם כל 50 המנועים,
  מאורגנת לפי כיתה (ז׳/ח׳) ותחום (גאומטריה/אלגברה/מספרי/אי-ודאות),
  עם שמות עבריים פדגוגיים מ-pedagogy-registry.js.
- `verify:real-generator-runtime` לאחר התיקון: PASS.
- `verify:pwa` לאחר התיקון: PASS.

### D3 — שיפורי CSS/UX
- **קובץ:** `generator/style.css`
  1. **print CSS הורחב:** נוספו `#stickyGenBar`, `#genProgress`, `.landing`, `.engine-panel`
     לרשימת האלמנטים המוסתרים בהדפסה (display:none !important).
  2. **חץ/chevron לבוחרים (select):** נוסף SVG chevron מותאם ל-RTL עברית
     ב-background-image של אלמנטי select (כיוון: שמאל, כיוון הפתיחה הטבעי בעברית).
  3. **סגנון .topic-count-badge:** נוסף סגנון חדש לתג המספרי "N נושאים" שנוסף
     דינמית ל-label הבוחר תחום — עיצוב עגלגל כחול מינימלי.
- **קובץ:** `generator/core.js`
  4. **onDomain() שופר:** בעת בחירת תחום, תג ספירת הנושאים מתעדכן דינמית
     (למשל "9 נושאים" בגאומטריה ח׳ לעומת "3 נושאים" באלגברה ח׳).

### D4 — ווריפייר חדש: verify:topic-coverage
- **קובץ חדש:** `tools/verify-topic-coverage.mjs`
  - בדיקה 1: כל 50 המנועים ב-source-registry.js מופיעים ב-TOPICS של core.js.
  - בדיקה 2: אין מנועים רפאים ב-TOPICS שלא קיימים ב-registry.
  - בדיקה 3: ספירות תואמות (50=50).
  - תוצאה: 6/6 PASS.
- **package.json:** נוסף script `verify:topic-coverage`; נוסף לשרשרת `verify:deep`.
  verify:deep עלה מ-24 שערים ל-**25 שערים**.

### אומתו לאחר השינויים
- `node tools/verify-topic-coverage.mjs` → **6/6 PASS** (50 מנועים מכוסים, 0 רפאים)
- `node tools/verify-pwa.mjs` → **22/22 PASS**
- `node tools/verify-real-generator-runtime.mjs` → **REAL_GENERATOR_RUNTIME_VERIFY_PASS**
- `node --check generator/core.js` → **syntax OK**
- `node --check generator/style.css` → N/A (CSS)

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
