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
    if(diff === 'basic') return E.pick(['read_freq','most_frequent','rel_freq','bar_chart_read']);
    if(diff === 'challenge') return E.pick(['missing_freq','total_check','compare_groups_relative_frequency','rel_freq','compare_groups_relative_frequency']);
    return E.pick(['read_freq','most_frequent','total_check','missing_freq','rel_freq','bar_chart_read','compare_groups_relative_frequency']);
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

  function setup(family){
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

  function choices(family,s){
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
    const s = setup(family);
    const svg = family==='compare_groups_relative_frequency'
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
