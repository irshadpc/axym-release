/* ==========================================================================
   AXYM — ARCTIC GRAPHITE PORTAL
   Hash router, theme modes, search, docs shell, release hydration.
   Hash format: #route or #route/anchor-id
   ========================================================================== */
(function () {
  'use strict';

  var PAGES = window.AXYM_PAGES || {};
  var ORDER = window.AXYM_NAV_ORDER || Object.keys(PAGES);
  var app = document.getElementById('app');
  var header = document.getElementById('site-header');
  var themeBtn = document.getElementById('theme-toggle');
  var themeMenu = document.getElementById('theme-menu');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var toastEl = document.getElementById('toast');
  var mobileNav = document.getElementById('mobile-nav');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNavClose = document.getElementById('mobile-nav-close');

  var releases = null;
  var currentRoute = null;
  var pendingScroll = null;
  var searchItems = [];
  var searchSelected = 0;
  var lastFocus = null;
  var themeMode = 'system';
  var systemQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var tocObserver = null;

  var FALLBACK_RELEASES = {
    repo: 'irshadpc/axym-release',
    tui: {
      version: 'v0.23.0',
      releaseDate: '2026-11-05',
      install: {
        macos_arm: 'curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.23.0/axym-0.23.0-macos.tar.gz\ntar -xzf axym-0.23.0-macos.tar.gz\n./axym-macos-arm64 --install',
        macos_intel: 'curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.23.0/axym-0.23.0-macos.tar.gz\ntar -xzf axym-0.23.0-macos.tar.gz\n./axym-macos-x64 --install',
        linux: 'curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.23.0/axym-0.23.0-linux-x86_64.tar.gz\ntar -xzf axym-0.23.0-linux-x86_64.tar.gz\n./axym-linux-x86_64 --install',
        windows: 'Invoke-WebRequest -Uri https://github.com/irshadpc/axym-release/releases/download/tui-v0.23.0/axym-0.23.0-windows-x86_64.zip -OutFile axym.zip\nExpand-Archive axym.zip -DestinationPath .\n.\\axym-windows-x86_64.exe --install',
        source: 'git clone https://github.com/irshadpc/axym.git && cd axym/tui && npm install && npm run build'
      }
    },
    desktop: { version: 'v12.17.0', crossOsVersion: 'v12.16.0', releaseDate: '2026-11-04', supportedRange: '12.13.x-12.17.x', eolRange: '12.12.x and earlier' },
    artifacts: [],
    history: []
  };

  /* -------------------------------------------------------------- helpers -- */
  function parseHash() {
    var raw = window.location.hash.replace(/^#/, '');
    var parts = raw.split('/');
    var route = parts.shift();
    if (!PAGES[route]) route = 'home';
    return { route: route, anchor: parts.join('/') || null };
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  function safeReleaseUrl(url) {
    return typeof url === 'string' && /^https:\/\/github\.com\/irshadpc\/axym-release\/releases\//.test(url) ? url : '';
  }

  function formatBytes(bytes) {
    if (!bytes || isNaN(bytes)) return '—';
    var units = ['B', 'KB', 'MB', 'GB'];
    var n = Number(bytes);
    var i = 0;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return (i === 0 ? n : n.toFixed(1)) + ' ' + units[i];
  }

  function copyText(text, label, button) {
    var done = function () {
      toast((label || 'Copied') + ' to clipboard');
      if (button) {
        var original = button.innerHTML;
        button.innerHTML = icon('check') + 'Copied';
        window.setTimeout(function () { button.innerHTML = original; }, 1600);
      }
    };
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); }
      catch (e) { toast('Copy unavailable — select the text manually'); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(legacy);
    } else {
      legacy();
    }
  }

  /* --------------------------------------------------------------- theme -- */
  function resolvedTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return systemQuery && systemQuery.matches ? 'dark' : 'light';
  }

  function syncThemeControls() {
    var resolved = document.documentElement.dataset.theme;
    var modeLabel = themeMode === 'system' ? 'system' : themeMode;
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', 'Theme: ' + modeLabel + '. Open appearance menu');
      themeBtn.setAttribute('title', 'Appearance: ' + modeLabel);
    }
    var choices = themeMenu ? themeMenu.querySelectorAll('[data-theme-choice]') : [];
    for (var i = 0; i < choices.length; i++) {
      choices[i].setAttribute('aria-checked', String(choices[i].getAttribute('data-theme-choice') === themeMode));
    }
    var meta = document.getElementById('theme-color-meta');
    if (meta) meta.setAttribute('content', resolved === 'dark' ? '#080F15' : '#F5F8FA');
  }

  function applyThemeMode(mode, persist) {
    if (mode !== 'light' && mode !== 'dark' && mode !== 'system') mode = 'system';
    themeMode = mode;
    var resolved = resolvedTheme(mode);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.style.colorScheme = resolved;
    if (persist) {
      try { localStorage.setItem('axym-theme', mode); } catch (e) { /* storage blocked */ }
    }
    syncThemeControls();
  }

  function openThemeMenu() {
    if (!themeMenu || !themeBtn) return;
    themeMenu.hidden = false;
    themeBtn.setAttribute('aria-expanded', 'true');
    var checked = themeMenu.querySelector('[aria-checked="true"]') || themeMenu.querySelector('[data-theme-choice]');
    if (checked) checked.focus();
  }

  function closeThemeMenu(returnFocus) {
    if (!themeMenu || !themeBtn) return;
    if (themeMenu.hidden) return;
    themeMenu.hidden = true;
    themeBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) themeBtn.focus();
  }

  /* --------------------------------------------------------------- router -- */
  function pageNavLabel(route) {
    var page = PAGES[route];
    return page ? (page.title || route) : route;
  }

  function buildFooter() {
    return '<footer class="site-footer">' +
      '<div class="footer-inner">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="#home" aria-label="Axym home">' +
              '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="var(--brand)"/><path d="M17 20.5h30L17 43.5h30" fill="none" stroke="var(--on-brand)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<span class="wordmark">axym</span></a>' +
            '<p>Local-first autonomous engineering. Governed execution, independent verification, evidence you can inspect.</p>' +
          '</div>' +
          '<div class="footer-col"><h2>Product</h2><ul>' +
            '<li><a href="#home">Overview</a></li><li><a href="#architecture">Architecture</a></li>' +
            '<li><a href="#features">Features</a></li><li><a href="#releases">Downloads</a></li></ul></div>' +
          '<div class="footer-col"><h2>Documentation</h2><ul>' +
            '<li><a href="#quickstart">Quick Start</a></li><li><a href="#setup">Setup Guide</a></li>' +
            '<li><a href="#configuration">Configuration</a></li><li><a href="#operations">Operations</a></li></ul></div>' +
          '<div class="footer-col"><h2>Releases</h2><ul>' +
            '<li><a href="#releases">Latest releases</a></li>' +
            '<li><a href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">GitHub Releases</a></li>' +
            '<li><a href="#releases/history">Release history</a></li>' +
            '<li><a href="#releases/verify-download">Verify a download</a></li></ul></div>' +
          '<div class="footer-col"><h2>Source</h2><ul>' +
            '<li><a href="https://github.com/irshadpc/axym" target="_blank" rel="noopener">Axym repository</a></li>' +
            '<li><a href="https://github.com/irshadpc/axym-release" target="_blank" rel="noopener">Release repository</a></li>' +
            '<li><a href="https://github.com/irshadpc/axym/blob/main/FEATURES.md" target="_blank" rel="noopener">Feature catalog</a></li>' +
            '<li><a href="https://github.com/irshadpc/axym/issues" target="_blank" rel="noopener">Report an issue</a></li></ul></div>' +
        '</div>' +
        '<div class="footer-bottom"><span>© 2026 Axym · MIT licensed · no telemetry</span>' +
          '<span class="legal"><a href="#quickstart">Get started</a><a href="#releases">Downloads</a><a href="https://github.com/irshadpc/axym-release" target="_blank" rel="noopener">GitHub</a></span>' +
        '</div>' +
      '</div></footer>';
  }

  function buildDocsSidebar(route) {
    function link(key, label, ico) {
      var active = key === route;
      return '<a class="docs-side-link' + (active ? ' active' : '') + '" href="#' + key + '" data-nav="' + key + '"' + (active ? ' aria-current="page"' : '') + '>' +
        icon(ico) + '<span>' + label + '</span>' + (key === 'releases' ? '<span class="docs-side-badge" id="side-version">v0.23.0</span>' : '') + '</a>';
    }
    return '<aside class="docs-sidebar" aria-label="Documentation navigation">' +
      '<div class="docs-side-group"><p class="docs-side-title">Getting started</p>' +
        link('home', 'Overview', 'layers') + link('architecture', 'Architecture', 'git-branch') +
        link('quickstart', 'Quick Start', 'arrow-right') + link('setup', 'Setup Guide', 'sliders') +
        link('configuration', 'Configuration', 'sliders') + '</div>' +
      '<div class="docs-side-group"><p class="docs-side-title">Reference</p>' +
        link('features', 'Features', 'activity') + link('releases', 'Releases', 'download') +
        link('operations', 'Operations', 'terminal') + '</div>' +
      '<div class="docs-side-group"><p class="docs-side-title">External</p>' +
        '<a class="docs-side-link" href="https://github.com/irshadpc/axym" target="_blank" rel="noopener">' + icon('github') + '<span>Source repository</span></a>' +
        '<a class="docs-side-link" href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">' + icon('external') + '<span>GitHub Releases</span></a>' +
        '<a class="docs-side-link" href="https://github.com/irshadpc/axym/blob/main/FEATURES.md" target="_blank" rel="noopener">' + icon('book') + '<span>Feature catalog</span></a>' +
      '</div>' +
      '<p class="docs-side-note">Orchestration, workspace writes and evidence stay on your machine. Inference runs through the provider CLI you install.</p>' +
    '</aside>';
  }

  function buildPageNav(route) {
    var i = ORDER.indexOf(route);
    var prev = i > 0 ? ORDER[i - 1] : null;
    var next = i > -1 && i < ORDER.length - 1 ? ORDER[i + 1] : null;
    function card(key, cls, label, arrow) {
      if (!key) return '<span class="page-nav-card empty" aria-hidden="true"></span>';
      return '<a class="page-nav-card ' + cls + '" href="#' + key + '"><span class="page-nav-label">' + arrow + ' ' + label + '</span><span class="page-nav-title">' + escapeHtml(pageNavLabel(key)) + '</span></a>';
    }
    return '<nav class="page-nav" aria-label="Documentation pages">' +
      card(prev, 'prev', 'Previous', '←') + card(next, 'next', 'Next', '→') + '</nav>';
  }

  function buildBreadcrumbs(route) {
    var page = PAGES[route];
    return '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#home">Axym</a><span class="sep" aria-hidden="true">/</span><a href="#quickstart">Documentation</a><span class="sep" aria-hidden="true">/</span><span aria-current="page">' + escapeHtml(page.title) + '</span></nav>';
  }

  function enhanceHeadings(route) {
    var heads = app.querySelectorAll('.article h2[id], .article h3[id]');
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      var link = document.createElement('a');
      link.className = 'heading-anchor';
      link.href = '#' + route + '/' + h.id;
      link.setAttribute('aria-label', 'Link to section: ' + h.textContent.trim());
      link.innerHTML = icon('arrow-right');
      h.appendChild(link);
    }
  }

  function enhanceCodeRegions() {
    var bodies = app.querySelectorAll('.code-body');
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      if (body.hasAttribute('tabindex')) continue;
      var shell = body.closest ? body.closest('.code-shell') : null;
      var title = shell ? shell.querySelector('.code-title') : null;
      var label = title && title.textContent.trim() ? title.textContent.trim() : 'Code';
      body.setAttribute('tabindex', '0');
      body.setAttribute('role', 'group');
      body.setAttribute('aria-label', label + ' — code sample');
    }
  }

  function buildToc(route) {
    var tocLinks = document.getElementById('toc-links');
    if (!tocLinks) return;
    var heads = app.querySelectorAll('.article h2[id], .article h3[id]');
    if (!heads.length) { tocLinks.innerHTML = ''; return; }
    var html = '';
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      html += '<a class="' + (h.tagName === 'H3' ? 'lvl-3' : '') + '" href="#' + route + '/' + h.id + '" data-anchor="' + h.id + '">' + escapeHtml(h.textContent.trim()) + '</a>';
    }
    tocLinks.innerHTML = html;
    wireTocObserver();
  }

  function wireTocObserver() {
    if (tocObserver) tocObserver.disconnect();
    var tocLinks = document.getElementById('toc-links');
    if (!tocLinks || !('IntersectionObserver' in window)) return;
    var links = tocLinks.querySelectorAll('a');
    var map = {};
    for (var i = 0; i < links.length; i++) map[links[i].getAttribute('data-anchor')] = links[i];
    tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        for (var k = 0; k < links.length; k++) links[k].classList.remove('active');
        var active = map[entry.target.id];
        if (active) active.classList.add('active');
      });
    }, { rootMargin: '-90px 0px -70% 0px', threshold: 0 });
    var heads = app.querySelectorAll('.article h2[id], .article h3[id]');
    for (var j = 0; j < heads.length; j++) tocObserver.observe(heads[j]);
  }

  function setActiveNav(route) {
    var navKey = PAGES[route] ? PAGES[route].nav : route;
    var links = document.querySelectorAll('[data-nav]');
    for (var i = 0; i < links.length; i++) {
      var key = links[i].getAttribute('data-nav');
      var active = key === navKey || key === route;
      links[i].classList.toggle('active', active);
      if (active) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }
  }

  function announceRoute(page) {
    var el = document.getElementById('route-announcer');
    if (!el) {
      el = document.createElement('div');
      el.id = 'route-announcer';
      el.className = 'visually-hidden';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      document.body.appendChild(el);
    }
    el.textContent = page.title + ' page loaded';
  }

  function render() {
    var state = parseHash();
    var page = PAGES[state.route] || PAGES.home;
    var routeChanged = currentRoute !== state.route;
    currentRoute = state.route;
    var layout = page.layout === 'docs' ? 'docs' : 'marketing';

    if (layout === 'docs') {
      app.innerHTML =
        '<div class="docs-shell">' +
          buildDocsSidebar(state.route) +
          '<div class="docs-main">' +
            '<div class="docs-mobile-bar"><button type="button" class="btn btn-secondary btn-sm" id="docs-menu-btn" aria-expanded="false" aria-controls="mobile-nav">' + icon('menu') + 'Browse docs</button><span class="small muted">' + escapeHtml(page.title) + '</span></div>' +
            buildBreadcrumbs(state.route) +
            '<article class="article">' +
              '<p class="article-eyebrow">' + escapeHtml(page.eyebrow || 'Documentation') + '</p>' +
              page.html +
              buildPageNav(state.route) +
            '</article>' +
          '</div>' +
          '<aside class="docs-toc" aria-label="On this page"><p class="docs-toc-title">On this page</p><nav id="toc-links"></nav></aside>' +
        '</div>' + buildFooter();
      enhanceHeadings(state.route);
      buildToc(state.route);
    } else {
      app.innerHTML = '<div class="marketing-page">' + page.html + '</div>' + buildFooter();
    }

    enhanceCodeRegions();

    var inactivePanels = app.querySelectorAll('.tab-panel:not(.active)');
    for (var p = 0; p < inactivePanels.length; p++) inactivePanels[p].hidden = true;

    setActiveNav(state.route);
    closeMobileNav(false);
    closeSearch(false);
    document.title = page.title.indexOf('Axym') !== -1 ? page.title : page.title + ' — Axym';
    var desc = document.querySelector('meta[name="description"]');
    if (desc && page.description) desc.setAttribute('content', page.description);

    if (typeof window.renderArtifacts === 'function') window.renderArtifacts();
    if (typeof window.renderDownloads === 'function') window.renderDownloads();
    if (typeof window.renderTimeline === 'function') window.renderTimeline();
    updateInstallOutputs();
    if (typeof window.updatePolicy === 'function') window.updatePolicy();

    if (routeChanged) announceRoute(page);
    if (routeChanged && document.activeElement !== document.body) {
      app.focus({ preventScroll: true });
    }

    var target = state.anchor || pendingScroll;
    pendingScroll = null;
    if (target) {
      window.requestAnimationFrame(function () {
        var el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ block: 'start' });
          var heading = el.querySelector('h2, h3') || (el.tagName === 'H2' || el.tagName === 'H3' ? el : null);
          if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
        } else {
          window.scrollTo(0, 0);
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function navigate(route, anchor) {
    var hash = '#' + route + (anchor ? '/' + anchor : '');
    if (window.location.hash === hash) { pendingScroll = anchor; render(); }
    else window.location.hash = hash;
  }

  /* ------------------------------------------------------ release hydration -- */
  function applyReleaseData() {
    if (!releases || !releases.tui) return;
    var pill = document.getElementById('version-pill');
    var side = document.getElementById('side-version');
    if (pill) pill.textContent = 'TUI ' + releases.tui.version;
    if (side) side.textContent = releases.tui.version;
    updateInstallOutputs();
    if (typeof window.renderDownloads === 'function') window.renderDownloads();
    if (typeof window.renderArtifacts === 'function') window.renderArtifacts();
    if (typeof window.renderTimeline === 'function') window.renderTimeline();
  }

  function updateInstallOutputs() {
    if (!releases || !releases.tui || !releases.tui.install) return;
    var nodes = document.querySelectorAll('[data-install-output]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-install-output');
      var command = releases.tui.install[key];
      if (command) nodes[i].textContent = command;
    }
  }

  function loadReleases() {
    return fetch('./data/releases.json')
      .then(function (r) { if (!r.ok) throw new Error('manifest HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        releases = data;
        if (!releases.artifacts) releases.artifacts = [];
        if (!releases.history) releases.history = [];
      })
      .catch(function () { releases = FALLBACK_RELEASES; });
  }

  function artifactGroups() {
    var artifacts = (releases && releases.artifacts) || [];
    var groups = { tui: [], desktop: [] };
    artifacts.forEach(function (a) {
      if (groups[a.product]) groups[a.product].push(a);
    });
    return groups;
  }

  function renderDownloads() {
    var host = document.getElementById('downloads-grid');
    if (!host) return;
    var groups = artifactGroups();
    if (!groups.tui.length && !groups.desktop.length) {
      host.innerHTML = '<div class="empty-state">Release artifacts are published on GitHub. <a href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">Open GitHub Releases</a>.</div>';
      return;
    }
    function card(a) {
      var active = a.status === 'active';
      var url = safeReleaseUrl(a.url);
      var badge = active ? '<span class="badge badge-active">Published</span>' : '<span class="badge badge-pending">Pending build</span>';
      var checksum = active && a.sha256
        ? '<div class="download-checksum"><code title="' + escapeHtml(a.sha256) + '">' + escapeHtml(String(a.sha256).slice(0, 16)) + '…</code><button type="button" class="checksum-btn" data-copy-text="' + escapeHtml(a.sha256) + '" aria-label="Copy SHA-256 for ' + escapeHtml(a.file) + '">' + icon('copy', 'icon-sm') + '</button></div>'
        : '';
      var action = active && url
        ? '<a class="btn btn-primary btn-sm" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">Download ' + icon('download') + '</a>'
        : '<span class="btn btn-secondary btn-sm" aria-disabled="true">Awaiting build</span>';
      return '<div class="download-card">' +
        '<div class="download-card-top"><span class="download-platform">' + icon(a.product === 'tui' ? 'terminal' : 'monitor') + escapeHtml(a.label || a.platform) + '</span>' +
        '<span class="download-version">v' + escapeHtml(a.version) + '</span></div>' +
        '<div class="download-meta"><span><b>File</b> ' + escapeHtml(a.file) + '</span><span><b>Size</b> ' + formatBytes(a.sizeBytes) + '</span><span><b>SHA-256</b> ' + (active ? 'published' : 'pending') + '</span></div>' +
        '<div style="margin-bottom:.6rem">' + badge + '</div>' + action + checksum + '</div>';
    }
    var html = '';
    if (groups.tui.length) {
      html += '<div class="download-group"><div class="download-group-head"><h3>Axym TUI</h3><p>standalone · v' + escapeHtml(groups.tui[0].version) + '</p></div><div class="download-grid">' + groups.tui.map(card).join('') + '</div></div>';
    }
    if (groups.desktop.length) {
      html += '<div class="download-group"><div class="download-group-head"><h3>Axym Desktop</h3><p>app · macOS ' + escapeHtml((releases.desktop && releases.desktop.version) || '') + ' · Linux / Windows ' + escapeHtml((releases.desktop && releases.desktop.crossOsVersion) || '') + '</p></div><div class="download-grid">' + groups.desktop.map(card).join('') + '</div></div>';
    }
    host.innerHTML = html;
  }

  function renderArtifacts() {
    var host = document.getElementById('artifacts-grid');
    if (!host) return;
    var artifacts = (releases && releases.artifacts) || [];
    if (!artifacts.length) {
      host.innerHTML = '<div class="empty-state">Artifact links are published with each GitHub release. <a href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">Open GitHub Releases</a> for the full asset list.</div>';
      return;
    }
    var html = '<div class="table-wrap" tabindex="0" role="region" aria-label="Published artifacts"><table><thead><tr><th>Product</th><th>Platform</th><th>Version</th><th>Asset</th><th>SHA-256</th><th></th></tr></thead><tbody>';
    artifacts.forEach(function (a) {
      var active = a.status === 'active';
      var url = safeReleaseUrl(a.url);
      var hash = active && a.sha256
        ? '<code title="' + escapeHtml(a.sha256) + '">' + escapeHtml(String(a.sha256).slice(0, 12)) + '…</code> <button type="button" class="checksum-btn" data-copy-text="' + escapeHtml(a.sha256) + '" aria-label="Copy SHA-256 for ' + escapeHtml(a.file) + '">' + icon('copy', 'icon-sm') + '</button>'
        : '<span class="badge badge-pending">Pending release build</span>';
      var download = active && url
        ? '<a class="btn btn-secondary btn-sm" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">Download</a>'
        : '<span class="badge badge-pending">—</span>';
      html += '<tr><td>' + escapeHtml(a.product) + '</td><td>' + escapeHtml(a.label || a.platform) + '</td><td><code>' + escapeHtml(a.version) + '</code></td><td><code>' + escapeHtml(a.file) + '</code></td><td>' + hash + '</td><td>' + download + '</td></tr>';
    });
    host.innerHTML = html + '</tbody></table></div>';
  }

  function renderTimeline() {
    var hosts = document.querySelectorAll('#release-timeline');
    if (!hosts.length) return;
    var history = (releases && releases.history) || [];
    if (!history.length) {
      hosts.forEach(function (host) {
        host.innerHTML = '<li class="timeline-item"><div class="timeline-head"><span class="timeline-version">Release history</span></div><p class="timeline-note"><a href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">Open GitHub Releases</a> for the complete list.</p></li>';
      });
      return;
    }
    var html = history.map(function (item, index) {
      var url = safeReleaseUrl(item.url);
      var title = item.note ? '<p class="timeline-note">' + escapeHtml(item.note) + '</p>' : '';
      return '<li class="timeline-item' + (index === 0 ? ' latest' : '') + '">' +
        '<div class="timeline-head"><span class="timeline-version">' + escapeHtml(item.tag) + '</span>' +
        '<span class="timeline-date">' + escapeHtml(item.date) + '</span>' +
        '<span class="badge ' + (item.product === 'Desktop' ? 'badge-info' : 'badge-neutral') + ' badge-plain">' + escapeHtml(item.product) + '</span></div>' +
        '<p class="timeline-title">' + (url ? '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' + escapeHtml(item.name || item.tag) + '</a>' : escapeHtml(item.name || item.tag)) + '</p>' + title + '</li>';
    }).join('');
    hosts.forEach(function (host) { host.innerHTML = html; });
  }

  /* ---------------------------------------------------------------- search -- */
  function buildSearchIndex() {
    var items = [];
    ORDER.forEach(function (route) {
      var page = PAGES[route];
      if (!page) return;
      items.push({ title: page.title, sub: 'Page · ' + (page.eyebrow || route), route: route, keys: page.keywords || '' });
      var holder = document.createElement('div');
      holder.innerHTML = page.html;
      var heads = holder.querySelectorAll('h1[id], h2[id], h3[id]');
      for (var i = 0; i < heads.length; i++) {
        items.push({ title: heads[i].textContent.trim(), sub: 'Section in ' + page.title, route: route, anchor: heads[i].id, keys: page.keywords || '' });
      }
    });
    [
      ['/review', 'Automated code review', 'features', 'review qa'],
      ['/qa', 'Test-coverage pass', 'features', 'qa tests'],
      ['/security', 'Evidence-grounded vulnerability scan', 'features', 'security audit'],
      ['/pipeline', 'Watch a run stage by stage', 'operations', 'pipeline stages'],
      ['/po', 'Turn a fuzzy request into a scoped decision', 'features', 'product owner decision'],
      ['/race', 'Compare strategies before committing', 'features', 'race multi-model'],
      ['/files', 'Inspect and gate file edits', 'setup', 'files security'],
      ['/doctor', 'Check detected providers', 'quickstart', 'doctor provider setup'],
      ['/update', 'Self-update with verified download', 'operations', 'update'],
      ['axym solve', 'Run a one-shot goal', 'features', 'solve headless'],
      ['axym queue', 'Queue governed work', 'features', 'queue'],
      ['axym web', 'Remote TUI over TLS', 'setup', 'web remote mobile t-050']
    ].forEach(function (c) {
      items.push({ title: c[0], sub: c[1] + ' · command', route: c[2], keys: c[3] });
    });
    return items;
  }

  function renderSearch(query) {
    var q = query.trim().toLowerCase();
    var matches = searchItems.filter(function (it) {
      var hay = (it.title + ' ' + it.sub + ' ' + it.keys).toLowerCase();
      return !q || hay.indexOf(q) !== -1;
    }).slice(0, 24);
    searchSelected = 0;
    window.AXYM_SEARCH_MATCHES = matches;
    searchInput.setAttribute('aria-activedescendant', '');
    if (!matches.length) {
      searchResults.innerHTML = '<div class="search-empty" role="status">No matches for “' + escapeHtml(query) + '”. Try “install”, “provider”, “trust zone” or “checksum”.</div>';
      return;
    }
    var html = '';
    var lastGroup = '';
    matches.forEach(function (it, index) {
      var group = PAGES[it.route] ? PAGES[it.route].title : it.route;
      if (group !== lastGroup) { html += '<div class="search-group" aria-hidden="true">' + escapeHtml(group) + '</div>'; lastGroup = group; }
      html += '<button type="button" class="search-result' + (index === 0 ? ' selected' : '') + '" role="option" id="search-opt-' + index + '" aria-selected="' + (index === 0) + '" data-index="' + index + '">' + escapeHtml(it.title) + '<small>' + escapeHtml(it.sub) + '</small></button>';
    });
    searchResults.innerHTML = html;
    searchInput.setAttribute('aria-activedescendant', 'search-opt-0');
  }

  function openSearch() {
    if (!searchOverlay) return;
    lastFocus = document.activeElement;
    searchOverlay.hidden = false;
    searchInput.value = '';
    renderSearch('');
    window.setTimeout(function () { searchInput.focus(); }, 10);
  }

  function closeSearch(returnFocus) {
    if (!searchOverlay) return;
    if (searchOverlay.hidden) return;
    searchOverlay.hidden = true;
    if (returnFocus && lastFocus) lastFocus.focus();
  }

  function chooseSearch(index) {
    var matches = window.AXYM_SEARCH_MATCHES || [];
    var it = matches[index];
    if (!it) return;
    closeSearch(false);
    navigate(it.route, it.anchor);
  }

  function moveSearch(delta) {
    var matches = window.AXYM_SEARCH_MATCHES || [];
    if (!matches.length) return;
    searchSelected = (searchSelected + delta + matches.length) % matches.length;
    var nodes = searchResults.querySelectorAll('.search-result');
    for (var i = 0; i < nodes.length; i++) {
      var on = i === searchSelected;
      nodes[i].classList.toggle('selected', on);
      nodes[i].setAttribute('aria-selected', String(on));
    }
    searchInput.setAttribute('aria-activedescendant', 'search-opt-' + searchSelected);
    if (nodes[searchSelected]) nodes[searchSelected].scrollIntoView({ block: 'nearest' });
  }

  /* ------------------------------------------------------------ mobile nav -- */
  function openMobileNav(opener) {
    if (!mobileNav) return;
    lastFocus = (opener && opener.focus) ? opener : (document.activeElement && document.activeElement !== document.body ? document.activeElement : menuToggle);
    mobileNav.hidden = false;
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    var docsBtn = document.getElementById('docs-menu-btn');
    if (docsBtn) docsBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = mobileNav.querySelector('a, button');
    if (first) first.focus();
  }

  function closeMobileNav(returnFocus) {
    if (!mobileNav || mobileNav.hidden) return;
    mobileNav.hidden = true;
    document.body.style.overflow = '';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    var docsBtn = document.getElementById('docs-menu-btn');
    if (docsBtn) docsBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) {
      var target = (lastFocus && lastFocus !== document.body) ? lastFocus : menuToggle;
      if (target && target.focus) target.focus();
    }
  }

  function trapFocus(container, event) {
    var focusables = container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  /* ---------------------------------------------------------- event wiring -- */
  function wireGlobalEvents() {
    window.addEventListener('hashchange', render);

    document.getElementById('search-trigger').addEventListener('click', openSearch);
    document.getElementById('search-close').addEventListener('click', function () { closeSearch(true); });
    searchOverlay.addEventListener('click', function (e) { if (e.target === searchOverlay) closeSearch(true); });
    searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
    searchResults.addEventListener('click', function (e) {
      var result = e.target.closest('.search-result');
      if (result) chooseSearch(Number(result.getAttribute('data-index')));
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSearch(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSearch(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); chooseSearch(searchSelected); }
      else if (e.key === 'Tab') { trapFocus(searchOverlay.querySelector('.search-modal'), e); }
    });

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchOverlay.hidden) openSearch(); else closeSearch(true);
      } else if (e.key === 'Escape') {
        closeSearch(true);
        closeThemeMenu(true);
        closeMobileNav(true);
      }
    });

    themeBtn.addEventListener('click', function () {
      if (themeMenu.hidden) openThemeMenu(); else closeThemeMenu(true);
    });
    themeMenu.addEventListener('click', function (e) {
      var choice = e.target.closest('[data-theme-choice]');
      if (!choice) return;
      applyThemeMode(choice.getAttribute('data-theme-choice'), true);
      closeThemeMenu(true);
      toast('Appearance: ' + choice.getAttribute('data-theme-choice'));
    });
    themeMenu.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(themeMenu.querySelectorAll('[data-theme-choice]'));
      var index = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var next = (index + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items[next].focus();
      } else if (e.key === 'Tab') {
        trapFocus(themeMenu, e);
      }
    });
    document.addEventListener('click', function (e) {
      if (themeMenu && !themeMenu.hidden && !e.target.closest('.theme-control')) closeThemeMenu(false);
    });
    if (systemQuery) {
      var onChange = function () { if (themeMode === 'system') applyThemeMode('system', false); };
      if (systemQuery.addEventListener) systemQuery.addEventListener('change', onChange);
      else if (systemQuery.addListener) systemQuery.addListener(onChange);
    }

    menuToggle.addEventListener('click', function () { openMobileNav(menuToggle); });
    mobileNavClose.addEventListener('click', function () { closeMobileNav(true); });
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) closeMobileNav(true);
      if (e.target.closest('a')) closeMobileNav(false);
    });
    mobileNav.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') trapFocus(mobileNav.querySelector('.mobile-nav-panel'), e);
    });

    document.addEventListener('click', function (e) {
      var docsBtn = e.target.closest('#docs-menu-btn');
      if (docsBtn) { openMobileNav(); return; }

      var nav = e.target.closest('.docs-side-link, .page-nav-card');
      if (nav && !nav.getAttribute('href')) return;

      var anchor = e.target.closest('a[data-anchor]');
      if (anchor) {
        e.preventDefault();
        var id = anchor.getAttribute('data-anchor');
        var state = parseHash();
        if (window.location.hash.indexOf('/' + id) === -1) navigate(state.route, id);
        else {
          var el = document.getElementById(id);
          if (el) el.scrollIntoView({ block: 'start' });
        }
      }
    });

    wireComponents();
  }

  /* ======================================================================
     INTERACTIVE COMPONENTS — tabs, copy, install switcher, policy builder,
     accordions, filters, checksums.
     ====================================================================== */
  function wireComponents() {
    document.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-tab]');
      if (tab && tab.closest('[data-tabs]')) {
        var groupEl = tab.closest('[data-tabs]');
        var group = groupEl.getAttribute('data-tabs');
        var name = tab.getAttribute('data-tab');
        var groupTabs = groupEl.querySelectorAll('[data-tab]');
        for (var i = 0; i < groupTabs.length; i++) {
          var on = groupTabs[i] === tab;
          groupTabs[i].classList.toggle('active', on);
          groupTabs[i].setAttribute('aria-selected', String(on));
          groupTabs[i].tabIndex = on ? 0 : -1;
        }
        var panels = document.querySelectorAll('[data-panels="' + group + '"] [data-panel]');
        for (var j = 0; j < panels.length; j++) {
          var active = panels[j].getAttribute('data-panel') === name;
          panels[j].classList.toggle('active', active);
          if (active) panels[j].removeAttribute('hidden'); else panels[j].setAttribute('hidden', '');
        }
        return;
      }

      var copyBtn = e.target.closest('[data-copy]');
      if (copyBtn) {
        var target = document.getElementById(copyBtn.getAttribute('data-copy'));
        if (target) copyText(target.textContent.replace(/\s+$/, ''), 'Copied', copyBtn);
        else {
          var literal = copyBtn.getAttribute('data-copy-text');
          if (literal !== null) copyText(literal, 'Copied', copyBtn);
        }
        return;
      }

      var checksumBtn = e.target.closest('[data-copy-text]');
      if (checksumBtn && !checksumBtn.hasAttribute('data-copy')) {
        copyText(checksumBtn.getAttribute('data-copy-text'), 'SHA-256 copied', checksumBtn);
        return;
      }

      var osBtn = e.target.closest('[data-os]');
      if (osBtn && releases && releases.tui && releases.tui.install) {
        var key = osBtn.getAttribute('data-os');
        var command = releases.tui.install[key];
        if (command) {
          var allOs = osBtn.closest('.os-bar').querySelectorAll('[data-os]');
          for (var k = 0; k < allOs.length; k++) {
            var pressed = allOs[k] === osBtn;
            allOs[k].classList.toggle('active', pressed);
            allOs[k].setAttribute('aria-pressed', String(pressed));
          }
          var outputs = document.querySelectorAll('[data-install-output]');
          for (var m = 0; m < outputs.length; m++) {
            outputs[m].textContent = command;
            outputs[m].setAttribute('data-install-output', key);
          }
        }
        return;
      }

      var chip = e.target.closest('[data-zone]');
      if (chip) {
        var isOn = !chip.classList.contains('on');
        chip.classList.toggle('on', isOn);
        chip.setAttribute('aria-pressed', String(isOn));
        updatePolicy();
        return;
      }

      var acc = e.target.closest('.acc-trigger');
      if (acc) {
        var item = acc.closest('.acc-item');
        var panel = item ? item.querySelector('.acc-panel') : null;
        if (panel) {
          var open = acc.getAttribute('aria-expanded') !== 'true';
          acc.setAttribute('aria-expanded', String(open));
          panel.classList.toggle('open', open);
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      var tab = e.target.closest('[data-tab]');
      if (!tab || !tab.closest('[data-tabs]')) return;
      var groupEl = tab.closest('[data-tabs]');
      var tabs = Array.prototype.slice.call(groupEl.querySelectorAll('[data-tab]'));
      var index = tabs.indexOf(tab);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var next = tabs[(index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        next.focus();
        next.click();
      } else if (e.key === 'Home') { e.preventDefault(); tabs[0].focus(); tabs[0].click(); }
      else if (e.key === 'End') { e.preventDefault(); tabs[tabs.length - 1].focus(); tabs[tabs.length - 1].click(); }
    });

    document.addEventListener('keydown', function (e) {
      var chip = e.target.closest('[data-zone]');
      if (!chip) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        chip.click();
      }
    });

    document.addEventListener('change', function (e) {
      if (e.target && /^pol-/.test(e.target.id)) updatePolicy();
    });

    document.addEventListener('input', function (e) {
      var input = e.target.closest('[data-filter-table]');
      if (!input) return;
      var query = input.value.trim().toLowerCase();
      var table = document.getElementById(input.getAttribute('data-filter-table'));
      if (!table) return;
      var rows = table.querySelectorAll('tbody tr');
      var visible = 0;
      for (var i = 0; i < rows.length; i++) {
        var match = !query || rows[i].textContent.toLowerCase().indexOf(query) !== -1;
        rows[i].classList.toggle('filter-hidden', !match);
        if (match) visible++;
      }
      var status = document.getElementById('filter-status');
      if (!status) {
        status = document.createElement('p');
        status.id = 'filter-status';
        status.className = 'small muted';
        status.setAttribute('role', 'status');
        input.parentNode.insertBefore(status, input.nextSibling);
      }
      status.textContent = query ? visible + ' of ' + rows.length + ' settings match “' + input.value + '”.' : '';
    });

    window.updatePolicy = updatePolicy;
    window.renderArtifacts = renderArtifacts;
    window.renderDownloads = renderDownloads;
    window.renderTimeline = renderTimeline;
  }

  function policyValue() {
    var zones = [];
    var chips = document.querySelectorAll('[data-zone].on');
    for (var i = 0; i < chips.length; i++) zones.push(chips[i].getAttribute('data-zone'));
    var pinned = document.getElementById('pol-pinned');
    var rotation = document.getElementById('pol-rotation');
    var spillover = document.getElementById('pol-spillover');
    var strict2 = document.getElementById('pol-strict2');
    return {
      allowedTrustZones: zones,
      pinnedAccount: pinned && pinned.value ? pinned.value : null,
      allowCrossZoneSpillover: !!(spillover && spillover.checked),
      rotationPolicy: (rotation && rotation.value) || 'sticky_drain_first',
      strictTier2Approval: !!(strict2 && strict2.checked)
    };
  }

  function highlightJson(value) {
    var raw = JSON.stringify(value, null, 2);
    return escapeHtml(raw)
      .replace(/("(?:[^"\\]|\\.)*")(?=\s*:)/g, '<span class="jk">$1</span>')
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="js">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="jb">$1</span>');
  }

  function updatePolicy() {
    var pre = document.getElementById('policy-json');
    if (!pre) return;
    pre.innerHTML = highlightJson(policyValue());
  }

  /* --------------------------------------------------------------- startup -- */
  function init() {
    try {
      var saved = localStorage.getItem('axym-theme');
      themeMode = saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
    } catch (e) { themeMode = 'system'; }
    applyThemeMode(themeMode, false);
    searchItems = buildSearchIndex();
    wireGlobalEvents();
    render();
    loadReleases().then(function () {
      applyReleaseData();
      var state = parseHash();
      if (state.route === 'releases' || state.route === 'home') render();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
