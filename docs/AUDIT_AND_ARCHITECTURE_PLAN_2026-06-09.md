# Repository Audit and Architecture Plan
## targilim — תרגילים
**תאריך:** 2026-06-09

---

## חלק א׳ — Audit של הריפו

### קבצי מקור PDF — מאומתים
| # | קובץ | מצב |
|---|---|---|
| 01 | 01_grade-7_algebra_curriculum.pdf | ✅ |
| 02 | 02_grade-8_algebra_curriculum.pdf | ✅ |
| 03 | 03_grade-7_pre_deductive_geometry_curriculum.pdf | ✅ |
| 04 | 04_grade-8_geometry_curriculum.pdf | ✅ |
| 05 | 05_grade-7_numeric_domain_curriculum.pdf | ✅ |
| 06 | 06_uncertainty_domain_curriculum_examples.pdf | ✅ |
| 07 | 07_numeric_domain_principles_grades-7-8.pdf | ✅ |
| 08 | 08_algebra_domain_principles_grades-7-8.pdf | ✅ |
| 09 | 09_geometry_domain_principles_grades-7-8.pdf | ✅ |
| 10 | 10_grade-8_teaching_sequence_2026-2027.pdf | ✅ |

### קבצי תיעוד רשמי
| קובץ | מצב |
|---|---|
| תוכנית לימודים רשמית משרד החינוך ז-ט | ✅ נקרא ב-2026-06-09 |
| sources/official/SOURCE_REFERENCE.md | ✅ נוצר |

### קבצי Legacy — מועברים לארכיב
קבצים אלה קיימים בריפו תחת `archive/legacy-shiur-prati/2026-06-09/`:
- index.html, app.js, styles.css, sw.js, manifest.webmanifest
- assistant-sync.html, auto-save.html, auto-update.html
- payment-save.html, planned-save.html, today.html, quick-add.js
- assets/icon.svg, data/lesson-appointments.json

---

## חלק ב׳ — ממצאי הלמידה המעמיקה

### כיסוי תוכן לפי מקור
| מקור | כיתה | דומיין | סטטוס |
|---|---|---|---|
| קבצים 01–10 | ז׳–ח׳ | כל הדומיינים | ✅ נלמד |
| תוכנית רשמית | ז׳–ט׳ | כל הדומיינים | ✅ נלמד |
| כיתה ט׳ | ט׳ | אלגברה + גאומטריה | ✅ מוגדר — דוגמאות חסרות |

### תיקונים קריטיים מהתוכנית הרשמית
- פונקציות: מוקדמות לכיתה ז׳ (לא ח׳)
- הסתברות: גם בכיתה ז׳
- ניידות משולשים: הוקדמה לח׳ (הייתה ט׳)
- הוכחות פורמליות: ט׳ בלבד
- חוקי חזקות אלגבריים: ט׳ בלבד

---

## חלק ג׳ — ארכיטקטורת הריפו

```text
targilim/
├── RULES.md                          # לא לגעת
├── README.md
├── PROJECT_STATUS.md
├── sources/
│   ├── intake/2026-06-09/            # 10 PDFs — לא לגעת
│   └── official/SOURCE_REFERENCE.md
├── source-learning/2026-06-09/       # 11 learning notes
├── curriculum-map/CURRICULUM_MAP.md
├── question-patterns/PATTERN_INDEX.md
├── knowledge-base/
│   ├── grade-7/                      # 4 JSON files
│   ├── grade-8/                      # 4 JSON files
│   └── grade-9/                      # 2 JSON files
├── generator/
│   └── index.html                    # Hebrew RTL generator
├── archive/legacy-shiur-prati/2026-06-09/
└── .github/workflows/deploy-pages.yml
```

---

## חלק ד׳ — החלטות Toolchain

### מתמטיקה: KaTeX
**נבחר על פני MathJax מהסיבות:**
- rendering סינכרוני → html2canvas עובד מיד
- מהיר פי 10 מ-MathJax
- RTL עברי עובד עם `dir="rtl"` על container
- CDN: `cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/`

### גרפיקה: SVG ידני
- שליטה מלאה; אין תלות בספריות חיצוניות
- מספיק למשולשים, עיגולים, צירים

### Copy-as-image: html2canvas
- `html2canvas(el, {scale:2, backgroundColor:'#fff'})`
- Fallback: PNG download אם clipboard חסום
- CDN: `cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/`

### Hosting: GitHub Pages
- מ-`generator/` folder
- workflow: `.github/workflows/deploy-pages.yml`
- URL: `https://yanivmizrachiy.github.io/targilim/`

### Analytics: דחוי
- ממשק מוגדר בקוד (`Analytics` object)
- אין tracking אמיתי עד MVP
- Plausible.io — אפשרות לעתיד ($9/חודש)

---

## חלק ה׳ — מצב Generator

### פרוסות פעילות
| תבנית | נושא | מצב |
|---|---|---|
| G7-03 | פיתגורס — מציאת צלע | ✅ עובד |

### פרוסות הבאות לפי עדיפות
| עדיפות | תבנית | נושא |
|---|---|---|
| 1 | G7-01 | זווית חסרה במשולש |
| 2 | G7-02 | שטח צורה שטוחה |
| 3 | N7-06 | חזקות (−a)ⁿ לעומת −aⁿ |
| 4 | A7-03 | משוואה מדרגה ראשונה |
| 5 | N8-04 | אחוזים סטטיים |

### כיתה ט׳
**מצב:** מוגדר ממקור רשמי — generator דורש דוגמאות שאלות ממקור לפני בנייה.

---

## חלק ו׳ — שאלות שנענו

| שאלה | החלטה |
|---|---|
| MathJax vs KaTeX | KaTeX |
| ניקוי legacy files | ארכיב (לא מחיקה) |
| Analytics | דחוי לאחר MVP |
| כיתה ט׳ | מוגדרת — ממתינה לדוגמאות מקור |
| Hosting | GitHub Pages מ-generator/ |
