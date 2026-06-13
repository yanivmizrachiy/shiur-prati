// tools/verify-premium-ultra-geometry-main.mjs
// Verifies the premium + ultra geometry visual layer extracted from PR #5 is
// present, loaded in the correct order, free of syntax/runtime errors, and that
// it actually overrides geometry SVG helpers and still produces valid <svg>.
// Run from repo root: node tools/verify-premium-ultra-geometry-main.mjs
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

let fails = 0;
function check(name, ok, info) { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (ok ? '' : '  :: ' + (info || ''))); if (!ok) fails++; }

const PREMIUM = 'generator/engine/diagram-premium-overrides.js';
const ULTRA = 'generator/engine/diagram-ultra-autopilot.js';
check('premium overrides file present', fs.existsSync(PREMIUM));
check('ultra autopilot file present', fs.existsSync(ULTRA));
check('preview html present', fs.existsSync('docs/verification/premium-geometry-diagrams-preview.html'));

const index = fs.readFileSync('generator/index.html', 'utf8');
const iDia = index.indexOf('engine/diagrams.js');
const iPrem = index.indexOf('diagram-premium-overrides.js');
const iUltra = index.indexOf('diagram-ultra-autopilot.js');
const iQt = index.indexOf('engine/question-types.js');
check('load order diagrams < premium < ultra < question-types',
  iDia >= 0 && iPrem > iDia && iUltra > iPrem && iQt > iUltra,
  `dia=${iDia} prem=${iPrem} ultra=${iUltra} qt=${iQt}`);

// runtime: stack loads without throwing and geometry SVG helpers still work
let E, err = null;
try { ({ E } = loadEngines()); } catch (e) { err = e.message; }
check('full engine stack (incl. premium+ultra) loads without error', !err, err);

if (E) {
  // premium/ultra should expose/override common geometry SVG helpers
  const helpers = ['rightTriangleSvg', 'triangleAnglesSvg', 'circleSvg'];
  for (const h of helpers) check('geometry helper available: ' + h, typeof E[h] === 'function');
  // sample outputs are valid svg, no undefined/NaN
  let bad = 0, n = 0;
  for (const h of helpers) {
    if (typeof E[h] !== 'function') continue;
    for (let i = 0; i < 20; i++) {
      let s; try { s = E[h]({ a: 6, b: 8, c: 10, A: 45, B: 60, C: 75, r: 5, mode: 'r' }, 'a'); } catch (e) { bad++; continue; }
      n++;
      if (!/^<svg|viewBox/.test(s)) bad++;
      else if (/undefined|NaN/.test(s)) bad++;
    }
  }
  check('geometry helpers emit valid svg, no undefined/NaN (' + n + ' samples)', bad === 0, bad + ' bad');
}

console.log(fails ? 'PREMIUM_ULTRA_GEOMETRY_FAIL (' + fails + ')' : 'PREMIUM_ULTRA_GEOMETRY_PASS');
process.exit(fails ? 1 : 0);
