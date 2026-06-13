# SOURCE BIBLE — what the generator is allowed to create, and why

_Auto-generated from `generator/engine/pedagogy-registry.js` by `tools/gen-source-bible.mjs`._
_Do not edit by hand; edit the registry and regenerate._

Sources 01–06 = direct question/example sources. 07–09 = principles, skills, misconceptions, visual requirements. **File 10 is never a question source.**

- Topics: 50 (33 active engines + 17 fallback)
- Question families: 139

## Numeric

### N7-01-ENGINE — מערכת צירים — רביע ראשון

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** מיקום וקריאת נקודות, אורך קטע, שטח על הרשת
- **Learning goal:** התלמיד יסמן ויקרא נקודות ברביע הראשון, ימצא אורך קטע מקביל לציר ושטח מלבן על הרשת
- **Teacher purpose:** ביסוס הבנת זוג סדור (x,y) והקשר בין קואורדינטות לצורה
- **Common misconceptions:** החלפת x ב-y; ספירת נקודות במקום מרווחים; בלבול בין היקף לשטח
- **Follow-up ideas:** השלימו צורה חסרה; מצאו קואורדינטה מתוך שטח נתון; בנו מלבן בעל שטח מבוקש
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `plot_and_shape` | open/mcq/tf/mistake | שרטטו A(4,1) B(2,3) C(4,5) D(6,3), חברו וקבעו את הצורה | זיהוי צורה לפי מראה ולא לפי תכונות | מעוין, מלבן, ריבוע, משולש ישר-זווית |
  | `read_coordinate` | open/mcq/tf/mistake | מהם שיעורי הנקודה המסומנת? | קריאת y לפני x | נקודה אחת, מספר נקודות |
  | `segment_length_axis_parallel` | open/mcq/tf/mistake | חשבו אורך קטע AB המקביל לציר | ספירת נקודות במקום הפרש שיעורים | קטע אופקי, קטע אנכי |
  | `rectangle_area_on_grid` | open/mcq/tf/mistake | חשבו שטח מלבן על הרשת / מצאו קודקוד חסר | חישוב היקף במקום שטח | חישוב שטח, קודקוד חסר, שטח→קואורדינטה |

### N7-03-ENGINE — מספרים שליליים על ציר המספרים

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** סדר, השוואה, ערך מוחלט ומספר נגדי
- **Learning goal:** התלמיד ישווה ויסדר מספרים מכוונים ויבין ערך מוחלט ומספר נגדי
- **Teacher purpose:** הרחבת עולם המספרים מהחיוביים אל המכוונים
- **Common misconceptions:** מספר שלילי "גדול" כי ספרתו גדולה; ערך מוחלט יכול להיות שלילי
- **Follow-up ideas:** סדרו רשימה מעורבת; מצאו מספר בין שני נתונים; סמנו נגדי על הציר
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `order_negatives` | open/mcq/tf/mistake | סדרו מהקטן לגדול: −5, 3, −1, 0 | סידור לפי מרחק מאפס | 3–5 ערכים |
  | `compare_negatives` | open/mcq/tf/mistake | איזה גדול: −4 או −2? | בחירת המספר עם הספרה הגדולה | שני שליליים, שלילי מול חיובי |
  | `absolute_and_opposite` | open/mcq/tf/mistake | חשבו |−7| ומצאו את הנגדי של −5 | ערך מוחלט שלילי | ערך מוחלט, מספר נגדי |
  | `place_on_number_line` | open/mcq/tf/mistake | בין אילו שלמים נמצא −3.5? | התעלמות מהסימן במיקום | שברים שליליים |

### N7-04-ENGINE — חיבור וחיסור מספרים מכוונים

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** חיבור/חיסור מכוונים, אומדן סימן
- **Learning goal:** התלמיד יחבר ויחסר מספרים מכוונים ויאמוד סימן תוצאה
- **Teacher purpose:** שליטה בכללי הסימנים בחיבור וחיסור
- **Common misconceptions:** הסימן נקבע לפי הספרה הגדולה ולא לפי המרחק מאפס; חיסור שלילי כחיסור רגיל
- **Follow-up ideas:** השלימו מחובר חסר; סמנו ללא חישוב מי שלילי; בנו תרגיל עם תוצאה נתונה
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `add_same_sign` | open/mcq/tf/mistake | (−8)+(−5) | חיבור מרחקים אך איבוד הסימן | שני שליליים |
  | `add_diff_sign` | open/mcq/tf/mistake | (−7)+12 | סימן לפי הספרה הגדולה | שלילי+חיובי |
  | `subtract_negative` | open/mcq/tf/mistake | 5−(−3) | חיסור שלילי כחיסור | חיסור שלילי |
  | `missing_addend` | open/mcq/tf/mistake | (−6)+□=−2 | חיבור במקום חיסור למציאת חסר | מחובר חסר |
  | `estimate_sign` | open/mcq/tf/mistake | בלי לחשב — לאילו תוצאה שלילית? | אמדן לפי גודל ספרות | רשימת תרגילים |

### N7-05-ENGINE — כפל וחילוק מספרים מכוונים

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** כללי סימנים בכפל וחילוק
- **Learning goal:** התלמיד יכפיל ויחלק מספרים מכוונים לפי כללי הסימנים
- **Teacher purpose:** ביסוס "סימנים זהים → חיובי, שונים → שלילי"
- **Common misconceptions:** החלת כלל החיבור על כפל; טעות סימן בגורם חסר
- **Follow-up ideas:** מצאו גורם חסר; שרשרת כפל מכוון; הסבירו את כלל הסימן
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `directed_multiplication` | open/mcq/tf/mistake | (−5)·8 | סימן שגוי בכפל | ≥1 גורם שלילי |
  | `directed_division` | open/mcq/tf/mistake | (−24)÷6 | סימן שגוי בחילוק | מנה שלמה |
  | `missing_factor` | open/mcq/tf/mistake | (−4)·□=20 | סימן שגוי בגורם החסר | גורם חסר |

