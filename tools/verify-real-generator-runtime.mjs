// tools/verify-real-generator-runtime.mjs
// Verifies the browser exercise-set runtime layer (count control, mixed types,
// set renderer, answer key, print) — both statically and with a real VM smoke run
// of the actual runtime files against a minimal DOM stub.
// Run: node tools/verify-real-generator-runtime.mjs
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
function check(name, ok){ console.log((ok?'PASS':'FAIL')+' — '+name); if(!ok) fails++; }
function read(p){ return fs.readFileSync(p,'utf8'); }

// ── 1. index.html controls ──
const index = read('generator/index.html');
check('index has מספר תרגילים control', index.includes('מספר תרגילים') && index.includes('id="sn"'));
for (const v of ['1','5','10','15','20']) {
  check('count option '+v, new RegExp('<option value="'+v+'"[^>]*>'+v+'</option>').test(index));
}
check('index has מעורב option (default)', /<option value="mixed" selected>מעורב<\/option>/.test(index));
check('index button is צור דף תרגילים', index.includes('צור דף תרגילים ◀'));
check('index loads exercise-set.js', /<script src="exercise-set\.js(?:\?[^"<>]*)?"><\/script>/.test(index));
check('question type label is סוג שאלות', index.includes('סוג שאלות'));

// ── 2. Runtime layer functions ──
const exset = read('generator/exercise-set.js');
const core = read('generator/core.js');
const pattern = read('generator/engine/pattern-engine.js');
check('set generation function exists', exset.includes('function generateSet('));
check('set renderer function exists', exset.includes('function renderExerciseSet('));
check('answer key toggle exists', exset.includes('function toggleAnswerKey('));
check('print set control exists', exset.includes('function printExerciseSet(') && exset.includes('הדפס דף תרגילים'));
check('answer key labels הצג/הסתר תשובות', exset.includes('הצג תשובות') && exset.includes('הסתר תשובות'));
check('mixed type plan logic exists', exset.includes('function buildTypePlan(') && exset.includes("'mixed'"));
check('duplicate avoidance logic exists', exset.includes('new Set()') && exset.includes('seen.has(key)'));
check('engine access layer exists', pattern.includes('E.getEngineExercise') && pattern.includes('E.isEngineTopic'));
check('generate() dispatches to set mode', core.includes('generateSet'));

// ── 3. Compatibility preserved ──
check('renderEngineCard still exists', pattern.includes('E.renderEngineCard = function'));
check('visual mode still exists', core.includes('function applyVisualMode') && exset.includes('applyVisualMode'));
check('copyImg/dlPNG still referenced', read('generator/export.js').includes('copyImg') && read('generator/export.js').includes('dlPNG'));
check('KaTeX render call in set renderer', exset.includes('renderMathInElement'));
check('no demo labels', !index.includes('דמו') && !exset.includes('demo') && !exset.includes('דמו'));

// ── 4. Source grounding ──
const PDFS = [
  'sources/intake/2026-06-09/01-grade-7-algebra/01_grade-7_algebra_curriculum.pdf',
  'sources/intake/2026-06-09/02-grade-8-algebra/02_grade-8_algebra_curriculum.pdf',
  'sources/intake/2026-06-09/03-grade-7-pre-deductive-geometry/03_grade-7_pre_deductive_geometry_curriculum.pdf',
  'sources/intake/2026-06-09/04-grade-8-geometry/04_grade-8_geometry_curriculum.pdf',
  'sources/intake/2026-06-09/05-grade-7-numeric-domain/05_grade-7_numeric_domain_curriculum.pdf',
  'sources/intake/2026-06-09/06-uncertainty-domain/06_uncertainty_domain_curriculum_examples.pdf',
  'sources/intake/2026-06-09/07-numeric-principles-grades-7-8/07_numeric_domain_principles_grades-7-8.pdf',
  'sources/intake/2026-06-09/08-algebra-principles-grades-7-8/08_algebra_domain_principles_grades-7-8.pdf',
  'sources/intake/2026-06-09/09-geometry-principles-grades-7-8/09_geometry_domain_principles_grades-7-8.pdf',
  'sources/intake/2026-06-09/10-grade-8-teaching-sequence-2026-2027/10_grade-8_teaching_sequence_2026-2027.pdf'
];
check('all 10 source PDFs exist', PDFS.every(p=>fs.existsSync(p)));
check('source-learning files exist', fs.readdirSync('source-learning/2026-06-09').filter(f=>f.endsWith('.learning.md')).length >= 10);
check('PATTERN_INDEX exists', fs.existsSync('question-patterns/PATTERN_INDEX.md'));
check('CURRICULUM_MAP exists', fs.existsSync('curriculum-map/CURRICULUM_MAP.md'));

