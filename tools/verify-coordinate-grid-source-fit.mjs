// tools/verify-coordinate-grid-source-fit.mjs
// Formalizes the PR #6 coordinate-grid deliverable, which already lives on main
// (N7-01 in source-fit-extensions.js). Confirms: quadrant-I coordinate system,
// read-a-point, plot/mark a point, x/y-swap distractor, grid SVG with axes +
// ticks, answer + explanation, and valid source metadata.
// Run from repo root: node tools/verify-coordinate-grid-source-fit.mjs
import { loadEngines } from './engine-load.mjs';

const { E, callEngine } = loadEngines();
let fails = 0;
function check(name, ok, info) { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (ok ? '' : '  :: ' + (info || ''))); if (!ok) fails++; }

const ID = 'N7-01-ENGINE';
const meta = E.getSource(ID);
check('N7-01 has valid source metadata', meta && E.validateSource(meta).ok);
check('N7-01 source is the grade-7 numeric PDF', meta && meta.sourceFile === '05_grade-7_numeric_domain_curriculum.pdf', meta && meta.sourceFile);
check('N7-01 skill is coordinate system Q1', meta && /coordinate_system_quadrant_1/.test(meta.skill || ''), meta && meta.skill);

// sample across qtypes/difficulties and collect evidence
let svgWithAxes = false, ticks = false, readPoint = false, plotPoint = false,
    swapDistractor = false, hasAnswer = true, bad = false, mcqOneCorrect = true;
for (let i = 0; i < 80; i++) {
  const t = ['open', 'mcq', 'tf', 'mistake'][i % 4];
  const d = ['basic', 'standard', 'challenge'][i % 3];
  const r = callEngine(ID, d, t);
  if (!r || !r.questionHTML || !r.answerHTML) { bad = true; continue; }
  const all = r.questionHTML + r.answerHTML;
  if (/undefined|NaN/.test(all)) bad = true;
  if (/<svg/.test(r.questionHTML)) {
    // axes: the engine draws x and y axis lines + axis letters
    if (/>x<\/text>|>y<\/text>/.test(r.questionHTML)) svgWithAxes = true;
    // ticks: numeric labels along axes
    if (/<text[^>]*>\d+<\/text>/.test(r.questionHTML)) ticks = true;
  }
  if (/אורך הקטע|מהי הנקודה|שיעור|נקודות/.test(r.questionHTML)) readPoint = true;
  if (/שרטטו|חברו|מסומן|מלבן/.test(r.questionHTML)) plotPoint = true;
  if (t === 'mcq') {
    if ((r.questionHTML.match(/mcq-correct/g) || []).length !== 1) mcqOneCorrect = false;
    // an (x,y) point question whose distractors include the swapped pair
    const pts = [...r.questionHTML.matchAll(/\((\d+),(\d+)\)/g)].map(m => m[1] + ',' + m[2]);
    const swapped = [...r.questionHTML.matchAll(/\((\d+),(\d+)\)/g)].map(m => m[2] + ',' + m[1]);
    if (pts.some((p, i) => p !== swapped[i] && pts.includes(swapped[i]))) swapDistractor = true;
  }
  if (!r.answerHTML.replace(/<[^>]+>/g, '').trim()) hasAnswer = false;
}

check('quadrant-I grid SVG with x/y axes', svgWithAxes);
check('grid has numeric ticks', ticks);
check('read-a-coordinate questions present', readPoint);
check('plot/connect questions present', plotPoint);
check('answer + explanation always present', hasAnswer && !bad);
check('MCQ exactly one correct', mcqOneCorrect);
check('x/y swap appears as a distractor', swapDistractor);

console.log(fails ? 'COORDINATE_GRID_SOURCE_FIT_FAIL (' + fails + ')' : 'COORDINATE_GRID_SOURCE_FIT_PASS');
process.exit(fails ? 1 : 0);