### N7-06-ENGINE — חזקות: (−a)ⁿ לעומת −aⁿ

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** סדר פעולות, סוגריים וסימני מינוס בחזקה
- **Learning goal:** התלמיד יבחין על מה פועלת החזקה — על הבסיס או רק על המספר
- **Teacher purpose:** בדיקת הבנת סדר פעולות וסימני מינוס
- **Common misconceptions:** חישוב −3² כאילו הוא (−3)²
- **Follow-up ideas:** השוו שני ביטויים דומים; מצאו טעות בפתרון תלמיד; כתבו ביטוי עם תוצאה הפוכה
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `parentheses_even_exponent` | open/mcq/tf/mistake | (−3)² | מינוס מחוץ לסוגריים | מעריך זוגי |
  | `parentheses_odd_exponent` | open/mcq/tf/mistake | (−2)³ | בלבול סימן במעריך אי-זוגי | מעריך אי-זוגי |
  | `compare_both` | open/mcq/tf/mistake | השוו (−3)² ל-−3² | הנחה ששני הביטויים שווים תמיד | השוואת שני ביטויים |

### N7-07-ENGINE — שורש ריבועי

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** שורש מדויק, אומדן, צלע מתוך שטח
- **Learning goal:** התלמיד יחשב שורש מדויק, יאמוד שורש לא שלם וימצא צלע ריבוע
- **Teacher purpose:** ביסוס הקשר בין ריבוע לשורש
- **Common misconceptions:** √(a+b)=√a+√b; שורש = חצי המספר
- **Follow-up ideas:** אמדו שורש בין שני שלמים; מצאו צלע מתוך שטח; הפריכו פיצול שורש של סכום
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `exact_root` | open/mcq/tf/mistake | √144 | שורש כחצי המספר | ריבועים עד 144 |
  | `estimate_between` | open/mcq/tf/mistake | בין אילו שלמים √50? | בחירת השלם הקרוב במקום הקטן | לא ריבוע מדויק |
  | `side_from_area` | open/mcq/tf/mistake | שטח ריבוע 64 — מהי הצלע? | חלוקת השטח ב-2 | שטח ריבוע |
  | `sum_under_root_trap` | open/mcq/tf/mistake | √(9+16) | פיצול שורש של סכום | סכום מתחת לשורש |

### N7-08 — ציר מספרים והשוואת שליליים _(fallback)_

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** השוואה וסדר על הציר
- **Learning goal:** התלמיד ישווה שליליים על הציר
- **Teacher purpose:** ביסוס סדר על ציר המספרים
- **Common misconceptions:** מספר שלילי גדול כי ספרתו גדולה
- **Follow-up ideas:** סדרו רשימה; מצאו בין שניים
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `number_line_comparison` | open/mcq/tf/mistake | סדרו/השוו שליליים על הציר | ספרה גדולה=מספר גדול | השוואה |

### N7-09 — מספר נגדי וערך מוחלט בהקשר _(fallback)_

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** נגדי וערך מוחלט
- **Learning goal:** התלמיד יבין נגדי וערך מוחלט בהקשר
- **Teacher purpose:** ביסוס מושג הנגדי והערך המוחלט
- **Common misconceptions:** ערך מוחלט שלילי
- **Follow-up ideas:** מצאו נגדי; חשבו ערך מוחלט
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `opposite_absolute_context` | open/mcq/tf/mistake | נגדי/ערך מוחלט בהקשר מציאותי | ערך מוחלט שלילי | הקשר |

### N7-10 — טעויות בחיבור וחיסור מכוונים _(fallback)_

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** ניתוח טעות סימן
- **Learning goal:** התלמיד יאתר טעות בחיבור/חיסור מכוונים
- **Teacher purpose:** חידוד טעויות סימן
- **Common misconceptions:** סימן לפי ספרה גדולה
- **Follow-up ideas:** מצאו טעות; תקנו פתרון
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `directed_add_sub_mistake` | open/mcq/tf/mistake | מצאו טעות בחיבור/חיסור מכוון | סימן שגוי | ניתוח טעות |

### N7-11 — חיבור וחיסור מכוונים בהקשר _(fallback)_

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** יישום בהקשר
- **Learning goal:** התלמיד ייישם חיבור/חיסור מכוונים בהקשר
- **Teacher purpose:** חיבור מכוונים למצב מציאותי
- **Common misconceptions:** התעלמות מכיוון
- **Follow-up ideas:** טמפרטורה; גובה/עומק
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `directed_add_sub_context` | open/mcq/tf/mistake | בעיית הקשר בחיבור/חיסור מכוון | התעלמות מכיוון | הקשר |

### N7-12 — טעויות בכפל וחילוק מכוונים _(fallback)_

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** ניתוח טעות סימן
- **Learning goal:** התלמיד יאתר טעות בכפל/חילוק מכוונים
- **Teacher purpose:** חידוד כללי הסימנים
- **Common misconceptions:** החלת כלל החיבור על כפל
- **Follow-up ideas:** מצאו טעות; תקנו
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `directed_mul_div_mistake` | open/mcq/tf/mistake | מצאו טעות בכפל/חילוק מכוון | כלל סימן שגוי | ניתוח טעות |

### N7-13 — כללי סימנים בכפל וחילוק _(fallback)_

- **Source PDF:** 05_grade-7_numeric_domain_curriculum.pdf · grade 7
- **Skill:** כללי סימנים
- **Learning goal:** התלמיד ייישם כללי סימנים בכפל וחילוק
- **Teacher purpose:** ביסוס כללי הסימנים
- **Common misconceptions:** בלבול עם כללי החיבור
- **Follow-up ideas:** כפל; חילוק
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `directed_mul_div_rules` | open/mcq/tf/mistake | יישום כללי סימנים | בלבול כללים | כפל/חילוק |

### N8-01-ENGINE — יחס

- **Source PDF:** 07_numeric_domain_principles_grades-7-8.pdf · grade 8
- **Skill:** צמצום יחס, חלוקה לפי יחס, השלמת יחס
- **Learning goal:** התלמיד יצמצם יחס, יחלק כמות לפי יחס וישלים יחס שקול
- **Teacher purpose:** ביסוס מושג היחס כיחס בין כמויות
- **Common misconceptions:** צמצום צד אחד בלבד; חיבור במקום שמירת יחס
- **Follow-up ideas:** חלקו פרס לפי יחס; מצאו כמות חסרה; בנו יחס שקול
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `ratio_simplify` | open/mcq/tf/mistake | צמצמו 18:24 | צמצום צד אחד | יחס מספרי |
  | `ratio_share` | open/mcq/tf/mistake | חלקו 35 ביחס 2:3 | כפל הכמות הכוללת בכל חלק | חלוקת כמות |
  | `ratio_missing` | open/mcq/tf/mistake | יחס 2:5, ידוע 8 — מצאו את החסר | חיבור במקום כפל בגורם | כמות חסרה |

