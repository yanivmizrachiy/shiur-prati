TOPICS[7].uncertainty.push(['U7-02','הסתברות בסיסית',1]);
generators['U7-02']=function(){let q='בקופסה יש $3$ כדורים אדומים ו-$7$ כדורים כחולים. שולפים כדור אחד באקראי. מה ההסתברות לכדור אדום?',a='סך הכל יש $10$ כדורים, ומתוכם $3$ אדומים.\n$$P(אדום)=\\frac{3}{10}$$';renderCard('U7-02','הסתברות בסיסית','',q,a,'unc')};

TOPICS[7].uncertainty.push(['U7-05','דיאגרמת עוגה ושכיחות יחסית ✦ מקור',1]);
generators['U7-05']=function(){
  const data=[['כדורגל',12],['כדורסל',8],['שחייה',6],['טניס',4]], total=30, part=12, pct=40, deg=144;
  const svg='<svg class="engine-svg" viewBox="0 0 292 205" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="178" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/><text x="146" y="32" font-size="12" font-weight="900" text-anchor="middle" fill="#334155">דיאגרמת עוגה — העדפות ספורט</text><circle cx="86" cy="92" r="52" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><path d="M86 92 L86 40 A52 52 0 0 1 116 134 Z" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/><text x="171" y="62" font-size="12" font-weight="800" fill="#334155">כדורגל: 12</text><text x="171" y="86" font-size="12" font-weight="800" fill="#334155">כדורסל: 8</text><text x="171" y="110" font-size="12" font-weight="800" fill="#334155">שחייה: 6</text><text x="171" y="134" font-size="12" font-weight="800" fill="#334155">טניס: 4</text><text x="146" y="181" font-size="11" font-weight="800" text-anchor="middle" fill="#334155">מקור קובץ 06 — דיאגרמת עוגה ושכיחות יחסית</text></svg>';
  const q='בדיאגרמת העוגה מופיעה חלוקה של $30$ תלמידים. $12$ תלמידים בחרו כדורגל. מהי השכיחות היחסית באחוזים ומה גודל הגזרה במעלות?';
  const a='שכיחות יחסית: $12\\div30=0.4=40\\%$. גודל הגזרה: $0.4\\cdot360=144^\\circ$.';
  renderCard('U7-05','דיאגרמת עוגה ושכיחות יחסית',svg,q,a,'unc');
};

TOPICS[7].uncertainty.push(['U7-06','תרשים מטעה — ביקורת ✦ מקור',1]);
generators['U7-06']=function(){
  const svg='<svg class="engine-svg" viewBox="0 0 292 205" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="264" height="178" rx="14" fill="#fff7ed" stroke="#ea580c" stroke-width="1.8"/><text x="146" y="32" font-size="12" font-weight="900" text-anchor="middle" fill="#9a3412">תרשים עמודות מטעה</text><line x1="45" y1="154" x2="245" y2="154" stroke="#9a3412" stroke-width="2"/><line x1="45" y1="154" x2="45" y2="58" stroke="#9a3412" stroke-width="2"/><rect x="70" y="126" width="38" height="28" rx="6" fill="#fed7aa" stroke="#ea580c"/><rect x="128" y="96" width="38" height="58" rx="6" fill="#fed7aa" stroke="#ea580c"/><rect x="186" y="76" width="38" height="78" rx="6" fill="#fed7aa" stroke="#ea580c"/><text x="89" y="118" font-size="11" font-weight="800" text-anchor="middle">48</text><text x="147" y="88" font-size="11" font-weight="800" text-anchor="middle">52</text><text x="205" y="68" font-size="11" font-weight="800" text-anchor="middle">55</text><text x="146" y="181" font-size="11" font-weight="800" text-anchor="middle" fill="#9a3412">הציר האנכי מתחיל מ־45 ולא מ־0</text></svg>';
  const q='התבוננו בתרשים. הוא נראה כאילו יש קפיצה גדולה מאוד בין הערכים. מה עלול להטעות בו וכיצד מתקנים?';
  const a='הציר האנכי מתחיל מ־45 ולא מ־0, ולכן ההבדלים נראים גדולים מדי. מתקנים על ידי התחלה מ־0 או סימון ברור של שבירת ציר וקנה מידה.';
  renderCard('U7-06','תרשים מטעה — ביקורת',svg,q,a,'unc');
};
