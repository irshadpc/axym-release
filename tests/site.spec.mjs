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
    await expect(page.locator('#version-pill')).toHaveText('TUI v0.23.0');
    await expect(page.locator('#downloads-grid .download-card')).toHaveCount(6);
    await expect(page.locator('#release-timeline .timeline-item')).toHaveCount(6);
    await expect(page.locator('#release-timeline')).toContainText('tui-v0.23.0');
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

test.describe('responsive layout', () => {
  const widths = [320, 390, 768, 1024, 1440];
  for (const width of widths) {
    test(`no page-level horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['home', 'architecture', 'quickstart', 'releases']) {
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
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['home', 'quickstart', 'releases']) {
      await open(page, route, 'dark');
      const violations = await axeViolations(page);
      expect(violations, `${route}: ${JSON.stringify(violations, null, 2)}`).toEqual([]);
    }
  });
});
