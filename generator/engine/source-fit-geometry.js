// generator/engine/source-fit-geometry.js
// Source-backed geometry visual engines: cylinder/net and parallel-line angles.
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const IDS = ['G8-02-ENGINE','G8-03-ENGINE'];
  const L = ['א','ב','ג','ד'];
  function pick(a){ return E.pick ? E.pick(a) : a[Math.floor(Math.random()*a.length)]; }
  function shuf(a){ return E.shuffle ? E.shuffle(a) : a.slice().sort(()=>Math.random()-0.5); }
  function ch(a){
    // Dedupe by text, keep at least one correct option, cap at 4 BEFORE labeling
    // so a label is never undefined and MCQ keeps exactly one correct answer.
    const seen={}, uniq=[];
    for(const x of a){ if(!seen[x.text]){ seen[x.text]=1; uniq.push(x); } }
    const correct=uniq.filter(x=>x.correct), wrong=uniq.filter(x=>!x.correct);
    let set=(correct.length?[correct[0]]:[]).concat(wrong).slice(0,4);
    return shuf(set).map((x,i)=>({label:L[i],text:x.text,correct:!!x.correct}));
  }
  function topic(g,d,id,label){ if(typeof TOPICS==='undefined'||!TOPICS[g]||!TOPICS[g][d]) return; if(!TOPICS[g][d].some(t=>t[0]===id)) TOPICS[g][d].push([id,label,1]); }

  function cylinderSvg(p,net){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    const W=292,H=205;
    if(net){
      return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="12" width="260" height="178" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><circle cx="74" cy="64" r="29" fill="#fff" stroke="${T.stroke}" stroke-width="2"/><rect x="112" y="38" width="96" height="72" rx="8" fill="#fff" stroke="${T.stroke}" stroke-width="2"/><circle cx="238" cy="64" r="29" fill="#fff" stroke="${T.stroke}" stroke-width="2"/><text x="160" y="130" font-size="13" font-weight="800" fill="${T.given}" text-anchor="middle">מלבן: היקף בסיס · גובה</text><text x="74" y="105" font-size="12" font-weight="800" fill="${T.label}" text-anchor="middle">בסיס</text><text x="238" y="105" font-size="12" font-weight="800" fill="${T.label}" text-anchor="middle">בסיס</text><text x="146" y="178" font-size="11" font-weight="800" fill="${T.label}" text-anchor="middle">פריסה של גליל</text></svg>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="12" width="256" height="178" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><ellipse cx="146" cy="52" rx="64" ry="22" fill="#fff" stroke="${T.stroke}" stroke-width="2.2"/><path d="M82 52 L82 138 C82 150 210 150 210 138 L210 52" fill="#fff" stroke="${T.stroke}" stroke-width="2.2"/><ellipse cx="146" cy="138" rx="64" ry="22" fill="${T.helper}" opacity=".55" stroke="${T.stroke}" stroke-width="2"/><line x1="146" y1="52" x2="210" y2="52" stroke="${T.unknown}" stroke-width="2.2"/><line x1="219" y1="52" x2="219" y2="138" stroke="${T.given}" stroke-width="2.2"/><text x="178" y="45" font-size="13" font-weight="800" fill="${T.unknown}" text-anchor="middle">r=${p.r}</text><text x="236" y="98" font-size="13" font-weight="800" fill="${T.given}" text-anchor="middle">h=${p.h}</text><text x="146" y="181" font-size="11" font-weight="800" fill="${T.label}" text-anchor="middle">גליל</text></svg>`;
  }

  function parallelSvg(p){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    return `<svg class="engine-svg" viewBox="0 0 292 190" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="12" width="260" height="160" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><line x1="44" y1="60" x2="248" y2="60" stroke="${T.stroke}" stroke-width="3"/><line x1="44" y1="126" x2="248" y2="126" stroke="${T.stroke}" stroke-width="3"/><line x1="96" y1="30" x2="198" y2="154" stroke="${T.unknown}" stroke-width="3"/><path d="M113 60 A24 24 0 0 1 132 77" fill="none" stroke="${T.given}" stroke-width="2"/><path d="M173 126 A24 24 0 0 1 154 109" fill="none" stroke="${T.unknown}" stroke-width="2"/><text x="112" y="48" font-size="14" font-weight="800" fill="${T.given}">${p.a}°</text><text x="175" y="146" font-size="16" font-weight="900" fill="${T.unknown}">?</text><text x="146" y="181" font-size="11" font-weight="800" fill="${T.label}" text-anchor="middle">ישרים מקבילים וחותך</text></svg>`;
  }

  function genG802(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const r=pick([2,3,4,5]), h=pick([6,8,10,12]);
    const family=diff==='challenge'?pick(['surface','net']):pick(['volume','surface','net']);
    const p={r,h}; const tfTrue=qtype==='tf'&&Math.random()<0.5; let q='',a='',svg=cylinderSvg(p,family==='net'), cs=null, isTrue=true;
    if(family==='volume'){
      const val=r*r*h; q=`גליל שרדיוס בסיסו ${r} ס״מ וגובהו ${h} ס״מ. חשבו את נפח הגליל.`;
      a=`נפח גליל הוא שטח בסיס כפול גובה: V=πr²h. לכן V=π·${r}²·${h}=${val}π סמ״ק.`;
      cs=ch([{text:`${val}π סמ״ק`,correct:true},{text:`${2*r*h}π סמ״ק`,correct:false},{text:`${r*h}π סמ״ק`,correct:false},{text:`${r*r}π סמ״ק`,correct:false}]);
      if(qtype==='tf'){ isTrue=tfTrue; q=tfTrue?`נפח הגליל הוא ${val}π סמ״ק.`:`נפח הגליל הוא ${2*r*h}π סמ״ק.`; a=tfTrue?`נכון. V=πr²h=π·${r}²·${h}=${val}π סמ״ק.`:'שגוי. זו אינה נוסחת נפח. צריך V=πr²h.'; }
      if(qtype==='mistake'){q=`תלמיד חישב 2πrh וקבע שזה נפח הגליל.`; a='הטעות: 2πrh הוא חלק משטח הפנים הצדדי, לא נפח. נפח הוא πr²h.';}
    } else if(family==='surface'){
      const val=2*r*(r+h); q=`גליל שרדיוסו ${r} ס״מ וגובהו ${h} ס״מ. חשבו שטח פנים כולל.`;
      a=`שטח פנים כולל: שני בסיסים ועוד מעטפת. S=2πr²+2πrh=2πr(r+h)=${val}π סמ״ר.`;
      cs=ch([{text:`${val}π סמ״ר`,correct:true},{text:`${r*r*h}π סמ״ר`,correct:false},{text:`${2*r*h}π סמ״ר`,correct:false},{text:`${2*r*r}π סמ״ר`,correct:false}]);
      if(qtype==='tf'){ isTrue=tfTrue; q=tfTrue?`שטח הפנים הכולל הוא ${val}π סמ״ר.`:`שטח הפנים הכולל הוא רק ${2*r*h}π סמ״ר.`; a=tfTrue?`נכון. S=2πr(r+h)=2π·${r}·${r+h}=${val}π סמ״ר.`:'שגוי. זהו רק שטח המעטפת. בשטח פנים כולל מוסיפים גם שני בסיסים.'; }
      if(qtype==='mistake'){q='תלמיד חישב רק את שטח המעטפת ושכח את שני העיגולים.'; a='הטעות: פריסה של גליל כוללת מלבן ושני עיגולים, לכן צריך להוסיף שני בסיסים.';}
    } else {
      q='איזו פריסה מתאימה לגליל? נמקו לפי הציור.';
      a='פריסה של גליל מורכבת ממלבן אחד, שהוא המעטפת, ומשני עיגולים חופפים שהם הבסיסים.';
      cs=ch([{text:'מלבן ושני עיגולים חופפים',correct:true},{text:'שלושה מלבנים',correct:false},{text:'משולש ושני עיגולים',correct:false},{text:'שני מלבנים בלבד',correct:false}]);
      if(qtype==='tf'){ isTrue=tfTrue; q=tfTrue?'פריסה של גליל מורכבת ממלבן ושני עיגולים חופפים.':'פריסה של גליל מורכבת משלושה מלבנים.'; a=tfTrue?'נכון. המעטפת היא מלבן ושני הבסיסים הם עיגולים חופפים.':'שגוי. זו יכולה להתאים לתיבה, לא לגליל. לגליל יש מלבן ושני עיגולים.'; }
      if(qtype==='mistake'){q='תלמיד בחר פריסה של תיבה וטען שהיא פריסה של גליל.'; a='הטעות: לגליל יש בסיסים עגולים, ולכן חייבים להופיע שני עיגולים בפריסה.';}
    }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg,isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg});
    return E.questionTypes.open({question:q,answer:a,svg});
  }

  function genG803(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const a=pick([45,55,62,70,75,80,110,120]);
    const rel=diff==='challenge'?pick(['supp','equal','supp']):pick(['equal','supp']);
    const ans=rel==='equal'?a:180-a; const p={a,ans};
    const svg=parallelSvg(p);
    let q=rel==='equal'?`בישרים מקבילים שנחתכים על ידי חותך, זווית אחת היא ${a}°. הזווית המסומנת נמצאת כזווית מתחלפת/מתאימה. מה גודלה?`:`בישרים מקבילים שנחתכים על ידי חותך, זווית אחת היא ${a}°. הזווית המסומנת נמצאת יחד איתה על אותו צד של החותך. מה גודלה?`;
    let ahtml=rel==='equal'?`בישרים מקבילים זוויות מתאימות או מתחלפות שוות, לכן הזווית החסרה היא ${ans}°.`:`זוויות פנימיות באותו צד של החותך משלימות ל-180°. לכן 180-${a}=${ans}°.`;
    const cs=ch([{text:`${ans}°`,correct:true},{text:`${rel==='equal'?180-a:a}°`,correct:false},{text:`${90}°`,correct:false},{text:`${Math.abs(a-20)}°`,correct:false}]);
    let isTrue=true;
    if(qtype==='tf'){
      q=`הזווית החסרה היא תמיד ${a}°, כי הישרים מקבילים.`;
      isTrue=rel==='equal';
      ahtml=isTrue?'נכון במקרה של זוויות מתאימות או מתחלפות.':'שגוי. במקרה של זוויות באותו צד הן משלימות ל-180°, ולכן הערך הוא '+ans+'°.';
    }
    if(qtype==='mistake'){
      q=`תלמיד כתב: "כל זווית ליד ישרים מקבילים שווה ל-${a}°".`;
      ahtml='הטעות: צריך לזהות את סוג הזוויות. חלק מהזוויות שוות, וחלק משלימות ל-180°.';
    }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:ahtml,svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:ahtml,svg,isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:ahtml,svg});
    return E.questionTypes.open({question:q,answer:ahtml,svg});
  }

  const MAP={
    'G8-02-ENGINE':{fn:genG802,title:'גליל ופריסה',gradeTag:'כיתה ח׳',domainTag:'גאומטריה',cls:'geo'},
    'G8-03-ENGINE':{fn:genG803,title:'זוויות בין מקבילים',gradeTag:'כיתה ח׳',domainTag:'גאומטריה',cls:'geo'}
  };
  function asEx(id,d,q){ const m=MAP[id]; if(!m) return null; const r=m.fn(d||'standard',q||'open'); return {id,title:m.title,qtype:q||'open',gradeTag:m.gradeTag,domainTag:m.domainTag,cls:m.cls,questionHTML:r.questionHTML,answerHTML:r.answerHTML,correctLabel:null}; }
  topic(8,'geometry','G8-02-ENGINE','גליל ופריסה ✦ מקור');
  topic(8,'geometry','G8-03-ENGINE','זוויות בין מקבילים ✦ מקור');
  if(Array.isArray(E.ENGINE_TOPIC_IDS)) IDS.forEach(id=>{ if(E.ENGINE_TOPIC_IDS.indexOf(id)<0) E.ENGINE_TOPIC_IDS.push(id); });
  const oldIs=E.isEngineTopic; E.isEngineTopic=function(id){ return IDS.indexOf(id)>=0 || (typeof oldIs==='function' && oldIs(id)); };
  const oldGet=E.getEngineExercise; E.getEngineExercise=function(id,d,q,opts){ return asEx(id,d,q,opts) || (typeof oldGet==='function'?oldGet(id,d,q,opts):null); };
  if(typeof generators!=='undefined'){
    generators['G8-02-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'open'; E.renderEngineCard('G8-02-ENGINE','גליל ופריסה',genG802(d,q)); };
    generators['G8-03-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'open'; E.renderEngineCard('G8-03-ENGINE','זוויות בין מקבילים',genG803(d,q)); };
  }
  window.addEventListener('DOMContentLoaded',function(){ if(typeof onDomain==='function') onDomain(); });
})();
