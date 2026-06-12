// generator/engine/source-fit-graphs.js
// Adds source-backed applied graph and bar-chart engines.
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const IDS = ['A8-01-ENGINE','U7-04-ENGINE'];
  const L = ['א','ב','ג','ד'];
  function pick(a){ return E.pick ? E.pick(a) : a[Math.floor(Math.random()*a.length)]; }
  function shuf(a){ return E.shuffle ? E.shuffle(a) : a.slice().sort(()=>Math.random()-0.5); }
  function tex(s){ return E.fmt && E.fmt.inline ? E.fmt.inline(s) : '$'+s+'$'; }
  function choices(a){ return shuf(a).map((x,i)=>({label:L[i], text:x.text, correct:!!x.correct})); }
  function topic(g,d,id,label){ if(typeof TOPICS==='undefined'||!TOPICS[g]||!TOPICS[g][d]) return; if(!TOPICS[g][d].some(t=>t[0]===id)) TOPICS[g][d].push([id,label,1]); }

  function graphSvg(points,title,xLabel,yLabel,maxX,maxY){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    const W=292,H=218,l=42,b=40,t=28,r=20;
    maxX=maxX||Math.max(...points.map(p=>p.x)); maxY=maxY||Math.max(...points.map(p=>p.y));
    function X(x){return l+x*(W-l-r)/maxX;} function Y(y){return H-b-y*(H-b-t)/maxY;}
    const grid=[0,1,2,3,4].map(i=>`<line x1="${l}" y1="${H-b-i*(H-b-t)/4}" x2="${W-r}" y2="${H-b-i*(H-b-t)/4}" stroke="${T.helper}" opacity=".35"/>`).join('');
    const poly=points.map(p=>`${X(p.x)},${Y(p.y)}`).join(' ');
    const dots=points.map(p=>`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="${T.stroke}"/>`).join('');
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="268" height="192" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/>${grid}<line x1="${l}" y1="${H-b}" x2="${W-r}" y2="${H-b}" stroke="${T.stroke}" stroke-width="2.2"/><line x1="${l}" y1="${H-b}" x2="${l}" y2="${t}" stroke="${T.stroke}" stroke-width="2.2"/><polyline points="${poly}" fill="none" stroke="${T.unknown}" stroke-width="3" stroke-linecap="round"/>${dots}<text x="146" y="30" font-size="12" font-weight="800" text-anchor="middle" fill="${T.label}">${title}</text><text x="146" y="208" font-size="11" font-weight="800" text-anchor="middle" fill="${T.label}">${xLabel}</text><text x="18" y="24" font-size="11" font-weight="800" fill="${T.label}">${yLabel}</text></svg>`;
  }

  function barSvg(data,title){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    const W=292,H=210,l=38,b=44,t=36,r=20,max=Math.max(...data.map(d=>d.v));
    const gap=11,bw=(W-l-r-gap*(data.length-1))/data.length;
    const bars=data.map((d,i)=>{ const h=Math.round((H-b-t)*d.v/max), x=l+i*(bw+gap), y=H-b-h; return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="7" fill="${T.helper}" stroke="${T.stroke}"/><text x="${x+bw/2}" y="${y-6}" font-size="11" font-weight="800" text-anchor="middle" fill="${T.given}">${d.v}</text><text x="${x+bw/2}" y="${H-22}" font-size="11" font-weight="800" text-anchor="middle" fill="${T.label}">${d.k}</text>`; }).join('');
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="268" height="186" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><text x="146" y="31" fill="${T.label}" font-size="12" font-weight="800" text-anchor="middle">${title}</text><line x1="${l}" y1="${H-b}" x2="${W-r}" y2="${H-b}" stroke="${T.stroke}" stroke-width="2"/><line x1="${l}" y1="${H-b}" x2="${l}" y2="${t}" stroke="${T.stroke}" stroke-width="2"/>${bars}<text x="146" y="205" font-size="10.5" font-weight="800" text-anchor="middle" fill="${T.label}">מקור קובץ 06 — תרשים עמודות</text></svg>`;
  }

  function genA801(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const family=diff==='challenge'?pick(['heating','table','fuel']):pick(['fuel','heating','function','table']);
    let q='',a='',svg='',cs=null,isTrue=true;
    if(family==='fuel'){
      const p=7, limit=63, x=9; svg=graphSvg([0,2,4,6,8,10].map(n=>({x:n,y:n*p})),'עלות דלק לפי ליטרים','ליטרים','₪',10,80);
      q=`מחיר ליטר דלק הוא ${p} ₪. לפי הגרף, עבור אילו כמויות העלות גדולה מ-${limit} ₪?`;
      a=`העלות היא ${tex('7x')}. פותרים ${tex('7x>63')} ולכן ${tex('x>9')}. כלומר יותר מ-9 ליטרים.`;
      cs=choices([{text:'יותר מ-9 ליטרים',correct:true},{text:'פחות מ-9 ליטרים',correct:false},{text:'בדיוק 7 ליטרים',correct:false},{text:'אי אפשר לדעת',correct:false}]);
      if(qtype==='tf'){q='ב-10 ליטרים העלות עדיין קטנה מ-63 ₪.'; a='שגוי. 10 ליטרים עולים 70 ₪, וזה גדול מ-63 ₪.'; isTrue=false;}
      if(qtype==='mistake'){q='תלמיד כתב: "אם 63 גדול מ-7, אז כל כמות מתאימה".'; a='הטעות: צריך לחשב עלות כוללת לפי מספר הליטרים, כלומר להכפיל 7 במספר הליטרים.';}
    } else if(family==='heating'){
      const start=8, rate=10, t=5; svg=graphSvg([0,1,2,3,4,5,6].map(n=>({x:n,y:start+rate*n})),'התחממות נוזל','דקות','°C',6,70);
      q=`נוזל התחיל בטמפרטורה ${start}°C ומתחמם בקצב אחיד של ${rate}°C לדקה. מה תהיה הטמפרטורה אחרי ${t} דקות?`;
      a=`הביטוי הוא ${tex(start+'+'+rate+'t')}. עבור ${tex('t='+t)} נקבל ${tex(start+'+'+rate+'\\cdot '+t+'='+(start+rate*t))}.`;
      cs=choices([{text:`${start+rate*t}°C`,correct:true},{text:`${rate*t}°C`,correct:false},{text:`${start+t}°C`,correct:false},{text:`${start+rate+t}°C`,correct:false}]);
      if(qtype==='tf'){q=`אחרי ${t} דקות הטמפרטורה היא ${rate*t}°C.`; a=`שגוי. שכחו להוסיף את הטמפרטורה ההתחלתית ${start}°C.`; isTrue=false;}
      if(qtype==='mistake'){q=`תלמיד חישב ${rate}·${t}=${rate*t} והתעלם מהטמפרטורה ההתחלתית.`; a=`הטעות: הגרף לא מתחיל מאפס אלא מ-${start}°C. לכן מוסיפים את הערך ההתחלתי.`;}
    } else if(family==='table'){
      const rows=[-2,-1,0,1,2].map(x=>({x:x,y:3*x+4})); svg=graphSvg(rows,'ישר לפי טבלת ערכים','x','y',2,12);
      q='בטבלת ערכים של פונקציה קווית מתקבל הכלל '+tex('y=3x+4')+'. מהו הערך של y כאשר '+tex('x=2')+'?';
      a='מציבים '+tex('x=2')+': '+tex('y=3\\cdot2+4=10')+'.';
      cs=choices([{text:tex('10'),correct:true},{text:tex('6'),correct:false},{text:tex('9'),correct:false},{text:tex('12'),correct:false}]);
      if(qtype==='tf'){q='כאשר '+tex('x=2')+', הערך הוא '+tex('y=6')+'.'; a='שגוי. יש להציב בכלל המלא: '+tex('3\\cdot2+4=10')+'.'; isTrue=false;}
      if(qtype==='mistake'){q='תלמיד הציב רק '+tex('3\\cdot2')+' וקיבל 6.'; a='הטעות: הוא שכח את האיבר החופשי +4.';}
    } else {
      q='האם ההתאמה "לכל תלמיד — שני הציונים האחרונים שלו במתמטיקה" היא פונקציה? נמקו.';
      a='לא. בפונקציה לכל קלט מתאים פלט אחד בלבד. כאן לכל תלמיד מתאימים שני ציונים, ולכן זו אינה פונקציה לפי ההגדרה.';
      cs=choices([{text:'לא, כי לכל תלמיד יש שני פלטים',correct:true},{text:'כן, כי לכל תלמיד יש שם אחד',correct:false},{text:'כן, כי יש ציונים',correct:false},{text:'אי אפשר לדעת',correct:false}]);
      if(qtype==='tf'){q='ההתאמה היא פונקציה, כי לכל תלמיד יש שני ציונים.'; a='שגוי. שני פלטים לאותו קלט מפרים את הגדרת הפונקציה.'; isTrue=false;}
      if(qtype==='mistake'){q='תלמיד כתב: "זו פונקציה כי לכל תלמיד יש ציונים".'; a='הטעות: השאלה אינה אם יש ערכים, אלא האם לכל קלט יש ערך יחיד.';}
    }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  }

  function genU704(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const data=[{k:'א׳',v:8},{k:'ב׳',v:13},{k:'ג׳',v:7},{k:'ד׳',v:12}];
    const total=data.reduce((s,d)=>s+d.v,0), max=data.reduce((a,b)=>a.v>b.v?a:b);
    const svg=barSvg(data,'מספר תלמידים בחוגים');
    let q='קראו את תרשים העמודות: איזה חוג הוא הגבוה ביותר וכמה תלמידים יש בסך הכול?';
    let a=`העמודה הגבוהה היא חוג ${max.k} עם ${max.v} תלמידים. הסך הכול הוא ${data.map(d=>d.v).join('+')}=${total}.`;
    const cs=choices([{text:`חוג ${max.k}, סך הכול ${total}`,correct:true},{text:`חוג א׳, סך הכול ${max.v}`,correct:false},{text:`חוג ג׳, סך הכול ${total}`,correct:false},{text:'אי אפשר לדעת מהתרשים',correct:false}]);
    let isTrue=false;
    if(qtype==='tf'){q=`לפי התרשים, חוג א׳ הוא החוג עם מספר התלמידים הגבוה ביותר.`; a=`שגוי. חוג ${max.k} הוא הגבוה ביותר, עם ${max.v} תלמידים.`;}
    if(qtype==='mistake'){q='תלמיד כתב: "הסך הכול הוא 13 כי זו העמודה הגבוהה ביותר".'; a='הטעות: 13 הוא הערך הגבוה ביותר של קטגוריה אחת. סך הכול מחשבים על ידי חיבור כל העמודות.';}
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  }

  const MAP={
    'A8-01-ENGINE':{fn:genA801,title:'גרפים יישומיים ופונקציות',gradeTag:'כיתה ח׳',domainTag:'אלגברי',cls:'alg'},
    'U7-04-ENGINE':{fn:genU704,title:'קריאה מתרשים עמודות',gradeTag:'כיתה ז׳',domainTag:'אי-ודאות',cls:'unc'}
  };
  function asExercise(id,diff,qtype){ const m=MAP[id]; if(!m) return null; const r=m.fn(diff||'standard',qtype||'open'); return {id:id,title:m.title,qtype:qtype||'open',gradeTag:m.gradeTag,domainTag:m.domainTag,cls:m.cls,questionHTML:r.questionHTML,answerHTML:r.answerHTML,correctLabel:null}; }

  topic(8,'algebra','A8-01-ENGINE','גרפים יישומיים ופונקציות ✦ מקור');
  topic(7,'uncertainty','U7-04-ENGINE','קריאה מתרשים עמודות ✦ מקור');
  if(Array.isArray(E.ENGINE_TOPIC_IDS)) IDS.forEach(id=>{ if(E.ENGINE_TOPIC_IDS.indexOf(id)<0) E.ENGINE_TOPIC_IDS.push(id); });
  const oldIs=E.isEngineTopic; E.isEngineTopic=function(id){ return IDS.indexOf(id)>=0 || (typeof oldIs==='function' && oldIs(id)); };
  const oldGet=E.getEngineExercise; E.getEngineExercise=function(id,diff,qtype){ return asExercise(id,diff,qtype) || (typeof oldGet==='function'?oldGet(id,diff,qtype):null); };
  if(typeof generators!=='undefined'){
    generators['A8-01-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'open'; E.renderEngineCard('A8-01-ENGINE','גרפים יישומיים ופונקציות',genA801(d,q)); };
    generators['U7-04-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'open'; E.renderEngineCard('U7-04-ENGINE','קריאה מתרשים עמודות',genU704(d,q)); };
  }
  window.addEventListener('DOMContentLoaded',function(){ if(typeof onDomain==='function') onDomain(); });
})();
