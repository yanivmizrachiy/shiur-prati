(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  const P = {
    fill: '#f8fafc',
    fill2: '#ffffff',
    stroke: '#334155',
    helper: '#94a3b8',
    given: '#1d4ed8',
    unknown: '#dc2626',
    label: '#0f172a',
    soft: '#e2e8f0'
  };

  function pick(xs){
    return E.pick ? E.pick(xs) : xs[Math.floor(Math.random() * xs.length)];
  }

  function finite(x, fallback){
    return Number.isFinite(Number(x)) ? Number(x) : fallback;
  }

  function esc(v){
    return String(v == null ? '' : v)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function pt(x,y){ return {x:x,y:y}; }
  function add(a,b){ return pt(a.x+b.x,a.y+b.y); }
  function sub(a,b){ return pt(a.x-b.x,a.y-b.y); }
  function mul(a,k){ return pt(a.x*k,a.y*k); }
  function mid(a,b){ return pt((a.x+b.x)/2,(a.y+b.y)/2); }
  function len(v){ return Math.sqrt(v.x*v.x + v.y*v.y) || 1; }
  function unit(v){ const d=len(v); return pt(v.x/d,v.y/d); }
  function centroid(vs){ return pt(vs.reduce((s,p)=>s+p.x,0)/vs.length, vs.reduce((s,p)=>s+p.y,0)/vs.length); }
  function fmt(n){ return Number(n).toFixed(1); }

  function awayNormal(a,b,c){
    const m = mid(a,b);
    const u = unit(sub(b,a));
    let n = pt(-u.y,u.x);
    const toC = sub(c,m);
    if(n.x*toC.x + n.y*toC.y > 0) n = mul(n,-1);
    return n;
  }

  function labelBox(x,y,text,color,opts){
    opts = opts || {};
    const s = String(text);
    const w = Math.max(opts.w || 0, 18 + s.length * 7.2);
    const h = opts.h || 23;
    const bg = opts.bg || 'rgba(255,255,255,0.92)';
    const weight = opts.weight || 800;
    const size = opts.size || 13;
    const rot = opts.rotate ? ` transform="rotate(${opts.rotate} ${fmt(x)} ${fmt(y)})"` : '';
    return `<g${rot}>
      <rect x="${fmt(x-w/2)}" y="${fmt(y-h/2)}" width="${fmt(w)}" height="${fmt(h)}" rx="8" fill="${bg}" stroke="#e2e8f0" stroke-width="0.8"/>
      <text x="${fmt(x)}" y="${fmt(y+1)}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="middle" dominant-baseline="middle">${esc(text)}</text>
    </g>`;
  }

  function plainText(x,y,text,color,size,weight){
    return `<text x="${fmt(x)}" y="${fmt(y)}" fill="${color}" font-size="${size||13}" font-weight="${weight||700}" text-anchor="middle" dominant-baseline="middle">${esc(text)}</text>`;
  }

  function segmentLabel(a,b,c,text,color,shift,rotate){
    const m = mid(a,b);
    const n = awayNormal(a,b,c);
    const p = add(m, mul(n, shift || 24));
    let deg = Math.atan2(b.y-a.y,b.x-a.x) * 180 / Math.PI;
    if(deg > 90) deg -= 180;
    if(deg < -90) deg += 180;
    return labelBox(p.x,p.y,text,color,{rotate: rotate ? Math.round(deg) : 0});
  }

  function fitPoints(points,W,H,pad){
    const xs = points.map(p=>p.x), ys = points.map(p=>p.y);
    const minx = Math.min.apply(null,xs), maxx = Math.max.apply(null,xs);
    const miny = Math.min.apply(null,ys), maxy = Math.max.apply(null,ys);
    const scale = Math.min((W - 2*pad) / (maxx-minx || 1), (H - 2*pad) / (maxy-miny || 1));
    const ox = (W - (maxx-minx)*scale) / 2;
    const oy = (H - (maxy-miny)*scale) / 2;
    return points.map(p => pt(ox + (p.x-minx)*scale, oy + (p.y-miny)*scale));
  }

  function svgFrame(W,H,body){
    return `<svg class="engine-svg premium-geo-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <filter id="premiumGeoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="#0f172a" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect x="2" y="2" width="${W-4}" height="${H-4}" rx="18" fill="#ffffff" opacity="0.01"/>
      ${body}
    </svg>`;
  }

  function rightMarker(v,o1,o2,color){
    const u1 = unit(sub(o1,v));
    const u2 = unit(sub(o2,v));
    const d = 18;
    const p1 = add(v, mul(u1,d));
    const p2 = add(p1, mul(u2,d));
    const p3 = add(v, mul(u2,d));
    return `<polyline points="${fmt(p1.x)},${fmt(p1.y)} ${fmt(p2.x)},${fmt(p2.y)} ${fmt(p3.x)},${fmt(p3.y)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>`;
  }

  function angleArc(v,o1,o2,r,color){
    const u1 = unit(sub(o1,v));
    const u2 = unit(sub(o2,v));
    const p1 = add(v,mul(u1,r));
    const p2 = add(v,mul(u2,r));
    const cross = u1.x*u2.y - u1.y*u2.x;
    return `<path d="M ${fmt(p1.x)} ${fmt(p1.y)} A ${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${fmt(p2.x)} ${fmt(p2.y)}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
  }

  E.triangleAnglesSvg = function(p, unknown, geom){
    const W = 360, H = 250, PAD = 48;

    let gA = finite(geom && geom.A != null ? geom.A : p.A, 60);
    let gB = finite(geom && geom.B != null ? geom.B : p.B, 60);
    let gC = finite(geom && geom.C != null ? geom.C : p.C, 60);

    const s = gA + gB + gC;
    if(s > 0 && Math.abs(s - 180) > 0.001){
      gA = gA * 180 / s;
      gB = gB * 180 / s;
      gC = gC * 180 / s;
    }

    gB = Math.max(20, Math.min(130, gB));
    gC = Math.max(20, Math.min(130, gC));
    gA = 180 - gB - gC;

    if(gA < 20){
      const d = (20 - gA) / 2;
      gB -= d;
      gC -= d;
      gA = 20;
    }

    const rB = gB * Math.PI / 180;
    const rC = gC * Math.PI / 180;
    const ax = Math.tan(rC) / (Math.tan(rB) + Math.tan(rC));
    const ay = ax * Math.tan(rB);

    let model = [
      pt(ax, -ay),
      pt(0, 0),
      pt(1, 0)
    ];

    const stretch = pick([0.9, 0.98, 1.06, 1.14]);
    model = model.map(q => pt(q.x * stretch, q.y));

    if(pick([0,1])) {
      model = model.map(q => pt(1.14 - q.x, q.y));
    }

    if(pick([0,0,1])) {
      model = model.map(q => pt(q.x, -q.y));
    }

    const rot = pick([-12, -7, -3, 0, 6, 10, 14]) * Math.PI / 180;
    model = model.map(q => pt(
      q.x * Math.cos(rot) - q.y * Math.sin(rot),
      q.x * Math.sin(rot) + q.y * Math.cos(rot)
    ));

    const V = fitPoints(model, W, H, PAD);
    const CEN = centroid(V);

    const names = ['A','B','C'];
    const display = [p.A, p.B, p.C];
    const degs = [gA, gB, gC];

    function angleValueText(x, y, text, color, unknownLabel){
      const size = unknownLabel ? 16 : 14;
      const weight = unknownLabel ? 900 : 800;
      return `<text x="${fmt(x)}" y="${fmt(y)}"
        fill="${color}"
        font-size="${size}"
        font-weight="${weight}"
        text-anchor="middle"
        dominant-baseline="middle"
        style="paint-order:stroke;stroke:#ffffff;stroke-width:5px;stroke-linejoin:round">${esc(text)}</text>`;
    }

    function vertexText(v, text){
      return `<text x="${fmt(v.x)}" y="${fmt(v.y)}"
        fill="${P.label}"
        font-size="16"
        font-weight="800"
        font-style="italic"
        text-anchor="middle"
        dominant-baseline="middle"
        style="paint-order:stroke;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round">${esc(text)}</text>`;
    }

    let arcs = '';
    let labels = '';
    let letters = '';
    let dots = '';

    for(let i=0;i<3;i++){
      const v = V[i];
      const o1 = V[(i+1)%3];
      const o2 = V[(i+2)%3];

      const u1 = unit(sub(o1, v));
      const u2 = unit(sub(o2, v));

      let bis = unit(add(u1, u2));
      if(!isFinite(bis.x) || !isFinite(bis.y)) {
        bis = unit(pt(-(o1.y-v.y), o1.x-v.x));
      }

      const isUnknown = unknown === names[i];
      const color = isUnknown ? P.unknown : P.given;

      const arcR = isUnknown ? 27 : 23;
      arcs += angleArc(v, o1, o2, arcR, color);

      /*
        Textbook placement:
        - no colored box
        - number sits INSIDE the angle
        - unknown is slightly farther from the vertex
        - small/acute angles are pushed inward enough to avoid the sides
        - all text gets a white stroke halo instead of a box
      */
      const baseDist =
        degs[i] < 32 ? 54 :
        degs[i] < 45 ? 48 :
        degs[i] < 65 ? 41 :
        degs[i] < 95 ? 35 : 31;

      const dist = isUnknown ? baseDist + 4 : baseDist;
      const lp = add(v, mul(bis, dist));
      const txt = display[i] == null ? '?' : display[i] + '°';

      labels += angleValueText(lp.x, lp.y, txt, color, isUnknown);

      /*
        Vertex letters stay outside the triangle, away from the centroid.
        This prevents A/B/C from sitting on a side.
      */
      const outward = unit(sub(v, CEN));
      const vp = add(v, mul(outward, 27));
      letters += vertexText(vp, names[i]);

      dots += `<circle cx="${fmt(v.x)}" cy="${fmt(v.y)}" r="2.2" fill="${P.stroke}"/>`;
    }

    const poly = V.map(q => `${fmt(q.x)},${fmt(q.y)}`).join(' ');

    return svgFrame(W, H, `
      <polygon points="${poly}"
        fill="${P.fill}"
        stroke="${P.stroke}"
        stroke-width="2.8"
        stroke-linejoin="round"
        filter="url(#premiumGeoShadow)"/>
      ${arcs}
      ${dots}
      ${labels}
      ${letters}
    `);
  };

  E.rightTriangleSvg = function(params, unknown){
    const W = 360, H = 250, PAD = 50;
    const aVal = finite(params.a, 8);
    const bVal = finite(params.b, 12);
    const h = Math.max(0.45, Math.min(1.18, aVal / Math.max(bVal,1)));
    let model = [pt(0,-h), pt(0,0), pt(1,0)]; // A,B,C; B is right angle

    const flipX = pick([0,1]), flipY = pick([0,1]);
    if(flipX) model = model.map(q => pt(1-q.x,q.y));
    if(flipY) model = model.map(q => pt(q.x,-q.y));
    const rot = pick([-10,-4,0,7,13]) * Math.PI / 180;
    model = model.map(q => pt(q.x*Math.cos(rot)-q.y*Math.sin(rot), q.x*Math.sin(rot)+q.y*Math.cos(rot)));

    const V = fitPoints(model,W,H,PAD);
    const A = V[0], B = V[1], C = V[2];
    const CEN = centroid(V);

    const la = params.a == null ? '?' : params.a + ' ס״מ';
    const lb = params.b == null ? '?' : params.b + ' ס״מ';
    const lc = params.c == null ? '?' : params.c + ' ס״מ';

    const ca = unknown === 'a' ? P.unknown : P.given;
    const cb = unknown === 'b' ? P.unknown : P.given;
    const cc = unknown === 'c' ? P.unknown : P.given;

    const poly = `${fmt(A.x)},${fmt(A.y)} ${fmt(B.x)},${fmt(B.y)} ${fmt(C.x)},${fmt(C.y)}`;
    return svgFrame(W,H,`
      <polygon points="${poly}" fill="${P.fill}" stroke="${P.stroke}" stroke-width="2.8" stroke-linejoin="round" filter="url(#premiumGeoShadow)"/>
      ${rightMarker(B,A,C,P.stroke)}
      <circle cx="${fmt(A.x)}" cy="${fmt(A.y)}" r="2.3" fill="${P.stroke}"/>
      <circle cx="${fmt(B.x)}" cy="${fmt(B.y)}" r="2.3" fill="${P.stroke}"/>
      <circle cx="${fmt(C.x)}" cy="${fmt(C.y)}" r="2.3" fill="${P.stroke}"/>
      ${segmentLabel(A,B,CEN,la,ca,28,false)}
      ${segmentLabel(B,C,CEN,lb,cb,28,false)}
      ${segmentLabel(A,C,CEN,lc,cc,30,true)}
      ${plainText(add(A,mul(unit(sub(A,CEN)),24)).x, add(A,mul(unit(sub(A,CEN)),24)).y, 'A', P.label, 15, 800)}
      ${plainText(add(B,mul(unit(sub(B,CEN)),24)).x, add(B,mul(unit(sub(B,CEN)),24)).y, 'B', P.label, 15, 800)}
      ${plainText(add(C,mul(unit(sub(C,CEN)),24)).x, add(C,mul(unit(sub(C,CEN)),24)).y, 'C', P.label, 15, 800)}
    `);
  };

  E.rectangleSvg = function(p, unknown){
    const W = 360, H = 230;
    const l = finite(p.l, 12), w = finite(p.w, 6);
    let ratio = Math.max(0.32, Math.min(0.82, w / Math.max(l,1)));
    const rw = 218, rh = Math.round(rw * ratio * 0.68);
    const x = (W-rw)/2, y = (H-rh)/2;
    const A=pt(x,y), B=pt(x+rw,y), C=pt(x+rw,y+rh), D=pt(x,y+rh);
    const cL = unknown === 'l' ? P.unknown : P.given;
    const cW = unknown === 'w' ? P.unknown : P.given;
    const lText = unknown === 'l' ? '?' : l + ' ס״מ';
    const wText = unknown === 'w' ? '?' : w + ' ס״מ';
    return svgFrame(W,H,`
      <rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(rw)}" height="${fmt(rh)}" rx="10" fill="${P.fill}" stroke="${P.stroke}" stroke-width="2.8" filter="url(#premiumGeoShadow)"/>
      <line x1="${fmt(A.x)}" y1="${fmt(D.y+18)}" x2="${fmt(B.x)}" y2="${fmt(C.y+18)}" stroke="${P.helper}" stroke-width="1.5"/>
      <line x1="${fmt(A.x)}" y1="${fmt(D.y+12)}" x2="${fmt(A.x)}" y2="${fmt(D.y+24)}" stroke="${P.helper}" stroke-width="1.5"/>
      <line x1="${fmt(B.x)}" y1="${fmt(C.y+12)}" x2="${fmt(B.x)}" y2="${fmt(C.y+24)}" stroke="${P.helper}" stroke-width="1.5"/>
      <line x1="${fmt(D.x-18)}" y1="${fmt(A.y)}" x2="${fmt(D.x-18)}" y2="${fmt(D.y)}" stroke="${P.helper}" stroke-width="1.5"/>
      <line x1="${fmt(D.x-24)}" y1="${fmt(A.y)}" x2="${fmt(D.x-12)}" y2="${fmt(A.y)}" stroke="${P.helper}" stroke-width="1.5"/>
      <line x1="${fmt(D.x-24)}" y1="${fmt(D.y)}" x2="${fmt(D.x-12)}" y2="${fmt(D.y)}" stroke="${P.helper}" stroke-width="1.5"/>
      ${labelBox((A.x+B.x)/2, C.y+18, lText, cL, {w:58})}
      ${labelBox(D.x-18, (A.y+D.y)/2, wText, cW, {w:58})}
    `);
  };

  E.circleSvg = function(p, unknown){
    const W = 340, H = 230, cx = 170, cy = 108, R = 70;
    const mode = p.mode || (p.d != null ? 'd' : 'r');
    const color = (unknown === 'r' || unknown === 'd') ? P.unknown : P.given;
    const deg = pick([-35, 0, 28, 145, 205]) * Math.PI / 180;
    const ex = pt(cx + R*Math.cos(deg), cy + R*Math.sin(deg));
    const ox = pt(cx - R*Math.cos(deg), cy - R*Math.sin(deg));
    const labelPos = mode === 'd' ? pt(cx, cy - 22) : mid(pt(cx,cy), ex);
    const labelShift = pt(-Math.sin(deg)*18, Math.cos(deg)*18);
    const value = mode === 'd'
      ? (p.d == null ? '?' : p.d + ' ס״מ')
      : (p.r == null ? '?' : p.r + ' ס״מ');

    return svgFrame(W,H,`
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="${P.fill}" stroke="${P.stroke}" stroke-width="2.8" filter="url(#premiumGeoShadow)"/>
      <circle cx="${cx}" cy="${cy}" r="3.5" fill="${P.stroke}"/>
      ${mode === 'd'
        ? `<line x1="${fmt(ox.x)}" y1="${fmt(ox.y)}" x2="${fmt(ex.x)}" y2="${fmt(ex.y)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`
        : `<line x1="${cx}" y1="${cy}" x2="${fmt(ex.x)}" y2="${fmt(ex.y)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`
      }
      <circle cx="${fmt(ex.x)}" cy="${fmt(ex.y)}" r="4" fill="${color}"/>
      ${mode === 'd' ? `<circle cx="${fmt(ox.x)}" cy="${fmt(ox.y)}" r="4" fill="${color}"/>` : ''}
      ${labelBox(labelPos.x + labelShift.x, labelPos.y + labelShift.y, value, color, {w:62})}
    `);
  };
})();
