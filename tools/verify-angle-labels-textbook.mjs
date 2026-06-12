import fs from 'node:fs';

let fails = 0;
function check(name, ok) {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name);
  if (!ok) fails++;
}

const src = fs.readFileSync('generator/engine/diagram-premium-overrides.js','utf8');
const start = src.indexOf('E.triangleAnglesSvg = function');
const end = src.indexOf('E.rightTriangleSvg = function');
const fn = src.slice(start, end);

check('triangleAnglesSvg exists in premium override', start >= 0 && end > start);
check('angle labels use plain text, not labelBox', !fn.includes('labelBox('));
check('angle labels use paint-order white halo', fn.includes('paint-order:stroke') && fn.includes('stroke:#ffffff'));
check('angle labels are placed by interior bisector', fn.includes('mul(bis, dist)'));
check('unknown angle has stronger style', fn.includes('unknownLabel ? 16 : 14'));
check('vertex letters are outside by centroid direction', fn.includes('sub(v, CEN)'));
check('angle arcs still exist', fn.includes('angleArc(v, o1, o2'));

console.log(fails ? `ANGLE_LABELS_VERIFY_FAIL (${fails})` : 'ANGLE_LABELS_VERIFY_PASS');
process.exit(fails ? 1 : 0);
