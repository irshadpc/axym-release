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
    html: `<h1>Quick Start</h1>
<p class="lead">From download to your first governed session in five steps. Both products need at least one agent CLI on your <code>PATH</code> — and no API key.</p>
<div class="step-line">
  <div class="step"><div class="step-num">1</div><div class="step-title">Install a build</div><div class="step-body">One-line installer, or a manual archive from <a href="#releases">Releases</a>. The TUI is a single standalone executable.</div></div>
  <div class="step"><div class="step-num">2</div><div class="step-title">Verify the download</div><div class="step-body">Put <code>SHA256SUMS.txt</code> beside the archive and run <code>shasum -a 256 -c --ignore-missing SHA256SUMS.txt</code>.</div></div>
  <div class="step"><div class="step-num">3</div><div class="step-title">Confirm a provider</div><div class="step-body">Run <code>axym --doctor</code>. Axym reports which CLIs it detected and any setup gaps — <code>claude</code>, <code>opencode</code>, <code>codex</code>, <code>gemini</code>, <code>cursor-agent</code>, <code>copilot</code> or <code>agy</code>.</div></div>
  <div class="step"><div class="step-num">4</div><div class="step-title">Start a session</div><div class="step-body">Run <code>axym</code> in your project. Type <code>/</code> for the command palette with tab completion; <code>/health</code> shows runtime state.</div></div>
  <div class="step"><div class="step-num">5</div><div class="step-title">Go headless or remote</div><div class="step-body"><code>axym -p "summarize uncommitted changes"</code> for scripts and CI, or <code>axym web --host 0.0.0.0 --pin 4821</code> to scan a QR and drive it from your phone.</div></div>
</div>

<h2 id="provider-snippets">Provider snippets</h2>
<p>These are keyless: authentication belongs to the CLI you already installed. Pick the snippet for the provider on your machine and copy it.</p>
<div class="tabs" data-tabs="providers" role="tablist" aria-label="Provider snippets">
  <button class="tab active" data-tab="claude" role="tab" aria-selected="true">Claude Code</button>
  <button class="tab" data-tab="codex" role="tab" aria-selected="false">Codex</button>
  <button class="tab" data-tab="agy" role="tab" aria-selected="false">Antigravity (agy)</button>
  <button class="tab" data-tab="gemini" role="tab" aria-selected="false">Gemini / OpenCode</button>
</div>
<div data-panels="providers">
  <div class="tab-panel active" data-panel="claude" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">Claude Code</span></div><div class="code-body"><pre id="prov-claude"># Auto-detected from PATH — no key to configure
axym --doctor
axym --provider claude --mode plan
axym -p "summarize uncommitted changes"

# Inside the session
/review        # automated code review
/pipeline      # watch the run stage by stage</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="prov-claude">Copy</button></div></div>
  </div>
  <div class="tab-panel" data-panel="codex" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">Codex</span></div><div class="code-body"><pre id="prov-codex"># Auto-detected from PATH
axym --provider codex --mode plan
/race          # compare Codex with other detected providers
/health        # runtime health and provider state

# Headless
axym -p "add rate limiting and tests" --provider codex</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="prov-codex">Copy</button></div></div>
  </div>
  <div class="tab-panel" data-panel="agy" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">Antigravity (agy)</span></div><div class="code-body"><pre id="prov-agy"># Auto-detected from PATH
axym --provider agy --mode plan
/accounts      # e.g. agy:client-a in the client zone
/race          # race strategies before committing

# Verify private CLIs in ~/.axym/providers.json if not detected</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="prov-agy">Copy</button></div></div>
  </div>
  <div class="tab-panel" data-panel="gemini" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">Gemini / OpenCode</span></div><div class="code-body"><pre id="prov-gemini"># Either CLI works as a drop-in provider
axym --provider gemini --mode plan
axym --provider opencode -p "summarize uncommitted changes"

# Switch models mid-session; Axym keeps the shared prefix for cache hits
/settings</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="prov-gemini">Copy</button></div></div>
  </div>
</div>
<div class="callout"><strong>First launch on desktop.</strong> Provider discovery walks you through detected CLIs — no keys needed. Then type a goal, watch the pipeline DAG, and approve or reject at each gate after inspecting the diffs.</div>`
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
    html: `<h1>Configuration</h1>
<p class="lead">Project-level settings plus the standing invariants that no prompt, plugin or mode can override. Type below to filter the reference.</p>
<input class="filter-input" id="config-filter" data-filter-table="config-table" type="search" placeholder="Filter settings — try “zone”, “cache”, “provider”…" aria-label="Filter settings">
<div class="table-wrap"><table id="config-table">
  <thead><tr><th>Setting</th><th>Where</th><th>Values</th><th>What it controls</th></tr></thead>
  <tbody>
    <tr><td><code>provider</code></td><td>CLI flag / session</td><td><code>claude</code>, <code>codex</code>, <code>agy</code>, <code>gemini</code>, <code>opencode</code>, …</td><td>Which installed agent CLI drives the current turn.</td></tr>
    <tr><td><code>mode</code></td><td>CLI flag / session</td><td><code>plan</code>, interactive, headless</td><td>Read-only planning versus editable execution.</td></tr>
    <tr><td><code>allowedTrustZones</code></td><td><code>.axym/workspace.json</code></td><td><code>personal</code>, <code>work</code>, <code>client</code></td><td>Which account zones may serve this workspace.</td></tr>
    <tr><td><code>pinnedAccount</code></td><td><code>.axym/workspace.json</code></td><td>account key or <code>null</code></td><td>Locks a session to one key; empty means automatic selection.</td></tr>
    <tr><td><code>rotationPolicy</code></td><td><code>.axym/workspace.json</code></td><td><code>sticky_drain_first</code>, <code>round_robin</code></td><td>How the next eligible account is chosen.</td></tr>
    <tr><td><code>allowCrossZoneSpillover</code></td><td><code>.axym/workspace.json</code></td><td><code>true</code> / <code>false</code></td><td>Whether an out-of-zone account may take work.</td></tr>
    <tr><td><code>strictTier2Approval</code></td><td><code>.axym/workspace.json</code></td><td><code>true</code> / <code>false</code></td><td>Requires explicit approval for Tier 2 actions.</td></tr>
    <tr><td><code>stack / style / forbidden</code></td><td><code>.axym.yaml</code></td><td>free-form YAML</td><td>Tech stack, style guide, forbidden libs and secret names shared by Desktop and TUI.</td></tr>
    <tr><td><code>providers</code></td><td><code>~/.axym/providers.json</code></td><td>provider descriptors</td><td>Registers private or non-auto-detected agent CLIs.</td></tr>
    <tr><td><code>cache layout</code></td><td>runtime</td><td>shared-prefix strategy</td><td>Stable prompt ordering that yields the E1.2 cache hit rate.</td></tr>
  </tbody>
</table></div>
<p class="small muted">Want to try these interactively? The <a href="#setup">Setup Guide</a> has a live <code>.axym/workspace.json</code> policy builder.</p>

<h2 id="project-config">Project config example</h2>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">.axym.yaml — project root</span></div><div class="code-body"><pre id="config-yaml">stack:
  runtime: node
  test: vitest
style: "2-space indent, semicolons, explicit return types"
forbidden_libs:
  - "lodash"
secrets:
  - "AXYM_*"
policy:
  max_review_depth: deep
  require_evidence: true</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="config-yaml">Copy</button></div></div>

<h2 id="standing-invariants">Standing invariants</h2>
<p>These are not preferences. They are enforced by the runtime and by repository gates.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Invariant</th><th>Rule</th><th>Enforced by</th></tr></thead>
  <tbody>
    <tr><td><strong>ADR-0021</strong></td><td>Priority task steering stays inside its boundaries; it does not silently import workflow-scope authorization.</td><td>Priority queue + steering tests</td></tr>
    <tr><td><strong>ADR-0022</strong></td><td>Zero static API keys. Provider credentials stay with the native CLI behind the permission gate.</td><td>Provider layer + docs gate</td></tr>
    <tr><td><strong>ADR-0007</strong></td><td>Typed command contract: idempotency keys, expected sequence numbers and explicit event shapes.</td><td>Command/event contract tests</td></tr>
    <tr><td><strong>LEGACY_FROZEN.md</strong></td><td>The Python tree is frozen: bug-fixes only, no new modules or dependencies.</td><td>Pre-commit guard</td></tr>
  </tbody>
</table></div>
<div class="callout callout-warn"><strong>Do not widen a gate.</strong> Baselines are ratchets — clippy warnings, <code>unwrap_used</code> budget and compiler warnings only go down. A change that legitimately adds warnings must say why in its commit; never raise a baseline just to make a gate pass.</div>`
  },
  features: {
    title: 'Features',
    eyebrow: 'What the runtime can do',
    keywords: 'race solve cache e1.2 e3 handoff queue keyboard shortcuts freeze card',
    html: `<h1>Features</h1>
<p class="lead">The runtime behind both products: deliberate multi-model use, evidence-backed verification and a local-first handoff. For the exhaustive catalog, see the <a href="https://github.com/irshadpc/axym/blob/main/FEATURES.md" target="_blank" rel="noopener">complete feature catalog</a>.</p>

<h2 id="race-and-solve">/race and axym solve</h2>
<p><code>/race</code> runs several strategies against the same goal and scores them before anything is committed — model choice, latency and cost are visible side by side. <code>axym solve</code> is the one-shot form for scripts: give it a goal, get a structured result and an attached evidence trail.</p>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">terminal — race</span></div><div class="code-body"><pre id="feat-race"> STRATEGY          MODEL          SCORE   LATENCY   COST
 prefix-shared     claude-sonnet  0.94    2.1s      $0.008
 fresh-context     gpt-5          0.91    3.4s      $0.021
 cheapest-first    gemini-flash   0.87    1.2s      $0.003

 winner: prefix-shared  ·  cache hit 91% (40,268/40,270)</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="feat-race">Copy</button></div></div>

<h2 id="prompt-cache">E1.2 · 91% prompt cache</h2>
<p>Providers are stateless CLI calls, so the shared project context is laid out as a stable prefix. A repeated ~40k-token prompt that cost <strong>$0.161 cold</strong> costs <strong>$0.008 warm</strong> — <strong>91% cache hit</strong> (40,268 of 40,270 tokens cached). A repeated prompt is not stripped just because a different provider runs next; doing so would break the prefix the cache exploits.</p>
<div class="kpi-strip"><div class="kpi"><div class="kpi-value">$0.161 → $0.008</div><div class="kpi-label">cold versus warm repeated prompt</div></div><div class="kpi"><div class="kpi-value">91%</div><div class="kpi-label">cache hit rate (E1.2)</div></div><div class="kpi"><div class="kpi-value">40,268</div><div class="kpi-label">cached tokens of 40,270</div></div><div class="kpi"><div class="kpi-value">0</div><div class="kpi-label">API keys managed by Axym</div></div></div>

<h2 id="warm-handoff">E3 · ≤ 2 KB warm handoff</h2>
<p>When one provider stops, the next receives a compact delta: why the previous provider stopped and what it produced. The handoff stays at or below <strong>2 KB</strong>, so a multi-provider run neither loses the thread nor pays to re-send the entire transcript.</p>

<h2 id="queue">axym queue</h2>
<p><code>axym queue</code> submits governed work without blocking your terminal. Priority steering is bounded by ADR-0021, each queued item keeps its own idempotency and expected sequence (ADR-0007), and approvals remain human gates — the queue never auto-approves.</p>

<h2 id="keyboard">Keyboard shortcuts</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Key</th><th>Action</th><th>Note</th></tr></thead>
  <tbody>
    <tr><td><span class="kbd">k</span></td><td>Keys / accounts</td><td rowspan="4">Tier 3 Freeze Card controls — when egress is blocked, the turn is interrupted and the reason is recorded on every terminal path.</td></tr>
    <tr><td><span class="kbd">r</span></td><td>Rotate account</td></tr>
    <tr><td><span class="kbd">u</span></td><td>Usage / quota</td></tr>
    <tr><td><span class="kbd">a</span></td><td>Audit</td></tr>
    <tr><td><span class="kbd">/</span></td><td>Command palette</td><td>Tab-complete every command.</td></tr>
    <tr><td><span class="kbd">ctrl</span> + <span class="kbd">g</span></td><td>External editor</td><td>Opens the composer in <code>$EDITOR</code>.</td></tr>
    <tr><td><span class="kbd">alt</span> + <span class="kbd">i</span></td><td>Inline image viewer</td><td>Aspect-correct cell fitting; full restore on close (TUI 0.23.0).</td></tr>
  </tbody>
</table></div>`
  },
  releases: {
    title: 'Releases',
    eyebrow: 'Verified downloads',
    keywords: 'download install sha256 verify version support matrix desktop tui artifacts',
    html: `<h1>Releases</h1>
<p class="lead">Versions and checksums below are synced from real GitHub releases by <code>scripts/sync-releases.mjs</code>. If a platform has no published asset, you will see an explicit “Pending release build” badge — never a dead URL or an invented hash.</p>

<h2 id="downloads">Downloads</h2>
<p>Choose your OS for the one-line TUI installer. Manual archives, full SHA-256 values and direct download links are in the published-artifacts table further down.</p>
<div class="os-bar" role="group" aria-label="Choose your operating system">
  <button class="os-tab active" data-os="macos_arm">macOS · Apple Silicon</button>
  <button class="os-tab" data-os="macos_intel">macOS · Intel</button>
  <button class="os-tab" data-os="linux">Linux · x64 / arm64</button>
  <button class="os-tab" data-os="source">Build from source</button>
</div>
<div class="install-line">
  <code id="releases-install" data-install-output="macos_arm">curl -fsSL https://github.com/irshadpc/axym-release/releases/latest/download/install.sh | sh</code>
  <button class="copy-btn" data-copy="releases-install">Copy</button>
</div>

<h2 id="support-matrix">Version &amp; support matrix</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Product</th><th>Latest</th><th>Platforms</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Axym TUI</td><td><code>v0.23.0</code></td><td>macOS (arm64 + x64), Linux x86_64, Windows x86_64</td><td><span class="badge badge-active">active · 2026-11-05</span></td></tr>
    <tr><td>Axym Desktop</td><td><code>v12.17.0</code></td><td>macOS universal (.dmg)</td><td><span class="badge badge-active">active · 2026-11-04</span></td></tr>
    <tr><td>Axym Desktop · cross-OS</td><td><code>v12.16.0</code></td><td>Linux x86_64, Windows x86_64</td><td><span class="badge badge-keyless">latest cross-platform build</span></td></tr>
    <tr><td>Supported range</td><td><code>12.13.x – 12.17.x</code></td><td>—</td><td><span class="badge badge-active">supported</span></td></tr>
    <tr><td>End of life</td><td><code>12.12.x and earlier</code></td><td>—</td><td><span class="badge badge-pending">EOL</span></td></tr>
  </tbody>
</table></div>
<p class="small muted">Desktop 12.17.0 ships macOS-only this cycle; Linux and Windows desktop artifacts remain at 12.16.0 until the next cross-platform build.</p>

<h2 id="verify-download">Verify a download</h2>
<p>Every release carries <code>SHA256SUMS.txt</code>; TUI releases also include a machine-readable <code>release-manifest.json</code> with version, source commit and per-file hashes. Put the checksum file beside your download and run:</p>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">terminal — verify</span></div><div class="code-body"><pre id="verify-cmd">shasum -a 256 -c --ignore-missing SHA256SUMS.txt

# Or check a single file directly
shasum -a 256 axym-0.23.0-macos.tar.gz</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="verify-cmd">Copy</button></div></div>

<h2 id="published-artifacts">Published artifacts</h2>
<p>Hashes and links below come straight from the release manifests. Copy a full SHA-256 value with the button in each row.</p>
<div id="artifacts-grid"></div>`
  },
  operations: {
    title: 'Operations',
    eyebrow: 'Local-first CI and troubleshooting',
    keywords: 'local-ci typecheck vitest check-fast edp-certify troubleshooting commands',
    html: `<h1>Operations</h1>
<p class="lead">No hosted CI dependency: every gate runs locally on the developer workstation. A pre-push hook runs the fast lane before code leaves the machine.</p>

<h2 id="ci-command-deck">CI command deck</h2>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">TUI — primary build target</span></div><div class="code-body"><pre id="ops-tui">cd tui
npx tsc --noEmit
npx vitest run</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="ops-tui">Copy</button></div></div>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">Desktop Rust — fast gate</span></div><div class="code-body"><pre id="ops-rust">cd desktop
./scripts/check-fast.sh</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="ops-rust">Copy</button></div></div>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">Unified fast lane (~2–3 min)</span></div><div class="code-body"><pre id="ops-ci">bash scripts/local-ci.sh --fast
# full gate before "done" / push:
bash scripts/local-ci.sh --full</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="ops-ci">Copy</button></div></div>
<div class="code-shell"><div class="code-head"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-title">EDP certification</span></div><div class="code-body"><pre id="ops-edp">python3 scripts/edp-certify.py</pre></div><div class="code-head" style="border-top:1px solid #2a3038;border-bottom:0"><button class="copy-btn" data-copy="ops-edp">Copy</button></div></div>

<div class="callout callout-warn"><strong>Ratchets only go down.</strong> <code>.github/clippy-baseline.txt</code>, <code>desktop/src-tauri/.unwrap-budget</code> and <code>.warning-budget</code> are ceilings, not targets. If a change legitimately adds warnings, say why in the commit — never raise a baseline just to make a gate pass. In an emergency only, <code>AXYM_SKIP_PRE_PUSH_CI=1</code> bypasses the pre-push gate.</div>

<h2 id="troubleshooting">Troubleshooting</h2>
<div class="accordion">
  <div class="acc-item"><button class="acc-trigger">macOS says the app “is damaged” or “unknown publisher”</button><div class="acc-panel">Builds are ad-hoc signed, not notarized. Clear quarantine once with <code>sudo xattr -dr com.apple.quarantine /Applications/Axym.app</code>, then on Sequoia/Tahoe open <strong>System Settings → Privacy &amp; Security → Open Anyway</strong>. For the TUI binary, use <code>xattr -d com.apple.quarantine axym-macos-arm64</code>.</div></div>
  <div class="acc-item"><button class="acc-trigger">No provider detected by axym --doctor</button><div class="acc-panel">The TUI needs at least one agent CLI on your <code>PATH</code>. Install one of <code>claude</code>, <code>opencode</code>, <code>codex</code>, <code>gemini</code>, <code>cursor-agent</code>, <code>copilot</code> or <code>agy</code>. Private CLIs can be registered in <code>~/.axym/providers.json</code>. No API key is required by Axym itself.</div></div>
  <div class="acc-item"><button class="acc-trigger">Desktop Linux fails to launch</button><div class="acc-panel">Minimal and server images need a system-tray library: <code>sudo apt install libayatana-appindicator3-1</code> (Fedora: <code>sudo dnf install libayatana-appindicator-gtk3</code>). Ubuntu Desktop already includes it. For older AppImage builds, <code>sudo apt install libfuse2</code>.</div></div>
  <div class="acc-item"><button class="acc-trigger">Desktop Windows shows a WebView2 error</button><div class="acc-panel">Install the WebView2 runtime. It ships with Windows 10 (1803+) and Windows 11, but stripped or enterprise images may need the standalone installer.</div></div>
  <div class="acc-item"><button class="acc-trigger">A gate failed locally — what do I trust?</button><div class="acc-panel">Trust the gate, not the claim. Re-run the smallest failing command from the command deck, read the real output, and only then claim the change is verified. A report without an executed command behind it is not evidence.</div></div>
</div>

<h2 id="scope">Platform scope</h2>
<p>The TUI is the primary build target: new features, fixes and QA land in <code>tui/**</code> first and its gate is green before desktop work starts. Desktop/mobile parity is deferred follow-up work, not a TUI gate — a TUI verification claim is never widened into a cross-platform claim.</p>`
  }
};

window.AXYM_NAV_ORDER = ['home', 'quickstart', 'setup', 'configuration', 'features', 'releases', 'operations'];
