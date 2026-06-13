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

const cov = { svgChecked: 0, noViewBox: 0, tinyFont: 0, raster: 0, noLabel: 0, outOfBounds: 0, oversized: 0, notResponsive: 0 };
const ids = pilotIds.concat(sourceFitIds);

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

console.log(JSON.stringify(cov, null, 2));
console.log(fails ? 'GRAPHICS_QUALITY_FAIL (' + fails + ')' : 'GRAPHICS_QUALITY_PASS');
process.exit(fails ? 1 : 0);
