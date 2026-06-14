// generator/engine/source-fit-dedicated.js
// Dedicated source-backed engines that REPLACE the generic-renderer fallback for
// eight topics (no longer "fallback"): U7-05 pie chart, U7-06 misleading graph,
// U7-07 frequency table, U7-08 mean/median/range, G8-06 circle parts,
// G8-08 isosceles triangle, N7-08 number-line comparison, N7-09 opposite/abs.
// Each supports open/mcq/tf/mistake × basic/standard/challenge, balanced TF,
// smart MCQ, mistake-with-correction, and a source visual where required.
// Loaded after the other source-fit files, before pedagogy-attach (so meta wraps).
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const L = ['א', 'ב', 'ג', 'ד'];
  const T = (E.themes && E.themes.geometry) || { fill: '#f1f5f9', stroke: '#334155', helper: '#94a3b8', given: '#1d4ed8', unknown: '#dc2626', label: '#0f172a' };
  function pick(a) { return E.pick ? E.pick(a) : a[Math.floor(Math.random() * a.length)]; }
  function shuf(a) { return E.shuffle ? E.shuffle(a) : a.slice().sort(() => Math.random() - 0.5); }
  function rnd(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  function qt(qtype) { return qtype === 'mixed' ? pick(['open', 'mcq', 'tf', 'mistake']) : (qtype || 'open'); }
  function ch(items) {
    const seen = {}, uniq = [];
    for (const x of items) { if (!seen[x.text]) { seen[x.text] = 1; uniq.push(x); } }
    const c = uniq.filter(x => x.correct), w = uniq.filter(x => !x.correct);
    const set = (c.length ? [c[0]] : []).concat(w).slice(0, 4);
    return shuf(set).map((x, i) => ({ label: L[i], text: x.text, correct: !!x.correct }));
  }
  function topicReg(g, d, id, label) { if (typeof TOPICS === 'undefined' || !TOPICS[g] || !TOPICS[g][d]) return; if (!TOPICS[g][d].some(t => t[0] === id)) TOPICS[g][d].push([id, label, 1]); }

  // ── visuals ──
  function pieSvg(cats, pcts, hideIdx) {
    const W = 300, H = 200, cx = 104, cy = 92, R = 64;
    const COLS = ['#1d4ed8', '#94a3b8', '#0ea5e9', '#64748b', '#93c5fd'];
    let ang = -90, sectors = '', labels = '';
    pcts.forEach((p, i) => {
      const a0 = ang * Math.PI / 180, sweep = p * 3.6, a1 = (ang + sweep) * Math.PI / 180;
      const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      const large = sweep > 180 ? 1 : 0, hidden = hideIdx === i;
      sectors += `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${hidden ? '#fff' : COLS[i % COLS.length]}" fill-opacity="0.85" stroke="#fff" stroke-width="2"/>`;
      const mid = (ang + sweep / 2) * Math.PI / 180, lx = cx + (R + 14) * Math.cos(mid), ly = cy + (R + 14) * Math.sin(mid);
      labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="${hidden ? T.unknown : T.label}" font-size="10.5" font-weight="800" text-anchor="middle" dominant-baseline="middle">${hidden ? '?' : p + '%'}</text>`;
      ang += sweep;
    });
    let legend = '';
    cats.forEach((c, i) => { const ly = 28 + i * 20; legend += `<rect x="${W - 22}" y="${ly - 9}" width="10" height="10" rx="2" fill="${COLS[i % COLS.length]}" fill-opacity="0.85"/><text x="${W - 26}" y="${ly}" fill="${T.label}" font-size="10" text-anchor="end">${c}</text>`; });
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${T.stroke}" stroke-width="1.4"/>${sectors}${labels}${legend}</svg>`;
  }
  function misleadingBarSvg(labels, values, yStart, title) {
    const W = 290, H = 200, padL = 34, padB = 40, padT = 18, padR = 12;
    const maxV = Math.max.apply(null, values), top = maxV + Math.max(1, Math.round((maxV - yStart) * 0.3));
    const plotW = W - padL - padR, plotH = H - padT - padB;
    function Yv(v) { return padT + plotH * (1 - (v - yStart) / (top - yStart)); }
    const step = Math.max(1, Math.round((top - yStart) / 4));
    let grid = '';
    for (let v = yStart; v <= top; v += step) grid += `<line x1="${padL}" y1="${Yv(v)}" x2="${W - padR}" y2="${Yv(v)}" stroke="${v === yStart ? '#334155' : '#e2e8f0'}" stroke-width="${v === yStart ? 1.8 : 1}"/><text x="${padL - 6}" y="${Yv(v) + 3}" fill="#64748b" font-size="9" text-anchor="end">${v}</text>`;
    const by = Yv(yStart);
    const brk = yStart > 0 ? `<polyline points="${padL - 3},${by + 6} ${padL + 3},${by + 9} ${padL - 3},${by + 12} ${padL + 3},${by + 15}" fill="none" stroke="#334155" stroke-width="1.4"/>` : '';
    const slot = plotW / values.length, bw = Math.min(42, slot * 0.6);
    let bars = '';
    values.forEach((v, i) => { const cx = W - padR - slot * i - slot / 2; bars += `<rect x="${cx - bw / 2}" y="${Yv(v)}" width="${bw}" height="${by - Yv(v)}" rx="2" fill="${T.given}" fill-opacity="0.82" stroke="${T.stroke}" stroke-width="1"/><text x="${cx}" y="${Yv(v) - 5}" fill="${T.label}" font-size="10" font-weight="800" text-anchor="middle">${v}</text><text x="${cx}" y="${H - padB + 14}" fill="${T.label}" font-size="9.5" font-weight="700" text-anchor="middle">${labels[i]}</text>`; });
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${grid}${brk}${bars}<text x="${W / 2}" y="${H - 4}" fill="#64748b" font-size="9.5" font-weight="700" text-anchor="middle">${title}</text></svg>`;
  }
  function isoTriSvg(apex, base) {
    const W = 250, H = 175, Ax = 125, Ay = 30, Bx = 52, By = 142, Cx = 198, Cy = 142;
    function lab(x, y, t, c) { return `<text x="${x}" y="${y}" fill="${c}" font-size="13" font-weight="800" text-anchor="middle">${t}</text>`; }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.2" stroke-linejoin="round"/><path d="M ${Bx + 16},${By - 4} A 18 18 0 0 1 ${Bx + 22},${By - 14}" fill="none" stroke="${T.given}" stroke-width="1.6"/><path d="M ${Cx - 16},${By - 4} A 18 18 0 0 0 ${Cx - 22},${By - 14}" fill="none" stroke="${T.given}" stroke-width="1.6"/>${apex != null ? lab(Ax, Ay + 24, apex + '°', T.unknown) : ''}${base != null ? lab(Bx + 32, By - 9, base + '°', T.given) + lab(Cx - 32, By - 9, base + '°', T.given) : ''}</svg>`;
  }

  function render(qtype, q, a, svg, cs, isTrue, family) {
    let r;
    if (qtype === 'mcq') r = E.questionTypes.mcq({ question: q, answer: a, svg: svg, choices: cs });
    else if (qtype === 'tf') r = E.questionTypes.tf({ question: q, answer: a, svg: svg, isTrue: isTrue });
    else if (qtype === 'mistake') r = E.questionTypes.mistake({ question: q, answer: a, svg: svg });
    else r = E.questionTypes.open({ question: q, answer: a, svg: svg });
    if (r && family) r.questionFamily = family; // per-generation provenance (short code; canonicalized in asExercise)
    return r;
  }

  // ── engines (canonical answer set first; qtypes override q/cs/isTrue, and a for tf/mistake) ──
  const PIE_SETS = [
    { cats: ['כדורגל', 'שחייה', 'ריקוד', 'אחר'], pcts: [50, 25, 15, 10], thing: 'החוג המועדף' },
    { cats: ['אוטובוס', 'הליכה', 'אופניים', 'רכב'], pcts: [40, 30, 20, 10], thing: 'דרך ההגעה' },
    { cats: ['מדע', 'עיון', 'שירה'], pcts: [50, 30, 20], thing: 'סוג הספר' },
    { cats: ['חתול', 'כלב', 'דג', 'תוכי'], pcts: [45, 30, 15, 10], thing: 'חיית המחמד' }
  ];
  function genU705(diff, qtype) {
    qtype = qt(qtype);
    const s = pick(PIE_SETS), idx = rnd(0, s.cats.length - 1), pct = s.pcts[idx], ang = pct * 3.6;
    const sub = diff === 'basic' ? 'angle' : diff === 'challenge' ? pick(['missing', 'largest']) : pick(['angle', 'largest']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    const svg = pieSvg(s.cats, s.pcts, sub === 'missing' ? idx : -1);
    let q, a, cs, isTrue = tfTrue;
    if (sub === 'missing') {
      const others = s.pcts.filter((v, i) => i !== idx);
      a = `סכום כל הגזרות בעוגה הוא 100%. ${others.join('+')}=${100 - pct}, ולכן החסר הוא ${pct}%. הזווית המרכזית: ${pct}%×360°=${ang}°.`;
      q = `בתרשים העוגה של ${s.thing} חסר האחוז של "${s.cats[idx]}". מצאו אותו וחשבו את הזווית המרכזית.`;
      if (qtype === 'tf') { q = `בתרשים העוגה חסר האחוז של "${s.cats[idx]}". הוא ${tfTrue ? pct : pct + 5}%.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `מהו האחוז החסר של "${s.cats[idx]}" בתרשים העוגה?`; cs = ch([{ text: pct + '%', correct: true }, { text: (pct + 5) + '%', correct: false }, { text: (100 - pct) + '%', correct: false }, { text: Math.abs(pct - 5) + '%', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד טען שאי אפשר לדעת את האחוז החסר של "${s.cats[idx]}".`; a = 'הטעות: סכום כל הגזרות בעוגה הוא 100%. ' + a; }
    } else if (sub === 'largest') {
      const mx = Math.max.apply(null, s.pcts), big = s.cats[s.pcts.indexOf(mx)];
      a = `הגזרה הגדולה ביותר היא "${big}" עם ${mx}%. הזווית המרכזית שלה: ${mx}%×360°=${mx * 3.6}°.`;
      q = `לאיזו קטגוריה הזווית המרכזית הגדולה ביותר בתרשים? חשבו אותה.`;
      if (qtype === 'tf') { q = `הגזרה הגדולה ביותר בתרשים היא "${tfTrue ? big : s.cats[0]}".`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `לאיזו קטגוריה הגזרה הגדולה ביותר?`; cs = ch([{ text: big, correct: true }].concat(s.cats.filter(c => c !== big).map(c => ({ text: c, correct: false })))); }
      else if (qtype === 'mistake') { q = `תלמיד קבע שהגזרה הגדולה היא "${s.cats[0]}" כי היא ראשונה במקרא.`; a = 'הטעות: גודל גזרה לפי האחוז, לא לפי הסדר. ' + a; }
    } else {
      a = `זווית מרכזית = החלק מתוך השלם × 360°: ${pct}%×360°=${ang}°.`;
      q = `הקטגוריה "${s.cats[idx]}" מהווה ${pct}% מתרשים העוגה. חשבו את הזווית המרכזית של הגזרה.`;
      if (qtype === 'tf') { q = `הזווית המרכזית של הגזרה "${s.cats[idx]}" (${pct}%) היא ${tfTrue ? ang : pct}°.`; a = (tfTrue ? 'נכון. ' : 'שגוי — אחוז אינו מעלות. ') + a; }
      else if (qtype === 'mcq') { q = `מהי הזווית המרכזית של הגזרה "${s.cats[idx]}" (${pct}%)?`; cs = ch([{ text: ang + '°', correct: true }, { text: pct + '°', correct: false }, { text: (pct * 100) + '°', correct: false }, { text: (360 - ang) + '°', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד חישב זווית מרכזית של "${s.cats[idx]}": "${pct}×100=${pct * 100}°".`; a = 'הטעות: כופלים ב-360 ולא ב-100. ' + a; }
    }
    return render(qtype, q, a, svg, cs, isTrue, sub);
  }

  const MIS_SETS = [
    { labels: ['2023', '2024'], values: [50, 54], yStart: 48, title: 'מכירות (אלפי ש"ח)', look: 'פי שלושה', pct: 8 },
    { labels: ['כיתה א', 'כיתה ב'], values: [72, 78], yStart: 70, title: 'ממוצע ציונים', look: 'פי ארבעה', pct: 8 },
    { labels: ['ינואר', 'פברואר'], values: [40, 44], yStart: 38, title: 'מנויים', look: 'פי שלושה', pct: 10 }
  ];
  function genU706(diff, qtype) {
    qtype = qt(qtype);
    const m = pick(MIS_SETS), v1 = m.values[0], v2 = m.values[1], diffv = v2 - v1;
    const sub = diff === 'basic' ? 'identify' : diff === 'challenge' ? pick(['fix', 'real']) : pick(['identify', 'real']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    const svg = misleadingBarSvg(m.labels, m.values, m.yStart, m.title);
    const core = `ציר ה-y מתחיל ב-${m.yStart} ולא ב-0 (שימו לב לסימן השבירה), ולכן הפרש קטן נראה עצום.`;
    const real = `בפועל הערכים ${v1} ו-${v2} — גידול של ${diffv} בלבד (כ-${m.pct}%), לא ${m.look}.`;
    const fix = `ייצוג הוגן: ציר y צריך להתחיל ב-0.`;
    let q, a, cs, isTrue = tfTrue;
    if (sub === 'fix') {
      a = `כדי לתקן את ההטעיה ${fix} כך גובה כל עמודה יהיה פרופורציוני לערכה. ${real}`;
      q = `התרשים "${m.title}" מטעה. כיצד היו מתקנים אותו כך שיציג את הנתונים בהגינות?`;
      if (qtype === 'tf') { q = tfTrue ? `כדי לתקן את התרשים "${m.title}" יש להתחיל את ציר ה-y ב-0.` : `כדי לתקן את התרשים "${m.title}" יש להגדיל את רוחב העמודות.`; a = (tfTrue ? 'נכון. ' : 'שגוי — הבעיה היא נקודת ההתחלה של הציר, לא רוחב העמודות. ') + fix; }
      else if (qtype === 'mcq') { q = `כיצד מתקנים את התרשים "${m.title}" כך שלא יטעה?`; cs = ch([{ text: 'מתחילים את ציר ה-y מ-0', correct: true }, { text: 'מצרים את העמודות', correct: false }, { text: 'משנים את צבע העמודות', correct: false }, { text: 'מוחקים קטגוריה', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד הציע "לתקן" את התרשים ע"י הרחבת העמודות.`; a = `הטעות: רוחב אינו הבעיה. ${fix}`; }
    } else if (sub === 'real') {
      a = `${real} ${core}`;
      q = `לפי התרשים "${m.title}" נראה כאילו הערך גדל ${m.look}. מהו הגידול האמיתי (בקירוב באחוזים)?`;
      if (qtype === 'tf') { q = `הגידול האמיתי בתרשים "${m.title}" הוא ${tfTrue ? 'כ-' + m.pct + '%' : m.look}.`; a = (tfTrue ? 'נכון. ' : 'שגוי — המראה מטעה. ') + real; }
      else if (qtype === 'mcq') { q = `מהו הגידול האמיתי בתרשים "${m.title}"?`; cs = ch([{ text: 'כ-' + m.pct + '%', correct: true }, { text: m.look, correct: false }, { text: diffv * 10 + '%', correct: false }, { text: '100%', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד הסיק מהתרשים: "הערך זינק ${m.look}!"`; a = `שגוי — גובה העמודה אינו פרופורציוני לערך. ${real} ${core}`; }
    } else {
      a = `${core} ${real} ${fix}`;
      q = `התרשים "${m.title}" פורסם בפרסומת. מדוע הוא עלול להטעות?`;
      if (qtype === 'tf') { q = tfTrue ? `התרשים "${m.title}" עלול להטעות כי ציר ה-y אינו מתחיל ב-0.` : `התרשים "${m.title}" מציג את הנתונים בצורה ניטרלית.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + core + ' ' + fix; }
      else if (qtype === 'mcq') { q = `מדוע התרשים "${m.title}" עלול להטעות?`; cs = ch([{ text: 'ציר ה-y לא מתחיל ב-0, וכך ההבדל נראה גדול מהאמת', correct: true }, { text: 'העמודות צרות מדי', correct: false }, { text: 'יש מעט מדי קטגוריות', correct: false }, { text: 'הצבעים כהים מדי', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד הסיק מהתרשים: "הערך זינק ${m.look}!"`; a = `שגוי — גובה העמודה אינו פרופורציוני לערך כי ${core} ${real}`; }
    }
    return render(qtype, q, a, svg, cs, isTrue, sub);
  }

  const FREQ_TABLES = [
    { vals: [60, 70, 80, 90], counts: [4, 6, 6, 4], total: 20, label: 'ציון' },
    { vals: [1, 2, 3, 4], counts: [5, 8, 4, 3], total: 20, label: 'מספר אחים' },
    { vals: [0, 1, 2, 3], counts: [6, 9, 6, 4], total: 25, label: 'חוגים' }
  ];
  function genU707(diff, qtype) {
    qtype = qt(qtype);
    const t = pick(FREQ_TABLES), idx = rnd(0, t.vals.length - 1), c = t.counts[idx], pct = Math.round(c * 100 / t.total);
    const sub = diff === 'basic' ? 'read' : diff === 'challenge' ? pick(['relative', 'total']) : pick(['read', 'relative']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    const svg = E.freqTableHtml([t.label, 'תדירות'], t.vals.map((v, i) => [v, t.counts[i]]));
    let q, a, cs, isTrue = tfTrue;
    if (sub === 'total') {
      a = `סך הנבדקים = סכום התדירויות: ${t.counts.join('+')}=${t.total}.`;
      q = `כמה נבדקים בסך הכול לפי הטבלה?`;
      if (qtype === 'tf') { q = `סך הנבדקים בטבלה הוא ${tfTrue ? t.total : t.total + 3}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { cs = ch([{ text: '' + t.total, correct: true }, { text: '' + (t.total + 3), correct: false }, { text: '' + t.vals.reduce((x, y) => x + y, 0), correct: false }, { text: '' + Math.max.apply(null, t.counts), correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד חישב סך נבדקים כ-${t.vals.join('+')}.`; a = `הטעות: סך הנבדקים הוא סכום התדירויות, לא סכום הערכים. ${t.counts.join('+')}=${t.total}.`; }
    } else if (sub === 'relative') {
      a = `תדירות יחסית = תדירות ÷ סך: ${c}/${t.total}=${pct}%.`;
      q = `חשבו את התדירות היחסית של ${t.label} ${t.vals[idx]} (כשבר ואחוז).`;
      if (qtype === 'tf') { q = `התדירות היחסית של ${t.label} ${t.vals[idx]} היא ${tfTrue ? pct : c}%.`; a = (tfTrue ? 'נכון. ' : 'שגוי — זו התדירות המוחלטת. ') + a; }
      else if (qtype === 'mcq') { q = `מהי התדירות היחסית של ${t.label} ${t.vals[idx]}?`; cs = ch([{ text: pct + '%', correct: true }, { text: '' + c, correct: false }, { text: (100 - pct) + '%', correct: false }, { text: (pct + 5) + '%', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד אמר שהתדירות היחסית של ${t.vals[idx]} היא ${c}.`; a = `הטעות: ${c} היא תדירות מוחלטת. ` + a; }
    } else {
      a = `קוראים מעמודת התדירות בשורת ${t.vals[idx]}: ${c}.`;
      q = `מהי התדירות של ${t.label} ${t.vals[idx]} לפי הטבלה?`;
      if (qtype === 'tf') { q = `התדירות של ${t.label} ${t.vals[idx]} בטבלה היא ${tfTrue ? c : c + 1}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { cs = ch([{ text: '' + c, correct: true }, { text: '' + t.vals[idx], correct: false }, { text: '' + (c + 1), correct: false }, { text: '' + t.total, correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד קרא שהתדירות של ${t.vals[idx]} היא ${t.vals[idx]} (הערך עצמו).`; a = `הטעות: התדירות היא המספר בעמודת התדירות (${c}), לא הערך.`; }
    }
    return render(qtype, q, a, svg, cs, isTrue, sub);
  }

  // dot plot of a data list on a number line (range/median visible). Source 06.
  function dotPlot(d) {
    const T = (E.themes && E.themes.geometry) || { stroke: '#334155', unknown: '#dc2626', label: '#0f172a' };
    const mn = Math.min.apply(null, d), mx = Math.max.apply(null, d), step = 2;
    const lo = Math.floor(mn / step) * step, hi = Math.ceil(mx / step) * step;
    const x0 = 28, x1 = 282, baseY = 74, W = 300, H = 92;
    const X = v => x0 + (v - lo) * (x1 - x0) / Math.max(1, hi - lo);
    let ticks = '';
    for (let v = lo; v <= hi; v += step) ticks += `<line x1="${X(v)}" y1="${baseY - 4}" x2="${X(v)}" y2="${baseY + 4}" stroke="#64748b" stroke-width="1.2"/><text x="${X(v)}" y="${baseY + 18}" fill="#334155" font-size="9.5" text-anchor="middle">${v}</text>`;
    const counts = {}; let dots = '';
    d.slice().sort((a, b) => a - b).forEach(v => { counts[v] = (counts[v] || 0) + 1; dots += `<circle cx="${X(v)}" cy="${baseY - 9 - (counts[v] - 1) * 11}" r="5" fill="${T.unknown}" stroke="#fff" stroke-width="1"/>`; });
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><line x1="${x0 - 6}" y1="${baseY}" x2="${x1 + 6}" y2="${baseY}" stroke="${T.stroke}" stroke-width="2"/>${ticks}${dots}<text x="${W / 2}" y="13" fill="${T.label}" font-size="10.5" font-weight="700" text-anchor="middle">פיזור הנתונים על ציר — מקור קובץ 06</text></svg>`;
  }
  let U708_TF_TOGGLE = 0; // deterministic True/False alternation so TF is never one-sided across samples
  function genU708(diff, qtype) {
    qtype = qt(qtype);
    const n = diff === 'challenge' ? 7 : 5, d = [];
    while (d.length < n) d.push(rnd(2, 18));
    const sorted = d.slice().sort((a, b) => a - b), sum = d.reduce((a, b) => a + b, 0);
    const mean = Math.round(sum / d.length * 10) / 10, median = sorted[(sorted.length - 1) / 2], range = sorted[sorted.length - 1] - sorted[0];
    const fam = diff === 'basic' ? pick(['mean', 'range']) : pick(['mean', 'median', 'range']);
    const tfTrue = qtype === 'tf' && (U708_TF_TOGGLE++ % 2 === 0);
    const list = d.join(', ');
    let val, wrong, name, rule;
    if (fam === 'mean') { val = mean; wrong = median; name = 'הממוצע'; rule = `סכום ÷ כמות = ${sum}/${d.length}=${mean}`; }
    else if (fam === 'median') { val = median; wrong = sorted[sorted.length - 1]; name = 'החציון'; rule = `ממיינים (${sorted.join(', ')}) ולוקחים את האמצעי = ${median}`; }
    else { val = range; wrong = sorted[sorted.length - 1]; name = 'הטווח'; rule = `מקס − מין = ${sorted[sorted.length - 1]} − ${sorted[0]} = ${range}`; }
    let q = `נתונים: ${list}. חשבו את ${name}.`, a = `${rule}. לכן ${name} = ${val}.`, cs, isTrue = tfTrue;
    if (qtype === 'tf') { q = `${name} של הנתונים ${list} הוא ${tfTrue ? val : wrong}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + rule + '.'; }
    else if (qtype === 'mcq') { q = `מהו ${name} של הנתונים ${list}?`; cs = ch([{ text: '' + val, correct: true }, { text: '' + wrong, correct: false }, { text: '' + (val + 2), correct: false }, { text: '' + sorted[0], correct: false }]); }
    else if (qtype === 'mistake') { q = `תלמיד טען ש${name} של ${list} הוא ${wrong}.`; a = `הטעות: ${name} מחושב כך — ${rule}. כלומר ${val}.`; }
    return render(qtype, q, a, dotPlot(d), cs, isTrue, fam);
  }

  function genG806(diff, qtype) {
    qtype = qt(qtype);
    const r = pick([3, 4, 5, 6]);
    const fam = diff === 'basic' ? 'identify' : diff === 'challenge' ? pick(['relation', 'longest']) : pick(['identify', 'relation']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    const svg = E.circleSvg ? E.circleSvg({ mode: 'r', r: r }, null) : '';
    let q, a, cs, isTrue = tfTrue;
    if (fam === 'relation') {
      a = `הקוטר עובר דרך המרכז ושווה לפעמיים הרדיוס: 2×${r}=${2 * r} ס״מ.`;
      q = `רדיוס עיגול ${r} ס״מ. מהו הקוטר? נמקו.`;
      if (qtype === 'tf') { q = `רדיוס העיגול ${r} ס״מ, ולכן הקוטר ${tfTrue ? 2 * r : r + 2} ס״מ.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `מהו הקוטר של עיגול שרדיוסו ${r} ס״מ?`; cs = ch([{ text: (2 * r) + ' ס״מ', correct: true }, { text: r + ' ס״מ', correct: false }, { text: (r + 2) + ' ס״מ', correct: false }, { text: (r * r) + ' ס״מ', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד אמר שקוטר עיגול שרדיוסו ${r} הוא ${r} ס״מ.`; a = `הטעות: ` + a; }
    } else if (fam === 'longest') {
      a = `הקוטר הוא המיתר הארוך ביותר — הוא עובר דרך המרכז (אורכו 2r).`;
      q = `איזה מיתר הוא הארוך ביותר בעיגול? נמקו.`;
      if (qtype === 'tf') { q = `המיתר הארוך ביותר בעיגול הוא ${tfTrue ? 'הקוטר' : 'הרדיוס'}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `מהו המיתר הארוך ביותר בעיגול?`; cs = ch([{ text: 'הקוטר', correct: true }, { text: 'הרדיוס', correct: false }, { text: 'מיתר כלשהו', correct: false }, { text: 'הקשת', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד טען שהרדיוס הוא המיתר הארוך ביותר.`; a = `הטעות: הרדיוס אינו מיתר (אינו מחבר שתי נקודות על המעגל). ` + a; }
    } else {
      a = `קטע ממרכז העיגול לנקודה על המעגל הוא רדיוס; מיתר מחבר שתי נקודות על המעגל; קוטר הוא מיתר דרך המרכז.`;
      q = `הסבירו מהם רדיוס, קוטר ומיתר בעיגול.`;
      if (qtype === 'tf') { q = `קטע המחבר את מרכז העיגול לנקודה על המעגל נקרא ${tfTrue ? 'רדיוס' : 'מיתר'}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `איך נקרא קטע המחבר את מרכז העיגול לנקודה על המעגל?`; cs = ch([{ text: 'רדיוס', correct: true }, { text: 'מיתר', correct: false }, { text: 'קוטר', correct: false }, { text: 'קשת', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד קרא לקטע ממרכז העיגול אל המעגל "מיתר".`; a = `הטעות: מיתר מחבר שתי נקודות על המעגל. ` + a; }
    }
    return render(qtype, q, a, svg, cs, isTrue, fam);
  }

  function genG808(diff, qtype) {
    qtype = qt(qtype);
    const base = pick([40, 50, 55, 65, 70, 72]), apex = 180 - 2 * base;
    const fam = diff === 'basic' ? 'apex' : diff === 'challenge' ? pick(['baseangles', 'classify']) : pick(['apex', 'baseangles']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    let q, a, cs, isTrue = tfTrue, svg;
    if (fam === 'classify') {
      const kind = apex === 90 ? 'ישר-זווית' : apex > 90 ? 'קהה-זווית' : 'חד-זוויות';
      svg = isoTriSvg(apex, base);
      a = `הזווית הגדולה ביותר ${Math.max(apex, base)}°, ולכן המשולש ${kind}.`;
      q = `משולש שווה-שוקיים עם זווית ראש ${apex}° וזוויות בסיס ${base}°. סווגו לפי זוויותיו.`;
      if (qtype === 'tf') { const other = kind === 'חד-זוויות' ? 'קהה-זווית' : 'חד-זוויות'; q = `משולש שווה-שוקיים עם זווית ראש ${apex}° הוא ${tfTrue ? kind : other}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `משולש שווה-שוקיים, זווית ראש ${apex}°. מה סוגו לפי הזוויות?`; cs = ch([{ text: 'משולש ' + kind, correct: true }, { text: 'משולש ' + (kind === 'חד-זוויות' ? 'קהה-זווית' : 'חד-זוויות'), correct: false }, { text: 'משולש ישר-זווית', correct: kind !== 'ישר-זווית' ? false : false }, { text: 'משולש שונה-צלעות', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד סיווג את המשולש לפי זווית הבסיס בלבד.`; a = `הטעות: סיווג לפי הזווית הגדולה ביותר. ` + a; }
    } else if (fam === 'apex') {
      svg = isoTriSvg(null, base);
      a = `סכום הזוויות 180°: 180−${base}−${base}=${apex}°.`;
      q = `במשולש שווה-שוקיים זוויות הבסיס ${base}° כל אחת. מצאו את זווית הראש.`;
      if (qtype === 'tf') { q = `זוויות הבסיס ${base}° כל אחת. זווית הראש ${tfTrue ? apex : base}°.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `זוויות הבסיס ${base}° — מהי זווית הראש?`; cs = ch([{ text: apex + '°', correct: true }, { text: base + '°', correct: false }, { text: (180 - base) + '°', correct: false }, { text: (2 * base) + '°', correct: false }]); }
      else if (qtype === 'mistake') { q = `זוויות בסיס ${base}°. תלמיד אמר שזווית הראש ${base}° (כמו הבסיס).`; a = `הטעות: ` + a; }
    } else {
      svg = isoTriSvg(apex, null);
      a = `זוויות הבסיס שוות: (180−${apex})/2=${base}° כל אחת.`;
      q = `במשולש שווה-שוקיים זווית הראש ${apex}°. מצאו את זוויות הבסיס ונמקו.`;
      if (qtype === 'tf') { q = `זווית הראש ${apex}°. שתי זוויות הבסיס ${tfTrue ? base : apex}° כל אחת.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `זווית הראש ${apex}° — מהי כל אחת מזוויות הבסיס?`; cs = ch([{ text: base + '°', correct: true }, { text: (180 - apex) + '°', correct: false }, { text: apex + '°', correct: false }, { text: (base + 5) + '°', correct: false }]); }
      else if (qtype === 'mistake') { q = `זווית ראש ${apex}°. תלמיד אמר שזוויות הבסיס ${180 - apex}° כל אחת.`; a = `הטעות: צריך לחלק ב-2 בין שתי זוויות הבסיס. ` + a; }
    }
    return render(qtype, q, a, svg, cs, isTrue, fam);
  }

  function genN708(diff, qtype) {
    qtype = qt(qtype);
    const fam = diff === 'basic' ? pick(['compare', 'between']) : diff === 'challenge' ? pick(['order', 'between']) : pick(['order', 'compare', 'between']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    let q, a, cs, isTrue = tfTrue, svg;
    if (fam === 'order') {
      const set = []; while (set.length < 4) { const v = rnd(-9, 9); if (set.indexOf(v) < 0) set.push(v); }
      if (!set.some(v => v < 0)) set[0] = -rnd(1, 9);
      const s = set.slice().sort((a, b) => a - b);
      svg = E.numberLineSvg ? E.numberLineSvg({ points: set, min: -10, max: 10 }) : '';
      a = `על הציר, שמאלה = קטן יותר: ${s.join(' < ')}.`;
      q = `סדרו מהקטן לגדול: ${set.join(', ')}.`;
      if (qtype === 'tf') { q = `בסדרה ${set.join(', ')} המספר הקטן ביותר הוא ${tfTrue ? s[0] : s[s.length - 1]}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `מהו הקטן ביותר בסדרה ${set.join(', ')}?`; cs = ch([{ text: '' + s[0], correct: true }, { text: '' + s[s.length - 1], correct: false }, { text: '' + set[1], correct: false }, { text: '' + s[1], correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד סידר לפי מרחק מאפס: ${set.slice().sort((a, b) => Math.abs(a) - Math.abs(b)).join(', ')}.`; a = `הטעות: סדר נקבע לפי מיקום על הציר, לא מרחק מאפס. ` + a; }
    } else if (fam === 'between') {
      const lo = rnd(-8, 3), hi = lo + 2;
      svg = E.numberLineSvg ? E.numberLineSvg({ points: [lo, hi], min: -10, max: 10 }) : '';
      a = `המספר ${lo + 1} נמצא בין ${lo} ל-${hi}: ${lo} < ${lo + 1} < ${hi}.`;
      q = `איזה מספר שלם נמצא בין ${lo} ל-${hi}? הסבירו לפי הציר.`;
      if (qtype === 'tf') { isTrue = tfTrue; if (tfTrue) { q = `המספר ${lo + 1} נמצא בין ${lo} ל-${hi}.`; a = 'נכון. ' + a; } else { q = `המספר ${hi + 2} נמצא בין ${lo} ל-${hi}.`; a = `שגוי. ${hi + 2} גדול מ-${hi}, ולכן אינו ביניהם.`; } }
      else if (qtype === 'mcq') { q = `איזה מספר שלם נמצא בין ${lo} ל-${hi}?`; cs = ch([{ text: '' + (lo + 1), correct: true }, { text: '' + (hi + 1), correct: false }, { text: '' + (lo - 1), correct: false }, { text: '' + (hi + 2), correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד טען ש-${hi + 1} נמצא בין ${lo} ל-${hi}.`; a = `הטעות: ${hi + 1} גדול מ-${hi}. ` + a; }
    } else {
      let a1 = rnd(-9, 9), b1 = rnd(-9, 9); if (a1 === b1) b1 = a1 + 1; if (a1 >= 0 && b1 >= 0) a1 = -rnd(1, 9);
      const big = Math.max(a1, b1), small = Math.min(a1, b1);
      svg = E.numberLineSvg ? E.numberLineSvg({ points: [a1, b1], min: -10, max: 10 }) : '';
      a = `על הציר ${big} נמצא מימין ל-${small}, ולכן ${big} > ${small}.`;
      q = `איזה גדול יותר: ${a1} או ${b1}? הסבירו לפי הציר.`;
      if (qtype === 'tf') { isTrue = a1 > b1; q = `${a1} > ${b1}.`; a = (a1 > b1 ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `איזה מספר גדול יותר: ${a1} או ${b1}?`; cs = ch([{ text: '' + big, correct: true }, { text: '' + small, correct: false }, { text: 'שווים', correct: false }, { text: 'אי אפשר לדעת', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד טען ש-${small} > ${big} כי ספרתו גדולה.`; a = `הטעות: במספרים שליליים, ככל שרחוקים יותר מאפס שמאלה — קטנים יותר. ` + a; }
    }
    return render(qtype, q, a, svg, cs, isTrue, fam);
  }

  function genN709(diff, qtype) {
    qtype = qt(qtype);
    const n = (function () { let v = rnd(-12, 12); while (v === 0) v = rnd(-12, 12); return v; })();
    const fam = diff === 'basic' ? pick(['opposite', 'absolute']) : diff === 'challenge' ? pick(['context', 'absolute']) : pick(['opposite', 'absolute', 'context']);
    const tfTrue = qtype === 'tf' && Math.random() < 0.5;
    const svg = E.numberLineSvg ? E.numberLineSvg({ points: [n, -n], min: -12, max: 12 }) : '';
    let q, a, cs, isTrue = tfTrue;
    if (fam === 'absolute') {
      a = `הערך המוחלט הוא המרחק מאפס: |${n}|=${Math.abs(n)} (תמיד אי-שלילי).`;
      q = `חשבו |${n}| והסבירו מה משמעות הערך המוחלט.`;
      if (qtype === 'tf') { q = `|${n}| = ${tfTrue ? Math.abs(n) : -Math.abs(n)}.`; a = (tfTrue ? 'נכון. ' : 'שגוי — ערך מוחלט אי-שלילי. ') + a; }
      else if (qtype === 'mcq') { q = `מהו |${n}|?`; cs = ch([{ text: '' + Math.abs(n), correct: true }, { text: '' + (-Math.abs(n)), correct: false }, { text: '' + n, correct: false }, { text: '' + (Math.abs(n) + 1), correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד כתב |${n}| = ${n}.`; a = `הטעות: ` + a; }
    } else if (fam === 'context') {
      const ctx = pick([{ w: 'טמפרטורה', u: '°' }, { w: 'גובה', u: ' מ׳' }]);
      a = `הנגדי: ${-n}${ctx.u}. הערך המוחלט (גודל השינוי): ${Math.abs(n)}${ctx.u}.`;
      q = `ב${ctx.w} שינוי של ${n}${ctx.u}. מהו השינוי הנגדי, ומה הערך המוחלט שלו?`;
      if (qtype === 'tf') { q = `הנגדי של ${n} הוא ${tfTrue ? -n : n}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + `המספר הנגדי באותו מרחק מאפס בצד השני: ${-n}.`; }
      else if (qtype === 'mcq') { q = `מהו המספר הנגדי של ${n}?`; cs = ch([{ text: '' + (-n), correct: true }, { text: '' + n, correct: false }, { text: '' + Math.abs(n), correct: false }, { text: '0', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד אמר שהנגדי של ${n} הוא ${n} עצמו.`; a = `הטעות: הנגדי הוא בצד השני של האפס באותו מרחק: ${-n}.`; }
    } else {
      a = `הנגדי של ${n} הוא ${-n} — באותו מרחק מאפס, בצד השני של הציר.`;
      q = `מהו המספר הנגדי של ${n}? סמנו אותו על הציר.`;
      if (qtype === 'tf') { q = `המספר הנגדי של ${n} הוא ${tfTrue ? -n : Math.abs(n)}.`; a = (tfTrue ? 'נכון. ' : 'שגוי. ') + a; }
      else if (qtype === 'mcq') { q = `מהו הנגדי של ${n}?`; cs = ch([{ text: '' + (-n), correct: true }, { text: '' + Math.abs(n), correct: false }, { text: '' + n, correct: false }, { text: '0', correct: false }]); }
      else if (qtype === 'mistake') { q = `תלמיד אמר שהנגדי של ${n} הוא הערך המוחלט שלו, ${Math.abs(n)}.`; a = `הטעות: הנגדי של ${n} הוא ${-n}. ערך מוחלט הוא מרחק מאפס.`; }
    }
    return render(qtype, q, a, svg, cs, isTrue, fam);
  }

  const MAP = {
    'U7-05-ENGINE': { fn: genU705, title: 'דיאגרמת עוגה ושכיחות יחסית', g: 7, d: 'uncertainty', cls: 'unc' },
    'U7-06-ENGINE': { fn: genU706, title: 'תרשים מטעה — ביקורת', g: 7, d: 'uncertainty', cls: 'unc' },
    'U7-07-ENGINE': { fn: genU707, title: 'טבלת שכיחויות ושכיחות יחסית', g: 7, d: 'uncertainty', cls: 'unc' },
    'U7-08-ENGINE': { fn: genU708, title: 'ממוצע, חציון וטווח', g: 7, d: 'uncertainty', cls: 'unc' },
    'G8-06-ENGINE': { fn: genG806, title: 'קוטר, רדיוס ומיתר', g: 8, d: 'geometry', cls: 'geo' },
    'G8-08-ENGINE': { fn: genG808, title: 'משולש שווה-שוקיים', g: 8, d: 'geometry', cls: 'geo' },
    'N7-08-ENGINE': { fn: genN708, title: 'ציר מספרים והשוואת שליליים', g: 7, d: 'numeric', cls: 'num' },
    'N7-09-ENGINE': { fn: genN709, title: 'מספר נגדי וערך מוחלט', g: 7, d: 'numeric', cls: 'num' }
  };
  const IDS = Object.keys(MAP);
  const FILE = { uncertainty: '06_uncertainty_domain_curriculum_examples.pdf', geometry: '04_grade-8_geometry_curriculum.pdf', numeric: '05_grade-7_numeric_domain_curriculum.pdf' };
  const SKILL = { 'U7-05-ENGINE': 'pie_chart_and_relative_frequency', 'U7-06-ENGINE': 'misleading_graph_critique', 'U7-07-ENGINE': 'frequency_table_and_relative_frequency', 'U7-08-ENGINE': 'mean_median_range', 'G8-06-ENGINE': 'diameter_radius_chord', 'G8-08-ENGINE': 'isosceles_triangle', 'N7-08-ENGINE': 'number_line_comparison', 'N7-09-ENGINE': 'opposite_and_absolute_value' };
  if (typeof E.defineSource === 'function') {
    IDS.forEach(id => { const m = MAP[id], base = id.replace(/-ENGINE$/, ''); E.defineSource(id, { sourceFile: FILE[m.d], sourceId: base, patternId: base + '-' + SKILL[id], grade: m.g, domain: m.d, skill: SKILL[id], curriculumArea: m.d + ' / grade ' + m.g, cognitiveDemand: 'standard' }); });
  }

  // map each engine's short family code → the canonical questionFamily in the
  // pedagogy registry, so emitted provenance matches a registered family exactly.
  const FAM_CANON = {
    'U7-05-ENGINE': { angle: 'pie_central_angle', missing: 'pie_missing_percent', largest: 'pie_largest_sector' },
    'U7-06-ENGINE': { identify: 'identify_misleading', fix: 'propose_fair_representation', real: 'real_change' },
    'U7-07-ENGINE': { read: 'read_frequency', relative: 'relative_frequency', total: 'total_count' },
    'U7-08-ENGINE': { mean: 'mean', median: 'median', range: 'range' },
    'G8-06-ENGINE': { identify: 'identify_part', relation: 'radius_diameter_relation', longest: 'longest_chord' },
    'G8-08-ENGINE': { apex: 'find_apex', baseangles: 'find_base_angles', classify: 'classify_isosceles' },
    'N7-08-ENGINE': { order: 'order_negatives', compare: 'compare_negatives', between: 'integer_between' },
    'N7-09-ENGINE': { opposite: 'opposite_number', absolute: 'absolute_value', context: 'opposite_in_context' }
  };
  function canonFamily(id, code) { return (FAM_CANON[id] && FAM_CANON[id][code]) || code || null; }
  function asExercise(id, diff, qtype) { const m = MAP[id]; if (!m) return null; const r = m.fn(diff || 'standard', qtype || 'open'); const cl = r.questionHTML && r.questionHTML.match(/mcq-choice mcq-correct"><span class="mcq-label">([^<]+)\./); return { id: id, title: m.title, qtype: qtype || 'open', gradeTag: m.g === 8 ? 'כיתה ח׳' : 'כיתה ז׳', domainTag: m.cls === 'unc' ? 'אי-ודאות' : m.cls === 'geo' ? 'גאומטריה' : 'מספרי', cls: m.cls, questionHTML: r.questionHTML, answerHTML: r.answerHTML, correctLabel: cl ? cl[1] : null, questionFamily: canonFamily(id, r.questionFamily) }; }

  IDS.forEach(id => { const m = MAP[id]; topicReg(m.g, m.d, id, m.title + ' ✦ מנוע מקור'); });
  if (Array.isArray(E.ENGINE_TOPIC_IDS)) IDS.forEach(id => { if (E.ENGINE_TOPIC_IDS.indexOf(id) < 0) E.ENGINE_TOPIC_IDS.push(id); });
  const oldIs = E.isEngineTopic; E.isEngineTopic = function (id) { return IDS.indexOf(id) >= 0 || (typeof oldIs === 'function' && oldIs(id)); };
  const oldGet = E.getEngineExercise; E.getEngineExercise = function (id, diff, qtype) { return asExercise(id, diff, qtype) || (typeof oldGet === 'function' ? oldGet(id, diff, qtype) : null); };
  if (typeof generators !== 'undefined') {
    IDS.forEach(id => { const m = MAP[id]; generators[id] = function () { const d = (document.getElementById('selDiff') && document.getElementById('selDiff').value) || 'standard', q = (document.getElementById('selQType') && document.getElementById('selQType').value) || 'open'; E.renderEngineCard(id, m.title, m.fn(d, q)); }; });
  }
  if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('DOMContentLoaded', function () { if (typeof onDomain === 'function') onDomain(); });
})();
