# Source Learning Note — File 06
## Uncertainty Domain Curriculum and Examples

**Source:** sources/intake/2026-06-09/06-uncertainty-domain/06_uncertainty_domain_curriculum_examples.pdf
**Pages:** 62 | **Grade:** 7–8 | **Domain:** Uncertainty

---

## Domain structure

### Grade 7
- סטטיסטיקה: גוויסה, סיווג, תדירות, ייצוגים
- קריאת נתונים בדרכים שונות
- הסתברות תיאורטית בסיסית (לפי תוכנית רשמית)

### Grade 8
- מדדי מרכז ופיזור: ממוצע, חציון, שכיח, טווח
- תדירות יחסית כשבר ואחוז
- קריאה ביקורתית של גרפים
- הסתברות בסיסית

---

## Visual representation types
- תרשים עמודות (bar chart)
- תרשים עוגה (pie chart)
- טבלת תדירות (frequency table)
- פיקטוגרמה
- ציר מספרים
- תרשים עמודות כפול

---

## Pattern U-01: Frequency table from raw data
**תבנית:**
"לפניכם ציוני הכיתה: [רשימה].
א. ארגנו בטבלת תדירות.
ב. חשבו תדירות יחסית לכל ציון."
**לוגיקה:** ספור כל ערך; תדירות יחסית = ספירה/סה״כ

---

## Pattern U-02: Bar chart from frequency table
**תבנית:**
"בנו תרשים עמודות המתאר [הקשר] בכל [קטגוריה]."
**לוגיקה:** גובה עמודה = תדירות; כל העמודות באותו רוחב

---

## Pattern U-03: Read from bar chart
**תבנית:**
"מה היה [ערך] ב[קטגוריה]?
באיזה [קטגוריה] היה [ערך] הגבוה/הנמוך ביותר?
כמה [כולל] היו בסך הכל?"

---

## Pattern U-04: Relative frequency calculation
**תבנית:**
"חשבו תדירות יחסית של כל [קטגוריה]. הביעו כשבר/עשרוני/אחוז."
**טווחים בטוחים:** סה״כ ≥ 10; שברים נקיים עדיפים

---

## Pattern U-05: Compare two groups — MISCONCEPTION TRAP
**תבנית:**
"בכיתה א׳: [n₁] תלמידים, [k₁] מתעמלים.
בכיתה ב׳: [n₂] תלמידים, [k₂] מתעמלים.
כיתה מי ספורטיבית יותר? הסבירו."
**חשוב:** כיתה א׳ — ספירה גבוהה אבל שיעור נמוך
**לוגיקה:** חובה להשוות k/n לא k

---

## Pattern U-06: Pie chart construction
**תבנית:**
"לפניכם טבלה: [3–5 קטגוריות עם אחוזים].
הציגו בתרשים עוגה."
**לוגיקה:** זווית מרכזית = אחוז × 360°; סכום = 360°

---

## Pattern U-07: Critical reading of misleading graph
**תבנית:**
"לפניכם תרשים שפורסם בעיתון. מדוע עלול להטעות?
הציעו דרך לייצג בצורה ניטרלית יותר."
**לוגיקה:** זיהוי: ציר y לא מתחיל ב-0; אפקט תלת-ממד; סדר קטגוריות

---

## Pattern U-08: Mean, median, range
**תבנית:**
"נתונים: [רשימה 8–15 ערכים].
א. חשבו ממוצע. ב. מצאו חציון. ג. חשבו טווח."
**לוגיקה:**
- ממוצע = סכום/n
- חציון = אמצע לאחר מיון (זוגי → ממוצע שניים)
- טווח = מקס − מין
**שגיאה נפוצה:** שכחה למיין לפני חציון

---

## Pattern U-09: Effect of change on measures
**סוג א׳:**
"המורה מוסיפה [k] נקודות לכל תלמיד. מה הממוצע/חציון/טווח החדש?"
**לוגיקה:** ממוצע וחציון גדלים ב-k; טווח לא משתנה

**סוג ב׳:**
"תלמיד קיבל [x] במקום [y]. כיצד ישתנה הממוצע?"
**לוגיקה:** ממוצע חדש = (ממוצע×n − y + x) / n

---

## Pattern U-10: Basic probability
**תבנית:**
"בקופסה [n₁] כדורים [צבע₁] ו-[n₂] [צבע₂]. שולפים אחד.
א. P([צבע₁])? ב. P(לא [צבע₁])?"
**לוגיקה:** P = מקרים רצויים / סה״כ; 0≤P≤1

---

## Real-world contexts used
- ציוני כיתה
- תוצאות ספורט
- סקרי בית ספר
- נתוני סביבה
- גרפים מעיתונים ומודעות

---

## Teacher-configurable parameters
| Pattern | Changeable | Fixed |
|---|---|---|
| Frequency table | data values; context | sorting principle must be valid |
| Bar chart | heights; context; bars count | same scale throughout |
| Relative frequency | group sizes | must sum to 1 |
| Compare groups | group sizes; counts | must compare relative not absolute |
| Pie chart | category percentages | must sum to 100% |
| Mean/median/range | the data list | median requires sorted order |
| Probability | counts; event | 0≤P≤1 |

---

## 2026-06-18 generator coverage addendum

Implemented as an additive runtime layer:
`generator/engine/source-fit-uncertainty-deep.js`

Verification:
`npm run verify:uncertainty-source-deep`

### PDF page patterns now represented

| PDF pages | Generator families |
|---|---|
| 3 | `source_football_bar_to_table` |
| 4–5 | `source_clubs_missing_frequency`, `source_club_missing_percent` |
| 6 | `source_phone_ten_sector_model` |
| 7 | `source_favorite_color_total_from_pie` |
| 9–10 | `source_bottle_bar_chart` |
| 13–14 | `source_medicine_misleading_3d`, `source_choose_graph_audience`, `source_representational_ethics` |
| 17–18 | `source_penguin_frequency_table`, `source_grade_raw_to_table` |
| 19–23 | `source_transport_relative_decision`, `source_free_throw_relative_success`, `source_equal_relative_target` |
| 28–34 | `source_combined_mean_groups`, `source_salary_outlier_measures`, `source_monkey_reverse_measures`, `source_flower_field_measures` |
| 35–36 | `source_satisfaction_survey_measures`, `source_satisfaction_probability` |
| 37 | `source_shell_average_constraints` |
| 40–42 | `source_smartphone_missing_graph_table`, `source_smartphone_distribution_measures` |
| 43–48 | `given_probability_count`, `weather_probability_complement`, `fairness_symmetry_probability`, `forecast_interpretation`, `source_weather_probability_table` |
| 52–55 | `source_interpolation_extrapolation`, `source_ticket_sales_extrapolation` |
| 56–58 | `source_athletics_multi_source` |
| 60–62 | `source_coffee_multi_source` |

### Engine placement

- U7-01: source frequency tables/raw data/missing frequencies.
- U7-02: probability counts, complements, symmetry/fairness, forecast interpretation.
- U7-03: relative-frequency decisions and traps.
- U7-04: bar-chart reading, table conversion, missing table from graph.
- U7-05: pie chart, missing percent, total from part, 10-sector model.
- U7-06: misleading graph and representation ethics.
- U7-08: average reasoning and survey measures.
- U8-01: measures of center/spread, outlier effects, reverse data, interpolation.
- U8-02: probability from survey/table and multi-source reasoning.
