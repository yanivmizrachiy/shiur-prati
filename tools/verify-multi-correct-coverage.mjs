// tools/verify-multi-correct-coverage.mjs
// Regression guard: A7-04-ENGINE multi-correct MCQ path.
// Verifies that when mcqMode='multi', at least 2 choices are marked correct:true.
// Verifies that when mcqMode='single' (default), exactly 1 choice is correct:true.
// Run: node tools/verify-multi-correct-coverage.mjs
import { loadEngines } from './engine-load.mjs';

const { E, callEngine } = loadEngines();

let fails = 0;
function fail(msg) { console.log('FAIL — ' + msg); fails++; }
function pass(msg) { console.log('PASS — ' + msg); }

const ENGINE_ID = 'A7-04-ENGINE';
const DIFFS = ['basic', 'standard', 'challenge'];
const SAMPLES = 30;

// Check 1: multi mode — must produce >=2 correct choices
console.log('\n[multi-correct guard] A7-04-ENGINE mcqMode=multi ...');
let multiOk = 0;
for (let i = 0; i < SAMPLES; i++) {
  const diff = DIFFS[i % 3];
  let r;
  try { r = E.getEngineExercise(ENGINE_ID, diff, 'mcq', { mcqMode: 'multi' }); }
  catch (e) { fail(ENGINE_ID + ' threw in multi mode: ' + e.message); continue; }
  if (!r || !r.questionHTML || !r.answerHTML) {
    fail(ENGINE_ID + ' empty output in multi mode (' + diff + ')');
    continue;
  }
  // Count correct:true in MCQ choices
  const correctCount = (r.questionHTML.match(/mcq-correct/g) || []).length;
  if (correctCount < 2) {
    fail(ENGINE_ID + ' multi mode produced ' + correctCount + ' correct choice(s), expected >=2 (' + diff + ')');
  } else {
    multiOk++;
  }
}
if (multiOk === SAMPLES) pass(ENGINE_ID + ' multi mode: all ' + SAMPLES + ' samples had >=2 correct choices');

// Check 2: single mode — must produce exactly 1 correct choice
console.log('\n[multi-correct guard] A7-04-ENGINE mcqMode=single ...');
let singleOk = 0;
for (let i = 0; i < SAMPLES; i++) {
  const diff = DIFFS[i % 3];
  let r;
  try { r = E.getEngineExercise(ENGINE_ID, diff, 'mcq', { mcqMode: 'single' }); }
  catch (e) { fail(ENGINE_ID + ' threw in single mode: ' + e.message); continue; }
  if (!r || !r.questionHTML || !r.answerHTML) {
    fail(ENGINE_ID + ' empty output in single mode (' + diff + ')');
    continue;
  }
  const correctCount = (r.questionHTML.match(/mcq-correct/g) || []).length;
  if (correctCount !== 1) {
    fail(ENGINE_ID + ' single mode produced ' + correctCount + ' correct choice(s), expected exactly 1 (' + diff + ')');
  } else {
    singleOk++;
  }
}
if (singleOk === SAMPLES) pass(ENGINE_ID + ' single mode: all ' + SAMPLES + ' samples had exactly 1 correct choice');

// Check 3: mcqMode not passed (default) — should not crash and behave like single
console.log('\n[multi-correct guard] A7-04-ENGINE no mcqMode (default) ...');
let defaultOk = 0;
for (let i = 0; i < 10; i++) {
  const diff = DIFFS[i % 3];
  let r;
  try { r = E.getEngineExercise(ENGINE_ID, diff, 'mcq', {}); }
  catch (e) { fail(ENGINE_ID + ' threw with empty opts: ' + e.message); continue; }
  if (!r || !r.questionHTML) {
    fail(ENGINE_ID + ' empty output with default opts (' + diff + ')');
  } else {
    defaultOk++;
  }
}
if (defaultOk === 10) pass(ENGINE_ID + ' default opts: no crash across 10 samples');

console.log('\nMULTI_CORRECT_COVERAGE ' + (fails === 0 ? 'PASS' : 'FAIL (' + fails + ' failures)'));
if (fails > 0) process.exit(1);
