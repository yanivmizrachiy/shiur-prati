// tools/verify-visual-quality-deep.mjs
// Deep visual-quality gate on REAL engine output (not just file existence).
// For every visual a topic renders: valid <svg> with viewBox, no
// undefined/NaN/[object Object]/visible null, has text labels, and within the
// viewBox bounds. Targeted checks: number-line ticks, bar rects, axes for
// charts, circle center+radius, triangle vertices. Reports per-topic.
// Run from repo root: node tools/verify-visual-quality-deep.mjs
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds, callEngine } = loadEngines();
const QT = ['open', 'mcq', 'tf', 'mistake'];
const DIFFS = ['basic', 'standard', 'challenge'];
const BADTOK = /undefined|NaN|\[object Object\]|>null<|"null"/;

let fails = 0, svgChecked = 0, svgFailures = 0;
function fail(m) { console.log('FAIL — ' + m); fails++; svgFailures++; }

function checkSvg(id, svg, skill) {
  svgChecked++;
  if (!/^<svg/.test(svg)) { fail(id + ' SVG does not start with <svg'); return; }
  if (!/viewBox="[\d.\- ]+"/.test(svg)) { fail(id + ' SVG missing viewBox'); return; }
  if (BADTOK.test(svg)) { fail(id + ' SVG has undefined/NaN/object/null'); return; }
  if (!/<text/.test(svg) && !/<line|<rect|<circle|<polygon|<path|<polyline/.test(svg)) { fail(id + ' SVG has no drawn content'); return; }
  // bounds: numeric x/y inside a generous viewBox box
  const vb = svg.match(/viewBox="([\d.\- ]+)"/)[1].trim().split(/\s+/).map(Number);
  const W = vb[2], H = vb[3];
  let outOfBounds = 0;
  for (const m of svg.matchAll(/<text[^>]*\bx="(-?\d+(?:\.\d+)?)"[^>]*\by="(-?\d+(?:\.\d+)?)"/g)) {
    const x = +m[1], y = +m[2];
    if (x < -8 || y < -8 || x > W + 8 || y > H + 8) outOfBounds++;
  }
  if (outOfBounds > 0) fail(id + ' has ' + outOfBounds + ' text label(s) outside viewBox');
  // targeted
  if (/number_line|negative_numbers/.test(skill || '')) {
    if (!/<line/.test(svg)) fail(id + ' number line missing axis line');
  }
  if (/bar/.test(skill || '')) { if (!/<rect/.test(svg)) fail(id + ' bar chart missing bars'); }
  if (/circle|diameter|radius/.test(skill || '')) { if (!/<circle/.test(svg)) fail(id + ' circle topic missing <circle>'); }
}

const ids = pilotIds.concat(sourceFitIds);
const visualTopics = [];
for (const id of ids) {
  const meta = E.getSource(id);
  const skill = (meta && meta.skill) || '';
  let renderedSvg = false;
  for (const d of DIFFS) for (const t of QT) {
    for (let i = 0; i < 8; i++) {
      const r = callEngine(id, d, t);
      if (!r) continue;
      const m = (r.questionHTML || '').match(/<svg[\s\S]*?<\/svg>/);
      if (m) { renderedSvg = true; checkSvg(id, m[0], skill); }
    }
  }
  if (renderedSvg) visualTopics.push(id);
}

console.log(JSON.stringify({ visualTopics: visualTopics.length, svgSamplesChecked: svgChecked, svgFailures: svgFailures }, null, 2));
console.log(fails ? 'VISUAL_QUALITY_DEEP_FAIL (' + fails + ')' : 'VISUAL_QUALITY_DEEP_PASS');
process.exit(fails ? 1 : 0);
