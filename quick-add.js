(() => {
  const KEY = 'shiur_prati_v1';
  const h = location.hash || '';
  if (!h.startsWith('#quick-add?')) return;
  const p = new URLSearchParams(h.slice('#quick-add?'.length));
  const token = p.get('token') || '';
  const students = p.getAll('student').map(x => (x || '').trim()).filter(Boolean);
  const lessonDate = p.get('date') || '';
  const lessonTime = p.get('time') || '';
  const amountDue = Number(p.get('amount') || 0);
  const durationMinutes = Number(p.get('duration') || 60);
  if (!token || students.length === 0 || !lessonDate || !amountDue) return;
  let db;
  try { db = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { db = {}; }
  db.students = Array.isArray(db.students) ? db.students : [];
  db.lessons = Array.isArray(db.lessons) ? db.lessons : [];
  db.logs = Array.isArray(db.logs) ? db.logs : [];
  if (db.logs.some(x => x.action === 'quick_add_lesson' && x.token === token)) {
    history.replaceState(null, '', location.pathname);
    return;
  }
  const uid = prefix => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const now = () => new Date().toISOString();
  for (const fullName of students) {
    let st = db.students.find(x => (x.fullName || '').trim() === fullName);
    if (!st) {
      st = { studentId: uid('student'), fullName, phone: '', grade: '', defaultLessonPrice: amountDue, status: 'פעיל', notes: '', createdAt: now(), updatedAt: now() };
      db.students.push(st);
    }
    db.lessons.push({ lessonId: uid('lesson'), studentId: st.studentId, lessonDate, lessonTime, topic: 'שיעור פרטי', durationMinutes, amountDue, amountPaid: 0, amountUnpaid: amountDue, lessonStatus: 'התקיים', receiptStatus: 'לא הוצאה קבלה', receiptNumber: '', notes: 'הוזן אוטומטית מקישור מהיר', createdAt: now(), updatedAt: now() });
  }
  db.logs.push({ id: uid('log'), time: now(), action: 'quick_add_lesson', token, count: students.length });
  localStorage.setItem(KEY, JSON.stringify(db));
  history.replaceState(null, '', location.pathname);
  location.reload();
})();
