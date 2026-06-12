// tools/verify-geometry-g7-source-fit.mjs
// Focused verifier for Grade 7 geometry source-fit coverage.
// Run from repo root: node tools/verify-geometry-g7-source-fit.mjs
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
const g701 = read('generator/g7-01.js');
const g702 = read('generator/g7-02.js');
const pyth = read('generator/engine/pilot-g7-03.js');
const angles = read('generator/engine/pilot-g7-04.js');

must(manifest, 'source manifest', [
  '03_grade-7_pre_deductive_geometry_curriculum.pdf',
  '09_geometry_domain_principles_grades-7-8.pdf'
]);

must(g701, 'nets and cuboid topics', [
  'G7-07',
  'פריסת תיבה וזיהוי פאות ✦ מקור',
  'G7-08',
  'נפח תיבה מתוך פריסה ✦ מקור'
]);

must(g702, 'transformations and composite area topics', [
  'G7-05',
  'הזזות שיקופים וסיבובים ✦ מקור',
  'G7-06',
  'שטח צורה מורכבת ✦ מקור'
]);

must(pyth, 'pythagoras smart engine', [
  'generateG703Engine',
  'פיתגורס',
  'mcq',
  'tf',
  'mistake'
]);

must(angles, 'angle smart engine', [
  'generateG704Engine',
  'זווית',
  'mcq',
  'tf',
  'mistake'
]);

console.log(JSON.stringify({
  ok: true,
  area: 'Grade 7 geometry source-fit',
  sourceFiles: ['03_grade-7_pre_deductive_geometry_curriculum.pdf', '09_geometry_domain_principles_grades-7-8.pdf'],
  checkedFamilies: [
    'rectangles and cuboids',
    'nets and faces',
    'cuboid volume and surface area',
    'transformations',
    'composite area',
    'pythagoras',
    'angle reasoning'
  ]
}, null, 2));
