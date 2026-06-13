// tools/verify-index-script-links.mjs
// Verifies index.html local script links against repository files.
// Handles cache-busting query strings like exercise-set.js?v=20260612.
// Run from repo root: node tools/verify-index-script-links.mjs
import fs from 'node:fs';
import path from 'node:path';

let fails = 0;
function pass(name){ console.log('PASS — '+name); }
function fail(name, detail){ console.log('FAIL — '+name+(detail?' — '+detail:'')); fails++; }
function check(name, ok, detail){ ok ? pass(name) : fail(name, detail); }
function stripQuery(src){ return src.split('?')[0].split('#')[0]; }

const indexPath = 'generator/index.html';
const index = fs.readFileSync(indexPath, 'utf8');
const scripts = [...index.matchAll(/<script\s+[^>]*src="([^"]+)"[^>]*><\/script>/g)].map(m => m[1]);
const localScripts = scripts.filter(src => !/^https?:\/\//.test(src));
const normalized = localScripts.map(stripQuery);
const missing = normalized.filter(src => !fs.existsSync(path.join('generator', src)));

check('index has local script tags', localScripts.length > 0, 'no local scripts found');
check('all local scripts exist after stripping query strings', missing.length === 0, missing.join(', '));
check('exercise-set.js linked with optional cache busting', normalized.includes('exercise-set.js'));
check('phase2-loader.js linked after exercise-set.js', normalized.indexOf('phase2-loader.js') > normalized.indexOf('exercise-set.js'));
check('core.js linked before domain scripts', normalized.indexOf('core.js') >= 0 && normalized.indexOf('core.js') < normalized.indexOf('numeric.js'));
check('pattern-engine.js linked before exercise-set.js', normalized.indexOf('engine/pattern-engine.js') >= 0 && normalized.indexOf('engine/pattern-engine.js') < normalized.indexOf('exercise-set.js'));
check('source-fit extension scripts linked before exercise-set.js', [
  'engine/source-fit-extensions.js',
  'engine/source-fit-graphs.js',
  'engine/source-fit-geometry.js',
  'engine/source-fit-algebra-g7.js'
].every(src => normalized.indexOf(src) >= 0 && normalized.indexOf(src) < normalized.indexOf('exercise-set.js')));

console.log(JSON.stringify({
  ok: fails === 0,
  checkedAt: new Date().toISOString(),
  localScriptCount: localScripts.length,
  cacheBustedScripts: localScripts.filter(src => src.includes('?')).length,
  normalizedScripts: normalized
}, null, 2));

process.exit(fails ? 1 : 0);
