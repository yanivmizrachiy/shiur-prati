// generator/engine/pilot-a7-01.js
// A7-01 Algebraic Expressions — Smart Engine
// Source: source-learning/2026-06-09/01_grade-7_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const FROM_WORDS = [
    {k:4,item:'כרטיסים',sing:'כרטיס אחד',unit:'שקלים',expr:'4n'},{k:7,item:'מחברות',sing:'מחברת אחת',unit:'שקלים',expr:'7n'},
    {k:3,item:'כדורים',sing:'כדור אחד',unit:'שקלים',expr:'3n'},{k:6,item:'ספרים',sing:'ספר אחד',unit:'שקלים',expr:'6n'}
  ];
  const SIMPLIFY = [
    {t1:3,t2:5,r:8,v:'x'},{t1:7,t2:2,r:9,v:'a'},{t1:6,t2:4,r:10,v:'m'},{t1:9,t2:3,r:12,v:'y'}
  ];
  const SIMPLIFY_MIXED = [
    {t1:5,t2:2,c:3,v:'x',r:'3x+3'},{t1:8,t2:3,c:4,v:'a',r:'5a+4'},{t1:7,t2:4,c:6,v:'y',r:'3y+6'}
  ];
  const TOWER = [
    {first:8,step:6,expr:'6n+2'},{first:10,step:5,expr:'5n+5'},{first:9,step:4,expr:'4n+5'}
  ];
  // Rectangle family — source pattern A7-01: one side k times the other; perimeter and area expressions.
  const RECT = [{k:2},{k:3},{k:4},{k:5}];
  // Match-expression family — source file 01: התאימו ביטוי לתיאור מילולי.
  const MATCH_EXPR = [
    {desc:'מספר הגדול ב־20 מ־$t$', correct:'t+20', wrongs:['20t','t-20','20-t'], why:'"גדול ב־20" פירושו להוסיף 20 למספר.'},
    {desc:'פי 20 ממספר $t$', correct:'20t', wrongs:['t+20','20+t','20-t'], why:'"פי 20" פירושו כפל ב־20.'},
    {desc:'10 שקלים ועוד 20 שקלים לכל פריט', correct:'10+20t', wrongs:['20+10t','30t','10t+20t'], why:'יש תשלום קבוע 10 ועוד 20 לכל פריט.'},
    {desc:'פעמיים המספר הגדול ב־3', correct:'2(t+3)', wrongs:['2t+3','t+6','2t-3'], why:'קודם מגדילים את המספר ב־3, ואז מכפילים את כל הסכום ב־2.'}
  ];
  // Two-variable cost family — source file 01: 3 ק״ג עגבניות ו־2 ק״ג מלוניות.
  const TWO_VAR = [
    {a:'a',b:'b',n1:3,n2:2,left:'עגבניות',right:'מלוניות',unit:'ק״ג',expr:'3a+2b'},
    {a:'p',b:'q',n1:4,n2:3,left:'מחברות',right:'עטים',unit:'יחידות',expr:'4p+3q'},
    {a:'x',b:'y',n1:2,n2:5,left:'כרטיסי מבוגר',right:'כרטיסי ילד',unit:'כרטיסים',expr:'2x+5y'}
  ];

  // Generalize family — the core source-file-01 skill: compute for concrete
  // values, write the GENERAL expression with a variable, then SUBSTITUTE a value.
  // (equilateral-triangle perimeter 3·s; fuel cost k·L; fuel cost + fixed surcharge.)
  const GENERALIZE = [
    {kind:'tri',  k:3, c:0, v:'m', n1:5,  n2:7,  sub:10},
    {kind:'fuel', k:7, c:0, v:'b', n1:20, n2:30, sub:40},
    {kind:'fuel', k:7, c:2, v:'b', n1:20, n2:30, sub:40},
    {kind:'tick', k:8, c:0, v:'n', n1:4,  n2:6,  sub:10}
  ];
  function genParts(x){
    const expr = x.c>0 ? `${x.k}${x.v}+${x.c}` : `${x.k}${x.v}`;
    const exprSub = x.c>0 ? `${x.k}\\cdot ${x.sub}+${x.c}` : `${x.k}\\cdot ${x.sub}`;
    const val = n => x.k*n + x.c;
    if(x.kind==='tri') return {expr, exprSub, val, unit:'ס״מ', quantity:'היקף המשולש',
      scene:'נתון משולש שווה־צלעות.',
      concrete:n=>`מהו היקף משולש שווה־צלעות שאורך צלעו $${n}$ ס״מ?`,
      general:`כתבו ביטוי כללי להיקף משולש שאורך צלעו $${x.v}$ ס״מ.`,
      rule:'היקף משולש שווה־צלעות הוא פי $3$ מאורך הצלע'};
    if(x.kind==='tick') return {expr, exprSub, val, unit:'שקלים', quantity:'מחיר הכרטיסים',
      scene:`מחיר כרטיס להופעה הוא $${x.k}$ שקלים.`,
      concrete:n=>`מהו מחיר $${n}$ כרטיסים?`,
      general:`כתבו ביטוי כללי למחיר $${x.v}$ כרטיסים.`,
      rule:'המחיר = מחיר כרטיס כפול מספר הכרטיסים'};
    return {expr, exprSub, val, unit:'שקלים', quantity:'עלות הדלק',
      scene:`מחיר ליטר דלק הוא $${x.k}$ שקלים${x.c>0?`, ובנוסף עמלה קבועה של $${x.c}$ שקלים לכל מילוי`:''}.`,
      concrete:n=>`מהי העלות של $${n}$ ליטרים?`,
      general:`כתבו ביטוי כללי לעלות של $${x.v}$ ליטרים.`,
      rule:`העלות = מחיר לליטר כפול מספר הליטרים${x.c>0?' ועוד העמלה הקבועה':''}`};
  }

  // Sequence family — source file 01: an arithmetic sequence; find specific terms,
  // the GENERAL n-th term (an algebraic expression), and a far term. aₙ = d·n + (a1−d).
  const SEQ = [{a1:13,d:-2},{a1:3,d:4},{a1:5,d:5},{a1:2,d:3},{a1:20,d:-3},{a1:7,d:7}];
  function seqExpr(d,a1){
    const k=a1-d, dn=(d===1?'n':d===-1?'-n':d+'n');
    if(k===0) return dn;
    if(d<0 && k>0) return k+''+dn;          // "15-2n"
    return dn + (k>0?'+'+k:''+k);            // "4n-1", "5n+2"
  }
  const seqVal = (d,a1,n) => d*n + (a1-d);
  const seqTerms = x => [1,2,3,4,5].map(n=>seqVal(x.d,x.a1,n)).join(', ');

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['from_words','simplify','match_expr','generalize','sequence']);
    if(diff === 'challenge') return E.pick(['tower','simplify_mixed','rect_expr','match_expr','two_var','generalize','sequence']);
    return E.pick(['from_words','simplify','simplify_mixed','tower','rect_expr','match_expr','two_var','generalize','sequence']);
  }
  function pickCase(f){
    if(f==='simplify') return E.pick(SIMPLIFY);
    if(f==='simplify_mixed') return E.pick(SIMPLIFY_MIXED);
    if(f==='tower') return E.pick(TOWER);
    if(f==='rect_expr') return E.pick(RECT);
    if(f==='match_expr') return E.pick(MATCH_EXPR);
    if(f==='two_var') return E.pick(TWO_VAR);
    if(f==='generalize') return E.pick(GENERALIZE);
    if(f==='sequence') return E.pick(SEQ);
    return E.pick(FROM_WORDS);
  }

  function choices(family,x){
    let correct, wrongs;
    if(family==='match_expr'){
      correct=x.correct; wrongs=x.wrongs;
    }
    else if(family==='generalize'){
      const v=x.v,k=x.k,c=x.c;
      correct = c>0 ? `${k}${v}+${c}` : `${k}${v}`;
      wrongs = c>0 ? [`${k}${v}`, `${k+c}${v}`, `${v}+${k+c}`] : [`${v}+${k}`, `${k}+${v}`, `${k}`];
    }
    else if(family==='sequence'){
      correct = seqExpr(x.d, x.a1);
      wrongs = [seqExpr(x.d, x.a1 + x.d), seqExpr(x.d, x.d), seqExpr(x.d + 1, x.a1)];
    }
    else if(family==='two_var'){
      correct=x.expr; wrongs=[`${x.n1+x.n2}${x.a}${x.b}`, `${x.n1}${x.a}+${x.n2}`, `${x.a}+${x.b}+${x.n1+x.n2}`];
    }
    else if(family==='rect_expr'){
      correct=(2*(x.k+1))+'x';
      wrongs=[(x.k+1)+'x', x.k+'x^2', (2*x.k)+'x'];
    }
    else if(family==='from_words'){ correct=x.expr; wrongs=['n+'+x.k, 'n-'+x.k, '\\frac{n}{'+x.k+'}']; }
    else if(family==='simplify'){ correct=x.r+x.v; wrongs=[(x.t1*x.t2)+x.v, x.r+x.v+'^2', ''+(x.t1+x.t2)]; }
    else if(family==='simplify_mixed'){ correct=x.r; wrongs=[(x.t1-x.t2+x.c)+x.v, (x.t1+x.t2)+x.v+'+'+x.c, (x.t1-x.t2)+x.v+x.c]; }
    else { correct=x.expr; wrongs=[x.step+'n+'+x.first, x.step+'n', 'n+'+(x.first+x.step)]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ const filler=correct+'+'+values.length; if(values.indexOf(filler)<0) values.push(filler); else values.push(correct+'+'+(values.length+1)); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='sequence'){
      const terms=seqTerms(x), expr=seqExpr(x.d,x.a1), wrongE=seqExpr(x.d,x.a1+x.d);
      if(qtype==='tf') return `בסדרה $${terms},\\ldots$ האיבר ה-$n$ הוא $${tfTrue?expr:wrongE}$.`;
      if(qtype==='mistake') return `נתונה הסדרה $${terms},\\ldots$ תלמיד כתב שהאיבר ה-$n$ הוא $${wrongE}$.`;
      if(qtype==='mcq') return `נתונה הסדרה $${terms},\\ldots$\nאיזה ביטוי מתאר את האיבר ה-$n$?`;
      return `נתונה הסדרה $${terms},\\ldots$\nא. מהו האיבר ה-$7$?\nב. כתבו ביטוי לאיבר ה-$n$.\nג. מהו האיבר ה-$50$?`;
    }
    if(family==='generalize'){
      const g=genParts(x), wrong = x.c>0 ? `${x.k}${x.v}` : `${x.v}+${x.k}`;
      if(qtype==='tf') return `${g.scene} הביטוי הכללי ל${g.quantity} עבור $${x.v}$ הוא $${tfTrue?g.expr:wrong}$.`;
      if(qtype==='mistake') return `${g.scene} כדי לכתוב ביטוי ל${g.quantity} עבור $${x.v}$, תלמיד כתב $${wrong}$ — חיבר במקום להכפיל.`;
      if(qtype==='mcq') return `${g.scene}\nאיזה ביטוי כללי מתאר את ${g.quantity} עבור $${x.v}$?`;
      return `${g.scene}\nא. ${g.concrete(x.n1)}\nב. ${g.concrete(x.n2)}\nג. ${g.general}\nד. מהי התוצאה כאשר $${x.v}=${x.sub}$?`;
    }
    if(family==='match_expr'){
      const wrong=x.wrongs[0];
      if(qtype==='tf') return `הביטוי $${tfTrue?x.correct:wrong}$ מתאים לתיאור: ${x.desc}.`;
      if(qtype==='mistake') return `לתיאור "${x.desc}" תלמיד התאים את הביטוי $${wrong}$.`;
      if(qtype==='mcq') return `איזה ביטוי מתאים לתיאור: ${x.desc}?`;
      return `כתבו ביטוי אלגברי מתאים לתיאור: ${x.desc}.`;
    }
    if(family==='two_var'){
      const wrong=`${x.n1+x.n2}${x.a}${x.b}`;
      const base=`מחיר ${x.unit} ${x.left} הוא $${x.a}$ שקלים, ומחיר ${x.unit} ${x.right} הוא $${x.b}$ שקלים.`;
      if(qtype==='tf') return `${base} הביטוי לעלות $${x.n1}$ ${x.left} ו-$${x.n2}$ ${x.right} הוא $${tfTrue?x.expr:wrong}$.`;
      if(qtype==='mistake') return `${base} תלמיד כתב שהעלות היא $${wrong}$, כי בסך הכול קונים $${x.n1+x.n2}$ פריטים.`;
      if(qtype==='mcq') return `${base}
איזה ביטוי מתאר את העלות הכוללת של $${x.n1}$ ${x.left} ו-$${x.n2}$ ${x.right}?`;
      return `${base}
כתבו ביטוי אלגברי לעלות הכוללת של $${x.n1}$ ${x.left} ו-$${x.n2}$ ${x.right}.`;
    }
    if(family==='from_words'){
      if(qtype==='tf') return `מחיר ${x.sing} הוא $n$ ${x.unit}. מחיר $${x.k}$ ${x.item} הוא $${tfTrue?x.expr:'n+'+x.k}$ ${x.unit}.`;
      if(qtype==='mistake') return `מחיר ${x.sing}: $n$ ${x.unit}. תלמיד כתב ביטוי למחיר $${x.k}$ ${x.item}: "$n+${x.k}$".`;
      return `מחיר ${x.sing} הוא $n$ ${x.unit}.
כתבו ביטוי אלגברי למחיר $${x.k}$ ${x.item}.`;
    }
    if(family==='simplify'){
      if(qtype==='tf') return `$${x.t1}${x.v}+${x.t2}${x.v} = ${tfTrue?x.r:x.t1*x.t2}${x.v}$.`;
      if(qtype==='mistake') return `תלמיד פישט: "$${x.t1}${x.v}+${x.t2}${x.v} = ${x.r}${x.v}^2$".`;
      return `פשטו את הביטוי: $$${x.t1}${x.v}+${x.t2}${x.v}$$`;
    }
    if(family==='simplify_mixed'){
      if(qtype==='tf') return `$${x.t1}${x.v}-${x.t2}${x.v}+${x.c} = ${tfTrue?x.r:(x.t1-x.t2+x.c)+x.v}$.`;
      if(qtype==='mistake') return `תלמיד פישט: "$${x.t1}${x.v}-${x.t2}${x.v}+${x.c} = ${x.t1-x.t2+x.c}${x.v}$" — חיבר את $${x.c}$ למקדם.`;
      return `פשטו את הביטוי: $$${x.t1}${x.v}-${x.t2}${x.v}+${x.c}$$`;
    }
    if(family==='rect_expr'){
      if(qtype==='tf') return `במלבן, צלע אחת ארוכה פי $${x.k}$ מהאחרת, והצלע הקצרה היא $x$. היקף המלבן הוא $${tfTrue?2*(x.k+1):x.k+1}x$.`;
      if(qtype==='mistake') return `במלבן כזה (צלעות $x$ ו-$${x.k}x$) תלמיד כתב לשטח: "$x+${x.k}x=${x.k+1}x$".`;
      if(qtype==='mcq') return `במלבן, צלע אחת ארוכה פי $${x.k}$ מהאחרת. הצלע הקצרה: $x$.
איזה ביטוי מתאר את היקף המלבן?`;
      return `במלבן, צלע אחת ארוכה פי $${x.k}$ מהצלע השנייה. סמנו את הצלע הקצרה ב-$x$.
א. כתבו ביטוי להיקף המלבן.
ב. כתבו ביטוי לשטח המלבן.`;
    }
    // tower
    if(qtype==='tf') return `מגדל מכוס אחת: $${x.first}$ ס״מ. כל כוס נוספת: $+${x.step}$ ס״מ. הביטוי לגובה מגדל $n$ כוסות: $${tfTrue?x.expr:x.step+'n+'+x.first}$.`;
    if(qtype==='mistake') return `מגדל מכוס אחת: $${x.first}$ ס״מ, כל כוס נוספת $+${x.step}$ ס״מ. תלמיד כתב: "גובה $n$ כוסות: $${x.step}n+${x.first}$".`;
    return `גובה מגדל מכוס אחת: $${x.first}$ ס״מ. כל כוס נוספת מוסיפה $${x.step}$ ס״מ.
כתבו ביטוי אלגברי לגובה מגדל של $n$ כוסות.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='sequence'){
      const expr=seqExpr(x.d,x.a1), dShown=(x.d<0?'('+x.d+')':x.d);
      const prefix = wrong ? 'שגוי — האיבר ה-$n$: איבר ראשון ועוד $(n-1)$ פעמים ההפרש; יש לפשט.\n' : '';
      return `${prefix}ההפרש הקבוע בין איברים עוקבים הוא $${x.d}$.
$$a_n=${x.a1}+(n-1)\\cdot ${dShown}=${expr}$$
א. האיבר ה-$7$: $${seqVal(x.d,x.a1,7)}$.
ב. הביטוי הכללי לאיבר ה-$n$: $${expr}$.
ג. האיבר ה-$50$: $${seqVal(x.d,x.a1,50)}$.`;
    }
    if(family==='generalize'){
      const g=genParts(x);
      const prefix = wrong ? 'שגוי — "פי" / "כפול" הוא כפל, לא חיבור; הביטוי הכללי מכפיל את המשתנה.\n' : '';
      return `${prefix}${g.rule}.
א. $${g.val(x.n1)}$ ${g.unit}.
ב. $${g.val(x.n2)}$ ${g.unit}.
ג. הביטוי הכללי: $$${g.expr}$$
ד. הצבה $${x.v}=${x.sub}$:  $$${g.exprSub}=${g.val(x.sub)}$$ ${g.unit}.`;
    }
    if(family==='match_expr'){
      const prefix = wrong ? 'שגוי — צריך לתרגם כל פעולה מילולית לפעולה אלגברית מתאימה.\n' : '';
      return `${prefix}התיאור: ${x.desc}
הביטוי המתאים הוא:
$$${x.correct}$$
${x.why}`;
    }
    if(family==='two_var'){
      const prefix = wrong ? 'שגוי — אלה שני מחירים שונים, לכן לא מכפילים את מספר הפריטים בסכום המשתנים.\n' : '';
      return `${prefix}$${x.n1}$ ${x.left}: $${x.n1}\cdot ${x.a}=${x.n1}${x.a}$.
$${x.n2}$ ${x.right}: $${x.n2}\cdot ${x.b}=${x.n2}${x.b}$.
העלות הכוללת:
$$${x.expr}$$`;
    }
    if(family==='from_words'){
      const prefix = wrong ? 'שגוי — "פי" או "כפול" פירושם כפל, לא חיבור.\n' : '';
      return `${prefix}$${x.k}$ ${x.item} = $${x.k}$ פעמים מחיר ${x.sing}:
$$${x.expr}$$`;
    }
    if(family==='simplify'){
      const prefix = wrong ? 'שגוי — באיברים דומים מחברים מקדמים; המשתנה נשאר באותה חזקה.\n' : '';
      return `${prefix}$$${x.t1}${x.v}+${x.t2}${x.v}=(${x.t1}+${x.t2})${x.v}=${x.r}${x.v}$$`;
    }
    if(family==='simplify_mixed'){
      const prefix = wrong ? 'שגוי — מספר חופשי ($'+x.c+'$) אינו איבר דומה ל-$'+x.v+'$, ואי אפשר לחבר אותו למקדם.\n' : '';
      return `${prefix}$$${x.t1}${x.v}-${x.t2}${x.v}+${x.c}=(${x.t1}-${x.t2})${x.v}+${x.c}=${x.r}$$`;
    }
    if(family==='rect_expr'){
      const per=2*(x.k+1);
      if(wrong && qtype==='mistake') return `שגוי — שטח הוא מכפלת הצלעות, לא סכומן (הסכום שייך להיקף):
$$S=x\\cdot ${x.k}x=${x.k}x^2$$`;
      const prefix = wrong ? 'שגוי — היקף הוא סכום כל ארבע הצלעות, ולכן יש להכפיל ב-2.\n' : '';
      return `${prefix}הצלעות: $x$ ו-$${x.k}x$.
היקף: $$P=2(x+${x.k}x)=2\\cdot ${x.k+1}x=${per}x$$
שטח: $$S=x\\cdot ${x.k}x=${x.k}x^2$$`;
    }
    const prefix = wrong ? 'הביטוי שנכתב כמעט נכון — נבדוק אם הוא מתאים גם לכוס אחת:\n' : '';
    return `${prefix}כל כוס אחרי הראשונה מוסיפה $${x.step}$, כלומר $(n-1)$ תוספות:
$$${x.first}+${x.step}(n-1)=${x.step}n+${x.first-x.step}$$
כלומר הביטוי הנכון: $${x.expr}$.
בדיקה ל-$n=1$: $${x.step}\\cdot 1+${x.first-x.step}=${x.first}$ ✓`;
  }

  E.generateA701Engine = function(difficulty, questionType){
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
