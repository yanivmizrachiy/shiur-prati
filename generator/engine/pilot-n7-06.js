// generator/engine/pilot-n7-06.js
// N7-06 Powers: (-a)^n vs -a^n — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md (critical distinction), 07
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const PAREN_EVEN = [
    {a:3,n:2,p:9,np:-9},{a:5,n:2,p:25,np:-25},{a:4,n:2,p:16,np:-16},{a:6,n:2,p:36,np:-36},{a:2,n:4,p:16,np:-16}
  ];
  const PAREN_ODD = [
    {a:2,n:3,p:-8,np:-8},{a:3,n:3,p:-27,np:-27},{a:4,n:3,p:-64,np:-64},{a:5,n:3,p:-125,np:-125}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'paren_even';
    if(diff === 'challenge') return E.pick(['compare_both','paren_odd','compare_both']);
    return E.pick(['paren_even','paren_odd','compare_both']);
  }
  function pickCase(f){
    if(f==='paren_odd') return E.pick(PAREN_ODD);
    return E.pick(PAREN_EVEN);
  }

  function choices(family,x){
    const correct = x.p;
    const wrongs = [x.np === correct ? -correct : x.np, Math.abs(correct), x.a * x.n];
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4) values.push(correct + (values.length*5*(correct<0?-1:1)));
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family==='compare_both'){
      if(qtype==='tf') return `$(-${x.a})^{${x.n}} = -${x.a}^{${x.n}}$.`;
      if(qtype==='mistake') return `תלמיד כתב: "$(-${x.a})^{${x.n}}$ ו-$-${x.a}^{${x.n}}$ זה אותו דבר, הסוגריים לא משנים".`;
      return `חשבו את שני הביטויים והסבירו את ההבדל:\nא. $(-${x.a})^{${x.n}}$\nב. $-${x.a}^{${x.n}}$`;
    }
    if(qtype==='tf') return `$(-${x.a})^{${x.n}} = ${x.np === x.p ? -x.p : x.np}$.`;
    if(qtype==='mistake') return `תלמיד חישב: "$(-${x.a})^{${x.n}} = ${x.n % 2 === 0 ? -x.p : Math.abs(x.p)}$".`;
    return `חשבו: $$(-${x.a})^{${x.n}} = ?$$`;
  }

  function answer(family,x,qtype){
    const even = x.n % 2 === 0;
    const expand = Array(x.n).fill('(-'+x.a+')').join('\\times ');
    if(family==='compare_both'){
      const prefix = (qtype==='mistake'||qtype==='tf') ? (even ? 'שגוי — עם מעריך זוגי הם שונים!\n' : 'במקרה זה (מעריך אי-זוגי) הערכים שווים, אך הנימוק שגוי — הסוגריים כן קובעים את הבסיס.\n') : '';
      return `${prefix}א. $(-${x.a})^{${x.n}}$: הבסיס הוא $-${x.a}$.\n$$${expand}=${x.p}$$\nב. $-${x.a}^{${x.n}}$: קודם חזקה, אחר כך מינוס.\n$$-(${x.a}^{${x.n}})=${x.np}$$\n${even ? 'התוצאות שונות: $'+x.p+' \\ne '+x.np+'$.' : 'כאן התוצאות שוות במקרה ($'+x.p+'$) — אבל רק כי המעריך אי-זוגי.'}`;
    }
    const prefix = (qtype==='mistake'||qtype==='tf') ? 'שגוי — הבסיס בסוגריים הוא $-'+x.a+'$, ומעריך '+(even?'זוגי נותן תוצאה חיובית':'אי-זוגי שומר על השלילי')+'.\n' : '';
    return `${prefix}$$(-${x.a})^{${x.n}}=${expand}=${x.p}$$\n${even ? 'מספר זוגי של גורמים שליליים → תוצאה חיובית.' : 'מספר אי-זוגי של גורמים שליליים → תוצאה שלילית.'}`;
  }

  E.generateN706Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const q = question(family,x,questionType), a = answer(family,x,questionType);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf'){
      const isTrue = family==='compare_both' ? (x.n % 2 === 1) : false;
      return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:isTrue});
    }
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
