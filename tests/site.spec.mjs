import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  'home',
  'architecture',
  'quickstart',
  'setup',
  'configuration',
  'features',
  'releases',
  'operations',
];

async function open(page, route, theme) {
  if (theme) {
    await page.addInitScript((mode) => {
      try { localStorage.setItem('axym-theme', mode); } catch { /* ignore */ }
    }, theme);
  }
  await page.goto(`/axym-release/#${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#app h1').first()).toBeVisible();
}

async function axeViolations(page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  return results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.map((n) => n.target.join(' ')),
  }));
}

test.describe('routing and content', () => {
  for (const route of ROUTES) {
    test(`#${route} renders a single primary heading`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', (err) => errors.push(String(err)));
      page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

      await open(page, route, 'dark');

      await expect(page.locator('#app h1')).toHaveCount(1);
      await expect(page.locator('main#app')).not.toBeEmpty();
      await expect(page).toHaveTitle(/Axym/);
      expect(errors).toEqual([]);
    });
  }

  test('deep links resolve the route and scroll target', async ({ page }) => {
    await page.goto('/axym-release/#quickstart/install', { waitUntil: 'networkidle' });
    await expect(page.locator('#app h1')).toHaveText('Quick Start');
    await expect(page).toHaveURL(/#quickstart\/install$/);
    await expect(page.locator('#install')).toBeInViewport();
  });

  test('unknown hashes fall back to home', async ({ page }) => {
    await page.goto('/axym-release/#does-not-exist', { waitUntil: 'networkidle' });
    await expect(page.locator('#app h1')).toContainText('Build with autonomy');
  });

  test('#app hash loads home and focuses main region without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto('/axym-release/#app', { waitUntil: 'networkidle' });
    await expect(page.locator('#app h1')).toContainText('Build with autonomy');
    await expect(page.locator('#app')).toBeFocused();
    expect(errors).toEqual([]);
  });

  test('skip link on docs route preserves the current route and focuses app', async ({ page, browserName }) => {
    await open(page, 'quickstart', 'dark');
    if (browserName === 'webkit') {
      await page.keyboard.press('Alt+Tab');
    } else {
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#app')).toBeFocused();
    await expect(page.locator('#app h1')).toHaveText('Quick Start');
  });

  test('marketing and docs layouts are distinct', async ({ page }) => {
    await open(page, 'home', 'dark');
    await expect(page.locator('.marketing-page')).toBeVisible();
    await expect(page.locator('.docs-shell')).toHaveCount(0);

    await open(page, 'quickstart', 'dark');
    await expect(page.locator('.docs-shell')).toBeVisible();
    await expect(page.locator('.docs-sidebar')).toBeVisible();
    await expect(page.locator('.docs-toc')).toBeVisible();
  });

  test('features capability tour switches chapters accessibly', async ({ page }) => {
    await open(page, 'features', 'dark');
    const tab = page.locator('#ft-tab-parallel');
    await expect(tab).toBeVisible();
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#ft-panel-parallel')).toBeVisible();
    await expect(page.locator('#ft-panel-turn')).toBeHidden();
  });

  test('architecture shows the docs side navigation and on-this-page TOC', async ({ page }) => {
    await open(page, 'architecture', 'dark');
    await expect(page.locator('.docs-shell')).toBeVisible();
    await expect(page.locator('.docs-sidebar a[href="#architecture"]')).toBeVisible();
    await expect(page.locator('.docs-sidebar a[href="#architecture"]')).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('.docs-toc')).toBeVisible();
    await expect(page.locator('#toc-links a[href="#architecture/execution-model"]')).toBeVisible();
  });
});

test.describe('theme', () => {
  test('explicit light mode persists across reloads', async ({ page }) => {
    await page.goto('/axym-release/#home', { waitUntil: 'networkidle' });
    await expect(page.locator('#app h1').first()).toBeVisible();
    await page.locator('#theme-toggle').click();
    await page.locator('[data-theme-choice="light"]').click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'light');
    expect(await page.evaluate(() => localStorage.getItem('axym-theme'))).toBe('light');

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('system mode follows prefers-color-scheme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await open(page, 'home', 'system');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('legacy stored values remain valid', async ({ page }) => {
    await open(page, 'home', 'dark');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
  });
});

