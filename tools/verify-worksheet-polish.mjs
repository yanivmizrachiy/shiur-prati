import fs from 'node:fs';

const src = fs.readFileSync('generator/exercise-set.js', 'utf8');
const checks = [
  ['no TYPE_LABELS in exercise-set renderer', !src.includes('TYPE_LABELS')],
  ['no qtype badge expression', !src.includes('ex.qtype]')],
  ['sharp rectangle sanitizer exists', src.includes('function sharpenMathRects')],
  ['question html sanitized before render', src.includes('const questionHTML=sharpenMathRects(ex.questionHTML);')],
  ['exercise body uses sanitized html', src.includes("+'<div class=\"ex-body\">'+questionHTML+'</div>'")]
];

let fails = 0;
for (const [name, ok] of checks) {
  console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name);
  if (!ok) fails++;
}

console.log(fails ? 'WORKSHEET_POLISH_FAIL' : 'WORKSHEET_POLISH_PASS');
process.exit(fails ? 1 : 0);
