// generator/engine/pilot-a7-02.js
// A7-02 Substitution in Expression — Smart Engine
// Source: source-learning/2026-06-09/01_grade-7_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // Learning files 01+08: substitution values are teacher-changeable; cases are
  // generated dynamically (k·x+c with positive/negative x, x²+c) instead of a
  // fixed 4–5 item pool. sub_pos / sub_neg / sub_power family names preserved.
  function rnd(lo,hi){ return lo + Math.floor(Math.random()*(hi-lo+1)); }
  function caseSubPos(){
    let k=rnd(2,6), v=rnd(2,6);
    while(k===2 && v===2) v=rnd(3,6); // keep k+c+v distinct from k·v+c (TF distractor)
    const c=rnd(1,9);
    return {k:k,c:c,v:v,r:k*v+c};
  }
  function caseSubNeg(){
    const k=rnd(2,5), v=-rnd(1,4), c=rnd(5,20);
    return {k:k,c:c,v:v,r:k*v+c};
  }
  function caseSubPower(){
    const v=rnd(3,6)*(Math.random()<0.5?-1:1), c=rnd(1,4);
    return {v:v,c:c,r:v*v+c};
  }

  function pickFamily(diff){
    if(diff === 'basic') return 'sub_pos';
    if(diff === 'challenge') return E.pick(['sub_power','sub_neg','sub_power']);
    return E.pick(['sub_pos','sub_neg','sub_power']);
  }
  function pickCase(f){
    if(f==='sub_neg') return caseSubNeg();
    if(f==='sub_power') return caseSubPower();
    return caseSubPos();
  }
  function wrap(n){ return n < 0 ? '(' + n + ')' : '' + n; }

  function choices(family,x){
    let correct = x.r, wrongs;
    if(family==='sub_power') wrongs = [x.v < 0 ? -(x.v*x.v)+x.c : (x.v*2)+x.c, x.r+x.c, x.v*x.v];
    else if(family==='sub_neg') wrongs = [x.k*Math.abs(x.v)+x.c, x.r-2*x.c, -x.r];
    else wrongs = [x.k+x.c+x.v, x.r+x.k, x.r-x.c];
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct+values.length*2; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='sub_power'){
      if(qtype==='tf') return `ערך הביטוי $x^2+${x.c}$ כאשר $x=${x.v}$ הוא $${tfTrue ? x.r : (x.v<0 ? -(x.v*x.v)+x.c : x.r+1)}$.`;
      if(qtype==='mistake') return `תלמיד הציב $x=${x.v}$ בביטוי $x^2+${x.c}$: "$${x.v}^2=${x.v<0?-(x.v*x.v):x.v*2}$, ועוד $${x.c}$: $${x.v<0?-(x.v*x.v)+x.c:x.v*2+x.c}$".`;
      return `חשבו את ערך הביטוי $x^2+${x.c}$ כאשר $x=${x.v}$.`;
    }
    const expr = `${x.k}x+${x.c}`;
    if(qtype==='tf') return `ערך הביטוי $${expr}$ כאשר $x=${x.v}$ הוא $${tfTrue ? x.r : x.k+x.c+x.v}$.`;
    if(qtype==='mistake') return `תלמיד הציב $x=${wrap(x.v)}$ בביטוי $${expr}$: "$${x.k}+${x.v}+${x.c}=${x.k+x.v+x.c}$".`;
    return `חשבו את ערך הביטוי $${expr}$ כאשר $x=${wrap(x.v)}$.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='sub_power'){
      const sq = x.v*x.v;
      const prefix = wrong ? 'שגוי — ' + (x.v<0 ? 'מספר שלילי בריבוע נותן תוצאה חיובית: $(-a)^2=a^2$.' : 'חזקה היא כפל עצמי, לא כפל ב-$2$.') + '\n' : '';
      return `${prefix}$$x^2+${x.c}=${wrap(x.v)}^2+${x.c}=${sq}+${x.c}=${x.r}$$`;
    }
    const prefix = wrong ? 'שגוי — $'+x.k+'x$ פירושו $'+x.k+'$ כפול $x$, לא חיבור.\n' : '';
    return `${prefix}$$${x.k}x+${x.c}=${x.k}\\cdot ${wrap(x.v)}+${x.c}=${x.k*x.v}+${x.c}=${x.r}$$`;
  }

  E.generateA702Engine = function(difficulty, questionType){
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
