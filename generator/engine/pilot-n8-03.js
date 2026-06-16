// generator/engine/pilot-n8-03.js
// N8-03 Scale — Engine Pilot
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const SCALE_REAL_DISTANCE = [
    {map:3, scale:50000, realCm:150000, real:'1.5 ק״מ', ctx:'במפה', thing:'המרחק בין הספרייה לבית הספר'},
    {map:6, scale:25000, realCm:150000, real:'1.5 ק״מ', ctx:'במפת מסלול', thing:'אורך המסלול'},
    {map:4, scale:20000, realCm:80000, real:'800 מ׳', ctx:'בשרטוט שכונתי', thing:'המרחק בין שתי תחנות'},
    {map:5, scale:10000, realCm:50000, real:'500 מ׳', ctx:'בתוכנית פארק', thing:'אורך השביל'}
  ];
  const SCALE_MAP_DISTANCE = [
    {map:5, scale:200, realCm:1000, real:'10 מ׳', ctx:'בשרטוט חדר', thing:'אורך הקיר'},
    {map:2, scale:50000, realCm:100000, real:'1 ק״מ', ctx:'במפה', thing:'המרחק בין שני רחובות'},
    {map:3, scale:20000, realCm:60000, real:'600 מ׳', ctx:'במפת פארק', thing:'אורך השביל'},
    {map:4, scale:25000, realCm:100000, real:'1 ק״מ', ctx:'במפת מסלול', thing:'אורך הדרך'}
  ];
  const SCALE_FACTOR = [
    {map:4, scale:2000000, realCm:8000000, real:'80 ק״מ', ctx:'במפה ארצית', thing:'המרחק בין שתי ערים'},
    {map:5, scale:50000, realCm:250000, real:'2.5 ק״מ', ctx:'במפת יישוב', thing:'המרחק בין הכניסה למרכז'},
    {map:3, scale:10000, realCm:30000, real:'300 מ׳', ctx:'בתוכנית שכונה', thing:'אורך הרחוב'},
    {map:6, scale:20000, realCm:120000, real:'1.2 ק״מ', ctx:'במפת מסלול', thing:'אורך המסלול'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return 'scale_real_distance';
    if(diff === 'challenge') return E.pick(['scale_map_distance','scale_factor','scale_factor']);
    return E.pick(['scale_real_distance','scale_map_distance','scale_factor']);
  }

  function pickCase(family){
    if(family === 'scale_map_distance') return E.pick(SCALE_MAP_DISTANCE);
    if(family === 'scale_factor') return E.pick(SCALE_FACTOR);
    return E.pick(SCALE_REAL_DISTANCE);
  }

  function correctValue(family,x){
    if(family === 'scale_map_distance') return x.map;
    if(family === 'scale_factor') return x.scale;
    return x.real;
  }

  function valueText(family,v,x){
    if(family === 'scale_factor') return '1:'+v;
    if(family === 'scale_map_distance') return '$'+v+'$ ס״מ';
    return typeof v === 'string' ? v : x.real;
  }

  function wrongValues(family,x){
    if(family === 'scale_factor') return [Math.round(x.scale/10), x.scale*10, x.scale + 10000].filter(v => v > 0);
    if(family === 'scale_map_distance') return [x.map*2, Math.max(1,x.map-1), x.map+3];
    return [''+(x.map*x.scale)+' ס״מ', x.map+' ק״מ', Math.max(1,Math.round(x.realCm/100000))+' ק״מ'];
  }

  function choices(family,x){
    const correct = correctValue(family,x);
    const values = [correct].concat(wrongValues(family,x)).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length < 4) values.push(family === 'scale_factor' ? x.scale + values.length * 5000 : values.length + 2);
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:valueText(family,v,x), correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family === 'scale_real_distance'){
      if(qtype === 'tf') return tfTrue
        ? `${x.ctx} ${x.thing} הוא $${x.map}$ ס״מ. קנה המידה הוא $1:${x.scale}$. המרחק האמיתי הוא ${x.real}.`
        : `${x.ctx} ${x.thing} הוא $${x.map}$ ס״מ. קנה המידה הוא $1:${x.scale}$. המרחק האמיתי הוא ${x.map} ק״מ.`;
      if(qtype === 'mistake') return `תלמיד כתב: $${x.map}\\cdot ${x.scale}=${x.map*x.scale}$, ולכן המרחק האמיתי הוא $${x.map*x.scale}$ ק״מ.`;
      return `${x.ctx} ${x.thing} הוא $${x.map}$ ס״מ. קנה המידה הוא $1:${x.scale}$.\nמה המרחק האמיתי?`;
    }
    if(family === 'scale_map_distance'){
      if(qtype === 'tf') return `${x.ctx}, ${x.thing} במציאות הוא ${x.real}. בקנה מידה $1:${x.scale}$, המרחק בשרטוט הוא $${tfTrue?x.map:x.map+2}$ ס״מ.`;
      if(qtype === 'mistake') return `תלמיד כתב: "${x.real} \\cdot ${x.scale}" כדי למצוא את המרחק בשרטוט.\nמצאו את הטעות.`;
      return `${x.ctx}, ${x.thing} במציאות הוא ${x.real}. קנה המידה הוא $1:${x.scale}$.\nכמה ס״מ יהיה המרחק בשרטוט?`;
    }
    if(qtype === 'tf') return `${x.ctx}, ${x.thing} הוא $${x.map}$ ס״מ במפה ו-${x.real} במציאות. קנה המידה הוא $1:${tfTrue?x.scale:Math.round(x.scale/10)}$.`;
    if(qtype === 'mistake') return `תלמיד חישב: "$${x.map}\\div ${x.realCm} $" כדי למצוא את קנה המידה.\nמצאו את הטעות.`;
    return `${x.ctx}, ${x.thing} הוא $${x.map}$ ס״מ במפה ו-${x.real} במציאות.\nמהו קנה המידה?`;
  }

  function answer(family,x,qtype){
    if(family === 'scale_real_distance'){
      const prefix = qtype === 'mistake' ? 'הטעות היא שהמספר שהתקבל הוא בסנטימטרים, לא בקילומטרים.\n' : '';
      return `${prefix}בקנה מידה $1:${x.scale}$ כל $1$ ס״מ במפה מייצג $${x.scale}$ ס״מ במציאות.\n$$${x.map}\\cdot ${x.scale}=${x.realCm}\\text{ ס״מ}$$\n$$${x.realCm}\\text{ ס״מ}=${x.real}$$`;
    }
    if(family === 'scale_map_distance'){
      const prefix = qtype === 'mistake' ? 'הטעות היא כפל במקום חילוק. כדי לחזור לשרטוט מחלקים בקנה המידה.\n' : '';
      return `${prefix}ממירים את המרחק האמיתי לס״מ ואז מחלקים בקנה המידה:\n$$${x.realCm}\\div ${x.scale}=${x.map}$$\nהמרחק בשרטוט הוא $${x.map}$ ס״מ.`;
    }
    const prefix = qtype === 'mistake' ? 'הטעות היא היפוך היחס. קנה מידה משווה מרחק במפה למרחק במציאות באותן יחידות.\n' : '';
    return `${prefix}נשווה ס״מ לס״מ:\n$$${x.real}=${x.realCm}\\text{ ס״מ}$$\nאם $${x.map}$ ס״מ במפה מייצגים $${x.realCm}$ ס״מ במציאות, אז:\n$$${x.realCm}\\div ${x.map}=${x.scale}$$\nקנה המידה הוא $1:${x.scale}$.`;
  }

  E.generateN803Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const unknown = family === 'scale_map_distance' ? 'map' : family === 'scale_factor' ? 'scale' : 'real';
    const svg = E.scaleMapSvg({map:x.map, real:x.real, scale:x.scale, context:x.ctx}, unknown);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
