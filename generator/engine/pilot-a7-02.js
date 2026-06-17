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
  // Two-variable substitution — source file 01 (e.g. 5b−1.5c; here integer coeffs).
  function caseSubTwo(){
    const A=rnd(2,6), B=rnd(2,5)*(Math.random()<0.6?-1:1), b=rnd(2,8), c=rnd(2,7);
    return {A:A,B:B,b:b,c:c,r:A*b+B*c};
  }
  // Two-variable expression with powers — source file 01 (e.g. h³+4k²−4).
  function caseSubPow2(){
    const h=rnd(2,3), k=rnd(2,4), j=rnd(2,5), c=rnd(2,8)*(Math.random()<0.5?-1:1);
    return {h:h,k:k,j:j,c:c,r:h*h*h + j*k*k + c};
  }
  // Applied-formula substitution — source files 01/08: substitute into a NAMED real
  // formula, not a bare expression. drop height h=5t² (free fall) and the canonical
  // Celsius→Fahrenheit F=1.8C+32. (User-supplied screenshot: h=5t².)
  function caseFormula(){
    if(Math.random()<0.5){
      const t=rnd(3,6);                      // h = 5t²  (meters after t seconds)
      return {kind:'drop', v:t, r:5*t*t, wrongR:10*t};
    }
    const C=[5,10,15,20,25,30][Math.floor(Math.random()*6)]; // F = 1.8C + 32 (integer)
    const mult=9*C/5;                        // the 1.8·C part, exact integer
    return {kind:'temp', v:C, mult:mult, r:mult+32, wrongR:C+32};
  }
  // Expression-value range — source files 01/08 reasoning ("אם t בין 6 ל-9, בין מה
  // נמצא t+5?"). Evaluate a linear expression at both ends of an interval. k≥2 keeps
  // the distractors (forgot +c / treated k as 1) distinct from the correct range.
  function caseRange(){
    const k=rnd(2,4), c=rnd(1,9), a=rnd(2,7), b=a+rnd(2,5);
    return {k:k, c:c, a:a, b:b, lo:k*a+c, hi:k*b+c};
  }
  const rangeExpr = x => `${x.k}x+${x.c}`;

  function pickFamily(diff){
    // רמה 1: substitute a positive into kx+c. רמה 2: + negatives, single power, two-var, formula.
    // רמה 3: powers (incl. cube), two-variable, applied formula, value over an interval.
    if(diff === 'basic') return 'sub_pos';
    if(diff === 'challenge') return E.pick(['sub_neg','sub_power','sub_pow2','sub_two','formula','range']);
    return E.pick(['sub_pos','sub_neg','sub_power','sub_two','formula','range']);
  }
  function pickCase(f){
    if(f==='sub_neg') return caseSubNeg();
    if(f==='sub_power') return caseSubPower();
    if(f==='sub_two') return caseSubTwo();
    if(f==='sub_pow2') return caseSubPow2();
    if(f==='formula') return caseFormula();
    if(f==='range') return caseRange();
    return caseSubPos();
  }
  // expression + substitution display for the two-variable families
  function twoExpr(x){ return `${x.A}b${x.B<0?x.B+'c':'+'+x.B+'c'}`; }
  function twoSub(x){ return `${x.A}\\cdot ${x.b}${x.B<0?'-'+Math.abs(x.B)+'\\cdot '+x.c:'+'+x.B+'\\cdot '+x.c}`; }
  function pow2Expr(x){ return `h^3+${x.j}k^2${x.c<0?x.c:'+'+x.c}`; }
  function pow2Sub(x){ return `${x.h}^3+${x.j}\\cdot ${x.k}^2${x.c<0?x.c:'+'+x.c}`; }
  function wrap(n){ return n < 0 ? '(' + n + ')' : '' + n; }

  function choices(family,x){
    if(family==='range'){
      // range answers are intervals, not single numbers — build range-text options
      const opts=[
        {t:`בין $${x.lo}$ ל-$${x.hi}$`, ok:true},
        {t:`בין $${x.k*x.a}$ ל-$${x.k*x.b}$`, ok:false},   // forgot +c
        {t:`בין $${x.a+x.c}$ ל-$${x.b+x.c}$`, ok:false},   // treated k as 1
        {t:`בין $${x.lo}$ ל-$${x.hi+x.k}$`, ok:false}      // wrong upper endpoint
      ];
      const seen=new Set(), uniq=[];
      for(const o of opts){ if(!seen.has(o.t)){ seen.add(o.t); uniq.push(o); } }
      let pad=x.hi+2*x.k;
      while(uniq.length<4){ const t=`בין $${x.lo}$ ל-$${pad}$`; if(!seen.has(t)){ seen.add(t); uniq.push({t:t,ok:false}); } pad+=x.k; }
      return E.shuffle(uniq.slice(0,4)).map((o,i)=>({label:['א','ב','ג','ד'][i], text:o.t, correct:o.ok}));
    }
    let correct = x.r, wrongs;
    if(family==='formula') wrongs = x.kind==='drop' ? [x.wrongR, 25*x.v*x.v, 5*x.v] : [x.wrongR, x.mult, 2*x.v+32];
    else if(family==='sub_two') wrongs = [x.A*x.b+Math.abs(x.B)*x.c, x.A+x.B+x.b+x.c, x.r+x.A];
    else if(family==='sub_pow2') wrongs = [x.h*3+x.j*x.k*2+x.c, x.h*x.h*x.h+x.j*x.k*2+x.c, x.r-2*x.c];
    else if(family==='sub_power') wrongs = [x.v < 0 ? -(x.v*x.v)+x.c : (x.v*2)+x.c, x.r+x.c, x.v*x.v];
    else if(family==='sub_neg') wrongs = [x.k*Math.abs(x.v)+x.c, x.r-2*x.c, -x.r];
    else wrongs = [x.k+x.c+x.v, x.r+x.k, x.r-x.c];
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct+values.length*2; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='range'){
      const e=rangeExpr(x);
      if(qtype==='tf'){ const lo=tfTrue?x.lo:x.k*x.a, hi=tfTrue?x.hi:x.k*x.b;
        return `אם המספר $x$ נמצא בין $${x.a}$ ל-$${x.b}$, אז ערך הביטוי $${e}$ נמצא בין $${lo}$ ל-$${hi}$.`; }
      if(qtype==='mistake') return `נתון ש-$x$ נמצא בין $${x.a}$ ל-$${x.b}$. תלמיד טען שהביטוי $${e}$ נמצא בין $${x.k*x.a}$ ל-$${x.k*x.b}$.`;
      if(qtype==='mcq') return `המספר $x$ נמצא בין $${x.a}$ ל-$${x.b}$.\nבין אילו ערכים נמצא הביטוי $${e}$?`;
      return `המספר $x$ נמצא בין $${x.a}$ ל-$${x.b}$.\nבין אילו ערכים נמצא ערך הביטוי $${e}$?`;
    }
    if(family==='formula'){
      if(x.kind==='drop'){
        const f='h=5t^2';
        if(qtype==='tf') return `גוף נופל ממנוחה, והדרך שעבר (במטרים) אחרי $t$ שניות נתונה בנוסחה $${f}$. אחרי $t=${x.v}$ שניות הגוף עבר $${tfTrue?x.r:x.wrongR}$ מטרים.`;
        if(qtype==='mistake') return `לפי הנוסחה $${f}$, תלמיד חישב את הדרך אחרי $t=${x.v}$ שניות כך: "$5\\cdot ${x.v}\\cdot 2=${x.wrongR}$".`;
        if(qtype==='mcq') return `גוף נופל ממנוחה, והדרך שעבר (במטרים) אחרי $t$ שניות נתונה בנוסחה $${f}$.\nמהי הדרך אחרי $t=${x.v}$ שניות?`;
        return `גוף נופל ממנוחה. הדרך שעבר (במטרים) אחרי $t$ שניות נתונה בנוסחה $$${f}$$\nחשבו את הדרך שעבר הגוף אחרי $t=${x.v}$ שניות.`;
      }
      const f='F=1.8C+32';
      if(qtype==='tf') return `להמרת מעלות צלזיוס ($C$) למעלות פרנהייט ($F$) משתמשים בנוסחה $${f}$. $${x.v}$ מעלות צלזיוס שוות ל-$${tfTrue?x.r:x.wrongR}$ מעלות פרנהייט.`;
      if(qtype==='mistake') return `לפי הנוסחה $${f}$, תלמיד המיר $${x.v}$ מעלות צלזיוס וקיבל $${x.wrongR}$ — שכח להכפיל ב-$1.8$.`;
      if(qtype==='mcq') return `להמרת מעלות צלזיוס ($C$) למעלות פרנהייט ($F$) משתמשים בנוסחה $${f}$.\nכמה מעלות פרנהייט הן $${x.v}$ מעלות צלזיוס?`;
      return `להמרת מעלות צלזיוס ($C$) למעלות פרנהייט ($F$) משתמשים בנוסחה $$${f}$$\nכמה מעלות פרנהייט הן $${x.v}$ מעלות צלזיוס?`;
    }
    if(family==='sub_two'){
      const e=twoExpr(x), wrongR=x.A*x.b+Math.abs(x.B)*x.c;
      if(qtype==='tf') return `ערך הביטוי $${e}$ כאשר $b=${x.b}$ ו-$c=${x.c}$ הוא $${tfTrue?x.r:wrongR}$.`;
      if(qtype==='mistake') return `תלמיד הציב $b=${x.b}$ ו-$c=${x.c}$ בביטוי $${e}$ וקיבל $${wrongR}$.`;
      return `חשבו את ערך הביטוי $${e}$ כאשר $b=${x.b}$ ו-$c=${x.c}$.`;
    }
    if(family==='sub_pow2'){
      const e=pow2Expr(x), wrongR=x.h*3+x.j*x.k*2+x.c;
      if(qtype==='tf') return `ערך הביטוי $${e}$ כאשר $h=${x.h}$ ו-$k=${x.k}$ הוא $${tfTrue?x.r:wrongR}$.`;
      if(qtype==='mistake') return `תלמיד הציב $h=${x.h}$ ו-$k=${x.k}$ בביטוי $${e}$: "$${x.h}\\cdot 3=${x.h*3}$, $${x.j}\\cdot${x.k}\\cdot 2=${x.j*x.k*2}$" וקיבל $${wrongR}$.`;
      return `חשבו את ערך הביטוי $${e}$ כאשר $h=${x.h}$ ו-$k=${x.k}$.`;
    }
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
    if(family==='range'){
      const e=rangeExpr(x);
      const prefix = wrong ? 'שגוי — יש להציב את שני קצות התחום בביטוי המלא (כולל ה-$+'+x.c+'$), לא רק את מקדם ה-$x$.\n' : '';
      return `${prefix}מציבים את שני קצות התחום בביטוי $${e}$:
כאשר $x=${x.a}$:  $${x.k}\\cdot ${x.a}+${x.c}=${x.lo}$.
כאשר $x=${x.b}$:  $${x.k}\\cdot ${x.b}+${x.c}=${x.hi}$.
המקדם של $x$ חיובי, ולכן הביטוי גדל עם $x$ — הוא נמצא בין $${x.lo}$ ל-$${x.hi}$.`;
    }
    if(family==='formula'){
      if(x.kind==='drop'){
        const prefix = wrong ? 'שגוי — $t^2$ הוא כפל עצמי ($t\\cdot t$), לא כפל ב-$2$.\n' : '';
        return `${prefix}מציבים $t=${x.v}$ בנוסחה:
$$h=5t^2=5\\cdot ${x.v}^2=5\\cdot ${x.v*x.v}=${x.r}$$
הדרך שעבר הגוף היא $${x.r}$ מטרים.`;
      }
      const prefix = wrong ? 'שגוי — לפי הנוסחה מכפילים תחילה ב-$1.8$ ורק אז מוסיפים $32$.\n' : '';
      return `${prefix}מציבים $C=${x.v}$ בנוסחה:
$$F=1.8C+32=1.8\\cdot ${x.v}+32=${x.mult}+32=${x.r}$$
כלומר $${x.v}$ מעלות צלזיוס שוות ל-$${x.r}$ מעלות פרנהייט.`;
    }
    if(family==='sub_two'){
      const prefix = wrong ? 'שגוי — יש להציב כל משתנה בנפרד ולשמור על הסימן של כל מחובר.\n' : '';
      return `${prefix}מציבים $b=${x.b}$ ו-$c=${x.c}$:
$$${twoExpr(x)}=${twoSub(x)}=${x.A*x.b}${x.B*x.c<0?x.B*x.c:'+'+x.B*x.c}=${x.r}$$`;
    }
    if(family==='sub_pow2'){
      const prefix = wrong ? 'שגוי — חזקה היא כפל עצמי: $h^3=h\\cdot h\\cdot h$ ו-$k^2=k\\cdot k$, לא כפל במעריך.\n' : '';
      return `${prefix}מציבים $h=${x.h}$ ו-$k=${x.k}$:
$$${pow2Expr(x)}=${pow2Sub(x)}=${x.h*x.h*x.h}+${x.j*x.k*x.k}${x.c<0?x.c:'+'+x.c}=${x.r}$$`;
    }
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