test.describe('navigation and interaction', () => {
  test('skip link moves focus to the main region', async ({ page, browserName }) => {
    await open(page, 'home', 'dark');
    if (browserName === 'webkit') {
      await page.keyboard.press('Alt+Tab');
    } else {
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#app')).toBeFocused();
  });

  test('mobile navigation opens, traps focus, and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, 'home', 'dark');

    const toggle = page.locator('#menu-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();

    const dialog = page.locator('#mobile-nav');
    await expect(dialog).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-nav a[href="#quickstart"]').first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('search opens with the keyboard, finds content, and closes', async ({ page }) => {
    await open(page, 'home', 'dark');
    await page.keyboard.press('ControlOrMeta+k');
    const overlay = page.locator('#search-overlay');
    await expect(overlay).toBeVisible();

    await page.locator('#search-input').fill('cache');
    await expect(page.locator('#search-results .search-result').first()).toBeVisible();
    await expect(page.locator('#search-results')).toContainText(/cache/i);

    await page.keyboard.press('Escape');
    await expect(overlay).toBeHidden();
  });

  test('search result navigates to the matching route', async ({ page }) => {
    await open(page, 'home', 'dark');
    await page.keyboard.press('ControlOrMeta+k');
    await page.locator('#search-input').fill('architecture');
    await page.locator('#search-results .search-result').first().click();
    await expect(page).toHaveURL(/#architecture/);
    await expect(page.locator('#app h1')).toContainText('governed run');
  });

  test('copy control confirms with a toast', async ({ page }) => {
    await open(page, 'quickstart', 'dark');
    const copy = page.locator('.copy-btn').first();
    await copy.click();
    await expect(page.locator('#toast')).toHaveClass(/show/);
    await expect(page.locator('#toast')).toContainText(/Copied/i);
  });

  test('provider tabs switch panels accessibly', async ({ page }) => {
    await open(page, 'quickstart', 'dark');
    const codex = page.locator('[data-tab="codex"]');
    await codex.click();
    await expect(codex).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-panel="codex"]')).toBeVisible();
    await expect(page.locator('[data-panel="claude"]')).toBeHidden();
  });

  test('code regions are keyboard reachable', async ({ page }) => {
    await open(page, 'quickstart', 'dark');
    const body = page.locator('.code-body').first();
    await expect(body).toHaveAttribute('tabindex', '0');
    await body.focus();
    await expect(body).toBeFocused();
  });
});

test.describe('release data', () => {
  test('home hydrates the verified version and history', async ({ page }) => {
    await open(page, 'home', 'dark');
    await expect(page.locator('#version-pill')).toHaveText('TUI v0.24.0');
    await expect(page.locator('#downloads-grid .download-card')).toHaveCount(6);
    await expect(page.locator('#release-timeline .timeline-item')).toHaveCount(7);
    await expect(page.locator('#release-timeline')).toContainText('tui-v0.24.0');
    await expect(page.locator('#release-timeline')).toContainText('desktop-v12.17.0');
  });

  test('downloads use verified archives, not an unpublished installer', async ({ page }) => {
    await open(page, 'quickstart', 'dark');
    const installText = await page.locator('#install-command').textContent();
    expect(installText).toContain('tar -xzf');
    expect(installText).not.toContain('install.sh');

    await open(page, 'releases', 'dark');
    await expect(page.locator('#downloads-grid .download-card')).toHaveCount(6);
    await expect(page.locator('#artifacts-grid tbody tr')).toHaveCount(6);
    const desktop = await page.locator('#desktop-install').textContent();
    expect(desktop).toContain('desktop-v12.17.0/install-macos.sh');
  });

  test('download links are safe GitHub release URLs', async ({ page }) => {
    await open(page, 'releases', 'dark');
    const hrefs = await page.locator('#downloads-grid a[href]').evaluateAll((els) => els.map((el) => el.href));
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
    for (const href of hrefs) {
      expect(href).toMatch(/^https:\/\/github\.com\/irshadpc\/axym-release\/releases\//);
    }
  });
});

test.describe('capability drawer and catalog filters', () => {
  // The features page renders 84 manifest-driven cards; these tests share a
  // single-threaded static server with every other worker, so give each the
  // slow multiplier like the axe suite does.
  test.slow();

  test('clicking a card opens the drawer with the deep-link hash and full metadata', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    await page.locator('[data-fx-id="feat-council-mode"]').click();

    await expect(page).toHaveURL(/#features\/feat-council-mode$/);
    const drawer = page.locator('#fx-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute('role', 'dialog');
    await expect(drawer).toHaveAttribute('aria-modal', 'true');
    await expect(page.locator('#fx-drawer-title')).toHaveText('Council mode');
    await expect(drawer).toContainText('User problem');
    await expect(drawer).toContainText('What it is');
    await expect(drawer).toContainText('Why it matters');
    await expect(drawer).toContainText('Use it');
    await expect(drawer).toContainText('Limitations');
    await expect(drawer).toContainText('View in full Reference');
  });

  test('drawer closes on Escape, restores the hash and refocuses the card', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    const card = page.locator('[data-fx-id="feat-council-mode"]');
    await card.click();
    await expect(page.locator('#fx-drawer')).toBeVisible();
    await expect(page.locator('#fx-drawer-close')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.locator('#fx-drawer')).toBeHidden();
    await expect(page.locator('#fx-drawer-backdrop')).toBeHidden();
    await expect(card).toBeFocused();
    await expect(page).toHaveURL(/#features(#catalog)?$/);
  });

  test('drawer closes on backdrop click', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    await page.locator('[data-fx-id="feat-council-mode"]').click();
    await expect(page.locator('#fx-drawer')).toBeVisible();
    await page.locator('#fx-drawer-backdrop').click({ position: { x: 10, y: 10 } });
    await expect(page.locator('#fx-drawer')).toBeHidden();
  });

  test('browser Back closes the drawer and keeps the page state', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    await page.locator('[data-fx-id="feat-result-ledger"]').click();
    await expect(page.locator('#fx-drawer')).toBeVisible();

    await page.goBack();
    await expect(page.locator('#fx-drawer')).toBeHidden();
    await expect(page.locator('#app h1')).toContainText('Every capability');
  });

  test('a deep link straight into a capability opens the drawer', async ({ page }) => {
    await page.goto('/axym-release/#features/feat-zero-trust-mcp-tool-access', { waitUntil: 'networkidle' });
    await expect(page.locator('#fx-drawer')).toBeVisible();
    await expect(page.locator('#fx-drawer-title')).toHaveText('Zero-trust MCP firewall');
    await page.keyboard.press('Escape');
    await expect(page.locator('#fx-drawer')).toBeHidden();
    await expect(page).toHaveURL(/#features\/catalog$/);
  });

  test('drawer reference link scrolls to the full reference entry', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    await page.locator('[data-fx-id="feat-result-ledger"]').click();
    await expect(page.locator('#fx-drawer')).toBeVisible();
    await page.locator('#fx-drawer [data-fx-refjump]').click();

    await expect(page.locator('#fx-drawer')).toBeHidden();
    await expect(page).toHaveURL(/#features\/feat-result-ledger$/);
    await expect(page.locator('h3#feat-result-ledger')).toBeInViewport();
  });

  test('card command copy button copies without navigating', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    const before = page.url();
    await page.locator('[data-fx-id="feat-council-mode"] .fx-cmd-copy').click();
    await expect(page.locator('#toast')).toHaveClass(/show/);
    await expect(page.locator('#toast')).toContainText(/copied/i);
    expect(page.url()).toBe(before);
    await expect(page.locator('#fx-drawer')).toBeHidden();
  });

  test('Featured and New in 0.24 pills filter the catalog with live counts', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();

    const featured = page.locator('[data-fx-pill="featured"]');
    await expect(featured).toContainText('Featured');
    await featured.click();
    await expect(featured).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#fx-catalog .fx-card:not(.filter-hidden)')).toHaveCount(12);
    await expect(page.locator('#fx-count')).toContainText('featured twelve');

    const fresh = page.locator('[data-fx-pill="new"]');
    await expect(fresh).toContainText('New in 0.24');
    await fresh.click();
    await expect(fresh).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#fx-catalog .fx-card:not(.filter-hidden)')).toHaveCount(19);
    await expect(page.locator('#fx-count')).toContainText('new in this release');

    await page.locator('[data-fx-pill="all"]').click();
    await expect(page.locator('#fx-catalog .fx-card:not(.filter-hidden)')).toHaveCount(84);
  });

  test('searching while a capped pill is active searches every capability', async ({ page }) => {
    await open(page, 'features', 'dark');
    await page.locator('#fx-catalog .fx-card').first().waitFor();
    await page.locator('[data-fx-pill="featured"]').click();
    await expect(page.locator('#fx-catalog .fx-card:not(.filter-hidden)')).toHaveCount(12);

    await page.locator('#feature-filter').fill('maestro');
    const visible = page.locator('#fx-catalog .fx-card:not(.filter-hidden)');
    await expect(visible.first()).toBeVisible();
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(84);
    await expect(page.locator('#fx-count')).toContainText('matching "maestro"');
    await expect(page.locator('#fx-catalog [data-fx-id="tui-device-bridge"]')).toBeVisible();
  });
});

