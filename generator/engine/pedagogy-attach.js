// generator/engine/pedagogy-attach.js
// Backward-compatible enrichment: wraps E.getEngineExercise so every returned
// exercise also carries a `meta` block (source + pedagogy). Old renderers that
// read only questionHTML/answerHTML keep working untouched.
// Loaded after all engine + source-fit files, before exercise-set.js.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const DIFFICULTY_PROFILE = {
    basic: {
      label: 'רמה 1',
      cognitiveDemand: 'זיהוי ויישום ישיר של רעיון אחד',
      teacherMove: 'בודקים שהייצוג, הנתון והשאלה נקראים נכון לפני חישוב.',
      scaffoldHint: 'להקטין מספרים, להדגיש נתון מפתח, ולבקש מהתלמיד לומר בקול מה מחפשים.',
      stretchPrompt: 'לבקש נימוק קצר או דוגמה נגדית פשוטה.',
      evidenceLookFor: 'התלמיד מצביע על הנתון הרלוונטי ומבצע פעולה אחת נקייה.'
    },
    standard: {
      label: 'רמה 2',
      cognitiveDemand: 'בחירת דרך פתרון מתוך כמה נתונים או ייצוגים',
      teacherMove: 'בודקים אם התלמיד בוחר אסטרטגיה ולא רק מפעיל פעולה אוטומטית.',
      scaffoldHint: 'לפרק לשני צעדים: מה ידוע, מה צריך, ואז איזו פעולה מחברת ביניהם.',
      stretchPrompt: 'לבקש פתרון בדרך נוספת או הסבר לטעות אפשרית.',
      evidenceLookFor: 'התלמיד מארגן את הנתונים ומנמק את הבחירה בפעולה.'
    },
    challenge: {
      label: 'רמה 3',
      cognitiveDemand: 'העברה, ביקורת טעות או שילוב כמה צעדים',
      teacherMove: 'בודקים עומק: האם התלמיד מזהה מלכודת, מנמק, ומשווה בין ייצוגים.',
      scaffoldHint: 'לתת רמז רעיוני במקום פעולה: איזה כלל נשבר כאן? איזה ייצוג יעזור?',
      stretchPrompt: 'לבקש הכללה, שינוי תנאי או בניית שאלה דומה קשה יותר.',
      evidenceLookFor: 'התלמיד מסביר למה הדרך נכונה ומדוע המסיח או הטעות אינם נכונים.'
    }
  };

  E.getDifficultyProfile = function (difficulty) {
    return DIFFICULTY_PROFILE[difficulty] || DIFFICULTY_PROFILE.standard;
  };

  // family: the questionFamily the engine actually generated this call (provenance).
  // It is honoured only if it is a registered family of this topic; otherwise we
  // fall back to the topic's primary family. familyProvenance records which path
  // was taken so verifiers/gallery can distinguish exact vs default.
  E.buildMeta = function (id, qtype, difficulty, family) {
    const s = (typeof E.getSource === 'function' && E.getSource(id)) || {};
    const p = (typeof E.getPedagogy === 'function' && E.getPedagogy(id)) || {};
    const fams = (p.families || []);
    const primary = (fams[0] && fams[0].questionFamily) || null;
    const matched = family && fams.some(function (f) { return f.questionFamily === family; });
    const matchedFam = matched ? fams.find(function (f) { return f.questionFamily === family; }) : null;
    const level = E.getDifficultyProfile(difficulty);
    return {
      sourceFile: s.sourceFile || null,
      sourceId: s.sourceId || (id ? String(id).replace(/-ENGINE$/, '') : null),
      grade: s.grade || p.grade || null,
      domain: s.domain || p.domain || null,
      skill: p.skill || s.skill || null,
      learningGoal: p.learningGoal || null,
      teacherPurpose: p.teacherPurpose || null,
      misconception: (matchedFam && matchedFam.commonMisconception) ||
        (p.misconceptions && p.misconceptions[0]) || p.noMisconceptionJustification || null,
      questionFamily: matched ? family : primary,
      questionFamilyId: matchedFam ? matchedFam.id : ((fams[0] && fams[0].id) || null),
      familyProvenance: matched ? 'exact' : 'default',
      qtype: qtype || null,
      difficulty: difficulty || null,
      difficultyLabel: level.label,
      cognitiveDemand: level.cognitiveDemand,
      teacherMove: level.teacherMove,
      scaffoldHint: level.scaffoldHint,
      stretchPrompt: level.stretchPrompt,
      evidenceLookFor: level.evidenceLookFor,
      requiredVisual: !!p.requiredVisual,
      followUpIdeas: p.followUpIdeas || []
    };
  };

  if (typeof E.getEngineExercise === 'function') {
    const inner = E.getEngineExercise;
    E.getEngineExercise = function (id, diff, qtype, opts) {
      const r = inner(id, diff, qtype, opts);
      if (r && typeof r === 'object' && !r.meta) {
        try { r.meta = E.buildMeta(id, qtype, diff, r.questionFamily); } catch (e) { /* never break the card */ }
      }
      return r;
    };
  }
})();
