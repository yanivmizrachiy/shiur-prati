// tools/verify-chatgpt-source-fit-sync.mjs
// Static verifier for the source-fit upgrades synced from ChatGPT/Claude-Code-informed work.
// Run from repo root: node tools/verify-chatgpt-source-fit-sync.mjs
import fs from 'node:fs';

const checks = [];
function read(path) {
  if (!fs.existsSync(path)) throw new Error(`Missing file: ${path}`);
  return fs.readFileSync(path, 'utf8');
}
function assert(name, condition) {
  checks.push({ name, ok: Boolean(condition) });
  if (!condition) throw new Error(`FAIL: ${name}`);
}
function includesAll(name, text, items) {
  const missing = items.filter(item => !text.includes(item));
  assert(`${name}: ${missing.length ? 'missing '+missing.join(', ') : 'all present'}`, missing.length === 0);
}

const index = read('generator/index.html');
const sourceFit = read('generator/engine/source-fit-extensions.js');
const graphs = read('generator/engine/source-fit-graphs.js');
const geometry = read('generator/engine/source-fit-geometry.js');
const uncertaintyLegacy = read('generator/u7-02.js');
const algebraLegacy = read('generator/a7-02.js');
const geometryLegacy = read('generator/g7-02.js');
const manifest = read('sources/intake/2026-06-09/MANIFEST.md');

includesAll('manifest source files', manifest, [
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

includesAll('index source-fit runtime load order', index, [
  'engine/pattern-engine.js',
  'engine/source-fit-extensions.js?v=20260612-source-fit-1',
  'engine/source-fit-graphs.js?v=20260612-source-fit-2',
  'engine/source-fit-geometry.js?v=20260612-source-fit-3',
  'exercise-set.js?v=20260612-chatgpt-sync'
]);
assert('source-fit extensions load before exercise-set', index.indexOf('source-fit-extensions.js') < index.indexOf('exercise-set.js'));
assert('source-fit graphs load before exercise-set', index.indexOf('source-fit-graphs.js') < index.indexOf('exercise-set.js'));
assert('source-fit geometry loads before exercise-set', index.indexOf('source-fit-geometry.js') < index.indexOf('exercise-set.js'));

includesAll('source-fit extension engine ids', sourceFit, [
  'N7-01-ENGINE',
  'U7-03-ENGINE',
  'מערכת צירים — רביע ראשון ✦ מקור',
  'השוואת קבוצות — תדירות יחסית ✦ מקור'
]);
includesAll('source-fit graph engine ids', graphs, [
  'A8-01-ENGINE',
  'U7-04-ENGINE',
  'גרפים יישומיים ופונקציות ✦ מקור',
  'קריאה מתרשים עמודות ✦ מקור'
]);
includesAll('source-fit geometry engine ids', geometry, [
  'G8-02-ENGINE',
  'G8-03-ENGINE',
  'גליל ופריסה ✦ מקור',
  'זוויות בין מקבילים ✦ מקור'
]);
includesAll('advanced uncertainty active fallback topics', uncertaintyLegacy, [
  'U7-05',
  'דיאגרמת עוגה ושכיחות יחסית ✦ מקור',
  'U7-06',
  'תרשים מטעה — ביקורת ✦ מקור'
]);
includesAll('grade 7 algebra active source-fit topics', algebraLegacy, [
  'A7-04',
  'ביטויים שקולים ופישוט ✦ מקור',
  'A7-05',
  'מציאת טעות בביטויים ✦ מקור'
]);
includesAll('grade 7 geometry active source-fit topics', geometryLegacy, [
  'G7-05',
  'הזזות שיקופים וסיבובים ✦ מקור',
  'G7-06',
  'שטח צורה מורכבת ✦ מקור'
]);

const report = {
  ok: true,
  checkedAt: new Date().toISOString(),
  checks: checks.length,
  sourceFitClusters: [
    'N7-01 coordinate system Q1',
    'U7-03 relative-frequency comparison',
    'A8-01 applied graph/function reading',
    'U7-04 bar-chart reading',
    'G8-02 cylinder and net',
    'G8-03 parallel-line angles',
    'U7-05 pie chart and relative frequency fallback',
    'U7-06 misleading graph critique fallback',
    'A7-04 equivalent expressions and simplification fallback',
    'A7-05 expression mistake analysis fallback',
    'G7-05 transformations fallback',
    'G7-06 composite area fallback'
  ]
};
console.log(JSON.stringify(report, null, 2));
