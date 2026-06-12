// generator/engine/pilot-g7-04.js
// G7-04 Missing Angle in Triangle (זווית חסרה במשולש) — Smart Engine
// Source: source-learning/2026-06-09/03_grade-7_pre_deductive_geometry_curriculum.learning.md
// (triangle angle-sum 180°, possible/impossible triangles, triangle types by angles).
// Angle values are teacher-changeable per the source; generated dynamically here.
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const F = () => E.fmt;

  function rnd(lo,hi){ return lo + Math.floor(Math.random()*(hi-lo+1)); }
  // Two given angles, multiples of 5, every angle in [25,110], sum 180.
  function caseAngles(){
    for(;;){
      const b = rnd(5,22)*5, c = rnd(5,22)*5, a = 180-b-c;
      if(a>=25 && a<=110 && a%5===0) return {A:a,B:b,C:c};
    }
  }
  // Validity family: ~half valid (sum 180), ~half off by 10–30.
  // The perturbed angle stays in [25,135] so the figure remains drawable.
  function caseValidity(){
    const t = caseAngles();
    if(Math.random()<0.5) return {A:t.A,B:t.B,C:t.C,valid:true};
    const offs = [-30,-20,-10,10,20,30].filter(o => t.A+o >= 25 && t.A+o <= 135);
    return {A:t.A+E.pick(offs),B:t.B,C:t.C,valid:false};
  }
  function classify(t){
    const mx = Math.max(t.A,t.B,t.C);
    if(mx===90) return 'ישר-זווית';
    if(mx>90) return 'קהה-זווית';
    return 'חד-זוויות';
  }

  function pickFamily(diff){
    if(diff === 'basic') return 'missing_angle';
    if(diff === 'challenge') return E.pick(['possible_triangle','classify_triangle','missing_angle','possible_triangle']);
    return E.pick(['missing_angle','missing_angle','classify_triangle','possible_triangle']);
  }

  function choices(family,x,unknown){
    if(family === 'possible_triangle'){
      const correct = x.valid ? 'כן, אפשרי' : 'לא אפשרי';
      const values = [correct, x.valid ? 'לא אפשרי' : 'כן, אפשרי'];
      return E.shuffle(values).map((v,i)=>({label:['א','ב'][i], text:v, correct:v===correct}));
    }
    if(family === 'classify_triangle'){
      const correct = classify(x);
      const values = [correct].concat(['חד-זוויות','קהה-זווית','ישר-זווית'].filter(v=>v!==correct));
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג'][i], text:'משולש '+v, correct:v===correct}));
    }
    const correct = x[unknown];
    const given = ['A','B','C'].filter(k=>k!==unknown).map(k=>x[k]);
    // Pedagogical distractors: subtracted only one angle / summed the given pair / off by 10.
    const wrongs = [180 - given[0], given[0]+given[1], correct+10].filter(v=>v!==correct && v>0 && v<180);
    const values = [correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct + values.length*5; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'^\\circ$', correct:v===correct}));
  }

  // 12+ open phrasings for missing_angle — varied wording, same source pattern.
  function openPhrase(unknown,g1n,g2n,g1,g2){
    const f=F();
    const tmpl = E.pick([
      `במשולש $ABC$ נתון: ${f.angle(g1n,g1)}, ${f.angle(g2n,g2)}.\nחשבו את ${f.angle(unknown)}.`,
      `במשולש $ABC$: ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}.\nמצאו את הזווית השלישית.`,
      `נתון משולש שבו ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}.\nמהי ${f.angle(unknown)}? נמקו לפי סכום הזוויות.`,
      `השלימו: במשולש שבו ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}, הזווית השלישית שווה $\\_\\_\\_^\\circ$.`,
      `איזו זווית חסרה במשולש $ABC$ אם ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}?`,
      `במשולש $ABC$ נתונות שתי זוויות: ${f.angle(g1n,g1)}, ${f.angle(g2n,g2)}.\nחשבו את ${f.angle(unknown)} וקבעו אם היא חדה, ישרה או קהה.`,
      `שרטטו לעצמכם משולש שבו ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}.\nמה גודל הזווית השלישית?`,
      `סכום זוויות במשולש הוא $180^\\circ$. אם ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)} — מצאו את ${f.angle(unknown)}.`,
      `במשולש $ABC$ שבשרטוט נתונות ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}.\nחשבו את הזווית המסומנת בסימן שאלה.`,
      `חשבו את ${f.angle(unknown)} במשולש שבו ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}, וכתבו תרגיל חיסור מתאים.`,
      `נתון: ${f.angle(g1n,g1)}, ${f.angle(g2n,g2)}. האם ${f.angle(unknown)} גדולה או קטנה מ-$90^\\circ$? חשבו ונמקו.`,
      `במשולש $ABC$ ידועות ${f.angle(g1n,g1)} ו-${f.angle(g2n,g2)}.\nמצאו את ${f.angle(unknown)} ובדקו שהסכום $180^\\circ$.`
    ]);
    return tmpl;
  }

  function question(family,x,unknown,qtype,tfTrue){
    const f=F();
    if(family === 'possible_triangle'){
      const s = `${f.angle('A',x.A)}, ${f.angle('B',x.B)}, ${f.angle('C',x.C)}`;
      if(qtype==='mistake') return `תלמיד טען: "משולש שזוויותיו ${s} אפשרי, כי כל זווית קטנה מ-$180^\\circ$".`;
      if(qtype==='tf') return `קיים משולש שזוויותיו ${s}.`;
      return E.pick([
        `האם קיים משולש שזוויותיו ${s}? נמקו.`,
        `בדקו: האם הנתונים ${s} יכולים להיות זוויות של משולש אחד?`
      ]);
    }
    if(family === 'classify_triangle'){
      const g = ['A','B','C'].filter(k=>k!==unknown);
      const s = `${f.angle(g[0],x[g[0]])} ו-${f.angle(g[1],x[g[1]])}`;
      if(qtype==='tf') return `במשולש שבו ${s}, המשולש הוא ${tfTrue?classify(x):E.pick(['חד-זוויות','קהה-זווית','ישר-זווית'].filter(v=>v!==classify(x)))}.`;
      if(qtype==='mistake') return `במשולש שבו ${s} תלמיד קבע את סוג המשולש לפי הזווית הקטנה ביותר וטען שהוא חד-זוויות בהכרח.`;
      if(qtype==='mcq') return `במשולש נתונות ${s}.\nמהו סוג המשולש לפי זוויותיו?`;
      return `במשולש נתונות ${s}.\nמצאו את הזווית השלישית וקבעו את סוג המשולש לפי זוויותיו.`;
    }
    const given = ['A','B','C'].filter(k=>k!==unknown);
    const g1=x[given[0]], g2=x[given[1]];
    if(qtype==='tf') return `במשולש שבו ${f.angle(given[0],g1)} ו-${f.angle(given[1],g2)}, מתקיים ${f.angle(unknown,tfTrue?x[unknown]:180-g1)}.`;
    if(qtype==='mistake') return `במשולש: ${f.angle(given[0],g1)}, ${f.angle(given[1],g2)}. תלמיד מצא את השלישית: "$${g1}+${g2}=${g1+g2}$, לכן ${f.angle(unknown,g1+g2)}".`;
    if(qtype==='mcq') return `במשולש $ABC$: ${f.angle(given[0],g1)}, ${f.angle(given[1],g2)}.\nמה גודל ${f.angle(unknown)}?`;
    return openPhrase(unknown,given[0],given[1],g1,g2);
  }

  function answer(family,x,unknown,qtype,tfTrue){
    const f=F();
    if(family === 'possible_triangle'){
      const sum = x.A+x.B+x.C;
      const prefix = qtype==='mistake' ? 'הטעות: התנאי אינו שכל זווית קטנה מ-$180^\\circ$, אלא שסכום הזוויות שווה בדיוק $180^\\circ$.\n' : '';
      if(x.valid) return `${prefix}$$${x.A}^\\circ+${x.B}^\\circ+${x.C}^\\circ=${sum}^\\circ$$\nהסכום שווה $180^\\circ$, לכן משולש כזה אפשרי.`;
      return `${prefix}$$${x.A}^\\circ+${x.B}^\\circ+${x.C}^\\circ=${sum}^\\circ$$\nהסכום שונה מ-$180^\\circ$, לכן משולש כזה אינו אפשרי.`;
    }
    if(family === 'classify_triangle'){
      const g = ['A','B','C'].filter(k=>k!==unknown);
      const kind = classify(x);
      const mx = Math.max(x.A,x.B,x.C);
      const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
      const prefix = wrong ? 'שגוי — סוג המשולש נקבע לפי הזווית הגדולה ביותר.\n' : '';
      return `${prefix}הזווית השלישית: $$180-${x[g[0]]}-${x[g[1]]}=${x[unknown]}$$ כלומר ${f.angle(unknown,x[unknown])}.\nהזווית הגדולה ביותר היא $${mx}^\\circ$ — ${mx===90?'בדיוק $90^\\circ$':mx>90?'גדולה מ-$90^\\circ$':'קטנה מ-$90^\\circ$'}, ולכן זהו משולש ${kind}.`;
    }
    const given = ['A','B','C'].filter(k=>k!==unknown);
    const g1=x[given[0]], g2=x[given[1]], ans=x[unknown];
    const prefix = qtype==='mistake' ? 'הטעות: הסכום שחושב הוא סכום שתי הזוויות הנתונות — הוא אינו הזווית השלישית. את השלישית מוצאים בחיסור מ-$180^\\circ$.\n' : (qtype==='tf' && !tfTrue) ? 'שגוי — מחסרים את שתי הזוויות מ-$180^\\circ$, לא רק אחת:\n' : '';
    return `${prefix}סכום זוויות במשולש: $180^\\circ$.\n$$180-${g1}-${g2}=${ans}$$\nכלומר ${f.angle(unknown,ans)}.`;
  }

  E.generateG704Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    let x, unknown=null, svg;
    if(family === 'possible_triangle'){
      x = caseValidity();
      svg = E.triangleAnglesSvg({A:x.A,B:x.B,C:x.C}, null, {A:x.A,B:x.B,C:x.C});
    } else {
      x = caseAngles();
      unknown = E.pick(['A','B','C']);
      const p = {A:x.A,B:x.B,C:x.C}; p[unknown]=null;
      svg = E.triangleAnglesSvg(p, unknown, {A:x.A,B:x.B,C:x.C});
    }
    const tfTrue = questionType==='tf' && family!=='possible_triangle' && Math.random()<0.5;
    const q = question(family,x,unknown,questionType,tfTrue);
    const a = answer(family,x,unknown,questionType,tfTrue);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x,unknown)});
    if(questionType === 'tf'){
      const isTrue = family === 'possible_triangle' ? x.valid : tfTrue;
      return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    }
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
