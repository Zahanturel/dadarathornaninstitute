/**
 * Build the site and verify internal href/src URLs:
 * - no malformed base concatenation (e.g. dadarathornaninstituteimages)
 * - referenced static assets exist under dist/
 * - all JSON data asset paths resolve after applying base
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = '/dadarathornaninstitute';

console.log('Building site…');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

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
const malformed = [];
const missingFiles = [];
const missingPages = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = attrRe.exec(content)) !== null) {
    urls.add(m[1]);
  }
}

function distPathFromUrl(url) {
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('#') ||
    url.startsWith('//')
  ) {
    return null;
  }
  let p = url.split('?')[0].split('#')[0];
  if (p.startsWith(base)) p = p.slice(base.length);
  if (!p.startsWith('/')) p = `/${p}`;
  if (p.endsWith('/')) return path.join(dist, p.slice(1), 'index.html');
  const asFile = path.join(dist, p.slice(1));
  if (fs.existsSync(asFile)) return asFile;
  return path.join(dist, p.slice(1), 'index.html');
}

function isMalformed(url) {
  if (url.includes('dadarathornaninstituteimages')) return true;
  if (url.includes('dadarathornaninstitutedownloads')) return true;
  if (/dadarathornaninstitute[a-z]/i.test(url) && !url.includes('/dadarathornaninstitute/')) return true;
  return false;
}

for (const url of urls) {
  if (isMalformed(url)) malformed.push(url);

  const local = distPathFromUrl(url);
  if (!local) continue;

  if (!fs.existsSync(local)) {
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|pdf|doc|xls|css|js)$/i)) {
      missingFiles.push({ url, expected: path.relative(root, local) });
    } else if (!url.startsWith('#')) {
      missingPages.push({ url, expected: path.relative(root, local) });
    }
  }
}

// Scan JSON data for paths starting with /
const dataDir = path.join(root, 'src', 'data');
const jsonPaths = [];
function scanJson(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanJson(full);
    else if (entry.name.endsWith('.json')) {
      const text = fs.readFileSync(full, 'utf8');
      const re = /"(?:src|href)":\s*"(\/[^"]+)"/g;
      let m;
      while ((m = re.exec(text)) !== null) jsonPaths.push(m[1]);
    }
  }
}
scanJson(dataDir);

const jsonMissing = [];
for (const p of [...new Set(jsonPaths)]) {
  const local = path.join(dist, p.slice(1));
  if (!fs.existsSync(local)) jsonMissing.push({ path: p, expected: path.relative(root, local) });
}

console.log(`\nScanned ${htmlFiles.length} HTML files, ${urls.size} unique href/src values.`);
console.log(`Scanned ${jsonPaths.length} asset paths in src/data JSON.`);

// Source scan: dangerous BASE_URL concatenation without withBase()
const srcDir = path.join(root, 'src');
const srcFiles = [];
function walkSrc(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkSrc(full);
    else if (/\.(astro|ts|tsx|js|jsx)$/.test(entry.name)) srcFiles.push(full);
  }
}
walkSrc(srcDir);

const sourceIssues = [];
const badBaseRe = /BASE_URL\}[a-z/]/g;
const stripSlashRe = /\.replace\(\/\^\\\//;
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (badBaseRe.test(content)) {
    sourceIssues.push({ file: path.relative(root, file), issue: 'BASE_URL concatenated without withBase() or slash' });
  }
  if (stripSlashRe.test(content) && content.includes('${base}')) {
    sourceIssues.push({ file: path.relative(root, file), issue: 'Strips leading slash before joining with base' });
  }
}

if (sourceIssues.length) {
  console.log(`\nSource warnings (${sourceIssues.length}):`);
  for (const s of sourceIssues) console.log(`  - ${s.file}: ${s.issue}`);
}

console.log('');

let failed = false;

if (malformed.length) {
  failed = true;
  console.error('MALFORMED URLS (missing slash after base):');
  for (const u of [...new Set(malformed)]) console.error('  -', u);
  console.error('');
}

if (missingFiles.length) {
  failed = true;
  console.error('MISSING STATIC FILES (linked in HTML):');
  for (const { url, expected } of missingFiles) console.error(`  - ${url}\n    expected: ${expected}`);
  console.error('');
}

if (missingPages.length) {
  failed = true;
  console.error('MISSING PAGES (linked in HTML):');
  for (const { url, expected } of missingPages) console.error(`  - ${url}\n    expected: ${expected}`);
  console.error('');
}

if (jsonMissing.length) {
  failed = true;
  console.error('MISSING FILES (referenced in src/data JSON):');
  for (const { path: p, expected } of jsonMissing) console.error(`  - ${p}\n    expected: ${expected}`);
  console.error('');
}

if (!failed) {
  console.log('All internal asset and page paths look correct.');
  process.exit(0);
}

process.exit(1);
