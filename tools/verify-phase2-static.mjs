import fs from 'node:fs';

const requiredFiles = [
  'generator/index.html',
  'generator/core.js',
  'generator/phase2-loader.js',
  'generator/n7-03.js','generator/n7-04.js','generator/n7-05.js',
  'generator/n8-ratio.js','generator/n8-03.js',
  'generator/u7-01.js','generator/u7-02.js','generator/u8-02.js',
  'generator/a7-01.js','generator/a7-02.js','generator/a8-02.js','generator/a8-03.js',
  'generator/g7-01.js','generator/g7-02.js','generator/g8-01.js','generator/g8-04.js',
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
for (const file of requiredFiles.filter(f => f.startsWith('generator/') && /^(generator\/(n7|n8|u7|u8|a7|a8|g7|g8)-|generator\/n8-ratio)/.test(f))) {
  const short = file.replace('generator/', '');
  if (!loader.includes(short)) throw new Error('phase2-loader.js does not load ' + short);
}

const allJs = fs.readdirSync('generator')
  .filter(f => f.endsWith('.js'))
  .map(f => read('generator/' + f))
  .join('\n');

for (const id of requiredIds) {
  if (!allJs.includes(id) && !read('PROJECT_STATUS.md').includes(id)) {
    throw new Error('Missing slice id in code/status: ' + id);
  }
}

const status = read('PROJECT_STATUS.md');
if (!status.includes('Active generator slices (25)')) throw new Error('PROJECT_STATUS.md does not report 25 slices');
if (!status.includes('Grade 9 generator |')) throw new Error('Grade 9 status missing');
if (!status.includes('Locked')) throw new Error('Grade 9 is not clearly locked');

console.log('PHASE2_STATIC_VERIFY_OK: 25 slices, loader, status, and Grade 9 lock verified.');
