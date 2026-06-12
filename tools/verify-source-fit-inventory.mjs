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
  'docs/EXTREME_COMPLETION_PLAN_20260612.md',
  'docs/SOURCE_COVERAGE_MATRIX_20260612.md',
  'docs/SOURCE_FIT_ALGEBRA_G8_EXPANSION_20260612.md',
  'docs/SOURCE_FIT_NUMERIC_G7_EXPANSION_20260612.md',
  'docs/SOURCE_FIT_UNCERTAINTY_EXPANSION_20260612.md',
  'tools/verify-chatgpt-source-fit-sync.mjs',
  'tools/verify-numeric-g7-source-fit.mjs',
  'tools/verify-algebra-g8-source-fit.mjs'
];

for (const file of requiredFiles) read(file);

const plan = read('docs/EXTREME_COMPLETION_PLAN_20260612.md');
const matrix = read('docs/SOURCE_COVERAGE_MATRIX_20260612.md');
const a8 = read('docs/SOURCE_FIT_ALGEBRA_G8_EXPANSION_20260612.md');
const n7 = read('docs/SOURCE_FIT_NUMERIC_G7_EXPANSION_20260612.md');
const u7 = read('docs/SOURCE_FIT_UNCERTAINTY_EXPANSION_20260612.md');

must(plan, 'extreme plan', ['50%', '60%', '70%', '82%', '92%', '100%']);
must(matrix, 'source coverage matrix', [
  'File 01', 'File 02', 'File 03', 'File 04', 'File 05',
  'File 06', 'File 07', 'File 08', 'File 09', 'File 10'
]);
must(a8, 'grade 8 algebra doc', ['A8-04', 'A8-05', 'A8-06']);
must(n7, 'grade 7 numeric doc', ['N7-08', 'N7-09']);
must(u7, 'uncertainty doc', ['U7-05', 'U7-06', 'U7-07', 'U7-08']);

console.log(JSON.stringify({
  ok: true,
  checkedAt: new Date().toISOString(),
  requiredFiles: requiredFiles.length,
  gates: ['50%', '60%', '70%', '82%', '92%', '100%'],
  sourceFilesCoveredInMatrix: 10,
  focusedAreas: ['grade 7 numeric', 'grade 8 algebra', 'uncertainty']
}, null, 2));
