import fs from 'node:fs';

let fails = 0;
function check(name, ok) {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name);
  if (!ok) fails++;
}
function read(path) {
  return fs.readFileSync(path, 'utf8');
}

const index = read('generator/index.html');
const override = read('generator/engine/diagram-premium-overrides.js');
const qa = read('docs/verification/premium-geometry-diagrams-preview.html');

check('index loads diagram premium override after diagrams.js',
  index.includes('engine/diagrams.js') &&
  index.includes('engine/diagram-premium-overrides.js') &&
  index.indexOf('engine/diagrams.js') < index.indexOf('engine/diagram-premium-overrides.js')
);

check('override redefines triangleAnglesSvg', override.includes('E.triangleAnglesSvg = function'));
check('override redefines rightTriangleSvg', override.includes('E.rightTriangleSvg = function'));
check('override redefines rectangleSvg', override.includes('E.rectangleSvg = function'));
check('override redefines circleSvg', override.includes('E.circleSvg = function'));

check('premium SVG uses padded larger viewBox', override.includes('const W = 360') && override.includes('PAD = 46'));
check('premium SVG uses angle arcs', override.includes('function angleArc') && override.includes('<path d="M'));
check('premium labels use background boxes', override.includes('function labelBox') && override.includes('<rect'));
check('premium diagrams avoid undefined/NaN literals', !override.includes('undefined') && !override.includes('NaN'));

check('visual QA preview exists and loads override', qa.includes('diagram-premium-overrides.js'));
check('visual QA includes 10 angle triangles', qa.includes('משולשי זוויות') && qa.includes('length:10'));
check('visual QA includes 10 right triangles', qa.includes('משולשים ישרי זווית') && qa.includes('length:10'));

console.log(fails ? `PREMIUM_GEOMETRY_VERIFY_FAIL (${fails})` : 'PREMIUM_GEOMETRY_VERIFY_PASS');
process.exit(fails ? 1 : 0);
