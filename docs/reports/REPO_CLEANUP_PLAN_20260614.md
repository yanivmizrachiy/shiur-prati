# תוכנית ניקוי ריפו — 2026-06-14

תוכנית בלבד. **לא נמחק שום קובץ** בלי אישור מפורש. כללי הבטיחות נשמרו:
אסור למחוק package.json / generator/book.* / tools/verify* / source-learning /
sources; אסור להכניס `_audit/` או `TARGILIM_*_AUDIT*.txt`.

## אכיפה שבוצעה (בטוח, לא הרסני)
נוסף `.gitignore` המוציא לצמיתות: `_audit/`, `TARGILIM_*_AUDIT*.txt`,
`TARGILIM_*_INTEL*.txt`, `.claude/`, `node_modules/`. אומת ב-`git check-ignore`
שהפריטים אכן מוחרגים — כך לא ייכנסו לקומיט בטעות.

## קטגוריות

### KEEP (קוד וליבה — לא לגעת)
- `generator/**` (כולל `book.*`, `style.css`, כל `engine/*.js`, `teacher-mode.js`, `gallery.html`).
- `tools/verify-*.mjs`, `tools/engine-load.mjs`, `tools/gen-*.mjs`.
- `package.json`, `docs/SOURCE_BIBLE.md`, `source-learning/**`, `sources/**`,
  `source-materials/**`, `README.md`, `PROJECT_RULES.md`, `RULES.md`.

### GENERATED (נוצר אוטומטית — לרענן, לא לערוך ביד)
- `docs/SOURCE_BIBLE.md` ← `node tools/gen-source-bible.mjs`.
- `docs/reports/QUESTION_COVERAGE_CENSUS_LATEST.md` ← מתרענן בריצות verify.
- `docs/verification/teacher-generator-gallery.html` ← `node tools/gen-teacher-gallery.mjs`.

### LOCAL_AUDIT (מקומי בלבד — לעולם לא לקומיט; כעת ב-.gitignore)
- `_audit/**` (probes, worktrees, intel — כ-10 תיקיות/קבצים).
- `TARGILIM_DEEP_AUDIT_20260613_233343.txt`, `TARGILIM_ORIGIN_MAIN_SAFE_AUDIT_20260613_233653.txt`.
- `.claude/` (launch.json לתצוגה מקדומית מקומית).

### DELETE_ONLY_AFTER_APPROVAL (מועמדים לבדיקת אדם — לא נמחקים עכשיו)
מומלץ לאדם לבדוק אם עדיין נחוצים (חלקם תיעוד היסטורי שכדאי אולי להעביר ל-`archive/`):
- `handoff-payloads/**`, `STATE/**` — אם הם snapshots ישנים של תהליך.
- `generator-spec/**`, `question-patterns/**`, `curriculum-map/**`,
  `knowledge-base/**` — אם הוחלפו ע"י `docs/SOURCE_BIBLE.md` + שכבת ה-pedagogy.
- דוחות `docs/reports/*_2026060*` ישנים שהוחלפו ע"י דוחות 20260614.
לא ננקטה כל פעולה על אלה.

## אימות לפני קומיט
`git status` נבדק לפני כל קומיט בספרינט; שום `_audit/` או `TARGILIM_*_AUDIT*`
לא נכלל באף קומיט (staging ממוקד בקבצים מפורשים בלבד), וכעת גם חסום ב-.gitignore.