### N8-02-ENGINE — פרופורציה

- **Source PDF:** 07_numeric_domain_principles_grades-7-8.pdf · grade 8
- **Skill:** פתרון פרופורציה וזיהוי פרופורציה
- **Learning goal:** התלמיד יפתור פרופורציה בכפל צולב ויזהה האם זוגות פרופורציוניים
- **Teacher purpose:** ביסוס הקשר היחסי בין גדלים
- **Common misconceptions:** השוואת סכומים במקום מכפלות; חיבור במקום כפל צולב
- **Follow-up ideas:** קצב נסיעה; מתכון מוגדל; בדיקת פרופורציה
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `proportion_missing` | open/mcq/tf/mistake | השלימו a/b=x/d | כפל בלי חלוקה | נעלם במונה/מכנה |
  | `proportion_rate` | open/mcq/tf/mistake | קצב: x ל-y זמן | חיבור במקום גורם יחס | קצב/מהירות |
  | `proportion_verify` | open/mcq/tf/mistake | האם 6:4 ו-9:6 פרופורציה? | השוואת סכומים | בדיקת זוגות |

### N8-03-ENGINE — קנה מידה

- **Source PDF:** 07_numeric_domain_principles_grades-7-8.pdf · grade 8
- **Skill:** מעבר בין מפה למציאות ומציאות למפה
- **Learning goal:** התלמיד יחשב מרחק אמיתי, מרחק במפה וקנה מידה
- **Teacher purpose:** יישום פרופורציה בקנה מידה
- **Common misconceptions:** ערבוב יחידות (ס״מ/ק״מ); היפוך כיוון הכפל/חלוקה
- **Follow-up ideas:** מצאו מרחק אמיתי; מצאו מרחק במפה; מצאו קנה מידה
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `scale_real_distance` | open/mcq/tf/mistake | מפה 1:50000, 3 ס״מ — מרחק אמיתי? | תוצאה בס״מ במקום ק״מ | מפה→מציאות |
  | `scale_map_distance` | open/mcq/tf/mistake | מרחק אמיתי נתון — כמה במפה? | כפל במקום חילוק | מציאות→מפה |
  | `scale_factor` | open/mcq/tf/mistake | מצאו קנה מידה מנתונים | היפוך היחס | מציאת קנה מידה |

### N8-04-ENGINE — אחוזים — מצבים סטטיים

- **Source PDF:** 07_numeric_domain_principles_grades-7-8.pdf · grade 8
- **Skill:** אחוז מתוך כמות, מציאת שלם, מציאת אחוז
- **Learning goal:** התלמיד יחשב אחוז מכמות, ימצא שלם וימצא אחוז
- **Teacher purpose:** ביסוס שלוש בעיות האחוז הבסיסיות
- **Common misconceptions:** חילוק במקום כפל באחוז; היפוך חלק/שלם
- **Follow-up ideas:** אחוז מכמות; מציאת השלם; מציאת האחוז
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `percent_of_amount` | open/mcq/tf/mistake | 25% מתוך 80 | חילוק במקום כפל | אחוז מכמות |
  | `percent_find_whole` | open/mcq/tf/mistake | 20 הם 25% — מהו השלם? | אחוז מהחלק | מציאת שלם |
  | `percent_find_percent` | open/mcq/tf/mistake | איזה אחוז 30 מתוך 120? | היפוך חלק/שלם | מציאת אחוז |

### N8-05-ENGINE — אחוזים — מצבים דינמיים

- **Source PDF:** 07_numeric_domain_principles_grades-7-8.pdf · grade 8
- **Skill:** עלייה/ירידה באחוזים, ערך מקורי, שינוי דו-שלבי
- **Learning goal:** התלמיד יחשב ערך לאחר שינוי באחוזים ויחזור לערך מקורי
- **Teacher purpose:** הבנת אחוז כפעולה כפלית על בסיס
- **Common misconceptions:** חיבור/חיסור האחוז כמספר; חישוב האחוז מהערך הסופי
- **Follow-up ideas:** ייקור; הנחה; שינוי כפול ובדיקת חזרה
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `percent_increase` | open/mcq/tf/mistake | מחיר עלה ב-25% | חיבור האחוז כמספר | עלייה |
  | `percent_decrease` | open/mcq/tf/mistake | מחיר ירד ב-20% | חיסור האחוז כמספר | ירידה |
  | `percent_original` | open/mcq/tf/mistake | אחרי עלייה הוא X — מה המקור? | אחוז מהסופי | מציאת מקור |

## Algebra

### A7-01-ENGINE — ביטויים אלגבריים

- **Source PDF:** 01_grade-7_algebra_curriculum.pdf · grade 7
- **Skill:** תרגום מילולי, פישוט, התאמת ביטוי
- **Learning goal:** התלמיד יתרגם תיאור מילולי לביטוי אלגברי ויפשט איברים דומים
- **Teacher purpose:** ביסוס מעבר בין שפה לביטוי אלגברי
- **Common misconceptions:** "פי" כפעולת חיבור; חיבור איבר חופשי למקדם; שינוי חזקה בפישוט
- **Follow-up ideas:** התאימו ביטוי לתיאור; בנו ביטוי לשני משתנים; מצאו טעות בפישוט
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `expression_from_words` | open/mcq/tf/mistake | מחיר n לכרטיס — מחיר 4 כרטיסים | חיבור במקום כפל | פי k, תוספת קבועה |
  | `simplify_like_terms` | open/mcq/tf/mistake | פשטו 3x+5x | שינוי חזקה / חיבור חופשי | איברים דומים, עם איבר חופשי |
  | `match_expression` | open/mcq/tf/mistake | התאימו ביטוי לתיאור | תרגום שגוי של פעולה | גדול ב, פי, תשלום קבוע+משתנה |
  | `rectangle_expression` | open/mcq/tf/mistake | היקף/שטח מלבן עם צלע פי k | בלבול היקף/שטח בביטוי | היקף, שטח |
  | `two_variable_cost` | open/mcq/tf/mistake | עלות a-ל-X ו-b-ל-Y | כפל סך פריטים בסכום משתנים | שני מחירים |

