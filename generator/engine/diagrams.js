(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  E.rightTriangleSvg = function(params, unknown){
    const T = E.themes.geometry;
    const W=250,H=180,p=34;
    const Ax=p, Ay=p+8, Bx=p, By=H-p, Cx=W-p, Cy=H-p;
    const a = params.a == null ? '?' : params.a + ' ס״מ';
    const b = params.b == null ? '?' : params.b + ' ס״מ';
    const c = params.c == null ? '?' : params.c + ' ס״מ';
    const ca = unknown==='a'?T.unknown:T.given;
    const cb = unknown==='b'?T.unknown:T.given;
    const cc = unknown==='c'?T.unknown:T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <polyline points="${Bx+12},${By} ${Bx+12},${By-12} ${Bx},${By-12}" fill="none" stroke="${T.stroke}" stroke-width="1.8"/>
      <text x="${Bx-22}" y="${(Ay+By)/2+6}" fill="${ca}" font-size="14" font-weight="800" text-anchor="middle">${a}</text>
      <text x="${(Bx+Cx)/2}" y="${By+21}" fill="${cb}" font-size="14" font-weight="800" text-anchor="middle">${b}</text>
      <text x="${(Ax+Cx)/2+22}" y="${(Ay+Cy)/2-10}" fill="${cc}" font-size="14" font-weight="800" text-anchor="middle" transform="rotate(-36 ${(Ax+Cx)/2+22} ${(Ay+Cy)/2-10})">${c}</text>
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
    const scaleLabel = unknown==='scale' ? 'קנה מידה ?' : 'קנה מידה 1:' + params.scale;
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
    const W=270,H=150,x=34,y1=45,y2=91,maxW=172;
    const r1 = Math.max(1, params.r1 || 1);
    const r2 = Math.max(1, params.r2 || 1);
    const sum = r1 + r2;
    const w1 = Math.max(44, Math.round(maxW * r1 / sum));
    const w2 = Math.max(44, Math.round(maxW * r2 / sum));
    const leftValue = unknown === 'missing' && params.knownSide === 'right' ? '?' : (params.a || params.known || r1);
    const rightValue = unknown === 'missing' && params.knownSide === 'left' ? '?' : (params.b || params.missing || r2);
    const leftColor = unknown === 'missing' && params.knownSide === 'right' ? T.unknown : T.given;
    const rightColor = unknown === 'missing' && params.knownSide === 'left' ? T.unknown : T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="18" width="230" height="112" rx="12" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.2"/>
      <rect x="${x}" y="${y1}" width="${w1}" height="26" rx="7" fill="${T.helper}" opacity="0.78"/>
      <rect x="${x}" y="${y2}" width="${w2}" height="26" rx="7" fill="${T.stroke}" opacity="0.82"/>
      <text x="${x+w1+13}" y="${y1+18}" fill="${leftColor}" font-size="13" font-weight="800">${leftValue}</text>
      <text x="${x+w2+13}" y="${y2+18}" fill="${rightColor}" font-size="13" font-weight="800">${rightValue}</text>
      <text x="238" y="${y1+18}" fill="${T.label}" font-size="11" font-weight="800" text-anchor="end">${params.left || 'חלק א'}</text>
      <text x="238" y="${y2+18}" fill="${T.label}" font-size="11" font-weight="800" text-anchor="end">${params.right || 'חלק ב'}</text>
      <text x="135" y="139" fill="${T.label}" font-size="12" font-weight="800" text-anchor="middle">יחס ${r1}:${r2}</text>
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
    const W=260,H=160,x1=40,y1=30,x2=220,y2=130;
    const lL = p.l==null?'?':p.l+' ס״מ', lW = p.w==null?'?':p.w+' ס״מ';
    const cL = unknown==='l'?T.unknown:T.given, cW = unknown==='w'?T.unknown:T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="6" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5"/>
      <text x="${(x1+x2)/2}" y="${y2+22}" fill="${cL}" font-size="14" font-weight="800" text-anchor="middle">${lL}</text>
      <text x="${x1-22}" y="${(y1+y2)/2+5}" fill="${cW}" font-size="14" font-weight="800" text-anchor="middle">${lW}</text>
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
      body=`<polygon points="${(x1+x2)/2},${yT} ${x1},${yB} ${x2},${yB}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="${(x1+x2)/2}" y1="${yT}" x2="${(x1+x2)/2}" y2="${yB}" stroke="${T.helper}" stroke-width="2" stroke-dasharray="5 4"/>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${body}
      <text x="${(x1+x2)/2}" y="${yB+22}" fill="${cB}" font-size="14" font-weight="800" text-anchor="middle">${lB}</text>
      <text x="${(x1+x2)/2+24}" y="${(yT+yB)/2}" fill="${cH}" font-size="13" font-weight="800" text-anchor="middle">${lH}</text>
    </svg>`;
  };
  E.triangleAnglesSvg = function(p, unknown){
    const T = E.themes.geometry;
    const W=260,H=175,Ax=130,Ay=34,Bx=42,By=140,Cx=218,Cy=140;
    const lA=p.A==null?'?':p.A+'°', lB=p.B==null?'?':p.B+'°', lC=p.C==null?'?':p.C+'°';
    const cA=unknown==='A'?T.unknown:T.given, cB=unknown==='B'?T.unknown:T.given, cC=unknown==='C'?T.unknown:T.given;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="${Ax}" y="${Ay+26}" fill="${cA}" font-size="14" font-weight="800" text-anchor="middle">${lA}</text>
      <text x="${Bx+26}" y="${By-10}" fill="${cB}" font-size="14" font-weight="800" text-anchor="middle">${lB}</text>
      <text x="${Cx-26}" y="${Cy-10}" fill="${cC}" font-size="14" font-weight="800" text-anchor="middle">${lC}</text>
    </svg>`;
  };
  E.circleSvg = function(p, unknown){
    const T = E.themes.geometry;
    const W=240,H=180,cx=120,cy=88,R=62;
    let line='', label='', color = unknown==='r'||unknown==='d' ? T.unknown : T.given;
    if(p.mode==='d'){
      const lD=p.d==null?'?':p.d+' ס״מ';
      line=`<line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="${color}" stroke-width="3"/><circle cx="${cx-R}" cy="${cy}" r="4" fill="${color}"/><circle cx="${cx+R}" cy="${cy}" r="4" fill="${color}"/>`;
      label=`<text x="${cx}" y="${cy-10}" fill="${color}" font-size="14" font-weight="800" text-anchor="middle">${lD}</text>`;
    } else {
      const lR=p.r==null?'?':p.r+' ס״מ';
      line=`<line x1="${cx}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="${color}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="4" fill="${T.stroke}"/>`;
      label=`<text x="${cx+R/2}" y="${cy-10}" fill="${color}" font-size="14" font-weight="800" text-anchor="middle">${lR}</text>`;
    }
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="${T.fill}" stroke="${T.stroke}" stroke-width="2.5"/>
      ${line}${label}
    </svg>`;
  };
  E.similarTrianglesSvg = function(p, unknown){
    const T = E.themes.geometry;
    const W=290,H=170;
    const s={Ax:62,Ay:62,Bx:24,By:128,Cx:104,Cy:128};
    const L={Ax:206,Ay:30,Bx:148,By:142,Cx:272,Cy:142};
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
