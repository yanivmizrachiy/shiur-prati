// tools/verify-premium-exercise-ui.mjs  (verify:premium-ui)
// Guards the premium exercise-page UX delivered by the design round so it cannot
// silently regress:
//   • drawing view offers ONLY color + black-and-white (no "גווני אפור")
//   • every exercise card carries central primary "copy / download as image"
//     buttons, and they are excluded from the captured image
//   • the student answer area is ONE "תשובת התלמיד" box (no split דרך:/תשובה:)
//   • image export goes through the unified, premium html2canvas pipeline with a
//     clipboard→PNG-download fallback and device-resolution, white-background,
//     fonts-ready capture
//   • teacher chrome stays out of the exported image (data-html2canvas-ignore)
// Pure source checks — no DOM, no engine load — so it is fast and deterministic.
import fs from 'node:fs';

const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };

const index = read('generator/index.html');
const setSrc = read('generator/exercise-set.js');
const exportSrc = read('generator/export.js');
const teacherSrc = read('generator/teacher-mode.js');
const styleSrc = read('generator/style.css');

// ── 1. Drawing-view selector: color + BW only ──
const svMatch = index.match(/<select id="sv"[\s\S]*?<\/select>/);
const sv = svMatch ? svMatch[0] : '';
check('drawing-view selector #sv exists', !!sv);
check('drawing-view has no "גווני אפור" (gray removed)', sv.indexOf('גווני אפור') < 0 && sv.indexOf('value="gray"') < 0);
check('drawing-view offers צבע (color)', /value="color"/.test(sv) && sv.indexOf('צבע') >= 0);
check('drawing-view offers שחור-לבן (black & white)', /value="bw"/.test(sv) && /שחור[-־]?לבן/.test(sv));
check('drawing-view has exactly two options', (sv.match(/<option/g) || []).length === 2);

// ── 2. Per-card primary image buttons, excluded from the captured image ──
check('cards render "העתק כתמונה" button', setSrc.indexOf('העתק כתמונה') >= 0);
check('cards render "הורד כתמונה" button', setSrc.indexOf('הורד כתמונה') >= 0);
check('image buttons are primary (btn-img-primary)', /btn-img-primary/.test(setSrc) && /btn-img-primary/.test(styleSrc));
check('image bar is excluded from the captured image',
  /<div class="ex-imgbar" data-html2canvas-ignore="true">/.test(setSrc));
check('image buttons call the unified actions', /exImageCopy\(/.test(setSrc) && /exImageDownload\(/.test(setSrc));

// ── 3. One student answer box, no split work area ──
check('student answer box is "תשובת התלמיד"', setSrc.indexOf('תשובת התלמיד') >= 0 && /class="answer-box"/.test(setSrc));
check('no split work-area (.work-area removed)', setSrc.indexOf('class="work-area"') < 0);
check('no split "דרך:" label', setSrc.indexOf('work-label">דרך:') < 0 && setSrc.indexOf('>דרך:<') < 0);
check('no split "תשובה:" work label', setSrc.indexOf('work-label">תשובה:') < 0);

// ── 4. Unified premium image export pipeline ──
check('captureExerciseCardAsPng exists', /function captureExerciseCardAsPng/.test(exportSrc));
check('capture uses html2canvas', /html2canvas\(/.test(exportSrc));
check('capture renders on a white background', /backgroundColor:\s*'#ffffff'/.test(exportSrc));
check('capture renders at device resolution', /scale:\s*Math\.max\(2,\s*window\.devicePixelRatio/.test(exportSrc));
check('capture waits for web fonts before snapshot', /document\.fonts[\s\S]*?\.ready/.test(exportSrc));
check('capture supports black-and-white output', /grayscale|0\.299/.test(exportSrc));
check('copy-as-image falls back to a PNG download', /copyExerciseImage[\s\S]*?ClipboardItem[\s\S]*?downloadBlob/.test(exportSrc));
check('image filename is targil-matematika-<n>.png', /targil-matematika-/.test(exportSrc));

// ── 5. Teacher chrome never leaks into the exported image ──
check('teacher control bar is html2canvas-ignored', /teacher-controls teacher-only" data-html2canvas-ignore="true"/.test(teacherSrc));
check('teacher card is html2canvas-ignored', /teacher-card teacher-only" data-html2canvas-ignore="true"/.test(teacherSrc));

console.log(fails ? 'PREMIUM_UI_FAIL (' + fails + ')' : 'PREMIUM_UI_PASS');
process.exit(fails ? 1 : 0);
