// tools/verify-release-readiness-docs.mjs
// Prevents release/PR documentation from drifting behind the actual 50-engine,
// task-generation-only product.
import fs from 'node:fs';

let fails = 0;
const pass = name => console.log('PASS — ' + name);
const fail = (name, detail = '') => { console.log('FAIL — ' + name + (detail ? ' — ' + detail : '')); fails++; };
const check = (name, ok, detail = '') => ok ? pass(name) : fail(name, detail);
const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';

const files = {
  readme: 'README.md',
  status: 'PROJECT_STATUS.md',
  checklist: 'docs/RELEASE_CHECKLIST.md',
  hardening: 'docs/reports/AUTOMATED_HARDENING_REPORT_20260614.md',
  workflow: '.github/workflows/verify.yml',
  package: 'package.json',
  visualQa: 'generator/visual-qa.html',
  gallery: 'generator/gallery.html'
};

for (const [label, path] of Object.entries(files)) {
  check(label + ' exists', fs.existsSync(path), path);
}

const readme = read(files.readme);
const status = read(files.status);
const checklist = read(files.checklist);
const hardening = read(files.hardening);
const workflow = read(files.workflow);
const pkg = JSON.parse(read(files.package) || '{}');
const visualQa = read(files.visualQa);
const gallery = read(files.gallery);

check('README reflects 50-engine state', /50\s+מנועי/.test(readme) && /0\s+נושאי fallback/.test(readme));
check('README records task-generation-only main UI',
  readme.includes('task-generation-only') && readme.includes('generator/index.html'));
check('README does not list gallery/visual-QA as regular entry points',
  !readme.includes('generator/gallery.html') && !readme.includes('generator/visual-qa.html'));
check('PROJECT_STATUS is refreshed to 2026-06-14', status.includes('2026-06-14'));
check('PROJECT_STATUS records 50 engines and 0 fallback', status.includes('50') && /0\s+fallback/.test(status));
check('PROJECT_STATUS mentions GitHub Actions success requirement', status.includes('GitHub Actions') && status.includes('verify:deep'));
check('release checklist has merge safety rules', checklist.includes('Do not merge to `main`') && checklist.includes('explicit approval'));
check('release checklist requires task-only UI plus print/copy QA',
  checklist.includes('task/exercise generation only') &&
  checklist.includes('generator/index.html') &&
  checklist.includes('Print') &&
  checklist.includes('העתק כתמונה'));
check('hardening report documents CI + QA dashboard', hardening.includes('GitHub Actions deep gate') && hardening.includes('Visual QA dashboard'));
check('workflow runs verify:deep', workflow.includes('npm run verify:deep'));
check('workflow can be manually dispatched', workflow.includes('workflow_dispatch'));
check('package exposes verify:release-docs', !!(pkg.scripts && pkg.scripts['verify:release-docs']));
check('package exposes verify:task-ui', !!(pkg.scripts && pkg.scripts['verify:task-ui']));
check('package no longer exposes teacher/gallery/visual-QA aliases',
  !['verify:teacher', 'verify:teacher-controls', 'verify:gallery', 'verify:visual-qa']
    .some(k => Object.prototype.hasOwnProperty.call(pkg.scripts || {}, k)));
check('verify:all includes task-only UI gate', !!(pkg.scripts && pkg.scripts['verify:all'] || '').includes('verify:task-ui'));
check('verify:deep includes release docs gate', !!(pkg.scripts && pkg.scripts['verify:deep'] || '').includes('verify:release-docs'));
check('verify:deep no longer requires teacher/gallery/visual-QA gates',
  !/verify:teacher|verify:teacher-controls|verify:gallery|verify:visual-qa/.test((pkg.scripts && pkg.scripts['verify:deep']) || ''));
check('visual QA uses live registry, not hardcoded engine list', visualQa.includes('SOURCE_REGISTRY') && visualQa.includes('-ENGINE$'));
check('gallery uses live registry, not hardcoded engine list', gallery.includes('SOURCE_REGISTRY') && gallery.includes('-ENGINE'));
check('visible credit rule is preserved in docs', readme.includes('יניב רז') || status.includes('יניב רז') || checklist.includes('יניב רז'));

console.log(JSON.stringify({
  ok: fails === 0,
  checkedAt: new Date().toISOString(),
  filesChecked: Object.values(files).length,
  packageVersion: pkg.version
}, null, 2));

console.log(fails ? 'RELEASE_DOCS_FAIL (' + fails + ')' : 'RELEASE_DOCS_PASS');
process.exit(fails ? 1 : 0);
