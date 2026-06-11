// generator/engine/pilot-g7-01.js
// G7-01 Rectangle and Box (מלבן ותיבה) — Smart Engine
// Source: source-learning/2026-06-09/03_grade-7_pre_deductive_geometry_curriculum.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const RECT_AREA = [
    {l:8,w:5,A:40},{l:7,w:4,A:28},{l:9,w:6,A:54},{l:12,w:5,A:60},{l:6,w:3,A:18}
  ];
  const RECT_PERIM = [
    {l:8,w:5,P:26},{l:7,w:4,P:22},{l:10,w:6,P:32},{l:9,w:3,P:24},{l:11,w:5,P:32}
  ];
  const BOX_VOL = [
    {l:4,w:3,h:5,V:60},{l:6,w:5,h:2,V:60},{l:7,w:2,h:4,V:56},{l:3,w:3,h:4,V:36},{l:5,w:5,h:6,V:150}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['rect_area','rect_perimeter']);
    if(diff === 'challenge') return E.pick(['box_volume','box_missing_dim','rect_missing_side_perimeter']);
    return E.pick(['rect_area','rect_perimeter','rect_missing_side_area','rect_missing_side_perimeter','box_volume']);
  }

  function pickCase(family){
    if(family.indexOf('box') === 0) return E.pick(BOX_VOL);
    if(family === 'rect_perimeter' || family === 'rect_missing_side_perimeter') return E.pick(RECT_PERIM);
    return E.pick(RECT_AREA);
  }

  function correctValue(family,x){
    if(family === 'rect_area') return x.A;
    if(family === 'rect_perimeter') return x.P;
    if(family === 'rect_missing_side_area' || family === 'rect_missing_side_perimeter') return x.w;
    if(family === 'box_volume') return x.V;
    return x.h; // box_missing_dim
  }

  function choices(family,x){
    const correct = correctValue(family,x);
    let wrongs;
    if(family === 'rect_area') wrongs = [2*(x.l+x.w), x.l+x.w, x.A+x.l];
    else if(family === 'rect_perimeter') wrongs = [x.l*x.w, x.l+x.w, x.P+x.w];
    else if(family === 'rect_missing_side_area') wrongs = [x.A-x.l, x.w+2, x.l];
    else if(family === 'rect_missing_side_perimeter') wrongs = [x.P-x.l, x.w+1, x.l];
    else if(family === 'box_volume') wrongs = [x.l+x.w+x.h, x.l*x.w, x.V+x.h];
    else wrongs = [x.V-x.l*x.w, x.h+2, x.w];
    const values = [correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4) values.push(correct+values.length*3);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family === 'rect_area'){
      if(qtype==='tf') return `שטח מלבן שאורכו $${x.l}$ ס״מ ורוחבו $${x.w}$ ס״מ הוא $${2*(x.l+x.w)}$ סמ״ר.`;
      if(qtype==='mistake') return `תלמיד חישב שטח מלבן $${x.l}\\times ${x.w}$: "$${x.l}+${x.w}=${x.l+x.w}$, ואז כפול $2$: $${2*(x.l+x.w)}$ סמ״ר".`;
      return `מלבן שאורכו $${x.l}$ ס״מ ורוחבו $${x.w}$ ס״מ.\nחשבו את שטח המלבן.`;
    }
    if(family === 'rect_perimeter'){
      if(qtype==='tf') return `היקף מלבן שאורכו $${x.l}$ ס״מ ורוחבו $${x.w}$ ס״מ הוא $${x.l*x.w}$ ס״מ.`;
      if(qtype==='mistake') return `תלמיד חישב היקף מלבן $${x.l}\\times ${x.w}$: "$${x.l}\\times ${x.w}=${x.l*x.w}$ ס״מ".`;
      return `מלבן שאורכו $${x.l}$ ס״מ ורוחבו $${x.w}$ ס״מ.\nחשבו את היקף המלבן.`;
    }
    if(family === 'rect_missing_side_area'){
      if(qtype==='tf') return `שטח מלבן הוא $${x.A}$ סמ״ר ואורכו $${x.l}$ ס״מ. הרוחב הוא $${x.A-x.l}$ ס״מ.`;
      if(qtype==='mistake') return `שטח מלבן $${x.A}$ סמ״ר, אורך $${x.l}$ ס״מ. תלמיד מצא רוחב: "$${x.A}-${x.l}=${x.A-x.l}$ ס״מ".`;
      return `שטח מלבן הוא $${x.A}$ סמ״ר ואורכו $${x.l}$ ס״מ.\nמה רוחב המלבן?`;
    }
    if(family === 'rect_missing_side_perimeter'){
      if(qtype==='tf') return `היקף מלבן הוא $${x.P}$ ס״מ ואורכו $${x.l}$ ס״מ. הרוחב הוא $${x.P-x.l}$ ס״מ.`;
      if(qtype==='mistake') return `היקף מלבן $${x.P}$ ס״מ, אורך $${x.l}$ ס״מ. תלמיד מצא רוחב: "$${x.P}-${x.l}=${x.P-x.l}$ ס״מ".`;
      return `היקף מלבן הוא $${x.P}$ ס״מ ואורכו $${x.l}$ ס״מ.\nמה רוחב המלבן?`;
    }
    if(family === 'box_volume'){
      if(qtype==='tf') return `נפח תיבה שממדיה $${x.l}\\times ${x.w}\\times ${x.h}$ ס״מ הוא $${x.l+x.w+x.h}$ סמ״ק.`;
      if(qtype==='mistake') return `תלמיד חישב נפח תיבה $${x.l}\\times ${x.w}\\times ${x.h}$: "$${x.l}+${x.w}+${x.h}=${x.l+x.w+x.h}$ סמ״ק".`;
      return `תיבה שאורכה $${x.l}$ ס״מ, רוחבה $${x.w}$ ס״מ וגובהה $${x.h}$ ס״מ.\nחשבו את נפח התיבה.`;
    }
    // box_missing_dim
    if(qtype==='tf') return `נפח תיבה $${x.V}$ סמ״ק, אורכה $${x.l}$ ס״מ ורוחבה $${x.w}$ ס״מ. הגובה הוא $${x.V - x.l*x.w}$ ס״מ.`;
    if(qtype==='mistake') return `נפח תיבה $${x.V}$ סמ״ק, אורך $${x.l}$, רוחב $${x.w}$. תלמיד מצא גובה: "$${x.V}-${x.l*x.w}=${x.V-x.l*x.w}$ ס״מ".`;
    return `נפח תיבה הוא $${x.V}$ סמ״ק. אורכה $${x.l}$ ס״מ ורוחבה $${x.w}$ ס״מ.\nמה גובה התיבה?`;
  }

  function answer(family,x,qtype){
    const wrongNote = qtype==='mistake' || qtype==='tf';
    if(family === 'rect_area'){
      const prefix = wrongNote ? 'שגוי — חיבור הצלעות נותן היקף (חצי ממנו), לא שטח. שטח = אורך × רוחב.\n' : '';
      return `${prefix}$$S=${x.l}\\times ${x.w}=${x.A}$$\nשטח המלבן: $${x.A}$ סמ״ר.`;
    }
    if(family === 'rect_perimeter'){
      const prefix = wrongNote ? 'שגוי — כפל הצלעות נותן שטח, לא היקף. היקף = סכום כל הצלעות.\n' : '';
      return `${prefix}$$P=2\\times(${x.l}+${x.w})=2\\times ${x.l+x.w}=${x.P}$$\nהיקף המלבן: $${x.P}$ ס״מ.`;
    }
    if(family === 'rect_missing_side_area'){
      const prefix = wrongNote ? 'שגוי — שטח מתקבל מכפל, לכן את הצלע החסרה מוצאים בחילוק, לא בחיסור.\n' : '';
      return `${prefix}$$w=S\\div l=${x.A}\\div ${x.l}=${x.w}$$\nרוחב המלבן: $${x.w}$ ס״מ.`;
    }
    if(family === 'rect_missing_side_perimeter'){
      const prefix = wrongNote ? 'שגוי — בהיקף יש שתי צלעות מכל סוג.\n' : '';
      return `${prefix}$$${x.P}=2\\times(${x.l}+w)$$\n$$${x.l}+w=${x.P/2}$$\n$$w=${x.P/2}-${x.l}=${x.w}$$\nרוחב המלבן: $${x.w}$ ס״מ.`;
    }
    if(family === 'box_volume'){
      const prefix = wrongNote ? 'שגוי — נפח הוא מכפלת שלושת הממדים, לא סכומם.\n' : '';
      return `${prefix}$$V=${x.l}\\times ${x.w}\\times ${x.h}=${x.V}$$\nנפח התיבה: $${x.V}$ סמ״ק.`;
    }
    const prefix = wrongNote ? 'שגוי — נפח מתקבל מכפל, לכן את הממד החסר מוצאים בחילוק.\n' : '';
    return `${prefix}שטח הבסיס: $${x.l}\\times ${x.w}=${x.l*x.w}$.\n$$h=V\\div(l\\times w)=${x.V}\\div ${x.l*x.w}=${x.h}$$\nגובה התיבה: $${x.h}$ ס״מ.`;
  }

  E.generateG701Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    let svg;
    if(family.indexOf('box') === 0){
      const params = family === 'box_missing_dim' ? {l:x.l,w:x.w,h:null} : {l:x.l,w:x.w,h:x.h};
      svg = E.boxSvg(params, family === 'box_missing_dim' ? 'h' : null);
    } else {
      const hideW = family === 'rect_missing_side_area' || family === 'rect_missing_side_perimeter';
      svg = E.rectangleSvg({l:x.l, w:hideW?null:x.w}, hideW?'w':null);
    }
    const q = question(family,x,questionType);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:false});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
