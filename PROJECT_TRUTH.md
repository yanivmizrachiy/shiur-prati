# PROJECT_TRUTH.md — מקור-האמת האחד של targilim

> **נוצר:** 2026-06-16 | **ענף:** `docs/critical-improvements-20260616`
> **מטרה:** תיאור מדויק של מה שקיים כרגע — לא תוכניות, לא שאיפות. כל טענה מגובה בקוד, בוורפייר, או ב-PR ממוזג.
> **כלל:** כשיש סתירה בין מסמך זה לבין הקוד + ה-verifiers, **הקוד + ה-verifiers הם האמת.** תקן מסמך זה בהתאם.

---

## 1. מה קיים ועובד — ב-`main` כרגע

| רכיב | מצב | אימות |
|---|---|---|
| מחולל תרגילים (`generator/index.html`) | ✅ פעיל | GitHub Pages live |
| 50 מנועי ENGINE פעילים | ✅ 0 fallback | `verify:source-lock` |
| עיגון ל-10 מקורות PDF בלבד | ✅ נעול | `source-schema.js` + `verify:source-lock` |
| בחירת 1–10 תרגילים | ✅ פעיל | `verify:real-generator-runtime` |
| דה-דופ (שאלות שונות זו מזו) | ✅ פעיל | `seen` Set + `verify:variety` |
| רב-ברירה (MCQ) — תשובה אחת | ✅ פעיל | אין דליפה, ערבוב אמיתי |
| רב-ברירה — multi-correct אמיתי | ✅ A7-04 בלבד | PR #28 ממוזג, `verify:multi-correct` |
| מצב מורה (Teacher Mode) | ✅ פעיל | 235 שורות `teacher-mode.js` |
| גלריית מנועים (`gallery.html`) | ✅ פעיל | `verify:gallery` |
| לוח QA ויזואלי (`visual-qa.html`) | ✅ פעיל | `verify:visual-qa` |
| צפייה בחומרי מקור (`book.html`) | ✅ פעיל | `verify:book` |
| ייצוא PNG לשאלה שלמה | ✅ פעיל | `html2canvas`, `verify:export` |
| KaTeX + SVG איכות ספר לימוד | ✅ פעיל | `verify:graphics-quality` |
| CSS הדפסה — print-first | ✅ פעיל | `verify:print-layout` |
| מצב מורה מוסתר בהדפסה | ✅ מאומת | `.teacher-only data-html2canvas-ignore` |
| שיתוף מובייל (Navigator.share) | ✅ פעיל | `mobile-share.js` |
| `verify:deep` — 23/23 PASS | ✅ ירוק | 2026-06-14; ממשיך ב-CI |
| GitHub Pages deploy | ✅ אוטומטי | `.github/workflows/` |

---

## 2. מה עבר `verify:deep` (23/23)

הוורפייר `npm run verify:deep` כולל את כל אלה ועוברם ב-`main`:

```
verify:hygiene        verify:baseline       verify:branding
verify:source-lock    verify:source-bible   verify:coverage
verify:stress         verify:variety        verify:graphics-quality
verify:visual         verify:visual-coverage verify:provenance
verify:follow-up      verify:gallery        verify:visual-qa
verify:teacher-mode   verify:teacher-controls verify:export
verify:print-layout   verify:release-docs   verify:premium-ui
verify:worksheet-polish verify:multi-correct
```

---

## 3. מה מגובה-מקור (source-backed)

- **10 מקורות PDF מאושרים:** `sources/intake/2026-06-09/` (שמות קבועים ב-`source-schema.js`)
- **50 מנועים:** כל אחד נעול למקור מפורש ב-`source-registry.js`
- **0 שאלות מ"ידע כללי":** `verify:source-lock` חוסם מנוע ללא מקור מפורש
- **מקור 10:** הקשר הוראתי בלבד — אין שאלות ישירות ממנו
- **כיתה 9:** `knowledge-base/grade-9/` קיים אך **נעול** — אין מנועים, אין שאלות
- **A8-04 (אי-שוויונות):** topic legacy בתוך `a8-03.js` — אין `A8-04-ENGINE` ב-registry, הספירה היא 50

---

## 4. מה מיושן / היסטורי (אין לסמוך עליו כהנחיה)

| מסמך | בעיה | מה נכון |
|---|---|---|
| `docs/planning/PRODUCT_REQUIREMENTS.md` | תיאורים מתקופת תכנון — לא משקפים מימוש | ראה `RULES.md` + `PROJECT_STATUS.md` |
| `docs/planning/TRUE_GENERATOR_TEACHER_CONTROLS_REQUIREMENTS.md` | טוען 4 רמות + אין worksheet; בפועל: 3 רמות + worksheet 1–10 + 4 סוגי שאלות | ראה `teacher-mode.js` + `index.html` |
| `docs/SOURCE_BIBLE.md` (לפני 2026-06-16) | שורה 8 אמרה "33 active + 17 fallback" | עודכן: "50 dedicated engines / 0 fallback" |
| `tools/gen-source-bible.mjs` (לפני תיקון) | ספרה hardcoded "17 fallback" | תוקן לחישוב דינמי מ-`E.PEDAGOGY[id].status` |

