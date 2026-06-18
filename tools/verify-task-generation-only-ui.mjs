// tools/verify-task-generation-only-ui.mjs  (verify:task-ui)
// Guards the main generator UX: it is a task/exercise generator only.
// Internal historical QA pages may exist in the repo, but index.html must not
// expose teacher mode, galleries, or QA workbenches to the regular user.
import fs from 'node:fs';

const read = p => fs.readFileSync(p, 'utf8');
let fails = 0;
const check = (name, ok, extra = '') => {
  console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name + (extra && !ok ? ' :: ' + extra : ''));
  if (!ok) fails++;
};
const stripQuery = src => src.split('?')[0].split('#')[0];
const visibleText = html => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const index = read('generator/index.html');
const setSrc = read('generator/exercise-set.js');
const pkg = JSON.parse(read('package.json'));
const visible = visibleText(index);
const scripts = [...index.matchAll(/<script\s+[^>]*src="([^"]+)"[^>]*><\/script>/g)]
  .map(m => stripQuery(m[1]));

check('main generator does not load teacher-mode.js', !scripts.includes('teacher-mode.js'));
check('main generator has no teacher toggle button',
  !/id="btnTeacherMode"/.test(index) &&
  !/Teacher\.toggle\(\)/.test(index) &&
  !/teacher-toggle-row/.test(index));
check('visible main generator has no "מצב מורה"', visible.indexOf('מצב מורה') < 0);
check('main generator has no gallery or visual-QA links',
  !/href="(?:gallery\.html|visual-qa\.html)/.test(index) &&
  visible.indexOf('גלריית') < 0 &&
  visible.indexOf('QA') < 0 &&
  visible.indexOf('בדיקת שרטוטים') < 0);
check('exercise renderer does not auto-decorate teacher mode',
  !/Teacher\.decorateSet/.test(setSrc) &&
  !/teacher-card/.test(setSrc) &&
  !/teacher-controls/.test(setSrc));

check('task setup controls remain present',
  ['sg', 'sd', 'st', 'sl', 'sv', 'sn', 'selQType', 'selDiff', 'selMcqMode']
    .every(id => index.includes('id="' + id + '"')));
check('primary task-generation action remains visible',
  visible.indexOf('צור דף תרגילים') >= 0);
check('per-exercise image copy/download remain available',
  setSrc.indexOf('העתק כתמונה') >= 0 &&
  setSrc.indexOf('הורד כתמונה') >= 0 &&
  /exImageCopy\(/.test(setSrc) &&
  /exImageDownload\(/.test(setSrc));
check('image buttons stay outside copied images',
  /<div class="ex-imgbar" data-html2canvas-ignore="true">/.test(setSrc));

const scriptsMap = pkg.scripts || {};
check('package exposes verify:task-ui', scriptsMap['verify:task-ui'] === 'node tools/verify-task-generation-only-ui.mjs');
check('package exposes no teacher/gallery/visual-QA npm aliases',
  !['verify:teacher', 'verify:teacher-controls', 'verify:gallery', 'verify:visual-qa'].some(k => Object.prototype.hasOwnProperty.call(scriptsMap, k)));
check('verify:all includes verify:task-ui', /verify:task-ui/.test(scriptsMap['verify:all'] || ''));
check('verify:workbench does not require teacher-mode gates', !/verify:teacher|verify:teacher-controls/.test(scriptsMap['verify:workbench'] || ''));
check('verify:deep does not require teacher/gallery/visual-QA gates',
  !/verify:teacher|verify:teacher-controls|verify:gallery|verify:visual-qa/.test(scriptsMap['verify:deep'] || ''));

console.log(fails ? 'TASK_GENERATION_ONLY_UI_FAIL (' + fails + ')' : 'TASK_GENERATION_ONLY_UI_PASS');
process.exit(fails ? 1 : 0);
