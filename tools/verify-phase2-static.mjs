import fs from 'node:fs';

const phase2Files = ['n7-03.js','n7-04.js','n7-05.js','n8-ratio.js','n8-03.js','u7-01.js','u7-02.js','u8-02.js','a7-01.js','a7-02.js','a8-02.js','a8-03.js','g7-01.js','g7-02.js','g8-01.js','g8-04.js'];
const requiredIds = ['G7-01','G7-02','G7-03','G7-04','N7-03','N7-04','N7-05','N7-06','N7-07','A7-01','A7-02','A7-03','U7-01','U7-02','G8-01','G8-04','N8-01','N8-02','N8-03','N8-04','N8-05','A8-02','A8-03','U8-01','U8-02'];

function read(path){ if(!fs.existsSync(path)) throw new Error('Missing file: '+path); return fs.readFileSync(path,'utf8'); }

for(const path of ['generator/index.html','generator/core.js','generator/export.js','generator/phase2-loader.js','generator/site-health.json','PROJECT_STATUS.md',...phase2Files.map(f=>'generator/'+f)]) read(path);

const index = read('generator/index.html');
if(!index.includes('phase2-loader.js')) throw new Error('index loader missing');
if(!index.includes('style.css')) throw new Error('style loader missing');
if(!index.includes('theme-color')) throw new Error('theme-color missing');
if(index.includes('value="9"')) throw new Error('Grade 9 UI option found');

const health = JSON.parse(read('generator/site-health.json'));
if(health.status !== 'ok') throw new Error('site-health status not ok');
if(health.activeSlices !== 25) throw new Error('site-health activeSlices must be 25');
if(!Array.isArray(health.activeGrades) || health.activeGrades.join(',') !== '7,8') throw new Error('activeGrades must be 7,8');

const exportJs = read('generator/export.js');
if(!exportJs.includes('copyImg')) throw new Error('copyImg missing');
if(!exportJs.includes('dlPNG')) throw new Error('dlPNG missing');

const loader = read('generator/phase2-loader.js');
for(const file of phase2Files){
  if(!loader.includes(file)) throw new Error('loader missing '+file);
  if(fs.statSync('generator/'+file).size < 200) throw new Error('stub-like file '+file);
}

const allJs = fs.readdirSync('generator').filter(f=>f.endsWith('.js')).map(f=>read('generator/'+f)).join('\n');
const status = read('PROJECT_STATUS.md');
for(const id of requiredIds){
  if(!allJs.includes(id)) throw new Error('missing code id '+id);
  if(!status.includes(id)) throw new Error('missing status id '+id);
}
if(!status.includes('Active generator slices (25)')) throw new Error('status missing 25 slices');
if(!status.includes('Live basic deployment')) throw new Error('status missing live deployment');
if(!status.includes('smart generator')) throw new Error('status must keep smart generator focus');
if(!status.includes('Live ⚠️')) throw new Error('status should distinguish pending live checks');

console.log('PHASE2_STATIC_VERIFY_STRICT_OK');
