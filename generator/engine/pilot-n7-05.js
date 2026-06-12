// generator/engine/pilot-n7-05.js
// N7-05 Signed Multiplication/Division — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md, 07
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // Source ranges (PATTERN_INDEX N7-05: factors −12..12; learning file 05:
  // values changeable, sign rules fixed). Cases generated dynamically with at
  // least one negative factor, so directed-sign reasoning is always exercised.
  function rnd(lo,hi){ return lo + Math.floor(Math.random()*(hi-lo+1)); }
  function sgn(){ return Math.random()<0.5 ? -1 : 1; }
  function caseMul(){
    let a=rnd(2,9)*sgn(), b=rnd(2,9)*sgn();
    if(a>0 && b>0) a=-a;
    return {a:a,b:b,r:a*b};
  }
  function caseDiv(){
    let d=rnd(2,9)*sgn(), q=rnd(2,8)*sgn();
    if(d>0 && q>0) d=-d;
    return {a:d*q,b:d,r:q};
  }
  function caseMissingFactor(){
    let a=rnd(2,9)*sgn(), m=rnd(2,8)*sgn();
    if(a>0 && m>0) m=-m;
    return {a:a,r:a*m,m:m};
  }

  function pickFamily(diff){
    if(diff === 'basic') return 'mul';
    if(diff === 'challenge') return E.pick(['missing_factor','div','missing_factor']);
    return E.pick(['mul','div','missing_factor']);
  }
  function pickCase(f){
    if(f==='div') return caseDiv();
    if(f==='missing_factor') return caseMissingFactor();
    return caseMul();
  }
  function wrap(n){ return n < 0 ? '(' + n + ')' : '' + n; }

  function choices(family,x){
    const correct = family==='missing_factor' ? x.m : x.r;
    const wrongs = [-correct, correct+2, family==='mul' ? x.a+x.b : Math.abs(correct)+1];
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct + values.length*3; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='mul'){
      if(qtype==='tf') return `$${wrap(x.a)} \\times ${wrap(x.b)} = ${tfTrue?x.r:-x.r}$.`;
      if(qtype==='mistake') return `תלמיד חישב: "$${wrap(x.a)} \\times ${wrap(x.b)} = ${-x.r}$" — טעה בסימן.`;
      return `חשבו: $$${wrap(x.a)} \\times ${wrap(x.b)} = ?$$`;
    }
    if(family==='div'){
      if(qtype==='tf') return `$${wrap(x.a)} \\div ${wrap(x.b)} = ${tfTrue?x.r:-x.r}$.`;
      if(qtype==='mistake') return `תלמיד חישב: "$${wrap(x.a)} \\div ${wrap(x.b)} = ${-x.r}$" — טעה בכלל הסימנים.`;
      return `חשבו: $$${wrap(x.a)} \\div ${wrap(x.b)} = ?$$`;
    }
    if(qtype==='tf') return `$${wrap(x.a)} \\times \\square = ${x.r}$ — הגורם החסר הוא $${tfTrue?x.m:-x.m}$.`;
    if(qtype==='mistake') return `$${wrap(x.a)} \\times \\square = ${x.r}$. תלמיד כתב: "$\\square=${-x.m}$".`;
    return `השלימו את הגורם החסר:\n$$${wrap(x.a)} \\times \\square = ${x.r}$$`;
  }

  function signRule(a,b){
    return (a<0) === (b<0) ? 'סימנים זהים → תוצאה חיובית' : 'סימנים שונים → תוצאה שלילית';
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='mul'){
      const prefix = wrong ? 'שגוי בסימן.\n' : '';
      return `${prefix}${signRule(x.a,x.b)}:\n$$${wrap(x.a)} \\times ${wrap(x.b)} = ${x.r}$$`;
    }
    if(family==='div'){
      const prefix = wrong ? 'שגוי בסימן.\n' : '';
      return `${prefix}${signRule(x.a,x.b)} (כללי הסימנים זהים בכפל ובחילוק):\n$$${wrap(x.a)} \\div ${wrap(x.b)} = ${x.r}$$`;
    }
    const prefix = wrong ? 'שגוי — בודקים את הסימן: ' + signRule(x.a,x.m) + '.\n' : '';
    return `${prefix}$$\\square = ${x.r} \\div ${wrap(x.a)} = ${x.m}$$\nבדיקה: $${wrap(x.a)} \\times ${wrap(x.m)} = ${x.r}$ ✓`;
  }

  E.generateN705Engine = function(difficulty, questionType){
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
