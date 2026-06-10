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
})();
