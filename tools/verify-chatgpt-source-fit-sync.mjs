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
function excludesAll(name, text, items) {
  const found = items.filter(item => text.includes(item));
  assert(`${name}: ${found.length ? 'found stale '+found.join(', ') : 'no stale mappings'}`, found.length === 0);
}

const index = read('generator/index.html');
const sourceFit = read('generator/engine/source-fit-extensions.js');
const graphs = read('generator/engine/source-fit-graphs.js');
const geometry = read('generator/engine/source-fit-geometry.js');
const algebraSmartG7 = read('generator/engine/source-fit-algebra-g7.js');
const sourceRegistry = read('generator/engine/source-registry.js');
const pedagogyRegistry = read('generator/engine/pedagogy-registry.js');
const uncertaintyLegacy = read('generator/u7-02.js');
const numericG7Legacy = read('generator/n7-03.js');
const numericG7Directed = read('generator/n7-04.js');
const numericG7MulDiv = read('generator/n7-05.js');
const algebraLegacy = read('generator/a7-02.js');
const geometryG7Legacy = read('generator/g7-02.js');
const geometryG8CircleLegacy = read('generator/g8-01.js');
const geometryG8TriangleLegacy = read('generator/g8-04.js');
const manifest = read('sources/intake/2026-06-09/MANIFEST.md');
const patternIndex = read('question-patterns/PATTERN_INDEX.md');
const sourceBible = read('docs/SOURCE_BIBLE.md');
const coverageCensus = read('docs/reports/QUESTION_COVERAGE_CENSUS_LATEST.md');
const visualCoverageMatrix = read('docs/reports/VISUAL_COVERAGE_MATRIX.json');
const visualCoverageReport = read('docs/reports/VISUAL_COVERAGE_REPORT_20260614.md');
const sourceCoverageMatrix = read('docs/SOURCE_COVERAGE_MATRIX_20260612.md');
const sourceBackedGaps = read('docs/reports/SOURCE_BACKED_COVERAGE_GAPS_20260614.md');

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

// Query-agnostic: the cache-busting ?v=... suffix may change per deploy; the
// load ORDER is asserted separately below by filename.
includesAll('index source-fit runtime load order', index, [
  'engine/pattern-engine.js',
  'engine/source-fit-extensions.js',
  'engine/source-fit-graphs.js',
  'engine/source-fit-geometry.js',
  'engine/source-fit-algebra-g7.js',
  'exercise-set.js'
]);
assert('source-fit extensions load before exercise-set', index.indexOf('source-fit-extensions.js') < index.indexOf('exercise-set.js'));
assert('source-fit graphs load before exercise-set', index.indexOf('source-fit-graphs.js') < index.indexOf('exercise-set.js'));
assert('source-fit geometry loads before exercise-set', index.indexOf('source-fit-geometry.js') < index.indexOf('exercise-set.js'));
assert('source-fit algebra g7 loads before exercise-set', index.indexOf('source-fit-algebra-g7.js') < index.indexOf('exercise-set.js'));

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
includesAll('grade 7 algebra smart engine ids', algebraSmartG7, [
  'A7-04-ENGINE',
  'ביטויים שקולים ופישוט ✦ מנוע מקור',
  'A7-05-ENGINE',
  'טבלת ערכים וגרף ברביע ראשון ✦ מנוע מקור',
  'open',
  'mcq',
  'tf',
  'mistake',
  'mixed'
]);
includesAll('uncertainty active source-fit topics', uncertaintyLegacy, [
  'U7-05',
  'דיאגרמת עוגה ושכיחות יחסית ✦ מקור',
  'U7-06',
  'תרשים מטעה — ביקורת ✦ מקור',
  'U7-07',
  'טבלת שכיחויות ושכיחות יחסית ✦ מקור',
  'U7-08',
  'ממוצע חציון וטווח ✦ מקור'
]);
includesAll('grade 7 numeric active source-fit topics', numericG7Legacy, [
  'N7-08',
  'ציר מספרים והשוואת שליליים ✦ מקור',
  'N7-09',
  'מספר נגדי וערך מוחלט בהקשר ✦ מקור'
]);
includesAll('grade 7 directed-number active source-fit topics', numericG7Directed, [
  'N7-10',
  'טעויות בחיבור וחיסור מכוונים ✦ מקור',
  'N7-11',
  'חיבור וחיסור מכוונים בהקשר ✦ מקור'
]);
includesAll('grade 7 directed multiplication and division topics', numericG7MulDiv, [
  'N7-12',
  'טעויות בכפל וחילוק מכוונים ✦ מקור',
  'N7-13',
  'כללי סימנים בכפל וחילוק ✦ מקור'
]);
includesAll('grade 7 algebra active fallback topics', algebraLegacy, [
  'A7-04',
  'ביטויים שקולים ופישוט ✦ מקור',
  'A7-05',
  'טבלת ערכים וגרף ברביע ראשון ✦ מקור'
]);
includesAll('grade 7 geometry active source-fit topics', geometryG7Legacy, [
  'G7-05',
  'הזזות שיקופים וסיבובים ✦ מקור',
  'G7-06',
  'שטח צורה מורכבת ✦ מקור'
]);
includesAll('grade 8 circle active source-fit topics', geometryG8CircleLegacy, [
  'G8-05',
  'זווית מרכזית וחלק מעיגול ✦ מקור',
  'G8-06',
  'קוטר רדיוס ומיתר ✦ מקור'
]);
includesAll('grade 8 triangle active source-fit topics', geometryG8TriangleLegacy, [
  'G8-07',
  'חפיפת משולשים לפי סימונים ✦ מקור',
  'G8-08',
  'משולש שווה שוקיים ✦ מקור',
  'G8-09',
  'דמיון וצללים ✦ מקור'
]);

