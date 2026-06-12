import fs from 'node:fs';

let fails = 0;
function check(name, ok) {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name);
  if (!ok) fails++;
}
function read(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
}

const src = read('generator/engine/diagram-premium-overrides.js');
const rules = read('docs/GENERATOR_RULES.md');
const report = read('docs/reports/EXTREME_GEOMETRY_AUTOPILOT_REPORT.md');
const qa = read('docs/verification/premium-geometry-diagrams-preview.html');

const triStart = src.indexOf('E.triangleAnglesSvg = function');
const triEnd = src.indexOf('E.rightTriangleSvg = function');
const rightStart = src.indexOf('E.rightTriangleSvg = function');
const rightEnd = src.indexOf('E.rectangleSvg = function');
const rectStart = src.indexOf('E.rectangleSvg = function');
const rectEnd = src.indexOf('E.circleSvg = function');
const circStart = src.indexOf('E.circleSvg = function');

const tri = src.slice(triStart, triEnd);
const right = src.slice(rightStart, rightEnd);
const rect = src.slice(rectStart, rectEnd);
const circ = src.slice(circStart);

check('premium override exists', src.length > 1000);
check('svg frame uses geometricPrecision', src.includes('shape-rendering="geometricPrecision"'));
check('svg frame uses non-scaling strokes', src.includes('vector-effect="non-scaling-stroke"'));

check('triangle uses 72-candidate best-of selection', tri.includes('seed<72') && tri.includes('scoreTriangleLayout'));
check('right triangle uses 72-candidate best-of selection', right.includes('seed<72') && right.includes('scoreTriangleLayout'));

check('triangle angle labels are not boxed', !tri.includes('labelBox('));
check('right triangle labels are not boxed', !right.includes('labelBox('));
check('rectangle labels are not boxed', !rect.includes('labelBox('));
check('circle labels are not boxed', !circ.includes('labelBox('));

check('halo text exists for textbook-style labels', src.includes('plainHaloText'));
check('rules page documents extreme quality mode', rules.includes('Extreme Quality Mode'));
check('rules page documents source grounding', rules.includes('10 source PDF'));
check('report documents improvements', report.includes('What was improved'));
check('QA preview exists', qa.includes('Premium Geometry Diagram QA'));

console.log(fails ? `EXTREME_GEOMETRY_GATE_FAIL (${fails})` : 'EXTREME_GEOMETRY_GATE_PASS');
process.exit(fails ? 1 : 0);
