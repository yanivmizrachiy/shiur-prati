// generator/engine/pilot-u7-02.js
// U7-02 Basic Probability (Grade 7) — Smart Engine
// Source: source-learning/2026-06-09/06_uncertainty_domain_curriculum_examples.learning.md + 00 (probability in grade 7)
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const BAGS = [
    {r:4,b:6,total:10,pr:'\\frac{2}{5}',prc:'\\frac{3}{5}'},
    {r:3,b:9,total:12,pr:'\\frac{1}{4}',prc:'\\frac{3}{4}'},
    {r:5,b:5,total:10,pr:'\\frac{1}{2}',prc:'\\frac{1}{2}'},
    {r:8,b:4,total:12,pr:'\\frac{2}{3}',prc:'\\frac{1}{3}'},
    {r:6,b:9,total:15,pr:'\\frac{2}{5}',prc:'\\frac{3}{5}'}
  ];
  const DIE = [
    {ev:'מספר זוגי',fav:3,p:'\\frac{1}{2}',faces:[2,4,6]},
    {ev:'מספר גדול מ-4',fav:2,p:'\\frac{1}{3}',faces:[5,6]},
    {ev:'מספר קטן מ-3',fav:2,p:'\\frac{1}{3}',faces:[1,2]},
    {ev:'המספר 6',fav:1,p:'\\frac{1}{6}',faces:[6]}
  ];
  // Expected count over many trials (source file 06 / PDF p.1): a spinner with k
  // equal sectors, `fav` of colour `color`; over `spins` spins the expected count
  // landing on that colour = (fav/k)·spins. Pre-validated for whole-number results.
  const SPIN_FILL = {'אדום':'#fecaca','כחול':'#bfdbfe','ירוק':'#bbf7d0','כתום':'#fed7aa','צהוב':'#fde68a','סגול':'#e9d5ff'};
  const SPINNER = [
    {k:8,fav:3,color:'אדום',spins:400,exp:150},
    {k:5,fav:2,color:'כחול',spins:200,exp:80},
    {k:10,fav:3,color:'כתום',spins:500,exp:150},
    {k:6,fav:2,color:'ירוק',spins:300,exp:100}
  ];
  function spinnerSvg(x){
    const cx=150,cy=110,r=60,step=360/x.k,fill=SPIN_FILL[x.color]||'#fde68a';
    let secs='';
    for(let i=0;i<x.k;i++){
      const a0=(i*step-90)*Math.PI/180,a1=((i+1)*step-90)*Math.PI/180;
      const x0=(cx+r*Math.cos(a0)).toFixed(1),y0=(cy+r*Math.sin(a0)).toFixed(1);
      const x1=(cx+r*Math.cos(a1)).toFixed(1),y1=(cy+r*Math.sin(a1)).toFixed(1);
      secs+=`<path d="M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z" fill="${i<x.fav?fill:'#eef2f7'}" stroke="#475569" stroke-width="1.3"/>`;
    }
    secs+=`<line x1="${cx}" y1="${cy}" x2="${(cx+r*0.68).toFixed(1)}" y2="${(cy-r*0.5).toFixed(1)}" stroke="#0f172a" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="4.5" fill="#0f172a"/>`;
    return `<svg class="engine-svg" viewBox="0 0 300 200" role="img" aria-label="גלגל הסתברות"><text x="150" y="20" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">גלגל מחולק ל-${x.k} גזרות שוות</text>${secs}<text x="150" y="192" text-anchor="middle" font-size="12.5" font-weight="800" fill="#334155">${x.fav} גזרות בצבע ${x.color} מתוך ${x.k}</text></svg>`;
  }

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['bag_simple','spinner']);
    if(diff === 'challenge') return E.pick(['complement','die','spinner']);
    return E.pick(['bag_simple','complement','die','spinner']);
  }
  function pickCase(f){
    if(f==='die') return E.pick(DIE);
    if(f==='spinner') return E.pick(SPINNER);
    return E.pick(BAGS);
  }

  function esc(v){ return String(v).replace(/[&<>]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[s])); }
  function ball(x,y,fill,label){
    return '<g><circle cx="'+x+'" cy="'+y+'" r="12" fill="'+fill+'" stroke="#1f2937" stroke-width="1.4"/>'+
      '<text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" font-size="10" font-weight="800" fill="#111827">'+label+'</text></g>';
  }
  function bagSvg(x,family){
    const red = '#fecaca', blue = '#bfdbfe';
    const balls = [];
    const shownRed = Math.min(x.r, 8), shownBlue = Math.min(x.b, 9);
    let i = 0;
    for(let k=0;k<shownRed;k++,i++) balls.push(ball(75+(i%6)*27, 92+Math.floor(i/6)*28, red, 'א'));
    for(let k=0;k<shownBlue;k++,i++) balls.push(ball(75+(i%6)*27, 92+Math.floor(i/6)*28, blue, 'כ'));
    const title = family === 'complement' ? 'מודל שקית: לא אדום = כחול' : 'מודל שקית: הסתברות לאדום';
    return '<svg class="engine-svg" viewBox="0 0 300 190" role="img" aria-label="'+esc(title)+'">'
      +'<rect x="40" y="42" width="220" height="126" rx="24" fill="#fff7ed" stroke="#92400e" stroke-width="2.2"/>'
      +'<path d="M82 44 Q150 20 218 44" fill="none" stroke="#92400e" stroke-width="3"/>'
      +'<text x="150" y="26" text-anchor="middle" font-size="15" font-weight="900" fill="#0f172a">'+title+'</text>'
      +balls.join('')
      +'<text x="150" y="178" text-anchor="middle" font-size="13" font-weight="800" fill="#334155">אדומים: '+x.r+' · כחולים: '+x.b+' · סך הכול: '+x.total+'</text>'
      +'</svg>';
  }
  function pip(cx,cy){ return '<circle cx="'+cx+'" cy="'+cy+'" r="3.8" fill="#0f172a"/>'; }
  function dieFace(n,x,y,marked){
    const p = [];
    const spots = {1:[[0,0]],2:[[-10,-10],[10,10]],3:[[-10,-10],[0,0],[10,10]],4:[[-10,-10],[10,-10],[-10,10],[10,10]],5:[[-10,-10],[10,-10],[0,0],[-10,10],[10,10]],6:[[-10,-12],[10,-12],[-10,0],[10,0],[-10,12],[10,12]]}[n];
    spots.forEach(s=>p.push(pip(x+s[0],y+s[1])));
    return '<g><rect x="'+(x-22)+'" y="'+(y-22)+'" width="44" height="44" rx="8" fill="'+(marked?'#dcfce7':'#ffffff')+'" stroke="'+(marked?'#16a34a':'#cbd5e1')+'" stroke-width="2"/>'+p.join('')+'</g>';
  }
  function dieSvg(x){
    const marked = new Set(x.faces || []);
    return '<svg class="engine-svg" viewBox="0 0 320 170" role="img" aria-label="מודל קובייה להסתברות">'
      +'<text x="160" y="24" text-anchor="middle" font-size="15" font-weight="900" fill="#0f172a">מודל קובייה: תוצאות מתאימות מסומנות</text>'
      +[1,2,3,4,5,6].map((n,i)=>dieFace(n,55+(i%3)*105,62+Math.floor(i/3)*62,marked.has(n))).join('')
      +'<text x="160" y="158" text-anchor="middle" font-size="13" font-weight="800" fill="#334155">תוצאות מתאימות: '+x.fav+' מתוך 6</text>'
      +'</svg>';
  }
  function modelSvg(family,x){ return family==='spinner' ? spinnerSvg(x) : family==='die' ? dieSvg(x) : bagSvg(x,family); }

  function choices(family,x){
    let correct, wrongs;
    if(family==='spinner'){
      const per=x.spins/x.k; // per single sector — the "forgot ×fav" trap
      correct='$'+x.exp+'$'; wrongs=['$'+per+'$','$'+(x.spins-x.exp)+'$','$'+(x.exp+per)+'$'];
      const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
      while(values.length<4) values.push('$'+(x.exp+values.length*7)+'$');
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
    }
    if(family==='die'){ correct='$'+x.p+'$'; wrongs=['$\\frac{'+x.fav+'}{'+(6-x.fav)+'}$','$\\frac{1}{6}$'==='$'+x.p+'$'?'$\\frac{1}{3}$':'$\\frac{1}{6}$','$\\frac{'+(6-x.fav)+'}{6}$']; }
    else if(family==='complement'){ correct='$'+x.prc+'$'; wrongs=['$'+x.pr+'$','$\\frac{'+x.b+'}{'+x.r+'}$','$1$']; }
    else { correct='$'+x.pr+'$'; wrongs=['$'+x.prc+'$','$\\frac{'+x.r+'}{'+x.b+'}$','$\\frac{1}{'+x.r+'}$']; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4) values.push('$\\frac{1}{'+(values.length+5)+'}$');
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='spinner'){
      const per=x.spins/x.k;
      const base=`גלגל מחולק ל-$${x.k}$ גזרות שוות, $${x.fav}$ מהן בצבע ${x.color}. מסובבים את המחוג $${x.spins}$ פעמים.`;
      if(qtype==='tf') return `${base} צפוי שהמחוג ייעצר על ${x.color} בערך $${tfTrue?x.exp:per}$ פעמים.`;
      if(qtype==='mistake') return `${base} תלמיד אמר: "ייעצר על ${x.color} בערך $${per}$ פעמים" — חישב גזרה אחת בלבד.`;
      return `${base}\nכמה פעמים בערך צפוי שהמחוג ייעצר על גזרה בצבע ${x.color}?`;
    }
    if(family==='die'){
      if(qtype==='tf') return tfTrue
        ? `מטילים קובייה הוגנת. ההסתברות לקבל ${x.ev} היא $${x.p}$.`
        : `מטילים קובייה הוגנת. ההסתברות לקבל ${x.ev} היא $\\frac{${x.fav}}{${6-x.fav}}$.`;
      if(qtype==='mistake') return `מטילים קובייה. תלמיד חישב הסתברות ל${x.ev}: "$\\frac{${x.fav}}{${6-x.fav}}$ — מצליחים חלקי לא-מצליחים".`;
      return `מטילים קובייה הוגנת.\nמה ההסתברות לקבל ${x.ev}?`;
    }
    const bag = `בשקית $${x.r}$ כדורים אדומים ו-$${x.b}$ כחולים`;
    if(family==='complement'){
      if(qtype==='tf') return `${bag}. שולפים כדור אחד. ההסתברות שלא אדום היא $${tfTrue?x.prc:x.pr}$.`;
      if(qtype==='mistake') return `${bag}. תלמיד חישב P(לא אדום): "$1+${x.pr}$".`;
      return `${bag}. שולפים כדור אחד באקראי.\nמה ההסתברות שהכדור אינו אדום?`;
    }
    if(qtype==='tf') return tfTrue
      ? `${bag}. שולפים כדור אחד. ההסתברות לאדום היא $${x.pr}$.`
      : `${bag}. שולפים כדור אחד. ההסתברות לאדום היא $\\frac{${x.r}}{${x.b}}$.`;
    if(qtype==='mistake') return `${bag}. תלמיד חישב P(אדום): "$\\frac{${x.r}}{${x.b}}$ — אדומים חלקי כחולים".`;
    return `${bag}. שולפים כדור אחד באקראי.\nמה ההסתברות שהכדור אדום?`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='spinner'){
      const prefix = wrong ? 'שגוי — מספר הפעמים הצפוי = הסתברות כפול מספר הסיבובים (לכל הגזרות בצבע, לא אחת).\n' : '';
      return `${prefix}ההסתברות לעצירה על ${x.color}: $\\frac{${x.fav}}{${x.k}}$.
מספר הפעמים הצפוי = הסתברות $\\cdot$ מספר הסיבובים:
$$\\frac{${x.fav}}{${x.k}}\\cdot ${x.spins}=${x.exp}$$`;
    }
    if(family==='die'){
      const prefix = wrong ? 'שגוי — המכנה הוא סך כל התוצאות האפשריות ($6$), לא הכישלונות.\n' : '';
      return `${prefix}תוצאות אפשריות: $6$. תוצאות מתאימות: $${x.fav}$.\n$$P=\\frac{${x.fav}}{6}=${x.p}$$`;
    }
    if(family==='complement'){
      const prefix = wrong ? 'שגוי — הסתברות משלימה: $P(\\text{לא }A)=1-P(A)$.\n' : '';
      return `${prefix}$$P(\\text{אדום})=\\frac{${x.r}}{${x.total}}=${x.pr}$$\n$$P(\\text{לא אדום})=1-${x.pr}=${x.prc}$$`;
    }
    const prefix = wrong ? 'שגוי — המכנה הוא סך כל הכדורים, לא רק הכחולים.\n' : '';
    return `${prefix}סך הכדורים: $${x.r}+${x.b}=${x.total}$.\n$$P(\\text{אדום})=\\frac{${x.r}}{${x.total}}=${x.pr}$$`;
  }

  E.generateU702Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue), svg = modelSvg(family,x);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
