# מפת אמת לריפו (Repo Truth Map) — 2026-06-14

מסמך-על שמכוון כל עובד (אדם או AI) למצב האמיתי של הריפו. נוצר ב-PR תיעוד בלבד
(`chore/repo-truth-map-and-rules-cleanup`). אין בו שינויי קוד מוצר.

## 1. מה המוצר האמיתי
מחולל דפי-עבודה במתמטיקה בעברית RTL. המורה מפיק שאלות → מעתיק/מדפיס → התלמיד פותר
על נייר. **Print-first, לא מטלה מקוונת.** copy/export, מצב מורה, גלריה, QA חזותי.

## 2. Scope פעיל
**כיתות ז׳–ח׳ בלבד.** כיתה ט׳ **מחוץ לתחום / נעולה** עד שיהיו מקורות ודוגמאות אמיתיים.

## 3. 10 קבצי המקור
`01` אלגברה ז׳ · `02` אלגברה ח׳ · `03` גאומטריה פרה-דדוקטיבית ז׳ · `04` גאומטריה ח׳ ·
`05` מספרי ז׳ · `06` אי-ודאות (דוגמאות) · `07` עקרונות מספרי ז׳–ח׳ · `08` עקרונות אלגברה ז׳–ח׳ ·
`09` עקרונות גאומטריה ז׳–ח׳ · `10` רצף הוראה ח׳ 2026-2027.

## 4. איפה המקורות בפועל
- PDF מקור: `sources/intake/2026-06-09/originals/*.pdf` (10) + עותק בתיקיות הנושא `sources/intake/2026-06-09/NN-name/`.
- תמלולי למידה: `source-learning/2026-06-09/*.learning.md` (10).
- מניפסט מקור-אמת: `sources/intake/2026-06-09/MANIFEST.md`.

## 5. קובץ 10
**תכנון רצף הוראה בלבד — לעולם לא מקור ישיר לשאלה.** מאומת ע"י `verify:source-lock`.

## 6. מבנה הריפו
- `generator/` — אפליקציה סטטית (`index.html`, `gallery.html`, `visual-qa.html`, `book.html`, `a8-03.js`, `mobile-*`, `style.css`).
- `generator/engine/` — schema, `source-registry.js`, `pedagogy-registry.js`, `pattern-engine.js`, pilots, source-fit, follow-up.
- `tools/` — `verify-*.mjs` (שער `verify:deep`), `gen-*`, `engine-load.mjs`. ראו `tools/README.md`.
- `docs/` — תיעוד; אינדקס ב-`docs/README.md` (תתי-תיקיות: reports, source-fit, process, reference, planning, audits, verification).
- `sources/`, `source-learning/`, `source-materials/` — המקורות.
- `curriculum-map/`, `question-patterns/`, `knowledge-base/` — רקע תכני.

## 7. מסמכי SOURCE OF TRUTH (עדכניים)
- `docs/SOURCE_BIBLE.md` (נוצר מ-registries) · `generator/engine/source-registry.js` ·
  `PROJECT_STATUS.md` · `REQUIREMENTS_STATUS.md` · `RULES.md` (באנר 2026-06-14) ·
  `PROJECT_RULES.md` · `package.json` (`verify:deep`) · מסמך זה.

## 8. מסמכים היסטוריים (לשמר, לא מקור-אמת פעיל)
`docs/SOURCE_ALIGNMENT.md` (מפת REMAP, כותרת "25") · `docs/TRUE_GENERATOR_VISION_REQUIREMENTS.md` ·
`docs/CHATGPT_AUTO_IMPROVEMENT_PLAN.md` · `docs/reports/FINAL_PR7_RELEASE_STATUS_20260614.md` ·
`docs/WORKLOG.md` (יומן מצטבר) · דוחות source-fit ב-`docs/source-fit/`.

