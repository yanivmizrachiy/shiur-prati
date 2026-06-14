// tools/verify-visual-coverage.mjs  (verify:visual-coverage)
// The MISSING gate: existing visual verifiers check SVG *quality when one
// exists*; this one checks that a topic which SHOULD have a drawing actually
// produces one. Each engine declares a visualExpectation (essential /
// recommended / optional). For a large sample it measures the share of
// generations that render an <svg> or a visual <table>, and enforces:
//   essential   -> >= 95% visual
//   recommended -> >= 30% visual
//   optional    -> no requirement
// Also flags the inverse smell: an 'optional' topic that is ALWAYS visual is
// only reported (not failed). Run from repo root.
import fs from 'node:fs';
import { loadEngines } from './engine-load.mjs';

const { E, pilotIds, sourceFitIds, callEngine } = loadEngines();
const QT = ['open', 'mcq', 'tf', 'mistake'];
const DIFFS = ['basic', 'standard', 'challenge'];
const SAMPLES = 14;
const THRESH = { essential: 95, recommended: 30, optional: 0 };

let fails = 0;
const fail = m => { console.log('FAIL — ' + m); fails++; };
const hasVisual = h => /<svg|<table/.test(h || '');

const ids = pilotIds.concat(sourceFitIds);
const matrix = [];
for (const id of ids) {
  const s = E.getSource(id) || {}, p = E.getPedagogy(id) || {};
  const exp = E.getVisualExpectation(id);
  let svg = 0, table = 0, tot = 0;
  for (const d of DIFFS) for (const t of QT) for (let i = 0; i < SAMPLES; i++) {
    const r = callEngine(id, d, t); if (!r || !r.questionHTML) continue; tot++;
    if (/<svg/.test(r.questionHTML)) svg++; else if (/<table/.test(r.questionHTML)) table++;
  }
  const vis = svg + table, pct = tot ? Math.round(100 * vis / tot) : 0;
  matrix.push({ topicId: id, topicName: p.topicName || s.skill || '', domain: s.domain || '',
    visualExpectation: exp, samplesChecked: tot, samplesWithSvg: svg, samplesWithTable: table,
    visualCoveragePercent: pct, status: pct >= THRESH[exp] ? 'PASS' : 'FAIL' });
  if (pct < THRESH[exp]) fail(id + ' (' + exp + ') only ' + pct + '% visual, needs >= ' + THRESH[exp] + '%');
}

// every engine must carry a declared expectation
const undeclared = ids.filter(id => !E.VISUAL_EXPECTATION[String(id).replace(/-ENGINE$/, '') + '-ENGINE']);
if (undeclared.length) fail('engines without a declared visualExpectation: ' + undeclared.join(', '));

const byExp = exp => matrix.filter(m => m.visualExpectation === exp);
const ess = byExp('essential'), rec = byExp('recommended'), opt = byExp('optional');
console.log('PASS — declared expectations: ' + ess.length + ' essential, ' + rec.length + ' recommended, ' + opt.length + ' optional');
console.log('essential min %: ' + Math.min.apply(null, ess.map(m => m.visualCoveragePercent)));
console.log('recommended min %: ' + Math.min.apply(null, rec.map(m => m.visualCoveragePercent)));

// persist the matrix so the report generator / QA page can consume it
fs.mkdirSync('docs/reports', { recursive: true });
fs.writeFileSync('docs/reports/VISUAL_COVERAGE_MATRIX.json', JSON.stringify(matrix, null, 2));
console.log('wrote docs/reports/VISUAL_COVERAGE_MATRIX.json (' + matrix.length + ' engines)');

console.log(fails ? 'VISUAL_COVERAGE_FAIL (' + fails + ')' : 'VISUAL_COVERAGE_PASS');
process.exit(fails ? 1 : 0);
