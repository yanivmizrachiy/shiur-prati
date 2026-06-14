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
  const diff=isEngine?(document.getElementById('selDiff')?.value||'standard'):(document.getElementById('sl')?.value||'standard');
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
  const topicLabel=(sel.options[sel.selectedIndex]?.textContent||'').replace(/\s*—\s*(מנוע (מלא|חדש)|גרסה חכמה)\s*✦?\s*$/,'');
  const domainKey=typeof domain==='function'?domain():'numeric';
  const meta={
    topicLabel:topicLabel,
    gradeLabel:(typeof grade==='function'&&grade()===8)?'כיתה ח׳':'כיתה ז׳',
    domainLabel:{geometry:'גאומטריה',algebra:'אלגברה',numeric:'תחום מספרי',uncertainty:'אי־ודאות'}[domainKey]||'',
    cls:{geometry:'geo',algebra:'alg',numeric:'num',uncertainty:'unc'}[domainKey]||'num',
    diffLabel:{standard:'סטנדרטית',basic:'בסיסית',challenge:'מאתגרת'}[diff]||diff
  };
  // publish set context so Teacher Advanced Mode can regenerate single items
  window.__exsetCtx={id:id,isEngine:isEngine,diff:diff,topicLabel:topicLabel,cls:meta.cls,mcqMode:mcqMode,exercises:exercises};
  renderExerciseSet(meta,exercises);
}

// Answer area shaped per question type, like a printed workbook:
// open → solution lines + final-answer blank; mcq → answer blank + short
// justification; tf → verdict blank + correction line; mistake → error + fix.
function workAreaHTML(qtype){
  function lines(n){let s='';for(let i=0;i<n;i++)s+='<div class="wl"></div>';return s}
  if(qtype==='mcq')return '<div class="work-area">'
    +'<div class="wa-final"><span class="work-label">תשובה:</span><span class="wa-blank wa-short"></span><span class="work-label">נימוק:</span><span class="wa-blank"></span></div></div>';
  if(qtype==='tf')return '<div class="work-area">'
    +'<div class="wa-final"><span class="work-label">נכון / שגוי:</span><span class="wa-blank wa-short"></span><span class="work-label">אם שגוי — תקנו:</span><span class="wa-blank"></span></div></div>';
  if(qtype==='mistake')return '<div class="work-area">'
    +'<div class="wa-row"><span class="work-label">הטעות:</span></div>'+lines(1)
    +'<div class="wa-row"><span class="work-label">תיקון:</span></div>'+lines(1)+'</div>';
  return '<div class="work-area">'
    +'<div class="wa-row"><span class="work-label">דרך:</span></div>'+lines(2)
    +'<div class="wa-final"><span class="work-label">תשובה:</span><span class="wa-blank"></span></div></div>';
}

function renderExerciseSet(meta,exercises){
  const TYPE_LABELS={open:'שאלה פתוחה',mcq:'רב־ברירה',tf:'נכון / שגוי',mistake:'מצא את הטעות'};
  if(typeof setMainTitle==='function')setMainTitle(meta.cls,meta.topicLabel);
  const cards=exercises.map(function(ex,i){
    return '<div class="qcard engine-card ex-card" id="exCard'+i+'" data-idx="'+i+'">'
      +'<div class="qmeta" data-html2canvas-ignore="true"><span class="ex-num">תרגיל '+(i+1)+'</span><span class="tag '+meta.cls+'">'+(TYPE_LABELS[ex.qtype]||TYPE_LABELS.open)+'</span></div>'
      +'<div class="ex-body">'+ex.questionHTML+'</div>'
      +workAreaHTML(ex.qtype)
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
    +'<div class="qmeta" data-html2canvas-ignore="true"><span class="tag '+meta.cls+'">'+meta.gradeLabel+'</span><span class="tag '+meta.cls+'">'+meta.domainLabel+'</span><span class="tag '+meta.cls+'">רמה: '+meta.diffLabel+'</span><span class="tag '+meta.cls+'">'+countLabel+'</span></div>'
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

function toggleAnswerKey(){
  const key=document.getElementById('answerKey'),btn=document.getElementById('btnAnswerKey');
  if(!key)return;
  key.classList.toggle('open');
  if(btn)btn.textContent=key.classList.contains('open')?'הסתר תשובות':'הצג תשובות';
}

function printExerciseSet(){window.print()}
