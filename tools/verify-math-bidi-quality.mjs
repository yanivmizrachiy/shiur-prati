// tools/verify-math-bidi-quality.mjs
// Guards math/BiDi quality: no raw math tokens (A=45°, bare negatives, degree
// signs) left in Hebrew prose OUTSIDE KaTeX delimiters, across every engine,
// question type and difficulty; plus the CSS isolation rules that keep KaTeX
// and SVG labels from mirroring on the RTL page.
// Run: node tools/verify-math-bidi-quality.mjs [drawsPerCombo]
import fs from 'node:fs';
import vm from 'node:vm';

const N = Number(process.argv[2] || 30);
let fails = 0;
function check(name, ok, info){ console.log((ok?'PASS':'FAIL')+' — '+name+(ok?'':' :: '+(info||''))); if(!ok) fails++; }

// ── static CSS isolation rules ──
const css = fs.readFileSync('generator/style.css','utf8');
check('KaTeX forced LTR', /\.katex[^{]*\{[^}]*direction:\s*ltr/.test(css));
check('KaTeX bidi isolated', /\.katex[^{]*\{[^}]*unicode-bidi:\s*isolate/.test(css));
check('SVG text plaintext bidi', /svg text\s*\{[^}]*unicode-bidi:\s*plaintext/.test(css));

// ── runtime scan of all engines ──
const sandbox = { window: {}, console, Math, Date };
vm.createContext(sandbox);
const files = ['themes.js','random.js','validators.js','diagrams.js','question-types.js']
  .concat(fs.readdirSync('generator/engine').filter(f=>f.startsWith('pilot-')).sort());
for (const f of files) vm.runInContext(fs.readFileSync('generator/engine/'+f,'utf8'), sandbox, {filename:f});
const E = sandbox.window.TargilimEngine;
check('central fmt helpers exist', !!(E.fmt && E.fmt.angle && E.fmt.deg && E.fmt.signed && E.fmt.point));
check('fmt.angle is professional KaTeX', E.fmt && E.fmt.angle('B',80) === '$\\sphericalangle B=80^\\circ$');

// keep real questionTypes so we scan the actual rendered HTML
function prose(html){
  return String(html)
    .replace(/<svg[\s\S]*?<\/svg>/g,'')      // svg labels are graphics, checked separately
    .replace(/<table[\s\S]*?<\/table>/g,'')
    .replace(/\$\$[\s\S]*?\$\$/g,' ')        // strip block math
    .replace(/\$[^$]*\$/g,' ')               // strip inline math
    .replace(/<[^>]+>/g,' ');
}
const RAW_DEGREE = /\d+\s*°/;
const RAW_EQ = /[A-Za-z]\s*=\s*-?\d/;
const RAW_NEG_AFTER_HEB = /[֐-׿]\s+-\d/;
const BADTOK = /undefined|NaN/;

const gens = Object.keys(E).filter(k=>/^generate[A-Z]\d{3}Engine$/.test(k)).sort();
let scanned = 0, offenders = [];
for (const g of gens) {
  for (const d of ['basic','standard','challenge']) {
    for (const t of ['open','mcq','tf','mistake']) {
      for (let i=0;i<N;i++) {
        scanned++;
        const r = E[g](d,t);
        const all = (r.questionHTML||'')+(r.answerHTML||'');
        const p = prose(all);
        if (RAW_DEGREE.test(p)) { offenders.push([g,t,'raw-degree',p.match(RAW_DEGREE)[0]]); break; }
        if (RAW_EQ.test(p)) { offenders.push([g,t,'raw-equation',p.match(RAW_EQ)[0]]); break; }
        if (RAW_NEG_AFTER_HEB.test(p)) { offenders.push([g,t,'raw-negative',p.match(RAW_NEG_AFTER_HEB)[0]]); break; }
        if (BADTOK.test(all)) { offenders.push([g,t,'undefined/NaN','']); break; }
      }
    }
  }
}
for (const o of offenders.slice(0,12)) console.log('  OFFENDER', o.join(' | '));
check('no raw math in Hebrew prose ('+scanned+' generations scanned)', offenders.length === 0, offenders.length+' offenders');

console.log(fails ? 'MATH_BIDI_QUALITY_FAIL ('+fails+')' : 'MATH_BIDI_QUALITY_PASS');
process.exit(fails?1:0);
