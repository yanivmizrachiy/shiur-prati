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

// ── 3. One clean, untitled student answer box, no split work area ──
check('one student answer box via stable hook', /data-student-answer-box="true"/.test(setSrc) && /class="answer-box"/.test(setSrc));
check('answer box is captured in the image (not html2canvas-ignored)',
  /<div class="answer-box" data-student-answer-box="true">(?![^>]*html2canvas-ignore)/.test(setSrc));
check('answer box has NO title/label ("תשובת התלמיד")', setSrc.indexOf('תשובת התלמיד') < 0 && setSrc.indexOf('answer-box-head') < 0);
check('no split work-area (.work-area removed)', setSrc.indexOf('class="work-area"') < 0);
check('no split "דרך:" label', setSrc.indexOf('work-label">דרך:') < 0 && setSrc.indexOf('>דרך:<') < 0);
check('no split "תשובה:" work label', setSrc.indexOf('work-label">תשובה:') < 0);

// ── 3b. No developer/repo jargon in the regular teacher view ──
// Teachers see pedagogy, not repo words. Check the VISIBLE text of index.html
// (scripts/styles/tags stripped, so code identifiers and src paths don't count).
const indexVisible = index
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ');
['מנוע', 'מקור', 'QA', 'fallback', 'Registry'].forEach(w =>
  check('teacher view has no "' + w + '"', indexVisible.indexOf(w) < 0));
check('no "גלריית מנועים" link text', index.indexOf('גלריית מנועים') < 0);
check('no "QA חזותי" link text', index.indexOf('QA חזותי') < 0);
// Topic-dropdown labels are cleaned of internal markers (✦ / מנוע / גרסה חכמה) at display time.
const coreSrc = read('generator/core.js');
check('cleanTopicLabel exists and strips internal markers', /function cleanTopicLabel/.test(coreSrc) && /✦/.test(coreSrc) && /מנוע/.test(coreSrc));
check('topic dropdown applies cleanTopicLabel', /cleanTopicLabel\(t\[1\]\)/.test(coreSrc));
check('worksheet title applies cleanTopicLabel', /cleanTopicLabel\(/.test(setSrc));

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

// ── 6. Learning-material viewer (book): served from the site, no 404, no repo paths ──
const bookJs = read('generator/book.js');
const bookHtml = read('generator/book.html');
const deployYml = fs.existsSync('.github/workflows/deploy-pages.yml') ? read('.github/workflows/deploy-pages.yml') : '';
check('book viewer serves materials from the site (assets/sources/)', /assets\/sources\//.test(bookJs));
check('book frame is NOT pointed at the unreachable repo path', !/\$\('pdfFrame'\)\.src\s*=\s*b\[6\]/.test(bookJs) && !/pdfFrame[\s\S]{0,30}\.\.\/sources\/intake/.test(bookJs));
check('book viewer does not display a raw file path/name', !/\$\('pdfPath'\)\.textContent\s*=\s*b\[6\]/.test(bookJs) && !/\$\('fileName'\)\.textContent\s*=\s*b\[5\]/.test(bookJs));
const bookVisible = bookHtml
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ');
['sources/intake', 'מניפסט', 'הריפו', 'מקורות', 'מקוריים'].forEach(w =>
  check('book view has no "' + w + '"', bookVisible.indexOf(w) < 0));
check('deploy bundles learning materials into the published site', /generator\/assets\/sources/.test(deployYml));

console.log(fails ? 'PREMIUM_UI_FAIL (' + fails + ')' : 'PREMIUM_UI_PASS');
process.exit(fails ? 1 : 0);
