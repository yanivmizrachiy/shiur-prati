const TOPICS={
  7:{
    geometry:[
      ['G7-01-ENGINE','מלבן ותיבה — שטח, היקף, נפח',1],
      ['G7-02-ENGINE','שטחי צורות שטוחות',1],
      ['G7-03-ENGINE','משפט פיתגורס — מציאת צלע',1],
      ['G7-04-ENGINE','זוויות — חישוב זווית חסרה',1],
      ['G7-05-ENGINE','הזזות ושיקופים',1],
      ['G7-06-ENGINE','שטח צורה מורכבת',1]
    ],
    algebra:[
      ['A7-01-ENGINE','ביטויים אלגבריים',1],
      ['A7-02-ENGINE','הצבה בביטוי אלגברי',1],
      ['A7-03-ENGINE','משוואות מדרגה ראשונה',1],
      ['A7-04-ENGINE','ביטויים שקולים ופישוט',1],
      ['A7-05-ENGINE','מציאת טעות בביטויים',1]
    ],
    numeric:[
      ['N7-01-ENGINE','מערכת צירים — רביע ראשון',1],
      ['N7-03-ENGINE','מספרים שליליים על ציר המספרים',1],
      ['N7-04-ENGINE','חיבור וחיסור מספרים מכוונים',1],
      ['N7-05-ENGINE','כפל וחילוק מספרים מכוונים',1],
      ['N7-06-ENGINE','חזקות: (−a)ⁿ לעומת −aⁿ',1],
      ['N7-07-ENGINE','שורש ריבועי',1],
      ['N7-08-ENGINE','ציר מספרים והשוואת שליליים',1],
      ['N7-09-ENGINE','מספר נגדי וערך מוחלט',1],
      ['N7-10-ENGINE','טעויות בחיבור וחיסור מכוונים',1],
      ['N7-11-ENGINE','חיבור וחיסור מכוונים בהקשר',1],
      ['N7-12-ENGINE','טעויות בכפל וחילוק מכוונים',1],
      ['N7-13-ENGINE','כללי סימנים בכפל וחילוק',1]
    ],
    uncertainty:[
      ['U7-01-ENGINE','טבלת תדירות ותרשים עמודות',1],
      ['U7-02-ENGINE','הסתברות בסיסית',1],
      ['U7-03-ENGINE','השוואת קבוצות — תדירות יחסית',1],
      ['U7-04-ENGINE','קריאה מתרשים עמודות',1],
      ['U7-05-ENGINE','דיאגרמת עוגה ושכיחות יחסית',1],
      ['U7-06-ENGINE','תרשים מטעה — ביקורת',1],
      ['U7-07-ENGINE','טבלת שכיחויות ושכיחות יחסית',1],
      ['U7-08-ENGINE','ממוצע, חציון וטווח — כיתה ז׳',1]
    ]
  },
  8:{
    geometry:[
      ['G8-01-ENGINE','עיגול — היקף ושטח',1],
      ['G8-02-ENGINE','גליל ופריסה',1],
      ['G8-03-ENGINE','זוויות בין מקבילים',1],
      ['G8-04-ENGINE','דמיון משולשים',1],
      ['G8-05-ENGINE','זווית מרכזית וחלק מעיגול',1],
      ['G8-06-ENGINE','קוטר, רדיוס ומיתר',1],
      ['G8-07-ENGINE','חפיפת משולשים לפי סימונים',1],
      ['G8-08-ENGINE','משולש שווה-שוקיים',1],
      ['G8-09-ENGINE','דמיון וצללים',1]
    ],
    algebra:[
      ['A8-01-ENGINE','גרפים יישומיים ופונקציות',1],
      ['A8-02-ENGINE','שיפוע ומשוואת ישר',1],
      ['A8-03-ENGINE','מערכת משוואות',1]
    ],
    numeric:[
      ['N8-01-ENGINE','יחס',1],
      ['N8-02-ENGINE','פרופורציה',1],
      ['N8-03-ENGINE','קנה מידה',1],
      ['N8-04-ENGINE','אחוזים — מצבים סטטיים',1],
      ['N8-05-ENGINE','אחוזים — מצבים דינמיים',1]
    ],
    uncertainty:[
      ['U8-01-ENGINE','ממוצע, חציון, טווח',1],
      ['U8-02-ENGINE','הסתברות מטבלה',1]
    ]
  }
};
const generators={};
function grade(){return +document.getElementById('sg').value}
function domain(){return document.getElementById('sd').value}
// Strip internal/dev markers from a topic label so teachers see plain pedagogy
// only (e.g. "ביטויים שקולים ופישוט ✦ מנוע מקור" → "ביטויים שקולים ופישוט").
// Display-only: engine ids and registry labels are unchanged in code.
function cleanTopicLabel(s){return String(s==null?'':s).replace(/\s*(✦.*|—\s*מנוע.*|גרסה חכמה.*|מנוע מקור.*)$/,'').replace(/\s*[—–\-•·✦]\s*$/,'').trim();}
function onGrade(){document.getElementById('gradeBadge').textContent={7:'כיתה ז׳',8:'כיתה ח׳'}[grade()]||'כיתה ז׳';onDomain()}
function onDomain(){
  let s=document.getElementById('st');s.innerHTML='';
  let g=TOPICS[grade()]||TOPICS[7];let list=g[domain()]||[];
  // Update domain label badge with topic count
  let domLabel=document.querySelector('label[for="sd"]');
  if(domLabel){
    let badge=domLabel.querySelector('.topic-count-badge');
    if(!badge){badge=document.createElement('span');badge.className='topic-count-badge';domLabel.appendChild(badge);}
    badge.textContent=list.length+' נושאים';
  }
  if(!list.length){
    let o=document.createElement('option');o.value='';
    o.textContent='אין נושאים זמינים בתחום זה';
    s.appendChild(o);return;
  }
  list.forEach(function(t){
    let o=document.createElement('option');o.value=t[0];o.textContent=cleanTopicLabel(t[1]);s.appendChild(o);
  });
}
function generate(){let id=document.getElementById('st').value;if(!generators[id]){document.getElementById('out').innerHTML='<div class="qcard wip">נושא זה עדיין נעול או בפיתוח לפי חומרי המקור הקיימים.</div>';return}let count=+(document.getElementById('sn')?.value||1);if(count>1&&typeof generateSet==='function'){generateSet();return}let qsel=document.getElementById('selQType'),restore=null;if(qsel&&qsel.value==='mixed'){restore='mixed';let types=['open','mcq','tf','mistake'];qsel.value=types[Math.floor(Math.random()*types.length)]}try{generators[id]()}finally{if(restore!==null&&qsel)qsel.value=restore}}
function visualMode(){let s=document.getElementById('sv');return s?s.value:'color'}
function colorToGray(c){if(!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c))return null;let h=c.slice(1);if(h.length===3)h=h.split('').map(ch=>ch+ch).join('');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16),y=Math.round(0.299*r+0.587*g+0.114*b),hx=('0'+y.toString(16)).slice(-2);return{y:y,hex:'#'+hx+hx+hx}}
function applyVisualMode(){const mode=visualMode(),out=document.getElementById('out');if(!out)return;out.querySelectorAll('svg').forEach(svg=>{svg.querySelectorAll('*').forEach(el=>{['fill','stroke'].forEach(attr=>{const key='data-orig-'+attr;let orig=el.getAttribute(key);if(orig===null){const v=el.getAttribute(attr);if(v===null)return;el.setAttribute(key,v);orig=v}if(orig==='none')return;if(mode==='color'){el.setAttribute(attr,orig);return}const g=colorToGray(orig);if(!g){el.setAttribute(attr,orig);return}if(mode==='gray'){el.setAttribute(attr,g.hex);return}if(attr==='stroke'){el.setAttribute(attr,'#000000')}else{el.setAttribute(attr,el.tagName.toLowerCase()!=='text'&&g.y>=140?'#ffffff':'#000000')}})})})}
function onVisualMode(){applyVisualMode()}
function setMainTitle(cls,topicLabel){let el=document.getElementById('mainTitle');if(!el)return;let domainName=cls==='geo'?'גאומטריה':cls==='alg'?'אלגברה':cls==='unc'?'אי־ודאות':'תחום מספרי';el.textContent=domainName+' — '+cleanTopicLabel(topicLabel);el.style.display='block'}
function renderCard(id,title,svg,q,a,cls='num'){if(window.__captureCard){window.__captureCard.push({id:id,title:title,svg:svg,q:q,a:a,cls:cls});return}let cid='q'+Date.now(),aid='a'+Date.now(),gradeLabel=id.includes('8')?'כיתה ח׳':'כיתה ז׳',domainLabel=cls==='geo'?'גאומטריה':cls==='alg'?'אלגברי':cls==='unc'?'אי-ודאות':'מספרי';setMainTitle(cls,title);let html='<div class="qcard" id="'+cid+'"><div class="qmeta"><span class="tag '+cls+'">'+gradeLabel+'</span><span class="tag '+cls+'">'+domainLabel+'</span></div>'+(svg?'<div class="diagram">'+svg+'</div>':'')+'<div class="qtext">'+q+'</div><button class="btn-ans" onclick="document.getElementById(\''+aid+'\').classList.toggle(\'open\')">הצג פתרון</button><div class="answer" id="'+aid+'">'+a+'</div><div class="expbar" data-html2canvas-ignore="true"><button class="btn-exp" onclick="copyImg(\''+cid+'\',this)">העתק כתמונה</button><button class="btn-exp" onclick="dlPNG(\''+cid+'\',this)">PNG</button><button class="btn-exp" onclick="window.print()">הדפס</button><span class="expstat" id="st-'+cid+'"></span></div></div>';document.getElementById('out').innerHTML=html;renderMathInElement(document.getElementById('out'),{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});applyVisualMode()}
