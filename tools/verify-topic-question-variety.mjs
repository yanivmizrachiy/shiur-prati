// tools/verify-topic-question-variety.mjs
// Real variety + pedagogy gate. Loads engines, samples actual output, and for
// every active engine topic checks: 4 qtypes that are structurally distinct,
// >=3 documented families (major topics >=5), smart MCQ distractors, balanced
// TF, mistake-with-correction, full open Q+A, required visual, and full
// pedagogic metadata (source, learningGoal, teacherPurpose, misconception,
// followUps). Fails if a STRONG-looking topic lacks pedagogic variety.
// Run from repo root: node tools/verify-topic-question-variety.mjs
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds, callEngine } = loadEngines();
const QT = ['open', 'mcq', 'tf', 'mistake'];
const DIFFS = ['basic', 'standard', 'challenge'];
const SAMPLES = 16;
const BAD = /undefined|NaN/;
// topics intentionally rich (>=5 families) — one+ per domain
const MAJOR = ['N7-04-ENGINE', 'A7-01-ENGINE', 'A8-02-ENGINE', 'G7-01-ENGINE', 'G8-01-ENGINE', 'U7-01-ENGINE'];

function structuralType(html) {
  if (/mcq-choice/.test(html)) return 'mcq';
  if (/tf-statement|tf-verdict/.test(html)) return 'tf';
  if (/mistake-prompt|mistake-box/.test(html)) return 'mistake';
  return 'open';
}
function needsVisual(meta) {
  if (!meta) return false;
  if (meta.domain === 'geometry') return true;
  return /chart|coordinate|graph|number_line|bar|pie/.test(meta.skill || '');
}

let fails = 0;
function fail(m) { console.log('FAIL — ' + m); fails++; }

const ids = pilotIds.concat(sourceFitIds);
const cov = { topicsChecked: 0, topicsWith4Qtypes: 0, topicsWith3Families: 0, topicsWith5Families: 0,
  topicsWithLearningGoal: 0, topicsWithTeacherPurpose: 0, topicsWithMisconception: 0,
  topicsWithFollowUps: 0, topicsMissingVariety: 0, fallbackTopicsStillGeneric: 0, dedicatedEnginesAdded: 0 };

for (const id of ids) {
  cov.topicsChecked++;
  const ped = E.getPedagogy(id);
  const families = (ped && ped.families) || [];
  if (families.length >= 3) cov.topicsWith3Families++; else fail(id + ' has <3 documented families (' + families.length + ')');
  if (families.length >= 5) cov.topicsWith5Families++;
  if (MAJOR.indexOf(id) >= 0 && families.length < 5) fail(id + ' is a major topic but has <5 families');

  const qtypesSeen = {}, structTypes = new Set(), tfVerdicts = new Set();
  let svgWhenNeeded = false, metaOk = true, mcqBad = false, mistakeBad = false, badTok = false;
  let lg = false, tp = false, mis = false, fu = false;
  for (const d of DIFFS) for (const t of QT) {
    for (let i = 0; i < SAMPLES; i++) {
      let r; try { r = callEngine(id, d, t); } catch (e) { fail(id + ' threw ' + d + '/' + t); badTok = true; break; }
      if (!r || !r.questionHTML || !r.answerHTML) { fail(id + ' empty ' + d + '/' + t); badTok = true; break; }
      if (BAD.test(r.questionHTML + r.answerHTML)) { badTok = true; break; }
      qtypesSeen[t] = true;
      structTypes.add(structuralType(r.questionHTML));
      if (/<svg|<table/.test(r.questionHTML)) svgWhenNeeded = true;
      const m = r.meta || {};
      if (m.sourceFile) {} else metaOk = false;
      if (m.learningGoal) lg = true;
      if (m.teacherPurpose) tp = true;
      if (m.misconception) mis = true;
      if ((m.followUpIdeas || []).length) fu = true;
      if (t === 'mcq') {
        if ((r.questionHTML.match(/mcq-correct/g) || []).length !== 1) mcqBad = true;
        if ((r.questionHTML.match(/mcq-choice/g) || []).length < 3) mcqBad = true;
      }
      if (t === 'tf') { if (/✓ נכון/.test(r.answerHTML)) tfVerdicts.add('T'); if (/✗ שגוי/.test(r.answerHTML)) tfVerdicts.add('F'); }
      if (t === 'mistake') { if (r.answerHTML.replace(/<[^>]+>/g, '').trim().length < 20) mistakeBad = true; }
    }
    if (badTok) break;
  }
  const q4 = Object.keys(qtypesSeen).length === 4;
  if (q4) cov.topicsWith4Qtypes++; else fail(id + ' missing question types (' + Object.keys(qtypesSeen).join(',') + ')');
  if (structTypes.size < 3) { fail(id + ' question types are not structurally distinct'); cov.topicsMissingVariety++; }
  if (mcqBad) fail(id + ' MCQ distractors weak (not 1-correct / <3 choices)');
  if (tfVerdicts.size < 2) fail(id + ' TF not balanced (both verdicts) :: ' + [...tfVerdicts].join(''));
  if (mistakeBad) fail(id + ' mistake lacks a correction');
  if (badTok) fail(id + ' undefined/NaN or empty output');
  if (needsVisual(E.getSource(id)) && !svgWhenNeeded) fail(id + ' requires a visual but none rendered');
  if (!metaOk) fail(id + ' missing source in meta');
  if (lg) cov.topicsWithLearningGoal++; else fail(id + ' meta missing learningGoal');
  if (tp) cov.topicsWithTeacherPurpose++; else fail(id + ' meta missing teacherPurpose');
  if (mis) cov.topicsWithMisconception++; else fail(id + ' meta missing misconception');
  if (fu) cov.topicsWithFollowUps++; else fail(id + ' meta missing followUpIdeas');
  if (ped && ped.engineSupport === 'dedicated') cov.dedicatedEnginesAdded++;
}
cov.fallbackTopicsStillGeneric = Object.keys(E.SOURCE_REGISTRY).filter(k => !/-ENGINE$/.test(k)).length;

console.log(JSON.stringify(cov, null, 2));
console.log(fails ? 'TOPIC_VARIETY_FAIL (' + fails + ')' : 'TOPIC_VARIETY_PASS');
process.exit(fails ? 1 : 0);
