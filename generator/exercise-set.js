// generator/exercise-set.js
// Browser exercise-set runtime layer: count control, mixed question types,
// numbered set rendering, answer key, print. Built on the existing 25 engines
// via TargilimEngine.getEngineExercise and on legacy generators via renderCard capture.
// No math logic lives here.

function buildTypePlan(qtype,count){
  if(qtype!=='mixed')return Array(count).fill(qtype);
  const TYPES=['open','mcq','tf','mistake'],plan=[];
  for(let i=0;i<count;i++)plan.push(TYPES[i%TYPES.length]);
  for(let i=plan.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)),t=plan[i];plan[i]=plan[j];plan[j]=t}
  return plan;
}

function tryEngineExercise(E,id,diff,qtype,mcqMode){
  try{return E.getEngineExercise(id,diff,qtype,{mcqMode:mcqMode})}catch(e){console.error('engine exercise failed',id,qtype,e);return null}
}

function makeExercise(id,diff,qtype,isEngine,E,mcqMode){
  if(isEngine){
    let ex=tryEngineExercise(E,id,diff,qtype,mcqMode);
    if(!ex&&qtype!=='open')ex=tryEngineExercise(E,id,diff,'open',mcqMode); // safe fallback per item
    // ensure pedagogy meta is present for Teacher Advanced Mode
    if(ex&&!ex.meta&&typeof E.buildMeta==='function'){try{ex.meta=E.buildMeta(id,ex.qtype||qtype,diff,ex.questionFamily);}catch(e){}}
    return ex;
  }
  if(typeof generators==='undefined'||!generators[id])return null;
  window.__captureCard=[];let buf;
  try{generators[id]()}catch(e){console.error('legacy exercise failed',id,e);window.__captureCard=null;return null}
  finally{buf=window.__captureCard;window.__captureCard=null}
  if(!buf||!buf.length)return null;
  const c=buf[0];
  return {id:c.id,title:c.title,qtype:'open',cls:c.cls,
    questionHTML:(c.svg?'<div class="diagram">'+c.svg+'</div>':'')+'<div class="qtext">'+c.q+'</div>',
    answerHTML:c.a,correctLabel:null,
    meta:(typeof E.buildMeta==='function'?(function(){try{return E.buildMeta(id,'open',diff);}catch(e){return null}})():null)};
}

