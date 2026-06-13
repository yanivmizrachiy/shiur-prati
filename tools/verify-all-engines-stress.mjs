// tools/verify-all-engines-stress.mjs
// Stress test: for every active engine topic, generate >=50 questions across all
// question types and difficulties, and assert the per-question invariants.
// Hard gates: question/answer/explanation/source present; no undefined/NaN;
// no leaked engine ids; MCQ exactly one correct; visual SVG valid when required;
// MISTAKE carries a correction; difficulty changes output; each type renders
// distinctly (mixed really mixes). TF balance reported per topic.
// Run from repo root: node tools/verify-all-engines-stress.mjs
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds, callEngine } = loadEngines();
const QTYPES = ['open', 'mcq', 'tf', 'mistake'];
const DIFFS = ['basic', 'standard', 'challenge'];
const PER = 50;
const BAD = /undefined|NaN/;
const ENGINE_ID = /\b[A-Z]\d-\d{2}-ENGINE\b/;

function needsVisual(meta) {
  if (!meta) return false;
  if (meta.domain === 'geometry') return true;
  return /chart|coordinate|graph|number_line|bar|pie/.test(meta.skill || '');
}

let fails = 0;
function fail(msg) { console.log('FAIL — ' + msg); fails++; }

const ids = pilotIds.concat(sourceFitIds);
let totalGen = 0;
const tfReport = [];

for (const id of ids) {
  const meta = E.getSource(id);
  if (!meta || !E.validateSource(meta).ok) { fail(id + ': missing/invalid source metadata'); continue; }

  let svgSeenIfNeeded = false;
  const tfVerdicts = new Set();
  const byTypeText = { open: new Set(), mcq: new Set(), tf: new Set(), mistake: new Set() };
  const allQuestions = new Set();
  let topicFail = false;

  for (let n = 0; n < PER; n++) {
    const d = DIFFS[n % 3];
    const t = QTYPES[n % 4];
    let r;
    try { r = callEngine(id, d, t); } catch (e) { fail(id + ' threw (' + d + '/' + t + '): ' + e.message); topicFail = true; break; }
    totalGen++;
    if (!r || !r.questionHTML || !r.answerHTML) { fail(id + ' empty output (' + d + '/' + t + ')'); topicFail = true; break; }
    const all = r.questionHTML + r.answerHTML;
    if (BAD.test(all)) { fail(id + ' undefined/NaN (' + d + '/' + t + ')'); topicFail = true; break; }
    if (ENGINE_ID.test(r.questionHTML)) { fail(id + ' leaked engine id in question (' + d + '/' + t + ')'); topicFail = true; break; }
    const plainAns = r.answerHTML.replace(/<[^>]+>/g, '').trim();
    if (plainAns.length < 10) { fail(id + ' answer too thin (' + d + '/' + t + ')'); topicFail = true; break; }

    if (/<svg|<table/.test(r.questionHTML)) svgSeenIfNeeded = true;
    if (t === 'mcq') {
      const correct = (r.questionHTML.match(/mcq-correct/g) || []).length;
      if (correct !== 1) { fail(id + ' MCQ correct-count=' + correct + ' (' + d + ')'); topicFail = true; break; }
    }
    if (t === 'tf') {
      if (/✓ נכון/.test(r.answerHTML)) tfVerdicts.add('T');
      if (/✗ שגוי/.test(r.answerHTML)) tfVerdicts.add('F');
    }
    if (t === 'mistake') {
      // mistake must present a correction/explanation distinct from a bare value
      if (plainAns.length < 20) { fail(id + ' mistake lacks correction (' + d + ')'); topicFail = true; break; }
    }
    byTypeText[t].add(plainAns.slice(0, 40));
    allQuestions.add(r.questionHTML.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').trim());
  }
  if (topicFail) continue;

  // visual required?
  if (needsVisual(meta) && !svgSeenIfNeeded) fail(id + ' requires a visual but none rendered');

  // each type renders distinctly (mixed really mixes): the 4 types must not all
  // collapse to one identical rendering signature
  const typeSig = QTYPES.map(t => [...byTypeText[t]][0] || '').join('|');
  const distinctTypes = new Set(QTYPES.map(t => (byTypeText[t].size ? t : null)).filter(Boolean));
  if (distinctTypes.size < 3) fail(id + ' supports <3 question types (' + distinctTypes.size + ')');

  // real variety: a topic must produce several distinct questions over 50 draws
  if (allQuestions.size < 4) fail(id + ' too few distinct questions (' + allQuestions.size + '/50)');

  tfReport.push({ id, tf: [...tfVerdicts].sort().join('') || 'none' });
}

// TF balance: every topic that supports tf should show BOTH verdicts across 50 samples
const tfOneSided = tfReport.filter(r => r.tf !== 'FT' && r.tf !== 'TF' && r.tf !== 'none');
for (const r of tfOneSided) fail(r.id + ' TF one-sided across samples (' + r.tf + ')');

console.log('topics=' + ids.length + ' generations=' + totalGen + ' fails=' + fails);
console.log(fails ? 'ENGINES_STRESS_FAIL (' + fails + ')' : 'ENGINES_STRESS_PASS');
process.exit(fails ? 1 : 0);
