/* GED Now LAN server. Run: node server.js */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8012;
const ROOT = path.join(__dirname, 'public');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

function lanIP() {
  for (const list of Object.values(os.networkInterfaces())) {
    for (const item of list) {
      if (item.family === 'IPv4' && !item.internal) return item.address;
    }
  }
  return '127.0.0.1';
}

http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split('?')[0]); }
  catch { res.writeHead(400); return res.end('Invalid path'); }
  if (urlPath.includes('\0')) { res.writeHead(400); return res.end('Invalid path'); }
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const file = path.resolve(ROOT, rel);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store, must-revalidate'
    });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(58));
  console.log("  GED NOW IS READY");
  console.log('='.repeat(58));
  console.log(`  On this computer:  http://localhost:${PORT}`);
  console.log(`  On other devices:  http://${lanIP()}:${PORT}`);
  console.log('  Press Ctrl+C to stop the server.');
  console.log('='.repeat(58));
});
