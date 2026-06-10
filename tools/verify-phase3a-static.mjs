import fs from 'node:fs';

function read(path) {
  if (!fs.existsSync(path)) throw new Error(`Missing required file: ${path}`);
  return fs.readFileSync(path, 'utf8');
}

function mustInclude(text, needle, label) {
  if (!text.includes(needle)) throw new Error(`${label} missing: ${needle}`);
}

const requiredFiles = [
  'generator/engine/schema.js',
  'generator/engine/random.js',
  'generator/engine/validators.js',
  'generator/engine/themes.js',
  'generator/engine/diagrams.js',
  'generator/engine/question-types.js',
  'generator/engine/engine.css',
  'generator/engine/pilot-g7-03.js',
  'generator/engine/pilot-n8-04.js',
  'generator/engine/pattern-engine.js'
];

for (const file of requiredFiles) {
  const size = fs.statSync(file).size;
  if (size < 50) throw new Error(`Engine file too small or stub-like: ${file} (${size} bytes)`);
}
console.log('Engine files present ✅');

const index = read('generator/index.html');
const core = read('generator/core.js');
const pattern = read('generator/engine/pattern-engine.js');
const g703 = read('generator/engine/pilot-g7-03.js');
const n804 = read('generator/engine/pilot-n8-04.js');
const qtypes = read('generator/engine/question-types.js');
const diagrams = read('generator/engine/diagrams.js');
const css = read('generator/engine/engine.css');
const status = read('PROJECT_STATUS.md');
const rules = read('RULES.md');

if (/^\s*import\s/m.test(core)) throw new Error('core.js contains ES module import; current app uses classic script loading');
if (/type=["']module["']/i.test(index)) throw new Error('index.html unexpectedly uses module scripts; Phase 3A expects classic browser scripts');
console.log('Classic script integration preserved ✅');

for (const file of requiredFiles) {
  const script = `<script src="${file.replace('generator/', '')}"></script>`;
  if (file.endsWith('.css')) continue;
  mustInclude(index, script, 'index.html engine loading');
}
console.log('Engine scripts loaded by index.html ✅');

mustInclude(index, 'id="enginePanel"', 'engine panel');
mustInclude(index, 'id="selQType"', 'question type selector');
mustInclude(index, 'id="selDiff"', 'engine difficulty selector');
mustInclude(index, 'value="open"', 'open question type');
mustInclude(index, 'value="mcq"', 'mcq question type');
mustInclude(index, 'value="tf"', 'true/false question type');
mustInclude(index, 'value="mistake"', 'mistake question type');
console.log('Engine controls exist ✅');

mustInclude(pattern, 'G7-03-ENGINE', 'Pythagoras engine registration');
mustInclude(pattern, 'N8-04-ENGINE', 'percent engine registration');
mustInclude(pattern, 'generateG703Engine', 'Pythagoras engine call');
mustInclude(pattern, 'generateN804Engine', 'percent engine call');
mustInclude(pattern, 'updatePanel', 'engine panel visibility hook');
console.log('Engine topics registered ✅');

for (const needle of ['open', 'mcq', 'tf', 'mistake']) {
  mustInclude(qtypes, needle, `question-types ${needle}`);
}
console.log('Question type renderers present ✅');

for (const needle of ['rightTriangleSvg', 'rectangleDiagonalSvg', 'unknown', 'given']) {
  mustInclude(diagrams, needle, `diagram engine ${needle}`);
}
console.log('Diagram engine present ✅');

for (const needle of ['generateG703Engine', 'rightTriangleSvg', 'rectangleDiagonalSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(g703, needle, `G7-03 engine ${needle}`);
}
console.log('G7-03 engine behavior present ✅');

for (const needle of ['generateN804Engine', 'pct_of_n', 'find_whole', 'find_pct', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(n804, needle, `N8-04 engine ${needle}`);
}
console.log('N8-04 engine behavior present ✅');

for (const needle of ['engine-panel', 'engine-badge', 'mcq-choice', 'tf-statement', 'mistake-box']) {
  mustInclude(css, needle, `engine CSS ${needle}`);
}
console.log('Engine CSS present ✅');

mustInclude(status, 'Phase 3A true engine pilots', 'PROJECT_STATUS Phase 3A status');
mustInclude(status, 'verify-phase3a.yml', 'PROJECT_STATUS verification reference');
mustInclude(rules, 'No fake controls', 'RULES no fake controls');
mustInclude(rules, 'Source-based question variety', 'RULES source variety');
console.log('Documentation guardrails present ✅');

console.log('Phase 3A static engine audit PASS ✅');