### A7-02-ENGINE — הצבה בביטוי

- **Source PDF:** 01_grade-7_algebra_curriculum.pdf · grade 7
- **Skill:** הצבת ערך (כולל שלילי) בביטוי
- **Learning goal:** התלמיד יציב ערכים, כולל שליליים, בביטוי ויחשב נכון
- **Teacher purpose:** ביסוס משמעות המשתנה וההצבה
- **Common misconceptions:** kx כחיבור; חזקה כפל ב-2; סימן שגוי בריבוע שלילי
- **Follow-up ideas:** הציבו ערך שלילי; הציבו בביטוי עם חזקה; השוו שתי הצבות
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `substitute_positive` | open/mcq/tf/mistake | ערך של 2x+7 ב-x=3 | kx כחיבור | x חיובי |
  | `substitute_negative` | open/mcq/tf/mistake | ערך של 3x+10 ב-x=−2 | טעות סימן | x שלילי |
  | `substitute_power` | open/mcq/tf/mistake | ערך של x²+c ב-x=−4 | (−a)² כ-−a² | ריבוע, בסיס שלילי |

### A7-03-ENGINE — משוואות מדרגה ראשונה

- **Source PDF:** 01_grade-7_algebra_curriculum.pdf · grade 7
- **Skill:** פתרון משוואה, פתיחת סוגריים, בדיקה
- **Learning goal:** התלמיד יפתור משוואה מדרגה ראשונה ויבדוק פתרון
- **Teacher purpose:** ביסוס איזון משוואה והעברת אגף
- **Common misconceptions:** אי-היפוך סימן בהעברת אגף; פתיחת סוגריים חלקית
- **Follow-up ideas:** פתרו עם סוגריים; בדקו פתרון נתון; בנו משוואה לפתרון נתון
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `one_step` | open/mcq/tf/mistake | x+7=12 | כיוון פעולה הפוך | חיבור/חיסור |
  | `two_step` | open/mcq/tf/mistake | 3x+5=20 | סדר פעולות שגוי | שני שלבים |
  | `parentheses_equation` | open/mcq/tf/mistake | 3(x+2)=21 | פתיחת סוגריים חלקית | סוגריים |
  | `verify_solution` | open/mcq/tf/mistake | האם x=5 פתרון? | הצבה רק באגף אחד | בדיקת פתרון |

### A7-04-ENGINE — ביטויים שקולים ופישוט

- **Source PDF:** 01_grade-7_algebra_curriculum.pdf · grade 7
- **Skill:** פתיחת סוגריים, איברים דומים, גורם משותף
- **Learning goal:** התלמיד יזהה וייצר ביטויים שקולים
- **Teacher purpose:** ביסוס מושג השקילות האלגברית
- **Common misconceptions:** פתיחת סוגריים חלקית; מינוס לפני סוגריים; חיבור איברים לא דומים
- **Follow-up ideas:** בחרו ביטוי שקול; פשטו עם מינוס לפני סוגריים; הוציאו גורם משותף
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `plus_distribution` | open/mcq/tf/mistake | p(x+q)+rx | פתיחה חלקית | פילוג חיובי |
  | `minus_distribution` | open/mcq/tf/mistake | px−b(x−c) | אי-שינוי סימן | מינוס לפני סוגריים |
  | `factor_common` | open/mcq/tf/mistake | fx+fq | הוצאת גורם שגויה | גורם משותף |
  | `like_terms` | open/mcq/tf/mistake | ax+c−bx+d | חיבור איברים לא דומים | איברים דומים |

### A7-05-ENGINE — מציאת טעות בביטויים

- **Source PDF:** 01_grade-7_algebra_curriculum.pdf · grade 7
- **Skill:** ניתוח טעות אלגברית ותיקונה
- **Learning goal:** התלמיד יאתר טעות נפוצה בפישוט ויתקן
- **Teacher purpose:** חידוד מודעות לטעויות אלגבריות נפוצות
- **Common misconceptions:** פילוג חלקי; שינוי חזקה בחיבור; מינוס לפני סוגריים; איחוד איבר חופשי עם משתנה
- **Follow-up ideas:** סווגו את סוג הטעות; תקנו פתרון תלמיד; כתבו ביטוי נכון
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `mistake_distribution` | open/mcq/tf/mistake | p(x+q)=px+q | כפל רק על המשתנה | פילוג |
  | `mistake_like_power` | open/mcq/tf/mistake | ax+bx=(a+b)x² | שינוי חזקה | איברים דומים |
  | `mistake_minus_sign` | open/mcq/tf/mistake | px−b(x+q)=…+bq | אי-שינוי סימן | מינוס לפני סוגריים |
  | `mistake_constant_like` | open/mcq/tf/mistake | ax+k=(a+k)x | איחוד חופשי עם משתנה | איבר חופשי |

### A8-01-ENGINE — גרפים יישומיים ופונקציות

- **Source PDF:** 02_grade-8_algebra_curriculum.pdf · grade 8
- **Skill:** קריאת גרף יישומי, סף, קצב, זיהוי פונקציה
- **Learning goal:** התלמיד יקרא ערכים, סף וקצב מגרף יישומי ויזהה פונקציה
- **Teacher purpose:** חיבור בין הקשר מציאותי לגרף לינארי
- **Common misconceptions:** קריאת x במקום y; התעלמות מערך התחלתי; התעלמות מקנה מידה
- **Follow-up ideas:** מצאו סף; מצאו קצב; קבעו האם פונקציה
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `fuel_cost_graph` | open/mcq/tf/mistake | מחיר ליטר 7 — מתי העלות > 63? | התעלמות מקנה מידה | סף עלות |
  | `heating_rate_graph` | open/mcq/tf/mistake | נוזל 8°C, קצב 10°/דקה | התעלמות מטמפ׳ התחלתית | קצב, ערך לאחר זמן |
  | `value_from_rule` | open/mcq/tf/mistake | y=3x+4, מה y ב-x=2? | הצבה חלקית | טבלת ערכים |
  | `is_function` | open/mcq/tf/mistake | האם ההתאמה פונקציה? | בלבול קיום ערכים עם יחידות | זיהוי פונקציה |

### A8-02-ENGINE — שיפוע ומשוואת ישר

