// generator/engine/pilot-g7-04.js
// G7-04 Missing Angle in Triangle (זווית חסרה במשולש) — Smart Engine
// Source: source-learning/2026-06-09/03_grade-7_pre_deductive_geometry_curriculum.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // All angle sets sum to 180
  const ANGLE_SETS = [
    {A:40,B:70,C:70},{A:30,B:90,C:60},{A:55,B:65,C:60},{A:45,B:80,C:55},
    {A:35,B:75,C:70},{A:25,B:110,C:45},{A:60,B:60,C:60},{A:50,B:70,C:60}
  ];
  // Validity checks: sum may or may not equal 180
  const VALIDITY = [
    {A:90,B:50,C:40,valid:true},{A:45,B:45,C:90,valid:true},{A:70,B:60,C:50,valid:true},
    {A:100,B:60,C:30,valid:false},{A:70,B:80,C:40,valid:false},{A:90,B:90,C:20,valid:false}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'missing_angle';
    if(diff === 'challenge') return E.pick(['possible_triangle','missing_angle','possible_triangle']);
    return E.pick(['missing_angle','missing_angle','possible_triangle']);
  }

  function choices(family,x,unknown){
    if(family === 'possible_triangle'){
      const correct = x.valid ? 'כן, אפשרי' : 'לא אפשרי';
      const values = [correct, x.valid ? 'לא אפשרי' : 'כן, אפשרי'];
      return E.shuffle(values).map((v,i)=>({label:['א','ב'][i], text:v, correct:v===correct}));
    }
    const correct = x[unknown];
    const given = ['A','B','C'].filter(k=>k!==unknown).map(k=>x[k]);
    const wrongs = [180 - given[0], given[0]+given[1], correct+10].filter(v=>v!==correct && v>0 && v<180);
    const values = [correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4) values.push(correct + values.length*5);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'°$', correct:v===correct}));
  }

  function question(family,x,unknown,qtype){
    if(family === 'possible_triangle'){
      const s = `$${x.A}°$, $${x.B}°$, $${x.C}°$`;
      if(qtype==='mistake') return `תלמיד טען: "משולש עם זוויות ${s} אפשרי, כי כל זווית קטנה מ-$180°$".`;
      if(qtype==='tf') return `קיים משולש שזוויותיו ${s}.`;
      return `האם קיים משולש שזוויותיו ${s}? נמקו.`;
    }
    const given = ['A','B','C'].filter(k=>k!==unknown);
    const g1=x[given[0]], g2=x[given[1]];
    if(qtype==='tf') return `במשולש שתי זוויות הן $${g1}°$ ו-$${g2}°$. הזווית השלישית היא $${180-g1}°$.`;
    if(qtype==='mistake') return `במשולש שתי זוויות: $${g1}°$ ו-$${g2}°$. תלמיד מצא את השלישית: "$${g1}+${g2}=${g1+g2}$, לכן הזווית היא $${g1+g2}°$".`;
    return `במשולש ABC שתי זוויות הן $${g1}°$ ו-$${g2}°$.\nחשבו את הזווית השלישית.`;
  }

  function answer(family,x,unknown,qtype){
    if(family === 'possible_triangle'){
      const sum = x.A+x.B+x.C;
      const prefix = qtype==='mistake' ? 'הטעות: התנאי אינו שכל זווית קטנה מ-$180°$, אלא שסכום הזוויות שווה בדיוק $180°$.\n' : '';
      if(x.valid) return `${prefix}$$${x.A}+${x.B}+${x.C}=${sum}$$\nהסכום שווה $180°$, לכן משולש כזה אפשרי.`;
      return `${prefix}$$${x.A}+${x.B}+${x.C}=${sum}$$\nהסכום שונה מ-$180°$, לכן משולש כזה אינו אפשרי.`;
    }
    const given = ['A','B','C'].filter(k=>k!==unknown);
    const g1=x[given[0]], g2=x[given[1]], ans=x[unknown];
    const prefix = qtype==='mistake' ? 'הטעות: הסכום שחושב הוא סכום שתי הזוויות הנתונות — הוא אינו הזווית השלישית. את השלישית מוצאים בחיסור מ-$180°$.\n' : qtype==='tf' ? 'שגוי — מחסרים את שתי הזוויות מ-$180°$, לא רק אחת:\n' : '';
    return `${prefix}סכום זוויות במשולש: $180°$.\n$$180-${g1}-${g2}=${ans}$$\nהזווית השלישית: $${ans}°$.`;
  }

  E.generateG704Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    let x, unknown=null, svg;
    if(family === 'possible_triangle'){
      x = E.pick(VALIDITY);
      svg = E.triangleAnglesSvg({A:x.A,B:x.B,C:x.C}, null);
    } else {
      x = E.pick(ANGLE_SETS);
      unknown = E.pick(['A','B','C']);
      const p = {A:x.A,B:x.B,C:x.C}; p[unknown]=null;
      svg = E.triangleAnglesSvg(p, unknown);
    }
    const q = question(family,x,unknown,questionType);
    const a = answer(family,x,unknown,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x,unknown)});
    if(questionType === 'tf'){
      const isTrue = family === 'possible_triangle' ? x.valid : false;
      return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    }
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
