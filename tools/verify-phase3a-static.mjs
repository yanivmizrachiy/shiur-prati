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
  'generator/engine/pilot-n8-01.js',
  'generator/engine/pilot-n8-02.js',
  'generator/engine/pilot-n8-03.js',
  'generator/engine/pilot-n8-04.js',
  'generator/engine/pilot-n8-05.js',
  'generator/engine/pilot-g7-01.js',
  'generator/engine/pilot-g7-02.js',
  'generator/engine/pilot-g7-04.js',
  'generator/engine/pilot-g8-01.js',
  'generator/engine/pilot-g8-04.js',
  'generator/engine/pilot-n7-03.js',
  'generator/engine/pilot-n7-04.js',
  'generator/engine/pilot-n7-05.js',
  'generator/engine/pilot-n7-06.js',
  'generator/engine/pilot-n7-07.js',
  'generator/engine/pilot-a7-01.js',
  'generator/engine/pilot-a7-02.js',
  'generator/engine/pilot-a7-03.js',
  'generator/engine/pilot-u7-01.js',
  'generator/engine/pilot-u7-02.js',
  'generator/engine/pilot-a8-02.js',
  'generator/engine/pilot-a8-03.js',
  'generator/engine/pilot-u8-01.js',
  'generator/engine/pilot-u8-02.js',
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
const n801 = read('generator/engine/pilot-n8-01.js');
const n802 = read('generator/engine/pilot-n8-02.js');
const n803 = read('generator/engine/pilot-n8-03.js');
const n804 = read('generator/engine/pilot-n8-04.js');
const n805 = read('generator/engine/pilot-n8-05.js');
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
mustInclude(pattern, 'N8-01-ENGINE', 'ratio engine registration');
mustInclude(pattern, 'N8-02-ENGINE', 'proportion engine registration');
mustInclude(pattern, 'N8-03-ENGINE', 'scale engine registration');
mustInclude(pattern, 'N8-04-ENGINE', 'percent engine registration');
mustInclude(pattern, 'N8-05-ENGINE', 'dynamic percent engine registration');
mustInclude(pattern, 'generateG703Engine', 'Pythagoras engine call');
mustInclude(pattern, 'generateN801Engine', 'ratio engine call');
mustInclude(pattern, 'generateN802Engine', 'proportion engine call');
mustInclude(pattern, 'generateN803Engine', 'scale engine call');
mustInclude(pattern, 'generateN804Engine', 'percent engine call');
mustInclude(pattern, 'generateN805Engine', 'dynamic percent engine call');
mustInclude(pattern, 'updatePanel', 'engine panel visibility hook');
console.log('Engine topics registered ✅');

for (const needle of ['open', 'mcq', 'tf', 'mistake']) {
  mustInclude(qtypes, needle, `question-types ${needle}`);
}
console.log('Question type renderers present ✅');

for (const needle of ['rightTriangleSvg', 'rectangleDiagonalSvg', 'scaleMapSvg', 'ratioBarSvg', 'proportionTableSvg', 'percentChangeSvg', 'unknown', 'given']) {
  mustInclude(diagrams, needle, `diagram engine ${needle}`);
}
console.log('Diagram engine present ✅');

