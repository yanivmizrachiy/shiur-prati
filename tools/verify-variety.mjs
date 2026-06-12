// tools/verify-variety.mjs
// Measures real variety per engine: unique question texts and unique SVGs over
// N draws (open questions, standard + challenge mixed). Also verifies TF truth
// balance is unpredictable (25%–75% true) for every engine.
// Run: node tools/verify-variety.mjs [draws]
import fs from 'node:fs';
import vm from 'node:vm';

const N = Number(process.argv[2] || 40);
const sandbox = { window: {}, console, Math, Date };
vm.createContext(sandbox);
const files = ['themes.js','random.js','validators.js','diagrams.js','question-types.js']
  .concat(fs.readdirSync('generator/engine').filter(f=>f.startsWith('pilot-')).sort());
for (const f of files) vm.runInContext(fs.readFileSync('generator/engine/'+f,'utf8'), sandbox, {filename:f});
const E = sandbox.window.TargilimEngine;
E.questionTypes = { mcq:o=>o, tf:o=>o, mistake:o=>o, open:o=>o };

const gens = Object.keys(E).filter(k=>/^generate[A-Z]\d{3}Engine$/.test(k)).sort();
let fails = 0;

// Floors: an engine must produce at least MIN_Q distinct questions and, when it
// draws diagrams, at least MIN_SVG distinct drawings over N draws. These are
// deliberately conservative (catastrophic-sameness detectors), not targets.
const MIN_Q = 6, MIN_SVG = 4;

console.log('engine                    uniqueQ/'+N+'  uniqueSVG  tfTrue%');
for (const g of gens) {
  const qs = new Set(), svgs = new Set();
  let svgCount = 0;
  for (let i=0;i<N;i++) {
    const d = i%2 ? 'challenge' : 'standard';
    const r = E[g](d,'open');
    qs.add((r.question||'').replace(/\s+/g,' '));
    if (r.svg) { svgCount++; svgs.add(r.svg); }
  }
  let tfTrue = 0;
  for (let i=0;i<200;i++) { const r = E[g](i%2?'challenge':'standard','tf'); if (r.isTrue) tfTrue++; }
  const tfPct = Math.round(tfTrue/2);
  const svgInfo = svgCount ? svgs.size+'/'+svgCount : '—';
  const qBad = qs.size < MIN_Q;
  const svgBad = svgCount >= N/2 && svgs.size < MIN_SVG;
  const tfBad = tfPct < 25 || tfPct > 75;
  if (qBad) { fails++; console.log('LOW-QUESTION-VARIETY', g, qs.size+'/'+N); }
  if (svgBad) { fails++; console.log('LOW-SVG-VARIETY', g, svgInfo); }
  if (tfBad) { fails++; console.log('TF-PREDICTABLE', g, tfPct+'%'); }
  console.log(g.padEnd(26), String(qs.size).padEnd(11), svgInfo.padEnd(10), tfPct+'%');
}

console.log(fails ? 'VARIETY_VERIFY_FAIL ('+fails+')' : 'VARIETY_VERIFY_PASS');
process.exit(fails?1:0);
