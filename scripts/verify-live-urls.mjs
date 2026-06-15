/**
 * HTTP-check every internal href/src from the built site against a live base URL.
 * Usage: node scripts/verify-live-urls.mjs [baseUrl]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const siteBase = process.argv[2] ?? 'https://zahanturel.github.io/dadarathornaninstitute';
const pathBase = '/dadarathornaninstitute';

if (!fs.existsSync(dist)) {
  console.error('Run npm run build first.');
  process.exit(1);
}

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(dist);

const attrRe = /\b(?:href|src)=["']([^"']+)["']/g;
const urls = new Set();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = attrRe.exec(content)) !== null) {
    const u = m[1];
    if (u.startsWith(pathBase) || u.startsWith(`${pathBase}/`)) urls.add(u);
  }
}

const failures = [];
const malformed = [];

for (const url of [...urls].sort()) {
  if (url.includes('dadarathornaninstituteimages')) malformed.push(url);

  const absolute = `${siteBase.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
  try {
    let res = await fetch(absolute, { method: 'HEAD', redirect: 'follow' });
    if (res.status === 405 || res.status === 404) {
      res = await fetch(absolute, { method: 'GET', redirect: 'follow', headers: { Range: 'bytes=0-0' } });
    }
    if (!res.ok) failures.push({ url, status: res.status, absolute });
  } catch (err) {
    failures.push({ url, status: 'ERR', absolute, error: String(err) });
  }
  await new Promise((r) => setTimeout(r, 100));
}

console.log(`Checked ${urls.size} internal URLs on ${siteBase}\n`);

if (malformed.length) {
  console.error('MALFORMED:');
  malformed.forEach((u) => console.error('  -', u));
  console.error('');
}

if (failures.length) {
  console.error('FAILED:');
  for (const f of failures) console.error(`  - [${f.status}] ${f.url}`);
  process.exit(1);
}

console.log('All URLs returned HTTP 2xx.');
process.exit(0);
