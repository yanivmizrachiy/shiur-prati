// tools/verify-geometry-terminology.mjs
// Guards Hebrew mathematical terminology in Grade 7 Pythagoras output.
// In Hebrew worksheets, use "ניצב/ניצבים" for the legs of a right triangle.
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
function check(name, ok, extra) {
  console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name + (extra && !ok ? ' :: ' + extra : ''));
  if (!ok) fails++;
}
function read(path) {
  return fs.readFileSync(path, 'utf8');
}

const hebrewBoundary = term => new RegExp('(^|[^\\u0590-\\u05FF])' + term + '(?=$|[^\\u0590-\\u05FF])', 'u');
const forbidden = [
  { term: 'הרגל', re: hebrewBoundary('הרגל') },
  { term: 'רגליים', re: hebrewBoundary('רגליים') },
  { term: 'רגל', re: hebrewBoundary('רגל') },
  { term: 'רגל אחת', re: hebrewBoundary('רגל אחת') },
  { term: 'רגל חסרה', re: hebrewBoundary('רגל חסרה') }
];

function firstForbidden(text) {
  return forbidden.find(p => p.re.test(text));
}
function checkNoForbidden(label, text) {
  const hit = firstForbidden(text);
  check(label, !hit, hit ? 'found "' + hit.term + '"' : '');
}

const activeTextFiles = [
  'generator/geo.js',
  'generator/engine/pilot-g7-03.js',
  'generator/engine/pedagogy-registry.js',
  'docs/SOURCE_BIBLE.md'
];

for (const file of activeTextFiles) {
  checkNoForbidden(file + ' uses ניצב terminology', read(file));
}

const legacyGeo = read('generator/geo.js');
check('legacy G7-03 asks for הניצב השני', legacyGeo.includes('אורך הניצב השני'));
check('legacy G7-03 uses שני הניצבים', legacyGeo.includes('שני הניצבים'));

const smartPyth = read('generator/engine/pilot-g7-03.js');
check('smart G7-03 asks for הניצב החסר', smartPyth.includes('אורך הניצב החסר'));
check('smart G7-03 uses הניצבים in true/false wording', smartPyth.includes('אם הניצבים הם'));

const pedagogy = read('generator/engine/pedagogy-registry.js') + '\n' + read('docs/SOURCE_BIBLE.md');
check('teacher pedagogy uses ניצבים', pedagogy.includes('ניצבים 3,4') && pedagogy.includes('חיבור ניצבים'));
check('teacher pedagogy says ניצב חסר', pedagogy.includes('מצאו ניצב חסר'));

function runLegacySamples() {
  const sandbox = {
    console,
    Math,
    generators: {},
    captured: []
  };
  sandbox.renderCard = function (id, title, svg, q, ans) {
    sandbox.captured.push({ id, title, svg, q, ans });
  };
  vm.createContext(sandbox);
  vm.runInContext(legacyGeo, sandbox, { filename: 'generator/geo.js' });
  for (let i = 0; i < 50; i++) sandbox.generators['G7-03']();
  return sandbox.captured.map(x => [x.q, x.ans, x.svg].join('\n')).join('\n');
}

function runSmartSamples() {
  const sandbox = { console, Math };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  [
    'generator/engine/themes.js',
    'generator/engine/random.js',
    'generator/engine/validators.js',
    'generator/engine/diagrams.js',
    'generator/engine/question-types.js',
    'generator/engine/pilot-g7-03.js'
  ].forEach(file => vm.runInContext(read(file), sandbox, { filename: file }));

  const chunks = [];
  for (const diff of ['basic', 'standard', 'challenge']) {
    for (const qtype of ['open', 'mcq', 'tf', 'mistake']) {
      for (let i = 0; i < 20; i++) {
        const out = sandbox.TargilimEngine.generateG703Engine(diff, qtype);
        chunks.push(out.questionHTML || '', out.answerHTML || '');
      }
    }
  }
  return chunks.join('\n');
}

let legacyOutput = '';
let smartOutput = '';
try {
  legacyOutput = runLegacySamples();
  check('legacy G7-03 generator samples run', true);
} catch (e) {
  check('legacy G7-03 generator samples run', false, e.message);
}
try {
  smartOutput = runSmartSamples();
  check('smart G7-03 engine samples run', true);
} catch (e) {
  check('smart G7-03 engine samples run', false, e.message);
}

if (legacyOutput) {
  checkNoForbidden('legacy G7-03 generated output has no רגל wording', legacyOutput);
  check('legacy G7-03 generated output contains ניצב wording', /ניצב/.test(legacyOutput));
}
if (smartOutput) {
  checkNoForbidden('smart G7-03 generated output has no רגל wording', smartOutput);
  check('smart G7-03 generated output contains ניצב wording', /ניצב/.test(smartOutput));
}

console.log(fails ? 'GEOMETRY_TERMINOLOGY_FAIL (' + fails + ')' : 'GEOMETRY_TERMINOLOGY_PASS');
process.exit(fails ? 1 : 0);
