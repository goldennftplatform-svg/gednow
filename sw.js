const namePrefix='gednow:'+self.registration.scope+':',version=namePrefix+'2';
const files=['./','./index.html','./style.css','./trail.css','./studio.js','./lab.js','./lessons.js','./range.svg','./mark.svg','./icon192.png','./icon512.png','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(version).then(c=>c.addAll(files)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(namePrefix)&&k!==version).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&e.request.url.startsWith(self.registration.scope))e.respondWith(caches.open(version).then(async c=>(await c.match(e.request))||fetch(e.request)));});
