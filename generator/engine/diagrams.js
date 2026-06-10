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
})();