for (const needle of ['generateG703Engine', 'rightTriangleSvg', 'rectangleDiagonalSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(g703, needle, `G7-03 engine ${needle}`);
}
console.log('G7-03 engine behavior present ✅');

for (const needle of ['generateN801Engine', 'ratio_simplify', 'ratio_share', 'ratio_missing', 'ratioBarSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(n801, needle, `N8-01 engine ${needle}`);
}
console.log('N8-01 engine behavior present ✅');

for (const needle of ['generateN802Engine', 'proportion_missing', 'proportion_rate', 'proportion_verify', 'proportionTableSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(n802, needle, `N8-02 engine ${needle}`);
}
console.log('N8-02 engine behavior present ✅');

for (const needle of ['generateN803Engine', 'scale_real_distance', 'scale_map_distance', 'scale_factor', 'scaleMapSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(n803, needle, `N8-03 engine ${needle}`);
}
console.log('N8-03 engine behavior present ✅');

for (const needle of ['generateN804Engine', 'pct_of_n', 'find_whole', 'find_pct', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(n804, needle, `N8-04 engine ${needle}`);
}
console.log('N8-04 engine behavior present ✅');

for (const needle of ['generateN805Engine', 'percent_increase', 'percent_decrease', 'percent_original', 'percent_two_step', 'percentChangeSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) {
  mustInclude(n805, needle, `N8-05 engine ${needle}`);
}
console.log('N8-05 engine behavior present ✅');

for (const needle of ['engine-panel', 'engine-badge', 'mcq-choice', 'tf-statement', 'mistake-box']) {
  mustInclude(css, needle, `engine CSS ${needle}`);
}
console.log('Engine CSS present ✅');

mustInclude(status, 'Phase 3A true engine topics', 'PROJECT_STATUS Phase 3A status');
mustInclude(status, 'verify-phase3a.yml', 'PROJECT_STATUS verification reference');
mustInclude(rules, 'No fake controls', 'RULES no fake controls');
mustInclude(rules, 'Source-based question variety', 'RULES source variety');
console.log('Documentation guardrails present ✅');

const g701 = read('generator/engine/pilot-g7-01.js');
const g702 = read('generator/engine/pilot-g7-02.js');
const g704 = read('generator/engine/pilot-g7-04.js');
const g801 = read('generator/engine/pilot-g8-01.js');
const g804 = read('generator/engine/pilot-g8-04.js');

for (const id of ['G7-01-ENGINE','G7-02-ENGINE','G7-04-ENGINE','G8-01-ENGINE','G8-04-ENGINE']) {
  mustInclude(pattern, id, `Stage 2A registration ${id}`);
}
for (const fn of ['generateG701Engine','generateG702Engine','generateG704Engine','generateG801Engine','generateG804Engine']) {
  mustInclude(pattern, fn, `Stage 2A engine call ${fn}`);
}
console.log('Stage 2A engine topics registered ✅');

for (const needle of ['generateG701Engine','rect_area','rect_perimeter','box_volume','box_missing_dim','mcq','tf','mistake','basic','standard','challenge']) {
  mustInclude(g701, needle, `G7-01 engine ${needle}`);
}
for (const needle of ['generateG702Engine','tri_area','para_area','trap_area','tri_missing_height','mcq','tf','mistake','basic','standard','challenge']) {
  mustInclude(g702, needle, `G7-02 engine ${needle}`);
}
for (const needle of ['generateG704Engine','missing_angle','possible_triangle','triangleAnglesSvg','mcq','tf','mistake','basic','standard','challenge']) {
  mustInclude(g704, needle, `G7-04 engine ${needle}`);
}
for (const needle of ['generateG801Engine','circ_from_radius','area_from_radius','circ_from_diameter','radius_from_circ','circleSvg','mcq','tf','mistake','basic','standard','challenge']) {
  mustInclude(g801, needle, `G8-01 engine ${needle}`);
}
for (const needle of ['generateG804Engine','scale_factor','corresponding_side','is_similar','similarTrianglesSvg','mcq','tf','mistake','basic','standard','challenge']) {
  mustInclude(g804, needle, `G8-04 engine ${needle}`);
}
console.log('Stage 2A engine behavior present ✅');

for (const needle of ['rectangleSvg','boxSvg','triangleBaseHeightSvg','triangleAnglesSvg','circleSvg','similarTrianglesSvg']) {
  mustInclude(diagrams, needle, `Stage 2A diagram ${needle}`);
}
console.log('Stage 2A diagram helpers present ✅');

const n703 = read('generator/engine/pilot-n7-03.js');
const n704 = read('generator/engine/pilot-n7-04.js');
const n705 = read('generator/engine/pilot-n7-05.js');
const n706 = read('generator/engine/pilot-n7-06.js');
const n707 = read('generator/engine/pilot-n7-07.js');
const a701 = read('generator/engine/pilot-a7-01.js');
const a702 = read('generator/engine/pilot-a7-02.js');
const a703 = read('generator/engine/pilot-a7-03.js');
const u701 = read('generator/engine/pilot-u7-01.js');
const u702 = read('generator/engine/pilot-u7-02.js');
const a802 = read('generator/engine/pilot-a8-02.js');
const a803 = read('generator/engine/pilot-a8-03.js');
const u801 = read('generator/engine/pilot-u8-01.js');
const u802 = read('generator/engine/pilot-u8-02.js');

for (const needle of ['generateN703Engine', 'order', 'compare', 'abs_opp', 'numberLineSvg', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(n703, needle, `n7-03 engine ${needle}`); }
for (const needle of ['generateN704Engine', 'add_same', 'add_diff', 'sub_neg', 'missing_addend', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(n704, needle, `n7-04 engine ${needle}`); }
for (const needle of ['generateN705Engine', 'mul', 'div', 'missing_factor', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(n705, needle, `n7-05 engine ${needle}`); }
for (const needle of ['generateN706Engine', 'paren_even', 'paren_odd', 'compare_both', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(n706, needle, `n7-06 engine ${needle}`); }
for (const needle of ['generateN707Engine', 'exact', 'between', 'missing_sq', 'sum_trap', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(n707, needle, `n7-07 engine ${needle}`); }
for (const needle of ['generateA701Engine', 'from_words', 'simplify', 'tower', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(a701, needle, `a7-01 engine ${needle}`); }
for (const needle of ['generateA702Engine', 'sub_pos', 'sub_neg', 'sub_power', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(a702, needle, `a7-02 engine ${needle}`); }
for (const needle of ['generateA703Engine', 'one_step', 'two_step', 'parens', 'verify', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(a703, needle, `a7-03 engine ${needle}`); }
for (const needle of ['generateU701Engine', 'read_freq', 'most_frequent', 'missing_freq', 'freqTableHtml', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(u701, needle, `u7-01 engine ${needle}`); }
for (const needle of ['generateU702Engine', 'bag_simple', 'complement', 'die', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(u702, needle, `u7-02 engine ${needle}`); }
for (const needle of ['generateA802Engine', 'slope_two_points', 'value_at', 'rising_falling', 'equation_from_points', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(a802, needle, `a8-02 engine ${needle}`); }
for (const needle of ['generateA803Engine', 'sum_diff', 'more_than', 'verify_pair', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(a803, needle, `a8-03 engine ${needle}`); }
for (const needle of ['generateU801Engine', 'mean', 'median', 'range', 'missing_from_mean', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(u801, needle, `u8-01 engine ${needle}`); }
for (const needle of ['generateU802Engine', 'prob_cell', 'prob_row', 'complement', 'compare_groups', 'freqTableHtml', 'mcq', 'tf', 'mistake', 'basic', 'standard', 'challenge']) { mustInclude(u802, needle, `u8-02 engine ${needle}`); }
console.log('Stage 2B+2C engine behavior present ✅');

for (const id of ['N7-03-ENGINE', 'N7-04-ENGINE', 'N7-05-ENGINE', 'N7-06-ENGINE', 'N7-07-ENGINE', 'A7-01-ENGINE', 'A7-02-ENGINE', 'A7-03-ENGINE', 'U7-01-ENGINE', 'U7-02-ENGINE', 'A8-02-ENGINE', 'A8-03-ENGINE', 'U8-01-ENGINE', 'U8-02-ENGINE']) { mustInclude(pattern, id, `Stage 2B/2C registration ${id}`); }
console.log('Stage 2B+2C engine topics registered ✅');

for (const needle of ['numberLineSvg','freqTableHtml']) { mustInclude(diagrams, needle, `Stage 2B/2C diagram ${needle}`); }
console.log('Stage 2B+2C diagram helpers present ✅');

console.log('Phase 3A static engine audit PASS ✅');
