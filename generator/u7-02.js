TOPICS[7].uncertainty.push(['U7-02','הסתברות בסיסית',1]);
generators['U7-02']=function(){let q='בקופסה יש $3$ כדורים אדומים ו-$7$ כדורים כחולים. שולפים כדור אחד באקראי. מה ההסתברות לכדור אדום?',a='סך הכל יש $10$ כדורים, ומתוכם $3$ אדומים.\n$$P(אדום)=\\frac{3}{10}$$';renderCard('U7-02','הסתברות בסיסית','',q,a,'unc')};

TOPICS[7].uncertainty.push(['U7-05','דיאגרמת עוגה ושכיחות יחסית ✦ מקור',1]);
generators['U7-05']=function(){
  const sets=[{title:'העדפות ספורט',items:[['כדורגל',12],['כדורסל',8],['שחייה',6],['טניס',4]]},{title:'דרך הגעה לבית הספר',items:[['אוטובוס',18],['הליכה',12],['אופניים',6],['רכב',24]]},{title:'חיות מחמד',items:[['כלבים',10],['חתולים',14],['דגים',6],['תוכים',5]]}];
  const s=sets[Math.floor(Math.random()*sets.length)], total=s.items.reduce((a,b)=>a+b[1],0), target=s.items[0], pct=Math.round(target[1]/total*1000)/10, deg=Math.round(target[1]/total*360);
  const legend=s.items.map((x,i)=>'<text x="171" y="'+(62+i*24)+'" font-size="12" font-weight="800" fill="#334155">'+x[0]+': '+x[1]+'</text>').join('');
  const svg='<svg class="engine-svg" viewBox="0 0 292 205" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="178" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><text x="146" y="32" font-size="12" font-weight="900" text-anchor="middle" fill="#334155">דיאגרמת עוגה — '+s.title+'</text><circle cx="86" cy="92" r="52" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><path d="M86 92 L86 40 A52 52 0 0 1 116 134 Z" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>'+legend+'<text x="146" y="181" font-size="11" font-weight="800" text-anchor="middle" fill="#334155">מקור קובץ 06 — דיאגרמת עוגה ושכיחות יחסית</text></svg>';
  const q='בדיאגרמת העוגה מופיעה חלוקה של $'+total+'$ נשאלים. הקטגוריה '+target[0]+' מופיעה '+target[1]+' פעמים. מהי השכיחות היחסית באחוזים ומה גודל הגזרה במעלות?';
  const a='שכיחות יחסית: $'+target[1]+'\\div'+total+'\\approx '+pct+'\\%$. גודל הגזרה בקירוב: $'+target[1]+'\\div'+total+'\\cdot360\\approx '+deg+'^\\circ$.';
  renderCard('U7-05','דיאגרמת עוגה ושכיחות יחסית',svg,q,a,'unc');
};

TOPICS[7].uncertainty.push(['U7-06','תרשים מטעה — ביקורת ✦ מקור',1]);
generators['U7-06']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 292 205" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="178" rx="14" fill="#fff7ed" stroke="#ea580c" stroke-width="1.8"/><text x="146" y="32" font-size="12" font-weight="900" text-anchor="middle" fill="#9a3412">תרשים עמודות מטעה</text><line x1="45" y1="154" x2="245" y2="154" stroke="#9a3412" stroke-width="2"/><line x1="45" y1="154" x2="45" y2="58" stroke="#9a3412" stroke-width="2"/><rect x="70" y="126" width="38" height="28" rx="6" fill="#fed7aa" stroke="#ea580c"/><rect x="128" y="96" width="38" height="58" rx="6" fill="#fed7aa" stroke="#ea580c"/><rect x="186" y="76" width="38" height="78" rx="6" fill="#fed7aa" stroke="#ea580c"/><text x="89" y="118" font-size="11" font-weight="800" text-anchor="middle">48</text><text x="147" y="88" font-size="11" font-weight="800" text-anchor="middle">52</text><text x="205" y="68" font-size="11" font-weight="800" text-anchor="middle">55</text><text x="146" y="181" font-size="11" font-weight="800" text-anchor="middle" fill="#9a3412">הציר האנכי מתחיל מ־45 ולא מ־0</text></svg>';
  const q='התבוננו בתרשים. הוא נראה כאילו יש קפיצה גדולה מאוד בין הערכים. מה עלול להטעות בו וכיצד מתקנים?';
  const a='הציר האנכי מתחיל מ־45 ולא מ־0, ולכן ההבדלים נראים גדולים מדי. מתקנים על ידי התחלה מ־0 או סימון ברור של שבירת ציר וקנה מידה.';
  renderCard('U7-06','תרשים מטעה — ביקורת',svg,q,a,'unc');
};

TOPICS[7].uncertainty.push(['U7-07','טבלת שכיחויות ושכיחות יחסית ✦ מקור',1]);
generators['U7-07']=function(){
  const rows=[['א',9],['ב',12],['ג',6],['ד',3]], total=rows.reduce((s,r)=>s+r[1],0), target=rows[1], pct=target[1]/total*100;
  const table='<table class="tbl"><tr><th>קבוצה</th><th>שכיחות</th></tr>'+rows.map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>').join('')+'</table>';
  const q='לפניכם טבלת שכיחויות. חשבו את השכיחות היחסית של קבוצה '+target[0]+' באחוזים, והסבירו מדוע לא מספיק להסתכל רק על המספר '+target[1]+'.';
  const a='סך הכול: $9+12+6+3=30$. השכיחות היחסית של קבוצה '+target[0]+': $12\\div30=0.4=40\\%$. לא מספיק להסתכל על 12 בלבד, כי שכיחות יחסית תלויה בסך הכול.';
  renderCard('U7-07','טבלת שכיחויות ושכיחות יחסית',table,q,a,'unc');
};

TOPICS[7].uncertainty.push(['U7-08','ממוצע חציון וטווח ✦ מקור',1]);
generators['U7-08']=function(){
  const data=[4,5,5,6,8,9,12], avg=Math.round(data.reduce((a,b)=>a+b,0)/data.length*10)/10, median=6, range=8;
  const q='נתונה רשימת נתונים: $'+data.join(', ')+'$. חשבו ממוצע, חציון וטווח.';
  const a='ממוצע: סכום הנתונים הוא $49$, ולכן $49\\div7=7$. חציון: הערך האמצעי ברשימה המסודרת הוא $6$. טווח: $12-4=8$.';
  renderCard('U7-08','ממוצע חציון וטווח','',q,a,'unc');
};
