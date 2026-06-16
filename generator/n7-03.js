TOPICS[7].numeric.push(['N7-03','מספרים שליליים — ציר',1]);
generators['N7-03']=function(){let cases=[['סדרו מהקטן לגדול:\n$3, -5, 0, -1, 7$','על ציר המספרים הקטן נמצא שמאלה יותר.\n$$-5<-1<0<3<7$$'],['האם הטענה נכונה? $-4>-2$','לא נכון. $-4$ קטן מ-$-2$, כי הוא רחוק יותר מאפס שמאלה.'],['חשבו: $|-7|$ וכתבו את המספר ההפוך של $-5$','ערך מוחלט הוא מרחק מאפס: $$|-7|=7$$\nהמספר ההפוך של $-5$ הוא $5$.'],['השלימו את הסדרה:\n$-6, -3, __, 3$','הקפיצה היא $3$.\n$$-6,-3,0,3$$']],c=cases[Math.floor(Math.random()*cases.length)];renderCard('N7-03','מספרים שליליים על ציר','',c[0],c[1],'num')};

TOPICS[7].numeric.push(['N7-08','ציר מספרים והשוואת שליליים ✦ מקור',1]);
generators['N7-08']=function(){
  const pairs=[[-8,-3],[-6,2],[-10,-12],[-1,0],[4,-5]], p=pairs[Math.floor(Math.random()*pairs.length)], a=p[0], b=p[1];
  const smaller=Math.min(a,b), greater=Math.max(a,b);
  const x1=60+(a+12)*7, x2=60+(b+12)*7;
  const svg='<svg class="engine-svg" viewBox="0 0 292 150" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="118" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><line x1="50" y1="80" x2="242" y2="80" stroke="#2563eb" stroke-width="2.5"/><text x="50" y="105" font-size="10" text-anchor="middle">-12</text><text x="134" y="105" font-size="10" text-anchor="middle">0</text><text x="242" y="105" font-size="10" text-anchor="middle">12</text><circle cx="'+x1+'" cy="80" r="6" fill="#dc2626"/><circle cx="'+x2+'" cy="80" r="6" fill="#16a34a"/><text x="'+x1+'" y="63" font-size="12" font-weight="800" text-anchor="middle">'+a+'</text><text x="'+x2+'" y="63" font-size="12" font-weight="800" text-anchor="middle">'+b+'</text><text x="146" y="135" font-size="11" font-weight="800" text-anchor="middle" fill="#334155">מספרים מכוונים וציר המספרים</text></svg>';
  const q='השוו בין $'+a+'$ לבין $'+b+'$. מי קטן יותר? הסבירו בעזרת ציר המספרים.';
  const ans='על ציר המספרים המספר שנמצא שמאלה יותר הוא הקטן יותר. לכן $'+smaller+'<'+greater+'$.';
  renderCard('N7-08','ציר מספרים והשוואת שליליים',svg,q,ans,'num');
};

TOPICS[7].numeric.push(['N7-09','מספר נגדי וערך מוחלט בהקשר ✦ מקור',1]);
generators['N7-09']=function(){
  const cases=[['טמפרטורה ירדה ל-$-7^\\circ$ ואז עלתה לערך הנגדי שלה. מהו הערך הנגדי ומה המרחק מ־0?',-7,7],['מעלית נמצאת בקומה $-4$. מה הקומה הנגדית ומה המרחק מאפס?',-4,4],['חוב של $-12$ שקלים נרשם כמספר מכוון. מה המספר הנגדי ומה ערכו המוחלט?',-12,12]], c=cases[Math.floor(Math.random()*cases.length)];
  const q=c[0];
  const a='המספר הנגדי של $'+c[1]+'$ הוא $'+(-c[1])+'$. הערך המוחלט הוא המרחק מ־0, ולכן $|'+c[1]+'|='+c[2]+'$.';
  renderCard('N7-09','מספר נגדי וערך מוחלט בהקשר','',q,a,'num');
};
