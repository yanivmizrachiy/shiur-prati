// tools/verify-print-layout.mjs  (verify:print-layout)
// Gate for the student print layout: the print stylesheet must produce a clean
// A4 worksheet — hide all app/teacher chrome, keep the name line, and never leak
// the teacher card / controls / answer key (unless explicitly opened) onto the
// printed page.
import fs from 'node:fs';

const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };

const css = read('generator/style.css');
check('stylesheet has an @media print block', css.indexOf('@media print') >= 0);
const print = css.slice(css.indexOf('@media print'));

// app chrome hidden
['.hdr', '.card', '.btn-gen'].forEach(sel => check('print hides app chrome ' + sel, print.indexOf(sel) >= 0));
// teacher-only chrome hidden in the student print
['.teacher-only', '.teacher-controls', '.teacher-card', '.follow-up-host', '.tc-toast'].forEach(sel =>
  check('print hides teacher chrome ' + sel, print.indexOf(sel) >= 0));
// the worksheet essentials remain
check('print keeps the name/date line', /\.exset-nameline\s*\{\s*display:\s*block/.test(print));
check('answer key hidden unless opened', /\.answer-key:not\(\.open\)\s*\{\s*display:\s*none/.test(print));
check('answer-key prints on its own page when opened', /break-before:\s*page/.test(print));
check('question cards avoid being split across pages', /break-inside:\s*avoid/.test(print));

// the on-screen action buttons are excluded from PNG export captures
const xset = read('generator/exercise-set.js');
check('exercise actions excluded from html2canvas', /data-html2canvas-ignore="true"/.test(xset));

// index links the print stylesheet (no separate print css needed) and ships teacher CSS
const idx = read('generator/index.html');
check('index.html loads style.css', /style\.css/.test(idx));

console.log(fails ? 'PRINT_LAYOUT_FAIL (' + fails + ')' : 'PRINT_LAYOUT_PASS');
process.exit(fails ? 1 : 0);
