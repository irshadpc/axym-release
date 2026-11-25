#!/usr/bin/env node
/**
 * AXYM PORTAL — automated pre-deploy audit.
 * Exits 0 only when every structural, contract, routing, accessibility,
 * design-system and subpath check passes.
 * Run after `node scripts/sync-releases.mjs`.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const BASE = 'https://www.irshadpc.in/axym-release/';
const ROUTES = ['home', 'architecture', 'quickstart', 'setup', 'configuration', 'features', 'releases', 'operations'];

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
  'site/assets/app.js', 'site/assets/content.js', 'site/data/releases.json',
  'site/favicon.svg', 'site/assets/brand/og-image.png',
  'site/assets/brand/apple-touch-icon.png', 'site/assets/brand/favicon-32.png',
  'site/assets/brand/logo-mark.svg', 'site/assets/brand/logo-mark-frost.svg',
  'site/assets/fonts/geist-sans-variable.woff2',
  'site/assets/fonts/jetbrains-mono-latin-variable.woff2',
  'site/assets/fonts/LICENSES.md',
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
const allSiteText = [...walk(SITE).filter((f) => !statSync(f).isDirectory()).map((f) => readFileSync(f, 'utf8'))].join('\n');

/* (b) no production CDN, no dead links, no stale repository names */
process.stdout.write('\n[b] Self-hosted assets and live links\n');
check('zero cdn.tailwindcss.com references', allSiteText.indexOf('cdn.tailwindcss.com') === -1);
check('zero fonts.googleapis.com / fonts.gstatic.com references',
  allSiteText.indexOf('fonts.googleapis.com') === -1 && allSiteText.indexOf('fonts.gstatic.com') === -1);
