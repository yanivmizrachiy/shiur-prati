# tools/ — מנועי בדיקה וכלי תחזוקה

50 קבצים. כולם נטענים/נבדקים; אין כאן קוד מת. החלוקה:

## 1. ספריית טעינה משותפת
- **`engine-load.mjs`** — טוען את כל ערכת המנועים (DOM stub, VM) ומחזיר
  `{ E, Teacher, pilotIds, sourceFitIds, callEngine }`. כל ה-verifiers מייבאים אותו.

## 2. verifiers שמחווטים ל-`verify:deep` (32)
מורצים אוטומטית ב-`npm run verify:deep` (וב-CI). ראו `package.json` → `verify:all` / `verify:deep`.
דוגמאות: `verify-source-lock`, `verify-source-bible`, `verify-question-coverage-deep`,
`verify-all-engines-stress`, `verify-topic-question-variety`, `verify-visual-quality-deep`,
`verify-question-family-provenance`, `verify-follow-up-generation`, `verify-graphics-quality`,
`verify-visual-coverage`, `verify-teacher-advanced-mode`, `verify-teacher-gallery`,
`verify-teacher-controls`, `verify-copy-export`, `verify-print-layout`,
`verify-visual-qa-dashboard`, `verify-geometry-terminology`, `verify-repo-hygiene`, `verify-release-readiness-docs`,
`verify-baseline-protection`, `verify-branding`, `verify-real-generator-runtime` ועוד.
`verify-source-fit` כולל גם guard נגד חזרת מיפוי ישן של `A7-04/A7-05`.

## 3. מחוללי תיעוד (gen-*) — מורצים ידנית
- **`gen-source-bible.mjs`** → מרענן `docs/SOURCE_BIBLE.md` מהרישומים.
- **`gen-visual-coverage-report.mjs`** → `docs/reports/VISUAL_COVERAGE_REPORT_*.md` מה-JSON.
- **`gen-teacher-gallery.mjs`** → `docs/verification/teacher-generator-gallery.html`.

## 4. verifiers עצמאיים (לא ב-`verify:deep`) — להרצה ידנית/היסטורית
לא חלק משער האיכות; שמורים לבדיקות ממוקדות ולמעקב. **אין למחוק** (כלל בטיחות):
- `verify-geometry-diagram-quality.mjs` · `verify-math-bidi-quality.mjs`
- `verify-variety.mjs` (קודם ל-`verify-topic-question-variety.mjs`)
- `verify-worksheet-print-quality.mjs` (קודם ל-`verify-print-layout.mjs`)
- `verify-phase2-static.mjs` · `verify-phase3a-static.mjs` (בדיקות פאזה היסטוריות)

## 5. כלי תחזוקה נוספים
- **`verify-repo-sync.mjs`** — בדיקת סנכרון מקומי מול `origin/main` ומול GitHub; מורץ דרך `npm run verify:sync`.
- **`harness-engines.mjs`** — harness ידני לעמידוּת כל המנועים (`node tools/harness-engines.mjs [runs]`).
- **`release-audit.mjs`** — אודיט מצב לקראת שחרור.
- **`verify-all-termux.sh`** — הרצת הבדיקות מ-Termux/אנדרואיד.

## הרצה
```bash
npm run verify:sync        # ודא שעובדים בריפו הנכון, נקי וזהה ל-GitHub
npm run verify:workbench   # בדיקות מרכזיות נוחות לפני המשך עבודה
npm run verify:deep        # כל ה-31 + שערי העומק
node tools/<tool>.mjs       # כלי בודד
```
