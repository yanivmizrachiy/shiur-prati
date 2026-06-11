// generator/engine/pilot-g7-02.js
// G7-02 Flat Shape Areas (שטחי צורות שטוחות) — Smart Engine
// Source: source-learning/2026-06-09/03_grade-7_pre_deductive_geometry_curriculum.learning.md, 09
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const TRI = [
    {b:8,h:5,A:20},{b:6,h:4,A:12},{b:10,h:6,A:30},{b:7,h:4,A:14},{b:12,h:5,A:30}
  ];
  const PARA = [
    {b:9,h:4,A:36},{b:7,h:5,A:35},{b:8,h:6,A:48},{b:6,h:3,A:18}
  ];
  const TRAP = [
    {a:6,b:10,h:4,A:32},{a:5,b:9,h:6,A:42},{a:4,b:8,h:5,A:30},{a:3,b:7,h:4,A:20}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['tri_area','para_area']);
    if(diff === 'challenge') return E.pick(['tri_missing_height','trap_area','tri_missing_height']);
    return E.pick(['tri_area','para_area','trap_area','tri_missing_height']);
  }

  function pickCase(family){
    if(family === 'para_area') return E.pick(PARA);
    if(family === 'trap_area') return E.pick(TRAP);
    return E.pick(TRI);
  }

  function correctValue(family,x){
    if(family === 'tri_missing_height') return x.h;
    return x.A;
  }

  function choices(family,x){
    const correct = correctValue(family,x);
    let wrongs;
    if(family === 'tri_area') wrongs = [x.b*x.h, x.b+x.h, x.A+x.b];
    else if(family === 'para_area') wrongs = [Math.round(x.b*x.h/2), x.b+x.h, x.A+x.h];
    else if(family === 'trap_area') wrongs = [(x.a+x.b)*x.h, x.a*x.b, x.A+x.h];
    else wrongs = [x.A-x.b, x.h+2, x.b];
    const values = [correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4){ let f=correct+values.length*4; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family === 'tri_area'){
      if(qtype==='tf') return `שטח משולש שבסיסו $${x.b}$ ס״מ וגובהו $${x.h}$ ס״מ הוא $${x.b*x.h}$ סמ״ר.`;
      if(qtype==='mistake') return `תלמיד חישב שטח משולש (בסיס $${x.b}$, גובה $${x.h}$): "$${x.b}\\times ${x.h}=${x.b*x.h}$ סמ״ר".`;
      return `משולש שבסיסו $${x.b}$ ס״מ וגובהו $${x.h}$ ס״מ.\nחשבו את שטח המשולש.`;
    }
    if(family === 'para_area'){
      if(qtype==='tf') return `שטח מקבילית שבסיסה $${x.b}$ ס״מ וגובהה $${x.h}$ ס״מ הוא $${Math.round(x.b*x.h/2)}$ סמ״ר.`;
      if(qtype==='mistake') return `תלמיד חישב שטח מקבילית (בסיס $${x.b}$, גובה $${x.h}$): "$\\frac{${x.b}\\times ${x.h}}{2}=${Math.round(x.b*x.h/2)}$ סמ״ר".`;
      return `מקבילית שבסיסה $${x.b}$ ס״מ וגובהה $${x.h}$ ס״מ.\nחשבו את שטח המקבילית.`;
    }
    if(family === 'trap_area'){
      if(qtype==='tf') return `שטח טרפז שבסיסיו $${x.a}$ ו-$${x.b}$ ס״מ וגובהו $${x.h}$ ס״מ הוא $${(x.a+x.b)*x.h}$ סמ״ר.`;
      if(qtype==='mistake') return `תלמיד חישב שטח טרפז (בסיסים $${x.a}$, $${x.b}$, גובה $${x.h}$): "$(${x.a}+${x.b})\\times ${x.h}=${(x.a+x.b)*x.h}$ סמ״ר".`;
      return `טרפז שבסיסיו $${x.a}$ ס״מ ו-$${x.b}$ ס״מ, וגובהו $${x.h}$ ס״מ.\nחשבו את שטח הטרפז.`;
    }
    // tri_missing_height
    if(qtype==='tf') return `שטח משולש $${x.A}$ סמ״ר ובסיסו $${x.b}$ ס״מ. הגובה הוא $${x.A - x.b}$ ס״מ.`;
    if(qtype==='mistake') return `שטח משולש $${x.A}$ סמ״ר, בסיס $${x.b}$ ס״מ. תלמיד מצא גובה: "$${x.A}\\div ${x.b}=${x.A/x.b}$ ס״מ".`;
    return `שטח משולש הוא $${x.A}$ סמ״ר ובסיסו $${x.b}$ ס״מ.\nמה גובה המשולש?`;
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
    if(family === 'tri_area'){
      const prefix = wrong ? 'שגוי — בשטח משולש מחלקים ב-$2$: המשולש הוא חצי מלבן.\n' : '';
      return `${prefix}$$S=\\frac{${x.b}\\times ${x.h}}{2}=\\frac{${x.b*x.h}}{2}=${x.A}$$\nשטח המשולש: $${x.A}$ סמ״ר.`;
    }
    if(family === 'para_area'){
      const prefix = wrong ? 'שגוי — במקבילית לא מחלקים ב-$2$. הנוסחה: בסיס × גובה.\n' : '';
      return `${prefix}$$S=${x.b}\\times ${x.h}=${x.A}$$\nשטח המקבילית: $${x.A}$ סמ״ר.`;
    }
    if(family === 'trap_area'){
      const prefix = wrong ? 'שגוי — בטרפז מחלקים ב-$2$ את מכפלת סכום הבסיסים בגובה.\n' : '';
      return `${prefix}$$S=\\frac{(${x.a}+${x.b})\\times ${x.h}}{2}=\\frac{${(x.a+x.b)*x.h}}{2}=${x.A}$$\nשטח הטרפז: $${x.A}$ סמ״ר.`;
    }
    // tri_missing_height
    const prefix = wrong ? 'שגוי — לפני החילוק בבסיס יש להכפיל את השטח ב-$2$, כי בנוסחת המשולש מחלקים ב-$2$.\n' : '';
    return `${prefix}$$S=\\frac{b\\times h}{2}\\;\\Rightarrow\\; h=\\frac{2S}{b}$$\n$$h=\\frac{2\\times ${x.A}}{${x.b}}=\\frac{${2*x.A}}{${x.b}}=${x.h}$$\nגובה המשולש: $${x.h}$ ס״מ.`;
  }

  E.generateG702Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    let svg;
    if(family === 'para_area') svg = E.triangleBaseHeightSvg({b:x.b,h:x.h}, null, 'para');
    else if(family === 'trap_area') svg = E.triangleBaseHeightSvg({a:x.a,b:x.b,h:x.h}, null, 'trap');
    else if(family === 'tri_missing_height') svg = E.triangleBaseHeightSvg({b:x.b,h:null}, 'h', 'tri');
    else svg = E.triangleBaseHeightSvg({b:x.b,h:x.h}, null, 'tri');
    const q = question(family,x,questionType);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:false});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
