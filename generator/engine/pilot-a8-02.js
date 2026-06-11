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
    if(diff === 'basic') return E.pick(['value_at','rising_falling']);
    if(diff === 'challenge') return E.pick(['slope_two_points','equation_from_points','slope_two_points']);
    return E.pick(['slope_two_points','value_at','rising_falling','equation_from_points']);
  }
  function pickCase(f){
    if(f==='value_at') return E.pick(VALUE_AT);
    return E.pick(SLOPE_PTS);
  }

  function choices(family,x){
    let correct, wrongs;
    if(family==='slope_two_points'){ correct=x.m; wrongs=[-x.m, x.m+1, x.y2-x.y1]; }
    else if(family==='value_at'){ correct=x.y; wrongs=[x.m+x.b+x.x, x.y-x.b, x.m*x.x]; }
    else if(family==='equation_from_points'){
      correct='y='+(x.m===1?'':x.m===-1?'-':x.m)+'x'+(x.b>=0?'+'+x.b:x.b);
      const wm=-x.m;
      wrongs=['y='+(wm===1?'':wm===-1?'-':wm)+'x'+(x.b>=0?'+'+x.b:x.b),'y='+(x.b)+'x'+(x.m>=0?'+'+x.m:x.m),'y='+(x.m===1?'':x.m)+'x'];
    }
    else { correct = x.m>0?'עולה':'יורדת'; wrongs=[x.m>0?'יורדת':'עולה','קבועה']; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4 && typeof correct==='number') values.push(correct+values.length);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text: typeof v==='number' ? '$'+v+'$' : '$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family==='slope_two_points'){
      if(qtype==='tf') return `שיפוע הישר העובר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$ הוא $${-x.m}$.`;
      if(qtype==='mistake') return `תלמיד חישב שיפוע דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$: "$m=\\frac{${x.x2}-${x.x1}}{${x.y2}-${x.y1}}$" — הפך מונה ומכנה.`;
      return `מצאו את שיפוע הישר העובר דרך הנקודות $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$.`;
    }
    if(family==='value_at'){
      if(qtype==='tf') return `בפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$, כאשר $x=${x.x}$ מתקבל $y=${x.m+x.b+x.x}$.`;
      if(qtype==='mistake') return `בפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ תלמיד הציב $x=${x.x}$: "$y=${x.m}+${x.x}${x.b>=0?'+'+x.b:x.b}=${x.m+x.x+x.b}$".`;
      return `נתונה הפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$.\nמה ערך $y$ כאשר $x=${x.x}$?`;
    }
    if(family==='equation_from_points'){
      if(qtype==='tf') return `הישר העובר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$ הוא $y=${-x.m}x${x.b>=0?'+'+x.b:x.b}$.`;
      if(qtype==='mistake') return `לישר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$ תלמיד כתב: "$y=${x.b}x${x.m>=0?'+'+x.m:x.m}$" — החליף בין השיפוע לחיתוך.`;
      return `כתבו את משוואת הישר העובר דרך $(${x.x1},${x.y1})$ ו-$(${x.x2},${x.y2})$.`;
    }
    // rising_falling
    if(qtype==='tf') return `הפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ היא פונקציה ${x.m>0?'יורדת':'עולה'}.`;
    if(qtype==='mistake') return `על $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ תלמיד אמר: "${x.m>0?'יורדת':'עולה'}, כי ${x.m>0?'יש בה מספר חיובי קטן':'המינוס הופך אותה לעולה'}".`;
    return `האם הפונקציה $y=${x.m}x${x.b>=0?'+'+x.b:x.b}$ עולה או יורדת? נמקו.`;
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
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
    const q = question(family,x,questionType), a = answer(family,x,questionType);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:false});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
