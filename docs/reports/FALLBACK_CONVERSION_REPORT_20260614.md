# דוח המרת Fallbacks למנועים ייעודיים — 2026-06-14

## מטרה (Step 2)
המרת 9 ה-fallbacks האחרונים למנועים ייעודיים עם ויזואלים אמיתיים, עד למצב:
ACTIVE_TOPICS=50 · FALLBACK_REMAINING=0 · STRONG=50 · NO_CLEAR_SOURCE=0.

## תוצאה
| מדד | לפני | אחרי |
|---|---|---|
| מנועי `-ENGINE` ב-source-registry | 41 | **50** |
| נושאי fallback (ללא `-ENGINE`) | 9 | **0** |
| topics ב-SOURCE_BIBLE.md | 50 | **50** (כולם dedicated/active) |
| question families | 154 | **163** |
| `fallbackEntries` (verify:source-lock) | — | **0** |

## 9 המנועים שהומרו
כולם ב-`generator/engine/source-fit-dedicated-2.js`, נטענים ב-index.html ונסרקים ע"י engine-load.mjs.

| Engine | נושא | מקור | families (תואמות ל-`fam` במנוע) | ויזואל |
|---|---|---|---|---|
| G8-05-ENGINE | זווית מרכזית וגזרה | 04 | angle_from_part · part_from_angle · compare | גזרה מחושבת (sectorSvg) |
| G8-07-ENGINE | חפיפת משולשים לפי סימונים | 04 | name_theorem · missing_datum · why | סימוני חפיפה (congruenceSvg) |
| G8-09-ENGINE | דמיון וצללים | 04 | find_height · find_ratio · why | עמוד+צל דומים (poleShadowSvg) |
| G7-06-ENGINE | שטח צורה מורכבת | 03 | subtract · decompose · perimeter | צורת L עם פירוק (compositeSvg) |
| G7-05-ENGINE | הזזות/שיקופים/סיבובים | 03 | translate · reflect · rotate | טרנספורמציה ברשת (transformSvg) |
| N7-10-ENGINE | טעויות חיבור/חיסור מכוונים | 05 | add · subtract · three_terms | ציר מספרים |
| N7-11-ENGINE | חיבור/חיסור מכוונים בהקשר | 05 | find_result · find_change · find_start | ציר מספרים |
| N7-12-ENGINE | טעויות כפל/חילוק מכוונים | 05 | multiply · divide · three_factors | — |
| N7-13-ENGINE | כללי סימנים בכפל/חילוק | 05 | product_sign · quotient_sign · three_factor_sign | — |

כל מנוע תומך open/mcq/tf/mistake × basic/standard/challenge, עם TF מאוזן,
מסיחי MCQ חכמים (correct יחיד), ו-mistake הכולל תיקון.

## families אמיתיות, לא מזויפות
ב-iteration הראשון נרשמו 1–2 families לכמה נושאים, ו-verify:variety נכשל
(דורש ≥3). **לא הוחלש הווריפייר** — במקום זאת הורחבו 6 המנועים עם families
פדגוגיות אמיתיות נוספות (למשל: היקף צורת L שאינו משתנה בחיתוך פינה;
סיבוב כאיזומטריה; מציאת שינוי/מצב התחלתי בהקשר; מכפלת שלושה גורמים שליליים).
ה-`questionFamily` במנוע תואם ל-id ב-pedagogy-registry — בסיס מדויק ל-F3.

## בדיקות
- smoke ייעודי: 1800 generations על 6 המנועים שהורחבו — 0 ריקים, 0 undefined/NaN, MCQ עם correct יחיד.
- `verify:source-lock` → 50 engine ids, 0 fallback. PASS
- `verify:source-bible` → 50 topics, 163 families, אין שימוש בקובץ 10. PASS
- `verify:stress` → 2500 generations, 0 fails. PASS
- `verify:variety` → topicsMissingVariety=0, כל הנושאים ≥3 families. PASS
- `verify:visual` → 3156 SVG, 0 failures. PASS
- `verify:all` → PASS.
