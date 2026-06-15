import fs from 'node:fs';
const src = fs.readFileSync('generator/exercise-set.js', 'utf8');
let fails = 0;
function check(name, ok){ console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name); if(!ok) fails++; }
check('cards have exercise number', src.includes('<span class="ex-num">'));
check('no type-label map in cards', !src.includes('TYPE_LABELS'));
check('no qtype tag expression in cards', !src.includes('ex.qtype]'));
check('rect sharpener exists', src.includes('function sharpenMathRects'));
check('question html sanitized', src.includes('const questionHTML=sharpenMathRects(ex.questionHTML)'));
if(fails){ throw new Error('WORKSHEET_POLISH_FAIL '+fails); }
console.log('WORKSHEET_POLISH_PASS');
