// tools/verify-numeric-g7-source-fit.mjs
// Focused verifier for Grade 7 numeric source-fit coverage.
// Run from repo root: node tools/verify-numeric-g7-source-fit.mjs
import fs from 'node:fs';

function read(path) {
  if (!fs.existsSync(path)) throw new Error(`Missing file: ${path}`);
  return fs.readFileSync(path, 'utf8');
}
function must(text, label, items) {
  const missing = items.filter(item => !text.includes(item));
  if (missing.length) throw new Error(`${label} missing: ${missing.join(', ')}`);
}

const manifest = read('sources/intake/2026-06-09/MANIFEST.md');
const n703 = read('generator/n7-03.js');
const n704 = read('generator/n7-04.js');
const n705 = read('generator/n7-05.js');
const n706 = read('generator/engine/pilot-n7-06.js');
const n707 = read('generator/engine/pilot-n7-07.js');
const pattern = read('generator/engine/pattern-engine.js');

must(manifest, 'source manifest', [
  '05_grade-7_numeric_domain_curriculum.pdf',
  '07_numeric_domain_principles_grades-7-8.pdf'
]);

must(n703, 'number line / opposite / absolute value topics', [
  'N7-08',
  'ציר מספרים והשוואת שליליים ✦ מקור',
  'N7-09',
  'מספר נגדי וערך מוחלט בהקשר ✦ מקור'
]);

must(n704, 'directed add/sub topics', [
  'N7-10',
  'טעויות בחיבור וחיסור מכוונים ✦ מקור',
  'N7-11',
  'חיבור וחיסור מכוונים בהקשר ✦ מקור'
]);

must(n705, 'directed multiplication/division topics', [
  'N7-12',
  'טעויות בכפל וחילוק מכוונים ✦ מקור',
  'N7-13',
  'כללי סימנים בכפל וחילוק ✦ מקור'
]);

must(n706, 'powers smart engine', [
  'generateN706Engine',
  'N7-06 Powers',
  'compare_both',
  'mistake',
  'mcq',
  'tf'
]);

must(n707, 'roots smart engine', [
  'generateN707Engine',
  'N7-07 Square Root',
  'between',
  'missing_sq',
  'sum_trap',
  'mistake',
  'mcq',
  'tf'
]);

must(pattern, 'numeric smart topics registered in pattern engine', [
  'N7-06-ENGINE',
  'N7-07-ENGINE'
]);

console.log(JSON.stringify({
  ok: true,
  area: 'Grade 7 numeric source-fit',
  sourceFiles: ['05_grade-7_numeric_domain_curriculum.pdf', '07_numeric_domain_principles_grades-7-8.pdf'],
  checkedFamilies: [
    'number line comparison',
    'opposite number and absolute value',
    'directed addition/subtraction',
    'directed multiplication/division',
    'powers with sign traps',
    'square roots and estimation traps'
  ]
}, null, 2));
