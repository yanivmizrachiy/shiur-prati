// tools/verify-graphics-quality.mjs  (verify:graphics-quality)
// Textbook-quality gate for every diagram the engines render. For a large sample
// of SVGs it asserts: a numeric viewBox, responsive sizing (scales for A4 print,
// not a fixed oversized canvas), readable fonts (>= 9px), at least one label,
// no raster/foreignObject (clean vector), and every <text> label sits inside the
// viewBox (no clipped/escaping labels — the classic "demo" tell).
import { loadEngines } from './engine-load.mjs';

const { pilotIds, sourceFitIds, callEngine } = loadEngines();
const QT = ['open', 'mcq', 'tf', 'mistake'];
const DIFFS = ['basic', 'standard', 'challenge'];
const SAMPLES = 6;
let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name + (extra && !ok ? ' :: ' + extra : '')); if (!ok) fails++; };

function svgs(html) { const out = []; const re = /<svg[\s\S]*?<\/svg>/gi; let m; while ((m = re.exec(html))) out.push(m[0]); return out; }
function nums(str) { return (str.match(/-?\d+(?:\.\d+)?/g) || []).map(Number); }

const cov = { svgChecked: 0, noViewBox: 0, tinyFont: 0, raster: 0, noLabel: 0, outOfBounds: 0, shapeOutOfBounds: 0, oversized: 0, notResponsive: 0 };
const ids = pilotIds.concat(sourceFitIds);
function attr(tag, name) {
  const m = tag.match(new RegExp('\\b' + name + '="(-?[\\d.]+)"'));
  return m ? parseFloat(m[1]) : null;
}
function pointOk(x, y, minx, miny, w, h, mg) {
  return x >= minx - mg && x <= minx + w + mg && y >= miny - mg && y <= miny + h + mg;
}
function shapesInside(svg, minx, miny, w, h) {
  const mg = 8;
  for (const tag of svg.match(/<(line|circle|rect)\b[^>]*>/gi) || []) {
    if (/^<line/i.test(tag)) {
      const x1 = attr(tag, 'x1'), y1 = attr(tag, 'y1'), x2 = attr(tag, 'x2'), y2 = attr(tag, 'y2');
      if ([x1, y1, x2, y2].every(v => v !== null) && (!pointOk(x1, y1, minx, miny, w, h, mg) || !pointOk(x2, y2, minx, miny, w, h, mg))) return false;
    } else if (/^<circle/i.test(tag)) {
      const cx = attr(tag, 'cx'), cy = attr(tag, 'cy'), r = attr(tag, 'r') || 0;
      if ([cx, cy].every(v => v !== null) && (cx - r < minx - mg || cx + r > minx + w + mg || cy - r < miny - mg || cy + r > miny + h + mg)) return false;
    } else if (/^<rect/i.test(tag)) {
      const x = attr(tag, 'x'), y = attr(tag, 'y'), rw = attr(tag, 'width'), rh = attr(tag, 'height');
      if ([x, y, rw, rh].every(v => v !== null) && (x < minx - mg || y < miny - mg || x + rw > minx + w + mg || y + rh > miny + h + mg)) return false;
    }
  }
  for (const tag of svg.match(/<(polygon|polyline)\b[^>]*>/gi) || []) {
    const m = tag.match(/\bpoints="([^"]+)"/);
    if (!m) continue;
    const values = nums(m[1]);
    for (let i = 0; i + 1 < values.length; i += 2) {
      if (!pointOk(values[i], values[i + 1], minx, miny, w, h, mg)) return false;
    }
  }
  return true;
}

for (const id of ids) {
  for (const d of DIFFS) for (const t of QT) {
    for (let i = 0; i < SAMPLES; i++) {
      const r = callEngine(id, d, t);
      if (!r || !r.questionHTML) continue;
      for (const svg of svgs(r.questionHTML)) {
        cov.svgChecked++;
        const vbM = svg.match(/viewBox="([^"]+)"/);
        if (!vbM) { cov.noViewBox++; console.log('  NOVIEWBOX ' + id); continue; }
        const vb = vbM[1].trim().split(/\s+/).map(Number);
        if (vb.length !== 4 || vb.some(isNaN) || vb[2] <= 0 || vb[3] <= 0) { cov.noViewBox++; console.log('  BADVIEWBOX ' + id + ' ' + vbM[1]); continue; }
        const [minx, miny, w, h] = vb;
        // responsive: a class (engine-svg) or no hard pixel width that fixes size
        if (!/class="[^"]*engine-svg/.test(svg) && /\swidth="\d+(px)?"/.test(svg)) cov.notResponsive++;
        // A4-scalable: viewBox not absurdly large
        if (Math.max(w, h) > 1000) { cov.oversized++; console.log('  OVERSIZED ' + id + ' ' + w + 'x' + h); }
        // clean vector only
        if (/<foreignObject|<image\b/i.test(svg)) { cov.raster++; console.log('  RASTER ' + id); }
        // readable fonts
        const fonts = (svg.match(/font-size="([\d.]+)"/g) || []).map(s => parseFloat(s.replace(/\D*([\d.]+).*/, '$1')));
        if (fonts.some(f => f < 9)) { cov.tinyFont++; console.log('  TINYFONT ' + id + ' ' + Math.min.apply(null, fonts)); }
        // at least one text label
        const texts = svg.match(/<text\b[^>]*>/gi) || [];
        if (!texts.length) { cov.noLabel++; console.log('  NOLABEL ' + id); }
        // every <text> anchor within the viewBox (+ small margin)
        const mg = 6;
        let escaped = false;
        for (const tg of texts) {
          const x = tg.match(/\bx="(-?[\d.]+)"/), y = tg.match(/\by="(-?[\d.]+)"/);
          if (!x || !y) continue;
          const xv = parseFloat(x[1]), yv = parseFloat(y[1]);
          if (xv < minx - mg || xv > minx + w + mg || yv < miny - mg || yv > miny + h + mg) { escaped = true; break; }
        }
        if (escaped) { cov.outOfBounds++; console.log('  OUTOFBOUNDS ' + id); }
        if (!shapesInside(svg, minx, miny, w, h)) { cov.shapeOutOfBounds++; console.log('  SHAPE_OUTOFBOUNDS ' + id); }
      }
    }
  }
}

check('every SVG has a valid numeric viewBox', cov.noViewBox === 0, cov.noViewBox + '');
check('every SVG is responsive (no fixed oversized width)', cov.notResponsive === 0, cov.notResponsive + '');
check('no SVG exceeds an A4-scalable viewBox', cov.oversized === 0, cov.oversized + '');
check('no raster / foreignObject (clean vector graphics)', cov.raster === 0, cov.raster + '');
check('all fonts are readable (>= 9px)', cov.tinyFont === 0, cov.tinyFont + '');
check('every diagram carries at least one label', cov.noLabel === 0, cov.noLabel + '');
check('no label escapes its viewBox (no clipped/demo labels)', cov.outOfBounds === 0, cov.outOfBounds + '');
check('no drawn line/bar/dot escapes its viewBox', cov.shapeOutOfBounds === 0, cov.shapeOutOfBounds + '');

console.log(JSON.stringify(cov, null, 2));
console.log(fails ? 'GRAPHICS_QUALITY_FAIL (' + fails + ')' : 'GRAPHICS_QUALITY_PASS');
process.exit(fails ? 1 : 0);
