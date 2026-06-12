TOPICS[8].geometry.push(['G8-04','ניידות משולשים',1]);
generators['G8-04']=function(){
  const cases=[
    {q:'שני משולשים דומים. יחס הדמיון מהקטן לגדול הוא $2:3$. צלע במשולש הקטן היא $8$ ס״מ. מה אורך הצלע המתאימה במשולש הגדול?',a:'גורם ההגדלה הוא $\\frac{3}{2}$.\n$$8\\times\\frac{3}{2}=12$$\nאורך הצלע המתאימה הוא $12$ ס״מ.'},
    {q:'שני משולשים דומים. יחס הדמיון מהקטן לגדול הוא $1:4$. שטח המשולש הקטן הוא $9$ סמ״ר. מה שטח המשולש הגדול?',a:'יחס שטחים הוא ריבוע יחס הדמיון.\n$$1^2:4^2=1:16$$\n$$9\\times16=144$$\nשטח המשולש הגדול הוא $144$ סמ״ר.'},
    {q:'עץ מטיל צל באורך $6$ מטר. באותו זמן עמוד בגובה $2$ מטר מטיל צל באורך $1.5$ מטר. מה גובה העץ?',a:'באותו זמן מתקבלים משולשים דומים.\n$$\\frac{גובה}{צל}=\\frac{2}{1.5}=\\frac{4}{3}$$\n$$6\\times\\frac{4}{3}=8$$\nגובה העץ הוא $8$ מטר.'},
    {q:'שני משולשים דומים. יחס הדמיון מהקטן לגדול הוא $3:5$. היקף המשולש הקטן הוא $18$ ס״מ. מה היקף המשולש הגדול?',a:'היקפים של צורות דומות משתנים לפי אותו יחס דמיון.\n$$18\\times\\frac{5}{3}=30$$\nהיקף המשולש הגדול הוא $30$ ס״מ.'}
  ];
  const c=cases[Math.floor(Math.random()*cases.length)];
  renderCard('G8-04','ניידות משולשים','',c.q,c.a,'geo');
};

TOPICS[8].geometry.push(['G8-07','חפיפת משולשים לפי סימונים ✦ מקור',1]);
generators['G8-07']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="276" height="160" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><polygon points="45,135 130,135 85,55" fill="#dbeafe" stroke="#2563eb" stroke-width="2.4"/><polygon points="175,135 260,135 215,55" fill="#dbeafe" stroke="#2563eb" stroke-width="2.4"/><text x="40" y="150" font-size="12" font-weight="800">A</text><text x="132" y="150" font-size="12" font-weight="800">B</text><text x="82" y="48" font-size="12" font-weight="800">C</text><text x="170" y="150" font-size="12" font-weight="800">D</text><text x="262" y="150" font-size="12" font-weight="800">E</text><text x="212" y="48" font-size="12" font-weight="800">F</text><line x1="67" y1="96" x2="75" y2="91" stroke="#dc2626" stroke-width="2"/><line x1="198" y1="96" x2="206" y2="91" stroke="#dc2626" stroke-width="2"/><line x1="105" y1="96" x2="113" y2="91" stroke="#16a34a" stroke-width="2"/><line x1="235" y1="96" x2="243" y2="91" stroke="#16a34a" stroke-width="2"/><path d="M57 127 A18 18 0 0 1 69 114" fill="none" stroke="#f59e0b" stroke-width="2"/><path d="M187 127 A18 18 0 0 1 199 114" fill="none" stroke="#f59e0b" stroke-width="2"/><text x="150" y="181" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">חפיפה לפי צלע-זווית-צלע — סימונים מתאימים</text></svg>';
  const q='לפי הסימונים בשרטוט, האם אפשר להסיק שהמשולשים חופפים? ציינו לפי איזה משפט חפיפה.';
  const a='כן. מסומנות שתי צלעות מתאימות שוות והזווית הכלואה ביניהן שווה. לכן המשולשים חופפים לפי צלע־זווית־צלע.';
  renderCard('G8-07','חפיפת משולשים לפי סימונים',svg,q,a,'geo');
};

TOPICS[8].geometry.push(['G8-08','משולש שווה שוקיים ✦ מקור',1]);
generators['G8-08']=function(){
  const base=[40,50,70][Math.floor(Math.random()*3)], top=(180-base)/2;
  const svg=`<svg class="engine-svg" viewBox="0 0 280 185" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="256" height="155" rx="14" fill="#f0fdf4" stroke="#166534" stroke-width="1.8"/><polygon points="55,135 225,135 140,45" fill="#dcfce7" stroke="#166534" stroke-width="2.5"/><line x1="93" y1="91" x2="101" y2="98" stroke="#dc2626" stroke-width="2.5"/><line x1="179" y1="98" x2="187" y2="91" stroke="#dc2626" stroke-width="2.5"/><path d="M68 132 A24 24 0 0 1 83 113" fill="none" stroke="#f59e0b" stroke-width="2.5"/><path d="M212 132 A24 24 0 0 0 197 113" fill="none" stroke="#f59e0b" stroke-width="2.5"/><text x="60" y="122" font-size="13" font-weight="900">${base}°</text><text x="212" y="122" font-size="13" font-weight="900">?</text><text x="140" y="178" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">במשולש שווה שוקיים זוויות הבסיס שוות</text></svg>`;
  const q=`במשולש שווה שוקיים מסומנות השוקיים כשוות. זווית בסיס אחת היא $${base}^\\circ$. מהי זווית הבסיס השנייה ומהי זווית הראש?`;
  const a=`זוויות הבסיס במשולש שווה שוקיים שוות, לכן הזווית השנייה היא $${base}^\\circ$. סכום זוויות במשולש הוא $180^\\circ$, ולכן זווית הראש היא $180-2\\cdot${base}=${180-2*base}^\\circ$.`;
  renderCard('G8-08','משולש שווה שוקיים',svg,q,a,'geo');
};

