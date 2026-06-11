// generator/engine/pilot-n7-05.js
// N7-05 Signed Multiplication/Division — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md, 07
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const MUL = [
    {a:6,b:-4,r:-24},{a:-3,b:-7,r:21},{a:-5,b:8,r:-40},{a:-9,b:-4,r:36},{a:7,b:-6,r:-42}
  ];
  const DIV = [
    {a:-24,b:6,r:-4},{a:-36,b:-9,r:4},{a:42,b:-7,r:-6},{a:-45,b:9,r:-5},{a:-48,b:-6,r:8}
  ];
  const MISSING_FACTOR = [
    {a:-4,r:20,m:-5},{a:6,r:-18,m:-3},{a:-7,r:-28,m:4},{a:-8,r:40,m:-5},{a:9,r:-36,m:-4}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'mul';
    if(diff === 'challenge') return E.pick(['missing_factor','div','missing_factor']);
    return E.pick(['mul','div','missing_factor']);
  }
  function pickCase(f){
    if(f==='div') return E.pick(DIV);
    if(f==='missing_factor') return E.pick(MISSING_FACTOR);
    return E.pick(MUL);
  }
  function wrap(n){ return n < 0 ? '(' + n + ')' : '' + n; }

  function choices(family,x){
    const correct = family==='missing_factor' ? x.m : x.r;
    const wrongs = [-correct, correct+2, family==='mul' ? x.a+x.b : Math.abs(correct)+1];
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct + values.length*3; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family==='mul'){
      if(qtype==='tf') return `$${wrap(x.a)} \\times ${wrap(x.b)} = ${-x.r}$.`;
      if(qtype==='mistake') return `תלמיד חישב: "$${wrap(x.a)} \\times ${wrap(x.b)} = ${-x.r}$" — טעה בסימן.`;
      return `חשבו: $$${wrap(x.a)} \\times ${wrap(x.b)} = ?$$`;
    }
    if(family==='div'){
      if(qtype==='tf') return `$${wrap(x.a)} \\div ${wrap(x.b)} = ${-x.r}$.`;
      if(qtype==='mistake') return `תלמיד חישב: "$${wrap(x.a)} \\div ${wrap(x.b)} = ${-x.r}$" — טעה בכלל הסימנים.`;
      return `חשבו: $$${wrap(x.a)} \\div ${wrap(x.b)} = ?$$`;
    }
    if(qtype==='tf') return `$${wrap(x.a)} \\times \\square = ${x.r}$ — הגורם החסר הוא $${-x.m}$.`;
    if(qtype==='mistake') return `$${wrap(x.a)} \\times \\square = ${x.r}$. תלמיד כתב: "$\\square=${-x.m}$".`;
    return `השלימו את הגורם החסר:\n$$${wrap(x.a)} \\times \\square = ${x.r}$$`;
  }

  function signRule(a,b){
    return (a<0) === (b<0) ? 'סימנים זהים → תוצאה חיובית' : 'סימנים שונים → תוצאה שלילית';
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
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
    const q = question(family,x,questionType), a = answer(family,x,questionType);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:false});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
