// tools/verify-copy-export.mjs  (verify:copy-export)
// Gate for one-click copy/export: the payload builders produce correct, faithful
// output for every kind across many engines — preserving Hebrew text, stripping
// SVG/markup for the text kinds, keeping HTML for the html kinds, and carrying
// the full teacher-card pedagogy. Also asserts the DOM export entry points exist.
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { E, Teacher, pilotIds, sourceFitIds } = loadEngines();
const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };
const hasHebrew = s => /[֐-׿]/.test(s);
const hasTag = s => /<[a-zA-Z][^>]*>/.test(s);

check('Teacher.buildCopyPayload present', Teacher && typeof Teacher.buildCopyPayload === 'function');
check('Teacher.htmlToText present', Teacher && typeof Teacher.htmlToText === 'function');

// htmlToText strips svg + tags but keeps Hebrew
const t = Teacher.htmlToText('<div class="qtext"><svg><text>x</text></svg>כמה זה <b>5+3</b>?</div>');
check('htmlToText strips svg + markup, keeps text', !/svg|<b>/.test(t) && /כמה זה/.test(t) && /\[שרטוט\]/.test(t));

const ids = pilotIds.concat(sourceFitIds);
let qBad = 0, qsBad = 0, tcBad = 0, htmlBad = 0;
for (const id of ids) {
  for (const qt of ['open', 'mcq', 'tf', 'mistake']) {
    const ex = E.getEngineExercise(id, 'standard', qt) || (E.generateOne && E.generateOne(id, 'standard', qt));
    if (!ex) continue;
    const q = Teacher.buildCopyPayload(ex, 'question');
    const qs = Teacher.buildCopyPayload(ex, 'question_solution');
    const tc = Teacher.buildCopyPayload(ex, 'teacher_card');
    const html = Teacher.buildCopyPayload(ex, 'html_full');
    if (!q || hasTag(q) || /undefined|NaN/.test(q)) qBad++;
    if (!qs || qs.indexOf('— פתרון —') < 0 || qs.length <= q.length) qsBad++;
    const m = ex.meta || {};
    if (!tc || tc.indexOf('כרטיס מורה') < 0 || (m.sourceFile && tc.indexOf(m.sourceFile) < 0) || (m.questionFamily && tc.indexOf(m.questionFamily) < 0)) tcBad++;
    if (!html || html.indexOf(ex.questionHTML) < 0 || html.indexOf('solution') < 0) htmlBad++;
  }
}
check('copy "question" is clean text for all engines', qBad === 0, qBad + ' bad');
check('copy "question+solution" appends the solution', qsBad === 0, qsBad + ' bad');
check('copy "teacher card" carries source + family + pedagogy', tcBad === 0, tcBad + ' bad');
check('export HTML keeps question markup + solution block', htmlBad === 0, htmlBad + ' bad');

// faithfulness spot-check: a known Hebrew question round-trips its text
const exG = E.getEngineExercise('G8-09-ENGINE', 'standard', 'open');
check('payload preserves Hebrew + formulas', hasHebrew(Teacher.buildCopyPayload(exG, 'question')));

// DOM export entry points exist in source
const src = read('generator/teacher-mode.js');
['exportPNG', 'exportHTML', 'addToWorksheet', 'exportWorksheet'].forEach(fn =>
  check('export entry point ' + fn + ' implemented', new RegExp('Teacher\\.' + fn + '\\s*=\\s*function').test(src)));
check('PNG export uses html2canvas', /html2canvas\(/.test(src));
check('downloads use Blob + object URL', /new Blob\(/.test(src) && /createObjectURL/.test(src));

// copy-as-image: the whole question + drawing to the clipboard (paste into Canva/Word)
check('copyImage implemented', /Teacher\.copyImage\s*=\s*function/.test(src));
check('copyImage captures the card with html2canvas', /copyImage[\s\S]*?html2canvas\(/.test(src));
check('copyImage writes an image to the clipboard (ClipboardItem)', /ClipboardItem\(\{\s*'image\/png'|ClipboardItem\(\{ 'image\/png'/.test(src) && /clipboard\.write\(/.test(src));
check('copyImage falls back to a PNG download when blocked', /copyImage[\s\S]*?download\(/.test(src));

// copy-as-image must not include worksheet numbering/type/settings chips.
const setSrc = read('generator/exercise-set.js');
check('question number/type meta is ignored in copied images', /<div class="qmeta" data-html2canvas-ignore="true">[\s\S]*?<span class="ex-num">/.test(setSrc));
check('exercise-set settings meta is ignored in copied images', /<div class="qmeta" data-html2canvas-ignore="true">[\s\S]*?meta\.gradeLabel[\s\S]*?meta\.diffLabel/.test(setSrc));

console.log(fails ? 'COPY_EXPORT_FAIL (' + fails + ')' : 'COPY_EXPORT_PASS');
process.exit(fails ? 1 : 0);
