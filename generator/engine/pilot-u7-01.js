// generator/engine/pilot-u7-01.js
// U7-01 Frequency Table — Smart Engine
// Source: source-learning/2026-06-09/06_uncertainty_domain_curriculum_examples.learning.md
// (Pattern U-01 frequency table; Patterns U-02/U-03 bar chart construct/read:
//  "מה היה [ערך] ב[קטגוריה]? באיזה [קטגוריה] הגבוה/הנמוך ביותר? כמה בסך הכל?")
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const TABLES = [
    {vals:[60,70,80,90,100], counts:[4,5,6,3,2], total:20, label:'ציון'},
    {vals:[55,65,75,85,95],  counts:[3,4,8,3,2], total:20, label:'ציון'},
    {vals:[1,2,3,4,5],       counts:[2,5,6,4,3], total:20, label:'מספר אחים'},
    {vals:[0,1,2,3],         counts:[6,8,4,2],   total:20, label:'מספר חוגים'}
  ];
  // Bar-chart datasets (pattern U-02/U-03): 4–5 Hebrew categories, school survey
  // contexts as in file 06; every count distinct so "highest/lowest" is unambiguous.
  const CHARTS = [
    {cats:['אופניים','הליכה','אוטובוס','רכב'], counts:[6,9,4,2], thing:'תלמידים', title:'דרך ההגעה לבית הספר'},
    {cats:['כדורגל','כדורסל','שחייה','ריקוד','שחמט'], counts:[7,5,4,6,3], thing:'תלמידים', title:'החוג המועדף'},
    {cats:['יום א','יום ב','יום ג','יום ד','יום ה'], counts:[3,8,5,10,6], thing:'ספרים שהושאלו', title:'השאלות בספרייה'},
    {cats:['תפוח','בננה','ענבים','אבטיח'], counts:[8,5,3,7], thing:'תלמידים', title:'הפרי המועדף'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['read_freq','most_frequent','rel_freq','bar_chart_read','pie_chart_read_or_construct']);
    if(diff === 'challenge') return E.pick(['missing_freq','compare_groups_relative_frequency','pie_chart_read_or_construct','misleading_graph_critique','compare_groups_relative_frequency','misleading_graph_critique']);
    return E.pick(['read_freq','most_frequent','total_check','missing_freq','rel_freq','bar_chart_read','compare_groups_relative_frequency','pie_chart_read_or_construct','misleading_graph_critique']);
  }
  function gcd(a,b){ return b ? gcd(b,a%b) : a; }

  // Pattern U-05 (file 06) — the misconception trap is GUARANTEED in every
  // case: group A always has the larger absolute count but the LOWER rate;
  // group B has fewer in absolute terms but the higher rate (k/n).
  const COMPARE_CTX = [
    {g1:'כיתה א׳',g2:'כיתה ב׳',what:'מתעמלים',adj:'ספורטיבית'},
    {g1:'כיתה ז׳1',g2:'כיתה ז׳2',what:'קוראים ספר מדי ערב',adj:'קוראת'},
    {g1:'שכבת ז׳',g2:'שכבת ח׳',what:'משתתפים בחוג מדעים',adj:'מדעית'}
  ];
  function caseCompareGroups(){
    // clean percentages: nA from 20..40 (mult. of 10/20/25...), rates as exact %
    const nA = E.pick([20,25,30,40]);
    const rA = E.pick([20,25,30,40]);               // lower rate, big group
    const rB = E.pick([50,60,70,80]);               // higher rate, small group
    const nB = E.pick([10,15,20].filter(n=>n<nA));
    let kA = nA*rA/100, kB = nB*rB/100;
    if(!Number.isInteger(kA) || !Number.isInteger(kB) || kA<=kB) return caseCompareGroups();
    const ctx = E.pick(COMPARE_CTX);
    return {nA:nA,kA:kA,rA:rA,nB:nB,kB:kB,rB:rB,ctx:ctx};
  }

  // Pattern U-06 (file 06): 3–5 categories with percentages → pie chart.
  // Central angle = percent × 3.6°; percentages are distinct and sum to 100.
  const PIES = [
    {cats:['כדורגל','שחייה','ריקוד','אחר'], pcts:[50,25,15,10], thing:'החוג המועדף'},
    {cats:['אוטובוס','הליכה','אופניים','רכב'], pcts:[40,30,20,10], thing:'דרך ההגעה לבית הספר'},
    {cats:['מדע בדיוני','עיון','שירה'], pcts:[50,30,20], thing:'סוג הספר המועדף'},
    {cats:['פיצה','פסטה','סלט','מרק','אחר'], pcts:[35,25,20,15,5], thing:'המנה המועדפת'},
    {cats:['חתול','כלב','דג','תוכי'], pcts:[45,30,15,10], thing:'חיית המחמד'}
  ];
  // Pattern U-07 (file 06): published-looking chart whose y-axis starts above 0.
  // Values are close; the truncated axis makes the gap look dramatic.
  const MISLEADING = [
    {labels:['2023','2024'], values:[50,54], yStart:48, title:'מכירות החנות (אלפי ש"ח)',
     lookRatio:'פי שלושה', realPct:8},
    {labels:['כיתה א','כיתה ב'], values:[72,78], yStart:70, title:'ממוצע הציונים',
     lookRatio:'פי ארבעה', realPct:8},
    {labels:['ינואר','פברואר'], values:[40,44], yStart:38, title:'מספר המנויים בחדר הכושר',
     lookRatio:'פי שלושה', realPct:10}
  ];

  function setup(family, diff){
    if(family==='pie_chart_read_or_construct'){
      const p = E.pick(PIES);
      const idx = Math.floor(Math.random()*p.cats.length);
      const sub = diff==='basic' ? 'angle'
        : diff==='challenge' ? E.pick(['missing_pct','compare'])
        : E.pick(['angle','two_angles']);
      return {p:p, idx:idx, sub:sub};
    }
    if(family==='misleading_graph_critique'){
      const m = E.pick(MISLEADING);
      const sub = diff==='basic' ? 'truncated'
        : diff==='challenge' ? 'both'
        : E.pick(['truncated','fair_vs']);
      return {m:m, sub:sub};
    }
    if(family==='compare_groups_relative_frequency') return caseCompareGroups();
    if(family==='bar_chart_read'){
      const c = E.pick(CHARTS);
      const idx = Math.floor(Math.random()*c.cats.length);
      const sub = E.pick(['value','extreme','total']);
      const hi = Math.random()<0.5;
      return {c:c, idx:idx, sub:sub, hi:hi};
    }
    const t = E.pick(TABLES);
    const idx = Math.floor(Math.random()*t.vals.length);
    return {t:t, idx:idx};
  }
  function chartTotal(c){ return c.counts.reduce((a,b)=>a+b,0); }
  function chartExtreme(c,hi){
    const v = hi ? Math.max.apply(null,c.counts) : Math.min.apply(null,c.counts);
    return c.cats[c.counts.indexOf(v)];
  }

  function tableSvg(t, hideIdx){
    const rows = t.vals.map((v,i)=>[v, hideIdx===i ? '?' : t.counts[i]]);
    return E.freqTableHtml([t.label,'תדירות'], rows);
  }

  function pieAngle(pct){ return pct*3.6; }

  function choices(family,s){
    if(family==='pie_chart_read_or_construct'){
      const p=s.p;
      if(s.sub==='missing_pct'){
        const correct=p.pcts[s.idx];
        const wrongs=[correct+5, correct-5, 100-correct].filter(v=>v!==correct && v>0 && v<100);
        const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
        while(values.length<4){ let f=correct+values.length*3; while(values.indexOf(f)>=0) f++; values.push(f); }
        return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'\\%$', correct:v===correct}));
      }
      if(s.sub==='compare'){
        const mx=Math.max.apply(null,p.pcts);
        const correct=p.cats[p.pcts.indexOf(mx)];
        // label-order misconception: the first category in the legend
        const values=[correct].concat([p.cats[0]].concat(p.cats.slice(1)).filter(v=>v!==correct)).slice(0,4);
        const uniq=values.filter((v,i,a)=>a.indexOf(v)===i);
        return E.shuffle(uniq).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
      }
      const pct=p.pcts[s.idx], correct=pieAngle(pct);
      // misconceptions: percent as degrees; percent × 100; complement angle
      const wrongs=[pct, pct*100, 360-correct].filter(v=>v!==correct && v>0);
      const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
      while(values.length<4){ let f=correct+values.length*9; while(values.indexOf(f)>=0) f++; values.push(f); }
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'^\\circ$', correct:v===correct}));
    }
    if(family==='misleading_graph_critique'){
      const correct='ציר ה-$y$ לא מתחיל ב-$0$, ולכן ההבדל נראה גדול מכפי שהוא';
      const values=[correct,'העמודות צרות מדי','אין מספיק קטגוריות בתרשים','הצבעים של העמודות כהים מדי'];
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
    }
    if(family==='compare_groups_relative_frequency'){
      // distractors MUST include the larger-absolute-count group (s.ctx.g1)
      const values=[s.ctx.g2, s.ctx.g1, 'השיעור שווה בשתי הקבוצות'];
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג'][i], text:v, correct:v===s.ctx.g2}));
    }
    if(family==='bar_chart_read'){
      const c=s.c;
      if(s.sub==='value'){
        // misconceptions: neighbor bar, off-by-one (gridline misread), total
        const correct=c.counts[s.idx];
        const neighbor=c.counts[(s.idx+1)%c.counts.length];
        const wrongs=[neighbor, correct+1, chartTotal(c)].filter(v=>v!==correct);
        const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
        while(values.length<4){ let f=correct+values.length+1; while(values.indexOf(f)>=0) f++; values.push(f); }
        return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
      }
      if(s.sub==='extreme'){
        const correct=chartExtreme(c,s.hi);
        const values=[correct].concat(c.cats.filter(v=>v!==correct).slice(0,3));
        return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
      }
      const correct=chartTotal(c);
      const mx=Math.max.apply(null,c.counts);
      const wrongs=[mx, correct-c.counts[s.idx], c.counts.length].filter(v=>v!==correct && v>0);
      const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
      while(values.length<4){ let f=correct+values.length; while(values.indexOf(f)>=0) f++; values.push(f); }
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
    }
    const t=s.t, idx=s.idx;
    if(family==='rel_freq'){
      const c=t.counts[idx], p=Math.round(c*100/t.total);
      const opts=[
        {text:'$'+p+'\\%$', correct:true},
        {text:'$'+c+'$', correct:false},
        {text:'$'+(100-p)+'\\%$', correct:false},
        {text:'$'+(p+5)+'\\%$', correct:false}
      ];
      return E.shuffle(opts).map((o,i)=>({label:['א','ב','ג','ד'][i], text:o.text, correct:o.correct}));
    }
    let correct, wrongs;
    if(family==='read_freq'){ correct=t.counts[idx]; wrongs=[t.vals[idx], t.counts[idx]+1, t.total]; }
    else if(family==='most_frequent'){
      const maxC=Math.max.apply(null,t.counts);
      correct=t.vals[t.counts.indexOf(maxC)];
      wrongs=t.vals.filter(v=>v!==correct).slice(0,3);
    }
    else if(family==='total_check'){ correct=t.total; wrongs=[t.total-1, t.total+2, t.vals.reduce((a,b)=>a+b,0)]; }
    else {
      correct=t.counts[idx];
      const others=t.total - correct;
      wrongs=[others, correct+2, t.total];
    }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct+values.length; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,s,qtype,tfTrue){
    if(family==='pie_chart_read_or_construct'){
      const p=s.p, cat=p.cats[s.idx], pct=p.pcts[s.idx], ang=pieAngle(pct);
      const intro=`התרשים מתאר את התפלגות ${p.thing} בכיתה.`;
      if(s.sub==='missing_pct'){
        if(qtype==='tf') return `${intro} האחוז של "${cat}" חסר. האחוז החסר הוא $${tfTrue?pct:pct+5}\\%$.`;
        if(qtype==='mistake') return `${intro} האחוז של "${cat}" חסר. תלמיד קבע: "אי אפשר לדעת — חסר נתון".`;
        if(qtype==='mcq') return `${intro} האחוז של "${cat}" אינו רשום.\nמהו האחוז החסר?`;
        return `${intro} האחוז של "${cat}" אינו רשום בתרשים.\nמצאו את האחוז החסר וחשבו את הזווית המרכזית של הגזרה.`;
      }
      if(s.sub==='compare'){
        const mx=Math.max.apply(null,p.pcts), big=p.cats[p.pcts.indexOf(mx)];
        const other=p.cats.find(c=>c!==big);
        if(qtype==='tf') return `${intro} הגזרה הגדולה ביותר בתרשים היא "${tfTrue?big:other}".`;
        if(qtype==='mistake') return `${intro} תלמיד קבע: "הגזרה הגדולה ביותר היא ׳${p.cats[0]}׳, כי היא ראשונה במקרא".`;
        if(qtype==='mcq') return `${intro}\nלאיזו קטגוריה הגזרה הגדולה ביותר?`;
        return `${intro}\nלאיזו קטגוריה הזווית המרכזית הגדולה ביותר? חשבו אותה במעלות.`;
      }
      if(s.sub==='two_angles' && qtype==='open'){
        const j=(s.idx+1)%p.cats.length;
        return `${intro} לפניכם האחוזים של כל קטגוריה.\nחשבו את הזווית המרכזית של "${cat}" ושל "${p.cats[j]}", והסבירו כיצד בונים את התרשים.`;
      }
      if(qtype==='tf') return `${intro} הזווית המרכזית של הגזרה "${cat}" ($${pct}\\%$) היא $${tfTrue?ang:pct}^\\circ$.`;
      if(qtype==='mistake') return Math.random()<0.5
        ? `${intro} תלמיד חישב את הזווית המרכזית של "${cat}": "$${pct}\\times 100=${pct*100}$, כלומר $${pct*100}^\\circ$".`
        : `${intro} תלמיד קבע: "הזווית המרכזית של ׳${cat}׳ היא $${pct}^\\circ$ — בדיוק כמו האחוז".`;
      if(qtype==='mcq') return `${intro}\nמהי הזווית המרכזית של הגזרה "${cat}" ($${pct}\\%$)?`;
      return `${intro} הקטגוריה "${cat}" מהווה $${pct}\\%$.\nחשבו את הזווית המרכזית של הגזרה והסבירו.`;
    }
    if(family==='misleading_graph_critique'){
      const m=s.m;
      const intro=`התרשים שלפניכם פורסם בפרסומת ("${m.title}").`;
      if(qtype==='tf') return tfTrue
        ? `${intro} ההפרש האמיתי בין העמודות קטן בהרבה מהרושם שהתרשים יוצר.`
        : `${intro} התרשים מציג את הנתונים בצורה ניטרלית והוגנת.`;
      if(qtype==='mistake') return `${intro} תלמיד הסיק: "הערך זינק ${m.lookRatio}! רואים שהעמודה גבוהה ${m.lookRatio}".`;
      if(qtype==='mcq') return `${intro}\nמדוע התרשים עלול להטעות?`;
      if(s.sub==='both') return `${intro}\nא. מדוע התרשים עלול להטעות?\nב. האם המסקנה "הערך זינק ${m.lookRatio}" נכונה? חשבו את הגידול האמיתי.`;
      if(s.sub==='fair_vs') return `${intro}\nמה ההבדל בין הרושם שהתרשים יוצר לבין הנתונים עצמם? הציעו דרך לייצג אותם בצורה ניטרלית יותר.`;
      return `${intro}\nמדוע התרשים עלול להטעות? הציעו תיקון.`;
    }
    if(family==='compare_groups_relative_frequency'){
      const c=s.ctx;
      const data=`ב${c.g1} $${s.nA}$ תלמידים, ומתוכם $${s.kA}$ ${c.what}. ב${c.g2} $${s.nB}$ תלמידים, ומתוכם $${s.kB}$ ${c.what}.`;
      if(qtype==='tf') return `${data}\nהקבוצה שבה שיעור ה${c.what} גבוה יותר היא ${tfTrue?c.g2:c.g1}.`;
      if(qtype==='mistake') return `${data}\nתלמיד קבע: "${c.g1} ${c.adj} יותר, כי $${s.kA}$ גדול מ-$${s.kB}$".`;
      if(qtype==='mcq') return `${data}\nבאיזו קבוצה שיעור ה${c.what} גבוה יותר?`;
      return `${data}\nאיזו קבוצה ${c.adj} יותר? הסבירו באמצעות תדירות יחסית.`;
    }
    if(family==='bar_chart_read'){
      const c=s.c, cat=c.cats[s.idx], v=c.counts[s.idx];
      if(s.sub==='value'){
        if(qtype==='tf') return `לפי התרשים, מספר ה${c.thing} בקטגוריה "${cat}" הוא $${tfTrue?v:v+2}$.`;
        if(qtype==='mistake') return `תלמיד קרא מהתרשים: "בקטגוריה ׳${cat}׳ יש $${c.counts[(s.idx+1)%c.counts.length]}$ ${c.thing}" — הסתכל על העמודה השכנה.`;
        return `לפי תרשים העמודות — כמה ${c.thing} יש בקטגוריה "${cat}"?`;
      }
      if(s.sub==='extreme'){
        const word=s.hi?'הגבוה':'הנמוך';
        const correct=chartExtreme(c,s.hi);
        if(qtype==='tf') return `לפי התרשים, הערך ${word} ביותר הוא בקטגוריה "${tfTrue?correct:chartExtreme(c,!s.hi)}".`;
        if(qtype==='mistake') return `תלמיד קבע: "הערך ${word} ביותר הוא ׳${c.cats[0]}׳, כי זו העמודה הראשונה" — בלי להשוות גבהים לפי הסרגל.`;
        return `באיזו קטגוריה הערך ${word} ביותר לפי התרשים?`;
      }
      const total=chartTotal(c);
      if(qtype==='tf') return `סך כל ה${c.thing} בתרשים הוא $${tfTrue?total:Math.max.apply(null,c.counts)}$.`;
      if(qtype==='mistake') return `תלמיד חישב סך הכל: "הערך הגבוה בתרשים הוא $${Math.max.apply(null,c.counts)}$, אז זה הסך הכל".`;
      return `כמה ${c.thing} יש בסך הכל לפי תרשים העמודות?`;
    }
    const t=s.t, idx=s.idx;
    if(family==='rel_freq'){
      const c=t.counts[idx];
      if(qtype==='tf') return tfTrue
        ? `התדירות היחסית של ${t.label} $${t.vals[idx]}$ היא $${Math.round(c*100/t.total)}\\%$.`
        : `התדירות היחסית של ${t.label} $${t.vals[idx]}$ היא $${c}$, כי זו התדירות הרשומה בטבלה.`;
      if(qtype==='mistake') return `תלמיד טען: "התדירות היחסית של ${t.label} $${t.vals[idx]}$ היא $${c}$ — פשוט קוראים מהטבלה".`;
      if(qtype==='mcq') return `מה התדירות היחסית של ${t.label} $${t.vals[idx]}$?`;
      return `מה התדירות היחסית של ${t.label} $${t.vals[idx]}$?\nהביעו אותה כשבר, כמספר עשרוני וכאחוז.`;
    }
    if(family==='read_freq'){
      if(qtype==='tf') return `לפי הטבלה, התדירות של ${t.label} $${t.vals[idx]}$ היא $${tfTrue?t.counts[idx]:t.counts[idx]+1}$.`;
      if(qtype==='mistake') return `תלמיד קרא מהטבלה: "התדירות של $${t.vals[idx]}$ היא $${t.vals[idx]}$".`;
      return `לפניכם טבלת תדירות.\nמה התדירות של ${t.label} $${t.vals[idx]}$?`;
    }
    if(family==='most_frequent'){
      const maxC=Math.max.apply(null,t.counts);
      const minC=Math.min.apply(null,t.counts);
      if(qtype==='tf') return `ה${t.label} השכיח ביותר בטבלה הוא $${t.vals[t.counts.indexOf(tfTrue?maxC:minC)]}$.`;
      if(qtype==='mistake') return `תלמיד טען: "השכיח ביותר הוא $${Math.max.apply(null,t.vals)}$ — הערך הגדול ביותר בטבלה".`;
      return `לפי הטבלה — מהו ה${t.label} השכיח ביותר?`;
    }
    if(family==='total_check'){
      if(qtype==='tf') return `סך כל הנבדקים בטבלה הוא $${tfTrue?t.total:t.total+2}$.`;
      if(qtype==='mistake') return `תלמיד חישב סך נבדקים: "$${t.vals.join('+')}=${t.vals.reduce((a,b)=>a+b,0)}$" — חיבר את הערכים.`;
      return `כמה נבדקים יש בסך הכל לפי הטבלה?`;
    }
    // missing_freq
    if(qtype==='tf') return `בטבלה חסרה תדירות אחת. אם סך הנבדקים $${t.total}$, התדירות החסרה היא $${tfTrue?t.counts[idx]:t.counts[idx]+1}$.`;
    if(qtype==='mistake') return `סך הנבדקים $${t.total}$ ותדירות אחת חסרה. תלמיד כתב: "החסרה היא $${t.total}$ פחות הערך $${t.vals[idx]}$".`;
    return `סך כל הנבדקים הוא $${t.total}$, ובטבלה חסרה תדירות אחת (מסומנת ?).\nמה התדירות החסרה?`;
  }

  function answer(family,s,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='pie_chart_read_or_construct'){
      const p=s.p, cat=p.cats[s.idx], pct=p.pcts[s.idx], ang=pieAngle(pct);
      const rule='זווית מרכזית = החלק מתוך השלם כפול $360^\\circ$';
      if(s.sub==='missing_pct'){
        const others=p.pcts.filter((v,i)=>i!==s.idx);
        const prefix = wrong ? 'שגוי — סך כל האחוזים בתרשים עוגה הוא תמיד $100\\%$, ולכן אפשר למצוא את החסר.\n' : '';
        return `${prefix}סכום האחוזים הידועים: $${others.join('+')}=${100-pct}$.\n$$100-${100-pct}=${pct}\\%$$\nהזווית המרכזית: $$\\frac{${pct}}{100}\\times 360=${ang}^\\circ$$`;
      }
      if(s.sub==='compare'){
        const mx=Math.max.apply(null,p.pcts), big=p.cats[p.pcts.indexOf(mx)];
        const prefix = wrong ? 'שגוי — גודל גזרה נקבע לפי האחוז, לא לפי הסדר במקרא.\n' : '';
        return `${prefix}האחוז הגבוה ביותר הוא $${mx}\\%$ — הקטגוריה "${big}".\nהזווית המרכזית שלה: $$\\frac{${mx}}{100}\\times 360=${pieAngle(mx)}^\\circ$$`;
      }
      if(s.sub==='two_angles' && qtype==='open'){
        const j=(s.idx+1)%p.cats.length, pct2=p.pcts[j];
        return `${rule}:\n"${cat}": $$\\frac{${pct}}{100}\\times 360=${ang}^\\circ$$\n"${p.cats[j]}": $$\\frac{${pct2}}{100}\\times 360=${pieAngle(pct2)}^\\circ$$\nבונים כל גזרה לפי הזווית שחושבה; סך כל הזוויות $360^\\circ$.`;
      }
      const prefix = wrong ? `שגוי — אחוז אינו מעלות, ולא כופלים ב-$100$. ${rule} (כלומר כפול $3.6$).\n` : '';
      return `${prefix}$$\\frac{${pct}}{100}\\times 360=${ang}^\\circ$$\nהזווית המרכזית של "${cat}": $${ang}^\\circ$.`;
    }
    if(family==='misleading_graph_critique'){
      const m=s.m;
      const v1=m.values[0], v2=m.values[m.values.length-1], diff=v2-v1;
      const core=`ציר ה-$y$ מתחיל ב-$${m.yStart}$ ולא ב-$0$ (שימו לב לסימן השבירה על הציר), ולכן הפרש קטן נראה עצום.`;
      const fix=`ייצוג הוגן: ציר $y$ צריך להתחיל ב-$0$ (או לציין במפורש את קנה המידה).`;
      const real=`בפועל הערכים הם $${v1}$ ו-$${v2}$ — גידול של $${diff}$ בלבד (כ-$${m.realPct}\\%$), לא ${m.lookRatio}.`;
      if(qtype==='mistake') return `שגוי — גובה העמודות בתרשים הזה אינו פרופורציוני לערכים, כי ${core}\n${real}\n${fix}`;
      if(qtype==='tf' && !tfTrue) return `שגוי — התרשים אינו ניטרלי: ${core}\n${fix}`;
      return `${core}\n${real}\n${fix}`;
    }
    if(family==='compare_groups_relative_frequency'){
      const c=s.ctx;
      const prefix = wrong
        ? `שגוי — משווים שיעור (תדירות יחסית $k/n$), לא ספירה מוחלטת. $${s.kA}$ אומנם גדול מ-$${s.kB}$, אבל הקבוצות בגדלים שונים.\n`
        : 'משווים תדירות יחסית — חלק מתוך הקבוצה, לא ספירה:\n';
      return `${prefix}${c.g1}: $$\\frac{${s.kA}}{${s.nA}}=${s.rA}\\%$$\n${c.g2}: $$\\frac{${s.kB}}{${s.nB}}=${s.rB}\\%$$\n$${s.rB}\\% > ${s.rA}\\%$ — ולכן ${c.g2} ${c.adj} יותר, למרות שמספר ה${c.what} בה קטן יותר.`;
    }
    if(family==='bar_chart_read'){
      const c=s.c, cat=c.cats[s.idx], v=c.counts[s.idx];
      if(s.sub==='value'){
        const prefix = wrong ? 'שגוי — מאתרים את העמודה של הקטגוריה וקוראים את גובהה מול ציר ה-$y$.\n' : '';
        return `${prefix}גובה העמודה "${cat}" מול הסרגל: $${v}$ ${c.thing}.`;
      }
      if(s.sub==='extreme'){
        const word=s.hi?'הגבוהה':'הנמוכה';
        const correct=chartExtreme(c,s.hi);
        const cv=s.hi?Math.max.apply(null,c.counts):Math.min.apply(null,c.counts);
        const prefix = wrong ? 'שגוי — משווים את גובהי כל העמודות מול ציר ה-$y$, לא לפי מיקום או רושם.\n' : '';
        return `${prefix}העמודה ${word} ביותר היא "${correct}" עם $${cv}$ ${c.thing}.`;
      }
      const total=chartTotal(c);
      const prefix = wrong ? 'שגוי — סך הכל הוא סכום כל העמודות, לא העמודה הגבוהה.\n' : '';
      return `${prefix}מחברים את כל העמודות:\n$$${c.counts.join('+')}=${total}$$\nסך הכל: $${total}$ ${c.thing}.`;
    }
    const t=s.t, idx=s.idx;
    if(family==='rel_freq'){
      const c=t.counts[idx], g=gcd(c,t.total), fn=c/g, fd=t.total/g;
      const dec=c/t.total, p=Math.round(c*100/t.total);
      const prefix = wrong ? `שגוי — $${c}$ היא התדירות המוחלטת (הספירה). תדירות יחסית היא החלק מתוך הסך הכול: תדירות ÷ סך הנבדקים.\n` : 'תדירות יחסית = תדירות ÷ סך הנבדקים:\n';
      const steps = g>1 ? `\\frac{${c}}{${t.total}}=\\frac{${fn}}{${fd}}=${dec}=${p}\\%` : `\\frac{${c}}{${t.total}}=${dec}=${p}\\%`;
      return `${prefix}$$${steps}$$`;
    }
    if(family==='read_freq'){
      const prefix = wrong ? 'שגוי — התדירות היא המספר בעמודת התדירות, לא הערך עצמו.\n' : '';
      return `${prefix}בשורת ${t.label} $${t.vals[idx]}$ — התדירות היא $${t.counts[idx]}$.`;
    }
    if(family==='most_frequent'){
      const maxC=Math.max.apply(null,t.counts);
      const v=t.vals[t.counts.indexOf(maxC)];
      const prefix = wrong ? 'שגוי — שכיח נקבע לפי התדירות הגבוהה ביותר, לא לפי הערך הגדול ביותר.\n' : '';
      return `${prefix}התדירות הגבוהה ביותר היא $${maxC}$, השייכת ל${t.label} $${v}$.\nה${t.label} השכיח: $${v}$.`;
    }
    if(family==='total_check'){
      const prefix = wrong ? 'שגוי — סך הנבדקים הוא סכום התדירויות, לא סכום הערכים.\n' : '';
      return `${prefix}$$${t.counts.join('+')}=${t.total}$$\nסך הנבדקים: $${t.total}$.`;
    }
    const others = t.counts.filter((c,i)=>i!==idx);
    const prefix = wrong ? 'שגוי — מחסרים מסך הנבדקים את סכום התדירויות הידועות.\n' : '';
    return `${prefix}סכום התדירויות הידועות: $${others.join('+')}=${t.total - t.counts[idx]}$.\n$$${t.total}-${t.total - t.counts[idx]}=${t.counts[idx]}$$\nהתדירות החסרה: $${t.counts[idx]}$.`;
  }

  E.generateU701Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const s = setup(family, difficulty);
    const svg = family==='pie_chart_read_or_construct'
      ? E.pieChartSvg({cats:s.p.cats, pcts:s.p.pcts, hideIdx:s.sub==='missing_pct'?s.idx:undefined})
      : family==='misleading_graph_critique'
      ? E.misleadingBarChartSvg({labels:s.m.labels, values:s.m.values, yStart:s.m.yStart, title:s.m.title})
      : family==='compare_groups_relative_frequency'
      ? E.doubleBarSvg({groups:[s.ctx.g1,s.ctx.g2], series:['תלמידים בקבוצה',s.ctx.what], values:[[s.nA,s.kA],[s.nB,s.kB]]})
      : family==='bar_chart_read'
      ? E.barChartSvg({labels:s.c.cats, values:s.c.counts, title:s.c.title, showValues:s.sub!=='value'})
      : tableSvg(s.t, family==='missing_freq' ? s.idx : -1);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,s,questionType,tfTrue), a = answer(family,s,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,s)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
