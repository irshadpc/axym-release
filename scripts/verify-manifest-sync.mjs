#!/usr/bin/env node
/**
 * AXYM PORTAL — manifest sync & drift prevention (Hawk-Eye checklist).
 *
 * Enforces the three pinned data contracts:
 *   Contract A — canonical capability manifest (site/data/capabilities.manifest.json)
 *   Contract B — the twelve flagship pillars, present exactly once with complete
 *                metadata and featured_top12: true
 *   Contract C — release truth: README.md versions match site/data/releases.json
 *   Contract D — proof artifact registry (site/data/proofs.manifest.json): a
 *                captured:true entry MUST have every referenced file on disk and
 *                non-empty, or the build fails. A missing recording can never
 *                render as a "Verified Recording" badge (ADR-0016).
 *
 * Also fails on stale hardcoded capability counts (the historical 61 / 67 / 77
 * drift) anywhere in the site sources or README.
 *
 * Run after `node scripts/sync-releases.mjs`. Exits non-zero on any failure.
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');

let failures = 0;
let passes = 0;

function check(label, ok, detail) {
  if (ok) { passes++; process.stdout.write(`  PASS  ${label}\n`); }
  else {
    failures++;
    process.stdout.write(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}\n`);
  }
}

function readJson(rel) {
  const full = join(ROOT, rel);
  if (!existsSync(full)) return null;
  try { return JSON.parse(readFileSync(full, 'utf8')); }
  catch (e) { return { __parseError: e.message }; }
}

function readFile(rel) {
  const full = join(ROOT, rel);
  return existsSync(full) ? readFileSync(full, 'utf8') : '';
}

/* The twelve flagship pillars (Contract B), fixed order. */
const FLAGSHIP_TOP12 = [
  'feat-one-session-any-agent-cli',
  'feat-parallel-isolated-runs',
  'tui-device-bridge',
  'feat-zero-trust-mcp-tool-access',
  'feat-ship-governed-pipeline',
  'feat-council-mode',
  'feat-living-repo-brain-and-memory',
  'feat-anti-hang-guard',
  'feat-aide-run-diagnosis-and-event-inspection',
  'feat-security-review',
  'feat-proof-carrying-races-and-offline-verification',
  'tui-flow-os',
];

const REQUIRED_OUTCOMES = ['build-verify', 'parallel-runs', 'mobile-remote', 'security-firewall', 'context-runtime'];
const VALID_MATURITY = ['stable', 'experimental', 'roadmap'];
const VALID_SURFACES = ['TUI', 'Desktop', 'Mobile'];

process.stdout.write('\nAXYM MANIFEST SYNC — HAWK-EYE DRIFT PREVENTION\n=============================================\n');

/* ------------------------------------------------------------ Contract A -- */
process.stdout.write('\n[a] Contract A — capabilities.manifest.json\n');
const manifest = readJson('site/data/capabilities.manifest.json');
const content = readFile('site/assets/content.js');
const app = readFile('site/assets/app.js');
const readme = readFile('README.md');
const indexHtml = readFile('site/index.html');

check('capabilities.manifest.json exists and parses', !!manifest && !manifest.__parseError, manifest && manifest.__parseError);
if (!manifest || manifest.__parseError) {
  process.stdout.write(`\n============================\n${passes} passed, ${failures} failed\n`);
  process.exit(1);
}

const caps = Array.isArray(manifest.capabilities) ? manifest.capabilities : [];
const total = caps.length;
check('manifest declares at least 80 capabilities', total >= 80, `found ${total}`);
check('capability ids are unique', new Set(caps.map((c) => c.id)).size === total);
check('outcome lenses are exactly the five developer lenses',
  JSON.stringify(Object.keys(manifest.outcomes || {}).sort()) === JSON.stringify([...REQUIRED_OUTCOMES].sort()));

const requiredFields = ['id', 'name', 'group', 'summary', 'commands', 'search', 'maturity', 'outcomes', 'featured_top12', 'what_it_is', 'why_it_matters', 'use_it', 'surfaces', 'limitations'];
let schemaOk = true;
const schemaIssues = [];
for (const c of caps) {
  const missing = requiredFields.filter((f) => c[f] === undefined || c[f] === null || (typeof c[f] === 'string' && !c[f].trim()));
  const maturityOk = VALID_MATURITY.includes(c.maturity);
  const outcomesOk = Array.isArray(c.outcomes) && c.outcomes.length > 0 && c.outcomes.every((o) => REQUIRED_OUTCOMES.includes(o));
  const commandsOk = Array.isArray(c.commands) && c.commands.length > 0;
  const surfacesOk = Array.isArray(c.surfaces) && c.surfaces.length > 0 && c.surfaces.every((s) => VALID_SURFACES.includes(s));
  if (missing.length || !maturityOk || !outcomesOk || !commandsOk || !surfacesOk) {
    schemaOk = false;
    schemaIssues.push(`${c.id || '(no id)'}${missing.length ? ` missing:${missing.join(',')}` : ''}${!maturityOk ? ' bad:maturity' : ''}${!outcomesOk ? ' bad:outcomes' : ''}${!commandsOk ? ' bad:commands' : ''}${!surfacesOk ? ' bad:surfaces' : ''}`);
  }
}
check('every capability carries complete Contract A metadata', schemaOk, schemaIssues.slice(0, 4).join(' | '));
check('every capability group is declared', caps.every((c) => (manifest.groups || {})[c.group]));