function generateSet(){
  const id=document.getElementById('st').value;
  const count=+(document.getElementById('sn')?.value||10);
  const E=window.TargilimEngine||{};
  const isEngine=typeof E.isEngineTopic==='function'&&E.isEngineTopic(id)&&typeof E.getEngineExercise==='function';
  // The visible level selector (#sl: רמה 1/2/3 → basic/standard/challenge) drives
  // difficulty for every topic; the engine panel's hidden #selDiff is a fallback.
  const diff=(document.getElementById('sl')?.value)||(document.getElementById('selDiff')?.value)||'standard';
  const qtype=isEngine?(document.getElementById('selQType')?.value||'mixed'):'open';
  const mcqMode=document.getElementById('selMcqMode')?.value||'single';
  const plan=buildTypePlan(qtype,count);
  const exercises=[],seen=new Set();
  let attempts=0;const maxAttempts=count*8;
  for(let i=0;i<count;i++){
    let ex=null,last=null;
    for(let tries=0;tries<8&&attempts<maxAttempts;tries++){
      attempts++;
      const cand=makeExercise(id,diff,plan[i],isEngine,E,mcqMode);
      if(!cand)break;
      last=cand;
      const key=cand.questionHTML.replace(/\s+/g,' ').trim();
      if(!seen.has(key)){seen.add(key);ex=cand;break}
    }
    if(!ex)ex=last; // uniqueness exhausted — render best effort, never crash
    if(ex)exercises.push(ex);
  }
  if(!exercises.length){
    document.getElementById('out').innerHTML='<div class="qcard wip">לא ניתן היה להפיק תרגילים בנושא זה כעת. בחרו נושא אחר ונסו שוב.</div>';
    return;
  }
  // Multiple-choice instruction (printed, student-facing). Wording matches the
  // teacher's selected mode; the correct answer stays in the answer key only.
  const mcqInstr=mcqMode==='multi'
    ? '<div class="mcq-instruction">ייתכן שיותר מתשובה אחת נכונה — סמנו את כל התשובות הנכונות:</div>'
    : '<div class="mcq-instruction">סמנו את התשובה הנכונה (אחת בלבד):</div>';
  exercises.forEach(function(ex){
    if(/class="mcq-choices"/.test(ex.questionHTML)&&!/mcq-instruction/.test(ex.questionHTML))
      ex.questionHTML=ex.questionHTML.replace('<div class="mcq-choices">',mcqInstr+'<div class="mcq-choices">');
  });
  const sel=document.getElementById('st');
  const topicLabel=(typeof cleanTopicLabel==='function'?cleanTopicLabel(sel.options[sel.selectedIndex]?.textContent||''):(sel.options[sel.selectedIndex]?.textContent||''));
  const domainKey=typeof domain==='function'?domain():'numeric';
  const meta={
    topicLabel:topicLabel,
    gradeLabel:(typeof grade==='function'&&grade()===8)?'כיתה ח׳':'כיתה ז׳',
    domainLabel:{geometry:'גאומטריה',algebra:'אלגברה',numeric:'תחום מספרי',uncertainty:'אי־ודאות'}[domainKey]||'',
    cls:{geometry:'geo',algebra:'alg',numeric:'num',uncertainty:'unc'}[domainKey]||'num',
    diffLabel:{basic:'רמה 1',standard:'רמה 2',challenge:'רמה 3'}[diff]||diff
  };
  // publish set context so Teacher Advanced Mode can regenerate single items
  window.__exsetCtx={id:id,isEngine:isEngine,diff:diff,topicLabel:topicLabel,cls:meta.cls,mcqMode:mcqMode,exercises:exercises};
  renderExerciseSet(meta,exercises);
}

// A clean, untitled writing area — but ONLY for free-write question types.
// open → solution lines; mistake → find/correct the error. Mark-the-answer types
// get NO box: mcq the student marks one of the lettered choices, tf the student
// circles נכון/שגוי — a blank box there is redundant and confusing. The box (when
// present) is part of the captured card (not html2canvas-ignored) and carries a
// stable data-student-answer-box hook for verifiers.
function workAreaHTML(qtype){
  const LINES={open:4,mistake:4};
  const n=LINES[qtype];
  if(!n) return ''; // mcq, tf — no writing box; the answer is the marked choice
  let wl='';for(let i=0;i<n;i++)wl+='<div class="wl"></div>';
  return '<div class="answer-box" data-student-answer-box="true">'
    +'<div class="answer-box-body">'+wl+'</div></div>';
}

