// generator/teacher-mode.js
// Teacher Advanced Mode: an opt-in layer over the rendered exercise set that
// adds, per question, a teacher card (full pedagogy meta) and a control bar —
// regenerate, easier/harder, change question type, generate a follow-up, show/
// hide the solution & explanation & source, and one-click copy/export
// (question, question+solution, teacher card, HTML, PNG, add-to-worksheet).
// Everything teacher-only is marked .teacher-only + data-html2canvas-ignore and
// is hidden by the student print stylesheet.
//
// The pure builders (buildTeacherCardHTML, buildCopyPayload, htmlToText) are
// DOM-free so they can be unit-checked by the verifiers in Node.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const QT_CYCLE = ['open', 'mcq', 'tf', 'mistake'];
  const QT_LABEL = { open: 'שאלה פתוחה', mcq: 'רב־ברירה', tf: 'נכון / שגוי', mistake: 'מצא את הטעות' };
  const DIFF = ['basic', 'standard', 'challenge'];
  const DIFF_LABEL = { basic: 'בסיסית', standard: 'סטנדרטית', challenge: 'מאתגרת' };
  const FU_LABEL = {
    same_skill: 'אותה מיומנות', easier: 'קל יותר', harder: 'קשה יותר',
    same_misconception: 'אותה טעות נפוצה', different_representation: 'ייצוג אחר', visual_variant: 'גרסה חזותית'
  };

  // ── pure helpers (no DOM) ──
  function htmlToText(html) {
    if (!html) return '';
    return String(html)
      .replace(/<svg[\s\S]*?<\/svg>/gi, '[שרטוט]')
      .replace(/<table[\s\S]*?<\/table>/gi, '[טבלה]')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(div|p|li)>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').replace(/[ \t]*\n[ \t]*/g, '\n').trim();
  }

  function buildTeacherCardHTML(meta) {
    meta = meta || {};
    function row(label, val) { return val ? '<div class="tc-row"><span class="tc-k">' + label + '</span><span class="tc-v">' + val + '</span></div>' : ''; }
    const fu = (meta.followUpIdeas && meta.followUpIdeas.length) ? meta.followUpIdeas.join(' · ') : '';
    return '<div class="teacher-card teacher-only" data-html2canvas-ignore="true">'
      + '<div class="tc-title">כרטיס מורה</div>'
      + row('מקור', meta.sourceFile)
      + row('כיתה/תחום', (meta.grade ? 'כיתה ' + meta.grade : '') + (meta.domain ? ' · ' + meta.domain : ''))
      + row('מיומנות', meta.skill)
      + row('משפחת שאלה', meta.questionFamily + (meta.familyProvenance ? ' (' + meta.familyProvenance + ')' : ''))
      + row('מטרת למידה', meta.learningGoal)
      + row('מטרה למורה', meta.teacherPurpose)
      + row('טעות נפוצה', meta.misconception)
      + row('רעיונות להמשך', fu)
      + '</div>';
  }

  // kind ∈ question | question_solution | teacher_card | html | html_full
  function buildCopyPayload(ex, kind) {
    if (!ex) return '';
    const q = htmlToText(ex.questionHTML), a = htmlToText(ex.answerHTML);
    const m = ex.meta || {};
    switch (kind) {
      case 'question': return q;
      case 'question_solution': return q + '\n\n— פתרון —\n' + a;
      case 'teacher_card':
        return ['כרטיס מורה',
          m.sourceFile ? 'מקור: ' + m.sourceFile : '',
          m.skill ? 'מיומנות: ' + m.skill : '',
          m.questionFamily ? 'משפחת שאלה: ' + m.questionFamily : '',
          m.learningGoal ? 'מטרת למידה: ' + m.learningGoal : '',
          m.teacherPurpose ? 'מטרה למורה: ' + m.teacherPurpose : '',
          m.misconception ? 'טעות נפוצה: ' + m.misconception : '',
          (m.followUpIdeas && m.followUpIdeas.length) ? 'רעיונות להמשך: ' + m.followUpIdeas.join(' · ') : ''
        ].filter(Boolean).join('\n');
      case 'html': return ex.questionHTML || '';
      case 'html_full': return (ex.questionHTML || '') + '\n<div class="solution">' + (ex.answerHTML || '') + '</div>';
      default: return q;
    }
  }

  // expose pure API
  const Teacher = window.Teacher = {
    advanced: false,
    worksheet: [],
    buildTeacherCardHTML: buildTeacherCardHTML,
    buildCopyPayload: buildCopyPayload,
    htmlToText: htmlToText,
    MODES: (E.FOLLOW_UP_MODES || Object.keys(FU_LABEL))
  };

  // ── DOM-bound behaviour (guarded so the file is importable without a DOM) ──
  if (typeof document === 'undefined') return;

  function ctx() { return window.__exsetCtx || null; }
  function regen(id, isEngine, diff, qtype) {
    if (isEngine && typeof E.getEngineExercise === 'function') {
      const r = E.getEngineExercise(id, diff, qtype);
      if (r && !r.meta && typeof E.buildMeta === 'function') { try { r.meta = E.buildMeta(id, qtype, diff, r.questionFamily); } catch (e) {} }
      return r;
    }
    if (typeof makeExercise === 'function') return makeExercise(id, diff, qtype, false, E);
    return null;
  }

  function controlBar(i, ex) {
    const b = function (fn, txt, cls) { return '<button class="tc-btn ' + (cls || '') + '" onclick="Teacher.' + fn + '">' + txt + '</button>'; };
    const fuOpts = Teacher.MODES.map(function (mode) { return '<option value="' + mode + '">' + (FU_LABEL[mode] || mode) + '</option>'; }).join('');
    return '<div class="teacher-controls teacher-only" data-html2canvas-ignore="true">'
      + '<div class="tc-group">'
      + b('refresh(' + i + ')', '↻ רענן', 'tc-refresh')
      + b('easier(' + i + ')', '− קל יותר')
      + b('harder(' + i + ')', '+ קשה יותר')
      + b('cycleType(' + i + ')', '⇄ סוג שאלה')
      + b('toggleNumbers(' + i + ')', '# מספרים חדשים')
      + '</div>'
      + '<div class="tc-group">'
      + '<select class="tc-sel" id="fuMode' + i + '">' + fuOpts + '</select>'
      + b('followUp(' + i + ')', '➟ שאלת המשך', 'tc-follow')
      + b('toggleSolution(' + i + ')', '✓ פתרון')
      + b('toggleSource(' + i + ')', 'ⓘ מקור')
      + b('toggleGraphic(' + i + ')', '▣ שרטוט')
      + '</div>'
      + '<div class="tc-group tc-export">'
      + b('copy(' + i + ",'question')", '⧉ העתק שאלה')
      + b('copy(' + i + ",'question_solution')", '⧉ שאלה+פתרון')
      + b('copy(' + i + ",'teacher_card')", '⧉ כרטיס מורה')
      + b('copyImage(' + i + ')', '🖼 העתק כתמונה', 'tc-copyimg')
      + b('exportHTML(' + i + ')', '⤓ HTML')
      + b('exportPNG(' + i + ')', '⤓ PNG')
      + b('addToWorksheet(' + i + ')', '＋ לדף עבודה')
      + '</div>'
      + '</div>';
  }

  Teacher.decorateSet = function () {
    const c = ctx(); if (!c) return;
    document.body.classList.toggle('teacher-advanced', !!Teacher.advanced);
    c.exercises.forEach(function (ex, i) {
      const card = document.getElementById('exCard' + i);
      if (!card || card.querySelector('.teacher-controls')) return;
      const bar = document.createElement('div'); bar.innerHTML = controlBar(i, ex) + buildTeacherCardHTML(ex.meta || {});
      while (bar.firstChild) card.appendChild(bar.firstChild);
    });
  };

  Teacher.toggle = function () {
    Teacher.advanced = !Teacher.advanced;
    const btn = document.getElementById('btnTeacherMode');
    if (btn) btn.textContent = Teacher.advanced ? 'מצב מורה: פעיל' : 'מצב מורה';
    document.body.classList.toggle('teacher-advanced', Teacher.advanced);
    if (Teacher.advanced) Teacher.decorateSet();
  };

  function replaceCardBody(i, ex) {
    const c = ctx(); if (!c) return;
    c.exercises[i] = ex;
    const card = document.getElementById('exCard' + i); if (!card) return;
    const body = card.querySelector('.ex-body'); if (body) body.innerHTML = ex.questionHTML;
    // refresh teacher card meta
    const old = card.querySelector('.teacher-card'); if (old) old.remove();
    const ctrls = card.querySelector('.teacher-controls');
    if (ctrls) ctrls.insertAdjacentHTML('afterend', buildTeacherCardHTML(ex.meta || {}));
    if (typeof renderMathInElement === 'function') renderMathInElement(card, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
    if (typeof applyVisualMode === 'function') applyVisualMode();
  }

  function curType(i) { const c = ctx(); return (c && c.exercises[i] && c.exercises[i].qtype) || 'open'; }

  Teacher.refresh = function (i) { const c = ctx(); if (!c) return; const ex = regen(c.id, c.isEngine, c.diff, curType(i)); if (ex) replaceCardBody(i, ex); };
  Teacher.toggleNumbers = Teacher.refresh; // new numbers = same skill/type, fresh instance
  Teacher.easier = function (i) { const c = ctx(); if (!c) return; const d = DIFF[Math.max(0, DIFF.indexOf(c.diff) - 1)]; c.diff = d; const ex = regen(c.id, c.isEngine, d, curType(i)); if (ex) replaceCardBody(i, ex); };
  Teacher.harder = function (i) { const c = ctx(); if (!c) return; const d = DIFF[Math.min(DIFF.length - 1, (DIFF.indexOf(c.diff) < 0 ? 1 : DIFF.indexOf(c.diff)) + 1)]; c.diff = d; const ex = regen(c.id, c.isEngine, d, curType(i)); if (ex) replaceCardBody(i, ex); };
  Teacher.cycleType = function (i) { const c = ctx(); if (!c) return; const next = QT_CYCLE[(QT_CYCLE.indexOf(curType(i)) + 1) % QT_CYCLE.length]; const ex = regen(c.id, c.isEngine, c.diff, next); if (ex) { ex.qtype = ex.qtype || next; replaceCardBody(i, ex); } };

  Teacher.followUp = function (i) {
    const c = ctx(); if (!c || typeof E.generateFollowUpQuestion !== 'function') return;
    const sel = document.getElementById('fuMode' + i); const mode = (sel && sel.value) || 'same_skill';
    const base = c.exercises[i];
    const fu = E.generateFollowUpQuestion(c.id, base.meta || {}, mode, { avoidHTML: base.questionHTML });
    if (!fu) return;
    const card = document.getElementById('exCard' + i); if (!card) return;
    let host = card.querySelector('.follow-up-host'); if (!host) { host = document.createElement('div'); host.className = 'follow-up-host'; card.appendChild(host); }
    const block = document.createElement('div'); block.className = 'follow-up-block';
    block.innerHTML = '<div class="fu-label">שאלת המשך · ' + (FU_LABEL[mode] || mode) + '</div><div class="fu-body">' + fu.questionHTML + '</div><details class="fu-sol"><summary>פתרון</summary>' + fu.answerHTML + '</details>';
    host.appendChild(block);
    if (typeof renderMathInElement === 'function') renderMathInElement(block, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
    if (typeof applyVisualMode === 'function') applyVisualMode();
  };

  function toggleClass(i, cls, makeIfMissing) {
    const c = ctx(); if (!c) return; const card = document.getElementById('exCard' + i); if (!card) return;
    let el = card.querySelector('.' + cls);
    if (!el && makeIfMissing) { el = makeIfMissing(c.exercises[i]); if (el) card.appendChild(el); else return; }
    if (el) el.classList.toggle('show');
  }
  Teacher.toggleSolution = function (i) { toggleClass(i, 'inline-solution', function (ex) { const d = document.createElement('div'); d.className = 'inline-solution teacher-only'; d.setAttribute('data-html2canvas-ignore', 'true'); d.innerHTML = '<div class="is-title">פתרון</div>' + (ex.answerHTML || ''); if (typeof renderMathInElement === 'function') setTimeout(function () { renderMathInElement(d, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false }); }, 0); return d; }); };
  Teacher.toggleSource = function (i) { toggleClass(i, 'inline-source', function (ex) { const m = ex.meta || {}; const d = document.createElement('div'); d.className = 'inline-source teacher-only'; d.setAttribute('data-html2canvas-ignore', 'true'); d.innerHTML = 'מקור: ' + (m.sourceFile || '—') + ' · משפחה: ' + (m.questionFamily || '—'); return d; }); };
  Teacher.toggleGraphic = function (i) { const card = document.getElementById('exCard' + i); if (!card) return; const svg = card.querySelector('.ex-body svg, .ex-body table'); if (svg) svg.classList.toggle('hidden-graphic'); };

  function flash(msg) { let t = document.getElementById('tcToast'); if (!t) { t = document.createElement('div'); t.id = 'tcToast'; t.className = 'tc-toast'; document.body.appendChild(t); } t.textContent = msg; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 1400); }

  Teacher.copy = function (i, kind) {
    const c = ctx(); if (!c) return; const payload = buildCopyPayload(c.exercises[i], kind);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(payload).then(function () { flash('הועתק'); }, function () { flash('העתקה נכשלה'); });
    else { try { const ta = document.createElement('textarea'); ta.value = payload; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); flash('הועתק'); } catch (e) { flash('העתקה נכשלה'); } }
  };
  function download(name, content, type) { const blob = new Blob([content], { type: type || 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000); }
  Teacher.exportHTML = function (i) { const c = ctx(); if (!c) return; download('targil-' + (i + 1) + '.html', buildCopyPayload(c.exercises[i], 'html_full'), 'text/html;charset=utf-8'); flash('יוצא HTML'); };
  Teacher.exportPNG = function (i) {
    const card = document.getElementById('exCard' + i); if (!card || typeof html2canvas !== 'function') { flash('PNG לא זמין'); return; }
    html2canvas(card, { backgroundColor: '#ffffff', scale: Math.max(2, window.devicePixelRatio || 1) }).then(function (canvas) { canvas.toBlob(function (blob) { if (blob) download('targil-matematika-' + (i + 1) + '.png', blob, 'image/png'); flash('יוצא PNG'); }); });
  };
  // Copy the WHOLE question (text + diagram/graph) as an image to the clipboard,
  // so a teacher can paste it straight into Canva / Word / Docs. Teacher controls
  // are excluded (data-html2canvas-ignore). Falls back to a PNG download where
  // image clipboard is unsupported.
  Teacher.copyImage = function (i) {
    const card = document.getElementById('exCard' + i);
    if (!card || typeof html2canvas !== 'function') { flash('העתקת תמונה לא זמינה'); return; }
    flash('מכין תמונה…');
    html2canvas(card, { backgroundColor: '#ffffff', scale: Math.max(2, window.devicePixelRatio || 1) }).then(function (canvas) {
      canvas.toBlob(function (blob) {
        if (!blob) { flash('העתקה נכשלה'); return; }
        if (navigator.clipboard && typeof navigator.clipboard.write === 'function' && typeof window.ClipboardItem === 'function') {
          navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
            .then(function () { flash('התמונה הועתקה — הדביקו ב-Canva / Word'); },
                  function () { download('targil-matematika-' + (i + 1) + '.png', blob, 'image/png'); flash('הדפדפן חסם העתקת תמונה — הורד PNG במקום'); });
        } else { download('targil-matematika-' + (i + 1) + '.png', blob, 'image/png'); flash('הורד PNG (העתקת תמונה אינה נתמכת בדפדפן)'); }
      }, 'image/png');
    });
  };
  Teacher.addToWorksheet = function (i) { const c = ctx(); if (!c) return; Teacher.worksheet.push(c.exercises[i]); flash('נוסף לדף עבודה (' + Teacher.worksheet.length + ')'); };
  Teacher.exportWorksheet = function () {
    if (!Teacher.worksheet.length) { flash('דף העבודה ריק'); return; }
    const body = Teacher.worksheet.map(function (ex, i) { return '<div class="qcard"><div class="ex-num">תרגיל ' + (i + 1) + '</div>' + ex.questionHTML + '</div>'; }).join('');
    download('worksheet.html', '<!doctype html><html dir="rtl" lang="he"><meta charset="utf-8"><title>דף עבודה</title><body>' + body + '</body></html>', 'text/html;charset=utf-8');
    flash('יוצא דף עבודה (' + Teacher.worksheet.length + ')');
  };
})();
