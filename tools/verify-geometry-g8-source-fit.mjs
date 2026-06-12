// tools/verify-geometry-g8-source-fit.mjs
// Focused verifier for Grade 8 geometry source-fit coverage.
// Run from repo root: node tools/verify-geometry-g8-source-fit.mjs
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
const g801 = read('generator/g8-01.js');
const g804 = read('generator/g8-04.js');
const geometryEngine = read('generator/engine/source-fit-geometry.js');

must(manifest, 'source manifest', [
  '04_grade-8_geometry_curriculum.pdf',
  '09_geometry_domain_principles_grades-7-8.pdf'
]);

must(g801, 'circle source-fit topics', [
  'G8-05',
  'זווית מרכזית וחלק מעיגול ✦ מקור',
  'G8-06',
  'קוטר רדיוס ומיתר ✦ מקור'
]);

must(geometryEngine, 'cylinder and parallel lines smart engines', [
  'G8-02-ENGINE',
  'גליל ופריסה ✦ מקור',
  'G8-03-ENGINE',
  'זוויות בין מקבילים ✦ מקור'
]);

must(g804, 'triangle source-fit topics', [
  'G8-07',
  'חפיפת משולשים לפי סימונים ✦ מקור',
  'G8-08',
  'משולש שווה שוקיים ✦ מקור',
  'G8-09',
  'דמיון וצללים ✦ מקור',
  'G8-10',
  'חפיפה — מה חסר להוכחה ✦ מקור',
  'G8-11',
  'דמיון — יחס שטחים והיקפים ✦ מקור'
]);

console.log(JSON.stringify({
  ok: true,
  area: 'Grade 8 geometry source-fit',
  sourceFiles: ['04_grade-8_geometry_curriculum.pdf', '09_geometry_domain_principles_grades-7-8.pdf'],
  checkedFamilies: [
    'circle central angles and chord/radius/diameter',
    'cylinder and net',
    'parallel lines and transversals',
    'triangle congruence from markings',
    'missing condition for congruence',
    'isosceles triangle reasoning',
    'similarity and shadows',
    'similarity perimeter and area ratios'
  ]
}, null, 2));
