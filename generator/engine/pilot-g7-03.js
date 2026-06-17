(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const triples = [
    {a:3,b:4,c:5},{a:5,b:12,c:13},{a:6,b:8,c:10},{a:8,b:15,c:17},
    {a:9,b:12,c:15},{a:7,b:24,c:25},{a:20,b:21,c:29},{a:10,b:24,c:26}
  ];
  const nonTriples = [{a:3,b:4,c:6},{a:5,b:12,c:14},{a:6,b:8,c:11},{a:3,b:5,c:7}];
  const rects = [{w:3,h:4,d:5,name:'לוח'},{w:6,h:8,d:10,name:'מגרש'},{w:5,h:12,d:13,name:'חדר'}];

  function pickSet(diff){
    if(diff==='basic') return E.pick(triples.slice(0,3));
    if(diff==='challenge') return E.pick(triples);
    return E.pick(triples.slice(0,5));
  }

  function solutionFindSide(t, unknown){
    if(unknown==='c') return `לפי משפט פיתגורס:\n$$${t.a}^2+${t.b}^2=c^2$$\n$$${t.a*t.a}+${t.b*t.b}=c^2$$\n$$c^2=${t.c*t.c}$$\n$$c=\\sqrt{${t.c*t.c}}=${t.c}$$\nאורך היתר הוא $${t.c}$ ס״מ.`;
    if(unknown==='a') return `לפי משפט פיתגורס:\n$$a^2+${t.b}^2=${t.c}^2$$\n$$a^2=${t.c*t.c}-${t.b*t.b}=${t.a*t.a}$$\n$$a=\\sqrt{${t.a*t.a}}=${t.a}$$\nאורך הניצב החסר הוא $${t.a}$ ס״מ.`;
    return `לפי משפט פיתגורס:\n$$${t.a}^2+b^2=${t.c}^2$$\n$$b^2=${t.c*t.c}-${t.a*t.a}=${t.b*t.b}$$\n$$b=\\sqrt{${t.b*t.b}}=${t.b}$$\nאורך הניצב החסר הוא $${t.b}$ ס״מ.`;
  }

  function questionFindSide(t, unknown, qtype, tfTrue){
    if(qtype==='tf') return `אם הניצבים הם $${t.a}$ ס״מ ו-$${t.b}$ ס״מ, אז היתר הוא $${tfTrue?t.c:t.a+t.b}$ ס״מ.`;
    if(qtype==='mistake') return `תלמיד כתב: $${t.a}+${t.b}=${t.a+t.b}$, ולכן היתר הוא $${t.a+t.b}$ ס״מ.`;
    if(unknown==='c') return `במשולש ישר-זווית, שני הניצבים הם $${t.a}$ ס״מ ו-$${t.b}$ ס״מ.\nחשבו את אורך היתר.`;
    if(unknown==='a') return `במשולש ישר-זווית, היתר הוא $${t.c}$ ס״מ וניצב אחד הוא $${t.b}$ ס״מ.\nחשבו את אורך הניצב החסר.`;
    return `במשולש ישר-זווית, היתר הוא $${t.c}$ ס״מ וניצב אחד הוא $${t.a}$ ס״מ.\nחשבו את אורך הניצב החסר.`;
  }

  function choices(t, unknown){
    const correct = t[unknown];
    const vals = [correct, t.a+t.b, Math.abs(correct-1)||correct+2, correct+1];
    const clean = [];
    vals.forEach(v=>{ if(v>0 && !clean.includes(v)) clean.push(v); });
    while(clean.length<4) clean.push(clean[clean.length-1]+2);
    return E.shuffle(clean.slice(0,4)).map((v,i)=>({label:['א','ב','ג','ד'][i],text:'$'+v+'$ ס״מ',correct:v===correct}));
  }

  function rightCase(diff, qtype){
    const t = pickSet(diff);
    const unknown = diff==='basic' ? 'c' : (diff==='challenge' ? E.pick(['a','b']) : E.pick(['a','b','c']));
    const show = {a:t.a,b:t.b,c:t.c}; delete show[unknown];
    const svg = E.rightTriangleSvg(show, unknown);
    const tfTrue = qtype==='tf' && Math.random()<0.5;
    const q = questionFindSide(t, unknown, qtype, tfTrue);
    let ans = solutionFindSide(t, unknown);
    if(qtype==='tf') ans = tfTrue ? solutionFindSide(t,'c') : `שגויה. לא מחברים את אורכי הניצבים.\n` + solutionFindSide(t,'c');
    if(qtype==='mistake') ans = `הטעות היא חיבור רגיל של הניצבים במקום שימוש בחזקות.\n` + solutionFindSide(t,'c');
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:ans,svg:svg,choices:choices(t,unknown)});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:ans,svg:svg,isTrue:tfTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:ans,svg:svg});
    return E.questionTypes.open({question:q,answer:ans,svg:svg});
  }

  function checkCase(qtype){
    const t = Math.random()<0.55 ? E.pick(triples) : E.pick(nonTriples);
    const svg = E.rightTriangleSvg({a:t.a,b:t.b,c:t.c}, null);
    const isRight = E.isTriple(t.a,t.b,t.c);
    const q = `האם משולש שצלעותיו $${t.a}$, $${t.b}$, $${t.c}$ ס״מ הוא משולש ישר-זווית?`;
    const ans = `בודקים את הצלע הגדולה כיתר:\n$$${t.a}^2+${t.b}^2=${t.a*t.a+t.b*t.b}$$\n$$${t.c}^2=${t.c*t.c}$$\n${isRight?'השוויון מתקיים, לכן זהו משולש ישר-זווית.':'השוויון אינו מתקיים, לכן זה אינו משולש ישר-זווית.'}`;
    if(qtype==='tf') return E.questionTypes.tf({question:`משולש עם צלעות $${t.a}$, $${t.b}$, $${t.c}$ הוא ישר-זווית.`,answer:ans,svg:svg,isTrue:isRight});
    return E.questionTypes.open({question:q,answer:ans,svg:svg});
  }

  function rectCase(){
    const r = E.pick(rects);
    const svg = E.rectangleDiagonalSvg(r);
    const q = `מלבן (${r.name}) בעל אורך $${r.w}$ ס״מ ורוחב $${r.h}$ ס״מ.\nחשבו את אורך האלכסון.`;
    const ans = `האלכסון הוא היתר במשולש ישר-זווית:\n$$${r.w}^2+${r.h}^2=d^2$$\n$$${r.w*r.w}+${r.h*r.h}=d^2$$\n$$d=\\sqrt{${r.d*r.d}}=${r.d}$$\nאורך האלכסון הוא $${r.d}$ ס״מ.`;
    return E.questionTypes.open({question:q,answer:ans,svg:svg});
  }

  E.generateG703Engine = function(diff, qtype){
    diff = diff || 'standard'; qtype = qtype || 'open';
    if(diff==='basic') return rightCase('basic',qtype);
    if(qtype==='mcq' || qtype==='mistake') return rightCase(diff,qtype);
    if(diff==='standard'){
      const family = E.pick(qtype==='tf' ? ['side','check'] : ['side','side','check','rect']);
      if(family==='check') return checkCase(qtype==='tf'?'tf':'open');
      if(family==='rect') return rectCase();
      return rightCase(diff,qtype);
    }
    const family = E.pick(qtype==='tf' ? ['side','check'] : ['side','side','check']);
    if(family==='check') return checkCase(qtype==='tf'?'tf':'open');
    return rightCase('challenge', qtype);
  };
})();