TOPICS[8].geometry.push(['G8-09','דמיון וצללים ✦ מקור',1]);
generators['G8-09']=function(){
  const pole=2, poleShadow=1.5, treeShadow=[4.5,6,7.5][Math.floor(Math.random()*3)], h=Math.round(treeShadow*(pole/poleShadow)*10)/10;
  const svg=`<svg class="engine-svg" viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="276" height="160" rx="14" fill="#fff7ed" stroke="#ea580c" stroke-width="1.8"/><line x1="35" y1="145" x2="270" y2="145" stroke="#9a3412" stroke-width="2"/><line x1="70" y1="145" x2="70" y2="95" stroke="#2563eb" stroke-width="5"/><line x1="70" y1="145" x2="120" y2="145" stroke="#6b7280" stroke-width="4"/><line x1="190" y1="145" x2="190" y2="55" stroke="#16a34a" stroke-width="8"/><line x1="190" y1="145" x2="270" y2="145" stroke="#6b7280" stroke-width="4"/><line x1="70" y1="95" x2="120" y2="145" stroke="#dc2626" stroke-width="2"/><line x1="190" y1="55" x2="270" y2="145" stroke="#dc2626" stroke-width="2"/><text x="52" y="89" font-size="12" font-weight="800">2 מ׳</text><text x="80" y="162" font-size="12" font-weight="800">1.5 מ׳</text><text x="198" y="52" font-size="12" font-weight="800">?</text><text x="220" y="162" font-size="12" font-weight="800">${treeShadow} מ׳</text><text x="150" y="181" text-anchor="middle" font-size="11" font-weight="800" fill="#9a3412">משולשים דומים לפי צללים</text></svg>`;
  const q=`עמוד בגובה $2$ מ׳ מטיל צל באורך $1.5$ מ׳. באותו זמן עץ מטיל צל באורך $${treeShadow}$ מ׳. מה גובה העץ?`;
  const a=`באותו זמן מתקבלים משולשים דומים, ולכן היחס גובה/צל שווה: $\\frac{2}{1.5}=\\frac{גובה}{${treeShadow}}$. לכן גובה העץ הוא $${treeShadow}\\cdot\\frac{2}{1.5}=${h}$ מ׳.`;
  renderCard('G8-09','דמיון וצללים',svg,q,a,'geo');
};

TOPICS[8].geometry.push(['G8-10','חפיפה — מה חסר להוכחה ✦ מקור',1]);
generators['G8-10']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="276" height="160" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><polygon points="48,135 130,135 88,55" fill="#dbeafe" stroke="#2563eb" stroke-width="2.4"/><polygon points="178,135 260,135 218,55" fill="#dbeafe" stroke="#2563eb" stroke-width="2.4"/><line x1="67" y1="95" x2="75" y2="90" stroke="#dc2626" stroke-width="2"/><line x1="198" y1="95" x2="206" y2="90" stroke="#dc2626" stroke-width="2"/><line x1="105" y1="95" x2="113" y2="90" stroke="#16a34a" stroke-width="2"/><line x1="235" y1="95" x2="243" y2="90" stroke="#16a34a" stroke-width="2"/><text x="150" y="181" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">מסומנות שתי צלעות בלבד — אין מספיק מידע לחפיפה</text></svg>';
  const q='בשרטוט מסומנות שתי צלעות מתאימות שוות בכל משולש. האם זה מספיק כדי להוכיח חפיפה? אם לא, מה חסר?';
  const a='לא. שתי צלעות בלבד אינן מספיקות להוכחת חפיפה. צריך נתון נוסף מתאים, למשל זווית כלואה שווה כדי להשתמש בצלע־זווית־צלע, או צלע שלישית שווה כדי להשתמש בצלע־צלע־צלע.';
  renderCard('G8-10','חפיפה — מה חסר להוכחה',svg,q,a,'geo');
};

TOPICS[8].geometry.push(['G8-11','דמיון — יחס שטחים והיקפים ✦ מקור',1]);
generators['G8-11']=function(){
  const cases=[[2,3,12],[3,5,18],[4,7,20]], c=cases[Math.floor(Math.random()*cases.length)], a=c[0], b=c[1], per=c[2], bigPer=per*b/a, area=36, bigArea=area*b*b/(a*a);
  const q='שני משולשים דומים ביחס $'+a+':'+b+'$ מהקטן לגדול. היקף הקטן הוא $'+per+'$ ס״מ ושטחו $'+area+'$ סמ״ר. מה היקף הגדול ומה שטחו?';
  const ans='היקפים משתנים לפי יחס הדמיון: $'+per+'\\cdot\\frac{'+b+'}{'+a+'}='+bigPer+'$. שטחים משתנים לפי ריבוע יחס הדמיון: $'+area+'\\cdot(\\frac{'+b+'}{'+a+'})^2='+bigArea+'$. לכן היקף הגדול $'+bigPer+'$ ס״מ ושטחו $'+bigArea+'$ סמ״ר.';
  renderCard('G8-11','דמיון — יחס שטחים והיקפים','',q,ans,'geo');
};
