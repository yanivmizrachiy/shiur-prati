TOPICS[8].algebra.push(['A8-02','שיפוע ומשוואת ישר',1]);
generators['A8-02']=function(){let cases=[['מצאו את שיפוע הישר העובר דרך הנקודות $(2,3)$ ו-$(4,7)$.','נשתמש בנוסחה:\n$$m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{7-3}{4-2}=\\frac{4}{2}=2$$'],['האם ישר עם שיפוע $-3$ עולה או יורד?','שיפוע שלילי מציין ירידה משמאל לימין. לכן הישר יורד.'],['ישר עם שיפוע $2$ עובר דרך $(1,5)$. מצאו את $b$ במשוואה $y=2x+b$.','מציבים את הנקודה.\n$$5=2\\cdot1+b$$\n$$b=3$$\nמשוואת הישר: $y=2x+3$.']],c=cases[Math.floor(Math.random()*cases.length)];renderCard('A8-02','שיפוע ומשוואת ישר','',c[0],c[1],'alg')};

TOPICS[8].algebra.push(['A8-07','קריאת גרף קווי בהקשר ✦ מקור',1]);
generators['A8-07']=function(){
  const cases=[
    {title:'חימום מים',x:'זמן בדקות',y:'טמפרטורה',p:[[40,130],[95,105],[150,80],[205,55]],q:'בגרף מתוארת טמפרטורת מים בזמן חימום. באיזה שלב הטמפרטורה עולה בקצב הגדול ביותר?',a:'הקצב הגדול ביותר נראה בקטע התלול ביותר. בגרף כל הקטעים עולים בקצב קבוע בערך, ולכן קצב העלייה דומה לאורך כל המדידה.'},
    {title:'מרחק מהבית',x:'זמן',y:'מרחק',p:[[40,130],[90,90],[145,90],[210,50]],q:'בגרף מתואר מרחק מהבית לאורך זמן. באיזה קטע האדם עמד במקום?',a:'כאשר הגרף אופקי, המרחק לא משתנה. לכן האדם עמד במקום בקטע האמצעי.'},
    {title:'מילוי מכל',x:'זמן',y:'כמות מים',p:[[40,135],[100,110],[160,82],[220,82]],q:'הגרף מתאר מילוי מכל. מה משמעות הקטע האופקי בסוף?',a:'קטע אופקי פירושו שהכמות לא משתנה. לכן בסוף המילוי נעצר או שהמכל כבר אינו מתמלא.'}
  ];
  const c=cases[Math.floor(Math.random()*cases.length)];
  const pts=c.p.map(p=>p.join(',')).join(' ');
  const svg='<svg class="engine-svg" viewBox="0 0 292 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="268" height="160" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><text x="146" y="30" font-size="13" font-weight="900" text-anchor="middle" fill="#334155">'+c.title+'</text><line x1="40" y1="140" x2="240" y2="140" stroke="#334155" stroke-width="2"/><line x1="40" y1="140" x2="40" y2="42" stroke="#334155" stroke-width="2"/><polyline points="'+pts+'" fill="none" stroke="#dc2626" stroke-width="3"/><text x="142" y="164" font-size="11" font-weight="800" text-anchor="middle">'+c.x+'</text><text x="22" y="88" font-size="11" font-weight="800" text-anchor="middle" transform="rotate(-90 22 88)">'+c.y+'</text><text x="146" y="184" font-size="10.5" font-weight="800" text-anchor="middle" fill="#334155">גרפים יישומיים</text></svg>';
  renderCard('A8-07','קריאת גרף קווי בהקשר',svg,c.q,c.a,'alg');
};

TOPICS[8].algebra.push(['A8-08','התאמת גרף לסיפור ✦ מקור',1]);
generators['A8-08']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 292 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="268" height="160" rx="14" fill="#f0fdf4" stroke="#166534" stroke-width="1.8"/><line x1="42" y1="140" x2="242" y2="140" stroke="#166534" stroke-width="2"/><line x1="42" y1="140" x2="42" y2="42" stroke="#166534" stroke-width="2"/><polyline points="42,130 95,80 150,80 220,115" fill="none" stroke="#2563eb" stroke-width="3"/><text x="146" y="164" font-size="11" font-weight="800" text-anchor="middle">זמן</text><text x="22" y="88" font-size="11" font-weight="800" text-anchor="middle" transform="rotate(-90 22 88)">מרחק מהבית</text><text x="146" y="184" font-size="10.5" font-weight="800" text-anchor="middle" fill="#166534">עלייה · עצירה · חזרה חלקית</text></svg>';
  const q='איזה סיפור מתאים לגרף: א. אדם הולך מהר מהבית, עומד במקום, ואז חוזר חלק מהדרך. ב. אדם עומד במקום כל הזמן. ג. אדם מתרחק בקצב קבוע בלי לעצור. נמקו.';
  const a='הסיפור המתאים הוא א. בהתחלה המרחק גדל, אחר כך הגרף אופקי ולכן האדם עומד במקום, ובסוף המרחק קטן ולכן הוא חוזר חלק מהדרך.';
  renderCard('A8-08','התאמת גרף לסיפור',svg,q,a,'alg');
};
