// generator/engine/pilot-n7-07.js
// N7-07 Square Root — Exact and Estimation — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md (perfect squares to 144), 07
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const EXACT = [
    {n:81,r:9},{n:144,r:12},{n:49,r:7},{n:121,r:11},{n:64,r:8},{n:100,r:10},{n:36,r:6}
  ];
  const BETWEEN = [
    {n:20,lo:16,hi:25,rlo:4,rhi:5},{n:50,lo:49,hi:64,rlo:7,rhi:8},{n:75,lo:64,hi:81,rlo:8,rhi:9},
    {n:110,lo:100,hi:121,rlo:10,rhi:11},{n:30,lo:25,hi:36,rlo:5,rhi:6},{n:90,lo:81,hi:100,rlo:9,rhi:10}
  ];
  const MISSING_SQ = [
    {r:7,n:49},{r:9,n:81},{r:11,n:121},{r:6,n:36},{r:12,n:144}
  ];
  const SUM_TRAP = [
    {a:9,b:16,wrong:7,right:'\\sqrt{25}=5'},{a:36,b:64,wrong:14,right:'\\sqrt{100}=10'},{a:16,b:9,wrong:7,right:'\\sqrt{25}=5'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'exact';
    if(diff === 'challenge') return E.pick(['sum_trap','between','missing_sq']);
    return E.pick(['exact','between','missing_sq']);
  }
  function pickCase(f){
    if(f==='between') return E.pick(BETWEEN);
    if(f==='missing_sq') return E.pick(MISSING_SQ);
    if(f==='sum_trap') return E.pick(SUM_TRAP);
    return E.pick(EXACT);
  }

  function choices(family,x){
    let correct, wrongs;
    if(family==='exact'){ correct=x.r; wrongs=[x.r+1, x.r-1, Math.round(x.n/2)]; }
    else if(family==='between'){ correct=x.rlo; wrongs=[x.rhi, x.rlo-1, x.rhi+1]; }
    else if(family==='missing_sq'){ correct=x.n; wrongs=[x.r*2, x.n+x.r, (x.r+1)*(x.r+1)]; }
    else { correct=Math.sqrt(x.a+x.b); wrongs=[x.wrong, x.a+x.b, x.wrong+1]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4){ let f=correct+values.length; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='exact'){
      if(qtype==='tf') return `$\\sqrt{${x.n}} = ${tfTrue?x.r:x.r+1}$.`;
      if(qtype==='mistake') return `תלמיד כתב: "$\\sqrt{${x.n}} = ${Math.round(x.n/2)}$ — שורש זה חצי".`;
      return `חשבו: $$\\sqrt{${x.n}} = ?$$`;
    }
    if(family==='between'){
      if(qtype==='tf') return tfTrue ? `$\\sqrt{${x.n}}$ נמצא בין $${x.rlo}$ ל-$${x.rhi}$.` : `$\\sqrt{${x.n}}$ נמצא בין $${x.rhi}$ ל-$${x.rhi+1}$.`;
      if(qtype==='mistake') return `תלמיד אמד: "$\\sqrt{${x.n}} \\approx ${x.rhi+1}$, כי $${x.n}$ קרוב ל-$${(x.rhi+1)*(x.rhi+1)}$".`;
      if(qtype==='mcq') return `בין אילו שני מספרים שלמים נמצא $\\sqrt{${x.n}}$? (בחרו את הקטן מביניהם)`;
      return `בין אילו שני מספרים שלמים נמצא $\\sqrt{${x.n}}$? הסבירו.`;
    }
    if(family==='missing_sq'){
      if(qtype==='tf') return `אם $x^2=${x.n}$ ו-$x>0$, אז $x=${tfTrue?x.r:x.r+1}$.`;
      if(qtype==='mistake') return `שטח ריבוע $${x.n}$ סמ״ר. תלמיד מצא צלע: "$${x.n}\\div 2=${x.n/2}$ ס״מ".`;
      return `שטח ריבוע הוא $${x.n}$ סמ״ר.\nמה אורך צלע הריבוע?`;
    }
    // sum_trap
    if(qtype==='tf') return tfTrue ? `$\\sqrt{${x.a}+${x.b}} = ${Math.sqrt(x.a+x.b)}$.` : `$\\sqrt{${x.a}+${x.b}} = \\sqrt{${x.a}}+\\sqrt{${x.b}}$.`;
    if(qtype==='mistake') return `תלמיד חישב: "$\\sqrt{${x.a}+${x.b}} = \\sqrt{${x.a}}+\\sqrt{${x.b}} = ${x.wrong}$".`;
    return `חשבו: $$\\sqrt{${x.a}+${x.b}} = ?$$\nהאם מותר לפצל את השורש לסכום שורשים? הסבירו.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='exact'){
      const prefix = wrong ? 'שגוי.\n' : '';
      return `${prefix}$$\\sqrt{${x.n}}=${x.r}$$\nכי $${x.r}^2=${x.n}$.`;
    }
    if(family==='between'){
      const prefix = wrong ? 'שגוי — בודקים בין אילו ריבועים שלמים המספר נמצא.\n' : '';
      return `${prefix}$$${x.lo} < ${x.n} < ${x.hi}$$\n$$\\sqrt{${x.lo}}=${x.rlo},\\quad \\sqrt{${x.hi}}=${x.rhi}$$\nלכן: $${x.rlo} < \\sqrt{${x.n}} < ${x.rhi}$.`;
    }
    if(family==='missing_sq'){
      const prefix = wrong ? 'שגוי — צלע ריבוע היא שורש השטח, לא חצי ממנו.\n' : '';
      return `${prefix}$$x^2=${x.n}\\;\\Rightarrow\\; x=\\sqrt{${x.n}}=${x.r}$$\nאורך הצלע: $${x.r}$ ס״מ.`;
    }
    const prefix = wrong ? 'שגוי — אסור לפצל שורש של סכום לסכום שורשים!\n' : '';
    return `${prefix}קודם מחברים בתוך השורש:\n$$\\sqrt{${x.a}+${x.b}}=${x.right}$$\nלעומת זאת $\\sqrt{${x.a}}+\\sqrt{${x.b}}=${x.wrong}$ — תוצאה שונה. הכלל: $\\sqrt{a+b}\\ne\\sqrt{a}+\\sqrt{b}$.`;
  }

  E.generateN707Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
