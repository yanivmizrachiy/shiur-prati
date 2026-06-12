TOPICS[7].geometry.push(['G7-02','שטחי צורות שטוחות',1]);
generators['G7-02']=function(){let cases=[['משולש',8,5,20,'$$A=\\frac{8\\cdot5}{2}=20$$'],['מקבילית',9,4,36,'$$A=9\\cdot4=36$$'],['טרפז',6,4,32,'$$A=\\frac{(6+10)\\cdot4}{2}=32$$']],c=cases[Math.floor(Math.random()*cases.length)],q,svg;if(c[0]==='משולש'){q=`חשבו שטח משולש עם בסיס $8$ ס״מ וגובה $5$ ס״מ.`;svg='<svg viewBox="0 0 220 160"><polygon points="30,130 190,130 110,35" fill="#dcfce7" stroke="#166534" stroke-width="2"/><line x1="110" y1="35" x2="110" y2="130" stroke="#166534" stroke-dasharray="4"/><text x="100" y="148">b=8</text><text x="116" y="85">h=5</text></svg>'}else if(c[0]==='מקבילית'){q=`חשבו שטח מקבילית עם בסיס $9$ ס״מ וגובה $4$ ס״מ.`;svg='<svg viewBox="0 0 220 160"><polygon points="55,130 175,130 140,45 20,45" fill="#dcfce7" stroke="#166534" stroke-width="2"/><line x1="140" y1="45" x2="140" y2="130" stroke="#166534" stroke-dasharray="4"/><text x="100" y="148">b=9</text><text x="146" y="90">h=4</text></svg>'}else{q=`חשבו שטח טרפז עם בסיסים $6$ ו-$10$ ס״מ וגובה $4$ ס״מ.`;svg='<svg viewBox="0 0 220 160"><polygon points="50,130 170,130 140,55 80,55" fill="#dcfce7" stroke="#166534" stroke-width="2"/><line x1="110" y1="55" x2="110" y2="130" stroke="#166534" stroke-dasharray="4"/><text x="100" y="48">b1=6</text><text x="100" y="148">b2=10</text><text x="116" y="95">h=4</text></svg>'}renderCard('G7-02','שטחי צורות שטוחות',svg,q,c[4]+'\nתשובה: $'+c[3]+'$ סמ״ר.','geo')};

TOPICS[7].geometry.push(['G7-05','הזזות שיקופים וסיבובים ✦ מקור',1]);
generators['G7-05']=function(){
  const cases=[
    ['שיקוף','<svg class="engine-svg" viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="236" height="145" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><line x1="130" y1="25" x2="130" y2="145" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="5 4"/><polygon points="68,120 104,120 86,70" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><polygon points="192,120 156,120 174,70" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="130" y="164" text-anchor="middle" font-size="11" font-weight="800">שיקוף ביחס לישר</text></svg>','הצורה השנייה היא תמונת ראי של הראשונה ביחס לישר האדום. לכן זו טרנספורמציית שיקוף.'],
    ['הזזה','<svg class="engine-svg" viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="236" height="145" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><polygon points="50,110 84,110 67,70" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><polygon points="150,110 184,110 167,70" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><line x1="92" y1="90" x2="140" y2="90" stroke="#dc2626" stroke-width="3" marker-end="url(#arr)"/><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#dc2626"/></marker></defs><text x="130" y="164" text-anchor="middle" font-size="11" font-weight="800">אותה צורה — הוזזה ימינה</text></svg>','הצורה לא התהפכה ולא הסתובבה; כל נקודה זזה באותו כיוון ובאותו מרחק. לכן זו הזזה.'],
    ['סיבוב','<svg class="engine-svg" viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="236" height="145" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><circle cx="130" cy="88" r="4" fill="#dc2626"/><polygon points="92,120 125,120 108,80" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><polygon points="168,55 168,88 128,72" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><path d="M104 62 A44 44 0 0 1 164 64" fill="none" stroke="#dc2626" stroke-width="2.5"/><text x="130" y="164" text-anchor="middle" font-size="11" font-weight="800">סיבוב סביב נקודה</text></svg>','הצורה שמרה על גודלה אך שינתה כיוון סביב נקודה קבועה. לכן זו טרנספורמציית סיבוב.']
  ];
  const c=cases[Math.floor(Math.random()*cases.length)];
  const q='איזו טרנספורמציה מוצגת בשרטוט: הזזה, שיקוף או סיבוב? נמקו.';
  renderCard('G7-05','הזזות שיקופים וסיבובים',c[1],q,'התשובה: '+c[0]+'. '+c[2],'geo');
};

