// tools/verify-teacher-advanced-mode.mjs  (standalone historical/internal)
// Historical/internal Teacher Advanced Mode gate: the main generator must not
// expose the teacher toggle, while the archived Teacher API remains internally
// loadable for old QA/workbench pages.
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { E, Teacher, pilotIds, sourceFitIds, callEngine } = loadEngines({ loadTeacher: true });
const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };

// 1. main generator must stay task-generation-only
const idx = read('generator/index.html');
check('index.html does not load teacher-mode.js', !/teacher-mode\.js/.test(idx));
check('index.html has no teacher toggle button', !/id="btnTeacherMode"/.test(idx) && !/Teacher\.toggle\(\)/.test(idx));
check('index.html does not link the internal gallery', !/gallery\.html/.test(idx));

// 2. teacher-mode API present
check('Teacher API loaded', !!Teacher);
['advanced', 'toggle', 'decorateSet', 'buildTeacherCardHTML', 'buildCopyPayload', 'htmlToText'].forEach(k =>
  check('Teacher.' + k + ' present', Teacher && typeof Teacher[k] !== 'undefined'));

// 3. every engine exposes a complete meta for the teacher card
const ids = pilotIds.concat(sourceFitIds);
let metaBad = 0;
for (const id of ids) {
  const r = callEngine(id, 'standard', 'open');
  const m = r && r.meta;
  const ok = m && m.sourceFile && m.skill && m.questionFamily && m.learningGoal && m.teacherPurpose &&
    m.misconception && m.familyProvenance && m.difficultyLabel && m.cognitiveDemand &&
    m.teacherMove && m.scaffoldHint && m.stretchPrompt && m.evidenceLookFor;
  if (!ok) { metaBad++; console.log('  META ' + id + ' missing: ' + JSON.stringify(m)); }
}
check('every engine meta is complete for the teacher card (' + ids.length + ')', metaBad === 0, metaBad + ' incomplete');

// 4. teacher card markup is student-print-safe & contains the pedagogy
const sample = E.getEngineExercise('G8-05-ENGINE', 'standard', 'open');
const cardHTML = Teacher.buildTeacherCardHTML(sample.meta);
check('teacher card is teacher-only', /teacher-only/.test(cardHTML));
check('teacher card is excluded from PNG export', /data-html2canvas-ignore="true"/.test(cardHTML));
check('teacher card shows source + family + goal + misconception',
  cardHTML.indexOf(sample.meta.sourceFile) >= 0 && cardHTML.indexOf(sample.meta.questionFamily) >= 0 &&
  /מטרת למידה/.test(cardHTML) && /טעות נפוצה/.test(cardHTML));
check('teacher card shows level thinking and scaffolding',
  /רמת חשיבה/.test(cardHTML) && /מה המורה מחפש/.test(cardHTML) && /פיגום/.test(cardHTML) && /הקפצה/.test(cardHTML));

// 5. print stylesheet hides teacher chrome
const css = read('generator/style.css');
const printBlock = css.slice(css.indexOf('@media print'));
['.teacher-only', '.teacher-controls', '.teacher-card'].forEach(sel =>
  check('print stylesheet hides ' + sel, printBlock.indexOf(sel) >= 0));
check('teacher-only hidden by default (revealed only in advanced mode)',
  /\.teacher-only\s*\{\s*display:\s*none/.test(css) && /body\.teacher-advanced\s+\.teacher-only/.test(css));

console.log(fails ? 'TEACHER_ADVANCED_FAIL (' + fails + ')' : 'TEACHER_ADVANCED_PASS');
process.exit(fails ? 1 : 0);
