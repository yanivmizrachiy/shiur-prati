// generator/engine/pilot-a7-01.js
// A7-01 Algebraic Expressions — Smart Engine
// Source: source-learning/2026-06-09/01_grade-7_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const FROM_WORDS = [
    {k:4,item:'כרטיסים',unit:'שקלים',expr:'4n'},{k:7,item:'מחברות',unit:'שקלים',expr:'7n'},
    {k:3,item:'כדורים',unit:'שקלים',expr:'3n'},{k:6,item:'ספרים',unit:'שקלים',expr:'6n'}
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

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['from_words','simplify']);
    if(diff === 'challenge') return E.pick(['tower','simplify_mixed','tower']);
    return E.pick(['from_words','simplify','simplify_mixed','tower']);
  }
  function pickCase(f){
    if(f==='simplify') return E.pick(SIMPLIFY);
    if(f==='simplify_mixed') return E.pick(SIMPLIFY_MIXED);
    if(f==='tower') return E.pick(TOWER);
    return E.pick(FROM_WORDS);
  }

  function choices(family,x){
    let correct, wrongs;
    if(family==='from_words'){ correct=x.expr; wrongs=['n+'+x.k, 'n-'+x.k, '\\frac{n}{'+x.k+'}']; }
    else if(family==='simplify'){ correct=x.r+x.v; wrongs=[(x.t1*x.t2)+x.v, x.r+x.v+'^2', ''+(x.t1+x.t2)]; }
    else if(family==='simplify_mixed'){ correct=x.r; wrongs=[(x.t1-x.t2+x.c)+x.v, (x.t1+x.t2)+x.v+'+'+x.c, (x.t1-x.t2)+x.v+x.c]; }
    else { correct=x.expr; wrongs=[x.step+'n+'+x.first, x.step+'n', 'n+'+(x.first+x.step)]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family==='from_words'){
      if(qtype==='tf') return `מחיר ${x.item.slice(0,-2)+'יס'} אחד הוא $n$ ${x.unit}. מחיר $${x.k}$ ${x.item} הוא $n+${x.k}$ ${x.unit}.`;
      if(qtype==='mistake') return `מחיר פריט אחד: $n$ ${x.unit}. תלמיד כתב ביטוי ל-$${x.k}$ פריטים: "$n+${x.k}$".`;
      return `מחיר פריט אחד הוא $n$ ${x.unit}.\nכתבו ביטוי אלגברי למחיר $${x.k}$ ${x.item}.`;
    }
    if(family==='simplify'){
      if(qtype==='tf') return `$${x.t1}${x.v}+${x.t2}${x.v} = ${x.t1*x.t2}${x.v}$.`;
      if(qtype==='mistake') return `תלמיד פישט: "$${x.t1}${x.v}+${x.t2}${x.v} = ${x.r}${x.v}^2$".`;
      return `פשטו את הביטוי: $$${x.t1}${x.v}+${x.t2}${x.v}$$`;
    }
    if(family==='simplify_mixed'){
      if(qtype==='tf') return `$${x.t1}${x.v}-${x.t2}${x.v}+${x.c} = ${x.t1-x.t2+x.c}${x.v}$.`;
      if(qtype==='mistake') return `תלמיד פישט: "$${x.t1}${x.v}-${x.t2}${x.v}+${x.c} = ${x.t1-x.t2+x.c}${x.v}$" — חיבר את $${x.c}$ למקדם.`;
      return `פשטו את הביטוי: $$${x.t1}${x.v}-${x.t2}${x.v}+${x.c}$$`;
    }
    // tower
    if(qtype==='tf') return `מגדל מכוס אחת: $${x.first}$ ס״מ. כל כוס נוספת: $+${x.step}$ ס״מ. הביטוי לגובה מגדל $n$ כוסות: $${x.step}n+${x.first}$.`;
    if(qtype==='mistake') return `מגדל מכוס אחת: $${x.first}$ ס״מ, כל כוס נוספת $+${x.step}$ ס״מ. תלמיד כתב: "גובה $n$ כוסות: $${x.step}n+${x.first}$".`;
    return `גובה מגדל מכוס אחת: $${x.first}$ ס״מ. כל כוס נוספת מוסיפה $${x.step}$ ס״מ.\nכתבו ביטוי אלגברי לגובה מגדל של $n$ כוסות.`;
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
    if(family==='from_words'){
      const prefix = wrong ? 'שגוי — "פי" או "כפול" פירושם כפל, לא חיבור.\n' : '';
      return `${prefix}$${x.k}$ פריטים = $${x.k}$ פעמים המחיר:\n$$${x.expr}$$`;
    }
    if(family==='simplify'){
      const prefix = wrong ? 'שגוי — באיברים דומים מחברים מקדמים; המשתנה נשאר באותה חזקה.\n' : '';
      return `${prefix}$$${x.t1}${x.v}+${x.t2}${x.v}=(${x.t1}+${x.t2})${x.v}=${x.r}${x.v}$$`;
    }
    if(family==='simplify_mixed'){
      const prefix = wrong ? 'שגוי — מספר חופשי ($'+x.c+'$) אינו איבר דומה ל-$'+x.v+'$, ואי אפשר לחבר אותו למקדם.\n' : '';
      return `${prefix}$$${x.t1}${x.v}-${x.t2}${x.v}+${x.c}=(${x.t1}-${x.t2})${x.v}+${x.c}=${x.r}$$`;
    }
    const prefix = wrong ? 'הביטוי שנכתב כמעט נכון — נבדוק אם הוא מתאים גם לכוס אחת:\n' : '';
    return `${prefix}כל כוס אחרי הראשונה מוסיפה $${x.step}$, כלומר $(n-1)$ תוספות:\n$$${x.first}+${x.step}(n-1)=${x.step}n+${x.first-x.step}$$\nכלומר הביטוי הנכון: $${x.expr}$.\nבדיקה ל-$n=1$: $${x.step}\\cdot 1+${x.first-x.step}=${x.first}$ ✓`;
  }

  E.generateA701Engine = function(difficulty, questionType){
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
