// generator/engine/source-fit-algebra-g7.js
// Grade 7 algebra source-fit smart engines.
// Source-backed by uploaded File 01 (Grade 7 algebra) and File 08 (algebra principles).
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const IDS = ['A7-04-ENGINE','A7-05-ENGINE'];
  const L = ['א','ב','ג','ד'];
  function pick(a){ return E.pick ? E.pick(a) : a[Math.floor(Math.random()*a.length)]; }
  function shuf(a){ return E.shuffle ? E.shuffle(a) : a.slice().sort(()=>Math.random()-0.5); }
  function tex(s){ return E.fmt && E.fmt.inline ? E.fmt.inline(s) : '$'+s+'$'; }
  function choices(a){ return shuf(a).map((x,i)=>({label:L[i], text:x.text, correct:!!x.correct})); }
  function topic(g,d,id,label){ if(typeof TOPICS==='undefined'||!TOPICS[g]||!TOPICS[g][d]) return; if(!TOPICS[g][d].some(t=>t[0]===id)) TOPICS[g][d].push([id,label,1]); }
  function sign(n){ return n<0 ? ' - '+Math.abs(n) : ' + '+n; }
  function term(c,v){ if(c===0) return ''; if(c===1) return v; if(c===-1) return '-'+v; return c+v; }
  function expr(cx,k,v){ let out=''; if(cx!==0) out+=term(cx,v); if(k!==0 || out==='') out+=(out==='' ? (''+k) : sign(k)); return out.replace('+ -','- '); }
  function uniqChoices(items){ const seen={}; const out=[]; items.forEach(it=>{ if(!seen[it.text]){ seen[it.text]=1; out.push(it); } }); while(out.length<4){ out.push({text:tex(expr(out.length+2,out.length+5,'x')), correct:false}); } return out.slice(0,4); }
  function tableHtml(headers, rows){ return E.freqTableHtml ? E.freqTableHtml(headers, rows) : '<table><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table>'; }
  function smallSvg(title){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    return `<svg class="engine-svg" viewBox="0 0 292 126" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="98" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><text x="146" y="42" font-size="15" font-weight="900" text-anchor="middle" fill="${T.label}">${title}</text><text x="146" y="72" font-size="12" font-weight="800" text-anchor="middle" fill="${T.given}">פתיחת סוגריים · איברים דומים · ביטויים שקולים</text><text x="146" y="100" font-size="10.5" font-weight="800" text-anchor="middle" fill="${T.label}">מקור: אלגברה כיתה ז׳ + עקרונות אלגברה ז׳–ח׳</text></svg>`;
  }
  function graphSvg(points,title,xLabel,yLabel,maxX,maxY){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    const W=292,H=224,l=44,b=46,t=34,r=18;
    maxX=maxX||Math.max.apply(null,points.map(p=>p.x)); maxY=maxY||Math.max.apply(null,points.map(p=>p.y));
    maxX=Math.max(1,maxX); maxY=Math.max(1,maxY);
    function X(x){return l+x*(W-l-r)/maxX;} function Y(y){return H-b-y*(H-b-t)/maxY;}
    let grid='';
    for(let i=0;i<=4;i++){
      const xv=maxX*i/4, yv=maxY*i/4, gx=X(xv), gy=Y(yv);
      grid+=`<line x1="${gx}" y1="${t}" x2="${gx}" y2="${H-b}" stroke="${T.helper}" opacity=".25"/>`;
      grid+=`<line x1="${l}" y1="${gy}" x2="${W-r}" y2="${gy}" stroke="${T.helper}" opacity=".32"/>`;
      grid+=`<text x="${gx}" y="${H-24}" font-size="9.5" text-anchor="middle" fill="${T.label}">${Math.round(xv)}</text>`;
      grid+=`<text x="${l-7}" y="${gy+3}" font-size="9.5" text-anchor="end" fill="${T.label}">${Math.round(yv)}</text>`;
    }
    const poly=points.map(p=>`${X(p.x)},${Y(p.y)}`).join(' ');
    const dots=points.map(p=>`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="${T.stroke}" stroke="#fff" stroke-width="1.2"/>`).join('');
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="268" height="198" rx="8" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><text x="146" y="28" font-size="12" font-weight="900" text-anchor="middle" fill="${T.label}">${title}</text>${grid}<line x1="${l}" y1="${H-b}" x2="${W-r}" y2="${H-b}" stroke="${T.stroke}" stroke-width="2.2"/><line x1="${l}" y1="${H-b}" x2="${l}" y2="${t}" stroke="${T.stroke}" stroke-width="2.2"/><polyline points="${poly}" fill="none" stroke="${T.unknown}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}<text x="146" y="${H-7}" font-size="11" font-weight="800" text-anchor="middle" fill="${T.label}">${xLabel}</text><text x="22" y="28" font-size="11" font-weight="800" fill="${T.label}">${yLabel}</text></svg>`;
  }

  function makeSimplifyCase(diff){
    const v=pick(['x','a','m','y']);
    const family=diff==='challenge'?pick(['minusDist','factor','likeTerms']):pick(['plusDist','minusDist','likeTerms','factor']);
    if(family==='plusDist'){
      const p=pick([2,3,4,5]), q=pick([2,3,4,5,6]), r=pick([2,3,4]);
      const cx=p+r, k=p*q;
      return {given:`${p}(${v}+${q})+${r}${v}`, correct:expr(cx,k,v), answer:`פותחים סוגריים: ${tex(p+'('+v+'+'+q+')='+p+v+'+'+(p*q))}. אחר כך מחברים איברים דומים: ${tex(p+v+'+'+r+v+'='+(p+r)+v)}. לכן הביטוי השקול הוא ${tex(expr(cx,k,v))}.`, wrong:[expr(p+r,q,v), expr(p*r,p*q,v), expr(p,p*q+r,v)]};
    }
    if(family==='minusDist'){
      const p=pick([5,6,7,8]), b=pick([2,3,4]), c=pick([2,3,4,5]);
      const cx=p-b, k=b*c;
      return {given:`${p}${v}-${b}(${v}-${c})`, correct:expr(cx,k,v), answer:`כאשר יש מינוס לפני הסוגריים מחסרים את כל הביטוי: ${tex('-'+b+'('+v+'-'+c+')=-'+b+v+'+'+(b*c))}. לכן ${tex(p+v+'-'+b+'('+v+'-'+c+')='+expr(cx,k,v))}.`, wrong:[expr(p-b,-b*c,v), expr(p+b,b*c,v), expr(cx,c,v)]};
    }
    if(family==='factor'){
      const f=pick([2,3,4,5]), q=pick([3,4,5,6]);
      return {given:`${f}${v}+${f*q}`, correct:`${f}(${v}+${q})`, answer:`מוציאים גורם משותף ${tex(''+f)}: ${tex(f+v+'+'+(f*q)+'='+f+'('+v+'+'+q+')')}.`, wrong:[`${f}(${v}+${f*q})`, `${f}${v}+${q}`, `${f+q}(${v}+${f})`]};
    }
    const a=pick([6,7,8,9]), b=pick([2,3,4]), c=pick([3,4,5]), d=pick([4,5,6]);
    const cx=a-b, k=c+d;
    return {given:`${a}${v}+${c}-${b}${v}+${d}`, correct:expr(cx,k,v), answer:`מחברים רק איברים דומים: ${tex(a+v+'-'+b+v+'='+(a-b)+v)} וגם ${tex(c+'+'+d+'='+(c+d))}. לכן מקבלים ${tex(expr(cx,k,v))}.`, wrong:[expr(a+b,k,v), expr(cx,c-d,v), expr(a,k,v)]};
  }
  const IDENTITY_CASES = [
    {left:'a\\cdot a', right:'a^2', equal:true, why:'כפל של מספר בעצמו הוא בדיוק ריבוע של אותו מספר.'},
    {left:'4(a+1)', right:'4a+4', equal:true, why:'לפי חוק הפילוג: מכפילים את שני האיברים שבסוגריים ב-4.'},
    {left:'a+7+2a-2', right:'3a+5', equal:true, why:'מחברים איברים דומים: $a+2a=3a$ וגם $7-2=5$.'},
    {left:'2(t+3)', right:'2t+3', equal:false, correct:'2t+6', why:'חוק הפילוג מחייב להכפיל גם את 3 ב-2, לכן הביטוי השקול הוא $2t+6$.'},
    {left:'3x+4', right:'7x', equal:false, correct:'3x+4', why:'איבר מספרי ואיבר עם משתנה אינם איברים דומים, ולכן אי אפשר לאחד אותם ל-$7x$.'}
  ];

  function genA704Identity(qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const c=pick(IDENTITY_CASES), svg=smallSvg('שוויון בין ביטויים');
    const verdict=c.equal?'כן, הביטויים שווים לכל ערך של המשתנה.':'לא, הביטויים אינם שווים לכל ערך של המשתנה.';
    const answer=`${verdict} ${c.why}` + (c.correct?` הביטוי השקול הנכון הוא ${tex(c.correct)}.`:'');
    let q=`האם הביטויים ${tex(c.left)} ו-${tex(c.right)} שווים לכל ערך של המשתנה? הסבירו.`;
    if(qtype==='mcq'){
      const cs=choices([
        {text:c.equal?'כן, כי אפשר להגיע מאחד לשני בעזרת חוקי החשבון':'לא, כי אחד השלבים האלגבריים אינו חוקי',correct:true},
        {text:'כן, כי בשניהם מופיעה אותה אות',correct:false},
        {text:'לא, כי שני ביטויים שנראים שונים אף פעם אינם שווים',correct:false},
        {text:'אי אפשר לדעת בלי להציב רק ערך אחד',correct:false}
      ]);
      return E.questionTypes.mcq({question:q,answer:answer,svg:svg,choices:cs});
    }
    if(qtype==='tf'){
      q=`הביטויים ${tex(c.left)} ו-${tex(c.right)} שווים לכל ערך של המשתנה.`;
      return E.questionTypes.tf({question:q,answer:answer,svg:svg,isTrue:c.equal});
    }
    if(qtype==='mistake'){
      q=c.equal
        ? `תלמיד טען שהביטויים ${tex(c.left)} ו-${tex(c.right)} אינם יכולים להיות שווים, כי הם נראים אחרת.`
        : `תלמיד טען שהביטויים ${tex(c.left)} ו-${tex(c.right)} שווים, כי בשניהם מופיע אותו משתנה.`;
      return E.questionTypes.mistake({question:q,answer:answer,svg:svg});
    }
    return E.questionTypes.open({question:q,answer:answer,svg:svg});
  }

  function buildA704Choices(c,mcqMode){
    const correctItems=[{text:tex(c.correct),correct:true}];
    if(mcqMode==='multi') correctItems.push({text:tex(c.given),correct:true});
    return choices(uniqChoices(correctItems.concat(c.wrong.map(w=>({text:tex(w),correct:false})))));
  }

  function genA704(diff,qtype,mcqMode){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    if((diff||'standard')!=='basic' && Math.random()<0.35 && !(qtype==='mcq' && mcqMode==='multi')) return genA704Identity(qtype);
    const c=makeSimplifyCase(diff||'standard');
    const svg=smallSvg('ביטויים שקולים ופישוט');
    let q=`פשטו את הביטוי ${tex(c.given)}.`;
    let a=c.answer;
    const cs=buildA704Choices(c,mcqMode);
    let isTrue=true;
    if(qtype==='mcq'){
      q=mcqMode==='multi'
        ? `אילו ביטויים שקולים לביטוי ${tex(c.given)}? סמנו את כל התשובות הנכונות.`
        : `איזה ביטוי שקול לביטוי ${tex(c.given)}?`;
      if(mcqMode==='multi') a += ` במצב ריבוי תשובות גם הביטוי המקורי ${tex(c.given)} שקול לעצמו, ולכן גם הוא תשובה נכונה.`;
    }
    if(qtype==='tf'){
      const falseExpr=pick(c.wrong);
      isTrue=Math.random()<0.35;
      q=`הביטוי ${tex(c.given)} שקול ל-${tex(isTrue?c.correct:falseExpr)}.`;
      a=(isTrue?'נכון. ':'שגוי. ')+c.answer;
    }
    if(qtype==='mistake'){
      const wrong=pick(c.wrong);
      q='תלמיד פישט כך: '+tex(c.given+'='+wrong)+'. הסבירו מה הטעות ותקנו.';
      a='הפתרון של התלמיד אינו שקול לביטוי המקורי. התיקון: '+c.answer;
    }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  }

  const GRAPH_CASES = [
    {family:'fuel_table_plot', title:'עלות דלק לפי ליטרים', xLabel:'ליטרים', yLabel:'שקלים', expr:'7x', xs:[0,2,4,6,8], y:x=>7*x, askX:6, askY:42, maxX:8, maxY:60, context:'מחיר ליטר דלק הוא 7 שקלים.'},
    {family:'parking_table_plot', title:'עלות חניה בשעות הראשונות', xLabel:'שעות', yLabel:'שקלים', expr:'5x+10', xs:[0,1,2,3,4], y:x=>5*x+10, askX:3, askY:25, maxX:4, maxY:32, context:'עלות חניה היא 10 שקלים קבועים ועוד 5 שקלים לכל שעה.'},
    {family:'square_area_graph', title:'שטח ריבוע לפי אורך צלע', xLabel:'אורך צלע בס״מ', yLabel:'שטח בסמ״ר', expr:'x^2', xs:[0,1,2,3,4,5], y:x=>x*x, askX:4, askY:16, maxX:5, maxY:25, context:'מסמנים ב-x את אורך צלע הריבוע וב-y את שטחו.'},
    {family:'folded_paper_graph', title:'שטח דף לאחר קיפולים', xLabel:'מספר קיפולים', yLabel:'שטח', expr:'64/(2^x)', xs:[0,1,2,3,4], y:x=>64/Math.pow(2,x), askX:3, askY:8, maxX:4, maxY:64, context:'שטח דף הוא 64 יחידות שטח, ובכל קיפול השטח הנראה קטן פי 2.'}
  ];
  function graphCase(diff){
    if(diff==='basic') return pick(GRAPH_CASES.slice(0,2));
    if(diff==='challenge') return pick(GRAPH_CASES.slice(1));
    return pick(GRAPH_CASES);
  }
  function graphRows(c){ return c.xs.map(x=>({x:x,y:c.y(x)})); }
  function genA705(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const c=graphCase(diff||'standard'), rows=graphRows(c), svg=graphSvg(rows,c.title,c.xLabel,c.yLabel,c.maxX,c.maxY);
    const table=tableHtml(['x'].concat(c.xs), [['y'].concat(c.xs.map(x=>c.y(x)))]);
    const partial=tableHtml(['x'].concat(c.xs), [['y'].concat(c.xs.map((x,i)=>i%2===0?c.y(x):'?'))]);
    const tfTrue=qtype==='tf'&&Math.random()<0.5;
    let q=`${c.context}\nא. השלימו טבלת ערכים.\nב. סמנו את הנקודות במערכת הצירים ברביע הראשון.\nג. מהו הערך המתאים ל-${tex('x='+c.askX)}?`;
    let a=`הטבלה המלאה:\n${table}\nמציבים לפי הביטוי ${tex('y='+c.expr)}. עבור ${tex('x='+c.askX)} מתקבל ${tex('y='+c.askY)}. הנקודה המתאימה היא ${tex('('+c.askX+','+c.askY+')')}.`;
    let cs=choices([
      {text:`הנקודה ${tex('('+c.askX+','+c.askY+')')} מתאימה לגרף`,correct:true},
      {text:`הנקודה ${tex('('+c.askY+','+c.askX+')')} מתאימה לגרף`,correct:false},
      {text:`הערך המתאים הוא ${tex('x='+c.askY)}`,correct:false},
      {text:'אי אפשר לבנות טבלה בלי גרף מוכן',correct:false}
    ]);
    if(qtype==='mcq'){
      q=`${c.context}\nהטבלה החלקית היא:\n${partial}\nאיזו טענה נכונה לגבי הטבלה והגרף?`;
    }
    if(qtype==='tf'){
      q=tfTrue
        ? `${c.context} הנקודה ${tex('('+c.askX+','+c.askY+')')} שייכת לגרף.`
        : `${c.context} הנקודה ${tex('('+c.askY+','+c.askX+')')} שייכת לגרף.`;
      a=(tfTrue?'נכון. ':'שגוי. ')+`בנקודה כותבים קודם את ערך x ואחר כך את ערך y. כאשר ${tex('x='+c.askX)}, מקבלים ${tex('y='+c.askY)}, ולכן הנקודה היא ${tex('('+c.askX+','+c.askY+')')}.`;
    }
    if(qtype==='mistake'){
      q=`${c.context} תלמיד השלים נכון את הערך ${tex('y='+c.askY)} עבור ${tex('x='+c.askX)}, אבל סימן על הגרף את הנקודה ${tex('('+c.askY+','+c.askX+')')}.`;
      a=`הטעות: התלמיד החליף בין שיעור ה-x לשיעור ה-y. ברביע הראשון מסמנים קודם את הערך על ציר x, ואז את הערך על ציר y. לכן הנקודה הנכונה היא ${tex('('+c.askX+','+c.askY+')')}.`;
    }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:tfTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  }

  const MAP={
    'A7-04-ENGINE':{fn:genA704,title:'ביטויים שקולים ופישוט',gradeTag:'כיתה ז׳',domainTag:'אלגברה',cls:'alg'},
    'A7-05-ENGINE':{fn:genA705,title:'טבלת ערכים וגרף ברביע ראשון',gradeTag:'כיתה ז׳',domainTag:'אלגברה',cls:'alg'}
  };
  function asExercise(id,diff,qtype,opts){ const m=MAP[id]; if(!m) return null; const r=m.fn(diff||'standard',qtype||'mixed',opts&&opts.mcqMode); return {id:id,title:m.title,qtype:qtype||'mixed',gradeTag:m.gradeTag,domainTag:m.domainTag,cls:m.cls,questionHTML:r.questionHTML,answerHTML:r.answerHTML,correctLabel:null}; }

  topic(7,'algebra','A7-04-ENGINE','ביטויים שקולים ופישוט ✦ מנוע מקור');
  topic(7,'algebra','A7-05-ENGINE','טבלת ערכים וגרף ברביע ראשון ✦ מנוע מקור');
  if(Array.isArray(E.ENGINE_TOPIC_IDS)) IDS.forEach(id=>{ if(E.ENGINE_TOPIC_IDS.indexOf(id)<0) E.ENGINE_TOPIC_IDS.push(id); });
  const oldIs=E.isEngineTopic; E.isEngineTopic=function(id){ return IDS.indexOf(id)>=0 || (typeof oldIs==='function' && oldIs(id)); };
  const oldGet=E.getEngineExercise; E.getEngineExercise=function(id,diff,qtype,opts){ return asExercise(id,diff,qtype,opts) || (typeof oldGet==='function'?oldGet(id,diff,qtype,opts):null); };
  if(typeof generators!=='undefined'){
    generators['A7-04-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'mixed', m=document.getElementById('selMcqMode')?.value||'single'; E.renderEngineCard('A7-04-ENGINE','ביטויים שקולים ופישוט',genA704(d,q,m)); };
    generators['A7-05-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'mixed'; E.renderEngineCard('A7-05-ENGINE','טבלת ערכים וגרף ברביע ראשון',genA705(d,q)); };
  }
  window.addEventListener('DOMContentLoaded',function(){ if(typeof onDomain==='function') onDomain(); });
})();
