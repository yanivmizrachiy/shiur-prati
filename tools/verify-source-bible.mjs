// tools/verify-source-bible.mjs
// Verifies the pedagogy registry ("source bible" data) is complete: every active
// engine topic and every fallback topic carries learning goal, teacher purpose,
// misconception (or justification), follow-up ideas and question families; every
// family cites a source file 01–09 (never 10) with example, variations,
// constraints, answer/explanation formats. Also checks SOURCE_BIBLE.md exists.
// Run from repo root: node tools/verify-source-bible.mjs
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
function check(name, ok, info) { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (ok ? '' : '  :: ' + (info || ''))); if (!ok) fails++; }
function read(p) { return fs.readFileSync(p, 'utf8'); }

const sandbox = { window: {}, console, Math, Date, TOPICS: { 7: {}, 8: {} } };
vm.createContext(sandbox);
for (const f of ['source-schema.js', 'source-registry.js', 'pedagogy-registry.js'])
  vm.runInContext(read('generator/engine/' + f), sandbox, { filename: f });
const E = sandbox.window.TargilimEngine;

check('SOURCE_BIBLE.md exists', fs.existsSync('docs/SOURCE_BIBLE.md'));
check('pedagogy registry present', !!E.PEDAGOGY && typeof E.getPedagogy === 'function');

// expected coverage: 50 active engine ids, 0 fallback topics (all converted)
const ENGINE_IDS = Object.keys(E.SOURCE_REGISTRY).filter(id => /-ENGINE$/.test(id));
const FALLBACK_IDS = Object.keys(E.SOURCE_REGISTRY).filter(id => !/-ENGINE$/.test(id));
check('50 engine ids in source registry (all dedicated)', ENGINE_IDS.length === 50, ENGINE_IDS.length + '');
check('0 fallback ids in source registry (all 17 converted)', FALLBACK_IDS.length === 0, FALLBACK_IDS.length + '');

const missingPed = [...ENGINE_IDS, ...FALLBACK_IDS].filter(id => !E.getPedagogy(id));
check('every engine + fallback topic has pedagogy', missingPed.length === 0, 'missing: ' + missingPed.join(', '));

const VALID_FILES = E.SOURCE_FILES.filter(f => !/^10_/.test(f)); // 01–09 only
let topicFails = 0, familyFails = 0, file10 = 0, demo = 0, familyTotal = 0;
const DEMO = /\b(demo|placeholder|lorem|tbd|todo|דמו)\b/i;

for (const id of [...ENGINE_IDS, ...FALLBACK_IDS]) {
  const p = E.getPedagogy(id);
  if (!p) continue;
  const probs = [];
  if (!p.learningGoal) probs.push('no learningGoal');
  if (!p.teacherPurpose) probs.push('no teacherPurpose');
  if (!(p.misconceptions && p.misconceptions.length) && !p.noMisconceptionJustification) probs.push('no misconception/justification');
  if (!(p.followUpIdeas && p.followUpIdeas.length)) probs.push('no followUpIdeas');
  if (!(p.families && p.families.length)) probs.push('no families');
  if (DEMO.test(JSON.stringify(p))) { demo++; probs.push('demo/placeholder text'); }
  if (probs.length) { topicFails++; console.log('  TOPIC ' + id + ': ' + probs.join('; ')); }

  // topic sourceFile must be 01–09
  if (/^10_/.test(p.sourceFile || '')) { file10++; console.log('  TOPIC ' + id + ' uses file 10 as source'); }

  for (const fam of (p.families || [])) {
    familyTotal++;
    const fp = [];
    if (!fam.questionFamily) fp.push('no questionFamily');
    if (!fam.sourceExampleOrPattern) fp.push('no sourceExampleOrPattern');
    if (!(fam.allowedVariations && fam.allowedVariations.length)) fp.push('no allowedVariations');
    if (!(fam.fixedConstraints && fam.fixedConstraints.length)) fp.push('no fixedConstraints');
    if (!fam.answerFormat) fp.push('no answerFormat');
    if (!fam.explanationFormat) fp.push('no explanationFormat');
    if (!(fam.qtypes && fam.qtypes.length)) fp.push('no qtypes');
    // family's effective source is the topic's source file (must be 01–09)
    if (VALID_FILES.indexOf(p.sourceFile) < 0) fp.push('topic source not in 01–09');
    if (fp.length) { familyFails++; console.log('  FAMILY ' + fam.id + ': ' + fp.join('; ')); }
  }
}

check('every topic has goal/purpose/misconception/followups/families', topicFails === 0, topicFails + ' topic problems');
check('every question family is complete', familyFails === 0, familyFails + ' family problems');
check('no topic uses file 10 as a question source', file10 === 0);
check('no demo/placeholder content', demo === 0);

// SOURCE_BIBLE.md has a section per domain
const bible = fs.existsSync('docs/SOURCE_BIBLE.md') ? read('docs/SOURCE_BIBLE.md') : '';
for (const d of ['Numeric', 'Algebra', 'Geometry', 'Uncertainty'])
  check('SOURCE_BIBLE.md has ' + d + ' section', bible.indexOf('## ' + d) >= 0);

console.log(JSON.stringify({ topics: ENGINE_IDS.length + FALLBACK_IDS.length, families: familyTotal }, null, 2));
console.log(fails ? 'SOURCE_BIBLE_FAIL (' + fails + ')' : 'SOURCE_BIBLE_PASS');
process.exit(fails ? 1 : 0);