check('zero legacy irshadpc/axym-community references', allSiteText.indexOf('irshadpc/axym-community') === -1);
check('zero private irshadpc/axym links', allSiteText.search(/github\.com\/irshadpc\/axym(?!-release)/) === -1);
const PUBLIC_REPO_URL = 'https://github.com/irshadpc/axym-release';
const ghUrls = [...allSiteText.matchAll(/https:\/\/github\.com\/irshadpc\/axym-release[^\s"'<)\\]*/g)].map((m) => m[0]);
const strayGhUrls = ghUrls.filter((u) => u !== PUBLIC_REPO_URL && !u.startsWith(`${PUBLIC_REPO_URL}/releases/download/`));
check('only the public repo URL and direct download URLs remain', strayGhUrls.length === 0, strayGhUrls.join(', '));
check('zero source-repository / build-from-source references',
  !/build from source|source repositor|source commit|git clone|local ci|command deck|repository|report an issue|report issues|discussions|feature catalog on github|private repo|core engine repo/i.test(allSiteText));
check('index.html loads self-hosted ./assets/styles.css', index.indexOf('href="./assets/styles.css"') !== -1);
check('index.html loads self-hosted ./assets/app.js', index.indexOf('src="./assets/app.js"') !== -1);
check('index.html has zero href="#" dead links', !/href\s*=\s*["']#["']/.test(index));
check('content.js has zero href="#" dead links', !/href\s*=\s*["']#["']/.test(content));
check('content.js has zero TODO / placeholder text', !/TODO|Details coming in this build/.test(content));
check('no dead TUI install.sh URL', !/releases\/download\/tui-[^/"']+\/install\.sh/.test(allSiteText));
check('desktop installer URL is the published desktop-v12.17.0 asset',
  content.includes('releases/download/desktop-v12.17.0/install-macos.sh'));

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
  check('tui.install has macos_arm, macos_intel, linux, windows',
    ['macos_arm', 'macos_intel', 'linux', 'windows'].every((k) => typeof install[k] === 'string' && install[k].length > 0));
  check('tui.install has no source/build-from-source entry', !('source' in install));
  check('tui.install URLs point at axym-release',
    [install.macos_arm, install.macos_intel, install.linux, install.windows].every((v) => v.includes('github.com/irshadpc/axym-release/releases')));
  check('tui install commands extract archives, never pipe install.sh',
    [install.macos_arm, install.macos_intel, install.linux].every((v) => v.includes('tar -xzf') && !v.includes('install.sh')));
  check('desktop.version is v12.17.0', manifest.desktop?.version === 'v12.17.0');
  check('desktop.crossOsVersion is v12.16.0', manifest.desktop?.crossOsVersion === 'v12.16.0');
  check('desktop.supportedRange is 12.13.x-12.17.x', manifest.desktop?.supportedRange === '12.13.x-12.17.x');
  check('desktop.eolRange is 12.12.x and earlier', manifest.desktop?.eolRange === '12.12.x and earlier');
  check('desktop macOS installer is pinned to desktop-v12.17.0',
    typeof manifest.desktop?.install?.macos === 'string' && manifest.desktop.install.macos.includes('desktop-v12.17.0/install-macos.sh'));
  check('artifacts is a non-empty array', Array.isArray(manifest.artifacts) && manifest.artifacts.length >= 6);
  let artifactsOk = true;
  for (const a of manifest.artifacts || []) {
    const shape = ['product', 'platform', 'version', 'label', 'file', 'status'].every((k) => typeof a[k] === 'string');
    const consistent = a.status === 'active'
      ? !!a.url && /^[a-f0-9]{64}$/.test(a.sha256 || '') && a.url.startsWith('https://github.com/irshadpc/axym-release/releases/')
      : !a.url && !a.sha256;
    if (!shape || !consistent || !['active', 'pending'].includes(a.status)) artifactsOk = false;
  }
  check('artifacts have valid shape and verified-or-pending hashes', artifactsOk);
  check('history is a non-empty verified list', Array.isArray(manifest.history) && manifest.history.length >= 5);
  const historyOk = (manifest.history || []).every((h) =>
    typeof h.tag === 'string' && typeof h.name === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(h.date || '') && !('url' in h));
  check('history entries carry tag, name and ISO date without external links', historyOk);
}

/* (e) Contract B — all eight routes wired */
process.stdout.write('\n[e] Contract B — routes\n');
const orderMatch = content.match(/AXYM_NAV_ORDER\s*=\s*\[([^\]]+)\]/);
for (const route of ROUTES) {
  const inPages = new RegExp(`^\\s{2}${route}:\\s*\\{`, 'm').test(content);
  const inNav = index.includes(`data-nav="${route}"`);
  const inOrder = app.includes('AXYM_NAV_ORDER') && !!orderMatch && orderMatch[1].includes(`'${route}'`);
  check(`route #${route} wired in pages, nav and router order`, inPages && inNav && inOrder,
    `pages:${inPages} nav:${inNav} router:${inOrder}`);
}
check('architecture route uses the docs layout so its side navigation and TOC are visible', /architecture:\s*\{[\s\S]{0,120}layout:\s*'docs'/.test(content));
check('architecture headings carry ids for the on-this-page TOC', ['execution-model', 'stage-contract', 'lifecycle-states', 'verification-loop'].every((id) => content.includes(`id="${id}"`)));
check('docs routes declare layout: docs', /quickstart:\s*\{[\s\S]{0,120}layout:\s*'docs'/.test(content));
check('app.js supports direct hash navigation', app.includes('window.location.hash') && app.includes("'hashchange'"));
check('app.js builds a dynamic right TOC', app.includes('buildToc') && app.includes('h2[id], h3[id]'));
check('app.js implements Cmd/Ctrl+K search', app.includes("'k'") && app.includes('search-overlay'));
check('app.js persists theme with try/catch localStorage', app.includes('localStorage.setItem') && index.includes('catch (e)'));
check('theme modes are light, dark and system', ['light', 'dark', 'system'].every((m) => index.includes(`data-theme-choice="${m}"`)));
check('pre-paint theme script sets data-theme and color-scheme',
  index.includes('dataset.theme') && index.includes('color-scheme'));
check('code scroll regions are made keyboard-focusable', app.includes('enhanceCodeRegions') && app.includes("setAttribute('tabindex', '0')"));

/* (f) canonical / sitemap / robots URLs */
process.stdout.write('\n[f] Canonical URLs\n');
check('index.html canonical is base URL', index.includes(`rel="canonical" href="${BASE}"`));
check('index.html og:url is base URL', index.includes(`property="og:url" content="${BASE}"`));
check('index.html og:image is a self-hosted absolute URL',
  index.includes(`property="og:image" content="${BASE}assets/brand/og-image.png"`));
check('404.html canonical is base URL', notFound.includes(`rel="canonical" href="${BASE}"`));
check('robots.txt points to canonical sitemap', robots.includes(`Sitemap: ${BASE}sitemap.xml`));
check('no irshadpc.github.io host references remain', allSiteText.indexOf('irshadpc.github.io') === -1);
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check('sitemap has at least 9 loc entries', locs.length >= 9, `found ${locs.length}`);
check('every sitemap loc uses the canonical base', locs.length > 0 && locs.every((loc) => loc.startsWith(BASE)));
check('sitemap includes the architecture route', sitemap.includes(`${BASE}#architecture`));

/* (g) subpath compatibility — no root-absolute asset/data paths */
process.stdout.write('\n[g] /axym-release/ subpath compatibility\n');
const absoluteAsset = /(?:\(["'`]|\burl\()\/(?:assets|data)\//;
check('no root-absolute /assets/ or /data/ paths in site files', !absoluteAsset.test(allSiteText));
check('data fetch is relative', app.includes("fetch('./data/releases.json')"));

/* (h) design system and accessibility affordances */
process.stdout.write('\n[h] Design system and accessibility\n');
check('primitive graphite palette is defined', styles.includes('--p-graphite-1000') && styles.includes('--p-graphite-300'));
check('semantic canvas/text tokens are defined', styles.includes('--canvas:') && styles.includes('--text-muted:'));
check('light theme is defined', styles.includes('html[data-theme="light"]'));
check('dark theme is defined', styles.includes('html[data-theme="dark"]'));
check('reduced-motion support is present', styles.includes('prefers-reduced-motion'));
check('forced-colors support is present', styles.includes('forced-colors'));
check('focus-visible styling is present', styles.includes(':focus-visible'));
check('self-hosted @font-face declarations exist', styles.includes('geist-sans-variable.woff2') && styles.includes('jetbrains-mono-latin-variable.woff2'));
check('skip link is present', index.includes('skip-link') && index.includes('href="#app"'));
check('route changes are announced', app.includes('route-announcer') && app.includes('aria-live'));
check('mobile navigation is a modal dialog', index.includes('id="mobile-nav"') && index.includes('aria-modal="true"'));
check('search is a modal dialog', index.includes('id="search-overlay"') && index.includes('role="dialog"'));
check('theme menu uses menuitemradio semantics', index.includes('role="menuitemradio"'));
check('every page defines an h1', (content.match(/<h1[\s>]/g) || []).length >= ROUTES.length);
check('maturity labels distinguish Available / Experimental / Roadmap',
  content.includes('Available') && content.includes('Experimental') && content.includes('Roadmap'));

/* workflow structure */
process.stdout.write('\n[i] Deploy workflow\n');
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
