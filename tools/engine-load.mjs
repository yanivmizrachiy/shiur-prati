// tools/engine-load.mjs
// Shared loader: boots the full browser engine stack inside a Node VM with a
// minimal DOM/window/TOPICS stub, using the REAL question-types renderers so
// generated questionHTML/answerHTML can be inspected. Teacher mode is not loaded
// by default; historical/internal teacher verifiers must opt in explicitly.
// Returns { E, Teacher, pilotIds, sourceFitIds, callEngine }.
import fs from 'node:fs';
import vm from 'node:vm';

export function loadEngines(options = {}) {
  const noop = () => {};
  const elStub = { value: '', style: {}, addEventListener: noop, appendChild: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false } };
  const documentStub = {
    getElementById: () => elStub,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => elStub,
    addEventListener: noop,
    head: { appendChild: noop },
    body: { appendChild: noop }
  };
  const windowStub = { addEventListener: noop };
  const sandbox = {
    window: windowStub, document: documentStub, console, Math, Date,
    TOPICS: { 7: { numeric: [], algebra: [], geometry: [], uncertainty: [] },
              8: { numeric: [], algebra: [], geometry: [], uncertainty: [] } },
    generators: undefined, setTimeout: (f) => f && f(), renderMathInElement: noop
  };
  sandbox.window.document = documentStub;
  vm.createContext(sandbox);

  const base = [
    'schema.js', 'source-schema.js', 'source-registry.js', 'pedagogy-registry.js',
    'random.js', 'validators.js', 'themes.js', 'diagrams.js',
    'diagram-premium-overrides.js', 'diagram-ultra-autopilot.js',
    'question-types.js'
  ];
  const pilots = fs.readdirSync('generator/engine').filter(f => f.startsWith('pilot-')).sort();
  const sourceFit = [
    'source-fit-extensions.js', 'source-fit-graphs.js',
    'source-fit-geometry.js', 'source-fit-algebra-g7.js',
    'source-fit-dedicated.js',
    'source-fit-dedicated-2.js',
    'source-fit-uncertainty-deep.js',
    'pedagogy-attach.js',
    'follow-up.js'
  ];
  for (const f of base.concat(pilots).concat(sourceFit)) {
    const p = 'generator/engine/' + f;
    if (!fs.existsSync(p)) continue;
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  }
  // teacher-mode lives in generator/ (not generator/engine/). It is intentionally
  // opt-in so product gates do not silently depend on the retired main UI layer.
  if (options.loadTeacher === true && fs.existsSync('generator/teacher-mode.js')) {
    vm.runInContext(fs.readFileSync('generator/teacher-mode.js', 'utf8'), sandbox, { filename: 'teacher-mode.js' });
  }
  const E = sandbox.window.TargilimEngine;
  const Teacher = sandbox.window.Teacher;

  // pilot ids: derive from E.generateXxxEngine functions
  const pilotIds = [];
  for (const k of Object.keys(E)) {
    const m = k.match(/^generate([A-Z])(\d)(\d{2})Engine$/);
    if (m) pilotIds.push(m[1] + m[2] + '-' + m[3] + '-ENGINE');
  }
  pilotIds.sort();

  // source-fit ids: those resolvable through getEngineExercise but not pilots
  const sourceFitIds = ['N7-01-ENGINE', 'U7-03-ENGINE', 'A8-01-ENGINE', 'U7-04-ENGINE',
    'G8-02-ENGINE', 'G8-03-ENGINE', 'A7-04-ENGINE', 'A7-05-ENGINE',
    'U7-05-ENGINE', 'U7-06-ENGINE', 'U7-07-ENGINE', 'U7-08-ENGINE',
    'G8-06-ENGINE', 'G8-08-ENGINE', 'N7-08-ENGINE', 'N7-09-ENGINE',
    'G8-05-ENGINE', 'G8-07-ENGINE', 'G8-09-ENGINE', 'G7-06-ENGINE', 'G7-05-ENGINE',
    'N7-10-ENGINE', 'N7-11-ENGINE', 'N7-12-ENGINE', 'N7-13-ENGINE'];

  function fnName(id) {
    const b = id.replace(/-ENGINE$/, '').replace('-', '');
    return 'generate' + b + 'Engine';
  }
  // Unified call → {questionHTML, answerHTML} or null
  function callEngine(id, diff, qtype) {
    const fn = fnName(id);
    if (typeof E[fn] === 'function') {
      const r = E[fn](diff, qtype);
      if (r && (r.questionHTML || r.question)) {
        const meta = (r.meta) || (typeof E.buildMeta === 'function' ? E.buildMeta(id, qtype, diff, r.questionFamily) : null);
        return { questionHTML: r.questionHTML || r.question, answerHTML: r.answerHTML || r.answer, meta: meta };
      }
      return null;
    }
    if (typeof E.getEngineExercise === 'function') {
      const r = E.getEngineExercise(id, diff, qtype);
      if (r) return { questionHTML: r.questionHTML, answerHTML: r.answerHTML, meta: r.meta || (typeof E.buildMeta === 'function' ? E.buildMeta(id, qtype, diff) : null) };
    }
    return null;
  }

  return { E, Teacher, pilotIds, sourceFitIds, callEngine };
}
