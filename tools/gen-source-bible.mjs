// tools/gen-source-bible.mjs
// Generates docs/SOURCE_BIBLE.md from the pedagogy + source registries so the
// human-readable bible never drifts from the machine data. Run after editing
// pedagogy-registry.js:  node tools/gen-source-bible.mjs
import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {}, console, Math, Date, TOPICS: { 7: {}, 8: {} } };
vm.createContext(sandbox);
for (const f of ['source-schema.js', 'source-registry.js', 'pedagogy-registry.js'])
  vm.runInContext(fs.readFileSync('generator/engine/' + f, 'utf8'), sandbox, { filename: f });
const E = sandbox.window.TargilimEngine;

const DOMAINS = [['numeric', 'Numeric'], ['algebra', 'Algebra'], ['geometry', 'Geometry'], ['uncertainty', 'Uncertainty']];
const ids = Object.keys(E.PEDAGOGY);
const engineCount = Object.keys(E.SOURCE_REGISTRY || {}).filter(id => /-ENGINE$/.test(id)).length;
const fallbackCount = Object.keys(E.SOURCE_REGISTRY || {}).filter(id => !/-ENGINE$/.test(id)).length;

let md = '# SOURCE BIBLE — what the generator is allowed to create, and why\n\n';
md += '_Auto-generated from `generator/engine/pedagogy-registry.js` by `tools/gen-source-bible.mjs`._\n';
md += '_Do not edit by hand; edit the registry and regenerate._\n\n';
md += 'Sources 01–06 = direct question/example sources. 07–09 = principles, skills, ';
md += 'misconceptions, visual requirements. **File 10 is never a question source.**\n\n';
md += '- Topics: ' + ids.length + ' (' + engineCount + ' active engines + ' + fallbackCount + ' fallback)\n';
md += '- Question families: ' + ids.reduce((s, id) => s + (E.PEDAGOGY[id].families || []).length, 0) + '\n\n';

for (const [dom, title] of DOMAINS) {
  md += '## ' + title + '\n\n';
  const topics = ids.filter(id => (E.PEDAGOGY[id].domain === dom)).sort();
  for (const id of topics) {
    const p = E.PEDAGOGY[id];
    md += '### ' + id + ' — ' + p.topicName + (p.status === 'fallback' ? ' _(fallback)_' : '') + '\n\n';
    md += '- **Source PDF:** ' + p.sourceFile + ' · grade ' + p.grade + '\n';
    md += '- **Skill:** ' + p.skill + '\n';
    md += '- **Learning goal:** ' + p.learningGoal + '\n';
    md += '- **Teacher purpose:** ' + p.teacherPurpose + '\n';
    md += '- **Common misconceptions:** ' + (p.misconceptions.length ? p.misconceptions.join('; ') : (p.noMisconceptionJustification || '—')) + '\n';
    md += '- **Follow-up ideas:** ' + p.followUpIdeas.join('; ') + '\n';
    md += '- **Visual required:** ' + (p.requiredVisual ? 'yes' : 'no') + '\n';
    md += '- **Engine status:** ' + p.engineSupport + '\n';
    md += '\n  | family | qtypes | source pattern | misconception | variations |\n  |---|---|---|---|---|\n';
    for (const f of p.families) {
      md += '  | `' + f.questionFamily + '` | ' + f.qtypes.join('/') + ' | ' + f.sourceExampleOrPattern +
        ' | ' + f.commonMisconception + ' | ' + f.allowedVariations.join(', ') + ' |\n';
    }
    md += '\n';
  }
}
fs.writeFileSync('docs/SOURCE_BIBLE.md', md);
console.log('Wrote docs/SOURCE_BIBLE.md (' + ids.length + ' topics)');
