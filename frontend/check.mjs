import {readFile,stat,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const entries=await readdir(root,{recursive:true});
const pages=entries.filter(p=>p.endsWith('.html'));
for(const file of pages){
 const html=await readFile(resolve(root,file),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: needs one h1`);
 assert.match(html,/<html lang="en">/);
 assert.match(html,/<meta name="viewport"/);
 assert.match(html,/id="main"/);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`${file}: duplicate ids`);
 for(const [,link] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:)/.test(link))continue;
  const [path,hash]=link.split('#');
  let target=path?resolve(path.startsWith('/')?root:dirname(resolve(root,file)),'.'+(path.startsWith('/')?path:'/'+path)):resolve(root,file);
  if((await stat(target)).isDirectory())target=resolve(target,'index.html');
  const content=await readFile(target,'utf8');
  if(hash)assert.ok(content.includes(`id="${hash}"`),`${file}: missing fragment ${link}`);
 }
}
const htmx=await readFile(resolve(root,'assets/htmx.min.js'),'utf8');
assert.match(htmx,/version="4\.0\.0"/);
console.log(`Checked ${pages.length} pages: internal links, assets, fragments, unique IDs, landmarks, and pinned HTMX version.`);
