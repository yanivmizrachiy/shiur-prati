(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  E.rightTriangleSvg = function(params, unknown){
    const T = E.themes.geometry;
    const W=250,H=180,p=34;
    // Orientation variation: the right angle can sit at any of the four corners,
    // so worksheets don't repeat the same drawing with different numbers.
    const mx = E.pick([0,1]), my = E.pick([0,1]);
    const sx = mx?-1:1, sy = my?-1:1;
    function FX(x){ return mx ? W-x : x; }
    function FY(y){ return my ? H-y : y; }
    const Ax=FX(p), Ay=FY(p+8), Bx=FX(p), By=FY(H-p), Cx=FX(W-p), Cy=FY(H-p);
    const a = params.a == null ? '?' : params.a + ' ס״מ';
    const b = params.b == null ? '?' : params.b + ' ס״מ';
    const c = params.c == null ? '?' : params.c + ' ס״מ';
    const ca = unknown==='a'?T.unknown:T.given;
    const cb = unknown==='b'?T.unknown:T.given;
    const cc = unknown==='c'?T.unknown:T.given;
    const midX=(Ax+Cx)/2, midY=(Ay+Cy)/2;
    const hx = midX + (midX-Bx)*0.24, hy = midY + (midY-By)*0.24;
    let ang = Math.atan2(Cy-Ay, Cx-Ax)*180/Math.PI;
    if(ang>90) ang-=180; if(ang<-90) ang+=180;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <polyline points="${Bx+12*sx},${By} ${Bx+12*sx},${By-12*sy} ${Bx},${By-12*sy}" fill="none" stroke="${T.stroke}" stroke-width="1.8"/>
      <text x="${Bx-22*sx}" y="${(Ay+By)/2+6}" fill="${ca}" font-size="14" font-weight="800" text-anchor="middle">${a}</text>
      <text x="${(Bx+Cx)/2}" y="${my ? By-13 : By+21}" fill="${cb}" font-size="14" font-weight="800" text-anchor="middle">${b}</text>
      <text x="${hx}" y="${hy}" fill="${cc}" font-size="14" font-weight="800" text-anchor="middle" transform="rotate(${Math.round(ang)} ${hx} ${hy})">${c}</text>
    </svg>`;
  };
  E.rectangleDiagonalSvg = function(r){
    const T = E.themes.geometry;
    const W=250,H=155,p=32,x1=p,y1=p,x2=W-p,y2=H-p;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="6" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5"/>
      <line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y1}" stroke="${T.unknown}" stroke-width="3"/>
      <text x="${(x1+x2)/2}" y="${y2+21}" fill="${T.given}" font-size="13" font-weight="800" text-anchor="middle">${r.w} ס״מ</text>
      <text x="${x1-18}" y="${(y1+y2)/2}" fill="${T.given}" font-size="13" font-weight="800" text-anchor="middle">${r.h} ס״מ</text>
      <text x="${(x1+x2)/2+14}" y="${(y1+y2)/2-8}" fill="${T.unknown}" font-size="14" font-weight="800" text-anchor="middle">?</text>
    </svg>`;
  };
  E.scaleMapSvg = function(params, unknown){
    const T = E.themes.geometry;
    const W=270,H=150,x1=42,x2=214,y=82;
    const mapLabel = unknown==='map' ? '?' : params.map + ' ס״מ';
    const realLabel = unknown==='real' ? '?' : params.real;
    const scaleLabel = unknown==='scale' ? 'קנה מידה ?' : 'קנה מידה 1 ל־' + params.scale;
    const mapColor = unknown==='map' ? T.unknown : T.given;
    const realColor = unknown==='real' ? T.unknown : T.given;
    const scaleColor = unknown==='scale' ? T.unknown : T.label;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="20" width="226" height="104" rx="12" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.3"/>
      <path d="M42 50 C72 28, 104 60, 134 42 S200 40, 226 66" fill="none" stroke="${T.helper}" stroke-width="2" stroke-dasharray="5 5"/>
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${T.stroke}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${x1}" cy="${y}" r="7" fill="${T.stroke}"/>
      <circle cx="${x2}" cy="${y}" r="7" fill="${T.stroke}"/>
      <text x="${(x1+x2)/2}" y="${y-13}" fill="${mapColor}" font-size="14" font-weight="800" text-anchor="middle">${mapLabel}</text>
      <text x="${(x1+x2)/2}" y="${y+30}" fill="${realColor}" font-size="14" font-weight="800" text-anchor="middle">${realLabel}</text>
      <text x="135" y="137" fill="${scaleColor}" font-size="13" font-weight="800" text-anchor="middle">${scaleLabel}</text>
    </svg>`;
  };
  E.ratioBarSvg = function(params, unknown){
    const T = E.themes.geometry;
    const W=340,H=190,barRight=260,y1=62,y2=116,maxW=190;
    const r1 = Math.max(1, params.r1 || 1);
    const r2 = Math.max(1, params.r2 || 1);
    const maxR = Math.max(r1, r2);
    const w1 = Math.max(42, Math.round(maxW * r1 / maxR));
    const w2 = Math.max(42, Math.round(maxW * r2 / maxR));
    const x1 = barRight - w1;
    const x2 = barRight - w2;
    function esc(v){
      return String(v == null ? '' : v)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }
    function value(v, isUnknown){
      if(isUnknown) return '?';
      const suffix = params.unit ? ' ' + params.unit : '';
      return String(v) + suffix;
    }
    function label(name){
      return params.measure ? params.measure + ' ' + name : name;
    }
    const leftValue = unknown === 'missing' && params.knownSide === 'right' ? '?' : (params.a || params.known || r1);
    const rightValue = unknown === 'missing' && params.knownSide === 'left' ? '?' : (params.b || params.missing || r2);
    const leftColor = unknown === 'missing' && params.knownSide === 'right' ? T.unknown : T.given;
    const rightColor = unknown === 'missing' && params.knownSide === 'left' ? T.unknown : T.given;
    const leftUnknown = leftValue === '?';
    const rightUnknown = rightValue === '?';
    const tickStroke = '#d8e0ea';
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="18" width="300" height="150" rx="8" fill="${T.fill}" stroke="${T.stroke}" stroke-width="1.8"/>
      <line x1="${barRight}" y1="48" x2="${barRight}" y2="146" stroke="${tickStroke}" stroke-width="1"/>
      <rect x="${x1}" y="${y1}" width="${w1}" height="26" rx="3" fill="${T.helper}" opacity="0.62" stroke="${T.stroke}" stroke-width="0.8"/>
      <rect x="${x2}" y="${y2}" width="${w2}" height="26" rx="3" fill="${T.stroke}" opacity="0.72" stroke="${T.stroke}" stroke-width="0.8"/>
      <text x="${Math.max(36,x1-12)}" y="${y1+17}" fill="${leftColor}" font-size="13" font-weight="600" text-anchor="end" direction="rtl" unicode-bidi="plaintext">${esc(value(leftValue,leftUnknown))}</text>
      <text x="${Math.max(36,x2-12)}" y="${y2+17}" fill="${rightColor}" font-size="13" font-weight="600" text-anchor="end" direction="rtl" unicode-bidi="plaintext">${esc(value(rightValue,rightUnknown))}</text>
      <text x="304" y="${y1+17}" fill="${T.label}" font-size="12" font-weight="500" text-anchor="end" direction="rtl" unicode-bidi="plaintext">${esc(label(params.left || 'חלק א'))}</text>
      <text x="304" y="${y2+17}" fill="${T.label}" font-size="12" font-weight="500" text-anchor="end" direction="rtl" unicode-bidi="plaintext">${esc(label(params.right || 'חלק ב'))}</text>
      <text x="170" y="181" fill="${T.label}" font-size="12" font-weight="500" text-anchor="middle" direction="rtl" unicode-bidi="plaintext">יחס ${r1} ל־${r2}</text>
    </svg>`;
  };
  E.proportionTableSvg = function(params, unknown){
    const T = E.themes.geometry;
    const W=270,H=154,x=32,y=27,cw=86,ch=38;
    const firstTop = params.a == null ? params.unitA || 'כמות' : params.a;
    const firstBottom = params.b == null ? params.unitB || 'זמן' : params.b;
    const secondTop = unknown === 'c' || unknown === 'result' ? '?' : (params.c || params.result || '');
    const secondBottom = unknown === 'd' ? '?' : (params.d || params.target || '');
    const topColor = unknown === 'c' || unknown === 'result' ? T.unknown : T.given;
    const bottomColor = unknown === 'd' ? T.unknown : T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="16" width="230" height="120" rx="12" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.2"/>
      <rect x="${x}" y="${y}" width="${cw*2}" height="${ch*2}" rx="8" fill="#fff" stroke="${T.stroke}" stroke-width="2"/>
      <line x1="${x+cw}" y1="${y}" x2="${x+cw}" y2="${y+ch*2}" stroke="${T.stroke}" stroke-width="2"/>
      <line x1="${x}" y1="${y+ch}" x2="${x+cw*2}" y2="${y+ch}" stroke="${T.stroke}" stroke-width="2"/>
      <text x="${x+cw/2}" y="${y+25}" fill="${T.given}" font-size="15" font-weight="800" text-anchor="middle">${firstTop}</text>
      <text x="${x+cw+cw/2}" y="${y+25}" fill="${topColor}" font-size="15" font-weight="800" text-anchor="middle">${secondTop}</text>
      <text x="${x+cw/2}" y="${y+ch+25}" fill="${T.given}" font-size="15" font-weight="800" text-anchor="middle">${firstBottom}</text>
      <text x="${x+cw+cw/2}" y="${y+ch+25}" fill="${bottomColor}" font-size="15" font-weight="800" text-anchor="middle">${secondBottom}</text>
      <text x="135" y="126" fill="${T.label}" font-size="12" font-weight="800" text-anchor="middle">${params.thing || 'פרופורציה'}</text>
    </svg>`;
  };
  E.percentChangeSvg = function(params, unknown){
    const T = E.themes.geometry;
    const W=270,H=154,x1=42,x2=134,x3=226,y=78;
    const hasMid = params.mid != null;
    const midX = hasMid ? x2 : x3;
    const baseLabel = unknown === 'base' ? '?' : params.base;
    const midLabel = hasMid ? params.mid : '';
    const finalLabel = unknown === 'final' ? '?' : params.final;
    const firstPct = params.p1 != null ? '+'+params.p1+'%' : params.change === 'decrease' ? '-'+params.p+'%' : '+'+params.p+'%';
    const secondPct = params.p2 != null ? '-'+params.p2+'%' : '';
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="18" width="230" height="112" rx="12" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.2"/>
      <line x1="${x1}" y1="${y}" x2="${midX}" y2="${y}" stroke="${T.stroke}" stroke-width="4" stroke-linecap="round"/>
      ${hasMid ? `<line x1="${x2}" y1="${y}" x2="${x3}" y2="${y}" stroke="${T.stroke}" stroke-width="4" stroke-linecap="round"/>` : ''}
      <circle cx="${x1}" cy="${y}" r="8" fill="${unknown === 'base' ? T.unknown : T.given}"/>
      <circle cx="${midX}" cy="${y}" r="8" fill="${unknown === 'final' && !hasMid ? T.unknown : T.given}"/>
      ${hasMid ? `<circle cx="${x3}" cy="${y}" r="8" fill="${unknown === 'final' ? T.unknown : T.given}"/>` : ''}
      <text x="${x1}" y="${y-22}" fill="${unknown === 'base' ? T.unknown : T.given}" font-size="13" font-weight="800" text-anchor="middle">${baseLabel}</text>
      <text x="${midX}" y="${y-22}" fill="${unknown === 'final' && !hasMid ? T.unknown : T.given}" font-size="13" font-weight="800" text-anchor="middle">${hasMid ? midLabel : finalLabel}</text>
      ${hasMid ? `<text x="${x3}" y="${y-22}" fill="${unknown === 'final' ? T.unknown : T.given}" font-size="13" font-weight="800" text-anchor="middle">${finalLabel}</text>` : ''}
      <text x="${(x1+midX)/2}" y="${y+31}" fill="${T.label}" font-size="12" font-weight="800" text-anchor="middle">${firstPct}</text>
      ${hasMid ? `<text x="${(x2+x3)/2}" y="${y+31}" fill="${T.label}" font-size="12" font-weight="800" text-anchor="middle">${secondPct}</text>` : ''}
      <text x="135" y="137" fill="${T.label}" font-size="11" font-weight="800" text-anchor="middle">${params.ctx || 'שינוי באחוזים'}</text>
    </svg>`;
  };
  E.rectangleSvg = function(p, unknown){
    const T = E.themes.geometry;
    // Aspect ratio follows the actual side values (clamped), so a 12·3 rectangle
    // really looks long and a 6·5 looks almost square.
    const W=260,H=160;
    let ratio = (p.l>0 && p.w>0) ? p.w/p.l : 0.55;
    ratio = Math.max(0.3, Math.min(0.85, ratio));
    const rw = 180, rh = Math.round(rw*ratio*0.78);
    const x1=40, x2=x1+rw, y1=Math.round((H-20-rh)/2)+8, y2=y1+rh;
    const lL = p.l==null?'?':p.l+' ס״מ', lW = p.w==null?'?':p.w+' ס״מ';
    const cL = unknown==='l'?T.unknown:T.given, cW = unknown==='w'?T.unknown:T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="6" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5"/>
      <text x="${(x1+x2)/2}" y="${y2+22}" fill="${cL}" font-size="14" font-weight="800" text-anchor="middle">${lL}</text>
      <text x="${x1-22}" y="${(y1+y2)/2+5}" fill="${cW}" font-size="14" font-weight="800" text-anchor="middle">${lW}</text>
    </svg>`;
  };
  // Polygon with ALGEBRAIC side labels (e.g. x, x+3, 2x) for perimeter-expression
  // questions. labels = side strings in edge order; shape 'tri' (3) or 'quad' (4).
  // Each label sits at its edge midpoint, pushed outward along the centroid normal.
  E.polygonSidesSvg = function(labels, shape){
    const T = E.themes.geometry;
    const W=260, H=180;
    const pts = shape==='quad'
      ? [[44,38],[214,46],[230,140],[26,134]]
      : [[130,30],[32,150],[228,150]];
    const n = pts.length;
    const cx = pts.reduce((s,p)=>s+p[0],0)/n, cy = pts.reduce((s,p)=>s+p[1],0)/n;
    const poly = pts.map(p=>p.join(',')).join(' ');
    let texts='';
    for(let i=0;i<n;i++){
      const a=pts[i], b=pts[(i+1)%n];
      const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
      let ox=mx-cx, oy=my-cy; const d=Math.hypot(ox,oy)||1; ox/=d; oy/=d;
      const tx=Math.round(mx+ox*24), ty=Math.round(my+oy*24+5);
      const lab = labels[i]==null ? '?' : labels[i];
      texts += `<text x="${tx}" y="${ty}" fill="${T.given}" font-size="15" font-weight="800" text-anchor="middle" font-style="italic">${lab}</text>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${poly}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      ${texts}
    </svg>`;
  };
  E.algebraRectangleSvg = function(k){
    const T = E.themes.geometry;
    const W=280,H=170,x=54,y=46,w=172,h=78;
    const longLabel = k + 'x';
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="מלבן עם צלעות x ו-${longLabel}">
      <rect x="20" y="18" width="240" height="128" rx="10" fill="${T.bg}" stroke="#d8e0ea" stroke-width="1.2"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5"/>
      <line x1="${x}" y1="${y+h+18}" x2="${x+w}" y2="${y+h+18}" stroke="${T.helper}" stroke-width="1.6"/>
      <line x1="${x-18}" y1="${y}" x2="${x-18}" y2="${y+h}" stroke="${T.helper}" stroke-width="1.6"/>
      <text x="${x+w/2}" y="${y+h+39}" fill="${T.given}" font-size="15" font-weight="650" text-anchor="middle" font-style="italic">${longLabel}</text>
      <text x="${x-36}" y="${y+h/2+5}" fill="${T.given}" font-size="15" font-weight="650" text-anchor="middle" font-style="italic">x</text>
      <text x="140" y="33" fill="${T.label}" font-size="12" font-weight="500" text-anchor="middle" direction="rtl" unicode-bidi="plaintext">צלע אחת ארוכה פי ${k}</text>
    </svg>`;
  };
  E.cupTowerSvg = function(params){
    const T = E.themes.geometry;
    const W=360,H=220;
    const first = params && params.first != null ? params.first : 8;
    const step = params && params.step != null ? params.step : 6;
    function rtlText(x,y,text,size,weight,anchor,color){
      return `<text x="${x}" y="${y}" fill="${color || T.label}" font-size="${size || 12}" font-weight="${weight || 500}" text-anchor="${anchor || 'middle'}" direction="rtl" unicode-bidi="plaintext">${text}</text>`;
    }
    function cup(cx,top,bottom,fill,stroke,opacity){
      const lipW=68, baseW=45, lipH=12;
      const leftTop=cx-lipW/2, rightTop=cx+lipW/2, leftBot=cx-baseW/2, rightBot=cx+baseW/2;
      return `<path d="M${leftTop} ${top+lipH/2} Q${cx} ${top-lipH/2} ${rightTop} ${top+lipH/2} L${rightBot} ${bottom} Q${cx} ${bottom+10} ${leftBot} ${bottom} Z" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>
        <ellipse cx="${cx}" cy="${top+lipH/2}" rx="${lipW/2}" ry="${lipH/2}" fill="${T.bg}" fill-opacity="0.72" stroke="${stroke}" stroke-width="1.6"/>`;
    }
    const singleTop=86,singleBottom=156,cx1=88;
    const cx2=248,base=170,cupH=54,stepPx=24,count=4;
    let tower='';
    for(let i=count-1;i>=0;i--){
      const top=base-cupH-i*stepPx, bottom=base-i*stepPx;
      tower += cup(cx2, top, bottom, i===0?T.helper:T.fill, T.stroke, i===0?0.58:0.92);
    }
    const firstTop=base-cupH, addedTop=firstTop-stepPx;
    return `<svg class="engine-svg cup-tower-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="מגדל כוסות: גובה התחלתי ותוספת קבועה">
      <rect x="18" y="18" width="324" height="176" rx="12" fill="${T.bg}" stroke="#d8e0ea" stroke-width="1.2"/>
      ${rtlText(180,38,'מודל גובה של מגדל כוסות',13,600,'middle',T.label)}
      ${cup(cx1,singleTop,singleBottom,T.fill,T.stroke,0.96)}
      ${rtlText(cx1,182,'כוס אחת',12,500,'middle',T.label)}
      <line x1="42" y1="${singleTop+6}" x2="42" y2="${singleBottom}" stroke="${T.given}" stroke-width="1.5"/>
      <line x1="36" y1="${singleTop+6}" x2="48" y2="${singleTop+6}" stroke="${T.given}" stroke-width="1.5"/>
      <line x1="36" y1="${singleBottom}" x2="48" y2="${singleBottom}" stroke="${T.given}" stroke-width="1.5"/>
      ${rtlText(31,124,first+' ס״מ',12,600,'middle',T.given)}
      ${tower}
      ${rtlText(cx2,182,'מגדל של n כוסות',12,500,'middle',T.label)}
      <line x1="306" y1="${firstTop}" x2="306" y2="${base}" stroke="${T.given}" stroke-width="1.5"/>
      <line x1="300" y1="${firstTop}" x2="312" y2="${firstTop}" stroke="${T.given}" stroke-width="1.5"/>
      <line x1="300" y1="${base}" x2="312" y2="${base}" stroke="${T.given}" stroke-width="1.5"/>
      ${rtlText(324,146,'גובה התחלתי',10.5,500,'middle',T.label)}
      ${rtlText(324,160,first+' ס״מ',11.5,600,'middle',T.given)}
      <line x1="196" y1="${addedTop}" x2="196" y2="${firstTop}" stroke="${T.unknown}" stroke-width="1.5"/>
      <line x1="190" y1="${addedTop}" x2="202" y2="${addedTop}" stroke="${T.unknown}" stroke-width="1.5"/>
      <line x1="190" y1="${firstTop}" x2="202" y2="${firstTop}" stroke="${T.unknown}" stroke-width="1.5"/>
      ${rtlText(176,96,'כל כוס נוספת',10.5,500,'middle',T.label)}
      ${rtlText(176,110,'מוסיפה '+step+' ס״מ',11.5,600,'middle',T.unknown)}
    </svg>`;
  };
  E.boxSvg = function(p, unknown){
    const T = E.themes.geometry;
    const W=270,H=180,x=46,y=64,w=130,h=72,dx=44,dy=30;
    const lL=p.l==null?'?':p.l+' ס״מ', lW=p.w==null?'?':p.w+' ס״מ', lH=p.h==null?'?':p.h+' ס״מ';
    const cL=unknown==='l'?T.unknown:T.given, cW=unknown==='w'?T.unknown:T.given, cH=unknown==='h'?T.unknown:T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.3"/>
      <polygon points="${x},${y} ${x+dx},${y-dy} ${x+dx+w},${y-dy} ${x+w},${y}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.3"/>
      <polygon points="${x+w},${y} ${x+dx+w},${y-dy} ${x+dx+w},${y-dy+h} ${x+w},${y+h}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.3"/>
      <text x="${x+w/2}" y="${y+h+22}" fill="${cL}" font-size="13" font-weight="800" text-anchor="middle">${lL}</text>
      <text x="${x+w+dx/2+16}" y="${y+h-dy/2+12}" fill="${cW}" font-size="13" font-weight="800" text-anchor="middle">${lW}</text>
      <text x="${x-22}" y="${y+h/2+5}" fill="${cH}" font-size="13" font-weight="800" text-anchor="middle">${lH}</text>
    </svg>`;
  };
  E.triangleBaseHeightSvg = function(p, unknown, shape){
    const T = E.themes.geometry;
    const W=260,H=170,x1=40,x2=220,yB=130,yT=40;
    const lB=p.b==null?'?':p.b+' ס״מ', lH=p.h==null?'?':p.h+' ס״מ';
    const cB=unknown==='b'?T.unknown:T.given, cH=unknown==='h'?T.unknown:T.given;
    let body='';
    if(shape==='para'){
      body=`<polygon points="${x1+26},${yT} ${x2},${yT} ${x2-26},${yB} ${x1},${yB}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="${x1+58}" y1="${yT}" x2="${x1+58}" y2="${yB}" stroke="${T.helper}" stroke-width="2" stroke-dasharray="5 4"/>`;
    } else if(shape==='trap'){
      const lA=p.a==null?'?':p.a+' ס״מ';
      const cA=unknown==='a'?T.unknown:T.given;
      body=`<polygon points="${x1+44},${yT} ${x2-44},${yT} ${x2},${yB} ${x1},${yB}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="${(x1+x2)/2}" y1="${yT}" x2="${(x1+x2)/2}" y2="${yB}" stroke="${T.helper}" stroke-width="2" stroke-dasharray="5 4"/>
      <text x="${(x1+x2)/2}" y="${yT-10}" fill="${cA}" font-size="13" font-weight="800" text-anchor="middle">${lA}</text>`;
    } else {
      // Scalene look: apex shifts left/right instead of one fixed isosceles template.
      const apexX=(x1+x2)/2 + E.pick([-52,-26,0,26,52]);
      body=`<polygon points="${apexX},${yT} ${x1},${yB} ${x2},${yB}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="${apexX}" y1="${yT}" x2="${apexX}" y2="${yB}" stroke="${T.helper}" stroke-width="2" stroke-dasharray="5 4"/>`;
      return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${body}
      <text x="${(x1+x2)/2}" y="${yB+22}" fill="${cB}" font-size="14" font-weight="800" text-anchor="middle">${lB}</text>
      <text x="${apexX+24}" y="${(yT+yB)/2}" fill="${cH}" font-size="13" font-weight="800" text-anchor="middle">${lH}</text>
    </svg>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${body}
      <text x="${(x1+x2)/2}" y="${yB+22}" fill="${cB}" font-size="14" font-weight="800" text-anchor="middle">${lB}</text>
      <text x="${(x1+x2)/2+24}" y="${(yT+yB)/2}" fill="${cH}" font-size="13" font-weight="800" text-anchor="middle">${lH}</text>
    </svg>`;
  };
  // Triangle drawn FROM its actual angle values (like a textbook figure), with
  // angle arcs, values placed along the interior bisector, and vertex letters
  // placed outside along the exterior bisector. Structural variation comes from
  // mirroring, inversion, base rotation and base-length jitter.
  // p = display values ({A,B,C}, null → "?"); geom = true angle values for the
  // construction (falls back to p, then to 60/60/60; non-180 sums are scaled).
  E.triangleAnglesSvg = function(p, unknown, geom){
    const T = E.themes.geometry;
    const W=270,H=190,PAD=30;
    let gA=(geom&&geom.A)!=null?geom.A:(p.A!=null?p.A:60);
    let gB=(geom&&geom.B)!=null?geom.B:(p.B!=null?p.B:60);
    let gC=(geom&&geom.C)!=null?geom.C:(p.C!=null?p.C:60);
    const sum=gA+gB+gC;
    if(sum!==180 && sum>0){ gA=gA*180/sum; gB=gB*180/sum; gC=gC*180/sum; }
    gB=Math.max(18,Math.min(132,gB)); gC=Math.max(18,Math.min(132,gC)); gA=180-gB-gC;
    if(gA<18){ const d=(18-gA)/2; gB-=d; gC-=d; gA=18; }
    if(gA>132){ const d=(gA-132)/2; gB+=d; gC+=d; gA=132; }
    // Construct in math coordinates: B at origin, C on x axis, A above.
    const rB=gB*Math.PI/180, rC=gC*Math.PI/180;
    const ax=Math.tan(rC)/(Math.tan(rB)+Math.tan(rC)); // A.x as fraction of BC
    const ay=ax*Math.tan(rB);
    let pts=[{x:ax,y:ay},{x:0,y:0},{x:1,y:0}]; // [A,B,C], y up
    // Structural variation
    if(E.pick([0,1])) pts=pts.map(q=>({x:1-q.x,y:q.y}));          // mirror
    if(E.pick([0,0,1])) pts=pts.map(q=>({x:q.x,y:-q.y}));         // invert (apex down)
    const rot=E.pick([0,0,-10,8,14,-16])*Math.PI/180;             // base rotation
    pts=pts.map(q=>({x:q.x*Math.cos(rot)-q.y*Math.sin(rot), y:q.x*Math.sin(rot)+q.y*Math.cos(rot)}));
    // Fit into viewBox (flip y to screen coordinates)
    const xs=pts.map(q=>q.x), ys=pts.map(q=>q.y);
    const minx=Math.min.apply(null,xs), maxx=Math.max.apply(null,xs);
    const miny=Math.min.apply(null,ys), maxy=Math.max.apply(null,ys);
    const sc=Math.min((W-2*PAD)/(maxx-minx||1),(H-2*PAD)/(maxy-miny||1));
    const ox=(W-(maxx-minx)*sc)/2, oy=(H-(maxy-miny)*sc)/2;
    const V=pts.map(q=>({x:ox+(q.x-minx)*sc, y:H-(oy+(q.y-miny)*sc)}));
    function unit(dx,dy){ const d=Math.sqrt(dx*dx+dy*dy)||1; return {x:dx/d,y:dy/d}; }
    const NAMES=['A','B','C'];
    const disp=[p.A,p.B,p.C], degs=[gA,gB,gC];
    let arcs='', labels='', letters='';
    for(let i=0;i<3;i++){
      const v=V[i], o1=V[(i+1)%3], o2=V[(i+2)%3];
      const u1=unit(o1.x-v.x,o1.y-v.y), u2=unit(o2.x-v.x,o2.y-v.y);
      let bis=unit(u1.x+u2.x,u1.y+u2.y);
      if(!isFinite(bis.x)||(!bis.x&&!bis.y)) bis=unit(-(o1.y-v.y),o1.x-v.x);
      const isUnknown=unknown===NAMES[i];
      const col=isUnknown?T.unknown:T.given;
      // angle arc (small, inside) — sweep chosen by cross-product orientation
      const r=15;
      const a1={x:v.x+u1.x*r,y:v.y+u1.y*r}, a2={x:v.x+u2.x*r,y:v.y+u2.y*r};
      const cross=u1.x*u2.y-u1.y*u2.x;
      arcs+=`<path d="M ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} A ${r} ${r} 0 0 ${cross>0?1:0} ${a2.x.toFixed(1)} ${a2.y.toFixed(1)}" fill="none" stroke="${col}" stroke-width="1.6"/>`;
      // angle value along the interior bisector; acute angles get extra distance
      const dist=degs[i]<38?40:degs[i]<60?32:27;
      const lx=v.x+bis.x*dist, ly=v.y+bis.y*dist;
      const txt=disp[i]==null?'?':disp[i]+'°';
      labels+=`<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="${col}" font-size="13" font-weight="800" text-anchor="middle" dominant-baseline="middle">${txt}</text>`;
      // vertex letter outside, along the exterior bisector
      const vx=v.x-bis.x*13, vy=v.y-bis.y*13;
      letters+=`<text x="${vx.toFixed(1)}" y="${vy.toFixed(1)}" fill="${T.label}" font-size="13" font-weight="700" font-style="italic" text-anchor="middle" dominant-baseline="middle">${NAMES[i]}</text>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${V.map(q=>q.x.toFixed(1)+','+q.y.toFixed(1)).join(' ')}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.2" stroke-linejoin="round"/>
      ${arcs}${labels}${letters}
    </svg>`;
  };
  E.circleSvg = function(p, unknown){
    const T = E.themes.geometry;
    const W=240,H=180,cx=120,cy=88,R=62;
    let line='', label='', color = unknown==='r'||unknown==='d' ? T.unknown : T.given;
    // Radius/diameter drawn at a varying angle — not always the same horizontal line.
    const deg = E.pick([0,-32,38,155,207]);
    const rad = deg*Math.PI/180;
    const ex = cx + Math.round(R*Math.cos(rad)), ey = cy + Math.round(R*Math.sin(rad));
    const ox = cx - Math.round(R*Math.cos(rad)), oy = cy - Math.round(R*Math.sin(rad));
    const lmx = Math.round((cx+ex)/2 - 16*Math.sin(rad)), lmy = Math.round((cy+ey)/2 - 16*Math.cos(rad)*Math.cos(rad)) - 4;
    if(p.mode==='d'){
      const lD=p.d==null?'?':p.d+' ס״מ';
      line=`<line x1="${ox}" y1="${oy}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="3"/><circle cx="${ox}" cy="${oy}" r="4" fill="${color}"/><circle cx="${ex}" cy="${ey}" r="4" fill="${color}"/>`;
      label=`<text x="${cx - Math.round(14*Math.sin(rad))}" y="${cy - 10 - Math.round(6*Math.cos(rad))}" fill="${color}" font-size="14" font-weight="800" text-anchor="middle">${lD}</text>`;
    } else {
      const lR=p.r==null?'?':p.r+' ס״מ';
      line=`<line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="4" fill="${T.stroke}"/>`;
      label=`<text x="${lmx}" y="${lmy}" fill="${color}" font-size="14" font-weight="800" text-anchor="middle">${lR}</text>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5"/>
      ${line}${label}
    </svg>`;
  };
  E.similarTrianglesSvg = function(p, unknown){
    const T = E.themes.geometry;
    const W=290,H=170;
    // Variation: small/large swap sides, and apexes shift so pairs differ between sheets.
    const swap = E.pick([0,1]);
    const dxS = E.pick([-10,0,12]), dxL = E.pick([-14,0,14]);
    const s0={Ax:62+dxS,Ay:62,Bx:24,By:128,Cx:104,Cy:128};
    const L0={Ax:206+dxL,Ay:30,Bx:148,By:142,Cx:272,Cy:142};
    function shift(t,dx){ return {Ax:t.Ax+dx,Ay:t.Ay,Bx:t.Bx+dx,By:t.By,Cx:t.Cx+dx,Cy:t.Cy}; }
    const s = swap ? shift(s0,166) : s0;
    const L = swap ? shift(L0,-124) : L0;
    const l1=p.s1==null?'?':p.s1+' ס״מ', l2=p.s2==null?'?':p.s2+' ס״מ';
    const c1=unknown==='s1'?T.unknown:T.given, c2=unknown==='s2'?T.unknown:T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${s.Ax},${s.Ay} ${s.Bx},${s.By} ${s.Cx},${s.Cy}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.3" stroke-linejoin="round"/>
      <polygon points="${L.Ax},${L.Ay} ${L.Bx},${L.By} ${L.Cx},${L.Cy}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.3" stroke-linejoin="round"/>
      <text x="${(s.Bx+s.Cx)/2}" y="${s.By+18}" fill="${c1}" font-size="13" font-weight="800" text-anchor="middle">${l1}</text>
      <text x="${(L.Bx+L.Cx)/2}" y="${L.By+18}" fill="${c2}" font-size="13" font-weight="800" text-anchor="middle">${l2}</text>
      <text x="${s.Ax}" y="${s.Ay-8}" fill="${T.label}" font-size="11" font-weight="700" text-anchor="middle">קטן</text>
      <text x="${L.Ax}" y="${L.Ay-8}" fill="${T.label}" font-size="11" font-weight="700" text-anchor="middle">גדול</text>
    </svg>`;
  };
  E.numberLineSvg = function(p){
    const T = E.themes.geometry;
    const W=300,H=80,x0=20,x1=280,y=44;
    const min=p.min!=null?p.min:-12, max=p.max!=null?p.max:12;
    const step=p.step!=null?p.step:4;
    const sc=(W-40)/(max-min);
    function X(v){ return x0+(v-min)*sc; }
    let ticks='';
    for(let v=min; v<=max; v+=step){
      ticks += '<line x1="'+X(v)+'" y1="'+(y-5)+'" x2="'+X(v)+'" y2="'+(y+5)+'" stroke="#64748b" stroke-width="1.5"/>'+
        '<text x="'+X(v)+'" y="'+(y+22)+'" fill="#334155" font-size="11" text-anchor="middle">'+v+'</text>';
    }
    let pts='';
    (p.points||[]).forEach(function(v){
      pts += '<circle cx="'+X(v)+'" cy="'+y+'" r="6" fill="'+T.unknown+'"/>'+
        '<text x="'+X(v)+'" y="'+(y-12)+'" fill="'+T.unknown+'" font-size="12" font-weight="800" text-anchor="middle">'+v+'</text>';
    });
    return '<svg class="engine-svg" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">'+
      '<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="#334155" stroke-width="2.5"/>'+
      '<polygon points="'+x1+','+y+' '+(x1-9)+','+(y-5)+' '+(x1-9)+','+(y+5)+'" fill="#334155"/>'+
      '<polygon points="'+x0+','+y+' '+(x0+9)+','+(y-5)+' '+(x0+9)+','+(y+5)+'" fill="#334155"/>'+
      ticks + pts + '</svg>';
  };
  E.linearGraphSvg = function(p){
    const T = E.themes.geometry;
    const W=260,H=220,pad=26;
    const pts = p.pts || [];
    const xs = pts.length ? pts.map(function(q){return q.x;}) : [0,4];
    const xmin = Math.min(-1, Math.min.apply(null,xs)-1);
    const xmax = Math.max(5, Math.max.apply(null,xs)+1);
    function yAt(x){ return p.m*x + p.b; }
    const ys = [yAt(xmin), yAt(xmax)].concat(pts.map(function(q){return q.y;})).concat([0]);
    const ymin = Math.floor(Math.min.apply(null,ys))-1;
    const ymax = Math.ceil(Math.max.apply(null,ys))+1;
    const sx=(W-2*pad)/(xmax-xmin), sy=(H-2*pad)/(ymax-ymin);
    function X(v){ return pad+(v-xmin)*sx; }
    function Y(v){ return H-pad-(v-ymin)*sy; }
    const xstep=Math.max(1,Math.ceil((xmax-xmin)/8)), ystep=Math.max(1,Math.ceil((ymax-ymin)/8));
    let grid='';
    for(let v=Math.ceil(xmin); v<=xmax; v+=xstep){
      grid += '<line x1="'+X(v)+'" y1="'+Y(ymin)+'" x2="'+X(v)+'" y2="'+Y(ymax)+'" stroke="#e2e8f0" stroke-width="1"/>';
      if(v!==0) grid += '<text x="'+X(v)+'" y="'+(Y(0)+14)+'" fill="#64748b" font-size="9" text-anchor="middle">'+v+'</text>';
    }
    for(let v=Math.ceil(ymin); v<=ymax; v+=ystep){
      grid += '<line x1="'+X(xmin)+'" y1="'+Y(v)+'" x2="'+X(xmax)+'" y2="'+Y(v)+'" stroke="#e2e8f0" stroke-width="1"/>';
      if(v!==0) grid += '<text x="'+(X(0)-7)+'" y="'+(Y(v)+3)+'" fill="#64748b" font-size="9" text-anchor="end">'+v+'</text>';
    }
    const axes = '<line x1="'+X(xmin)+'" y1="'+Y(0)+'" x2="'+X(xmax)+'" y2="'+Y(0)+'" stroke="#334155" stroke-width="1.8"/>'+
      '<line x1="'+X(0)+'" y1="'+Y(ymin)+'" x2="'+X(0)+'" y2="'+Y(ymax)+'" stroke="#334155" stroke-width="1.8"/>'+
      '<polygon points="'+X(xmax)+','+Y(0)+' '+(X(xmax)-7)+','+(Y(0)-4)+' '+(X(xmax)-7)+','+(Y(0)+4)+'" fill="#334155"/>'+
      '<polygon points="'+X(0)+','+Y(ymax)+' '+(X(0)-4)+','+(Y(ymax)+7)+' '+(X(0)+4)+','+(Y(ymax)+7)+'" fill="#334155"/>'+
      '<text x="'+(X(0)-7)+'" y="'+(Y(0)+14)+'" fill="#64748b" font-size="9" text-anchor="end">0</text>'+
      '<text x="'+(X(xmax)-4)+'" y="'+(Y(0)-8)+'" fill="#334155" font-size="11" font-style="italic" text-anchor="end">x</text>'+
      '<text x="'+(X(0)+10)+'" y="'+(Y(ymax)+10)+'" fill="#334155" font-size="11" font-style="italic">y</text>';
    const line = '<line x1="'+X(xmin)+'" y1="'+Y(yAt(xmin))+'" x2="'+X(xmax)+'" y2="'+Y(yAt(xmax))+'" stroke="#2563eb" stroke-width="2.5"/>';
    let dots='';
    pts.forEach(function(q){
      dots += '<circle cx="'+X(q.x)+'" cy="'+Y(q.y)+'" r="4.5" fill="'+T.unknown+'"/>'+
        '<text x="'+(X(q.x)+7)+'" y="'+(Y(q.y)-7)+'" fill="'+T.unknown+'" font-size="10" font-weight="800">('+q.x+','+q.y+')</text>';
    });
    return '<svg class="engine-svg" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">'+grid+axes+line+dots+'</svg>';
  };
  E.freqTableHtml = function(headers, rows){
    let h = '<table class="engine-table" dir="rtl"><thead><tr>';
    headers.forEach(function(x){ h += '<th>'+x+'</th>'; });
    h += '</tr></thead><tbody>';
    rows.forEach(function(r){
      h += '<tr>';
      r.forEach(function(c){ h += '<td>'+c+'</td>'; });
      h += '</tr>';
    });
    return h + '</tbody></table>';
  };
})();
