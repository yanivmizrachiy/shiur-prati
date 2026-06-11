// generator/engine/pilot-n7-03.js
// N7-03 Negative Numbers on Number Line — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const ORDER_SETS = [
    [3,-5,0,-1,7],[-8,2,-3,5,0],[4,-6,1,-2,-9],[-4,6,-7,3,0],[8,-1,-10,2,-5]
  ];
  const COMPARE = [
    {a:-4,b:-2,bigger:-2},{a:-7,b:-9,bigger:-7},{a:-3,b:1,bigger:1},
    {a:-6,b:-1,bigger:-1},{a:-10,b:-8,bigger:-8},{a:0,b:-5,bigger:0}
  ];
  const ABS_OPP = [
    {n:-7,abs:7,opp:7},{n:-12,abs:12,opp:12},{n:5,abs:5,opp:-5},{n:-3,abs:3,opp:3},{n:9,abs:9,opp:-9}
  ];
  // Placement family — source pattern N7-03: marking P, its opposite, and fractions like -3.5 on the line
  const PLACE = [
    {p:-3.5,lo:-4,hi:-3},{p:-1.5,lo:-2,hi:-1},{p:-0.5,lo:-1,hi:0},{p:-2.5,lo:-3,hi:-2},{p:-4.5,lo:-5,hi:-4}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['compare','abs_opp']);
    if(diff === 'challenge') return E.pick(['order','placement','order','placement']);
    return E.pick(['order','compare','abs_opp','placement']);
  }

  function choices(family,x){
    if(family === 'placement'){
      const correct = '$'+x.lo+'$ ו-$'+x.hi+'$';
      const opts=[
        {text:correct, correct:true},
        {text:'$'+(-x.hi)+'$ ו-$'+(-x.lo)+'$', correct:false},
        {text:'$'+(x.lo-1)+'$ ו-$'+x.lo+'$', correct:false},
        {text:'$'+(x.hi+1)+'$ ו-$'+(x.hi+2)+'$', correct:false}
      ];
      return E.shuffle(opts).map((o,i)=>({label:['א','ב','ג','ד'][i], text:o.text, correct:o.correct}));
    }
    let correct, wrongs;
    if(family === 'compare'){ correct = x.bigger; wrongs = [x.bigger === x.a ? x.b : x.a]; }
    else if(family === 'abs_opp'){ correct = x.abs; wrongs = [-x.abs, x.n, x.abs+1]; }
    else {
      const sorted = x.slice().sort((p,q)=>p-q);
      correct = sorted[0];
      wrongs = [sorted[sorted.length-1], x[0], sorted[1]];
    }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct-values.length; while(values.indexOf(f)>=0) f--; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family === 'placement'){
      if(qtype==='tf') return `המספר $${x.p}$ נמצא על ציר המספרים בין $${x.lo+1}$ ל-$${x.hi+1}$.`;
      if(qtype==='mistake') return `תלמיד סימן את $${x.p}$ בין $${-x.hi}$ ל-$${-x.lo}$, כי "המינוס לא משנה את המיקום על הציר".`;
      if(qtype==='mcq') return `בין אילו שני מספרים שלמים נמצא $${x.p}$ על ציר המספרים?`;
      return `הנקודה P מייצגת את המספר $${x.p}$ על ציר המספרים.\nא. בין אילו שני מספרים שלמים נמצאת P?\nב. מהו המספר הנגדי ל-$${x.p}$?`;
    }
    if(family === 'order'){
      const list = x.join(', ');
      if(qtype==='tf'){ const s=x.slice().sort((p,q)=>p-q); return `בסדרה $${list}$ — המספר הקטן ביותר הוא $${s[s.length-1]}$.`; }
      if(qtype==='mistake') return `תלמיד סידר מהקטן לגדול: $${x.slice().sort((p,q)=>Math.abs(p)-Math.abs(q)).join(', ')}$ — לפי המרחק מאפס.`;
      if(qtype==='mcq') return `בסדרה $${list}$ — מהו המספר הקטן ביותר?`;
      return `סדרו מהקטן לגדול: $${list}$`;
    }
    if(family === 'compare'){
      if(qtype==='tf') return `$${x.a} > ${x.b}$.`;
      if(qtype==='mistake') return `תלמיד טען: "$${Math.min(x.a,x.b)} > ${Math.max(x.a,x.b)}$, כי $${Math.abs(Math.min(x.a,x.b))}$ גדול מ-$${Math.abs(Math.max(x.a,x.b))}$".`;
      return `איזה מספר גדול יותר: $${x.a}$ או $${x.b}$? הסבירו.`;
    }
    if(qtype==='tf') return `$|${x.n}| = ${-x.abs}$.`;
    if(qtype==='mistake') return `תלמיד כתב: "$|${x.n}|=${x.n}$ — הערך המוחלט לא משנה את המספר".`;
    if(qtype==='mcq') return `מה ערכו של $|${x.n}|$?`;
    return `א. מה ערכו של $|${x.n}|$?\nב. מהו המספר הנגדי ל-$${x.n}$?`;
  }

  function answer(family,x,qtype){
    if(family === 'placement'){
      const prefix = qtype==='mistake' ? 'הטעות: הסימן כן קובע צד — מספר שלילי נמצא משמאל לאפס.\n' : qtype==='tf' ? 'שגוי:\n' : '';
      return `${prefix}$${x.p}$ נמצא משמאל לאפס, בין $${x.lo}$ ל-$${x.hi}$:\n$$${x.lo} < ${x.p} < ${x.hi}$$\nהמספר הנגדי הוא $${-x.p}$ — באותו מרחק מאפס, מימינו.`;
    }
    if(family === 'order'){
      const s = x.slice().sort((p,q)=>p-q);
      const prefix = qtype==='mistake' ? 'הטעות: סידור לפי מרחק מאפס מתעלם מהסימן. מספר שלילי תמיד קטן מחיובי.\n' : qtype==='tf' ? 'שגוי:\n' : '';
      return `${prefix}על ציר המספרים, שמאלה = קטן יותר.\n$$${s.join(' < ')}$$`;
    }
    if(family === 'compare'){
      const prefix = qtype==='mistake' ? 'הטעות: במספרים שליליים, ככל שהמרחק מאפס גדול יותר — המספר קטן יותר.\n' : qtype==='tf' ? (x.a > x.b ? 'נכון:\n' : 'שגוי:\n') : '';
      return `${prefix}$$${Math.max(x.a,x.b)} > ${Math.min(x.a,x.b)}$$\nעל ציר המספרים $${Math.max(x.a,x.b)}$ נמצא מימין ל-$${Math.min(x.a,x.b)}$, לכן הוא גדול יותר.`;
    }
    const prefix = qtype==='mistake' || qtype==='tf' ? 'שגוי — ערך מוחלט הוא המרחק מאפס, והוא תמיד אי-שלילי.\n' : '';
    return `${prefix}$$|${x.n}|=${x.abs}$$\nהמספר הנגדי ל-$${x.n}$ הוא $${x.opp}$ (אותו מרחק מאפס, בצד השני).`;
  }

  E.generateN703Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = family==='order' ? E.pick(ORDER_SETS) : family==='compare' ? E.pick(COMPARE) : family==='placement' ? E.pick(PLACE) : E.pick(ABS_OPP);
    let pts, svg;
    if(family==='placement'){
      svg = E.numberLineSvg({points:[x.p, -x.p], min:-6, max:6, step:2});
    } else {
      if(family==='order') pts = x;
      else if(family==='compare') pts = [x.a,x.b];
      else pts = [x.n, x.opp];
      svg = E.numberLineSvg({points:pts, min:-12, max:12});
    }
    const q = question(family,x,questionType), a = answer(family,x,questionType);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType==='tf'){
      let isTrue = false;
      if(family==='compare') isTrue = x.a > x.b;
      return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    }
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