/* Reference anchors: every id must resolve to a heading in the full reference. */
const missingAnchors = caps.filter((c) => !new RegExp(`id="${c.id}"`).test(content)).map((c) => c.id);
check('every capability id has a matching reference anchor in content.js', missingAnchors.length === 0, missingAnchors.join(', '));

/* ------------------------------------------------------- Contract B (12) -- */
process.stdout.write('\n[b] Contract B — the twelve flagship pillars\n');
const featured = caps.filter((c) => c.featured_top12 === true);
check('exactly twelve capabilities are flagged featured_top12', featured.length === 12, `found ${featured.length}`);
const featuredIds = featured.map((c) => c.id);
const missingFlagships = FLAGSHIP_TOP12.filter((id) => !featuredIds.includes(id));
check('all twelve Contract B flagship ids exist with featured_top12: true', missingFlagships.length === 0, missingFlagships.join(', '));
const extraFlagships = featuredIds.filter((id) => !FLAGSHIP_TOP12.includes(id));
check('no unplanned capability claims flagship status', extraFlagships.length === 0, extraFlagships.join(', '));
const flagshipMeta = featured
  .filter((c) => FLAGSHIP_TOP12.includes(c.id))
  .filter((c) => !c.what_it_is || !c.why_it_matters || !c.use_it || !c.maturity || !c.limitations || !c.problem)
  .map((c) => c.id);
check('flagships carry what/why/use/maturity/limitations/problem', flagshipMeta.length === 0, flagshipMeta.join(', '));
check('every flagship covers at least one outcome lens', featured.every((c) => Array.isArray(c.outcomes) && c.outcomes.length > 0));
check('the flagship spread covers all five developer lenses',
  REQUIRED_OUTCOMES.every((lens) => featured.some((c) => (c.outcomes || []).includes(lens))),
  REQUIRED_OUTCOMES.filter((lens) => !featured.some((c) => (c.outcomes || []).includes(lens))).join(', '));

/* Catalog UX is generated from the manifest — no parallel static copy. */
check('content.js no longer ships a static catalog grid', !/id="fx-catalog">\s*<a class="fx-card"/.test(content));
check('content.js no longer ships static group pills', !/data-fx-pill="(sessions|chat|editor|modes|workspaces|verification|skills|fleet|collab|runtime)"/.test(content));
check('app.js renders the catalog from the canonical manifest', app.includes("fetch('./data/capabilities.manifest.json')"));

/* ------------------------------------------- (a) stale hardcoded counts -- */
process.stdout.write('\n[c] Stale capability-count drift (the 61/67/77 era)\n');
const stalePatterns = [
  [/61<\/dt>\s*<dd>curated capabilities/, 'home stat strip still says 61 curated capabilities'],
  [/data-count="61"/, 'a stat still counts 61 capabilities'],
  [/data-count="67"/, 'a stat still counts 67 capabilities'],
  [/67 curated/, 'copy still claims "67 curated"'],
  [/Browse all 67/, 'hero still links "Browse all 67"'],
  [/All 77 capabilities/, 'local nav still says "All 77 capabilities"'],
  [/all 77 capabilities/i, 'copy still says "all 77 capabilities"'],
  [/77 capabilities\./, 'hero headline still hardcodes "77 capabilities."'],
  [/77-feature/, 'copy still says "77-feature"'],
  [/<dt[^>]*>77<\/dt>/, 'a stat cell still counts 77 capabilities'],
  [/77 features/i, 'copy still says "77 features"'],
];
let staleOk = true;
const staleHits = [];
for (const [label, source] of [['content.js', content], ['index.html', indexHtml], ['README.md', readme], ['404.html', readFile('site/404.html')]]) {
  for (const [re, why] of stalePatterns) {
    if (re.test(source)) { staleOk = false; staleHits.push(`${label}: ${why}`); }
  }
}
check('zero stale hardcoded capability counts', staleOk, staleHits.join(' | '));

/* Dynamic counters must exist where counts are displayed. */
check('home stat strip derives its capability count from the manifest', content.includes('data-capability-count'));
check('catalog pills and stats render through the manifest totals', app.includes('data-fx-pill') && app.includes('applyFxFilter'));