- **Source PDF:** 02_grade-8_algebra_curriculum.pdf · grade 8
- **Skill:** שיפוע משתי נקודות, ערך, עולה/יורדת, משוואה
- **Learning goal:** התלמיד יחשב שיפוע, ערך ומשוואת ישר ויקבע מגמה
- **Teacher purpose:** ביסוס מושג השיפוע כקצב שינוי
- **Common misconceptions:** היפוך מונה/מכנה בשיפוע; בלבול שיפוע וחיתוך; kx כחיבור
- **Follow-up ideas:** מצאו שיפוע; כתבו משוואה משתי נקודות; קבעו עולה/יורדת
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `slope_two_points` | open/mcq/tf/mistake | שיפוע דרך (0,1),(2,5) | היפוך מונה/מכנה | שתי נקודות |
  | `value_at` | open/mcq/tf/mistake | y עבור x נתון | kx כחיבור | הצבה |
  | `rising_falling` | open/mcq/tf/mistake | עולה או יורדת? | התעלמות מסימן שיפוע | מגמה |
  | `equation_from_points` | open/mcq/tf/mistake | משוואת ישר משתי נקודות | בלבול שיפוע וחיתוך | משוואה |
  | `applied_linear_read` | open/mcq/tf/mistake | קריאת ערך/סף מגרף יישומי | קריאת x במקום y | גרף יישומי |

### A8-03-ENGINE — מערכת משוואות

- **Source PDF:** 02_grade-8_algebra_curriculum.pdf · grade 8
- **Skill:** מציאת שני נעלמים מתנאים, בדיקת זוג
- **Learning goal:** התלמיד יפתור בעיה מילולית בשני נעלמים ויבדוק זוג פתרון
- **Teacher purpose:** ביסוס פתרון מערכת בשני נעלמים
- **Common misconceptions:** חיסור הפרש מסכום נותן את הגדול; בדיקה במשוואה אחת בלבד
- **Follow-up ideas:** סכום והפרש; "יותר מ"; בדיקת זוג פתרון
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `sum_and_difference` | open/mcq/tf/mistake | סכום s, הפרש d — מצאו את המספרים | חיסור נותן את הגדול | סכום והפרש |
  | `more_than` | open/mcq/tf/mistake | יחד s, לאחד k יותר | חצי+k שגוי | "יותר מ" |
  | `verify_pair` | open/mcq/tf/mistake | האם (x,y) פתרון המערכת? | בדיקה במשוואה אחת | בדיקת זוג |

## Geometry

### G7-01-ENGINE — מלבן ותיבה

- **Source PDF:** 03_grade-7_pre_deductive_geometry_curriculum.pdf · grade 7
- **Skill:** שטח/היקף מלבן, נפח תיבה, ממד חסר
- **Learning goal:** התלמיד יחשב שטח והיקף מלבן, נפח תיבה וממד חסר
- **Teacher purpose:** ביסוס נוסחאות מלבן ותיבה
- **Common misconceptions:** בלבול שטח/היקף; חיבור ממדים במקום כפל בנפח
- **Follow-up ideas:** מצאו צלע חסרה; נפח תיבה; גובה חסר מתוך נפח
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `rectangle_area` | open/mcq/tf/mistake | שטח מלבן a×b | חיבור צלעות | שטח |
  | `rectangle_perimeter` | open/mcq/tf/mistake | היקף מלבן | כפל במקום סכום | היקף |
  | `rectangle_missing_side` | open/mcq/tf/mistake | שטח/היקף ידוע — צלע חסרה | חיסור במקום חילוק | צלע חסרה |
  | `box_volume` | open/mcq/tf/mistake | נפח תיבה l×w×h | חיבור ממדים | נפח |
  | `box_missing_dim` | open/mcq/tf/mistake | נפח ידוע — ממד חסר | חיסור במקום חילוק | ממד חסר |

### G7-02-ENGINE — שטחי צורות שטוחות

- **Source PDF:** 03_grade-7_pre_deductive_geometry_curriculum.pdf · grade 7
- **Skill:** שטח משולש, מקבילית, טרפז, גובה חסר
- **Learning goal:** התלמיד יחשב שטחי צורות שטוחות וימצא גובה חסר
- **Teacher purpose:** ביסוס נוסחאות שטח והקשר ביניהן
- **Common misconceptions:** אי-חלוקה ב-2 במשולש; חלוקה ב-2 במקבילית
- **Follow-up ideas:** שטח משולש; שטח טרפז; גובה חסר ממשולש
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `triangle_area` | open/mcq/tf/mistake | שטח משולש b,h | אי-חלוקה ב-2 | משולש |
  | `parallelogram_area` | open/mcq/tf/mistake | שטח מקבילית | חלוקה מיותרת ב-2 | מקבילית |
  | `trapezoid_area` | open/mcq/tf/mistake | שטח טרפז | שכחת חלוקה ב-2 | טרפז |
  | `triangle_missing_height` | open/mcq/tf/mistake | שטח ידוע — גובה חסר | אי-הכפלה ב-2 | גובה חסר |

### G7-03-ENGINE — משפט פיתגורס

- **Source PDF:** 03_grade-7_pre_deductive_geometry_curriculum.pdf · grade 7
- **Skill:** מציאת צלע, בדיקת משולש ישר-זווית, אלכסון מלבן
- **Learning goal:** התלמיד ייישם את משפט פיתגורס למציאת צלע ובדיקת ישר-זווית
- **Teacher purpose:** ביסוס הקשר בין צלעות במשולש ישר-זווית
- **Common misconceptions:** חיבור רגיל של הרגליים במקום ריבועים
- **Follow-up ideas:** מצאו רגל חסרה; בדקו שלשה פיתגורית; אלכסון מלבן
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `find_side` | open/mcq/tf/mistake | רגליים 3,4 — יתר? | חיבור רגליים | יתר, רגל |
  | `check_right_triangle` | open/mcq/tf/mistake | האם 3,4,6 ישר-זווית? | הנחה שכל משולש ישר | בדיקת שלשה |
  | `rectangle_diagonal` | open/mcq/tf/mistake | אלכסון מלבן 3×4 | חיבור צלעות לאלכסון | אלכסון מלבן |

### G7-04-ENGINE — זווית חסרה במשולש