test.describe('hero positioning and failure-mode strip', () => {
  test.slow();

  test('home hero demotes the count into the stat strip and keeps versions hydrated', async ({ page }) => {
    await open(page, 'home', 'dark');
    await expect(page.locator('.hero-strip')).toContainText('Keep your CLIs.');
    const strip = page.locator('.hero-meta').first();
    await expect(strip).toContainText('0 API keys');
    await expect(strip).toContainText('Parallel worktrees');
    await expect(strip).toContainText('Local MCP firewall');
    await expect(strip).toContainText('Hash-chained proof');
    await expect(strip).toContainText('84 capabilities');
    await expect(page.locator('[data-release-version="tui"]')).toHaveText('v0.24.0');
    await expect(page.locator('[data-release-version="desktop"]')).toHaveText('v12.17.0');
    await expect(page.locator('[data-release-version="desktop-cross"]')).toHaveText('v12.16.0');
  });

  test('four before/after failure-mode cards link into capability drawers', async ({ page }) => {
    await open(page, 'features', 'dark');
    const cards = page.locator('.ba-card');
    await expect(cards).toHaveCount(4);
    await expect(cards.nth(0)).toContainText('Silent hangs');
    await expect(cards.nth(0)).toContainText('Calm-UX anti-hang guard');
    await expect(cards.nth(3)).toContainText('Blind mobile builds');

    await cards.nth(2).click();
    await expect(page).toHaveURL(/#features\/feat-zero-trust-mcp-tool-access$/);
    await expect(page.locator('#fx-drawer-title')).toHaveText('Zero-trust MCP firewall');
    await page.keyboard.press('Escape');
    await expect(page.locator('#fx-drawer')).toBeHidden();
  });
});

test.describe('responsive layout', () => {
  const widths = [320, 390, 768, 1024, 1440];
  for (const width of widths) {
    test(`no page-level horizontal overflow at ${width}px`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['home', 'architecture', 'quickstart', 'features', 'releases']) {
        await page.goto(`/axym-release/#${route}`, { waitUntil: 'networkidle' });
        const overflow = await page.evaluate(() =>
          Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth);
        expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  }

  test('marketing and docs shells reflow at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, 'home', 'light');
    await expect(page.locator('.menu-toggle')).toBeVisible();
    await expect(page.locator('.docs-sidebar')).toBeHidden();

    await open(page, 'quickstart', 'light');
    await expect(page.locator('.docs-sidebar')).toBeHidden();
    await expect(page.locator('.docs-mobile-bar')).toBeVisible();
    await expect(page.locator('.docs-toc')).toBeHidden();
  });
});

test.describe('accessibility (axe-core, WCAG 2.2 AA)', () => {
  // The features showcase is the largest page in the portal; axe needs more
  // than the 30s default on slower engines (firefox/webkit).
  test.setTimeout(90_000);
  for (const route of ROUTES) {
    for (const theme of ['dark', 'light']) {
      test(`#${route} — ${theme} has no axe violations`, async ({ page }) => {
        await open(page, route, theme);
        const violations = await axeViolations(page);
        expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
      });
    }
  }

  test('mobile home and docs have no axe violations', async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['home', 'quickstart', 'releases']) {
      await open(page, route, 'dark');
      const violations = await axeViolations(page);
      expect(violations, `${route}: ${JSON.stringify(violations, null, 2)}`).toEqual([]);
    }
  });
});
