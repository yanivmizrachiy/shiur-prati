const KEY = 'shiur_prati_v1';
let db = load();
let currentStudent = null;
let lessonFilter = 'all';
let installPrompt = null;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return {students:[], lessons:[], logs:[], payments:[]};
    const data = JSON.parse(raw);
    return {
      students: Array.isArray(data.students) ? data.students : [],
      lessons: Array.isArray(data.lessons) ? data.lessons : [],
      logs: Array.isArray(data.logs) ? data.logs : [],
      payments: Array.isArray(data.payments) ? data.payments : []
    };
  }catch{
    return {students:[], lessons:[], logs:[], payments:[]};
  }
}
function save(action){
  db.logs.push({id:id('log'), time:new Date().toISOString(), action});
  localStorage.setItem(KEY, JSON.stringify(db));
}
function id(prefix){ return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`; }
function esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'); }
function money(value){ return `${Number(value || 0).toLocaleString('he-IL')} ₪`; }
function dateHe(value){
  if(!value) return '';
  const d = new Date(value + 'T00:00:00');
  return isNaN(d) ? value : d.toLocaleDateString('he-IL');
}
function toast(text){
  const el = $('#toast');
  if(!el) return;
  el.textContent = text;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}
function go(idName){
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === idName));
  $$('.nav').forEach(b => b.classList.toggle('active', b.dataset.go === idName));
  render();
  scrollTo({top:0, behavior:'smooth'});
}
function student(studentId){ return db.students.find(s => s.studentId === studentId); }
function calc(lesson){
  const due = Number(lesson.amountDue || 0);
  const paid = Number(lesson.amountPaid || 0);
  const unpaid = Math.max(due - paid, 0);
  return {due, paid, unpaid};
}
function visual(lesson){
  const c = calc(lesson);
  if(lesson.lessonStatus === 'נקבע ועדיין לא התקיים') return {cls:'orange', txt:'נקבע'};
  if(lesson.lessonStatus === 'התקיים' && c.unpaid === 0) return {cls:'green', txt:'שולם'};
  if(lesson.lessonStatus === 'התקיים' && c.unpaid > 0) return {cls:'red', txt:`חוב: ${money(c.unpaid)}`};
  return {cls:'orange', txt: lesson.lessonStatus || 'לא סומן'};
}
function empty(text){ return `<div class="empty">${esc(text)}</div>`; }
function stat(title, value){ return `<div class="stat"><b>${value}</b><span>${esc(title)}</span></div>`; }
function month(){ return new Date().toISOString().slice(0,7); }
function lessonsMonth(m = month()){ return db.lessons.filter(l => String(l.lessonDate || '').slice(0,7) === m); }

function renderStats(){
  const lm = lessonsMonth();
  const paid = lm.reduce((sum,l) => sum + calc(l).paid, 0);
  const debt = db.lessons.reduce((sum,l) => sum + calc(l).unpaid, 0);
  const receiptMissing = lm.filter(l => l.lessonStatus === 'התקיים' && calc(l).paid > 0 && l.receiptStatus !== 'הוצאה קבלה').length;
  $('#stats').innerHTML = [
    stat('תלמידים פעילים', db.students.filter(s => s.status !== 'לא פעיל').length),
    stat('שיעורים החודש', lm.length),
    stat('שולם החודש', money(paid)),
    stat('חייבים לי', money(debt)),
    stat('ללא קבלה', receiptMissing)
  ].join('');
}
function studentItem(s){
  const lessons = db.lessons.filter(l => l.studentId === s.studentId);
  const debt = lessons.reduce((sum,l) => sum + calc(l).unpaid, 0);
  const grade = s.grade ? ` · ${esc(s.grade)}` : '';
  return `<div class="item"><div class="head"><div><h3>${esc(s.fullName)}</h3><div class="meta">${esc(s.status || 'פעיל')}${grade}</div></div><button class="mini" data-open-student="${s.studentId}">פתח</button></div><div class="meta">שיעורים: ${lessons.length} · חוב: ${money(debt)}</div></div>`;
}
function lessonItem(l){
  const s = student(l.studentId);
  const c = calc(l);
  const v = visual(l);
  const duration = Number(l.durationMinutes || 0) ? ` · ${Number(l.durationMinutes)} דקות` : '';
  return `<div class="item"><h3>${esc(s?.fullName || 'תלמיד לא נמצא')}</h3><div class="meta">${dateHe(l.lessonDate)} ${l.lessonTime ? '· ' + esc(l.lessonTime) : ''}${duration}</div><div class="meta">סכום: ${money(c.due)} · שולם: ${money(c.paid)} · קבלה: ${esc(l.receiptStatus || 'לא הוצאה קבלה')}</div><span class="status ${v.cls}">${v.txt}</span><div class="item-actions"><button class="mini" data-edit-lesson="${l.lessonId}">ערוך</button><button class="mini" data-paid="${l.lessonId}">סמן שולם</button><button class="mini" data-receipt="${l.lessonId}">הוצאה קבלה</button><button class="mini" data-cancel="${l.lessonId}">בטל</button></div></div>`;
}
function renderStudents(){
  const term = ($('#search')?.value || '').trim();
  const list = db.students.filter(s => !term || [s.fullName, s.phone, s.grade].some(x => String(x || '').includes(term)));
  $('#studentsList').innerHTML = list.length ? list.map(studentItem).join('') : empty('אין תלמידים.');
}
function renderLessons(){
  let list = [...db.lessons].sort((a,b) => String(b.lessonDate || '').localeCompare(String(a.lessonDate || '')) || String(b.lessonTime || '').localeCompare(String(a.lessonTime || '')));
  if(lessonFilter !== 'all') list = list.filter(l => visual(l).cls === lessonFilter);
  const html = list.length ? list.map(lessonItem).join('') : empty('אין שיעורים.');
  $('#lessonsList').innerHTML = html;
  $('#homeLessons').innerHTML = list.slice(0,4).length ? list.slice(0,4).map(lessonItem).join('') : empty('אין שיעורים.');
}
function renderStudentView(){
  if(!currentStudent) return;
  const s = student(currentStudent);
  if(!s){ $('#studentViewContent').innerHTML = empty('התלמיד לא נמצא.'); return; }
  const lessons = db.lessons.filter(l => l.studentId === s.studentId);
  const debt = lessons.reduce((sum,l) => sum + calc(l).unpaid, 0);
  $('#studentViewContent').innerHTML = `<div class="card"><h2>${esc(s.fullName)}</h2><p>כיתה: ${esc(s.grade || '')}</p><p>טלפון: ${esc(s.phone || '')}</p><p>מחיר קבוע: ${s.defaultLessonPrice ? money(s.defaultLessonPrice) : ''}</p><p>חוב: ${money(debt)}</p><button class="soft full" data-edit-student="${s.studentId}">ערוך תלמיד</button><button class="primary full" data-new-lesson="${s.studentId}">הוסף שיעור</button></div><div class="card"><h3>שיעורים</h3>${lessons.length ? lessons.map(lessonItem).join('') : empty('אין שיעורים לתלמיד הזה.')}</div>`;
}
function fillSelect(){
  const sel = $('#lessonStudent');
  if(!sel) return;
  if(!db.students.length){
    sel.innerHTML = '<option value="">אין תלמידים</option>';
    sel.disabled = true;
  }else{
    sel.disabled = false;
    sel.innerHTML = '<option value="">בחר תלמיד</option>' + db.students.filter(s => s.status !== 'לא פעיל').map(s => `<option value="${s.studentId}">${esc(s.fullName)}</option>`).join('');
  }
}
function renderDebts(){ $('#debtsList').innerHTML = db.lessons.filter(l => l.lessonStatus === 'התקיים' && calc(l).unpaid > 0).map(lessonItem).join('') || empty('אין חובות.'); }
function renderReceipts(){ $('#receiptsList').innerHTML = db.lessons.filter(l => l.lessonStatus === 'התקיים' && calc(l).paid > 0 && l.receiptStatus !== 'הוצאה קבלה').map(lessonItem).join('') || empty('אין קבלות חסרות.'); }
function renderMonth(){
  if(!$('#monthPick').value) $('#monthPick').value = month();
  const ls = lessonsMonth($('#monthPick').value);
  const paid = ls.reduce((sum,l) => sum + calc(l).paid, 0);
  const debt = ls.reduce((sum,l) => sum + calc(l).unpaid, 0);
  $('#monthOut').innerHTML = `<div class="stats">${stat('שיעורים',ls.length)}${stat('שולם',money(paid))}${stat('חוב',money(debt))}</div>${ls.length ? ls.map(lessonItem).join('') : empty('אין שיעורים בחודש הזה.')}`;
}
function render(){ renderStats(); renderStudents(); renderLessons(); renderStudentView(); fillSelect(); renderDebts(); renderReceipts(); renderMonth(); }
function clearStudentForm(){ $('#studentFormTitle').textContent = 'הוסף תלמיד'; $('#studentFormEl').reset(); $('#studentId').value = ''; }
function clearLessonForm(){ $('#lessonFormTitle').textContent = 'הוסף שיעור'; $('#lessonFormEl').reset(); $('#lessonId').value = ''; $('#amountPaid').value = 0; fillSelect(); }

document.addEventListener('click', e => {
  const goTarget = e.target.closest('[data-go]')?.dataset.go;
  if(goTarget){ if(goTarget === 'studentForm') clearStudentForm(); if(goTarget === 'lessonForm') clearLessonForm(); go(goTarget); return; }
  const openStudent = e.target.closest('[data-open-student]')?.dataset.openStudent;
  if(openStudent){ currentStudent = openStudent; go('studentView'); return; }
  const editStudent = e.target.closest('[data-edit-student]')?.dataset.editStudent;
  if(editStudent){
    const s = student(editStudent); if(!s) return;
    $('#studentFormTitle').textContent = 'ערוך תלמיד'; $('#studentId').value = s.studentId;
    $('#studentName').value = s.fullName || ''; $('#studentPhone').value = s.phone || ''; $('#studentGrade').value = s.grade || ''; $('#studentPrice').value = s.defaultLessonPrice || ''; $('#studentStatus').value = s.status || 'פעיל'; $('#studentNotes').value = s.notes || '';
    go('studentForm'); return;
  }
  const newLesson = e.target.closest('[data-new-lesson]')?.dataset.newLesson;
  if(newLesson){ clearLessonForm(); $('#lessonStudent').value = newLesson; const s = student(newLesson); if(s?.defaultLessonPrice) $('#amountDue').value = s.defaultLessonPrice; go('lessonForm'); return; }
  const editLesson = e.target.closest('[data-edit-lesson]')?.dataset.editLesson;
  if(editLesson){
    const l = db.lessons.find(x => x.lessonId === editLesson); if(!l) return;
    clearLessonForm(); $('#lessonFormTitle').textContent = 'ערוך שיעור'; $('#lessonId').value = l.lessonId; $('#lessonStudent').value = l.studentId; $('#lessonDate').value = l.lessonDate || ''; $('#lessonTime').value = l.lessonTime || ''; $('#duration').value = l.durationMinutes || ''; $('#amountDue').value = l.amountDue || 0; $('#amountPaid').value = l.amountPaid || 0; $('#lessonStatus').value = l.lessonStatus || 'נקבע ועדיין לא התקיים'; $('#receiptStatus').value = l.receiptStatus || 'לא הוצאה קבלה'; $('#receiptNumber').value = l.receiptNumber || ''; $('#lessonNotes').value = l.notes || '';
    go('lessonForm'); return;
  }
  const paid = e.target.closest('[data-paid]')?.dataset.paid;
  if(paid){ const l = db.lessons.find(x => x.lessonId === paid); if(l){ l.lessonStatus = 'התקיים'; l.amountPaid = Number(l.amountDue || 0); l.amountUnpaid = 0; l.updatedAt = new Date().toISOString(); save('mark_paid'); toast('סומן שולם'); render(); } return; }
  const receipt = e.target.closest('[data-receipt]')?.dataset.receipt;
  if(receipt){ const l = db.lessons.find(x => x.lessonId === receipt); if(l){ l.receiptStatus = 'הוצאה קבלה'; l.updatedAt = new Date().toISOString(); save('mark_receipt'); toast('סומנה קבלה'); render(); } return; }
  const cancel = e.target.closest('[data-cancel]')?.dataset.cancel;
  if(cancel && confirm('לבטל את השיעור?')){ const l = db.lessons.find(x => x.lessonId === cancel); if(l){ l.lessonStatus = 'בוטל'; save('cancel_lesson'); toast('בוטל'); render(); } }
  const filter = e.target.closest('[data-filter]')?.dataset.filter;
  if(filter){ lessonFilter = filter; $$('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === filter)); renderLessons(); }
});

$('#search').addEventListener('input', renderStudents);
$('#monthPick').addEventListener('input', renderMonth);
$('#studentFormEl').addEventListener('submit', e => {
  e.preventDefault();
  const existing = db.students.find(s => s.studentId === $('#studentId').value);
  const data = {studentId: existing?.studentId || id('student'), fullName: $('#studentName').value.trim(), phone: $('#studentPhone').value.trim(), grade: $('#studentGrade').value.trim(), defaultLessonPrice: Number($('#studentPrice').value || 0), status: $('#studentStatus').value, notes: $('#studentNotes').value.trim(), createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString()};
  if(!data.fullName){ toast('חובה להזין שם'); return; }
  if(existing) Object.assign(existing, data); else db.students.push(data);
  save(existing ? 'update_student' : 'create_student'); currentStudent = data.studentId; toast('נשמר'); go('studentView');
});
$('#lessonFormEl').addEventListener('submit', e => {
  e.preventDefault();
  if(!$('#lessonStudent').value){ toast('בחר תלמיד'); return; }
  const due = Number($('#amountDue').value || 0), paid = Number($('#amountPaid').value || 0);
  const data = {lessonId: $('#lessonId').value || id('lesson'), studentId: $('#lessonStudent').value, lessonDate: $('#lessonDate').value, lessonTime: $('#lessonTime').value, durationMinutes: Number($('#duration').value || 0), amountDue: due, amountPaid: paid, amountUnpaid: Math.max(due - paid, 0), lessonStatus: $('#lessonStatus').value, receiptStatus: $('#receiptStatus').value, receiptNumber: $('#receiptNumber').value.trim(), notes: $('#lessonNotes').value.trim(), updatedAt: new Date().toISOString()};
  if(!data.lessonDate){ toast('בחר תאריך'); return; }
  const existing = db.lessons.find(l => l.lessonId === data.lessonId);
  data.createdAt = existing?.createdAt || new Date().toISOString();
  if(existing) Object.assign(existing, data); else db.lessons.push(data);
  save(existing ? 'update_lesson' : 'create_lesson'); toast('נשמר'); go('lessons');
});
function download(name, content, type){ const b = new Blob(['\ufeff' + content], {type}); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = name; a.click(); URL.revokeObjectURL(u); }
function csv(rows){ return rows.map(r => r.map(v => `"${String(v ?? '').replaceAll('"','""')}"`).join(',')).join('\n'); }
$('#exportJson').onclick = () => download(`shiur-prati-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(db,null,2), 'application/json');
$('#exportStudents').onclick = () => download('students.csv', csv([['studentId','fullName','phone','grade','defaultLessonPrice','status','notes'], ...db.students.map(s => [s.studentId,s.fullName,s.phone,s.grade,s.defaultLessonPrice,s.status,s.notes])]), 'text/csv;charset=utf-8');
$('#exportLessons').onclick = () => download('lessons.csv', csv([['lessonId','studentId','lessonDate','lessonTime','durationMinutes','amountDue','amountPaid','amountUnpaid','lessonStatus','receiptStatus','receiptNumber','notes'], ...db.lessons.map(l => [l.lessonId,l.studentId,l.lessonDate,l.lessonTime,l.durationMinutes,l.amountDue,l.amountPaid,calc(l).unpaid,l.lessonStatus,l.receiptStatus,l.receiptNumber,l.notes])]), 'text/csv;charset=utf-8');
$('#importJson').addEventListener('change', async e => { const f = e.target.files[0]; if(!f) return; try{ const d = JSON.parse(await f.text()); if(!Array.isArray(d.students) || !Array.isArray(d.lessons)) throw 0; db = {students:d.students, lessons:d.lessons, logs:Array.isArray(d.logs)?d.logs:[], payments:Array.isArray(d.payments)?d.payments:[]}; save('import_json'); toast('הייבוא נשמר'); go('home'); }catch{ toast('הייבוא נכשל'); } });
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; $('#installBtn')?.classList.remove('hidden'); });
$('#installBtn')?.addEventListener('click', async () => { if(!installPrompt) return; installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; $('#installBtn')?.classList.add('hidden'); });
if('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
