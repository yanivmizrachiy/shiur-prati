// tools/verify-question-family-provenance.mjs
// F3 gate: meta.questionFamily must be ACCURATE per generation.
// For every engine and every (difficulty × qtype) sample it asserts:
//   (1) Correctness — the emitted meta.questionFamily is a registered family
//       of THAT topic (never null, never from another topic).
//   (2) questionFamilyId resolves to a real family.id, and familyProvenance is
//       'exact' or 'default'.
//   (3) Real provenance — engines that report 'exact' provenance and whose topic
//       has >=2 families must emit >=2 DISTINCT families across samples (proving
//       the family reflects what was generated, not a hardcoded families[0]).
//   (4) At least all 17 dedicated source-fit engines report exact provenance.
// Engines that legitimately default to the topic's primary family are reported,
// not failed — but they still must pass correctness.
// Run from repo root: node tools/verify-question-family-provenance.mjs
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds, callEngine } = loadEngines();
const QT = ['open', 'mcq', 'tf', 'mistake'];
const DIFFS = ['basic', 'standard', 'challenge'];
const SAMPLES = 24;

// the 17 dedicated engines that must carry exact per-generation provenance
const MUST_BE_EXACT = [
  'U7-05-ENGINE', 'U7-06-ENGINE', 'U7-07-ENGINE', 'U7-08-ENGINE',
  'G8-06-ENGINE', 'G8-08-ENGINE', 'N7-08-ENGINE', 'N7-09-ENGINE',
  'G8-05-ENGINE', 'G8-07-ENGINE', 'G8-09-ENGINE', 'G7-06-ENGINE', 'G7-05-ENGINE',
  'N7-10-ENGINE', 'N7-11-ENGINE', 'N7-12-ENGINE', 'N7-13-ENGINE'
];

let fails = 0;
function fail(m) { console.log('FAIL — ' + m); fails++; }
function pass(m) { console.log('PASS — ' + m); }

// build a global map: questionFamily -> set of topic ids that registered it,
// so we can detect a family leaking from a different topic.
const familyOwners = {};
const ids = pilotIds.concat(sourceFitIds);
for (const id of ids) {
  const ped = E.getPedagogy(id);
  for (const f of ((ped && ped.families) || [])) {
    (familyOwners[f.questionFamily] = familyOwners[f.questionFamily] || new Set()).add(id);
  }
}

const cov = { totalEngines: 0, exactProvenanceEngines: 0, defaultProvenanceEngines: 0,
  totalGenerations: 0, enginesWithRegisteredFamiliesOnly: 0, distinctFamiliesObserved: 0 };
const distinctSet = new Set();

for (const id of ids) {
  cov.totalEngines++;
  const ped = E.getPedagogy(id);
  const regFams = ((ped && ped.families) || []).map(f => f.questionFamily);
  const regIds = ((ped && ped.families) || []).map(f => f.id);
  if (!regFams.length) { fail(id + ' has no registered families'); continue; }

  const seen = new Set();
  let exactN = 0, defaultN = 0, n = 0, correctnessOk = true, idOk = true, foreign = 0;
  for (const d of DIFFS) for (const t of QT) {
    for (let i = 0; i < SAMPLES; i++) {
      let r; try { r = callEngine(id, d, t); } catch (e) { fail(id + ' threw ' + d + '/' + t); correctnessOk = false; break; }
      if (!r || !r.meta) { fail(id + ' produced no meta ' + d + '/' + t); correctnessOk = false; break; }
      const m = r.meta; n++; cov.totalGenerations++;
      const qf = m.questionFamily;
      if (!qf) { correctnessOk = false; continue; }
      seen.add(qf); distinctSet.add(id + '::' + qf);
      if (regFams.indexOf(qf) < 0) {
        correctnessOk = false;
        // is it a real family but from a different topic? (leak) or invented?
        if (familyOwners[qf]) foreign++;
      }
      if (m.familyProvenance !== 'exact' && m.familyProvenance !== 'default') idOk = false;
      if (m.questionFamilyId && regIds.indexOf(m.questionFamilyId) < 0) idOk = false;
      if (m.familyProvenance === 'exact') exactN++; else defaultN++;
    }
  }
  if (!correctnessOk) fail(id + ' emitted a family outside its registered set (foreign=' + foreign + ', seen=' + [...seen].join('/') + ')');
  else cov.enginesWithRegisteredFamiliesOnly++;
  if (!idOk) fail(id + ' has bad familyProvenance / questionFamilyId');

  const isExact = exactN > 0 && defaultN === 0;
  if (isExact) cov.exactProvenanceEngines++; else cov.defaultProvenanceEngines++;

  // exact engines with >=2 registered families must actually vary
  if (isExact && regFams.length >= 2 && seen.size < 2) {
    fail(id + ' claims exact provenance but only ever emits 1 family (' + [...seen].join('/') + ')');
  }
  // the 17 dedicated engines MUST be exact
  if (MUST_BE_EXACT.indexOf(id) >= 0 && !isExact) {
    fail(id + ' must carry exact per-generation provenance but reported default (' + defaultN + ' default / ' + exactN + ' exact)');
  }
}
cov.distinctFamiliesObserved = distinctSet.size;

if (cov.enginesWithRegisteredFamiliesOnly === cov.totalEngines)
  pass('every engine emits only registered families (' + cov.totalEngines + ' engines)');
if (cov.exactProvenanceEngines >= MUST_BE_EXACT.length)
  pass('exact per-generation provenance on ' + cov.exactProvenanceEngines + ' engines (>= ' + MUST_BE_EXACT.length + ' required)');
else
  fail('only ' + cov.exactProvenanceEngines + ' engines have exact provenance (need >= ' + MUST_BE_EXACT.length + ')');

console.log(JSON.stringify(cov, null, 2));
console.log(fails ? 'FAMILY_PROVENANCE_FAIL (' + fails + ')' : 'FAMILY_PROVENANCE_PASS');
process.exit(fails ? 1 : 0);
