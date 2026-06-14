// generator/engine/pilot-a8-04.js
// A8-04 Linear Inequalities — Smart Engine
// Source: source-learning/2026-06-09/02_grade-8_algebra_curriculum.learning.md, 08
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  const ID = 'A8-04-ENGINE';

  const CASES = [
    {family:'isolate_positive', q:'פתרו את האי־שוויון $3x+7\\gt 2x+12$.', steps:['נחסיר $2x$ משני האגפים: $$x+7\\gt 12$$','נחסיר $7$ משני האגפים: $$x\\gt 5$$'], ans:'$x\\gt 5$', trueText:'הפתרון הוא $x\\gt5$', falseText:'הפתרון הוא $x\\lt5$', wrong:'תלמיד השאיר את $2x$ באגף ימין וקיבל $3x\\gt5$.'},
    {family:'isolate_positive', q:'פתרו את האי־שוויון $5x-4\\lt 2x+11$.', steps:['נחסיר $2x$: $$3x-4\\lt 11$$','נוסיף $4$: $$3x\\lt 15$$','נחלק ב־$3$ חיובי: $$x\\lt 5$$'], ans:'$x\\lt 5$', trueText:'הפתרון הוא $x\\lt5$', falseText:'הפתרון הוא $x\\gt5$', wrong:'תלמיד החליף את הסימן למרות שחילק במספר חיובי.'},
    {family:'weak_inequality', q:'פתרו את האי־שוויון $2x-9\\le x+3$.', steps:['נחסיר $x$: $$x-9\\le 3$$','נוסיף $9$: $$x\\le 12$$'], ans:'$x\\le 12$', trueText:'$12$ כלול בקבוצת הפתרונות', falseText:'$12$ אינו כלול בקבוצת הפתרונות', wrong:'תלמיד כתב $x\\lt12$ ושכח שסימן $\\le$ כולל שוויון.'},
    {family:'negative_division', q:'פתרו את האי־שוויון $-3x+6\\gt 15$.', steps:['נחסיר $6$: $$-3x\\gt 9$$','נחלק ב־$-3$. כאשר מחלקים במספר שלילי הופכים את סימן אי־השוויון: $$x\\lt -3$$'], ans:'$x\\lt -3$', trueText:'בחילוק במספר שלילי הופכים את הסימן', falseText:'בחילוק במספר שלילי לא משנים סימן', wrong:'תלמיד חילק ב־$-3$ ולא הפך את הסימן, ולכן קיבל $x\\gt-3$.'},
    {family:'negative_division', q:'פתרו את האי־שוויון $7-4x\\lt 19$.', steps:['נחסיר $7$: $$-4x\\lt 12$$','נחלק ב־$-4$ והופכים סימן: $$x\\gt -3$$'], ans:'$x\\gt -3$', trueText:'הפתרון הוא $x\\gt-3$', falseText:'הפתרון הוא $x\\lt-3$', wrong:'תלמיד חילק ב־$-4$ בלי להפוך את הסימן.'},
    {family:'parentheses', q:'פתרו את האי־שוויון $3(2x-1)\\gt 4x+9$.', steps:['נפתח סוגריים: $$6x-3\\gt 4x+9$$','נחסיר $4x$: $$2x-3\\gt 9$$','נוסיף $3$: $$2x\\gt 12$$','נחלק ב־$2$: $$x\\gt 6$$'], ans:'$x\\gt 6$', trueText:'אחרי פתיחת סוגריים מתקבל $6x-3$', falseText:'אחרי פתיחת סוגריים מתקבל $6x-1$', wrong:'תלמיד פתח סוגריים לא נכון וכתב $3(2x-1)=6x-1$.'},
    {family:'constraint_context', q:'כרטיס עולה $12$ שקלים ויש דמי הרשמה של $30$ שקלים. התקציב הוא עד $150$ שקלים. כמה כרטיסים לכל היותר אפשר לקנות?', steps:['נסמן מספר כרטיסים ב־$x$. מתקבל: $$12x+30\\le150$$','נחסיר $30$: $$12x\\le120$$','נחלק ב־$12$: $$x\\le10$$'], ans:'לכל היותר $10$ כרטיסים', trueText:'אפשר לקנות לכל היותר $10$ כרטיסים', falseText:'אפשר לקנות לכל היותר $12$ כרטיסים', wrong:'תלמיד שכח את דמי ההרשמה וחילק $150$ ב־$12$.'},
    {family:'constraint_context', q:'מונית גובה $18$ שקלים התחלה ועוד $4$ שקלים לכל קילומטר. לדנה יש עד $50$ שקלים. כמה קילומטרים לכל היותר תוכל לנסוע?', steps:['נסמן קילומטרים ב־$x$: $$18+4x\\le50$$','נחסיר $18$: $$4x\\le32$$','נחלק ב־$4$: $$x\\le8$$'], ans:'לכל היותר $8$ ק״מ', trueText:'דנה תוכל לנסוע לכל היותר $8$ ק״מ', falseText:'דנה תוכל לנסוע לכל היותר $12.5$ ק״מ', wrong:'תלמיד חילק את כל התקציב ב־$4$ והתעלם מהתשלום הקבוע.'}
  ];

  function pickFamily(diff){
    if(diff === 'basic') return E.pick(['isolate_positive','weak_inequality']);
    if(diff === 'challenge') return E.pick(['negative_division','parentheses','constraint_context']);
    return E.pick(['isolate_positive','negative_division','constraint_context','parentheses']);
  }
  function pickCase(family){
    const pool = CASES.filter(c => c.family === family);
    return E.pick(pool.length ? pool : CASES);
  }
  function answer(c){
    return c.steps.join('\n') + '\nלכן: ' + c.ans + '.\nבדיקה קצרה: מציבים ערך מתאים ורואים שהאי־שוויון מתקיים.';
  }
  function choices(c){
    const correct = c.ans;
    const wrongs = c.family === 'negative_division'
      ? ['$x\\gt -3$','$x\\lt 3$','$x=-3$']
      : ['$x\\gt 5$','$x\\lt 5$','$x\\le 10$'];
    const vals = [correct].concat(wrongs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(vals.length < 4) vals.push('$x='+vals.length+'$');
    return E.shuffle(vals).map((v,i)=>({label:['א','ב','ג','ד'][i], text:v, correct:v===correct}));
  }

  E.generateA804Engine = function(difficulty, questionType){
    difficulty = difficulty || 'standard'; questionType = questionType || 'open';
    const family = pickFamily(difficulty);
    const c = pickCase(family);
    const a = answer(c);
    const tfTrue = Math.random() < 0.5;
    let q = c.q;
    if(questionType === 'tf') q = tfTrue ? c.trueText : c.falseText;
    if(questionType === 'mistake') q = c.q + '\nתלמיד פתר כך: ' + c.wrong + '\nמצאו את הטעות ותקנו.';
    if(questionType === 'mcq') return E.questionTypes.mcq({question:q, answer:a, svg:'', choices:choices(c)});
    if(questionType === 'tf') return E.questionTypes.tf({question:q, answer:a, svg:'', isTrue:tfTrue});
    if(questionType === 'mistake') return E.questionTypes.mistake({question:q, answer:'הטעות: ' + c.wrong + '\nהפתרון הנכון:\n' + a, svg:''});
    return E.questionTypes.open({question:q, answer:a, svg:''});
  };

  E.PEDAGOGY = E.PEDAGOGY || {};
  E.PEDAGOGY[ID] = {
    topicId: ID,
    topicName: 'אי־שוויונות ממעלה ראשונה',
    sourceFile: '02_grade-8_algebra_curriculum.pdf',
    grade: 8,
    domain: 'algebra',
    skill: 'linear_inequalities',
    learningGoal: 'התלמיד יפתור אי־שוויונות לינאריים ויפרש מגבלות בהקשר מילולי',
    teacherPurpose: 'ביסוס העברת אגפים, שמירה על כיוון הסימן, והיפוך סימן בחילוק במספר שלילי',
    misconceptions: ['אי־היפוך סימן בחילוק במספר שלילי', 'בלבול בין < ל־≤', 'התעלמות מתשלום קבוע בבעיה מילולית'],
    followUpIdeas: ['פתרו עם מספר שלילי', 'כתבו בעיית מגבלה משלכם', 'בדקו פתרון על ציר מספרים'],
    requiredVisual: false,
    engineSupport: 'dedicated',
    status: 'active',
    families: [
      {id:'A8-04-isolate-positive', questionFamily:'isolate_positive', sourceExampleOrPattern:'ax+b > cx+d', commonMisconception:'העברת אגפים לא מאוזנת', allowedVariations:['>','<'], fixedConstraints:['חלוקה במספר חיובי'], qtypes:['open','mcq','tf','mistake'], difficulties:['basic','standard','challenge'], answerFormat:'תחום פתרונות', explanationFormat:'פתרון אלגברי בשלבים', requiredVisual:false},
      {id:'A8-04-negative-division', questionFamily:'negative_division', sourceExampleOrPattern:'-ax+b > c', commonMisconception:'לא הופכים סימן בחילוק במספר שלילי', allowedVariations:['מקדם שלילי','סימן מתהפך'], fixedConstraints:['חובה להסביר היפוך סימן'], qtypes:['open','mcq','tf','mistake'], difficulties:['standard','challenge'], answerFormat:'תחום פתרונות', explanationFormat:'הסבר על חילוק במספר שלילי', requiredVisual:false},
      {id:'A8-04-constraint-context', questionFamily:'constraint_context', sourceExampleOrPattern:'עלות קבועה + מחיר ליחידה ≤ תקציב', commonMisconception:'שכחת עלות קבועה', allowedVariations:['כרטיסים','מונית','תקציב'], fixedConstraints:['פתרון שלם בהקשר'], qtypes:['open','mcq','tf','mistake'], difficulties:['basic','standard','challenge'], answerFormat:'מספר מרבי/מינימלי בהקשר', explanationFormat:'בניית אי־שוויון ופתרון', requiredVisual:false}
    ]
  };
})();