## 9. מסמכים שהיו מיושנים ומטעים — תוקנו בבאנר ב-PR זה
- `RULES.md` — אמר "25 engines"; נוסף באנר "50 engine topics / 0 fallback".
- `docs/reference/PDF_UPLOAD_STATUS.md` — אמר "PDFs not yet in GitHub"; תוקן: הם קיימים.
- `docs/SOURCE_ALIGNMENT.md` / `TRUE_GENERATOR_VISION_REQUIREMENTS.md` / `CHATGPT_AUTO_IMPROVEMENT_PLAN.md` — באנר היסטורי/עדכון ספירה.
- `FINAL_PR7_RELEASE_STATUS_20260614.md` — באנר "Historical".
- `NEXT_STEPS.md` — תוקן בלבול: A8-04 הוא topic legacy קיים (לא "אין מנוע").

## 10. קבצים כפולים
- **10 PDF כפולים**: `sources/intake/2026-06-09/originals/*.pdf` זהים (SHA) לעותקים בתיקיות הנושא `NN-name/`. מועמדים למחיקה (סעיף 16).
- שני יומנים: `WORK_LOG.md` (פאזה) ו-`docs/WORKLOG.md` (היסטורי, נבדק ע"י `release-audit.mjs`) — הובהר ב-PR זה.

## 11. דוחות חופפים
`docs/reports/FALLBACK_CONVERSION_REPORT_20260614.md` ו-`FALLBACK_TO_ENGINE_CONVERSION_REPORT_20260614.md`
(אותו נושא; מקושרים מ-3 דוחות אחרים). **לא נמחקו.** להשאיר כהיסטוריה או לאחד ב-PR נפרד.

## 12. PRים פתוחים
- **PR #11** (`a804final`) — "Strengthen A8-04 legacy inequalities coverage". משנה **רק `generator/a8-03.js`** (legacy A8-04, מ-4 ל-10 מקרים). **מועמד לשמירה** אחרי בדיקה + `verify:deep` ירוק.
- **PR #10** (`phase2a805`) — "Strengthen A8 inequalities coverage". משנה `a8-03.js` **+ מוסיף `['A8-04-ENGINE', ...]` ל-`source-registry.js`** (= engine 51) + note. **experimental / superseded-candidate — לא למזג** ללא תכנון מלא. סותר את כלל "אין engine 51 ללא תכנון" ואת איסור כפילות A8-04.
- (PR #7 כבר מוזג ל-main ב-`c9af4aa`. PRים ישנים #2/#5/#6 — מחוץ לתחום מסמך זה.)

## 13. מה כבר שופר וחובה לשמור
50 engine topics / 0 fallback · provenance מדויק (F3) · שאלות המשך (F4) · מצב מורה+גלריה+QA חזותי+visual-coverage (F5) ·
copy-as-image · בורר 1–10 · `selMcqMode` single/multi + מפתח 1..N · תיקון TF של U7-08 · ארגון docs · `verify:deep` 23/23.

## 14. מה עוד לא הושלם — אסור לטעון שהושלם
- **תוכן multi-correct אמיתי**: קיימים בורר+ניסוח+מפתח 1..N, אך **אף מנוע לא מפיק >1 נכון** (נדגם: 2000 הפקות → 0). PENDING.
- **A8-04 כ-dedicated ENGINE**: לא קיים ובמכוון; דורש תכנון מלא.
- **מיזוג Phase 1 ל-main**: חסום על הרשאת PR של הטוקן; main עדיין ישן והאתר החי לא עודכן.

## 15. מה אסור בלי אישור יניב
מחיקת `originals/` PDF · איחוד/מחיקת דוחות · מיזוג ל-main · מיזוג PR #10/#11 · הוספת engine 51 / A8-04-ENGINE · כיתה ט׳ · multi-correct content · ניקוי PDF.

## 16. תכנית שיפורים לפי עדיפות
1. **למזג Phase 1 ל-main** דרך PR (האתר החי תלוי בזה) — דורש טוקן עם הרשאת PR.
2. **לבדוק ולמזג PR #11** (legacy A8-04, נמוך-סיכון) אחרי שהמסמכים מסודרים.
3. **להכריע על PR #10** (לדחות/לשדרג לתכנית engine מלאה — לא PR קטן).
4. **PR נפרד**: מחיקת `originals/` הכפול אחרי הוכחת אי-תלות.
5. **PR נפרד**: איחוד שני דוחות ה-fallback (אופציונלי).
6. **פאזה 2 תוכנית**: multi-correct אמיתי + העמקות מעוגנות-מקור (U-09, G8-06).
