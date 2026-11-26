import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROOFS = join(ROOT, 'site/data/proofs.manifest.json');

// The ADR-0016 RED-path test mutates proofs.manifest.json on disk, and the
// story-badge tests (SW2-S1) fetch that same file through the live site
// (app.js does a runtime fetch). The two must never overlap, so this file
// runs its tests serially even though the suite is fullyParallel.
test.describe.configure({ mode: 'serial' });

function runVerifier(script) {
  return spawnSync('node', [join(ROOT, 'scripts', script)], { encoding: 'utf8', cwd: ROOT });
}

test.describe('manifest-sync guardrails (build-level, ADR-0016)', () => {
  // These run the real verifier scripts against the real manifests; no
  // browser is needed but the Playwright runner keeps them in one gate.
  test.use({ viewport: { width: 1280, height: 720 } });
  test.slow();

  test('verifiers pass on the committed state; captured:true without files fails the build', () => {
    // GREEN on the committed state first.
    const sync = runVerifier('verify-manifest-sync.mjs');
    expect(sync.status, sync.stdout + sync.stderr).toBe(0);
    const site = runVerifier('verify-site.mjs');
    expect(site.status, site.stdout + site.stderr).toBe(0);

    // RED path (REV3 chapters): a captured:true chapter whose files do not
    // exist must fail the build — a fake "Verified Recording" badge can
    // never ship.
    const original = readFileSync(PROOFS, 'utf8');
    try {
      const mutated = JSON.parse(original);
      mutated.chapters[0].captured = true;
      mutated.chapters[0].captured_version = 'v9.9.9';
      mutated.chapters[0].captured_at = '2026-01-01T00:00:00Z';
      mutated.chapters[0].recording_path = 'assets/proofs/does-not-exist.cast';
      mutated.chapters[0].diff_path = 'assets/proofs/does-not-exist.diff';
      mutated.chapters[0].receipt_path = 'assets/proofs/does-not-exist.json';
      writeFileSync(PROOFS, JSON.stringify(mutated, null, 2));
      const res = runVerifier('verify-manifest-sync.mjs');
      expect(res.status, res.stdout).not.toBe(0);
      expect(res.stdout).toContain('chapter-01: captured=true but recording_path');
      expect(res.stdout).toContain('is missing or empty on disk');
    } finally {
      writeFileSync(PROOFS, original);
    }

    // GREEN again once restored.
    expect(runVerifier('verify-manifest-sync.mjs').status).toBe(0);
  });

  test('REV3 contracts hold: five tabs, five story chapters, twelve flagships', () => {
    const sync = runVerifier('verify-manifest-sync.mjs');
    expect(sync.status, sync.stdout).toBe(0);
    expect(sync.stdout).toContain('the five REV3 index tabs are declared exactly');
    expect(sync.stdout).toContain('the story declares exactly five chapters numbered 01–05');
    expect(sync.stdout).toContain('proofs manifest binds all five story chapters');
    expect(sync.stdout).toContain('exactly twelve capabilities are flagged featured_top12');
  });

  test('the features page mounts the story walkthrough host', async ({ page }) => {
    await page.goto('/axym-release/#features/how-it-works', { waitUntil: 'networkidle' });
    await expect(page.locator('#story-root')).toBeAttached();
  });
});
