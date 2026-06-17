// tools/gen-visual-coverage-report.mjs
// Renders docs/reports/VISUAL_COVERAGE_MATRIX.json into a human-readable
// Markdown matrix for all 50 engines. Refresh the JSON first with:
// npm run verify:visual-coverage -- --write
import fs from 'node:fs';

const m = JSON.parse(fs.readFileSync('docs/reports/VISUAL_COVERAGE_MATRIX.json', 'utf8'));
const order = { essential: 0, recommended: 1, optional: 2 };
m.sort((a, b) => (order[a.visualExpectation] - order[b.visualExpectation]) || a.topicId.localeCompare(b.topicId));
const TAG = { essential: 'ציור חובה', recommended: 'ציור מומלץ', optional: 'ציור לא הכרחי' };

let out = '# מטריצת כיסוי חזותי — כל 50 המנועים\n\n';
out += '> נוצר אוטומטית מ-`VISUAL_COVERAGE_MATRIX.json` (verify:visual-coverage).\n';
out += '> ספים: essential ≥ 95% · recommended ≥ 30% · optional — ללא דרישה.\n\n';
const c = e => m.filter(x => x.visualExpectation === e);
out += `**סיכום:** ${c('essential').length} essential · ${c('recommended').length} recommended · ${c('optional').length} optional · `;
out += `${m.filter(x => x.status === 'PASS').length}/${m.length} PASS.\n\n`;
out += '| topicId | נושא | domain | ציפייה חזותית | דגימות | SVG | טבלה | % חזותי | סטטוס |\n';
out += '|---|---|---|---|---|---|---|---|---|\n';
for (const r of m) {
  out += `| \`${r.topicId}\` | ${r.topicName} | ${r.domain} | ${TAG[r.visualExpectation]} | ${r.samplesChecked} | ${r.samplesWithSvg} | ${r.samplesWithTable} | ${r.visualCoveragePercent}% | ${r.status} |\n`;
}
fs.writeFileSync('docs/reports/VISUAL_COVERAGE_REPORT_20260614.md', out);
console.log('Wrote docs/reports/VISUAL_COVERAGE_REPORT_20260614.md (' + m.length + ' engines)');
