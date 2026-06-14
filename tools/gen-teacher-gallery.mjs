// tools/gen-teacher-gallery.mjs
// Generates docs/verification/teacher-generator-gallery.html — real sample
// questions from the 8 new dedicated engines (+ a few core ones) with full
// pedagogy, for human review. Run: node tools/gen-teacher-gallery.mjs
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { E, callEngine } = loadEngines();
const SHOW = ['U7-05-ENGINE', 'U7-06-ENGINE', 'U7-07-ENGINE', 'U7-08-ENGINE', 'G8-06-ENGINE', 'G8-08-ENGINE', 'N7-08-ENGINE', 'N7-09-ENGINE', 'N7-01-ENGINE', 'A8-01-ENGINE'];
const QT = ['open', 'mcq', 'tf', 'mistake'];

function esc(s) { return String(s == null ? '' : s); }
let cards = '';
for (const id of SHOW) {
  const ped = E.getPedagogy(id) || {}, src = E.getSource(id) || {};
  cards += `<section class="topic"><h2>${id} — ${esc(ped.topicName)}</h2>`;
  cards += `<div class="ped"><b>מקור:</b> ${esc(src.sourceFile)} · כיתה ${esc(ped.grade)} · <b>מיומנות:</b> ${esc(ped.skill)}<br>`;
  cards += `<b>מטרה לימודית:</b> ${esc(ped.learningGoal)}<br><b>מטרת המורה:</b> ${esc(ped.teacherPurpose)}<br>`;
  cards += `<b>טעות נפוצה:</b> ${esc((ped.misconceptions || [])[0])}<br><b>שאלות המשך:</b> ${esc((ped.followUpIdeas || []).join(' · '))}</div>`;
  for (const t of QT) {
    const r = callEngine(id, 'standard', t);
    if (!r) continue;
    cards += `<div class="q"><div class="qt">${t}</div>${r.questionHTML}<div class="ans"><b>תשובה:</b> ${r.answerHTML}</div></div>`;
  }
  cards += `</section>`;
}

const html = `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>גלריית מחולל למורה — דוגמאות אמיתיות</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"></script>
<style>
body{font-family:"Segoe UI",Arial,sans-serif;background:#f1f5f9;color:#0f172a;max-width:900px;margin:0 auto;padding:20px;line-height:1.7}
h1{font-size:1.3rem} .topic{background:#fff;border-radius:14px;padding:18px;margin:16px 0;box-shadow:0 1px 6px rgba(0,0,0,.08)}
.topic h2{font-size:1.05rem;color:#1d4ed8} .ped{font-size:.85rem;background:#f8fafc;border-right:3px solid #1d4ed8;padding:10px 12px;border-radius:8px;margin-bottom:12px}
.q{border-top:1px dashed #e2e8f0;padding:10px 0} .qt{display:inline-block;background:#0f172a;color:#fff;border-radius:6px;padding:2px 8px;font-size:.7rem;font-weight:800;margin-bottom:6px}
.qtext{font-size:1rem;margin:6px 0;white-space:pre-line} .ans{background:#f0fdf4;border-right:3px solid #16a34a;padding:8px 12px;border-radius:8px;font-size:.9rem;margin-top:8px;white-space:pre-line}
.mcq-choice{background:#f8fafc;border:1px solid #dbeafe;border-radius:8px;padding:6px 10px;margin:3px 0} .engine-svg{max-width:300px;height:auto;display:block;margin:8px 0}
.katex{direction:ltr;unicode-bidi:isolate} svg text{unicode-bidi:plaintext} table{border-collapse:collapse} td,th{border:1px solid #cbd5e1;padding:4px 10px}
</style></head><body>
<h1>גלריית מחולל למורה — דוגמאות אמיתיות מ-${SHOW.length} מנועים</h1>
<p>נוצר אוטומטית מ-tools/gen-teacher-gallery.mjs. כל דוגמה הופקה מהמנוע האמיתי, עם מקור ומטרה לימודית.</p>
${cards}
<script>window.addEventListener('DOMContentLoaded',function(){renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});});</script>
</body></html>`;
fs.mkdirSync('docs/verification', { recursive: true });
fs.writeFileSync('docs/verification/teacher-generator-gallery.html', html);
console.log('Wrote docs/verification/teacher-generator-gallery.html (' + SHOW.length + ' engines)');
