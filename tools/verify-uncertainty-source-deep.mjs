// tools/verify-uncertainty-source-deep.mjs
// Verifies the additive source-06 uncertainty PDF coverage:
// every registered deep family can be generated directly, has clean HTML,
// carries exact registered provenance when routed through getEngineExercise,
// and renders a source visual/table where expected.
import { loadEngines } from './engine-load.mjs';

const { E } = loadEngines();
const QT = ['open', 'mcq', 'tf', 'mistake'];
const BAD = /undefined|NaN|\[object Object\]/;
const required = E.UNCERTAINTY_SOURCE_DEEP_FAMILIES || {};
let fails = 0;

function fail(m) { console.log('FAIL — ' + m); fails++; }
function pass(m) { console.log('PASS — ' + m); }
function text(html) { return String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

if (typeof E.generateUncertaintySourceDeepExercise !== 'function') {
  fail('generateUncertaintySourceDeepExercise is missing');
}

const expectedTopicCounts = {
  'U7-01-ENGINE': 3,
  'U7-02-ENGINE': 4,
  'U7-03-ENGINE': 3,
  'U7-04-ENGINE': 3,
  'U7-05-ENGINE': 3,
  'U7-06-ENGINE': 3,
  'U7-08-ENGINE': 3,
  'U8-01-ENGINE': 6,
  'U8-02-ENGINE': 5
};

for (const [id, n] of Object.entries(expectedTopicCounts)) {
  if (!Array.isArray(required[id]) || required[id].length < n) {
    fail(id + ' has too few source-deep families');
  }
}

let generated = 0;
for (const [id, families] of Object.entries(required)) {
  const ped = E.getPedagogy(id);
  const registered = new Set(((ped && ped.families) || []).map(f => f.questionFamily));
  for (const family of families) {
    if (!registered.has(family)) fail(id + ' family not registered: ' + family);
    for (const qtype of QT) {
      let r = null;
      try {
        r = E.generateUncertaintySourceDeepExercise(id, 'challenge', qtype, family);
      } catch (e) {
        fail(id + '/' + family + '/' + qtype + ' threw: ' + e.message);
      }
      if (!r || !r.questionHTML || !r.answerHTML) {
        fail(id + '/' + family + '/' + qtype + ' empty output');
        continue;
      }
      generated++;
      const all = r.questionHTML + r.answerHTML;
      if (BAD.test(all)) fail(id + '/' + family + '/' + qtype + ' contains bad token');
      if (text(r.questionHTML).length < 24) fail(id + '/' + family + '/' + qtype + ' question too short');
      if (text(r.answerHTML).length < 24) fail(id + '/' + family + '/' + qtype + ' answer too short');
      if (!/(<svg|<table|freq-table|source-deep-visuals)/.test(r.questionHTML)) {
        fail(id + '/' + family + '/' + qtype + ' missing source visual/table');
      }
      if (r.questionFamily !== family) fail(id + '/' + family + '/' + qtype + ' wrong questionFamily');
      if (qtype === 'mcq') {
        const choices = (r.questionHTML.match(/mcq-choice/g) || []).length;
        const correct = (r.questionHTML.match(/mcq-correct/g) || []).length;
        if (choices < 3 || correct !== 1) fail(id + '/' + family + ' bad MCQ structure');
      }
      if (qtype === 'tf' && !/(✓ נכון|✗ שגוי)/.test(r.answerHTML)) {
        fail(id + '/' + family + ' TF missing verdict');
      }
      if (qtype === 'mistake' && !/טעות|שגוי/.test(text(r.answerHTML))) {
        fail(id + '/' + family + ' mistake answer lacks correction language');
      }
    }

    const routed = E.getEngineExercise(id, 'challenge', 'open', { sourceDeepFamily: family });
    if (!routed || !routed.meta) fail(id + '/' + family + ' routed call missing meta');
    else {
      if (routed.meta.questionFamily !== family) fail(id + '/' + family + ' routed family mismatch: ' + routed.meta.questionFamily);
      if (routed.meta.familyProvenance !== 'exact') fail(id + '/' + family + ' routed provenance not exact');
      if (routed.meta.sourceFile !== '06_uncertainty_domain_curriculum_examples.pdf') {
        fail(id + '/' + family + ' wrong sourceFile: ' + routed.meta.sourceFile);
      }
    }
  }
}

const cov = {
  topics: Object.keys(required).length,
  families: Object.values(required).reduce((s, a) => s + a.length, 0),
  generated
};

if (!fails) {
  pass('all source-06 uncertainty deep families generate cleanly');
  pass('exact pedagogy provenance is wired through getEngineExercise');
}
console.log(JSON.stringify(cov, null, 2));
console.log(fails ? 'UNCERTAINTY_SOURCE_DEEP_FAIL (' + fails + ')' : 'UNCERTAINTY_SOURCE_DEEP_PASS');
process.exit(fails ? 1 : 0);
