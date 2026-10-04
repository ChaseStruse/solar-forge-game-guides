import {mkdir, rm, cp, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {home, aion, preview, notFound} from './src/pages.mjs';
import {timersPage} from './src/timers-page.mjs';
const output = fileURLToPath(new URL('./dist/', import.meta.url));
await rm(output, {recursive:true, force:true});
await mkdir(output, {recursive:true});
await cp(new URL('./public/', import.meta.url), output, {recursive:true});
for (const [path, render] of [['index.html',home], ['games/aion-2/index.html',aion], ['games/aion-2/timers/index.html',timersPage], ['preview/guide/index.html',preview], ['404.html',notFound]]) {
  const target = new URL(`./dist/${path}`, import.meta.url);
  await mkdir(new URL('.',target), {recursive:true});
  await writeFile(target,render());
}
console.log('Built 5 static pages into frontend/dist');
