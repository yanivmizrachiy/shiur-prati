// generator/engine/pilot-g8-01.js
// G8-01 Circle Circumference and Area (עיגול — היקף ושטח) — Smart Engine
// Source: source-learning/2026-06-09/04_grade-8_geometry_curriculum.learning.md
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const RADII = [2,3,4,5,6,7,8,9,10];
  const DIAMS = [4,6,8,10,12];
  // radius_from_circumference: C = kπ → r = k/2
  const C_REVERSE = [
    {Ck:8,r:4},{Ck:12,r:6},{Ck:20,r:10},{Ck:10,r:5},{Ck:14,r:7}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['circ_from_radius','area_from_radius']);
    if(diff === 'challenge') return E.pick(['radius_from_circ','formula_distinction','radius_from_circ']);
    return E.pick(['circ_from_radius','area_from_radius','circ_from_diameter','radius_from_circ']);
  }

  function pickCase(family){
    if(family === 'circ_from_diameter') return {d:E.pick(DIAMS)};
    if(family === 'radius_from_circ') return E.pick(C_REVERSE);
    if(family === 'formula_distinction') return {r:E.pick(RADII)};
    return {r:E.pick(RADII)};
  }

  function choices(family,x){
    let correct, wrongs, suffix='';
    if(family === 'circ_from_radius'){ correct=2*x.r; wrongs=[x.r*x.r, x.r, 4*x.r]; suffix='\\pi'; }
    else if(family === 'area_from_radius'){ correct=x.r*x.r; wrongs=[2*x.r, x.r, 4*x.r]; suffix='\\pi'; }
    else if(family === 'circ_from_diameter'){ correct=x.d; wrongs=[2*x.d, x.d/2, x.d*x.d]; suffix='\\pi'; }
    else { correct=x.r; wrongs=[x.Ck, 2*x.Ck, x.r*x.r]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4){ let f=correct+values.length*2; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+suffix+'$', correct:v===correct}));
  }

  function question(family,x,qtype){
    if(family === 'circ_from_radius'){
      if(qtype==='tf') return `היקף עיגול שרדיוסו $${x.r}$ ס״מ הוא $${x.r*x.r}\\pi$ ס״מ.`;
      if(qtype==='mistake') return `תלמיד חישב היקף עיגול שרדיוסו $${x.r}$: "$\\pi r^2=${x.r*x.r}\\pi$ ס״מ".`;
      return `עיגול שרדיוסו $${x.r}$ ס״מ.\nחשבו את היקף העיגול. (השאירו את התשובה עם $\\pi$.)`;
    }
    if(family === 'area_from_radius'){
      if(qtype==='tf') return `שטח עיגול שרדיוסו $${x.r}$ ס״מ הוא $${2*x.r}\\pi$ סמ״ר.`;
      if(qtype==='mistake') return `תלמיד חישב שטח עיגול שרדיוסו $${x.r}$: "$2\\pi r=${2*x.r}\\pi$ סמ״ר".`;
      return `עיגול שרדיוסו $${x.r}$ ס״מ.\nחשבו את שטח העיגול. (השאירו את התשובה עם $\\pi$.)`;
    }
    if(family === 'circ_from_diameter'){
      if(qtype==='tf') return `היקף עיגול שקוטרו $${x.d}$ ס״מ הוא $${2*x.d}\\pi$ ס״מ.`;
      if(qtype==='mistake') return `קוטר עיגול $${x.d}$ ס״מ. תלמיד חישב היקף: "$2\\pi d=${2*x.d}\\pi$ ס״מ".`;
      return `עיגול שקוטרו $${x.d}$ ס״מ.\nחשבו את היקף העיגול.`;
    }
    if(family === 'radius_from_circ'){
      if(qtype==='tf') return `היקף עיגול הוא $${x.Ck}\\pi$ ס״מ. הרדיוס הוא $${x.Ck}$ ס״מ.`;
      if(qtype==='mistake') return `היקף עיגול $${x.Ck}\\pi$ ס״מ. תלמיד מצא רדיוס: "$r=${x.Ck}$ — מוחקים את $\\pi$".`;
      return `היקף עיגול הוא $${x.Ck}\\pi$ ס״מ.\nמה רדיוס העיגול?`;
    }
    // formula_distinction
    if(qtype==='mistake') return `תלמיד כתב: "היקף עיגול: $\\pi r^2$, שטח עיגול: $2\\pi r$".`;
    if(qtype==='tf') return `הנוסחה לשטח עיגול היא $2\\pi r$.`;
    return `לעיגול שרדיוסו $${x.r}$ ס״מ — כתבו את הנוסחה להיקף ואת הנוסחה לשטח, וחשבו את שניהם.`;
  }

  function answer(family,x,qtype){
    const wrong = qtype==='mistake' || qtype==='tf';
    if(family === 'circ_from_radius'){
      const prefix = wrong ? 'שגוי — $\\pi r^2$ היא נוסחת השטח. היקף: $2\\pi r$.\n' : '';
      return `${prefix}$$C=2\\pi r=2\\pi\\times ${x.r}=${2*x.r}\\pi$$\nהיקף העיגול: $${2*x.r}\\pi\\approx ${Math.round(2*x.r*3.14*10)/10}$ ס״מ.`;
    }
    if(family === 'area_from_radius'){
      const prefix = wrong ? 'שגוי — $2\\pi r$ היא נוסחת ההיקף. שטח: $\\pi r^2$.\n' : '';
      return `${prefix}$$S=\\pi r^2=\\pi\\times ${x.r}^2=${x.r*x.r}\\pi$$\nשטח העיגול: $${x.r*x.r}\\pi\\approx ${Math.round(x.r*x.r*3.14*10)/10}$ סמ״ר.`;
    }
    if(family === 'circ_from_diameter'){
      const prefix = wrong ? 'שגוי — עם קוטר אין צורך בכפל ב-$2$: ההיקף הוא $\\pi d$.\n' : '';
      return `${prefix}$$C=\\pi d=\\pi\\times ${x.d}=${x.d}\\pi$$\nהיקף העיגול: $${x.d}\\pi\\approx ${Math.round(x.d*3.14*10)/10}$ ס״מ.`;
    }
    if(family === 'radius_from_circ'){
      const prefix = wrong ? 'שגוי — לאחר השוואת $2\\pi r=${x.Ck}\\pi$ יש גם לחלק ב-$2$.\n'.replace('${x.Ck}', x.Ck) : '';
      return `${prefix}$$2\\pi r=${x.Ck}\\pi$$\n$$r=\\frac{${x.Ck}\\pi}{2\\pi}=\\frac{${x.Ck}}{2}=${x.r}$$\nרדיוס העיגול: $${x.r}$ ס״מ.`;
    }
    // formula_distinction
    const prefix = wrong ? 'שגוי — הנוסחאות הוחלפו.\n' : '';
    return `${prefix}היקף: $$C=2\\pi r=${2*x.r}\\pi$$\nשטח: $$S=\\pi r^2=${x.r*x.r}\\pi$$\nדרך לזכור: שטח נמדד בסמ״ר — לכן בנוסחת השטח יש ריבוע ($r^2$).`;
  }

  E.generateG801Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard';
    questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    let svg;
    if(family === 'circ_from_diameter') svg = E.circleSvg({mode:'d', d:x.d}, null);
    else if(family === 'radius_from_circ') svg = E.circleSvg({mode:'r', r:null}, 'r');
    else svg = E.circleSvg({mode:'r', r:x.r}, null);
    const q = question(family,x,questionType);
    const a = answer(family,x,questionType);
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:false});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
