// generator/engine/pilot-a7-02.js
// A7-02 Substitution in Expression — Smart Engine
// Source: source-learning/2026-06-09/01_grade-7_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const SUB_POS = [
    {k:2,c:7,v:3,r:13},{k:3,c:5,v:4,r:17},{k:5,c:2,v:6,r:32},{k:4,c:9,v:2,r:17},{k:6,c:1,v:5,r:31}
  ];
  const SUB_NEG = [
    {k:2,c:7,v:-3,r:1},{k:3,c:10,v:-2,r:4},{k:4,c:5,v:-1,r:1},{k:5,c:20,v:-3,r:5}
  ];
  const SUB_POWER = [
    {v:3,c:1,r:10},{v:4,c:2,r:18},{v:5,c:3,r:28},{v:-3,c:1,r:10},{v:-4,c:2,r:18}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'sub_pos';
    if(diff === 'challenge') return E.pick(['sub_power','sub_neg','sub_power']);
    return E.pick(['sub_pos','sub_neg','sub_power']);
  }
  function pickCase(f){
    if(f==='sub_neg') return E.pick(SUB_NEG);
    if(f==='sub_power') return E.pick(SUB_POWER);
    return E.pick(SUB_POS);
  }
  function wrap(n){ return n < 0 ? '(' + n + ')' : '' + n; }

  function choices(family,x){
    let correct = x.r, wrongs;
    if(family==='sub_power') wrongs = [x.v < 0 ? -(x.v*x.v)+x.c : (x.v*2)+x.c, x.r+x.c, x.v*x.v];
    else if(family==='sub_neg') wrongs = [x.k*Math.abs(x.v)+x.c, x.r-2*x.c, -x.r];
    else wrongs = [x.k+x.c+x.v, x.r+x.k, x.r-x.c];
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4) values.push(correct+values.length*2);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family==='sub_power'){
      if(qtype==='tf') return `ערך הביטוי $x^2+${x.c}$ כאשר $x=${x.v}$ הוא $${x.v<0 ? -(x.v*x.v)+x.c : x.r+1}$.`;
      if(qtype==='mistake') return `תלמיד הציב $x=${x.v}$ בביטוי $x^2+${x.c}$: "$${x.v}^2=${x.v<0?-(x.v*x.v):x.v*2}$, ועוד $${x.c}$: $${x.v<0?-(x.v*x.v)+x.c:x.v*2+x.c}$".`;
      return `חשבו את ערך הביטוי $x^2+${x.c}$ כאשר $x=${x.v}$.`;
    }
    const expr = `${x.k}x+${x.c}`;
    if(qtype==='tf') return `ערך הביטוי $${expr}$ כאשר $x=${x.v}$ הוא $${x.k+x.c+x.v}$.`;
    if(qtype==='mistake') return `תלמיד הציב $x=${wrap(x.v)}$ בביטוי $${expr}$: "$${x.k}+${x.v}+${x.c}=${x.k+x.v+x.c}$".`;
    return `חשבו את ערך הביטוי $${expr}$ כאשר $x=${wrap(x.v)}$.`;
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
    if(family==='sub_power'){
      const sq = x.v*x.v;
      const prefix = wrong ? 'שגוי — ' + (x.v<0 ? 'מספר שלילי בריבוע נותן תוצאה חיובית: $(-a)^2=a^2$.' : 'חזקה היא כפל עצמי, לא כפל ב-$2$.') + '\n' : '';
      return `${prefix}$$x^2+${x.c}=${wrap(x.v)}^2+${x.c}=${sq}+${x.c}=${x.r}$$`;
    }
    const prefix = wrong ? 'שגוי — $'+x.k+'x$ פירושו $'+x.k+'$ כפול $x$, לא חיבור.\n' : '';
    return `${prefix}$$${x.k}x+${x.c}=${x.k}\\times ${wrap(x.v)}+${x.c}=${x.k*x.v}+${x.c}=${x.r}$$`;
  }

  E.generateA702Engine = function(difficulty, questionType){
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
