const books=[
['אלגברה לכיתה ז׳','כיתה ז׳','אלגברה','תוכנית לימודים רשמית','2.69MB','01_grade-7_algebra_curriculum.pdf','../sources/intake/2026-06-09/01-grade-7-algebra/01_grade-7_algebra_curriculum.pdf'],
['אלגברה לכיתה ח׳','כיתה ח׳','אלגברה','תוכנית לימודים רשמית','5.90MB','02_grade-8_algebra_curriculum.pdf','../sources/intake/2026-06-09/02-grade-8-algebra/02_grade-8_algebra_curriculum.pdf'],
['גאומטריה קדם־היסקית לכיתה ז׳','כיתה ז׳','גאומטריה','תוכנית לימודים רשמית','5.12MB','03_grade-7_pre_deductive_geometry_curriculum.pdf','../sources/intake/2026-06-09/03-grade-7-pre-deductive-geometry/03_grade-7_pre_deductive_geometry_curriculum.pdf'],
['גאומטריה לכיתה ח׳','כיתה ח׳','גאומטריה','תוכנית לימודים רשמית','5.15MB','04_grade-8_geometry_curriculum.pdf','../sources/intake/2026-06-09/04-grade-8-geometry/04_grade-8_geometry_curriculum.pdf'],
['תחום מספרי — כיתה ז׳','כיתה ז׳','תחום מספרי','תוכנית לימודים רשמית','8.51MB','05_grade-7_numeric_domain_curriculum.pdf','../sources/intake/2026-06-09/05-grade-7-numeric-domain/05_grade-7_numeric_domain_curriculum.pdf'],
['תחום אי־ודאות','רב־שכבתי','אי־ודאות','תוכנית ודוגמאות','6.84MB','06_uncertainty_domain_curriculum_examples.pdf','../sources/intake/2026-06-09/06-uncertainty-domain/06_uncertainty_domain_curriculum_examples.pdf'],
['תחום מספרי — עקרונות כיתות ז׳–ח׳','כיתות ז׳–ח׳','תחום מספרי','עקרונות','566KB','07_numeric_domain_principles_grades-7-8.pdf','../sources/intake/2026-06-09/07-numeric-principles-grades-7-8/07_numeric_domain_principles_grades-7-8.pdf'],
['תחום אלגברי — עקרונות כיתות ז׳–ח׳','כיתות ז׳–ח׳','אלגברה','עקרונות','578KB','08_algebra_domain_principles_grades-7-8.pdf','../sources/intake/2026-06-09/08-algebra-principles-grades-7-8/08_algebra_domain_principles_grades-7-8.pdf'],
['תחום גיאומטרי — עקרונות כיתות ז׳–ח׳','כיתות ז׳–ח׳','גיאומטריה','עקרונות','586KB','09_geometry_domain_principles_grades-7-8.pdf','../sources/intake/2026-06-09/09-geometry-principles-grades-7-8/09_geometry_domain_principles_grades-7-8.pdf'],
['רצף הוראה לכיתה ח׳ תשפ״ז','כיתה ח׳','רצף הוראה','תכנון','328KB','10_grade-8_teaching_sequence_2026-2027.pdf','../sources/intake/2026-06-09/10-grade-8-teaching-sequence-2026-2027/10_grade-8_teaching_sequence_2026-2027.pdf']
];
let index=0;const $=id=>document.getElementById(id);const pad=n=>String(n).padStart(2,'0');
function renderToc(){const list=$('tocList');list.innerHTML='';books.forEach((b,i)=>{const x=document.createElement('button');x.type='button';x.className='toc-item';x.innerHTML='<strong>'+pad(i+1)+' · '+b[0]+'</strong><span>'+b[1]+' · '+b[2]+' · '+b[3]+'</span>';x.onclick=()=>go(i);list.appendChild(x)});}
function active(){document.querySelectorAll('.toc-item').forEach((x,i)=>x.classList.toggle('active',i===index));}
// Learning materials are served from the site itself (generator/assets/sources/),
// so they load on GitHub Pages. We show pedagogical labels to the teacher, never
// a file path. b[5] is the file's basename; b[6] (legacy repo path) is not used.
function materialSrc(b){return 'assets/sources/'+b[5];}
function render(dir='next'){const b=books[index];const src=materialSrc(b);$('bookTitle').textContent=b[0];$('bookMeta').textContent=b[1]+' · '+b[2]+' · '+b[3];$('chapterNumber').textContent=pad(index+1);$('chapterTitle').textContent=b[0];$('chapterSubtitle').textContent=b[3];$('fileName').textContent=b[3];$('fileSize').textContent=b[4];$('pdfTitle').textContent=b[0];$('pdfPath').textContent=b[1]+' · '+b[2];$('currentIndex').textContent=index+1;$('totalCount').textContent=books.length;$('progressBar').style.width=((index+1)/books.length*100)+'%';$('chapterTags').innerHTML='<span class="tag">'+b[1]+'</span><span class="tag">'+b[2]+'</span><span class="tag">'+b[3]+'</span>';$('pdfFrame').src=src;$('externalPdf').href=src;$('downloadPdf').href=src;active();const c=$('bookCard');c.classList.remove('turn-next','turn-prev');void c.offsetWidth;c.classList.add(dir==='prev'?'turn-prev':'turn-next');}
function go(i){const dir=i<index?'prev':'next';index=(i+books.length)%books.length;render(dir);if(innerWidth<900)$('tocPanel').classList.remove('open');}
function move(d){go(index+d)}
function init(){renderToc();render();$('nextBtn').onclick=()=>move(1);$('prevBtn').onclick=()=>move(-1);$('nextBottomBtn').onclick=()=>move(1);$('prevBottomBtn').onclick=()=>move(-1);$('firstBtn').onclick=()=>go(0);$('lastBtn').onclick=()=>go(books.length-1);$('openToc').onclick=()=>$('tocPanel').classList.add('open');$('closeToc').onclick=()=>$('tocPanel').classList.remove('open');$('focusReader').onclick=()=>document.body.classList.toggle('is-focus');document.onkeydown=e=>{if(e.key==='ArrowLeft')move(1);if(e.key==='ArrowRight')move(-1);if(e.key==='Escape')document.body.classList.remove('is-focus')}}
document.addEventListener('DOMContentLoaded',init);
