// tools/verify-branding.mjs
// Branding lock: the user-visible owner name must be "יניב רז" — never the old
// variants. Scans user-facing runtime files (generator HTML/JS) + active docs;
// does NOT touch git owner / remote / package name / email / technical ids.
// Run from repo root: node tools/verify-branding.mjs
import fs from 'node:fs';
import path from 'node:path';

let fails = 0;
function check(name, ok, info) { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (ok ? '' : '  :: ' + (info || ''))); if (!ok) fails++; }

// forbidden visible owner-name variants
const FORBIDDEN = ['יניב מזרחי', 'Yaniv Mizrachi', 'yaniv mizrachi', 'Yaniv Mizrahi'];
const CANON = 'יניב רז';

function listFiles(dir, exts) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules|\.git/.test(p)) out.push(...listFiles(p, exts)); }
    else if (exts.some(x => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

// user-visible runtime surface
const runtime = listFiles('generator', ['.html', '.js', '.css']);
const docsActive = ['docs/QA_CHECKLIST.md', 'docs/SOURCE_BIBLE.md'].filter(f => fs.existsSync(f));
const scanned = runtime.concat(docsActive);

let hits = [];
for (const f of scanned) {
  const txt = fs.readFileSync(f, 'utf8');
  for (const bad of FORBIDDEN) {
    if (txt.indexOf(bad) >= 0) hits.push(f + ' :: "' + bad + '"');
  }
}
for (const h of hits) console.log('  OFFENDER ' + h);
check('no forbidden owner-name variant in visible runtime/active docs (' + scanned.length + ' files)', hits.length === 0, hits.length + ' hits');

// the canonical credit must be present in the header
const index = fs.readFileSync('generator/index.html', 'utf8');
check('index.html header shows the canonical owner name "' + CANON + '"', index.indexOf(CANON) >= 0);

// technical identifiers must remain untouched (sanity: package name + remote scope)
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
check('package name unchanged (targilim)', pkg.name === 'targilim');

console.log(fails ? 'BRANDING_FAIL (' + fails + ')' : 'BRANDING_PASS');
process.exit(fails ? 1 : 0);
