// tools/verify-follow-up-generation.mjs
// F4 gate: E.generateFollowUpQuestion(engineId, baseMeta, mode) must produce a
// REAL, related follow-up for every engine and every mode. For each engine it
// generates a base question (standard/open) and then, per mode, asserts:
//   - non-null result with question+answer HTML and meta, no undefined/NaN
//   - easier  -> difficulty strictly below the base (when base wasn't basic)
//   - harder  -> difficulty strictly above the base (when base wasn't challenge)
//   - same_misconception -> a "find the mistake" item, same family
//   - different_representation -> a structurally different question type
//   - same_skill / visual_variant -> same topic; visual_variant renders a
//     diagram/table for topics that require a visual
//   - family-targeted modes hit the requested family on exact-provenance engines
// Run from repo root: node tools/verify-follow-up-generation.mjs
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds } = loadEngines();
const DIFF = ['basic', 'standard', 'challenge'];
const BAD = /undefined|NaN/;
const EXACT = ['U7-05-ENGINE', 'U7-06-ENGINE', 'U7-07-ENGINE', 'U7-08-ENGINE',
  'G8-06-ENGINE', 'G8-08-ENGINE', 'N7-08-ENGINE', 'N7-09-ENGINE',
  'G8-05-ENGINE', 'G8-07-ENGINE', 'G8-09-ENGINE', 'G7-06-ENGINE', 'G7-05-ENGINE',
  'N7-10-ENGINE', 'N7-11-ENGINE', 'N7-12-ENGINE', 'N7-13-ENGINE'];

let fails = 0;
function fail(m) { console.log('FAIL — ' + m); fails++; }
function pass(m) { console.log('PASS — ' + m); }
function structType(h) {
  if (/mcq-choice/.test(h)) return 'mcq';
  if (/tf-statement|tf-verdict/.test(h)) return 'tf';
  if (/mistake-prompt|mistake-box/.test(h)) return 'mistake';
  return 'open';
}
const hasVisual = h => /<svg|<table/.test(h || '');

// preconditions
if (typeof E.generateFollowUpQuestion !== 'function') { fail('E.generateFollowUpQuestion missing'); }
const MODES = E.FOLLOW_UP_MODES || [];
if (MODES.length !== 6) fail('expected 6 follow-up modes, got ' + MODES.length + ' (' + MODES.join(',') + ')');

const ids = pilotIds.concat(sourceFitIds);
const cov = { engines: 0, modes: MODES.length, followUpsGenerated: 0, nullResults: 0,
  familyTargetedHits: 0, familyTargetedTotal: 0, visualVariantsWithVisual: 0, visualVariantsRequired: 0 };

for (const id of ids) {
  cov.engines++;
  const base = E.generateOne(id, 'standard', 'open');
  if (!base || !base.meta) { fail(id + ' could not produce a base question'); continue; }
  const baseType = structType(base.questionHTML);
  const baseFam = base.meta.questionFamily;
  const reqVisual = !!(E.getPedagogy(id) && E.getPedagogy(id).requiredVisual);
  const isExact = EXACT.indexOf(id) >= 0;

  for (const mode of MODES) {
    const fu = E.generateFollowUpQuestion(id, base.meta, mode, { avoidHTML: base.questionHTML, tries: 30 });
    if (!fu || !fu.questionHTML || !fu.answerHTML || !fu.meta) { fail(id + '/' + mode + ' produced no follow-up'); cov.nullResults++; continue; }
    cov.followUpsGenerated++;
    if (BAD.test(fu.questionHTML + fu.answerHTML)) fail(id + '/' + mode + ' has undefined/NaN');
    if (fu.mode !== mode) fail(id + '/' + mode + ' mode not echoed (' + fu.mode + ')');
    // same topic (source id) for every mode
    if (fu.meta.sourceId !== base.meta.sourceId) fail(id + '/' + mode + ' changed topic (' + fu.meta.sourceId + ')');

    const fdiff = DIFF.indexOf(fu.meta.difficulty), bdiff = DIFF.indexOf('standard');
    if (mode === 'easier' && fdiff >= bdiff) fail(id + '/easier not easier (' + fu.meta.difficulty + ')');
    if (mode === 'harder' && fdiff <= bdiff) fail(id + '/harder not harder (' + fu.meta.difficulty + ')');
    if (mode === 'same_misconception') {
      if (structType(fu.questionHTML) !== 'mistake') fail(id + '/same_misconception not a mistake item');
      cov.familyTargetedTotal++;
      if (isExact) { if (fu.meta.questionFamily === baseFam) cov.familyTargetedHits++; else fail(id + '/same_misconception family drifted (' + fu.meta.questionFamily + ' != ' + baseFam + ')'); }
      else cov.familyTargetedHits++;
    }
    if (mode === 'different_representation' && structType(fu.questionHTML) === baseType)
      fail(id + '/different_representation same type as base (' + baseType + ')');
    if (mode === 'same_skill') {
      cov.familyTargetedTotal++;
      if (isExact) { if (fu.meta.questionFamily === baseFam) cov.familyTargetedHits++; else fail(id + '/same_skill family drifted (' + fu.meta.questionFamily + ')'); }
      else cov.familyTargetedHits++;
    }
    if (mode === 'visual_variant' && reqVisual) {
      cov.visualVariantsRequired++;
      if (hasVisual(fu.questionHTML)) cov.visualVariantsWithVisual++;
      else fail(id + '/visual_variant rendered no visual though topic requires one');
    }
  }
}

// invalid mode falls back to same_skill (still returns a follow-up)
const sample = ids[0];
const fb = E.generateFollowUpQuestion(sample, E.generateOne(sample, 'standard', 'open').meta, 'nonsense_mode');
if (!fb || fb.mode !== 'same_skill') fail('invalid mode did not fall back to same_skill');
else pass('invalid mode falls back to same_skill');

if (cov.nullResults === 0) pass('every engine × mode produced a follow-up (' + cov.followUpsGenerated + ' total)');
if (cov.familyTargetedHits === cov.familyTargetedTotal) pass('family-targeted modes kept the family (' + cov.familyTargetedHits + '/' + cov.familyTargetedTotal + ')');
if (cov.visualVariantsWithVisual === cov.visualVariantsRequired) pass('visual_variant rendered a visual for all ' + cov.visualVariantsRequired + ' visual topics');

console.log(JSON.stringify(cov, null, 2));
console.log(fails ? 'FOLLOW_UP_FAIL (' + fails + ')' : 'FOLLOW_UP_PASS');
process.exit(fails ? 1 : 0);
