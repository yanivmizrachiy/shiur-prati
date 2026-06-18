// tools/verify-readonly-verifiers.mjs
// Verifiers must be read-only by default. Report refreshes are allowed only
// behind an explicit --write / TARGILIM_UPDATE_REPORTS gate.
import fs from 'node:fs';
import path from 'node:path';

const toolsDir = 'tools';
const writeApiPattern = /\b(?:writeFileSync|appendFileSync|createWriteStream|rmSync|unlinkSync|copyFileSync|mkdirSync)\s*\(/;
const allowWritable = new Map([
  ['verify-question-coverage-deep.mjs', 'docs/reports/QUESTION_COVERAGE_CENSUS_LATEST.md'],
  ['verify-visual-coverage.mjs', 'docs/reports/VISUAL_COVERAGE_MATRIX.json']
]);

let fails = 0;
function check(name, ok, extra) {
  console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name + (extra && !ok ? ' :: ' + extra : ''));
  if (!ok) fails++;
}

const files = fs.readdirSync(toolsDir)
  .filter(f => /^verify-.*\.mjs$/.test(f))
  .sort();

for (const file of files) {
  if (file === 'verify-readonly-verifiers.mjs') continue;
  const src = fs.readFileSync(path.join(toolsDir, file), 'utf8');
  const hasWriteApi = writeApiPattern.test(src);
  if (!hasWriteApi) {
    check(file + ' is read-only', true);
    continue;
  }

  const expectedPath = allowWritable.get(file);
  check(file + ' is an approved report refresher', !!expectedPath, 'unexpected write API in verifier');
  if (!expectedPath) continue;

  check(file + ' documents explicit report path', src.includes(expectedPath), expectedPath);
  check(file + ' has WRITE_REPORT gate', /\bWRITE_REPORT\b/.test(src));
  check(file + ' accepts --write', /process\.argv\.includes\(['"]--write['"]\)/.test(src));
  check(file + ' accepts TARGILIM_UPDATE_REPORTS=1', /process\.env\.TARGILIM_UPDATE_REPORTS\s*===\s*['"]1['"]/.test(src));
  check(file + ' guards writeFileSync with WRITE_REPORT',
    /if\s*\(\s*WRITE_REPORT\s*\)\s*\{[\s\S]*writeFileSync/.test(src));
}

check('all verify files scanned', files.length >= 40, 'found ' + files.length);
console.log(fails ? 'READONLY_VERIFIERS_FAIL (' + fails + ')' : 'READONLY_VERIFIERS_PASS');
process.exit(fails ? 1 : 0);
