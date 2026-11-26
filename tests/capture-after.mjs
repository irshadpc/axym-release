import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'http://127.0.0.1:4173/axym-release/';
const OUT = process.env.OUT || 'docs/evidence/after';
mkdirSync(OUT, { recursive: true });

const shots = [
  { name: 'home-dark', route: 'home', theme: 'dark', width: 1440, height: 1000, full: true },
  { name: 'home-light', route: 'home', theme: 'light', width: 1440, height: 1000, full: true },
  { name: 'architecture-dark', route: 'architecture', theme: 'dark', width: 1440, height: 1000, full: true },
  { name: 'architecture-light', route: 'architecture', theme: 'light', width: 1440, height: 1000, full: true },
  { name: 'quickstart-dark', route: 'quickstart', theme: 'dark', width: 1440, height: 1000, full: true },
  { name: 'quickstart-light', route: 'quickstart', theme: 'light', width: 1440, height: 1000, full: true },
  { name: 'releases-dark', route: 'releases', theme: 'dark', width: 1440, height: 1000, full: true },
  { name: 'features-dark', route: 'features', theme: 'dark', width: 1440, height: 1000, full: true },
  { name: 'features-light', route: 'features', theme: 'light', width: 1440, height: 1000, full: true },
  { name: 'features-mobile', route: 'features', theme: 'dark', width: 390, height: 844, full: true },
  { name: 'home-mobile', route: 'home', theme: 'light', width: 390, height: 844, full: true },
  { name: 'home-tablet', route: 'home', theme: 'light', width: 768, height: 1024, full: true },
  { name: 'quickstart-mobile', route: 'quickstart', theme: 'dark', width: 390, height: 844, full: true },
];

const browser = await chromium.launch();
const results = [];
for (const shot of shots) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    colorScheme: shot.theme,
  });
  const page = await context.newPage();
  await page.addInitScript((theme) => localStorage.setItem('axym-theme', theme), shot.theme);
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));
  await page.goto(`${BASE}#${shot.route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(OUT, `${shot.name}.png`), fullPage: shot.full, animations: 'disabled', timeout: 120000 });
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  results.push({
    shot: shot.name,
    violations: axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help, targets: v.nodes.slice(0, 3).map(n => n.target) })),
    consoleErrors: errors,
  });
  await context.close();
}
await browser.close();
writeFileSync(join(OUT, 'axe-after.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