// ── 5. VM runtime smoke: load the real files, simulate clicks ──
function makeEl(extra){ return Object.assign({value:'',innerHTML:'',textContent:'',style:{},classList:{
  _s:new Set(), toggle(c){this._s.has(c)?this._s.delete(c):this._s.add(c);}, contains(c){return this._s.has(c);}, add(c){this._s.add(c);}
}, addEventListener(){}, querySelectorAll(){return [];}}, extra||{}); }

const els = {
  sg: makeEl({value:'7'}), sd: makeEl({value:'numeric'}),
  st: makeEl({value:'N7-03-ENGINE', selectedIndex:0, options:[{textContent:'מספרים שליליים — גרסה חכמה ✦'}]}),
  sl: makeEl({value:'standard'}), sv: makeEl({value:'color'}), sn: makeEl({value:'10'}),
  selQType: makeEl({value:'mixed'}), selDiff: makeEl({value:'standard'}),
  out: makeEl(), mainTitle: makeEl(), gradeBadge: makeEl(), enginePanel: makeEl(), answerKey: null, btnAnswerKey: null
};
const sandbox = { console, Math, Date,
  document: {
    querySelector(){ return {}; },
    getElementById(id){ return els[id] !== undefined ? els[id] : makeEl(); },
    createElement(){ return makeEl(); },
    addEventListener(){},
    head:{appendChild(){}}, body:{appendChild(){}}
  },
  renderMathInElement(){}, html2canvas: null
};
sandbox.window = sandbox;
sandbox.addEventListener = function(){};
vm.createContext(sandbox);

const files = ['generator/core.js','generator/numeric.js',
  'generator/engine/themes.js','generator/engine/random.js','generator/engine/validators.js',
  'generator/engine/diagrams.js','generator/engine/question-types.js']
  .concat(fs.readdirSync('generator/engine').filter(f=>f.startsWith('pilot-')).sort().map(f=>'generator/engine/'+f))
  .concat(['generator/engine/pattern-engine.js','generator/exercise-set.js']);
let loadError = null;
for (const f of files) {
  try { vm.runInContext(read(f), sandbox, {filename:f}); }
  catch(e){ loadError = f+': '+e.message; break; }
}
check('runtime files load in VM', !loadError);
if (loadError) console.log('  load error: '+loadError);

if (!loadError) {
  const BAD = /undefined|NaN/;
  // engine topic, mixed, 10 exercises
  vm.runInContext('generate()', sandbox);
  let html = els.out.innerHTML;
  check('set renders 10 exercises (engine topic, mixed)', (html.match(/ex-card/g)||[]).length === 10 && html.includes('תרגיל 10'));
  check('set has answer key with 10 entries', html.includes('מפתח תשובות') && (html.match(/ak-item/g)||[]).length === 10);
  check('set has answer toggle and print buttons', html.includes('הצג תשובות') && html.includes('הדפס דף תרגילים'));
  const typeHits = ['שאלה פתוחה','רב־ברירה','נכון / שגוי','מצא את הטעות'].filter(t=>html.includes(t)).length;
  check('mixed set contains multiple question types', typeHits >= 3);
  check('no undefined/NaN in set output', !BAD.test(html));
  check('no engine ids in set output', !html.includes('-ENGINE'));

  // duplicate avoidance: 20 from one engine still renders 20
  els.sn.value='20'; vm.runInContext('generate()', sandbox);
  check('20-exercise set renders fully', (els.out.innerHTML.match(/ex-card/g)||[]).length === 20);

  // legacy (non-engine) topic set via renderCard capture
  els.st.value='N7-06'; els.st.options=[{textContent:'חזקות: (−a)ⁿ לעומת −aⁿ'}]; els.sn.value='5';
  vm.runInContext('generate()', sandbox);
  check('legacy topic produces a 5-exercise set', (els.out.innerHTML.match(/ex-card/g)||[]).length === 5);
  check('no undefined/NaN in legacy set', !BAD.test(els.out.innerHTML));

  // count=1 keeps the single-card path (qcard + export bar).
  // Reset qtype explicitly so this test proves the real mixed→specific→mixed restore path.
  els.st.value='N7-03-ENGINE';
  els.st.options=[{textContent:'מספרים שליליים — גרסה חכמה ✦'}];
  els.sn.value='1';
  els.selQType.value='mixed';
  vm.runInContext('generate()', sandbox);
  html = els.out.innerHTML;
  check('count=1 keeps single qcard with export bar', html.includes('qcard') && html.includes('copyImg') && !html.includes('ex-card'));
  check('count=1 with mixed restores selector', els.selQType.value === 'mixed');
}

console.log(fails ? 'REAL_GENERATOR_RUNTIME_VERIFY_FAIL ('+fails+')' : 'REAL_GENERATOR_RUNTIME_VERIFY_PASS');
process.exit(fails?1:0);
