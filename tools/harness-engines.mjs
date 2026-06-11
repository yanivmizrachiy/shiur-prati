// tools/harness-engines.mjs
// Runtime robustness harness for all 25 engine topics.
// Run: node tools/harness-engines.mjs [runsPerCombo]
// Checks per generation: non-empty question/answer, no undefined/NaN leakage,
// MCQ exactly one correct + unique choices, SVG/table root valid when present.
import fs from 'node:fs';
import vm from 'node:vm';

const RUNS = Number(process.argv[2] || 60);
const sandbox = { window: {}, console, Math, Date };
vm.createContext(sandbox);

const files = ['themes.js','random.js','validators.js','diagrams.js','question-types.js']
  .concat(fs.readdirSync('generator/engine').filter(f=>f.startsWith('pilot-')).sort());
for (const f of files) {
  vm.runInContext(fs.readFileSync('generator/engine/'+f,'utf8'), sandbox, {filename:f});
}
const E = sandbox.window.TargilimEngine;

// Stub the DOM-facing question-type renderers with pass-throughs so we can
// inspect raw fields; fall back if question-types.js already returns objects.
E.questionTypes = {
  mcq: o=>({...o,_t:'mcq'}), tf: o=>({...o,_t:'tf'}),
  mistake: o=>({...o,_t:'mistake'}), open: o=>({...o,_t:'open'})
};

const gens = Object.keys(E).filter(k=>/^generate[A-Z]\d{3}Engine$/.test(k)).sort();
if (gens.length !== 25) { console.error('Expected 25 generators, found '+gens.length+': '+gens.join(',')); process.exit(1); }

let fails = 0, total = 0;
const BAD = /undefined|NaN/;
for (const g of gens) {
  for (const d of ['basic','standard','challenge']) {
    for (const t of ['open','mcq','tf','mistake']) {
      for (let i=0; i<RUNS; i++) {
        total++;
        let r;
        try { r = E[g](d,t); }
        catch(e){ fails++; console.error('THROW', g, d, t, e.message); break; }
        const s = (r.question||'')+(r.answer||'')+(r.svg||'');
        if (!r.question || !r.answer) { fails++; console.error('EMPTY', g, d, t); break; }
        if (BAD.test(s)) { fails++; console.error('BADTOKEN', g, d, t, s.slice(0,160)); break; }
        if (t==='mcq') {
          if (!Array.isArray(r.choices) || r.choices.filter(c=>c.correct).length !== 1) { fails++; console.error('MCQ-CORRECT', g, d, t); break; }
          if (new Set(r.choices.map(c=>c.text)).size !== r.choices.length) { fails++; console.error('MCQ-DUP', g, d, t, JSON.stringify(r.choices.map(c=>c.text))); break; }
        }
        if (r.svg && !/^<svg|^<table/.test(r.svg)) { fails++; console.error('SVG-ROOT', g, d, t); break; }
      }
    }
  }
}
console.log('ENGINE_HARNESS generators='+gens.length+' generations='+total+' fails='+fails);
if (fails) process.exit(1);
console.log('ENGINE_HARNESS_PASS');
