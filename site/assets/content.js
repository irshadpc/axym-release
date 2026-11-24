/**
 * AXYM PORTAL — grounded page content (Contract B routes).
 * Each page renders into <main id="app">. Headings carry ids so app.js can
 * build the right-hand "On this page" TOC and the ⌘K index.
 */
window.AXYM_PAGES = {
  home: {
    title: 'Home',
    eyebrow: 'Local-first by design',
    keywords: 'overview install terminal tui desktop pipeline architecture trust zones',
    html: `<section class="hero"><h1>Autonomous engineering,<br><span class="grad">on your machine.</span></h1><p class="lead">Axym is a local-first engineering system: give it a goal in plain English and it plans, writes, reviews, secures and tests the code — with deterministic safeguards and an audit trail for every decision.</p></section><h2 id="what-you-get">What you get</h2><p>Six surfaces, one runtime.</p>`
  },
  quickstart: {
    title: 'Quick Start',
    eyebrow: 'First session in five steps',
    keywords: 'claude codex antigravity agy gemini opencode provider first session install',
    html: `<h1>Quick Start</h1><p class="lead">From download to your first governed session.</p><h2 id="five-steps">The five steps</h2><div class="step-line"><div class="step"><div class="step-num">1</div><div class="step-title">Install a build</div></div></div>`
  },
  setup: {
    title: 'Setup Guide',
    eyebrow: 'Providers, accounts, trust zones',
    keywords: 'multi account pooling trust zone security files mobile remote t-050 policy workspace.json',
    html: `<h1>Setup Guide</h1><p class="lead">Configure providers, accounts and trust boundaries.</p><h2 id="multi-account-pooling">Multi-Account Pooling</h2><p>Details coming in this build.</p>`
  },
  configuration: {
    title: 'Configuration',
    eyebrow: 'Settings and standing invariants',
    keywords: 'settings axym.yaml adr-0021 adr-0022 adr-0007 legacy_frozen invariants',
    html: `<h1>Configuration</h1><p class="lead">Project settings and the invariants that cannot be bypassed.</p><h2 id="settings-reference">Settings reference</h2><p>Details coming in this build.</p>`
  },
  features: {
    title: 'Features',
    eyebrow: 'What the runtime can do',
    keywords: 'race solve cache e1.2 e3 handoff queue keyboard shortcuts freeze card',
    html: `<h1>Features</h1><p class="lead">A tour of the capabilities behind both products.</p><h2 id="race-and-solve">/race and axym solve</h2><p>Details coming in this build.</p>`
  },
  releases: {
    title: 'Releases',
    eyebrow: 'Verified downloads',
    keywords: 'download install sha256 verify version support matrix desktop tui artifacts',
    html: `<h1>Releases</h1><p class="lead">Download and verify a published build.</p><h2 id="downloads">Downloads</h2><div id="artifacts-grid"></div>`
  },
  operations: {
    title: 'Operations',
    eyebrow: 'Local-first CI and troubleshooting',
    keywords: 'local-ci typecheck vitest check-fast edp-certify troubleshooting commands',
    html: `<h1>Operations</h1><p class="lead">Every gate runs on your workstation.</p><h2 id="ci-command-deck">CI command deck</h2><p>Details coming in this build.</p>`
  }
};

window.AXYM_NAV_ORDER = ['home', 'quickstart', 'setup', 'configuration', 'features', 'releases', 'operations'];
