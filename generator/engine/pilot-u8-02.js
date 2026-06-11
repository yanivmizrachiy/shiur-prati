// generator/engine/pilot-u8-02.js
// U8-02 Probability from Table — Smart Engine
// Source: source-learning/2026-06-09/06_uncertainty_domain_curriculum_examples.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // Two-category tables: rows=boys/girls, cols=play/dont
  const TABLES = [
    {b1:6,b2:4,g1:9,g2:11,total:30,labels:['משחקים','לא משחקים'],rows:['בנים','בנות']},
    {b1:8,b2:2,g1:6,g2:4,total:20,labels:['בחוג','לא בחוג'],rows:['בנים','בנות']},
    {b1:5,b2:5,g1:10,g2:5,total:25,labels:['רוכבים','לא רוכבים'],rows:['בנים','בנות']},
    {b1:7,b2:3,g1:8,g2:12,total:30,labels:['קוראים','לא קוראים'],rows:['בנים','בנות']}
  ];

  function gcd(a,b){ return b ? gcd(b, a%b) : a; }
  function frac(n,d){ const g=gcd(n,d); return '\\frac{'+(n/g)+'}{'+(d/g)+'}'; }

  function pickFamily(diff){
    if(diff === 'basic') return 'prob_cell';
    if(diff === 'challenge') return E.pick(['compare_groups','complement','compare_groups']);
    return E.pick(['prob_cell','prob_row','complement','compare_groups']);
  }

  function choices(family,t){
    let correct, wrongs;
    if(family==='prob_cell'){ correct='$'+frac(t.b1,t.total)+'$'; wrongs=['$'+frac(t.b1,t.b1+t.b2)+'$','$'+frac(t.b1,t.g1)+'$','$'+frac(t.b2,t.total)+'$']; }
    else if(family==='prob_row'){ correct='$'+frac(t.b1+t.b2,t.total)+'$'; wrongs=['$'+frac(t.b1,t.total)+'$','$'+frac(t.g1+t.g2,t.total)+'$','$'+frac(t.b1+t.g1,t.total)+'$']; }
    else if(family==='complement'){ correct='$'+frac(t.total-t.b1,t.total)+'$'; wrongs=['$'+frac(t.b1,t.total)+'$','$1$','$'+frac(t.b2,t.total)+'$']; }
    else { correct = (t.b1/(t.b1+t.b2)) > (t.g1/(t.g1+t.g2)) ? t.rows[0] : t.rows[1]; wrongs=[correct===t.rows[0]?t.rows[1]:t.rows[0],'שווה']; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
  }

  function question(family,t,qtype){
    if(family==='prob_cell'){
      if(qtype==='tf') return `בוחרים תלמיד אקראי. ההסתברות לבן ש${t.labels[0].slice(0)} היא $${frac(t.b1,t.b1+t.b2)}$.`;
      if(qtype==='mistake') return `תלמיד חישב P(בן ${t.labels[0]}): "$${frac(t.b1,t.b1+t.b2)}$ — חילקתי בסך הבנים".`;
      return `בוחרים תלמיד אחד באקראי מהטבלה.\nמה ההסתברות לבחור בן ש${t.labels[0]}?`;
    }
    if(family==='prob_row'){
      if(qtype==='tf') return `ההסתברות לבחור בן (מכל הטבלה) היא $${frac(t.b1,t.total)}$.`;
      if(qtype==='mistake') return `תלמיד חישב P(בן): "$${frac(t.b1,t.total)}$ — לקחתי רק את הבנים ש${t.labels[0]}".`;
      return `בוחרים תלמיד אחד באקראי.\nמה ההסתברות לבחור בן?`;
    }
    if(family==='complement'){
      if(qtype==='tf') return `ההסתברות לא לבחור בן ש${t.labels[0]} היא $${frac(t.b1,t.total)}$.`;
      if(qtype==='mistake') return `תלמיד חישב P(לא בן ${t.labels[0]}): "$1+${frac(t.b1,t.total)}$".`;
      return `בוחרים תלמיד אחד באקראי.\nמה ההסתברות שהוא אינו בן ש${t.labels[0]}?`;
    }
    // compare_groups
    if(qtype==='tf'){
      const wrongAns = (t.b1/(t.b1+t.b2)) > (t.g1/(t.g1+t.g2)) ? t.rows[1] : t.rows[0];
      return `שיעור ה${t.labels[0]} גבוה יותר אצל ה${wrongAns} (בהשוואה יחסית).`;
    }
    if(qtype==='mistake') return `תלמיד השווה: "ל${t.g1>t.b1?t.rows[1]:t.rows[0]} יש יותר ${t.labels[0]} ($${Math.max(t.b1,t.g1)}$ לעומת $${Math.min(t.b1,t.g1)}$), לכן השיעור שלהם גבוה יותר" — בלי לבדוק יחסית.`;
    return `אצל מי שיעור ה${t.labels[0]} גבוה יותר — ${t.rows[0]} או ${t.rows[1]}? השוו יחסית.`;
  }

  function answer(family,t,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
    if(family==='prob_cell'){
      const prefix = wrong ? 'שגוי — המכנה הוא סך כל התלמידים בטבלה, לא רק הבנים.\n' : '';
      return `${prefix}סך הכל: $${t.total}$. בנים ${t.labels[0]}: $${t.b1}$.\n$$P=${frac(t.b1,t.total)}$$`;
    }
    if(family==='prob_row'){
      const prefix = wrong ? 'שגוי — בנים כוללים את שתי העמודות.\n' : '';
      return `${prefix}סך הבנים: $${t.b1}+${t.b2}=${t.b1+t.b2}$.\n$$P=${frac(t.b1+t.b2,t.total)}$$`;
    }
    if(family==='complement'){
      const prefix = wrong ? 'שגוי — משלים: $1-P$, לא $1+P$.\n' : '';
      return `${prefix}$$P(\\text{בן ${t.labels[0]}})=${frac(t.b1,t.total)}$$\n$$P(\\text{לא})=1-${frac(t.b1,t.total)}=${frac(t.total-t.b1,t.total)}$$`;
    }
    const rb=frac(t.b1,t.b1+t.b2), rg=frac(t.g1,t.g1+t.g2);
    const winner = (t.b1/(t.b1+t.b2)) > (t.g1/(t.g1+t.g2)) ? t.rows[0] : t.rows[1];
    const prefix = wrong ? 'שגוי — השוואה הוגנת היא יחסית (חלק מתוך קבוצה), לא לפי ספירה מוחלטת.\n' : '';
    return `${prefix}${t.rows[0]}: $${rb}$ מתוך $${t.b1+t.b2}$.\n${t.rows[1]}: $${rg}$ מתוך $${t.g1+t.g2}$.\nהשיעור הגבוה יותר: ${winner}.`;
  }

  E.generateU802Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const t = E.pick(TABLES);
    const svg = E.freqTableHtml(['',t.labels[0],t.labels[1]], [[t.rows[0],t.b1,t.b2],[t.rows[1],t.g1,t.g2]]);
    const q = question(family,t,qtype_safe(questionType)), a = answer(family,t,qtype_safe(questionType));
    function qtype_safe(qt){ return qt; }
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,t)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:false});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
