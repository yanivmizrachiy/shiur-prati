// tools/verify-digital-book.mjs
// Verifies the static digital PDF source book extracted from PR #2.
// Run from repo root: node tools/verify-digital-book.mjs
import fs from 'node:fs';
import path from 'node:path';

let fails = 0;
function check(name, ok, detail='') {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (detail ? ' — ' + detail : ''));
  if (!ok) fails++;
}
function read(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing file: ${filePath}`);
  return fs.readFileSync(filePath, 'utf8');
}
function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const index = read('generator/index.html');
const html = read('generator/book.html');
const css = read('generator/book.css');
const js = read('generator/book.js');

const expectedPdfs = [
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
];

const sourcePdfPaths = [...js.matchAll(/'((?:\.\.\/sources\/intake\/2026-06-09\/)[^']+\.pdf)'/g)].map(m => m[1]);
const fileNames = [...js.matchAll(/'([^']+\.pdf)'/g)].map(m => m[1]).filter(v => !v.includes('/'));
const missingPdfPaths = sourcePdfPaths.filter(pdfPath => !fs.existsSync(path.normalize(path.join('generator', pdfPath))));

check('book files exist', ['generator/book.html','generator/book.css','generator/book.js'].every(p => fs.existsSync(p)));
check('index links to digital source book', index.includes('book.html') && index.includes('ספר מקורות דיגיטלי'));
check('book has RTL Hebrew document', html.includes('<html lang="he" dir="rtl">'));
check('book loads local CSS and JS', html.includes('href="book.css"') && html.includes('src="book.js"'));
check('book has table of contents and reader controls', ['tocList','openToc','focusReader','pdfFrame','nextBtn','prevBtn'].every(id => html.includes(id)));
check('book CSS contains responsive reader layout', css.includes('.book-card') && css.includes('@media(max-width:900px)') && css.includes('.is-focus'));
check('book JS declares exactly 10 source path entries', sourcePdfPaths.length === 10, `found ${sourcePdfPaths.length}`);
check('book JS declares exactly 10 display file names', fileNames.length === 10, `found ${fileNames.length}`);
check('book JS references all expected source PDFs', expectedPdfs.every(pdf => js.includes(pdf)));
check('book JS only references source intake PDFs', !js.includes('http://') && !js.includes('https://') && js.includes('../sources/intake/2026-06-09/'));
check('all referenced source PDF files exist', missingPdfPaths.length === 0, missingPdfPaths.join(', '));
check('expected PDFs appear as source paths', expectedPdfs.every(pdf => sourcePdfPaths.some(p => p.endsWith('/' + pdf))), expectedPdfs.filter(pdf => !sourcePdfPaths.some(p => p.endsWith('/' + pdf))).join(', '));
check('expected PDFs appear as display filenames', expectedPdfs.every(pdf => fileNames.includes(pdf)), expectedPdfs.filter(pdf => !fileNames.includes(pdf)).join(', '));

console.log(JSON.stringify({
  ok: fails === 0,
  checkedAt: new Date().toISOString(),
  sourcePdfCount: expectedPdfs.length,
  sourcePathCount: sourcePdfPaths.length,
  displayFileNameCount: fileNames.length,
  files: ['generator/book.html','generator/book.css','generator/book.js']
}, null, 2));

process.exit(fails ? 1 : 0);
