(() => {
  function addAutoUpdateButton(){
    if (document.getElementById('autoUpdateFloatingButton')) return;
    const btn = document.createElement('button');
    btn.id = 'autoUpdateFloatingButton';
    btn.textContent = 'עדכון מהיר';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'עדכון מהיר');
    btn.style.position = 'fixed';
    btn.style.left = '14px';
    btn.style.bottom = '92px';
    btn.style.zIndex = '9999';
    btn.style.border = '0';
    btn.style.borderRadius = '18px';
    btn.style.padding = '13px 16px';
    btn.style.fontWeight = '900';
    btn.style.background = 'linear-gradient(135deg,#102a43,#173f64)';
    btn.style.color = '#fff';
    btn.style.boxShadow = '0 14px 34px rgba(16,42,67,.22)';
    btn.onclick = () => { location.href = 'auto-update.html'; };
    document.body.appendChild(btn);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addAutoUpdateButton); else addAutoUpdateButton();

  const KEY = 'shiur_prati_v1';
  const h = location.hash || '';
  if (!h.startsWith('#quick-add?') && !h.startsWith('#quick-import?') && !h.startsWith('#bulk?')) return;

  const uid = prefix => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const now = () => new Date().toISOString();
  const decodeBase64Url = value => {
    const padded = value + '='.repeat((4 - value.length % 4) % 4);
    const binary = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  };
  const parseAmount = value => Number(String(value || '').replace(/[^0-9.]/g, '')) || 0;
  const parseDuration = value => {
    if (value === undefined || value === null || String(value).trim() === '') return 0;
    return Number(String(value).replace(/[^0-9.]/g, '')) || 0;
  };

  let token = '';
  let items = [];

  if (h.startsWith('#bulk?')) {
    const p = new URLSearchParams(h.slice('#bulk?'.length));
    token = p.get('t') || '';
    try {
      const text = decodeBase64Url(p.get('d') || '');
      items = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean).map(line => {
        const parts = line.split('|').map(x => x.trim());
        return { student: parts[0] || '', date: parts[1] || '', time: parts[2] || '', duration: parseDuration(parts[3]), amount: parseAmount(parts[4]) };
      });
    } catch {
      alert('קישור הייבוא הקצר לא תקין. לא נשמר דבר.');
      return;
    }
  } else if (h.startsWith('#quick-import?')) {
    const p = new URLSearchParams(h.slice('#quick-import?'.length));
    try {
      const payload = JSON.parse(decodeBase64Url(p.get('data') || ''));
      token = payload.token || '';
      items = Array.isArray(payload.items) ? payload.items : [];
    } catch {
      alert('קישור הייבוא לא תקין. לא נשמר דבר.');
      return;
    }
  } else {
    const p = new URLSearchParams(h.slice('#quick-add?'.length));
    token = p.get('token') || '';
    const students = p.getAll('student').map(x => (x || '').trim()).filter(Boolean);
    items = students.map(student => ({ student, date: p.get('date') || '', time: p.get('time') || '', amount: Number(p.get('amount') || 0), duration: parseDuration(p.get('duration')) }));
  }

  items = items.map(item => ({ student: (item.student || '').trim(), date: item.date || '', time: item.time || '', amount: Number(item.amount || 0), duration: parseDuration(item.duration) })).filter(item => item.student && item.date && item.amount > 0);
  if (!token || items.length === 0) { alert('לא נמצאו נתונים תקינים לייבוא. לא נשמר דבר.'); return; }

  let db;
  try { db = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { db = {}; }
  db.students = Array.isArray(db.students) ? db.students : [];
  db.lessons = Array.isArray(db.lessons) ? db.lessons : [];
  db.logs = Array.isArray(db.logs) ? db.logs : [];
  db.payments = Array.isArray(db.payments) ? db.payments : [];

  if (db.logs.some(x => x.action === 'quick_import_lessons' && x.token === token)) {
    alert('הייבוא הזה כבר בוצע בעבר. לא נוצרה כפילות.');
    history.replaceState(null, '', location.pathname);
    return;
  }

  let total = 0;
  let added = 0;
  let skipped = 0;
  for (const item of items) {
    let st = db.students.find(x => (x.fullName || '').trim() === item.student);
    if (!st) {
      st = { studentId: uid('student'), fullName: item.student, phone: '', grade: '', defaultLessonPrice: item.amount, status: 'פעיל', notes: '', createdAt: now(), updatedAt: now() };
      db.students.push(st);
    }
    const exists = db.lessons.some(l => l.studentId === st.studentId && l.lessonDate === item.date && String(l.lessonTime || '') === String(item.time || '') && Number(l.amountDue || 0) === Number(item.amount || 0) && l.lessonStatus === 'התקיים');
    if (exists) { skipped += 1; continue; }
    db.lessons.push({ lessonId: uid('lesson'), studentId: st.studentId, lessonDate: item.date, lessonTime: item.time, durationMinutes: item.duration, amountDue: item.amount, amountPaid: 0, amountUnpaid: item.amount, lessonStatus: 'התקיים', receiptStatus: 'לא הוצאה קבלה', receiptNumber: '', notes: '', createdAt: now(), updatedAt: now() });
    total += item.amount;
    added += 1;
  }

  db.logs.push({ id: uid('log'), time: now(), action: 'quick_import_lessons', token, count: added, skipped, total });
  localStorage.setItem(KEY, JSON.stringify(db));
  alert(`נשמרו ${added} שיעורים. דולגו כפילויות: ${skipped}. חוב נוסף: ${total} ₪.`);
  history.replaceState(null, '', location.pathname);
  location.reload();
})();