function sharpenMathRects(html){
  return String(html||'').replace(/<rect\b[^>]*>/g,function(tag){
    return tag.replace(/\s+r[xy]=(?:"[^"]*"|'[^']*'|[^\s/>]+)/g,'');
  });
}

function renderExerciseSet(meta,exercises){
  if(typeof setMainTitle==='function')setMainTitle(meta.cls,meta.topicLabel);
  const cards=exercises.map(function(ex,i){
    const questionHTML=sharpenMathRects(ex.questionHTML);
    return '<div class="qcard engine-card ex-card" id="exCard'+i+'" data-idx="'+i+'">'
      +'<div class="qmeta" data-html2canvas-ignore="true"><span class="ex-num">תרגיל '+(i+1)+'</span></div>'
      +'<div class="ex-body">'+questionHTML+'</div>'
      +workAreaHTML(ex.qtype)
      +'<div class="ex-imgbar" data-html2canvas-ignore="true">'
        +'<button class="btn-img btn-img-primary" onclick="exImageCopy('+i+',this)">📋 העתק כתמונה</button>'
        +'<button class="btn-img btn-img-primary" onclick="exImageDownload('+i+',this)">⬇ הורד כתמונה</button>'
      +'</div>'
      +'</div>';
  }).join('');
  const keyItems=exercises.map(function(ex,i){
    // list ALL correct MCQ labels (supports one or more correct answers)
    const labels=(ex.questionHTML.match(/mcq-choice mcq-correct"><span class="mcq-label">([^<]+)\./g)||[])
      .map(function(s){return s.replace(/.*mcq-label">([^<]+)\..*/,'$1');});
    const all=labels.length?labels:(ex.correctLabel?[ex.correctLabel]:[]);
    const correct=all.length?'<div class="ak-correct">'+(all.length>1?'התשובות הנכונות: ':'התשובה הנכונה: ')+all.join(', ')+'</div>':'';
    return '<div class="ak-item"><div class="ak-num">תרגיל '+(i+1)+'</div>'+correct+'<div class="ak-body">'+ex.answerHTML+'</div></div>';
  }).join('');
  const countLabel=exercises.length===1?'תרגיל אחד':exercises.length+' תרגילים';
  const html='<div class="exset" id="exset">'
    +'<div class="exset-head">'
    +'<div class="exset-title">דף תרגילים — '+meta.topicLabel+'</div>'
    +'<div class="exset-nameline">שם: ______________________&nbsp;&nbsp;&nbsp; תאריך: ______________&nbsp;&nbsp;&nbsp; כיתה: ________</div>'
    +'<div class="qmeta" data-html2canvas-ignore="true"><span class="tag '+meta.cls+'">'+meta.gradeLabel+'</span><span class="tag '+meta.cls+'">'+meta.domainLabel+'</span><span class="tag '+meta.cls+'">'+meta.diffLabel+'</span><span class="tag '+meta.cls+'">'+countLabel+'</span></div>'
    +'<div class="exset-actions" data-html2canvas-ignore="true">'
    +'<button class="btn-key" id="btnAnswerKey" onclick="toggleAnswerKey()">הצג תשובות</button>'
    +'<button class="btn-printset" onclick="printExerciseSet()">הדפס דף תרגילים</button>'
    +'</div></div>'
    +cards
    +'<div class="answer-key" id="answerKey"><div class="answer-key-title">מפתח תשובות</div>'+keyItems+'</div>'
    +'</div>';
  const out=document.getElementById('out');
  out.innerHTML=html;
  renderMathInElement(out,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
  if(typeof applyVisualMode==='function')applyVisualMode();
  // Teacher Advanced Mode decoration (teacher cards + per-question controls)
  if(window.Teacher&&typeof window.Teacher.decorateSet==='function')window.Teacher.decorateSet();
}

// Per-question image actions — available to every teacher, not only in teacher
// mode. They snapshot the whole card (text + diagram + answer box) through the
// unified premium pipeline in export.js; the buttons are data-html2canvas-ignore
// so they never appear in the captured image.
function exImageAction(i,btn,fn,doneCopied,doneDl){
  const card=document.getElementById('exCard'+i);if(!card||!btn)return;
  const prev=btn.textContent;btn.disabled=true;btn.textContent='מכין…';
  fn(card,i+1).then(function(res){btn.textContent=res==='copied'?doneCopied:doneDl;})
    .catch(function(){btn.textContent='שגיאה';})
    .finally(function(){setTimeout(function(){btn.disabled=false;btn.textContent=prev;},1700);});
}
function exImageCopy(i,btn){exImageAction(i,btn,copyExerciseImage,'הועתק ✓','הורד PNG ✓');}
function exImageDownload(i,btn){exImageAction(i,btn,downloadExerciseImage,'הורד ✓','הורד ✓');}

function toggleAnswerKey(){
  const key=document.getElementById('answerKey'),btn=document.getElementById('btnAnswerKey');
  if(!key)return;
  key.classList.toggle('open');
  if(btn)btn.textContent=key.classList.contains('open')?'הסתר תשובות':'הצג תשובות';
}

function printExerciseSet(){window.print()}
