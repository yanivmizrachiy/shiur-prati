// generator/engine/source-schema.js
// Uniform source-metadata schema + registry for every question-producing engine
// and topic. Loaded early so engines/registry can call E.defineSource(...).
// Iron rule: sourceFile MUST be one of the 10 intake PDFs — nothing else is a
// legitimate origin for a question in this product.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // The only legitimate content sources (sources/intake/2026-06-09/...).
  E.SOURCE_FILES = Object.freeze([
    '01_grade-7_algebra_curriculum.pdf',
    '02_grade-8_algebra_curriculum.pdf',
    '03_grade-7_pre_deductive_geometry_curriculum.pdf',
    '04_grade-8_geometry_curriculum.pdf',
    '05_grade-7_numeric_domain_curriculum.pdf',
    '06_uncertainty_domain_curriculum_examples.pdf',
    '07_numeric_domain_principles_grades-7-8.pdf',
    '08_algebra_domain_principles_grades-7-8.pdf',
    '09_geometry_domain_principles_grades-7-8.pdf',
    '10_grade-8_teaching_sequence_2026-2027.pdf'
  ]);

  const DOMAINS = ['numeric', 'algebra', 'geometry', 'uncertainty'];
  const DEMANDS = ['basic', 'standard', 'challenge'];

  E.SOURCE_REGISTRY = E.SOURCE_REGISTRY || {};

  // Validate a metadata object. Returns {ok, errors:[]}. Pure — no throwing,
  // so a malformed entry can be reported by the verifier rather than crash UI.
  E.validateSource = function (meta) {
    const errors = [];
    if (!meta || typeof meta !== 'object') return { ok: false, errors: ['meta missing'] };
    if (!meta.sourceFile || E.SOURCE_FILES.indexOf(meta.sourceFile) < 0) errors.push('sourceFile not one of the 10 intake PDFs: ' + meta.sourceFile);
    if (!meta.sourceId) errors.push('sourceId empty');
    if (!meta.patternId) errors.push('patternId empty');
    if (meta.grade !== 7 && meta.grade !== 8) errors.push('grade must be 7 or 8');
    if (DOMAINS.indexOf(meta.domain) < 0) errors.push('domain invalid: ' + meta.domain);
    if (!meta.skill) errors.push('skill empty');
    if (meta.cognitiveDemand && DEMANDS.indexOf(meta.cognitiveDemand) < 0) errors.push('cognitiveDemand invalid: ' + meta.cognitiveDemand);
    return { ok: errors.length === 0, errors: errors };
  };

  // Register source metadata for an engine/topic id. Last write wins.
  E.defineSource = function (id, meta) {
    E.SOURCE_REGISTRY[id] = Object.assign({ engineId: id }, meta);
    return E.SOURCE_REGISTRY[id];
  };

  // Look up source metadata for an engine/topic id (or its base, e.g. "N7-03"
  // for "N7-03-ENGINE"). Returns null when unknown.
  E.getSource = function (id) {
    if (!id) return null;
    if (E.SOURCE_REGISTRY[id]) return E.SOURCE_REGISTRY[id];
    const base = String(id).replace(/-ENGINE$/, '');
    return E.SOURCE_REGISTRY[base] || E.SOURCE_REGISTRY[base + '-ENGINE'] || null;
  };
})();
