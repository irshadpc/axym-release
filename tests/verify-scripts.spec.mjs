import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROOFS = join(ROOT, 'site/data/proofs.manifest.json');

// The ADR-0016 RED-path test mutates proofs.manifest.json on disk, and the
// badge-render test below fetches that same file through the live site
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

    // RED path: a captured:true entry whose files do not exist must fail the
    // build — a fake "Verified Recording" badge can never ship. (Sequential
    // within this test: the mutation is invisible to parallel tests.)
    const original = readFileSync(PROOFS, 'utf8');
    try {
      const mutated = JSON.parse(original);
      mutated.sequences[0].captured = true;
      mutated.sequences[0].captured_version = 'v9.9.9';
      mutated.sequences[0].captured_at = '2026-01-01T00:00:00Z';
      mutated.sequences[0].recording_path = 'assets/proofs/does-not-exist.cast';
      mutated.sequences[0].diff_path = 'assets/proofs/does-not-exist.diff';
      mutated.sequences[0].receipt_path = 'assets/proofs/does-not-exist.json';
      writeFileSync(PROOFS, JSON.stringify(mutated, null, 2));
      const res = runVerifier('verify-manifest-sync.mjs');
      expect(res.status, res.stdout).not.toBe(0);
      expect(res.stdout).toContain('captured=true but recording_path');
      expect(res.stdout).toContain('is missing or empty on disk');
    } finally {
      writeFileSync(PROOFS, original);
    }

    // GREEN again once restored.
    expect(runVerifier('verify-manifest-sync.mjs').status).toBe(0);
  });

  test('captured:false entries always render the honest Illustrative Schematic badge', async ({ page }) => {
    await page.goto('/axym-release/#features/proof-theater', { waitUntil: 'networkidle' });
    const badges = page.locator('#fx-proof-root .fx-proof-badge');
    await expect(badges).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(badges.nth(i)).toHaveText('Illustrative Schematic');
      await expect(badges.nth(i)).not.toContainText('Verified Recording');
    }
  });
});

test.describe('proof theater interactions', () => {
  test.slow();

  test('three sequences switch via tabs with Session / Diff / Receipt sub-tabs', async ({ page }) => {
    await page.goto('/axym-release/#features/proof-theater', { waitUntil: 'networkidle' });
    await expect(page.locator('#fx-proof-root .fx-proof-tab')).toHaveCount(3);

    const secondTab = page.locator('#fx-proof-root .fx-proof-tab').nth(1);
    await secondTab.click();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-panels="proof"] [data-panel="parallel-worktrees-mux"]')).toBeVisible();
    await expect(page.locator('[data-panels="proof"] [data-panel="idea-to-verified-code"]')).toBeHidden();

    const sessionPanel = page.locator('[data-panels="proof-parallel-worktrees-mux"] [data-panel="session"]');
    await expect(sessionPanel).toContainText('/runs start');

    const receiptTab = page.locator('[data-tabs="proof-parallel-worktrees-mux"] [data-tab="receipt"]');
    await receiptTab.click();
    await expect(page.locator('[data-panels="proof-parallel-worktrees-mux"] [data-panel="receipt"]')).toBeVisible();
    await expect(receiptTab).toHaveAttribute('aria-selected', 'true');
  });

  test('the mobile sequence labels the simulator vs real-device boundary honestly', async ({ page }) => {
    await page.goto('/axym-release/#features/proof-theater', { waitUntil: 'networkidle' });
    const thirdTab = page.locator('#fx-proof-root .fx-proof-tab').nth(2);
    await thirdTab.click();
    await expect(page.locator('[data-panels="proof"] [data-panel="mobile-developer-platform"]')).toBeVisible();
    await expect(page.locator('#fx-proof-root')).toContainText('T-050 hardware journey, which is partial');
    await expect(page.locator('#fx-proof-root')).toContainText('UNV · real-device (hardware) certification');
  });

  test('the verify-yourself strip exposes copyable commands', async ({ page }) => {
    await page.goto('/axym-release/#features/proof-theater', { waitUntil: 'networkidle' });
    const cmds = page.locator('#fx-proof-verify-cmds .fx-proof-verify-cmd');
    await expect(cmds).toHaveCount(3);
    await expect(cmds.nth(0)).toContainText('axym doctor');
    await expect(cmds.nth(1)).toContainText('axym fitness --json');
    await expect(cmds.nth(2)).toContainText('axym bench --reproduce');

    const before = page.url();
    await cmds.nth(0).locator('.fx-cmd-copy').click();
    await expect(page.locator('#toast')).toContainText(/copied/i);
    expect(page.url()).toBe(before);
  });
});
