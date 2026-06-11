const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, 'public', 'images', 'pastRecruiter');

// Companies with known logo sources
// Strategy: try Clearbit first, then Wikipedia SVG, then company favicon
const downloads = [
  // ── Companies that likely have logos on Clearbit ─────────────────────────
  { file: 'gocomet.png',        urls: ['https://logo.clearbit.com/gocomet.com'] },
  { file: 'assaabloy.png',      urls: ['https://logo.clearbit.com/assaabloy.com'] },
  { file: 'intellipaat.png',    urls: ['https://logo.clearbit.com/intellipaat.com'] },
  { file: 'planetspark.png',    urls: ['https://logo.clearbit.com/planetspark.in'] },
  { file: 'mycaptain.png',      urls: ['https://logo.clearbit.com/mycaptain.in'] },
  { file: 'lawsikho.png',       urls: ['https://logo.clearbit.com/lawsikho.com'] },
  { file: 'vecv.png',           urls: ['https://logo.clearbit.com/vecv.in'] },
  { file: 'ncc.png',            urls: ['https://logo.clearbit.com/ncclimited.com'] },
  { file: 'indiamart.png',      urls: ['https://logo.clearbit.com/indiamart.com'] },
  { file: 'reliance.png',       urls: ['https://logo.clearbit.com/ril.com'] },
  { file: 'deloitte.png',       urls: ['https://logo.clearbit.com/deloitte.com'] },
  { file: 'airtel.png',         urls: ['https://logo.clearbit.com/airtel.in'] },
  { file: 'walmart.png',        urls: ['https://logo.clearbit.com/walmart.com'] },
  { file: 'apollo_tyres.png',   urls: ['https://logo.clearbit.com/apollotyres.com'] },
  { file: 'grasim.png',         urls: ['https://logo.clearbit.com/grasim.com'] },
  { file: 'balrampur.png',      urls: ['https://logo.clearbit.com/balrampurchini.com'] },
  { file: 'dcmshriram.png',     urls: ['https://logo.clearbit.com/dcmshriram.com'] },
  { file: 'meghaeng.png',       urls: ['https://logo.clearbit.com/mecindia.com'] },
  { file: 'adrosonic.png',      urls: ['https://logo.clearbit.com/adrosonic.com'] },
  { file: 'simpel.png',         urls: ['https://logo.clearbit.com/simpelgroup.com'] },
  { file: 'faceprep.png',       urls: ['https://logo.clearbit.com/faceprep.in'] },
  { file: 'averixis.png',       urls: ['https://logo.clearbit.com/averixis.com'] },
  { file: 'eduveda.png',        urls: ['https://logo.clearbit.com/eduveda.in'] },
  { file: 'glowlogics.png',     urls: ['https://logo.clearbit.com/glowlogics.com'] },
  { file: 'mindseekers.png',    urls: ['https://logo.clearbit.com/mindseekers.com'] },
  { file: 'persevex.png',       urls: ['https://logo.clearbit.com/persevex.com'] },
  { file: 'carnation.png',      urls: ['https://logo.clearbit.com/carnationinfotech.com'] },
  { file: 'asahi.png',          urls: ['https://logo.clearbit.com/aisglass.com'] },
  { file: 'triveni.png',        urls: ['https://logo.clearbit.com/trivenialmirah.com'] },
];

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0' },
      timeout: 8000,
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 500) return reject(new Error(`Too small (${buf.length}b) — probably error page`));
        fs.writeFileSync(destPath, buf);
        resolve(buf.length);
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function run() {
  const ok = [], fail = [];

  for (const item of downloads) {
    let success = false;
    for (const url of item.urls) {
      const destPath = path.join(logosDir, item.file);
      try {
        const size = await download(url, destPath);
        console.log(`OK   ${item.file}  (${size} bytes)  <- ${url}`);
        ok.push(item.file);
        success = true;
        break;
      } catch (e) {
        console.log(`FAIL ${item.file}: ${e.message}  <- ${url}`);
      }
    }
    if (!success) fail.push(item.file);
  }

  console.log(`\n=== Done: ${ok.length} downloaded, ${fail.length} failed ===`);
  if (fail.length) console.log('Failed:', fail.join(', '));
}

run();
