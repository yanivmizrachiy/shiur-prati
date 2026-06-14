// generator/engine/pilot-n8-02.js
// N8-02 Proportion — Engine Pilot
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  let N802_TF_TOGGLE = 0;

  const PROPORTION_MISSING = [
    {a:3,b:2,c:9,d:6,unknown:'d',ctx:'יחס בין חולצות למכנסיים'},
    {a:5,b:3,c:15,d:9,unknown:'d',ctx:'יחס בין קמח לסוכר'},
    {a:4,b:7,c:20,d:35,unknown:'c',ctx:'יחס בין מפות לכיסאות'},
    {a:6,b:5,c:42,d:35,unknown:'c',ctx:'יחס בין שעות לתרגילים'}
  ];
  const PROPORTION_RATE = [
    {a:120,b:2,target:5,result:300,thing:'רכבת',unitA:'ק״מ',unitB:'שעות'},
    {a:18,b:3,target:7,result:42,thing:'מדפסת',unitA:'דפים',unitB:'דקות'},
    {a:24,b:4,target:9,result:54,thing:'ברז',unitA:'ליטרים',unitB:'דקות'},
    {a:30,b:5,target:8,result:48,thing:'רוכב אופניים',unitA:'ק״מ',unitB:'שעות'}
  ];
  const PROPORTION_VERIFY = [
    {a:6,b:4,c:9,d:6,isTrue:true,ctx:'יחס בין כחול לאדום'},
    {a:8,b:5,c:12,d:9,isTrue:false,ctx:'יחס בין תפוחים לאגסים'},
    {a:10,b:15,c:2,d:3,isTrue:true,ctx:'יחס בין אורך לרוחב'},
    {a:7,b:3,c:21,d:12,isTrue:false,ctx:'יחס בין נסיעות למחיר'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['proportion_missing','proportion_verify']);
    if(diff === 'challenge') return E.pick(['proportion_rate','proportion_missing','proportion_rate']);
    return E.pick(['proportion_missing','proportion_rate','proportion_verify']);
  }

  function pickCase(family){
    if(family === 'proportion_rate') return E.pick(PROPORTION_RATE);
    if(family === 'proportion_verify') return E.pick(PROPORTION_VERIFY);
    return E.pick(PROPORTION_MISSING);
  }

  function missingValue(x){
    return x.unknown === 'd' ? x.d : x.c;
  }

  function correctValue(family,x){
    if(family === 'proportion_rate') return x.result;
    if(family === 'proportion_verify') return x.isTrue ? 'נכון' : 'שגוי';
    return missingValue(x);
  }

  function choiceText(family,v,x){
    if(family === 'proportion_verify') return v;
    if(family === 'proportion_rate') return `$${v}$ ${x.unitA}`;
    return `$${v}$`;
  }

  function choices(family,x){
    const correct = correctValue(family,x);
    let wrong;
    if(family === 'proportion_rate'){
      wrong = [x.result + x.a / x.b, x.a + x.target, Math.max(1,x.result - x.a / x.b)];
    } else if(family === 'proportion_verify'){
      wrong = [correct === 'נכון' ? 'שגוי' : 'נכון', 'אי אפשר לדעת', 'תלוי ביחידות'];
    } else {
      wrong = [missingValue(x)+x.a, Math.max(1,missingValue(x)-x.b), x.a*x.d];
    }
    const values = [correct].concat(wrong).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length < 4) values.push(family === 'proportion_verify' ? `אפשרות ${values.length}` : Number(correct) + values.length + 2);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:choiceText(family,v,x), correct:v===correct}));
  }

  function equation(x){
    const c = x.unknown === 'c' ? 'x' : x.c;
    const d = x.unknown === 'd' ? 'x' : x.d;
    return `\\frac{${x.a}}{${x.b}}=\\frac{${c}}{${d}}`;
  }

  function question(family,x,qt,tfTrue){
    if(family === 'proportion_missing'){
      if(qt === 'tf') return `${x.ctx}: $${equation(x)}$. הערך של $x$ הוא $${tfTrue?missingValue(x):missingValue(x)+x.a}$.`;
      if(qt === 'mistake') return `${x.ctx}: $${equation(x)}$.\nתלמיד כתב $x=${x.a}\\cdot ${x.d}$ בלי לחלק בצלע המתאימה.`;
      return `${x.ctx}. השלימו את הפרופורציה:\n$$${equation(x)}$$`;
    }
    if(family === 'proportion_rate'){
      if(qt === 'tf') return `${x.thing} עובר $${x.a}$ ${x.unitA} ב-$${x.b}$ ${x.unitB}. באותו קצב הוא יעבור $${tfTrue?x.result:x.result + x.a/x.b}$ ${x.unitA} ב-$${x.target}$ ${x.unitB}.`;
      if(qt === 'mistake') return `${x.thing} עובר $${x.a}$ ${x.unitA} ב-$${x.b}$ ${x.unitB}.\nתלמיד חיבר $${x.target}$ במקום להשתמש בגורם היחס.`;
      return `${x.thing} עובר $${x.a}$ ${x.unitA} ב-$${x.b}$ ${x.unitB}.\nכמה ${x.unitA} יעבור באותו קצב ב-$${x.target}$ ${x.unitB}?`;
    }
    if(qt === 'tf') return `${x.ctx}: הזוגות $${x.a}:${x.b}$ ו-$${x.c}:${x.d}$ יוצרים פרופורציה.`;
    if(qt === 'mistake') return `${x.ctx}: כדי לבדוק אם $${x.a}:${x.b}$ ו-$${x.c}:${x.d}$ פרופורציוניים, תלמיד השווה סכומים: $${x.a}+${x.b}$ ו-$${x.c}+${x.d}$.`;
    return `${x.ctx}: בדקו האם $${x.a}:${x.b}$ ו-$${x.c}:${x.d}$ יוצרים פרופורציה.`;
  }

  function answer(family,x,qt){
    if(family === 'proportion_missing'){
      const prefix = qt === 'mistake' ? 'הטעות היא שחסר שלב חילוק לאחר כפל בהצלבה.\n' : '';
      if(x.unknown === 'd'){
        return `${prefix}נשתמש בכפל בהצלבה:\n$$${x.a}\\cdot x=${x.b}\\cdot ${x.c}$$\n$$x=\\frac{${x.b}\\cdot ${x.c}}{${x.a}}=${x.d}$$`;
      }
      return `${prefix}נשתמש בכפל בהצלבה:\n$$${x.a}\\cdot ${x.d}=${x.b}\\cdot x$$\n$$x=\\frac{${x.a}\\cdot ${x.d}}{${x.b}}=${x.c}$$`;
    }
    if(family === 'proportion_rate'){
      const prefix = qt === 'mistake' ? 'הטעות היא שחיבור אינו שומר יחס. בקצב קבוע משתמשים בגורם כפל.\n' : '';
      const unitRate = x.a / x.b;
      return `${prefix}קצב ליחידה אחת:\n$$${x.a}\\div ${x.b}=${unitRate}$$\nל-$${x.target}$ ${x.unitB}:\n$$${unitRate}\\cdot ${x.target}=${x.result}$$`;
    }
    const left = x.a * x.d;
    const right = x.b * x.c;
    const verdict = x.isTrue ? 'כן, זו פרופורציה.' : 'לא, זו אינה פרופורציה.';
    const prefix = qt === 'mistake' ? 'הטעות היא שבודקים מכפלות בהצלבה, לא סכומים.\n' : '';
    return `${prefix}בודקים מכפלות בהצלבה:\n$$${x.a}\\cdot ${x.d}=${left}$$\n$$${x.b}\\cdot ${x.c}=${right}$$\n${verdict}`;
  }

  E.generateN802Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const unknown = family === 'proportion_missing' ? x.unknown : family === 'proportion_rate' ? 'result' : 'verify';
    const svg = E.proportionTableSvg({a:x.a,b:x.b,c:x.c,d:x.d,target:x.target,result:x.result,unitA:x.unitA,unitB:x.unitB,thing:x.thing}, unknown);
    const tfTrue = questionType==='tf' && family!=='proportion_verify' && (++N802_TF_TOGGLE % 2 === 0);
    const q = question(family,x,questionType,tfTrue);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:family === 'proportion_verify' ? x.isTrue : tfTrue});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
