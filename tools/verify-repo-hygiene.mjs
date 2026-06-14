// tools/verify-repo-hygiene.mjs
// Guards the PR against committing local audit/AI/editor artifacts.
// It checks tracked files via git ls-files so local untracked .claude/ or _audit/
// directories do not break a developer's verification run.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

let fails = 0;
const pass = name => console.log('PASS — ' + name);
const fail = (name, detail = '') => { console.log('FAIL — ' + name + (detail ? ' — ' + detail : '')); fails++; };
const check = (name, ok, detail = '') => ok ? pass(name) : fail(name, detail);

function read(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
}

function trackedFiles() {
  try {
    return execFileSync('git', ['ls-files'], { encoding: 'utf8' })
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(Boolean);
  } catch (error) {
    // CI and normal repo runs should have git. Fallback keeps the verifier useful
    // in stripped environments, while excluding heavy/irrelevant folders.
    const out = [];
    const skip = new Set(['.git', 'node_modules']);
    function walk(dir) {
      if (!fs.existsSync(dir)) return;
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (skip.has(ent.name)) continue;
        const p = dir === '.' ? ent.name : dir + '/' + ent.name;
        if (ent.isDirectory()) walk(p);
        else out.push(p);
      }
    }
    walk('.');
    return out;
  }
}

const files = trackedFiles();
const gitignore = read('.gitignore');
const pkg = JSON.parse(read('package.json') || '{}');

const requiredIgnores = [
  '_audit/',
  'TARGILIM_*_AUDIT*.txt',
  'TARGILIM_*_INTEL*.txt',
  '.claude/',
  'node_modules/'
];

for (const pattern of requiredIgnores) {
  check('.gitignore keeps ' + pattern + ' out', gitignore.includes(pattern));
}

const forbidden = [
  { label: '_audit directory', re: /(^|\/)_audit(\/|$)/ },
  { label: '.claude directory', re: /(^|\/)\.claude(\/|$)/ },
  { label: 'ad-hoc audit text file', re: /(^|\/)TARGILIM_.*_AUDIT.*\.txt$/ },
  { label: 'ad-hoc intel text file', re: /(^|\/)TARGILIM_.*_INTEL.*\.txt$/ },
  { label: 'node_modules', re: /(^|\/)node_modules(\/|$)/ }
];

for (const rule of forbidden) {
  const hits = files.filter(p => rule.re.test(p));
  check('no tracked ' + rule.label, hits.length === 0, hits.slice(0, 10).join(', '));
}

check('package exposes verify:deep', !!(pkg.scripts && pkg.scripts['verify:deep']));
check('package exposes verify:all', !!(pkg.scripts && pkg.scripts['verify:all']));
check('package exposes verify:hygiene', !!(pkg.scripts && pkg.scripts['verify:hygiene']));

console.log(JSON.stringify({
  ok: fails === 0,
  checkedAt: new Date().toISOString(),
  trackedFiles: files.length,
  requiredIgnores
}, null, 2));

console.log(fails ? 'REPO_HYGIENE_FAIL (' + fails + ')' : 'REPO_HYGIENE_PASS');
process.exit(fails ? 1 : 0);
