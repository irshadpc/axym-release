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
    html: `<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <span class="hero-badge"><span class="dot"></span> TUI v0.23.0 · Desktop v12.17.0 · verified releases</span>
  <h1>Autonomous engineering,<br><span class="grad">on your machine.</span></h1>
  <p class="lead">Give Axym a goal in plain English and it plans, writes, reviews, secures and tests the code — with deterministic safeguards and an audit trail for every decision. No account, no API keys to get started, no build tools.</p>
  <div class="hero-cta">
    <a class="btn btn-primary" href="#quickstart">Start in five steps <span aria-hidden="true">→</span></a>
    <a class="btn btn-ghost" href="#releases">Download a build</a>
  </div>
  <div class="kpi-strip">
    <div class="kpi"><div class="kpi-value">0</div><div class="kpi-label">static API keys required</div></div>
    <div class="kpi"><div class="kpi-value">91%</div><div class="kpi-label">prompt cache hit (E1.2)</div></div>
    <div class="kpi"><div class="kpi-value">6</div><div class="kpi-label">governed pipeline stages</div></div>
    <div class="kpi"><div class="kpi-value">100%</div><div class="kpi-label">local · no telemetry egress</div></div>
  </div>
</section>

<h2 id="install">One line. No account, no keys.</h2>
<p>Pick your platform and copy the installer. Prefer a manual download or full checksums? Go to <a href="#releases">Releases</a>.</p>
<div class="os-bar" role="group" aria-label="Choose your operating system">
  <button class="os-tab active" data-os="macos_arm">macOS · Apple Silicon</button>
  <button class="os-tab" data-os="macos_intel">macOS · Intel</button>
  <button class="os-tab" data-os="linux">Linux · x64 / arm64</button>
  <button class="os-tab" data-os="source">Build from source</button>
</div>
<div class="install-line">
  <code id="install-command" data-install-output="macos_arm">curl -fsSL https://github.com/irshadpc/axym-release/releases/latest/download/install.sh | sh</code>
  <button class="copy-btn" data-copy="install-command" aria-label="Copy install command">Copy</button>
</div>
<p class="small muted">Desktop 12.17.0 is macOS-only this cycle; the newest cross-platform desktop builds are 12.16.0. See the <a href="#releases">support matrix</a>.</p>

<h2 id="live-preview">See the TUI work</h2>
<p>Four real command surfaces, switchable below. Columns stay aligned with <code>whitespace-pre</code> on desktop and mobile.</p>
<div class="code-shell">
  <div class="code-head">
    <span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="code-title">axym — session: claude:work-1</span>
  </div>
  <div class="term-tabs" data-tabs="terminal" role="tablist" aria-label="TUI preview tabs">
    <button class="term-tab active" data-tab="accounts" role="tab" aria-selected="true">/accounts</button>
    <button class="term-tab" data-tab="files" role="tab" aria-selected="false">/files</button>
    <button class="term-tab" data-tab="race" role="tab" aria-selected="false">/race</button>
    <button class="term-tab" data-tab="diff" role="tab" aria-selected="false">/diff</button>
  </div>
  <div data-panels="terminal">
    <div class="tab-panel active code-body" data-panel="accounts" role="tabpanel">
      <pre id="term-accounts"> axym · accounts                                  [1/4]
 -------------------------------------------------------------
 KEY             ZONE      MODEL          STATE     QUOTA
 claude:work-1   work      claude-sonnet  active    82%
 codex:personal  personal  gpt-5          warm      61%
 agy:client-a    client    gemini-flash   drained   0%
 -------------------------------------------------------------
 policy  sticky_drain_first · strictTier2Approval = off
 [k] keys   [r] rotate   [u] usage   [a] audit    ? help</pre>
      <button class="copy-btn" data-copy="term-accounts" style="margin-top:10px">Copy output</button>
    </div>
    <div class="tab-panel code-body" data-panel="files" role="tabpanel">
      <pre id="term-files"> axym · /files                                     [2/4]
 -------------------------------------------------------------
 STAGE     PATH                               ACTION   GATE
 Plan      docs/adr/0023-cache.md             create   auto
 Code      tui/src/cache/prefix.ts            edit     review
 Code      tui/src/agent/turn.ts              edit     review
 Security  desktop/src-tauri/src/egress.rs    edit     Tier 3
 QA        tui/tests/cache.test.ts            create   auto
 -------------------------------------------------------------
 6 read · 2 write · 0 denied   ·   no diff leaves this gate</pre>
      <button class="copy-btn" data-copy="term-files" style="margin-top:10px">Copy output</button>
    </div>
    <div class="tab-panel code-body" data-panel="race" role="tabpanel">
      <pre id="term-race"> axym · /race                                      [3/4]
 -------------------------------------------------------------
 STRATEGY          MODEL          SCORE   LATENCY   COST
 prefix-shared     claude-sonnet  0.94    2.1s      $0.008
 fresh-context     gpt-5          0.91    3.4s      $0.021
 cheapest-first    gemini-flash   0.87    1.2s      $0.003
 -------------------------------------------------------------
 winner: prefix-shared  ·  cache hit 91% (40,268/40,270)</pre>
      <button class="copy-btn" data-copy="term-race" style="margin-top:10px">Copy output</button>
    </div>
    <div class="tab-panel code-body" data-panel="diff" role="tabpanel">
      <pre id="term-diff"> axym · /diff                                      [4/4]
 -------------------------------------------------------------
 --- a/tui/src/cache/prefix.ts
 +++ b/tui/src/cache/prefix.ts
 @@ -18,7 +18,7 @@ export function sharedPrefix(...)
 -  return buildPrompt(ctx);
 +  return buildPrompt(ctx, { stableOrder: true });

 1 file · +1 -1 · fresh-context lens reviewed · evidence attached</pre>
      <button class="copy-btn" data-copy="term-diff" style="margin-top:10px">Copy output</button>
    </div>
  </div>
  <div class="status-rail"><span>Acct: <b>claude:work-1 (work)</b></span><span>Files: <b>6R 2W</b></span><span>Alerts: <b>0</b></span><span>Cache: <b>91%</b></span></div>
</div>

<h2 id="what-you-get">What you get</h2>
<p>Six surfaces, one runtime — the same providers, project configuration and safety model everywhere.</p>
<div class="bento">
  <div class="bento-card"><div class="bento-icon">⌘</div><h3>TUI terminal agent</h3><p>One standalone executable: session UI, permission gate and headless mode on the agent CLI you already use.</p></div>
  <div class="bento-card"><div class="bento-icon">▦</div><h3>Desktop full app</h3><p>Mission control, approval gates and a tamper-evident run history for the complete engineering pipeline.</p></div>
  <div class="bento-card"><div class="bento-icon">✦</div><h3>Keyless by default</h3><p>Axym detects installed CLIs — <code>claude</code>, <code>codex</code>, <code>agy</code>, <code>gemini</code> and more. No static keys (ADR-0022).</p></div>
  <div class="bento-card"><div class="bento-icon">◇</div><h3>Governed pipeline</h3><p>Plan → Design → Code → Security → Review → QA, with non-bypassable policy between the model and your working tree.</p></div>
  <div class="bento-card"><div class="bento-icon">▤</div><h3>Local evidence</h3><p>SQLite event store, crash-journaled side effects and outcome scores. Nothing leaves your machine.</p></div>
  <div class="bento-card"><div class="bento-icon">⇄</div><h3>Multi-provider fleet</h3><p>Run several models deliberately, race strategies, fail over without losing the run, and drive it all from scripts.</p></div>
</div>
<div class="callout callout-info"><strong>Security boundary.</strong> Axym drives provider CLIs you install yourself; it never asks for a static API key (<strong>ADR-0022</strong>). Native-provider access stays behind the permission gate, and ad-hoc signed builds may show a dismissible “unknown publisher” warning on first launch.</div>

<h2 id="architecture">How it fits together</h2>
<div class="diagram-card">
  <svg viewBox="0 0 760 232" role="img" aria-label="Axym architecture: goal, orchestrator and provider CLIs feed six governed stages and a local event store">
    <defs>
      <linearGradient id="axymGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5b45e8"/><stop offset="1" stop-color="#2ea8ff"/></linearGradient>
      <marker id="axymArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-faint)"/></marker>
    </defs>
    <rect x="6" y="6" width="748" height="220" rx="14" style="fill:var(--bg-soft);stroke:var(--line)"/>
    <g style="fill:var(--bg-elev);stroke:var(--line-strong)">
      <rect x="24" y="26" width="170" height="42" rx="9"/>
      <rect x="295" y="26" width="170" height="42" rx="9"/>
      <rect x="566" y="26" width="170" height="42" rx="9"/>
    </g>
    <g style="fill:var(--text);font-family:var(--sans);font-size:12px;text-anchor:middle">
      <text x="109" y="52">Goal · plain English</text>
      <text x="380" y="52">Orchestrator</text>
      <text x="651" y="52">Provider CLIs · keyless</text>
    </g>
    <g stroke="var(--text-faint)" stroke-width="1.5" marker-end="url(#axymArrow)">
      <line x1="196" y1="47" x2="289" y2="47"/><line x1="467" y1="47" x2="560" y2="47"/>
    </g>
    <g style="fill:var(--bg-elev);stroke:var(--line-strong)">
      <rect x="24" y="108" width="106" height="44" rx="8"/><rect x="145" y="108" width="106" height="44" rx="8"/>
      <rect x="266" y="108" width="106" height="44" rx="8"/><rect x="387" y="108" width="106" height="44" rx="8"/>
      <rect x="508" y="108" width="106" height="44" rx="8"/><rect x="629" y="108" width="106" height="44" rx="8"/>
    </g>
    <g style="fill:var(--text);font-family:var(--mono);font-size:11px;text-anchor:middle">
      <text x="77" y="134">Plan</text><text x="198" y="134">Design</text><text x="319" y="134">Code</text>
      <text x="440" y="134">Security</text><text x="561" y="134">Review</text><text x="682" y="134">QA</text>
    </g>
    <g stroke="var(--text-faint)" stroke-width="1.3" marker-end="url(#axymArrow)">
      <line x1="132" y1="130" x2="141" y2="130"/><line x1="253" y1="130" x2="262" y2="130"/>
      <line x1="374" y1="130" x2="383" y2="130"/><line x1="495" y1="130" x2="504" y2="130"/>
      <line x1="616" y1="130" x2="625" y2="130"/>
      <line x1="380" y1="70" x2="380" y2="104"/>
    </g>
    <rect x="180" y="183" width="400" height="30" rx="8" fill="url(#axymGrad)" opacity=".14" style="stroke:var(--accent)"/>
    <text x="380" y="202" style="fill:var(--text);font-family:var(--mono);font-size:11px;text-anchor:middle">Local SQLite event store · approval gates · crash-journaled side effects</text>
    <line x1="380" y1="154" x2="380" y2="179" stroke="var(--text-faint)" stroke-width="1.3" marker-end="url(#axymArrow)"/>
  </svg>
  <div class="diagram-cap">One governed pipeline, three interfaces — Desktop, TUI and the mobile bridge.</div>
</div>

<h2 id="where-to-start">Where to start</h2>
<div class="table-wrap"><table>
  <thead><tr><th>If you want to…</th><th>Start here</th><th>Then read</th></tr></thead>
  <tbody>
    <tr><td>Install and run your first session</td><td><a href="#quickstart">Quick Start</a></td><td><a href="#setup">Setup Guide</a></td></tr>
    <tr><td>Pool accounts or set trust zones</td><td><a href="#setup">Setup Guide</a></td><td><a href="#configuration">Configuration</a></td></tr>
    <tr><td>Understand races, cache and handoff</td><td><a href="#features">Features</a></td><td><a href="#operations">Operations</a></td></tr>
    <tr><td>Verify a download before installing</td><td><a href="#releases">Releases</a></td><td><a href="#operations">Operations</a></td></tr>
  </tbody>
</table></div>`
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
    html: `<h1>Setup Guide</h1>
<p class="lead">Axym discovers the agent CLIs already on your <code>PATH</code>. Setup is about choosing accounts, defining trust boundaries and deciding how much the agent may do — not about pasting API keys.</p>
<div class="callout callout-ok"><strong>ADR-0022 · zero static API keys.</strong> Provider authentication stays with the native CLI you installed. Axym shells out to it through the permission gate; it does not store or forward a static key. Register private CLIs in <code>~/.axym/providers.json</code> if they are not auto-detected.</div>

<h2 id="setup-topics">Four setup topics</h2>
<div class="tabs" data-tabs="setup" role="tablist" aria-label="Setup topics">
  <button class="tab active" data-tab="pooling" role="tab" aria-selected="true">Multi-Account Pooling</button>
  <button class="tab" data-tab="trust" role="tab" aria-selected="false">Trust Zones</button>
  <button class="tab" data-tab="security" role="tab" aria-selected="false">Security &amp; /files</button>
  <button class="tab" data-tab="mobile" role="tab" aria-selected="false">Mobile Remote · T-050</button>
</div>
<div data-panels="setup">
  <div class="tab-panel active" data-panel="pooling" role="tabpanel">
    <h3>One account is a starting point, not a ceiling</h3>
    <p>Axym keys accounts as <code>provider:label</code> — for example <code>claude:work-1</code>, <code>codex:personal</code> or <code>agy:client-a</code>. Each carries its own zone, model preference and quota state. When one drains, the rotation policy picks the next eligible account.</p>
    <div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">terminal — account pooling</span></div><div class="code-body"><pre id="setup-accounts">axym --doctor                       # detect provider CLIs + accounts
axym --provider claude --mode plan   # pick a provider, read-only planning
/accounts                            # list keys, zones, quota
/race                                # compare providers before committing</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="setup-accounts">Copy</button></div></div>
    <p><code>rotationPolicy</code> accepts <code>sticky_drain_first</code> (default — keep the current account until its quota is exhausted) or <code>round_robin</code>. <code>pinnedAccount</code> locks a session to one key; leave it unset for automatic selection.</p>
  </div>

  <div class="tab-panel" data-panel="trust" role="tabpanel">
    <h3>Trust zones decide where work may land</h3>
    <p>A workspace declares its allowed zones in <code>.axym/workspace.json</code>. An account in a zone outside that list is not eligible unless <code>allowCrossZoneSpillover</code> is on. Tier 2 actions can optionally require an explicit approval.</p>
    <div class="policy-grid">
      <div class="panel">
        <h3>Policy builder</h3>
        <div class="toggle-row"><span class="t-label">Allowed trust zones<small>Which account zones this workspace may use</small></span></div>
        <div class="zone-chips" role="group" aria-label="Allowed trust zones">
          <span class="zone-chip on" data-zone="personal">personal</span>
          <span class="zone-chip" data-zone="work">work</span>
          <span class="zone-chip" data-zone="client">client</span>
        </div>
        <div class="toggle-row"><span class="t-label">Pinned account<small>Empty = automatic selection</small></span><select class="select" id="pol-pinned" aria-label="Pinned account"><option value="">— none —</option><option value="claude:work-1">claude:work-1</option><option value="codex:personal">codex:personal</option><option value="agy:client-a">agy:client-a</option></select></div>
        <div class="toggle-row"><span class="t-label">Rotation policy<small>How the next account is chosen</small></span><select class="select" id="pol-rotation" aria-label="Rotation policy"><option value="sticky_drain_first">sticky_drain_first</option><option value="round_robin">round_robin</option></select></div>
        <div class="toggle-row"><span class="t-label">Cross-zone spillover<small>Allow a zone outside the allow-list</small></span><label class="switch"><input type="checkbox" id="pol-spillover" aria-label="Allow cross-zone spillover"><span></span></label></div>
        <div class="toggle-row"><span class="t-label">Strict Tier 2 approval<small>Require explicit approval for Tier 2 actions</small></span><label class="switch"><input type="checkbox" id="pol-strict2" aria-label="Strict Tier 2 approval"><span></span></label></div>
      </div>
      <div class="panel">
        <h3>.axym/workspace.json</h3>
        <p class="small muted">Updates live as you change the policy. Copy it into your project root.</p>
        <pre class="json-preview" id="policy-json"></pre>
        <button class="copy-btn" data-copy="policy-json" style="margin-top:12px;background:var(--accent);border-color:var(--accent);color:#fff">Copy JSON</button>
      </div>
    </div>
  </div>

  <div class="tab-panel" data-panel="security" role="tabpanel">
    <h3>Every diff passes through a gate</h3>
    <p><code>/files</code> is the read-only ledger of what the agent touched: stage, path, action and gate. Writes are gated by review; a Tier 3 freeze blocks egress entirely when the environment demands it. Nothing leaves the gate without evidence attached.</p>
    <div class="table-wrap"><table><thead><tr><th>Control</th><th>What it guarantees</th></tr></thead><tbody>
      <tr><td><code>/files</code></td><td>Complete, readable ledger of creates and edits with their gate status.</td></tr>
      <tr><td>Approval gates</td><td>You inspect file diffs and tool-execution requests before they touch the working tree.</td></tr>
      <tr><td>Tier 3 Freeze Card</td><td>Egress is blocked and the turn is interrupted; the reason is recorded on every terminal path.</td></tr>
      <tr><td>Native-provider boundary</td><td>Provider CLIs keep their own credentials; Axym holds no static key.</td></tr>
    </tbody></table></div>
    <p class="small muted">Builds are ad-hoc signed, not notarized. On macOS, clear quarantine once with <code>xattr -d com.apple.quarantine &lt;binary&gt;</code> if Gatekeeper blocks the first launch.</p>
  </div>

  <div class="tab-panel" data-panel="mobile" role="tabpanel">
    <h3>Drive the TUI from your phone</h3>
    <p>The remote bridge (T-050) serves the running TUI over TLS with a PIN gate and a QR handoff. Start it from the machine that owns the project:</p>
    <div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">terminal — remote bridge</span></div><div class="code-body"><pre id="setup-remote">axym web --host 0.0.0.0 --pin 4821   # scan the QR code from your phone
/health                              # runtime health + connection state</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="setup-remote">Copy</button></div></div>
    <p>The bridge is local-first: the session stays on your workstation, and the phone is a view plus an approval surface. Mobile connectivity and TLS preview are tracked under <strong>T-050</strong>.</p>
  </div>
</div>

<h2 id="first-project">Configure a project</h2>
<p>Drop <code>.axym.yaml</code> at the project root to describe the stack, style guide, forbidden libraries and secret names. The same file is read by Desktop and TUI.</p>`
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
