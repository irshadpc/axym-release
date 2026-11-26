/**
 * AXYM PORTAL — grounded page content.
 * Routes are preserved from the previous portal; `architecture` is new.
 * Each page declares its layout: marketing pages are full-width, docs pages
 * render inside the documentation shell.
 */
window.AXYM_PAGES = {
  home: {
    layout: 'marketing',
    nav: 'home',
    title: 'Axym — Build with autonomy. Ship with confidence.',
    description: 'Axym is a local-first autonomous engineering system. Give it a goal in plain English; it plans, implements, reviews, secures and tests the work under governed approval gates, on your machine.',
    keywords: 'autonomous engineering local-first governed pipeline tui desktop providers trust zones evidence',
    html: `<section class="home-hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow"><span class="dot" aria-hidden="true"></span>Local-first autonomous engineering</p>
      <h1>Build with autonomy.<br><em>Ship with confidence.</em></h1>
      <p class="hero-lead">Keep the agent CLIs you already use — Axym adds the engineering system around them: governed pipelines and parallel worktrees, an iOS/Android development platform, a zero-trust MCP firewall and a context-and-cost brain that never stops learning. Every claim is backed by evidence on your machine.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#releases">Download Axym <svg class="icon" aria-hidden="true"><use href="#i-download"/></svg></a>
        <a class="btn btn-secondary btn-lg" href="#quickstart">Read the docs <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></a>
        <a class="btn btn-tertiary btn-lg" href="#architecture">View architecture</a>
      </div>
      <p class="hero-strip"><span class="hero-strip-lead">Keep your CLIs.</span> Add proof:</p>
      <ul class="hero-meta">
        <li>0 API keys</li>
        <li>Parallel worktrees</li>
        <li>Local MCP firewall</li>
        <li>Hash-chained proof</li>
        <li><span data-capability-count>84</span> capabilities</li>
      </ul>
      <ul class="hero-meta hero-meta-versions">
        <li><span class="ok" aria-hidden="true">●</span> TUI <span class="mono" data-release-version="tui">v0.24.0</span></li>
        <li>Desktop <span class="mono" data-release-version="desktop">v12.17.0</span> macOS · <span class="mono" data-release-version="desktop-cross">v12.16.0</span> Linux/Windows</li>
        <li>MIT licensed</li>
        <li>No Axym account required</li>
      </ul>
    </div>

    <div class="showcase" aria-label="Axym product preview">
      <div class="showcase-bar">
        <span class="showcase-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="showcase-label">axym / mission-control</span>
        <div class="showcase-tabs" data-tabs="showcase" role="tablist" aria-label="Product preview">
          <button type="button" role="tab" id="tab-desktop" aria-selected="true" aria-controls="panel-desktop" data-tab="desktop">Desktop</button>
          <button type="button" role="tab" id="tab-tui" aria-selected="false" aria-controls="panel-tui" data-tab="tui" tabindex="-1">TUI</button>
        </div>
      </div>
      <div class="showcase-body" data-panels="showcase">
        <div class="tab-panel active" id="panel-desktop" role="tabpanel" aria-labelledby="tab-desktop" data-panel="desktop">
          <div class="schematic" role="img" aria-label="Schematic of the Axym Desktop mission control: a six-stage run at the approval gate, with a diff awaiting review and local evidence recorded on the right.">
            <div class="schematic-rail" aria-hidden="true">
              <div class="schematic-brand"><svg class="schematic-brand-icon" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="var(--brand)"/><path d="M17 38L32 15L47 38M17 26L32 49L47 26" fill="none" stroke="var(--on-brand)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg> axym</div>
              <div class="schematic-nav on"><svg class="icon"><use href="#i-layers"/></svg>Mission control</div>
              <div class="schematic-nav"><svg class="icon"><use href="#i-git-branch"/></svg>Runs</div>
              <div class="schematic-nav"><svg class="icon"><use href="#i-file-check"/></svg>Evidence</div>
              <div class="schematic-nav"><svg class="icon"><use href="#i-cpu"/></svg>Providers</div>
              <div class="schematic-nav"><svg class="icon"><use href="#i-shield"/></svg>Governance</div>
              <div class="schematic-local"><b>● Local runtime</b>SQLite event store<br>No telemetry egress</div>
            </div>
            <div class="schematic-main">
              <div class="schematic-head">
                <div>
                  <div class="schematic-title">Add rate limiting to the public API</div>
                  <div class="schematic-sub">run 4f2a · 6 stages · 2 providers</div>
                </div>
                <span class="state-badge">◆ Awaiting approval</span>
              </div>
              <div class="stage-track" aria-hidden="true">
                <div class="stage-node done" data-stage="plan">Plan</div>
                <div class="stage-node done" data-stage="design">Design</div>
                <div class="stage-node done" data-stage="code">Code</div>
                <div class="stage-node done" data-stage="security">Security</div>
                <div class="stage-node active" data-stage="review">Review</div>
                <div class="stage-node" data-stage="qa">QA</div>
              </div>
              <div class="schematic-card">
                <div class="schematic-card-head">Gate · review <span>diff · 3 files</span></div>
                <div class="diff-line add"><span class="ln">41</span><span>+ const limiter = createLimiter({ windowMs: 60_000 });</span></div>
                <div class="diff-line add"><span class="ln">42</span><span>+ app.use("/api", limiter.middleware);</span></div>
                <div class="diff-line del"><span class="ln">18</span><span>- app.use("/api", legacyThrottle);</span></div>
                <div class="schematic-actions">
                  <span class="schematic-btn primary">Approve diff</span>
                  <span class="schematic-btn">Inspect files</span>
                  <span class="schematic-btn">Reject</span>
                </div>
              </div>
              <div class="schematic-card">
                <div class="schematic-card-head">Verification <span>last event 12s ago</span></div>
                <div class="evidence-row"><svg class="icon ok"><use href="#i-check-circle"/></svg>typecheck passed</div>
                <div class="evidence-row"><svg class="icon ok"><use href="#i-check-circle"/></svg>18 tests passed · 2 new</div>
                <div class="evidence-row"><svg class="icon wait"><use href="#i-clock"/></svg>QA pending review approval</div>
              </div>
            </div>
            <div class="schematic-side" aria-hidden="true">
              <div class="schematic-side-title">Run evidence</div>
              <div class="evidence-row"><svg class="icon ok"><use href="#i-check"/></svg>Planner</div>
              <div class="evidence-row"><svg class="icon ok"><use href="#i-check"/></svg>Designer</div>
              <div class="evidence-row"><svg class="icon ok"><use href="#i-check"/></svg>Coder</div>
              <div class="evidence-row"><svg class="icon ok"><use href="#i-check"/></svg>Security</div>
              <div class="evidence-row"><svg class="icon wait"><use href="#i-eye"/></svg>Reviewer</div>
              <div class="evidence-row"><svg class="icon"><use href="#i-clock"/></svg>QA</div>
              <div class="evidence-metric"><b>0</b><span>static API keys</span></div>
              <div class="evidence-metric"><b>local</b><span>run history</span></div>
            </div>
          </div>
        </div>
        <div class="tab-panel" id="panel-tui" role="tabpanel" aria-labelledby="tab-tui" data-panel="tui">
          <div class="terminal">
            <div class="terminal-bar"><span class="showcase-dots" aria-hidden="true"><i></i><i></i><i></i></span> axym — provider discovery</div>
            <div class="terminal-body">
<pre> axym · doctor
 ---------------------------------------------------------
 PROVIDER        STATUS      MODE          NOTE
 claude          detected    stream-json   preferred
 codex           detected    cli           available
 opencode        detected    cli           available
 gemini          not found   —             install to use
 ---------------------------------------------------------
 workspace       /srv/app            trust zone: work
 policy          sticky_drain_first  strictTier2Approval = off
 keys            0 static            credentials stay with each CLI
 next            axym --provider claude --mode plan</pre>
            </div>
            <div class="terminal-rail"><span>Mode: <b>plan</b></span><span>Gate: <b>ready</b></span><span>Telemetry: <b>none</b></span></div>
          </div>
        </div>
      </div>
      <div class="showcase-caption"><span>Interface schematic · built from documented Axym capabilities</span><span>Not a screenshot</span></div>
    </div>
  </div>
</section>

<section class="section tour-section" id="tui-tour">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Inside the terminal</p>
      <h2 id="one-executable-a-whole-shift">One executable. A whole engineering shift.</h2>
      <p>Most tools give you a chat box. Axym gives you a repeatable way to understand a codebase, make a change, prove it, and hand it on — from one terminal, on your machine. Follow a typical morning below. Every view and command shown is part of the TUI catalog.</p>
    </div>

    <div class="tour">
      <div class="tour-rail" data-tabs="day" role="tablist" aria-label="A day with Axym TUI">
        <button type="button" class="tour-chapter" role="tab" id="day-tab-orient" aria-selected="true" aria-controls="day-panel-orient" data-tab="orient" tabindex="0"><span class="tour-chapter-num">01</span><span class="tour-chapter-copy"><b>Orient</b><small>Read before you write</small></span></button>
        <button type="button" class="tour-chapter" role="tab" id="day-tab-shape" aria-selected="false" aria-controls="day-panel-shape" data-tab="shape" tabindex="-1"><span class="tour-chapter-num">02</span><span class="tour-chapter-copy"><b>Shape</b><small>Say the goal, not the steps</small></span></button>
        <button type="button" class="tour-chapter" role="tab" id="day-tab-prove" aria-selected="false" aria-controls="day-panel-prove" data-tab="prove" tabindex="-1"><span class="tour-chapter-num">03</span><span class="tour-chapter-copy"><b>Prove</b><small>A diff with receipts</small></span></button>
        <button type="button" class="tour-chapter" role="tab" id="day-tab-scale" aria-selected="false" aria-controls="day-panel-scale" data-tab="scale" tabindex="-1"><span class="tour-chapter-num">04</span><span class="tour-chapter-copy"><b>Scale</b><small>Parallel, without collisions</small></span></button>
        <button type="button" class="tour-chapter" role="tab" id="day-tab-handoff" aria-selected="false" aria-controls="day-panel-handoff" data-tab="handoff" tabindex="-1"><span class="tour-chapter-num">05</span><span class="tour-chapter-copy"><b>Hand off</b><small>Work that follows you</small></span></button>
      </div>

      <div class="showcase tour-showcase">
        <div class="showcase-bar"><span class="showcase-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="showcase-label">axym — interactive session</span></div>
        <div class="showcase-body" data-panels="day">
          <div class="tab-panel active" id="day-panel-orient" role="tabpanel" aria-labelledby="day-tab-orient" data-panel="orient">
            <div class="tour-panel-body">
              <div class="terminal">
                <div class="terminal-bar">~/src/payments — zsh — 120×36</div>
                <div class="terminal-body"><pre>$ axym doctor
  claude    detected   stream-json   preferred
  codex     detected   cli           available
  keys      0 static   credentials stay with each CLI

$ axym
  /health     runtime + provider cooldowns
  /pipeline   stage by stage, not one green check
  /evidence   inspected · inferred · verified · failed

  mode: plan   trust zone: work   telemetry: none</pre></div>
                <div class="terminal-rail"><span>Find facts first</span><span>Gates: <b>ready</b></span></div>
              </div>
              <div class="tour-notes">
                <p class="tour-notes-kicker">Why it matters</p>
                <p>You walk into a project and get the state of the tools, the runtime and the work — before anything is changed. Provider discovery is a detection step, not a configuration exercise.</p>
                <p class="mono small">/health · /pipeline · /evidence</p>
                <a class="btn btn-tertiary" href="#features/feat-adaptive-workspaces">Explore engineering views →</a>
              </div>
            </div>
          </div>
          <div class="tab-panel" id="day-panel-shape" role="tabpanel" aria-labelledby="day-tab-shape" data-panel="shape" hidden>
            <div class="tour-panel-body">
              <div class="terminal">
                <div class="terminal-bar">~/src/payments — composer — plan mode</div>
                <div class="terminal-body"><pre>&gt; /po "add rate limiting to the public API"
  scope: 3 files · acceptance criteria set · 2 providers

&gt; @src/app.ts keep the change surgical
  [Shift+Tab] plan → ask → edit → auto

  ● streaming tool calls with real paths and output
  ● message queued while the turn runs
  mode: plan   read-only   permission gate: ready</pre></div>
                <div class="terminal-rail"><span>Composer: <b>readline + Vim</b></span><span>Images: <b>Ctrl+I</b></span></div>
              </div>
              <div class="tour-notes">
                <p class="tour-notes-kicker">Why it matters</p>
                <p>The composer behaves like an editor: fuzzy file completion, history, pasted screenshots and queued follow-ups. Permission modes are a visible dial, not an implicit trust decision.</p>
                <p class="mono small">@file · /po · /mode · Ctrl+R</p>
                <a class="btn btn-tertiary" href="#features/feat-multi-line-composer-with-readline-keys">Explore the composer →</a>
              </div>
            </div>
          </div>
          <div class="tab-panel" id="day-panel-prove" role="tabpanel" aria-labelledby="day-tab-prove" data-panel="prove" hidden>
            <div class="tour-panel-body">
              <div class="terminal">
                <div class="terminal-bar">~/src/payments — governed run 4f2a — 6 stages</div>
                <div class="terminal-body"><pre>  ● Plan      ✓ VERIFIED
  ● Design    ✓ VERIFIED
  ● Code      ✓ VERIFIED    3 files changed
  ● Security  ✓ VERIFIED    threat model attached
  ◆ Review    AWAITING APPROVAL
  ○ QA        QUEUED

  /review   /security   /test npm test

  RESULT  OK · VER · 18 tests passed · 0 blockers</pre></div>
                <div class="terminal-rail"><span>Reviewer: <b>different provider</b></span><span>Evidence: <b>local</b></span></div>
              </div>
              <div class="tour-notes">
                <p class="tour-notes-kicker">Why it matters</p>
                <p>Each turn ends with a Result Ledger: files touched, checks that actually ran, blockers and next actions. Review can run on a different provider than the author, and independence is labelled honestly.</p>
                <p class="mono small">/review · /security · /test · /undo</p>
                <a class="btn btn-tertiary" href="#features/feat-code-review-and-qa">Explore verification →</a>
              </div>
            </div>
          </div>
          <div class="tab-panel" id="day-panel-scale" role="tabpanel" aria-labelledby="day-tab-scale" data-panel="scale" hidden>
            <div class="tour-panel-body">
              <div class="terminal">
                <div class="terminal-bar">~/src/payments — fleet — 3 isolated runs</div>
                <div class="terminal-body"><pre>$ /council "design a rate limiter"
  claude  → token bucket + per-route limits
  codex   → sliding window + Redis
  merged  → 2 candidates · 1 decision · trace kept

$ /runs start "add rate limiting" --worktree
  run 1  linked worktree · staged files isolated
  run 2  linked worktree · staged files isolated
  run 3  linked worktree · staged files isolated

$ /compare 1 2   commit · dependencies · stage spend</pre></div>
                <div class="terminal-rail"><span>Worktrees: <b>explicit opt-in</b></span><span>Integration: <b>separate decision</b></span></div>
              </div>
              <div class="tour-notes">
                <p class="tour-notes-kicker">Why it matters</p>
                <p>Get a second opinion without babysitting two sessions, then run several features at once in isolated worktrees. Events and staged files never mix, and applying a finished run is its own explicit step.</p>
                <p class="mono small">/council · /race · /runs · /compare</p>
                <a class="btn btn-tertiary" href="#features/feat-agent-hub-and-fleet-overview">Explore fleet &amp; automation →</a>
              </div>
            </div>
          </div>
          <div class="tab-panel" id="day-panel-handoff" role="tabpanel" aria-labelledby="day-tab-handoff" data-panel="handoff" hidden>
            <div class="tour-panel-body">
              <div class="terminal">
                <div class="terminal-bar">~/src/payments — remote approval — phone</div>
                <div class="terminal-body"><pre>$ /remote qr
  paired: 1 device · scoped link · revocable
  same Wi-Fi / Tailscale · no account required

  [phone] Review diff → Approve
  → reason recorded in the run evidence

$ /detach     terminal free, the run continues
$ /notify on  push when a turn finishes or fails
$ /handoff export
  brief · acceptance criteria · recovery context</pre></div>
                <div class="terminal-rail"><span>Session stays: <b>on your workstation</b></span><span>Observers: <b>read-only</b></span></div>
              </div>
              <div class="tour-notes">
                <p class="tour-notes-kicker">Why it matters</p>
                <p>Work outlasts the terminal window. Approve from a phone, free the terminal without stopping the run, or hand the whole brief to the next session or person — never by copying raw state.</p>
                <p class="mono small">/remote · /detach · /notify · /handoff</p>
                <a class="btn btn-tertiary" href="#features/feat-session-and-run-handoff">Explore continuity →</a>
              </div>
            </div>
          </div>
        </div>
        <div class="showcase-caption"><span>Five moments from a governed session</span><span>Illustrative · commands come from the catalog</span></div>
      </div>
    </div>

    <div class="tour-stats">
      <h3 id="powerful-and-light">Powerful where it counts. Light where it matters.</h3>
      <p>Axym has no Axym cloud account, no API keys of its own and no telemetry. It drives the agent CLI you already installed (including multiple provider accounts via <code>/accounts</code> and local OpenAI-compatible servers via <code>--provider local</code>) and keeps orchestration, writes and evidence on your machine.</p>
      <dl class="stat-grid">
        <div class="stat-cell"><dt>1</dt><dd>standalone executable</dd></div>
        <div class="stat-cell"><dt>0</dt><dd>static API keys</dd></div>
        <div class="stat-cell"><dt>0</dt><dd>telemetry egress</dd></div>
        <div class="stat-cell"><dt data-capability-count>84</dt><dd>curated capabilities</dd></div>
        <div class="stat-cell"><dt>121</dt><dd>declared slash commands</dd></div>
        <div class="stat-cell"><dt>10</dt><dd>feature groups</dd></div>
        <div class="stat-cell"><dt>91%</dt><dd>warm prompt-cache hit</dd></div>
        <div class="stat-cell"><dt>≤2 KB</dt><dd>provider handoff</dd></div>
      </dl>
      <p class="small muted">Cache figures come from a measured repeated ~40k-token prompt in the catalog: $0.161 cold versus $0.008 warm. TUI archives are 37–55 MB, checksummed, and run on macOS, Linux and Windows.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">One governed system</p>
      <h2>From engineering objective to verified result.</h2>
      <p>Axym is not a chat window with a code button. It coordinates planning, implementation, security, review and QA as one run — with deterministic policy between the model and your working tree.</p>
    </div>
    <div class="capability-list">
      <div class="capability-row">
        <div class="capability-tag" style="--stage: var(--stage-orchestration)">Autonomous execution</div>
        <div class="capability-body"><h3>Objective in. Governed run out.</h3><p>Give Axym a goal and it composes the stages, routes each to a provider, and keeps the run recoverable. Long work survives failures instead of disappearing with the terminal.</p></div>
        <div class="capability-aside"><span class="status">Available</span>Desktop and TUI</div>
      </div>
      <div class="capability-row">
        <div class="capability-tag" style="--stage: var(--stage-implementation)">Local-first runtime</div>
        <div class="capability-body"><h3>Your machine owns the work.</h3><p>The orchestrator, workspace writes and SQLite event store run locally. Axym ships no telemetry. Model inference is performed by the provider CLI you install, under that provider's own network boundary.</p></div>
        <div class="capability-aside"><span class="status">Available</span>No Axym account · multi-account provider slots</div>
      </div>
      <div class="capability-row">
        <div class="capability-tag" style="--stage: var(--stage-planning)">Provider fleet</div>
        <div class="capability-body"><h3>Use the models you already have.</h3><p>Axym discovers installed agent CLIs — <code>claude</code>, <code>codex</code>, <code>opencode</code>, <code>gemini</code>, <code>cursor-agent</code>, <code>copilot</code>, <code>agy</code> — and routes stages across them. Credentials stay with each CLI.</p></div>
        <div class="capability-aside"><span class="status">Available</span>Keyless by default</div>
      </div>
      <div class="capability-row">
        <div class="capability-tag" style="--stage: var(--stage-security)">Governance</div>
        <div class="capability-body"><h3>Policy the model cannot talk past.</h3><p>Trust zones, tiered approvals and a non-bypassable permission gate sit between the model and your working tree. A Tier 3 freeze interrupts the turn and records the reason.</p></div>
        <div class="capability-aside"><span class="status">Available</span>Fail-closed gates</div>
      </div>
      <div class="capability-row">
        <div class="capability-tag" style="--stage: var(--stage-review)">Independent verification</div>
        <div class="capability-body"><h3>Review the author did not write.</h3><p>Run review or security on a different provider than the coder. Axym labels whether the verifier was independent or shared the author's provider and model, so the claim is inspectable.</p></div>
        <div class="capability-aside"><span class="status">Available</span>Cross-provider</div>
      </div>
      <div class="capability-row">
        <div class="capability-tag" style="--stage: var(--stage-qa)">Evidence</div>
        <div class="capability-body"><h3>Claims require executed commands.</h3><p>QA passes only when real test and build results back it up. Every finished run records an outcome score and a local history of what worked, what failed and what to try next.</p></div>
        <div class="capability-aside"><span class="status">Available</span>Local audit trail</div>
      </div>
    </div>
    <div class="callout callout-security">
      <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-shield"/></svg>Security boundary</p>
      <p>Axym drives provider CLIs you install yourself; it never asks for a static API key (<strong>ADR-0022</strong>). Native-provider access stays behind the permission gate. Builds are ad-hoc signed, not notarized — first launch may show a dismissible “unknown publisher” warning.</p>
    </div>
  </div>
</section>

<section class="section" id="pipeline">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Engineering architecture</p>
      <h2>A pipeline you can inspect at every edge.</h2>
      <p>Six stages, explicit gates, one evidence trail. Stage identity and execution status are separate signals: a security stage can be running, verified or failed without losing what it is.</p>
    </div>
    <div class="architecture-panel">
      <div class="architecture-figure">
        <svg viewBox="0 0 980 420" role="img" aria-labelledby="pipeline-title pipeline-desc">
          <title id="pipeline-title">Axym governed pipeline</title>
          <desc id="pipeline-desc">An engineering objective enters a six-stage pipeline: Plan, Design, Code, Security, Review and QA. Approval gates sit between stages. Each stage writes evidence to a local SQLite event store. The final output is a verified result with an attached evidence trail.</desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--border-interactive)"/>
            </marker>
          </defs>
          <g>
            <rect x="18" y="22" width="252" height="54" rx="8" fill="var(--surface)" stroke="var(--border)"/>
            <text x="34" y="45" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">OBJECTIVE</text>
            <text x="34" y="63" fill="var(--text)" font-family="var(--font-sans)" font-size="14">Add rate limiting to the public API</text>
            <path d="M144 76 L144 108 L72 108 L72 142" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow)"/>
            <rect x="710" y="22" width="252" height="54" rx="8" fill="var(--surface)" stroke="var(--border)"/>
            <text x="726" y="45" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">PROVIDERS</text>
            <text x="726" y="63" fill="var(--text)" font-family="var(--font-sans)" font-size="14">Installed agent CLIs · keyless</text>
            <path d="M836 76 L836 108 L908 108 L908 142" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow)"/>
          </g>
          <g font-family="var(--font-mono)">
            <g>
              <rect x="18" y="146" width="138" height="82" rx="8" fill="var(--surface)" stroke="var(--stage-planning)" stroke-width="1.5"/>
              <circle cx="34" cy="164" r="4" fill="var(--stage-planning)"/>
              <text x="46" y="168" fill="var(--text)" font-size="12" font-weight="600">Plan</text>
              <text x="32" y="190" fill="var(--text-muted)" font-size="9">scope · constraints</text>
              <text x="32" y="206" fill="var(--text-muted)" font-size="9">acceptance criteria</text>
              <text x="32" y="220" fill="var(--success)" font-size="8">● VERIFIED</text>
            </g>
            <g>
              <rect x="174" y="146" width="138" height="82" rx="8" fill="var(--surface)" stroke="var(--stage-architecture)" stroke-width="1.5"/>
              <circle cx="190" cy="164" r="4" fill="var(--stage-architecture)"/>
              <text x="202" y="168" fill="var(--text)" font-size="12" font-weight="600">Design</text>
              <text x="188" y="190" fill="var(--text-muted)" font-size="9">interfaces · data</text>
              <text x="188" y="206" fill="var(--text-muted)" font-size="9">trade-offs</text>
              <text x="188" y="220" fill="var(--success)" font-size="8">● VERIFIED</text>
            </g>
            <g>
              <rect x="330" y="146" width="138" height="82" rx="8" fill="var(--surface)" stroke="var(--stage-implementation)" stroke-width="1.5"/>
              <circle cx="346" cy="164" r="4" fill="var(--stage-implementation)"/>
              <text x="358" y="168" fill="var(--text)" font-size="12" font-weight="600">Code</text>
              <text x="344" y="190" fill="var(--text-muted)" font-size="9">surgical diff</text>
              <text x="344" y="206" fill="var(--text-muted)" font-size="9">tests alongside</text>
              <text x="344" y="220" fill="var(--success)" font-size="8">● VERIFIED</text>
            </g>
            <g>
              <rect x="486" y="146" width="138" height="82" rx="8" fill="var(--surface)" stroke="var(--stage-security)" stroke-width="1.5"/>
              <circle cx="502" cy="164" r="4" fill="var(--stage-security)"/>
              <text x="514" y="168" fill="var(--text)" font-size="12" font-weight="600">Security</text>
              <text x="500" y="190" fill="var(--text-muted)" font-size="9">threat model</text>
              <text x="500" y="206" fill="var(--text-muted)" font-size="9">evidence-grounded</text>
              <text x="500" y="220" fill="var(--success)" font-size="8">● VERIFIED</text>
            </g>
            <g>
              <rect x="642" y="146" width="138" height="82" rx="8" fill="var(--surface)" stroke="var(--stage-review)" stroke-width="1.5"/>
              <circle cx="658" cy="164" r="4" fill="var(--stage-review)"/>
              <text x="670" y="168" fill="var(--text)" font-size="12" font-weight="600">Review</text>
              <text x="656" y="190" fill="var(--text-muted)" font-size="9">fresh context</text>
              <text x="656" y="206" fill="var(--text-muted)" font-size="9">drift detection</text>
              <text x="656" y="220" fill="var(--state-approval)" font-size="8">◆ AWAITING APPROVAL</text>
            </g>
            <g>
              <rect x="798" y="146" width="164" height="82" rx="8" fill="var(--surface)" stroke="var(--stage-qa)" stroke-width="1.5"/>
              <circle cx="814" cy="164" r="4" fill="var(--stage-qa)"/>
              <text x="826" y="168" fill="var(--text)" font-size="12" font-weight="600">QA</text>
              <text x="812" y="190" fill="var(--text-muted)" font-size="9">real exit codes</text>
              <text x="812" y="206" fill="var(--text-muted)" font-size="9">coverage · build</text>
              <text x="812" y="220" fill="var(--text-muted)" font-size="8">○ QUEUED</text>
            </g>
            <g stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow)">
              <line x1="156" y1="187" x2="168" y2="187"/>
              <line x1="312" y1="187" x2="324" y2="187"/>
              <line x1="468" y1="187" x2="480" y2="187"/>
              <line x1="624" y1="187" x2="636" y2="187"/>
              <line x1="780" y1="187" x2="792" y2="187"/>
            </g>
          </g>
          <g>
            <rect x="18" y="286" width="642" height="52" rx="8" fill="var(--canvas-alt)" stroke="var(--border)"/>
            <text x="34" y="307" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">LOCAL EVIDENCE</text>
            <text x="34" y="325" fill="var(--text)" font-family="var(--font-sans)" font-size="12">SQLite event store · approval gates · crash-journaled side effects</text>
            <path d="M330 228 L330 280" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow)"/>
            <rect x="710" y="286" width="252" height="52" rx="8" fill="var(--brand-subtle)" stroke="var(--brand)"/>
            <text x="726" y="307" fill="var(--brand)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">RESULT</text>
            <text x="726" y="325" fill="var(--text)" font-family="var(--font-sans)" font-size="12">Verified change + evidence trail</text>
            <path d="M880 228 L880 280" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow)"/>
            <path d="M660 312 L704 312" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow)"/>
          </g>
        </svg>
        <p class="figure-caption">Illustrative run state. Stage order and gate semantics follow the documented Axym pipeline: plan → design → code → security → review → QA.</p>
      </div>
      <div class="architecture-aside">
        <h3>Stage identity ≠ execution status</h3>
        <p>Every node keeps its engineering meaning while carrying a separate lifecycle state: queued, running, awaiting approval, blocked, verified or failed.</p>
        <ul class="legend">
          <li style="--stage: var(--stage-planning)"><i aria-hidden="true"></i>Planning</li>
          <li style="--stage: var(--stage-architecture)"><i aria-hidden="true"></i>Architecture</li>
          <li style="--stage: var(--stage-implementation)"><i aria-hidden="true"></i>Implementation</li>
          <li style="--stage: var(--stage-security)"><i aria-hidden="true"></i>Security</li>
          <li style="--stage: var(--stage-review)"><i aria-hidden="true"></i>Code review</li>
          <li style="--stage: var(--stage-qa)"><i aria-hidden="true"></i>Quality assurance</li>
        </ul>
        <p style="margin-top:1rem"><a href="#architecture">Read the architecture notes <svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-right"/></svg></a></p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="local-first">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Local-first, precisely</p>
      <h2>Know exactly where your work goes.</h2>
      <p>“Local-first” is a boundary, not a slogan. Axym owns orchestration, workspace writes and evidence on your machine. Inference belongs to the provider CLI you installed.</p>
    </div>
    <div class="boundary">
      <div class="boundary-grid">
        <div class="boundary-zone">
          <h3><svg class="icon" aria-hidden="true"><use href="#i-lock"/></svg>On your machine</h3>
          <p>Owned and executed by Axym locally.</p>
          <ul class="boundary-list">
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Orchestrator, stage graph and run state</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Workspace reads and gated writes</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>SQLite event store and outcome scores</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Project configuration and trust policy</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Approval gates and audit trail</li>
          </ul>
        </div>
        <div class="boundary-zone">
          <h3><svg class="icon" aria-hidden="true"><use href="#i-external"/></svg>Across the provider boundary</h3>
          <p>Controlled by the agent CLI you choose.</p>
          <ul class="boundary-list">
            <li><svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>Prompt context sent to the selected provider</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>Model inference and provider-side retention</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>Authentication held by the native CLI</li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>The provider's own network and terms</li>
          </ul>
        </div>
      </div>
      <div class="boundary-note">
        <svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>
        <span>Axym itself sends no telemetry. It does not claim that inference is offline: whether a request leaves your machine depends on the provider CLI and model you select. Review that provider's data policy before sending sensitive code.</span>
      </div>
    </div>
  </div>
</section>

<section class="section section-tight" id="find-your-path">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Find your way in</p>
      <h2 id="start-where-you-are">Start where you are.</h2>
      <p>You do not have to learn every feature to get value. Pick the job you have today — Axym meets you there, and the full catalog is one click away when you need it.</p>
    </div>
    <div class="path-grid">
      <a class="path-card" href="#quickstart/install"><span class="path-card-kicker">Just looking</span><b>Try it in five steps</b><span class="path-card-copy">Download, verify, detect a provider, start a session.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/feat-multi-line-composer-with-readline-keys"><span class="path-card-kicker">Writing code</span><b>Make the composer yours</b><span class="path-card-copy">Readline keys, Vim bindings, @file and image inputs.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/feat-code-review-and-qa"><span class="path-card-kicker">Shipping a change</span><b>Prove it before you ship</b><span class="path-card-copy">Review, security, real test output and reversible edits.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/feat-agent-hub-and-fleet-overview"><span class="path-card-kicker">Working in parallel</span><b>Run more than one model</b><span class="path-card-copy">Council, isolated worktrees, headless runs and steering.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/feat-session-and-run-handoff"><span class="path-card-kicker">On call or pairing</span><b>Keep work in motion</b><span class="path-card-copy">Phone approvals, read-only viewers, notifications and handoff.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/start-here"><span class="path-card-kicker">Going deeper</span><b>Read the full catalog</b><span class="path-card-copy"><span data-capability-count>84</span> curated capabilities in 10 groups, plus every extra command surface.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="section" id="downloads">
  <div class="container">
    <div class="section-head-row">
      <div class="section-head">
        <p class="section-kicker">Downloads</p>
        <h2>Take the runtime. Keep the keys.</h2>
        <p>Standalone TUI binaries and the Desktop app. Every published asset below is read from the release manifest with its SHA-256 digest.</p>
      </div>
      <a class="btn btn-secondary" href="#releases">All releases &amp; checksums <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></a>
    </div>
    <div id="downloads-grid"><p class="muted small">Loading verified release artifacts…</p></div>
  </div>
</section>

<section class="section" id="release-notes">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Release history</p>
      <h2>Shipped and dated.</h2>
      <p>Published releases, newest first. Versions, dates and platform coverage are listed below.</p>
    </div>
    <ol class="timeline" id="release-timeline">
      <li class="timeline-item"><div class="timeline-head"><span class="timeline-version">tui-v0.24.0</span><span class="timeline-date">2026-11-26</span></div><p class="timeline-note">Parallel isolated runs, the /ship governed pipeline, Flow OS, a zero-trust MCP firewall and calm, anti-hang resilience.</p></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-band">
      <div>
        <h2>Start with a goal. Keep the evidence.</h2>
        <p>Install a build, run <code>axym doctor</code>, and start your first governed session.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary" href="#quickstart">Quick start <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></a>
        <a class="btn btn-secondary" href="https://github.com/irshadpc/axym-release" target="_blank" rel="noopener">GitHub <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg></a>
      </div>
    </div>
  </div>
</section>`
  },

  architecture: {
    layout: 'docs',
    nav: 'architecture',
    eyebrow: 'Architecture',
    title: 'Architecture — Axym',
    description: 'How Axym coordinates a governed engineering run: six stages, approval gates, provider routing, local evidence and a separate lifecycle state model.',
    keywords: 'architecture pipeline stages gates provider routing evidence lifecycle status trust zones local-first',
    html: `<section class="section section-tight" style="padding-top:var(--space-8)">
  <div class="container">
    <div class="section-head" style="max-width:52rem">
      <h1 style="font-size:var(--text-5xl);letter-spacing:-.05em;margin-bottom:1rem">A governed run, edge by edge.</h1>
      <p style="font-size:var(--text-lg)">Axym coordinates six engineering stages under deterministic policy. This page describes the execution model, the boundary to model providers, and the evidence each stage leaves behind.</p>
    </div>
    <dl class="meta-grid">
      <div class="meta-cell"><dt>Stages</dt><dd>Plan · Design · Code · Security · Review · QA</dd></div>
      <div class="meta-cell"><dt>Gate model</dt><dd>Tiered approvals · fail-closed</dd></div>
      <div class="meta-cell"><dt>Runtime</dt><dd>Rust/Tauri core · local SQLite</dd></div>
      <div class="meta-cell"><dt>Provider auth</dt><dd>Native CLI · zero static keys</dd></div>
    </dl>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Execution model</p>
      <h2 id="execution-model">Objective → stages → evidence.</h2>
      <p>A run is composed from the goal and the evidence available. Stage-level gates decide whether the next stage may begin; approval remains a human act.</p>
    </div>
    <div class="architecture-panel">
      <div class="architecture-figure">
        <svg viewBox="0 0 980 470" role="img" aria-labelledby="exec-title exec-desc">
          <title id="exec-title">Axym execution model</title>
          <desc id="exec-desc">An objective is analysed and composed into a pipeline. Six stages run in order with approval gates. Provider CLIs perform inference. Every stage writes local evidence, and QA only passes on real command results.</desc>
          <defs>
            <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--border-interactive)"/></marker>
          </defs>
          <rect x="18" y="20" width="944" height="64" rx="8" fill="var(--canvas-alt)" stroke="var(--border)"/>
          <text x="36" y="45" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">OBJECTIVE</text>
          <text x="36" y="66" fill="var(--text)" font-family="var(--font-sans)" font-size="14">Plain-English goal + project context + trust policy</text>
          <path d="M490 84 L490 116" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow2)"/>
          <rect x="300" y="120" width="380" height="52" rx="8" fill="var(--surface)" stroke="var(--brand)"/>
          <text x="318" y="142" fill="var(--brand)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">ORCHESTRATOR</text>
          <text x="318" y="161" fill="var(--text)" font-family="var(--font-sans)" font-size="12">Composes stages, routes providers, records state</text>
          <path d="M490 172 L490 204" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow2)"/>
          <g font-family="var(--font-mono)" font-size="9">
            <g><rect x="18" y="208" width="138" height="76" rx="8" fill="var(--surface)" stroke="var(--stage-planning)" stroke-width="1.5"/><text x="34" y="232" fill="var(--text)" font-size="12" font-weight="600">Plan</text><text x="34" y="252" fill="var(--text-muted)">scope · constraints</text><text x="34" y="268" fill="var(--text-muted)">acceptance criteria</text></g>
            <g><rect x="174" y="208" width="138" height="76" rx="8" fill="var(--surface)" stroke="var(--stage-architecture)" stroke-width="1.5"/><text x="190" y="232" fill="var(--text)" font-size="12" font-weight="600">Design</text><text x="190" y="252" fill="var(--text-muted)">interfaces · data</text><text x="190" y="268" fill="var(--text-muted)">trade-offs</text></g>
            <g><rect x="330" y="208" width="138" height="76" rx="8" fill="var(--surface)" stroke="var(--stage-implementation)" stroke-width="1.5"/><text x="346" y="232" fill="var(--text)" font-size="12" font-weight="600">Code</text><text x="346" y="252" fill="var(--text-muted)">surgical diff</text><text x="346" y="268" fill="var(--text-muted)">tests alongside</text></g>
            <g><rect x="486" y="208" width="138" height="76" rx="8" fill="var(--surface)" stroke="var(--stage-security)" stroke-width="1.5"/><text x="502" y="232" fill="var(--text)" font-size="12" font-weight="600">Security</text><text x="502" y="252" fill="var(--text-muted)">threat model</text><text x="502" y="268" fill="var(--text-muted)">prioritized findings</text></g>
            <g><rect x="642" y="208" width="138" height="76" rx="8" fill="var(--surface)" stroke="var(--stage-review)" stroke-width="1.5"/><text x="658" y="232" fill="var(--text)" font-size="12" font-weight="600">Review</text><text x="658" y="252" fill="var(--text-muted)">fresh context</text><text x="658" y="268" fill="var(--text-muted)">spec-to-code drift</text></g>
            <g><rect x="798" y="208" width="164" height="76" rx="8" fill="var(--surface)" stroke="var(--stage-qa)" stroke-width="1.5"/><text x="814" y="232" fill="var(--text)" font-size="12" font-weight="600">QA</text><text x="814" y="252" fill="var(--text-muted)">real exit codes</text><text x="814" y="268" fill="var(--text-muted)">coverage · build</text></g>
          </g>
          <g stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow2)">
            <line x1="156" y1="246" x2="168" y2="246"/><line x1="312" y1="246" x2="324" y2="246"/>
            <line x1="468" y1="246" x2="480" y2="246"/><line x1="624" y1="246" x2="636" y2="246"/>
            <line x1="780" y1="246" x2="792" y2="246"/>
          </g>
          <g font-family="var(--font-mono)" font-size="8" fill="var(--state-approval)">
            <text x="150" y="202">◆</text><text x="306" y="202">◆</text><text x="462" y="202">◆</text><text x="618" y="202">◆</text><text x="774" y="202">◆</text>
          </g>
          <rect x="18" y="312" width="500" height="58" rx="8" fill="var(--canvas-alt)" stroke="var(--border)"/>
          <text x="34" y="334" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">APPROVAL GATES</text>
          <text x="34" y="354" fill="var(--text)" font-family="var(--font-sans)" font-size="12">Human inspection of diffs and tool-execution requests</text>
          <rect x="538" y="312" width="424" height="58" rx="8" fill="var(--surface)" stroke="var(--border)"/>
          <text x="554" y="334" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">PROVIDER CLIs</text>
          <text x="554" y="354" fill="var(--text)" font-family="var(--font-sans)" font-size="12">claude · codex · opencode · gemini · cursor-agent · copilot · agy</text>
          <rect x="18" y="394" width="944" height="58" rx="8" fill="var(--brand-subtle)" stroke="var(--brand)"/>
          <text x="34" y="416" fill="var(--brand)" font-family="var(--font-mono)" font-size="10" letter-spacing="1">EVIDENCE</text>
          <text x="34" y="436" fill="var(--text)" font-family="var(--font-sans)" font-size="12">Local SQLite event store · stage results · outcome scores · verification output · crash journal</text>
          <path d="M290 368 L290 390" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow2)"/>
          <path d="M750 370 L750 390" fill="none" stroke="var(--border-interactive)" stroke-width="1.5" marker-end="url(#arrow2)"/>
        </svg>
        <p class="figure-caption">Documented stage order. Approval gates and provider routing are properties of the run, not decoration.</p>
      </div>
      <div class="architecture-aside">
        <h3 id="what-a-gate-does">What a gate does</h3>
        <p>A gate is not a progress spinner. It blocks the next stage until policy is satisfied and, where required, a human approves the actual diff or tool request.</p>
        <ul class="boundary-list">
          <li><svg class="icon" aria-hidden="true"><use href="#i-shield"/></svg>Tiered actions, explicit approval</li>
          <li><svg class="icon" aria-hidden="true"><use href="#i-lock"/></svg>Trust-zone eligibility</li>
          <li><svg class="icon" aria-hidden="true"><use href="#i-alert"/></svg>Tier 3 freeze stops egress</li>
          <li><svg class="icon" aria-hidden="true"><use href="#i-file-check"/></svg>Reason recorded on every path</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Stage contract</p>
      <h2 id="stage-contract">Each stage answers a different question.</h2>
      <p>Stage colour is identity. It never doubles as status. The label and shape carry the state.</p>
    </div>
    <div class="table-wrap" tabindex="0" role="region" aria-label="Pipeline stage contract">
      <table>
        <thead><tr><th>Stage</th><th>Question</th><th>Evidence produced</th><th>Status example</th></tr></thead>
        <tbody>
          <tr><td><span class="capability-tag" style="--stage: var(--stage-planning)">Plan</span></td><td>What is in scope, and how will we know it is done?</td><td>Scope, constraints, acceptance criteria</td><td><span class="badge badge-active">Verified</span></td></tr>
          <tr><td><span class="capability-tag" style="--stage: var(--stage-architecture)">Design</span></td><td>Which interfaces and trade-offs does the change require?</td><td>Design notes, affected surfaces, risks</td><td><span class="badge badge-active">Verified</span></td></tr>
          <tr><td><span class="capability-tag" style="--stage: var(--stage-implementation)">Code</span></td><td>What is the smallest correct diff?</td><td>File changes, tests, build output</td><td><span class="badge badge-active">Verified</span></td></tr>
          <tr><td><span class="capability-tag" style="--stage: var(--stage-security)">Security</span></td><td>What can be abused, and what must be fixed first?</td><td>Threat model, findings, remediation plan</td><td><span class="badge badge-active">Verified</span></td></tr>
          <tr><td><span class="capability-tag" style="--stage: var(--stage-review)">Review</span></td><td>Does the diff match the spec, and is it independently sound?</td><td>Findings with file and line references</td><td><span class="badge badge-pending">Awaiting approval</span></td></tr>
          <tr><td><span class="capability-tag" style="--stage: var(--stage-qa)">QA</span></td><td>Did the tests and build actually pass?</td><td>Executed command output and exit codes</td><td><span class="badge badge-info">Queued</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Lifecycle states</p>
      <h2 id="lifecycle-states">Ten states, never colour alone.</h2>
      <p>Every state ships with a text label and, in the interface, a distinct icon or shape. The list below is the complete lifecycle vocabulary used by run views.</p>
    </div>
    <dl class="meta-grid">
      <div class="meta-cell"><dt><span class="badge badge-neutral">○ Pending</span></dt><dd>Not started; waiting on composition.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-info">◇ Queued</span></dt><dd>Accepted; waiting for a worker or provider.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-info">● Running</span></dt><dd>Executing now; output is streaming.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-pending">◆ Awaiting approval</span></dt><dd>A human gate is open.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-pending">■ Blocked</span></dt><dd>Policy or dependency prevents progress.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-info">↻ Retrying</span></dt><dd>Recovering after a classified failure.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-active">✓ Completed</span></dt><dd>Stage finished; evidence attached.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-active">✓ Verified</span></dt><dd>Independent check passed on real output.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-pending">✕ Failed</span></dt><dd>Terminal failure; reason recorded.</dd></div>
      <div class="meta-cell"><dt><span class="badge badge-neutral">⊘ Cancelled</span></dt><dd>Stopped by a human or a superseding run.</dd></div>
    </dl>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="section-kicker">Verification loop</p>
      <h2 id="verification-loop">Evidence is a closed loop.</h2>
      <p>The runtime does not accept a model's claim that tests passed. It records what ran, what the runner returned, and whether the result was independently checked.</p>
    </div>
    <div class="step-line">
      <div class="step"><div class="step-num">1</div><div class="step-title">Execute</div><div class="step-body">Run the smallest real command that can falsify the claim — typecheck, test suite, build, security scan.</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-title">Record</div><div class="step-body">Persist the command, exit code, output, provider, timing and cost to the local event store. Failures record the reason on every terminal path.</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-title">Independently check</div><div class="step-body">Route review or security to a different provider where available. Axym labels whether the verifier shared the author's provider and model.</div></div>
      <div class="step"><div class="step-num">4</div><div class="step-title">Decide</div><div class="step-body">A human approves or rejects at the gate. The run's outcome score is recorded for later planning; unmeasured quality is never scored as perfect.</div></div>
    </div>
    <div class="callout callout-note">
      <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>Scope</p>
      <p>The TUI is the primary build target. Desktop and mobile parity are follow-up work, and a TUI verification claim is never widened into a cross-platform claim.</p>
    </div>
  </div>
</section>`
  },

  quickstart: {
    layout: 'docs',
    nav: 'docs',
    title: 'Quick Start',
    eyebrow: 'First session in five steps',
    description: 'Install Axym, verify the archive, confirm a provider CLI and start a governed session in five steps.',
    keywords: 'claude codex antigravity agy gemini opencode provider first session install quick start',
    html: `<h1>Quick Start</h1>
<p class="lead">From download to your first governed session. Both products need at least one agent CLI on your <code>PATH</code> — and no static API key.</p>

<div class="callout callout-compat">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>Installer note</p>
  <p>Use the verified archive and extraction flow below. Do not pipe an unpublished installer to a shell.</p>
</div>

<h2 id="install">1. Download and extract</h2>
<p>Pick your platform. Each command downloads the published archive from <code>tui-v0.24.0</code>, extracts it, and runs the optional <code>--install</code> helper that copies the binary into your user path.</p>
<div class="os-bar" role="group" aria-label="Choose your operating system">
  <button type="button" class="os-tab active" data-os="macos_arm" aria-pressed="true">macOS · Apple Silicon</button>
  <button type="button" class="os-tab" data-os="macos_intel" aria-pressed="false">macOS · Intel</button>
  <button type="button" class="os-tab" data-os="linux" aria-pressed="false">Linux · x86_64</button>
  <button type="button" class="os-tab" data-os="windows" aria-pressed="false">Windows · x86_64</button>
</div>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">TUI · verified archive</span><button type="button" class="copy-btn" data-copy="install-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="install-command" data-install-output="macos_arm">curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/axym-0.24.0-macos.tar.gz
tar -xzf axym-0.24.0-macos.tar.gz
./axym-macos-arm64 --install</pre></div>
</div>
<p class="small muted">The macOS archive contains both <code>axym-macos-arm64</code> and <code>axym-macos-x64</code>. Windows users can extract the zip and run <code>axym-windows-x86_64.exe --install</code>.</p>

<h2 id="verify">2. Verify the download</h2>
<p>Put <code>SHA256SUMS.txt</code> from the same release beside the archive, then check it before you run anything.</p>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">checksum verification</span><button type="button" class="copy-btn" data-copy="verify-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="verify-command">curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/SHA256SUMS.txt
shasum -a 256 -c --ignore-missing SHA256SUMS.txt</pre></div>
</div>

<h2 id="provider">3. Confirm a provider</h2>
<p>Axym detects the agent CLIs already installed on your machine. Run the doctor before starting a session:</p>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">provider discovery</span><button type="button" class="copy-btn" data-copy="doctor-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="doctor-command">axym doctor</pre></div>
</div>
<p>Detected providers can include <code>claude</code>, <code>opencode</code>, <code>codex</code>, <code>gemini</code>, <code>cursor-agent</code>, <code>copilot</code> and <code>agy</code>. Authentication stays with each CLI; Axym does not store a static key.</p>

<h2 id="first-session">4. Start a session</h2>
<p>Run Axym in your project. Type <code>/</code> for the command palette with tab completion; <code>/health</code> shows runtime state.</p>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">first session</span><button type="button" class="copy-btn" data-copy="session-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="session-command">cd /path/to/your/project
axym
# inside the session
/health
/pipeline</pre></div>
</div>

<h2 id="headless">5. Go headless or remote</h2>
<p>Use headless mode for scripts and CI, or serve the running session over TLS with a PIN gate for a phone-sized approval surface.</p>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">headless and remote</span><button type="button" class="copy-btn" data-copy="headless-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="headless-command">axym -p "summarize uncommitted changes"
axym web --host 0.0.0.0 --pin 4821</pre></div>
</div>
<p class="small muted">The remote bridge is tracked under <strong>T-050</strong>. Treat mobile connectivity and TLS preview as experimental until the feature is marked generally available.</p>

<h2 id="provider-snippets">Provider snippets</h2>
<p>These are keyless: authentication belongs to the CLI you already installed. Pick the provider on your machine and copy the snippet.</p>
<div class="tabs" data-tabs="providers" role="tablist" aria-label="Provider snippets">
  <button type="button" class="tab active" data-tab="claude" role="tab" aria-selected="true">Claude Code</button>
  <button type="button" class="tab" data-tab="codex" role="tab" aria-selected="false" tabindex="-1">Codex</button>
  <button type="button" class="tab" data-tab="agy" role="tab" aria-selected="false" tabindex="-1">Antigravity</button>
  <button type="button" class="tab" data-tab="gemini" role="tab" aria-selected="false" tabindex="-1">Gemini / OpenCode</button>
</div>
<div data-panels="providers">
  <div class="tab-panel active" data-panel="claude" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Claude Code</span><button type="button" class="copy-btn" data-copy="prov-claude"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="prov-claude"><span class="tok-com"># Auto-detected from PATH — no key to configure</span>
axym doctor
axym --provider claude --mode plan
axym -p "summarize uncommitted changes"

<span class="tok-com"># Inside the session</span>
/review
/pipeline</pre></div></div>
  </div>
  <div class="tab-panel" data-panel="codex" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Codex</span><button type="button" class="copy-btn" data-copy="prov-codex"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="prov-codex"><span class="tok-com"># Auto-detected from PATH</span>
axym --provider codex --mode plan
/race
/health

<span class="tok-com"># Headless</span>
axym -p "add rate limiting and tests" --provider codex</pre></div></div>
  </div>
  <div class="tab-panel" data-panel="agy" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Antigravity (agy)</span><button type="button" class="copy-btn" data-copy="prov-agy"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="prov-agy"><span class="tok-com"># Auto-detected from PATH</span>
axym --provider agy --mode plan
/accounts
/race

<span class="tok-com"># Register a private CLI if discovery misses it:</span>
<span class="tok-com"># ~/.axym/providers.json</span></pre></div></div>
  </div>
  <div class="tab-panel" data-panel="gemini" role="tabpanel">
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Gemini / OpenCode</span><button type="button" class="copy-btn" data-copy="prov-gemini"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="prov-gemini"><span class="tok-com"># Either CLI works as a drop-in provider</span>
axym --provider gemini --mode plan
axym --provider opencode -p "summarize uncommitted changes"

<span class="tok-com"># Switch models mid-session; the shared prefix is preserved</span>
/settings</pre></div></div>
  </div>
</div>
<div class="callout callout-tip">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-check-circle"/></svg>First desktop launch</p>
  <p>Provider discovery walks you through detected CLIs — no keys needed. Then type a goal, watch the pipeline DAG, and approve or reject at each gate after inspecting the diffs.</p>
</div>`
  },

  setup: {
    layout: 'docs',
    nav: 'docs',
    title: 'Setup Guide',
    eyebrow: 'Providers, accounts, trust zones',
    description: 'Configure Axym providers, account pooling, trust zones, file gates and the remote bridge.',
    keywords: 'multi account pooling trust zone security files mobile remote t-050 policy workspace.json providers',
    html: `<h1>Setup Guide</h1>
<p class="lead">Axym discovers the agent CLIs already on your <code>PATH</code>. Setup is about choosing accounts, defining trust boundaries and deciding how much the agent may do — not about pasting API keys.</p>

<div class="callout callout-security">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-shield"/></svg>ADR-0022 · zero static API keys</p>
  <p>Provider authentication stays with the native CLI you installed. Axym shells out to it through the permission gate; it does not store or forward a static key. Register private CLIs in <code>~/.axym/providers.json</code> if they are not auto-detected.</p>
</div>

<h2 id="setup-topics">Four setup topics</h2>
<div class="tabs" data-tabs="setup" role="tablist" aria-label="Setup topics">
  <button type="button" class="tab active" data-tab="pooling" role="tab" aria-selected="true">Multi-Account Pooling</button>
  <button type="button" class="tab" data-tab="trust" role="tab" aria-selected="false" tabindex="-1">Trust Zones</button>
  <button type="button" class="tab" data-tab="security" role="tab" aria-selected="false" tabindex="-1">Security &amp; /files</button>
  <button type="button" class="tab" data-tab="mobile" role="tab" aria-selected="false" tabindex="-1">Mobile Remote · T-050</button>
</div>
<div data-panels="setup">
  <div class="tab-panel active" data-panel="pooling" role="tabpanel">
    <h3>One account is a starting point, not a ceiling</h3>
    <p>Axym keys accounts as <code>provider:label</code> — for example <code>claude:work-1</code>, <code>codex:personal</code> or <code>agy:client-a</code>. Each carries its own zone, model preference and quota state. When one drains, the rotation policy picks the next eligible account.</p>
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">account pooling</span><button type="button" class="copy-btn" data-copy="setup-accounts"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="setup-accounts">axym doctor                       <span class="tok-com"># detect provider CLIs + accounts</span>
axym --provider claude --mode plan   <span class="tok-com"># pick a provider, read-only planning</span>
/accounts                            <span class="tok-com"># list keys, zones, quota</span>
/race                                <span class="tok-com"># compare providers before committing</span></pre></div></div>
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
          <span class="zone-chip on" data-zone="personal" role="button" tabindex="0" aria-pressed="true">personal</span>
          <span class="zone-chip" data-zone="work" role="button" tabindex="0" aria-pressed="false">work</span>
          <span class="zone-chip" data-zone="client" role="button" tabindex="0" aria-pressed="false">client</span>
        </div>
        <div class="toggle-row"><span class="t-label">Pinned account<small>Empty = automatic selection</small></span><select class="select" id="pol-pinned" aria-label="Pinned account"><option value="">— none —</option><option value="claude:work-1">claude:work-1</option><option value="codex:personal">codex:personal</option><option value="agy:client-a">agy:client-a</option></select></div>
        <div class="toggle-row"><span class="t-label">Rotation policy<small>How the next account is chosen</small></span><select class="select" id="pol-rotation" aria-label="Rotation policy"><option value="sticky_drain_first">sticky_drain_first</option><option value="round_robin">round_robin</option></select></div>
        <div class="toggle-row"><span class="t-label">Cross-zone spillover<small>Allow a zone outside the allow-list</small></span><label class="switch"><input type="checkbox" id="pol-spillover" aria-label="Allow cross-zone spillover"><span aria-hidden="true"></span></label></div>
        <div class="toggle-row"><span class="t-label">Strict Tier 2 approval<small>Require explicit approval for Tier 2 actions</small></span><label class="switch"><input type="checkbox" id="pol-strict2" aria-label="Strict Tier 2 approval"><span aria-hidden="true"></span></label></div>
      </div>
      <div class="panel">
        <h3>.axym/workspace.json</h3>
        <p class="small muted">Updates live as you change the policy. Copy it into your project root.</p>
        <pre class="json-preview" id="policy-json" aria-live="polite"></pre>
        <button type="button" class="btn btn-secondary btn-sm" style="margin-top:.75rem" data-copy="policy-json"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy JSON</button>
      </div>
    </div>
  </div>

  <div class="tab-panel" data-panel="security" role="tabpanel">
    <h3>Every diff passes through a gate</h3>
    <p><code>/files</code> is the read-only ledger of what the agent touched: stage, path, action and gate. Writes are gated by review; a Tier 3 freeze blocks egress entirely when the environment demands it. Nothing leaves the gate without evidence attached.</p>
    <div class="table-wrap" tabindex="0" role="region" aria-label="Security controls">
      <table><thead><tr><th>Control</th><th>What it guarantees</th></tr></thead><tbody>
        <tr><td><code>/files</code></td><td>Complete, readable ledger of creates and edits with their gate status.</td></tr>
        <tr><td>Approval gates</td><td>You inspect file diffs and tool-execution requests before they touch the working tree.</td></tr>
        <tr><td>Tier 3 Freeze Card</td><td>Egress is blocked and the turn is interrupted; the reason is recorded on every terminal path.</td></tr>
        <tr><td>Native-provider boundary</td><td>Provider CLIs keep their own credentials; Axym holds no static key.</td></tr>
      </tbody></table>
    </div>
    <p class="small muted">Builds are ad-hoc signed, not notarized. On macOS, clear quarantine once with <code>xattr -d com.apple.quarantine &lt;binary&gt;</code> if Gatekeeper blocks the first launch.</p>
  </div>

  <div class="tab-panel" data-panel="mobile" role="tabpanel">
    <h3>Drive the TUI from your phone</h3>
    <p>The remote bridge (T-050) serves the running TUI over TLS with a PIN gate and a QR handoff. Start it from the machine that owns the project:</p>
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">remote bridge</span><button type="button" class="copy-btn" data-copy="setup-remote"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="setup-remote">axym web --host 0.0.0.0 --pin 4821   <span class="tok-com"># scan the QR code from your phone</span>
/health                              <span class="tok-com"># runtime health + connection state</span></pre></div></div>
    <p>The bridge is local-first: the session stays on your workstation, and the phone is a view plus an approval surface.</p>
    <div class="callout callout-warning">
      <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-alert"/></svg>Experimental</p>
      <p>Mobile connectivity and the TLS preview are tracked under <strong>T-050</strong>. Treat them as experimental until the release notes mark them generally available.</p>
    </div>
  </div>
</div>

<h2 id="first-project">Configure a project</h2>
<p>Drop <code>.axym.yaml</code> at the project root to describe the stack, style guide, forbidden libraries and secret names. The same file is read by Desktop and TUI.</p>
<div class="code-shell"><div class="code-head"><span class="code-lang">yaml</span><span class="code-title">.axym.yaml</span><button type="button" class="copy-btn" data-copy="setup-yaml"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="setup-yaml">stack:
  runtime: node
  test: vitest
style: "2-space indent, semicolons, explicit return types"
forbidden_libs:
  - "lodash"
secrets:
  - "AXYM_*"
policy:
  max_review_depth: deep
  require_evidence: true</pre></div></div>`
  },

  configuration: {
    layout: 'docs',
    nav: 'docs',
    title: 'Configuration',
    eyebrow: 'Settings and standing invariants',
    description: 'Reference for Axym project settings, workspace policy and the standing invariants enforced by the runtime.',
    keywords: 'settings axym.yaml adr-0021 adr-0022 adr-0007 legacy_frozen invariants configuration',
    html: `<h1>Configuration</h1>
<p class="lead">Project-level settings plus the standing invariants that no prompt, plugin or mode can override. Type below to filter the reference.</p>
<label class="visually-hidden" for="config-filter">Filter settings</label>
<input class="filter-input" id="config-filter" data-filter-table="config-table" type="search" placeholder="Filter settings — try “zone”, “cache”, “provider”…">
<div class="table-wrap" tabindex="0" role="region" aria-label="Configuration reference">
  <table id="config-table">
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
  </table>
</div>
<p class="small muted">Want to try these interactively? The <a href="#setup">Setup Guide</a> has a live <code>.axym/workspace.json</code> policy builder.</p>

<h2 id="project-config">Project config example</h2>
<div class="code-shell"><div class="code-head"><span class="code-lang">yaml</span><span class="code-title">.axym.yaml — project root</span><button type="button" class="copy-btn" data-copy="config-yaml"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="config-yaml">stack:
  runtime: node
  test: vitest
style: "2-space indent, semicolons, explicit return types"
forbidden_libs:
  - "lodash"
secrets:
  - "AXYM_*"
policy:
  max_review_depth: deep
  require_evidence: true</pre></div></div>

<h2 id="standing-invariants">Standing invariants</h2>
<p>These are not preferences. They are enforced by the runtime.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="Standing invariants">
  <table>
    <thead><tr><th>Invariant</th><th>Rule</th><th>Enforced by</th></tr></thead>
    <tbody>
      <tr><td><strong>ADR-0021</strong></td><td>Priority task steering stays inside its boundaries; it does not silently import workflow-scope authorization.</td><td>Priority queue + steering tests</td></tr>
      <tr><td><strong>ADR-0022</strong></td><td>Zero static API keys. Provider credentials stay with the native CLI behind the permission gate.</td><td>Provider layer + docs gate</td></tr>
      <tr><td><strong>ADR-0007</strong></td><td>Typed command contract: idempotency keys, expected sequence numbers and explicit event shapes.</td><td>Command/event contract tests</td></tr>
    </tbody>
  </table>
</div>
<div class="callout callout-warning">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-alert"/></svg>Do not widen a gate</p>
  <p>Quality checks are ratchets — they only get stricter. A build is published only after every check passes.</p>
</div>`
  },

  features: {
    layout: 'marketing',
    nav: 'docs',
    title: 'Features',
    eyebrow: 'Capability showcase',
    description: "One calm page, three bands: a live doctor console, a five-chapter walkthrough of one session end to end, and a scannable command index with honest limitations — every capability one row and one drawer away.",
    keywords: "features TUI catalog commands slash commands sessions providers models failover modes permissions workspaces pipeline evidence review security skills product-thinking engineering-intelligence break-it-qa council race solve queue cache handoff verification remote web phone keyboard shortcuts runs parallel isolated worktrees integration ship pipeline mux panes anti-hang cost routing",
    html: `<div class="fx-page">
<div class="fx-progress" aria-hidden="true"><i></i></div>
<div class="fx-hero fx-hero-calm">
    <div class="container fx-hero-inner">
      <p class="eyebrow" data-fx-reveal><span class="dot" aria-hidden="true"></span>Axym TUI <span class="mono" data-release-version="tui">v0.24.0</span> · wraps claude, codex, opencode · 0 API keys</p>
      <h1 data-fx-reveal style="--fx-i:1">Build with autonomy.<br><em>Ship with confidence.</em></h1>
      <p class="fx-hero-lead" data-fx-reveal style="--fx-i:2">Wrap <code>claude</code>, <code>codex</code> and <code>opencode</code> with zero extra API keys — adding parallel worktrees, live mux panes, a local MCP firewall, mobile QA and verifiable proof.</p>
      <div class="fx-hero-install" data-fx-reveal style="--fx-i:3">
        <div class="code-shell code-shell-slim">
          <div class="code-head"><span class="code-lang">shell</span><span class="code-title">install · TUI</span><button type="button" class="copy-btn" data-copy="install-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
          <div class="code-body"><pre id="install-command" data-install-output="macos_arm">curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.24.0/axym-0.24.0-macos.tar.gz
tar -xzf axym-0.24.0-macos.tar.gz && ./axym-macos-arm64 --install</pre></div>
        </div>
        <p class="small muted fx-install-note">Linux tarball and Windows zip ship in the same release — <a href="#quickstart">Quick Start</a> covers every platform.</p>
      </div>
      <div class="fx-boot" data-fx-reveal style="--fx-i:4">
        <div class="fx-vt-bar"><i></i><i></i><i></i><span>axym doctor — live console</span><em class="fx-live" aria-hidden="true">LIVE</em></div>
        <p class="visually-hidden">Live console preview: axym doctor detects the agent CLIs you already have; axym ship runs the governed plan-to-approval pipeline; parallel runs and council merge results with recorded evidence.</p>
        <pre class="fx-boot-screen" aria-hidden="true">axym doctor — live console</pre>
      </div>
      <p class="fx-meta-line" data-fx-reveal style="--fx-i:5" role="list" aria-label="Runtime facts">
        <span role="listitem"><span data-capability-count>84</span> curated capabilities</span>
        <span role="listitem">0 API keys</span>
        <span role="listitem">TELEMETRY · NONE</span>
        <span role="listitem">GATES · HUMAN</span>
        <span role="listitem">EVIDENCE · HASH-CHAINED</span>
      </p>
      <a class="fx-scrollcue" href="#features/how-it-works" aria-label="Scroll to how it works"><svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></a>
    </div>
  </div>

  <nav class="fx-localnav" aria-label="Feature showcase sections">
    <div class="container fx-localnav-inner">
      <a href="#features/how-it-works" data-fx-spy="how-it-works">How it works</a>
      <a href="#features/catalog" data-fx-spy="catalog">Command index</a>
      <a href="#features/start-here" data-fx-spy="start-here">Start here</a>
    </div>
  </nav>

  <section class="section section-story" id="how-it-works">
    <div class="container">
      <div class="section-head" data-fx-reveal>
        <p class="section-kicker">How it works</p>
        <h2>One session, end to end.</h2>
        <p>Five chapters follow a single engineering session — from a plain-English goal to independently verified proof — and weave in all twelve flagship pillars in the order you would actually meet them.</p>
      </div>
      <div id="story-root" aria-live="polite"><p class="muted small">Loading the walkthrough…</p></div>
    </div>
  </section>

  <section class="section" id="catalog">
    <div class="container">
      <div class="section-head" data-fx-reveal>
        <p class="section-kicker">Command index</p>
        <h2>Every capability, scannable in one place.</h2>
        <p>Search by name or command, or filter by the job you are doing. Every row answers one question — what does this do for me — and opens an inline detail drawer with the honest limitations included. New in v0.24.0: parallel mux panes, the /ship pipeline, cost routing, multi-account isolation and the anti-hang guard.</p>
      </div>
      <div class="fx-toolbar" data-fx-reveal>
        <label class="visually-hidden" for="feature-filter">Filter the capability catalog</label>
        <input class="filter-input fx-search" id="feature-filter" data-filter-grid="fx-catalog" data-filter-noun="capabilities" type="search" placeholder="Search — try “review”, “worktree”, “/accounts”, “/remote”…" autocomplete="off" spellcheck="false">
        <div class="fx-pills" id="fx-pills" role="group" aria-label="Filter capabilities"></div>
        <div class="fx-lenses" id="fx-lenses" role="group" aria-label="Filter by developer outcome lens and maturity"></div>
        <p class="fx-count" id="fx-count" role="status">Loading the capability catalog…</p>
      </div>
      <div class="fx-grid" id="fx-catalog"><p class="muted small">Loading the capability catalog…</p></div>
      <div class="fx-showall" id="fx-showall" hidden>
        <button type="button" class="btn btn-secondary btn-lg" id="fx-showall-btn">Show all capabilities</button>
      </div>
      <p class="fx-maturity small muted"><span class="badge badge-active">Stable</span> ships in v0.24.0 &nbsp;·&nbsp; <span class="badge badge-pending">Experimental</span> limited surfaces, tracked (T-050) &nbsp;·&nbsp; <span class="badge badge-neutral">Roadmap</span> not yet shipped</p>
    </div>
  </section>

  <section class="section" id="start-here">
    <div class="container">
      <div class="section-head" data-fx-reveal>
        <p class="section-kicker">Two minutes, five moves</p>
        <h2>Start here.</h2>
        <p>You do not need to read every capability to begin. These five moves cover the common path from a fresh download to a verified change — with the exact commands written out so you can copy them.</p>
      </div>
      <ol class="steps-plain" data-fx-reveal>
        <li><span class="step-n" aria-hidden="true">1</span><div class="step-copy"><b>Confirm your tools</b><p><code>axym doctor</code> detects the agent CLIs you already have installed. Axym needs no API key of its own.</p></div></li>
        <li><span class="step-n" aria-hidden="true">2</span><div class="step-copy"><b>Start a session</b><p>Run <code>axym</code> in your project and type <code>/</code> to see every command with tab completion.</p></div></li>
        <li><span class="step-n" aria-hidden="true">3</span><div class="step-copy"><b>Choose how much freedom to give</b><p><kbd class="kbd">Shift+Tab</kbd> cycles Plan → Ask → Edit → Auto. Start in Plan when you want to read before writing.</p></div></li>
        <li><span class="step-n" aria-hidden="true">4</span><div class="step-copy"><b>Verify the result</b><p>Use <code>/review</code>, <code>/security</code> and <code>/test</code>; the Result Ledger records what actually ran and marks unverified work honestly.</p></div></li>
        <li><span class="step-n" aria-hidden="true">5</span><div class="step-copy"><b>Scale out when needed</b><p>Use <code>/runs start "&lt;goal&gt;" --worktree</code> for parallel features, then <code>/runs switch</code> to move between them safely.</p></div></li>
      </ol>
      <div class="code-shell" data-fx-reveal><div class="code-head"><span class="code-lang">shell</span><span class="code-title">first session</span><button type="button" class="copy-btn" data-copy="feat-first-session"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-first-session">axym doctor
cd /path/to/your/project
axym
# inside the session
/health
/mode plan
/review</pre></div></div>
    </div>
  </section>

  <section class="section fx-cta">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2 id="try-it">Try one feature in the next five minutes</h2>
          <p>Install the TUI, run <code>axym doctor</code>, then type <code>/</code> inside a session. Every capability on this page is one command away — no Axym account, no hosted service, with multi-account provider slots ready via <code>/accounts</code>.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-primary" href="#quickstart">Quick start <svg class="icon"><use href="#i-arrow-right"/></svg></a>
          <a class="btn btn-secondary" href="#releases">Download <svg class="icon"><use href="#i-download"/></svg></a>
        </div>
      </div>
    </div>
  </section>
</div>`
  },
  releases: {
    layout: 'docs',
    nav: 'releases',
    title: 'Releases & Downloads',
    eyebrow: 'Verified downloads',
    description: 'Download Axym TUI and Desktop builds with published SHA-256 checksums, support matrix and verified release history.',
    keywords: 'download install sha256 verify version support matrix desktop tui artifacts releases',
    html: `<h1>Releases &amp; Downloads</h1>
<p class="lead">Versions and checksums below are read from the published release manifest. If a platform has no published asset, you see an explicit “Pending release build” badge — never a dead URL or an invented hash.</p>

<h2 id="downloads">Downloads</h2>
<p>Standalone TUI archives and the Desktop app. The table further down carries full SHA-256 values and direct links.</p>
<div id="downloads-grid"><p class="muted small">Loading verified release artifacts…</p></div>

<h2 id="support-matrix">Version &amp; support matrix</h2>
<div class="table-wrap" tabindex="0" role="region" aria-label="Version and support matrix">
  <table>
    <thead><tr><th>Product</th><th>Latest</th><th>Platforms</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Axym TUI</td><td><code>v0.24.0</code></td><td>macOS (arm64 + x64), Linux x86_64, Windows x86_64</td><td><span class="badge badge-active">active · 2026-11-26</span></td></tr>
      <tr><td>Axym Desktop</td><td><code>v12.17.0</code></td><td>macOS universal (.dmg)</td><td><span class="badge badge-active">active · 2026-11-04</span></td></tr>
      <tr><td>Axym Desktop · cross-OS</td><td><code>v12.16.0</code></td><td>Linux x86_64, Windows x86_64</td><td><span class="badge badge-info">latest cross-platform build</span></td></tr>
      <tr><td>Supported range</td><td><code>12.13.x – 12.17.x</code></td><td>—</td><td><span class="badge badge-active">supported</span></td></tr>
      <tr><td>End of life</td><td><code>12.12.x and earlier</code></td><td>—</td><td><span class="badge badge-pending">EOL</span></td></tr>
    </tbody>
  </table>
</div>
<p class="small muted">Desktop 12.17.0 ships macOS-only this cycle; Linux and Windows desktop artifacts remain at 12.16.0 until the next cross-platform build.</p>

<h2 id="desktop-macos">Desktop · macOS install</h2>
<p>The macOS installer is published with <code>v12.17.0</code>. Pin the version shown below so you always get the matching build.</p>
<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Desktop · macOS</span><button type="button" class="copy-btn" data-copy="desktop-install"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="desktop-install">curl -fsSL https://github.com/irshadpc/axym-release/releases/download/desktop-v12.17.0/install-macos.sh | bash</pre></div></div>
<p class="small muted">The script downloads the universal <code>.dmg</code>, installs to <code>/Applications</code>, and clears the Gatekeeper quarantine flag. Builds are ad-hoc signed, not notarized.</p>

<h2 id="verify-download">Verify a download</h2>
<p>Every release carries <code>SHA256SUMS.txt</code>; TUI releases also include a machine-readable <code>release-manifest.json</code> with version, build metadata and per-file hashes. Put the checksum file beside your download and run:</p>
<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">verify</span><button type="button" class="copy-btn" data-copy="verify-cmd"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="verify-cmd">shasum -a 256 -c --ignore-missing SHA256SUMS.txt

<span class="tok-com"># Or check a single file directly</span>
shasum -a 256 axym-0.24.0-macos.tar.gz</pre></div></div>

<h2 id="published-artifacts">Published artifacts</h2>
<p>Hashes and links below come straight from the release manifests. Copy a full SHA-256 value with the button in each row.</p>
<div id="artifacts-grid"><p class="muted small">Loading published artifacts…</p></div>

<h2 id="history">Release history</h2>
<p>Published releases, newest first.</p>
<ol class="timeline" id="release-timeline">
  <li class="timeline-item"><div class="timeline-head"><span class="timeline-version">tui-v0.24.0</span><span class="timeline-date">2026-11-26</span></div><p class="timeline-note">Parallel isolated runs, the /ship governed pipeline, Flow OS, a zero-trust MCP firewall and calm, anti-hang resilience.</p></li>
</ol>`
  },

  operations: {
    layout: 'docs',
    nav: 'docs',
    title: 'Operations',
    eyebrow: 'Troubleshooting',
    description: 'Troubleshoot first launch, provider discovery and platform dependencies.',
    keywords: 'troubleshooting gatekeeper quarantine provider path platform dependency commands operations',
    html: `<h1>Operations</h1>
<p class="lead">Every published build passes local verification before release. No hosted CI dependency.</p>

<h2 id="troubleshooting">Troubleshooting</h2>
<div class="accordion">
  <div class="acc-item">
    <button type="button" class="acc-trigger" aria-expanded="false" aria-controls="acc-1">macOS says the app “is damaged” or “unknown publisher”<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
    <div class="acc-panel" id="acc-1">Builds are ad-hoc signed, not notarized. Clear quarantine once with <code>sudo xattr -dr com.apple.quarantine /Applications/Axym.app</code>, then on Sequoia/Tahoe open <strong>System Settings → Privacy &amp; Security → Open Anyway</strong>. For the TUI binary, use <code>xattr -d com.apple.quarantine axym-macos-arm64</code>.</div>
  </div>
  <div class="acc-item">
    <button type="button" class="acc-trigger" aria-expanded="false" aria-controls="acc-2">No provider detected by axym doctor<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
    <div class="acc-panel" id="acc-2">The TUI needs at least one agent CLI on your <code>PATH</code>. Install one of <code>claude</code>, <code>opencode</code>, <code>codex</code>, <code>gemini</code>, <code>cursor-agent</code>, <code>copilot</code> or <code>agy</code>. Private CLIs can be registered in <code>~/.axym/providers.json</code>. No API key is required by Axym itself.</div>
  </div>
  <div class="acc-item">
    <button type="button" class="acc-trigger" aria-expanded="false" aria-controls="acc-3">Desktop Linux fails to launch<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
    <div class="acc-panel" id="acc-3">Minimal and server images need a system-tray library: <code>sudo apt install libayatana-appindicator3-1</code> (Fedora: <code>sudo dnf install libayatana-appindicator-gtk3</code>). Ubuntu Desktop already includes it. For older AppImage builds, <code>sudo apt install libfuse2</code>.</div>
  </div>
  <div class="acc-item">
    <button type="button" class="acc-trigger" aria-expanded="false" aria-controls="acc-4">Desktop Windows shows a WebView2 error<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
    <div class="acc-panel" id="acc-4">Install the WebView2 runtime. It ships with Windows 10 (1803+) and Windows 11, but stripped or enterprise images may need the standalone installer.</div>
  </div>
  <div class="acc-item">
    <button type="button" class="acc-trigger" aria-expanded="false" aria-controls="acc-5">A gate failed locally — what do I trust?<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
    <div class="acc-panel" id="acc-5">Trust the gate, not the claim. Re-run the smallest failing check, read the real output, and only then claim the change is verified. A report without an executed command behind it is not evidence.</div>
  </div>
</div>

<h2 id="scope">Platform scope</h2>
<p>The terminal build is the primary target: new features, fixes and QA land there first. Desktop and mobile parity is follow-up work — a terminal verification claim is never widened into a cross-platform claim.</p>`
  }
};

window.AXYM_NAV_ORDER = ['home', 'architecture', 'quickstart', 'setup', 'configuration', 'features', 'releases', 'operations'];