> מסמכים אלה מסומנים בחסימת אזהרה בתחילתם. הם שמורים להיסטוריה.

---

## 5. מה פתוח (Open Items) — אסור לגעת ללא אישור יניב

| פריט | מצב | הנחיה |
|---|---|---|
| Multi-correct ל-49 מנועים נוספים | PENDING — אושר בתוכנית בלבד | דורש PR נפרד + אישור יניב |
| A8-04 כ-dedicated ENGINE (engine 51) | ❌ לא למזג | PR #10 (`phase2a805`) — **אל תמזג** |
| PR #11 (`a804final`) — חיזוק A8-04 legacy | ממתין בדיקה | בדוק בפני עצמו לפני מיזוג |
| 10 קובצי PDF כפולים ב-`originals/` | ממתין אישור | PR נפרד בלבד |
| כיתה 9 — פתיחת מנועים | ❌ נעול | דורש PDFs + תכנון מלא + אישור |
| ענפים פתוחים: `claude/source-fit-coordinate-chart-v1`, `claude/source-fit-visual-expansion-v2` | ממתינים לבדיקה | לא למזג ללא verify:deep ירוק + אישור |

---

## 6. מה אסור לגעת בו (Iron Rules מ-RULES.md)

- אין עבודה ישירה על `main` — ענף + PR בלבד
- אין force push
- אין מיזוג ל-`main` ללא `verify:deep` ירוק + אישור יניב
- אל תמחק PDFs מקוריים או `sources/`
- אל תשנה `source-registry.js` ללא סיבה מוכחת
- אין מנוע 51 ללא תכנון מלא (registry + pedagogy + docs + verifiers + ספירה)
- אין להחליש verifier
- אין דמו/mock/placeholder/בדוי

---

## 7. מה חסר (Missing — לא מיושם עדיין)

| פריט | מצב | עדיפות |
|---|---|---|
| PWA: manifest.webmanifest + sw.js + icon | חסר ב-`generator/` | B1 — גבוהה |
| `verify:pwa` — וורפייר PWA חדש | חסר | B2 — גבוהה |
| פילטר תחום/כיתה ב-`gallery.html` | חסר | C4 — בינונית |
| Sticky CTA + progress indicator ב-UI | חסר | G1+G2 — בינונית |
| Multi-correct ל-49 מנועים | מוכן לפאזה 2 | NEXT_STEPS |

---

## 8. הצעד הבא המאושר

**ענף פעיל:** `docs/critical-improvements-20260616`

שינויים על ענף זה (לא committed עדיין):
1. `tools/gen-source-bible.mjs` — תוקן (חישוב דינמי במקום hardcoded "17 fallback")
2. `docs/SOURCE_BIBLE.md` — הופק מחדש (50 engines / 0 fallback)
3. `docs/planning/PRODUCT_REQUIREMENTS.md` — תויג כהיסטורי
4. `docs/planning/TRUE_GENERATOR_TEACHER_CONTROLS_REQUIREMENTS.md` — תויג עם טבלת סתירות
5. `REQUIREMENTS_STATUS.md` — multi-correct: A7-04 DONE, 49 PENDING
6. `PROJECT_TRUTH.md` — מסמך זה (חדש)

**פאזות עבודה שנותרו בענף זה (לפי סדר):**
- B1: PWA implementation
- B2: verify:pwa verifier
- C4: Gallery filter
- G1+G2: Sticky CTA + progress
- Commit + Push + PR

---

## 9. מקורות-אמת לפי נושא (עדכני)

| נושא | מקור-אמת |
|---|---|
| כללי תפעול + פעולות אסורות | `RULES.md` |
| סנפשוט מצב שוטף | `PROJECT_STATUS.md` |
| מצב דרישות פאזה 1 | `REQUIREMENTS_STATUS.md` |
| רשימת מנועים פעילים | `generator/engine/source-registry.js` |
| פדגוגיה + מטה-דאטה | `generator/engine/pedagogy-registry.js` |
| מקורות מאושרים | `sources/intake/2026-06-09/` (10 PDFs) |
| SOURCE BIBLE (תיעוד מנועים) | `docs/SOURCE_BIBLE.md` |
| שערי איכות | `package.json` scripts (`verify:deep`) |
| פערי כיסוי + מפת יעדים | `docs/reports/SOURCE_BACKED_COVERAGE_GAPS_20260614.md` |
| אינדקס תיעוד | `docs/README.md` + `tools/README.md` |
| מסמך זה | `PROJECT_TRUTH.md` |
