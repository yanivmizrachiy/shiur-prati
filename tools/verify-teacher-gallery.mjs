// tools/verify-teacher-gallery.mjs  (standalone historical/internal)
// Gate for the engine gallery: every engine is reachable, the page builds its
// cards from the live registry (all 50), offers grade/domain/provenance/search
// filters, and renders samples LAZILY (no 50 heavy SVGs on first paint).
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds } = loadEngines();
const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };

check('gallery.html exists', fs.existsSync('generator/gallery.html'));
const g = read('generator/gallery.html');

// loads the full engine stack + follow-up + teacher-mode
['source-registry.js', 'pedagogy-registry.js', 'source-fit-dedicated.js', 'source-fit-dedicated-2.js', 'follow-up.js', 'teacher-mode.js'].forEach(f =>
  check('gallery loads ' + f, g.indexOf(f) >= 0));

// builds cards from the live registry rather than a hardcoded list
check('gallery enumerates engines from SOURCE_REGISTRY', /SOURCE_REGISTRY/.test(g) && /-ENGINE\$\/\.test/.test(g));

// filters present
['fGrade', 'fDomain', 'fProv', 'fSearch'].forEach(idf => check('gallery has filter #' + idf, g.indexOf('id="' + idf + '"') >= 0));

// lazy rendering: no inline <svg> shipped in the static page; samples are made on click
check('gallery ships no pre-rendered <svg> (lazy, fast first paint)', g.indexOf('<svg') < 0);
check('gallery generates samples on demand (generateOne/getEngineExercise on click)',
  /generateOne/.test(g) && /addEventListener\('click'/.test(g));

// every engine must be reachable so each gallery card can produce a sample
const ids = pilotIds.concat(sourceFitIds);
check('registry exposes 50 engine ids', Object.keys(E.SOURCE_REGISTRY).filter(k => /-ENGINE$/.test(k)).length === 50);
let unreachable = 0;
for (const id of ids) {
  let r = null;
  try { r = E.generateOne ? E.generateOne(id, 'standard', 'open') : null; } catch (e) { r = null; }
  if (!r || !r.questionHTML) { unreachable++; console.log('  UNREACHABLE ' + id); }
}
check('every engine produces a gallery sample via E.generateOne (' + ids.length + ')', unreachable === 0, unreachable + ' unreachable');

console.log(fails ? 'TEACHER_GALLERY_FAIL (' + fails + ')' : 'TEACHER_GALLERY_PASS');
process.exit(fails ? 1 : 0);
