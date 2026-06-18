// generator/engine/source-fit-uncertainty-deep.js
// Additive source-06 coverage for the uncertainty-domain PDF:
// frequency tables, bar/pie/line graphs, misleading representations,
// relative frequency decisions, probability literacy, and multi-source tasks.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const L = ['א', 'ב', 'ג', 'ד'];
  const T = (E.themes && E.themes.geometry) || {
    fill: '#f8fafc', stroke: '#334155', helper: '#cbd5e1',
    given: '#2563eb', unknown: '#dc2626', label: '#0f172a'
  };
  let tfFlip = 0;
  function pick(a) { return E.pick ? E.pick(a) : a[Math.floor(Math.random() * a.length)]; }
  function shuf(a) { return E.shuffle ? E.shuffle(a) : a.slice().sort(function () { return Math.random() - 0.5; }); }
  function qt(qtype) { return qtype === 'mixed' ? pick(['open', 'mcq', 'tf', 'mistake']) : (qtype || 'open'); }
  function inline(tex) { return E.fmt && E.fmt.inline ? E.fmt.inline(tex) : '$' + tex + '$'; }
  function pct(n, d) { return Math.round(n * 1000 / d) / 10; }
  function esc(v) { return String(v).replace(/[&<>]/g, function (s) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[s]; }); }
  function tableHtml(headers, rows) {
    return E.freqTableHtml ? E.freqTableHtml(headers, rows) :
      '<table class="freq-table"><tbody>' + [headers].concat(rows).map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
  }
  function choices(items) {
    const out = [], seen = {};
    items.forEach(function (x) {
      const text = String(x.text);
      if (!seen[text]) { seen[text] = 1; out.push({ text: text, correct: !!x.correct }); }
    });
    while (out.length < 4) out.push({ text: 'לא ניתן להסיק מהנתונים', correct: false });
    const oneCorrect = out.some(function (x) { return x.correct; });
    if (!oneCorrect && out.length) out[0].correct = true;
    return shuf(out.slice(0, 4)).map(function (x, i) {
      return { label: L[i], text: x.text, correct: x.correct };
    });
  }
  function render(qtype, c, family) {
    qtype = qt(qtype);
    const visual = c.visual || '';
    let r, isTrue;
    if (qtype === 'mcq') {
      r = E.questionTypes.mcq({
        question: c.mcqQuestion || c.question,
        answer: c.answer,
        svg: visual,
        choices: choices(c.choices || [{ text: c.correctText || 'נכון', correct: true }])
      });
    } else if (qtype === 'tf') {
      isTrue = (tfFlip++ % 2) === 0;
      r = E.questionTypes.tf({
        question: isTrue ? (c.tfTrue || c.question) : (c.tfFalse || c.mistake || c.question),
        answer: (isTrue ? 'נכון. ' : 'שגוי. ') + c.answer,
        svg: visual,
        isTrue: isTrue
      });
    } else if (qtype === 'mistake') {
      r = E.questionTypes.mistake({
        question: c.mistake || c.tfFalse || c.question,
        answer: c.mistakeAnswer || ('הטעות: מתעלמים ממבנה הנתונים. ' + c.answer),
        svg: visual
      });
    } else {
      r = E.questionTypes.open({ question: c.question, answer: c.answer, svg: visual });
    }
    if (r) r.questionFamily = family;
    return r;
  }

  function barSvg(data, title, unit, opt) {
    opt = opt || {};
    const W = opt.w || 330, H = opt.h || 230, l = 42, r = 18, t = 38, b = 48;
    const min = opt.min != null ? opt.min : 0;
    const max = opt.max || Math.max.apply(null, data.map(function (d) { return d.v; }));
    const plotH = H - t - b, plotW = W - l - r;
    const slot = plotW / data.length, bw = Math.min(38, slot * 0.58);
    function Y(v) { return t + plotH * (1 - (v - min) / Math.max(1, max - min)); }
    let grid = '';
    for (let i = 0; i <= 5; i++) {
      const v = Math.round((min + (max - min) * i / 5) * 10) / 10, y = Y(v);
      grid += '<line x1="' + l + '" y1="' + y + '" x2="' + (W - r) + '" y2="' + y + '" stroke="#e2e8f0" stroke-width="1"/>' +
        '<text x="' + (l - 8) + '" y="' + (y + 3) + '" fill="#64748b" font-size="9.5" text-anchor="end">' + v + '</text>';
    }
    let bars = '';
    data.forEach(function (d, i) {
      const cx = W - r - slot * i - slot / 2, y = Y(d.v), h = H - b - y;
      const hidden = d.show === false;
      bars += '<rect x="' + (cx - bw / 2) + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="5" fill="' +
        (hidden ? '#fff' : (d.fill || '#dbeafe')) + '" stroke="' + (hidden ? T.unknown : (d.stroke || T.given)) +
        '" stroke-width="1.8" ' + (hidden ? 'stroke-dasharray="4 3"' : '') + '/>' +
        '<text x="' + cx + '" y="' + (y - 7) + '" fill="' + (hidden ? T.unknown : T.label) +
        '" font-size="10.5" font-weight="600" text-anchor="middle">' + (hidden ? '?' : d.v) + '</text>' +
        '<text x="' + cx + '" y="' + (H - 24) + '" fill="' + T.label + '" font-size="10" font-weight="500" text-anchor="middle">' + esc(d.k) + '</text>';
    });
    return '<svg class="engine-svg source-deep-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="10" y="10" width="' + (W - 20) + '" height="' + (H - 24) + '" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>' +
      '<text x="' + (W / 2) + '" y="28" font-size="12.5" font-weight="600" text-anchor="middle" fill="' + T.label + '">' + esc(title) + '</text>' +
      grid + '<line x1="' + l + '" y1="' + (H - b) + '" x2="' + (W - r) + '" y2="' + (H - b) + '" stroke="' + T.stroke + '" stroke-width="1.7"/>' +
      '<line x1="' + l + '" y1="' + t + '" x2="' + l + '" y2="' + (H - b) + '" stroke="' + T.stroke + '" stroke-width="1.7"/>' +
      bars + '<text x="' + (W / 2) + '" y="' + (H - 7) + '" font-size="10" font-weight="500" text-anchor="middle" fill="#64748b">' + esc(unit || '') + '</text></svg>';
  }
  function lineSvg(points, title, xLabel, yLabel, opt) {
    opt = opt || {};
    const W = opt.w || 340, H = opt.h || 230, l = 48, r = 20, t = 38, b = 50;
    const ys = points.map(function (p) { return p.y; });
    const minY = opt.minY != null ? opt.minY : Math.min(0, Math.min.apply(null, ys));
    const maxY = opt.maxY != null ? opt.maxY : Math.max.apply(null, ys);
    const plotW = W - l - r, plotH = H - t - b;
    function X(i) { return l + plotW * i / Math.max(1, points.length - 1); }
    function Y(v) { return t + plotH * (1 - (v - minY) / Math.max(1, maxY - minY)); }
    let grid = '';
    for (let i = 0; i <= 4; i++) {
      const v = Math.round((minY + (maxY - minY) * i / 4) * 10) / 10, y = Y(v);
      grid += '<line x1="' + l + '" y1="' + y + '" x2="' + (W - r) + '" y2="' + y + '" stroke="#e2e8f0"/>' +
        '<text x="' + (l - 8) + '" y="' + (y + 3) + '" fill="#64748b" font-size="9.5" text-anchor="end">' + v + '</text>';
    }
    const poly = points.map(function (p, i) { return X(i) + ',' + Y(p.y); }).join(' ');
    const dots = points.map(function (p, i) {
      return '<circle cx="' + X(i) + '" cy="' + Y(p.y) + '" r="4.2" fill="' + (p.fill || T.unknown) + '" stroke="#fff" stroke-width="1.2"/>' +
        '<text x="' + X(i) + '" y="' + (H - 27) + '" font-size="9.5" fill="' + T.label + '" text-anchor="middle">' + esc(p.x) + '</text>';
    }).join('');
    return '<svg class="engine-svg source-deep-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="10" y="10" width="' + (W - 20) + '" height="' + (H - 24) + '" rx="8" fill="#fff" stroke="#cbd5e1" stroke-width="1.4"/>' +
      '<text x="' + (W / 2) + '" y="28" font-size="12.5" font-weight="600" text-anchor="middle" fill="' + T.label + '">' + esc(title) + '</text>' +
      grid + '<line x1="' + l + '" y1="' + (H - b) + '" x2="' + (W - r) + '" y2="' + (H - b) + '" stroke="' + T.stroke + '" stroke-width="1.7"/>' +
      '<line x1="' + l + '" y1="' + t + '" x2="' + l + '" y2="' + (H - b) + '" stroke="' + T.stroke + '" stroke-width="1.7"/>' +
      '<polyline points="' + poly + '" fill="none" stroke="' + (opt.stroke || '#2563eb') + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots + '<text x="' + (W / 2) + '" y="' + (H - 8) + '" font-size="10" text-anchor="middle" fill="#64748b">' + esc(xLabel || '') + '</text>' +
      '<text x="22" y="31" font-size="10" fill="#64748b">' + esc(yLabel || '') + '</text></svg>';
  }
  function pieSvg(items, title, hideIndex) {
    const W = 330, H = 218, cx = 118, cy = 105, R = 68;
    const cols = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    let a = -90, sectors = '', labels = '', legend = '';
    items.forEach(function (it, i) {
      const sweep = it.p * 3.6, a0 = a * Math.PI / 180, a1 = (a + sweep) * Math.PI / 180;
      const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      const hidden = hideIndex === i, large = sweep > 180 ? 1 : 0;
      sectors += '<path d="M ' + cx + ' ' + cy + ' L ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + R + ' ' + R + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Z" fill="' + (hidden ? '#fff' : cols[i % cols.length]) + '" fill-opacity=".86" stroke="#fff" stroke-width="2"/>';
      const mid = (a + sweep / 2) * Math.PI / 180;
      labels += '<text x="' + (cx + (R * 0.62) * Math.cos(mid)).toFixed(1) + '" y="' + (cy + (R * 0.62) * Math.sin(mid)).toFixed(1) + '" font-size="10.5" font-weight="600" text-anchor="middle" fill="' + (hidden ? T.unknown : '#fff') + '">' + (hidden ? '?' : it.p + '%') + '</text>';
      legend += '<rect x="286" y="' + (46 + i * 22) + '" width="10" height="10" rx="2" fill="' + cols[i % cols.length] + '"/>' +
        '<text x="280" y="' + (55 + i * 22) + '" font-size="10" text-anchor="end" fill="' + T.label + '">' + esc(it.k) + '</text>';
      a += sweep;
    });
    return '<svg class="engine-svg source-deep-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="10" y="10" width="310" height="196" rx="8" fill="#fff" stroke="#cbd5e1"/>' +
      '<text x="165" y="29" font-size="12.5" font-weight="600" text-anchor="middle" fill="' + T.label + '">' + esc(title) + '</text>' +
      sectors + labels + legend + '</svg>';
  }
  function tenSectorSvg() {
    const data = [
      { k: 'נענו', n: 250, p: 50, color: '#2563eb' },
      { k: 'לא ענו', n: 100, p: 20, color: '#10b981' },
      { k: 'ניתוק', n: 125, p: 25, color: '#f59e0b' },
      { k: 'תפוס', n: 25, p: 5, color: '#ef4444' }
    ];
    let cells = '', x0 = 44, y0 = 64;
    for (let i = 0; i < 10; i++) {
      let color = '#fff', label = '';
      if (i < 5) { color = data[0].color; label = 'נענו'; }
      else if (i < 7) { color = data[1].color; label = 'לא ענו'; }
      else if (i < 9) { color = data[2].color; label = 'ניתוק'; }
      else { color = data[3].color; label = 'תפוס'; }
      cells += '<rect x="' + (x0 + i * 24) + '" y="' + y0 + '" width="22" height="70" rx="4" fill="' + color + '" fill-opacity=".82" stroke="#334155"/>' +
        '<text x="' + (x0 + i * 24 + 11) + '" y="151" font-size="9.5" text-anchor="middle" fill="' + T.label + '">' + label + '</text>';
    }
    const leg = data.map(function (d, i) {
      return '<text x="300" y="' + (62 + i * 22) + '" font-size="10" text-anchor="end" fill="' + T.label + '">' + d.k + ': ' + d.n + ' (' + d.p + '%)</text>';
    }).join('');
    return '<svg class="engine-svg source-deep-svg" viewBox="0 0 330 190" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="10" y="10" width="310" height="164" rx="8" fill="#fff" stroke="#cbd5e1"/>' +
      '<text x="165" y="31" font-size="12.5" font-weight="600" text-anchor="middle" fill="' + T.label + '">עיגול מחולק ל-10 חלקים שווים</text>' +
      cells + leg + '</svg>';
  }
  function compareSvg(rows, title) {
    const bars = rows.map(function (r) { return { k: r.k, v: r.v, fill: r.fill }; });
    return barSvg(bars, title, '', { max: Math.max.apply(null, bars.map(function (b) { return b.v; })) });
  }
  function multiVisual(parts) { return '<div class="source-deep-visuals">' + parts.join('') + '</div>'; }
  function attachFamily(r, family) { if (r) r.questionFamily = family; return r; }

  const FAMILY_MAP = {
    'U7-01-ENGINE': ['source_penguin_frequency_table', 'source_grade_raw_to_table', 'source_clubs_missing_frequency'],
    'U7-02-ENGINE': ['given_probability_count', 'weather_probability_complement', 'fairness_symmetry_probability', 'forecast_interpretation'],
    'U7-03-ENGINE': ['source_transport_relative_decision', 'source_free_throw_relative_success', 'source_equal_relative_target'],
    'U7-04-ENGINE': ['source_football_bar_to_table', 'source_bottle_bar_chart', 'source_smartphone_missing_graph_table'],
    'U7-05-ENGINE': ['source_favorite_color_total_from_pie', 'source_phone_ten_sector_model', 'source_club_missing_percent'],
    'U7-06-ENGINE': ['source_medicine_misleading_3d', 'source_choose_graph_audience', 'source_representational_ethics'],
    'U7-08-ENGINE': ['source_average_total_reasoning', 'source_shell_average_constraints', 'source_satisfaction_survey_measures'],
    'U8-01-ENGINE': ['source_combined_mean_groups', 'source_salary_outlier_measures', 'source_monkey_reverse_measures', 'source_smartphone_distribution_measures', 'source_flower_field_measures', 'source_interpolation_extrapolation'],
    'U8-02-ENGINE': ['source_satisfaction_probability', 'source_weather_probability_table', 'source_athletics_multi_source', 'source_coffee_multi_source', 'source_ticket_sales_extrapolation']
  };
  E.UNCERTAINTY_SOURCE_DEEP_FAMILIES = FAMILY_MAP;
  function chooseFamily(id, diff) {
    const a = FAMILY_MAP[id] || [];
    if (!a.length) return null;
    if (diff === 'basic') return a[0];
    if (diff === 'challenge') return pick(a.slice(Math.max(0, Math.floor(a.length / 2))).concat(a));
    return pick(a);
  }
  function shouldUse(id, diff, opts) {
    if (!FAMILY_MAP[id]) return false;
    if (opts && opts.sourceDeepFamily) return FAMILY_MAP[id].indexOf(opts.sourceDeepFamily) >= 0;
    if (opts && opts.requestedFamily && FAMILY_MAP[id].indexOf(opts.requestedFamily) < 0) return false;
    if (opts && opts.forceUncertaintySourceDeep) return true;
    const p = diff === 'challenge' ? 0.78 : diff === 'basic' ? 0.42 : 0.62;
    return Math.random() < p;
  }

  function sourceCase(family) {
    switch (family) {
      case 'source_penguin_frequency_table': {
        const rows = [['מצוקים', 30], ['חוף מערבי', 45], ['מפרץ שקט', 60], ['קרחון', 15]];
        const visual = tableHtml(['אזור באי', 'מספר גוזלים'], rows);
        return {
          visual: visual,
          question: 'בטבלה מתואר מספר גוזלי פינגווינים בארבעה אזורים באי. חשבו את הסך הכול ואת החלק של "מפרץ שקט" מכלל הגוזלים.',
          answer: visual + '\nסך הכול: ' + inline('30+45+60+15=150') + '. במפרץ שקט יש ' + inline('60') + ' מתוך ' + inline('150') + ', ולכן ' + inline('\\frac{60}{150}=\\frac{2}{5}=40\\%') + '.',
          mcqQuestion: 'מה החלק של גוזלי "מפרץ שקט" מכלל הגוזלים?',
          choices: [{ text: inline('\\frac{2}{5}=40\\%'), correct: true }, { text: inline('\\frac{60}{90}'), correct: false }, { text: inline('60\\%'), correct: false }, { text: inline('\\frac{15}{150}'), correct: false }],
          tfTrue: 'במפרץ שקט נמצאים 40% מכלל גוזלי הפינגווינים.',
          tfFalse: 'במפרץ שקט נמצאים 60% מכלל גוזלי הפינגווינים.',
          mistake: 'תלמיד כתב שהחלק של מפרץ שקט הוא 60%, כי יש שם 60 גוזלים.',
          mistakeAnswer: 'הטעות: 60 הוא מספר הגוזלים, לא אחוז. מחלקים בסך הכול: ' + inline('60/150=40\\%') + '.'
        };
      }
      case 'source_grade_raw_to_table': {
        const rows = [[6, 2], [7, 4], [8, 1], [9, 3]];
        const visual = tableHtml(['ציון', 'תדירות'], rows);
        return {
          visual: visual,
          question: 'לפניכם ציונים גולמיים: ' + inline('6,6,7,7,7,7,8,9,9,9') + '. ארגנו בטבלת שכיחויות ומצאו את השכיח.',
          answer: visual + '\nהשכיח הוא הציון בעל התדירות הגבוהה ביותר: ' + inline('7') + ' הופיע 4 פעמים.',
          mcqQuestion: 'מהו השכיח ברשימת הציונים?',
          choices: [{ text: inline('7'), correct: true }, { text: inline('9'), correct: false }, { text: inline('8'), correct: false }, { text: inline('10'), correct: false }],
          tfTrue: 'השכיח ברשימת הציונים הוא 7.',
          tfFalse: 'השכיח ברשימת הציונים הוא 9, כי הוא הציון הגבוה ביותר.',
          mistake: 'תלמיד אמר שהשכיח הוא 9 כי זה הציון הגדול ביותר ברשימה.',
          mistakeAnswer: 'הטעות: שכיח נקבע לפי מספר הופעות, לא לפי גודל הערך. 7 מופיע 4 פעמים ולכן הוא השכיח.'
        };
      }
      case 'source_clubs_missing_frequency': {
        const visual = multiVisual([
          tableHtml(['חוג', 'אחוז', 'מספר תלמידים'], [['תיאטרון', '10%', '?'], ['מחול', '35%', '?'], ['מחשבים', '15%', '?'], ['ספורט', '40%', 80]]),
          barSvg([{ k: 'תיאטרון', v: 20, show: false }, { k: 'מחול', v: 70 }, { k: 'מחשבים', v: 30, show: false }, { k: 'ספורט', v: 80 }], 'חוגים אחרי שעות הלימודים', 'מספר תלמידים', { max: 90 })
        ]);
        return {
          visual: visual,
          question: 'בסקר חוגים 40% מהתלמידים בחרו ספורט, וזה 80 תלמידים. השלימו את מספר התלמידים בכל חוג לפי האחוזים.',
          answer: 'אם 40% הם 80 תלמידים, אז 100% הם ' + inline('80:0.4=200') + ' תלמידים. תיאטרון: ' + inline('10\\%\\cdot200=20') + ', מחול: ' + inline('35\\%\\cdot200=70') + ', מחשבים: ' + inline('15\\%\\cdot200=30') + ', ספורט: 80.',
          mcqQuestion: 'כמה תלמידים בחרו מחשבים?',
          choices: [{ text: '30 תלמידים', correct: true }, { text: '15 תלמידים', correct: false }, { text: '70 תלמידים', correct: false }, { text: '200 תלמידים', correct: false }],
          tfTrue: 'מספר התלמידים הכולל בסקר הוא 200.',
          tfFalse: 'מספר התלמידים הכולל בסקר הוא 80, כי זו העמודה הגבוהה ביותר.',
          mistake: 'תלמיד השלים "מחשבים: 15 תלמידים" כי בטבלה כתוב 15%.',
          mistakeAnswer: 'הטעות: 15% הוא חלק מתוך 200 תלמידים. לכן מחשבים: ' + inline('0.15\\cdot200=30') + '.'
        };
      }
      case 'given_probability_count': {
        const visual = tableHtml(['צבע עט', 'נתון'], [['כחול', inline('P=\\frac{2}{7}')], ['ורוד', 'פי 2 מכחול'], ['סך הכול', 28]]);
        return {
          visual: visual,
          question: 'במגירה 28 עטים. ההסתברות לשלוף עט כחול היא ' + inline('\\frac{2}{7}') + '. מספר העטים הוורודים כפול ממספר הכחולים. כמה עטים כחולים יש, ומה ההסתברות לוורוד?',
          answer: 'כחולים: ' + inline('\\frac{2}{7}\\cdot28=8') + '. ורודים: ' + inline('2\\cdot8=16') + '. לכן ' + inline('P(ורוד)=\\frac{16}{28}=\\frac{4}{7}') + '.',
          mcqQuestion: 'מה ההסתברות לשלוף עט ורוד?',
          choices: [{ text: inline('\\frac{4}{7}'), correct: true }, { text: inline('\\frac{2}{7}'), correct: false }, { text: inline('\\frac{16}{7}'), correct: false }, { text: inline('\\frac{8}{28}'), correct: false }],
          tfTrue: 'יש במגירה 8 עטים כחולים.',
          tfFalse: 'יש במגירה 2 עטים כחולים, כי המונה הוא 2.',
          mistake: 'תלמיד אמר שיש 2 עטים כחולים כי בהסתברות כתוב ' + inline('\\frac{2}{7}') + '.',
          mistakeAnswer: 'הטעות: המונה אינו מספר העטים כשסך הכול אינו 7. מחשבים ' + inline('\\frac{2}{7}\\cdot28=8') + '.'
        };
      }
      case 'weather_probability_complement': {
        const visual = tableHtml(['עיר', 'הסתברות לגשם'], [['ערד', 0.05], ['ירושלים', 0.50], ['חיפה', 0.90], ['תל אביב', 0]]);
        return {
          visual: visual,
          question: 'בטבלת תחזית הגשם: מה ההסתברות שלא ירד גשם בחיפה? האם נכון לבטל מרוץ בערד אם מבטלים רק כאשר ההסתברות לגשם גדולה מ-0.2?',
          answer: 'בחיפה: ' + inline('P(לא\\ גשם)=1-0.90=0.10') + '. בערד ההסתברות 0.05, והיא קטנה מ-0.2, לכן לפי כלל זה לא מבטלים. עדיין אפשר לשקול מידע נוסף כמו בטיחות ומסלול.',
          mcqQuestion: 'מה ההסתברות שלא ירד גשם בחיפה?',
          choices: [{ text: '0.10', correct: true }, { text: '0.90', correct: false }, { text: '0.50', correct: false }, { text: '1.90', correct: false }],
          tfTrue: 'אם בחיפה ההסתברות לגשם היא 0.90, ההסתברות שלא ירד גשם היא 0.10.',
          tfFalse: 'אם בירושלים ההסתברות לגשם היא 0.50, פירוש הדבר שחצי מהיום בטוח ירד גשם.',
          mistake: 'תלמיד פירש 0.50 כך: "חצי מהיום ירד גשם וחצי מהיום לא".',
          mistakeAnswer: 'הטעות: הסתברות 0.50 אינה מתארת בהכרח חצי יום. היא מתארת סיכוי או שכיחות לטווח ארוך במצבים דומים.'
        };
      }
      case 'fairness_symmetry_probability': {
        const visual = multiVisual([
          barSvg([{ k: '1', v: 1 }, { k: '2', v: 1 }, { k: '3', v: 1 }, { k: '4', v: 1 }, { k: '5', v: 1 }, { k: '6', v: 1 }], 'קובייה הוגנת', 'תוצאות שוות', { max: 1, h: 170 }),
          tableHtml(['מצב', 'האם מניחים סימטריה?'], [['קובייה הוגנת', 'כן'], ['קובייה עם מדבקה כבדה', 'לא'], ['מטבע לא שטוח', 'לא']])
        ]);
        return {
          visual: visual,
          question: 'מה ההסתברות לקבל 4 בקובייה הוגנת? האם אותה תשובה מובטחת אם מדבקה כבדה הודבקה על אחת הפאות?',
          answer: 'בקובייה הוגנת כל 6 הפאות סימטריות, לכן ' + inline('P(4)=\\frac{1}{6}') + '. אם מדבקה כבדה משנה את הסיכויים, לא מניחים סימטריה בלי בדיקה ניסויית.',
          mcqQuestion: 'מה נכון לגבי קובייה עם מדבקה כבדה?',
          choices: [{ text: 'לא בטוח שכל הפאות שוות הסתברות', correct: true }, { text: 'תמיד כל פאה היא 1/6', correct: false }, { text: 'ההסתברות ל-4 היא 4/6', correct: false }, { text: 'אין תוצאות אפשריות', correct: false }],
          tfTrue: 'בקובייה הוגנת ההסתברות לקבל 4 היא ' + inline('\\frac{1}{6}') + '.',
          tfFalse: 'בכל קובייה, גם אם היא משוקללת, ההסתברות לכל פאה חייבת להיות ' + inline('\\frac{1}{6}') + '.',
          mistake: 'תלמיד טען שגם במטבע עקום ההסתברות לעץ היא תמיד 0.5.',
          mistakeAnswer: 'הטעות: 0.5 נשען על סימטריה או על נתונים ניסויים. אם המטבע אינו סימטרי, אי אפשר להניח זאת מראש.'
        };
      }
      case 'forecast_interpretation': {
        const visual = barSvg([{ k: 'גשם', v: 30 }, { k: 'לא גשם', v: 70 }], 'פירוש תחזית 30%', 'ימים דומים מתוך 100', { max: 100 });
        return {
          visual: visual,
          question: 'תחזית אומרת: "הסתברות לגשם 30%". נסחו פירוש מתמטי נכון של המשפט.',
          answer: 'פירוש מתאים: בהרבה ימים או מצבים דומים עם תחזית 30%, בערך 30 מתוך 100 יסתיימו בגשם. זו אינה הבטחה שירד גשם 30% מהיום.',
          mcqQuestion: 'איזה פירוש נכון ל-30% גשם?',
          choices: [{ text: 'בכ-30 מתוך 100 מצבים דומים ירד גשם', correct: true }, { text: 'ירד גשם בדיוק 30% משעות היום', correct: false }, { text: 'בטוח שלא ירד גשם', correct: false }, { text: 'ירד גשם 70% מהיום', correct: false }],
          tfTrue: 'תחזית 30% מתארת שכיחות צפויה במצבים דומים רבים.',
          tfFalse: 'תחזית 30% אומרת שבהכרח ירד גשם במשך 30% משעות היום.',
          mistake: 'תלמיד אמר: "30% פירושו שירד גשם בדיוק 7.2 שעות".',
          mistakeAnswer: 'הטעות: הסתברות אינה חלוקת זמן ודאית ביום אחד. היא מתארת אי-ודאות לפני האירוע.'
        };
      }
      case 'source_transport_relative_decision': {
        const visual = multiVisual([
          barSvg([{ k: 'מכוניות', v: 25 }, { k: 'אוטובוסים', v: 10 }, { k: 'אופנועים', v: 5 }, { k: 'משאיות', v: 10 }], 'כלי רכב בעשר דקות', 'מספר כלי רכב', { max: 30 }),
          barSvg([{ k: 'מכוניות', v: 30 }, { k: 'אוטובוסים', v: 400 }, { k: 'אופנועים', v: 5 }, { k: 'משאיות', v: 10 }], 'אומדן נוסעים', 'מספר אנשים', { max: 420 })
        ]);
        return {
          visual: visual,
          question: 'ב-10 דקות נספרו 25 מכוניות, 10 אוטובוסים, 5 אופנועים ו-10 משאיות. האם נכון להסיק שמכוניות הן "עיקר התנועה" לצורך החלטה על נתיב תחבורה ציבורית? נמקו בעזרת תדירות יחסית והקשר.',
          answer: 'לפי כלי רכב, מכוניות הן ' + inline('\\frac{25}{50}=50\\%') + '. אבל לפי מספר אנשים ייתכן שאוטובוסים מובילים בהרבה: למשל 10 אוטובוסים עם כ-40 נוסעים הם כ-400 אנשים. החלטה תחבורתית צריכה לבדוק גם מספר נוסעים, לא רק מספר כלי רכב.',
          mcqQuestion: 'מהי הביקורת המרכזית על ההסקה "מכוניות הן עיקר התנועה"?',
          choices: [{ text: 'ספרו כלי רכב, לא מספר אנשים שמוסעים', correct: true }, { text: 'אי אפשר לחשב אחוזים מ-50', correct: false }, { text: '10 אוטובוסים הם יותר מ-25 מכוניות', correct: false }, { text: 'אין צורך בהקשר', correct: false }],
          tfTrue: 'לפי מספר כלי רכב בלבד, מכוניות הן 50% מהתצפית.',
          tfFalse: 'מספר כלי רכב מספיק תמיד כדי להחליט על עדיפות לנוסעים.',
          mistake: 'תלמיד אמר: "25 גדול מ-10, לכן מכוניות חשובות יותר מאוטובוסים".',
          mistakeAnswer: 'הטעות: זו השוואה מוחלטת בלי הקשר. אוטובוס אחד יכול להסיע הרבה יותר נוסעים ממכונית אחת.'
        };
      }
      case 'source_free_throw_relative_success': {
        const visual = tableHtml(['שחקן', 'קליעות', 'זריקות', 'אחוז הצלחה'], [['עידו', 12, 20, '60%'], ['נועם', 7, 10, '70%']]);
        return {
          visual: visual,
          question: 'עידו קלע 12 מתוך 20 זריקות, ונועם קלע 7 מתוך 10. מי הצליח יותר יחסית? בכמה נקודות אחוז? כמה קליעות נועם צריך מתוך 10 זריקות נוספות כדי להשתוות ל-60%?',
          answer: 'עידו: ' + inline('12/20=60\\%') + '. נועם: ' + inline('7/10=70\\%') + '. נועם גבוה ב-10 נקודות אחוז. כדי להיות בדיוק 60% אחרי 20 זריקות, נועם צריך 12 קליעות מתוך 20; כבר יש לו 7, לכן עליו לקלוע 5 מתוך 10 נוספות.',
          mcqQuestion: 'מי הצליח יותר יחסית?',
          choices: [{ text: 'נועם, 70% לעומת 60%', correct: true }, { text: 'עידו, כי 12 גדול מ-7', correct: false }, { text: 'שניהם 60%', correct: false }, { text: 'אי אפשר להשוות', correct: false }],
          tfTrue: 'נועם הצליח יותר יחסית למרות שקלע פחות קליעות מוחלטות.',
          tfFalse: 'עידו הצליח יותר כי 12 קליעות הן יותר מ-7 קליעות.',
          mistake: 'המאמן בחר בעידו רק כי 12 קליעות גדול מ-7.',
          mistakeAnswer: 'הטעות: מספר הניסיונות שונה. משווים אחוזי הצלחה: עידו 60%, נועם 70%.'
        };
      }
      case 'source_equal_relative_target': {
        const visual = tableHtml(['כיתה', 'אוהבים ספורט', 'מספר תלמידים', 'שיעור'], [['ז1', 20, 40, '50%'], ['ז2', 15, 25, '60%']]);
        return {
          visual: visual,
          question: 'בכיתה ז1 20 מתוך 40 אוהבים ספורט. בכיתה ז2 15 מתוך 25 אוהבים ספורט. כמה תלמידים בכיתה ז1 צריכים לאהוב ספורט כדי שהשיעור יהיה כמו בכיתה ז2?',
          answer: 'השיעור בכיתה ז2 הוא ' + inline('15/25=60\\%') + '. כדי שבכיתה ז1 יהיה 60%, צריך ' + inline('0.60\\cdot40=24') + ' תלמידים.',
          mcqQuestion: 'כמה תלמידים בכיתה ז1 צריכים לאהוב ספורט כדי להגיע ל-60%?',
          choices: [{ text: '24', correct: true }, { text: '20', correct: false }, { text: '15', correct: false }, { text: '40', correct: false }],
          tfTrue: 'כדי שז1 תגיע ל-60%, צריכים להיות 24 תלמידים שאוהבים ספורט.',
          tfFalse: 'כדי שז1 תגיע ל-60%, מספיקים 15 תלמידים כי זה המספר בז2.',
          mistake: 'תלמיד העתיק את המספר 15 מכיתה ז2 לכיתה ז1.',
          mistakeAnswer: 'הטעות: משווים שיעור, לא מספר מוחלט. בכיתה עם 40 תלמידים, 60% הם 24.'
        };
      }
      case 'source_football_bar_to_table': {
        const data = [{ k: '0', v: 6 }, { k: '1', v: 8 }, { k: '2', v: 12 }, { k: '3', v: 11 }, { k: '4', v: 7 }, { k: '5', v: 3 }, { k: '6', v: 2 }, { k: '7', v: 1 }];
        const visual = barSvg(data, 'מספר שערים במשחקי כדורגל', 'מספר משחקים', { max: 12, w: 360 });
        const table = tableHtml(['מספר שערים', 'תדירות'], data.map(function (d) { return [d.k, d.v]; }));
        return {
          visual: visual,
          question: 'המירו את דיאגרמת העמודות לטבלת שכיחויות. כמה משחקים היו בסך הכול?',
          answer: table + '\nסך המשחקים: ' + inline('6+8+12+11+7+3+2+1=50') + '.',
          mcqQuestion: 'כמה משחקים הסתיימו עם 2 שערים?',
          choices: [{ text: '12', correct: true }, { text: '2', correct: false }, { text: '50', correct: false }, { text: '11', correct: false }],
          tfTrue: 'היו 50 משחקים בסך הכול.',
          tfFalse: 'היו 12 משחקים בסך הכול, כי זו העמודה הגבוהה ביותר.',
          mistake: 'תלמיד כתב שהסך הכול הוא 12 כי זו העמודה הגבוהה ביותר.',
          mistakeAnswer: 'הטעות: 12 היא תדירות של קטגוריה אחת. סך הכול הוא סכום כל העמודות: 50.'
        };
      }
      case 'source_bottle_bar_chart': {
        const data = [{ k: 'א', v: 45 }, { k: 'ב', v: 60 }, { k: 'ג', v: 30 }, { k: 'ד', v: 75 }, { k: 'ה', v: 50 }];
        const visual = multiVisual([tableHtml(['יום', 'בקבוקים'], data.map(function (d) { return [d.k, d.v]; })), barSvg(data, 'איסוף בקבוקים לפי יום', 'מספר בקבוקים', { max: 80 })]);
        return {
          visual: visual,
          question: 'נתוני איסוף בקבוקים לפי ימים: 45, 60, 30, 75, 50. בנו דיאגרמת עמודות וציינו באיזה יום נאספו הכי הרבה בקבוקים.',
          answer: 'הדיאגרמה נבנית עם יום על ציר הקטגוריות ומספר בקבוקים כגובה העמודה. היום הגבוה ביותר הוא יום ד עם 75 בקבוקים. הסך: ' + inline('45+60+30+75+50=260') + '.',
          mcqQuestion: 'באיזה יום נאספו הכי הרבה בקבוקים?',
          choices: [{ text: 'יום ד', correct: true }, { text: 'יום ב', correct: false }, { text: 'יום ג', correct: false }, { text: 'יום ה', correct: false }],
          tfTrue: 'יום ד הוא היום בעל מספר הבקבוקים הגבוה ביותר.',
          tfFalse: 'יום ג הוא היום בעל מספר הבקבוקים הגבוה ביותר.',
          mistake: 'תלמיד קבע שיום ב הוא הגבוה ביותר כי הוא מופיע מוקדם יותר בטבלה.',
          mistakeAnswer: 'הטעות: משווים את הערכים. 75 ביום ד גדול מ-60 ביום ב.'
        };
      }
      case 'source_smartphone_missing_graph_table': {
        const rows = [[1, 3], [2, 5], [3, 8], [4, 3], [5, 1]];
        const visual = multiVisual([barSvg(rows.map(function (r) { return { k: String(r[0]), v: r[1] }; }), 'שימוש יומי ברשתות חברתיות', 'מספר תלמידים', { max: 9 }), tableHtml(['שעות שימוש', 'מספר תלמידים'], [[1, 3], [2, 5], [3, '?'], [4, '?'], [5, 1]])]);
        return {
          visual: visual,
          question: 'בדיאגרמה מוצגים 20 תלמידים. השלימו את הטבלה לשעות 3 ו-4, מצאו שכיח וממוצע.',
          answer: 'מהגרף: 3 שעות -> 8 תלמידים, 4 שעות -> 3 תלמידים. השכיח הוא 3 שעות. הממוצע: ' + inline('\\frac{1\\cdot3+2\\cdot5+3\\cdot8+4\\cdot3+5\\cdot1}{20}=\\frac{54}{20}=2.7') + ' שעות.',
          mcqQuestion: 'מהו השכיח בשעות השימוש?',
          choices: [{ text: '3 שעות', correct: true }, { text: '5 שעות', correct: false }, { text: '2.7 שעות', correct: false }, { text: '20 שעות', correct: false }],
          tfTrue: 'בטבלה החסרה, עבור 3 שעות יש 8 תלמידים.',
          tfFalse: 'בטבלה החסרה, עבור 4 שעות יש 8 תלמידים.',
          mistake: 'תלמיד אמר שהממוצע הוא 3 כי זו העמודה הגבוהה ביותר.',
          mistakeAnswer: 'הטעות: 3 הוא השכיח. ממוצע מחשבים כסכום משוקלל חלקי 20, והוא 2.7 שעות.'
        };
      }
      case 'source_favorite_color_total_from_pie': {
        const visual = pieSvg([{ k: 'אדום', p: 60 }, { k: 'צהוב', p: 25 }, { k: 'כחול', p: 15 }], 'צבע אהוב', -1);
        return {
          visual: visual,
          question: 'בתרשים עוגה: אדום 60%, צהוב 25%, כחול הוא החלק החסר. אם כחול מייצג 75 תלמידים, כמה תלמידים השתתפו בסקר?',
          answer: 'החלק החסר הוא ' + inline('100\\%-60\\%-25\\%=15\\%') + '. אם 15% הם 75 תלמידים, אז הסך הכול הוא ' + inline('75:0.15=500') + ' תלמידים.',
          mcqQuestion: 'כמה תלמידים השתתפו בסקר?',
          choices: [{ text: '500', correct: true }, { text: '75', correct: false }, { text: '450', correct: false }, { text: '15', correct: false }],
          tfTrue: 'החלק הכחול הוא 15%, ולכן הסך הכול הוא 500 תלמידים.',
          tfFalse: 'החלק הכחול הוא 25%, ולכן הסך הכול הוא 300 תלמידים.',
          mistake: 'תלמיד חילק 75 ב-60% כי אדום הוא החלק הגדול ביותר.',
          mistakeAnswer: 'הטעות: 75 תלמידים שייכים לחלק הכחול, שהוא 15%, לא לאדום. לכן ' + inline('75/0.15=500') + '.'
        };
      }
      case 'source_phone_ten_sector_model': {
        return {
          visual: tenSectorSvg(),
          question: 'חברת טלפונים בדקה 500 שיחות: 250 נענו, 100 לא נענו, 125 נותקו, 25 היו תפוסות. הציגו בטבלה ובדגם של 10 חלקים שווים.',
          answer: 'סך הכול 500. נענו: ' + inline('250/500=50\\%=5/10') + '. לא נענו: ' + inline('100/500=20\\%=2/10') + '. ניתוק: ' + inline('125/500=25\\%=2.5/10') + '. תפוס: ' + inline('25/500=5\\%=0.5/10') + '. בדגם 10 חלקים אפשר לסמן גם חצאי חלקים.',
          mcqQuestion: 'איזה חלק מהשיחות נענו?',
          choices: [{ text: '50%', correct: true }, { text: '25%', correct: false }, { text: '20%', correct: false }, { text: '5%', correct: false }],
          tfTrue: '125 מתוך 500 הם 25%, כלומר שניים וחצי חלקים מתוך 10.',
          tfFalse: '25 מתוך 500 הם 25%, כלומר רבע מהדגם.',
          mistake: 'תלמיד סימן "תפוס" כרבע מהדגם כי המספר 25 מופיע בנתונים.',
          mistakeAnswer: 'הטעות: 25 שיחות מתוך 500 הן 5%, לא 25%. צריך לחלק בסך הכול.'
        };
      }
      case 'source_club_missing_percent': {
        const visual = multiVisual([pieSvg([{ k: 'תיאטרון', p: 10 }, { k: 'מחול', p: 35 }, { k: 'מחשבים', p: 15 }, { k: 'ספורט', p: 40 }], 'חוגים', 1), tableHtml(['חוג', 'אחוז'], [['תיאטרון', '10%'], ['מחול', '?'], ['מחשבים', '15%'], ['ספורט', '40%']])]);
        return {
          visual: visual,
          question: 'בטבלת חוגים חסר האחוז של מחול: תיאטרון 10%, מחשבים 15%, ספורט 40%. מצאו את האחוז החסר.',
          answer: 'סכום כל האחוזים צריך להיות 100%. לכן ' + inline('100-10-15-40=35') + ', ומחול הוא 35%.',
          mcqQuestion: 'מהו האחוז של מחול?',
          choices: [{ text: '35%', correct: true }, { text: '65%', correct: false }, { text: '15%', correct: false }, { text: '40%', correct: false }],
          tfTrue: 'האחוז של מחול הוא 35%.',
          tfFalse: 'האחוז של מחול הוא 65%, כי מחסרים רק את ספורט.',
          mistake: 'תלמיד חיסר רק את 40% וקיבל 60%.',
          mistakeAnswer: 'הטעות: צריך לחסר את כל האחוזים הידועים: 10%, 15%, 40%.'
        };
      }
      case 'source_medicine_misleading_3d': {
        const visual = multiVisual([
          compareSvg([{ k: 'ראשקל', v: 82, fill: '#60a5fa' }, { k: 'בלי כאב', v: 88, fill: '#22c55e' }], 'גרף פרסומי קטוע/תלת-ממדי'),
          tableHtml(['תרופה', 'אחוז דיווח על הקלה'], [['ראשקל', '82%'], ['בלי כאב', '88%']])
        ]);
        return {
          visual: visual,
          question: 'במודעה לתרופה נראה ש"בלי כאב" טובה בהרבה מ"ראשקל". הנתונים הם 82% מול 88%. הסבירו מדוע הגרף עלול להטעות ומה ההפרש האמיתי.',
          answer: 'ההפרש האמיתי הוא 6 נקודות אחוז בלבד: ' + inline('88\\%-82\\%=6\\%') + '. גרף תלת-ממדי/קטוע יוצר רושם חזותי גדול מדי כי הגובה/נפח העמודות אינו נאמן להפרש.',
          mcqQuestion: 'מה ההפרש האמיתי בין התרופות?',
          choices: [{ text: '6 נקודות אחוז', correct: true }, { text: 'פי שניים', correct: false }, { text: '82 נקודות אחוז', correct: false }, { text: '88 נקודות אחוז', correct: false }],
          tfTrue: 'הגרף עלול להטעות כי ההפרש האמיתי הוא 6 נקודות אחוז בלבד.',
          tfFalse: 'הגרף מוכיח ש"בלי כאב" יעילה בערך פי שניים.',
          mistake: 'תלמיד הסיק מהגובה בתרשים ש"בלי כאב" יעילה פי שניים.',
          mistakeAnswer: 'הטעות: יש לבדוק את המספרים והציר. 88% לעומת 82% הוא הפרש של 6 נקודות אחוז, לא פי שניים.'
        };
      }
      case 'source_choose_graph_audience': {
        const visual = multiVisual([
          barSvg([{ k: 'ראשקל', v: 82 }, { k: 'בלי כאב', v: 88 }], 'גרף I: ציר 80%-90%', 'אחוז', { min: 80, max: 90 }),
          barSvg([{ k: 'ראשקל', v: 82 }, { k: 'בלי כאב', v: 88 }], 'גרף II: ציר 0%-100%', 'אחוז', { max: 100 })
        ]);
        return {
          visual: visual,
          question: 'מנהל שיווק צריך להדגיש למשקיעים את היתרון של תרופה חדשה, ועדת אתיקה רוצה ייצוג הוגן. איזה גרף מתאים לכל מטרה ומדוע?',
          answer: 'למשקיעים מנהל השיווק עשוי לבחור גרף עם ציר 80-90 כדי להבליט את ההפרש. לוועדת אתיקה מתאים גרף עם ציר 0-100, כי הוא מציג את 82% ו-88% בפרופורציה הוגנת.',
          mcqQuestion: 'איזה גרף הוגן יותר להצגת הנתונים?',
          choices: [{ text: 'גרף עם ציר 0%-100%', correct: true }, { text: 'גרף שמתחיל ב-80%', correct: false }, { text: 'גרף בלי מספרים', correct: false }, { text: 'גרף תלת-ממדי', correct: false }],
          tfTrue: 'גרף שמתחיל ב-80% יכול להדגיש הבדל קטן יותר מהמציאות הפרופורציונית.',
          tfFalse: 'שינוי נקודת ההתחלה של הציר אינו משנה את הרושם החזותי.',
          mistake: 'תלמיד אמר ששני הגרפים זהים כי המספרים זהים.',
          mistakeAnswer: 'הטעות: המספרים זהים, אבל ייצוג חזותי יכול להעצים או להקטין רושם. לכן בוחנים גם את הציר.'
        };
      }
      case 'source_representational_ethics': {
        const visual = tableHtml(['בחירה גרפית', 'השפעה אפשרית'], [['ציר קטוע', 'מגדיל רושם של הבדל'], ['ציר מלא מ-0', 'ייצוג יחסי יותר'], ['תלת-ממד', 'עלול ליצור הטיית נפח/פרספקטיבה']]);
        return {
          visual: visual,
          question: 'נסחו כלל עבודה לתלמידים: איך מזהים האם תרשים מנסה לשכנע במקום להציג נתונים בהגינות?',
          answer: 'בודקים: האם הציר מתחיל מ-0? האם יש קנה מידה ברור? האם תלת-ממד או נפח יוצרים רושם מוגזם? האם הכותרת מפרשת במקום לתאר? ייצוג הוגן נותן לקורא להשוות את המספרים בפרופורציה.',
          mcqQuestion: 'איזה סימן מחשיד תרשים מטעה?',
          choices: [{ text: 'ציר קטוע בלי הסבר', correct: true }, { text: 'כותרת ברורה', correct: false }, { text: 'מקרא צבעים', correct: false }, { text: 'מספרים ליד העמודות', correct: false }],
          tfTrue: 'תרשים תלת-ממדי יכול להטעות גם אם המספרים לידו נכונים.',
          tfFalse: 'אם בתרשים יש צבעים יפים, הוא בהכרח מדויק.',
          mistake: 'תלמיד אמר: "גרף לא יכול להטעות אם הוא מבוסס על מספרים אמיתיים".',
          mistakeAnswer: 'הטעות: מספרים אמיתיים יכולים להיות מוצגים בדרך שמעצימה רושם. צריך לבדוק צירים, קנה מידה ופרספקטיבה.'
        };
      }
      case 'source_average_total_reasoning': {
        const visual = tableHtml(['קבוצה', 'מספר ערכים', 'ממוצע'], [['a,b,c,d', 4, 9], ['e,f', 2, 6]]);
        return {
          visual: visual,
          question: 'הממוצע של ארבעה מספרים הוא 9, והממוצע של שני מספרים אחרים הוא 6. מה סכום כל ששת המספרים ומה הממוצע הכולל?',
          answer: 'סכום ארבעת הראשונים: ' + inline('4\\cdot9=36') + '. סכום שני האחרים: ' + inline('2\\cdot6=12') + '. סך הכול ' + inline('48') + ', ולכן הממוצע הכולל ' + inline('48/6=8') + '.',
          mcqQuestion: 'מה הממוצע הכולל של ששת המספרים?',
          choices: [{ text: '8', correct: true }, { text: '7.5', correct: false }, { text: '15', correct: false }, { text: '9', correct: false }],
          tfTrue: 'הממוצע הכולל הוא 8.',
          tfFalse: 'הממוצע הכולל הוא 7.5 כי מחשבים ממוצע פשוט של 9 ו-6.',
          mistake: 'תלמיד חישב ' + inline('(9+6)/2=7.5') + ' כממוצע הכולל.',
          mistakeAnswer: 'הטעות: הקבוצות אינן באותו גודל. צריך לעבוד עם סכומים: 36 ו-12.'
        };
      }
      case 'source_shell_average_constraints': {
        return {
          visual: tableHtml(['נתון', 'משמעות'], [['5 ילדים', 'כמות הערכים'], ['ממוצע 30 צדפים', 'סך הכול 150 צדפים']]),
          question: 'חמישה ילדים אספו בממוצע 30 צדפים. מה הסך הכול? האם ייתכן שילד אחד אסף יותר מ-30? האם ייתכן שכל הילדים אספו פחות מ-30?',
          answer: 'הסך הכול הוא ' + inline('5\\cdot30=150') + '. ייתכן שילד אחד אסף יותר מ-30, למשל 20,25,30,35,40. לא ייתכן שכל הילדים אספו פחות מ-30, כי אז הסכום היה קטן מ-150 והממוצע קטן מ-30.',
          mcqQuestion: 'איזו טענה נכונה?',
          choices: [{ text: 'לא ייתכן שכל הילדים אספו פחות מ-30', correct: true }, { text: 'כל ילד חייב לאסוף בדיוק 30', correct: false }, { text: 'הסך הכול הוא 30', correct: false }, { text: 'אי אפשר שילד אחד אסף יותר מ-30', correct: false }],
          tfTrue: 'הממוצע 30 אינו מחייב שכל ילד אסף בדיוק 30.',
          tfFalse: 'אם הממוצע 30, כל ילד אסף בדיוק 30.',
          mistake: 'תלמיד אמר: "ממוצע 30 אומר שכל ילד אסף 30 צדפים".',
          mistakeAnswer: 'הטעות: ממוצע הוא חלוקה שווה תאורטית של הסכום. נתונים שונים יכולים לתת אותו ממוצע.'
        };
      }
      case 'source_satisfaction_survey_measures': {
        const visual = barSvg([{ k: '5', v: 90 }, { k: '4', v: 50 }, { k: '3', v: 80 }, { k: '2', v: 20 }, { k: '1', v: 10 }], 'שביעות רצון מטיול', 'מספר תלמידים', { max: 90 });
        return {
          visual: visual,
          question: 'בדיאגרמה מוצגות תשובות שביעות רצון 1-5: 5->90, 4->50, 3->80, 2->20, 1->10. כמה תלמידים השתתפו ומהו השכיח?',
          answer: 'סך הכול: ' + inline('90+50+80+20+10=250') + '. השכיח הוא 5 כי זו התדירות הגבוהה ביותר. הממוצע: ' + inline('\\frac{5\\cdot90+4\\cdot50+3\\cdot80+2\\cdot20+1\\cdot10}{250}=3.76') + '.',
          mcqQuestion: 'מהו השכיח?',
          choices: [{ text: '5', correct: true }, { text: '3.76', correct: false }, { text: '250', correct: false }, { text: '1', correct: false }],
          tfTrue: 'השכיח הוא 5 כי 90 תלמידים סימנו 5.',
          tfFalse: 'השכיח הוא 3 כי הוא באמצע הסולם.',
          mistake: 'תלמיד קבע שהשכיח הוא 3 כי 3 הוא אמצע סולם 1-5.',
          mistakeAnswer: 'הטעות: שכיח נקבע לפי התדירות הגבוהה ביותר, לא לפי מיקום בסולם.'
        };
      }
      case 'source_combined_mean_groups':
        return sourceCase('source_average_total_reasoning');
      case 'source_salary_outlier_measures': {
        const visual = tableHtml(['שכר', 'תדירות'], [[5000, 4], [5200, 5], [9000, 1]]);
        return {
          visual: visual,
          question: 'בסדנה 4 עובדים מרוויחים 5000, 5 עובדים מרוויחים 5200, ומנהל מרוויח 9000. מצאו שכיח, חציון וממוצע. מה יקרה לממוצע אם שכר המנהל יעלה ב-2000?',
          answer: 'השכיח: 5200. יש 10 עובדים, והנתונים ה-5 וה-6 אחרי מיון הם 5200, לכן החציון 5200. סכום השכר: ' + inline('4\\cdot5000+5\\cdot5200+9000=55000') + ', ממוצע ' + inline('55000/10=5500') + '. אם המנהל מקבל עוד 2000, הסכום 57000 והממוצע 5700; החציון והשכיח אינם משתנים.',
          mcqQuestion: 'מהו הממוצע לפני העלאת שכר המנהל?',
          choices: [{ text: '5500', correct: true }, { text: '5200', correct: false }, { text: '9000', correct: false }, { text: '5700', correct: false }],
          tfTrue: 'העלאת שכר המנהל ב-2000 מעלה את הממוצע ב-200.',
          tfFalse: 'העלאת שכר המנהל ב-2000 מעלה את החציון ל-7200.',
          mistake: 'תלמיד אמר שהחציון משתנה כי השכר הגבוה גדל.',
          mistakeAnswer: 'הטעות: החציון נקבע לפי האמצע אחרי מיון. שינוי הערך האחרון לא משנה את שני הערכים האמצעיים.'
        };
      }
      case 'source_monkey_reverse_measures': {
        const data = [74, 74, 80, 93, 104];
        return {
          visual: barSvg(data.map(function (v, i) { return { k: 'ק' + (i + 1), v: v }; }), 'משקלי קופים', 'ק"ג', { max: 110 }),
          question: 'לחמישה קופים: טווח 30 ק"ג, שכיח 74, חציון 80, ממוצע 85. מצאו קבוצה אפשרית של משקלים. מה יקרה אם נוסיף 10 ק"ג לכל משקל?',
          answer: 'קבוצה אפשרית: ' + inline('74,74,80,93,104') + '. הטווח ' + inline('104-74=30') + ', השכיח 74, החציון 80, הסכום 425 ולכן הממוצע 85. אחרי הוספת 10 לכל אחד: הממוצע 95, החציון 90, והטווח נשאר 30.',
          mcqQuestion: 'מה קורה לטווח אם מוסיפים 10 לכל המשקלים?',
          choices: [{ text: 'נשאר 30', correct: true }, { text: 'נהיה 40', correct: false }, { text: 'נהיה 95', correct: false }, { text: 'נהיה 10', correct: false }],
          tfTrue: 'כאשר מוסיפים אותו מספר לכל הנתונים, הטווח נשאר קבוע.',
          tfFalse: 'כאשר מוסיפים 10 לכל הנתונים, הטווח גדל ב-10.',
          mistake: 'תלמיד הוסיף 10 גם לטווח וקיבל 40.',
          mistakeAnswer: 'הטעות: גם המקסימום וגם המינימום גדלים ב-10, ולכן ההפרש ביניהם אינו משתנה.'
        };
      }
      case 'source_smartphone_distribution_measures':
        return sourceCase('source_smartphone_missing_graph_table');
      case 'source_flower_field_measures': {
        const visual = tableHtml(['גובה', 'שדה א', 'שדה ב', 'שדה ג'], [[50, 320, 280, 280], [55, 560, 320, 320], [60, 480, 400, 360], [65, 400, 550, 400], [70, 360, 400, 480], [75, 320, 320, 560], [80, 280, 280, 320]]);
        return {
          visual: visual,
          question: 'בטבלת גבהי פרחים בשלושה שדות, קבעו באיזה שדה הממוצע צפוי להיות הגדול ביותר ובאיזה הקטן ביותר. השוו גם שכיח.',
          answer: 'שדה א מרוכז יותר בגבהים נמוכים והשכיח שלו 55; שדה ב סימטרי סביב 65 והשכיח 65; שדה ג מרוכז יותר בגבהים גבוהים והשכיח 75. לכן הממוצע הגדול ביותר צפוי בשדה ג, והקטן ביותר בשדה א.',
          mcqQuestion: 'באיזה שדה הממוצע צפוי להיות הגדול ביותר?',
          choices: [{ text: 'שדה ג', correct: true }, { text: 'שדה א', correct: false }, { text: 'שדה ב', correct: false }, { text: 'כולם שווים', correct: false }],
          tfTrue: 'שדה ג צפוי להיות בעל ממוצע גבוה יותר משדה א.',
          tfFalse: 'שדה א צפוי להיות בעל ממוצע גבוה ביותר כי יש בו 560 פרחים.',
          mistake: 'תלמיד בחר בשדה א כי המספר 560 הוא התדירות הגדולה ביותר בטבלה.',
          mistakeAnswer: 'הטעות: צריך לבדוק באיזה גובה נמצאת התדירות. בשדה א השיא בגובה 55, ובשדה ג השיא בגובה 75.'
        };
      }
      case 'source_interpolation_extrapolation': {
        const visual = multiVisual([
          tableHtml(['שבוע', 'זמן ריצה ל-5 ק"מ'], [[1, 36], [2, '?'], [3, 32], [4, 30]]),
          lineSvg([{ x: '1', y: 36 }, { x: '2', y: 34 }, { x: '3', y: 32 }, { x: '4', y: 30 }], 'התקדמות רץ באימון', 'שבוע', 'דקות', { minY: 28, maxY: 38 })
        ]);
        return {
          visual: visual,
          question: 'בטבלת זמן ריצה: שבוע 1 = 36 דקות, שבוע 2 חסר, שבוע 3 = 32, שבוע 4 = 30. אמדו את שבוע 2 באינטרפולציה וכתבו האם בטוח שהמגמה תימשך.',
          answer: 'בין שבוע 1 לשבוע 3 הירידה היא 4 דקות בשני שבועות, כלומר כ-2 דקות לשבוע. לכן אומדן לשבוע 2 הוא 34 דקות. זו אקסטרפולציה/מגמה אם ממשיכים קדימה, והיא אינה ודאית כי קצב השיפור יכול להשתנות.',
          mcqQuestion: 'מה אומדן הזמן בשבוע 2?',
          choices: [{ text: '34 דקות', correct: true }, { text: '32 דקות', correct: false }, { text: '36 דקות', correct: false }, { text: '30 דקות', correct: false }],
          tfTrue: '34 דקות הוא אומדן סביר לשבוע 2 לפי שינוי לינארי בין שבועות 1 ו-3.',
          tfFalse: 'אם הקצב היה 2 דקות לשבוע, בטוח שגם בעתיד הירידה תימשך לנצח.',
          mistake: 'תלמיד אמר: "בשבוע 5 הזמן יהיה בוודאות 28 דקות".',
          mistakeAnswer: 'הטעות: המשך קדימה הוא אקסטרפולציה. אפשר לאמוד לפי מגמה, אבל אין ודאות שהקצב יישמר.'
        };
      }
      case 'source_satisfaction_probability': {
        const visual = barSvg([{ k: '5', v: 90 }, { k: '4', v: 50 }, { k: '3', v: 80 }, { k: '2', v: 20 }, { k: '1', v: 10 }], 'שביעות רצון מטיול', 'מספר תלמידים', { max: 90 });
        return {
          visual: visual,
          question: 'בסקר שביעות רצון היו 250 תלמידים. כמה ההסתברות לבחור באקראי תלמיד שסימן 5? ומה ההסתברות שסימן 3 או 4?',
          answer: inline('P(5)=90/250=36\\%') + '. עבור 3 או 4: ' + inline('(80+50)/250=130/250=52\\%') + '.',
          mcqQuestion: 'מה ההסתברות שסומן 3 או 4?',
          choices: [{ text: '52%', correct: true }, { text: '36%', correct: false }, { text: '90%', correct: false }, { text: '250%', correct: false }],
          tfTrue: 'ההסתברות שסומן 5 היא 36%.',
          tfFalse: 'ההסתברות שסומן 3 או 4 היא 130%.',
          mistake: 'תלמיד חיבר 80+50 וקבע שההסתברות היא 130%.',
          mistakeAnswer: 'הטעות: 130 הוא מספר תלמידים. הסתברות מחלקים בסך הכול 250.'
        };
      }
      case 'source_weather_probability_table':
        return sourceCase('weather_probability_complement');
      case 'source_athletics_multi_source': {
        const visual = multiVisual([
          lineSvg([{ x: '1', y: 0.5 }, { x: '2', y: 1.2 }, { x: '3', y: 2.4 }, { x: '4', y: 1.8 }], 'מהירות רוח בקפיצות', 'קפיצה', 'מ/ש', { minY: 0, maxY: 3, stroke: '#1d4ed8' }),
          tableHtml(['קופץ', 'קפיצה 1', 'קפיצה 2', 'קפיצה 3', 'קפיצה 4'], [['יואב', 6.20, 6.45, 6.80, 6.50], ['דניאל', 5.90, 6.10, 6.30, 6.15], ['רון', 6.00, 'פסילה', 6.95, 6.40]])
        ]);
        return {
          visual: visual,
          question: 'בתחרות קפיצה, קפיצה חוקית רק אם מהירות הרוח אינה עולה על 2.0 מ/ש. לפי הגרף והטבלה: איזו קפיצה אינה חוקית בגלל רוח, ומה המרחק החוקי הטוב ביותר של יואב?',
          answer: 'מהגרף, קפיצה 3 הייתה ברוח 2.4 מ/ש ולכן אינה חוקית. אצל יואב המרחקים החוקיים הם 6.20, 6.45, 6.50; הטוב ביותר הוא 6.50 מ. לכן 6.80 לא נחשב בגלל הרוח.',
          mcqQuestion: 'מה המרחק החוקי הטוב ביותר של יואב?',
          choices: [{ text: '6.50 מ', correct: true }, { text: '6.80 מ', correct: false }, { text: '6.45 מ', correct: false }, { text: '6.20 מ', correct: false }],
          tfTrue: 'קפיצה 3 אינה חוקית כי הרוח הייתה 2.4 מ/ש.',
          tfFalse: 'קפיצה 3 חוקית כי 2.4 קטן מ-2.0.',
          mistake: 'רון טען שהקפיצה 6.95 מ צריכה לנצח כי היא הארוכה ביותר.',
          mistakeAnswer: 'הטעות: צריך לשלב שני מקורות מידע. קפיצה 3 הייתה ברוח מעל המותר, ולכן אינה נחשבת.'
        };
      }
      case 'source_coffee_multi_source': {
        const visual = multiVisual([
          pieSvg([{ k: 'פולי קפה', p: 30 }, { k: 'שכר', p: 40 }, { k: 'שכירות', p: 20 }, { k: 'חלב וכוסות', p: 10 }], 'פירוק עלות כוס קפה בינואר', -1),
          lineSvg([{ x: 'Jan', y: 50 }, { x: 'Feb', y: 55 }, { x: 'Mar', y: 60 }, { x: 'Apr', y: 75 }, { x: 'May', y: 90 }, { x: 'Jun', y: 100 }], 'מחיר פולי קפה לק"ג', 'חודש', 'ש"ח', { minY: 45, maxY: 105, stroke: '#ef4444' })
        ]);
        return {
          visual: visual,
          question: 'מקור 1: בינואר עלות כוס קפה היא 10 ש"ח, ומתוכה פולי קפה הם 30%. מקור 2: מחיר הפולים עלה מ-50 בינואר ל-100 ביוני. אם רק רכיב הפולים השתנה, מה תהיה העלות החדשה לכוס?',
          answer: 'רכיב הפולים בינואר: ' + inline('30\\%\\cdot10=3') + ' ש"ח. מחיר הפולים עלה מ-50 ל-100, כלומר הוכפל. רכיב הפולים נהיה 6 ש"ח. שאר העלויות נשארות 7 ש"ח, לכן עלות חדשה: ' + inline('6+7=13') + ' ש"ח.',
          mcqQuestion: 'מה העלות החדשה לכוס אם רק רכיב הפולים הוכפל?',
          choices: [{ text: '13 ש"ח', correct: true }, { text: '20 ש"ח', correct: false }, { text: '10 ש"ח', correct: false }, { text: '3 ש"ח', correct: false }],
          tfTrue: 'אם רק רכיב הפולים הוכפל, העלות הכוללת עולה מ-10 ל-13 ש"ח.',
          tfFalse: 'אם מחיר הפולים הוכפל, כל עלות הכוס מוכפלת ל-20 ש"ח.',
          mistake: 'תלמיד הכפיל את כל מחיר הכוס מ-10 ל-20.',
          mistakeAnswer: 'הטעות: רק 30% מהעלות הם פולי קפה. לכן רק רכיב של 3 ש"ח מוכפל ל-6.'
        };
      }
      case 'source_ticket_sales_extrapolation': {
        const visual = lineSvg([{ x: '10:00', y: 200 }, { x: '12:00', y: 340 }, { x: '14:00', y: 480 }], 'מכירת כרטיסים במהלך היום', 'שעה', 'כרטיסים', { minY: 150, maxY: 650 });
        return {
          visual: visual,
          question: 'בגרף מכירת כרטיסים: 10:00 -> 200, 12:00 -> 340, 14:00 -> 480. מה קצב הגידול הממוצע בכל שעתיים, ומה אומדן ל-16:00 אם המגמה תימשך?',
          answer: 'בכל שעתיים נוספו ' + inline('340-200=140') + ' וגם ' + inline('480-340=140') + ' כרטיסים. אם המגמה תימשך, ב-16:00 נאמוד ' + inline('480+140=620') + '. זה אומדן, לא ודאות.',
          mcqQuestion: 'מה אומדן המכירות ל-16:00 לפי אותה מגמה?',
          choices: [{ text: '620', correct: true }, { text: '480', correct: false }, { text: '140', correct: false }, { text: '760', correct: false }],
          tfTrue: 'האומדן ל-16:00 הוא 620 כרטיסים אם המגמה תימשך.',
          tfFalse: 'האומדן ל-16:00 הוא ודאות מוחלטת, כי יש גרף.',
          mistake: 'תלמיד אמר שכל נקודה עתידית בגרף היא ודאית.',
          mistakeAnswer: 'הטעות: קריאה קדימה לפי מגמה היא אקסטרפולציה. אפשר לאמוד, אך נתונים עתידיים יכולים להשתנות.'
        };
      }
      default:
        return null;
    }
  }

  function make(id, diff, qtype, family) {
    const fam = family || chooseFamily(id, diff || 'standard');
    const c = sourceCase(fam);
    if (!c) return null;
    return render(qtype || 'open', c, fam);
  }
  E.generateUncertaintySourceDeepExercise = make;

  function asExercise(id, diff, qtype, family) {
    const r = make(id, diff, qtype, family);
    if (!r) return null;
    const m = {
      'U7-01-ENGINE': ['טבלת תדירות ממקור 06', 'כיתה ז׳'],
      'U7-02-ENGINE': ['הסתברות בסיסית ממקור 06', 'כיתה ז׳'],
      'U7-03-ENGINE': ['השוואה יחסית ממקור 06', 'כיתה ז׳'],
      'U7-04-ENGINE': ['קריאת ייצוגי נתונים ממקור 06', 'כיתה ז׳'],
      'U7-05-ENGINE': ['דיאגרמות עוגה ושכיחות יחסית ממקור 06', 'כיתה ז׳'],
      'U7-06-ENGINE': ['ביקורת ייצוגים ממקור 06', 'כיתה ז׳'],
      'U7-08-ENGINE': ['מדדים סטטיסטיים ממקור 06', 'כיתה ז׳'],
      'U8-01-ENGINE': ['ממוצע חציון וטווח ממקור 06', 'כיתה ח׳'],
      'U8-02-ENGINE': ['הסתברות ורב-מקור ממקור 06', 'כיתה ח׳']
    }[id] || ['אי-ודאות ממקור 06', 'כיתה ז׳'];
    const cl = r.questionHTML && r.questionHTML.match(/mcq-choice mcq-correct"><span class="mcq-label">([^<]+)\./);
    return {
      id: id, title: m[0], qtype: qtype || 'open', gradeTag: m[1], domainTag: 'אי-ודאות', cls: 'unc',
      questionHTML: r.questionHTML, answerHTML: r.answerHTML, correctLabel: cl ? cl[1] : null,
      questionFamily: r.questionFamily
    };
  }

  const oldGet = E.getEngineExercise;
  E.getEngineExercise = function (id, diff, qtype, opts) {
    if (FAMILY_MAP[id] && shouldUse(id, diff || 'standard', opts || {})) {
      const forcedFamily = opts && opts.sourceDeepFamily;
      return asExercise(id, diff || 'standard', qtype || 'open', forcedFamily);
    }
    return typeof oldGet === 'function' ? oldGet(id, diff, qtype, opts) : null;
  };

  function wrapPilot(id, fnName) {
    const old = E[fnName];
    if (typeof old !== 'function') return;
    E[fnName] = function (diff, qtype) {
      if (shouldUse(id, diff || 'standard', {})) {
        const r = make(id, diff || 'standard', qtype || 'open');
        if (r) return r;
      }
      return old(diff, qtype);
    };
  }
  wrapPilot('U7-01-ENGINE', 'generateU701Engine');
  wrapPilot('U7-02-ENGINE', 'generateU702Engine');
  wrapPilot('U8-01-ENGINE', 'generateU801Engine');
  wrapPilot('U8-02-ENGINE', 'generateU802Engine');

  if (typeof generators !== 'undefined') {
    Object.keys(FAMILY_MAP).forEach(function (id) {
      const title = (id.indexOf('U8-') === 0 ? 'אי-ודאות כיתה ח׳' : 'אי-ודאות כיתה ז׳') + ' — מקור 06';
      generators[id] = function () {
        const d = (document.getElementById('selDiff') && document.getElementById('selDiff').value) ||
          (document.getElementById('sl') && document.getElementById('sl').value) || 'standard';
        const q = (document.getElementById('selQType') && document.getElementById('selQType').value) || 'open';
        const ex = E.getEngineExercise(id, d, q, { forceUncertaintySourceDeep: true });
        if (ex) E.renderEngineCard(id, title, { questionHTML: ex.questionHTML, answerHTML: ex.answerHTML });
      };
    });
  }
})();
