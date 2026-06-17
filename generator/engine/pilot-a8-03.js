// generator/engine/pilot-a8-03.js
// A8-03 Systems of Equations — Smart Engine
// Source: source-learning/2026-06-09/02_grade-8_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const SUM_DIFF = [
    {s:40,d:8,x:24,y:16},{s:50,d:10,x:30,y:20},{s:26,d:4,x:15,y:11},{s:60,d:12,x:36,y:24},{s:34,d:6,x:20,y:14}
  ];
  const MORE_THAN = [
    {s:26,k:4,big:15,small:11,who1:'דנה',who2:'רון',item:'מדבקות'},
    {s:38,k:6,big:22,small:16,who1:'יעל',who2:'נועם',item:'קלפים'},
    {s:45,k:9,big:27,small:18,who1:'איתי',who2:'תמר',item:'גולות'},
    {s:30,k:10,big:20,small:10,who1:'מאיה',who2:'עומר',item:'ספרים'}
  ];
  const VERIFY_PAIR = [
    {e1:'x+y=12',e2:'x-y=4',px:8,py:4,ok:true},
    {e1:'x+y=15',e2:'x-y=3',px:8,py:7,ok:false},
    {e1:'x+y=20',e2:'x-y=6',px:13,py:7,ok:true},
    {e1:'x+y=18',e2:'x-y=2',px:11,py:7,ok:false}
  ];
  // Count-and-value system — classic source word problem (02): N items of two
  // denominations totalling V; find how many of each. Built forward (pick counts +
  // values → compute N,V), so the 2×2 system always has the integer solution (x,y).
  const CV_SCENE = [
    {unit:'מטבעות', lo:'של ₪1', hi:'של ₪5', c1:1, c2:5},
    {unit:'מטבעות', lo:'של ₪2', hi:'של ₪10', c1:2, c2:10},
    {unit:'בולים', lo:'של ₪1', hi:'של ₪2', c1:1, c2:2}
  ];
  function rndi(lo,hi){ return lo + Math.floor(Math.random()*(hi-lo+1)); }
  function caseCountValue(){
    const sc = E.pick(CV_SCENE);
    let x = rndi(3,9), y = rndi(3,9);
    if(y===x) y = (y<9 ? y+1 : y-1);           // keep the two counts distinct
    const N = x+y, V = sc.c1*x + sc.c2*y;
    return {sc:sc, x:x, y:y, N:N, V:V, c1:sc.c1, c2:sc.c2, ans:y, wrongAns:Math.round(V/sc.c2)};
  }

  function pickFamily(diff){
    if(diff === 'basic') return 'more_than';
    if(diff === 'challenge') return E.pick(['verify_pair','sum_diff','count_value']);
    return E.pick(['sum_diff','more_than','verify_pair','count_value']);
  }
  function pickCase(f){
    if(f==='sum_diff') return E.pick(SUM_DIFF);
    if(f==='verify_pair') return E.pick(VERIFY_PAIR);
    if(f==='count_value') return caseCountValue();
    return E.pick(MORE_THAN);
  }

  function choices(family,x){
    if(family==='verify_pair'){
      const c = x.ok ? 'כן, פתרון' : 'לא פתרון';
      return E.shuffle([c, x.ok?'לא פתרון':'כן, פתרון']).map((v,i)=>({label:['א','ב'][i], text:v, correct:v===c}));
    }
    let correct, wrongs;
    if(family==='count_value'){ correct=x.ans; wrongs=[x.x, x.wrongAns, Math.round(x.N/2)]; }
    else if(family==='sum_diff'){ correct=x.x; wrongs=[x.y, x.s-x.d, x.x+1]; }
    else { correct=x.big; wrongs=[x.small, Math.round(x.s/2), x.big-x.k]; }
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i && v>0).slice(0,4);
    while(values.length<4){ let f=correct+values.length; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
  }

  function question(family,x,qtype,tfTrue){
    if(family==='count_value'){
      const s=x.sc;
      if(qtype==='tf') return `נתונים $${x.N}$ ${s.unit}: חלק מהם ${s.lo} וחלק מהם ${s.hi}, ובסך הכול $${x.V}$ ₪. מספר ה${s.unit} ${s.hi} הוא $${tfTrue?x.ans:x.wrongAns}$.`;
      if(qtype==='mistake') return `נתונים $${x.N}$ ${s.unit} (${s.lo}/${s.hi}) בסך $${x.V}$ ₪. תלמיד חישב $${x.V}÷${x.c2}=${x.wrongAns}$ והכריז שיש $${x.wrongAns}$ ${s.unit} ${s.hi}.`;
      if(qtype==='mcq') return `נתונים $${x.N}$ ${s.unit}: חלק מהם ${s.lo} וחלק מהם ${s.hi}. הסכום הכולל $${x.V}$ ₪.\nכמה ${s.unit} ${s.hi} יש?`;
      return `נתונים $${x.N}$ ${s.unit}: חלק מהם ${s.lo} וחלק מהם ${s.hi}. הסכום הכולל הוא $${x.V}$ ₪.\nכמה ${s.unit} ${s.hi} יש (וכמה ${s.lo})?`;
    }
    if(family==='sum_diff'){
      if(qtype==='tf') return `סכום שני מספרים $${x.s}$ והפרשם $${x.d}$. המספר הגדול הוא $${tfTrue?x.x:(x.s-x.d===x.x?x.x+1:x.s-x.d)}$.`;
      if(qtype==='mistake') return `סכום $${x.s}$, הפרש $${x.d}$. תלמיד מצא את הגדול: "$${x.s}-${x.d}=${x.s-x.d}$".`;
      return `סכום שני מספרים הוא $${x.s}$ וההפרש ביניהם $${x.d}$.\nמצאו את שני המספרים.`;
    }
    if(family==='more_than'){
      if(qtype==='tf') return `ל${x.who1} ול${x.who2} יחד $${x.s}$ ${x.item}. ל${x.who1} יש $${x.k}$ יותר. ל${x.who1} יש $${tfTrue?x.big:Math.round(x.s/2)+x.k}$ ${x.item}.`;
      if(qtype==='mistake') return `יחד $${x.s}$ ${x.item}, ל${x.who1} $${x.k}$ יותר. תלמיד: "חצי מ-$${x.s}$ זה $${x.s/2}$, ועוד $${x.k}$: ל${x.who1} יש $${x.s/2+x.k}$".`;
      return `ל${x.who1} ול${x.who2} יחד $${x.s}$ ${x.item}. ל${x.who1} יש $${x.k}$ ${x.item} יותר מל${x.who2}.\nכמה ${x.item} יש לכל אחד?`;
    }
    // verify_pair
    if(qtype==='mistake') return `במערכת $${x.e1}$, $${x.e2}$ תלמיד בדק את $(${x.px},${x.py})$ רק במשוואה הראשונה והכריז שזה פתרון.`;
    return `האם הזוג $(x,y)=(${x.px},${x.py})$ הוא פתרון המערכת?\n$$${x.e1}$$\n$$${x.e2}$$`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='count_value'){
      const s=x.sc, base=x.c1*x.N, diff=x.c2-x.c1;
      const prefix = wrong ? 'שגוי — אי אפשר לחלק את הסכום רק בערך הגבוה; חלק מה'+s.unit+' שווים פחות. בונים מערכת:\n' : '';
      return `${prefix}נסמן ב-$x$ את מספר ה${s.unit} ${s.lo} וב-$y$ את מספר ה${s.unit} ${s.hi}:
$$x+y=${x.N}$$
$$${x.c1}x+${x.c2}y=${x.V}$$
מהמשוואה הראשונה $x=${x.N}-y$. מציבים בשנייה:
$$${x.c1}(${x.N}-y)+${x.c2}y=${x.V}$$
$$${base}+${diff}y=${x.V}\\;\\Rightarrow\\;${diff}y=${x.V-base}\\;\\Rightarrow\\;y=${x.ans}$$
לכן יש $${x.ans}$ ${s.unit} ${s.hi} ו-$${x.x}$ ${s.unit} ${s.lo}.
בדיקה: $${x.c1}\\cdot ${x.x}+${x.c2}\\cdot ${x.ans}=${x.V}$ ✓`;
    }
    if(family==='sum_diff'){
      const prefix = wrong ? 'שגוי — חיסור ההפרש מהסכום נותן פעמיים את הקטן, לא את הגדול.\n' : '';
      return `${prefix}$$x+y=${x.s}$$\n$$x-y=${x.d}$$\nחיבור המשוואות: $2x=${x.s+x.d}$, לכן $x=${x.x}$.\n$$y=${x.s}-${x.x}=${x.y}$$\nהמספרים: $${x.x}$ ו-$${x.y}$. בדיקה: $${x.x}-${x.y}=${x.d}$ ✓`;
    }
    if(family==='more_than'){
      const prefix = wrong ? 'שגוי — אם מוסיפים '+x.k+' לחצי, הסכום גדל מעבר ל-'+x.s+'. נסמן ונפתור:\n' : '';
      return `${prefix}נסמן: ${x.who2}$=x$, ${x.who1}$=x+${x.k}$.\n$$x+(x+${x.k})=${x.s}$$\n$$2x=${x.s-x.k}\\Rightarrow x=${x.small}$$\n${x.who2}: $${x.small}$, ${x.who1}: $${x.big}$ ${x.item}.\nבדיקה: $${x.small}+${x.big}=${x.s}$ ✓`;
    }
    const v1 = x.px + x.py, v2 = x.px - x.py;
    const s1 = parseInt(x.e1.split('=')[1]), s2 = parseInt(x.e2.split('=')[1]);
    const prefix = qtype==='mistake' ? 'הטעות: פתרון מערכת חייב לקיים את שתי המשוואות.\n' : '';
    return `${prefix}משוואה 1: $${x.px}+${x.py}=${v1}$ ${v1===s1?'✓':'✗'}\nמשוואה 2: $${x.px}-${x.py}=${v2}$ ${v2===s2?'✓':'✗'}\n${x.ok ? 'שתי המשוואות מתקיימות — הזוג הוא פתרון.' : 'לא כל המשוואות מתקיימות — הזוג אינו פתרון.'}`;
  }

  E.generateA803Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = pickCase(family);
    const tfTrue = questionType==='tf' && family!=='verify_pair' && Math.random()<0.5;
    const q = question(family,x,questionType,tfTrue), a = answer(family,x,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:'',choices:choices(family,x)});
    if(questionType==='tf'){
      const isTrue = family==='verify_pair' ? x.ok : tfTrue;
      return E.questionTypes.tf({question:q,answer:a,svg:'',isTrue:isTrue});
    }
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:''});
    return E.questionTypes.open({question:q,answer:a,svg:''});
  };
})();