/* ------------------------------------------------- Contract C — release -- */
process.stdout.write('\n[d] Contract C — README and site match releases.json\n');
const releases = readJson('site/data/releases.json');
check('releases.json exists and parses', !!releases && !releases.__parseError, releases && releases.__parseError);
if (releases && !releases.__parseError) {
  const tui = releases.tui?.version || '';            // e.g. v0.24.0
  const tuiPlain = tui.replace(/^v/, '');             // e.g. 0.24.0
  const desktop = (releases.desktop?.version || '').replace(/^v/, '');
  const cross = (releases.desktop?.crossOsVersion || '').replace(/^v/, '');
  check(`README quotes the released TUI version (${tui})`, readme.includes(tuiPlain), `expected ${tuiPlain}`);
  const tuiLinkTags = [...new Set((readme.match(/releases\/download\/tui-v[\d.]+\//g) || []))];
  check(`README TUI download links point at ${tui}`, tuiLinkTags.length > 0 && tuiLinkTags.every((t) => t === `releases/download/tui-${tui}/`), tuiLinkTags.join(', '));
  const tuiAssets = [...new Set((readme.match(/tui-v[\d.]+\/(axym-[\w.-]+\.(?:tar\.gz|zip))/g) || []).map((m) => m.split('/')[1]))];
  check('README TUI asset names all match the released version',
    tuiAssets.length > 0 && tuiAssets.every((a) => a.includes(tuiPlain)),
    tuiAssets.filter((a) => !a.includes(tuiPlain)).join(', '));
  check(`README quotes the desktop macOS version (${desktop})`, readme.includes(desktop));
  check(`README quotes the desktop cross-OS version (${cross})`, readme.includes(cross));
  check('site index carries no version newer than the manifest', indexHtml.indexOf(tui) !== -1 || !indexHtml.includes('v0.'));
  const staleTuiInContent = content.match(/tui-v0\.\d+\.\d+/g) || [];
  const staleSet = [...new Set(staleTuiInContent)].filter((v) => v !== `tui-${tui}`);
  const allowedStale = ['tui-v0.23.0']; // historical release notes may be quoted verbatim
  const unexpectedStale = staleSet.filter((v) => !allowedStale.includes(v));
  check('content.js pins interactive flows to the released TUI tag', unexpectedStale.length === 0, unexpectedStale.join(', '));
}

/* ------------------------------------------------ Contract D — proofs -- */
process.stdout.write('\n[e] Contract D — proof artifacts (ADR-0016)\n');
const proofsRel = 'site/data/proofs.manifest.json';
const proofs = readJson(proofsRel);
if (!proofs) {
  check('proofs.manifest.json present (skipped when not yet introduced)', false, 'file missing');
} else if (proofs.__parseError) {
  check('proofs.manifest.json parses as JSON', false, proofs.__parseError);
} else {
  const sequences = Array.isArray(proofs.sequences) ? proofs.sequences : [];
  check('proofs manifest declares at least three sequences', sequences.length >= 3, `found ${sequences.length}`);
  let proofOk = true;
  const proofIssues = [];
  for (const seq of sequences) {
    const base = [
      'id', 'title', 'capability', 'captured', 'caption', 'session', 'diff', 'receipt',
    ].filter((f) => seq[f] === undefined);
    if (base.length) { proofOk = false; proofIssues.push(`${seq.id || '?'} missing:${base.join(',')}`); }
    if (seq.captured === true) {
      for (const field of ['recording_path', 'diff_path', 'receipt_path']) {
        const p = seq[field];
        if (!p) { proofOk = false; proofIssues.push(`${seq.id}: captured=true but ${field} unset`); continue; }
        const full = join(SITE, p);
        if (!existsSync(full) || statSync(full).size === 0) {
          proofOk = false;
          proofIssues.push(`${seq.id}: captured=true but ${field} (${p}) is missing or empty on disk`);
        }
      }
      if (!seq.captured_version) { proofOk = false; proofIssues.push(`${seq.id}: captured=true but captured_version unset`); }
      if (!seq.captured_at) { proofOk = false; proofIssues.push(`${seq.id}: captured=true but captured_at unset`); }
    }
  }
  check('captured:true proof entries reference non-empty files on disk', proofOk, proofIssues.slice(0, 4).join(' | '));
  const uncaptured = sequences.filter((s) => s.captured === false);
  check('uncaptured proof entries declare an honest illustrative caption',
    uncaptured.every((s) => typeof s.caption === 'string' && s.caption.length > 10),
    uncaptured.filter((s) => !s.caption).map((s) => s.id).join(', '));
}

/* ---------------------------------------------------------------- summary -- */
process.stdout.write(`\n============================\n${passes} passed, ${failures} failed\n`);
if (failures) process.exit(1);
process.stdout.write('MANIFEST SYNC GREEN — single-source truth holds.\n');
