// generator/engine/pilot-u8-01.js
// U8-01 Mean, Median, Range — Smart Engine
// Source: source-learning/2026-06-09/06_uncertainty_domain_curriculum_examples.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // Precomputed datasets: clean mean, odd count for unambiguous median
  const SETS = [
    {d:[70,80,90,60,100], mean:80, median:80, range:40},
    {d:[95,55,65,85,75],  mean:75, median:75, range:40},
    {d:[60,90,70,80,100], mean:80, median:80, range:40},
    {d:[40,60,80,50,70],  mean:60, median:60, range:40},
    {d:[85,65,95,75,80],  mean:80, median:80, range:30}
  ];
  // missing value from mean: known values + target mean → missing
  const MISSING = [
    {known:[70,80,90,60], mean:76, missing:80, n:5},
    {known:[50,60,70,80], mean:66, missing:70, n:5},
    {known:[85,95,75,65], mean:81, missing:85, n:5},
    {known:[90,70,60,80], mean:78, missing:90, n:5}
  ];
  const REPLACE = [
    {d:[70,80,90,60,100], mean:80, old:60, neu:75, newMean:83},
    {d:[95,55,65,85,75],  mean:75, old:55, neu:80, newMean:80},
    {d:[40,60,80,50,70],  mean:60, old:40, neu:65, newMean:65},
    {d:[85,65,95,75,80],  mean:80, old:65, neu:90, newMean:85}
  ];
  const BOOST_FAILING = [
    {d:[40,60,80,50,70], mean:60, threshold:60, boost:10, failCount:2, addTotal:20, newMean:64},
    {d:[95,55,65,85,75], mean:75, threshold:60, boost:10, failCount:1, addTotal:10, newMean:77},
    {d:[52,58,64,70,76], mean:64, threshold:60, boost:10, failCount:2, addTotal:20, newMean:68}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['mean','range','add_constant_effect']);
    if(diff === 'challenge') return E.pick(['missing_from_mean','median','add_constant_effect','replace_value_mean','boost_failures_mean']);
    return E.pick(['mean','median','range','missing_from_mean','add_constant_effect','replace_value_mean','boost_failures_mean']);
  }

  function addConstantCase(){
    const x = Object.assign({}, E.pick(SETS));
    x.k = E.pick([5,10]);
    x.newMean = x.mean + x.k;
    x.newMedian = x.median + x.k;
    x.newRange = x.range;
    return x;
  }

  function choices(family,x){
    let correct, wrongs;
    if(family==='add_constant_effect'){
      const opts=[
        {text:`הממוצע והחציון יגדלו ב־$${x.k}$, והטווח יישאר $${x.range}$`, correct:true},
        {text:`הממוצע, החציון והטווח יגדלו כולם ב־$${x.k}$`, correct:false},
        {text:`רק הממוצע יגדל ב־$${x.k}$`, correct:false},
        {text:`הטווח יגדל ל־$${x.range+x.k}$`, correct:false}
      ];
      return E.shuffle(opts).map((o,i)=>({label:['א','ב','ג','ד'][i], text:o.text, correct:o.correct}));
    }
    if(family==='mean'){ correct=x.mean; wrongs=[x.median+5===x.mean?x.mean+5:x.median+5, x.mean+10, x.range]; }
    else if(family==='median'){ correct=x.median; wrongs=[x.d[2], x.mean===x.median?x.median+5:x.mean, x.median-10]; }
    else if(family==='range'){ correct=x.range; wrongs=[Math.max.apply(null,x.d), Math.min.apply(null,x.d), x.range+10]; }
    else if(family==='missing_from_mean'){ correct=x.missing; wrongs=[x.mean, x.missing-10, x.missing+5]; }
    else if(family==='replace_value_mean'){
      const delta=x.neu-x.old;
      correct=x.newMean; wrongs=[x.mean+delta, x.mean, x.newMean+5];
    } else {
      correct=x.newMean; wrongs=[x.mean+x.boost, x.mean, x.newMean+x.failCount];
    }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4){ let f=correct+values.length*5; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='add_constant_effect'){
      const list = x.d.join(', ');
      if(qtype==='tf') return `לנתונים $${list}$ מוסיפים $${x.k}$ לכל נתון. הממוצע החדש הוא $${x.newMean}$ והטווח החדש הוא $${tfTrue?x.range:x.range+x.k}$.`;
      if(qtype==='mistake') return `לנתונים $${list}$ מוסיפים $${x.k}$ לכל נתון. תלמיד טען: "גם הטווח יגדל ב-$${x.k}$, כי כל הציונים גדלו".`;
      return `לפניכם ציונים:\n$${list}$\nהמורה מוסיפה $${x.k}$ נקודות לכל תלמיד.\nמה יהיו הממוצע, החציון והטווח אחרי התוספת?`;
    }
    if(family==='replace_value_mean'){
      const list = x.d.join(', ');
      const wrongMean = x.mean + (x.neu-x.old);
      if(qtype==='tf') return `בנתונים $${list}$ התברר שהציון $${x.old}$ צריך להיות $${x.neu}$. הממוצע החדש הוא $${tfTrue?x.newMean:wrongMean}$.`;
      if(qtype==='mistake') return `בנתונים $${list}$ מתקנים ציון מ-$${x.old}$ ל-$${x.neu}$. תלמיד הוסיף את כל ההפרש לממוצע וקיבל $${wrongMean}$.`;
      return `לפניכם ציונים:\n$${list}$\nהתברר שהציון $${x.old}$ נרשם בטעות, והציון הנכון הוא $${x.neu}$.\nחשבו את הממוצע החדש.`;
    }
    if(family==='boost_failures_mean'){
      const list = x.d.join(', ');
      if(qtype==='tf') return `בנתונים $${list}$ מוסיפים $${x.boost}$ נקודות לכל ציון נמוך מ-$${x.threshold}$. הממוצע החדש הוא $${tfTrue?x.newMean:x.mean+x.boost}$.`;
      if(qtype==='mistake') return `בנתונים $${list}$ מוסיפים $${x.boost}$ נקודות לכל ציון נכשל (נמוך מ-$${x.threshold}$). תלמיד הוסיף $${x.boost}$ לממוצע כולו וקיבל $${x.mean+x.boost}$.`;
      return `לפניכם ציונים:\n$${list}$\nהמורה מוסיפה $${x.boost}$ נקודות לכל ציון נכשל (נמוך מ-$${x.threshold}$).\nחשבו את הממוצע החדש.`;
    }
    if(family==='missing_from_mean'){
      const list = x.known.join(', ');
      if(qtype==='tf') return `ארבעה ציונים: $${list}$. כדי שהממוצע של חמישה ציונים יהיה $${x.mean}$, הציון החמישי צריך להיות $${tfTrue?x.missing:x.mean}$.`;
      if(qtype==='mistake') return `ציונים: $${list}$, ממוצע מבוקש לחמישה: $${x.mean}$. תלמיד: "הציון החמישי = הממוצע = $${x.mean}$".`;
      return `לתלמיד ארבעה ציונים: $${list}$.\nמה צריך להיות הציון החמישי כדי שהממוצע של כל חמשת הציונים יהיה $${x.mean}$?`;
    }
    const list = x.d.join(', ');
    if(family==='mean'){
      if(qtype==='tf') return `ממוצע הנתונים $${list}$ הוא $${tfTrue?x.mean:x.mean+5}$.`;
      if(qtype==='mistake') return `לנתונים $${list}$ תלמיד חישב ממוצע: "הערך האמצעי ברשימה הוא $${x.d[2]}$, זה הממוצע".`;
      return `לפניכם ציוני $${x.d.length}$ תלמידים:\n$${list}$\nחשבו את הממוצע.`;
    }
    if(family==='median'){
      if(qtype==='tf') return `החציון של $${list}$ הוא $${tfTrue?x.median:(x.d[2]===x.median?x.median+5:x.d[2])}$.`;
      if(qtype==='mistake') return `לנתונים $${list}$ תלמיד מצא חציון: "האמצעי ברשימה הוא $${x.d[2]}$" — בלי למיין.`;
      return `לפניכם נתונים:\n$${list}$\nמצאו את החציון.`;
    }
    if(qtype==='tf') return `הטווח של $${list}$ הוא $${tfTrue?x.range:Math.max.apply(null,x.d)}$.`;
    if(qtype==='mistake') return `לנתונים $${list}$ תלמיד חישב טווח: "הערך הגבוה ביותר הוא $${Math.max.apply(null,x.d)}$, זה הטווח".`;
    return `לפניכם נתונים:\n$${list}$\nחשבו את הטווח.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='add_constant_effect'){
      const prefix = wrong ? 'שגוי — כשמוסיפים אותו מספר לכל הנתונים, המרחקים בין הנתונים לא משתנים ולכן הטווח נשאר קבוע.\n' : '';
      return `${prefix}כל ציון גדל ב-$${x.k}$, לכן גם הממוצע והחציון גדלים ב-$${x.k}$:\nממוצע חדש: $${x.mean}+${x.k}=${x.newMean}$.\nחציון חדש: $${x.median}+${x.k}=${x.newMedian}$.\nהטווח נשאר $${x.range}$, כי גם המקסימום וגם המינימום גדלו באותו מספר.`;
    }
    if(family==='replace_value_mean'){
      const oldSum=x.mean*x.d.length, delta=x.neu-x.old, newSum=oldSum+delta;
      const prefix = wrong ? 'שגוי — את ההפרש בציון מוסיפים לסכום הכולל, ואז מחלקים במספר הנתונים. לא מוסיפים את כל ההפרש לממוצע.\n' : '';
      return `${prefix}הסכום המקורי: $${x.mean}\\cdot ${x.d.length}=${oldSum}$.\nהשינוי בציון: $${x.neu}-${x.old}=${delta}$.\nסכום חדש: $${oldSum}+${delta}=${newSum}$.\n$$\\frac{${newSum}}{${x.d.length}}=${x.newMean}$$\nהממוצע החדש: $${x.newMean}$.`;
    }
    if(family==='boost_failures_mean'){
      const oldSum=x.mean*x.d.length, newSum=oldSum+x.addTotal;
      const prefix = wrong ? 'שגוי — מוסיפים 10 נקודות לכל ציון נכשל בנפרד, ואז מחשבים מחדש את הממוצע. לא מוסיפים 10 ישירות לממוצע.\n' : '';
      return `${prefix}יש $${x.failCount}$ ציונים נמוכים מ-$${x.threshold}$, לכן התוספת הכוללת לסכום היא $${x.failCount}\\cdot ${x.boost}=${x.addTotal}$.\nסכום מקורי: $${x.mean}\\cdot ${x.d.length}=${oldSum}$.\nסכום חדש: $${oldSum}+${x.addTotal}=${newSum}$.\n$$\\frac{${newSum}}{${x.d.length}}=${x.newMean}$$\nהממוצע החדש: $${x.newMean}$.`;
    }
    if(family==='missing_from_mean'){
      const sum = x.mean*x.n, ks = x.known.reduce((a,b)=>a+b,0);
      const prefix = wrong ? 'שגוי — הציון החמישי אינו בהכרח הממוצע. מחשבים מסכום כולל.\n' : '';
      return `${prefix}סכום נדרש: $${x.mean}\\cdot ${x.n}=${sum}$.\nסכום קיים: $${x.known.join('+')}=${ks}$.\n$$${sum}-${ks}=${x.missing}$$\nהציון החמישי: $${x.missing}$.`;
    }
    const sorted = x.d.slice().sort((a,b)=>a-b);
    if(family==='mean'){
      const sum = x.d.reduce((a,b)=>a+b,0);
      const prefix = wrong ? 'שגוי — ממוצע הוא סכום חלקי כמות, לא הערך האמצעי.\n' : '';
      return `${prefix}$$\\frac{${x.d.join('+')}}{${x.d.length}}=\\frac{${sum}}{${x.d.length}}=${x.mean}$$`;
    }
    if(family==='median'){
      const prefix = wrong ? 'שגוי — לפני מציאת חציון חובה למיין!\n' : '';
      return `${prefix}ממיינים: $${sorted.join(', ')}$.\nהערך האמצעי (שלישי מתוך $${x.d.length}$): $${x.median}$.`;
    }
    const mx=Math.max.apply(null,x.d), mn=Math.min.apply(null,x.d);
    const prefix = wrong ? 'שגוי — טווח הוא ההפרש בין הגבוה לנמוך, לא הערך הגבוה עצמו.\n' : '';
    return `${prefix}$$${mx}-${mn}=${x.range}$$\nהטווח: $${x.range}$.`;
  }

  // dot plot of the data on a number line — shows spread (range) and median
  // position. Source 06 pattern U-08. Tick step adapts to the data range.
  function dotPlotSvg(data){
    if(!data||!data.length) return '';
    const T=(E.themes&&E.themes.geometry)||{stroke:'#334155',unknown:'#dc2626',label:'#0f172a'};
    const mn=Math.min.apply(null,data), mx=Math.max.apply(null,data), span=Math.max(1,mx-mn);
    const step = span<=12?2:span<=30?5:10;
    const lo=Math.floor(mn/step)*step, hi=Math.ceil(mx/step)*step;
    const x0=30,x1=282,baseY=74,W=300,H=92;
    function X(v){ return x0+(v-lo)*(x1-x0)/Math.max(1,hi-lo); }
    let ticks='';
    for(let v=lo; v<=hi; v+=step){ ticks+=`<line x1="${X(v)}" y1="${baseY-4}" x2="${X(v)}" y2="${baseY+4}" stroke="#64748b" stroke-width="1.2"/><text x="${X(v)}" y="${baseY+18}" fill="#334155" font-size="9.5" text-anchor="middle">${v}</text>`; }
    const counts={}; let dots='';
    data.slice().sort((a,b)=>a-b).forEach(function(v){ counts[v]=(counts[v]||0)+1; const k=counts[v];
      dots+=`<circle cx="${X(v)}" cy="${baseY-9-(k-1)*11}" r="5" fill="${T.unknown}" stroke="#fff" stroke-width="1"/>`; });
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`+
      `<line x1="${x0-6}" y1="${baseY}" x2="${x1+6}" y2="${baseY}" stroke="${T.stroke}" stroke-width="2"/>`+
      ticks+dots+
      `<text x="${W/2}" y="13" fill="${T.label}" font-size="10.5" font-weight="700" text-anchor="middle">פיזור הנתונים על ציר</text></svg>`;
  }

  E.generateU801Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = family==='missing_from_mean'
      ? E.pick(MISSING)
      : family==='replace_value_mean'
        ? E.pick(REPLACE)
        : family==='boost_failures_mean'
          ? E.pick(BOOST_FAILING)
          : family==='add_constant_effect'
            ? addConstantCase()
            : E.pick(SETS);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue);
    const svg = dotPlotSvg(x.d || x.known);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