- **Source PDF:** 03_grade-7_pre_deductive_geometry_curriculum.pdf · grade 7
- **Skill:** סכום זוויות 180°, אפשרות משולש, סיווג
- **Learning goal:** התלמיד ימצא זווית חסרה, יקבע אפשרות משולש ויסווג לפי זוויות
- **Teacher purpose:** ביסוס סכום זוויות במשולש
- **Common misconceptions:** חיבור שתי הזוויות במקום חיסור מ-180°; סיווג לפי הזווית הקטנה
- **Follow-up ideas:** מצאו זווית חסרה; בדקו אפשרות; סווגו משולש
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `missing_angle` | open/mcq/tf/mistake | שתי זוויות נתונות — השלישית? | חיבור במקום חיסור מ-180° | זווית חסרה |
  | `possible_triangle` | open/mcq/tf/mistake | האם הזוויות אפשריות? | בדיקה שכל זווית<180° | אפשרות משולש |
  | `classify_triangle` | open/mcq/tf/mistake | סווגו לפי הזוויות | סיווג לפי הקטנה | חד/ישר/קהה |

### G7-05 — הזזות שיקופים וסיבובים _(fallback)_

- **Source PDF:** 03_grade-7_pre_deductive_geometry_curriculum.pdf · grade 7
- **Skill:** טרנספורמציות במישור
- **Learning goal:** התלמיד יזהה תוצאת הזזה/שיקוף/סיבוב
- **Teacher purpose:** ביסוס טרנספורמציות בסיסיות
- **Common misconceptions:** בלבול בין סוגי הטרנספורמציה
- **Follow-up ideas:** הזזה; שיקוף
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `transformations` | open/mcq/tf/mistake | מצאו תמונת נקודה/צורה לאחר טרנספורמציה | בלבול סוג טרנספורמציה | הזזה/שיקוף/סיבוב |

### G7-06 — שטח צורה מורכבת _(fallback)_

- **Source PDF:** 03_grade-7_pre_deductive_geometry_curriculum.pdf · grade 7
- **Skill:** פירוק לצורות
- **Learning goal:** התלמיד יחשב שטח צורה מורכבת בפירוק
- **Teacher purpose:** ביסוס פירוק שטחים
- **Common misconceptions:** שכחת חלק/כפל שגוי
- **Follow-up ideas:** פרקו לצורות; חברו שטחים
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `composite_area` | open/mcq/tf/mistake | שטח צורה מורכבת בפירוק | שכחת תת-צורה | פירוק |

### G8-01-ENGINE — עיגול — היקף ושטח

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** היקף ושטח עיגול, רדיוס מהיקף, אבחנת נוסחאות
- **Learning goal:** התלמיד יחשב היקף ושטח עיגול ויבחין בין הנוסחאות
- **Teacher purpose:** ביסוס נוסחאות העיגול והבחנה ביניהן
- **Common misconceptions:** בלבול 2πr עם πr²; אי-חלוקה ב-2 ברדיוס מהיקף
- **Follow-up ideas:** היקף מרדיוס; שטח מרדיוס; רדיוס מהיקף
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `circumference_from_radius` | open/mcq/tf/mistake | היקף עיגול שרדיוסו r | שימוש בנוסחת השטח | רדיוס |
  | `area_from_radius` | open/mcq/tf/mistake | שטח עיגול שרדיוסו r | שימוש בנוסחת ההיקף | רדיוס |
  | `circumference_from_diameter` | open/mcq/tf/mistake | היקף מקוטר | כפל מיותר ב-2 | קוטר |
  | `radius_from_circumference` | open/mcq/tf/mistake | היקף kπ — רדיוס? | מחיקת π בלבד | רדיוס מהיקף |
  | `formula_distinction` | open/mcq/tf/mistake | איזו נוסחה לשטח? | החלפת נוסחאות | אבחנת נוסחאות |

### G8-02-ENGINE — גליל ופריסה

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** נפח/שטח פנים גליל, פריסה
- **Learning goal:** התלמיד יחשב נפח ושטח פנים של גליל ויזהה פריסה
- **Teacher purpose:** ביסוס מבנה הגליל ופריסתו
- **Common misconceptions:** 2πrh כנפח; שכחת בסיסים בשטח פנים
- **Follow-up ideas:** נפח גליל; שטח פנים כולל; זיהוי פריסה
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `cylinder_volume` | open/mcq/tf/mistake | נפח גליל r,h | 2πrh כנפח | נפח |
  | `cylinder_surface` | open/mcq/tf/mistake | שטח פנים כולל | שכחת בסיסים | שטח פנים |
  | `cylinder_net` | open/mcq/tf/mistake | איזו פריסה מתאימה? | בחירת פריסת תיבה | פריסה |

### G8-03-ENGINE — זוויות בין מקבילים

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** זוויות מתאימות/מתחלפות/חד-צדדיות
- **Learning goal:** התלמיד יזהה יחסי זוויות בין ישרים מקבילים וחותך
- **Teacher purpose:** ביסוס משפטי הזוויות בין מקבילים
- **Common misconceptions:** כל הזוויות שוות; התעלמות מזוויות חד-צדדיות משלימות
- **Follow-up ideas:** זוויות מתאימות; זוויות חד-צדדיות; זיהוי סוג הזווית
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `corresponding_alternate` | open/mcq/tf/mistake | זוויות מתאימות/מתחלפות שוות | הנחה שכל הזוויות שוות | מתאימות, מתחלפות |
  | `cointerior_supplementary` | open/mcq/tf/mistake | זוויות חד-צדדיות משלימות ל-180° | הנחת שוויון | חד-צדדיות |
  | `identify_angle_relation` | open/mcq/tf/mistake | איזה סוג יחס בין הזוויות? | אי-זיהוי סוג הזווית | זיהוי יחס |

### G8-04-ENGINE — דמיון משולשים

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** יחס דמיון, צלע מתאימה, יחס שטחים, זיהוי דמיון
- **Learning goal:** התלמיד ימצא יחס דמיון, צלע מתאימה ויחס שטחים
- **Teacher purpose:** ביסוס מושג הדמיון והיחס
- **Common misconceptions:** חיסור במקום חילוק ביחס; יחס שטחים כיחס צלעות
- **Follow-up ideas:** יחס דמיון; צלע מתאימה; יחס שטחים
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `scale_factor` | open/mcq/tf/mistake | מצאו יחס דמיון | חיסור במקום חילוק | יחס דמיון |
  | `corresponding_side` | open/mcq/tf/mistake | צלע מתאימה ביחס k | חיבור במקום כפל | צלע מתאימה |
  | `area_ratio` | open/mcq/tf/mistake | יחס שטחים ביחס k | יחס שטחים=יחס צלעות | יחס שטחים |
  | `is_similar` | open/mcq/tf/mistake | האם המשולשים דומים? | בדיקה לפי הפרש | זיהוי דמיון |

