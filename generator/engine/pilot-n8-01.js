// generator/engine/pilot-n8-01.js
// N8-01 Ratio — Engine Pilot
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const RATIO_SIMPLIFY = [
    {a:18,b:24,sa:3,sb:4,ctx:'במתכון',left:'כוסות קמח',right:'כוסות מים'},
    {a:21,b:35,sa:3,sb:5,ctx:'בקבוצת ספורט',left:'בנות',right:'בנים'},
    {a:28,b:42,sa:2,sb:3,ctx:'באוסף כרטיסים',left:'כרטיסים כחולים',right:'כרטיסים ירוקים'},
    {a:36,b:48,sa:3,sb:4,ctx:'בתרשים',left:'ריבועים אדומים',right:'ריבועים צהובים'}
  ];
  const RATIO_SHARE = [
    {r1:2,r2:3,total:35,unit:7,a:14,b:21,ctx:'חילקו פרסים',left:'קבוצה א',right:'קבוצה ב'},
    {r1:3,r2:5,total:64,unit:8,a:24,b:40,ctx:'חילקו תקציב',left:'חוג מדעים',right:'חוג אמנות'},
    {r1:4,r2:7,total:88,unit:8,a:32,b:56,ctx:'חילקו מדבקות',left:'דף ראשון',right:'דף שני'},
    {r1:5,r2:6,total:77,unit:7,a:35,b:42,ctx:'חילקו זמן עבודה',left:'משימה א',right:'משימה ב'}
  ];
  const RATIO_MISSING = [
    {r1:2,r2:5,knownSide:'left',known:8,missing:20,mult:4,ctx:'יחס בין סרטים',left:'סרטים כחולים',right:'סרטים לבנים'},
    {r1:3,r2:4,knownSide:'right',known:28,missing:21,mult:7,ctx:'יחס בין תלמידים',left:'תלמידי ח',right:'תלמידי ז'},
    {r1:5,r2:2,knownSide:'left',known:45,missing:18,mult:9,ctx:'יחס בין מרחקים',left:'דרך א',right:'דרך ב'},
    {r1:4,r2:9,knownSide:'right',known:63,missing:28,mult:7,ctx:'יחס בין כמויות',left:'כמות א',right:'כמות ב'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['ratio_simplify','ratio_missing']);
    if(diff === 'challenge') return E.pick(['ratio_share','ratio_missing','ratio_share']);
    return E.pick(['ratio_simplify','ratio_share','ratio_missing']);
  }

  function pickCase(family){
    if(family === 'ratio_share') return E.pick(RATIO_SHARE);
    if(family === 'ratio_missing') return E.pick(RATIO_MISSING);
    return E.pick(RATIO_SIMPLIFY);
  }

  function correctValue(family,x){
    if(family === 'ratio_simplify') return `${x.sa}:${x.sb}`;
    if(family === 'ratio_share') return `${x.a},${x.b}`;
    return x.missing;
  }

  function answerText(family,v,x){
    if(family === 'ratio_simplify') return `$${v.replace(':',':')}$`;
    if(family === 'ratio_share'){
      const parts = String(v).split(',');
      return `$${parts[0]}$ ו-$${parts[1]}$`;
    }
    return `$${v}$`;
  }

  function choices(family,x){
    const correct = correctValue(family,x);
    let wrong;
    if(family === 'ratio_simplify'){
      wrong = [`${x.a}:${x.b}`, `${x.sb}:${x.sa}`, `${x.sa + 1}:${x.sb}`];
    } else if(family === 'ratio_share'){
      wrong = [`${x.r1 * x.total},${x.r2 * x.total}`, `${x.a + x.unit},${x.b - x.unit}`, `${x.b},${x.a}`];
    } else {
      wrong = [x.known + x.r2, Math.max(1,x.known - x.r1), x.missing + x.mult];
    }
    const values = [correct].concat(wrong).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    let bump = 0;
    while(values.length < 4){
      bump++;
      // family-correct fillers (ratio_share has no sa/sb fields)
      const f = family === 'ratio_missing' ? x.missing + values.length + bump
        : family === 'ratio_share' ? `${x.a + values.length + bump},${x.b + values.length + bump}`
        : `${x.sa}:${x.sb + values.length + bump}`;
      if(values.indexOf(f) < 0) values.push(f);
    }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:answerText(family,v,x), correct:v===correct}));
  }

  function question(family,x,qt,tfTrue){
    if(family === 'ratio_simplify'){
      const intro = E.pick([
        `${x.ctx} היחס בין ${x.left} ל${x.right} הוא $${x.a}:${x.b}$.`,
        `${x.ctx} נספרו $${x.a}$ ${x.left} ו-$${x.b}$ ${x.right}.`
      ]);
      if(qt === 'tf') return `${intro} היחס המצומצם הוא $${tfTrue?x.sa:x.sa+1}:${x.sb}$.`;
      if(qt === 'mistake') return `${intro}\nתלמיד צמצם רק צד אחד וכתב $${x.sa}:${x.b}$.`;
      return `${intro}\nכתבו את היחס המצומצם.`;
    }
    if(family === 'ratio_share'){
      if(qt === 'tf') return tfTrue
        ? `${x.ctx} ביחס $${x.r1}:${x.r2}$ ובסך הכל $${x.total}$. החלקים הם $${x.a}$ ו-$${x.b}$.`
        : `${x.ctx} ביחס $${x.r1}:${x.r2}$ ובסך הכל $${x.total}$. החלקים הם $${x.r1*x.total}$ ו-$${x.r2*x.total}$.`;
      if(qt === 'mistake') return `${x.ctx} ביחס $${x.r1}:${x.r2}$ ובסך הכל $${x.total}$.\nתלמיד כפל כל חלק ב-$${x.total}$ וקיבל $${x.r1*x.total}$ ו-$${x.r2*x.total}$.`;
      return `${x.ctx} בין ${x.left} ל${x.right} ביחס $${x.r1}:${x.r2}$.\nבסך הכל יש $${x.total}$ יחידות. כמה תקבל כל קבוצה?`;
    }
    const knownLabel = x.knownSide === 'left' ? x.left : x.right;
    const missingLabel = x.knownSide === 'left' ? x.right : x.left;
    if(qt === 'tf') return `${x.ctx}: היחס בין ${x.left} ל${x.right} הוא $${x.r1}:${x.r2}$. אם יש $${x.known}$ ${knownLabel}, אז יש $${tfTrue?x.missing:x.missing+x.mult}$ ${missingLabel}.`;
    if(qt === 'mistake') return `${x.ctx}: היחס בין ${x.left} ל${x.right} הוא $${x.r1}:${x.r2}$ ויש $${x.known}$ ${knownLabel}.\nתלמיד חיבר $${x.r2}$ במקום לכפול לפי אותו גורם.`;
    return `${x.ctx}: היחס בין ${x.left} ל${x.right} הוא $${x.r1}:${x.r2}$.\nידוע שיש $${x.known}$ ${knownLabel}. כמה יש ${missingLabel}?`;
  }

  function answer(family,x,qt){
    if(family === 'ratio_simplify'){
      const prefix = qt === 'mistake' ? 'הטעות היא שצריך לחלק את שני חלקי היחס באותו מספר.\n' : '';
      const divisor = x.a / x.sa;
      return `${prefix}מחלקים את שני חלקי היחס ב-$${divisor}$:\n$$${x.a}:${x.b}=${x.sa}:${x.sb}$$`;
    }
    if(family === 'ratio_share'){
      const prefix = qt === 'mistake' ? 'הטעות היא שכמות כוללת אינה גורם הכפל. קודם מוצאים את גודל חלק אחד.\n' : '';
      return `${prefix}מספר החלקים הוא:\n$$${x.r1}+${x.r2}=${x.r1+x.r2}$$\nלכן חלק אחד שווה:\n$$${x.total}\\div ${x.r1+x.r2}=${x.unit}$$\nהחלוקה היא $${x.r1}\\cdot ${x.unit}=${x.a}$ ו-$${x.r2}\\cdot ${x.unit}=${x.b}$.`;
    }
    const prefix = qt === 'mistake' ? 'הטעות היא שחיבור אינו שומר יחס. חייבים לכפול או לחלק את שני חלקי היחס באותו גורם.\n' : '';
    const knownRatio = x.knownSide === 'left' ? x.r1 : x.r2;
    const missingRatio = x.knownSide === 'left' ? x.r2 : x.r1;
    return `${prefix}מוצאים את גורם ההגדלה:\n$$${x.known}\\div ${knownRatio}=${x.mult}$$\nמכפילים את החלק השני באותו גורם:\n$$${missingRatio}\\cdot ${x.mult}=${x.missing}$$`;
  }

  E.generateN801Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const unknown = family === 'ratio_simplify' ? 'ratio' : family === 'ratio_share' ? 'share' : 'missing';
    const svg = E.ratioBarSvg({left:x.left,right:x.right,r1:x.r1 || x.sa,r2:x.r2 || x.sb,a:x.a,b:x.b,knownSide:x.knownSide,known:x.known,missing:x.missing,total:x.total}, unknown);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