TOPICS[7].geometry.push(['G7-06','שטח צורה מורכבת ✦ מקור',1]);
generators['G7-06']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="236" height="145" rx="14" fill="#f0fdf4" stroke="#166534" stroke-width="1.8"/><rect x="50" y="45" width="150" height="90" fill="#bbf7d0" stroke="#166534" stroke-width="2"/><rect x="130" y="45" width="70" height="38" fill="#ffffff" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/><text x="112" y="150" font-size="12" font-weight="800">15 ס״מ</text><text x="30" y="95" font-size="12" font-weight="800">9 ס״מ</text><text x="159" y="38" font-size="12" font-weight="800" fill="#dc2626">7×4</text><text x="130" y="164" text-anchor="middle" font-size="11" font-weight="800">שטח מלבן פחות מלבן חסר</text></svg>';
  const q='בציור מלבן שמידותיו $15$ ס״מ על $9$ ס״מ, וממנו הוציאו מלבן שמידותיו $7$ ס״מ על $4$ ס״מ. חשבו את שטח הצורה הירוקה.';
  const a='שטח המלבן הגדול: $15\\cdot9=135$. שטח החלק החסר: $7\\cdot4=28$. לכן שטח הצורה: $135-28=107$ סמ״ר.';
  renderCard('G7-06','שטח צורה מורכבת',svg,q,a,'geo');
};

TOPICS[7].geometry.push(['G7-09','פיתגורס בבעיה מצוירת ✦ מקור',1]);
generators['G7-09']=function(){
  const cases=[[6,8,10],[5,12,13],[9,12,15],[8,15,17]], c=cases[Math.floor(Math.random()*cases.length)], a=c[0], b=c[1], h=c[2];
  const svg='<svg class="engine-svg" viewBox="0 0 270 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="246" height="160" rx="14" fill="#f0f9ff" stroke="#0369a1" stroke-width="1.8"/><polygon points="70,135 210,135 70,45" fill="#bae6fd" stroke="#0369a1" stroke-width="2"/><rect x="70" y="122" width="13" height="13" fill="none" stroke="#0369a1" stroke-width="2"/><text x="135" y="153" font-size="12" font-weight="900">'+b+'</text><text x="48" y="92" font-size="12" font-weight="900">'+a+'</text><text x="148" y="82" font-size="12" font-weight="900" fill="#dc2626">?</text><text x="135" y="182" text-anchor="middle" font-size="11" font-weight="800" fill="#075985">משולש ישר־זווית — משפט פיתגורס</text></svg>';
  const q='בסולם/מסלול מתקבל משולש ישר־זווית. הניצבים הם $'+a+'$ ו־$'+b+'$ מטר. מצאו את אורך היתר.';
  const ans='לפי משפט פיתגורס: $a^2+b^2=c^2$. לכן $'+a+'^2+'+b+'^2='+h+'^2$, ומכאן אורך היתר הוא $'+h+'$ מטר.';
  renderCard('G7-09','פיתגורס בבעיה מצוירת',svg,q,ans,'geo');
};

TOPICS[7].geometry.push(['G7-10','זוויות סביב ישר ונקודה ✦ מקור',1]);
generators['G7-10']=function(){
  const cases=[[65,115],[72,108],[43,137],[120,60]], c=cases[Math.floor(Math.random()*cases.length)], x=c[0], y=c[1];
  const svg='<svg class="engine-svg" viewBox="0 0 270 170" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="246" height="138" rx="14" fill="#fff7ed" stroke="#ea580c" stroke-width="1.8"/><line x1="45" y1="105" x2="225" y2="105" stroke="#9a3412" stroke-width="3"/><line x1="135" y1="105" x2="190" y2="45" stroke="#9a3412" stroke-width="3"/><path d="M90 105 A45 45 0 0 1 162 74" fill="none" stroke="#dc2626" stroke-width="2"/><path d="M162 74 A45 45 0 0 1 180 105" fill="none" stroke="#16a34a" stroke-width="2"/><text x="113" y="78" font-size="13" font-weight="900" fill="#dc2626">'+x+'°</text><text x="178" y="87" font-size="13" font-weight="900" fill="#16a34a">?</text><text x="135" y="162" text-anchor="middle" font-size="11" font-weight="800" fill="#9a3412">זוויות צמודות על ישר משלימות ל־180°</text></svg>';
  const q='בשרטוט זווית אחת על ישר היא $'+x+'^\\circ$. מה גודל הזווית הצמודה לה?';
  const ans='זוויות צמודות על ישר משלימות ל־$180^\\circ$. לכן $180-'+x+'='+y+'$. הזווית החסרה היא $'+y+'^\\circ$.';
  renderCard('G7-10','זוויות סביב ישר ונקודה',svg,q,ans,'geo');
};
