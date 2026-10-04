import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./dist',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let path=resolve(root,`.${pathname}`);
    if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if((await stat(path)).isDirectory())path=resolve(path,'index.html');
    const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(body);
  }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(4321,'0.0.0.0',()=>console.log('Solar Forge preview: http://localhost:4321'));
