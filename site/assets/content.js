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
      <p class="hero-lead">Local-first intelligence. Governed execution. Give Axym a goal in plain English and it plans, implements, reviews, secures and tests the work — with human approval gates and an evidence trail for every decision.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#releases">Download Axym <svg class="icon" aria-hidden="true"><use href="#i-download"/></svg></a>
        <a class="btn btn-secondary btn-lg" href="#quickstart">Read the docs <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></a>
        <a class="btn btn-tertiary btn-lg" href="#architecture">View architecture</a>
      </div>
      <ul class="hero-meta">
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
                <a class="btn btn-tertiary" href="#features/tui-workspaces-engineering-views">Explore engineering views →</a>
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
                <a class="btn btn-tertiary" href="#features/tui-input-editor">Explore the composer →</a>
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
                <a class="btn btn-tertiary" href="#features/tui-verification-review-delivery">Explore verification →</a>
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
                <a class="btn btn-tertiary" href="#features/tui-multi-model-fleet-automation">Explore fleet &amp; automation →</a>
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
                <a class="btn btn-tertiary" href="#features/tui-collaboration-remote-handoff">Explore continuity →</a>
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
      <a class="path-card" href="#features/tui-input-editor"><span class="path-card-kicker">Writing code</span><b>Make the composer yours</b><span class="path-card-copy">Readline keys, Vim bindings, @file and image inputs.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/tui-verification-review-delivery"><span class="path-card-kicker">Shipping a change</span><b>Prove it before you ship</b><span class="path-card-copy">Review, security, real test output and reversible edits.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/tui-multi-model-fleet-automation"><span class="path-card-kicker">Working in parallel</span><b>Run more than one model</b><span class="path-card-copy">Council, isolated worktrees, headless runs and steering.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
      <a class="path-card" href="#features/tui-collaboration-remote-handoff"><span class="path-card-kicker">On call or pairing</span><b>Keep work in motion</b><span class="path-card-copy">Phone approvals, read-only viewers, notifications and handoff.</span><span class="path-card-arrow" aria-hidden="true">→</span></a>
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
    description: "A showcase of every curated Axym capability in 10 groups: six ideas that explain the product, five mechanism moments, an interactive filterable catalog and the complete reference — what each capability does, why it exists and where to use it.",
    keywords: "features TUI catalog commands slash commands sessions providers models failover modes permissions workspaces pipeline evidence review security skills product-thinking engineering-intelligence break-it-qa council race solve queue cache handoff verification remote web phone keyboard shortcuts runs parallel isolated worktrees integration ship pipeline mux panes anti-hang cost routing",
    html: `<div class="fx-page">
<div class="fx-progress" aria-hidden="true"><i></i></div>
<div class="fx-hero">
    <div class="fx-scan" aria-hidden="true"></div>
    <div class="container fx-hero-inner">
      <p class="eyebrow" data-fx-reveal><span class="dot" aria-hidden="true"></span>Axym TUI v0.24.0 · Capability showcase</p>
      <h1 data-fx-reveal style="--fx-i:1">Every capability.<br><em>One promise: proof.</em></h1>
      <p class="fx-hero-lead" data-fx-reveal style="--fx-i:2">Axym is a local-first engineering system. Give it a goal in plain English and it plans, implements, reviews and verifies the work — on your machine, behind approval gates you control. This page is every capability that makes that real, presented the way you would actually use it.</p>
      <div class="fx-hero-actions" data-fx-reveal style="--fx-i:3">
        <a class="btn btn-primary btn-lg" href="#features/feature-theater">See it work <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></a>
        <a class="btn btn-secondary btn-lg" href="#features/catalog">Browse the catalog</a>
        <a class="btn btn-tertiary btn-lg" href="#quickstart">Install in two minutes</a>
      </div>
      <div class="fx-boot" data-fx-reveal style="--fx-i:4">
        <div class="fx-vt-bar"><i></i><i></i><i></i><span>axym — live console</span><em class="fx-live" aria-hidden="true">LIVE</em></div>
        <p class="visually-hidden">Live console preview: axym doctor detects installed providers; axym ship runs the governed plan-to-approval pipeline; parallel runs and council merge results with recorded evidence.</p>
        <pre class="fx-boot-screen" aria-hidden="true">axym — live console</pre>
      </div>
      <div class="fx-hud" data-fx-reveal style="--fx-i:5" role="list" aria-label="Runtime status highlights">
        <span class="fx-hud-item" role="listitem"><i class="fx-led" aria-hidden="true"></i>LOCAL RUNTIME · ONLINE</span>
        <span class="fx-hud-item" role="listitem"><i class="fx-led fx-led-dim" aria-hidden="true"></i>TELEMETRY · NONE</span>
        <span class="fx-hud-item" role="listitem"><i class="fx-led fx-led-amber" aria-hidden="true"></i>GATES · HUMAN</span>
        <span class="fx-hud-item" role="listitem"><i class="fx-led" aria-hidden="true"></i>EVIDENCE · HASH-CHAINED</span>
      </div>
      <dl class="fx-stats" data-fx-reveal style="--fx-i:6">
        <div class="fx-stat"><dt class="mono" data-count="84" data-stat="capabilities">84</dt><dd>curated capabilities</dd></div>
        <div class="fx-stat"><dt class="mono" data-count="10" data-stat="groups">10</dt><dd>groups, one story each</dd></div>
        <div class="fx-stat"><dt class="mono" data-count="121">121</dt><dd>tab-completed commands</dd></div>
        <div class="fx-stat"><dt class="mono" data-count="0">0</dt><dd>API keys required</dd></div>
      </dl>
      <a class="fx-scrollcue" href="#features/overview" aria-label="Scroll to the overview"><svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></a>
    </div>
  </div>

  <nav class="fx-localnav" aria-label="Feature showcase sections">
    <div class="container fx-localnav-inner">
      <a href="#features/overview" data-fx-spy="overview">Overview</a>
      <a href="#features/feature-theater" data-fx-spy="feature-theater">See it work</a>
      <a href="#features/catalog" data-fx-spy="catalog">All capabilities</a>
      <a href="#features/start-here" data-fx-spy="start-here">Start here</a>
      <a href="#features/reference" data-fx-spy="reference">Reference</a>
    </div>
  </nav>

  <section class="section" id="overview">
    <div class="container">
      <div class="section-head" data-fx-reveal>
        <p class="section-kicker">The shape of it</p>
        <h2>Six ideas explain almost everything.</h2>
        <p>The catalog runs deep, but the product is simple. Start with these six — every other capability on this page is a variation on one of them.</p>
      </div>
      <div class="fx-bento">
        <a class="fx-bento-card fx-b-lg" href="#features/tui-sessions-providers-models" data-fx-reveal>
          <div class="fx-bento-copy">
            <p class="fx-bento-kicker"><svg class="icon" aria-hidden="true"><use href="#i-cpu"/></svg>Sessions</p>
            <h3>Bring your own AI.</h3>
            <p>Axym drives the agent CLIs you already have — Claude, Codex, Gemini, OpenCode and more — through one consistent interface, and manages no API keys of its own. If a provider fails or hits a quota, the next one picks up mid-conversation.</p>
            <span class="fx-bento-link">Explore sessions &amp; models <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></span>
          </div>
          <div class="fx-vt" aria-hidden="true">
            <div class="fx-vt-bar"><i></i><i></i><i></i><span>axym doctor</span></div>
            <div class="fx-vt-body">
              <div class="fx-vt-line"><span class="ok">●</span> claude <em>stream-json · preferred</em></div>
              <div class="fx-vt-line"><span class="ok">●</span> codex <em>cli · available</em></div>
              <div class="fx-vt-line"><span class="ok">●</span> opencode <em>cli · available</em></div>
              <div class="fx-vt-line dim"><span>○</span> gemini <em>install to use</em></div>
              <div class="fx-vt-foot">keys 0 static · credentials stay with each CLI</div>
            </div>
          </div>
        </a>
        <a class="fx-bento-card fx-b-lg" href="#features/tui-verification-review-delivery" data-fx-reveal style="--fx-i:1">
          <div class="fx-bento-copy">
            <p class="fx-bento-kicker"><svg class="icon" aria-hidden="true"><use href="#i-file-check"/></svg>Verification</p>
            <h3>Proof, not promises.</h3>
            <p>Every turn closes with a Result Ledger — outcome, files touched, checks that actually ran. Review and security can run on a different AI than the one that wrote the code, and the run records whether that check was truly independent.</p>
            <span class="fx-bento-link">Explore verification <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></span>
          </div>
          <div class="fx-vt" aria-hidden="true">
            <div class="fx-vt-bar"><i></i><i></i><i></i><span>result ledger</span></div>
            <div class="fx-vt-body">
              <div class="fx-vt-line"><span class="ok">✓ VER</span> typecheck · 18 tests · build</div>
              <div class="fx-vt-line"><span class="ok">✓</span> review — independent provider</div>
              <div class="fx-vt-line warn"><span>▲</span> UNV unmeasured: performance</div>
              <div class="fx-vt-foot">OK · 2 files · 0 blockers · evidence recorded</div>
            </div>
          </div>
        </a>
        <a class="fx-bento-card" href="#features/tui-chat-transcript-results" data-fx-reveal style="--fx-i:2">
          <p class="fx-bento-kicker"><svg class="icon" aria-hidden="true"><use href="#i-message"/></svg>Transparency</p>
          <h3>Watch it work.</h3>
          <p>Real commands, real paths, real output — streamed while the agent works. Not a spinner.</p>
          <div class="fx-vt" aria-hidden="true">
            <div class="fx-vt-bar"><i></i><i></i><i></i><span>live session</span></div>
            <div class="fx-vt-body">
              <div class="fx-vt-line"><span class="ok">●</span> edit <em>src/app.ts +18 −2</em></div>
              <div class="fx-vt-line"><span class="ok">●</span> run <em>npm test · exit 0</em></div>
              <div class="fx-vt-foot">streaming · queued: 1 · gate: ready</div>
            </div>
          </div>
          <span class="fx-bento-link">Transcript &amp; results <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></span>
        </a>
        <a class="fx-bento-card" href="#features/feat-parallel-isolated-runs" data-fx-reveal style="--fx-i:3">
          <p class="fx-bento-kicker"><svg class="icon" aria-hidden="true"><use href="#i-fleet"/></svg>Scale</p>
          <h3>Parallel universes.</h3>
          <p>Run many goals at once, each in its own isolated worktree. Merging stays your decision.</p>
          <div class="fx-vt" aria-hidden="true">
            <div class="fx-vt-bar"><i></i><i></i><i></i><span>/runs</span></div>
            <div class="fx-vt-body">
              <div class="fx-vt-line"><span class="ok">●</span> 4f2a <em>wt-parallel-1</em></div>
              <div class="fx-vt-line"><span class="ok">●</span> 9c11 <em>wt-parallel-2</em></div>
              <div class="fx-vt-foot">isolation: per run · merge: human gate</div>
            </div>
          </div>
          <span class="fx-bento-link">Parallel runs <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></span>
        </a>
        <a class="fx-bento-card" href="#features/tui-collaboration-remote-handoff" data-fx-reveal style="--fx-i:4">
          <div class="fx-bento-copy">
            <p class="fx-bento-kicker"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>Presence</p>
            <h3>Approve from anywhere.</h3>
            <p>Pair your phone over QR. Same transcript, same approval gates — from the kitchen table.</p>
            <span class="fx-bento-link">Remote &amp; handoff <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></span>
          </div>
          <div class="fx-phone" aria-hidden="true">
            <div class="fx-phone-screen">
              <p class="fx-phone-head">Gate · review</p>
              <p class="fx-phone-diff"><b class="add">+18</b> <b class="del">−2</b> · 3 files</p>
              <div class="fx-phone-actions"><span class="yes">Approve</span><span>Reject</span></div>
            </div>
          </div>
        </a>
        <a class="fx-bento-card fx-b-wide" href="#features/tui-runtime-recovery-operations" data-fx-reveal style="--fx-i:5">
          <div class="fx-bento-copy">
            <p class="fx-bento-kicker"><svg class="icon" aria-hidden="true"><use href="#i-lock"/></svg>Trust</p>
            <h3>Local-first, by design.</h3>
            <p>The event store, evidence and approvals live on your disk next to your code. Nothing phones home.</p>
            <span class="fx-bento-link">Runtime &amp; operations <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></span>
          </div>
          <div class="fx-chips" aria-hidden="true">
            <span class="fx-chip"><b>0</b> static API keys</span>
            <span class="fx-chip"><b>SQLite</b> local event store</span>
            <span class="fx-chip"><b>none</b> telemetry egress</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section class="section" id="feature-theater">
    <div class="container">
      <div class="section-head" data-fx-reveal>
        <p class="section-kicker">Inside the machine</p>
        <h2>See the mechanism, not the marketing.</h2>
        <p>Five moments, chosen because they show how Axym actually behaves. Pick a chapter: each pairs a real terminal view with the reason the capability exists. Every command shown is part of v0.24.0.</p>
      </div>
      <div class="tour" data-fx-reveal>
        <div class="tour-rail" data-tabs="feature-theater" role="tablist" aria-label="Axym capability moments">
          <button type="button" class="tour-chapter" role="tab" id="ft-tab-turn" aria-selected="true" aria-controls="ft-panel-turn" data-tab="turn" tabindex="0"><span class="tour-chapter-num">01</span><span class="tour-chapter-copy"><b>One turn</b><small>Readable while it happens</small></span></button>
          <button type="button" class="tour-chapter" role="tab" id="ft-tab-failover" aria-selected="false" aria-controls="ft-panel-failover" data-tab="failover" tabindex="-1"><span class="tour-chapter-num">02</span><span class="tour-chapter-copy"><b>Failover</b><small>Keep the thread, change the model</small></span></button>
          <button type="button" class="tour-chapter" role="tab" id="ft-tab-proof" aria-selected="false" aria-controls="ft-panel-proof" data-tab="proof" tabindex="-1"><span class="tour-chapter-num">03</span><span class="tour-chapter-copy"><b>Proof</b><small>Claims with receipts</small></span></button>
          <button type="button" class="tour-chapter" role="tab" id="ft-tab-parallel" aria-selected="false" aria-controls="ft-panel-parallel" data-tab="parallel" tabindex="-1"><span class="tour-chapter-num">04</span><span class="tour-chapter-copy"><b>Parallel</b><small>Isolated worktrees, visible state</small></span></button>
          <button type="button" class="tour-chapter" role="tab" id="ft-tab-handoff" aria-selected="false" aria-controls="ft-panel-handoff" data-tab="handoff" tabindex="-1"><span class="tour-chapter-num">05</span><span class="tour-chapter-copy"><b>Hand off</b><small>Approve from anywhere</small></span></button>
        </div>
        <div class="showcase tour-showcase">
          <div class="showcase-bar"><span class="showcase-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="showcase-label">axym — capability moments</span></div>
          <div class="showcase-body" data-panels="feature-theater">
            <div class="tab-panel active" id="ft-panel-turn" role="tabpanel" aria-labelledby="ft-tab-turn" data-panel="turn">
              <div class="tour-panel-body">
                <div class="terminal"><div class="terminal-bar">~/src/payments — plan → edit — gated</div><div class="terminal-body"><pre>&gt; /po "add rate limiting to the public API"
  scope: 3 files · criteria set · 2 providers

  ● plan    scope and acceptance criteria
  ● edit    src/app.ts +18 −2   tests +6
  ✓ VER     typecheck · 18 tests · build
  ledger:  OK · 2 files · 0 blockers</pre></div><div class="terminal-rail"><span>Mode: <b>plan → edit</b></span><span>Gate: <b>human</b></span></div></div>
                <div class="tour-notes"><p class="tour-notes-kicker">Why it matters</p><p>You watch real commands, paths and output, then receive a Result Ledger — not a confident paragraph. Verification is a visible state, not an assumption.</p><p class="mono small">/po · /mode · Result Ledger · /review</p><a class="btn btn-tertiary" href="#features/tui-chat-transcript-results">Read how a turn works →</a></div>
              </div>
            </div>
            <div class="tab-panel" id="ft-panel-failover" role="tabpanel" aria-labelledby="ft-tab-failover" data-panel="failover" hidden>
              <div class="tour-panel-body">
                <div class="terminal"><div class="terminal-bar">axym doctor — provider discovery</div><div class="terminal-body"><pre>  claude    detected   stream-json   preferred
  codex     detected   cli           available
  opencode  detected   cli           available
  keys      0 static   credentials stay with each CLI

  quota wall → benched until reset
  handoff ≤2 KB → codex · model + effort changed
  conversation and context preserved</pre></div><div class="terminal-rail"><span>Failover: <b>classified</b></span><span>Telemetry: <b>none</b></span></div></div>
                <div class="tour-notes"><p class="tour-notes-kicker">Why it matters</p><p>A provider that fails or hits a quota is not the end of the session. The failure is classified, a cooldown is recorded, and the next provider receives a compact delta instead of a full transcript.</p><p class="mono small">axym doctor · /provider · /model · /effort · /priority</p><a class="btn btn-tertiary" href="#features/tui-sessions-providers-models">Read provider details →</a></div>
              </div>
            </div>
            <div class="tab-panel" id="ft-panel-proof" role="tabpanel" aria-labelledby="ft-tab-proof" data-panel="proof" hidden>
              <div class="tour-panel-body">
                <div class="terminal"><div class="terminal-bar">review — different provider than the coder</div><div class="terminal-body"><pre>  REVIEW   independent provider · fresh context
    src/app.ts:41  missing bound on retry count
    src/rate.ts:18  test covers happy path only

  VERIFY   exit 0 · 18 tests · 2 new
  EVIDENCE inspected · inferred · verified · failed
  UNV      unmeasured dimension left unscored</pre></div><div class="terminal-rail"><span>Independence: <b>labelled</b></span><span>Result: <b>evidence-backed</b></span></div></div>
                <div class="tour-notes"><p class="tour-notes-kicker">Why it matters</p><p>A second provider checks the author's work, and the run records whether it was truly independent. Unmeasured quality is marked UNV instead of being scored as perfect.</p><p class="mono small">/review · /security · /test · /evidence · /compare</p><a class="btn btn-tertiary" href="#features/tui-verification-review-delivery">Read verification details →</a></div>
              </div>
            </div>
            <div class="tab-panel" id="ft-panel-parallel" role="tabpanel" aria-labelledby="ft-tab-parallel" data-panel="parallel" hidden>
              <div class="tour-panel-body">
                <div class="terminal"><div class="terminal-bar">/runs — parallel governed runs</div><div class="terminal-body"><pre>&gt; /runs start "add rate limiting" --worktree
  run 4f2a  worktree wt-parallel-1
&gt; /runs start "migrate cache keys" --worktree
  run 9c11  worktree wt-parallel-2
&gt; /runs switch 4f2a
  visible: 4f2a · other run's events hidden

  /runs integrate 4f2a        # preview
  /runs integrate 4f2a --apply # explicit merge</pre></div><div class="terminal-rail"><span>Isolation: <b>per run</b></span><span>Integration: <b>human gate</b></span></div></div>
                <div class="tour-notes"><p class="tour-notes-kicker">Why it matters</p><p>Several features can progress without fighting over one working tree. Each run keeps its own events and staged files; switching runs never shows another run's state, and merging is a separate explicit act.</p><p class="mono small">/runs list · /runs start --worktree · /runs switch · /runs integrate</p><a class="btn btn-tertiary" href="#features/feat-parallel-isolated-runs">Read parallel run details →</a></div>
              </div>
            </div>
            <div class="tab-panel" id="ft-panel-handoff" role="tabpanel" aria-labelledby="ft-tab-handoff" data-panel="handoff" hidden>
              <div class="tour-panel-body">
                <div class="terminal"><div class="terminal-bar">/remote — live session on a phone</div><div class="terminal-body"><pre>&gt; /remote qr
  same transcript · same approval gates · steer or stop
  pair: Tailscale / Wi-Fi / tunnel · PIN-scoped
  devices: 1 connected · link revocable

&gt; /notify on
  turn finished · failed · all providers cooling

&gt; /handoff export
  session + run checkpoint → another machine</pre></div><div class="terminal-rail"><span>Session stays: <b>on workstation</b></span><span>Viewer: <b>scoped</b></span></div></div>
                <div class="tour-notes"><p class="tour-notes-kicker">Why it matters</p><p>Work outlasts the terminal. A phone becomes an approval surface, a read-only viewer lets collaborators follow safely, and explicit handoff moves a run between machines without copying loose state.</p><p class="mono small">/remote · /view · /notify · /detach · /handoff</p><a class="btn btn-tertiary" href="#features/tui-collaboration-remote-handoff">Read handoff details →</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fx-proof" data-fx-reveal id="proof-theater">
        <div class="fx-proof-head">
          <p class="section-kicker">Proof theater</p>
          <h3>Three flagship sequences. Every badge tells the truth.</h3>
          <p>A sequence shows <strong>Verified Recording</strong> only when a real capture file exists on disk — the build fails otherwise (ADR-0016). Until a capture is committed, each viewer says <strong>Illustrative Schematic</strong> and shows the documented behaviour instead of pretending. Install a build, run <code>scripts/capture-proof.sh</code>, and a schematic becomes a recording in under five minutes.</p>
        </div>
        <div id="fx-proof-root"><p class="muted small">Loading proof sequences…</p></div>
        <div class="fx-proof-verify">
          <p class="fx-proof-verify-title">Verify it yourself in 60 seconds</p>
          <div class="fx-proof-verify-cmds" id="fx-proof-verify-cmds"><p class="muted small">Loading verify commands…</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="catalog">
    <div class="container">
      <div class="section-head" data-fx-reveal>
        <p class="section-kicker">The catalog</p>
        <h2>The full catalog. On one canvas.</h2>
        <p>Filter by the job you are doing, or search by name and command. Every card opens an inline detail drawer — what it is, why it exists, and exactly where to use it. New in v0.24.0: parallel mux panes, the /ship pipeline, cost routing, multi-account isolation and the anti-hang guard.</p>
      </div>
      <div class="fx-toolbar" data-fx-reveal>
        <label class="visually-hidden" for="feature-filter">Filter the capability catalog</label>
        <input class="filter-input fx-search" id="feature-filter" data-filter-grid="fx-catalog" data-filter-noun="capabilities" type="search" placeholder="Search — try “review”, “worktree”, “/accounts”, “/remote”…" autocomplete="off" spellcheck="false">
        <div class="fx-pills" id="fx-pills" role="group" aria-label="Filter capabilities"></div>
        <p class="fx-count" id="fx-count" role="status">Loading the capability catalog…</p>
      </div>
      <div class="fx-grid" id="fx-catalog"><p class="muted small">Loading the capability catalog…</p></div>
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
      <div class="step-line" data-fx-reveal>
        <div class="step"><div class="step-num">1</div><div class="step-title">Confirm your tools</div><div class="step-body"><code>axym doctor</code> detects the agent CLIs you already have installed. Axym needs no API key of its own.</div></div>
        <div class="step"><div class="step-num">2</div><div class="step-title">Start a session</div><div class="step-body">Run <code>axym</code> in your project and type <code>/</code> to see every command with tab completion.</div></div>
        <div class="step"><div class="step-num">3</div><div class="step-title">Choose how much freedom to give</div><div class="step-body"><kbd class="kbd">Shift+Tab</kbd> cycles Plan → Ask → Edit → Auto. Start in Plan when you want to read before writing.</div></div>
        <div class="step"><div class="step-num">4</div><div class="step-title">Verify the result</div><div class="step-body">Use <code>/review</code>, <code>/security</code> and <code>/test</code>; the Result Ledger records what actually ran and marks unverified work honestly.</div></div>
        <div class="step"><div class="step-num">5</div><div class="step-title">Scale out when needed</div><div class="step-body">Use <code>/runs start "&lt;goal&gt;" --worktree</code> for parallel features, then <code>/runs switch</code> to move between them safely.</div></div>
      </div>
      <div class="code-shell" data-fx-reveal><div class="code-head"><span class="code-lang">shell</span><span class="code-title">first session</span><button type="button" class="copy-btn" data-copy="feat-first-session"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-first-session">axym doctor
cd /path/to/your/project
axym
# inside the session
/health
/mode plan
/review</pre></div></div>
    </div>
  </section>

  <div class="fx-prose" id="reference">
    <div class="fx-ref-head">
      <p class="section-kicker">The full reference</p>
      <h2>Every group, in depth.</h2>
      <p class="lead">The complete catalog, group by group. Each capability is documented the same way: what it is, why it matters, and the exact command to use it.</p>
    </div>
<div class="fx-chapter-head"><p class="fx-chapter-kicker">01 · Continuity</p><p class="fx-chapter-tag">One conversation. Any brain.</p></div>
<h2 id="tui-sessions-providers-models">Sessions, providers &amp; models</h2>
<p class="lead">A session is the long-lived conversation you work in; the provider is the agent CLI doing the reasoning. Axym deliberately separates the two. You can start with one CLI, switch to another mid-problem, and come back tomorrow without losing the thread. This group is about continuity: discovery, defaults, failover and resume all exist so a tooling change never becomes a lost conversation.</p>
<h3 id="feat-one-session-any-agent-cli">One session, any agent CLI</h3>
<p><strong>What it is.</strong> Drive Claude Code, OpenCode, Codex, Gemini CLI, Cursor Agent, GitHub Copilot CLI, Command Code and Antigravity through one consistent terminal interface.</p>
<p><strong>Why it matters.</strong> You keep one conversation and one set of habits while choosing the model that fits the task — no new interface to learn for every CLI.</p>
<p><strong>Use it.</strong> <code>axym --provider claude</code> · <code>/provider</code> · <code>/model</code></p>

<h3 id="feat-provider-discovery-and-defaults">Provider discovery and defaults</h3>
<p><strong>What it is.</strong> Finds installed CLIs on PATH and in common install directories, accepts ids, aliases and display names, and suggests the closest match on a typo.</p>
<p><strong>Why it matters.</strong> Setup stays a detection step, not a config-file exercise: Axym finds what you installed and suggests the closest match when you mistype an id.</p>
<p><strong>Use it.</strong> <code>~/.axym/config.yaml (default-coder)</code> · <code>~/.axym/provider_paths.json</code></p>

<h3 id="feat-mid-session-provider-model-and-effort-switching">Mid-session provider, model and effort switching</h3>
<p><strong>What it is.</strong> Change the agent, model or reasoning effort without losing the conversation or restarting the session.</p>
<p><strong>Why it matters.</strong> A provider that is wrong for one step no longer costs the conversation — you switch and continue with the same context.</p>
<p><strong>Use it.</strong> <code>/provider</code> · <code>/model</code> · <code>/models</code> · <code>/effort</code></p>

<h3 id="feat-automatic-failover-and-provider-cooldowns">Automatic failover and provider cooldowns</h3>
<p><strong>What it is.</strong> Classifies failures as immediate, after-reset or never; benches quota walls until their reset time and policy walls for 24h; a circuit breaker stops repeated sub-minute failures.</p>
<p><strong>Why it matters.</strong> A quota wall or flaky CLI no longer ends the run: the failure is classified, the provider is benched until reset, and the next provider receives a handoff.</p>
<p><strong>Use it.</strong> <code>Automatic on a failed turn; /priority shows the resolution order</code></p>

<h3 id="feat-persistent-claude-connection">Persistent Claude connection</h3>
<p><strong>What it is.</strong> Claude runs as a long-lived stream-JSON process, so repeat turns skip CLI re-initialisation and permission requests flow over live stdin.</p>
<p><strong>Why it matters.</strong> Repeat turns skip CLI startup, so interactive work stays immediate and permission prompts flow over the live connection.</p>
<p><strong>Use it.</strong> <code>Automatic for the Claude provider</code></p>

<h3 id="feat-sessions-resume-and-git-reconciliation">Sessions, resume and git reconciliation</h3>
<p><strong>What it is.</strong> Saves every finished turn as JSONL, restores the provider's own session id, and tells you what changed in the workspace since the session was last active.</p>
<p><strong>Why it matters.</strong> Coming back later is safe: the provider's own session id is restored and you are told what changed in the workspace while you were away.</p>
<p><strong>Use it.</strong> <code>/sessions</code> · <code>/resume</code> · <code>/continue</code> · <code>axym -c</code></p>

<h3 id="feat-self-healing-doctor">Self-healing doctor and onboarding</h3>
<p><strong>What it is.</strong> A non-destructive, 30-second onboarding path: <code>axym doctor</code> detects installed agent CLIs, verifies the runtime, repairs common setup problems itself, and locally verified scar rules can block edits that already failed the same way before.</p>
<p><strong>Why it matters.</strong> Setup stays a detection step that can heal itself, and mistakes the organisation has already made once are not repeated silently.</p>
<p><strong>Use it.</strong> <code>axym doctor</code> · <code>axym doctor --mobile</code></p>

<h3 id="feat-multi-account-provider-slots-and-isolation">Multi-account provider slots and isolation</h3>
<p><strong>What it is.</strong> Configure and switch between multiple accounts per provider (personal, work, sandbox) with trust-zone policies, pinned-account enforcement, per-account health and cooldown tracking, and kernel-isolated credential directories (macOS Seatbelt / Linux Landlock) with egress-proxy canary protection.</p>
<p><strong>Why it matters.</strong> You can keep personal, client and sandbox credentials strictly separated — when one account hits a rate limit or trust-zone rule, Axym never leaks credentials across slots.</p>
<p><strong>Use it.</strong> <code>/accounts</code> · <code>axym accounts [list|add|test]</code> · <code>~/.axym/providers.json</code></p>

<h3 id="feat-openai-compatible-local-inference">OpenAI-compatible local inference</h3>
<p><strong>What it is.</strong> Connect local or self-hosted OpenAI-compatible inference servers (Ollama, LM Studio, vLLM, llama.cpp) through the same TUI session, tool loop and Result Ledger with no cloud CLI required.</p>
<p><strong>Why it matters.</strong> Air-gapped, private or local-GPU workflows get the exact same permissions, diffing and verification harness as cloud CLIs.</p>
<p><strong>Use it.</strong> <code>axym --provider local</code> · <code>AXYM_LOCAL_BASE_URL</code> · <code>AXYM_LOCAL_MODEL</code></p>

<h3 id="feat-session-outcome-profiles">Session outcome profiles</h3>
<p><strong>What it is.</strong> Select a session-scoped outcome profile (such as strict verification, rapid prototype or security audit) that shapes how turns are evaluated.</p>
<p><strong>Why it matters.</strong> You can dial up verification rigor for production changes or speed for exploration without editing config files.</p>
<p><strong>Use it.</strong> <code>/profile</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Sessions, providers &amp; models — example</span><button type="button" class="copy-btn" data-copy="feat-sessions-providers-models-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-sessions-providers-models-example">axym doctor
axym --provider claude --mode plan
# inside the session
/provider codex
/model
/sessions</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">02 · Transparency</p><p class="fx-chapter-tag">Watch it work. Keep the receipts.</p></div>
<h2 id="tui-chat-transcript-results">Chat, transcript &amp; results</h2>
<p class="lead">The transcript is not decoration — it is the working surface. Axym streams real tool calls and outputs rather than a smoothed-over summary, then closes each turn with a Result Ledger that says what happened. Search, queueing and export make a long session usable instead of something you scroll forever.</p>
<h3 id="feat-streaming-chat-and-tool-activity">Streaming chat and tool activity</h3>
<p><strong>What it is.</strong> Token-level deltas, lightweight markdown and animated tool calls with real commands, paths and outputs instead of raw protocol dumps.</p>
<p><strong>Why it matters.</strong> You see real commands, paths and outputs as they happen, so you can intervene before a wrong assumption becomes a committed change.</p>
<p><strong>Use it.</strong> <code>Automatic in every interactive session</code></p>

<h3 id="feat-result-ledger">Result Ledger</h3>
<p><strong>What it is.</strong> Each turn ends with an outcome banner (OK, FAIL, VER, UNV), modified files, verification checks, blockers or risks, a concise summary and contextual next actions.</p>
<p><strong>Why it matters.</strong> A turn ends with an inspectable outcome instead of a vibe — files touched, checks run, blockers and next actions are explicit.</p>
<p><strong>Use it.</strong> <code>Automatic at turn completion; Ctrl+O expands detail</code></p>

<h3 id="feat-markdown-and-syntax-highlighting">Markdown and syntax highlighting</h3>
<p><strong>What it is.</strong> Fenced code is highlighted for JavaScript/TypeScript, Python, Rust, Go, shell, YAML/TOML and C-family languages with no external dependency.</p>
<p><strong>Why it matters.</strong> Code in the terminal is scannable without a separate viewer or an external highlighting dependency.</p>
<p><strong>Use it.</strong> <code>Automatic in responses</code></p>

<h3 id="feat-message-queueing">Message queueing</h3>
<p><strong>What it is.</strong> Text submitted while a turn is running is queued and drains automatically when the turn ends, with a visible queued count. Governed workstream submissions are the exception: they are refused while the runtime is busy and can be retried when it is idle.</p>
<p><strong>Why it matters.</strong> You can keep typing while the agent works; the next instruction is queued and drains in order instead of being lost to a busy turn. Governed work is never silently stacked behind another turn.</p>
<p><strong>Use it.</strong> <code>Type while the agent is working</code></p>

<h3 id="feat-transcript-search-and-turn-jump">Transcript search and turn jump</h3>
<p><strong>What it is.</strong> Search the current session, open a scrollable hit preview, or jump directly to an earlier conversational turn.</p>
<p><strong>Why it matters.</strong> Long sessions stay navigable: find a decision by text and jump straight back to the turn where it was made.</p>
<p><strong>Use it.</strong> <code>Ctrl+F</code> · <code>/find</code> · <code>/turns</code></p>

<h3 id="feat-copy-and-export">Copy and export</h3>
<p><strong>What it is.</strong> Copy the latest or an earlier response to the system clipboard, or save the full transcript as markdown.</p>
<p><strong>Why it matters.</strong> Results move into a note, ticket or PR without retyping, and the whole transcript can be kept as markdown.</p>
<p><strong>Use it.</strong> <code>/copy</code> · <code>/export</code></p>

<h3 id="feat-calm-status">Calm status and retry collapse</h3>
<p><strong>What it is.</strong> One in-place live status row replaces appended pause markers, and transient retries that recover on their own collapse into a single quiet, expandable line instead of a stack of scrollback.</p>
<p><strong>Why it matters.</strong> The transcript stays readable during long, flaky turns: you see current state at a glance and can expand the history only if you care.</p>
<p><strong>Use it.</strong> <code>Automatic in every interactive session</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Chat, transcript &amp; results — example</span><button type="button" class="copy-btn" data-copy="feat-chat-transcript-results-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-chat-transcript-results-example">axym
# while the agent works, type the next instruction
# it queues and drains when the turn ends
/find "rate limit"
/copy
/export</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">03 · Fluency</p><p class="fx-chapter-tag">A composer that feels like your editor.</p></div>
<h2 id="tui-input-editor">Input &amp; editor</h2>
<p class="lead">Most of your time in a terminal agent is spent writing prompts and attaching context. This group treats the composer as a real editor: full readline keys, Vim bindings, history, file completion and image inputs. The point is less friction between what you mean and what the agent receives.</p>
<h3 id="feat-multi-line-composer-with-readline-keys">Multi-line composer with readline keys</h3>
<p><strong>What it is.</strong> Cursor motion, word jump, kill/yank, undo, history navigation and a hinted footer work across single-line and multi-line input.</p>
<p><strong>Why it matters.</strong> The composer behaves like an editor, so long prompts and pasted context are comfortable to shape in a terminal.</p>
<p><strong>Use it.</strong> <code>Shift+Enter or Ctrl+J for a newline; Ctrl+A/E/U/K/W for editing</code></p>

<h3 id="feat-vim-mode-and-external-editor">Vim mode and external editor</h3>
<p><strong>What it is.</strong> Persistent Vim keybindings for the prompt, or open the current prompt in your own $VISUAL/$EDITOR.</p>
<p><strong>Why it matters.</strong> Your existing editing muscle memory works in the prompt, and $EDITOR handles anything you would rather write in a full editor.</p>
<p><strong>Use it.</strong> <code>/vim</code> · <code>Ctrl+G</code></p>

<h3 id="feat--file-completion">@file completion</h3>
<p><strong>What it is.</strong> Fuzzy-complete project files from git ls-files, or a bounded directory walk outside git, ranked by filename, path and subsequence match.</p>
<p><strong>Why it matters.</strong> Attaching the right file is a few keystrokes instead of a path you have to remember or paste.</p>
<p><strong>Use it.</strong> <code>Type @ followed by part of a path</code></p>

<h3 id="feat-prompt-history-and-reverse-search">Prompt history and reverse search</h3>
<p><strong>What it is.</strong> Keeps the last 500 prompts and offers bash-style reverse search over them.</p>
<p><strong>Why it matters.</strong> Useful prompts stay reusable; reverse search finds them without scrolling the transcript.</p>
<p><strong>Use it.</strong> <code>Up/Down</code> · <code>Ctrl+R</code></p>

<h3 id="feat-paste-formatting-and-image-attachments">Paste formatting and image attachments</h3>
<p><strong>What it is.</strong> Formats large pasted text into a collapsible prompt, and attaches screenshots or image files as [Image #n] inputs.</p>
<p><strong>Why it matters.</strong> Large pastes and screenshots become structured inputs the provider can actually use, rather than a wall of text.</p>
<p><strong>Use it.</strong> <code>Ctrl+Shift+F</code> · <code>Ctrl+V</code> · <code>Ctrl+I</code> · <code>Ctrl+Shift+S</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Input &amp; editor — example</span><button type="button" class="copy-btn" data-copy="feat-input-editor-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-input-editor-example">@src/app  # fuzzy-complete a path
Ctrl+I   # attach an image
Ctrl+G   # open $EDITOR
Ctrl+R   # reverse-search prompt history</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">04 · Control</p><p class="fx-chapter-tag">Authority is a decision, not a default.</p></div>
<h2 id="tui-modes-permissions-safety">Modes, permissions &amp; safety</h2>
<p class="lead">Authority is a decision, not a default. Modes set how much the agent may do, the inline gate shows the exact command or path before it runs, and an allow-list remembers only the commands you explicitly trust. Crash handling belongs here too: a broken render should never leave your terminal unusable.</p>
<h3 id="feat-plan-ask-edit-and-auto-modes">Plan, Ask, Edit and Auto modes</h3>
<p><strong>What it is.</strong> Plan is read-only, Ask never edits, Edit auto-accepts file edits, and Auto bypasses permission prompts; each maps to the provider's native permission mode.</p>
<p><strong>Why it matters.</strong> You choose how much authority the agent has for this task with a visible mode, not an implicit trust decision.</p>
<p><strong>Use it.</strong> <code>Shift+Tab</code> · <code>/mode plan|ask|edit|auto</code></p>

<h3 id="feat-inline-permission-gate">Inline permission gate</h3>
<p><strong>What it is.</strong> Permission-requiring tool calls are relayed to the TUI and answered there: allow or deny with the real command or path shown. Gate errors and interrupts deny by default.</p>
<p><strong>Why it matters.</strong> Dangerous commands are decided where you are, with the real command shown; errors and interrupts deny by default.</p>
<p><strong>Use it.</strong> <code>Answer y or n when a gate appears; AXYM_TUI_NO_RELAY=1 opts out</code></p>

<h3 id="feat-always-allow-command-list">Always-allow command list</h3>
<p><strong>What it is.</strong> Review or clear exact commands you have chosen to always allow, so repeated safe commands stop asking.</p>
<p><strong>Why it matters.</strong> Repeated safe commands stop interrupting you, while the list stays reviewable and exact instead of becoming a blanket bypass.</p>
<p><strong>Use it.</strong> <code>/permissions</code> · <code>/permissions clear</code></p>

<h3 id="feat-explicit-yolo-mode">Explicit YOLO mode</h3>
<p><strong>What it is.</strong> Skips every approval prompt and implies Auto mode, with the risk stated up front. Governed runtime approval gates are never bypassed.</p>
<p><strong>Why it matters.</strong> For disposable sandboxes you can opt into speed explicitly, with the risk stated up front and governed runtime gates still intact.</p>
<p><strong>Use it.</strong> <code>axym --yolo</code></p>

<h3 id="feat-crash-safe-terminal-handling">Crash-safe terminal handling</h3>
<p><strong>What it is.</strong> A render error or external signal unmounts cleanly, restores raw-mode terminal state, and releases the wake-lock child instead of leaving a garbled screen.</p>
<p><strong>Why it matters.</strong> A crash or signal restores the terminal instead of leaving a garbled screen and a held wake lock.</p>
<p><strong>Use it.</strong> <code>Automatic</code></p>

<h3 id="feat-anti-hang-guard">Anti-hang guard</h3>
<p><strong>What it is.</strong> Tool calls run in a non-interactive command environment with a prompt killer, a lock classifier, an orphan drain and verified-idle process-group escalation, surfacing as a typed <code>ToolStallError</code> instead of a silent hang.</p>
<p><strong>Why it matters.</strong> A hung tool call is classified, drained and escalated — it can never wedge the session or burn a turn waiting forever.</p>
<p><strong>Use it.</strong> <code>Automatic</code></p>

<h3 id="feat-failure-circuit-breaker">Identical-failure circuit breaker</h3>
<p><strong>What it is.</strong> A tool-loop breaker detects repeated identical failures and stops them, offering a native question footer with a clean, explicit autonomous bypass.</p>
<p><strong>Why it matters.</strong> Repeating the same failing action cannot burn tokens in a loop; the way forward is always a visible decision, not a crash.</p>
<p><strong>Use it.</strong> <code>Automatic</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Modes, permissions &amp; safety — example</span><button type="button" class="copy-btn" data-copy="feat-modes-permissions-safety-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-modes-permissions-safety-example">Shift+Tab          # cycle plan → ask → edit → auto
/mode plan         # read-only exploration
/permissions       # review always-allowed commands
axym --yolo        # explicit, high-risk opt-in</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">05 · Context</p><p class="fx-chapter-tag">See the shift, not a chat log.</p></div>
<h2 id="tui-workspaces-engineering-views">Workspaces &amp; engineering views</h2>
<p class="lead">A conversation eventually becomes engineering work: a run with stages, evidence, a dependency graph and a handoff. These views turn that work into something you can inspect. They answer “what is the agent doing and why is it waiting?” without forcing you to trust a progress spinner.</p>
<h3 id="feat-adaptive-workspaces">Adaptive workspaces</h3>
<p><strong>What it is.</strong> Switch the session between explore, execute, investigate, review and approval modes so the header, hints and available actions match the job.</p>
<p><strong>Why it matters.</strong> The interface matches the job — exploring, implementing, investigating, reviewing or approving — so the relevant actions are near at hand.</p>
<p><strong>Use it.</strong> <code>/workspace explore|execute|investigate|review|approval</code></p>

<h3 id="feat-pipeline-view">Pipeline view</h3>
<p><strong>What it is.</strong> Lists recent runtime runs, then shows a run's recorded stages, files and verification events stage by stage.</p>
<p><strong>Why it matters.</strong> A governed run is inspectable stage by stage with its files and verification events, not just a final green check.</p>
<p><strong>Use it.</strong> <code>/pipeline [run-id]</code></p>

<h3 id="feat-execution-graph">Execution graph</h3>
<p><strong>What it is.</strong> Interactive stage, gate, agent and task dependency tree for a runtime run.</p>
<p><strong>Why it matters.</strong> Dependencies between stages, gates, agents and tasks are visible, so you can see why a run is waiting.</p>
<p><strong>Use it.</strong> <code>/graph [run-id]</code></p>

<h3 id="feat-evidence-browser">Evidence browser</h3>
<p><strong>What it is.</strong> Inspect the evidence primitive behind a claim: inspected, inferred, verified and failed proof.</p>
<p><strong>Why it matters.</strong> Claims are traceable to inspected, inferred, verified or failed proof, so you can judge a result on its evidence.</p>
<p><strong>Use it.</strong> <code>/evidence [id]</code></p>

<h3 id="feat-health-intelligence-and-observatory">Health, intelligence and observatory</h3>
<p><strong>What it is.</strong> Read the daemon self-report and provider cooldowns, the AEI decision ledger with estimates and measured outcomes, and active skills with evaluation candidates.</p>
<p><strong>Why it matters.</strong> Runtime health, measured routing decisions and active skills are readable without leaving the terminal.</p>
<p><strong>Use it.</strong> <code>/health</code> · <code>/intel</code> · <code>/observatory</code></p>

<h3 id="feat-handover-and-work-passport">Handover and Work Passport</h3>
<p><strong>What it is.</strong> See session state, unresolved tasks and uncommitted work, or show and export the durable passport (product brief, acceptance criteria, execution truth, recovery context).</p>
<p><strong>Why it matters.</strong> The next session or person receives the brief, criteria, execution truth and recovery context instead of a blank chat.</p>
<p><strong>Use it.</strong> <code>/handover</code> · <code>/passport</code></p>

<h3 id="feat-settings-themes-and-density">Settings, themes and density</h3>
<p><strong>What it is.</strong> Toggle Vim editing, verbose tool output and a compact header, or switch between graphite, classic and high-contrast themes.</p>
<p><strong>Why it matters.</strong> Comfort settings persist, so the terminal fits your screen and reading preference across sessions.</p>
<p><strong>Use it.</strong> <code>/settings</code> · <code>/theme graphite|classic|contrast</code></p>

<h3 id="feat-mux-pane-adapters">Real mux pane adapters</h3>
<p><strong>What it is.</strong> A mux viewer contract with a strict pane-ID sanitizer and prober, argv-safe launchers for <code>tmux</code>, <code>zellij</code> and <code>wezterm</code> (<code>psmux</code> runs through the tmux adapter), and a tiled wave layout manager with manual close and kill-before-close semantics (ADR-0018).</p>
<p><strong>Why it matters.</strong> Runs can drive real terminal panes in the multiplexer you already use, without unsafe argument handling or orphaned processes.</p>
<p><strong>Use it.</strong> <code>Automatic with your mux</code> · <code>axym-pane-exec</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Workspaces &amp; engineering views — example</span><button type="button" class="copy-btn" data-copy="feat-workspaces-engineering-views-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-workspaces-engineering-views-example">/workspace review
/pipeline
/graph
/evidence
/handover
/passport export</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">06 · Governance</p><p class="fx-chapter-tag">The loop stays human.</p></div>
<h2 id="tui-run-controls">Governed run controls</h2>
<p class="lead">A governed run is not a fire-and-forget job. These commands keep a human in the loop and make the state of that loop readable: one inbox for every decision, a mission preview before work starts, a drift review at the end, and explicit revise or cancel paths.</p>
<h3 id="feat-decision-inbox">Decision inbox</h3>
<p><strong>What it is.</strong> <code>/inbox</code> collects approvals, revisions and rejections across approval gates, Laya escalations, Goldfish reviews and security hops into one place.</p>
<p><strong>Why it matters.</strong> You decide from a single queue instead of hunting through transcripts for the one turn that is waiting on you.</p>
<p><strong>Use it.</strong> <code>/inbox</code></p>
<h3 id="feat-mission-and-preview">Mission and preview</h3>
<p><strong>What it is.</strong> <code>/mission</code> shows the current objective and constraints; <code>/preview</code> shows the proposed plan with AMPRE and per-provider badges before execution.</p>
<p><strong>Why it matters.</strong> You can see what the run intends to do and which provider will do it, before any tool touches the working tree.</p>
<p><strong>Use it.</strong> <code>/mission</code> · <code>/preview</code></p>
<h3 id="feat-goldfish-and-revision">Goldfish review, revise and cancel</h3>
<p><strong>What it is.</strong> <code>/goldfish</code> reviews drift between the agreed spec and the produced change. <code>/revise</code> reopens a run with new instructions; <code>/cancel</code> stops it with the reason recorded.</p>
<p><strong>Why it matters.</strong> Drift is a first-class review step, and changing or stopping a run is explicit rather than an implicit consequence of a new prompt.</p>
<p><strong>Use it.</strong> <code>/goldfish</code> · <code>/revise</code> · <code>/cancel</code></p>

<div class="fx-chapter-head"><p class="fx-chapter-kicker">07 · Proof</p><p class="fx-chapter-tag">Nothing ships on a promise.</p></div>
<h2 id="tui-verification-review-delivery">Verification, review &amp; delivery</h2>
<p class="lead">A change is not done because a model said so. This group is the path from a diff to evidence: independent review, security findings, real test output, reversible file edits, and workflows you can replay. Every item here exists to make a claim checkable and a mistake reversible.</p>
<h3 id="feat-code-review-and-qa">Code review and QA</h3>
<p><strong>What it is.</strong> Runs a code-quality pass for hidden assumptions, simplicity, surgical diffs, edge cases and test completeness, with file and line references.</p>
<p><strong>Why it matters.</strong> A second pass finds hidden assumptions and weak tests before they reach your branch, with file and line references.</p>
<p><strong>Use it.</strong> <code>/review [goal]</code> · <code>/qa [goal]</code></p>

<h3 id="feat-security-review">Security review</h3>
<p><strong>What it is.</strong> Threat-models the target, reviews code and configuration with captured evidence, and returns a prioritized remediation plan.</p>
<p><strong>Why it matters.</strong> Threat modelling and evidence-cited findings turn “is this safe?” into a prioritized, reviewable list.</p>
<p><strong>Use it.</strong> <code>/security [goal]</code> · <code>/audit</code> · <code>/security-audit</code></p>

<h3 id="feat-background-test-runner">Background test runner</h3>
<p><strong>What it is.</strong> Runs the project's tests without blocking the conversation and reports the result back into the session.</p>
<p><strong>Why it matters.</strong> Tests run without blocking the conversation and the real result comes back into the same session.</p>
<p><strong>Use it.</strong> <code>/test [command]</code></p>

<h3 id="feat-diff-pull-undo-and-bisect">Diff, pull, undo and bisect</h3>
<p><strong>What it is.</strong> Inspect uncommitted changes with interactive hunk review, pull the remote tracking branch, shelve work into a reversible stash, or binary-search checkpoints for the turn that introduced a regression.</p>
<p><strong>Why it matters.</strong> Edits are reversible and reviewable hunk by hunk: inspect changes, pull updates, undo a turn, or binary-search checkpoints to find the regression.</p>
<p><strong>Use it.</strong> <code>/diff</code> · <code>/pull</code> · <code>/undo</code> · <code>/bisect</code></p>

<h3 id="feat-reusable-workflows">Reusable workflows</h3>
<p><strong>What it is.</strong> Define a named sequence of prompts once, then replay it on any provider. Four starter workflows cover engineering, product discovery, security review and QA.</p>
<p><strong>Why it matters.</strong> A sequence that worked once becomes a repeatable procedure you can run on any provider.</p>
<p><strong>Use it.</strong> <code>/workflow new|run|save|edit|delete|list</code> · <code>/workflows</code></p>

<h3 id="tui-flow-os">Declarative Flow OS</h3>
<p><strong>What it is.</strong> <code>/flow [list|run|resume|status|inspect|capture]</code> runs workflows stored under <code>.axym/workflows</code>. They compile to least-privilege lockfiles with safe-output caps, execute in DAG order under turn, cost and wall-clock limits, resume durably, and capture the session for inspection.</p>
<p><strong>Why it matters.</strong> A procedure you trust becomes a bounded, reviewable unit of work instead of a prompt you hope behaves. Five role starter packs ship with it (<code>dev-feature</code>, <code>qa-regression</code>, <code>sec-pr-audit</code>, <code>sre-incident-triage</code>, <code>release-preflight</code>), alongside signed organisation workflow packs (<code>axym flow publish|add</code>) and a non-circular <code>.axym-proof.json</code> attestation.</p>
<p><strong>Use it.</strong> <code>/flow list</code> · <code>/flow run &lt;name&gt;</code> · <code>/flow resume</code> · <code>/flow inspect</code></p>

<h3 id="feat-project-setup">Project setup</h3>
<p><strong>What it is.</strong> Writes a starter .axym.yaml shared with the desktop app, without ever overwriting an existing file.</p>
<p><strong>Why it matters.</strong> A project gets a starter config in one command without overwriting the configuration you already wrote.</p>
<p><strong>Use it.</strong> <code>/init</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Verification, review &amp; delivery — example</span><button type="button" class="copy-btn" data-copy="feat-verification-review-delivery-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-verification-review-delivery-example">/review
/security
/test npm test
/diff
/undo
/workflow run qa-review</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">08 · Insight</p><p class="fx-chapter-tag">Inspect before you approve.</p></div>
<h2 id="tui-code-intelligence">Code intelligence and safety views</h2>
<p class="lead">When something is wrong — or you need to know the blast radius before approving — these views turn the runtime's accumulated evidence into answers. They are inspection tools: they explain the state of the code and the tools around it rather than changing it.</p>
<h3 id="feat-investigate-and-blast">Investigate and blast radius</h3>
<p><strong>What it is.</strong> <code>/investigate</code> starts a focused failure investigation; <code>/blast</code> maps the changed symbols, their dependents and compiler diagnostics.</p>
<p><strong>Why it matters.</strong> “What broke and what else does it touch?” becomes a view you can read before you approve or roll back.</p>
<p><strong>Use it.</strong> <code>/investigate</code> · <code>/blast</code></p>
<h3 id="feat-proof-and-scars">Offline proof and organization scars</h3>
<p><strong>What it is.</strong> <code>/proof</code> verifies evidence offline; <code>/scars</code> reads the recorded rules and lessons the organization has accumulated from earlier failures.</p>
<p><strong>Why it matters.</strong> A claim can be checked without trusting the session that made it, and hard-won rules are available at the moment they are relevant.</p>
<p><strong>Use it.</strong> <code>/proof</code> · <code>/scars</code></p>
<h3 id="feat-mcp-memory-activity-footprint">MCP scopes, memory, activity and footprint</h3>
<p><strong>What it is.</strong> <code>/mcp</code> shows tool scopes and the admission ledger behind the zero-trust local MCP firewall — scoped capability-lattice admission with untrusted-output tainting across stdio and HTTP transports; <code>/memory</code> inspects the live repo-brain freshness; <code>/activity</code> is the agent transparency view; <code>/footprint</code> summarises the runtime's local footprint.</p>
<p><strong>Why it matters.</strong> You can answer what tools were allowed, how fresh the project context is, what the agent actually did, and what it left on disk.</p>
<p><strong>Use it.</strong> <code>/mcp</code> · <code>/memory</code> · <code>/activity</code> · <code>/footprint</code></p>

<div class="fx-chapter-head"><p class="fx-chapter-kicker">09 · Craft</p><p class="fx-chapter-tag">Teach it your way of working.</p></div>
<h2 id="tui-skills-customization">Skills &amp; customization</h2>
<p class="lead">Skills are packaged expertise you can invoke deliberately: product decisions, engineering judgement, adversarial QA and reverse engineering. They are portable SKILL.md definitions, so the same skill works in your project and on whichever provider you chose. Configuration makes the agent aware of your stack instead of a generic codebase.</p>
<h3 id="feat-bundled-skills">Bundled skills</h3>
<p><strong>What it is.</strong> Product-Owner Intelligence, Axym Engineering Intelligence, reverse engineering and break-it QA ship inside the binary and work in any project.</p>
<p><strong>Why it matters.</strong> Four experts ship inside the binary, so product, engineering, QA and reverse-engineering work is available in every project.</p>
<p><strong>Use it.</strong> <code>/skills</code> · <code>/skill &lt;name&gt; [task]</code> · <code>/po</code> · <code>/aei</code></p>

<h3 id="tui-evolve">Self-improvement proposals</h3>
<p><strong>What it is.</strong> <code>/evolve [list|accept|dismiss|rollback &lt;id&gt;]</code> reviews proposals that have passed a sequential-probability gate. Accepting updates a target file; rollback restores the pinned before-state.</p>
<p><strong>Why it matters.</strong> Improvements to the agent's own instructions are evidence-gated and reversible, not silent edits to behaviour.</p>
<p><strong>Use it.</strong> <code>/evolve list</code> · <code>/evolve accept &lt;id&gt;</code> · <code>/evolve rollback &lt;id&gt;</code></p>

<h3 id="feat-project-and-user-skills">Project and user skills</h3>
<p><strong>What it is.</strong> Discovers SKILL.md definitions from .agents, .claude, .codex and compatible project or user folders, with mode support.</p>
<p><strong>Why it matters.</strong> Your team's SKILL.md files work like built-ins, and project copies win when names collide.</p>
<p><strong>Use it.</strong> <code>/skills</code> · <code>/skill &lt;name&gt; [task]</code></p>

<h3 id="feat-slash-command-plugins">Slash-command plugins</h3>
<p><strong>What it is.</strong> External modules can register narrow slash commands; built-in commands always win.</p>
<p><strong>Why it matters.</strong> Narrow extensions add commands without taking over views, keybindings or state — and built-in commands always win.</p>
<p><strong>Use it.</strong> <code>See the plugin API in the TUI docs</code></p>

<h3 id="feat-project-configuration">Project configuration</h3>
<p><strong>What it is.</strong> Reads .axym.yaml for tech stack, language, style guide, forbidden libraries, custom instructions, secrets, capabilities and budgets.</p>
<p><strong>Why it matters.</strong> One .axym.yaml teaches the agent your stack, style, forbidden libraries and secrets, so it works in your codebase rather than a generic one.</p>
<p><strong>Use it.</strong> <code>.axym.yaml at the project root</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Skills &amp; customization — example</span><button type="button" class="copy-btn" data-copy="feat-skills-customization-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-skills-customization-example">/skills
/po "should we add rate limiting?"
/aei "fix the flaky test"
/workflow new release-check</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">10 · Scale</p><p class="fx-chapter-tag">Many brains. Zero collisions.</p></div>
<h2 id="tui-multi-model-fleet-automation">Multi-model, fleet &amp; automation</h2>
<p class="lead">Different models are good at different things. This group is about using more than one on purpose: council for a second opinion, cross-provider review for honest independence, a fleet roster for visibility, and isolated worktrees for parallel work. Headless mode and steering let the same engine run unattended without losing human control.</p>
<h3 id="feat-council-mode">Council mode</h3>
<p><strong>What it is.</strong> Runs the same prompt across two or more providers in parallel and merges their answers into one synthesized response.</p>
<p><strong>Why it matters.</strong> Two or more providers answer the same prompt and are merged, giving you a second opinion without managing two sessions.</p>
<p><strong>Use it.</strong> <code>/council &lt;prompt&gt;</code></p>

<h3 id="feat-cross-provider-verification">Cross-provider verification</h3>
<p><strong>What it is.</strong> Run review or security on a different provider than the coder; the run labels whether the verifier was independent of the code author or shared its provider and model.</p>
<p><strong>Why it matters.</strong> Review by a different provider than the author is labelled honestly, so independence is a fact you can check rather than a claim.</p>
<p><strong>Use it.</strong> <code>Desktop → Expert options → AI system per stage</code></p>

<h3 id="feat-agent-hub-and-fleet-overview">Agent Hub and fleet overview</h3>
<p><strong>What it is.</strong> Toggle a live roster of runtime runs, select and attach to one, or read configured capacity, active runs, oldest in-flight work and recent failures.</p>
<p><strong>Why it matters.</strong> A live roster shows what the runtime is doing, so you can attach to the right run instead of guessing.</p>
<p><strong>Use it.</strong> <code>Alt+A</code> · <code>/agents</code> · <code>/fleet</code></p>

<h3 id="feat-run-comparison-and-stage-costs">Run comparison and stage costs</h3>
<p><strong>What it is.</strong> Compare what two runtime runs actually ran against (commit, dependencies, config), and read per-stage token, spend and call-count evidence.</p>
<p><strong>Why it matters.</strong> Comparing commit, dependencies, configuration and per-stage spend explains why one run beat another.</p>
<p><strong>Use it.</strong> <code>/compare [run-a run-b]</code> · <code>/pipeline</code> · <code>/cost [run-id]</code></p>

<h3 id="feat-cost-routing">LinUCB cost routing</h3>
<p><strong>What it is.</strong> A LinUCB cost/failover router unifies the keyless cloud CLIs, adds queue arbitrage, and backs decisions with a dated local rate card via the daemon's <code>AXYM_AUTO_ROUTE=cost</code> setting.</p>
<p><strong>Why it matters.</strong> Model choice learns from measured cost and queue data instead of guesses, and the reasoning stays inspectable on your machine.</p>
<p><strong>Use it.</strong> <code>axym serve</code> with <code>AXYM_AUTO_ROUTE=cost</code> · <code>/cost</code> · <code>/priority</code></p>

<h3 id="feat-headless-mode">Headless mode</h3>
<p><strong>What it is.</strong> Run one prompt from the shell or stdin with text or JSONL output and stable exit codes for scripts and CI.</p>
<p><strong>Why it matters.</strong> The same engine runs in scripts and CI with text or JSONL output and stable exit codes.</p>
<p><strong>Use it.</strong> <code>axym -p "prompt"</code> · <code>--format json</code> · <code>exit 0/1/2/130</code></p>

<h3 id="feat-live-run-steering-and-queueing">Live run steering and queueing</h3>
<p><strong>What it is.</strong> Change course mid-turn at the next safe boundary on the governed runtime, or queue guidance for later without interrupting the run.</p>
<p><strong>Why it matters.</strong> You can change course at a safe boundary or queue guidance for later without interrupting a long run.</p>
<p><strong>Use it.</strong> <code>/steer &lt;instruction&gt;</code> · <code>/queue &lt;instruction&gt;</code></p>

<h3 id="feat-follow-fork-and-compare-runtime-runs">Follow, fork and compare runtime runs</h3>
<p><strong>What it is.</strong> Attach to a Desktop or Mobile run with durable replay and live updates, fork it into a child lineage, or open a second read-only viewer.</p>
<p><strong>Why it matters.</strong> Runs have lineage: attach for live replay, fork a child experiment, or open a read-only viewer.</p>
<p><strong>Use it.</strong> <code>/attach</code> · <code>/view</code> · <code>/fork</code></p>

<h3 id="feat-parallel-isolated-runs">Parallel isolated runs</h3>
<p><strong>What it is.</strong> Start several governed pipeline runs in isolated linked worktrees, switch the visible run without mixing events or staged files, and preview or explicitly apply a finished run's worktree integration. The daemon gates structural worktree creation behind AXYM_PERSISTENT_RUNTIME=1.</p>
<p><strong>Why it matters.</strong> Several features can progress at once without fighting over one working tree; each run keeps its own events and staged files, and integration is a separate explicit decision.</p>
<p><strong>Use it.</strong> <code>/runs list</code> · <code>/runs start "&lt;goal&gt;" --worktree</code> · <code>/runs switch &lt;id&gt;</code> · <code>/runs integrate [id] [--apply]</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Multi-model, fleet &amp; automation — example</span><button type="button" class="copy-btn" data-copy="feat-multi-model-fleet-automation-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-multi-model-fleet-automation-example">/council "design a rate limiter"
/runs start "add rate limiting" --worktree
/runs list
/runs switch 2
axym -p "summarize uncommitted changes" --format json</pre></div></div>

<div class="callout callout-note"><p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>Structural worktree gate</p><p>Creating a new linked worktree is gated by AXYM_PERSISTENT_RUNTIME=1 on the daemon. If it is refused, no run is submitted into the main tree; the error is shown verbatim. Forking an already-started run (/fork --worktree) remains available without that gate.</p></div>

<div class="fx-chapter-head"><p class="fx-chapter-kicker">11 · Presence</p><p class="fx-chapter-tag">Your terminal, from anywhere.</p></div>
<h2 id="tui-collaboration-remote-handoff">Collaboration, remote &amp; handoff</h2>
<p class="lead">Work outlasts the terminal window. This group covers a phone as an approval surface, read-only viewers for collaborators, notifications for long runs and explicit handoff between machines. The common design is that the session stays where the work is and other surfaces get scoped access — never silent write authority.</p>
<h3 id="feat-share-and-read-only-viewing">Share and read-only viewing</h3>
<p><strong>What it is.</strong> Share a session or live run with collaborators; viewers follow an isolated read-only event stream and cannot steer, approve or write.</p>
<p><strong>Why it matters.</strong> Collaborators can follow without write authority, so observation never becomes an accidental change.</p>
<p><strong>Use it.</strong> <code>/share [viewer|contributor|approver|admin|stop]</code> · <code>/view &lt;run-id&gt;</code></p>

<h3 id="feat-team-collaboration">Team collaboration</h3>
<p><strong>What it is.</strong> <code>/team [status|key|peers|templates|profiles|deployments|settings]</code>, <code>/peers</code> and <code>/relay &lt;message&gt;</code> manage team signing keys, discover peers, share templates, profiles and settings, and send encrypted relay messages.</p>
<p><strong>Why it matters.</strong> A team can share working conventions and coordinate across sessions without moving the run or handing out blanket write authority.</p>
<p><strong>Use it.</strong> <code>/team status</code> · <code>/peers</code> · <code>/relay &lt;message&gt;</code></p>

<h3 id="feat-phone-pairing">Phone pairing</h3>
<p><strong>What it is.</strong> Continue the live session from a phone over the same Wi-Fi, Tailscale or a Cloudflare tunnel, with a QR pairing card, PIN or scoped access and a revocable link.</p>
<p><strong>Why it matters.</strong> A QR code and scoped link let you approve or steer from a phone while the session stays on your workstation.</p>
<p><strong>Use it.</strong> <code>/remote</code> · <code>/remote tunnel</code> · <code>/remote status</code> · <code>/remote stop</code></p>

<h3 id="feat-browser-bridge">Browser bridge</h3>
<p><strong>What it is.</strong> Serve a phone-friendly page over the governed runtime with live transcript, submit, steer, cancel and approval actions, protected by a PIN or token.</p>
<p><strong>Why it matters.</strong> A PIN-protected page gives a phone-sized approval surface over the governed runtime without moving the session.</p>
<p><strong>Use it.</strong> <code>axym web --host 0.0.0.0 --pin 4821</code></p>

<h3 id="feat-detach-and-attach">Detach and attach</h3>
<p><strong>What it is.</strong> Free the terminal while the session keeps running, then return from any terminal or SSH login with the transcript redrawn at the new size.</p>
<p><strong>Why it matters.</strong> Close the terminal or lose SSH and the work continues; reattach from anywhere with the transcript redrawn at that size.</p>
<p><strong>Use it.</strong> <code>/detach</code> · <code>axym attach</code> · <code>axym -c</code></p>

<h3 id="feat-push-notifications">Push notifications</h3>
<p><strong>What it is.</strong> Send a push when a turn finishes, fails, or every provider is cooling, through ntfy.sh or a self-hosted topic.</p>
<p><strong>Why it matters.</strong> Long runs tell you when they finish, fail or stall, so you are not polling a terminal for news.</p>
<p><strong>Use it.</strong> <code>/notify</code> · <code>~/.axym/tui/notify.json</code></p>

<h3 id="feat-session-and-run-handoff">Session and run handoff</h3>
<p><strong>What it is.</strong> Export or import a session, or move a multi-machine run checkpoint with offer, export, accept, status and retract actions.</p>
<p><strong>Why it matters.</strong> Work moves between surfaces and machines with explicit offer, accept and retract steps instead of copy-pasted state.</p>
<p><strong>Use it.</strong> <code>/handoff</code> · <code>/run-handoff</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Collaboration, remote &amp; handoff — example</span><button type="button" class="copy-btn" data-copy="feat-collaboration-remote-handoff-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-collaboration-remote-handoff-example">/remote qr
/share approver
/view &lt;run-id&gt;
/notify on
/handoff export</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">12 · Devices</p><p class="fx-chapter-tag">Real devices. Real screenshots.</p></div>
<h2 id="tui-device-bridge">Device bridge and visual QA</h2>
<p class="lead">Mobile work is a first-class surface in the TUI, not an afterthought. This family inventories devices and simulators, runs multi-turn journeys under leases, and captures screenshots and hierarchy for visual review — all driven from the same terminal session.</p>
<h3 id="feat-device-inventory">Device and simulator inventory</h3>
<p><strong>What it is.</strong> <code>/devices</code> and <code>/device</code> list connected devices and simulators with a unified device driver, visual freeze and lease cleanup; <code>/bg</code> keeps work running in the background; <code>/sim</code> drives a simulator session.</p>
<p><strong>Why it matters.</strong> Target selection is explicit and long device work does not hold your terminal hostage.</p>
<p><strong>Use it.</strong> <code>/devices</code> · <code>/device &lt;id&gt;</code> · <code>/sim</code> · <code>/bg</code></p>
<h3 id="feat-mobile-passport-and-proof">Mobile passport and proof</h3>
<p><strong>What it is.</strong> <code>/mobile</code> runs a multi-turn mobile journey through the autonomous UI runner with crash/ANR harvesting and bounded self-healing; <code>/mobile-passport</code> records its durable brief and acceptance criteria; <code>/mobile-proof</code> captures screenshot, hierarchy and visual diff evidence, verified as schema v2 visual proof. <code>/qa --maestro</code> and <code>/security --masvs</code> add store-grade QA and security passes, and a store preflight gate runs before submission.</p>
<p><strong>Why it matters.</strong> A visual change is proven with captures and a design diff — not a claim that "it looked fine" — and store submission is gated, not hoped for.</p>
<p><strong>Use it.</strong> <code>/mobile</code> · <code>/mobile-passport</code> · <code>/mobile-proof</code> · <code>/qa --maestro</code> · <code>/security --masvs</code></p>
<h3 id="feat-termcaps-and-pairing">Terminal capability probe and pairing</h3>
<p><strong>What it is.</strong> <code>/termcaps</code> probes the real terminal — cell size, kitty/iTerm2 graphics support and mouse/focus handling. <code>/pair</code> mints an expiring QR pairing link with a battery guard, and <code>axym doctor --mobile</code> reports mobile readiness.</p>
<p><strong>Why it matters.</strong> Graphics and pairing adapt to the terminal you actually have, and temporary links expire instead of lingering.</p>
<p><strong>Use it.</strong> <code>/termcaps</code> · <code>/pair</code> · <code>axym doctor --mobile</code></p>

<div class="fx-chapter-head"><p class="fx-chapter-kicker">13 · Operations</p><p class="fx-chapter-tag">Boring reliability, engineered.</p></div>
<h2 id="tui-runtime-recovery-operations">Runtime, recovery &amp; operations</h2>
<p class="lead">The governed runtime owns durable runs, evidence and approvals; the TUI is its control surface. These features keep long work alive across restarts, make updates safe, preserve state atomically, and let you diagnose a run without throwing it away. They are the operational floor under everything above.</p>
<h3 id="feat-governed-runtime-connection">Governed runtime connection</h3>
<p><strong>What it is.</strong> Use axym-runtime for durable runs, evidence, approvals, fleet views and run replay while keeping the same terminal interface.</p>
<p><strong>Why it matters.</strong> Durable runs, evidence and approvals live in the runtime, so long work survives terminal restarts.</p>
<p><strong>Use it.</strong> <code>axym --provider axym-runtime</code> · <code>/attach</code> · <code>/pipeline</code></p>

<h3 id="feat-ship-governed-pipeline">/ship governed pipeline</h3>
<p><strong>What it is.</strong> <code>/ship "&lt;goal&gt;"</code> submits a plan → design → code → security → review → qa run to the <code>axym serve</code> daemon with journaled human gate decisions (<code>/approve</code>, <code>/revise</code>, <code>/reject</code>, <code>/cancel</code>). Changes stage in <code>.axym/edit-staging/run-&lt;id&gt;</code> and reach your project only through <code>/ship apply</code>, which is checkpointed so <code>/undo</code> covers it.</p>
<p><strong>Why it matters.</strong> The whole governed pipeline is one command, and nothing touches your project without an explicit, reversible apply — with per-turn git checkpoints along the way.</p>
<p><strong>Use it.</strong> <code>/ship "&lt;goal&gt;"</code> · <code>/ship apply</code> · <code>/approve</code> · <code>/undo</code></p>

<h3 id="feat-laya-decisions-and-vibe-mode">Laya decisions and vibe mode</h3>
<p><strong>What it is.</strong> Classify low-risk decisions, announce and record them, or ask the runtime for the smallest honest pipeline it can justify.</p>
<p><strong>Why it matters.</strong> Low-risk decisions are classified and recorded, and you can ask for the smallest honest pipeline instead of a default heavy one.</p>
<p><strong>Use it.</strong> <code>/laya on|off|status</code> · <code>/vibe on|off|status</code></p>

<h3 id="feat-provider-priority">Provider priority</h3>
<p><strong>What it is.</strong> Show how the default provider was resolved across environment variables, config and provider manifests.</p>
<p><strong>Why it matters.</strong> You can see exactly how the default provider was chosen, which makes failover predictable instead of mysterious.</p>
<p><strong>Use it.</strong> <code>/priority</code></p>

<h3 id="feat-self-update-with-checksum-verification">Self-update with checksum verification</h3>
<p><strong>What it is.</strong> Checks the release channel, downloads the platform asset, verifies its SHA-256 against SHA256SUMS.txt and installs atomically.</p>
<p><strong>Why it matters.</strong> Updates verify SHA-256 before installing atomically, so a corrupted or substituted asset cannot be silently installed.</p>
<p><strong>Use it.</strong> <code>/update</code> · <code>axym --update</code> · <code>--update-force</code></p>

<h3 id="feat-keep-awake-during-long-runs">Keep-awake during long runs</h3>
<p><strong>What it is.</strong> Holds a power assertion while a turn runs so idle sleep cannot suspend the work; opt out with a marker file.</p>
<p><strong>Why it matters.</strong> Idle sleep cannot suspend long work; the assertion is released when the turn ends and can be opted out.</p>
<p><strong>Use it.</strong> <code>Automatic; ~/.axym/tui/no-keep-awake to disable</code></p>

<h3 id="feat-atomic-local-state">Atomic local state</h3>
<p><strong>What it is.</strong> Sessions, history and allow-lists are written with a temp-file, fsync and rename sequence, so a crash cannot leave half-written state.</p>
<p><strong>Why it matters.</strong> A crash cannot leave half-written sessions, history or allow-lists because writes use a temp-file, fsync and rename sequence.</p>
<p><strong>Use it.</strong> <code>Automatic</code></p>

<h3 id="feat-aide-run-diagnosis-and-event-inspection">AIDE run diagnosis and event inspection</h3>
<p><strong>What it is.</strong> On a connected runtime run, inspect failure evidence, event integrity, bounded pipeline replay and run-scoped effect counts. Pause, investigate or resume diagnosis while retaining the original run and its permissions. Observations do not certify a repair.</p>
<p><strong>Why it matters.</strong> When a run is wrong you inspect failure evidence, event integrity and bounded replay without destroying the original run.</p>
<p><strong>Use it.</strong> <code>/debug [run-id]</code> · <code>/debug [run-id] inspect</code></p>

<div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">Runtime, recovery &amp; operations — example</span><button type="button" class="copy-btn" data-copy="feat-runtime-recovery-operations-example"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="feat-runtime-recovery-operations-example">/health
/priority
/update
/debug &lt;run-id&gt; inspect
/pipeline &lt;run-id&gt;</pre></div></div>


<div class="fx-chapter-head"><p class="fx-chapter-kicker">Appendix · Surfaces</p><p class="fx-chapter-tag">The same engine, without the interface.</p></div>
<h2 id="tui-shell-surfaces">Shell entry points</h2>
<p class="lead">Everything the interactive TUI can do has a non-interactive form. These entry points share the same providers, policy and evidence store, and are meant for scripts, CI and scheduled work.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="TUI shell entry points">
  <table>
    <thead><tr><th>Entry point</th><th>Use for</th></tr></thead>
    <tbody>
      <tr><td><code>axym -p "prompt" [--format json]</code></td><td>One-shot prompt with text or JSONL output and stable exit codes.</td></tr>
      <tr><td><code>axym solve</code></td><td>Invariant-locked repair with structured output and an evidence trail.</td></tr>
      <tr><td><code>axym queue</code></td><td>Submit governed work without blocking the terminal.</td></tr>
      <tr><td><code>axym flow</code></td><td>Run a compiled workflow lockfile headlessly.</td></tr>
      <tr><td><code>axym aei</code></td><td>Apply the engineering-intelligence skill from a script.</td></tr>
      <tr><td><code>axym accounts</code> · <code>axym files</code></td><td>Account and file surface inspection without opening the TUI.</td></tr>
      <tr><td><code>axym plugin</code> · <code>axym memory</code></td><td>Plugin and project-memory management.</td></tr>
      <tr><td><code>axym export-session</code> · <code>axym passport</code></td><td>Export a session or a durable work passport.</td></tr>
      <tr><td><code>axym relay</code> · <code>axym team</code></td><td>Encrypted team messaging and team state.</td></tr>
      <tr><td><code>axym scars</code> · <code>axym pr</code></td><td>Organization rules and pull-request preparation.</td></tr>
      <tr><td><code>axym verify-proof</code> · <code>axym ship</code></td><td>Offline proof verification and governed delivery.</td></tr>
      <tr><td><code>axym web --host 0.0.0.0 --pin 4821</code></td><td>Phone-friendly browser bridge over the governed runtime.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="command-surface">Command surface at a glance</h2>
<p>Type <code>/</code> for the tab-completed command list, <code>/help</code> to filter by name, <code>/man</code> for the full built-in manual, and <code>/features</code> for the broader built-in catalog. The built-in table declares 121 names; plugin modules can register additional narrow commands, and a few names are declared ahead of their handlers — <code>/help</code> shows what is active in your build.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="TUI command surface">
  <table>
    <thead><tr><th>Job</th><th>Commands / keys</th><th>What it gives you</th></tr></thead>
    <tbody>
      <tr><td>Find and learn</td><td><code>/</code> · <code>/help</code> · <code>/man</code> · <code>/features</code></td><td>Every command with hints and tab completion, a filterable manual and the built-in catalog.</td></tr>
      <tr><td>Session control</td><td><code>/new</code> · <code>/sessions</code> · <code>/resume</code> · <code>/continue</code> · <code>/detach</code> · <code>/exit</code></td><td>Save, find, resume and leave sessions without losing the thread.</td></tr>
      <tr><td>Providers and models</td><td><code>/provider</code> · <code>/model</code> · <code>/models</code> · <code>/effort</code> · <code>/priority</code> · <code>/accounts</code></td><td>Pick the CLI, model, reasoning effort and account, and see how defaults resolve.</td></tr>
      <tr><td>Modes and workspace</td><td><kbd class="kbd">Shift+Tab</kbd> · <code>/mode</code> · <code>/workspace</code> · <code>/settings</code> · <code>/theme</code></td><td>Plan / Ask / Edit / Auto permissions and five task-shaped workspaces.</td></tr>
      <tr><td>Verify and review</td><td><code>/review</code> · <code>/qa</code> · <code>/security</code> · <code>/test</code> · <code>/diff</code> · <code>/checkpoint</code> · <code>/undo</code> · <code>/bisect</code></td><td>Independent checks, real test output and reversible file changes.</td></tr>
      <tr><td>Governed runtime</td><td><code>/ship</code> · <code>/runs</code> · <code>/approve</code> · <code>/reject</code> · <code>/pipeline</code> · <code>/graph</code> · <code>/evidence</code> · <code>/fleet</code> · <code>/attach</code></td><td>Durable runs with human gates, stage evidence, isolated worktrees and a live roster.</td></tr>
      <tr><td>Skills and workflows</td><td><code>/skills</code> · <code>/skill &lt;name&gt;</code> · <code>/po</code> · <code>/aei</code> · <code>/workflow</code> · <code>/flow</code></td><td>Reusable prompts, bundled experts and saved multi-step procedures.</td></tr>
      <tr><td>Remote and continuity</td><td><code>/remote</code> · <code>/share</code> · <code>/view</code> · <code>/notify</code> · <code>/handoff</code></td><td>Phone control, read-only viewers, notifications and work across machines.</td></tr>
      <tr><td>Flow OS</td><td><code>/flow list|run|resume|status|inspect|capture</code></td><td>Compiled workflows with bounded outputs, DAG order and durable resume.</td></tr>
      <tr><td>Run controls</td><td><code>/inbox</code> · <code>/mission</code> · <code>/preview</code> · <code>/goldfish</code> · <code>/revise</code> · <code>/cancel</code></td><td>One decision inbox, plan preview, drift review and explicit run changes.</td></tr>
      <tr><td>Code intelligence</td><td><code>/investigate</code> · <code>/blast</code> · <code>/proof</code> · <code>/scars</code> · <code>/mcp</code> · <code>/memory</code> · <code>/activity</code> · <code>/footprint</code></td><td>Failure analysis, blast radius, offline proof and tool-scope transparency.</td></tr>
      <tr><td>Team and devices</td><td><code>/team</code> · <code>/peers</code> · <code>/relay</code> · <code>/mobile</code> · <code>/devices</code> · <code>/sim</code> · <code>/pair</code> · <code>/termcaps</code></td><td>Shared team state, encrypted relay, mobile journeys and device QA.</td></tr>
      <tr><td>Self-improvement</td><td><code>/evolve list|accept|dismiss|rollback</code></td><td>Evidence-gated proposal review with a reversible before-state.</td></tr>
    </tbody>
  </table>
</div>
<p class="small muted">Runtime-backed commands (for example <code>/ship</code>, <code>/runs</code>, <code>/pipeline</code>, <code>/fleet</code> and <code>/attach</code>) need a connected <code>axym-runtime</code> daemon. The core chat, edit and session loop works with any installed agent CLI.</p>

<h3 id="feat-blast-radius-and-root-cause-investigation">Blast radius and root-cause investigation</h3>
<p><strong>What it is.</strong> Inspect changed symbols, their callers and compiler diagnostics before approving edits, or run structured failure investigations over execution traces and logs.</p>
<p><strong>Why it matters.</strong> You see the downstream impact of an edit or the root cause of a failure before committing.</p>
<p><strong>Use it.</strong> <code>/blast</code> · <code>/investigate</code></p>

<h3 id="feat-agent-activity-inspector-and-receipts">Agent Activity Inspector and receipts</h3>
<p><strong>What it is.</strong> Inspect live tool and file transparency (NOW, FILES, SAFETY, OUTCOME, WHY), per-turn file audit records, and harness-authored evidence receipts with verification checksums.</p>
<p><strong>Why it matters.</strong> Every file read, write and shell touch is auditable with a verifiable receipt.</p>
<p><strong>Use it.</strong> <code>/activity</code> · <code>/footprint</code> · <code>/receipt</code> · <code>/files</code> · <code>axym files</code></p>

<h3 id="feat-proof-carrying-races-and-offline-verification">Proof-carrying races and offline verification</h3>
<p><strong>What it is.</strong> Lock a failing test invariant on HEAD, race candidate implementations in isolated worktrees, verify non-vacuous RED→GREEN proofs with Ed25519 signatures, and enforce organization scar rules that block recurring mistakes.</p>
<p><strong>Why it matters.</strong> Fixes are backed by cryptographic proof against a real failing baseline, never a vacuous pass.</p>
<p><strong>Use it.</strong> <code>/race</code> · <code>/proof</code> · <code>/scars</code> · <code>axym solve</code> · <code>axym verify-proof</code></p>

<h3 id="feat-plugin-trust-and-lifecycle">Plugin trust and lifecycle</h3>
<p><strong>What it is.</strong> Scaffold, validate, trust and list repo-local verifier and command plugins with fail-closed <code>treeSha256</code> tamper revocation.</p>
<p><strong>Why it matters.</strong> Untrusted or modified plugins cannot execute silently in your workspace.</p>
<p><strong>Use it.</strong> <code>/plugins</code> · <code>axym plugin init|validate|trust|list</code></p>

<h3 id="feat-living-repo-brain-and-memory">Living Repo Brain and memory</h3>
<p><strong>What it is.</strong> Zero-rescan three-layer context pyramid (ECS fingerprints, depth-2 import cone, co-change slice) with causal lessons closed-loop from <code>/race</code>.</p>
<p><strong>Why it matters.</strong> Large repositories stay fast to orient in without paying to re-scan the tree on every turn.</p>
<p><strong>Use it.</strong> <code>/memory</code> · <code>axym memory status|explain|refresh</code></p>

<h3 id="feat-controlled-delegation-and-worker-control">Controlled delegation and worker control</h3>
<p><strong>What it is.</strong> Delegate tasks to isolated workers, inspect fencing tokens and progress, wait for acceptance, land verified work or recover stalled sessions.</p>
<p><strong>Why it matters.</strong> Parallel worker delegation stays fenced and recoverable even if a worker stalls.</p>
<p><strong>Use it.</strong> <code>/delegate</code> · <code>/workers</code></p>

<h3 id="feat-zero-trust-mcp-tool-access">Zero-trust MCP tool access</h3>
<p><strong>What it is.</strong> A local MCP stdio/HTTP firewall with scoped capability-lattice admission and untrusted-output tainting; delegated file tools stay behind the audited route.</p>
<p><strong>Why it matters.</strong> External MCP tools operate under least privilege with every call audited.</p>
<p><strong>Use it.</strong> <code>/mcp</code></p>

<h2 id="modes">Four ways to shape the work</h2>
<p class="lead">These are four different dials, not four names for the same setting. Together they decide how careful the agent is, which interface you are looking at, which expert persona is active, and how much evidence the runtime gathers before it proposes a result.</p>
<dl class="meta-grid">
  <div class="meta-cell"><dt>Permission modes</dt><dd>Plan is read-only, Ask never edits, Edit auto-accepts file edits, Auto bypasses permission prompts. <kbd class="kbd">Shift+Tab</kbd> or <code>/mode plan|ask|edit|auto</code>. Explicit <code>--yolo</code> implies Auto; governed runtime gates are never bypassed.</dd></div>
  <div class="meta-cell"><dt>Adaptive workspaces</dt><dd>Explore, execute, investigate, review and approval change the header, hints and available actions to match the job. <code>/workspace explore|execute|investigate|review|approval</code>.</dd></div>
  <div class="meta-cell"><dt>Skill modes</dt><dd>Prefix a task with <code>mode:&lt;id&gt;</code> to select a declared mode of a skill. An undeclared mode is an error listing the valid modes, never a silent fallback.</dd></div>
  <div class="meta-cell"><dt>Outcome profiles</dt><dd>Recommended, fast, quality, free, local and assurance profiles shape reasoning previews and governed council defaults. <code>/profile</code>.</dd></div>
</dl>
<p><code>/vibe</code> asks the runtime for the smallest honest pipeline it can justify (and it may decline with a reason). <code>/laya</code> classifies, announces and records low-risk decisions. <code>/settings</code> toggles Vim editing, verbose output and a compact header; <code>/theme graphite|classic|contrast</code> persists the appearance.</p>

<h2 id="bundled-skills">Bundled skills</h2>
<p class="lead">A skill is a packaged way of working, not a prompt you have to remember. Four ship inside the binary, work in any project and on any provider, and rank last in discovery so an installed same-name skill takes precedence. They are also composable into saved workflows with <code>@skill:&lt;name&gt;</code> steps.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="Bundled TUI skills">
  <table>
    <thead><tr><th>Skill</th><th>Modes</th><th>What it does for you</th><th>Start with</th></tr></thead>
    <tbody>
      <tr><td>Product-Owner Intelligence</td><td>quick, discovery, strategy, validation, ai-review, shaping, prd, launch, full</td><td>Turns an ambiguous request into an evidence-backed decision, shaped scope, implementation-ready requirements and measurable outcomes. Strict evidence labels and a never-fabricate rule.</td><td><code>/po</code></td></tr>
      <tr><td>Axym Engineering Intelligence</td><td>quick, standard, deep</td><td>Understand the real outcome, make the smallest complete change, verify it and improve from observed results; capability classes and bounded retries.</td><td><code>/aei</code></td></tr>
      <tr><td>Axym Break-It QA</td><td>—</td><td>Adversarial QA of existing features: five grounded personas, invariants before execution, seeded-fault detection, replayable repro capsules and governed fix → independent retest.</td><td><code>/skill axym-break-it-qa</code></td></tr>
      <tr><td>Reverse engineering</td><td>—</td><td>Reverse engineer shipped software with plain local tools — JS bundles, native binaries, APKs, SQLite, packet captures, firmware and websites — with evidence-marked answers.</td><td><code>/skill reverse-engineering</code></td></tr>
    </tbody>
  </table>
</div>

<h2 id="race-and-solve">/race and axym solve</h2>
<p><code>/race "&lt;goal&gt;" [--oracle "&lt;cmd&gt;"]</code> locks a failing invariant first — it must be proven RED on HEAD with the oracle files hashed — then races isolated worktrees to satisfy it. The worktree bracket runs with anti-tamper verifiers and first-win collapse, winners are proven against a real failure instead of an unverified green claim, and signed race proofs can be kept as evidence. <code>axym solve</code> is the one-shot shell form with the same RED-first invariant gate, for scripts and CI, and returns a structured result with an attached evidence trail.</p>
<div class="callout callout-note">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>Comparing strategies, not fixing a failure?</p>
  <p>Use Council mode: it runs one prompt across several providers in parallel and merges their answers, with the candidate set visible for inspection.</p>
</div>

<h2 id="council">Council mode</h2>
<p><code>/council &lt;prompt&gt;</code> runs the same prompt across two or more providers in parallel and merges their answers into one synthesized response — useful when you want a second opinion without babysitting two sessions. On a governed run, <code>/council --governed "&lt;goal&gt;"</code> uses Borda-ranked consensus with anonymous ballots and a decision record, so you can inspect the full candidate set and the winning rationale.</p>

<h2 id="prompt-cache">Prompt cache: 91% on a repeated prompt</h2>
<p>Providers are stateless CLI calls, so the shared project context is laid out as a stable prefix. In a measured repeated ~40k-token prompt, the same request cost <strong>$0.161 cold</strong> and <strong>$0.008 warm</strong> — a <strong>91% cache hit</strong> (40,268 of 40,270 tokens cached). A repeated prompt is not stripped just because a different provider runs next; doing so would break the prefix the cache exploits.</p>
<dl class="meta-grid">
  <div class="meta-cell"><dt>Cold → warm</dt><dd class="mono">$0.161 → $0.008</dd></div>
  <div class="meta-cell"><dt>Cache hit</dt><dd class="mono">91%</dd></div>
  <div class="meta-cell"><dt>Cached tokens</dt><dd class="mono">40,268 / 40,270</dd></div>
  <div class="meta-cell"><dt>API keys managed</dt><dd class="mono">0</dd></div>
</dl>

<h2 id="warm-handoff">E3 · ≤ 2 KB warm handoff</h2>
<p>When one provider stops, the next receives a compact delta: why the previous provider stopped and what it produced. The handoff stays at or below <strong>2 KB</strong>, so a multi-provider run neither loses the thread nor pays to re-send the entire transcript.</p>

<h2 id="queue">axym queue</h2>
<p><code>axym queue</code> submits governed work without blocking your terminal. Priority is bounded by the runtime's steering rules, and approvals remain human gates — the queue never auto-approves. In the interactive TUI, ordinary prompts queue and drain in order; governed workstreams are refused while a turn is busy so they are never silently stacked behind another run.</p>

<h2 id="verification">Independent verification</h2>
<p>Review and security can run on a different provider than the coder. The run records whether the verifier was independent of the code author or shared its provider and model, so the result is not presented as more independent than it is. Claims are checked against real command output and exit codes, and unverified work is marked <code>UNV</code> rather than scored as perfect.</p>
<p><span class="badge badge-active">Available</span> Cross-provider verification · <span class="badge badge-active">Available</span> Evidence-grounded findings</p>

<h2 id="remote">Phone control and browser bridge</h2>
<p><span class="badge badge-active">Available</span> <code>/remote</code> (alias <code>/rc</code>) serves this live TUI session to a phone. Pair with a QR code over the same Wi-Fi or Tailscale, or use <code>/remote tunnel</code> for Cloudflare from any network. The phone sees the same transcript, sends messages and files, answers the same approval gates, and can steer or stop a turn while the terminal keeps working. <code>/remote status</code> lists connected devices; <code>/remote stop</code> revokes the link.</p>
<p><code>axym web --host 0.0.0.0 --pin 4821</code> serves a phone-friendly page over the governed runtime with live transcript, submit, steer, cancel and approval actions, protected by a PIN or per-start token. A separate read-only watch link lets observers follow without write authority. <code>/detach</code> and <code>axym attach</code> free the terminal while the session keeps running.</p>
<p><span class="badge badge-pending">Experimental</span> Wider mobile connectivity and TLS preview work is tracked separately (T-050) and is not claimed as generally available here.</p>

<h2 id="keyboard">Keyboard shortcuts</h2>
<p class="lead">The terminal is a keyboard-first interface. These bindings cover the composer, navigation, verification and the agent sidebar; context-sensitive hints appear in the footer so you do not have to memorise them all.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="TUI keyboard shortcuts">
  <table>
    <thead><tr><th>Key</th><th>Action</th><th>Note</th></tr></thead>
    <tbody>
      <tr><td><kbd class="kbd">Enter</kbd></td><td>Send; accept and run a completed command</td><td>File mentions insert only.</td></tr>
      <tr><td><kbd class="kbd">Shift+Enter</kbd> / <kbd class="kbd">Ctrl+J</kbd></td><td>Newline</td><td>Also Alt+Enter.</td></tr>
      <tr><td><kbd class="kbd">Esc</kbd></td><td>Interrupt turn · close popup · deny permission gate</td><td>Gate errors and interrupts deny by default.</td></tr>
      <tr><td><kbd class="kbd">Shift+Tab</kbd></td><td>Cycle permission mode</td><td>Plan → Ask → Edit → Auto.</td></tr>
      <tr><td><kbd class="kbd">/</kbd> / <kbd class="kbd">Ctrl+P</kbd></td><td>Command palette</td><td>Tab-complete every command; type to filter.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+F</kbd></td><td>Find in transcript</td><td>n/N for next hit; <code>export:</code> searches saved exports.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+R</kbd></td><td>Reverse prompt-history search</td><td>Last 500 prompts; toggles regex inside find.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+O</kbd></td><td>Toggle verbose tool output</td><td>Full command output and complete diffs.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+G</kbd> / <kbd class="kbd">Ctrl+X Ctrl+E</kbd></td><td>External editor</td><td>Opens the composer in <code>$VISUAL</code> / <code>$EDITOR</code>.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+Shift+F</kbd></td><td>Format pasted prompt</td><td>Large pastes become a collapsible prompt.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+I</kbd> / <kbd class="kbd">Ctrl+Shift+S</kbd></td><td>Attach images or a screenshot</td><td>Added as <code>[Image #n]</code> inputs.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+V</kbd> / <kbd class="kbd">Alt+V</kbd></td><td>Paste clipboard image</td><td>Falls back to previewing text input.</td></tr>
      <tr><td><kbd class="kbd">Alt+I</kbd></td><td>Inline image viewer</td><td>Aspect-correct cell fitting; full restore on close (TUI 0.23.0).</td></tr>
      <tr><td><kbd class="kbd">Ctrl+T</kbd></td><td>Task checklist overlay</td><td>Reflects the agent's real todo state.</td></tr>
      <tr><td><kbd class="kbd">Alt+A</kbd> / <kbd class="kbd">Ctrl+K</kbd></td><td>Toggle / focus the agent sidebar</td><td>Live roster of runtime runs.</td></tr>
      <tr><td><kbd class="kbd">PgUp</kbd> / <kbd class="kbd">PgDn</kbd></td><td>Pause / resume following output; scroll overlays</td><td><kbd class="kbd">End</kbd> resumes following.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+A/E/U/K/W</kbd>, <kbd class="kbd">Alt+F/B/D</kbd></td><td>Composer editing and word motion</td><td>Undo with <kbd class="kbd">Ctrl+Z</kbd>; yank with <kbd class="kbd">Ctrl+Y</kbd>.</td></tr>
      <tr><td><kbd class="kbd">Ctrl+C</kbd> / <kbd class="kbd">Ctrl+D</kbd></td><td>Interrupt or quit</td><td>Interrupt clears input; a second Ctrl+C quits. Ctrl+D quits on empty input.</td></tr>
    </tbody>
  </table>
</div>
<p class="small muted">When a Tier 3 freeze card blocks an action, the turn is interrupted: <kbd class="kbd">k</kbd> kills the action, <kbd class="kbd">r</kbd> continues with redaction, <kbd class="kbd">u</kbd> undoes the pending change when available, and <kbd class="kbd">a</kbd> allows once after you type a reason. <kbd class="kbd">Esc</kbd> also kills it. The reason is recorded on every terminal path.</p>

<h2 id="shared-foundation">Shared foundation</h2>
<p class="lead">All surfaces read the same local event and run model, the same <code>.axym.yaml</code> project configuration and the same provider registry. This is why a project configured once behaves the same way everywhere, and why a run started in one surface can be inspected from another.</p>
<p>Approval before mutation, evidence-backed outcomes and replayable history apply everywhere: a success claim must be backed by real command output, exit codes and verification records, and unverified work is marked as such. Hash-chained events keep a run reproducible and its history tamper-evident.</p>

  </div>

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
