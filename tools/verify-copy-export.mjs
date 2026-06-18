// tools/verify-copy-export.mjs  (verify:copy-export)
// Product gate for one-click task image copy/export. The main generator no
// longer depends on teacher mode; this verifier checks the worksheet card
// buttons and the shared export.js html2canvas pipeline directly.
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds } = loadEngines();
const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra = '') => {
  console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name + (extra && !ok ? ' :: ' + extra : ''));
  if (!ok) fails++;
};
const hasHebrew = s => /[֐-׿]/.test(s);

const setSrc = read('generator/exercise-set.js');
const exportSrc = read('generator/export.js');
const index = read('generator/index.html');

check('index does not load teacher-mode.js for copy/export', !/teacher-mode\.js/.test(index));
check('exercise cards render copy-as-image button', setSrc.indexOf('העתק כתמונה') >= 0);
check('exercise cards render download-as-image button', setSrc.indexOf('הורד כתמונה') >= 0);
check('image buttons call product export actions', /exImageCopy\(/.test(setSrc) && /exImageDownload\(/.test(setSrc));
check('image button bar is excluded from copied images',
  /<div class="ex-imgbar" data-html2canvas-ignore="true">/.test(setSrc));
check('question number/type meta is ignored in copied images',
  /<div class="qmeta" data-html2canvas-ignore="true">[\s\S]*?<span class="ex-num">/.test(setSrc));
check('exercise-set settings meta is ignored in copied images',
  /<div class="qmeta" data-html2canvas-ignore="true">[\s\S]*?meta\.gradeLabel[\s\S]*?meta\.diffLabel/.test(setSrc));

check('captureExerciseCardAsPng exists', /function captureExerciseCardAsPng/.test(exportSrc));
check('copyExerciseImage exists', /function copyExerciseImage/.test(exportSrc));
check('downloadExerciseImage exists', /function downloadExerciseImage/.test(exportSrc));
check('capture uses html2canvas', /html2canvas\(/.test(exportSrc));
check('capture renders on a white background', /backgroundColor:\s*'#ffffff'/.test(exportSrc));
check('capture renders at high resolution', /scale:\s*Math\.max\(3,/.test(exportSrc));
check('capture waits for fonts before snapshot', /document\.fonts[\s\S]*?\.ready/.test(exportSrc));
check('copy-as-image writes PNG ClipboardItem when supported',
  /ClipboardItem/.test(exportSrc) && /navigator\.clipboard\.write/.test(exportSrc));
check('copy-as-image falls back to a PNG download', /copyExerciseImage[\s\S]*?downloadBlob/.test(exportSrc));
check('download uses object URL helper for the captured PNG',
  /function downloadBlob\s*\(\s*blob\s*,\s*filename\s*\)/.test(exportSrc) &&
  /URL\.createObjectURL\(blob\)/.test(exportSrc) &&
  /URL\.revokeObjectURL/.test(exportSrc));
check('image filename is targil-matematika-<n>.png', /targil-matematika-/.test(exportSrc));
check('black-and-white capture path remains available', /grayscale|0\.299/.test(exportSrc));

const ids = pilotIds.concat(sourceFitIds);
let bad = 0;
let noHebrew = 0;
for (const id of ids) {
  for (const qt of ['open', 'mcq', 'tf', 'mistake']) {
    const ex = E.getEngineExercise(id, 'standard', qt);
    if (!ex) continue;
    const q = String(ex.questionHTML || '');
    const a = String(ex.answerHTML || '');
    if (!q || !a || /undefined|NaN/.test(q + a)) bad++;
    if (!hasHebrew(q + a)) noHebrew++;
  }
}
check('all engine copy/export candidates have valid question + answer HTML', bad === 0, bad + ' bad');
check('copy/export candidates preserve Hebrew text', noHebrew === 0, noHebrew + ' without Hebrew');

console.log(fails ? 'COPY_EXPORT_FAIL (' + fails + ')' : 'COPY_EXPORT_PASS');
process.exit(fails ? 1 : 0);
