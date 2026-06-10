import fs from 'node:fs';

const phase2Files = [
  'n7-03.js','n7-04.js','n7-05.js',
  'n8-ratio.js','n8-03.js',
  'u7-01.js','u7-02.js','u8-02.js',
  'a7-01.js','a7-02.js','a8-02.js','a8-03.js',
  'g7-01.js','g7-02.js','g8-01.js','g8-04.js'
];

const requiredFiles = [
  'generator/index.html',
  'generator/core.js',
  'generator/phase2-loader.js',
  ...phase2Files.map(f => 'generator/' + f),
  'PROJECT_STATUS.md'
];

const requiredIds = [
  'G7-01','G7-02','G7-03','G7-04',
  'N7-03','N7-04','N7-05','N7-06','N7-07',
  'A7-01','A7-02','A7-03',
  'U7-01','U7-02',
  'G8-01','G8-04',
  'N8-01','N8-02','N8-03','N8-04','N8-05',
  'A8-02','A8-03',
  'U8-01','U8-02'
];

function read(path) {
  if (!fs.existsSync(path)) throw new Error('Missing file: ' + path);
  return fs.readFileSync(path, 'utf8');
}

for (const file of requiredFiles) read(file);

const index = read('generator/index.html');
if (!index.includes('phase2-loader.js')) throw new Error('index.html does not load phase2-loader.js');

const loader = read('generator/phase2-loader.js');
for (const file of phase2Files) {
  if (!loader.includes(file)) throw new Error('phase2-loader.js does not load ' + file);
  const size = fs.statSync('generator/' + file).size;
  if (size < 200) throw new Error('Stub-like Phase 2 slice file detected: ' + file + ' is only ' + size + ' bytes');
}

const allJs = fs.readdirSync('generator')
  .filter(f => f.endsWith('.js'))
  .map(f => read('generator/' + f))
  .join('\n');

const status = read('PROJECT_STATUS.md');
for (const id of requiredIds) {
  if (!allJs.includes(id)) throw new Error('Missing slice id in generator code: ' + id);
  if (!status.includes(id)) throw new Error('Missing slice id in PROJECT_STATUS.md: ' + id);
}

if (!status.includes('Active generator slices (25)')) throw new Error('PROJECT_STATUS.md does not report 25 slices');
if (!status.includes('Grade 9 generator |')) throw new Error('Grade 9 status missing');
if (!status.includes('Locked')) throw new Error('Grade 9 is not clearly locked');
if (!status.includes('Live ⚠️')) throw new Error('PROJECT_STATUS.md should distinguish not-yet-live-verified slices');

console.log('PHASE2_STATIC_VERIFY_STRICT_OK: 25 slice IDs exist in code and status; loader, non-stub Phase 2 files, and Grade 9 lock verified.');
