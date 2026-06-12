// tools/verify-algebra-g8-source-fit.mjs
// Focused verifier for Grade 8 algebra source-fit coverage.
// Run from repo root: node tools/verify-algebra-g8-source-fit.mjs
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
const a803 = read('generator/a8-03.js');
const graphs = read('generator/engine/source-fit-graphs.js');
const a802Smart = read('generator/engine/pilot-a8-02.js');
const a803Smart = read('generator/engine/pilot-a8-03.js');

must(manifest, 'source manifest', [
  '02_grade-8_algebra_curriculum.pdf',
  '08_algebra_domain_principles_grades-7-8.pdf',
  '10_grade-8_teaching_sequence_2026-2027.pdf'
]);

must(graphs, 'applied graph / function engine', [
  'A8-01-ENGINE',
  'גרפים יישומיים ופונקציות ✦ מקור'
]);

must(a802Smart, 'slope and line smart engine', [
  'generateA802Engine',
  'שיפוע',
  'mcq',
  'tf',
  'mistake'
]);

must(a803Smart, 'systems smart engine', [
  'generateA803Engine',
  'מערכת',
  'mcq',
  'tf',
  'mistake'
]);

must(a803, 'grade 8 algebra active source-fit topics', [
  'A8-04',
  'אי־שוויונות ומגבלות ✦ מקור',
  'A8-05',
  'משוואות אחוזים ✦ מקור',
  'A8-06',
  'טבלה ביטוי וגרף של פונקציה ✦ מקור'
]);

console.log(JSON.stringify({
  ok: true,
  area: 'Grade 8 algebra source-fit',
  sourceFiles: [
    '02_grade-8_algebra_curriculum.pdf',
    '08_algebra_domain_principles_grades-7-8.pdf',
    '10_grade-8_teaching_sequence_2026-2027.pdf'
  ],
  checkedFamilies: [
    'applied graphs and functions',
    'slope and line equations',
    'systems of equations',
    'inequalities and constraints',
    'percentage equations',
    'table expression graph matching'
  ]
}, null, 2));
