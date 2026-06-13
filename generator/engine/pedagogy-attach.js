// generator/engine/pedagogy-attach.js
// Backward-compatible enrichment: wraps E.getEngineExercise so every returned
// exercise also carries a `meta` block (source + pedagogy). Old renderers that
// read only questionHTML/answerHTML keep working untouched.
// Loaded after all engine + source-fit files, before exercise-set.js.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};

  E.buildMeta = function (id, qtype, difficulty) {
    const s = (typeof E.getSource === 'function' && E.getSource(id)) || {};
    const p = (typeof E.getPedagogy === 'function' && E.getPedagogy(id)) || {};
    return {
      sourceFile: s.sourceFile || null,
      sourceId: s.sourceId || (id ? String(id).replace(/-ENGINE$/, '') : null),
      grade: s.grade || p.grade || null,
      domain: s.domain || p.domain || null,
      skill: p.skill || s.skill || null,
      learningGoal: p.learningGoal || null,
      teacherPurpose: p.teacherPurpose || null,
      misconception: (p.misconceptions && p.misconceptions[0]) || p.noMisconceptionJustification || null,
      questionFamily: (p.families && p.families[0] && p.families[0].questionFamily) || null,
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
        try { r.meta = E.buildMeta(id, qtype, diff); } catch (e) { /* never break the card */ }
      }
      return r;
    };
  }
})();
