// tools/verify-visual-qa-dashboard.mjs
// Static + engine reachability gate for the teacher visual QA dashboard.
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

let fails = 0;
const check = (name, ok, detail = '') => {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (detail && !ok ? ' — ' + detail : ''));
  if (!ok) fails++;
};
const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';

check('visual-qa.html exists', fs.existsSync('generator/visual-qa.html'));
const html = read('generator/visual-qa.html');
const index = read('generator/index.html');
const gallery = read('generator/gallery.html');

check('index links to visual QA dashboard', index.includes('visual-qa.html'));
check('gallery page remains present', gallery.includes('גלריית מנועים'));
check('visual QA is RTL Hebrew', html.includes('<html lang="he" dir="rtl">'));
check('visual QA loads full engine stack', [
  'source-registry.js',
  'pedagogy-registry.js',
  'source-fit-dedicated.js',
  'source-fit-dedicated-2.js',
  'follow-up.js',
  'teacher-mode.js'
].every(src => html.includes(src)));
check('visual QA builds from live SOURCE_REGISTRY', /SOURCE_REGISTRY/.test(html) && /-ENGINE\$/.test(html));
check('visual QA has dashboard filters', ['qaGrade','qaDomain','qaStatus','qaSearch','qaDiff','qaType'].every(id => html.includes('id="' + id + '"')));
check('visual QA has human review statuses', ['יפה','צריך תיקון','בעיה בשרטוט','בעיה בהדפסה','בעיה בטקסט'].every(t => html.includes(t)));
check('visual QA persists human decisions in localStorage', html.includes('localStorage') && html.includes('targilim.visualQa.v1'));
check('visual QA exports review JSON', html.includes('qa-export') && html.includes('Blob'));
check('visual QA renders samples lazily', html.includes('addEventListener') && html.includes('generateOne'));
check('visual QA ships no static SVG samples', html.indexOf('<svg') < 0);

const { E, pilotIds, sourceFitIds, callEngine } = loadEngines();
const registryIds = Object.keys(E.SOURCE_REGISTRY || {}).filter(id => /-ENGINE$/.test(id)).sort();
check('registry exposes 50 engine ids', registryIds.length === 50, 'found ' + registryIds.length);

const engineIds = [...new Set(pilotIds.concat(sourceFitIds))].sort();
check('loader exposes 50 callable engine ids', engineIds.length === 50, 'found ' + engineIds.length);
let unreachable = 0;
for (const id of engineIds) {
  let r = null;
  try { r = callEngine(id, 'standard', 'open'); } catch (e) { r = null; }
  if (!r || !r.questionHTML) { unreachable++; console.log('  UNREACHABLE ' + id); }
}
check('every engine can produce a QA sample', unreachable === 0, unreachable + ' unreachable');

console.log(JSON.stringify({
  ok: fails === 0,
  checkedAt: new Date().toISOString(),
  registryIds: registryIds.length,
  callableEngines: engineIds.length,
  dashboard: 'generator/visual-qa.html'
}, null, 2));

console.log(fails ? 'VISUAL_QA_DASHBOARD_FAIL (' + fails + ')' : 'VISUAL_QA_DASHBOARD_PASS');
process.exit(fails ? 1 : 0);
