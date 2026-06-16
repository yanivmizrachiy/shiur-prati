// generator/engine/pilot-g8-04.js
// G8-04 Triangle Similarity (דמיון משולשים) — Smart Engine
// Source: source-learning/2026-06-09/04_grade-8_geometry_curriculum.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // scale factor: small side s1 → large side s2, factor k (integer)
  const SCALE = [
    {s1:4,s2:8,k:2},{s1:3,s2:9,k:3},{s1:5,s2:10,k:2},{s1:4,s2:12,k:3},{s1:6,s2:18,k:3}
  ];
  // corresponding side: given a1 (small), k, find a2; second pair b1→b2 for context
  const CORR = [
    {a1:5,k:2,a2:10,b1:7,b2:14},{a1:4,k:3,a2:12,b1:6,b2:18},
    {a1:3,k:2,a2:6,b1:8,b2:16},{a1:6,k:2,a2:12,b1:9,b2:18}
  ];
  // is_similar: are side ratios equal?
  // area_ratio: areas of similar triangles scale by k^2 (source: file 04 — similarity)
  const AREA = [
    {k:2,A1:6,A2:24},{k:3,A1:5,A2:45},{k:2,A1:9,A2:36},{k:4,A1:3,A2:48},{k:3,A1:8,A2:72}
  ];
  const SIM_CHECK = [
    {a1:4,b1:6,a2:8,b2:12,sim:true,k:2},{a1:3,b1:5,a2:9,b2:15,sim:true,k:3},
    {a1:4,b1:6,a2:8,b2:10,sim:false,k:2},{a1:3,b1:5,a2:6,b2:11,sim:false,k:2}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'scale_factor';
    if(diff === 'challenge') return E.pick(['is_similar','corresponding_side','area_ratio','area_ratio']);
    return E.pick(['scale_factor','corresponding_side','is_similar','area_ratio']);
  }

  function pickCase(family){
    if(family === 'corresponding_side') return E.pick(CORR);
    if(family === 'is_similar') return E.pick(SIM_CHECK);
    if(family === 'area_ratio') return E.pick(AREA);
    return E.pick(SCALE);
  }

  function choices(family,x){
    if(family === 'is_similar'){
      const correct = x.sim ? 'כן, דומים' : 'לא דומים';
      const values = [correct, x.sim ? 'לא דומים' : 'כן, דומים', 'אי אפשר לקבוע לפי הנתונים'];
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג'][i], text:v, correct:v===correct}));
    }
    let correct, wrongs;
    if(family === 'area_ratio'){ correct=x.A2; wrongs=[x.A1*x.k, x.A1+x.k, x.A1*x.k*2]; }
    else if(family === 'scale_factor'){ correct=x.k; wrongs=[x.s2-x.s1, x.s2, x.k+1]; }
    else { correct=x.a2; wrongs=[x.a1+x.k, x.b2, x.a2+x.k]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4){ let f=correct+values.length*2; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family === 'scale_factor'){
      if(qtype==='tf') return `שני משולשים דומים. צלע במשולש הקטן: $${x.s1}$ ס״מ, הצלע המתאימה בגדול: $${x.s2}$ ס״מ. יחס הדמיון הוא $${tfTrue?x.k:(x.s2-x.s1===x.k?x.k+1:x.s2-x.s1)}$.`;
      if(qtype==='mistake') return `צלעות מתאימות: $${x.s1}$ ו-$${x.s2}$ ס״מ. תלמיד מצא יחס דמיון: "$${x.s2}-${x.s1}=${x.s2-x.s1}$".`;
      return `שני משולשים דומים. צלע במשולש הקטן: $${x.s1}$ ס״מ, והצלע המתאימה בגדול: $${x.s2}$ ס״מ.\nמהו יחס הדמיון?`;
    }
    if(family === 'corresponding_side'){
      if(qtype==='tf') return `שני משולשים דומים ביחס $1:${x.k}$. צלע במשולש הקטן: $${x.a1}$ ס״מ. הצלע המתאימה בגדול: $${tfTrue?x.a2:(x.a1+x.k===x.a2?x.a2+1:x.a1+x.k)}$ ס״מ.`;
      if(qtype==='mistake') return `יחס דמיון $1:${x.k}$, צלע קטנה $${x.a1}$ ס״מ. תלמיד מצא צלע מתאימה: "$${x.a1}+${x.k}=${x.a1+x.k}$ ס״מ".`;
      return `שני משולשים דומים ביחס $1:${x.k}$. צלע במשולש הקטן: $${x.a1}$ ס״מ.\nמה אורך הצלע המתאימה במשולש הגדול?`;
    }
    if(family === 'area_ratio'){
      if(qtype==='tf') return `שני משולשים דומים ביחס $1:${x.k}$. שטח הקטן: $${x.A1}$ סמ״ר. שטח הגדול: $${tfTrue?x.A2:(x.A1*x.k===x.A2?x.A2+x.k:x.A1*x.k)}$ סמ״ר.`;
      if(qtype==='mistake') return `שני משולשים דומים ביחס $1:${x.k}$, שטח הקטן $${x.A1}$ סמ״ר. תלמיד חישב: "שטח הגדול $=${x.A1}\\cdot ${x.k}=${x.A1*x.k}$".`;
      return `שני משולשים דומים ביחס $1:${x.k}$. שטח המשולש הקטן: $${x.A1}$ סמ״ר.\nמה שטח המשולש הגדול?`;
    }
    // is_similar
    const sides = `במשולש הקטן: $${x.a1}$ ו-$${x.b1}$ ס״מ. במשולש הגדול (מתאימות): $${x.a2}$ ו-$${x.b2}$ ס״מ`;
    if(qtype==='mistake') return `${sides}. תלמיד בדק דמיון: "$${x.a2}-${x.a1}=${x.a2-x.a1}$ וגם $${x.b2}-${x.b1}=${x.b2-x.b1}$ — ${x.a2-x.a1===x.b2-x.b1 ? 'ההפרשים שווים, לכן דומים' : 'ההפרשים שונים, לכן לא דומים'}".`;
    if(qtype==='tf') return `${sides}. המשולשים דומים.`;
    return `${sides}.\nהאם המשולשים דומים? נמקו.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !(family==='is_similar' ? x.sim : tfTrue));
    if(family === 'scale_factor'){
      const prefix = wrong ? 'שגוי — יחס דמיון נמצא בחילוק, לא בחיסור.\n' : '';
      return `${prefix}$$k=\\frac{${x.s2}}{${x.s1}}=${x.k}$$\nיחס הדמיון: $1:${x.k}$.`;
    }
    if(family === 'corresponding_side'){
      const prefix = wrong ? 'שגוי — ביחס דמיון מכפילים, לא מחברים.\n' : '';
      return `${prefix}$$${x.a1}\\cdot ${x.k}=${x.a2}$$\nהצלע המתאימה: $${x.a2}$ ס״מ.`;
    }
    if(family === 'area_ratio'){
      const prefix = wrong ? 'שגוי — יחס שטחים אינו יחס הצלעות: כל מימד גדל פי $'+x.k+'$, ולכן השטח גדל פי $'+x.k+'^2$.\n' : '';
      return `${prefix}יחס שטחים = ריבוע יחס הדמיון:\n$$\\frac{S_2}{S_1}=${x.k}^2=${x.k*x.k}$$\n$$S_2=${x.A1}\\cdot ${x.k*x.k}=${x.A2}$$`;
    }
    // is_similar
    const r1 = x.a2/x.a1, r2 = Math.round(x.b2/x.b1*100)/100;
    const prefix = wrong ? 'שגוי בנימוק — דמיון נבדק לפי יחס (מנה) של צלעות מתאימות, לא לפי הפרש.\n' : '';
    if(x.sim) return `${prefix}$$\\frac{${x.a2}}{${x.a1}}=${r1}\\quad\\frac{${x.b2}}{${x.b1}}=${x.k}$$\nהיחסים שווים — המשולשים דומים ביחס $1:${x.k}$.`;
    return `${prefix}$$\\frac{${x.a2}}{${x.a1}}=${r1}\\quad\\frac{${x.b2}}{${x.b1}}=${r2}$$\nהיחסים שונים — המשולשים אינם דומים.`;
  }

  E.generateG804Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    let svg;
    if(family === 'scale_factor') svg = E.similarTrianglesSvg({s1:x.s1, s2:x.s2}, null);
    else if(family === 'area_ratio') svg = E.similarTrianglesSvg({s1:1, s2:x.k}, null);
    else if(family === 'corresponding_side') svg = E.similarTrianglesSvg({s1:x.a1, s2:null}, 's2');
    else svg = E.similarTrianglesSvg({s1:x.a1, s2:x.a2}, null);
    const tfTrue = questionType==='tf' && family!=='is_similar' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue);
    const a = answer(family,x,questionType,tfTrue);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf'){
      const isTrue = family === 'is_similar' ? x.sim : tfTrue;
      return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    }
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
