#!/usr/bin/env node
/**
 * AXYM RELEASE MANIFEST GENERATOR
 * --------------------------------
 * Generates `site/data/releases.json` (Contract A) from real published GitHub
 * releases in `irshadpc/axym-release`.
 *
 * Sources, in order:
 *   1. `gh release view` (authenticated, live) — versions, dates, asset names,
 *      download URLs and SHA-256 digests are read from the real releases.
 *   2. A checked-in, verified baseline (real values captured 2026-11-24) when
 *      `gh` is unavailable, unauthenticated or offline.
 *
 * The fallback NEVER invents a checksum. A platform with no published asset is
 * emitted with status "pending" and no url/sha256; the site renders a
 * "Pending release build" badge for it.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(HERE, '../site/data/releases.json');

const REPO = 'irshadpc/axym-release';
const REPO_URL = `https://github.com/${REPO}`;
const DOWNLOADS = `${REPO_URL}/releases/download`;
const TUI_TAG = 'tui-v0.23.0';
const TUI_VERSION = '0.23.0';
const DESKTOP_TAG = 'desktop-v12.17.0';

// Verified release history (tags, names and dates read from GitHub).
// Notes are limited to statements supported by the release body or README.
const RELEASE_HISTORY = [
  {
    tag: 'tui-v0.23.0', product: 'TUI', version: '0.23.0', date: '2026-11-05', name: 'Axym TUI 0.23.0',
    note: 'Terminal capability probing, a fullscreen inline-image viewer, and mouse/focus handling that restores terminal state on exit.',
  },
  {
    tag: 'desktop-v12.17.0', product: 'Desktop', version: '12.17.0', date: '2026-11-04', name: 'Axym Desktop 12.17.0',
    note: 'Runtime correctness fixes, fresh-context review, multi-provider orchestration, the remote tunnel and the plugin system. macOS build this cycle.',
  },
  {
    tag: 'tui-v0.22.0', product: 'TUI', version: '0.22.0', date: '2026-11-04', name: 'Axym TUI 0.22.0',
    note: 'Standalone TUI binaries for macOS, Linux x86_64 and Windows x86_64.',
  },
  {
    tag: 'tui-v0.21.1', product: 'TUI', version: '0.21.1', date: '2026-10-30', name: 'Axym TUI 0.21.1',
    note: 'Patch release with standalone TUI binaries for macOS, Linux x86_64 and Windows x86_64.',
  },
  {
    tag: 'tui-v0.21.0', product: 'TUI', version: '0.21.0', date: '2026-10-27', name: 'Axym TUI 0.21.0',
    note: 'Standalone TUI binaries for macOS, Linux x86_64 and Windows x86_64.',
  },
  {
    tag: 'desktop-v12.16.0', product: 'Desktop', version: '12.16.0', date: '2026-10-26', name: 'Axym Desktop 12.16.0',
    note: 'Desktop packages for macOS, Linux and Windows. This remains the newest cross-platform desktop build.',
  },
];


// ---------------------------------------------------------------------------
// Verified baseline — real release metadata (captured from GitHub 2026-11-24)
// ---------------------------------------------------------------------------
const BASELINE_RELEASES = {
  'tui-v0.23.0': {
    tagName: 'tui-v0.23.0',
    publishedAt: '2026-11-05T18:10:00Z',
    assets: [
      { name: 'axym-0.23.0-macos.tar.gz', digest: 'sha256:6f4f24af2bbd0591fedccc6cb26a5b9297bc0626c1cd2a37fe3727f86b1dd2a9', size: 55363441 },
      { name: 'axym-0.23.0-linux-x86_64.tar.gz', digest: 'sha256:a4b7df9d21fd48671d3d554cbe1aae6a6434d7d7a6508ff162c23e286ca06758', size: 37233856 },
      { name: 'axym-0.23.0-windows-x86_64.zip', digest: 'sha256:be97174e03f0752d0057ba6bf8b859a5975bd442e1df8a3b520a3501af33c6f9', size: 40398732 },
      { name: 'SHA256SUMS.txt', digest: 'sha256:ffba6684656a56e5182c7c7e7a871fdb9bdbbfdfa380c0a0fdfda467c9b28120', size: 584 },
    ],
  },
  'desktop-v12.17.0': {
    tagName: 'desktop-v12.17.0',
    publishedAt: '2026-11-04T07:45:45Z',
    assets: [
      { name: 'Axym_12.17.0_universal.dmg', digest: 'sha256:8d6e1fac34700d30202198911b396350709c9b59e2b0b2d2d1d0423d8d418ec9', size: 34853631 },
      { name: 'Axym.app.tar.gz', digest: 'sha256:345f265b530ffece02c28e39f01de5273948dbecdefb9f8384d7b7596b266840', size: 35714203 },
      { name: 'latest.json', digest: 'sha256:dce8cfe082adb15f9d692d499f5011e54fe92405ef6b876e5bb7b6665e03b2cb', size: 1226 },
    ],
  },
  'desktop-v12.16.0': {
    tagName: 'desktop-v12.16.0',
    publishedAt: '2026-10-26T04:33:01Z',
    assets: [
      { name: 'axym-12.16.0-linux-x86_64.tar.gz', digest: 'sha256:7a3928be77162f2bf401f0c49c95cab2735d57bd0074acc9f0a37f79a862118f', size: 17542699 },
      { name: 'axym-12.16.0-windows-x86_64.zip', digest: 'sha256:cc3eabdf4a6798997c2d1283df913d044ed41f174947d95f4daa9a59940196e0', size: 16546668 },
    ],
  },
};

// The platform matrix the site renders. `file` is matched against real assets.
const ARTIFACT_MATRIX = [
  { product: 'tui', platform: 'macos', version: '0.23.0', tag: 'tui-v0.23.0', file: 'axym-0.23.0-macos.tar.gz', label: 'macOS (Apple Silicon + Intel)' },
  { product: 'tui', platform: 'linux', version: '0.23.0', tag: 'tui-v0.23.0', file: 'axym-0.23.0-linux-x86_64.tar.gz', label: 'Linux x86_64' },
  { product: 'tui', platform: 'windows', version: '0.23.0', tag: 'tui-v0.23.0', file: 'axym-0.23.0-windows-x86_64.zip', label: 'Windows x86_64' },
  { product: 'desktop', platform: 'macos', version: '12.17.0', tag: 'desktop-v12.17.0', file: 'Axym_12.17.0_universal.dmg', label: 'macOS (universal .dmg)' },
  { product: 'desktop', platform: 'linux', version: '12.16.0', tag: 'desktop-v12.16.0', file: 'axym-12.16.0-linux-x86_64.tar.gz', label: 'Linux x86_64 (latest cross-OS build)' },
  { product: 'desktop', platform: 'windows', version: '12.16.0', tag: 'desktop-v12.16.0', file: 'axym-12.16.0-windows-x86_64.zip', label: 'Windows x86_64 (latest cross-OS build)' },
];

function fetchRelease(tag) {
  try {
    const raw = execFileSync(
      'gh',
      ['release', 'view', tag, '--repo', REPO, '--json', 'tagName,publishedAt,assets'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 20000 },
    );
    const release = JSON.parse(raw);
    if (!release.tagName || !Array.isArray(release.assets)) throw new Error('unexpected release payload');
    return {
      tagName: release.tagName,
      publishedAt: release.publishedAt,
      assets: release.assets.map((a) => ({ name: a.name, digest: a.digest || '', size: a.size })),
    };
  } catch (err) {
    const reason = (err?.stderr?.toString?.() || err?.message || 'unknown').split('\n')[0].trim();
    process.stderr.write(`  ! live lookup for ${tag} unavailable (${reason}); using verified baseline\n`);
    return null;
  }
}

function buildArtifact(row, release) {
  const asset = release?.assets?.find((a) => a.name === row.file);
  const artifact = {
    product: row.product,
    platform: row.platform,
    version: row.version,
    label: row.label,
    file: row.file,
    status: asset ? 'active' : 'pending',
  };
  if (asset) {
    artifact.url = `${DOWNLOADS}/${row.tag}/${encodeURIComponent(row.file)}`;
    artifact.sha256 = String(asset.digest || '').replace(/^sha256:/, '').toLowerCase();
    artifact.sizeBytes = asset.size;
  }
  return artifact;
}

function main() {
  process.stdout.write(`Syncing release manifest for ${REPO} ...\n`);

  const live = {};
  for (const tag of Object.keys(BASELINE_RELEASES)) live[tag] = fetchRelease(tag);

  const tagOf = (key) => live[key] || BASELINE_RELEASES[key];
  const tui = tagOf('tui-v0.23.0');
  const desktop = tagOf('desktop-v12.17.0');
  const desktopCross = tagOf('desktop-v12.16.0');
  const tuiBase = `${DOWNLOADS}/${TUI_TAG}`;

  const manifest = {
    generatedAt: '',
    repo: REPO,
    tui: {
      version: `v${TUI_VERSION}`,
      releaseDate: tui.publishedAt.slice(0, 10),
      status: 'active',
      install: {
        macos_arm: `curl -fLO ${tuiBase}/axym-${TUI_VERSION}-macos.tar.gz\ntar -xzf axym-${TUI_VERSION}-macos.tar.gz\n./axym-macos-arm64 --install`,
        macos_intel: `curl -fLO ${tuiBase}/axym-${TUI_VERSION}-macos.tar.gz\ntar -xzf axym-${TUI_VERSION}-macos.tar.gz\n./axym-macos-x64 --install`,
        linux: `curl -fLO ${tuiBase}/axym-${TUI_VERSION}-linux-x86_64.tar.gz\ntar -xzf axym-${TUI_VERSION}-linux-x86_64.tar.gz\n./axym-linux-x86_64 --install`,
        windows: `Invoke-WebRequest -Uri ${tuiBase}/axym-${TUI_VERSION}-windows-x86_64.zip -OutFile axym-${TUI_VERSION}-windows-x86_64.zip\nExpand-Archive axym-${TUI_VERSION}-windows-x86_64.zip -DestinationPath .\n.\\axym-windows-x86_64.exe --install`,
      },
    },
    desktop: {
      version: 'v12.17.0',
      crossOsVersion: 'v12.16.0',
      releaseDate: desktop.publishedAt.slice(0, 10),
      supportedRange: '12.13.x-12.17.x',
      eolRange: '12.12.x and earlier',
      install: {
        macos: `curl -fsSL ${DOWNLOADS}/${DESKTOP_TAG}/install-macos.sh | bash`,
      },
    },
    artifacts: ARTIFACT_MATRIX.map((row) => {
      const release = row.tag === 'tui-v0.23.0' ? tui : row.tag === 'desktop-v12.17.0' ? desktop : desktopCross;
      return buildArtifact(row, release);
    }),
    history: RELEASE_HISTORY,
  };

  // Reproducible output: if nothing except the timestamp changed, keep the
  // previous generatedAt so re-running the gate does not dirty the worktree.
  manifest.generatedAt = new Date().toISOString();
  try {
    const previous = JSON.parse(readFileSync(OUTPUT, 'utf8'));
    const stripTime = (obj) => { const copy = { ...obj }; delete copy.generatedAt; return JSON.stringify(copy); };
    if (stripTime(previous) === stripTime(manifest)) manifest.generatedAt = previous.generatedAt;
  } catch (err) {
    /* no previous manifest (or unreadable) — use the current timestamp */
  }

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  process.stdout.write(`Wrote ${OUTPUT} (${manifest.artifacts.length} artifacts, ${manifest.artifacts.filter((a) => a.status === 'active').length} with verified SHA-256)\n`);
}

main();
