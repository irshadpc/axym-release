import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const geist = readFileSync(join(root, 'site/assets/fonts/geist-sans-variable.woff2')).toString('base64');
const mono = readFileSync(join(root, 'site/assets/fonts/jetbrains-mono-latin-variable.woff2')).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${geist}) format('woff2');font-weight:100 900}
@font-face{font-family:JBM;src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:100 800}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#080F15;color:#EDF8FA;font-family:Geist,sans-serif;overflow:hidden;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(93,228,223,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(93,228,223,.07) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(120deg,#000,transparent 80%)}
.wrap{position:relative;padding:64px 72px;height:100%;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:14px}
.mark{width:52px;height:52px;border-radius:12px;background:#101E27;border:1px solid #253641;display:grid;place-items:center}
.mark svg{width:32px;height:32px}
.word{font-size:38px;font-weight:650;letter-spacing:-.05em}
.kicker{margin-left:auto;font-family:JBM,monospace;font-size:14px;color:#A0B7C2;border:1px solid #253641;background:#0D1820;border-radius:6px;padding:7px 12px;letter-spacing:.04em}
h1{font-size:72px;line-height:1.02;letter-spacing:-.055em;font-weight:620;margin-top:74px;max-width:900px}
h1 em{font-style:normal;color:#5DE4DF}
p{margin-top:22px;font-size:22px;color:#A0B7C2;max-width:760px;line-height:1.5}
.pipe{display:flex;gap:8px;margin-top:auto;align-items:center}
.stage{font-family:JBM,monospace;font-size:12px;color:#A0B7C2;border:1px solid #253641;border-radius:5px;padding:7px 10px;background:#101E27}
.stage b{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:6px;vertical-align:1px}
.url{margin-left:auto;font-family:JBM,monospace;font-size:13px;color:#849CA9}
.bottom{display:flex;align-items:center;margin-top:18px;padding-top:18px;border-top:1px solid #253641;font-family:JBM,monospace;font-size:12px;color:#849CA9;gap:18px}
</style></head><body>
<div class="grid"></div>
<div class="wrap">
  <div class="top">
    <div class="mark"><svg viewBox="0 0 64 64"><path d="M17 38L32 15L47 38M17 26L32 49L47 26" fill="none" stroke="#5DE4DF" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <div class="word">axym</div>
    <div class="kicker">ARCTIC GRAPHITE</div>
  </div>
  <h1>Build with autonomy.<br><em>Ship with confidence.</em></h1>
  <p>Local-first intelligence. Governed execution. A new foundation for autonomous software engineering.</p>
  <div class="pipe">
    <span class="stage"><b style="background:#7DBBFA"></b>Plan</span>
    <span class="stage"><b style="background:#A8B8FF"></b>Design</span>
    <span class="stage"><b style="background:#5DE4DF"></b>Code</span>
    <span class="stage"><b style="background:#F4C477"></b>Security</span>
    <span class="stage"><b style="background:#C6B3F5"></b>Review</span>
    <span class="stage"><b style="background:#65DDA5"></b>QA</span>
    <span class="url">www.irshadpc.in/axym-release</span>
  </div>
  <div class="bottom"><span>TUI v0.23.0</span><span>Desktop v12.17.0</span><span>MIT licensed</span><span>Local-first · governed · verifiable</span></div>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, 'site/assets/brand/og-image.png') });

for (const [name, size] of [['apple-touch-icon.png', 180], ['favicon-32.png', 32]]) {
  const p = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await p.setContent(`<style>html,body{margin:0;background:#101E27}svg{display:block;width:${size}px;height:${size}px}</style>
    <svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#101E27"/><path d="M17 38L32 15L47 38M17 26L32 49L47 26" fill="none" stroke="#5DE4DF" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  await p.screenshot({ path: join(root, `site/assets/brand/${name}`) });
  await p.close();
}
await browser.close();
writeFileSync(join(root, 'docs/evidence/brand-generation.md'), 'Generated from `tests/generate-brand.mjs` using the self-hosted Geist and JetBrains Mono variable fonts. No stock artwork.\n');
console.log('Generated og-image.png, apple-touch-icon.png, favicon-32.png');
