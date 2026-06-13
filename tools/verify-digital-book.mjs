// tools/verify-digital-book.mjs
// Verifies the static digital PDF source book extracted from PR #2.
// Run from repo root: node tools/verify-digital-book.mjs
import fs from 'node:fs';

let fails = 0;
function check(name, ok, detail='') {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (detail ? ' — ' + detail : ''));
  if (!ok) fails++;
}
function read(path) {
  if (!fs.existsSync(path)) throw new Error(`Missing file: ${path}`);
  return fs.readFileSync(path, 'utf8');
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

check('book files exist', ['generator/book.html','generator/book.css','generator/book.js'].every(p => fs.existsSync(p)));
check('index links to digital source book', index.includes('book.html') && index.includes('ספר מקורות דיגיטלי'));
check('book has RTL Hebrew document', html.includes('<html lang="he" dir="rtl">'));
check('book loads local CSS and JS', html.includes('href="book.css"') && html.includes('src="book.js"'));
check('book has table of contents and reader controls', ['tocList','openToc','focusReader','pdfFrame','nextBtn','prevBtn'].every(id => html.includes(id)));
check('book CSS contains responsive reader layout', css.includes('.book-card') && css.includes('@media(max-width:900px)') && css.includes('.is-focus'));
check('book JS declares exactly 10 source entries', (js.match(/\.pdf'/g) || []).length === 10);
check('book JS references all expected source PDFs', expectedPdfs.every(pdf => js.includes(pdf)));
check('book JS only references source intake PDFs', !js.includes('http://') && !js.includes('https://') && js.includes('../sources/intake/2026-06-09/'));
check('all referenced PDF files exist', expectedPdfs.every(pdf => {
  const match = js.match(new RegExp("'([^']*" + pdf.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ")'"));
  return match && fs.existsSync('generator/' + match[1]);
}));

console.log(JSON.stringify({
  ok: fails === 0,
  checkedAt: new Date().toISOString(),
  sourcePdfCount: expectedPdfs.length,
  files: ['generator/book.html','generator/book.css','generator/book.js']
}, null, 2));

process.exit(fails ? 1 : 0);
