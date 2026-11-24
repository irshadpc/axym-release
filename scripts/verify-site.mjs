#!/usr/bin/env node
/**
 * AXYM PORTAL — automated pre-deploy audit.
 * Exits 0 only when every structural, contract, routing and subpath check
 * passes. Run after `node scripts/sync-releases.mjs`.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const BASE = 'https://irshadpc.github.io/axym-release/';
const ROUTES = ['home', 'quickstart', 'setup', 'configuration', 'features', 'releases', 'operations'];

let failures = 0;
let passes = 0;

function check(label, ok, detail) {
  if (ok) { passes++; process.stdout.write(`  PASS  ${label}\n`); }
  else {
    failures++;
    process.stdout.write(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}\n`);
  }
}

function text(relativePath) {
  const full = join(ROOT, relativePath);
  return existsSync(full) ? readFileSync(full, 'utf8') : '';
}

function walk(dir) {
  const found = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

process.stdout.write('\nAXYM PORTAL PRE-DEPLOY AUDIT\n============================\n');

/* (a) required files exist and are non-empty */
process.stdout.write('\n[a] Required files\n');
const required = [
  'site/index.html', 'site/404.html', 'site/assets/styles.css',
  'site/assets/app.js', 'site/data/releases.json',
];
for (const rel of required) {
  const full = join(ROOT, rel);
  check(`${rel} exists and is non-empty`, existsSync(full) && statSync(full).size > 0);
}
check('site/.nojekyll exists', existsSync(join(SITE, '.nojekyll')));
check('site/robots.txt exists', existsSync(join(SITE, 'robots.txt')));
check('site/sitemap.xml exists', existsSync(join(SITE, 'sitemap.xml')));

const index = text('site/index.html');
const notFound = text('site/404.html');
const app = text('site/assets/app.js');
const content = text('site/assets/content.js');
const styles = text('site/assets/styles.css');
const robots = text('site/robots.txt');
const sitemap = text('site/sitemap.xml');
const workflow = text('.github/workflows/deploy-docs.yml');

