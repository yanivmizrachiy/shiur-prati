// generator/engine/pilot-n7-04.js
// N7-04 Signed Addition/Subtraction — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md, 07
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const ADD_SAME = [
    {a:-8,b:-5,r:-13},{a:-7,b:-3,r:-10},{a:-12,b:-6,r:-18},{a:-4,b:-9,r:-13},{a:-11,b:-2,r:-13}
  ];
  const ADD_DIFF = [
    {a:-7,b:12,r:5},{a:9,b:-4,r:5},{a:-15,b:6,r:-9},{a:8,b:-13,r:-5},{a:-3,b:10,r:7}
  ];
  const SUB_NEG = [
    {a:5,b:-3,r:8},{a:-2,b:-7,r:5},{a:4,b:-6,r:10},{a:-8,b:-3,r:-5},{a:0,b:-9,r:9}
  ];
  const MISSING = [
    {a:-6,r:-2,m:4},{a:7,r:-3,m:-10},{a:-4,r:5,m:9},{a:-9,r:-15,m:-6},{a:3,r:-4,m:-7}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['add_same','add_diff']);
    if(diff === 'challenge') return E.pick(['missing_addend','sub_neg','missing_addend']);
    return E.pick(['add_same','add_diff','sub_neg','missing_addend']);
  }
  function pickCase(f){
    if(f==='add_diff') return E.pick(ADD_DIFF);
    if(f==='sub_neg') return E.pick(SUB_NEG);
    if(f==='missing_addend') return E.pick(MISSING);
    return E.pick(ADD_SAME);
  }
  function wrap(n){ return n < 0 ? '(' + n + ')' : '' + n; }

  function choices(family,x){
    let correct, wrongs;
    if(family==='missing_addend'){ correct=x.m; wrongs=[-x.m, x.r-x.a===x.m?x.r+x.a:x.r-x.a, x.m+2]; }
    else { correct=x.r; wrongs=[-x.r, family==='sub_neg'?x.a-Math.abs(x.b):x.a+Math.abs(x.b), x.r+3]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4) values.push(correct - values.length*2);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family==='missing_addend'){
      if(qtype==='tf') return `$${wrap(x.a)} + \\square = ${x.r}$ — המספר החסר הוא $${-x.m}$.`;
      if(qtype==='mistake') return `$${wrap(x.a)} + \\square = ${x.r}$. תלמיד כתב: "$\\square = ${x.r}+${wrap(x.a)} = ${x.r + x.a}$".`;
      return `השלימו את המספר החסר:\n$$${wrap(x.a)} + \\square = ${x.r}$$`;
    }
    const op = family==='sub_neg' ? '-' : '+';
    const expr = `${wrap(x.a)} ${op} ${wrap(x.b)}`;
    if(qtype==='tf'){
      const wrongR = family==='sub_neg' ? x.a - Math.abs(x.b) : -x.r;
      return `$${expr} = ${wrongR === x.r ? x.r + 1 : wrongR}$.`;
    }
    if(qtype==='mistake'){
      if(family==='sub_neg') return `תלמיד חישב: "$${expr} = ${x.a - Math.abs(x.b)}$" — חיסר את $${Math.abs(x.b)}$.`;
      return `תלמיד חישב: "$${expr} = ${-x.r}$" — התבלבל בסימן התוצאה.`;
    }
    return `חשבו: $$${expr} = ?$$`;
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
    if(family==='add_same'){
      const prefix = wrong ? 'שגוי — שני שליליים: מחברים מרחקים ושומרים מינוס.\n' : '';
      return `${prefix}שני המספרים שליליים — מחברים את המרחקים מאפס ושומרים על הסימן:\n$$${wrap(x.a)}+${wrap(x.b)}=${x.r}$$`;
    }
    if(family==='add_diff'){
      const prefix = wrong ? 'שגוי בסימן.\n' : '';
      const big = Math.abs(x.a) > Math.abs(x.b) ? x.a : x.b;
      return `${prefix}סימנים שונים — מחסרים את המרחקים, והסימן לפי המספר הרחוק יותר מאפס ($${big}$):\n$$${wrap(x.a)}+${wrap(x.b)}=${x.r}$$`;
    }
    if(family==='sub_neg'){
      const prefix = wrong ? 'שגוי — חיסור מספר שלילי שווה לחיבור: $-(-b)=+b$.\n' : '';
      return `${prefix}חיסור שלילי הופך לחיבור:\n$$${wrap(x.a)}-${wrap(x.b)}=${x.a}+${Math.abs(x.b)}=${x.r}$$`;
    }
    const prefix = wrong ? 'שגוי — את המספר החסר מוצאים בחיסור: $\\square = ${x.r}-${wrap(x.a)}$.\n'.replace('${x.r}',x.r).replace('${wrap(x.a)}',wrap(x.a)) : '';
    return `${prefix}$$\\square = ${x.r}-${wrap(x.a)}=${x.m}$$\nבדיקה: $${wrap(x.a)}+${wrap(x.m)}=${x.r}$ ✓`;
  }

  E.generateN704Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const q = question(family,x,questionType), a = answer(family,x,questionType);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:false});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
