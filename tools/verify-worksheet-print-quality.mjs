// tools/verify-worksheet-print-quality.mjs
// Guards the textbook-style worksheet layout: typed answer areas, A4 print
// rules, name/date line, flat (non-card) print exercises, separated answer key.
// Run: node tools/verify-worksheet-print-quality.mjs
import fs from 'node:fs';

let fails = 0;
function check(name, ok){ console.log((ok?'PASS':'FAIL')+' — '+name); if(!ok) fails++; }
const exset = fs.readFileSync('generator/exercise-set.js','utf8');
const css = fs.readFileSync('generator/style.css','utf8');

// ── typed work areas ──
check('open type: solution lines + final answer blank', exset.includes('דרך:') && exset.includes('תשובה:') && exset.includes('wa-blank'));
check('mcq type: answer blank + justification', exset.includes('נימוק:'));
check('tf type: verdict blank + correction', exset.includes('נכון / שגוי:') && exset.includes('אם שגוי — תקנו:'));
check('mistake type: error + fix lines', exset.includes('הטעות:') && exset.includes('תיקון:'));
check('work area shaped per question type', /workAreaHTML\(qtype\)/.test(exset) && (exset.match(/qtype==='(mcq|tf|mistake)'/g)||[]).length >= 3);

// ── worksheet header ──
check('print name/date/class line', exset.includes('exset-nameline') && exset.includes('שם:') && exset.includes('תאריך:') && exset.includes('כיתה:'));
check('name line print-only', /\.exset-nameline\s*\{[^}]*display:\s*none/.test(css) && /@media print[\s\S]*\.exset-nameline\s*\{\s*display:\s*block/.test(css));

// ── print rules ──
const printBlock = css.slice(css.indexOf('@media print'));
check('@page A4 rule', /@page\s*\{[^}]*size:\s*A4/.test(css));
check('print hides set action buttons', /\.exset-actions\s*\{\s*display:\s*none\s*!important/.test(printBlock));
check('print hides controls/header', /\.hdr,/.test(printBlock) && /\.btn-gen/.test(printBlock));
check('print exercises are flat, not cards', /\.ex-card\s*\{[^}]*box-shadow:\s*none/.test(printBlock) && /border-bottom:\s*1px solid/.test(printBlock));
check('print numbering plain black', /\.ex-num\s*\{[^}]*background:\s*none/.test(printBlock));
check('exercise not split across pages', /\.ex-card\s*\{[^}]*break-inside:\s*avoid/.test(printBlock));
check('answer key on its own page when open', /\.answer-key\.open\s*\{[^}]*break-before:\s*page/.test(printBlock));
check('answer key hidden when closed', /\.answer-key:not\(\.open\)\s*\{\s*display:\s*none\s*!important/.test(printBlock));

// ── answer key separated from questions ──
const cardsIdx = exset.indexOf('ex-card'), keyIdx = exset.indexOf('answer-key');
check('answer key rendered after all exercises, in its own container', cardsIdx > -1 && keyIdx > cardsIdx);
check('MCQ correct choice not highlighted inside worksheets', /\.exset \.mcq-choice\.mcq-correct/.test(css));

console.log(fails ? 'WORKSHEET_PRINT_QUALITY_FAIL ('+fails+')' : 'WORKSHEET_PRINT_QUALITY_PASS');
process.exit(fails?1:0);