/* (b) no production CDN and no dead links */
process.stdout.write('\n[b] Self-hosted assets and live links\n');
const allSiteText = [...walk(SITE).filter((f) => !statSync(f).isDirectory()).map((f) => readFileSync(f, 'utf8'))].join('\n');
check('zero cdn.tailwindcss.com references', allSiteText.indexOf('cdn.tailwindcss.com') === -1);
check('index.html loads self-hosted ./assets/styles.css', index.indexOf('href="./assets/styles.css"') !== -1);
check('index.html loads self-hosted ./assets/app.js', index.indexOf('src="./assets/app.js"') !== -1);
check('index.html has zero href="#" dead links', !/href\s*=\s*["']#["']/.test(index));
check('content.js has zero href="#" dead links', !/href\s*=\s*["']#["']/.test(content));
check('content.js has zero TODO / placeholder text', !/TODO|Details coming in this build/.test(content));

/* (c) JavaScript syntax */
process.stdout.write('\n[c] JavaScript syntax\n');
const jsFiles = [...walk(join(SITE, 'assets')).filter((f) => f.endsWith('.js')),
  ...walk(join(ROOT, 'scripts')).filter((f) => f.endsWith('.mjs'))];
for (const file of jsFiles) {
  let ok = true;
  let detail = '';
  try { execFileSync('node', ['--check', file], { stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { ok = false; detail = String(e.stderr || e.message).split('\n')[0]; }
  check(`node --check ${file.replace(ROOT + '/', '')}`, ok, detail);
}

/* (d) Contract A — release manifest */
process.stdout.write('\n[d] Contract A — releases.json\n');
let manifest = null;
try { manifest = JSON.parse(text('site/data/releases.json')); }
catch (e) { check('releases.json parses as JSON', false, e.message); }
if (manifest) {
  check('generatedAt is an ISO timestamp', !Number.isNaN(Date.parse(manifest.generatedAt)));
  check('repo is irshadpc/axym-release', manifest.repo === 'irshadpc/axym-release');
  check('tui.version is v0.23.0', manifest.tui?.version === 'v0.23.0');
  check('tui.releaseDate is ISO date', /^\d{4}-\d{2}-\d{2}$/.test(manifest.tui?.releaseDate || ''));
  check('tui.status is active', manifest.tui?.status === 'active');
  const install = manifest.tui?.install || {};
  check('tui.install has all four install keys',
    ['macos_arm', 'macos_intel', 'linux', 'source'].every((k) => typeof install[k] === 'string' && install[k].length > 0));
  check('tui.install URLs point at axym-release',
    [install.macos_arm, install.macos_intel, install.linux].every((v) => v.includes('github.com/irshadpc/axym-release/releases')));
  check('desktop.version is v12.17.0', manifest.desktop?.version === 'v12.17.0');
  check('desktop.crossOsVersion is v12.16.0', manifest.desktop?.crossOsVersion === 'v12.16.0');
  check('desktop.supportedRange is 12.13.x-12.17.x', manifest.desktop?.supportedRange === '12.13.x-12.17.x');
  check('desktop.eolRange is 12.12.x and earlier', manifest.desktop?.eolRange === '12.12.x and earlier');
  check('artifacts is a non-empty array', Array.isArray(manifest.artifacts) && manifest.artifacts.length > 0);
  let artifactsOk = true;
  for (const a of manifest.artifacts || []) {
    const shape = ['product', 'platform', 'version', 'label', 'file', 'status'].every((k) => typeof a[k] === 'string');
    const consistent = a.status === 'active'
      ? !!a.url && /^[a-f0-9]{64}$/.test(a.sha256 || '') && a.url.startsWith('https://github.com/irshadpc/axym-release/releases/')
      : !a.url && !a.sha256;
    if (!shape || !consistent || !['active', 'pending'].includes(a.status)) artifactsOk = false;
  }
  check('artifacts have valid shape and verified-or-pending hashes', artifactsOk);
}

/* (e) Contract B — all seven routes wired */
process.stdout.write('\n[e] Contract B — routes\n');
const orderMatch = content.match(/AXYM_NAV_ORDER\s*=\s*\[([^\]]+)\]/);
for (const route of ROUTES) {
  const inPages = new RegExp(`^\\s{2}${route}:\\s*\\{`, 'm').test(content);
  const inNav = index.includes(`data-nav="${route}"`);
  const inOrder = app.includes('AXYM_NAV_ORDER') && !!orderMatch && orderMatch[1].includes(`'${route}'`);
  check(`route #${route} wired in pages, nav and router order`, inPages && inNav && inOrder,
    `pages:${inPages} nav:${inNav} router:${inOrder}`);
}
check('app.js supports direct hash navigation', app.includes("window.location.hash") && app.includes("'hashchange'"));
check('app.js builds a dynamic right TOC', app.includes('buildToc') && app.includes("h2[id], h3[id]"));
check('app.js implements Cmd/Ctrl+K search', app.includes("'k'") && app.includes('search-overlay'));
check('app.js persists theme with try/catch localStorage', app.includes('localStorage.setItem') && index.includes('catch (e)'));

/* (f) canonical / sitemap / robots URLs */
process.stdout.write('\n[f] Canonical URLs\n');
check('index.html canonical is base URL', index.includes(`rel="canonical" href="${BASE}"`));
check('index.html og:url is base URL', index.includes(`property="og:url" content="${BASE}"`));
check('404.html canonical is base URL', notFound.includes(`rel="canonical" href="${BASE}"`));
check('robots.txt points to canonical sitemap', robots.includes(`Sitemap: ${BASE}sitemap.xml`));
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check('sitemap has loc entries', locs.length >= 8, `found ${locs.length}`);
check('every sitemap loc uses the canonical base', locs.length > 0 && locs.every((loc) => loc.startsWith(BASE)));

/* (g) subpath compatibility — no root-absolute asset/data paths */
process.stdout.write('\n[g] /axym-release/ subpath compatibility\n');
const absoluteAsset = /(?:\(["'`]|\burl\()\/(?:assets|data)\//;
check('no root-absolute /assets/ or /data/ paths in site files', !absoluteAsset.test(allSiteText));
check('data fetch is relative', app.includes("fetch('./data/releases.json')"));

/* workflow structure */
process.stdout.write('\n[h] Deploy workflow\n');
check('workflow triggers on push to main', /push:[\s\S]*?branches:\s*\[main\]/.test(workflow));
check('workflow triggers on release published + workflow_dispatch', workflow.includes('release:') && workflow.includes('workflow_dispatch:'));
check('workflow uses least-privilege permissions',
  workflow.includes('contents: read') && workflow.includes('pages: write') && workflow.includes('id-token: write'));
check('workflow runs sync + verify before deploy',
  workflow.indexOf('node scripts/sync-releases.mjs') !== -1 &&
  workflow.indexOf('node scripts/verify-site.mjs') !== -1 &&
  workflow.indexOf('node scripts/verify-site.mjs') < workflow.indexOf('actions/upload-pages-artifact@v3'));
check('workflow uses upload-pages-artifact@v3 and deploy-pages@v4',
  workflow.includes('actions/upload-pages-artifact@v3') && workflow.includes('actions/deploy-pages@v4'));

process.stdout.write(`\n============================\n${passes} passed, ${failures} failed\n`);
if (failures) process.exit(1);
process.stdout.write('AUDIT GREEN — portal is ready to deploy.\n');
