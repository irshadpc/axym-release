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

  /* Canonical capability data (Contract A) — the single source of truth for
     the catalog grid, filter pills, stat strip and ⌘K search. */
  var CAP_MANIFEST = null;
  var CAPABILITIES = [];
  var CAPABILITY_INDEX = {};

  /* Proof Artifact Registry (Contract D). Badge truth (ADR-0016): a sequence
     renders "Verified Recording · <version>" only when captured is true —
     which scripts/verify-manifest-sync.mjs only allows when the referenced
     recording/diff/receipt files exist and are non-empty on disk. Everything
     else renders an explicit "Illustrative Schematic" badge. */
  var PROOF_MANIFEST = null;

  var FALLBACK_RELEASES = {
    repo: 'irshadpc/axym-release',
    tui: {
      version: 'v0.24.0',
      releaseDate: '2026-11-05',
      install: {
        macos_arm: 'curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/axym-0.24.0-macos.tar.gz\ntar -xzf axym-0.24.0-macos.tar.gz\n./axym-macos-arm64 --install',
        macos_intel: 'curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/axym-0.24.0-macos.tar.gz\ntar -xzf axym-0.24.0-macos.tar.gz\n./axym-macos-x64 --install',
        linux: 'curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/axym-0.24.0-linux-x86_64.tar.gz\ntar -xzf axym-0.24.0-linux-x86_64.tar.gz\n./axym-linux-x86_64 --install',
        windows: 'Invoke-WebRequest -Uri https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/axym-0.24.0-windows-x86_64.zip -OutFile axym.zip\nExpand-Archive axym.zip -DestinationPath .\n.\\axym-windows-x86_64.exe --install'
      }
    },
    desktop: { version: 'v12.17.0', crossOsVersion: 'v12.16.0', releaseDate: '2026-11-04', supportedRange: '12.13.x-12.17.x', eolRange: '12.12.x and earlier' },
    artifacts: [],
    history: []
  };

  /* -------------------------------------------------------------- helpers -- */
  function parseHash() {
    var raw = window.location.hash.replace(/^#/, '');
    if (raw === 'app' || raw === '') {
      return { route: currentRoute || 'home', anchor: raw === 'app' ? 'app' : null };
    }
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
              '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="var(--brand)"/><path d="M17 38L32 15L47 38M17 26L32 49L47 26" fill="none" stroke="var(--on-brand)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
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
            '<li><a href="#releases/history">Release history</a></li>' +
            '<li><a href="#releases/verify-download">Verify a download</a></li></ul></div>' +
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
        icon(ico) + '<span>' + label + '</span>' + (key === 'releases' ? '<span class="docs-side-badge" id="side-version">v0.24.0</span>' : '') + '</a>';
    }
    return '<aside class="docs-sidebar" aria-label="Documentation navigation">' +
      '<div class="docs-side-group"><p class="docs-side-title">Getting started</p>' +
        link('home', 'Overview', 'layers') + link('architecture', 'Architecture', 'git-branch') +
        link('quickstart', 'Quick Start', 'arrow-right') + link('setup', 'Setup Guide', 'sliders') +
        link('configuration', 'Configuration', 'sliders') + '</div>' +
      '<div class="docs-side-group"><p class="docs-side-title">Reference</p>' +
        link('features', 'Features', 'activity') + link('releases', 'Releases', 'download') +
        link('operations', 'Operations', 'terminal') + '</div>' +
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
    var terminals = app.querySelectorAll('.terminal-body');
    for (var j = 0; j < terminals.length; j++) {
      var terminal = terminals[j];
      if (terminal.hasAttribute('tabindex')) continue;
      var term = terminal.closest ? terminal.closest('.terminal') : null;
      var bar = term ? term.querySelector('.terminal-bar') : null;
      var termLabel = bar && bar.textContent.trim() ? bar.textContent.trim() : 'Terminal output';
      terminal.setAttribute('tabindex', '0');
      terminal.setAttribute('role', 'group');
      terminal.setAttribute('aria-label', termLabel + ' — terminal output');
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

  function scrollToAnchor(target) {
    window.requestAnimationFrame(function () {
      var el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        if (target === 'app') {
          el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        } else {
          var heading = el.querySelector('h1, h2, h3') || (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' ? el : null);
          if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
          else { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
        }
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  /* In-page hash change (same route): drive the capability drawer or scroll
     to the anchor WITHOUT rebuilding the page, so filter pills, the search
     query and scroll position survive. `#features/feat-<id>` opens the
     drawer; any other anchor scrolls. A pendingScroll set before the hash
     change (e.g. the drawer's "View in full Reference" jump) always wins. */
  function handleAnchorState(state) {
    var cap = state.anchor && CAPABILITY_INDEX[state.anchor];
    if (cap && !pendingScroll) {
      var trigger = app.querySelector('.fx-card[data-fx-id="' + cap.id + '"]');
      openDrawer(cap, trigger);
      lastHash = window.location.hash;
      return;
    }
    var target = state.anchor || pendingScroll;
    pendingScroll = null;
    closeDrawer(false, true);
    if (target) scrollToAnchor(target);
    lastHash = window.location.hash;
  }

  function render() {
    var state = parseHash();
    var page = PAGES[state.route] || PAGES.home;
    var routeChanged = currentRoute !== state.route;
    currentRoute = state.route;

    if (!routeChanged) {
      handleAnchorState(state);
      return;
    }

    closeDrawer(false, true);
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
    enhanceFx();

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

    var anchorCap = !pendingScroll && state.anchor && CAPABILITY_INDEX[state.anchor];
    if (anchorCap) {
      var trigger = app.querySelector('.fx-card[data-fx-id="' + anchorCap.id + '"]');
      openDrawer(anchorCap, trigger);
      lastHash = window.location.hash;
      return;
    }

    var target = state.anchor || pendingScroll;
    pendingScroll = null;
    if (target) scrollToAnchor(target);
    else window.scrollTo(0, 0);
    lastHash = window.location.hash;
  }

  function navigate(route, anchor) {
    var hash = '#' + route + (anchor ? '/' + anchor : '');
    if (window.location.hash === hash) { pendingScroll = anchor; render(); }
    else window.location.hash = hash;
  }

  /* ====================================================== features showcase ==
     Catalog filter (search input + group pills), scroll-reveal, the
     local-nav scrollspy and the mission-control motion layer (boot console,
     count-ups, scroll progress, card spotlight, theater auto-advance) for
     the features page. All behaviour is progressive: without JS, or under
     prefers-reduced-motion, the page renders fully expanded and static. */
  var fxFilter = { query: '', raw: '', group: 'all' };
  var fxObserver = null;
  var fxSpyObserver = null;
  var fxBootTimer = null;
  var lastHash = null;

  /* --------------------------------------------- capability catalog (A) -- */
  /* The catalog grid, filter pills and counts are generated from the
     canonical manifest — never from a parallel static copy. Text is set
     through DOM text nodes; nothing from the data files is innerHTML'd. */
  function fxPillEl(value, label, count, pressed) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'fx-pill';
    b.setAttribute('data-fx-pill', value);
    b.setAttribute('aria-pressed', String(pressed));
    b.appendChild(document.createTextNode(label + ' '));
    var n = document.createElement('span');
    n.className = 'fx-pill-n';
    n.textContent = String(count);
    b.appendChild(n);
    return b;
  }

  function fxCardEl(cap, currentVersion) {
    var a = document.createElement('a');
    a.className = 'fx-card';
    a.href = '#features/' + cap.id;
    a.setAttribute('data-fx-group', cap.group);
    a.setAttribute('data-fx-id', cap.id);
    a.setAttribute('data-fx-search', (cap.search || '') + ' ' + cap.name);
    if (cap.featured_top12) a.setAttribute('data-fx-featured', 'true');
    a.setAttribute('data-fx-maturity', cap.maturity);
    a.setAttribute('data-fx-outcomes', cap.tab || '');
    var currentVersionForCard = ((releases && releases.tui && releases.tui.version) || (CAP_MANIFEST.release || '')).replace(/^v/, '');
    if (currentVersionForCard && cap.introduced_in === currentVersionForCard) a.setAttribute('data-fx-new', 'true');

    if (cap.maturity && cap.maturity !== 'stable') {
      var mat = document.createElement('span');
      mat.className = 'fx-mat';
      mat.setAttribute('data-mat', cap.maturity);
      mat.textContent = (CAP_MANIFEST.maturity && CAP_MANIFEST.maturity[cap.maturity]) || cap.maturity;
      a.appendChild(mat);
    }
    if (currentVersion && cap.introduced_in === currentVersion) {
      var isNew = document.createElement('span');
      isNew.className = 'fx-new';
      isNew.textContent = 'new · ' + cap.introduced_in;
      a.appendChild(isNew);
    }

    var iconWrap = document.createElement('span');
    iconWrap.className = 'fx-card-icon';
    iconWrap.setAttribute('aria-hidden', 'true');
    iconWrap.innerHTML = icon(cap.icon || 'cpu');
    a.appendChild(iconWrap);

    var name = document.createElement('span');
    name.className = 'fx-card-name';
    name.textContent = cap.name;
    a.appendChild(name);

    var copy = document.createElement('span');
    copy.className = 'fx-card-copy';
    copy.textContent = cap.summary || '';
    a.appendChild(copy);

    var cmd = document.createElement('code');
    cmd.className = 'fx-card-cmd';
    var cmdText = document.createElement('span');
    cmdText.className = 'fx-card-cmd-text';
    cmdText.textContent = (cap.commands && cap.commands[0]) || '';
    cmd.appendChild(cmdText);
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'fx-cmd-copy';
    copyBtn.setAttribute('data-copy-text', (cap.commands && cap.commands[0]) || '');
    copyBtn.setAttribute('aria-label', 'Copy command: ' + ((cap.commands && cap.commands[0]) || ''));
    copyBtn.innerHTML = icon('copy', 'icon-sm');
    cmd.appendChild(copyBtn);
    a.appendChild(cmd);
    return a;
  }

  function renderCapabilityCatalog() {
    var grid = document.getElementById('fx-catalog');
    if (!grid) return;
    var pillsHost = document.getElementById('fx-pills');
    var count = document.getElementById('fx-count');
    if (!CAP_MANIFEST || !CAPABILITIES.length) {
      grid.innerHTML = '';
      var err = document.createElement('p');
      err.className = 'muted small';
      err.textContent = 'The capability catalog could not be loaded. Refresh the page — if this persists, the manifest is missing from this deployment.';
      grid.appendChild(err);
      if (pillsHost) pillsHost.innerHTML = '';
      if (count) count.textContent = 'Catalog unavailable';
      return;
    }
    var currentVersion = ((releases && releases.tui && releases.tui.version) || CAP_MANIFEST.release || '').replace(/^v/, '');
    if (pillsHost) {
      pillsHost.innerHTML = '';
      var groups = CAP_MANIFEST.groups || {};
      var counts = {};
      var featuredCount = 0;
      var newCount = 0;
      CAPABILITIES.forEach(function (c) {
        counts[c.group] = (counts[c.group] || 0) + 1;
        if (c.featured_top12) featuredCount++;
        if (currentVersion && c.introduced_in === currentVersion) newCount++;
      });
      pillsHost.appendChild(fxPillEl('featured', 'Featured', featuredCount, fxFilter.group === 'featured'));
      pillsHost.appendChild(fxPillEl('new', 'New in ' + currentVersion, newCount, fxFilter.group === 'new'));
      pillsHost.appendChild(fxPillEl('all', 'All', CAPABILITIES.length, fxFilter.group === 'all'));
      Object.keys(groups).forEach(function (g) {
        pillsHost.appendChild(fxPillEl(g, groups[g], counts[g] || 0, fxFilter.group === g));
      });
    }
    var lensRow = document.getElementById('fx-lenses');
    if (lensRow) {
      lensRow.innerHTML = '';
      /* REV3 interim: the five index tabs drive the lens row until the
         hairline index replaces it (SW3-S1). */
      var lenses = CAP_MANIFEST.tabs || {};
      var lensDescriptions = CAP_MANIFEST.outcomeDescriptions || {};
      var lensCounts = {};
      var maturityCounts = {};
      CAPABILITIES.forEach(function (c) {
        if (c.tab) lensCounts[c.tab] = (lensCounts[c.tab] || 0) + 1;
        maturityCounts[c.maturity] = (maturityCounts[c.maturity] || 0) + 1;
      });
      var lead = document.createElement('span');
      lead.className = 'fx-lens-label';
      lead.textContent = 'Outcome lens';
      lensRow.appendChild(lead);
      Object.keys(lenses).forEach(function (key) {
        var pill = fxPillEl('lens:' + key, lenses[key], lensCounts[key] || 0, fxFilter.group === 'lens:' + key);
        if (lensDescriptions[key]) pill.setAttribute('title', lensDescriptions[key]);
        lensRow.appendChild(pill);
      });
      var maturityLabels = CAP_MANIFEST.maturity || {};
      Object.keys(maturityLabels).forEach(function (m) {
        if (!maturityCounts[m]) return; /* an empty maturity state never renders */
        lensRow.appendChild(fxPillEl('mat:' + m, maturityLabels[m], maturityCounts[m], fxFilter.group === 'mat:' + m));
      });
    }
    grid.innerHTML = '';
    CAPABILITIES.forEach(function (cap) { grid.appendChild(fxCardEl(cap, currentVersion)); });
    applyFxFilter();
  }

  function fillCapabilityCounts() {
    if (!CAPABILITIES.length) return;
    var total = String(CAPABILITIES.length);
    var spots = document.querySelectorAll('[data-capability-count]');
    for (var i = 0; i < spots.length; i++) spots[i].textContent = total;
    var stats = document.querySelectorAll('[data-stat]');
    for (var j = 0; j < stats.length; j++) {
      var el = stats[j];
      var kind = el.getAttribute('data-stat');
      var value = kind === 'groups' ? String(Object.keys((CAP_MANIFEST && CAP_MANIFEST.groups) || {}).length) : total;
      el.setAttribute('data-count', value);
      el.textContent = value;
    }
  }

/* ============================================================= REV3 story ==
   "One session, end to end" — sticky split-screen walkthrough (SW2-S1).
   Left rail: five plain-text chapters. Right: ONE sticky stage with
   Session | Diff / Visual | Receipt tabs and an honest ADR-0016 badge.
   Data: story-stages.json + proofs.manifest.json. Every string is set with
   textContent — nothing from the data files passes through innerHTML. */

  var STORY_MANIFEST = null;
  var storyChapter = null;
  var storyObserver = null;
  var storyLockUntil = 0;   /* a click wins over the scroll-spy for a grace period */

  function loadStory() {
    return fetch('./data/story-stages.json')
      .then(function (r) { if (!r.ok) throw new Error('story HTTP ' + r.status); return r.json(); })
      .then(function (data) { STORY_MANIFEST = data; })
      .catch(function () { STORY_MANIFEST = null; });
  }

  function storyClearObservers() {
    if (storyObserver) { storyObserver.disconnect(); storyObserver = null; }
  }

  function storyBadgeEl(proof) {
    var badge = document.createElement('span');
    if (proof && proof.captured === true && proof.captured_version) {
      badge.className = 'fx-proof-badge verified';
      badge.textContent = 'Verified Recording · ' + proof.captured_version;
    } else {
      badge.className = 'fx-proof-badge illustrative';
      badge.textContent = 'Illustrative Schematic';
    }
    return badge;
  }

  function storySessionPanel(lines) {
    var wrap = document.createElement('div');
    wrap.className = 'fx-proof-terminal';
    var pre = document.createElement('pre');
    pre.textContent = (lines || []).join('\n');
    wrap.appendChild(pre);
    return wrap;
  }

  function storyDiffPanel(diff) {
    var wrap = document.createElement('div');
    wrap.className = 'fx-proof-diff';
    if (diff.meta) {
      var meta = document.createElement('p');
      meta.className = 'fx-proof-diffmeta';
      meta.textContent = diff.meta;
      wrap.appendChild(meta);
    }
    if (diff.kind === 'visual') {
      (diff.items || []).forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'fx-proof-visual';
        var label = document.createElement('b');
        label.textContent = item.label || '';
        row.appendChild(label);
        var detail = document.createElement('span');
        detail.textContent = item.detail || '';
        row.appendChild(detail);
        wrap.appendChild(row);
      });
    } else {
      (diff.lines || []).forEach(function (line) {
        var row = document.createElement('div');
        row.className = 'fx-proof-diffline ' + (line.t === 'add' ? 'is-add' : line.t === 'del' ? 'is-del' : 'is-hunk');
        if (line.ln) {
          var ln = document.createElement('span');
          ln.className = 'fx-proof-ln';
          ln.textContent = String(line.ln);
          row.appendChild(ln);
        }
        var text = document.createElement('span');
        text.textContent = line.s || '';
        row.appendChild(text);
        wrap.appendChild(row);
      });
    }
    if (diff.boundary) {
      var note = document.createElement('p');
      note.className = 'fx-proof-boundary';
      note.textContent = diff.boundary;
      wrap.appendChild(note);
    }
    return wrap;
  }

  function storyReceiptPanel(receipt) {
    var wrap = document.createElement('div');
    wrap.className = 'fx-proof-receipt';
    var scalars = Object.keys(receipt).filter(function (k) {
      var v = receipt[k];
      return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
    });
    if (scalars.length) {
      var dl = document.createElement('dl');
      dl.className = 'fx-proof-receipt-dl';
      scalars.forEach(function (k) {
        var row = document.createElement('div');
        var dt = document.createElement('dt');
        dt.textContent = k.replace(/_/g, ' ');
        var dd = document.createElement('dd');
        dd.textContent = String(receipt[k]);
        row.appendChild(dt); row.appendChild(dd);
        dl.appendChild(row);
      });
      wrap.appendChild(dl);
    }
    if (Array.isArray(receipt.checks) && receipt.checks.length) {
      var tbl = document.createElement('div');
      tbl.className = 'fx-proof-checks';
      receipt.checks.forEach(function (c) {
        var row = document.createElement('div');
        row.className = 'fx-proof-check';
        var name = document.createElement('code');
        name.textContent = c.name || '';
        var res = document.createElement('span');
        res.setAttribute('data-check-result', c.result || '');
        res.textContent = c.result || '';
        row.appendChild(name); row.appendChild(res);
        if (c.detail) {
          var d = document.createElement('small');
          d.textContent = c.detail;
          row.appendChild(d);
        }
        if (c.independence) {
          var ind = document.createElement('small');
          ind.textContent = c.independence;
          row.appendChild(ind);
        }
        tbl.appendChild(row);
      });
      wrap.appendChild(tbl);
    }
    if (Array.isArray(receipt.unverified) && receipt.unverified.length) {
      receipt.unverified.forEach(function (u) {
        var row = document.createElement('p');
        row.className = 'fx-proof-unv';
        row.textContent = 'UNV · ' + u;
        wrap.appendChild(row);
      });
    }
    if (receipt.evidence) {
      var ev = document.createElement('p');
      ev.className = 'fx-proof-caption';
      ev.textContent = receipt.evidence;
      wrap.appendChild(ev);
    }
    return wrap;
  }

  function storyStageBody(ch, proof) {
    var frag = document.createDocumentFragment();

    var summary = document.createElement('p');
    summary.className = 'fx-proof-summary';
    summary.textContent = (ch.stage && ch.stage.summary) || '';
    frag.appendChild(summary);

    var subtabs = document.createElement('div');
    subtabs.className = 'fx-proof-subtabs';
    subtabs.setAttribute('role', 'tablist');
    subtabs.setAttribute('aria-label', 'Stage views');
    var panels = document.createElement('div');

    var views = [
      { id: 'session', label: 'Session', build: function () { return storySessionPanel(ch.stage && ch.stage.session); } },
      { id: 'diff', label: 'Diff / Visual', build: function () { return storyDiffPanel((ch.stage && ch.stage.diff) || {}); } },
      { id: 'receipt', label: 'Receipt', build: function () { return storyReceiptPanel((ch.stage && ch.stage.receipt) || {}); } },
    ];
    views.forEach(function (v, vi) {
      var t = document.createElement('button');
      t.type = 'button';
      t.className = 'fx-proof-subtab' + (vi === 0 ? ' active' : '');
      t.setAttribute('role', 'tab');
      t.setAttribute('aria-selected', vi === 0 ? 'true' : 'false');
      t.setAttribute('data-story-view', v.id);
      t.textContent = v.label;
      var panel = document.createElement('div');
      panel.className = 'fx-proof-subpanel';
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('data-story-panel', v.id);
      if (vi > 0) panel.hidden = true;
      panel.appendChild(v.build());
      subtabs.appendChild(t);
      panels.appendChild(panel);
      t.addEventListener('click', function () {
        var all = subtabs.querySelectorAll('[data-story-view]');
        for (var i = 0; i < all.length; i++) {
          var on = all[i] === t;
          all[i].classList.toggle('active', on);
          all[i].setAttribute('aria-selected', on ? 'true' : 'false');
        }
        var ps = panels.querySelectorAll('[data-story-panel]');
        for (var j = 0; j < ps.length; j++) ps[j].hidden = ps[j] !== panel;
      });
    });

    frag.appendChild(subtabs);
    frag.appendChild(panels);

    if (proof && proof.limitations && proof.captured !== true) {
      var lim = document.createElement('p');
      lim.className = 'fx-proof-boundary';
      lim.textContent = proof.limitations;
      frag.appendChild(lim);
    }
    return frag;
  }

  function proofByChapter() {
    var map = {};
    if (PROOF_MANIFEST && Array.isArray(PROOF_MANIFEST.chapters)) {
      PROOF_MANIFEST.chapters.forEach(function (p) { map[p.id] = p; });
    }
    return map;
  }

  function setStoryChapter(id) {
    var root = document.getElementById('story-root');
    if (!root || !STORY_MANIFEST) return;
    var ch = null;
    STORY_MANIFEST.chapters.forEach(function (c) { if (c.id === id) ch = c; });
    if (!ch) return;
    storyChapter = id;
    var proofMap = proofByChapter();
    root.querySelectorAll('[data-story-tab]').forEach(function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-story-tab') === id ? 'true' : 'false');
    });
    var stage = root.querySelector('.story-stage-body');
    if (stage) {
      stage.innerHTML = '';
      stage.appendChild(storyStageBody(ch, proofMap[id]));
    }
  }

  function renderStory() {
    var root = document.getElementById('story-root');
    storyClearObservers();
    if (!root) return;
    if (!STORY_MANIFEST || !Array.isArray(STORY_MANIFEST.chapters) || !STORY_MANIFEST.chapters.length) return;
    root.innerHTML = '';
    var chapters = STORY_MANIFEST.chapters;
    var proofMap = proofByChapter();

    var split = document.createElement('div');
    split.className = 'story-split';

    /* ---- left narrative rail (desktop) ---- */
    var rail = document.createElement('div');
    rail.className = 'story-rail';
    rail.setAttribute('aria-label', 'Walkthrough chapters');
    chapters.forEach(function (ch) {
      var item = document.createElement('div');
      item.className = 'story-chapter';
      item.setAttribute('data-story-tab', ch.id);
      item.setAttribute('aria-current', storyChapter === ch.id ? 'true' : 'false');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'story-chapter-btn';

      var num = document.createElement('span');
      num.className = 'story-num';
      num.textContent = ch.num;
      btn.appendChild(num);

      var copy = document.createElement('span');
      copy.className = 'story-copy';
      var title = document.createElement('b');
      title.textContent = ch.title;
      copy.appendChild(title);
      var lede = document.createElement('span');
      lede.className = 'story-lede';
      lede.textContent = ch.lede;
      copy.appendChild(lede);
      btn.appendChild(copy);
      item.appendChild(btn);

      var pills = document.createElement('span');
      pills.className = 'story-pills';
      (ch.commands || []).forEach(function (p) {
        var pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'story-pill';
        pill.setAttribute('data-story-pill', p.cap || '');
        var code = document.createElement('code');
        code.textContent = p.cmd;
        pill.appendChild(code);
        pill.addEventListener('click', function (e) {
          e.stopPropagation();
          var cap = CAPABILITY_INDEX[p.cap];
          if (cap) openDrawer(cap, pill);
        });
        pills.appendChild(pill);
      });
      item.appendChild(pills);
      item.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.story-pill')) return;
        storyLockUntil = Date.now() + 900;
        setStoryChapter(ch.id);
      });
      rail.appendChild(item);
    });
    split.appendChild(rail);

    /* ---- right sticky stage ---- */
    var stagewrap = document.createElement('div');
    stagewrap.className = 'story-stagewrap';
    var stage = document.createElement('div');
    stage.className = 'story-stage';
    stage.setAttribute('role', 'region');
    stage.setAttribute('aria-label', 'Walkthrough stage');

    var head = document.createElement('div');
    head.className = 'story-stage-head';
    head.appendChild(storyBadgeEl(proofMap[chapters[0].id]));
    var label = document.createElement('span');
    label.className = 'story-stage-label';
    label.textContent = 'One session, end to end';
    head.appendChild(label);
    stage.appendChild(head);

    var body = document.createElement('div');
    body.className = 'story-stage-body';
    stage.appendChild(body);
    stagewrap.appendChild(stage);
    split.appendChild(stagewrap);

    /* ---- try-flow bar (own grid row: the sticky stage must never cover it) -- */
    var tryflow = document.createElement('div');
    tryflow.className = 'story-tryflow';
    var tftitle = document.createElement('p');
    tftitle.className = 'story-tryflow-title';
    tftitle.textContent = 'Try this flow in 60 seconds';
    tryflow.appendChild(tftitle);
    var tfcmds = document.createElement('div');
    tfcmds.className = 'story-tryflow-cmds';
    (STORY_MANIFEST.try_flow || []).forEach(function (c) {
      var row = document.createElement('div');
      row.className = 'fx-proof-verify-cmd';
      var code = document.createElement('code');
      code.textContent = c;
      row.appendChild(code);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fx-cmd-copy';
      btn.setAttribute('data-copy-text', c);
      btn.setAttribute('aria-label', 'Copy command: ' + c);
      btn.innerHTML = icon('copy', 'icon-sm');
      row.appendChild(btn);
      tfcmds.appendChild(row);
    });
    tryflow.appendChild(tfcmds);
    split.appendChild(tryflow);
    root.appendChild(split);

    /* ---- mobile chapter chips ---- */
    var chips = document.createElement('div');
    chips.className = 'story-chips';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', 'Walkthrough chapters');
    chapters.forEach(function (ch) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'story-chip';
      chip.setAttribute('data-story-tab', ch.id);
      chip.setAttribute('aria-current', storyChapter === ch.id ? 'true' : 'false');
      chip.setAttribute('aria-label', 'Chapter ' + ch.num + ': ' + ch.title);
      chip.textContent = ch.num;
      chip.addEventListener('click', function () {
        storyLockUntil = Date.now() + 900;
        setStoryChapter(ch.id);
      });
      chips.appendChild(chip);
    });
    root.insertBefore(chips, split);

    if (!storyChapter || !chapters.some(function (c) { return c.id === storyChapter; })) {
      storyChapter = chapters[0].id;
    }
    setStoryChapter(storyChapter);

    /* ---- scroll-sync: a rail chapter crossing the active band activates ---- */
    if ('IntersectionObserver' in window) {
      storyObserver = new IntersectionObserver(function (entries) {
        if (Date.now() < storyLockUntil) return;
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          var id = entries[i].target.getAttribute('data-story-tab');
          if (id && id !== storyChapter) setStoryChapter(id);
        }
      }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
      var items = root.querySelectorAll('.story-chapter');
      for (var k = 0; k < items.length; k++) storyObserver.observe(items[k]);
    }
  }


  /* ------------------------------------------------------ detail drawer -- */
  /* Accessible right-hand slide-over for one capability. Opening is driven by
     the #features/<id> hash (so browser Back/Forward and deep links work);
     closing restores focus to the triggering card. All drawer text is set
     through DOM text nodes. */
  var drawerEl = null;
  var drawerBackdrop = null;
  var drawerOpen = false;
  var drawerCap = null;
  var drawerTrigger = null;
  var drawerViaHistory = false;

  function ensureDrawer() {
    if (drawerEl) return;
    drawerBackdrop = document.createElement('div');
    drawerBackdrop.className = 'fx-drawer-backdrop';
    drawerBackdrop.id = 'fx-drawer-backdrop';
    drawerBackdrop.hidden = true;
    drawerEl = document.createElement('aside');
    drawerEl.className = 'fx-drawer';
    drawerEl.id = 'fx-drawer';
    drawerEl.setAttribute('role', 'dialog');
    drawerEl.setAttribute('aria-modal', 'true');
    drawerEl.setAttribute('aria-labelledby', 'fx-drawer-title');
    drawerEl.hidden = true;
    drawerEl.innerHTML =
      '<div class="fx-drawer-head">' +
        '<div class="fx-drawer-head-copy">' +
          '<p class="fx-drawer-kicker" id="fx-drawer-kicker"></p>' +
          '<h2 class="fx-drawer-title" id="fx-drawer-title"></h2>' +
        '</div>' +
        '<button type="button" class="icon-btn" id="fx-drawer-close" aria-label="Close capability details"><svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button>' +
      '</div>' +
      '<div class="fx-drawer-body" id="fx-drawer-body"></div>';
    document.body.appendChild(drawerBackdrop);
    document.body.appendChild(drawerEl);

    drawerBackdrop.addEventListener('click', function () { closeDrawer(true); });
    drawerEl.querySelector('#fx-drawer-close').addEventListener('click', function () { closeDrawer(true); });
    drawerEl.addEventListener('keydown', function (e) { if (e.key === 'Tab') trapFocus(drawerEl, e); });
  }

  function drawerSection(kicker, text) {
    var sec = document.createElement('section');
    sec.className = 'fx-drawer-sec';
    var k = document.createElement('p');
    k.className = 'fx-drawer-kicker2';
    k.textContent = kicker;
    sec.appendChild(k);
    var p = document.createElement('p');
    p.className = 'fx-drawer-text';
    p.textContent = text;
    sec.appendChild(p);
    return sec;
  }

  function openDrawer(cap, trigger) {
    ensureDrawer();
    drawerCap = cap;
    drawerTrigger = trigger && trigger.focus ? trigger : null;
    drawerViaHistory = !!(lastHash && lastHash.charAt(0) === '#' && lastHash !== window.location.hash);
    drawerOpen = true;

    var kicker = drawerEl.querySelector('#fx-drawer-kicker');
    kicker.textContent = (CAP_MANIFEST.groups[cap.group] || cap.group) + ' · ' + ((CAP_MANIFEST.maturity && CAP_MANIFEST.maturity[cap.maturity]) || cap.maturity);
    drawerEl.querySelector('#fx-drawer-title').textContent = cap.name;

    var body = drawerEl.querySelector('#fx-drawer-body');
    body.innerHTML = '';

    var badges = document.createElement('div');
    badges.className = 'fx-drawer-badges';
    var mat = document.createElement('span');
    mat.className = 'fx-mat fx-mat-inline';
    mat.setAttribute('data-mat', cap.maturity);
    mat.textContent = (CAP_MANIFEST.maturity && CAP_MANIFEST.maturity[cap.maturity]) || cap.maturity;
    badges.appendChild(mat);
    var currentVersion = ((releases && releases.tui && releases.tui.version) || (CAP_MANIFEST.release || '')).replace(/^v/, '');
    if (cap.introduced_in === currentVersion) {
      var nb = document.createElement('span');
      nb.className = 'fx-new fx-new-inline';
      nb.textContent = 'new · ' + cap.introduced_in;
      badges.appendChild(nb);
    }
    if (cap.featured_top12) {
      var fb = document.createElement('span');
      fb.className = 'fx-flag';
      fb.textContent = 'Featured pillar';
      badges.appendChild(fb);
    }
    body.appendChild(badges);

    if (cap.problem) body.appendChild(drawerSection('User problem', cap.problem));
    body.appendChild(drawerSection('What it is', cap.what_it_is));
    body.appendChild(drawerSection('Why it matters', cap.why_it_matters));

    var use = document.createElement('section');
    use.className = 'fx-drawer-sec';
    var uk = document.createElement('p');
    uk.className = 'fx-drawer-kicker2';
    uk.textContent = 'Use it';
    use.appendChild(uk);
    var list = document.createElement('div');
    list.className = 'fx-drawer-cmds';
    (cap.commands || []).forEach(function (c) {
      var row = document.createElement('div');
      row.className = 'fx-drawer-cmd';
      var code = document.createElement('code');
      code.textContent = c;
      row.appendChild(code);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fx-cmd-copy';
      btn.setAttribute('data-copy-text', c);
      btn.setAttribute('aria-label', 'Copy command: ' + c);
      btn.innerHTML = icon('copy', 'icon-sm');
      row.appendChild(btn);
      list.appendChild(row);
    });
    use.appendChild(list);
    body.appendChild(use);

    var meta = document.createElement('dl');
    meta.className = 'fx-drawer-meta';
    function metaRow(dt, dd) {
      var row = document.createElement('div');
      var t = document.createElement('dt');
      t.textContent = dt;
      var d = document.createElement('dd');
      d.textContent = dd;
      row.appendChild(t); row.appendChild(d);
      meta.appendChild(row);
    }
    metaRow('Available in', (cap.surfaces || []).join(' · '));
    metaRow('Group', CAP_MANIFEST.groups[cap.group] || cap.group);
    if (cap.introduced_in) metaRow('Introduced in', 'v' + cap.introduced_in);
    else metaRow('Introduced in', 'before v0.24.0');
    body.appendChild(meta);

    if (cap.limitations) {
      var lim = document.createElement('section');
      lim.className = 'fx-drawer-limit';
      var lk = document.createElement('p');
      lk.className = 'fx-drawer-kicker2';
      lk.innerHTML = icon('alert', 'icon-sm') + ' Limitations';
      lim.appendChild(lk);
      var lp = document.createElement('p');
      lp.className = 'fx-drawer-text';
      lp.textContent = cap.limitations;
      lim.appendChild(lp);
      body.appendChild(lim);
    }

    drawerBackdrop.hidden = false;
    drawerEl.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = drawerEl.querySelector('#fx-drawer-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer(returnFocus, viaHistoryNavigation) {
    if (!drawerOpen) return;
    drawerOpen = false;
    var cap = drawerCap;
    drawerCap = null;
    if (drawerEl) drawerEl.hidden = true;
    if (drawerBackdrop) drawerBackdrop.hidden = true;
    document.body.style.overflow = '';
    if (returnFocus && drawerTrigger && drawerTrigger.focus) drawerTrigger.focus();
    drawerTrigger = null;
    if (cap && !viaHistoryNavigation) {
      var capHash = '#features/' + cap.id;
      if (window.location.hash === capHash) {
        if (drawerViaHistory && window.history && window.history.length > 1) {
          window.history.back(); /* hashchange → render → anchor scroll */
        } else {
          window.history.replaceState(null, '', '#features/catalog');
          pendingScroll = null;
          handleAnchorState(parseHash());
        }
      }
    }
  }

  /* Grounded in the v0.24.0 release notes and documented command output. */
  var FX_BOOT_SCENES = [
    {
      cmd: 'axym doctor',
      out: [
        '  claude     detected   stream-json   preferred',
        '  codex      detected   cli           available',
        '  opencode   detected   cli           available',
        '  keys 0 static · telemetry none',
        '  ✓ runtime ready · trust zone: work',
      ],
    },
    {
      cmd: 'axym ship "add rate limiting to the public API"',
      out: [
        '  ● plan      scope + acceptance criteria',
        '  ● design    contract first',
        '  ● code      src/app.ts +18 −2',
        '  ● security  threat model clean',
        '  ◆ review    gate · awaiting human',
        '  ✓ decision journaled · apply is reversible',
      ],
    },
    {
      cmd: 'axym runs start "migrate cache keys" --worktree',
      out: [
        '  run 9c11 · worktree wt-parallel-2',
        '  axym council "pick the rate limiter design"',
        '  3 providers · borda consensus · 1 decision record',
        '  ✓ all stages verified',
      ],
    },
  ];

  function fxClearTimers() {
    if (fxBootTimer) { clearInterval(fxBootTimer); fxBootTimer = null; }
  }

  /* The catalog defaults to the twelve flagship pillars; everything else is
     one deliberate click away (the Show-all CTA or any pill — and a typed
     query always expands the search to every capability). */
  var FX_DEFAULT_GROUP = 'featured';

  function fxMode() {
    var mode = fxFilter.group;
    var sep = mode.indexOf(':');
    if (sep === -1) return { kind: mode, value: '' };
    return { kind: mode.slice(0, sep), value: mode.slice(sep + 1) };
  }

  function applyFxFilter() {
    var grid = document.getElementById('fx-catalog');
    if (!grid) return;
    var cards = grid.querySelectorAll('.fx-card');
    var visible = 0;
    var mode = fxMode();
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var inMode = true;
      if (mode.kind === 'featured') inMode = card.getAttribute('data-fx-featured') === 'true';
      else if (mode.kind === 'new') inMode = card.getAttribute('data-fx-new') === 'true';
      else if (mode.kind === 'lens') inMode = (' ' + (card.getAttribute('data-fx-outcomes') || '') + ' ').indexOf(' ' + mode.value + ' ') !== -1;
      else if (mode.kind === 'mat') inMode = card.getAttribute('data-fx-maturity') === mode.value;
      else if (mode.kind !== 'all') inMode = card.getAttribute('data-fx-group') === mode.kind;
      /* Anti-lockout: a typed query always searches every capability —
         matches are never hidden behind the featured cap or any pill. */
      if (fxFilter.query) inMode = true;
      var hay = (card.textContent + ' ' + (card.getAttribute('data-fx-search') || '')).toLowerCase();
      var matches = inMode && (!fxFilter.query || hay.indexOf(fxFilter.query) !== -1);
      card.classList.toggle('filter-hidden', !matches);
      if (matches) visible++;
    }
    var count = document.getElementById('fx-count');
    if (count) {
      var total = cards.length;
      var scope = '';
      if (mode.kind === 'featured') scope = ' among the featured twelve';
      else if (mode.kind === 'new') scope = ' among capabilities new in this release';
      else if (mode.kind === 'lens') scope = ' through the "' + ((CAP_MANIFEST && CAP_MANIFEST.tabs && CAP_MANIFEST.tabs[mode.value]) || mode.value) + '" tab';
      else if (mode.kind === 'mat') scope = ' with ' + mode.value + ' maturity';
      else if (mode.kind !== 'all') scope = ' in the selected group';
      if (!fxFilter.query && mode.kind === 'all') {
        count.textContent = 'Showing all ' + total + ' capabilities';
      } else {
        var parts = ['Showing ' + visible + ' of ' + total + ' capabilities'];
        if (fxFilter.query) parts.push('matching "' + fxFilter.raw + '" (searching all ' + total + ')');
        else if (scope) parts.push(scope.trim());
        count.textContent = parts.join(' ') + '.';
      }
    }
    syncFxPills();
    syncFxShowAll();
  }

  function syncFxPills() {
    var pills = document.querySelectorAll('[data-fx-pill]');
    for (var i = 0; i < pills.length; i++) {
      pills[i].setAttribute('aria-pressed', String(pills[i].getAttribute('data-fx-pill') === fxFilter.group));
    }
  }

  function syncFxShowAll() {
    var host = document.getElementById('fx-showall');
    if (!host) return;
    var show = fxFilter.group === FX_DEFAULT_GROUP && !fxFilter.query;
    host.hidden = !show;
    if (show) {
      var btn = host.querySelector('#fx-showall-btn');
      if (btn && CAPABILITIES.length) btn.textContent = 'Show all ' + CAPABILITIES.length + ' capabilities';
    }
  }

  function startFxBoot(screen) {
    if (fxBootTimer) { clearInterval(fxBootTimer); fxBootTimer = null; }
    var state = { scene: 0, line: 0, char: 0, phase: 'cmd', wait: 0, text: '' };
    var TICK = 26;

    fxBootTimer = setInterval(function () {
      if (!screen.isConnected) { clearInterval(fxBootTimer); fxBootTimer = null; return; }
      var current = FX_BOOT_SCENES[state.scene];
      if (state.phase === 'cmd') {
        state.char++;
        state.text = '$ ' + current.cmd.slice(0, state.char);
        screen.textContent = state.text + '▋';
        if (state.char >= current.cmd.length) { state.phase = 'pause'; state.wait = 7; }
      } else if (state.phase === 'pause') {
        if (--state.wait <= 0) { state.phase = 'out'; state.line = 0; }
      } else if (state.phase === 'out') {
        if (state.line < current.out.length) {
          state.text += '\n' + current.out[state.line];
          state.line++;
          screen.textContent = state.text;
        } else {
          state.phase = 'hold';
          state.wait = 64;
          screen.textContent = state.text + '▋';
        }
      } else if (state.phase === 'hold') {
        if (--state.wait <= 0) {
          state.scene = (state.scene + 1) % FX_BOOT_SCENES.length;
          state.text = '';
          state.phase = 'cmd';
          state.char = 0;
          screen.textContent = '';
        }
      }
    }, TICK);
  }

  function startFxCountUp(root) {
    var nums = root.querySelectorAll('[data-count]');
    for (var i = 0; i < nums.length; i++) {
      (function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        if (!target) return;
        var t0 = null;
        var DURATION = 1100;
        function step(ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / DURATION, 1);
          var eased = 1 - Math.pow(1 - k, 3);
          el.textContent = String(Math.round(eased * target));
          if (k < 1 && el.isConnected) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      })(nums[i]);
    }
  }

  function enhanceFx() {
    var page = app.querySelector('.fx-page');
    fxClearTimers();
    if (fxObserver) { fxObserver.disconnect(); fxObserver = null; }
    if (fxSpyObserver) { fxSpyObserver.disconnect(); fxSpyObserver = null; }
    storyClearObservers();
    storyChapter = null;
    fxFilter.query = '';
    fxFilter.raw = '';
    fxFilter.group = FX_DEFAULT_GROUP;
    if (!page) return;

    renderCapabilityCatalog();
    fillCapabilityCounts();
    renderStory();

    var reduced = false;
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (err) { reduced = true; }

    var targets = page.querySelectorAll('[data-fx-reveal]');
    if (!('IntersectionObserver' in window) || reduced) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
    } else {
      fxObserver = new IntersectionObserver(function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (!entries[j].isIntersecting) continue;
          var el = entries[j].target;
          el.classList.add('in');
          fxObserver.unobserve(el);
          if (el.classList.contains('fx-stats')) startFxCountUp(el);
          if (el.classList.contains('fx-boot')) {
            var screen = el.querySelector('.fx-boot-screen');
            if (screen) startFxBoot(screen);
          }
        }
      }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });
      for (var k = 0; k < targets.length; k++) fxObserver.observe(targets[k]);
    }


    var links = page.querySelectorAll('.fx-localnav a[data-fx-spy]');
    if (links.length && 'IntersectionObserver' in window) {
      var byId = {};
      for (var m = 0; m < links.length; m++) byId[links[m].getAttribute('data-fx-spy')] = links[m];
      fxSpyObserver = new IntersectionObserver(function (entries) {
        for (var n = 0; n < entries.length; n++) {
          if (!entries[n].isIntersecting) continue;
          var link = byId[entries[n].target.id];
          if (!link || link.classList.contains('active')) continue;
          for (var q = 0; q < links.length; q++) links[q].classList.remove('active');
          link.classList.add('active');
        }
      }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
      for (var p = 0; p < links.length; p++) {
        var section = document.getElementById(links[p].getAttribute('data-fx-spy'));
        if (section) fxSpyObserver.observe(section);
      }
    }
  }

  /* ------------------------------------------------------ release hydration -- */
  function applyReleaseData() {
    if (!releases || !releases.tui) return;
    var pill = document.getElementById('version-pill');
    var side = document.getElementById('side-version');
    if (pill) pill.textContent = 'TUI ' + releases.tui.version;
    if (side) side.textContent = releases.tui.version;
    var versionSpots = {
      tui: releases.tui && releases.tui.version,
      desktop: releases.desktop && releases.desktop.version,
      'desktop-cross': releases.desktop && releases.desktop.crossOsVersion
    };
    var spots = document.querySelectorAll('[data-release-version]');
    for (var i = 0; i < spots.length; i++) {
      var key = spots[i].getAttribute('data-release-version');
      if (versionSpots[key]) spots[i].textContent = versionSpots[key];
    }
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

  function loadCapabilities() {
    return fetch('./data/capabilities.manifest.json')
      .then(function (r) { if (!r.ok) throw new Error('manifest HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        CAP_MANIFEST = data;
        CAPABILITIES = Array.isArray(data.capabilities) ? data.capabilities : [];
        CAPABILITY_INDEX = {};
        CAPABILITIES.forEach(function (c) { CAPABILITY_INDEX[c.id] = c; });
      })
      .catch(function () {
        /* No fabricated fallback: the catalog renders an explicit error state. */
        CAP_MANIFEST = null;
        CAPABILITIES = [];
        CAPABILITY_INDEX = {};
      });
  }

  function loadProofs() {
    return fetch('./data/proofs.manifest.json')
      .then(function (r) { if (!r.ok) throw new Error('manifest HTTP ' + r.status); return r.json(); })
      .then(function (data) { PROOF_MANIFEST = data; })
      .catch(function () { PROOF_MANIFEST = null; });
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
      host.innerHTML = '<div class="empty-state">Release artifacts are published with the project. <a href="https://github.com/irshadpc/axym-release" target="_blank" rel="noopener">Visit the Axym project</a>.</div>';
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
      host.innerHTML = '<div class="empty-state">Artifact links are published with each release. <a href="https://github.com/irshadpc/axym-release" target="_blank" rel="noopener">Visit the Axym project</a> for the full asset list.</div>';
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
        host.innerHTML = '<li class="timeline-item"><div class="timeline-head"><span class="timeline-version">Release history</span></div><p class="timeline-note"><a href="https://github.com/irshadpc/axym-release" target="_blank" rel="noopener">Visit the Axym project</a> for the complete list.</p></li>';
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
        // A section inherits only its own heading text. Inheriting the page
        // keywords would make every heading on a page match any page keyword
        // and push the genuinely relevant section out of the first results.
        items.push({ title: heads[i].textContent.trim(), sub: 'Section in ' + page.title, route: route, anchor: heads[i].id, keys: '' });
      }
    });
    if (CAPABILITIES.length) {
      var groupLabels = (CAP_MANIFEST && CAP_MANIFEST.groups) || {};
      CAPABILITIES.forEach(function (c) {
        items.push({
          title: c.name,
          sub: 'Capability · ' + (groupLabels[c.group] || c.group),
          route: 'features',
          anchor: c.id,
          keys: (c.search || '') + ' ' + (c.commands || []).join(' ')
        });
      });
    }
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

    var skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function () {
        if (app) {
          app.setAttribute('tabindex', '-1');
          app.focus();
        }
      });
    }

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
        closeDrawer(true);
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
    // Cursor-tracking spotlight for showcase cards: one delegated, passive
    // listener feeds CSS custom properties; the gradients live in CSS.
    if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.addEventListener('pointermove', function (e) {
        var t = e.target.closest ? e.target.closest('.fx-card, .fx-bento-card') : null;
        if (!t) return;
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    }

    // Command-copy affordance on catalog cards: copy the command without
    // navigating the card. Registered before the generic copy handler and
    // stopped immediately so both cannot fire on one click.
    document.addEventListener('click', function (e) {
      var cmdCopy = e.target.closest('.fx-cmd-copy');
      if (!cmdCopy) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      copyText(cmdCopy.getAttribute('data-copy-text') || '', 'Command copied', cmdCopy);
    });


    // Reading progress for the showcase page: one rAF-throttled scroll write.
    var fxProgressTicking = false;
    window.addEventListener('scroll', function () {
      if (fxProgressTicking) return;
      fxProgressTicking = true;
      window.requestAnimationFrame(function () {
        fxProgressTicking = false;
        var bar = document.querySelector('.fx-progress i');
        if (!bar) return;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var k = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = 'scaleX(' + k + ')';
      });
    }, { passive: true });

    document.addEventListener('click', function (e) {
      var pill = e.target.closest('[data-fx-pill]');      if (pill) {
        fxFilter.group = pill.getAttribute('data-fx-pill');
        applyFxFilter();
        return;
      }

      var showAllBtn = e.target.closest('#fx-showall-btn');
      if (showAllBtn) {
        fxFilter.group = 'all';
        fxFilter.query = '';
        fxFilter.raw = '';
        var searchInput = document.getElementById('feature-filter');
        if (searchInput) searchInput.value = '';
        applyFxFilter();
        return;
      }

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
      var gridInput = e.target.closest('[data-filter-grid]');
      if (gridInput) {
        fxFilter.raw = gridInput.value.trim();
        fxFilter.query = fxFilter.raw.toLowerCase();
        applyFxFilter();
        return;
      }
      var input = e.target.closest('[data-filter-table]');
      if (!input) return;
      var query = input.value.trim().toLowerCase();
      var table = document.getElementById(input.getAttribute('data-filter-table'));
      if (!table) return;
      var noun = input.getAttribute('data-filter-noun') || 'settings';
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
      status.textContent = query ? visible + ' of ' + rows.length + ' ' + noun + ' match “' + input.value + '”.' : '';
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
    ensureDrawer();
    wireGlobalEvents();
    loadCapabilities().then(function () {
      searchItems = buildSearchIndex();
      render();
      fillCapabilityCounts();
    });
    loadProofs()
      .then(loadStory)
      .then(function () {
        if (currentRoute === 'features') renderStory();
      });
    loadReleases().then(function () {
      applyReleaseData();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