const activeA7SyncText = [
  algebraSmartG7,
  algebraLegacy,
  sourceRegistry,
  pedagogyRegistry,
  patternIndex,
  sourceBible,
  coverageCensus,
  visualCoverageMatrix,
  visualCoverageReport,
  sourceCoverageMatrix,
  sourceBackedGaps
].join('\n');
includesAll('A7-04/A7-05 current source mapping across active docs', activeA7SyncText, [
  'A7-04-ENGINE',
  'ביטויים שקולים ופישוט',
  'equal-for-all-values',
  'A7-05-ENGINE',
  'טבלת ערכים וגרף ברביע ראשון',
  'value_table_graph_quadrant_1',
  'Value table + first-quadrant graph'
]);
excludesAll('A7-04/A7-05 stale source mapping guard', activeA7SyncText, [
  'A7-05 expression mistake',
  'A7-05-ENGINE | מציאת טעות בביטויים',
  'A7-05` | active fallback | Convert to smart engine',
  'Find mistake in expressions | `A7-05`',
  'Mistake analysis | `A7-05`',
  'מציאת טעות בביטויים ✦ מקור',
  'מציאת טעות בביטויים ✦ מנוע מקור',
  'A7-04 | גרף וטבלת ערכים',
  'A7-04 — graph + value table',
  'Inequalities (legacy sources)'
]);

const report = {
  ok: true,
  checkedAt: new Date().toISOString(),
  checks: checks.length,
  sourceFitClusters: [
    'N7-01 coordinate system Q1',
    'N7-08 number line comparison source-fit topic',
    'N7-09 opposite number and absolute value context source-fit topic',
    'N7-10 directed add/sub mistake analysis source-fit topic',
    'N7-11 directed add/sub context source-fit topic',
    'N7-12 directed multiplication/division mistake analysis source-fit topic',
    'N7-13 directed multiplication/division sign rules source-fit topic',
    'U7-03 relative-frequency comparison',
    'A8-01 applied graph/function reading',
    'U7-04 bar-chart reading',
    'G8-02 cylinder and net',
    'G8-03 parallel-line angles',
    'U7-05 pie chart and relative frequency source-fit topic',
    'U7-06 misleading graph critique source-fit topic',
    'U7-07 frequency table and relative frequency source-fit topic',
    'U7-08 mean median range source-fit topic',
    'A7-04 equivalent expressions smart engine',
    'A7-05 value table and quadrant-I graph smart engine',
    'G7-05 transformations source-fit topic',
    'G7-06 composite area source-fit topic',
    'G8-05 central angle and sector source-fit topic',
    'G8-06 diameter radius and chord source-fit topic',
    'G8-07 triangle congruence markings source-fit topic',
    'G8-08 isosceles triangle source-fit topic',
    'G8-09 similarity and shadows source-fit topic'
  ]
};
console.log(JSON.stringify(report, null, 2));
