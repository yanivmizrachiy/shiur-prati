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
  function smallSvg(title){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    return `<svg class="engine-svg" viewBox="0 0 292 126" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="98" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><text x="146" y="42" font-size="15" font-weight="900" text-anchor="middle" fill="${T.label}">${title}</text><text x="146" y="72" font-size="12" font-weight="800" text-anchor="middle" fill="${T.given}">פתיחת סוגריים · איברים דומים · ביטויים שקולים</text><text x="146" y="100" font-size="10.5" font-weight="800" text-anchor="middle" fill="${T.label}">מקור: אלגברה כיתה ז׳ + עקרונות אלגברה ז׳–ח׳</text></svg>`;
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

  function genA704(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const c=makeSimplifyCase(diff||'standard');
    const svg=smallSvg('ביטויים שקולים ופישוט');
    let q=`פשטו את הביטוי ${tex(c.given)}.`;
    let a=c.answer;
    const cs=choices(uniqChoices([{text:tex(c.correct),correct:true}].concat(c.wrong.map(w=>({text:tex(w),correct:false})))));
    let isTrue=true;
    if(qtype==='mcq') q=`איזה ביטוי שקול לביטוי ${tex(c.given)}?`;
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

  function makeMistakeCase(){
    const v=pick(['x','a','m','y']);
    const family=pick(['distribution','likePower','minusSign','constantLike']);
    if(family==='distribution'){
      const p=pick([2,3,4]), q=pick([4,5,6]);
      return {wrong:`${p}(${v}+${q})=${p}${v}+${q}`, correct:`${p}(${v}+${q})=${p}${v}+${p*q}`, why:'הכפל צריך לחול על כל האיברים שבתוך הסוגריים, לא רק על האיבר עם המשתנה.'};
    }
    if(family==='likePower'){
      const a=pick([2,3,4]), b=pick([3,4,5]);
      return {wrong:`${a}${v}+${b}${v}=${a+b}${v}^2`, correct:`${a}${v}+${b}${v}=${a+b}${v}`, why:'בחיבור איברים דומים מחברים את המקדמים בלבד; החזקה של המשתנה לא משתנה.'};
    }
    if(family==='minusSign'){
      const p=pick([5,6,7]), b=pick([2,3]), q=pick([3,4,5]);
      return {wrong:`${p}${v}-${b}(${v}+${q})=${p-b}${v}+${b*q}`, correct:`${p}${v}-${b}(${v}+${q})=${p-b}${v}-${b*q}`, why:'מינוס לפני סוגריים משנה את סימני כל האיברים שנכפלים בו.'};
    }
    const a=pick([5,6,7]), k=pick([4,5,6]);
    return {wrong:`${a}${v}+${k}=${a+k}${v}`, correct:`${a}${v}+${k}`, why:'איבר עם משתנה ואיבר מספרי אינם איברים דומים, ולכן לא מחברים אותם לאיבר אחד.'};
  }

  function genA705(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'mistake');
    const c=makeMistakeCase(diff||'standard');
    const svg=smallSvg('מציאת טעות בביטויים');
    const base='לפניכם פתרון של תלמיד: '+tex(c.wrong)+'.';
    const ans='הטעות: '+c.why+' התיקון הוא '+tex(c.correct)+'.';
    const cs=choices([
      {text:'הכפל / הסימן לא הופעל על כל האיברים או חוברו איברים שאינם דומים',correct:true},
      {text:'הטעות היא רק בסדר כתיבת האותיות',correct:false},
      {text:'אסור להשתמש בסוגריים בביטוי אלגברי',correct:false},
      {text:'כל ביטוי עם אותו משתנה תמיד שקול לכל ביטוי אחר',correct:false}
    ]);
    let q=base+' מצאו את הטעות ותקנו.';
    if(qtype==='open') return E.questionTypes.open({question:q,answer:ans,svg:svg});
    if(qtype==='mcq') return E.questionTypes.mcq({question:base+' מה סוג הטעות העיקרי?',answer:ans,svg:svg,choices:cs});
    if(qtype==='tf'){ const tfTrue=Math.random()<0.5; return E.questionTypes.tf({question:'הפישוט '+tex(tfTrue?c.correct:c.wrong)+' הוא נכון.',answer:tfTrue?('נכון. '+tex(c.correct)+' הוא הפישוט הנכון.'):ans,svg:svg,isTrue:tfTrue}); }
    return E.questionTypes.mistake({question:base,answer:ans,svg:svg});
  }

  const MAP={
    'A7-04-ENGINE':{fn:genA704,title:'ביטויים שקולים ופישוט',gradeTag:'כיתה ז׳',domainTag:'אלגברה',cls:'alg'},
    'A7-05-ENGINE':{fn:genA705,title:'מציאת טעות בביטויים',gradeTag:'כיתה ז׳',domainTag:'אלגברה',cls:'alg'}
  };
  function asExercise(id,diff,qtype){ const m=MAP[id]; if(!m) return null; const r=m.fn(diff||'standard',qtype||'mixed'); return {id:id,title:m.title,qtype:qtype||'mixed',gradeTag:m.gradeTag,domainTag:m.domainTag,cls:m.cls,questionHTML:r.questionHTML,answerHTML:r.answerHTML,correctLabel:null}; }

  topic(7,'algebra','A7-04-ENGINE','ביטויים שקולים ופישוט ✦ מנוע מקור');
  topic(7,'algebra','A7-05-ENGINE','מציאת טעות בביטויים ✦ מנוע מקור');
  if(Array.isArray(E.ENGINE_TOPIC_IDS)) IDS.forEach(id=>{ if(E.ENGINE_TOPIC_IDS.indexOf(id)<0) E.ENGINE_TOPIC_IDS.push(id); });
  const oldIs=E.isEngineTopic; E.isEngineTopic=function(id){ return IDS.indexOf(id)>=0 || (typeof oldIs==='function' && oldIs(id)); };
  const oldGet=E.getEngineExercise; E.getEngineExercise=function(id,diff,qtype){ return asExercise(id,diff,qtype) || (typeof oldGet==='function'?oldGet(id,diff,qtype):null); };
  if(typeof generators!=='undefined'){
    generators['A7-04-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'mixed'; E.renderEngineCard('A7-04-ENGINE','ביטויים שקולים ופישוט',genA704(d,q)); };
    generators['A7-05-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'mixed'; E.renderEngineCard('A7-05-ENGINE','מציאת טעות בביטויים',genA705(d,q)); };
  }
  window.addEventListener('DOMContentLoaded',function(){ if(typeof onDomain==='function') onDomain(); });
})();
