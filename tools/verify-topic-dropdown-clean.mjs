// tools/verify-topic-dropdown-clean.mjs
// Loads the real main-page script stack in a small browser stub and verifies
// that the visible topic dropdown is clean for teachers: no duplicate labels,
// no duplicate values, and no internal engineering jargon.
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
function check(label, ok, detail = '') {
  if (ok) console.log('PASS - ' + label);
  else {
    console.log('FAIL - ' + label + (detail ? ': ' + detail : ''));
    fails++;
  }
}

const index = fs.readFileSync('generator/index.html', 'utf8');
const scripts = [...index.matchAll(/<script src="([^"]+)"/g)]
  .map(m => m[1].replace(/\?.*/, ''));
const noop = () => {};
const elements = {};

function makeEl(id) {
  return {
    id,
    value: '',
    innerHTML: '',
    textContent: '',
    style: {},
    dataset: {},
    className: '',
    disabled: false,
    checked: false,
    children: [],
    options: [],
    appendChild(child) {
      this.children.push(child);
      if (child && child.tagName === 'option') this.options.push(child);
    },
    remove: noop,
    addEventListener: noop,
    setAttribute: noop,
    getAttribute: () => null,
    classList: {
      add: noop,
      remove: noop,
      toggle: noop,
      contains: () => false
    }
  };
}

['sg', 'sd', 'st', 'gradeBadge'].forEach(id => { elements[id] = makeEl(id); });

const documentStub = {
  getElementById(id) { return elements[id] || (elements[id] = makeEl(id)); },
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement(tag) {
    const el = makeEl('');
    el.tagName = String(tag).toLowerCase();
    return el;
  },
  addEventListener: noop,
  head: { appendChild: noop },
  body: { appendChild: noop }
};

const windowStub = {
  addEventListener: noop,
  document: documentStub,
  location: { href: '' },
  URL: { createObjectURL: () => '', revokeObjectURL: noop }
};

const sandbox = {
  window: windowStub,
  document: documentStub,
  console,
  Math,
  Date,
  Blob: function Blob() {},
  URL: windowStub.URL,
  addEventListener: noop,
  setTimeout: f => f && f(),
  renderMathInElement: noop,
  html2canvas: noop,
  navigator: { clipboard: null },
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop }
};
sandbox.window.window = windowStub;
vm.createContext(sandbox);

const localScripts = scripts.filter(s => !/^https?:/.test(s));
const missingScripts = [];
const loadFailures = [];
for (const script of localScripts) {
  const path = 'generator/' + script;
  if (!fs.existsSync(path)) {
    missingScripts.push(script);
    continue;
  }
  try {
    vm.runInContext(fs.readFileSync(path, 'utf8'), sandbox, { filename: script });
  } catch (e) {
    loadFailures.push(script + ': ' + e.message);
  }
}

check('all local main-page scripts exist', missingScripts.length === 0, missingScripts.join(', '));
check('all local main-page scripts load in browser stub', loadFailures.length === 0, loadFailures.join(' | '));
check('onDomain function is available', typeof vm.runInContext('typeof onDomain', sandbox) === 'string' &&
  vm.runInContext('typeof onDomain', sandbox) === 'function');

const grades = ['7', '8'];
const domains = ['numeric', 'algebra', 'geometry', 'uncertainty'];
const jargon = /(מנוע|fallback|QA|Registry|גרסה חכמה|מקור קובץ|demo|דמו)/i;
let totalVisible = 0;

for (const grade of grades) {
  for (const domain of domains) {
    elements.sg.value = grade;
    elements.sd.value = domain;
    elements.st.children = [];
    elements.st.options = [];
    elements.st.innerHTML = '';
    try {
      vm.runInContext('onDomain()', sandbox);
    } catch (e) {
      check(`dropdown builds for ${grade}/${domain}`, false, e.message);
      continue;
    }
    const labels = elements.st.options.map(o => String(o.textContent || '').trim());
    const values = elements.st.options.map(o => String(o.value || '').trim());
    totalVisible += labels.length;
    const labelDup = [...new Set(labels.filter((x, i) => labels.indexOf(x) !== i))];
    const valueDup = [...new Set(values.filter((x, i) => values.indexOf(x) !== i))];
    const jargonHits = labels.filter(x => jargon.test(x));
    check(`dropdown has topics for ${grade}/${domain}`, labels.length > 0);
    check(`dropdown has no duplicate labels for ${grade}/${domain}`, labelDup.length === 0, labelDup.join(', '));
    check(`dropdown has no duplicate values for ${grade}/${domain}`, valueDup.length === 0, valueDup.join(', '));
    check(`dropdown has no internal jargon for ${grade}/${domain}`, jargonHits.length === 0, jargonHits.join(', '));
  }
}

check('visible dropdown contains 50 teacher-facing topics', totalVisible === 50, String(totalVisible));

if (fails) {
  console.error('TOPIC_DROPDOWN_CLEAN_FAIL');
  process.exit(1);
}

console.log('TOPIC_DROPDOWN_CLEAN_PASS');
