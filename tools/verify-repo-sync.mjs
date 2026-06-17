// tools/verify-repo-sync.mjs
// Verifies that the current working tree is the real GitHub-backed repo, clean,
// and exactly aligned with origin/main and the live remote main ref.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const EXPECTED_REMOTE = 'github.com/yanivmizrachiy/targilim';
let fails = 0;

function run(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    const msg = (err.stderr && String(err.stderr).trim()) || err.message;
    throw new Error(`${cmd} ${args.join(' ')} failed: ${msg}`);
  }
}

function git(args) {
  return run('git', args);
}

function check(name, ok, extra = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}${extra && !ok ? ` :: ${extra}` : ''}`);
  if (!ok) fails++;
}

function normalizeRemote(url) {
  return String(url || '')
    .replace(/^git@github\.com:/, 'https://github.com/')
    .replace(/\.git$/, '')
    .replace(/^https?:\/\//, '');
}

let root = '';
try {
  root = git(['rev-parse', '--show-toplevel']).replace(/\\/g, '/');
} catch (err) {
  console.error('FAIL - not inside a git repository');
  process.exit(1);
}

const packagePath = path.join(root, 'package.json');
const packageOk = fs.existsSync(packagePath);
const remoteUrl = (() => {
  try { return git(['remote', 'get-url', 'origin']); } catch { return ''; }
})();
const normalizedRemote = normalizeRemote(remoteUrl);

let branch = '';
let status = '';
let head = '';
let originMain = '';
let remoteMain = '';

try { branch = git(['rev-parse', '--abbrev-ref', 'HEAD']); } catch {}
try { status = git(['status', '--porcelain']); } catch {}
try { head = git(['rev-parse', 'HEAD']); } catch {}
try { originMain = git(['rev-parse', 'origin/main']); } catch {}
try {
  const line = git(['ls-remote', 'origin', 'refs/heads/main']).split(/\r?\n/)[0] || '';
  remoteMain = line.split(/\s+/)[0] || '';
} catch {}

check('working tree root has package.json', packageOk, root);
check('origin remote is yanivmizrachiy/targilim', normalizedRemote === EXPECTED_REMOTE, remoteUrl || 'missing origin');
check('current branch is main', branch === 'main', branch || 'unknown');
check('working tree is clean', status.length === 0, status);
check('HEAD is readable', /^[0-9a-f]{40}$/.test(head), head);
check('origin/main is readable', /^[0-9a-f]{40}$/.test(originMain), originMain);
check('GitHub main is readable via ls-remote', /^[0-9a-f]{40}$/.test(remoteMain), remoteMain || 'network/auth/remote issue');
check('local HEAD equals origin/main', head && head === originMain, `HEAD=${head} origin/main=${originMain}`);
check('local HEAD equals GitHub main', head && head === remoteMain, `HEAD=${head} remote=${remoteMain}`);

console.log(JSON.stringify({
  ok: fails === 0,
  root,
  branch,
  head,
  originMain,
  remoteMain,
  remote: remoteUrl
}, null, 2));

if (fails) {
  console.error('REPO_SYNC_FAIL');
  process.exit(1);
}
console.log('REPO_SYNC_PASS');
