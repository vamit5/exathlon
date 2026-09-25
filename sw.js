// EXATHLEAGUE: omogućava instalaciju na telefon. Stranica se uvek učitava sveža sa servera.
const C='exathleague-v3';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const page=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
  e.respondWith(fetch(e.request,page?{cache:'no-store'}:{}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));
});
