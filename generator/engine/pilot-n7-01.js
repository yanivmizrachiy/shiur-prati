// generator/engine/pilot-n7-01.js
// N7-01 Coordinate System — Quadrant I (מערכת צירים — רביע ראשון) — Smart Engine
// Source: source-learning/2026-06-09/05_grade-7_numeric_domain_curriculum.learning.md
// (Topic N7-01: plot/connect points to a named shape, e.g. A(4,1) B(2,3) C(4,5) D(6,3)
//  → rhombus; read coordinates; axis-parallel segment lengths; rectangle area on the
//  grid incl. "area=…, find the coordinate"), plus PATTERN_INDEX N7-01/N7-02
// (coordinate_system_q1, coordinates 0–10, 3–4 points).
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  function rnd(lo,hi){ return lo + Math.floor(Math.random()*(hi-lo+1)); }
  const L = ['A','B','C','D'];

  // ── case builders (coordinates stay in 0–10 per PATTERN_INDEX) ──
  function caseRead(){
    const pts=[]; const used={};
    const n = rnd(2,3);
    while(pts.length<n){
      const x=rnd(1,9), y=rnd(1,9), k=x+':'+y;
      if(!used[k] && x!==y){ used[k]=1; pts.push({x:x,y:y,label:L[pts.length]}); }
    }
    const idx = rnd(0,pts.length-1);
    return {pts:pts, target:pts[idx]};
  }
  function caseSegment(){
    const horizontal = Math.random()<0.5;
    const c = rnd(1,8);                      // shared coordinate
    let a = rnd(1,6), len = rnd(3,Math.min(8, 10-a)); if(len<3){a=1;len=4;}
    const p1 = horizontal ? {x:a,y:c,label:'A'} : {x:c,y:a,label:'A'};
    const p2 = horizontal ? {x:a+len,y:c,label:'B'} : {x:c,y:a+len,label:'B'};
    return {horizontal:horizontal, p1:p1, p2:p2, len:len, lo:a, hi:a+len, c:c};
  }
  function caseShape(){
    const kind = E.pick(['rhombus','rectangle','square','right_triangle']);
    if(kind==='rhombus'){
      // Source example family: A(cx,cy−b) B(cx−a,cy) C(cx,cy+b) D(cx+a,cy), a≠b
      let a=rnd(2,3), b=a; while(b===a) b=rnd(2,4);
      const cx=rnd(a+1,9-a), cy=rnd(b+1,9-b);
      return {kind:kind, name:'מעוין',
        pts:[{x:cx,y:cy-b,label:'A'},{x:cx-a,y:cy,label:'B'},{x:cx,y:cy+b,label:'C'},{x:cx+a,y:cy,label:'D'}],
        why:`האלכסונים $AC$ ו-$BD$ מאונכים זה לזה ונחצים זה את זה, וכל ארבע הצלעות שוות באורכן — לכן זהו מעוין.`};
    }
    if(kind==='right_triangle'){
      const x=rnd(1,4), y=rnd(1,4), w=rnd(3,5), h=rnd(3,5);
      return {kind:kind, name:'משולש ישר-זווית',
        pts:[{x:x,y:y,label:'A'},{x:x+w,y:y,label:'B'},{x:x,y:y+h,label:'C'}],
        why:`הצלע $AB$ אופקית והצלע $AC$ אנכית, ולכן הזווית בקודקוד $A$ ישרה — משולש ישר-זווית.`};
    }
    const square = kind==='square';
    const w=rnd(3,6), h=square?w:(function(){let v=rnd(2,5); while(v===w)v=rnd(2,5); return v;})();
    const x=rnd(0,9-w), y=rnd(0,9-h);
    return {kind:square?'square':'rectangle', name:square?'ריבוע':'מלבן',
      pts:[{x:x,y:y,label:'A'},{x:x+w,y:y,label:'B'},{x:x+w,y:y+h,label:'C'},{x:x,y:y+h,label:'D'}],
      why: square
        ? `כל הצלעות מקבילות לצירים, כל הזוויות ישרות וכל הצלעות שוות ($${w}$ יחידות) — ריבוע.`
        : `הצלעות מקבילות לצירים וכל הזוויות ישרות; אורך $AB=${w}$ ורוחב $BC=${h}$ — מלבן.`};
  }
  function caseRectArea(diff){
    for(;;){
      const w=rnd(3,7), h=rnd(2,5);
      const x=rnd(1,9-w), y=rnd(1,9-h);
      // guards: area≠perimeter (e.g. 4×4, 6×3) and corner C with x≠y,
      // so every "wrong" TF/distractor really is wrong
      if(w*h===2*(w+h) || x+w===y+h) continue;
      const pts=[{x:x,y:y,label:'A'},{x:x+w,y:y,label:'B'},{x:x+w,y:y+h,label:'C'},{x:x,y:y+h,label:'D'}];
      const sub = diff==='challenge' ? E.pick(['missing_vertex','area_to_coordinate']) : 'area';
      return {x:x,y:y,w:w,h:h,A:w*h,P:2*(w+h),pts:pts,sub:sub};
    }
  }

  function pickFamily(diff){
    if(diff==='basic') return E.pick(['read_coordinate','segment_length_axis_parallel']);
    if(diff==='challenge') return E.pick(['rectangle_area_on_grid','plot_and_shape','rectangle_area_on_grid']);
    return E.pick(['plot_and_shape','rectangle_area_on_grid','read_coordinate','segment_length_axis_parallel']);
  }

  // ── choices (misconceptions: swapped x/y, +1 point-counting, added coords, perimeter) ──
  function choices(family,x){
    if(family==='read_coordinate'){
      const t=x.target;
      const opts=[{v:'('+t.x+','+t.y+')',ok:true},{v:'('+t.y+','+t.x+')',ok:false},
        {v:'('+(t.x+1)+','+t.y+')',ok:false},{v:'('+t.x+','+(t.y-1)+')',ok:false}];
      const seen={}; const uniq=opts.filter(o=>{ if(seen[o.v])return false; seen[o.v]=1; return true; });
      while(uniq.length<4){ const v='('+(t.x+uniq.length)+','+(t.y+uniq.length)+')'; if(!seen[v]){seen[v]=1;uniq.push({v:v,ok:false});} }
      return E.shuffle(uniq).map((o,i)=>({label:['א','ב','ג','ד'][i], text:'$'+o.v+'$', correct:o.ok}));
    }
    if(family==='segment_length_axis_parallel'){
      const correct=x.len;
      const wrongs=[x.len+1, x.lo+x.hi, x.c].filter(v=>v!==correct && v>0);
      const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
      while(values.length<4){ let f=correct+values.length+1; while(values.indexOf(f)>=0) f++; values.push(f); }
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$ יחידות', correct:v===correct}));
    }
    if(family==='plot_and_shape'){
      const all=['מעוין','מלבן','ריבוע','משולש ישר-זווית'];
      const values=[x.name].concat(all.filter(v=>v!==x.name)).slice(0,4);
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===x.name}));
    }
    // rectangle_area_on_grid
    if(x.sub==='missing_vertex'){
      const t=x.pts[2]; // C is hidden
      const opts=[{v:'('+t.x+','+t.y+')',ok:true},{v:'('+t.y+','+t.x+')',ok:false},
        {v:'('+x.x+','+x.y+')',ok:false},{v:'('+(t.x-1)+','+t.y+')',ok:false}];
      const seen={}; const uniq=opts.filter(o=>{ if(seen[o.v])return false; seen[o.v]=1; return true; });
      while(uniq.length<4){ const v='('+(t.x+uniq.length)+','+t.y+')'; if(!seen[v]){seen[v]=1;uniq.push({v:v,ok:false});} }
      return E.shuffle(uniq).map((o,i)=>({label:['א','ב','ג','ד'][i], text:'$'+o.v+'$', correct:o.ok}));
    }
    if(x.sub==='area_to_coordinate'){
      const correct=x.x+x.w;
      const wrongs=[x.w, x.x+x.A, correct+1].filter(v=>v!==correct && v>0);
      const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
      while(values.length<4){ let f=correct+values.length+1; while(values.indexOf(f)>=0) f++; values.push(f); }
      return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$', correct:v===correct}));
    }
    const correct=x.A;
    const wrongs=[x.P, x.w+x.h, x.A+x.w].filter(v=>v!==correct && v>0); // perimeter trap first
    const values=[correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(values.length<4){ let f=correct+values.length*2; while(values.indexOf(f)>=0) f++; values.push(f); }
    return E.shuffle(values).map((v,i)=>({label:['א','ב','ג','ד'][i], text:'$'+v+'$ יחידות שטח', correct:v===correct}));
  }

  function ptList(pts){ return pts.map(p=>'$'+p.label+'('+p.x+','+p.y+')$').join(', '); }

  function question(family,x,qtype,tfTrue){
    if(family==='read_coordinate'){
      const t=x.target;
      if(qtype==='tf') return `בשרטוט, שיעורי הנקודה $${t.label}$ הם $(${tfTrue?t.x+','+t.y:t.y+','+t.x})$.`;
      if(qtype==='mistake') return `תלמיד קרא מהשרטוט: "$${t.label}(${t.y},${t.x})$ — קודם עולים למעלה ואז הולכים ימינה".`;
      if(qtype==='mcq') return `מהם שיעורי הנקודה $${t.label}$ שבשרטוט?`;
      return E.pick([
        `קראו מהשרטוט: מהם שיעורי הנקודה $${t.label}$?`,
        `רשמו את שיעורי הנקודה $${t.label}$ המסומנת במערכת הצירים.`
      ]);
    }
    if(family==='segment_length_axis_parallel'){
      const d=x.horizontal?'האופקי':'האנכי';
      if(qtype==='tf') return `אורך הקטע $AB$ שבשרטוט הוא $${tfTrue?x.len:x.len+1}$ יחידות.`;
      if(qtype==='mistake') return `נתונות $A(${x.p1.x},${x.p1.y})$ ו-$B(${x.p2.x},${x.p2.y})$. תלמיד חישב את אורך $AB$: "$${x.lo}+${x.hi}=${x.lo+x.hi}$".`;
      if(qtype==='mcq') return `מה אורך הקטע ${d} $AB$ שבשרטוט?`;
      return E.pick([
        `הנקודות $A(${x.p1.x},${x.p1.y})$ ו-$B(${x.p2.x},${x.p2.y})$ מסומנות בשרטוט.\nחשבו את אורך הקטע $AB$.`,
        `חשבו את אורך הקטע ${d} $AB$ שבשרטוט, והסבירו איך מצאתם.`
      ]);
    }
    if(family==='plot_and_shape'){
      const list=ptList(x.pts);
      if(qtype==='tf') return `מחברים לפי הסדר את הנקודות ${list}. הצורה המתקבלת היא ${tfTrue?x.name:E.pick(['מעוין','מלבן','ריבוע','משולש ישר-זווית'].filter(v=>v!==x.name))}.`;
      if(qtype==='mistake') return `מחברים את ${list}. תלמיד קבע: "זה ${x.name==='מלבן'?'ריבוע, כי כל הצלעות נראות לי שוות':'מלבן, כי יש לזה ארבע צלעות'}".`;
      if(qtype==='mcq') return `שרטטו במערכת הצירים את הנקודות ${list} וחברו אותן לפי הסדר.\nאיזו צורה מתקבלת?`;
      return `שרטטו על מערכת הצירים את הנקודות: ${list}.\nחברו אותן לפי הסדר. איזו צורה התקבלה? נמקו.`;
    }
    // rectangle_area_on_grid
    if(x.sub==='missing_vertex'){
      const g=[x.pts[0],x.pts[1],x.pts[3]];
      const list=g.map(p=>'$'+p.label+'('+p.x+','+p.y+')$').join(', ');
      const t=x.pts[2];
      if(qtype==='tf') return `שלושה קודקודים של מלבן: ${list}. הקודקוד הרביעי $C$ נמצא ב-$(${tfTrue?t.x+','+t.y:t.y+','+t.x})$.`;
      if(qtype==='mistake') return `שלושה קודקודים של מלבן: ${list}. תלמיד קבע: "$C(${t.y},${t.x})$".`;
      if(qtype==='mcq') return `שלושה קודקודים של מלבן: ${list}.\nהיכן נמצא הקודקוד הרביעי $C$?`;
      return `שלושה קודקודים של מלבן מסומנים בשרטוט: ${list}.\nמצאו את שיעורי הקודקוד הרביעי $C$.`;
    }
    if(x.sub==='area_to_coordinate'){
      const ans=x.x+x.w;
      if(qtype==='tf') return `שטח המלבן $ABCD$ הוא $${x.A}$ יחידות שטח, $A(${x.x},${x.y})$ וגובהו $${x.h}$. שיעור ה-$x$ של $B$ הוא $${tfTrue?ans:x.w}$.`;
      if(qtype==='mistake') return `שטח מלבן $${x.A}$, $A(${x.x},${x.y})$, גובה $${x.h}$. תלמיד מצא את שיעור ה-$x$ של $B$: "$${x.A}\\div ${x.h}=${x.w}$, וזו התשובה".`;
      if(qtype==='mcq') return `שטח המלבן $ABCD$ שבשרטוט הוא $${x.A}$ יחידות שטח. $A(${x.x},${x.y})$, $D(${x.x},${x.y+x.h})$.\nמהו שיעור ה-$x$ של הנקודה $B$?`;
      return `שטח המלבן $ABCD$ הוא $${x.A}$ יחידות שטח. נתון $A(${x.x},${x.y})$ ו-$D(${x.x},${x.y+x.h})$, והצלע $AB$ אופקית.\nמצאו את שיעור ה-$x$ של $B$ ושל $C$.`;
    }
    const list=ptList(x.pts);
    if(qtype==='tf') return `שטח המלבן $ABCD$ שקודקודיו ${list} הוא $${tfTrue?x.A:x.P}$ יחידות שטח.`;
    if(qtype==='mistake') return `למלבן שקודקודיו ${list} תלמיד חישב שטח: "$2\\times(${x.w}+${x.h})=${x.P}$".`;
    if(qtype==='mcq') return `מה שטח המלבן $ABCD$ שבשרטוט?`;
    return `המלבן $ABCD$ שקודקודיו ${list} מסומן בשרטוט.\nחשבו את שטח המלבן.`;
  }

  function answer(family,x,qtype,tfTrue){
    const wrong = qtype==='mistake' || (qtype==='tf' && !tfTrue);
    if(family==='read_coordinate'){
      const t=x.target;
      const prefix = wrong ? 'שגוי — קוראים קודם את שיעור ה-$x$ (ימינה) ואחר כך את שיעור ה-$y$ (למעלה).\n' : '';
      return `${prefix}הולכים $${t.x}$ יחידות ימינה ו-$${t.y}$ יחידות למעלה:\n$$${t.label}(${t.x},${t.y})$$`;
    }
    if(family==='segment_length_axis_parallel'){
      const prefix = wrong ? 'שגוי — אורך קטע מקביל לציר מוצאים בחיסור השיעורים השונים, לא בחיבור ולא בספירת נקודות.\n' : '';
      return `${prefix}הקטע ${x.horizontal?'אופקי, ולכן מחסרים את שיעורי ה-$x$':'אנכי, ולכן מחסרים את שיעורי ה-$y$'}:\n$$${x.hi}-${x.lo}=${x.len}$$\nאורך $AB$: $${x.len}$ יחידות.`;
    }
    if(family==='plot_and_shape'){
      const prefix = wrong ? 'שגוי — בודקים לפי אורכי צלעות וזוויות, לא לפי "איך זה נראה".\n' : '';
      return `${prefix}${x.why}\nהצורה: ${x.name}.`;
    }
    if(x.sub==='missing_vertex'){
      const t=x.pts[2];
      const prefix = wrong ? 'שגוי — הקודקוד הרביעי משלים מלבן: לוקחים את שיעור ה-$x$ של $B$ ואת שיעור ה-$y$ של $D$.\n' : '';
      return `${prefix}$C$ נמצא מעל $B$ ומימין ל-$D$:\nשיעור $x$ כמו של $B$ ($${t.x}$) ושיעור $y$ כמו של $D$ ($${t.y}$).\n$$C(${t.x},${t.y})$$`;
    }
    if(x.sub==='area_to_coordinate'){
      const prefix = wrong ? 'שגוי — $'+x.w+'$ הוא אורך הצלע, לא השיעור. מוסיפים אותו לשיעור ההתחלה.\n' : '';
      return `${prefix}אורך הצלע האופקית: $$${x.A}\\div ${x.h}=${x.w}$$\nשיעור ה-$x$ של $B$ ושל $C$: $$${x.x}+${x.w}=${x.x+x.w}$$\nכלומר $B(${x.x+x.w},${x.y})$, $C(${x.x+x.w},${x.y+x.h})$.`;
    }
    const prefix = wrong ? 'שגוי — החישוב $2\\times('+x.w+'+'+x.h+')$ נותן היקף. שטח = אורך × רוחב.\n' : '';
    return `${prefix}אורך: $${x.w}$ יחידות, רוחב: $${x.h}$ יחידות.\n$$S=${x.w}\\times ${x.h}=${x.A}$$\nשטח המלבן: $${x.A}$ יחידות שטח.`;
  }

  function buildSvg(family,x,qtype){
    if(family==='read_coordinate')
      return E.coordinateGridSvg({points:x.pts, labelCoords:false});
    if(family==='segment_length_axis_parallel')
      return E.coordinateGridSvg({points:[x.p1,x.p2], segment:{x1:x.p1.x,y1:x.p1.y,x2:x.p2.x,y2:x.p2.y}});
    if(family==='plot_and_shape')
      return E.coordinateGridSvg({points:x.pts, connect:'polygon'});
    if(x.sub==='missing_vertex')
      return E.coordinateGridSvg({points:[x.pts[0],x.pts[1],x.pts[3],{x:x.pts[2].x,y:x.pts[2].y,label:'C',unknown:true}]});
    if(x.sub==='area_to_coordinate')
      return E.coordinateGridSvg({points:[x.pts[0],x.pts[3]], rect:{x:x.x,y:x.y,w:x.w,h:x.h}});
    return E.coordinateGridSvg({points:x.pts, rect:{x:x.x,y:x.y,w:x.w,h:x.h}, labelCoords:true});
  }

  E.generateN701Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const x = family==='read_coordinate' ? caseRead()
      : family==='segment_length_axis_parallel' ? caseSegment()
      : family==='plot_and_shape' ? caseShape()
      : caseRectArea(difficulty);
    const tfTrue = questionType==='tf' && Math.random()<0.5;
    const svg = buildSvg(family,x,questionType);
    const q = question(family,x,questionType,tfTrue);
    const a = answer(family,x,questionType,tfTrue);
    if(questionType==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:choices(family,x)});
    if(questionType==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(questionType==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  };
})();
