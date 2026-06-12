// generator/engine/source-fit-uncertainty-advanced.js
// Source-backed uncertainty engines: pie-chart construction and misleading graph critique.
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const IDS = ['U7-05-ENGINE','U7-06-ENGINE'];
  const L = ['א','ב','ג','ד'];
  function pick(a){ return E.pick ? E.pick(a) : a[Math.floor(Math.random()*a.length)]; }
  function shuf(a){ return E.shuffle ? E.shuffle(a) : a.slice().sort(()=>Math.random()-0.5); }
  function choices(a){ return shuf(a).map((x,i)=>({label:L[i], text:x.text, correct:!!x.correct})); }
  function topic(g,d,id,label){ if(typeof TOPICS==='undefined'||!TOPICS[g]||!TOPICS[g][d]) return; if(!TOPICS[g][d].some(t=>t[0]===id)) TOPICS[g][d].push([id,label,1]); }

  function pieSvg(data,title){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    const colors=['#93c5fd','#bfdbfe','#dbeafe','#fef3c7'];
    const total=data.reduce((s,d)=>s+d.v,0);
    let angle=-90;
    function pt(cx,cy,r,deg){ const rad=deg*Math.PI/180; return [cx+r*Math.cos(rad),cy+r*Math.sin(rad)]; }
    const slices=data.map((d,i)=>{ const a=d.v/total*360, start=angle, end=angle+a, p1=pt(86,90,52,start), p2=pt(86,90,52,end), large=a>180?1:0; angle=end; return `<path d="M86 90 L${p1[0]} ${p1[1]} A52 52 0 ${large} 1 ${p2[0]} ${p2[1]} Z" fill="${colors[i%colors.length]}" stroke="${T.stroke}" stroke-width="1.4"/>`; }).join('');
    const legend=data.map((d,i)=>`<rect x="160" y="${55+i*25}" width="14" height="14" rx="3" fill="${colors[i%colors.length]}" stroke="${T.stroke}"/><text x="180" y="${67+i*25}" font-size="12" font-weight="800" fill="${T.label}">${d.k}: ${d.v}</text>`).join('');
    return `<svg class="engine-svg" viewBox="0 0 292 205" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="178" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><text x="146" y="32" font-size="12" font-weight="900" text-anchor="middle" fill="${T.label}">${title}</text>${slices}<circle cx="86" cy="90" r="52" fill="none" stroke="${T.stroke}" stroke-width="2"/>${legend}<text x="146" y="181" font-size="11" font-weight="800" fill="${T.label}" text-anchor="middle">דיאגרמת עוגה — מקור קובץ 06</text></svg>`;
  }

  function misleadingSvg(mode){
    const T=E.themes&&E.themes.geometry?E.themes.geometry:{fill:'#eff6ff',stroke:'#2563eb',helper:'#93c5fd',given:'#1d4ed8',unknown:'#dc2626',label:'#334155'};
    const yBase=154, top=42;
    const bars=mode==='cut'?[[56,126,28,'שנה א׳',48],[124,96,58,'שנה ב׳',52],[192,76,78,'שנה ג׳',55]]:[[60,116,38,'א׳',40],[130,86,68,'ב׳',50],[200,56,98,'ג׳',60]];
    const axisLabel=mode==='cut'?'ציר אנכי מתחיל מ-45 ולא מ-0':'עמודות ברוחבים שונים';
    const rects=bars.map(b=>`<rect x="${b[0]}" y="${b[1]}" width="40" height="${b[2]}" rx="6" fill="${T.helper}" stroke="${T.stroke}"/><text x="${b[0]+20}" y="${b[1]-7}" font-size="11" font-weight="800" text-anchor="middle" fill="${T.given}">${b[4]}</text><text x="${b[0]+20}" y="176" font-size="11" font-weight="800" text-anchor="middle" fill="${T.label}">${b[3]}</text>`).join('');
    return `<svg class="engine-svg" viewBox="0 0 292 205" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="178" rx="14" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/><line x1="42" y1="${yBase}" x2="248" y2="${yBase}" stroke="${T.stroke}" stroke-width="2"/><line x1="42" y1="${yBase}" x2="42" y2="${top}" stroke="${T.stroke}" stroke-width="2"/>${rects}<text x="146" y="33" font-size="12" font-weight="900" text-anchor="middle" fill="${T.unknown}">תרשים מטעה לבדיקה</text><text x="146" y="198" font-size="10.5" font-weight="800" text-anchor="middle" fill="${T.label}">${axisLabel} — מקור קובץ 06</text></svg>`;
  }

  function genU705(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const data=pick([
      [{k:'כדורגל',v:12},{k:'כדורסל',v:8},{k:'שחייה',v:6},{k:'טניס',v:4}],
      [{k:'אוטובוס',v:15},{k:'הליכה',v:10},{k:'אופניים',v:5},{k:'רכב',v:10}],
      [{k:'עברית',v:9},{k:'מתמטיקה',v:12},{k:'אנגלית',v:6},{k:'מדעים',v:3}]
    ]);
    const total=data.reduce((s,d)=>s+d.v,0);
    const focus=pick(data);
    const pct=Math.round(focus.v/total*100);
    const deg=Math.round(focus.v/total*360);
    const svg=pieSvg(data,'חלוקה לקבוצות');
    let q=`בדיאגרמת עוגה מופיעה חלוקה של ${total} תלמידים. מהי השכיחות היחסית של "${focus.k}" באחוזים, ומה גודל הגזרה במעלות?`;
    let a=`השכיחות היחסית היא ${focus.v}/${total}=${pct}%. גודל הגזרה הוא ${focus.v}/${total}·360=${deg}°.`;
    const cs=choices([{text:`${pct}% ו-${deg}°`,correct:true},{text:`${focus.v}% ו-${focus.v}°`,correct:false},{text:`${Math.round(total/focus.v)}% ו-${deg}°`,correct:false},{text:`${pct}% ו-360°`,correct:false}]);
    let isTrue=false;
    if(qtype==='tf'){ q=`אם השכיחות של "${focus.k}" היא ${focus.v}, אז השכיחות היחסית היא תמיד ${focus.v}%.`; a=`שגוי. שכיחות יחסית מחשבים מתוך הסך הכול: ${focus.v}/${total}.`; }
    if(qtype==='mistake'){ q=`תלמיד כתב: "הגזרה של ${focus.k} היא ${focus.v} מעלות, כי השכיחות היא ${focus.v}".`; a='הטעות: מעלות בדיאגרמת עוגה מחשבים לפי החלק מתוך 360°, לא לפי השכיחות עצמה.'; }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  }

  function genU706(diff,qtype){
    qtype=qtype==='mixed'?pick(['open','mcq','tf','mistake']):(qtype||'open');
    const mode=pick(['cut','width']);
    const svg=misleadingSvg(mode);
    let q=mode==='cut'?'התבוננו בתרשים. מה עלול להטעות בו, וכיצד מתקנים את ההצגה?':'התבוננו בתרשים. מדוע רוחבי העמודות עלולים להטעות את הקורא?';
    let a=mode==='cut'?'הציר האנכי מתחיל מערך גבוה ולא מ-0, ולכן ההבדלים נראים גדולים מדי. יש לסמן שבירת ציר בבירור או להתחיל מ-0.':'כאשר העמודות ברוחבים שונים, שטח העמודה משפיע על הרושם, אף שהגובה הוא הנתון החשוב. יש להשתמש ברוחב אחיד לכל העמודות.';
    const cs=mode==='cut'?choices([{text:'הציר האנכי אינו מתחיל מ-0 ולכן ההפרשים נראים מוגזמים',correct:true},{text:'אין בעיה, כל תרשים עמודות תמיד מדויק',correct:false},{text:'הבעיה היא שמספרים גדולים אסורים בתרשים',correct:false},{text:'צריך למחוק את הכותרת בלבד',correct:false}]):choices([{text:'רוחבי עמודות שונים יוצרים רושם חזותי לא הוגן',correct:true},{text:'עמודה רחבה תמיד מייצגת ערך כפול',correct:false},{text:'הגובה לא חשוב בתרשים עמודות',correct:false},{text:'אין משמעות לרוחב העמודות',correct:false}]);
    let isTrue=false;
    if(qtype==='tf'){ q=mode==='cut'?'תרשים שבו הציר האנכי מתחיל מ-45 תמיד מראה את ההפרשים בצורה הוגנת.':'כאשר משווים עמודות, רצוי שהעמודות יהיו באותו רוחב.'; isTrue=mode==='width'; a=isTrue?'נכון. רוחב אחיד שומר על השוואה חזותית הוגנת.':'שגוי. התחלה מערך גבוה יכולה להגזים את ההבדלים החזותיים.'; }
    if(qtype==='mistake'){ q='תלמיד כתב: "התרשים נראה חד וברור, לכן הוא בוודאי הוגן".'; a='הטעות: תרשים יכול להיראות ברור ועדיין להטעות. צריך לבדוק את נקודת ההתחלה של הציר, קנה המידה, רוחב העמודות והכותרות.'; }
    if(qtype==='mcq') return E.questionTypes.mcq({question:q,answer:a,svg:svg,choices:cs});
    if(qtype==='tf') return E.questionTypes.tf({question:q,answer:a,svg:svg,isTrue:isTrue});
    if(qtype==='mistake') return E.questionTypes.mistake({question:q,answer:a,svg:svg});
    return E.questionTypes.open({question:q,answer:a,svg:svg});
  }

  const MAP={
    'U7-05-ENGINE':{fn:genU705,title:'דיאגרמת עוגה ושכיחות יחסית',gradeTag:'כיתה ז׳',domainTag:'אי-ודאות',cls:'unc'},
    'U7-06-ENGINE':{fn:genU706,title:'תרשים מטעה — ביקורת',gradeTag:'כיתה ז׳',domainTag:'אי-ודאות',cls:'unc'}
  };
  function asExercise(id,diff,qtype){ const m=MAP[id]; if(!m) return null; const r=m.fn(diff||'standard',qtype||'open'); return {id:id,title:m.title,qtype:qtype||'open',gradeTag:m.gradeTag,domainTag:m.domainTag,cls:m.cls,questionHTML:r.questionHTML,answerHTML:r.answerHTML,correctLabel:null}; }

  topic(7,'uncertainty','U7-05-ENGINE','דיאגרמת עוגה ושכיחות יחסית ✦ מקור');
  topic(7,'uncertainty','U7-06-ENGINE','תרשים מטעה — ביקורת ✦ מקור');
  if(Array.isArray(E.ENGINE_TOPIC_IDS)) IDS.forEach(id=>{ if(E.ENGINE_TOPIC_IDS.indexOf(id)<0) E.ENGINE_TOPIC_IDS.push(id); });
  const oldIs=E.isEngineTopic; E.isEngineTopic=function(id){ return IDS.indexOf(id)>=0 || (typeof oldIs==='function' && oldIs(id)); };
  const oldGet=E.getEngineExercise; E.getEngineExercise=function(id,diff,qtype){ return asExercise(id,diff,qtype) || (typeof oldGet==='function'?oldGet(id,diff,qtype):null); };
  if(typeof generators!=='undefined'){
    generators['U7-05-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'open'; E.renderEngineCard('U7-05-ENGINE','דיאגרמת עוגה ושכיחות יחסית',genU705(d,q)); };
    generators['U7-06-ENGINE']=function(){ const d=document.getElementById('selDiff')?.value||'standard', q=document.getElementById('selQType')?.value||'open'; E.renderEngineCard('U7-06-ENGINE','תרשים מטעה — ביקורת',genU706(d,q)); };
  }
  window.addEventListener('DOMContentLoaded',function(){ if(typeof onDomain==='function') onDomain(); });
})();