### G8-05 — זווית מרכזית וחלק מעיגול _(fallback)_

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** זווית מרכזית וגזרה
- **Learning goal:** התלמיד יחשב זווית מרכזית וחלק מעיגול
- **Teacher purpose:** חיבור זווית מרכזית לחלק מהעיגול
- **Common misconceptions:** בלבול זווית מרכזית עם היקפית
- **Follow-up ideas:** זווית מרכזית; שטח גזרה
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `central_angle_sector` | open/mcq/tf/mistake | זווית מרכזית/גזרה מתוך עיגול | מרכזית כהיקפית | גזרה |

### G8-06 — קוטר רדיוס ומיתר _(fallback)_

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** יסודות העיגול
- **Learning goal:** התלמיד יבחין בין קוטר, רדיוס ומיתר
- **Teacher purpose:** ביסוס מושגי העיגול
- **Common misconceptions:** בלבול מיתר עם קוטר
- **Follow-up ideas:** זהו קוטר/רדיוס; מיתר ארוך ביותר
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `diameter_radius_chord` | open/mcq/tf/mistake | זיהוי קוטר/רדיוס/מיתר | מיתר=קוטר | חלקי עיגול |

### G8-07 — חפיפת משולשים לפי סימונים _(fallback)_

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** משפטי חפיפה
- **Learning goal:** התלמיד יזהה חפיפה לפי סימונים
- **Teacher purpose:** ביסוס משפטי חפיפה
- **Common misconceptions:** הנחת חפיפה מסימון חלקי
- **Follow-up ideas:** זהו משפט חפיפה; השלימו נתון
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `triangle_congruence_markings` | open/mcq/tf/mistake | זיהוי חפיפה לפי סימונים | חפיפה מנתון חלקי | צ.צ.צ/צ.ז.צ/ז.צ.ז |

### G8-08 — משולש שווה שוקיים _(fallback)_

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** תכונות שווה-שוקיים
- **Learning goal:** התלמיד יישם תכונות משולש שווה-שוקיים
- **Teacher purpose:** ביסוס תכונות שווה-שוקיים
- **Common misconceptions:** הנחת שוויון זוויות בסיס בלי נימוק
- **Follow-up ideas:** זוויות בסיס; שוק/בסיס
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `isosceles_triangle` | open/mcq/tf/mistake | תכונות שווה-שוקיים | זוויות בסיס שונות | שוקיים, זוויות בסיס |

### G8-09 — דמיון וצללים _(fallback)_

- **Source PDF:** 04_grade-8_geometry_curriculum.pdf · grade 8
- **Skill:** דמיון ביישום צללים
- **Learning goal:** התלמיד ייישם דמיון בבעיות צל
- **Teacher purpose:** יישום דמיון משולשים בהקשר
- **Common misconceptions:** התעלמות מיחס הדמיון
- **Follow-up ideas:** גובה מצל; יחס דמיון
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `similarity_and_shadows` | open/mcq/tf/mistake | גובה עצם מצל לפי דמיון | התעלמות מיחס | צללים |

## Uncertainty

### U7-01-ENGINE — טבלת תדירות ותרשים עמודות

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** קריאת תדירות, שכיח, סך, תדירות יחסית, קריאת תרשים
- **Learning goal:** התלמיד יקרא טבלת תדירות ותרשים עמודות ויחשב תדירות יחסית
- **Teacher purpose:** ביסוס ארגון נתונים וקריאתם
- **Common misconceptions:** קריאת ערך כתדירות; תדירות יחסית כספירה; שכיח לפי הערך הגדול
- **Follow-up ideas:** קראו תדירות; מצאו שכיח; חשבו תדירות יחסית; קראו מתרשים
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `read_frequency` | open/mcq/tf/mistake | מה התדירות של ערך? | קריאת הערך כתדירות | קריאת טבלה |
  | `most_frequent` | open/mcq/tf/mistake | מהו השכיח? | שכיח לפי הערך הגדול | שכיח |
  | `total_count` | open/mcq/tf/mistake | כמה נבדקים בסך הכל? | סכום ערכים במקום תדירויות | סך |
  | `relative_frequency` | open/mcq/tf/mistake | תדירות יחסית של ערך | תדירות יחסית כספירה | שבר/עשרוני/אחוז |
  | `bar_chart_read` | open/mcq/tf/mistake | קריאת ערך/קיצון/סך מתרשים | קריאת עמודה שכנה | תרשים עמודות |

### U7-02-ENGINE — הסתברות בסיסית

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** הסתברות מקרה, משלים, קובייה
- **Learning goal:** התלמיד יחשב הסתברות בסיסית ומשלימה
- **Teacher purpose:** ביסוס מושג ההסתברות כיחס מקרים
- **Common misconceptions:** מכנה כמספר הכישלונות; משלים כ-1+P
- **Follow-up ideas:** הסתברות מקובייה; הסתברות מקופסה; הסתברות משלימה
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `die_probability` | open/mcq/tf/mistake | הסתברות בקובייה הוגנת | מכנה=כישלונות | קובייה |
  | `bag_probability` | open/mcq/tf/mistake | הסתברות שליפת כדור | מכנה=צבע אחר בלבד | קופסה |
  | `complement_probability` | open/mcq/tf/mistake | הסתברות "לא" | P(לא)=1+P | משלים |

### U7-03-ENGINE — השוואת קבוצות — תדירות יחסית

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** השוואה לפי k/n ולא לפי k
- **Learning goal:** התלמיד ישווה קבוצות בגדלים שונים לפי שיעור יחסי
- **Teacher purpose:** חשיפת מלכודת ההשוואה לפי ספירה מוחלטת
- **Common misconceptions:** השוואת ספירות מוחלטות במקום שיעור
- **Follow-up ideas:** חשבו שיעור לכל קבוצה; הסבירו מי "יותר"; בנו דוגמה הפוכה
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `compare_relative_frequency` | open/mcq/tf/mistake | כיתה א׳ n1,k1 מול כיתה ב׳ n2,k2 | השוואת k בלבד | שתי קבוצות שונות בגודל |
  | `which_group_higher` | open/mcq/tf/mistake | באיזו קבוצה השיעור גבוה יותר? | בחירת הקבוצה הגדולה | בחירת קבוצה |
  | `explain_trap` | open/mcq/tf/mistake | הסבירו מדוע הגדולה אינה בהכרח "יותר" | התעלמות מגודל הקבוצה | הסבר מילולי |

