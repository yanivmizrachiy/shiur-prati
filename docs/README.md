# מפת התיעוד (docs/)

אינדקס מסודר לכל התיעוד בפרויקט. קבצים שמנועי הבדיקה (`tools/verify-*`) או
האפליקציה מסתמכים עליהם נשארים בשורש `docs/`; חומרי רקע, לוגים והערות יישום
היסטוריות מאורגנים בתת-תיקיות.

## מבנה התיקייה
| תיקייה | תוכן |
|---|---|
| `docs/` (שורש) | מסמכי-ליבה שהקוד/הבדיקות מסתמכים עליהם + מסמכי דרישות/אודיט מקושרים |
| `docs/reports/` | דוחות אימות נקודתיים (לפי תאריך), דוחות שחרור וניקוי, ומטריצות שנוצרות אוטומטית |
| `docs/source-fit/` | הערות יישום source-fit היסטוריות לפי תחום (12.06) |
| `docs/audits/` | אודיטים (ויזואלי, ריצת מחולל, PRs, ארגון ריפו) |
| `docs/planning/` | דרישות מוצר, התקדמות, בקרות מורה |
| `docs/process/` | לוגי אוטומציה, ledgers, workflow, AI handoff |
| `docs/reference/` | מודל נתונים, פריסה ל-GitHub Pages, UI מובייל, פרטיות, סטטוס PDF |
| `docs/verification/` | תצוגות HTML ו-artifacts לבדיקה ידנית/אוטומטית; ראו `docs/verification/README.md` |
| `docs/prompts/` | פרומפטים שמורים |

## מקור אמת עדכני אחרי Phase 1

- [../PROJECT_STATUS.md](../PROJECT_STATUS.md) — סטטוס מוצר וריפו עדכני אחרי מיזוגי Phase 1.
- [../REQUIREMENTS_STATUS.md](../REQUIREMENTS_STATUS.md) — מצב דרישות Phase 1, כולל מה הושלם ומה עדיין לא הושלם.
- [../NEXT_STEPS.md](../NEXT_STEPS.md) — הצעדים הבאים המאושרים/הפתוחים.
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) — תנאי שחרור, בדיקות וסעיפי בטיחות להמשך.
- [reports/FINAL_PR7_RELEASE_STATUS_20260614.md](reports/FINAL_PR7_RELEASE_STATUS_20260614.md) — דוח היסטורי חשוב של PR #7; לא מקור אמת יחיד אחרי המיזוג.
- [reports/REPO_CLEANUP_EXECUTION_20260614.md](reports/REPO_CLEANUP_EXECUTION_20260614.md) — דוח ניקוי ריפו אחרון.

## ליבה — מקור האמת (source of truth)
- [SOURCE_BIBLE.md](SOURCE_BIBLE.md) — מקור→מנוע→משפחות שאלה (נוצר מ-`gen-source-bible.mjs`).
- [SOURCE_ALIGNMENT.md](SOURCE_ALIGNMENT.md) — התאמת 10 קובצי המקור לתחומים/מנועים.
- [SOURCE_COVERAGE_MATRIX_20260612.md](SOURCE_COVERAGE_MATRIX_20260612.md) — מטריצת כיסוי מקור.
- [WORKLOG.md](WORKLOG.md) — יומן עבודה מצטבר.
- הערות source-fit לפי תחום: `docs/source-fit/` + מסמכי ה-EXPANSION בשורש
  (`SOURCE_FIT_*_EXPANSION_20260612.md`) — נשארים בשורש כי בדיקות מסתמכות עליהם.

## רשימות תיוג ושחרור
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) · [QA_CHECKLIST.md](QA_CHECKLIST.md) ·
  [EXTREME_COMPLETION_PLAN_20260612.md](EXTREME_COMPLETION_PLAN_20260612.md)

## דרישות וחזון
- [TRUE_GENERATOR_VISION_REQUIREMENTS.md](TRUE_GENERATOR_VISION_REQUIREMENTS.md)
- [planning/PRODUCT_REQUIREMENTS.md](planning/PRODUCT_REQUIREMENTS.md) ·
  [planning/TRUE_GENERATOR_TEACHER_CONTROLS_REQUIREMENTS.md](planning/TRUE_GENERATOR_TEACHER_CONTROLS_REQUIREMENTS.md) ·
  [planning/PROJECT_PROGRESS_20260612.md](planning/PROJECT_PROGRESS_20260612.md)

## דוחות אימות (docs/reports/)
דוחות נקודתיים מתוארכים (BRANDING, FALLBACK, FOLLOW_UP, TEACHER, VISUAL_COVERAGE,
COPY_TO_CANVA_WORD, VISUAL_QA_ZERO_CARDS_FIX ועוד). שני קבצים נוצרים אוטומטית:
`VISUAL_COVERAGE_MATRIX.json` ו-`QUESTION_COVERAGE_CENSUS_LATEST.md`.

דוחות חשובים:
- [reports/FINAL_PR7_RELEASE_STATUS_20260614.md](reports/FINAL_PR7_RELEASE_STATUS_20260614.md) — היסטורי/שחרור PR #7.
- [reports/REPO_CLEANUP_PLAN_20260614.md](reports/REPO_CLEANUP_PLAN_20260614.md) — תוכנית ניקוי.
- [reports/REPO_CLEANUP_EXECUTION_20260614.md](reports/REPO_CLEANUP_EXECUTION_20260614.md) — מה נוקה בפועל.

## אודיטים (docs/audits/)
[VISUAL_QUALITY_AUDIT.md](VISUAL_QUALITY_AUDIT.md) (שורש) ·
[audits/REAL_GENERATOR_RUNTIME_AUDIT.md](audits/REAL_GENERATOR_RUNTIME_AUDIT.md) ·
[audits/OPEN_PRS_DEEP_AUDIT_20260613.md](audits/OPEN_PRS_DEEP_AUDIT_20260613.md) ·
[audits/REPO_ORGANIZATION_AUDIT_2026-06-09.md](audits/REPO_ORGANIZATION_AUDIT_2026-06-09.md)

## תהליך ואוטומציה (docs/process/)
[process/GPT_WORKFLOW.md](process/GPT_WORKFLOW.md) ·
[process/AI_HANDOFF.md](process/AI_HANDOFF.md) ·
לוגי CHATGPT ו-RULES_STATUS_SYNC.

## רפרנס (docs/reference/)
[reference/DATA_MODEL.md](reference/DATA_MODEL.md) ·
[reference/DEPLOY_GITHUB_PAGES.md](reference/DEPLOY_GITHUB_PAGES.md) ·
[reference/MOBILE_UI.md](reference/MOBILE_UI.md) ·
[reference/PRIVACY.md](reference/PRIVACY.md) ·
[reference/PDF_UPLOAD_STATUS.md](reference/PDF_UPLOAD_STATUS.md)
