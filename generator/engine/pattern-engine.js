(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const ENGINE_TOPIC_IDS = ['G7-03-ENGINE','N8-01-ENGINE','N8-02-ENGINE','N8-03-ENGINE','N8-04-ENGINE','N8-05-ENGINE'];

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
    const isN8=id.indexOf('N8')===0;
    const gradeTag=isN8?'כיתה ח׳':'כיתה ז׳';
    const domainTag=isN8?'מספרי':'גאומטריה';
    const cls=isN8?'num':'geo';
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
