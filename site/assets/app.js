/* ==========================================================================
   AXYM RELEASE PORTAL — router, search, theme, drawer, release hydration
   Hash format: #route or #route/anchor-id
   ========================================================================== */
(function () {
  'use strict';

  var PAGES = window.AXYM_PAGES || {};
  var ORDER = window.AXYM_NAV_ORDER || Object.keys(PAGES);
  var app = document.getElementById('app');
  var tocLinks = document.getElementById('toc-links');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var themeBtn = document.getElementById('theme-toggle');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var toastEl = document.getElementById('toast');

  var releases = null;
  var pendingScroll = null;
  var searchItems = [];
  var searchSelected = 0;

  // Real baseline used only when ./data/releases.json cannot be fetched
  // (for example when opening index.html directly from disk via file://).
  var FALLBACK_RELEASES = {
    repo: 'irshadpc/axym-release',
    tui: {
      version: 'v0.23.0',
      install: {
        macos_arm: 'curl -fsSL https://github.com/irshadpc/axym-release/releases/latest/download/install.sh | sh',
        macos_intel: 'curl -fsSL https://github.com/irshadpc/axym-release/releases/latest/download/install.sh | ARCH=x86_64 sh',
        linux: 'curl -fsSL https://github.com/irshadpc/axym-release/releases/latest/download/install.sh | sh',
        source: 'git clone https://github.com/irshadpc/axym.git && cd axym/tui && npm install && npm run build'
      }
    },
    desktop: { version: 'v12.17.0', crossOsVersion: 'v12.16.0', supportedRange: '12.13.x-12.17.x', eolRange: '12.12.x and earlier' },
    artifacts: []
  };

  /* -------------------------------------------------------------- helpers -- */
  function parseHash() {
    var raw = window.location.hash.replace(/^#/, '');
    var parts = raw.split('/');
    var route = parts.shift();
    return { route: PAGES[route] ? route : 'home', anchor: parts.join('/') || null };
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () { toastEl.classList.remove('show'); }, 1900);
  }

  function copyText(text, label) {
    var done = function () { toast((label || 'Copied') + ' to clipboard'); };
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

  /* --------------------------------------------------------------- router -- */
  function buildPageNav(route) {
    var i = ORDER.indexOf(route);
    var prev = i > 0 ? PAGES[ORDER[i - 1]] : null;
    var next = i < ORDER.length - 1 ? PAGES[ORDER[i + 1]] : null;
    var card = function (item, key, cls) {
      if (!item) return '<span></span>';
      return '<a class="page-nav-card ' + cls + '" href="#' + key + '">' +
        '<span class="page-nav-label">' + (cls === 'next' ? 'Next →' : '← Previous') + '</span>' +
        '<span class="page-nav-title">' + escapeHtml(item.title) + '</span></a>';
    };
    return '<nav class="page-nav" aria-label="Page navigation">' +
      card(prev, ORDER[i - 1], 'prev') + card(next, ORDER[i + 1], 'next') + '</nav>';
  }

  function buildToc(route) {
    var heads = app.querySelectorAll('h2[id], h3[id]');
    if (!heads.length) { tocLinks.innerHTML = ''; return; }
    var html = '';
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      html += '<a class="' + (h.tagName === 'H3' ? 'lvl-3' : '') + '" href="#' + route + '/' + h.id + '" data-anchor="' + h.id + '">' +
        escapeHtml(h.textContent.trim()) + '</a>';
    }
    tocLinks.innerHTML = html;
  }

  function setActiveNav(route) {
    var links = document.querySelectorAll('[data-nav]');
    for (var i = 0; i < links.length; i++) {
      var active = links[i].getAttribute('data-nav') === route;
      links[i].classList.toggle('active', active);
      if (active) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }
  }

  function render() {
    var state = parseHash();
    var page = PAGES[state.route] || PAGES.home;
    var eyebrow = page.eyebrow ? '<span class="page-eyebrow">' + escapeHtml(page.eyebrow) + '</span>' : '';
    var intro = page.html.indexOf('<h1') === -1 ? '<h1>' + escapeHtml(page.title) + '</h1>' : '';
    app.innerHTML = '<article class="page">' + eyebrow + intro + page.html + buildPageNav(state.route) +
      '<footer class="site-footer"><span>Axym · local-first autonomous engineering</span>' +
      '<a href="https://github.com/irshadpc/axym" target="_blank" rel="noopener">Source</a>' +
      '<a href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">Releases</a>' +
      '<a href="https://github.com/irshadpc/axym/blob/main/FEATURES.md" target="_blank" rel="noopener">Feature catalog</a>' +
      '<span>MIT licensed · no telemetry</span></footer></article>';

    buildToc(state.route);
    setActiveNav(state.route);
    closeDrawer();
    document.title = page.title + ' — Axym';

    if (typeof window.renderArtifacts === 'function') window.renderArtifacts();
    updateInstallOutputs();
    if (typeof window.updatePolicy === 'function') window.updatePolicy();

    var target = state.anchor || pendingScroll;
    pendingScroll = null;
    if (target) {
      window.requestAnimationFrame(function () {
        var el = document.getElementById(target);
        if (el) el.scrollIntoView({ block: 'start' });
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
  }

  function updateInstallOutputs() {
    if (!releases || !releases.tui || !releases.tui.install) return;
    var nodes = document.querySelectorAll('[data-install-output]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-install-output');
      var command = releases.tui.install[key];
      if (command) nodes[i].textContent = command;
    }
    var tabs = document.querySelectorAll('[data-os]');
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].classList.toggle('active', tabs[j].getAttribute('data-os') === 'macos_arm');
    }
  }

  function loadReleases() {
    return fetch('./data/releases.json')
      .then(function (r) { if (!r.ok) throw new Error('manifest HTTP ' + r.status); return r.json(); })
      .then(function (data) { releases = data; })
      .catch(function () { releases = FALLBACK_RELEASES; });
  }

  /* ----------------------------------------------------------- theme / drawer */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      themeBtn.setAttribute('title', theme === 'dark' ? 'Light theme' : 'Dark theme');
    }
    try { localStorage.setItem('axym-theme', theme); } catch (e) { /* blocked storage */ }
  }

  function closeDrawer() {
    if (sidebar) sidebar.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
    var toggle = document.getElementById('menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  /* ----------------------------------------------------------------- search -- */
  function buildSearchIndex() {
    var items = [];
    ORDER.forEach(function (route) {
      var page = PAGES[route];
      if (!page) return;
      items.push({ title: page.title, sub: 'Page · ' + (page.eyebrow || route), route: route, keys: page.keywords || '' });
      var holder = document.createElement('div');
      holder.innerHTML = page.html;
      var heads = holder.querySelectorAll('h2[id], h3[id]');
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
    if (!matches.length) {
      searchResults.innerHTML = '<div class="search-empty">No matches for “' + escapeHtml(query) + '”</div>';
      return;
    }
    var html = '';
    var lastGroup = '';
    matches.forEach(function (it, index) {
      var group = PAGES[it.route] ? PAGES[it.route].title : it.route;
      if (group !== lastGroup) { html += '<div class="search-group">' + escapeHtml(group) + '</div>'; lastGroup = group; }
      html += '<button class="search-result' + (index === 0 ? ' selected' : '') + '" data-index="' + index + '">' +
        escapeHtml(it.title) + '<small>' + escapeHtml(it.sub) + '</small></button>';
    });
    searchResults.innerHTML = html;
    window.AXYM_SEARCH_MATCHES = matches;
  }

  function openSearch() {
    searchOverlay.classList.add('open');
    searchInput.value = '';
    renderSearch('');
    window.setTimeout(function () { searchInput.focus(); }, 10);
  }

  function closeSearch() { searchOverlay.classList.remove('open'); }

  function chooseSearch(index) {
    var matches = window.AXYM_SEARCH_MATCHES || [];
    var it = matches[index];
    if (!it) return;
    closeSearch();
    navigate(it.route, it.anchor);
  }

  /* ---------------------------------------------------------- event wiring -- */
  function wireGlobalEvents() {
    window.addEventListener('hashchange', render);

    document.getElementById('search-trigger').addEventListener('click', openSearch);
    document.getElementById('search-close').addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', function (e) { if (e.target === searchOverlay) closeSearch(); });
    searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
    searchInput.addEventListener('keydown', function (e) {
      var matches = window.AXYM_SEARCH_MATCHES || [];
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!matches.length) return;
        searchSelected = (searchSelected + (e.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length;
        var nodes = searchResults.querySelectorAll('.search-result');
        for (var i = 0; i < nodes.length; i++) nodes[i].classList.toggle('selected', i === searchSelected);
        if (nodes[searchSelected]) nodes[searchSelected].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        chooseSearch(searchSelected);
      }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
      else if (e.key === 'Escape') { closeSearch(); closeDrawer(); }
    });

    themeBtn.addEventListener('click', function () {
      applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    document.getElementById('menu-toggle').addEventListener('click', function () {
      var open = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', open);
      scrim.classList.toggle('open', open);
      this.setAttribute('aria-expanded', String(open));
    });
    scrim.addEventListener('click', closeDrawer);
    document.addEventListener('click', function (e) {
      var nav = e.target.closest('.side-link');
      if (nav) closeDrawer();
      var anchor = e.target.closest('a[data-anchor]');
      if (anchor) {
        e.preventDefault();
        var id = anchor.getAttribute('data-anchor');
        var state = parseHash();
        if (window.location.hash.indexOf('/' + id) === -1) navigate(state.route, id);
        else { var el = document.getElementById(id); if (el) el.scrollIntoView({ block: 'start' }); }
      }
    });

    /* ---- slice 3: interactive components are wired in wireComponents() ---- */
    wireComponents();
  }

  /* ======================================================================
     INTERACTIVE COMPONENTS — tabs, copy, OS switcher, policy builder,
     accordions, live filters and the release artifact table.
     All handlers are delegated on `document`, so they survive route renders.
     ====================================================================== */
  function wireComponents() {
    document.addEventListener('click', function (e) {
      /* tab groups */
      var tab = e.target.closest('[data-tab]');
      if (tab && tab.closest('[data-tabs]')) {
        var groupEl = tab.closest('[data-tabs]');
        var group = groupEl.getAttribute('data-tabs');
        var name = tab.getAttribute('data-tab');
        var groupTabs = groupEl.querySelectorAll('[data-tab]');
        for (var i = 0; i < groupTabs.length; i++) {
          var on = groupTabs[i] === tab;
          groupTabs[i].classList.toggle('active', on);
          if (groupTabs[i].hasAttribute('role')) groupTabs[i].setAttribute('aria-selected', String(on));
        }
        var panels = document.querySelectorAll('[data-panels="' + group + '"] [data-panel]');
        for (var j = 0; j < panels.length; j++) {
          panels[j].classList.toggle('active', panels[j].getAttribute('data-panel') === name);
        }
        return;
      }

      /* copy buttons (element target or literal text) */
      var copyBtn = e.target.closest('[data-copy]');
      if (copyBtn) {
        var target = document.getElementById(copyBtn.getAttribute('data-copy'));
        if (target) copyText(target.textContent.replace(/\s+$/, ''), 'Copied');
        else {
          var literal = copyBtn.getAttribute('data-copy-text');
          if (literal !== null) copyText(literal, 'Copied');
        }
        return;
      }

      /* OS install switcher */
      var osBtn = e.target.closest('[data-os]');
      if (osBtn && releases && releases.tui && releases.tui.install) {
        var key = osBtn.getAttribute('data-os');
        var command = releases.tui.install[key];
        if (command) {
          var allOs = document.querySelectorAll('[data-os]');
          for (var k = 0; k < allOs.length; k++) allOs[k].classList.toggle('active', allOs[k] === osBtn);
          var outputs = document.querySelectorAll('[data-install-output]');
          for (var m = 0; m < outputs.length; m++) {
            outputs[m].textContent = command;
            outputs[m].setAttribute('data-install-output', key);
          }
        }
        return;
      }

      /* trust-zone chips */
      var chip = e.target.closest('[data-zone]');
      if (chip) { chip.classList.toggle('on'); updatePolicy(); return; }

      /* troubleshooting accordion */
      var acc = e.target.closest('.acc-trigger');
      if (acc) {
        var item = acc.closest('.acc-item');
        if (item) item.classList.toggle('open');
      }
    });

    /* policy controls + live config filter */
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
      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.toggle('filter-hidden', !!query && rows[i].textContent.toLowerCase().indexOf(query) === -1);
      }
    });

    window.updatePolicy = updatePolicy;
    window.renderArtifacts = renderArtifacts;
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
    var value = policyValue();
    pre.innerHTML = highlightJson(value);
  }

  function renderArtifacts() {
    var host = document.getElementById('artifacts-grid');
    if (!host) return;
    var artifacts = (releases && releases.artifacts) || [];
    if (!artifacts.length) {
      host.innerHTML = '<p class="muted">Artifact links are published with each GitHub release. Open ' +
        '<a href="https://github.com/irshadpc/axym-release/releases" target="_blank" rel="noopener">GitHub Releases</a> for the full asset list.</p>';
      return;
    }
    var html = '<div class="table-wrap"><table><thead><tr><th>Product</th><th>Platform</th><th>Version</th><th>Asset</th><th>SHA-256</th><th></th></tr></thead><tbody>';
    artifacts.forEach(function (a) {
      var active = a.status === 'active';
      var hash = active
        ? '<code title="' + escapeHtml(a.sha256) + '">' + escapeHtml(String(a.sha256).slice(0, 12)) + '…</code> ' +
          '<button class="copy-btn" data-copy-text="' + escapeHtml(a.sha256) + '">Copy</button>'
        : '<span class="badge badge-pending">Pending release build</span>';
      var download = active
        ? '<a class="btn btn-ghost" style="height:32px;padding:0 10px" href="' + escapeHtml(a.url) + '" target="_blank" rel="noopener">Download</a>'
        : '<span class="badge badge-pending">—</span>';
      html += '<tr><td>' + escapeHtml(a.product) + '</td><td>' + escapeHtml(a.label || a.platform) +
        '</td><td><code>' + escapeHtml(a.version) + '</code></td><td><code>' + escapeHtml(a.file) +
        '</code></td><td>' + hash + '</td><td>' + download + '</td></tr>';
    });
    host.innerHTML = html + '</tbody></table></div>';
  }

  /* --------------------------------------------------------------- startup -- */
  function init() {
    searchItems = buildSearchIndex();
    wireGlobalEvents();
    render();
    loadReleases().then(function () { applyReleaseData(); if (parseHash().route === 'releases') render(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
