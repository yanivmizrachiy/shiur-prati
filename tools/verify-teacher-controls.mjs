// tools/verify-teacher-controls.mjs  (verify:teacher-controls)
// Gate for the per-question teacher controls: every advertised edit action is
// implemented on the Teacher API and wired into the rendered control bar —
// regenerate / new numbers / easier / harder / change type / follow-up /
// show-hide solution / source / graphic / copy / export / add-to-worksheet.
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { Teacher } = loadEngines();
const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };

check('Teacher API loaded', !!Teacher);
const FNS = ['refresh', 'toggleNumbers', 'easier', 'harder', 'cycleType', 'followUp',
  'toggleSolution', 'toggleSource', 'toggleGraphic', 'copy', 'copyImage', 'exportHTML', 'exportPNG',
  'addToWorksheet', 'exportWorksheet', 'toggle', 'decorateSet'];
FNS.forEach(fn => check('Teacher.' + fn + ' is a function', Teacher && typeof Teacher[fn] === 'function'));

// the control bar markup (in source) wires each button to its action via the
// b('<action>(' + i ...) button-builder, which prefixes onclick="Teacher.".
const src = read('generator/teacher-mode.js');
const cbStart = src.indexOf('function controlBar');
const controlBarSrc = cbStart >= 0 ? src.slice(cbStart, src.indexOf('Teacher.decorateSet')) : src;
const WIRED = ['refresh', 'easier', 'harder', 'cycleType', 'toggleNumbers', 'followUp',
  'toggleSolution', 'toggleSource', 'toggleGraphic', 'copy', 'copyImage', 'exportHTML', 'exportPNG', 'addToWorksheet'];
WIRED.forEach(w => check('control bar wires ' + w + '()', controlBarSrc.indexOf("b('" + w + "(") >= 0));
check('onclick handlers are namespaced to Teacher.*', /onclick="Teacher\.'/.test(src));

// follow-up control offers all 6 modes
check('follow-up control exposes the 6 modes', Array.isArray(Teacher.MODES) && Teacher.MODES.length === 6);

// show/hide actions toggle a 'show' class (non-destructive)
check('toggle actions are non-destructive (class toggle)', /classList\.toggle\('show'\)/.test(src) || /classList\.toggle\("show"\)/.test(src));

console.log(fails ? 'TEACHER_CONTROLS_FAIL (' + fails + ')' : 'TEACHER_CONTROLS_PASS');
process.exit(fails ? 1 : 0);
