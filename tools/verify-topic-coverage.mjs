// tools/verify-topic-coverage.mjs
// Guard: every engine in source-registry.js must be accessible from the UI
// (i.e. listed in the TOPICS object in core.js). Prevents the silent bug where
// engines exist in the registry but are invisible to teachers using the generator.
// Run: node tools/verify-topic-coverage.mjs

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

let fails = 0;
function fail(msg) { console.log('FAIL — ' + msg); fails++; }
function pass(msg) { console.log('PASS — ' + msg); }

// --- 1. Parse source-registry.js for all ENGINE ids + grade + domain ---
const regContent = readFileSync(resolve(root, 'generator/engine/source-registry.js'), 'utf8');
const registryEngines = [];
for (const m of regContent.matchAll(/\['([A-Z0-9\-]+ENGINE)',\s*F\.[a-z0-9]+,\s*(\d),\s*'([a-z]+)'/g)) {
  registryEngines.push({ id: m[1], grade: m[2], domain: m[3] });
}

if (registryEngines.length === 0) {
  fail('source-registry.js: could not parse any ENGINE rows');
} else {
  pass('source-registry.js: parsed ' + registryEngines.length + ' ENGINE rows');
}

// --- 2. Parse core.js TOPICS for all engine IDs listed in UI ---
const coreContent = readFileSync(resolve(root, 'generator/core.js'), 'utf8');
const topicEngineIds = new Set();
for (const m of coreContent.matchAll(/'([A-Z0-9\-]+-ENGINE)'/g)) {
  topicEngineIds.add(m[1]);
}

if (topicEngineIds.size === 0) {
  fail('core.js TOPICS: could not parse any ENGINE ids');
} else {
  pass('core.js TOPICS: found ' + topicEngineIds.size + ' ENGINE ids');
}

// --- 3. Cross-check: every registry engine must be in TOPICS ---
console.log('\n[topic-coverage] Checking each registry engine appears in TOPICS...');
let missing = 0;
for (const { id, grade, domain } of registryEngines) {
  if (!topicEngineIds.has(id)) {
    fail(id + ' [grade ' + grade + ' / ' + domain + '] is in source-registry but NOT in core.js TOPICS — invisible to teachers!');
    missing++;
  }
}
if (missing === 0) {
  pass('All ' + registryEngines.length + ' registry engines are listed in core.js TOPICS ✓');
}

// --- 4. Reverse check: no phantom engine in TOPICS that isn't in registry ---
console.log('\n[topic-coverage] Checking no TOPICS entry references a non-existent engine...');
const registryIds = new Set(registryEngines.map(e => e.id));
let phantom = 0;
for (const id of topicEngineIds) {
  if (!registryIds.has(id)) {
    fail(id + ' is in core.js TOPICS but NOT in source-registry.js — phantom engine!');
    phantom++;
  }
}
if (phantom === 0) {
  pass('No phantom engines in TOPICS ✓');
}

// --- 5. Count check ---
if (registryEngines.length !== 50) {
  fail('Expected 50 engines in registry, found ' + registryEngines.length);
} else {
  pass('Registry engine count: 50 ✓');
}

if (topicEngineIds.size !== 50) {
  fail('Expected 50 engines in TOPICS, found ' + topicEngineIds.size);
} else {
  pass('TOPICS engine count: 50 ✓');
}

// --- Summary ---
console.log('');
if (fails === 0) {
  console.log('verify:topic-coverage PASS — all 50 engines accessible from UI ✓');
  process.exit(0);
} else {
  console.log('verify:topic-coverage FAIL — ' + fails + ' check(s) failed');
  process.exit(1);
}
