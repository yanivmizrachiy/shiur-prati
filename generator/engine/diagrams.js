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
    // Aspect ratio follows the actual side values (clamped), so a 12×3 rectangle
    // really looks long and a 6×5 looks almost square.
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
    // p.applied: quadrant-I applied graph (file 02) with Hebrew axis captions
    // p.xLabel / p.yLabel: axis captions; p.xmax: fixed range for applied mode
    const W=260,H=p.applied?236:220,pad=p.applied?34:26;
    const pts = p.pts || [];
    const xs = pts.length ? pts.map(function(q){return q.x;}) : [0,4];
    const xmin = p.applied ? 0 : Math.min(-1, Math.min.apply(null,xs)-1);
    const xmax = p.xmax || Math.max(5, Math.max.apply(null,xs)+1);
    function yAt(x){ return p.m*x + p.b; }
    const ys = [yAt(xmin), yAt(xmax)].concat(pts.map(function(q){return q.y;})).concat([0]);
    const ymin = p.applied ? 0 : Math.floor(Math.min.apply(null,ys))-1;
    let ymax = Math.ceil(Math.max.apply(null,ys))+1;
    const xstep=Math.max(1,Math.ceil((xmax-xmin)/8));
    let ystep=Math.max(1,Math.ceil((ymax-ymin)/8));
    if(p.applied){ // nice y steps for applied reading (5/10/20)
      ystep = ymax<=12 ? 2 : ymax<=40 ? 5 : ymax<=90 ? 10 : 20;
      ymax = Math.ceil(ymax/ystep)*ystep;
    }
    const sx=(W-2*pad)/(xmax-xmin), sy=(H-2*pad)/(ymax-ymin);
    function X(v){ return pad+(v-xmin)*sx; }
    function Y(v){ return H-pad-(v-ymin)*sy; }
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
      (p.xLabel
        ? '<text x="'+(X(xmin)+(X(xmax)-X(xmin))/2)+'" y="'+(H-4)+'" fill="#334155" font-size="10" font-weight="700" text-anchor="middle">'+p.xLabel+'</text>'
        : '<text x="'+(X(xmax)-4)+'" y="'+(Y(0)-8)+'" fill="#334155" font-size="11" font-style="italic" text-anchor="end">x</text>')+
      (p.yLabel
        ? '<text x="'+(X(0)+8)+'" y="'+(Y(ymax)+2)+'" fill="#334155" font-size="10" font-weight="700">'+p.yLabel+'</text>'
        : '<text x="'+(X(0)+10)+'" y="'+(Y(ymax)+10)+'" fill="#334155" font-size="11" font-style="italic">y</text>');
    const line = '<line x1="'+X(xmin)+'" y1="'+Y(yAt(xmin))+'" x2="'+X(xmax)+'" y2="'+Y(yAt(xmax))+'" stroke="#2563eb" stroke-width="2.5"/>';
    let dots='';
    pts.forEach(function(q){
      if(p.guides){ // vertical dashed guide only — the y-value must still be READ off the scale
        dots += '<line x1="'+X(q.x)+'" y1="'+Y(q.y)+'" x2="'+X(q.x)+'" y2="'+Y(0)+'" stroke="'+T.unknown+'" stroke-width="1.3" stroke-dasharray="4 3"/>';
      }
      dots += '<circle cx="'+X(q.x)+'" cy="'+Y(q.y)+'" r="4.5" fill="'+T.unknown+'"/>';
      if(!p.guides) dots += '<text x="'+(X(q.x)+7)+'" y="'+(Y(q.y)-7)+'" fill="'+T.unknown+'" font-size="10" font-weight="800">('+q.x+','+q.y+')</text>';
    });
    return '<svg class="engine-svg" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">'+grid+axes+line+dots+'</svg>';
  };
  // Quadrant-I coordinate grid (Grade 7, file 05 / patterns N7-01, N7-02).
  // opts: { max (default 10), points:[{x,y,label,unknown}], connect:'polyline'|'polygon',
  //         segment:{x1,y1,x2,y2}, rect:{x,y,w,h}, labelCoords:true|false }
  E.coordinateGridSvg = function(opts){
    const T = E.themes.geometry;
    const o = opts || {};
    const max = o.max || 10;
    const W=270,H=250,padL=30,padB=28,padT=18,padR=20;
    const uw=(W-padL-padR)/max, uh=(H-padT-padB)/max;
    function X(v){ return padL+v*uw; }
    function Y(v){ return H-padB-v*uh; }
    const tickStep = max>8 ? 2 : 1;
    let grid='';
    for(let v=0; v<=max; v++){
      grid += `<line x1="${X(v)}" y1="${Y(0)}" x2="${X(v)}" y2="${Y(max)}" stroke="#e2e8f0" stroke-width="1"/>`;
      grid += `<line x1="${X(0)}" y1="${Y(v)}" x2="${X(max)}" y2="${Y(v)}" stroke="#e2e8f0" stroke-width="1"/>`;
      if(v>0 && v%tickStep===0){
        grid += `<text x="${X(v)}" y="${Y(0)+13}" fill="#64748b" font-size="9" text-anchor="middle">${v}</text>`;
        grid += `<text x="${X(0)-7}" y="${Y(v)+3}" fill="#64748b" font-size="9" text-anchor="end">${v}</text>`;
      }
    }
    const axes =
      `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(max)+8}" y2="${Y(0)}" stroke="#334155" stroke-width="1.8"/>`+
      `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(max)-8}" stroke="#334155" stroke-width="1.8"/>`+
      `<polygon points="${X(max)+8},${Y(0)} ${X(max)+1},${Y(0)-4} ${X(max)+1},${Y(0)+4}" fill="#334155"/>`+
      `<polygon points="${X(0)},${Y(max)-8} ${X(0)-4},${Y(max)-1} ${X(0)+4},${Y(max)-1}" fill="#334155"/>`+
      `<text x="${X(0)-7}" y="${Y(0)+13}" fill="#64748b" font-size="9" text-anchor="end">0</text>`+
      `<text x="${X(max)+4}" y="${Y(0)-8}" fill="#334155" font-size="11" font-style="italic" text-anchor="end">x</text>`+
      `<text x="${X(0)+10}" y="${Y(max)-2}" fill="#334155" font-size="11" font-style="italic">y</text>`;
    let shapes='';
    if(o.rect){
      shapes += `<rect x="${X(o.rect.x)}" y="${Y(o.rect.y+o.rect.h)}" width="${o.rect.w*uw}" height="${o.rect.h*uh}" fill="${T.fill}" fill-opacity="0.85" stroke="${T.stroke}" stroke-width="2"/>`;
    }
    const pts = o.points || [];
    if(o.connect && pts.length>1){
      const coords = pts.map(p=>X(p.x)+','+Y(p.y)).join(' ');
      shapes += o.connect==='polygon'
        ? `<polygon points="${coords}" fill="${T.fill}" fill-opacity="0.85" stroke="${T.stroke}" stroke-width="2" stroke-linejoin="round"/>`
        : `<polyline points="${coords}" fill="none" stroke="${T.stroke}" stroke-width="2" stroke-linejoin="round"/>`;
    }
    if(o.segment){
      shapes += `<line x1="${X(o.segment.x1)}" y1="${Y(o.segment.y1)}" x2="${X(o.segment.x2)}" y2="${Y(o.segment.y2)}" stroke="${T.unknown}" stroke-width="3" stroke-linecap="round"/>`;
    }
    let dots='';
    pts.forEach(function(p){
      const col = p.unknown ? T.unknown : T.given;
      const nearRight = p.x > max-2, nearTop = p.y > max-1;
      const dx = nearRight ? -7 : 7, anchor = nearRight ? 'end' : 'start';
      const dy = nearTop ? 14 : -7;
      const txt = p.unknown ? p.label+'(?,?)' : (o.labelCoords===false ? p.label : p.label+'('+p.x+','+p.y+')');
      dots += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="3.6" fill="${col}"/>`+
        `<text x="${X(p.x)+dx}" y="${Y(p.y)+dy}" fill="${col}" font-size="10.5" font-weight="800" text-anchor="${anchor}">${txt}</text>`;
    });
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${grid}${axes}${shapes}${dots}</svg>`;
  };

  // Bar chart (file 06 / patterns U-02, U-03): 3–6 categories, Hebrew labels,
  // y-axis from zero, optional values above bars. RTL: first category on the right.
  E.barChartSvg = function(opts){
    const T = E.themes.geometry;
    const o = opts || {};
    const labels = o.labels || [], values = o.values || [];
    const n = Math.max(1, values.length);
    const W=290,H=200,padL=30,padB=36,padT=20,padR=12;
    const maxV = Math.max.apply(null, values.concat([1]));
    const step = maxV<=6 ? 1 : maxV<=12 ? 2 : maxV<=30 ? 5 : 10;
    const top = Math.ceil(maxV/step)*step;
    const plotW=W-padL-padR, plotH=H-padT-padB;
    function Yv(v){ return padT + plotH*(1 - v/top); }
    let grid='';
    for(let v=0; v<=top; v+=step){
      grid += `<line x1="${padL}" y1="${Yv(v)}" x2="${W-padR}" y2="${Yv(v)}" stroke="${v===0?'#334155':'#e2e8f0'}" stroke-width="${v===0?1.8:1}"/>`+
        `<text x="${padL-6}" y="${Yv(v)+3}" fill="#64748b" font-size="9" text-anchor="end">${v}</text>`;
    }
    const slot = plotW/n, bw = Math.min(40, slot*0.62);
    let bars='';
    values.forEach(function(v,i){
      // RTL reading order: first category drawn at the right edge
      const cx = W-padR - slot*i - slot/2;
      bars += `<rect x="${cx-bw/2}" y="${Yv(v)}" width="${bw}" height="${plotH*(v/top)}" rx="2" fill="${T.given}" fill-opacity="0.82" stroke="${T.stroke}" stroke-width="1"/>`;
      if(o.showValues !== false) bars += `<text x="${cx}" y="${Yv(v)-5}" fill="${T.label}" font-size="10" font-weight="800" text-anchor="middle">${v}</text>`;
      bars += `<text x="${cx}" y="${H-padB+14}" fill="${T.label}" font-size="9.5" font-weight="700" text-anchor="middle">${labels[i]||''}</text>`;
    });
    const title = o.title ? `<text x="${W/2}" y="${H-4}" fill="#64748b" font-size="9.5" font-weight="700" text-anchor="middle">${o.title}</text>` : '';
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${grid}${bars}${title}</svg>`;
  };

  // Grouped double-bar comparison chart (file 06 pattern U-05: compare two
  // groups by relative frequency, not absolute count). Per group: one bar for
  // the group size (n) and one for the count (k), absolute values above bars,
  // legend below. RTL: first group on the right.
  E.doubleBarSvg = function(opts){
    const T = E.themes.geometry;
    const o = opts || {};
    const groups = o.groups || [], values = o.values || []; // values: [[n,k],...]
    const series = o.series || ['סה"כ','מתוכם'];
    const W=300,H=210,padL=32,padB=44,padT=20,padR=14;
    const flat = values.reduce((a,b)=>a.concat(b),[1]);
    const maxV = Math.max.apply(null, flat);
    const step = maxV<=6 ? 1 : maxV<=12 ? 2 : maxV<=30 ? 5 : 10;
    const top = Math.ceil(maxV/step)*step;
    const plotW=W-padL-padR, plotH=H-padT-padB;
    function Yv(v){ return padT + plotH*(1 - v/top); }
    let grid='';
    for(let v=0; v<=top; v+=step){
      grid += `<line x1="${padL}" y1="${Yv(v)}" x2="${W-padR}" y2="${Yv(v)}" stroke="${v===0?'#334155':'#e2e8f0'}" stroke-width="${v===0?1.8:1}"/>`+
        `<text x="${padL-6}" y="${Yv(v)+3}" fill="#64748b" font-size="9" text-anchor="end">${v}</text>`;
    }
    const ng = Math.max(1, groups.length);
    const slot = plotW/ng, bw = Math.min(30, slot*0.26);
    const cols = ['#94a3b8', T.given];
    let bars='';
    values.forEach(function(pair,gi){
      const cx = W-padR - slot*gi - slot/2; // RTL: first group on the right
      pair.forEach(function(v,si){
        const bx = cx + (si===0 ? 2 : -bw-2);
        bars += `<rect x="${bx}" y="${Yv(v)}" width="${bw}" height="${plotH*(v/top)}" rx="2" fill="${cols[si%2]}" fill-opacity="0.88" stroke="${T.stroke}" stroke-width="0.8"/>`+
          `<text x="${bx+bw/2}" y="${Yv(v)-4}" fill="${T.label}" font-size="9.5" font-weight="800" text-anchor="middle">${v}</text>`;
      });
      bars += `<text x="${cx}" y="${H-padB+13}" fill="${T.label}" font-size="10" font-weight="700" text-anchor="middle">${groups[gi]||''}</text>`;
    });
    const ly = H-10;
    const legend =
      `<rect x="${W-padR-78}" y="${ly-8}" width="9" height="9" rx="2" fill="${cols[0]}"/>`+
      `<text x="${W-padR-65}" y="${ly}" fill="#475569" font-size="9">${series[0]}</text>`+
      `<rect x="${W-padR-160}" y="${ly-8}" width="9" height="9" rx="2" fill="${cols[1]}"/>`+
      `<text x="${W-padR-147}" y="${ly}" fill="#475569" font-size="9">${series[1]}</text>`;
    return `<svg class="engine-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${grid}${bars}${legend}</svg>`;
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
