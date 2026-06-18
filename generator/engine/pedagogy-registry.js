// generator/engine/pedagogy-registry.js
// The "source bible" as machine-readable data: for every active engine topic and
// every fallback topic — learning goal, teacher purpose, skill, common
// misconceptions, follow-up ideas, and the question families allowed by the
// sources. sourceFile/grade/domain are inherited from E.SOURCE_REGISTRY (DRY).
// Loaded after source-registry.js. Read by engines, verifiers and the gallery.
// IRON RULE: families may only cite source files 01–09. File 10 (teaching
// sequence) is never a question source.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  if (typeof E.defineSource !== 'function') return;

  E.PEDAGOGY = E.PEDAGOGY || {};
  const Q4 = ['open', 'mcq', 'tf', 'mistake'];
  const D3 = ['basic', 'standard', 'challenge'];

  // family builder fills defaults so every stored family is complete
  function fam(id, questionFamily, pattern, misconception, variations, constraints, opts) {
    opts = opts || {};
    return {
      id: id,
      questionFamily: questionFamily,
      sourceExampleOrPattern: pattern,
      commonMisconception: misconception,
      allowedVariations: variations || [],
      fixedConstraints: constraints || [],
      qtypes: opts.qtypes || Q4,
      difficulties: opts.difficulties || D3,
      answerFormat: opts.answerFormat || 'ערך/ביטוי נכון + הסבר מילולי',
      explanationFormat: opts.explanationFormat || 'הסבר קצר המראה את הכלל או השלב הקריטי',
      requiredVisual: !!opts.requiredVisual
    };
  }

  // topic builder: id -> pedagogy; sourceFile/grade/domain pulled from registry
  function topic(id, o) {
    const src = E.getSource(id) || {};
    E.PEDAGOGY[id] = {
      topicId: id,
      topicName: o.topicName,
      sourceFile: src.sourceFile || o.sourceFile,
      grade: src.grade || o.grade,
      domain: src.domain || o.domain,
      skill: o.skill,
      learningGoal: o.learningGoal,
      teacherPurpose: o.teacherPurpose,
      misconceptions: o.misconceptions || [],
      noMisconceptionJustification: o.noMisconceptionJustification || null,
      followUpIdeas: o.followUpIdeas || [],
      requiredVisual: !!o.requiredVisual,
      families: o.families || [],
      engineSupport: o.engineSupport || 'dedicated',
      status: o.status || 'active'
    };
  }

  E.getPedagogy = function (id) {
    if (!id) return null;
    if (E.PEDAGOGY[id]) return E.PEDAGOGY[id];
    const base = String(id).replace(/-ENGINE$/, '');
    return E.PEDAGOGY[base] || E.PEDAGOGY[base + '-ENGINE'] || null;
  };
  E.getFamilies = function (id) { const p = E.getPedagogy(id); return p ? p.families : []; };

  // ── Visual expectation per topic (the missing layer) ──
  // essential    — a diagram/table is pedagogically required on (almost) every
  //                question; verify:visual-coverage demands >= 95% visual.
  // recommended  — a visual genuinely helps and must appear in a meaningful
  //                share; demands >= 30% visual.
  // optional     — the topic is naturally textual (pure algebra, abstract sign
  //                rules); no visual is required.
  E.VISUAL_EXPECTATION = {
    // essential — geometry figures
    'G7-01-ENGINE': 'essential', 'G7-02-ENGINE': 'essential', 'G7-03-ENGINE': 'essential',
    'G7-04-ENGINE': 'essential', 'G7-05-ENGINE': 'essential', 'G7-06-ENGINE': 'essential',
    'G8-01-ENGINE': 'essential', 'G8-02-ENGINE': 'essential', 'G8-03-ENGINE': 'essential',
    'G8-04-ENGINE': 'essential', 'G8-05-ENGINE': 'essential', 'G8-06-ENGINE': 'essential',
    'G8-07-ENGINE': 'essential', 'G8-08-ENGINE': 'essential', 'G8-09-ENGINE': 'essential',
    // essential — coordinate / number-line
    'N7-01-ENGINE': 'essential', 'N7-03-ENGINE': 'essential', 'N7-08-ENGINE': 'essential', 'N7-09-ENGINE': 'essential',
    // essential — scale
    'N8-03-ENGINE': 'essential',
    // essential — charts / probability / graphs
    'A7-05-ENGINE': 'essential',
    'U7-01-ENGINE': 'essential', 'U7-02-ENGINE': 'essential', 'U7-03-ENGINE': 'essential',
    'U7-04-ENGINE': 'essential', 'U7-05-ENGINE': 'essential', 'U7-06-ENGINE': 'essential',
    'U7-07-ENGINE': 'essential', 'U8-02-ENGINE': 'essential',
    'A8-01-ENGINE': 'essential', 'A8-02-ENGINE': 'essential',
    // recommended — visual strongly helps, present in a meaningful share
    'N7-04-ENGINE': 'recommended', 'N7-07-ENGINE': 'recommended', 'N7-10-ENGINE': 'recommended',
    'N7-11-ENGINE': 'recommended', 'N8-01-ENGINE': 'recommended', 'N8-02-ENGINE': 'recommended',
    'N8-04-ENGINE': 'recommended', 'N8-05-ENGINE': 'recommended',
    'U7-08-ENGINE': 'recommended', 'U8-01-ENGINE': 'recommended',
    // optional — naturally textual
    'A7-01-ENGINE': 'optional', 'A7-02-ENGINE': 'optional', 'A7-03-ENGINE': 'optional',
    'A7-04-ENGINE': 'optional', 'A8-03-ENGINE': 'optional',
    'N7-05-ENGINE': 'optional', 'N7-06-ENGINE': 'optional', 'N7-12-ENGINE': 'optional', 'N7-13-ENGINE': 'optional'
  };
  E.getVisualExpectation = function (id) {
    if (!id) return 'optional';
    const k = String(id).replace(/-ENGINE$/, '') + '-ENGINE';
    return E.VISUAL_EXPECTATION[k] || E.VISUAL_EXPECTATION[String(id)] || 'optional';
  };

  // ───────────────────────── NUMERIC (files 05, 07) ─────────────────────────
  topic('N7-01-ENGINE', {
    topicName: 'מערכת צירים — רביע ראשון', skill: 'מיקום וקריאת נקודות, אורך קטע, שטח על הרשת',
    learningGoal: 'התלמיד יסמן ויקרא נקודות ברביע הראשון, ימצא אורך קטע מקביל לציר ושטח מלבן על הרשת',
    teacherPurpose: 'ביסוס הבנת זוג סדור (x,y) והקשר בין קואורדינטות לצורה',
    misconceptions: ['החלפת x ב-y', 'ספירת נקודות במקום מרווחים', 'בלבול בין היקף לשטח'],
    followUpIdeas: ['השלימו צורה חסרה', 'מצאו קואורדינטה מתוך שטח נתון', 'בנו מלבן בעל שטח מבוקש'],
    requiredVisual: true,
    families: [
      fam('N7-01-plot-shape', 'plot_and_shape', 'שרטטו A(4,1) B(2,3) C(4,5) D(6,3), חברו וקבעו את הצורה', 'זיהוי צורה לפי מראה ולא לפי תכונות', ['מעוין', 'מלבן', 'ריבוע', 'משולש ישר-זווית'], ['רביע ראשון בלבד', 'קואורדינטות 0–10'], { requiredVisual: true }),
      fam('N7-01-read-coord', 'read_coordinate', 'מהם שיעורי הנקודה המסומנת?', 'קריאת y לפני x', ['נקודה אחת', 'מספר נקודות'], ['x לפני y'], { requiredVisual: true }),
      fam('N7-01-segment', 'segment_length_axis_parallel', 'חשבו אורך קטע AB המקביל לציר', 'ספירת נקודות במקום הפרש שיעורים', ['קטע אופקי', 'קטע אנכי'], ['קטע מקביל לציר בלבד'], { requiredVisual: true }),
      fam('N7-01-rect-area', 'rectangle_area_on_grid', 'חשבו שטח מלבן על הרשת / מצאו קודקוד חסר', 'חישוב היקף במקום שטח', ['חישוב שטח', 'קודקוד חסר', 'שטח→קואורדינטה'], ['צלעות מקבילות לצירים'], { requiredVisual: true })
    ]
  });
  topic('N7-03-ENGINE', {
    topicName: 'מספרים שליליים על ציר המספרים', skill: 'סדר, השוואה, ערך מוחלט ומספר נגדי',
    learningGoal: 'התלמיד ישווה ויסדר מספרים מכוונים ויבין ערך מוחלט ומספר נגדי',
    teacherPurpose: 'הרחבת עולם המספרים מהחיוביים אל המכוונים',
    misconceptions: ['מספר שלילי "גדול" כי ספרתו גדולה', 'ערך מוחלט יכול להיות שלילי'],
    followUpIdeas: ['סדרו רשימה מעורבת', 'מצאו מספר בין שני נתונים', 'סמנו נגדי על הציר'],
    requiredVisual: true,
    families: [
      fam('N7-03-order', 'order_negatives', 'סדרו מהקטן לגדול: −5, 3, −1, 0', 'סידור לפי מרחק מאפס', ['3–5 ערכים'], ['שמאלה = קטן יותר'], { requiredVisual: true }),
      fam('N7-03-compare', 'compare_negatives', 'איזה גדול: −4 או −2?', 'בחירת המספר עם הספרה הגדולה', ['שני שליליים', 'שלילי מול חיובי'], ['השוואה לפי מיקום על הציר'], { requiredVisual: true }),
      fam('N7-03-abs', 'absolute_and_opposite', 'חשבו |−7| ומצאו את הנגדי של −5', 'ערך מוחלט שלילי', ['ערך מוחלט', 'מספר נגדי'], ['ערך מוחלט אי-שלילי'], { requiredVisual: true }),
      fam('N7-03-place', 'place_on_number_line', 'בין אילו שלמים נמצא −3.5?', 'התעלמות מהסימן במיקום', ['שברים שליליים'], ['מספר שלילי משמאל לאפס'], { requiredVisual: true })
    ]
  });
  topic('N7-04-ENGINE', {
    topicName: 'חיבור וחיסור מספרים מכוונים', skill: 'חיבור/חיסור מכוונים, אומדן סימן',
    learningGoal: 'התלמיד יחבר ויחסר מספרים מכוונים ויאמוד סימן תוצאה',
    teacherPurpose: 'שליטה בכללי הסימנים בחיבור וחיסור',
    misconceptions: ['הסימן נקבע לפי הספרה הגדולה ולא לפי המרחק מאפס', 'חיסור שלילי כחיסור רגיל'],
    followUpIdeas: ['השלימו מחובר חסר', 'סמנו ללא חישוב מי שלילי', 'בנו תרגיל עם תוצאה נתונה'],
    families: [
      fam('N7-04-add-same', 'add_same_sign', '(−8)+(−5)', 'חיבור מרחקים אך איבוד הסימן', ['שני שליליים'], ['שומרים סימן משותף'], {}),
      fam('N7-04-add-diff', 'add_diff_sign', '(−7)+12', 'סימן לפי הספרה הגדולה', ['שלילי+חיובי'], ['סימן לפי הרחוק מאפס'], {}),
      fam('N7-04-sub-neg', 'subtract_negative', '5−(−3)', 'חיסור שלילי כחיסור', ['חיסור שלילי'], ['−(−b)=+b'], {}),
      fam('N7-04-missing', 'missing_addend', '(−6)+□=−2', 'חיבור במקום חיסור למציאת חסר', ['מחובר חסר'], ['בדיקה בהצבה'], {}),
      fam('N7-04-estimate', 'estimate_sign', 'בלי לחשב — לאילו תוצאה שלילית?', 'אמדן לפי גודל ספרות', ['רשימת תרגילים'], ['ללא חישוב מדויק'], {})
    ]
  });
  topic('N7-05-ENGINE', {
    topicName: 'כפל וחילוק מספרים מכוונים', skill: 'כללי סימנים בכפל וחילוק',
    learningGoal: 'התלמיד יכפיל ויחלק מספרים מכוונים לפי כללי הסימנים',
    teacherPurpose: 'ביסוס "סימנים זהים → חיובי, שונים → שלילי"',
    misconceptions: ['החלת כלל החיבור על כפל', 'טעות סימן בגורם חסר'],
    followUpIdeas: ['מצאו גורם חסר', 'שרשרת כפל מכוון', 'הסבירו את כלל הסימן'],
    families: [
      fam('N7-05-mul', 'directed_multiplication', '(−5)·8', 'סימן שגוי בכפל', ['≥1 גורם שלילי'], ['כלל הסימנים קבוע'], {}),
      fam('N7-05-div', 'directed_division', '(−24)÷6', 'סימן שגוי בחילוק', ['מנה שלמה'], ['אותם כללים כמו בכפל'], {}),
      fam('N7-05-missing', 'missing_factor', '(−4)·□=20', 'סימן שגוי בגורם החסר', ['גורם חסר'], ['בדיקה בהצבה'], {})
    ]
  });
  topic('N7-06-ENGINE', {
    topicName: 'חזקות: (−a)ⁿ לעומת −aⁿ', skill: 'סדר פעולות, סוגריים וסימני מינוס בחזקה',
    learningGoal: 'התלמיד יבחין על מה פועלת החזקה — על הבסיס או רק על המספר',
    teacherPurpose: 'בדיקת הבנת סדר פעולות וסימני מינוס',
    misconceptions: ['חישוב −3² כאילו הוא (−3)²'],
    followUpIdeas: ['השוו שני ביטויים דומים', 'מצאו טעות בפתרון תלמיד', 'כתבו ביטוי עם תוצאה הפוכה'],
    families: [
      fam('N7-06-paren-even', 'parentheses_even_exponent', '(−3)²', 'מינוס מחוץ לסוגריים', ['מעריך זוגי'], ['הבסיס בסוגריים שלילי'], {}),
      fam('N7-06-paren-odd', 'parentheses_odd_exponent', '(−2)³', 'בלבול סימן במעריך אי-זוגי', ['מעריך אי-זוגי'], ['מספר אי-זוגי של גורמים שליליים → שלילי'], {}),
      fam('N7-06-compare', 'compare_both', 'השוו (−3)² ל-−3²', 'הנחה ששני הביטויים שווים תמיד', ['השוואת שני ביטויים'], ['לא לטשטש בין מינוס כבסיס למינוס לפני חזקה'], {})
    ]
  });
  topic('N7-07-ENGINE', {
    topicName: 'שורש ריבועי', skill: 'שורש מדויק, אומדן, צלע מתוך שטח',
    learningGoal: 'התלמיד יחשב שורש מדויק, יאמוד שורש לא שלם וימצא צלע ריבוע',
    teacherPurpose: 'ביסוס הקשר בין ריבוע לשורש',
    misconceptions: ['√(a+b)=√a+√b', 'שורש = חצי המספר'],
    followUpIdeas: ['אמדו שורש בין שני שלמים', 'מצאו צלע מתוך שטח', 'הפריכו פיצול שורש של סכום'],
    families: [
      fam('N7-07-exact', 'exact_root', '√144', 'שורש כחצי המספר', ['ריבועים עד 144'], ['ריבועים מדויקים'], {}),
      fam('N7-07-between', 'estimate_between', 'בין אילו שלמים √50?', 'בחירת השלם הקרוב במקום הקטן', ['לא ריבוע מדויק'], ['בין שני ריבועים שלמים'], {}),
      fam('N7-07-side', 'side_from_area', 'שטח ריבוע 64 — מהי הצלע?', 'חלוקת השטח ב-2', ['שטח ריבוע'], ['צלע = שורש השטח'], {}),
      fam('N7-07-sum-trap', 'sum_under_root_trap', '√(9+16)', 'פיצול שורש של סכום', ['סכום מתחת לשורש'], ['√(a+b)≠√a+√b'], {})
    ]
  });
  topic('N8-01-ENGINE', {
    topicName: 'יחס', skill: 'צמצום יחס, חלוקה לפי יחס, השלמת יחס',
    learningGoal: 'התלמיד יצמצם יחס, יחלק כמות לפי יחס וישלים יחס שקול',
    teacherPurpose: 'ביסוס מושג היחס כיחס בין כמויות',
    misconceptions: ['צמצום צד אחד בלבד', 'חיבור במקום שמירת יחס'],
    followUpIdeas: ['חלקו פרס לפי יחס', 'מצאו כמות חסרה', 'בנו יחס שקול'],
    requiredVisual: true,
    families: [
      fam('N8-01-simplify', 'ratio_simplify', 'צמצמו 18:24', 'צמצום צד אחד', ['יחס מספרי'], ['חלוקה בשני הצדדים באותו מספר'], { requiredVisual: true }),
      fam('N8-01-share', 'ratio_share', 'חלקו 35 ביחס 2:3', 'כפל הכמות הכוללת בכל חלק', ['חלוקת כמות'], ['קודם מציאת גודל חלק'], { requiredVisual: true }),
      fam('N8-01-missing', 'ratio_missing', 'יחס 2:5, ידוע 8 — מצאו את החסר', 'חיבור במקום כפל בגורם', ['כמות חסרה'], ['שמירת יחס בכפל/חלוקה'], { requiredVisual: true })
    ]
  });
  topic('N8-02-ENGINE', {
    topicName: 'פרופורציה', skill: 'פתרון פרופורציה וזיהוי פרופורציה',
    learningGoal: 'התלמיד יפתור פרופורציה בכפל צולב ויזהה האם זוגות פרופורציוניים',
    teacherPurpose: 'ביסוס הקשר היחסי בין גדלים',
    misconceptions: ['השוואת סכומים במקום מכפלות', 'חיבור במקום כפל צולב'],
    followUpIdeas: ['קצב נסיעה', 'מתכון מוגדל', 'בדיקת פרופורציה'],
    requiredVisual: true,
    families: [
      fam('N8-02-missing', 'proportion_missing', 'השלימו a/b=x/d', 'כפל בלי חלוקה', ['נעלם במונה/מכנה'], ['כפל צולב'], { requiredVisual: true }),
      fam('N8-02-rate', 'proportion_rate', 'קצב: x ל-y זמן', 'חיבור במקום גורם יחס', ['קצב/מהירות'], ['שמירת קצב'], { requiredVisual: true }),
      fam('N8-02-verify', 'proportion_verify', 'האם 6:4 ו-9:6 פרופורציה?', 'השוואת סכומים', ['בדיקת זוגות'], ['כפל צולב שווה'], { requiredVisual: true })
    ]
  });
  topic('N8-03-ENGINE', {
    topicName: 'קנה מידה', skill: 'מעבר בין מפה למציאות ומציאות למפה',
    learningGoal: 'התלמיד יחשב מרחק אמיתי, מרחק במפה וקנה מידה',
    teacherPurpose: 'יישום פרופורציה בקנה מידה',
    misconceptions: ['ערבוב יחידות (ס״מ/ק״מ)', 'היפוך כיוון הכפל/חלוקה'],
    followUpIdeas: ['מצאו מרחק אמיתי', 'מצאו מרחק במפה', 'מצאו קנה מידה'],
    requiredVisual: true,
    families: [
      fam('N8-03-real', 'scale_real_distance', 'מפה 1:50000, 3 ס״מ — מרחק אמיתי?', 'תוצאה בס״מ במקום ק״מ', ['מפה→מציאות'], ['המרת יחידות'], { requiredVisual: true }),
      fam('N8-03-map', 'scale_map_distance', 'מרחק אמיתי נתון — כמה במפה?', 'כפל במקום חילוק', ['מציאות→מפה'], ['חלוקה בקנה המידה'], { requiredVisual: true }),
      fam('N8-03-factor', 'scale_factor', 'מצאו קנה מידה מנתונים', 'היפוך היחס', ['מציאת קנה מידה'], ['השוואת ס״מ לס״מ'], { requiredVisual: true })
    ]
  });
  topic('N8-04-ENGINE', {
    topicName: 'אחוזים — מצבים סטטיים', skill: 'אחוז מתוך כמות, מציאת שלם, מציאת אחוז',
    learningGoal: 'התלמיד יחשב אחוז מכמות, ימצא שלם וימצא אחוז',
    teacherPurpose: 'ביסוס שלוש בעיות האחוז הבסיסיות',
    misconceptions: ['חילוק במקום כפל באחוז', 'היפוך חלק/שלם'],
    followUpIdeas: ['אחוז מכמות', 'מציאת השלם', 'מציאת האחוז'],
    families: [
      fam('N8-04-of', 'percent_of_amount', '25% מתוך 80', 'חילוק במקום כפל', ['אחוז מכמות'], ['כפל בשבר האחוז'], {}),
      fam('N8-04-whole', 'percent_find_whole', '20 הם 25% — מהו השלם?', 'אחוז מהחלק', ['מציאת שלם'], ['חזרה אל 100%'], {}),
      fam('N8-04-pct', 'percent_find_percent', 'איזה אחוז 30 מתוך 120?', 'היפוך חלק/שלם', ['מציאת אחוז'], ['חלק חלקי שלם כפול 100'], {})
    ]
  });
  topic('N8-05-ENGINE', {
    topicName: 'אחוזים — מצבים דינמיים', skill: 'עלייה/ירידה באחוזים, ערך מקורי, שינוי דו-שלבי',
    learningGoal: 'התלמיד יחשב ערך לאחר שינוי באחוזים ויחזור לערך מקורי',
    teacherPurpose: 'הבנת אחוז כפעולה כפלית על בסיס',
    misconceptions: ['חיבור/חיסור האחוז כמספר', 'חישוב האחוז מהערך הסופי'],
    followUpIdeas: ['ייקור', 'הנחה', 'שינוי כפול ובדיקת חזרה'],
    families: [
      fam('N8-05-up', 'percent_increase', 'מחיר עלה ב-25%', 'חיבור האחוז כמספר', ['עלייה'], ['כפל ב-(1+p/100)'], {}),
      fam('N8-05-down', 'percent_decrease', 'מחיר ירד ב-20%', 'חיסור האחוז כמספר', ['ירידה'], ['כפל ב-(1−p/100)'], {}),
      fam('N8-05-orig', 'percent_original', 'אחרי עלייה הוא X — מה המקור?', 'אחוז מהסופי', ['מציאת מקור'], ['חלוקה בגורם השינוי'], {})
    ]
  });

  // ───────────────────────── ALGEBRA (files 01, 02, 08) ─────────────────────
  topic('A7-01-ENGINE', {
    topicName: 'ביטויים אלגבריים', skill: 'תרגום מילולי, פישוט, התאמת ביטוי',
    learningGoal: 'התלמיד יתרגם תיאור מילולי לביטוי אלגברי ויפשט איברים דומים',
    teacherPurpose: 'ביסוס מעבר בין שפה לביטוי אלגברי',
    misconceptions: ['"פי" כפעולת חיבור', 'חיבור איבר חופשי למקדם', 'שינוי חזקה בפישוט'],
    followUpIdeas: ['התאימו ביטוי לתיאור', 'בנו ביטוי לשני משתנים', 'מצאו טעות בפישוט'],
    families: [
      fam('A7-01-words', 'expression_from_words', 'מחיר n לכרטיס — מחיר 4 כרטיסים', 'חיבור במקום כפל', ['פי k', 'תוספת קבועה'], ['"פי"=כפל'], {}),
      fam('A7-01-simplify', 'simplify_like_terms', 'פשטו 3x+5x', 'שינוי חזקה / חיבור חופשי', ['איברים דומים', 'עם איבר חופשי'], ['מחברים מקדמים בלבד'], {}),
      fam('A7-01-match', 'match_expression', 'התאימו ביטוי לתיאור', 'תרגום שגוי של פעולה', ['גדול ב', 'פי', 'תשלום קבוע+משתנה'], ['כל פעולה מילולית→פעולה מתאימה'], {}),
      fam('A7-01-rect', 'rectangle_expression', 'היקף/שטח מלבן עם צלע פי k', 'בלבול היקף/שטח בביטוי', ['היקף', 'שטח'], ['שטח=מכפלה'], {}),
      fam('A7-01-two-var', 'two_variable_cost', 'עלות a-ל-X ו-b-ל-Y', 'כפל סך פריטים בסכום משתנים', ['שני מחירים'], ['מחירים שונים נפרדים'], {}),
      fam('A7-01-generalize', 'generalize_concrete_to_general', 'מהיקף/עלות קונקרטית → ביטוי כללי → הצבה', '"פי"/"כפול" כחיבור', ['משולש', 'דלק', 'כרטיסים'], ['כללי=כפל המשתנה', 'הצבה בסוף'], {}),
      fam('A7-01-sequence', 'sequence_general_term', 'האיבר ה-n בסדרה חשבונית', 'הוספת ההפרש n פעמים במקום (n−1)', ['הפרש חיובי', 'הפרש שלילי'], ['aₙ=a₁+(n−1)d מפושט'], {}),
      fam('A7-01-tower', 'tower_general_term', 'גובה מגדל n כוסות', 'התעלמות מ-(n−1) התוספות', ['גובה התחלתי+תוספת'], ['ביטוי תקף גם ל-n=1'], {}),
      fam('A7-01-mixed', 'simplify_mixed_terms', 'פשטו 5x−2x+3', 'איחוד איבר חופשי עם מקדם', ['עם איבר חופשי'], ['חופשי≠מקדם'], {}),
      fam('A7-01-equal', 'equal_expressions', 'האם a²=a·a? האם 3(x+2)=3x+6?', 'a²=2a / פילוג חלקי', ['חזקה', 'פילוג', 'כינוס'], ['שקילות לכל ערך'], {}),
      fam('A7-01-poly', 'polygon_perimeter_expression', 'ביטוי להיקף מצולע עם צלעות אלגבריות', 'אי-כינוס המספרים החופשיים', ['משולש', 'מרובע'], ['היקף=סכום הצלעות מפושט'], { answerFormat: 'ביטוי היקף מפושט + ערך בהצבה' })
    ]
  });
  topic('A7-02-ENGINE', {
    topicName: 'הצבה בביטוי', skill: 'הצבת ערך (כולל שלילי) בביטוי',
    learningGoal: 'התלמיד יציב ערכים, כולל שליליים, בביטוי ויחשב נכון',
    teacherPurpose: 'ביסוס משמעות המשתנה וההצבה',
    misconceptions: ['kx כחיבור', 'חזקה כפל ב-2', 'סימן שגוי בריבוע שלילי'],
    followUpIdeas: ['הציבו ערך שלילי', 'הציבו בביטוי עם חזקה', 'השוו שתי הצבות'],
    families: [
      fam('A7-02-pos', 'substitute_positive', 'ערך של 2x+7 ב-x=3', 'kx כחיבור', ['x חיובי'], ['kx=כפל'], {}),
      fam('A7-02-neg', 'substitute_negative', 'ערך של 3x+10 ב-x=−2', 'טעות סימן', ['x שלילי'], ['שמירת סימן'], {}),
      fam('A7-02-power', 'substitute_power', 'ערך של x²+c ב-x=−4', '(−a)² כ-−a²', ['ריבוע', 'בסיס שלילי'], ['(−a)²=a²'], {}),
      fam('A7-02-two', 'substitute_two_variables', 'ערך של Ab+Bc ב-b,c נתונים', 'איחוד שני המשתנים', ['שני משתנים', 'מקדם שלילי'], ['הצבת כל משתנה בנפרד', 'שמירת סימן'], {}),
      fam('A7-02-pow2', 'substitute_two_var_powers', 'ערך של h³+jk²+c', 'חזקה ככפל במעריך', ['חזקה שלישית', 'חזקה שנייה'], ['hⁿ=כפל עצמי'], {}),
      fam('A7-02-formula', 'substitute_applied_formula', 'הצבה בנוסחה: h=5t², F=1.8C+32', 't² כ-×2 / שכחת המחובר הקבוע', ['נפילה חופשית', 'צלזיוס↔פרנהייט'], ['סדר פעולות בנוסחה'], { answerFormat: 'ערך מספרי + הצבה מלאה בנוסחה' }),
      fam('A7-02-range', 'expression_value_range', 'אם x בין a ל-b, בין מה נמצא kx+c', 'הצבת מקדם בלבד / שכחת המחובר הקבוע', ['תחום ערכים'], ['הצבת שני קצות התחום בביטוי המלא'], { answerFormat: 'תחום ערכים (בין lo ל-hi) + הצבת שני הקצוות' })
    ]
  });
  topic('A7-03-ENGINE', {
    topicName: 'משוואות מדרגה ראשונה', skill: 'פתרון משוואה, פתיחת סוגריים, בדיקת פתרון, בניית משוואה מסיפור ובחירה לפי פתרון נתון',
    learningGoal: 'התלמיד יפתור משוואה מדרגה ראשונה, יבדוק פתרון, יבנה משוואה מהקשר מילולי ויזהה משוואה לפי פתרון נתון',
    teacherPurpose: 'ביסוס משמעות פתרון משוואה, איזון משוואה והמעבר מייצוג מילולי לייצוג אלגברי',
    misconceptions: ['אי-היפוך סימן בהעברת אגף', 'פתיחת סוגריים חלקית', 'בדיקה באגף אחד בלבד', 'בניית משוואה בלי סוגריים בהקשר של התייקרות', 'בחירת משוואה לפי מראה במקום הצבה'],
    followUpIdeas: ['פתרו עם סוגריים', 'בדקו פתרון נתון', 'בנו משוואה לפתרון נתון', 'בחרו משוואה שפתרונה נתון', 'מלאו משבצת כך שיתקבל פתרון מבוקש'],
    families: [
      fam('A7-03-one', 'one_step', 'x+7=12', 'כיוון פעולה הפוך', ['חיבור/חיסור'], ['פעולה הופכית'], {}),
      fam('A7-03-two', 'two_step', '3x+5=20', 'סדר פעולות שגוי', ['שני שלבים'], ['בידוד המשתנה'], {}),
      fam('A7-03-parens', 'parentheses_equation', '3(x+2)=21', 'פתיחת סוגריים חלקית', ['סוגריים'], ['חוק הפילוג מלא'], {}),
      fam('A7-03-verify', 'verify_solution', 'האם x=5 פתרון?', 'הצבה רק באגף אחד', ['בדיקת פתרון'], ['השוואת שני האגפים'], {}),
      fam('A7-03-word', 'build_equation_from_word_problem', 'בניית משוואה מבעיה מילולית ופתרונה', 'תרגום שגוי של היחס למשוואה', ['מחיר/כמות'], ['המשוואה מתארת את התנאי במדויק'], {}),
      fam('A7-03-identify', 'identify_equation_with_solution', 'איזו משוואה פתרונה x=s', 'בחירה ללא בדיקה בהצבה', ['בחירת משוואה'], ['בדיקת הפתרון בכל מועמדת'], {}),
      fam('A7-03-word-build', 'word_build_equation', 'מחיר כדור x; לאחר התייקרות ב-6 קנו 15 כמו 18 לפני — בנו 15(x+6)=18x', 'כתיבת 15x+6 במקום 15(x+6)', ['שאלת מחיר/כמות', 'משוואה מהקשר'], ['סוגריים לתיאור מחיר חדש לכל פריט'], {}),
      fam('A7-03-given-solution', 'given_solution_equation', 'סמנו את המשוואה שפתרונה x=10', 'בחירה לפי מראה בלי הצבה', ['בחירת משוואה', 'פתרון נתון'], ['מציבים את הערך בכל אפשרות'], {}),
      fam('A7-03-box', 'missing_box_for_solution', 'מה צריך לכתוב במשבצת כדי שפתרון המשוואה יהיה 1?', 'ניחוש החסר בלי להציב את הפתרון המבוקש', ['משבצת חסרה', 'פתרון נתון'], ['מציבים את הפתרון ואז מחשבים חסר'], {})
    ]
  });
  topic('A7-04-ENGINE', {
    topicName: 'ביטויים שקולים ופישוט', skill: 'פתיחת סוגריים, איברים דומים, גורם משותף ובדיקת זהות בין ביטויים',
    learningGoal: 'התלמיד יזהה וייצר ביטויים שקולים, ויקבע אם שני ביטויים שווים לכל ערך של המשתנה',
    teacherPurpose: 'ביסוס מושג השקילות האלגברית ומשמעות סימן השוויון כזהות ולא רק כתוצאת חישוב',
    misconceptions: ['פתיחת סוגריים חלקית', 'מינוס לפני סוגריים', 'חיבור איברים לא דומים', 'הנחה שביטויים שנראים שונים אינם שווים', 'הנחה שאותה אות מספיקה לשקילות'],
    followUpIdeas: ['בחרו ביטוי שקול', 'פשטו עם מינוס לפני סוגריים', 'הוציאו גורם משותף', 'בדקו אם שני ביטויים שווים לכל ערך', 'התאימו בין טורי ביטויים שקולים'],
    families: [
      fam('A7-04-plus-dist', 'plus_distribution', 'p(x+q)+rx', 'פתיחה חלקית', ['פילוג חיובי'], ['כפל על כל האיברים'], {}),
      fam('A7-04-minus-dist', 'minus_distribution', 'px−b(x−c)', 'אי-שינוי סימן', ['מינוס לפני סוגריים'], ['שינוי סימני כל האיברים'], {}),
      fam('A7-04-factor', 'factor_common', 'fx+fq', 'הוצאת גורם שגויה', ['גורם משותף'], ['גורם משותף מדויק'], {}),
      fam('A7-04-like', 'like_terms', 'ax+c−bx+d', 'חיבור איברים לא דומים', ['איברים דומים'], ['רק דומים מתאחדים'], {}),
      fam('A7-04-identity', 'identity_check', 'האם a·a ו-a² שווים? האם 2(t+3) ו-2t+3 שווים?', 'קביעה לפי מראה הביטויים במקום לפי חוקי החשבון', ['בדיקת זהות', 'שווים לכל ערך'], ['נימוק אלגברי או הצגת פישוט שקול'], {})
    ]
  });
  topic('A7-05-ENGINE', {
    topicName: 'טבלת ערכים וגרף ברביע ראשון', skill: 'בניית טבלת ערכים, סימון נקודות, קריאת גרף והמרה ביטוי↔טבלה↔גרף',
    learningGoal: 'התלמיד יבנה טבלת ערכים מתיאור או מביטוי, יסמן נקודות ברביע הראשון ויקרא ערכים מהגרף',
    teacherPurpose: 'חיבור הייצוג המילולי, האלגברי, הטבלאי והגרפי כבר בכיתה ז׳',
    misconceptions: ['החלפת x ו-y בסימון נקודה', 'קריאת ציר y במקום ציר x', 'סימון נקודות בלי להשלים טבלה', 'הנחה שכל גרף חייב להיות ישר'],
    followUpIdeas: ['השלימו טבלת ערכים', 'סמנו נקודות ברביע הראשון', 'מצאו ערך מתוך גרף', 'כתבו ביטוי שמתאים לגרף'],
    requiredVisual: true,
    families: [
      fam('A7-05-fuel', 'fuel_table_plot', 'מחיר ליטר דלק 7 שקלים — מלאו טבלה ושרטטו נקודות', 'החלפת שיעורי הנקודה', ['דלק', 'עלות לפי כמות'], ['רביע ראשון בלבד', 'ערכי x חיוביים'], { requiredVisual: true }),
      fam('A7-05-parking', 'parking_table_plot', 'עלות חניה: תשלום קבוע ועוד תשלום לכל שעה — טבלה וגרף', 'התעלמות מהתשלום הקבוע', ['חניה', 'תשלום קבוע+משתנה'], ['טבלה לפני סימון נקודות'], { requiredVisual: true }),
      fam('A7-05-square', 'square_area_graph', 'שטח ריבוע לפי אורך צלע — קראו מהגרף וכתבו ביטוי', 'הנחה ששטח משתנה בקצב קבוע', ['שטח ריבוע', 'גרף לא לינארי'], ['y=x²', 'רביע ראשון בלבד'], { requiredVisual: true }),
      fam('A7-05-fold', 'folded_paper_graph', 'קיפולי דף — מלאו טבלה וסמנו נקודות של שטח לאחר כל קיפול', 'הפחתת מספר קבוע במקום חלוקה פי 2', ['טבלת תופעה', 'גרף נקודות'], ['כל קיפול מחלק ב-2'], { requiredVisual: true })
    ]
  });
  topic('A8-01-ENGINE', {
    topicName: 'גרפים יישומיים ופונקציות', skill: 'קריאת גרף יישומי, סף, קצב, זיהוי פונקציה, השלמת טבלת ערכים ושרטוט נקודות',
    learningGoal: 'התלמיד יקרא ערכים, סף וקצב מגרף יישומי, יזהה פונקציה, ישלים טבלת ערכים ויקשר אותה לגרף ולשיפוע',
    teacherPurpose: 'חיבור בין הקשר מציאותי לגרף לינארי',
    misconceptions: ['קריאת x במקום y', 'התעלמות מערך התחלתי', 'התעלמות מקנה מידה', 'השלמת טבלה לפי חיבור קבוע בלי להציב בכלל'],
    followUpIdeas: ['מצאו סף', 'מצאו קצב', 'קבעו האם פונקציה', 'השלימו טבלת ערכים', 'שרטטו נקודות ומצאו שיפוע'],
    requiredVisual: true,
    families: [
      fam('A8-01-fuel', 'fuel_cost_graph', 'מחיר ליטר 7 — מתי העלות > 63?', 'התעלמות מקנה מידה', ['סף עלות'], ['עלות=מחיר·כמות'], { requiredVisual: true }),
      fam('A8-01-heat', 'heating_rate_graph', 'נוזל 8°C, קצב 10°/דקה', 'התעלמות מטמפ׳ התחלתית', ['קצב', 'ערך לאחר זמן'], ['התחלה+קצב·זמן'], { requiredVisual: true }),
      fam('A8-01-table', 'value_from_rule', 'y=3x+4, מה y ב-x=2?', 'הצבה חלקית', ['טבלת ערכים'], ['הצבה בכלל מלא'], { requiredVisual: true }),
      fam('A8-01-complete-table', 'complete_table_graph', 'השלימו טבלת ערכים לפי כלל, שרטטו נקודות ומצאו שיפוע', 'השלמה לפי חיבור/חיסור ב-x בלי להכפיל במקדם', ['טבלת ערכים', 'שרטוט נקודות', 'שיפוע'], ['מציבים בכלל לכל x', 'שיפוע=שינוי y לכל 1 ב-x'], { requiredVisual: true }),
      fam('A8-01-function', 'is_function', 'האם ההתאמה פונקציה?', 'בלבול קיום ערכים עם יחידות', ['זיהוי פונקציה'], ['לכל קלט פלט יחיד'], { requiredVisual: true })
    ]
  });
  topic('A8-02-ENGINE', {
    topicName: 'שיפוע ומשוואת ישר', skill: 'שיפוע משתי נקודות, ערך, עולה/יורדת, משוואה',
    learningGoal: 'התלמיד יחשב שיפוע, ערך ומשוואת ישר ויקבע מגמה',
    teacherPurpose: 'ביסוס מושג השיפוע כקצב שינוי',
    misconceptions: ['היפוך מונה/מכנה בשיפוע', 'בלבול שיפוע וחיתוך', 'kx כחיבור'],
    followUpIdeas: ['מצאו שיפוע', 'כתבו משוואה משתי נקודות', 'קבעו עולה/יורדת'],
    requiredVisual: true,
    families: [
      fam('A8-02-slope', 'slope_two_points', 'שיפוע דרך (0,1),(2,5)', 'היפוך מונה/מכנה', ['שתי נקודות'], ['Δy/Δx באותו סדר'], { requiredVisual: true }),
      fam('A8-02-value', 'value_at', 'y עבור x נתון', 'kx כחיבור', ['הצבה'], ['kx=כפל'], { requiredVisual: true }),
      fam('A8-02-rise', 'rising_falling', 'עולה או יורדת?', 'התעלמות מסימן שיפוע', ['מגמה'], ['סימן השיפוע קובע'], { requiredVisual: true }),
      fam('A8-02-eq', 'equation_from_points', 'משוואת ישר משתי נקודות', 'בלבול שיפוע וחיתוך', ['משוואה'], ['קודם שיפוע אז חיתוך'], { requiredVisual: true }),
      fam('A8-02-applied', 'applied_linear_read', 'קריאת ערך/סף מגרף יישומי', 'קריאת x במקום y', ['גרף יישומי'], ['קריאה לפי הציר הנכון'], { requiredVisual: true })
    ]
  });
  topic('A8-03-ENGINE', {
    topicName: 'מערכת משוואות', skill: 'מציאת שני נעלמים מתנאים, בדיקת זוג',
    learningGoal: 'התלמיד יפתור בעיה מילולית בשני נעלמים ויבדוק זוג פתרון',
    teacherPurpose: 'ביסוס פתרון מערכת בשני נעלמים',
    misconceptions: ['חיסור הפרש מסכום נותן את הגדול', 'בדיקה במשוואה אחת בלבד'],
    followUpIdeas: ['סכום והפרש', '"יותר מ"', 'בדיקת זוג פתרון'],
    families: [
      fam('A8-03-sum-diff', 'sum_and_difference', 'סכום s, הפרש d — מצאו את המספרים', 'חיסור נותן את הגדול', ['סכום והפרש'], ['חיבור משוואות'], {}),
      fam('A8-03-more', 'more_than', 'יחד s, לאחד k יותר', 'חצי+k שגוי', ['"יותר מ"'], ['שני התנאים יחד'], {}),
      fam('A8-03-verify', 'verify_pair', 'האם (x,y) פתרון המערכת?', 'בדיקה במשוואה אחת', ['בדיקת זוג'], ['שתי המשוואות מתקיימות'], {}),
      fam('A8-03-count', 'system_count_and_value', 'N מטבעות/בולים בערך כולל V — כמה מכל סוג', 'חלוקת הסכום הכולל בערך הגבוה בלבד', ['מטבעות', 'בולים', 'שני ערכים'], ['שתי משוואות: מספר וערך', 'חילוץ נעלם בהצבה'], { answerFormat: 'מספר פריטים מכל סוג + פתרון המערכת' })
    ]
  });

  // ───────────────────────── GEOMETRY (files 03, 04, 09) ────────────────────
  topic('G7-01-ENGINE', {
    topicName: 'מלבן ותיבה', skill: 'שטח/היקף מלבן, נפח תיבה, ממד חסר',
    learningGoal: 'התלמיד יחשב שטח והיקף מלבן, נפח תיבה וממד חסר',
    teacherPurpose: 'ביסוס נוסחאות מלבן ותיבה',
    misconceptions: ['בלבול שטח/היקף', 'חיבור ממדים במקום כפל בנפח'],
    followUpIdeas: ['מצאו צלע חסרה', 'נפח תיבה', 'גובה חסר מתוך נפח'],
    requiredVisual: true,
    families: [
      fam('G7-01-area', 'rectangle_area', 'שטח מלבן a·b', 'חיבור צלעות', ['שטח'], ['שטח=מכפלה'], { requiredVisual: true }),
      fam('G7-01-perim', 'rectangle_perimeter', 'היקף מלבן', 'כפל במקום סכום', ['היקף'], ['סכום כל הצלעות'], { requiredVisual: true }),
      fam('G7-01-missing', 'rectangle_missing_side', 'שטח/היקף ידוע — צלע חסרה', 'חיסור במקום חילוק', ['צלע חסרה'], ['פעולה הופכית מתאימה'], { requiredVisual: true }),
      fam('G7-01-volume', 'box_volume', 'נפח תיבה l·w·h', 'חיבור ממדים', ['נפח'], ['מכפלת שלושה ממדים'], { requiredVisual: true }),
      fam('G7-01-box-missing', 'box_missing_dim', 'נפח ידוע — ממד חסר', 'חיסור במקום חילוק', ['ממד חסר'], ['חילוק בשטח בסיס'], { requiredVisual: true })
    ]
  });
  topic('G7-02-ENGINE', {
    topicName: 'שטחי מצולעים', skill: 'שטח משולש, מקבילית, טרפז, גובה חסר',
    learningGoal: 'התלמיד יחשב שטחי מצולעים וימצא גובה חסר',
    teacherPurpose: 'ביסוס נוסחאות שטח והקשר ביניהן',
    misconceptions: ['אי-חלוקה ב-2 במשולש', 'חלוקה ב-2 במקבילית'],
    followUpIdeas: ['שטח משולש', 'שטח טרפז', 'גובה חסר ממשולש'],
    requiredVisual: true,
    families: [
      fam('G7-02-tri', 'triangle_area', 'שטח משולש b,h', 'אי-חלוקה ב-2', ['משולש'], ['חצי בסיס כפול גובה'], { requiredVisual: true }),
      fam('G7-02-para', 'parallelogram_area', 'שטח מקבילית', 'חלוקה מיותרת ב-2', ['מקבילית'], ['בסיס כפול גובה'], { requiredVisual: true }),
      fam('G7-02-trap', 'trapezoid_area', 'שטח טרפז', 'שכחת חלוקה ב-2', ['טרפז'], ['סכום בסיסים כפול גובה חלקי 2'], { requiredVisual: true }),
      fam('G7-02-missing-h', 'triangle_missing_height', 'שטח ידוע — גובה חסר', 'אי-הכפלה ב-2', ['גובה חסר'], ['h=2S/b'], { requiredVisual: true })
    ]
  });
  topic('G7-03-ENGINE', {
    topicName: 'משפט פיתגורס', skill: 'מציאת צלע, בדיקת משולש ישר-זווית, אלכסון מלבן',
    learningGoal: 'התלמיד ייישם את משפט פיתגורס למציאת צלע ובדיקת ישר-זווית',
    teacherPurpose: 'ביסוס הקשר בין צלעות במשולש ישר-זווית',
    misconceptions: ['חיבור רגיל של הניצבים במקום סכום ריבועים'],
    followUpIdeas: ['מצאו ניצב חסר', 'בדקו שלשה פיתגורית', 'אלכסון מלבן'],
    requiredVisual: true,
    families: [
      fam('G7-03-side', 'find_side', 'ניצבים 3,4 — יתר?', 'חיבור ניצבים', ['יתר', 'ניצב'], ['סכום ריבועים'], { requiredVisual: true }),
      fam('G7-03-check', 'check_right_triangle', 'האם 3,4,6 ישר-זווית?', 'הנחה שכל משולש ישר', ['בדיקת שלשה'], ['בדיקת השוויון'], { requiredVisual: true }),
      fam('G7-03-rect', 'rectangle_diagonal', 'אלכסון מלבן 3 על 4', 'חיבור צלעות לאלכסון', ['אלכסון מלבן'], ['היתר במשולש'], { requiredVisual: true })
    ]
  });
  topic('G7-04-ENGINE', {
    topicName: 'זווית חסרה במשולש', skill: 'סכום זוויות 180°, אפשרות משולש, סיווג',
    learningGoal: 'התלמיד ימצא זווית חסרה, יקבע אפשרות משולש ויסווג לפי זוויות',
    teacherPurpose: 'ביסוס סכום זוויות במשולש',
    misconceptions: ['חיבור שתי הזוויות במקום חיסור מ-180°', 'סיווג לפי הזווית הקטנה'],
    followUpIdeas: ['מצאו זווית חסרה', 'בדקו אפשרות', 'סווגו משולש'],
    requiredVisual: true,
    families: [
      fam('G7-04-missing', 'missing_angle', 'שתי זוויות נתונות — השלישית?', 'חיבור במקום חיסור מ-180°', ['זווית חסרה'], ['סכום 180°'], { requiredVisual: true }),
      fam('G7-04-possible', 'possible_triangle', 'האם הזוויות אפשריות?', 'בדיקה שכל זווית<180°', ['אפשרות משולש'], ['סכום בדיוק 180°'], { requiredVisual: true }),
      fam('G7-04-classify', 'classify_triangle', 'סווגו לפי הזוויות', 'סיווג לפי הקטנה', ['חד/ישר/קהה'], ['לפי הזווית הגדולה'], { requiredVisual: true })
    ]
  });
  topic('G8-01-ENGINE', {
    topicName: 'עיגול — היקף ושטח', skill: 'היקף ושטח עיגול, רדיוס מהיקף, אבחנת נוסחאות',
    learningGoal: 'התלמיד יחשב היקף ושטח עיגול ויבחין בין הנוסחאות',
    teacherPurpose: 'ביסוס נוסחאות העיגול והבחנה ביניהן',
    misconceptions: ['בלבול 2πr עם πr²', 'אי-חלוקה ב-2 ברדיוס מהיקף'],
    followUpIdeas: ['היקף מרדיוס', 'שטח מרדיוס', 'רדיוס מהיקף'],
    requiredVisual: true,
    families: [
      fam('G8-01-circ-r', 'circumference_from_radius', 'היקף עיגול שרדיוסו r', 'שימוש בנוסחת השטח', ['רדיוס'], ['C=2πr'], { requiredVisual: true }),
      fam('G8-01-area-r', 'area_from_radius', 'שטח עיגול שרדיוסו r', 'שימוש בנוסחת ההיקף', ['רדיוס'], ['S=πr²'], { requiredVisual: true }),
      fam('G8-01-circ-d', 'circumference_from_diameter', 'היקף מקוטר', 'כפל מיותר ב-2', ['קוטר'], ['C=πd'], { requiredVisual: true }),
      fam('G8-01-radius', 'radius_from_circumference', 'היקף kπ — רדיוס?', 'מחיקת π בלבד', ['רדיוס מהיקף'], ['חלוקה ב-2π'], { requiredVisual: true }),
      fam('G8-01-formula', 'formula_distinction', 'איזו נוסחה לשטח?', 'החלפת נוסחאות', ['אבחנת נוסחאות'], ['שטח עם r²'], { requiredVisual: true })
    ]
  });
  topic('G8-04-ENGINE', {
    topicName: 'דמיון משולשים', skill: 'יחס דמיון, צלע מתאימה, יחס שטחים, זיהוי דמיון',
    learningGoal: 'התלמיד ימצא יחס דמיון, צלע מתאימה ויחס שטחים',
    teacherPurpose: 'ביסוס מושג הדמיון והיחס',
    misconceptions: ['חיסור במקום חילוק ביחס', 'יחס שטחים כיחס צלעות'],
    followUpIdeas: ['יחס דמיון', 'צלע מתאימה', 'יחס שטחים'],
    requiredVisual: true,
    families: [
      fam('G8-04-factor', 'scale_factor', 'מצאו יחס דמיון', 'חיסור במקום חילוק', ['יחס דמיון'], ['מנת צלעות מתאימות'], { requiredVisual: true }),
      fam('G8-04-side', 'corresponding_side', 'צלע מתאימה ביחס k', 'חיבור במקום כפל', ['צלע מתאימה'], ['כפל ביחס'], { requiredVisual: true }),
      fam('G8-04-area', 'area_ratio', 'יחס שטחים ביחס k', 'יחס שטחים=יחס צלעות', ['יחס שטחים'], ['ריבוע יחס הדמיון'], { requiredVisual: true }),
      fam('G8-04-similar', 'is_similar', 'האם המשולשים דומים?', 'בדיקה לפי הפרש', ['זיהוי דמיון'], ['השוואת מנות'], { requiredVisual: true })
    ]
  });
  topic('G8-02-ENGINE', {
    topicName: 'גליל ופריסה', skill: 'נפח/שטח פנים גליל, פריסה',
    learningGoal: 'התלמיד יחשב נפח ושטח פנים של גליל ויזהה פריסה',
    teacherPurpose: 'ביסוס מבנה הגליל ופריסתו',
    misconceptions: ['2πrh כנפח', 'שכחת בסיסים בשטח פנים'],
    followUpIdeas: ['נפח גליל', 'שטח פנים כולל', 'זיהוי פריסה'],
    requiredVisual: true,
    families: [
      fam('G8-02-volume', 'cylinder_volume', 'נפח גליל r,h', '2πrh כנפח', ['נפח'], ['V=πr²h'], { requiredVisual: true }),
      fam('G8-02-surface', 'cylinder_surface', 'שטח פנים כולל', 'שכחת בסיסים', ['שטח פנים'], ['מעטפת+שני בסיסים'], { requiredVisual: true }),
      fam('G8-02-net', 'cylinder_net', 'איזו פריסה מתאימה?', 'בחירת פריסת תיבה', ['פריסה'], ['מלבן+שני עיגולים'], { requiredVisual: true })
    ]
  });
  topic('G8-03-ENGINE', {
    topicName: 'זוויות בין מקבילים', skill: 'זוויות מתאימות/מתחלפות/חד-צדדיות',
    learningGoal: 'התלמיד יזהה יחסי זוויות בין ישרים מקבילים וחותך',
    teacherPurpose: 'ביסוס משפטי הזוויות בין מקבילים',
    misconceptions: ['כל הזוויות שוות', 'התעלמות מזוויות חד-צדדיות משלימות'],
    followUpIdeas: ['זוויות מתאימות', 'זוויות חד-צדדיות', 'זיהוי סוג הזווית'],
    requiredVisual: true,
    families: [
      fam('G8-03-equal', 'corresponding_alternate', 'זוויות מתאימות/מתחלפות שוות', 'הנחה שכל הזוויות שוות', ['מתאימות', 'מתחלפות'], ['שוות בין מקבילים'], { requiredVisual: true }),
      fam('G8-03-supp', 'cointerior_supplementary', 'זוויות חד-צדדיות משלימות ל-180°', 'הנחת שוויון', ['חד-צדדיות'], ['סכום 180°'], { requiredVisual: true }),
      fam('G8-03-identify', 'identify_angle_relation', 'איזה סוג יחס בין הזוויות?', 'אי-זיהוי סוג הזווית', ['זיהוי יחס'], ['לפי מיקום מול החותך'], { requiredVisual: true })
    ]
  });
  topic('U7-01-ENGINE', {
    topicName: 'טבלת תדירות ותרשים עמודות', skill: 'ארגון נתונים גולמיים, קריאת תדירות, שכיח, סך, תדירות יחסית, קריאת תרשים',
    learningGoal: 'התלמיד יארגן נתונים בטבלת שכיחויות, יקרא טבלת תדירות ותרשים עמודות ויחשב תדירות יחסית',
    teacherPurpose: 'ביסוס ארגון נתונים וקריאתם',
    misconceptions: ['קריאת ערך כתדירות', 'תדירות יחסית כספירה', 'שכיח לפי הערך הגדול', 'כתיבת כל ערך פעם אחת בלי לספור מופעים'],
    followUpIdeas: ['ארגנו נתונים גולמיים בטבלה', 'קראו תדירות', 'מצאו שכיח', 'חשבו תדירות יחסית', 'קראו מתרשים'],
    requiredVisual: true,
    families: [
      fam('U7-01-read', 'read_frequency', 'מה התדירות של ערך?', 'קריאת הערך כתדירות', ['קריאת טבלה'], ['תדירות בעמודת התדירות'], { requiredVisual: true }),
      fam('U7-01-mode', 'most_frequent', 'מהו השכיח?', 'שכיח לפי הערך הגדול', ['שכיח'], ['לפי התדירות הגבוהה'], { requiredVisual: true }),
      fam('U7-01-total', 'total_count', 'כמה נבדקים בסך הכל?', 'סכום ערכים במקום תדירויות', ['סך'], ['סכום תדירויות'], { requiredVisual: true }),
      fam('U7-01-rel', 'relative_frequency', 'תדירות יחסית של ערך', 'תדירות יחסית כספירה', ['שבר/עשרוני/אחוז'], ['תדירות חלקי סך'], { requiredVisual: true }),
      fam('U7-01-raw', 'raw_to_table', 'לפניכם ציוני הכיתה — ארגנו בטבלת שכיחויות וחשבו תדירות יחסית', 'כתיבת כל ערך פעם אחת בלבד', ['נתונים גולמיים', 'טבלה ריקה', 'תדירות יחסית'], ['סופרים כל מופע; סכום התדירויות=מספר הנתונים'], { requiredVisual: true }),
      fam('U7-01-bar', 'bar_chart_read', 'קריאת ערך/קיצון/סך מתרשים', 'קריאת עמודה שכנה', ['תרשים עמודות'], ['קריאה לפי הסרגל'], { requiredVisual: true }),
      fam('U7-01-src-penguin', 'source_penguin_frequency_table', 'טבלת פינגווינים: סך הכול וחלק יחסי מתוך מקור 06', 'אחוז לפי המספר עצמו', ['טבלת שכיחויות', 'חלק יחסי'], ['חלק=תדירות/סך הכול'], { requiredVisual: true }),
      fam('U7-01-src-grades', 'source_grade_raw_to_table', 'נתונים גולמיים של ציונים → טבלת שכיחויות ושכיח', 'בחירת הערך הגדול כשכיח', ['נתונים גולמיים', 'שכיח'], ['שכיח לפי מספר הופעות'], { requiredVisual: true }),
      fam('U7-01-src-clubs', 'source_clubs_missing_frequency', 'חוגים: אחוזים, תדירויות חסרות ועמודות חסרות', 'אחוז=מספר תלמידים', ['אחוזים', 'תדירות חסרה', 'תרשים עמודות'], ['מציאת 100% ואז המרה לאחוזים'], { requiredVisual: true })
    ]
  });
  topic('U7-02-ENGINE', {
    topicName: 'הסתברות בסיסית', skill: 'הסתברות מקרה, משלים, קובייה',
    learningGoal: 'התלמיד יחשב הסתברות בסיסית ומשלימה',
    teacherPurpose: 'ביסוס מושג ההסתברות כיחס מקרים',
    misconceptions: ['מכנה כמספר הכישלונות', 'משלים כ-1+P'],
    followUpIdeas: ['הסתברות מקובייה', 'הסתברות מקופסה', 'הסתברות משלימה'],
    families: [
      fam('U7-02-die', 'die_probability', 'הסתברות בקובייה הוגנת', 'מכנה=כישלונות', ['קובייה'], ['מכנה=כל התוצאות'], {}),
      fam('U7-02-bag', 'bag_probability', 'הסתברות שליפת כדור', 'מכנה=צבע אחר בלבד', ['קופסה'], ['מכנה=סך הכדורים'], {}),
      fam('U7-02-complement', 'complement_probability', 'הסתברות "לא"', 'P(לא)=1+P', ['משלים'], ['P(לא A)=1−P(A)'], {}),
      fam('U7-02-spinner', 'expected_count_over_trials', 'כמה פעמים צפוי צבע ב-N סיבובי גלגל', 'בלבול בין הסתברות לתוחלת', ['גלגל מזל', 'מספר סיבובים'], ['תוחלת=(רצוי/סהכ)·N'], { answerFormat: 'מספר מקרים צפוי + חישוב' }),
      fam('U7-02-src-given-prob', 'given_probability_count', 'הסתברות נתונה → מספר עצמים והסתברות צבע נוסף', 'הפיכת המונה למספר העצמים', ['הסתברות נתונה', 'ספירה'], ['מספר=הסתברות·סך הכול'], {}),
      fam('U7-02-src-weather', 'weather_probability_complement', 'טבלת מזג אוויר: משלים והחלטה לפי סף', 'פירוש 0.50 כחצי יום', ['הסתברות משלימה', 'סף החלטה'], ['P(לא)=1−P'], {}),
      fam('U7-02-src-fairness', 'fairness_symmetry_probability', 'הסתברות וסימטריה: קובייה/מטבע לא הוגנים', 'הנחת 1/6 או 1/2 בלי סימטריה', ['סימטריה', 'הוגנות'], ['הסתברות שווה רק כאשר המודל סימטרי'], {}),
      fam('U7-02-src-forecast', 'forecast_interpretation', 'פירוש תחזית הסתברותית באחוזים', '30% פירושו 30% משעות היום', ['תחזית', 'שכיחות ארוכת טווח'], ['במצבים דומים רבים'], {})
    ]
  });
  topic('U7-03-ENGINE', {
    topicName: 'השוואת קבוצות — תדירות יחסית', skill: 'השוואה לפי k/n ולא לפי k',
    learningGoal: 'התלמיד ישווה קבוצות בגדלים שונים לפי שיעור יחסי',
    teacherPurpose: 'חשיפת מלכודת ההשוואה לפי ספירה מוחלטת',
    misconceptions: ['השוואת ספירות מוחלטות במקום שיעור'],
    followUpIdeas: ['חשבו שיעור לכל קבוצה', 'הסבירו מי "יותר"', 'בנו דוגמה הפוכה'],
    requiredVisual: true,
    families: [
      fam('U7-03-compare', 'compare_relative_frequency', 'כיתה א׳ n1,k1 מול כיתה ב׳ n2,k2', 'השוואת k בלבד', ['שתי קבוצות שונות בגודל'], ['חובה להשוות k/n'], { requiredVisual: true }),
      fam('U7-03-which', 'which_group_higher', 'באיזו קבוצה השיעור גבוה יותר?', 'בחירת הקבוצה הגדולה', ['בחירת קבוצה'], ['לפי השיעור'], { requiredVisual: true }),
      fam('U7-03-explain', 'explain_trap', 'הסבירו מדוע הגדולה אינה בהכרח "יותר"', 'התעלמות מגודל הקבוצה', ['הסבר מילולי'], ['שיעור מתוך כל קבוצה'], { requiredVisual: true }),
      fam('U7-03-src-transport', 'source_transport_relative_decision', 'תנועה: כלי רכב מול מספר נוסעים והחלטה יחסית', 'בחירה לפי ספירת כלי רכב בלבד', ['תדירות יחסית', 'הקשר החלטה'], ['השוואה לפי מה שמייצג המדד'], { requiredVisual: true }),
      fam('U7-03-src-free-throw', 'source_free_throw_relative_success', 'קליעות עונשין: הצלחה יחסית מול ספירה מוחלטת', '12 קליעות תמיד טוב מ-7', ['אחוז הצלחה', 'השוואת קבוצות'], ['השוואת k/n'], { requiredVisual: true }),
      fam('U7-03-src-target', 'source_equal_relative_target', 'כמה נדרש כדי להשוות שיעור יחסי בין כיתות', 'העתקת המספר המוחלט מהקבוצה השנייה', ['יעד יחסי', 'אחוז מקבוצה'], ['יעד=שיעור·גודל קבוצה'], { requiredVisual: true })
    ]
  });
  topic('U7-04-ENGINE', {
    topicName: 'קריאת ייצוגים חזותיים של נתונים', skill: 'קריאת ערך, קיצון, סך, פיקטוגרמה והמרה לטבלת שכיחויות',
    learningGoal: 'התלמיד יקרא ערכים, קיצון וסך מתרשים עמודות ומפיקטוגרמה, ויתאר נתונים בטבלת שכיחויות',
    teacherPurpose: 'ביסוס קריאת ייצוג גרפי של נתונים והבנת תפקיד המקרא',
    misconceptions: ['קריאת עמודה שכנה', 'הקיצון כסך הכל', 'כתיבת הסך הכול כתדירות של קטגוריה', 'ספירת סמלים בפיקטוגרמה בלי להכפיל במקרא'],
    followUpIdeas: ['קראו ערך לפי קטגוריה', 'המירו דיאגרמת עמודות לטבלה', 'מצאו גבוה/נמוך', 'חשבו סך', 'השתמשו במקרא של פיקטוגרמה'],
    requiredVisual: true,
    families: [
      fam('U7-04-value', 'read_value', 'כמה בקטגוריה X?', 'קריאת עמודה שכנה', ['קריאת ערך'], ['לפי גובה מול הסרגל'], { requiredVisual: true }),
      fam('U7-04-extreme', 'highest_lowest', 'איזו קטגוריה גבוהה/נמוכה?', 'בחירה לפי מיקום', ['קיצון'], ['השוואת גבהים'], { requiredVisual: true }),
      fam('U7-04-table', 'bar_to_table', 'תארו את הנתונים בדיאגרמת העמודות באמצעות טבלת שכיחויות', 'כתיבת הסך הכול במקום תדירות קטגוריה', ['המרה גרף→טבלה'], ['כל עמודה הופכת לשורת קטגוריה+תדירות'], { requiredVisual: true }),
      fam('U7-04-picto', 'pictogram_read', 'קראו פיקטוגרמה לפי מקרא וחישבו קטגוריה וסך הכול', 'ספירת סמלים בלי להכפיל במקרא', ['פיקטוגרמה', 'מקרא', 'סך הכול'], ['מספר סמלים × ערך הסמל'], { requiredVisual: true }),
      fam('U7-04-total', 'total_from_bars', 'מה הסך הכל?', 'הקיצון כסך', ['סך'], ['סכום כל העמודות'], { requiredVisual: true }),
      fam('U7-04-src-football', 'source_football_bar_to_table', 'כדורגל: דיאגרמת עמודות → טבלת שכיחויות וסך', 'העמודה הגבוהה כסך הכול', ['גרף→טבלה', 'סך'], ['כל עמודה היא קטגוריה אחת'], { requiredVisual: true }),
      fam('U7-04-src-bottles', 'source_bottle_bar_chart', 'איסוף בקבוקים: טבלה ודיאגרמת עמודות', 'בחירה לפי סדר בטבלה במקום גובה', ['בניית גרף', 'קיצון'], ['השוואת ערכי העמודות'], { requiredVisual: true }),
      fam('U7-04-src-smartphone', 'source_smartphone_missing_graph_table', 'סמארטפונים: השלמת טבלה מגרף וחישוב מדדים', 'בלבול שכיח וממוצע', ['גרף עמודות', 'טבלה חסרה', 'ממוצע'], ['קריאת עמודה ואז ממוצע משוקלל'], { requiredVisual: true })
    ]
  });
  topic('U8-01-ENGINE', {
    topicName: 'ממוצע, חציון, טווח', skill: 'חישוב מדדי מרכז ופיזור וניתוח השפעת שינוי נתונים',
    learningGoal: 'התלמיד יחשב ממוצע, חציון וטווח ויסביר כיצד שינוי נתונים משפיע על המדדים',
    teacherPurpose: 'ביסוס מדדי מרכז ופיזור וחשיבה על שינוי בנתונים',
    misconceptions: ['ממוצע כערך האמצעי', 'חציון בלי מיון', 'טווח כערך הגדול', 'הוספת אותו מספר משנה גם את הטווח', 'הוספת הפרש של ציון אחד ישירות לממוצע'],
    followUpIdeas: ['חשבו ממוצע', 'מצאו חציון', 'חשבו טווח', 'מצאו ערך חסר מממוצע', 'בדקו השפעת הוספת נקודות לכל הנתונים', 'חשבו ממוצע אחרי תיקון ציון'],
    families: [
      fam('U8-01-mean', 'mean', 'חשבו ממוצע סדרה', 'ממוצע כאמצעי', ['ממוצע'], ['סכום חלקי כמות'], {}),
      fam('U8-01-median', 'median', 'מצאו חציון', 'חציון בלי מיון', ['חציון'], ['אמצע לאחר מיון'], {}),
      fam('U8-01-range', 'range', 'חשבו טווח', 'טווח כערך גדול', ['טווח'], ['מקס פחות מין'], {}),
      fam('U8-01-missing', 'missing_from_mean', 'ערך חמישי לממוצע נתון', 'הערך=הממוצע', ['ערך חסר'], ['מסכום כולל'], {}),
      fam('U8-01-add', 'add_constant_effect', 'מוסיפים אותו מספר לכל הנתונים — מה קורה לממוצע, חציון וטווח?', 'הטווח גדל יחד עם כל ציון', ['השפעת שינוי אחיד'], ['ממוצע וחציון גדלים; טווח נשאר'], {}),
      fam('U8-01-replace', 'replace_value_mean', 'מתקנים ציון שגוי — חשבו ממוצע חדש', 'הוספת כל ההפרש ישירות לממוצע', ['תיקון נתון יחיד'], ['מעדכנים סכום כולל ואז מחלקים'], {}),
      fam('U8-01-fail', 'boost_failures_mean', 'מוסיפים נקודות רק לציונים נכשלים — חשבו ממוצע חדש', 'הוספת התוספת פעם אחת לממוצע', ['שינוי חלק מהנתונים'], ['סופרים כמה ציונים השתנו ומעדכנים את הסכום'], {}),
      fam('U8-01-src-combined', 'source_combined_mean_groups', 'ממוצע של קבוצות בגדלים שונים מתוך סכומים', 'ממוצע פשוט של ממוצעים', ['ממוצע משוקלל', 'סכומים'], ['ממוצע כולל מסכום כולל'], {}),
      fam('U8-01-src-salary', 'source_salary_outlier_measures', 'שכר מנהל חריג: שכיח, חציון, ממוצע והשפעת חריג', 'כל מדד משתנה כמו הממוצע', ['חריג', 'מדדי מרכז'], ['חציון ושכיח לפי מיקום/תדירות'], { requiredVisual: true }),
      fam('U8-01-src-monkey', 'source_monkey_reverse_measures', 'שחזור נתונים מממוצע, חציון, שכיח וטווח', 'הוספת קבוע משנה את הטווח', ['שחזור נתונים', 'השפעת שינוי אחיד'], ['בדיקת כל מדד בנפרד'], { requiredVisual: true }),
      fam('U8-01-src-smartphone', 'source_smartphone_distribution_measures', 'התפלגות שימוש בסמארטפון: טבלה, שכיח, ממוצע וביקורת', 'השכיח הוא הממוצע', ['ממוצע משוקלל', 'שכיח'], ['סכום שעות משוקלל חלקי תלמידים'], { requiredVisual: true }),
      fam('U8-01-src-flower', 'source_flower_field_measures', 'השוואת שדות פרחים לפי התפלגות, שכיח וממוצע צפוי', 'בחירה לפי התדירות הגדולה בלבד', ['התפלגות', 'שכיח', 'ממוצע'], ['בודקים היכן מרוכזות התדירויות'], { requiredVisual: true }),
      fam('U8-01-src-interp', 'source_interpolation_extrapolation', 'אינטרפולציה ואקסטרפולציה מטבלת/גרף מגמה', 'התייחסות לאומדן כוודאות', ['אומדן', 'מגמה'], ['אינטרפולציה בין נתונים; אקסטרפולציה בזהירות'], { requiredVisual: true })
    ]
  });
  topic('U8-02-ENGINE', {
    topicName: 'הסתברות מטבלה', skill: 'הסתברות מתא/שורה, משלים, השוואת קבוצות',
    learningGoal: 'התלמיד יחשב הסתברות מטבלה דו-ממדית',
    teacherPurpose: 'חיבור טבלה דו-ממדית להסתברות',
    misconceptions: ['מכנה שגוי', 'משלים 1+P', 'השוואת ספירות מוחלטות'],
    followUpIdeas: ['הסתברות מתא', 'הסתברות שורה', 'השוואה יחסית'],
    requiredVisual: true,
    families: [
      fam('U8-02-cell', 'prob_cell', 'הסתברות תא מסוים', 'מכנה=שורה בלבד', ['תא בטבלה'], ['מכנה=סך הכל'], { requiredVisual: true }),
      fam('U8-02-row', 'prob_row', 'הסתברות שורה שלמה', 'התעלמות מעמודה שנייה', ['שורה'], ['שתי העמודות'], { requiredVisual: true }),
      fam('U8-02-complement', 'prob_complement', 'הסתברות "לא"', 'משלים 1+P', ['משלים'], ['1−P'], { requiredVisual: true }),
      fam('U8-02-compare', 'compare_groups', 'באיזו קבוצה שיעור גבוה?', 'ספירה מוחלטת', ['השוואה'], ['השוואה יחסית'], { requiredVisual: true }),
      fam('U8-02-src-satisfaction', 'source_satisfaction_probability', 'הסתברות מתוך סקר שביעות רצון ותדירויות עמודות', 'תדירות כאחוז בלי חלוקה בסך', ['סקר', 'הסתברות מטבלה/גרף'], ['הסתברות=תדירות/סך'], { requiredVisual: true }),
      fam('U8-02-src-weather', 'source_weather_probability_table', 'טבלת הסתברות מזג אוויר: משלים ופירוש', '0.50 כחצי יום ודאי', ['טבלת הסתברות', 'משלים'], ['פירוש הסתברותי ולא משך זמן'], { requiredVisual: true }),
      fam('U8-02-src-athletics', 'source_athletics_multi_source', 'קפיצה לרוחק: שילוב גרף רוח וטבלת תוצאות', 'בחירה בתוצאה הגדולה בלי תנאי חוקיות', ['רב-מקור', 'סף חוקיות'], ['משלבים גרף וטבלה לפני החלטה'], { requiredVisual: true }),
      fam('U8-02-src-coffee', 'source_coffee_multi_source', 'עלות קפה: עוגת עלויות וגרף מחיר פולים', 'הכפלת כל העלות כאשר רק רכיב אחד השתנה', ['רב-מקור', 'אחוז מתוך עלות'], ['מעדכנים רק את הרכיב הרלוונטי'], { requiredVisual: true }),
      fam('U8-02-src-ticket', 'source_ticket_sales_extrapolation', 'מכירת כרטיסים: קצב שינוי ואקסטרפולציה זהירה', 'אומדן עתידי כוודאות', ['גרף קווי', 'אקסטרפולציה'], ['מגמה נותנת אומדן בלבד'], { requiredVisual: true })
    ]
  });

  // ───────── converted: last 9 dedicated engines (were fallback) ─────────
  // questionFamily ids below match the engine's internal `fam` branches in
  // source-fit-dedicated-2.js so per-question provenance (F3) is accurate.
  topic('G8-05-ENGINE', {
    topicName: 'זווית מרכזית וחלק מעיגול', skill: 'זווית מרכזית, חלק מהעיגול וגזרה',
    learningGoal: 'התלמיד יקשר בין אחוז מהעיגול לזווית מרכזית (·360°) וישווה גזרות',
    teacherPurpose: 'ביסוס הקשר חלק↔זווית מרכזית והבחנה ממעלות',
    misconceptions: ['אחוז כמעלות', 'כפל ב-100 במקום ב-360', 'בלבול זווית מרכזית עם היקפית'],
    followUpIdeas: ['זווית מרכזית מאחוז', 'אחוז מזווית', 'איזו גזרה גדולה יותר'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G8-05-angle_from_part', 'angle_from_part', 'זווית מרכזית מאחוז (אחוז·360°)', 'אחוז=מעלות', ['אחוז→זווית'], ['זווית=אחוז·360°'], { requiredVisual: true }),
      fam('G8-05-part_from_angle', 'part_from_angle', 'חלק מהעיגול מזווית מרכזית (זווית/360°)', 'הזווית כאחוז', ['זווית→אחוז'], ['חלק=זווית/360°'], { requiredVisual: true }),
      fam('G8-05-compare', 'compare', 'איזו גזרה גדולה יותר?', 'בחירה לפי מספר "עגול"', ['השוואת גזרות'], ['לפי הזווית המרכזית'], { requiredVisual: true })
    ]
  });
  topic('G8-07-ENGINE', {
    topicName: 'חפיפת משולשים לפי סימונים', skill: 'משפטי חפיפה צ.צ.צ / צ.ז.צ / ז.צ.ז',
    learningGoal: 'התלמיד יזהה את משפט החפיפה המתאים לסימונים ויבחין מנתון חלקי',
    teacherPurpose: 'ביסוס משפטי חפיפה והנמקה לפי סימונים ולא לפי מראה',
    misconceptions: ['חפיפה מנתון חלקי', 'הנמקה לפי מראה', 'ז.ז.ז כמשפט חפיפה'],
    followUpIdeas: ['זהו משפט חפיפה', 'השלימו נתון חסר', 'נמקו מדוע חופפים'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G8-07-name_theorem', 'name_theorem', 'לפי איזה משפט חפיפה?', 'בחירת ז.ז.ז', ['זיהוי משפט'], ['התאמת סימונים למשפט'], { requiredVisual: true }),
      fam('G8-07-missing_datum', 'missing_datum', 'אילו נתונים דרושים לחפיפה?', 'חפיפה מסימון חלקי', ['השלמת נתון'], ['נתונים מלאים למשפט'], { requiredVisual: true }),
      fam('G8-07-why', 'why', 'מדוע המשולשים חופפים?', 'הנמקה לפי מראה', ['הנמקה'], ['לפי משפט וסימונים'], { requiredVisual: true })
    ]
  });
  topic('G8-09-ENGINE', {
    topicName: 'דמיון וצללים', skill: 'דמיון משולשים ביישום גובה-וצל',
    learningGoal: 'התלמיד ייישם דמיון משולשים למציאת גובה עצם לפי צילו',
    teacherPurpose: 'יישום יחס דמיון בהקשר מציאותי והבחנה בין דמיון לחפיפה',
    misconceptions: ['יחס דמיון כהפרש', 'דמיון כחפיפה', 'גובה=אורך הצל'],
    followUpIdeas: ['גובה מצל', 'יחס הדמיון', 'מדוע מותר להשתמש בדמיון'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G8-09-find_height', 'find_height', 'גובה עצם מצל לפי דמיון', 'גובה=אורך הצל', ['גובה לא ידוע'], ['גובה/צל קבוע'], { requiredVisual: true }),
      fam('G8-09-find_ratio', 'find_ratio', 'מהו יחס הדמיון?', 'יחס כהפרש צללים', ['יחס דמיון'], ['יחס=מנה של צלעות מתאימות'], { requiredVisual: true }),
      fam('G8-09-why', 'why', 'מדוע מותר להשתמש בדמיון?', 'דמיון=חפיפה', ['הנמקה'], ['קרני שמש מקבילות→משולשים דומים'], { requiredVisual: true })
    ]
  });
  topic('G7-06-ENGINE', {
    topicName: 'שטח צורה מורכבת', skill: 'שטח בפירוק וחיסור (צורת L)',
    learningGoal: 'התלמיד יחשב שטח צורה מורכבת בפירוק לשני מלבנים או בחיסור',
    teacherPurpose: 'ביסוס פירוק שטחים וחיסור פינה חסרה',
    misconceptions: ['שכחת הפינה החסרה', 'חיבור צלעות במקום שטחים', 'כפל ממדים שגוי'],
    followUpIdeas: ['חישוב בחיסור', 'חישוב בפירוק', 'איתור טעות בשטח'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G7-06-subtract', 'subtract', 'שטח בחיסור: מלבן שלם פחות פינה חסרה', 'שכחת חיסור הפינה', ['חיסור'], ['שטח=מלא−חסר'], { requiredVisual: true }),
      fam('G7-06-decompose', 'decompose', 'שטח בפירוק לשני מלבנים', 'שכחת תת-מלבן', ['פירוק'], ['שטח=סכום המלבנים'], { requiredVisual: true }),
      fam('G7-06-perimeter', 'perimeter', 'היקף צורת ה-L', 'הנחה שחיתוך פינה מקטין את ההיקף', ['היקף'], ['חיתוך פינה שומר על ההיקף=2(a+b)'], { requiredVisual: true })
    ]
  });
  topic('G7-05-ENGINE', {
    topicName: 'הזזות ושיקופים', skill: 'טרנספורמציות איזומטריות במישור',
    learningGoal: 'התלמיד יזהה הזזה/שיקוף ויבין ששמירת הגודל היא תכונה איזומטרית',
    teacherPurpose: 'ביסוס משמעות איזומטריה — שמירת מרחקים וצורה',
    misconceptions: ['טרנספורמציה משנה גודל', 'בלבול בין סוגי הטרנספורמציה'],
    followUpIdeas: ['זיהוי הזזה', 'זיהוי שיקוף', 'מה נשמר בטרנספורמציה'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G7-05-translate', 'translate', 'זיהוי הזזה ומה נשמר', 'הזזה משנה גודל', ['הזזה'], ['איזומטריה — מרחקים נשמרים'], { requiredVisual: true }),
      fam('G7-05-reflect', 'reflect', 'זיהוי שיקוף ומה נשמר', 'שיקוף משנה גודל', ['שיקוף'], ['איזומטריה — מרחקים נשמרים'], { requiredVisual: true }),
      fam('G7-05-rotate', 'rotate', 'זיהוי סיבוב ומה נשמר', 'סיבוב משנה גודל', ['סיבוב'], ['איזומטריה — מרחקים נשמרים'], { requiredVisual: true })
    ]
  });
  topic('N7-10-ENGINE', {
    topicName: 'טעויות בחיבור וחיסור מכוונים', skill: 'ניתוח טעות סימן בחיבור/חיסור מכוונים',
    learningGoal: 'התלמיד יאתר ויתקן טעות סימן בחיבור/חיסור מספרים מכוונים',
    teacherPurpose: 'חידוד כלל הסימנים בחיבור וחיסור על ציר המספרים',
    misconceptions: ['סימן לפי הספרה הגדולה', 'התעלמות מכלל החיסור (חיבור הנגדי)'],
    followUpIdeas: ['מצאו את התוצאה הנכונה', 'אתרו טעות', 'תקנו פתרון'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('N7-10-add', 'add', 'נתחו חיבור מכוון ומצאו/תקנו טעות סימן', 'סימן לפי הספרה הגדולה', ['חיבור'], ['הסימן לפי הרחוק מאפס'], { requiredVisual: true }),
      fam('N7-10-subtract', 'subtract', 'נתחו חיסור מכוון (חיבור הנגדי) ומצאו/תקנו טעות', 'חיסור בלי הפיכת הנגדי', ['חיסור'], ['חיסור=חיבור הנגדי'], { requiredVisual: true }),
      fam('N7-10-three_terms', 'three_terms', 'נתחו ביטוי תלת-איברי משמאל לימין', 'טעות סימן בשלב ביניים', ['שלושה איברים'], ['פותרים שלב-שלב לפי הכלל'], { requiredVisual: true })
    ]
  });
  topic('N7-11-ENGINE', {
    topicName: 'חיבור וחיסור מכוונים בהקשר', skill: 'יישום מכוונים בהקשר מציאותי',
    learningGoal: 'התלמיד ייישם חיבור/חיסור מכוונים במצב מציאותי (טמפרטורה/מפלס/יתרה)',
    teacherPurpose: 'חיבור כלל הסימנים לכיוון השינוי בעולם האמיתי',
    misconceptions: ['התעלמות מכיוון השינוי', 'חיבור גודל בלי סימן'],
    followUpIdeas: ['טמפרטורה', 'מפלס מים', 'יתרת חשבון'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('N7-11-find_result', 'find_result', 'נתון מצב התחלתי ושינוי — מהו המצב הסופי?', 'התעלמות מכיוון השינוי', ['מצב סופי'], ['סופי=התחלתי+שינוי'], { requiredVisual: true }),
      fam('N7-11-find_change', 'find_change', 'נתון מצב התחלתי וסופי — מהו השינוי?', 'חיסור בכיוון ההפוך', ['גודל השינוי'], ['שינוי=סופי−התחלתי'], { requiredVisual: true }),
      fam('N7-11-find_start', 'find_start', 'נתון שינוי ומצב סופי — מהו המצב ההתחלתי?', 'פעולה במקום הפעולה ההפוכה', ['מצב התחלתי'], ['התחלתי=סופי−שינוי'], { requiredVisual: true })
    ]
  });
  topic('N7-12-ENGINE', {
    topicName: 'טעויות בכפל וחילוק מכוונים', skill: 'ניתוח טעות סימן בכפל/חילוק מכוונים',
    learningGoal: 'התלמיד יאתר ויתקן טעות סימן בכפל/חילוק מספרים מכוונים',
    teacherPurpose: 'חידוד כלל הסימנים בכפל וחילוק (זהים→חיובי, שונים→שלילי)',
    misconceptions: ['החלת כלל החיבור על כפל', 'טעות בסימן התוצאה'],
    followUpIdeas: ['מצאו תוצאה נכונה', 'אתרו טעות', 'תקנו'],
    engineSupport: 'dedicated', status: 'active',
    families: [
      fam('N7-12-multiply', 'multiply', 'נתחו כפל מכוון ומצאו/תקנו טעות סימן', 'כלל החיבור מוחל על כפל', ['כפל'], ['סימנים זהים→חיובי, שונים→שלילי'], {}),
      fam('N7-12-divide', 'divide', 'נתחו חילוק מכוון ומצאו/תקנו טעות סימן', 'טעות סימן במנה', ['חילוק'], ['סימנים זהים→חיובי, שונים→שלילי'], {}),
      fam('N7-12-three_factors', 'three_factors', 'מכפלת שלושה גורמים מכוונים', 'התעלמות ממספר הגורמים השליליים', ['שלושה גורמים'], ['מספר שליליים זוגי→חיובי, אי-זוגי→שלילי'], {})
    ]
  });
  topic('N7-13-ENGINE', {
    topicName: 'כללי סימנים בכפל וחילוק', skill: 'יישום כלל הסימנים בכפל וחילוק',
    learningGoal: 'התלמיד ייישם את כלל הסימנים לקביעת סימן תוצאת כפל/חילוק',
    teacherPurpose: 'ביסוס כלל הסימנים והבחנה מכללי החיבור',
    misconceptions: ['בלבול עם כללי החיבור', 'קביעת סימן שגויה'],
    followUpIdeas: ['סימן בכפל', 'סימן בחילוק', 'השוואה לכללי חיבור'],
    engineSupport: 'dedicated', status: 'active',
    families: [
      fam('N7-13-product_sign', 'product_sign', 'קבעו את סימן המכפלה של שני מספרים', 'בלבול עם כללי החיבור', ['כפל'], ['זהים→חיובי, שונים→שלילי'], {}),
      fam('N7-13-quotient_sign', 'quotient_sign', 'קבעו את סימן המנה של שני מספרים', 'בלבול עם כללי החיבור', ['חילוק'], ['זהים→חיובי, שונים→שלילי'], {}),
      fam('N7-13-three_factor_sign', 'three_factor_sign', 'קבעו את סימן מכפלת שלושה מספרים', 'התעלמות ממספר השליליים', ['שלושה גורמים'], ['מספר שליליים זוגי→חיובי, אי-זוגי→שלילי'], {})
    ]
  });

  // ───────── converted: 8 dedicated engines (were fallback) ─────────
  topic('U7-05-ENGINE', {
    topicName: 'דיאגרמת עוגה ושכיחות יחסית', skill: 'זווית מרכזית מאחוז, אחוז חסר, גזרה גדולה',
    learningGoal: 'התלמיד יחשב זווית מרכזית מאחוז ויקרא דיאגרמת עוגה',
    teacherPurpose: 'חיבור אחוז לזווית מרכזית (·360°)',
    misconceptions: ['אחוז כמעלות', 'כפל ב-100 במקום ב-360', 'גזרה גדולה לפי סדר במקרא'],
    followUpIdeas: ['חשבו זווית מרכזית', 'מצאו אחוז חסר', 'זהו את הגזרה הגדולה'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('U7-05-angle', 'pie_central_angle', 'זווית מרכזית מאחוז (·3.6°)', 'אחוז=מעלות', ['גזרה'], ['זווית=אחוז·360°'], { requiredVisual: true }),
      fam('U7-05-missing', 'pie_missing_percent', 'מצאו את האחוז החסר (סכום 100%)', 'התעלמות מסכום 100%', ['אחוז חסר'], ['סכום הגזרות 100%'], { requiredVisual: true }),
      fam('U7-05-largest', 'pie_largest_sector', 'איזו גזרה הגדולה ביותר?', 'בחירה לפי סדר במקרא', ['גזרה גדולה'], ['לפי האחוז'], { requiredVisual: true }),
      fam('U7-05-src-color', 'source_favorite_color_total_from_pie', 'צבע אהוב: אחוז חסר בעוגה ומציאת סך מתוך חלק', 'חלוקה באחוז הלא-רלוונטי', ['דיאגרמת עוגה', 'סך מתוך חלק'], ['סך=חלק/אחוז'], { requiredVisual: true }),
      fam('U7-05-src-phone', 'source_phone_ten_sector_model', 'שיחות טלפון: מעבר מטבלה לדגם עיגול של 10 חלקים', 'אחוז כמספר שיחות', ['ייצוג בעשיריות', 'שכיחות יחסית'], ['חלק יחסי=תדירות/סך'], { requiredVisual: true }),
      fam('U7-05-src-club', 'source_club_missing_percent', 'חוגים: מציאת אחוז חסר בעוגה/טבלה', 'חיסור רק קטגוריה אחת', ['אחוז חסר', 'סכום 100%'], ['סכום כל האחוזים 100%'], { requiredVisual: true })
    ]
  });
  topic('U7-06-ENGINE', {
    topicName: 'תרשים מטעה — ביקורת', skill: 'זיהוי ציר קטוע וייצוג מטעה',
    learningGoal: 'התלמיד יזהה מדוע תרשים מטעה ויציע ייצוג ניטרלי',
    teacherPurpose: 'פיתוח קריאה ביקורתית של גרפים',
    misconceptions: ['הסקה לפי גובה עמודה בלי לבדוק את הציר', 'גידול נראה=גידול אמיתי'],
    followUpIdeas: ['מדוע מטעה?', 'הציעו תיקון', 'חשבו את הגידול האמיתי'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('U7-06-identify', 'identify_misleading', 'מדוע התרשים מטעה?', 'התעלמות מציר y קטוע', ['ציר קטוע'], ['ציר y מתחיל ב-0'], { requiredVisual: true }),
      fam('U7-06-fix', 'propose_fair_representation', 'הציעו ייצוג ניטרלי', 'הנחה שהתרשים הוגן', ['תיקון'], ['ציר מ-0'], { requiredVisual: true }),
      fam('U7-06-real', 'real_change', 'חשבו את הגידול האמיתי', 'גידול נראה=אמיתי', ['גידול %'], ['הפרש ביחס לבסיס'], { requiredVisual: true }),
      fam('U7-06-src-medicine', 'source_medicine_misleading_3d', 'תרופות: גרף תלת-ממדי/קטוע מול הפרש אמיתי', 'רושם חזותי כיחס מספרי אמיתי', ['גרף מטעה', 'הפרש נקודות אחוז'], ['בודקים את המספרים והציר'], { requiredVisual: true }),
      fam('U7-06-src-audience', 'source_choose_graph_audience', 'בחירת גרף לקהל יעד: שיווק מול ועדת אתיקה', 'הנחה שכל גרף עם אותם מספרים הוגן באותה מידה', ['מטרת ייצוג', 'ציר y'], ['ייצוג הוגן מול ייצוג משכנע'], { requiredVisual: true }),
      fam('U7-06-src-ethics', 'source_representational_ethics', 'כללי ביקורת לייצוג גרפי הוגן', 'מספרים אמיתיים מספיקים למניעת הטיה', ['ביקורת גרפים', 'אתיקה של ייצוג'], ['בודקים ציר, קנה מידה ופרספקטיבה'], { requiredVisual: true })
    ]
  });
  topic('U7-07-ENGINE', {
    topicName: 'טבלת שכיחויות ושכיחות יחסית', skill: 'קריאת תדירות, תדירות יחסית, סך',
    learningGoal: 'התלמיד יקרא טבלת תדירות ויחשב שכיחות יחסית',
    teacherPurpose: 'ביסוס ארגון נתונים וקריאתם',
    misconceptions: ['תדירות יחסית כספירה', 'קריאת ערך כתדירות', 'סך כסכום ערכים'],
    followUpIdeas: ['קראו תדירות', 'חשבו תדירות יחסית', 'חשבו סך'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('U7-07-read', 'read_frequency', 'מהי התדירות של ערך?', 'קריאת הערך כתדירות', ['קריאה'], ['בעמודת התדירות'], { requiredVisual: true }),
      fam('U7-07-relative', 'relative_frequency', 'חשבו תדירות יחסית', 'תדירות יחסית כספירה', ['שבר/אחוז'], ['תדירות חלקי סך'], { requiredVisual: true }),
      fam('U7-07-total', 'total_count', 'כמה נבדקים בסך הכול?', 'סכום ערכים במקום תדירויות', ['סך'], ['סכום תדירויות'], { requiredVisual: true })
    ]
  });
  topic('U7-08-ENGINE', {
    topicName: 'ממוצע, חציון וטווח', skill: 'מדדי מרכז ופיזור',
    learningGoal: 'התלמיד יחשב ממוצע, חציון וטווח',
    teacherPurpose: 'ביסוס מדדים סטטיסטיים',
    misconceptions: ['ממוצע כערך אמצעי', 'חציון בלי מיון', 'טווח כערך גדול'],
    followUpIdeas: ['חשבו ממוצע', 'מצאו חציון', 'חשבו טווח'],
    engineSupport: 'dedicated', status: 'active',
    families: [
      fam('U7-08-mean', 'mean', 'חשבו ממוצע סדרה', 'ממוצע כאמצעי', ['ממוצע'], ['סכום חלקי כמות'], {}),
      fam('U7-08-median', 'median', 'מצאו חציון', 'חציון בלי מיון', ['חציון'], ['אמצע לאחר מיון'], {}),
      fam('U7-08-range', 'range', 'חשבו טווח', 'טווח כערך גדול', ['טווח'], ['מקס פחות מין'], {}),
      fam('U7-08-src-average-total', 'source_average_total_reasoning', 'ממוצע כחלוקת סכום: מציאת סך וממוצע כולל', 'ממוצע של ממוצעים בלי משקל', ['ממוצע', 'סכום כולל'], ['סכום=ממוצע·כמות'], {}),
      fam('U7-08-src-shells', 'source_shell_average_constraints', 'ממוצע צדפים: אילוצים ודוגמאות אפשריות', 'ממוצע מחייב שכל ערך שווה לו', ['ממוצע', 'אילוץ'], ['ממוצע מתאר סכום, לא שוויון של כל הערכים'], {}),
      fam('U7-08-src-satisfaction', 'source_satisfaction_survey_measures', 'סקר שביעות רצון: סך, שכיח וממוצע משוקלל', 'שכיח כאמצע הסולם', ['שכיח', 'ממוצע משוקלל'], ['שכיח לפי תדירות; ממוצע לפי סכום משוקלל'], { requiredVisual: true })
    ]
  });
  topic('G8-06-ENGINE', {
    topicName: 'קוטר, רדיוס ומיתר', skill: 'יסודות העיגול והקשרים ביניהם',
    learningGoal: 'התלמיד יבחין בין קוטר, רדיוס ומיתר ויקשר ביניהם',
    teacherPurpose: 'ביסוס מושגי העיגול',
    misconceptions: ['מיתר=קוטר', 'רדיוס כמיתר', 'קוטר=רדיוס'],
    followUpIdeas: ['זהו חלק בעיגול', 'קוטר מרדיוס', 'מיתר ארוך ביותר'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G8-06-identify', 'identify_part', 'זהו רדיוס/מיתר/קוטר', 'בלבול בין החלקים', ['חלקי עיגול'], ['רדיוס ממרכז לנקודה'], { requiredVisual: true }),
      fam('G8-06-relation', 'radius_diameter_relation', 'קוטר מרדיוס', 'קוטר=רדיוס', ['יחס קוטר-רדיוס'], ['קוטר=2r'], { requiredVisual: true }),
      fam('G8-06-longest', 'longest_chord', 'המיתר הארוך ביותר', 'רדיוס כמיתר ארוך', ['מיתר ארוך'], ['קוטר=המיתר הארוך'], { requiredVisual: true })
    ]
  });
  topic('G8-08-ENGINE', {
    topicName: 'משולש שווה-שוקיים', skill: 'זוויות בסיס וראש, סיווג',
    learningGoal: 'התלמיד ייישם תכונות משולש שווה-שוקיים',
    teacherPurpose: 'ביסוס תכונות שווה-שוקיים',
    misconceptions: ['זוויות בסיס שונות', 'אי-חלוקה ב-2 בזוויות הבסיס', 'סיווג לפי הזווית הקטנה'],
    followUpIdeas: ['מצאו זווית ראש', 'מצאו זוויות בסיס', 'סווגו משולש'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('G8-08-apex', 'find_apex', 'זוויות בסיס נתונות — זווית הראש?', 'זווית ראש=זווית בסיס', ['זווית ראש'], ['180−2·בסיס'], { requiredVisual: true }),
      fam('G8-08-base', 'find_base_angles', 'זווית ראש נתונה — זוויות הבסיס?', 'אי-חלוקה ב-2', ['זוויות בסיס'], ['(180−ראש)/2'], { requiredVisual: true }),
      fam('G8-08-classify', 'classify_isosceles', 'סווגו לפי הזוויות', 'סיווג לפי הקטנה', ['חד/ישר/קהה'], ['לפי הזווית הגדולה'], { requiredVisual: true })
    ]
  });
  topic('N7-08-ENGINE', {
    topicName: 'ציר מספרים והשוואת שליליים', skill: 'סדר והשוואה על הציר',
    learningGoal: 'התלמיד ישווה ויסדר שליליים על הציר',
    teacherPurpose: 'ביסוס סדר על ציר המספרים',
    misconceptions: ['מספר שלילי גדול כי ספרתו גדולה', 'סידור לפי מרחק מאפס'],
    followUpIdeas: ['סדרו רשימה', 'השוו שניים', 'מצאו בין שניים'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('N7-08-order', 'order_negatives', 'סדרו מהקטן לגדול', 'סידור לפי מרחק מאפס', ['סדר'], ['שמאלה קטן יותר'], { requiredVisual: true }),
      fam('N7-08-compare', 'compare_negatives', 'איזה גדול יותר?', 'ספרה גדולה=מספר גדול', ['השוואה'], ['לפי מיקום על הציר'], { requiredVisual: true }),
      fam('N7-08-between', 'integer_between', 'איזה שלם בין שניים?', 'בחירת מספר מחוץ לתחום', ['בין שניים'], ['בתחום הנתון'], { requiredVisual: true })
    ]
  });
  topic('N7-09-ENGINE', {
    topicName: 'מספר נגדי וערך מוחלט', skill: 'נגדי וערך מוחלט',
    learningGoal: 'התלמיד יבין מספר נגדי וערך מוחלט',
    teacherPurpose: 'ביסוס מושג הנגדי והערך המוחלט',
    misconceptions: ['ערך מוחלט שלילי', 'נגדי=המספר עצמו', 'נגדי=ערך מוחלט'],
    followUpIdeas: ['מצאו נגדי', 'חשבו ערך מוחלט', 'נגדי בהקשר'],
    requiredVisual: true, engineSupport: 'dedicated', status: 'active',
    families: [
      fam('N7-09-opposite', 'opposite_number', 'מהו המספר הנגדי?', 'נגדי=המספר עצמו', ['נגדי'], ['אותו מרחק מאפס, צד שני'], { requiredVisual: true }),
      fam('N7-09-absolute', 'absolute_value', 'חשבו ערך מוחלט', 'ערך מוחלט שלילי', ['ערך מוחלט'], ['מרחק מאפס, אי-שלילי'], { requiredVisual: true }),
      fam('N7-09-context', 'opposite_in_context', 'נגדי/ערך מוחלט בהקשר', 'בלבול נגדי וערך מוחלט', ['טמפרטורה/גובה'], ['כיוון=סימן, גודל=ערך מוחלט'], { requiredVisual: true })
    ]
  });
})();
