// generator/engine/pilot-a7-03.js
// A7-03 First-Degree Equations — Smart Engine
// Source: source-learning/2026-06-09/01_grade-7_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const ONE_STEP = [
    {a:1,b:7,c:12,x:5},{a:1,b:-4,c:9,x:13},{a:5,b:0,c:35,x:7},{a:6,b:0,c:42,x:7},{a:1,b:9,c:15,x:6}
  ];
  const TWO_STEP = [
    {a:3,b:5,c:20,x:5},{a:4,b:-3,c:17,x:5},{a:2,b:7,c:19,x:6},{a:5,b:4,c:39,x:7},{a:7,b:-6,c:29,x:5}
  ];
  const PARENS = [
    {k:3,b:2,c:21,x:5},{k:2,b:5,c:18,x:4},{k:4,b:1,c:28,x:6},{k:5,b:3,c:40,x:5}
  ];
  const VERIFY = [
    {a:3,b:5,c:20,x:5,ok:true},{a:2,b:7,c:19,x:5,ok:false},{a:4,b:-3,c:17,x:5,ok:true},{a:5,b:4,c:39,x:8,ok:false}
  ];
  // Word problem → BUILD an equation (source file 01: ball price + increase).
  // n1·(x+d) = n2·x  →  x = n1·d/(n2−n1). Pre-validated for integer x.
  const WORD_EQ = [
    {item:'כדור',pl:'כדורים',n1:15,d:6,n2:18,x:30},{item:'מחברת',pl:'מחברות',n1:8,d:5,n2:10,x:20},
    {item:'ספר',pl:'ספרים',n1:12,d:4,n2:16,x:12},{item:'עט',pl:'עטים',n1:10,d:9,n2:13,x:30}
  ];
  // Identify which equation has a given solution (source file 01 MCQ).
  function mkEq(sol){ const m=E.randInt?E.randInt(2,6):2+Math.floor(Math.random()*5); const n=1+Math.floor(Math.random()*(m-1)); const a=1+Math.floor(Math.random()*9); return {m:m,n:n,a:a,b:a+sol*(m-n),sol:sol}; }
  function eqLine(o){ const nx=o.n===1?'x':o.n+'x'; return `${o.m}x${o.a>=0?'+'+o.a:''+o.a}=${nx}${o.b>=0?'+'+o.b:''+o.b}`; }
  function caseIdentify(){
    const s=E.pick([6,8,10,12]);
    const opts=[mkEq(s)]; const usedSol=new Set([s]); const usedStr=new Set([eqLine(opts[0])]);
    let guard=0;
    while(opts.length<4 && guard++<40){
      let w; do{ w=E.pick([s-2,s+2,s-4,s+4,s+1,s-1]); }while(usedSol.has(w)||w<1);
      const o=mkEq(w); const str=eqLine(o);
      if(usedStr.has(str)) continue;
      usedSol.add(w); usedStr.add(str); opts.push(o);
    }
    return {s:s, opts:E.shuffle(opts)};
  }

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['one_step','verify']);
    if(diff === 'challenge') return E.pick(['parens','verify','word_eq','identify_eq']);
    return E.pick(['one_step','two_step','parens','verify','word_eq','identify_eq']);
  }
  function pickCase(f){
    if(f==='two_step') return E.pick(TWO_STEP);
    if(f==='parens') return E.pick(PARENS);
    if(f==='verify') return E.pick(VERIFY);
    if(f==='word_eq') return E.pick(WORD_EQ);
    if(f==='identify_eq') return caseIdentify();
    return E.pick(ONE_STEP);
  }
  function eqStr(x,f){
    if(f==='parens') return `${x.k}(x+${x.b})=${x.c}`;
    if(x.a===1) return x.b>=0 ? `x+${x.b}=${x.c}` : `x-${-x.b}=${x.c}`;
    if(x.b===0) return `${x.a}x=${x.c}`;
    return x.b>=0 ? `${x.a}x+${x.b}=${x.c}` : `${x.a}x-${-x.b}=${x.c}`;
  }

  function choices(family,x){
    if(family==='verify'){
      const c2 = x.ok ? 'כן, פתרון' : 'לא פתרון';
      return E.shuffle([c2, x.ok?'לא פתרון':'כן, פתרון']).map((v,i)=>({label:['א','ב'][i], text:v, correct:v===c2}));
    }
    if(family==='identify_eq'){
      return x.opts.map((o,i)=>({label:['א','ב','ג','ד'][i], text:'$'+eqLine(o)+'$', correct:o.sol===x.s}));
    }
    const correct = x.x;
    const wrongs = family==='word_eq'
      ? [x.x+x.d, x.n1, x.x-x.d].filter(v=>v!==correct && v>0)
      : [x.c-x.b, x.x+1, x.x-1].filter(v=>v!==correct);
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct+values.length+1; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='identify_eq'){
      return `איזו מהמשוואות הבאות פתרונה $x=${x.s}$?`;
    }
    if(family==='word_eq'){
      const ctx=`מחיר ${x.item} הוא $x$ שקלים. לאחר התייקרות ב-$${x.d}$ שקלים, מחיר $${x.n1}$ ${x.pl} שווה למחיר $${x.n2}$ ${x.pl} לפני ההתייקרות.`;
      if(qtype==='tf') return `${ctx} פתרון המשוואה הוא $x=${tfTrue?x.x:x.x+x.d}$.`;
      if(qtype==='mistake') return `${ctx} תלמיד בנה את המשוואה $${x.n1}x+${x.d}=${x.n2}x$ — הוסיף את ההתייקרות פעם אחת בלבד במקום לכל ${x.item}.`;
      if(qtype==='mcq') return `${ctx}\nבנו משוואה ומצאו את המחיר המקורי $x$.`;
      return `${ctx}\nבנו משוואה המתארת את המצב ופתרו (מצאו את $x$).`;
    }
    const eq = eqStr(x,family);
    if(family==='verify'){
      if(qtype==='mistake') return `תלמיד בדק אם $x=${x.x}$ פתרון של $${eq}$ והציב רק באגף שמאל בלי להשוות: "$${x.a}\\cdot ${x.x}${x.b>=0?'+'+x.b:'-'+(-x.b)}=${x.a*x.x+x.b}$ — סיימתי".`;
      return `האם $x=${x.x}$ הוא פתרון של המשוואה $${eq}$? בדקו.`;
    }
    if(qtype==='tf') return `פתרון המשוואה $${eq}$ הוא $x=${tfTrue?x.x:x.x+1}$.`;
    if(qtype==='mistake'){
      if(family==='parens') return `במשוואה $${eq}$ תלמיד פתח סוגריים: "$${x.k}x+${x.b}=${x.c}$" — הכפיל רק את $x$.`;
      return `במשוואה $${eq}$ תלמיד העביר אגף: "$${x.a}x=${x.c}+${Math.abs(x.b)}$" — בלי להפוך סימן.`;
    }
    return `פתרו את המשוואה ובדקו:\n$$${eq}$$`;
  }

  function answer(family,x,qtype,tfTrue){
    if(family==='identify_eq'){
      const c=x.opts.find(o=>o.sol===x.s), nx=c.n===1?'x':c.n+'x';
      return `המשוואה שפתרונה $x=${x.s}$ היא $${eqLine(c)}$.
$$${c.m}x${c.a>=0?'+'+c.a:''+c.a}=${nx}${c.b>=0?'+'+c.b:''+c.b}$$
מעבירים אגפים: $$(${c.m}-${c.n})x=${c.b-c.a}\\;\\Rightarrow\\;${c.m-c.n}x=${c.b-c.a}\\;\\Rightarrow\\;x=${x.s}$$
בשאר המשוואות הצבת $x=${x.s}$ אינה מאזנת בין שני האגפים.`;
    }
    if(family==='word_eq'){
      const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
      const prefix = wrong ? 'שגוי — ההתייקרות חלה על כל פריט, ולכן כופלים $(x+'+x.d+')$ במספר הפריטים.\n' : '';
      return `${prefix}מסמנים את המחיר המקורי ב-$x$; המחיר לאחר התייקרות הוא $x+${x.d}$.
המשוואה: $$${x.n1}(x+${x.d})=${x.n2}x$$
$$${x.n1}x+${x.n1*x.d}=${x.n2}x \\;\\Rightarrow\\; ${x.n1*x.d}=${x.n2-x.n1}x \\;\\Rightarrow\\; x=\\frac{${x.n1*x.d}}{${x.n2-x.n1}}=${x.x}$$
בדיקה: $${x.n1}\\cdot ${x.x+x.d}=${x.n1*(x.x+x.d)}$ ו-$${x.n2}\\cdot ${x.x}=${x.n2*x.x}$ ✓`;
    }
    if(family==='verify'){
      const lhs = x.a*x.x + x.b;
      const prefix = qtype==='mistake' ? 'הטעות: בדיקת פתרון דורשת השוואה לאגף ימין, לא רק חישוב.\n' : '';
      return `${prefix}מציבים $x=${x.x}$:\n$$${x.a}\\cdot ${x.x}${x.b>=0?'+'+x.b:'-'+(-x.b)}=${lhs}$$\n${x.ok ? `$${lhs}=${x.c}$ ✓ — אכן פתרון.` : `$${lhs}\\ne ${x.c}$ ✗ — אינו פתרון.`}`;
    }
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='parens'){
      const prefix = wrong ? 'שגוי — חוק הפילוג: מכפילים את שני האיברים בסוגריים.\n' : '';
      return `${prefix}$$${x.k}(x+${x.b})=${x.c}$$\n$$${x.k}x+${x.k*x.b}=${x.c}$$\n$$${x.k}x=${x.c-x.k*x.b}$$\n$$x=${x.x}$$\nבדיקה: $${x.k}(${x.x}+${x.b})=${x.k}\\cdot ${x.x+x.b}=${x.c}$ ✓`;
    }
    const prefix = wrong ? 'שגוי — בהעברת אגף הסימן מתהפך.\n' : '';
    if(x.a===1){
      return `${prefix}$$x=${x.c}${x.b>=0?'-'+x.b:'+'+(-x.b)}=${x.x}$$\nבדיקה: $${x.x}${x.b>=0?'+'+x.b:'-'+(-x.b)}=${x.c}$ ✓`;
    }
    if(x.b===0){
      return `${prefix}$$x=\\frac{${x.c}}{${x.a}}=${x.x}$$\nבדיקה: $${x.a}\\cdot ${x.x}=${x.c}$ ✓`;
    }
    return `${prefix}$$${x.a}x=${x.c}${x.b>=0?'-'+x.b:'+'+(-x.b)}=${x.c-x.b}$$\n$$x=\\frac{${x.c-x.b}}{${x.a}}=${x.x}$$\nבדיקה: $${x.a}\\cdot ${x.x}${x.b>=0?'+'+x.b:'-'+(-x.b)}=${x.c}$ ✓`;
  }

  E.generateA703Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    let family = pickFamily(difficulty);
    // verify asks "is x a solution?" — it does not fit the shared TF statement,
    // and pairing them mislabeled true/false. Route TF to a solvable family.
    if(questionType==='tf' && family==='verify') family = 'two_step';
    // "identify which equation" is inherently multiple-choice; for other types
    // route to a word problem (which supports open/tf/mistake/mcq).
    if(questionType!=='mcq' && family==='identify_eq') family = 'word_eq';
    const x = pickCase(family);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf'){
      return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:tfTrue});
    }
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
