// tools/verify-source-lock.mjs
// Source lock: every question-producing engine/topic must carry valid source
// metadata pointing at one of the 10 intake PDFs. Loads source-schema.js +
// source-registry.js in a VM, then cross-checks the registry against:
//   (a) every *-ENGINE id wired in pattern-engine.js + declared in source-fit files,
//   (b) the documented logical-fallback topic list.
// Run from repo root: node tools/verify-source-lock.mjs
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (ok ? '' : '  :: ' + (info || '')));
  if (!ok) fails++;
}
function read(p) { return fs.readFileSync(p, 'utf8'); }

// ── load schema + registry in a VM (TOPICS stub so engine files are happy) ──
const sandbox = { window: {}, console, Math, Date, TOPICS: { 7: {}, 8: {} } };
vm.createContext(sandbox);
vm.runInContext(read('generator/engine/source-schema.js'), sandbox, { filename: 'source-schema.js' });
vm.runInContext(read('generator/engine/source-registry.js'), sandbox, { filename: 'source-registry.js' });
const E = sandbox.window.TargilimEngine;

check('schema exposes 10 source files', E && Array.isArray(E.SOURCE_FILES) && E.SOURCE_FILES.length === 10);
check('schema exposes defineSource/validateSource/getSource',
  typeof E.defineSource === 'function' && typeof E.validateSource === 'function' && typeof E.getSource === 'function');
const reg = (E && E.SOURCE_REGISTRY) || {};
const regIds = Object.keys(reg);
check('registry is populated', regIds.length >= 30, 'entries=' + regIds.length);

// ── every registry entry validates ──
let invalid = 0;
for (const id of regIds) {
  const v = E.validateSource(reg[id]);
  if (!v.ok) { invalid++; console.log('  INVALID ' + id + ' :: ' + v.errors.join('; ')); }
}
check('all registry entries valid (sourceFile in 10, ids/grade/domain/skill present)', invalid === 0, invalid + ' invalid');

// ── no sourceFile outside the 10 ──
const badFile = regIds.filter(id => E.SOURCE_FILES.indexOf(reg[id].sourceFile) < 0);
check('no external sourceFile', badFile.length === 0, badFile.join(', '));

// ── every wired engine id has source metadata ──
const engineUniverse = new Set();
for (const f of fs.readdirSync('generator/engine').filter(f => f.endsWith('.js'))) {
  const txt = read('generator/engine/' + f);
  for (const m of txt.matchAll(/\b([A-Z]\d-\d{2}-ENGINE)\b/g)) engineUniverse.add(m[1]);
}
const missingEngine = [...engineUniverse].filter(id => !reg[id] && !reg[id.replace(/-ENGINE$/, '')]);
check('every *-ENGINE id has source metadata (' + engineUniverse.size + ' engine ids found)',
  missingEngine.length === 0, 'missing: ' + missingEngine.join(', '));

// ── documented logical-fallback topics must each have an entry (engine or fallback) ──
const FALLBACK_TOPICS = [
  'N7-08', 'N7-09', 'N7-10', 'N7-11', 'N7-12', 'N7-13',
  'U7-05', 'U7-06', 'U7-07', 'U7-08',
  'G7-05', 'G7-06', 'G8-05', 'G8-06', 'G8-07', 'G8-08', 'G8-09'
];
const missingFallback = FALLBACK_TOPICS.filter(id => !reg[id]);
check('every documented fallback topic has source metadata', missingFallback.length === 0, 'missing: ' + missingFallback.join(', '));
const fallbackNoReason = FALLBACK_TOPICS.filter(id => reg[id] && reg[id].fallback && !reg[id].fallbackReason);
check('every fallback entry explains why it is a fallback', fallbackNoReason.length === 0, fallbackNoReason.join(', '));

// ── registry must be loaded by index.html so it is live at runtime ──
const index = read('generator/index.html');
check('index.html loads source-schema.js', /source-schema\.js/.test(index));
check('index.html loads source-registry.js', /source-registry\.js/.test(index));
check('source-schema loads before pattern-engine', index.indexOf('source-schema.js') < index.indexOf('pattern-engine.js'));

// summary
const fallbackCount = regIds.filter(id => reg[id].fallback).length;
console.log(JSON.stringify({
  registryEntries: regIds.length,
  engineIdsScanned: engineUniverse.size,
  fallbackEntries: fallbackCount,
  sourceFiles: E.SOURCE_FILES.length
}, null, 2));

console.log(fails ? 'SOURCE_LOCK_FAIL (' + fails + ')' : 'SOURCE_LOCK_PASS');
process.exit(fails ? 1 : 0);
