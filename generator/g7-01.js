TOPICS[7].geometry.push(['G7-01','מלבן ותיבה',1]);
generators['G7-01']=function(){let type=Math.random()<.5?'rect':'box',q,a,svg;if(type==='rect'){q='מלבן באורך $8$ ס״מ וברוחב $5$ ס״מ.\nא. חשבו היקף.\nב. חשבו שטח.';a='היקף: $$2(8+5)=26$$\nשטח: $$8\\cdot5=40$$';svg='<svg viewBox="0 0 220 150"><rect x="40" y="35" width="140" height="80" fill="#edf2ff" stroke="#4361ee" stroke-width="2"/><text x="100" y="132">8 ס״מ</text><text x="15" y="80">5 ס״מ</text></svg>'}else{q='תיבה במידות $3\\cdot4\\cdot5$ ס״מ.\nא. חשבו נפח.\nב. חשבו שטח פנים.';a='נפח: $$3\\cdot4\\cdot5=60$$\nשטח פנים: $$2(3\\cdot4+3\\cdot5+4\\cdot5)=94$$';svg='<svg viewBox="0 0 220 160"><polygon points="55,125 150,125 150,60 55,60" fill="#edf2ff" stroke="#4361ee"/><polygon points="80,35 175,35 150,60 55,60" fill="#dbeafe" stroke="#4361ee"/><polygon points="150,125 175,100 175,35 150,60" fill="#bfdbfe" stroke="#4361ee"/><text x="95" y="145">4</text><text x="38" y="95">5</text><text x="165" y="118">3</text></svg>'}renderCard('G7-01','מלבן ותיבה',svg,q,a,'geo')};

TOPICS[7].geometry.push(['G7-07','פריסת תיבה וזיהוי פאות ✦ מקור',1]);
generators['G7-07']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 300 205" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="276" height="175" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><rect x="95" y="78" width="50" height="38" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><rect x="145" y="78" width="50" height="38" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><rect x="195" y="78" width="50" height="38" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><rect x="45" y="78" width="50" height="38" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><rect x="95" y="40" width="50" height="38" fill="#e0f2fe" stroke="#2563eb" stroke-width="2"/><rect x="95" y="116" width="50" height="38" fill="#e0f2fe" stroke="#2563eb" stroke-width="2"/><text x="120" y="101" font-size="13" font-weight="900" text-anchor="middle">בסיס</text><text x="120" y="32" font-size="12" font-weight="800" text-anchor="middle">מכסה</text><text x="150" y="190" font-size="11" font-weight="800" text-anchor="middle" fill="#334155">פריסות ונפח</text></svg>';
  const q='בפריסה של תיבה מופיעות $6$ פאות. כמה פאות מלבניות יש לתיבה, ומה צריך לקרות בפריסה כדי שתוכל להיסגר לתיבה?';
  const a='לתיבה יש $6$ פאות מלבניות: בסיס, מכסה וארבע פאות צד. בפריסה תקינה הפאות צריכות להיות מחוברות כך שכל פאה צדדית תתחבר לבסיס או לפאה מתאימה, בלי חפיפה ובלי פאה חסרה.';
  renderCard('G7-07','פריסת תיבה וזיהוי פאות',svg,q,a,'geo');
};

TOPICS[7].geometry.push(['G7-08','נפח תיבה מתוך פריסה ✦ מקור',1]);
generators['G7-08']=function(){
  const cases=[
    [3,4,5],[2,6,7],[4,5,8],[3,6,9]
  ];
  const c=cases[Math.floor(Math.random()*cases.length)], l=c[0], w=c[1], h=c[2], v=l*w*h, s=2*(l*w+l*h+w*h);
  const svg='<svg class="engine-svg" viewBox="0 0 280 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="256" height="160" rx="14" fill="#f0fdf4" stroke="#166534" stroke-width="1.8"/><polygon points="70,130 175,130 175,70 70,70" fill="#dcfce7" stroke="#166534" stroke-width="2"/><polygon points="95,45 200,45 175,70 70,70" fill="#bbf7d0" stroke="#166534" stroke-width="2"/><polygon points="175,130 200,105 200,45 175,70" fill="#86efac" stroke="#166534" stroke-width="2"/><text x="116" y="148" font-size="12" font-weight="900">'+w+' ס״מ</text><text x="45" y="103" font-size="12" font-weight="900">'+h+' ס״מ</text><text x="188" y="128" font-size="12" font-weight="900">'+l+' ס״מ</text><text x="140" y="182" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">נפח ושטח פנים של תיבה</text></svg>';
  const q='תיבה במידות $'+l+'\\cdot'+w+'\\cdot'+h+'$ ס״מ. חשבו נפח ושטח פנים.';
  const a='נפח תיבה: $'+l+'\\cdot'+w+'\\cdot'+h+'='+v+'$ סמ״ק. שטח פנים: $2('+l+'\\cdot'+w+'+'+l+'\\cdot'+h+'+'+w+'\\cdot'+h+')='+s+'$ סמ״ר.';
  renderCard('G7-08','נפח תיבה מתוך פריסה',svg,q,a,'geo');
};
