// generator/engine/pilot-a8-02.js
// A8-02 Slope and Line Equation — Smart Engine
// Source: source-learning/2026-06-09/02_grade-8_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const SLOPE_PTS = [
    {x1:0,y1:1,x2:2,y2:5,m:2,b:1},{x1:1,y1:3,x2:3,y2:7,m:2,b:1},{x1:0,y1:4,x2:3,y2:1,m:-1,b:4},
    {x1:0,y1:-2,x2:2,y2:4,m:3,b:-2},{x1:1,y1:5,x2:3,y2:1,m:-2,b:7},{x1:0,y1:2,x2:4,y2:6,m:1,b:2}
  ];
  const VALUE_AT = [
    {m:2,b:3,x:4,y:11},{m:3,b:-1,x:2,y:5},{m:-2,b:10,x:3,y:4},{m:5,b:0,x:3,y:15},{m:-1,b:6,x:4,y:2}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['value_at','rising_falling','applied_graph_read']);
    if(diff === 'challenge') return E.pick(['slope_two_points','equation_from_points','applied_graph_read','slope_two_points']);
    return E.pick(['slope_two_points','value_at','rising_falling','equation_from_points','applied_graph_read']);
  }

  // Applied graph reading — file 02 Topic A8-01 (fuel-cost graph with a
  // threshold question) and A8-03 liquid-heating example ("נוזל ב-8°C מתחמם
  // בקצב אחיד… טמפרטורה אחרי 3 דקות? אחרי כמה דקות 78°C?").
  function caseApplied(){
    if(Math.random()<0.5){
      const m=E.pick([6,7,8]);                    // price per liter (₪)
      const x0=E.pick([3,4,5,6]);                 // liters to read
      const xt=E.pick([5,6,7,8].filter(v=>v!==x0));
      return {ctx:'fuel', m:m, b:0, x0:x0, y0:m*x0, xt:xt, yt:m*xt, xmax:9,
        xLabel:'ליטרים', yLabel:'עלות בשקלים',
        intro:`הגרף מתאר את עלות הדלק לפי כמות הליטרים (מחיר ליטר: $${m}$ ש"ח).`,
        what:'העלות', unitX:'ליטרים', unitY:'ש"ח', rateWord:'המחיר לליטר'};
    }
    const b=E.pick([8,10,20]);                    // starting temperature
    const m=E.pick([5,8,10]);                     // °C per minute
    const x0=E.pick([2,3,4]);
    const xt=E.pick([5,6,7].filter(v=>v!==x0));
    return {ctx:'heat', m:m, b:b, x0:x0, y0:b+m*x0, xt:xt, yt:b+m*xt, xmax:8,
      xLabel:'דקות', yLabel:'טמפרטורה (°C)',
      intro:`נוזל שטמפרטורת ההתחלה שלו $${b}$ מעלות מתחמם בקצב אחיד של $${m}$ מעלות לדקה. הגרף מתאר את הטמפרטורה לפי הזמן.`,
      what:'הטמפרטורה', unitX:'דקות', unitY:'מעלות', rateWord:'קצב ההתחממות לדקה'};
  }

  function pickCase(f){
    if(f==='applied_graph_read') return caseApplied();
    if(f==='value_at') return E.pick(VALUE_AT);
    return E.pick(SLOPE_PTS);
  }

  function choices(family,x){
    let correct, wrongs;
    if(family==='applied_graph_read'){
      if(x.sub==='threshold'){
        // misconceptions: reading the value itself, off-by-one on the scale
        correct=x.xt; wrongs=[x.yt, x.xt+1, x.xt-1];
      } else {
        // misconceptions: x read as y, rate-only (ignoring the start), off by m
        correct=x.y0; wrongs=[x.x0, x.m*x.x0===x.y0?x.y0+x.m:x.m*x.x0, x.y0+x.m];
      }
    }
    else if(family==='slope_two_points'){ correct=x.m; wrongs=[-x.m, x.m+1, x.y2-x.y1]; }
    else if(family==='value_at'){ correct=x.y; wrongs=[x.m+x.b+x.x, x.y-x.b, x.m*x.x]; }
    else if(family==='equation_from_points'){
      correct='y='+(x.m===1?'':x.m===-1?'-':x.m)+'x'+(x.b>=0?'+'+x.b:x.b);
      const wm=-x.m;
      wrongs=['y='+(wm===1?'':wm===-1?'-':wm)+'x'+(x.b>=0?'+'+x.b:x.b),'y='+(x.b)+'x'+(x.m>=0?'+'+x.m:x.m),'y='+(x.m===1?'':x.m)+'x'];
    }
    else { correct = x.m>0?'עולה':'יורדת'; wrongs=[x.m>0?'יורדת':'עולה','קבועה']; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4 && typeof correct==='number'){ let f=correct+values.length; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text: typeof v==='number' ? '$'+v+'$' : '$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='applied_graph_read'){
      if(x.sub==='threshold'){
        const ask = x.ctx==='fuel'
          ? `עבור אילו כמויות דלק העלות גבוהה מ-$${x.yt}$ ש"ח?`
          : `אחרי כמה דקות ${x.what} תגיע ל-$${x.yt}$ מעלות?`;
        if(qtype==='tf') return `${x.intro}\n${x.what} מגיעה ל-$${x.yt}$ ${x.unitY} כאשר ${x.unitX} $=${tfTrue?x.xt:x.xt+1}$.`;
        if(qtype==='mistake') return `${x.intro}\nתלמיד ענה על "${ask}": "$${x.yt}$" — קרא את הערך מציר ה-$y$ במקום מציר ה-$x$.`;
        return `${x.intro}\n${ask}${qtype==='open'?' הסבירו לפי הגרף.':''}`;
      }
      const ask = x.ctx==='fuel'
        ? `מה העלות של $${x.x0}$ ליטרים?`
        : `מה ${x.what} אחרי $${x.x0}$ דקות?`;
      if(qtype==='tf') return tfTrue
        ? `${x.intro}\nלפי הגרף, כאשר ${x.unitX} $=${x.x0}$, ${x.what} היא $${x.y0}$ ${x.unitY}.`
        : `${x.intro}\nלפי הגרף, ${x.rateWord} הוא $${x.m+2}$.`;
      if(qtype==='mistake') return x.ctx==='heat'
        ? `${x.intro}\nתלמיד חישב את ${x.what} אחרי $${x.x0}$ דקות: "$${x.m}\\times ${x.x0}=${x.m*x.x0}$ מעלות" — התעלם מטמפרטורת ההתחלה.`
        : `${x.intro}\nתלמיד ענה על "${ask}": "$${x.x0}$ ש"ח" — קרא את ציר ה-$x$ במקום את ציר ה-$y$.`;
      return `${x.intro}\n${ask}${qtype==='open'?' הסבירו כיצד קראתם זאת מהגרף.':''}`;
    }
    if(family==='slope_two_points'){
      if(qtype==='tf') return `שיפוע הישר העובר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$ הוא $${tfTrue?x.m:-x.m}$.`;
      if(qtype==='mistake') return `תלמיד חישב שיפוע דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$: "$m=\\frac{${x.x2}-${x.x1}}{${x.y2}-${x.y1}}$" — הפך מונה ומכנה.`;
      return `מצאו את שיפוע הישר העובר דרך הנקודות $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$.`;
    }
    if(family==='value_at'){
      if(qtype==='tf') return `בפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$, כאשר $x=${x.x}$ מתקבל $y=${tfTrue?x.y:x.m+x.b+x.x}$.`;
      if(qtype==='mistake') return `בפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ תלמיד הציב $x=${x.x}$: "$y=${x.m}+${x.x}${x.b>=0?'+'+x.b:x.b}=${x.m+x.x+x.b}$".`;
      return `נתונה הפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$.\nמה ערך $y$ כאשר $x=${x.x}$?`;
    }
    if(family==='equation_from_points'){
      if(qtype==='tf') return `הישר העובר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$ הוא $y=${tfTrue?(x.m===1?'':x.m===-1?'-':x.m):-x.m}x${x.b>=0?'+'+x.b:x.b}$.`;
      if(qtype==='mistake') return `לישר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$ תלמיד כתב: "$y=${x.b}x${x.m>=0?'+'+x.m:x.m}$" — החליף בין השיפוע לחיתוך.`;
      return `כתבו את משוואת הישר העובר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$.`;
    }
    // rising_falling
    if(qtype==='tf') return `הפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ היא פונקציה ${tfTrue?(x.m>0?'עולה':'יורדת'):(x.m>0?'יורדת':'עולה')}.`;
    if(qtype==='mistake') return `על $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ תלמיד אמר: "${x.m>0?'יורדת':'עולה'}, כי ${x.m>0?'יש בה מספר חיובי קטן':'המינוס הופך אותה לעולה'}".`;
    return `האם הפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ עולה או יורדת? נמקו.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='applied_graph_read'){
      const eq = x.b===0 ? `y=${x.m}x` : `y=${x.m}x+${x.b}`;
      if(x.sub==='threshold'){
        const prefix = wrong ? `שגוי — מאתרים את $${x.yt}$ על ציר ה-$y$, עוברים אופקית עד הגרף ויורדים לציר ה-$x$.\n` : '';
        const calc = x.b===0 ? `${x.yt}\\div ${x.m}=${x.xt}` : `(${x.yt}-${x.b})\\div ${x.m}=${x.xt}`;
        return `${prefix}לפי הגרף ($${eq}$):\n$$${calc}$$\n${x.ctx==='fuel'
          ? `העלות שווה $${x.yt}$ ש"ח עבור $${x.xt}$ ליטרים, ולכן גבוהה מ-$${x.yt}$ עבור כל כמות מעל $${x.xt}$ ליטרים.`
          : `${x.what} מגיעה ל-$${x.yt}$ מעלות אחרי $${x.xt}$ דקות.`}`;
      }
      const prefix = wrong
        ? (qtype==='tf'
          ? `שגוי — ${x.rateWord} הוא $${x.m}$ (שיפוע הגרף), לא $${x.m+2}$.\n`
          : x.ctx==='heat'
          ? `שגוי — הגרף מתחיל ב-$${x.b}$ מעלות (נקודת החיתוך עם ציר ה-$y$), ויש להוסיף אותן.\n`
          : `שגוי — את התשובה קוראים מציר ה-$y$ (העלות), לא מציר ה-$x$.\n`)
        : '';
      const calc = x.b===0 ? `${x.m}\\times ${x.x0}=${x.y0}` : `${x.b}+${x.m}\\times ${x.x0}=${x.y0}`;
      return `${prefix}עולים מ-$${x.x0}$ על ציר ה-$x$ אל הגרף, וקוראים מציר ה-$y$:\n$$${calc}$$\n${x.what} היא $${x.y0}$ ${x.unitY}.`;
    }
    if(family==='slope_two_points'){
      const prefix = wrong ? 'שגוי — שיפוע: הפרש $y$ חלקי הפרש $x$ (באותו סדר).\n' : '';
      return `${prefix}$$m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{${x.y2}-${x.y1}}{${x.x2}-${x.x1}}=\\frac{${x.y2-x.y1}}{${x.x2-x.x1}}=${x.m}$$`;
    }
    if(family==='value_at'){
      const prefix = wrong ? 'שגוי — $'+x.m+'x$ פירושו כפל, לא חיבור.\n' : '';
      return `${prefix}$$y=${x.m}\\times ${x.x}${x.b>=0?'+'+x.b:x.b}=${x.m*x.x}${x.b>=0?'+'+x.b:x.b}=${x.y}$$`;
    }
    if(family==='equation_from_points'){
      const prefix = wrong ? 'שגוי — קודם שיפוע, אחר כך חיתוך.\n' : '';
      return `${prefix}שיפוע: $$m=\\frac{${x.y2}-${x.y1}}{${x.x2}-${x.x1}}=${x.m}$$\nחיתוך: מציבים $(${x.x1},${x.y1})$: $${x.y1}=${x.m}\\cdot ${x.x1}+b \\Rightarrow b=${x.b}$.\nהמשוואה: $$y=${x.m===1?'':x.m===-1?'-':x.m}x${x.b>=0?'+'+x.b:x.b}$$`;
    }
    const prefix = wrong ? 'שגוי — הסימן של השיפוע קובע: חיובי=עולה, שלילי=יורדת.\n' : '';
    return `${prefix}השיפוע הוא $${x.m}$ — ${x.m>0?'חיובי, לכן הפונקציה עולה':'שלילי, לכן הפונקציה יורדת'}.`;
  }

  E.generateA802Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    let svg;
    if(family==='applied_graph_read'){
      x.sub = E.pick(['value','threshold']);
      // value: mark the asked x with a vertical guide (the y must be read off
      // the scale). threshold: bare graph — marking x would reveal the answer.
      svg = E.linearGraphSvg({m:x.m,b:x.b,applied:true,xmax:x.xmax,
        xLabel:x.xLabel,yLabel:x.yLabel,
        guides:x.sub==='value',
        pts:x.sub==='value' ? [{x:x.x0, y:x.y0}] : []});
    }
    else if(family==='value_at') svg = E.linearGraphSvg({m:x.m,b:x.b,pts:[{x:x.x,y:x.y}]});
    else if(family==='rising_falling') svg = E.linearGraphSvg({m:x.m,b:x.b});
    else svg = E.linearGraphSvg({m:x.m,b:x.b,pts:[{x:x.x1,y:x.y1},{x:x.x2,y:x.y2}]});
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
