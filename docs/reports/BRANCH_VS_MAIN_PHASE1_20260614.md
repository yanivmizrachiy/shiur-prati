# דוח: Phase 1 קיים ב-branch אך לא ב-main — 2026-06-14

## עובדות מאומתות (git)
- ענף עבודה: `feat/source-bible-variety-dedicated-engines` · HEAD בעת הדוח.
- `origin/main` = `5b80373`. נקודת המוצא המשותפת (merge-base) = `fe27bef`.
- main ⊄ feature: **8 קומיטים על main שלא ב-feature**; **64 קומיטים על feature שלא ב-main**. הענפים **התפצלו**.
- הוכחה ישירה (`git show`):
  - `main:generator/index.html` → `#sn` = **1,5,10,15,20** · **אין `selMcqMode`**.
  - `feature:generator/index.html` → `#sn` = **1..10** · **יש `selMcqMode`**.

## מה קיים רק ב-feature (חסר ב-main)
- **Phase 1**: בורר 1–10, בורר `selMcqMode` (single/multi) + ניסוח מודפס תואם, מפתח תשובות 1..N.
- כל F1–F5 שאחרי מיזוג PR #7: provenance מדויק (F3), שאלות המשך (F4), מצב מורה +
  גלריה + QA חזותי + 5 verifiers (F5), שכבת visual-coverage, "העתק כתמונה",
  תיקון "0/0 מנועים", ארגון docs, קבצי זיכרון (PROJECT_RULES/REQUIREMENTS_STATUS/WORK_LOG/NEXT_STEPS).

## מה קיים רק ב-main (חסר ב-feature) — חשוב לשימור!
8 הקומיטים על main כוללים:
- `c9af4aa Merge PR #7` — מיזוג קודם של עבודת 50 המנועים (snapshot ישן יותר).
- `cb244bf Add mobile-first UI polish`, `c26c2b6 Add mobile sharing helper`,
  `edc988b Load mobile polish and sharing assets` — **שיפורי מובייל/שיתוף שאינם בענף.**
- `238a861 Add GitHub Pages root redirect`, `3ae3c2a Add root .nojekyll for Pages` — **הגדרות פריסה ל-Pages.**
- `7afa281`/`5b80373 ci: update live generator verification report`.
- main:index.html כנראה הוחלף ע"י קומיט ה-mobile-polish לגרסה ישנה — לכן אין בו Phase 1.

## מסקנה: GitHub Pages
Pages נפרס מ-**main**. main אינו מכיל את Phase 1 → **האתר החי אינו כולל את השיפורים**
(בורר 1–10, selMcqMode וכו'). **אין לטעון שהאתר החי עודכן** עד ש-main יכיל את השינויים
ו-Pages ייפרס מחדש.

## המלצה (לא בוצע — דורש אישור יניב; אסור merge ל-main / force push בלי אישור)
מומלץ **PR חדש מסודר** `feat/source-bible-variety-dedicated-engines → main`:
1. כיוון שהענפים התפצלו ושני הצדדים מכילים עבודה שונה ובעלת-ערך, המיזוג ידרוש
   **פתרון קונפליקטים** (במיוחד `generator/index.html`, README, docs) כך שיישמרו
   **גם** שיפורי המובייל/Pages של main **וגם** Phase 1 + F1–F5 של הענף.
2. אחרי מיזוג ל-main → לוודא ש-Pages נפרס מחדש (workflow/Actions) ולבדוק את האתר החי.
3. חלופה: reopen/עדכון של PR #7 אם הוא עדיין פתוח — אך עדיף PR נקי חדש כדי לשקף את
   64 הקומיטים החדשים בבירור.

**הענף `feat/...` הוא מקור-האמת המלא והמאומת (`verify:deep` 23/23 PASS).** main מאחור.
