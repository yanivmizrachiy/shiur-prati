// tools/release-audit.mjs
// Static release audit: governance/RULES invariants that must hold before release.
// Run: node tools/release-audit.mjs
import fs from 'node:fs';

let fails = 0;
function check(name, ok){ console.log((ok?'PASS':'FAIL')+' — '+name); if(!ok) fails++; }
function read(p){ return fs.readFileSync(p,'utf8'); }

// 1. All 26 engine pilot files exist and all topics registered
// (25 original + N7-01 coordinate system, added 2026-06-12 per source file 05)
const pilots = fs.readdirSync('generator/engine').filter(f=>f.startsWith('pilot-'));
check('26 engine pilot files exist', pilots.length === 26);
const pattern = read('generator/engine/pattern-engine.js');
const ids = ['G7-01','G7-02','G7-03','G7-04','N7-01','N7-03','N7-04','N7-05','N7-06','N7-07','A7-01','A7-02','A7-03','U7-01','U7-02','G8-01','G8-04','N8-01','N8-02','N8-03','N8-04','N8-05','A8-02','A8-03','U8-01','U8-02'];
check('all 26 ENGINE topics registered', ids.every(id=>pattern.includes(id+'-ENGINE')));

// 2. No teacher-facing technical jargon in UI strings
const uiFiles = ['generator/index.html','generator/core.js','generator/engine/pattern-engine.js'];
const jargon = ['מנוע מלא','רמת מנוע','מנוע חדש'];
for (const j of jargon) {
  check('no teacher-facing jargon "'+j+'"', uiFiles.every(f=>!read(f).includes(j)));
}
// ENGINE ids must not be rendered as visible card text (only as values/keys)
check('qmeta has no id span (core.js)', !/qmeta[^']*'\+id\+/.test(read('generator/core.js')));

// 3. Credit and main title — present, site-only
const index = read('generator/index.html');
check('credit present, exact wording', index.includes('האתר מנוהל ע"י יניב מזרחי'));
const creditCss = read('generator/style.css') + (fs.existsSync('generator/credit-fix.css') ? '\n' + read('generator/credit-fix.css') : '');
check('credit is white, visible and small', /\.hdr \.credit \{[\s\S]*color:\s*#ffffff;[\s\S]*font-size:\s*0\.(68|74)rem;/.test(creditCss) || /\.hdr \.credit \{[\s\S]*font-size:\s*0\.(68|74)rem;[\s\S]*color:\s*#ffffff;/.test(creditCss));
check('credit outside qcard', !/qcard[\s\S]*credit/.test(read('generator/core.js')));
check('main title element present', index.includes('id="mainTitle"'));
const css = read('generator/style.css');
check('header hidden in print', /@media print[\s\S]*\.hdr,/.test(css));
check('main title hidden in print', /@media print[\s\S]*\.main-title,/.test(css));

// 4. Export exclusions preserved
check('expbar ignored in classic render', read('generator/core.js').includes('expbar" data-html2canvas-ignore'));
check('expbar ignored in engine render', pattern.includes('expbar" data-html2canvas-ignore'));
check('export.js untouched API', read('generator/export.js').includes('copyImg') && read('generator/export.js').includes('dlPNG'));

// 5. Visual mode wiring
check('visual mode select exists', index.includes('id="sv"'));
check('visual mode labels Hebrew', index.includes('גווני אפור') && index.includes('שחור-לבן'));
check('applyVisualMode defined', read('generator/core.js').includes('function applyVisualMode'));
check('applyVisualMode on classic render', /renderMathInElement[\s\S]{0,200}applyVisualMode\(\)/.test(read('generator/core.js')));
check('applyVisualMode on engine render', pattern.includes('applyVisualMode'));

// 6. MCQ filler loops are collision-safe (no bare push remains)
let bare = 0;
for (const f of pilots) {
  if (/while\(values\.length<4(?: && [^)]*)?\) values\.push\((?!')/.test(read('generator/engine/'+f))) { bare++; console.log('  bare filler in '+f); }
}
check('no unsafe MCQ filler loops', bare === 0);

// 7. Docs coherence
const status = read('PROJECT_STATUS.md');
check('REAL_PROGRESS_PERCENT present', /REAL_PROGRESS_PERCENT: \d+%/.test(status));
check('QA checklist exists', fs.existsSync('docs/QA_CHECKLIST.md'));
check('source alignment map exists', fs.existsSync('docs/SOURCE_ALIGNMENT.md'));
check('worklog exists', fs.existsSync('docs/WORKLOG.md'));

console.log(fails ? 'RELEASE_AUDIT_FAIL ('+fails+')' : 'RELEASE_AUDIT_PASS');
process.exit(fails?1:0);