### U7-04-ENGINE — קריאה מתרשים עמודות

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** קריאת ערך, קיצון וסך מתרשים עמודות
- **Learning goal:** התלמיד יקרא ערכים, קיצון וסך מתרשים עמודות
- **Teacher purpose:** ביסוס קריאת ייצוג גרפי של נתונים
- **Common misconceptions:** קריאת עמודה שכנה; הקיצון כסך הכל
- **Follow-up ideas:** קראו ערך לפי קטגוריה; מצאו גבוה/נמוך; חשבו סך
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `read_value` | open/mcq/tf/mistake | כמה בקטגוריה X? | קריאת עמודה שכנה | קריאת ערך |
  | `highest_lowest` | open/mcq/tf/mistake | איזו קטגוריה גבוהה/נמוכה? | בחירה לפי מיקום | קיצון |
  | `total_from_bars` | open/mcq/tf/mistake | מה הסך הכל? | הקיצון כסך | סך |

### U7-05 — דיאגרמת עוגה ושכיחות יחסית _(fallback)_

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** זווית מרכזית מאחוז
- **Learning goal:** התלמיד יחשב זווית מרכזית ויקרא דיאגרמת עוגה
- **Teacher purpose:** חיבור אחוז לזווית מרכזית
- **Common misconceptions:** אחוז כמעלות / כפל ב-100
- **Follow-up ideas:** חשבו זווית מרכזית; מצאו אחוז חסר
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `pie_chart_central_angle` | open/mcq/tf/mistake | זווית מרכזית מאחוז (×3.6°) | אחוז=מעלות | גזרה, אחוז חסר |

### U7-06 — תרשים מטעה — ביקורת _(fallback)_

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** ביקורת ייצוג גרפי
- **Learning goal:** התלמיד יזהה מדוע תרשים מטעה ויציע תיקון
- **Teacher purpose:** פיתוח קריאה ביקורתית של גרפים
- **Common misconceptions:** הסקה לפי גובה עמודה בלי לבדוק ציר
- **Follow-up ideas:** מדוע מטעה?; הציעו תיקון
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `misleading_graph_critique` | open/mcq/tf/mistake | מדוע התרשים מטעה? הציעו תיקון | התעלמות מציר y קטוע | ציר קטוע |

### U7-07 — טבלת שכיחויות ושכיחות יחסית _(fallback)_

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** ארגון נתונים
- **Learning goal:** התלמיד יארגן נתונים בטבלה ויחשב שכיחות יחסית
- **Teacher purpose:** ביסוס טבלת תדירות
- **Common misconceptions:** תדירות יחסית כספירה
- **Follow-up ideas:** ארגנו טבלה; חשבו תדירות יחסית
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `frequency_table_relative` | open/mcq/tf/mistake | בנו טבלה וחשבו שכיחות יחסית | תדירות יחסית=ספירה | טבלה |

### U7-08 — ממוצע חציון וטווח _(fallback)_

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 7
- **Skill:** מדדי מרכז ופיזור
- **Learning goal:** התלמיד יחשב ממוצע, חציון וטווח
- **Teacher purpose:** ביסוס מדדים סטטיסטיים
- **Common misconceptions:** חציון בלי מיון
- **Follow-up ideas:** חשבו ממוצע; מצאו חציון
- **Visual required:** no
- **Engine status:** fallback

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `mean_median_range` | open/mcq/tf/mistake | חשבו ממוצע/חציון/טווח | חציון בלי מיון | מדדים |

### U8-01-ENGINE — ממוצע, חציון, טווח

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 8
- **Skill:** חישוב מדדי מרכז ופיזור
- **Learning goal:** התלמיד יחשב ממוצע, חציון וטווח
- **Teacher purpose:** ביסוס מדדי מרכז ופיזור
- **Common misconceptions:** ממוצע כערך האמצעי; חציון בלי מיון; טווח כערך הגדול
- **Follow-up ideas:** חשבו ממוצע; מצאו חציון; חשבו טווח; מצאו ערך חסר מממוצע
- **Visual required:** no
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `mean` | open/mcq/tf/mistake | חשבו ממוצע סדרה | ממוצע כאמצעי | ממוצע |
  | `median` | open/mcq/tf/mistake | מצאו חציון | חציון בלי מיון | חציון |
  | `range` | open/mcq/tf/mistake | חשבו טווח | טווח כערך גדול | טווח |
  | `missing_from_mean` | open/mcq/tf/mistake | ערך חמישי לממוצע נתון | הערך=הממוצע | ערך חסר |

### U8-02-ENGINE — הסתברות מטבלה

- **Source PDF:** 06_uncertainty_domain_curriculum_examples.pdf · grade 8
- **Skill:** הסתברות מתא/שורה, משלים, השוואת קבוצות
- **Learning goal:** התלמיד יחשב הסתברות מטבלה דו-ממדית
- **Teacher purpose:** חיבור טבלה דו-ממדית להסתברות
- **Common misconceptions:** מכנה שגוי; משלים 1+P; השוואת ספירות מוחלטות
- **Follow-up ideas:** הסתברות מתא; הסתברות שורה; השוואה יחסית
- **Visual required:** yes
- **Engine status:** dedicated

  | family | qtypes | source pattern | misconception | variations |
  |---|---|---|---|---|
  | `prob_cell` | open/mcq/tf/mistake | הסתברות תא מסוים | מכנה=שורה בלבד | תא בטבלה |
  | `prob_row` | open/mcq/tf/mistake | הסתברות שורה שלמה | התעלמות מעמודה שנייה | שורה |
  | `prob_complement` | open/mcq/tf/mistake | הסתברות "לא" | משלים 1+P | משלים |
  | `compare_groups` | open/mcq/tf/mistake | באיזו קבוצה שיעור גבוה? | ספירה מוחלטת | השוואה |

