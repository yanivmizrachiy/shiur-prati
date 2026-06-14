// tools/verify-baseline-protection.mjs
// Baseline protection: fails loudly if any critical file/dir was deleted, if any
// local <script> referenced by index.html is missing, if the engine load order
// is broken, or if any of the 10 source PDFs is gone. This is the guard that
// stops a future "source-fit" branch from silently dropping book.*, package.json,
// verify tools, or source-fit engines (the exact danger flagged for this repo).
// Run from repo root: node tools/verify-baseline-protection.mjs
import fs from 'node:fs';
import path from 'node:path';

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (ok ? '' : '  :: ' + (info || '')));
  if (!ok) fails++;
}

// ── 1. Critical files that must never be deleted ──
const CRITICAL_FILES = [
  'package.json',
  'generator/index.html',
  'generator/book.html',
  'generator/book.css',
  'generator/book.js',
  'tools/verify-digital-book.mjs',
  'tools/verify-index-script-links.mjs',
  'tools/verify-source-fit-inventory.mjs',
  'tools/verify-chatgpt-source-fit-sync.mjs',
  'tools/verify-real-generator-runtime.mjs',
  'tools/verify-numeric-g7-source-fit.mjs',
  'tools/verify-algebra-g8-source-fit.mjs',
  'tools/verify-geometry-g7-source-fit.mjs',
  'tools/verify-geometry-g8-source-fit.mjs',
  'tools/verify-all-termux.sh',
  'curriculum-map/CURRICULUM_MAP.md',
  'question-patterns/PATTERN_INDEX.md'
];
for (const f of CRITICAL_FILES) check('critical file present: ' + f, fs.existsSync(f));

// ── 2. Critical directories ──
const CRITICAL_DIRS = ['source-learning', 'sources/intake/2026-06-09'];
for (const d of CRITICAL_DIRS) check('critical dir present: ' + d, fs.existsSync(d) && fs.statSync(d).isDirectory());

// ── 3. The 10 source PDFs ──
const PDF_DIR = 'sources/intake/2026-06-09';
const TEN_PDFS = [
  '01_grade-7_algebra_curriculum.pdf',
  '02_grade-8_algebra_curriculum.pdf',
  '03_grade-7_pre_deductive_geometry_curriculum.pdf',
  '04_grade-8_geometry_curriculum.pdf',
  '05_grade-7_numeric_domain_curriculum.pdf',
  '06_uncertainty_domain_curriculum_examples.pdf',
  '07_numeric_domain_principles_grades-7-8.pdf',
  '08_algebra_domain_principles_grades-7-8.pdf',
  '09_geometry_domain_principles_grades-7-8.pdf',
  '10_grade-8_teaching_sequence_2026-2027.pdf'
];
// PDFs live under per-topic subfolders; search recursively for each filename.
function findFile(dir, name) {
  let found = false;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (found) break;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (findFile(p, name)) found = true; }
    else if (entry.name === name) found = true;
  }
  return found;
}
for (const pdf of TEN_PDFS) check('source PDF present: ' + pdf, findFile(PDF_DIR, pdf));

// ── 4. Every local script referenced by index.html exists (query string stripped) ──
const index = fs.readFileSync('generator/index.html', 'utf8');
const scriptSrcs = [...index.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map(m => m[1]);
const localScripts = scriptSrcs.filter(s => !/^https?:\/\//.test(s));
for (const src of localScripts) {
  const clean = src.split('?')[0].split('#')[0];
  check('index local script exists: ' + clean, fs.existsSync(path.join('generator', clean)));
}

// ── 5. Engine load order invariants ──
function idx(needle) { return index.indexOf(needle); }
check('exercise-set.js is loaded', idx('exercise-set.js') >= 0);
check('phase2-loader.js loaded after exercise-set.js',
  idx('phase2-loader.js') >= 0 && idx('exercise-set.js') >= 0 && idx('phase2-loader.js') > idx('exercise-set.js'));
const sourceFitScripts = localScripts.filter(s => /source-fit-/.test(s));
check('source-fit scripts present in index', sourceFitScripts.length >= 1, 'found ' + sourceFitScripts.length);
for (const s of sourceFitScripts) {
  const base = s.split('?')[0];
  check('source-fit loads before exercise-set: ' + base, idx(base) >= 0 && idx(base) < idx('exercise-set.js'));
}

console.log(fails ? 'BASELINE_PROTECTION_FAIL (' + fails + ')' : 'BASELINE_PROTECTION_PASS');
process.exit(fails ? 1 : 0);
