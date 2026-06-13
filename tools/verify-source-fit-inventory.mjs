// tools/verify-source-fit-inventory.mjs
// Static inventory verifier for source-fit coverage docs and focused verifiers.
// Run from repo root: node tools/verify-source-fit-inventory.mjs
import fs from 'node:fs';

function read(path) {
  if (!fs.existsSync(path)) throw new Error(`Missing file: ${path}`);
  return fs.readFileSync(path, 'utf8');
}
function must(text, label, items) {
  const missing = items.filter(item => !text.includes(item));
  if (missing.length) throw new Error(`${label} missing: ${missing.join(', ')}`);
}

const requiredFiles = [
  'package.json',
  'generator/book.html',
  'generator/book.css',
  'generator/book.js',
  'docs/EXTREME_COMPLETION_PLAN_20260612.md',
  'docs/SOURCE_COVERAGE_MATRIX_20260612.md',
  'docs/SOURCE_FIT_ALGEBRA_G8_EXPANSION_20260612.md',
  'docs/SOURCE_FIT_NUMERIC_G7_EXPANSION_20260612.md',
  'docs/SOURCE_FIT_UNCERTAINTY_EXPANSION_20260612.md',
  'docs/SOURCE_FIT_GEOMETRY_G7_EXPANSION_20260612_B.md',
  'docs/SOURCE_FIT_GEOMETRY_G7_PYTHAGORAS_ANGLES_20260612.md',
  'docs/SOURCE_FIT_GEOMETRY_G8_EXPANSION_20260612.md',
  'tools/verify-chatgpt-source-fit-sync.mjs',
  'tools/verify-numeric-g7-source-fit.mjs',
  'tools/verify-algebra-g8-source-fit.mjs',
  'tools/verify-geometry-g7-source-fit.mjs',
  'tools/verify-geometry-g8-source-fit.mjs',
  'tools/verify-real-generator-runtime.mjs',
  'tools/verify-index-script-links.mjs',
  'tools/verify-digital-book.mjs',
  'tools/verify-all-termux.sh'
];

for (const file of requiredFiles) read(file);

const pkg = read('package.json');
const index = read('generator/index.html');
const bookJs = read('generator/book.js');
const plan = read('docs/EXTREME_COMPLETION_PLAN_20260612.md');
const matrix = read('docs/SOURCE_COVERAGE_MATRIX_20260612.md');
const a8 = read('docs/SOURCE_FIT_ALGEBRA_G8_EXPANSION_20260612.md');
const n7 = read('docs/SOURCE_FIT_NUMERIC_G7_EXPANSION_20260612.md');
const u7 = read('docs/SOURCE_FIT_UNCERTAINTY_EXPANSION_20260612.md');
const g7a = read('docs/SOURCE_FIT_GEOMETRY_G7_EXPANSION_20260612_B.md');
const g7b = read('docs/SOURCE_FIT_GEOMETRY_G7_PYTHAGORAS_ANGLES_20260612.md');
const g8 = read('docs/SOURCE_FIT_GEOMETRY_G8_EXPANSION_20260612.md');

must(pkg, 'package scripts', ['verify:all', 'verify:runtime', 'verify:links', 'verify:book', 'verify:inventory']);
must(index, 'index digital book link', ['book.html', 'ספר מקורות דיגיטלי']);
must(bookJs, 'digital book source list', [
  '01_grade-7_algebra_curriculum.pdf',
  '02_grade-8_algebra_curriculum.pdf',
  '03_grade-7_pre_deductive_geometry_curriculum.pdf',
  '04_grade-8_geometry_curriculum.pdf',
  '05_grade-7_numeric_domain_curriculum.pdf',
  '06_uncertainty_domain_curriculum_examples.pdf',
  '07_numeric_domain_principles_grades-7-8.pdf',
  '08_algebra_domain_principles_grades-7-8.pdf',
  '09_geometry_domain_principles_grades-7-8.pdf',
  '10_grade-8_teaching_sequence_2026-2027.pdf'
]);
must(plan, 'extreme plan', ['50%', '60%', '70%', '82%', '92%', '100%']);
must(matrix, 'source coverage matrix', [
  'File 01', 'File 02', 'File 03', 'File 04', 'File 05',
  'File 06', 'File 07', 'File 08', 'File 09', 'File 10'
]);
must(a8, 'grade 8 algebra doc', ['A8-04', 'A8-05', 'A8-06']);
must(n7, 'grade 7 numeric doc', ['N7-08', 'N7-09']);
must(u7, 'uncertainty doc', ['U7-05', 'U7-06', 'U7-07', 'U7-08']);
must(g7a, 'grade 7 geometry nets doc', ['G7-07', 'G7-08']);
must(g7b, 'grade 7 geometry pythagoras angles doc', ['G7-09', 'G7-10']);
must(g8, 'grade 8 geometry doc', ['G8-10', 'G8-11']);

console.log(JSON.stringify({
  ok: true,
  checkedAt: new Date().toISOString(),
  requiredFiles: requiredFiles.length,
  gates: ['50%', '60%', '70%', '82%', '92%', '100%'],
  sourceFilesCoveredInMatrix: 10,
  focusedAreas: [
    'grade 7 numeric',
    'grade 8 algebra',
    'uncertainty',
    'grade 7 geometry',
    'grade 8 geometry',
    'runtime verifier',
    'index script link verifier',
    'digital source book',
    'npm verify scripts',
    'termux verify runner'
  ]
}, null, 2));
