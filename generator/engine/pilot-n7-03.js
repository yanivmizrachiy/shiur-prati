// generator/engine/pilot-n7-03.js
// N7-03 Negative Numbers on Number Line — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // Source ranges (PATTERN_INDEX N7-03: −10..10, fractions like −3.5; learning
  // file 05: values changeable). Cases generated dynamically in those ranges.
  function rnd(lo,hi){ return lo + Math.floor(Math.random()*(hi-lo+1)); }
  function caseOrder(){
    const s = [];
    while(s.length < 5){ const v = rnd(-10,10); if(s.indexOf(v) < 0) s.push(v); }
    if(!s.some(v=>v<0)) s[0] = -rnd(1,10);
    if(!s.some(v=>v>=0)) s[0] = rnd(0,10);
    return s.filter((v,i)=>s.indexOf(v)===i).length===5 ? s : caseOrder();
  }
  function caseCompare(){
    let a=rnd(-10,10), b=rnd(-10,10);
    if(a>=0 && b>=0) a=-rnd(1,10);
    while(b===a) b=rnd(-10,10);
    return {a:a,b:b,bigger:Math.max(a,b)};
  }
  function caseAbsOpp(){
    let n=rnd(-12,12); while(n===0) n=rnd(-12,12);
    return {n:n,abs:Math.abs(n),opp:-n};
  }
  // Placement family — source pattern N7-03: marking P, its opposite, and fractions like -3.5 on the line
  function casePlace(){
    const p = -(rnd(0,5)+0.5);
    return {p:p,lo:Math.floor(p),hi:Math.ceil(p)};
  }

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

  function question(family,x,qtype,tfTrue){
    if(family === 'placement'){
      if(qtype==='tf') return tfTrue
        ? `המספר $${x.p}$ נמצא על ציר המספרים בין $${x.lo}$ ל-$${x.hi}$.`
        : `המספר $${x.p}$ נמצא על ציר המספרים בין $${x.lo+1}$ ל-$${x.hi+1}$.`;
      if(qtype==='mistake') return `תלמיד סימן את $${x.p}$ בין $${-x.hi}$ ל-$${-x.lo}$, כי "המינוס לא משנה את המיקום על הציר".`;
      if(qtype==='mcq') return `בין אילו שני מספרים שלמים נמצא $${x.p}$ על ציר המספרים?`;
      return `הנקודה P מייצגת את המספר $${x.p}$ על ציר המספרים.\nא. בין אילו שני מספרים שלמים נמצאת P?\nב. מהו המספר הנגדי ל-$${x.p}$?`;
    }
    if(family === 'order'){
      const list = x.join(', ');
      if(qtype==='tf'){ const s=x.slice().sort((p,q)=>p-q); return `בסדרה $${list}$ — המספר הקטן ביותר הוא $${tfTrue?s[0]:s[s.length-1]}$.`; }
      if(qtype==='mistake') return `תלמיד סידר מהקטן לגדול: $${x.slice().sort((p,q)=>Math.abs(p)-Math.abs(q)).join(', ')}$ — לפי המרחק מאפס.`;
      if(qtype==='mcq') return `בסדרה $${list}$ — מהו המספר הקטן ביותר?`;
      return `סדרו מהקטן לגדול: $${list}$`;
    }
    if(family === 'compare'){
      if(qtype==='tf') return `$${x.a} > ${x.b}$.`;
      if(qtype==='mistake') return `תלמיד טען: "$${Math.min(x.a,x.b)} > ${Math.max(x.a,x.b)}$, כי $${Math.abs(Math.min(x.a,x.b))}$ גדול מ-$${Math.abs(Math.max(x.a,x.b))}$".`;
      return `איזה מספר גדול יותר: $${x.a}$ או $${x.b}$? הסבירו.`;
    }
    if(qtype==='tf') return `$|${x.n}| = ${tfTrue?x.abs:-x.abs}$.`;
    if(qtype==='mistake') return `תלמיד כתב: "$|${x.n}|=${x.n}$ — הערך המוחלט לא משנה את המספר".`;
    if(qtype==='mcq') return `מה ערכו של $|${x.n}|$?`;
    return `א. מה ערכו של $|${x.n}|$?\nב. מהו המספר הנגדי ל-$${x.n}$?`;
  }

  function answer(family,x,qtype,tfTrue){
    if(family === 'placement'){
      const prefix = qtype==='mistake' ? 'הטעות: הסימן כן קובע צד — מספר שלילי נמצא משמאל לאפס.\n' : qtype==='tf' ? (tfTrue?'נכון:\n':'שגוי:\n') : '';
      return `${prefix}$${x.p}$ נמצא משמאל לאפס, בין $${x.lo}$ ל-$${x.hi}$:\n$$${x.lo} < ${x.p} < ${x.hi}$$\nהמספר הנגדי הוא $${-x.p}$ — באותו מרחק מאפס, מימינו.`;
    }
    if(family === 'order'){
      const s = x.slice().sort((p,q)=>p-q);
      const prefix = qtype==='mistake' ? 'הטעות: סידור לפי מרחק מאפס מתעלם מהסימן. מספר שלילי תמיד קטן מחיובי.\n' : qtype==='tf' ? (tfTrue?'נכון:\n':'שגוי:\n') : '';
      return `${prefix}על ציר המספרים, שמאלה = קטן יותר.\n$$${s.join(' < ')}$$`;
    }
    if(family === 'compare'){
      const prefix = qtype==='mistake' ? 'הטעות: במספרים שליליים, ככל שהמרחק מאפס גדול יותר — המספר קטן יותר.\n' : qtype==='tf' ? (x.a > x.b ? 'נכון:\n' : 'שגוי:\n') : '';
      return `${prefix}$$${Math.max(x.a,x.b)} > ${Math.min(x.a,x.b)}$$\nעל ציר המספרים $${Math.max(x.a,x.b)}$ נמצא מימין ל-$${Math.min(x.a,x.b)}$, לכן הוא גדול יותר.`;
    }
    const prefix = qtype==='mistake' || (qtype==='tf' && !tfTrue) ? 'שגוי — ערך מוחלט הוא המרחק מאפס, והוא תמיד אי-שלילי.\n' : qtype==='tf' ? 'נכון:\n' : '';
    return `${prefix}$$|${x.n}|=${x.abs}$$\nהמספר הנגדי ל-$${x.n}$ הוא $${x.opp}$ (אותו מרחק מאפס, בצד השני).`;
  }

  E.generateN703Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = family==='order' ? caseOrder() : family==='compare' ? caseCompare() : family==='placement' ? casePlace() : caseAbsOpp();
    let pts, svg;
    if(family==='placement'){
      svg = E.numberLineSvg({points:[x.p, -x.p], min:-6, max:6, step:2});
    } else {
      if(family==='order') pts = x;
      else if(family==='compare') pts = [x.a,x.b];
      else pts = [x.n, x.opp];
      svg = E.numberLineSvg({points:pts, min:-12, max:12});
    }
    const tfTrue = questionType==='tf' && family!=='compare' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType==='tf'){
      const isTrue = family==='compare' ? x.a > x.b : tfTrue;
      return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    }
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
