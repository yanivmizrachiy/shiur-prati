(() => {
  const KEY = 'shiur_prati_v1';
  const h = location.hash || '';
  if (!h.startsWith('#quick-add?') && !h.startsWith('#quick-import?')) return;

  const uid = prefix => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const now = () => new Date().toISOString();
  const decodeBase64Url = value => {
    const padded = value + '='.repeat((4 - value.length % 4) % 4);
    const binary = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  };

  let token = '';
  let items = [];

  if (h.startsWith('#quick-import?')) {
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
    items = students.map(student => ({
      student,
      date: p.get('date') || '',
      time: p.get('time') || '',
      amount: Number(p.get('amount') || 0),
      duration: Number(p.get('duration') || 60)
    }));
  }

  items = items.map(item => ({
    student: (item.student || '').trim(),
    date: item.date || '',
    time: item.time || '',
    amount: Number(item.amount || 0),
    duration: Number(item.duration || 60)
  })).filter(item => item.student && item.date && item.amount > 0);

  if (!token || items.length === 0) {
    alert('לא נמצאו נתונים תקינים לייבוא. לא נשמר דבר.');
    return;
  }

  let db;
  try { db = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { db = {}; }
  db.students = Array.isArray(db.students) ? db.students : [];
  db.lessons = Array.isArray(db.lessons) ? db.lessons : [];
  db.logs = Array.isArray(db.logs) ? db.logs : [];

  if (db.logs.some(x => x.action === 'quick_import_lessons' && x.token === token)) {
    alert('הייבוא הזה כבר בוצע בעבר. לא נוצרה כפילות.');
    history.replaceState(null, '', location.pathname);
    return;
  }

  let total = 0;
  for (const item of items) {
    let st = db.students.find(x => (x.fullName || '').trim() === item.student);
    if (!st) {
      st = { studentId: uid('student'), fullName: item.student, phone: '', grade: '', defaultLessonPrice: item.amount, status: 'פעיל', notes: '', createdAt: now(), updatedAt: now() };
      db.students.push(st);
    }
    db.lessons.push({ lessonId: uid('lesson'), studentId: st.studentId, lessonDate: item.date, lessonTime: item.time, topic: 'שיעור פרטי', durationMinutes: item.duration, amountDue: item.amount, amountPaid: 0, amountUnpaid: item.amount, lessonStatus: 'התקיים', receiptStatus: 'לא הוצאה קבלה', receiptNumber: '', notes: 'הוזן אוטומטית מקישור מהיר', createdAt: now(), updatedAt: now() });
    total += item.amount;
  }

  db.logs.push({ id: uid('log'), time: now(), action: 'quick_import_lessons', token, count: items.length, total });
  localStorage.setItem(KEY, JSON.stringify(db));
  alert(`נשמרו ${items.length} שיעורים. חוב כולל שנוסף: ${total} ₪.`);
  history.replaceState(null, '', location.pathname);
  location.reload();
})();
