#!/usr/bin/env node
/**
 * Static server that mirrors the GitHub Pages subpath (/axym-release/).
 * The site is served from site/ so relative asset paths are exercised exactly
 * as they are in production.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const PREFIX = '/axym-release';
const PORT = Number(process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === '/' || pathname === PREFIX) {
    res.writeHead(302, { Location: `${PREFIX}/` });
    res.end();
    return;
  }
  if (!pathname.startsWith(`${PREFIX}/`)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  let rel = pathname.slice(PREFIX.length + 1);
  if (rel === '' || rel.endsWith('/')) rel += 'index.html';
  const full = normalize(join(SITE, rel));
  if (!full.startsWith(SITE)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const info = await stat(full);
    if (!info.isFile()) throw new Error('not a file');
    const body = await readFile(full);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(full)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(body);
  } catch {
    const fallback = await readFile(join(SITE, '404.html')).catch(() => null);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fallback || 'Not found');
  }
}).listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`Axym test server: http://127.0.0.1:${PORT}${PREFIX}/\n`);
});
