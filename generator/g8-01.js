TOPICS[8].geometry.push(['G8-01','עיגול — היקף ושטח',1]);
generators['G8-01']=function(){let r=[3,4,5,6,7,8][Math.floor(Math.random()*6)],q=`עיגול עם רדיוס $${r}$ ס״מ.\nא. חשבו את היקף העיגול.\nב. חשבו את שטח העיגול.`,a=`היקף: $$C=2\\pi r=2\\pi\\cdot${r}=${2*r}\\pi$$\nבקירוב: $${Math.round(2*r*3.14*10)/10}$ ס״מ.\nשטח: $$A=\\pi r^2=\\pi\\cdot${r}^2=${r*r}\\pi$$`,svg=`<svg viewBox="0 0 220 170"><circle cx="110" cy="85" r="55" fill="#fef3c7" stroke="#92400e" stroke-width="2"/><line x1="110" y1="85" x2="165" y2="85" stroke="#92400e" stroke-width="2"/><text x="128" y="78">r=${r}</text></svg>`;renderCard('G8-01','עיגול — היקף ושטח',svg,q,a,'geo')};

TOPICS[8].geometry.push(['G8-05','זווית מרכזית וחלק מעיגול ✦ מקור',1]);
generators['G8-05']=function(){
  const cases=[
    [90,'רבע עיגול',0.25],
    [120,'שליש עיגול',1/3],
    [180,'חצי עיגול',0.5],
    [270,'שלושה רבעים',0.75]
  ];
  const c=cases[Math.floor(Math.random()*cases.length)], deg=c[0], label=c[1], frac=c[2];
  const r=6, area=Math.round(Math.PI*r*r*frac*10)/10, circ=Math.round(2*Math.PI*r*frac*10)/10;
  const endAngle=(-90+deg)*Math.PI/180, x=110+55*Math.cos(endAngle), y=88+55*Math.sin(endAngle), large=deg>180?1:0;
  const svg=`<svg class="engine-svg" viewBox="0 0 260 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="236" height="160" rx="14" fill="#fef3c7" stroke="#92400e" stroke-width="1.8"/><circle cx="110" cy="88" r="55" fill="#fff7ed" stroke="#92400e" stroke-width="2"/><path d="M110 88 L110 33 A55 55 0 ${large} 1 ${x} ${y} Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/><line x1="110" y1="88" x2="165" y2="88" stroke="#92400e" stroke-width="2"/><text x="137" y="80" font-size="12" font-weight="800">r=6</text><text x="118" y="112" font-size="15" font-weight="900" fill="#c2410c">${deg}°</text><text x="130" y="181" font-size="11" font-weight="800" text-anchor="middle" fill="#92400e">זווית מרכזית וחלק מעיגול — מקור קובץ 04</text></svg>`;
  const q=`בעיגול שרדיוסו $6$ ס״מ מסומנת זווית מרכזית של $${deg}^\\circ$. איזה חלק מהעיגול מסומן? חשבו בקירוב גם את שטח הגזרה ואת אורך הקשת.`;
  const a=`החלק הוא $${deg}/360=${frac}$. זהו ${label}. שטח הגזרה בקירוב: $\\pi\\cdot6^2\\cdot${deg}/360\\approx ${area}$ סמ״ר. אורך הקשת: $2\\pi\\cdot6\\cdot${deg}/360\\approx ${circ}$ ס״מ.`;
  renderCard('G8-05','זווית מרכזית וחלק מעיגול',svg,q,a,'geo');
};

TOPICS[8].geometry.push(['G8-06','קוטר רדיוס ומיתר ✦ מקור',1]);
generators['G8-06']=function(){
  const r=[4,5,6,7][Math.floor(Math.random()*4)], d=2*r;
  const svg=`<svg class="engine-svg" viewBox="0 0 260 190" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="236" height="160" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><circle cx="130" cy="88" r="55" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><line x1="75" y1="88" x2="185" y2="88" stroke="#dc2626" stroke-width="3"/><line x1="130" y1="88" x2="185" y2="88" stroke="#1d4ed8" stroke-width="3"/><line x1="93" y1="55" x2="168" y2="122" stroke="#16a34a" stroke-width="2.5"/><text x="151" y="80" font-size="12" font-weight="800">r=${r}</text><text x="104" y="82" font-size="12" font-weight="800" fill="#dc2626">d=?</text><text x="130" y="181" font-size="11" font-weight="800" text-anchor="middle" fill="#334155">קוטר, רדיוס ומיתר — מקור קובץ 04</text></svg>`;
  const q=`בציור רדיוס המעגל הוא $${r}$ ס״מ. מה אורך הקוטר? הסבירו גם מה ההבדל בין קוטר למיתר.`;
  const a=`הקוטר גדול פי 2 מהרדיוס, לכן $d=2r=2\\cdot${r}=${d}$ ס״מ. כל קוטר הוא מיתר שעובר דרך מרכז המעגל; מיתר רגיל אינו חייב לעבור דרך המרכז.`;
  renderCard('G8-06','קוטר רדיוס ומיתר',svg,q,a,'geo');
};
