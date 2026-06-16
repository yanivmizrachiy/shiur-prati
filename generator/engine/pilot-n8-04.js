// generator/engine/pilot-n8-04.js
// N8-04 Static Percentages — Engine Pilot
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const PCT_OF_N = [
    {p:25,n:80,k:20,ctx:'תלמידים',total_ctx:'בכיתה'},
    {p:50,n:60,k:30,ctx:'שקלים',total_ctx:'בחשבון'},
    {p:10,n:90,k:9,ctx:'מוצרים',total_ctx:'במחסן'},
    {p:20,n:150,k:30,ctx:'תלמידים',total_ctx:'בבית ספר'},
    {p:75,n:40,k:30,ctx:'אנשים',total_ctx:'בקבוצה'},
    {p:30,n:200,k:60,ctx:'שקלים',total_ctx:'בתקציב'},
    {p:40,n:250,k:100,ctx:'מוצרים',total_ctx:'במגרש'},
    {p:15,n:60,k:9,ctx:'ילדים',total_ctx:'בגן'}
  ];
  const FIND_WHOLE = [
    {p:25,n:80,k:20,ctx:'תלמידים'},
    {p:50,n:60,k:30,ctx:'שקלים'},
    {p:20,n:150,k:30,ctx:'מוצרים'},
    {p:40,n:250,k:100,ctx:'אנשים'},
    {p:10,n:90,k:9,ctx:'ילדים'},
    {p:75,n:40,k:30,ctx:'שקלים'}
  ];
  const FIND_PCT = [
    {p:25,n:80,k:20,ctx:'תלמידים'},
    {p:50,n:60,k:30,ctx:'שקלים'},
    {p:30,n:200,k:60,ctx:'מוצרים'},
    {p:15,n:60,k:9,ctx:'ילדים'},
    {p:40,n:250,k:100,ctx:'אנשים'}
  ];

  function correctValue(sub,x){
    if(sub==='find_whole') return x.n;
    if(sub==='find_pct') return x.p;
    return x.k;
  }

  function choiceText(sub,v,x){
    if(sub==='find_pct') return '$'+v+'\\%$';
    return '$'+v+'$ '+x.ctx;
  }

  function pctChoices(sub,x){
    const correct = correctValue(sub,x);
    const wrong = [correct+10, correct-5, Math.max(1, Math.round(correct/2)), correct*2].filter(v=>v!==correct && v>0);
    const values = [correct].concat(wrong).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=values[values.length-1]+3; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:choiceText(sub,v,x), correct:v===correct}));
  }

  function question(sub,x,qt,tfTrue){
    if(sub==='pct_of_n'){
      if(qt==='tf') return `"$${x.p}\\%$ מתוך $${x.n}$ ${x.ctx} הם $${tfTrue?x.k:x.k+10}$ ${x.ctx}."`;
      if(qt==='mistake') return `תלמיד חישב: "$${x.p}\\%$ מ-$${x.n}$ = $${x.n} \\div ${x.p} = ${Math.round(x.n/x.p)}$".\nמצאו את הטעות.`;
      return `${x.total_ctx || 'בקבוצה'} יש $${x.n}$ ${x.ctx}.\n$${x.p}\\%$ מהם משתתפים בפעילות.\nכמה ${x.ctx} משתתפים?`;
    }
    if(sub==='find_whole'){
      if(qt==='tf') return `אם $${x.k}$ ${x.ctx} הם $${x.p}\\%$, אז בסך הכל יש $${tfTrue?x.n:x.n+10}$ ${x.ctx}.`;
      if(qt==='mistake') return `תלמיד חישב: "$${x.k}\\cdot ${x.p}\\div 100$" כדי למצוא את הכמות הכוללת.\nמצאו את הטעות.`;
      return `$${x.k}$ ${x.ctx} מהווים $${x.p}\\%$ מכלל ה${x.ctx}.\nכמה ${x.ctx} יש בסך הכל?`;
    }
    if(qt==='tf') return `מתוך $${x.n}$ ${x.ctx}, $${x.k}$ ${x.ctx} הם $${tfTrue?x.p:x.p+10}\\%$.`;
    if(qt==='mistake') return `תלמיד חישב: "$${x.n}\\div ${x.k}\\cdot 100$" כדי למצוא את האחוז.\nמצאו את הטעות.`;
    return `מתוך $${x.n}$ ${x.ctx}, $${x.k}$ ${x.ctx} השלימו משימה.\nכמה אחוזים מה${x.ctx} השלימו?`;
  }

  function answer(sub,x,qt,tfTrue){
    if(sub==='pct_of_n'){
      if(qt==='tf') return tfTrue
        ? `$$${x.p}\\% \\text{ מ-} ${x.n}=\\frac{${x.p}}{100}\\cdot ${x.n}=${x.k}$$`
        : `שגויה.\n$$${x.p}\\% \\text{ מ-} ${x.n}=\\frac{${x.p}}{100}\\cdot ${x.n}=${x.k}$$\nהתשובה הנכונה היא $${x.k}$, לא $${x.k+10}$.`;
      if(qt==='mistake') return `הטעות: התלמיד חילק במקום לחשב אחוז מתוך כמות.\nהדרך הנכונה:\n$$\\frac{${x.p}}{100}\\cdot ${x.n}=${x.k}$$`;
      return `$$${x.p}\\% \\text{ מ-} ${x.n}=\\frac{${x.p}}{100}\\cdot ${x.n}=${x.k}$$`;
    }
    if(sub==='find_whole'){
      const prefix = qt==='mistake' ? 'הטעות היא חישוב אחוז מתוך כמות במקום חזרה אל השלם.\n' : '';
      return `${prefix}אם $${x.k}$ הם $${x.p}\\%$, אז $100\\%$ הם:\n$$\\frac{${x.k}}{${x.p}}\\cdot 100=${x.n}$$`;
    }
    const prefix = qt==='mistake' ? 'הטעות היא היפוך היחס. מחשבים חלק מתוך שלם, ולא שלם מתוך חלק.\n' : '';
    return `${prefix}$$\\frac{${x.k}}{${x.n}}\\cdot 100=${x.p}\\%$$`;
  }

  // 10·10 percent grid: p of 100 cells shaded — the canonical area model for "%".
  function pctGridSvg(p){
    const T=(E.themes&&E.themes.geometry)||{stroke:'#334155',given:'#2563eb',label:'#0f172a'};
    const x0=30,y0=20,c=13,fill='#2563eb';
    let cells='';
    for(let i=0;i<100;i++){ const row=(i/10)|0, col=i%10; const on=i<p;
      cells+=`<rect x="${x0+col*c}" y="${y0+row*c}" width="${c-1.2}" height="${c-1.2}" fill="${on?fill:'#f1f5f9'}" fill-opacity="${on?0.85:1}" stroke="#cbd5e1" stroke-width="0.7"/>`; }
    const W=x0*2+10*c, H=y0+10*c+30;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`+
      cells+
      `<text x="${W/2}" y="${y0+10*c+18}" fill="${T.given}" font-size="12.5" font-weight="800" text-anchor="middle">${p}% מתוך 100</text>`+
      `<text x="${W/2}" y="${y0+10*c+30}" fill="${T.label}" font-size="9.5" font-weight="700" text-anchor="middle">מודל אחוז — מקור קובץ 07</text></svg>`;
  }

  E.generateN804Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    let subtypes;
    if(difficulty==='basic') subtypes = ['pct_of_n'];
    else if(difficulty==='challenge') subtypes = ['find_whole','find_pct','pct_of_n'];
    else subtypes = ['pct_of_n','find_whole','find_pct'];
    const sub = E.pick(subtypes);
    const set = sub==='pct_of_n' ? PCT_OF_N : sub==='find_whole' ? FIND_WHOLE : FIND_PCT;
    const x = E.pick(set);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(sub,x,questionType,tfTrue);
    const a = answer(sub,x,questionType,tfTrue);
    const svg = pctGridSvg(x.p);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:pctChoices(sub,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
