// tools/verify-geometry-diagram-quality.mjs
// Guards geometry diagram quality, with G7-04 as the reference engine:
// angle-faithful construction, angle arcs, vertex letters, bisector-placed
// labels, real structural variety, and clean professional theme colors.
// Run: node tools/verify-geometry-diagram-quality.mjs
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
function check(name, ok, info){ console.log((ok?'PASS':'FAIL')+' — '+name+(ok?'':' :: '+(info||''))); if(!ok) fails++; }

const sandbox = { window: {}, console, Math, Date };
vm.createContext(sandbox);
const files = ['themes.js','random.js','validators.js','diagrams.js','question-types.js']
  .concat(fs.readdirSync('generator/engine').filter(f=>f.startsWith('pilot-')).sort());
for (const f of files) vm.runInContext(fs.readFileSync('generator/engine/'+f,'utf8'), sandbox, {filename:f});
const E = sandbox.window.TargilimEngine;

// ── theme is professional/print-friendly (no saturated childish fill) ──
check('geometry fill is light/neutral', /^#(e|f)/i.test(E.themes.geometry.fill));
check('geometry stroke is dark slate', E.themes.geometry.stroke.toLowerCase() !== '#92400e');

// ── triangle renderer anatomy ──
const one = E.triangleAnglesSvg({A:45,B:80,C:null},'C',{A:45,B:80,C:55});
check('angle arcs drawn (3 arc paths)', (one.match(/A 15 15/g)||[]).length === 3);
check('vertex letters A/B/C present', />A<\/text>/.test(one) && />B<\/text>/.test(one) && />C<\/text>/.test(one));
check('labels use anchored baseline placement', /dominant-baseline="middle"/.test(one) && /text-anchor="middle"/.test(one));
check('unknown angle marked ? in accent color', />\?<\/text>/.test(one));
check('no NaN/undefined in svg', !/NaN|undefined/.test(one));

// structural variety for IDENTICAL angles (mirror/invert/rotation)
const same = new Set();
for (let i=0;i<40;i++) same.add(E.triangleAnglesSvg({A:45,B:80,C:55},null,{A:45,B:80,C:55}));
check('>=10 structural variants for identical angles (40 draws)', same.size >= 10, same.size+'');

// invalid-sum validity drawings must not crash or emit NaN
const inv = E.triangleAnglesSvg({A:100,B:60,C:30},null,{A:100,B:60,C:30});
check('non-180 sums drawn safely (scaled)', /^<svg/.test(inv) && !/NaN/.test(inv));

// ── G7-04 engine quality over 50 draws ──
const qs = new Set(), svgs = new Set();
let bad = 0, rawDeg = 0;
function prose(html){
  return String(html).replace(/<svg[\s\S]*?<\/svg>/g,'').replace(/\$\$[\s\S]*?\$\$/g,' ').replace(/\$[^$]*\$/g,' ').replace(/<[^>]+>/g,' ');
}
for (let i=0;i<50;i++) {
  const r = E.generateG704Engine(i%2?'challenge':'standard','open');
  const all = r.questionHTML + r.answerHTML;
  if (/undefined|NaN/.test(all)) bad++;
  if (/\d+\s*°/.test(prose(all))) rawDeg++;
  qs.add(r.questionHTML.replace(/<svg[\s\S]*?<\/svg>/,'').replace(/\s+/g,' '));
  const m = r.questionHTML.match(/<svg[\s\S]*?<\/svg>/);
  if (m) svgs.add(m[0]);
}
check('G7-04: >=25 unique questions of 50', qs.size >= 25, qs.size+'');
check('G7-04: >=25 unique SVGs of 50', svgs.size >= 25, svgs.size+'');
check('G7-04: no undefined/NaN', bad === 0);
check('G7-04: no raw degree labels in prose', rawDeg === 0);
check('G7-04: angles rendered as KaTeX \\sphericalangle…^\\circ',
  /\\sphericalangle [A-C](=\d+\^\\circ)?\$/.test(E.generateG704Engine('standard','open').questionHTML));
let akOk = true;
for (let i=0;i<20;i++) {
  const r = E.generateG704Engine('standard','open');
  if (!/\^\\circ/.test(r.answerHTML)) { akOk = false; break; }
}
check('G7-04: answers carry KaTeX degree notation', akOk);

console.log(fails ? 'GEOMETRY_DIAGRAM_QUALITY_FAIL ('+fails+')' : 'GEOMETRY_DIAGRAM_QUALITY_PASS');
process.exit(fails?1:0);
