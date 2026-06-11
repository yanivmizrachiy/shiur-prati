(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const ENGINE_TOPIC_IDS = [
    'G7-01-ENGINE','G7-02-ENGINE','G7-03-ENGINE','G7-04-ENGINE',
    'N7-03-ENGINE','N7-04-ENGINE','N7-05-ENGINE','N7-06-ENGINE','N7-07-ENGINE',
    'A7-01-ENGINE','A7-02-ENGINE','A7-03-ENGINE',
    'U7-01-ENGINE','U7-02-ENGINE',
    'G8-01-ENGINE','G8-04-ENGINE',
    'N8-01-ENGINE','N8-02-ENGINE','N8-03-ENGINE','N8-04-ENGINE','N8-05-ENGINE',
    'A8-02-ENGINE','A8-03-ENGINE',
    'U8-01-ENGINE','U8-02-ENGINE'
  ];

  if(!document.querySelector('link[href="engine/engine.css"]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='engine/engine.css';
    document.head.appendChild(link);
  }

  function ensureN804Loaded(cb){
    if(typeof E.generateN804Engine === 'function') { cb(); return; }
    if(document.querySelector('script[src="engine/pilot-n8-04.js"]')){
      setTimeout(()=>ensureN804Loaded(cb),100);
      return;
    }
    const s=document.createElement('script');
    s.src='engine/pilot-n8-04.js';
    s.onload=cb;
    s.onerror=function(){ console.error('Failed to load engine/pilot-n8-04.js'); };
    document.body.appendChild(s);
  }

  E.renderEngineCard = function(id,title,result){
    const cid='q'+Date.now(), aid='a'+Date.now();
    const grade=id.charAt(1);
    const dom=id.charAt(0);
    const gradeTag=grade==='8'?'כיתה ח׳':'כיתה ז׳';
    const domainTag=dom==='N'?'מספרי':dom==='A'?'אלגברי':dom==='U'?'אי-ודאות':'גאומטריה';
    const cls=dom==='N'?'num':dom==='A'?'alg':dom==='U'?'unc':'geo';
    if(typeof setMainTitle==='function') setMainTitle(domainTag,title);
    document.getElementById('out').innerHTML = `<div class="qcard engine-card" id="${cid}">
      <div class="qmeta"><span class="tag ${cls}">${gradeTag}</span><span class="tag ${cls}">${domainTag}</span><span class="tag">${id}</span><span>${title}</span><span class="engine-badge">מנוע חדש ✦</span></div>
      ${result.questionHTML}
      <button class="btn-ans" onclick="document.getElementById('${aid}').classList.toggle('open')">הצג פתרון</button>
      <div class="answer" id="${aid}">${result.answerHTML}</div>
      <div class="expbar"><button class="btn-exp" onclick="copyImg('${cid}',this)">העתק כתמונה</button><button class="btn-exp" onclick="dlPNG('${cid}',this)">PNG</button><button class="btn-exp" onclick="window.print()">הדפס</button><span class="expstat" id="st-${cid}"></span></div>
    </div>`;
    renderMathInElement(document.getElementById('out'),{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
  };

  E.updatePanel = function(){
    const st = document.getElementById('st');
    const panel = document.getElementById('enginePanel');
    if(panel && st) panel.style.display = ENGINE_TOPIC_IDS.indexOf(st.value) >= 0 ? 'block' : 'none';
  };

  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].geometry && !TOPICS[7].geometry.some(t=>t[0]==='G7-03-ENGINE')){
    TOPICS[7].geometry.push(['G7-03-ENGINE','פיתגורס — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].numeric && !TOPICS[8].numeric.some(t=>t[0]==='N8-01-ENGINE')){
    TOPICS[8].numeric.push(['N8-01-ENGINE','יחס — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].numeric && !TOPICS[8].numeric.some(t=>t[0]==='N8-02-ENGINE')){
    TOPICS[8].numeric.push(['N8-02-ENGINE','פרופורציה — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].numeric && !TOPICS[8].numeric.some(t=>t[0]==='N8-04-ENGINE')){
    TOPICS[8].numeric.push(['N8-04-ENGINE','אחוזים סטטיים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].numeric && !TOPICS[8].numeric.some(t=>t[0]==='N8-03-ENGINE')){
    TOPICS[8].numeric.push(['N8-03-ENGINE','קנה מידה — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].numeric && !TOPICS[8].numeric.some(t=>t[0]==='N8-05-ENGINE')){
    TOPICS[8].numeric.push(['N8-05-ENGINE','אחוזים דינמיים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].geometry && !TOPICS[7].geometry.some(t=>t[0]==='G7-01-ENGINE')){
    TOPICS[7].geometry.push(['G7-01-ENGINE','מלבן ותיבה — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].geometry && !TOPICS[7].geometry.some(t=>t[0]==='G7-02-ENGINE')){
    TOPICS[7].geometry.push(['G7-02-ENGINE','שטחי צורות — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].geometry && !TOPICS[7].geometry.some(t=>t[0]==='G7-04-ENGINE')){
    TOPICS[7].geometry.push(['G7-04-ENGINE','זווית חסרה — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].geometry && !TOPICS[8].geometry.some(t=>t[0]==='G8-01-ENGINE')){
    TOPICS[8].geometry.push(['G8-01-ENGINE','עיגול — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].geometry && !TOPICS[8].geometry.some(t=>t[0]==='G8-04-ENGINE')){
    TOPICS[8].geometry.push(['G8-04-ENGINE','דמיון משולשים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].numeric && !TOPICS[7].numeric.some(t=>t[0]==='N7-03-ENGINE')){
    TOPICS[7].numeric.push(['N7-03-ENGINE','מספרים שליליים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].numeric && !TOPICS[7].numeric.some(t=>t[0]==='N7-04-ENGINE')){
    TOPICS[7].numeric.push(['N7-04-ENGINE','חיבור וחיסור מכוונים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].numeric && !TOPICS[7].numeric.some(t=>t[0]==='N7-05-ENGINE')){
    TOPICS[7].numeric.push(['N7-05-ENGINE','כפל וחילוק מכוונים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].numeric && !TOPICS[7].numeric.some(t=>t[0]==='N7-06-ENGINE')){
    TOPICS[7].numeric.push(['N7-06-ENGINE','חזקות — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].numeric && !TOPICS[7].numeric.some(t=>t[0]==='N7-07-ENGINE')){
    TOPICS[7].numeric.push(['N7-07-ENGINE','שורש ריבועי — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].algebra && !TOPICS[7].algebra.some(t=>t[0]==='A7-01-ENGINE')){
    TOPICS[7].algebra.push(['A7-01-ENGINE','ביטויים אלגבריים — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].algebra && !TOPICS[7].algebra.some(t=>t[0]==='A7-02-ENGINE')){
    TOPICS[7].algebra.push(['A7-02-ENGINE','הצבה בביטוי — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].algebra && !TOPICS[7].algebra.some(t=>t[0]==='A7-03-ENGINE')){
    TOPICS[7].algebra.push(['A7-03-ENGINE','משוואות מדרגה ראשונה — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].uncertainty && !TOPICS[7].uncertainty.some(t=>t[0]==='U7-01-ENGINE')){
    TOPICS[7].uncertainty.push(['U7-01-ENGINE','טבלת תדירות — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].uncertainty && !TOPICS[7].uncertainty.some(t=>t[0]==='U7-02-ENGINE')){
    TOPICS[7].uncertainty.push(['U7-02-ENGINE','הסתברות בסיסית — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].algebra && !TOPICS[8].algebra.some(t=>t[0]==='A8-02-ENGINE')){
    TOPICS[8].algebra.push(['A8-02-ENGINE','שיפוע ומשוואת ישר — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].algebra && !TOPICS[8].algebra.some(t=>t[0]==='A8-03-ENGINE')){
    TOPICS[8].algebra.push(['A8-03-ENGINE','מערכת משוואות — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].uncertainty && !TOPICS[8].uncertainty.some(t=>t[0]==='U8-01-ENGINE')){
    TOPICS[8].uncertainty.push(['U8-01-ENGINE','ממוצע, חציון, טווח — מנוע מלא ✦',1]);
  }
  if(typeof TOPICS !== 'undefined' && TOPICS[8] && TOPICS[8].uncertainty && !TOPICS[8].uncertainty.some(t=>t[0]==='U8-02-ENGINE')){
    TOPICS[8].uncertainty.push(['U8-02-ENGINE','הסתברות מטבלה — מנוע מלא ✦',1]);
  }

  generators['G7-03-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    const result = E.generateG703Engine(diff, qtype);
    E.renderEngineCard('G7-03-ENGINE','פיתגורס — מנוע מלא',result);
  };

  generators['N8-01-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    const result = E.generateN801Engine(diff, qtype);
    E.renderEngineCard('N8-01-ENGINE','יחס — מנוע מלא',result);
  };

  generators['N8-02-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    const result = E.generateN802Engine(diff, qtype);
    E.renderEngineCard('N8-02-ENGINE','פרופורציה — מנוע מלא',result);
  };

  generators['N8-04-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    ensureN804Loaded(function(){
      const result = E.generateN804Engine(diff, qtype);
      E.renderEngineCard('N8-04-ENGINE','אחוזים סטטיים — מנוע מלא',result);
    });
  };

  generators['N8-03-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    const result = E.generateN803Engine(diff, qtype);
    E.renderEngineCard('N8-03-ENGINE','קנה מידה — מנוע מלא',result);
  };

  generators['N8-05-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    const result = E.generateN805Engine(diff, qtype);
    E.renderEngineCard('N8-05-ENGINE','אחוזים דינמיים — מנוע מלא',result);
  };

  generators['G7-01-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('G7-01-ENGINE','מלבן ותיבה — מנוע מלא', E.generateG701Engine(diff, qtype));
  };

  generators['G7-02-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('G7-02-ENGINE','שטחי צורות — מנוע מלא', E.generateG702Engine(diff, qtype));
  };

  generators['G7-04-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('G7-04-ENGINE','זווית חסרה — מנוע מלא', E.generateG704Engine(diff, qtype));
  };

  generators['G8-01-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('G8-01-ENGINE','עיגול — מנוע מלא', E.generateG801Engine(diff, qtype));
  };

  generators['G8-04-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('G8-04-ENGINE','דמיון משולשים — מנוע מלא', E.generateG804Engine(diff, qtype));
  };

  generators['N7-03-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('N7-03-ENGINE','מספרים שליליים — מנוע מלא', E.generateN703Engine(diff, qtype));
  };

  generators['N7-04-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('N7-04-ENGINE','חיבור וחיסור מכוונים — מנוע מלא', E.generateN704Engine(diff, qtype));
  };

  generators['N7-05-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('N7-05-ENGINE','כפל וחילוק מכוונים — מנוע מלא', E.generateN705Engine(diff, qtype));
  };

  generators['N7-06-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('N7-06-ENGINE','חזקות — מנוע מלא', E.generateN706Engine(diff, qtype));
  };

  generators['N7-07-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('N7-07-ENGINE','שורש ריבועי — מנוע מלא', E.generateN707Engine(diff, qtype));
  };

  generators['A7-01-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('A7-01-ENGINE','ביטויים אלגבריים — מנוע מלא', E.generateA701Engine(diff, qtype));
  };

  generators['A7-02-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('A7-02-ENGINE','הצבה בביטוי — מנוע מלא', E.generateA702Engine(diff, qtype));
  };

  generators['A7-03-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('A7-03-ENGINE','משוואות — מנוע מלא', E.generateA703Engine(diff, qtype));
  };

  generators['U7-01-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('U7-01-ENGINE','טבלת תדירות — מנוע מלא', E.generateU701Engine(diff, qtype));
  };

  generators['U7-02-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('U7-02-ENGINE','הסתברות בסיסית — מנוע מלא', E.generateU702Engine(diff, qtype));
  };

  generators['A8-02-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('A8-02-ENGINE','שיפוע ומשוואת ישר — מנוע מלא', E.generateA802Engine(diff, qtype));
  };

  generators['A8-03-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('A8-03-ENGINE','מערכת משוואות — מנוע מלא', E.generateA803Engine(diff, qtype));
  };

  generators['U8-01-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('U8-01-ENGINE','ממוצע חציון טווח — מנוע מלא', E.generateU801Engine(diff, qtype));
  };

  generators['U8-02-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    E.renderEngineCard('U8-02-ENGINE','הסתברות מטבלה — מנוע מלא', E.generateU802Engine(diff, qtype));
  };

  const oldOnDomain = window.onDomain;
  window.onDomain = function(){ oldOnDomain(); E.updatePanel(); };
  const oldOnGrade = window.onGrade;
  window.onGrade = function(){ oldOnGrade(); E.updatePanel(); };
  window.addEventListener('DOMContentLoaded', function(){
    const st = document.getElementById('st');
    if(st) st.addEventListener('change', E.updatePanel);
    E.updatePanel();
  });
})();
