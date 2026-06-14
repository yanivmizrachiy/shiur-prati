// generator/engine/follow-up.js
// Real follow-up question generation. Given a base question's engine id + meta,
// produce a NEW, related question according to a pedagogical mode:
//   same_skill              — same topic & family, fresh instance
//   easier / harder         — same topic, one step down / up in difficulty
//   same_misconception      — same family (carries the misconception), as a
//                             "find the mistake" task when possible
//   different_representation— same topic, a different question TYPE than the base
//   visual_variant          — same topic, regenerated so a diagram/table renders
// Returns { questionHTML, answerHTML, meta, mode, requestedFamily } or null.
// Loaded after pedagogy-attach.js so E.getEngineExercise/E.buildMeta exist.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const QT = ['open', 'mcq', 'tf', 'mistake'];
  const DIFF = ['basic', 'standard', 'challenge'];

  // unified single-exercise accessor: works for pilot engines
  // (generate<Base>Engine) and source-fit engines (getEngineExercise), always
  // returning { questionHTML, answerHTML, meta }.
  function fnName(id) { return 'generate' + String(id).replace(/-ENGINE$/, '').replace('-', '') + 'Engine'; }
  E.generateOne = function (id, diff, qtype) {
    const fn = fnName(id);
    if (typeof E[fn] === 'function') {
      const r = E[fn](diff, qtype);
      if (r && (r.questionHTML || r.question)) {
        const meta = r.meta || (typeof E.buildMeta === 'function' ? E.buildMeta(id, qtype, diff, r.questionFamily) : null);
        return { questionHTML: r.questionHTML || r.question, answerHTML: r.answerHTML || r.answer, meta: meta };
      }
      return null;
    }
    if (typeof E.getEngineExercise === 'function') {
      const r = E.getEngineExercise(id, diff, qtype);
      if (r && r.questionHTML) return { questionHTML: r.questionHTML, answerHTML: r.answerHTML, meta: r.meta || null };
    }
    return null;
  };

  function step(diff, delta) {
    const i = DIFF.indexOf(diff || 'standard');
    const j = Math.max(0, Math.min(DIFF.length - 1, (i < 0 ? 1 : i) + delta));
    return DIFF[j];
  }
  function hasVisual(html) { return /<svg|<table/.test(html || ''); }
  function structType(html) {
    if (/mcq-choice/.test(html)) return 'mcq';
    if (/tf-statement|tf-verdict/.test(html)) return 'tf';
    if (/mistake-prompt|mistake-box/.test(html)) return 'mistake';
    return 'open';
  }

  E.FOLLOW_UP_MODES = ['same_skill', 'easier', 'harder', 'same_misconception', 'different_representation', 'visual_variant'];

  // plan a target (difficulty, qtype, desired family, visual) for the mode
  function planFor(mode, base) {
    const baseDiff = (base && base.difficulty) || 'standard';
    const baseType = (base && base.qtype) || 'open';
    const baseFam = (base && base.questionFamily) || null;
    switch (mode) {
      case 'easier': return { diff: step(baseDiff, -1), qtype: 'mixed', family: baseFam, visual: false, diffType: false };
      case 'harder': return { diff: step(baseDiff, +1), qtype: 'mixed', family: baseFam, visual: false, diffType: false };
      case 'same_misconception': return { diff: baseDiff, qtype: 'mistake', family: baseFam, visual: false, diffType: false };
      case 'different_representation': return { diff: baseDiff, qtype: null, family: null, visual: false, diffType: baseType };
      case 'visual_variant': return { diff: baseDiff, qtype: 'mixed', family: baseFam, visual: true, diffType: false };
      case 'same_skill':
      default: return { diff: baseDiff, qtype: 'mixed', family: baseFam, visual: false, diffType: false };
    }
  }

  // Generate a follow-up. Tries up to `tries` samples to satisfy the plan
  // (desired family / different type / visible visual), then returns the best.
  E.generateFollowUpQuestion = function (engineId, baseMeta, mode, opts) {
    if (!engineId) return null;
    mode = (E.FOLLOW_UP_MODES.indexOf(mode) >= 0) ? mode : 'same_skill';
    opts = opts || {};
    const tries = opts.tries || 24;
    const plan = planFor(mode, baseMeta || {});
    let best = null, bestScore = -1;
    for (let i = 0; i < tries; i++) {
      const qtype = plan.qtype || QT[Math.floor(Math.random() * QT.length)];
      const r = E.generateOne(engineId, plan.diff, qtype);
      if (!r || !r.questionHTML || !r.answerHTML) continue;
      let score = 1;
      const fam = r.meta && r.meta.questionFamily;
      if (plan.family && fam === plan.family) score += 4;          // hit same family
      if (plan.diffType && structType(r.questionHTML) !== plan.diffType) score += 4; // a different representation
      if (plan.visual && hasVisual(r.questionHTML)) score += 4;    // a rendered visual
      if (opts.avoidHTML && r.questionHTML !== opts.avoidHTML) score += 1; // not identical to base
      if (score > bestScore) { bestScore = score; best = r; }
      // perfect match → stop early
      const perfect = (!plan.family || fam === plan.family) &&
        (!plan.diffType || structType(r.questionHTML) !== plan.diffType) &&
        (!plan.visual || hasVisual(r.questionHTML));
      if (perfect && (!opts.avoidHTML || r.questionHTML !== opts.avoidHTML)) { best = r; break; }
    }
    if (!best) return null;
    return {
      questionHTML: best.questionHTML,
      answerHTML: best.answerHTML,
      meta: best.meta,
      mode: mode,
      requestedFamily: plan.family || null,
      basedOn: (baseMeta && (baseMeta.questionFamily || baseMeta.sourceId)) || null
    };
  };
})();
