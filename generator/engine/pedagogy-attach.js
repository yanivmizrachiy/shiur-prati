// generator/engine/pedagogy-attach.js
// Backward-compatible enrichment: wraps E.getEngineExercise so every returned
// exercise also carries a `meta` block (source + pedagogy). Old renderers that
// read only questionHTML/answerHTML keep working untouched.
// Loaded after all engine + source-fit files, before exercise-set.js.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};

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
      requiredVisual: !!p.requiredVisual,
      followUpIdeas: p.followUpIdeas || []
    };
  };

  if (typeof E.getEngineExercise === 'function') {
    const inner = E.getEngineExercise;
    E.getEngineExercise = function (id, diff, qtype) {
      const r = inner(id, diff, qtype);
      if (r && typeof r === 'object' && !r.meta) {
        try { r.meta = E.buildMeta(id, qtype, diff, r.questionFamily); } catch (e) { /* never break the card */ }
      }
      return r;
    };
  }
})();
