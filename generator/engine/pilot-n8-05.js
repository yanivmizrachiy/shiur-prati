// generator/engine/pilot-n8-05.js
// N8-05 Dynamic Percentages — Engine Pilot
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const PERCENT_INCREASE = [
    {base:80,p:25,final:100,ctx:'מחיר חולצה',unit:'ש״ח'},
    {base:120,p:10,final:132,ctx:'מספר משתתפים',unit:'משתתפים'},
    {base:200,p:15,final:230,ctx:'תקציב',unit:'ש״ח'},
    {base:60,p:50,final:90,ctx:'מרחק',unit:'ק״מ'}
  ];
  const PERCENT_DECREASE = [
    {base:120,p:25,final:90,ctx:'מחיר תיק',unit:'ש״ח'},
    {base:150,p:20,final:120,ctx:'כמות מוצרים',unit:'מוצרים'},
    {base:80,p:10,final:72,ctx:'מספר נקודות',unit:'נקודות'},
    {base:200,p:35,final:130,ctx:'תקציב',unit:'ש״ח'}
  ];
  const PERCENT_ORIGINAL = [
    {base:100,p:20,final:120,change:'increase',ctx:'מחיר אחרי התייקרות',unit:'ש״ח'},
    {base:90,p:25,final:67.5,change:'decrease',ctx:'מחיר אחרי הנחה',unit:'ש״ח'},
    {base:160,p:15,final:184,change:'increase',ctx:'כמות אחרי גידול',unit:'יחידות'},
    {base:240,p:30,final:168,change:'decrease',ctx:'כמות אחרי ירידה',unit:'יחידות'}
  ];
  const PERCENT_TWO_STEP = [
    {base:100,p1:20,p2:10,mid:120,final:108,ctx:'מחיר מוצר',unit:'ש״ח'},
    {base:200,p1:15,p2:20,mid:230,final:184,ctx:'תקציב פרויקט',unit:'ש״ח'},
    {base:80,p1:25,p2:10,mid:100,final:90,ctx:'מספר משתתפים',unit:'משתתפים'},
    {base:150,p1:10,p2:30,mid:165,final:115.5,ctx:'כמות סחורה',unit:'יחידות'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['percent_increase','percent_decrease']);
    if(diff === 'challenge') return E.pick(['percent_original','percent_two_step','percent_two_step']);
    return E.pick(['percent_increase','percent_decrease','percent_original']);
  }

  function pickCase(family){
    if(family === 'percent_decrease') return E.pick(PERCENT_DECREASE);
    if(family === 'percent_original') return E.pick(PERCENT_ORIGINAL);
    if(family === 'percent_two_step') return E.pick(PERCENT_TWO_STEP);
    return E.pick(PERCENT_INCREASE);
  }

  function fmt(n){
    return Number.isInteger(n) ? String(n) : String(n).replace('.', '.');
  }

  function correctValue(family,x){
    if(family === 'percent_original') return x.base;
    if(family === 'percent_two_step') return x.final;
    return x.final;
  }

  function valueText(v,x){
    return `$${fmt(v)}$ ${x.unit}`;
  }

  function choices(family,x){
    const correct = correctValue(family,x);
    let wrong;
    if(family === 'percent_original'){
      wrong = [x.final, Math.round(x.final * (1 + x.p/100)), Math.max(1,Math.round(x.final * (1 - x.p/100)))];
    } else if(family === 'percent_two_step'){
      wrong = [x.mid, x.base, Math.round(x.base * (1 + (x.p1-x.p2)/100))];
    } else {
      wrong = [x.base, Math.round(x.base + x.p), Math.max(1,Math.round(x.final + x.p))];
    }
    const values = [correct].concat(wrong).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length < 4) values.push(Number(correct) + values.length * 5);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:valueText(v,x), correct:v===correct}));
  }

  function changeWord(change){
    return change === 'decrease' ? 'ירידה' : 'עלייה';
  }

  function question(family,x,qt,tfTrue){
    if(family === 'percent_increase'){
      if(qt === 'tf') return `${x.ctx} היה $${x.base}$ ${x.unit} ועלה ב-$${x.p}\\%$. הערך החדש הוא $${tfTrue?fmt(x.final):x.final+x.p}$ ${x.unit}.`;
      if(qt === 'mistake') return `${x.ctx} היה $${x.base}$ ${x.unit} ועלה ב-$${x.p}\\%$.\nתלמיד חיבר $${x.p}$ במקום לחשב $${x.p}\\%$.`;
      return `${x.ctx} היה $${x.base}$ ${x.unit} ועלה ב-$${x.p}\\%$.\nמה הערך החדש?`;
    }
    if(family === 'percent_decrease'){
      if(qt === 'tf') return `${x.ctx} היה $${x.base}$ ${x.unit} וירד ב-$${x.p}\\%$. הערך החדש הוא $${tfTrue?fmt(x.final):x.base-x.p}$ ${x.unit}.`;
      if(qt === 'mistake') return `${x.ctx} היה $${x.base}$ ${x.unit} וירד ב-$${x.p}\\%$.\nתלמיד חיסר $${x.p}$ יחידות במקום $${x.p}\\%$ מהכמות.`;
      return `${x.ctx} היה $${x.base}$ ${x.unit} וירד ב-$${x.p}\\%$.\nמה הערך החדש?`;
    }
    if(family === 'percent_original'){
      const direction = changeWord(x.change);
      if(qt === 'tf') return `${x.ctx} הוא $${fmt(x.final)}$ ${x.unit} אחרי ${direction} של $${x.p}\\%$. הערך המקורי היה $${tfTrue?fmt(x.base):fmt(x.final)}$ ${x.unit}.`;
      if(qt === 'mistake') return `${x.ctx} הוא $${fmt(x.final)}$ ${x.unit} אחרי ${direction} של $${x.p}\\%$.\nתלמיד חישב את $${x.p}\\%$ מתוך הערך הסופי ולא מתוך הערך המקורי.`;
      return `${x.ctx} הוא $${fmt(x.final)}$ ${x.unit} אחרי ${direction} של $${x.p}\\%$.\nמה היה הערך המקורי?`;
    }
    if(qt === 'tf') return tfTrue
      ? `${x.ctx} היה $${x.base}$ ${x.unit}, עלה ב-$${x.p1}\\%$ ואז ירד ב-$${x.p2}\\%$. הערך הסופי הוא $${fmt(x.final)}$ ${x.unit}.`
      : `${x.ctx} היה $${x.base}$ ${x.unit}, עלה ב-$${x.p1}\\%$ ואז ירד ב-$${x.p2}\\%$. הערך הסופי חזר ל-$${x.base}$ ${x.unit}.`;
    if(qt === 'mistake') return `${x.ctx} היה $${x.base}$ ${x.unit}, עלה ב-$${x.p1}\\%$ ואז ירד ב-$${x.p2}\\%$.\nתלמיד חיסר אחוזים וכתב שינוי כולל של $${x.p1-x.p2}\\%$.`;
    return `${x.ctx} היה $${x.base}$ ${x.unit}, עלה ב-$${x.p1}\\%$ ואז ירד ב-$${x.p2}\\%$.\nמה הערך הסופי?`;
  }

  function answer(family,x,qt){
    if(family === 'percent_increase'){
      const prefix = qt === 'mistake' ? 'הטעות היא שחיבור האחוז כמספר רגיל אינו נכון. מחשבים אחוז מתוך הכמות המקורית.\n' : '';
      return `${prefix}גורם העלייה הוא:\n$$1+\\frac{${x.p}}{100}=\\frac{${100+x.p}}{100}$$\nלכן:\n$$${x.base}\\cdot \\frac{${100+x.p}}{100}=${fmt(x.final)}$$`;
    }
    if(family === 'percent_decrease'){
      const prefix = qt === 'mistake' ? 'הטעות היא שחיסור מספר האחוזים אינו חיסור של אחוז מהכמות.\n' : '';
      return `${prefix}גורם הירידה הוא:\n$$1-\\frac{${x.p}}{100}=\\frac{${100-x.p}}{100}$$\nלכן:\n$$${x.base}\\cdot \\frac{${100-x.p}}{100}=${fmt(x.final)}$$`;
    }
    if(family === 'percent_original'){
      const factor = x.change === 'increase' ? 100 + x.p : 100 - x.p;
      const prefix = qt === 'mistake' ? 'הטעות היא להשתמש בערך הסופי כבסיס. האחוז נלקח מהערך המקורי.\n' : '';
      return `${prefix}נסמן את הערך המקורי ב-$x$:\n$$x\\cdot \\frac{${factor}}{100}=${fmt(x.final)}$$\nולכן:\n$$x=${fmt(x.final)}\\div \\frac{${factor}}{100}=${x.base}$$`;
    }
    const prefix = qt === 'mistake' ? 'הטעות היא שחיבור וחיסור אחוזים אינם פועלים על אותו בסיס. כל שלב משנה את הבסיס לשלב הבא.\n' : '';
    return `${prefix}אחרי העלייה:\n$$${x.base}\\cdot \\frac{${100+x.p1}}{100}=${fmt(x.mid)}$$\nאחרי הירידה:\n$$${fmt(x.mid)}\\cdot \\frac{${100-x.p2}}{100}=${fmt(x.final)}$$`;
  }

  E.generateN805Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const unknown = family === 'percent_original' ? 'base' : 'final';
    const svg = E.percentChangeSvg({base:x.base,mid:x.mid,final:x.final,p:x.p,p1:x.p1,p2:x.p2,change:x.change,unit:x.unit,ctx:x.ctx}, unknown);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
