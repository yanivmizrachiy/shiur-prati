(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  E.renderEngineCard = function(id,title,result){
    const cid='q'+Date.now(), aid='a'+Date.now();
    document.getElementById('out').innerHTML = `<div class="qcard engine-card" id="${cid}">
      <div class="qmeta"><span class="tag geo">כיתה ז׳</span><span class="tag geo">גאומטריה</span><span class="tag">${id}</span><span>${title}</span><span class="engine-badge">מנוע חדש ✦</span></div>
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
    if(panel && st) panel.style.display = st.value === 'G7-03-ENGINE' ? 'block' : 'none';
  };

  if(typeof TOPICS !== 'undefined' && TOPICS[7] && TOPICS[7].geometry && !TOPICS[7].geometry.some(t=>t[0]==='G7-03-ENGINE')){
    TOPICS[7].geometry.push(['G7-03-ENGINE','פיתגורס — מנוע מלא ✦',1]);
  }

  generators['G7-03-ENGINE'] = function(){
    const diff = document.getElementById('selDiff')?.value || document.getElementById('sl')?.value || 'standard';
    const qtype = document.getElementById('selQType')?.value || 'open';
    const result = E.generateG703Engine(diff, qtype);
    E.renderEngineCard('G7-03-ENGINE','פיתגורס — מנוע מלא',result);
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
