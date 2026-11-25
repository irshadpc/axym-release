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
        <li><span class="ok" aria-hidden="true">●</span> TUI <span class="mono">v0.23.0</span></li>
        <li>Desktop <span class="mono">v12.17.0</span></li>
        <li>MIT licensed</li>
        <li>No account required</li>
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
        <div class="capability-aside"><span class="status">Available</span>No account layer</div>
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
      <li class="timeline-item"><div class="timeline-head"><span class="timeline-version">tui-v0.23.0</span><span class="timeline-date">2026-11-05</span></div><p class="timeline-note">Terminal capability probing, inline images and terminal-state restoration.</p></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-band">
      <div>
        <h2>Start with a goal. Keep the evidence.</h2>
        <p>Install a build, run <code>axym --doctor</code>, and start your first governed session.</p>
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
    layout: 'marketing',
    nav: 'architecture',
    title: 'Architecture — Axym',
    description: 'How Axym coordinates a governed engineering run: six stages, approval gates, provider routing, local evidence and a separate lifecycle state model.',
    keywords: 'architecture pipeline stages gates provider routing evidence lifecycle status trust zones local-first',
    html: `<section class="section section-tight" style="padding-top:var(--space-8)">
  <div class="container">
    <div class="section-head" style="max-width:52rem">
      <p class="section-kicker">Architecture</p>
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
      <h2>Objective → stages → evidence.</h2>
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
        <h3>What a gate does</h3>
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
      <h2>Each stage answers a different question.</h2>
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
      <h2>Ten states, never colour alone.</h2>
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
      <h2>Evidence is a closed loop.</h2>
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
<p>Pick your platform. Each command downloads the published archive from <code>tui-v0.23.0</code>, extracts it, and runs the optional <code>--install</code> helper that copies the binary into your user path.</p>
<div class="os-bar" role="group" aria-label="Choose your operating system">
  <button type="button" class="os-tab active" data-os="macos_arm" aria-pressed="true">macOS · Apple Silicon</button>
  <button type="button" class="os-tab" data-os="macos_intel" aria-pressed="false">macOS · Intel</button>
  <button type="button" class="os-tab" data-os="linux" aria-pressed="false">Linux · x86_64</button>
  <button type="button" class="os-tab" data-os="windows" aria-pressed="false">Windows · x86_64</button>
</div>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">TUI · verified archive</span><button type="button" class="copy-btn" data-copy="install-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="install-command" data-install-output="macos_arm">curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.23.0/axym-0.23.0-macos.tar.gz
tar -xzf axym-0.23.0-macos.tar.gz
./axym-macos-arm64 --install</pre></div>
</div>
<p class="small muted">The macOS archive contains both <code>axym-macos-arm64</code> and <code>axym-macos-x64</code>. Windows users can extract the zip and run <code>axym-windows-x86_64.exe --install</code>.</p>

<h2 id="verify">2. Verify the download</h2>
<p>Put <code>SHA256SUMS.txt</code> from the same release beside the archive, then check it before you run anything.</p>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">checksum verification</span><button type="button" class="copy-btn" data-copy="verify-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="verify-command">curl -fLO https://github.com/irshadpc/axym-release/releases/download/tui-v0.23.0/SHA256SUMS.txt
shasum -a 256 -c --ignore-missing SHA256SUMS.txt</pre></div>
</div>

<h2 id="provider">3. Confirm a provider</h2>
<p>Axym detects the agent CLIs already installed on your machine. Run the doctor before starting a session:</p>
<div class="code-shell">
  <div class="code-head"><span class="code-lang">shell</span><span class="code-title">provider discovery</span><button type="button" class="copy-btn" data-copy="doctor-command"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div>
  <div class="code-body"><pre id="doctor-command">axym --doctor</pre></div>
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
axym --doctor
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
    <div class="code-shell"><div class="code-head"><span class="code-lang">shell</span><span class="code-title">account pooling</span><button type="button" class="copy-btn" data-copy="setup-accounts"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy</button></div><div class="code-body"><pre id="setup-accounts">axym --doctor                       <span class="tok-com"># detect provider CLIs + accounts</span>
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
    layout: 'docs',
    nav: 'docs',
    title: 'Features',
    eyebrow: 'Complete TUI feature catalog',
    description: 'Every feature in Axym TUI v0.23.0: sessions, providers and models, chat and results, editor, modes and permissions, workspaces, verification, skills, council and fleet, parallel isolated runs and worktrees, phone control, race, prompt cache, queue and keyboard shortcuts — with what each does and where to use it.',
    keywords: 'features TUI catalog commands slash commands sessions providers models failover modes permissions workspaces pipeline evidence review security skills product-thinking engineering-intelligence break-it-qa sca-fix council race solve queue cache handoff verification remote web phone keyboard shortcuts runs parallel isolated worktrees integration',
    html: `<h1>Features</h1>
<p class="lead">Everything in the shipped Axym TUI <code>v0.23.0</code>, in one place. Each capability says what it does and exactly where to use it, so you can decide whether it solves your problem before you try it. The same catalog is built into the app — type <code>/features</code> or run <code>axym --features</code> — and every command is discoverable with <code>/</code>, <code>/help</code> and <code>/man</code>.</p>

<dl class="meta-grid">
  <div class="meta-cell"><dt>Catalog</dt><dd>61 TUI features · 10 groups · updated 2026-11-06</dd></div>
  <div class="meta-cell"><dt>Command surface</dt><dd>120 slash commands · tab-completed</dd></div>
  <div class="meta-cell"><dt>Maturity key</dt><dd><span class="badge badge-active">Available</span> ships in v0.23.0</dd></div>
  <div class="meta-cell"><dt>Preview</dt><dd><span class="badge badge-pending">Experimental</span> tracked separately</dd></div>
  <div class="meta-cell"><dt>Not shipped</dt><dd><span class="badge badge-neutral">Roadmap</span></dd></div>
</dl>

<h2 id="tui-catalog">Axym TUI — complete catalog</h2>
<p>The terminal build is the primary target: new features, fixes and QA land there first. The groups below mirror the catalog shipped inside the binary, so everything listed is in the verified release. Each entry keeps the exact command or file where you use it; nothing is described only as an idea.</p>

<h3 id="tui-sessions-providers-models">Sessions, providers &amp; models</h3>
<p class="muted">Bring any installed agent CLI, switch models mid-session, and recover when a provider fails.</p>
<ul class="boundary-list">
<li><strong>One session, any agent CLI</strong> — Drive Claude Code, OpenCode, Codex, Gemini CLI, Cursor Agent, GitHub Copilot CLI, Command Code and Antigravity through one consistent terminal interface. <span class="small muted">Use: <code>axym --provider claude</code> · <code>/provider</code> · <code>/model</code></span></li>
<li><strong>Provider discovery and defaults</strong> — Finds installed CLIs on PATH and in common install directories, accepts ids, aliases and display names, and suggests the closest match on a typo. <span class="small muted">Use: <code>~/.axym/config.yaml (default-coder)</code> · <code>~/.axym/provider_paths.json</code></span></li>
<li><strong>Mid-session provider, model and effort switching</strong> — Change the agent, model or reasoning effort without losing the conversation or restarting the session. <span class="small muted">Use: <code>/provider</code> · <code>/model</code> · <code>/models</code> · <code>/effort</code></span></li>
<li><strong>Automatic failover and provider cooldowns</strong> — Classifies failures as immediate, after-reset or never; benches quota walls until their reset time and policy walls for 24h; a circuit breaker stops repeated sub-minute failures. <span class="small muted">Use: <code>Automatic on a failed turn; /priority shows the resolution order</code></span></li>
<li><strong>Persistent Claude connection</strong> — Claude runs as a long-lived stream-JSON process, so repeat turns skip CLI re-initialisation and permission requests flow over live stdin. <span class="small muted">Use: <code>Automatic for the Claude provider</code></span></li>
<li><strong>Sessions, resume and git reconciliation</strong> — Saves every finished turn as JSONL, restores the provider's own session id, and tells you what changed in the workspace since the session was last active. <span class="small muted">Use: <code>/sessions</code> · <code>/resume</code> · <code>/continue</code> · <code>axym -c</code></span></li>
</ul>

<h3 id="tui-chat-transcript-results">Chat, transcript &amp; results</h3>
<p class="muted">Read the agent's work as it happens and see a structured result when the turn ends.</p>
<ul class="boundary-list">
<li><strong>Streaming chat and tool activity</strong> — Token-level deltas, lightweight markdown and animated tool calls with real commands, paths and outputs instead of raw protocol dumps. <span class="small muted">Use: <code>Automatic in every interactive session</code></span></li>
<li><strong>Result Ledger</strong> — Each turn ends with an outcome banner (OK, FAIL, VER, UNV), modified files, verification checks, blockers or risks, a concise summary and contextual next actions. <span class="small muted">Use: <code>Automatic at turn completion; Ctrl+O expands detail</code></span></li>
<li><strong>Markdown and syntax highlighting</strong> — Fenced code is highlighted for JavaScript/TypeScript, Python, Rust, Go, shell, YAML/TOML and C-family languages with no external dependency. <span class="small muted">Use: <code>Automatic in responses</code></span></li>
<li><strong>Message queueing</strong> — Text submitted while a turn is running is queued and drains automatically when the turn ends, with a visible queued count. <span class="small muted">Use: <code>Type while the agent is working</code></span></li>
<li><strong>Transcript search and turn jump</strong> — Search the current session, open a scrollable hit preview, or jump directly to an earlier conversational turn. <span class="small muted">Use: <code>Ctrl+F</code> · <code>/find</code> · <code>/turns</code></span></li>
<li><strong>Copy and export</strong> — Copy the latest or an earlier response to the system clipboard, or save the full transcript as markdown. <span class="small muted">Use: <code>/copy</code> · <code>/export</code></span></li>
</ul>

<h3 id="tui-input-editor">Input &amp; editor</h3>
<p class="muted">A terminal composer that behaves like a real editor, with fast paths for files, history and images.</p>
<ul class="boundary-list">
<li><strong>Multi-line composer with readline keys</strong> — Cursor motion, word jump, kill/yank, undo, history navigation and a hinted footer work across single-line and multi-line input. <span class="small muted">Use: <code>Shift+Enter or Ctrl+J for a newline; Ctrl+A/E/U/K/W for editing</code></span></li>
<li><strong>Vim mode and external editor</strong> — Persistent Vim keybindings for the prompt, or open the current prompt in your own $VISUAL/$EDITOR. <span class="small muted">Use: <code>/vim</code> · <code>Ctrl+G</code></span></li>
<li><strong>@file completion</strong> — Fuzzy-complete project files from git ls-files, or a bounded directory walk outside git, ranked by filename, path and subsequence match. <span class="small muted">Use: <code>Type @ followed by part of a path</code></span></li>
<li><strong>Prompt history and reverse search</strong> — Keeps the last 500 prompts and offers bash-style reverse search over them. <span class="small muted">Use: <code>Up/Down</code> · <code>Ctrl+R</code></span></li>
<li><strong>Paste formatting and image attachments</strong> — Formats large pasted text into a collapsible prompt, and attaches screenshots or image files as [Image #n] inputs. <span class="small muted">Use: <code>Ctrl+Shift+F</code> · <code>Ctrl+V</code> · <code>Ctrl+I</code> · <code>Ctrl+Shift+S</code></span></li>
</ul>

<h3 id="tui-modes-permissions-safety">Modes, permissions &amp; safety</h3>
<p class="muted">Decide how much the agent may do, and keep the terminal recoverable when something goes wrong.</p>
<ul class="boundary-list">
<li><strong>Plan, Ask, Edit and Auto modes</strong> — Plan is read-only, Ask never edits, Edit auto-accepts file edits, and Auto bypasses permission prompts; each maps to the provider's native permission mode. <span class="small muted">Use: <code>Shift+Tab</code> · <code>/mode plan|ask|edit|auto</code></span></li>
<li><strong>Inline permission gate</strong> — Permission-requiring tool calls are relayed to the TUI and answered there: allow or deny with the real command or path shown. Gate errors and interrupts deny by default. <span class="small muted">Use: <code>Answer y or n when a gate appears; AXYM_TUI_NO_RELAY=1 opts out</code></span></li>
<li><strong>Always-allow command list</strong> — Review or clear exact commands you have chosen to always allow, so repeated safe commands stop asking. <span class="small muted">Use: <code>/permissions</code> · <code>/permissions clear</code></span></li>
<li><strong>Explicit YOLO mode</strong> — Skips every approval prompt and implies Auto mode, with the risk stated up front. Governed runtime approval gates are never bypassed. <span class="small muted">Use: <code>axym --yolo</code></span></li>
<li><strong>Crash-safe terminal handling</strong> — A render error or external signal unmounts cleanly, restores raw-mode terminal state, and releases the wake-lock child instead of leaving a garbled screen. <span class="small muted">Use: <code>Automatic</code></span></li>
</ul>

<h3 id="tui-workspaces-engineering-views">Workspaces &amp; engineering views</h3>
<p class="muted">Move from a conversation to the evidence, graph, health and handoff views behind it.</p>
<ul class="boundary-list">
<li><strong>Adaptive workspaces</strong> — Switch the session between explore, execute, investigate, review and approval modes so the header, hints and available actions match the job. <span class="small muted">Use: <code>/workspace explore|execute|investigate|review|approval</code></span></li>
<li><strong>Pipeline view</strong> — Lists recent runtime runs, then shows a run's recorded stages, files and verification events stage by stage. <span class="small muted">Use: <code>/pipeline [run-id]</code></span></li>
<li><strong>Execution graph</strong> — Interactive stage, gate, agent and task dependency tree for a runtime run. <span class="small muted">Use: <code>/graph [run-id]</code></span></li>
<li><strong>Evidence browser</strong> — Inspect the evidence primitive behind a claim: inspected, inferred, verified and failed proof. <span class="small muted">Use: <code>/evidence [id]</code></span></li>
<li><strong>Health, intelligence and observatory</strong> — Read the daemon self-report and provider cooldowns, the AEI decision ledger with estimates and measured outcomes, and active skills with evaluation candidates. <span class="small muted">Use: <code>/health</code> · <code>/intel</code> · <code>/observatory</code></span></li>
<li><strong>Handover and Work Passport</strong> — See session state, unresolved tasks and uncommitted work, or show and export the durable passport (product brief, acceptance criteria, execution truth, recovery context). <span class="small muted">Use: <code>/handover</code> · <code>/passport</code></span></li>
<li><strong>Settings, themes and density</strong> — Toggle Vim editing, verbose tool output and a compact header, or switch between graphite, classic and high-contrast themes. <span class="small muted">Use: <code>/settings</code> · <code>/theme graphite|classic|contrast</code></span></li>
</ul>

<h3 id="tui-verification-review-delivery">Verification, review &amp; delivery</h3>
<p class="muted">Turn a change into evidence: review it, test it, scan it, and keep a reversible history.</p>
<ul class="boundary-list">
<li><strong>Code review and QA</strong> — Runs a code-quality pass for hidden assumptions, simplicity, surgical diffs, edge cases and test completeness, with file and line references. <span class="small muted">Use: <code>/review [goal]</code> · <code>/qa [goal]</code></span></li>
<li><strong>Security review</strong> — Threat-models the target, reviews code and configuration with captured evidence, and returns a prioritized remediation plan. <span class="small muted">Use: <code>/security [goal]</code> · <code>/audit</code> · <code>/security-audit</code></span></li>
<li><strong>Background test runner</strong> — Runs the project's tests without blocking the conversation and reports the result back into the session. <span class="small muted">Use: <code>/test [command]</code></span></li>
<li><strong>Diff, pull, undo and bisect</strong> — Inspect uncommitted changes, pull the remote tracking branch, shelve work into a reversible stash, or binary-search checkpoints for the turn that introduced a regression. <span class="small muted">Use: <code>/diff</code> · <code>/pull</code> · <code>/undo</code> · <code>/bisect</code></span></li>
<li><strong>Reusable workflows</strong> — Define a named sequence of prompts once, then replay it on any provider. Four starter workflows cover engineering, product discovery, security review and QA. <span class="small muted">Use: <code>/workflow new|run|save|list</code> · <code>/workflows</code></span></li>
<li><strong>Project setup</strong> — Writes a starter .axym.yaml shared with the desktop app, without ever overwriting an existing file. <span class="small muted">Use: <code>/init</code></span></li>
</ul>

<h3 id="tui-skills-customization">Skills &amp; customization</h3>
<p class="muted">Extend the agent with the same skills and project configuration the desktop app uses.</p>
<ul class="boundary-list">
<li><strong>Bundled skills</strong> — Product-Owner Intelligence, Axym Engineering Intelligence, reverse engineering, break-it QA and sca-fix ship inside the binary and work in any project. <span class="small muted">Use: <code>/skills</code> · <code>/skill &lt;name&gt; [task]</code> · <code>/po</code> · <code>/aei</code></span></li>
<li><strong>Project and user skills</strong> — Discovers SKILL.md definitions from .agents, .claude, .codex and compatible project or user folders, with mode support. <span class="small muted">Use: <code>/skills</code> · <code>/skill &lt;name&gt; [task]</code></span></li>
<li><strong>Bundled SCA remediation</strong> — Runs the sca-fix skill to upgrade a Java/Maven pom.xml and write a plain-language justification spreadsheet for a Sonatype/SCA report. <span class="small muted">Use: <code>/sca-fix [report-pdf]</code></span></li>
<li><strong>Slash-command plugins</strong> — External modules can register narrow slash commands; built-in commands always win. <span class="small muted">Use: <code>See the plugin API in the TUI docs</code></span></li>
<li><strong>Project configuration</strong> — Reads .axym.yaml for tech stack, language, style guide, forbidden libraries, custom instructions, secrets, capabilities and budgets. <span class="small muted">Use: <code>.axym.yaml at the project root</code></span></li>
</ul>

<h3 id="tui-multi-model-fleet-automation">Multi-model, fleet &amp; automation</h3>
<p class="muted">Use more than one model deliberately, watch many runs, and automate the TUI from scripts.</p>
<ul class="boundary-list">
<li><strong>Council mode</strong> — Runs the same prompt across two or more providers in parallel and merges their answers into one synthesized response. <span class="small muted">Use: <code>/council &lt;prompt&gt;</code></span></li>
<li><strong>Cross-provider verification</strong> — Run review or security on a different provider than the coder; the run labels whether the verifier was independent of the code author or shared its provider and model. <span class="small muted">Use: <code>Desktop → Expert options → AI system per stage</code></span></li>
<li><strong>Agent Hub and fleet overview</strong> — Toggle a live roster of runtime runs, select and attach to one, or read configured capacity, active runs, oldest in-flight work and recent failures. <span class="small muted">Use: <code>Alt+A</code> · <code>/agents</code> · <code>/fleet</code></span></li>
<li><strong>Run comparison and stage costs</strong> — Compare what two runtime runs actually ran against (commit, dependencies, config), and read per-stage token, spend and call-count evidence. <span class="small muted">Use: <code>/compare [run-a run-b]</code> · <code>/pipeline</code> · <code>/cost [run-id]</code></span></li>
<li><strong>Headless mode</strong> — Run one prompt from the shell or stdin with text or JSONL output and stable exit codes for scripts and CI. <span class="small muted">Use: <code>axym -p "prompt"</code> · <code>--format json</code> · <code>exit 0/1/2/130</code></span></li>
<li><strong>Live run steering and queueing</strong> — Change course mid-turn at the next safe boundary on the governed runtime, or queue guidance for later without interrupting the run. <span class="small muted">Use: <code>/steer &lt;instruction&gt;</code> · <code>/queue &lt;instruction&gt;</code></span></li>
<li><strong>Follow, fork and compare runtime runs</strong> — Attach to a Desktop or Mobile run with durable replay and live updates, fork it into a child lineage, or open a second read-only viewer. <span class="small muted">Use: <code>/attach</code> · <code>/view</code> · <code>/fork</code></span></li>
<li><strong>Parallel isolated runs</strong> — Start several governed pipeline runs in isolated linked worktrees, switch the visible run without mixing events or staged files, and preview or explicitly apply a finished run's worktree integration. The daemon gates structural worktree creation behind <code>AXYM_PERSISTENT_RUNTIME=1</code>. <span class="small muted">Use: <code>/runs list</code> · <code>/runs start "&lt;goal&gt;" --worktree</code> · <code>/runs switch &lt;id&gt;</code> · <code>/runs integrate [id] [--apply]</code></span></li>
</ul>

<h3 id="tui-collaboration-remote-handoff">Collaboration, remote &amp; handoff</h3>
<p class="muted">Keep working when you leave the terminal, and let other people follow or take over safely.</p>
<ul class="boundary-list">
<li><strong>Share and read-only viewing</strong> — Share a session or live run with collaborators; viewers follow an isolated read-only event stream and cannot steer, approve or write. <span class="small muted">Use: <code>/share [run-id]</code> · <code>/view &lt;run-id&gt;</code></span></li>
<li><strong>Phone pairing</strong> — Continue the live session from a phone over the same Wi-Fi, Tailscale or a Cloudflare tunnel, with a QR pairing card, PIN or scoped access and a revocable link. <span class="small muted">Use: <code>/remote</code> · <code>/remote tunnel</code> · <code>/remote status</code> · <code>/remote stop</code></span></li>
<li><strong>Browser bridge</strong> — Serve a phone-friendly page over the governed runtime with live transcript, submit, steer, cancel and approval actions, protected by a PIN or token. <span class="small muted">Use: <code>axym web --host 0.0.0.0 --pin 4821</code></span></li>
<li><strong>Detach and attach</strong> — Free the terminal while the session keeps running, then return from any terminal or SSH login with the transcript redrawn at the new size. <span class="small muted">Use: <code>/detach</code> · <code>axym attach</code> · <code>axym -c</code></span></li>
<li><strong>Push notifications</strong> — Send a push when a turn finishes, fails, or every provider is cooling, through ntfy.sh or a self-hosted topic. <span class="small muted">Use: <code>/notify</code> · <code>~/.axym/tui/notify.json</code></span></li>
<li><strong>Session and run handoff</strong> — Export or import a session, or move a multi-machine run checkpoint with offer, export, accept, status and retract actions. <span class="small muted">Use: <code>/handoff</code> · <code>/run-handoff</code></span></li>
</ul>

<h3 id="tui-runtime-recovery-operations">Runtime, recovery &amp; operations</h3>
<p class="muted">Connect to the governed runtime, keep long work alive, and update safely.</p>
<ul class="boundary-list">
<li><strong>Governed runtime connection</strong> — Use axym-runtime for durable runs, evidence, approvals, fleet views and run replay while keeping the same terminal interface. <span class="small muted">Use: <code>axym --provider axym-runtime</code> · <code>/attach</code> · <code>/pipeline</code></span></li>
<li><strong>Laya decisions and vibe mode</strong> — Classify low-risk decisions, announce and record them, or ask the runtime for the smallest honest pipeline it can justify. <span class="small muted">Use: <code>/laya on|off|status</code> · <code>/vibe on|off|status</code></span></li>
<li><strong>Provider priority</strong> — Show how the default provider was resolved across environment variables, config and provider manifests. <span class="small muted">Use: <code>/priority</code></span></li>
<li><strong>Self-update with checksum verification</strong> — Checks the release channel, downloads the platform asset, verifies its SHA-256 against SHA256SUMS.txt and installs atomically. <span class="small muted">Use: <code>/update</code> · <code>axym --update</code> · <code>--update-force</code></span></li>
<li><strong>Keep-awake during long runs</strong> — Holds a power assertion while a turn runs so idle sleep cannot suspend the work; opt out with a marker file. <span class="small muted">Use: <code>Automatic; ~/.axym/tui/no-keep-awake to disable</code></span></li>
<li><strong>Atomic local state</strong> — Sessions, history and allow-lists are written with a temp-file, fsync and rename sequence, so a crash cannot leave half-written state. <span class="small muted">Use: <code>Automatic</code></span></li>
<li><strong>AIDE run diagnosis and event inspection</strong> — On a connected runtime run, inspect failure evidence, event integrity, bounded pipeline replay and run-scoped effect counts. Pause, investigate or resume diagnosis while retaining the original run and its permissions. Observations do not certify a repair. <span class="small muted">Use: <code>/debug [run-id]</code> · <code>/debug [run-id] inspect</code></span></li>
</ul>

<h2 id="command-surface">Command surface at a glance</h2>
<p>Type <code>/</code> for the tab-completed command list, <code>/help</code> to filter by name, <code>/man</code> for the full built-in manual, and <code>/features</code> for this catalog. All 120 commands ship in the executable — none are hidden behind another app.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="TUI command surface">
  <table>
    <thead><tr><th>Area</th><th>Commands / keys</th><th>What it gives you</th></tr></thead>
    <tbody>
      <tr><td>Find and learn</td><td><code>/</code> · <code>/help</code> · <code>/man</code> · <code>/features</code></td><td>Every command with hints and tab completion, a filterable manual and the built-in catalog.</td></tr>
      <tr><td>Session control</td><td><code>/new</code> · <code>/sessions</code> · <code>/resume</code> · <code>/continue</code> · <code>/detach</code> · <code>/exit</code></td><td>Save, find, resume and leave sessions without losing the thread.</td></tr>
      <tr><td>Providers and models</td><td><code>/provider</code> · <code>/model</code> · <code>/models</code> · <code>/effort</code> · <code>/priority</code> · <code>/accounts</code></td><td>Pick the CLI, model, reasoning effort and account, and see how defaults resolve.</td></tr>
      <tr><td>Modes and workspace</td><td><kbd class="kbd">Shift+Tab</kbd> · <code>/mode</code> · <code>/workspace</code> · <code>/settings</code> · <code>/theme</code></td><td>Plan / Ask / Edit / Auto permissions and five task-shaped workspaces.</td></tr>
      <tr><td>Verify and review</td><td><code>/review</code> · <code>/qa</code> · <code>/security</code> · <code>/test</code> · <code>/diff</code> · <code>/checkpoint</code> · <code>/undo</code> · <code>/bisect</code></td><td>Independent checks, real test output and reversible file changes.</td></tr>
      <tr><td>Governed runtime</td><td><code>/ship</code> · <code>/runs</code> · <code>/approve</code> · <code>/reject</code> · <code>/pipeline</code> · <code>/graph</code> · <code>/evidence</code> · <code>/fleet</code> · <code>/attach</code></td><td>Durable runs with human gates, stage evidence, isolated worktrees and a live roster.</td></tr>
      <tr><td>Skills and workflows</td><td><code>/skills</code> · <code>/skill &lt;name&gt;</code> · <code>/po</code> · <code>/aei</code> · <code>/workflow</code> · <code>/flow</code></td><td>Reusable prompts, bundled experts and saved multi-step procedures.</td></tr>
      <tr><td>Remote and continuity</td><td><code>/remote</code> · <code>/share</code> · <code>/view</code> · <code>/notify</code> · <code>/handoff</code></td><td>Phone control, read-only viewers, notifications and work across machines.</td></tr>
    </tbody>
  </table>
</div>
<p class="small muted">Runtime-backed commands (for example <code>/ship</code>, <code>/pipeline</code>, <code>/fleet</code> and <code>/attach</code>) need a connected <code>axym-runtime</code> daemon. The core chat, edit and session loop works with any installed agent CLI.</p>

<h2 id="parallel-runs">Parallel isolated runs</h2>
<p><span class="badge badge-active">Available</span> Run several governed pipeline jobs at once, each in its own linked worktree. The daemon's local event log stays the authority; the TUI keeps a run-keyed view, so switching runs cannot show another run's events, status or staged files. Finishing one run does not stop the agents or builds of the others.</p>
<dl class="meta-grid">
  <div class="meta-cell"><dt>List watched runs</dt><dd><code>/runs</code> or <code>/runs list</code> — id, status, goal and worktree path, with the visible run marked.</dd></div>
  <div class="meta-cell"><dt>Start isolated</dt><dd><code>/runs start "&lt;goal&gt;" --worktree</code> — create the linked worktree first, then submit the governed six-stage run into it.</dd></div>
  <div class="meta-cell"><dt>Switch</dt><dd><code>/runs switch &lt;id | id-prefix | list-index&gt;</code> — unknown or ambiguous targets are refused without changing the visible run.</dd></div>
  <div class="meta-cell"><dt>Integrate</dt><dd><code>/runs integrate [id]</code> previews; <code>/runs integrate [id] --apply</code> merges a finished run's worktree. Nothing merges without the explicit flag, and conflicts or a dirty target are refused.</dd></div>
  <div class="meta-cell"><dt>Stop watching</dt><dd><code>/runs close &lt;id&gt;</code> — stops this terminal's watcher; the daemon run itself is unaffected.</dd></div>
</dl>
<p>Every watcher uses its own client id and identity guard, so a background run's live lines never appear in the visible run's transcript. <code>/pipeline</code>, <code>/cost</code> and the gate decisions <code>/approve</code>, <code>/reject</code>, <code>/revise</code> and <code>/cancel</code> follow the run you switched to. Staged files are read from that run's own worktree or project path, never another run's.</p>
<div class="callout callout-note">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>Structural worktree gate</p>
  <p>Creating a new linked worktree is a daemon structural op gated by <code>AXYM_PERSISTENT_RUNTIME=1</code>. If the gate refuses, the error is shown verbatim and no run is submitted into the main project tree. Forking an already-started run into a worktree (<code>/fork --worktree</code>) remains available without that gate.</p>
</div>

<h2 id="modes">Four ways to shape the work</h2>
<dl class="meta-grid">
  <div class="meta-cell"><dt>Permission modes</dt><dd>Plan is read-only, Ask never edits, Edit auto-accepts file edits, Auto bypasses permission prompts. <kbd class="kbd">Shift+Tab</kbd> or <code>/mode plan|ask|edit|auto</code>. Explicit <code>--yolo</code> implies Auto; governed runtime gates are never bypassed.</dd></div>
  <div class="meta-cell"><dt>Adaptive workspaces</dt><dd>Explore, execute, investigate, review and approval change the header, hints and available actions to match the job. <code>/workspace explore|execute|investigate|review|approval</code>.</dd></div>
  <div class="meta-cell"><dt>Skill modes</dt><dd>Prefix a task with <code>mode:&lt;id&gt;</code> to select a declared mode of a skill. An undeclared mode is an error listing the valid modes, never a silent fallback.</dd></div>
  <div class="meta-cell"><dt>Outcome profiles</dt><dd>Recommended, fast, quality, free, local and assurance profiles shape reasoning previews and governed council defaults. <code>/profile</code>.</dd></div>
</dl>
<p><code>/vibe</code> asks the runtime for the smallest honest pipeline it can justify (and it may decline with a reason). <code>/laya</code> classifies, announces and records low-risk decisions. <code>/settings</code> toggles Vim editing, verbose output and a compact header; <code>/theme graphite|classic|contrast</code> persists the appearance.</p>

<h2 id="bundled-skills">Bundled skills</h2>
<p>Five skills ship inside the binary, work in any project and on any provider, and rank last in discovery so an installed same-name skill takes precedence. They are also composable into saved workflows with <code>@skill:&lt;name&gt;</code> steps.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="Bundled TUI skills">
  <table>
    <thead><tr><th>Skill</th><th>Modes</th><th>What it does for you</th><th>Start with</th></tr></thead>
    <tbody>
      <tr><td>Product-Owner Intelligence</td><td>quick, discovery, strategy, validation, ai-review, shaping, prd, launch, full</td><td>Turns an ambiguous request into an evidence-backed decision, shaped scope, implementation-ready requirements and measurable outcomes. Strict evidence labels and a never-fabricate rule.</td><td><code>/po</code></td></tr>
      <tr><td>Axym Engineering Intelligence</td><td>quick, standard, deep</td><td>Understand the real outcome, make the smallest complete change, verify it and improve from observed results; capability classes and bounded retries.</td><td><code>/aei</code></td></tr>
      <tr><td>Axym Break-It QA</td><td>—</td><td>Adversarial QA of existing features: five grounded personas, invariants before execution, seeded-fault detection, replayable repro capsules and governed fix → independent retest.</td><td><code>/skill axym-break-it-qa</code></td></tr>
      <tr><td>Reverse engineering</td><td>—</td><td>Reverse engineer shipped software with plain local tools — JS bundles, native binaries, APKs, SQLite, packet captures, firmware and websites — with evidence-marked answers.</td><td><code>/skill reverse-engineering</code></td></tr>
      <tr><td>sca-fix</td><td>—</td><td>Remediate a Sonatype/SCA report for Java/Maven: upgrade <code>pom.xml</code> where a real fix exists, never remove what the app uses, and write a plain-language justification spreadsheet.</td><td><code>/sca-fix [report-pdf]</code></td></tr>
    </tbody>
  </table>
</div>

<h2 id="race-and-solve">/race and axym solve</h2>
<p><code>/race "&lt;goal&gt;" [--oracle "&lt;cmd&gt;"]</code> locks a failing invariant first — it must be proven RED on HEAD with the oracle files hashed — then races isolated worktrees to satisfy it. The winner is proven against a real failure instead of an unverified green claim. <code>axym solve</code> is the one-shot shell form with the same invariant-lock gate, for scripts and CI, and returns a structured result with an attached evidence trail.</p>
<div class="callout callout-note">
  <p class="callout-title"><svg class="icon" aria-hidden="true"><use href="#i-info"/></svg>Comparing strategies, not fixing a failure?</p>
  <p>Use Council mode below: it runs one prompt across several providers in parallel and merges their answers, with latency, model and cost visible side by side.</p>
</div>

<h2 id="council">Council mode</h2>
<p><code>/council &lt;prompt&gt;</code> runs the same prompt across two or more providers in parallel and merges their answers into one synthesized response — useful when you want a second opinion without babysitting two sessions. On a governed run, <code>/council --governed "&lt;goal&gt;"</code> uses Borda-ranked consensus with anonymous ballots and a decision record, so you can inspect the full candidate set and the winning rationale.</p>

<h2 id="prompt-cache">E1.2 · 91% prompt cache</h2>
<p>Providers are stateless CLI calls, so the shared project context is laid out as a stable prefix. A repeated ~40k-token prompt that cost <strong>$0.161 cold</strong> costs <strong>$0.008 warm</strong> — <strong>91% cache hit</strong> (40,268 of 40,270 tokens cached). A repeated prompt is not stripped just because a different provider runs next; doing so would break the prefix the cache exploits.</p>
<dl class="meta-grid">
  <div class="meta-cell"><dt>Cold → warm</dt><dd class="mono">$0.161 → $0.008</dd></div>
  <div class="meta-cell"><dt>Cache hit</dt><dd class="mono">91%</dd></div>
  <div class="meta-cell"><dt>Cached tokens</dt><dd class="mono">40,268 / 40,270</dd></div>
  <div class="meta-cell"><dt>API keys managed</dt><dd class="mono">0</dd></div>
</dl>

<h2 id="warm-handoff">E3 · ≤ 2 KB warm handoff</h2>
<p>When one provider stops, the next receives a compact delta: why the previous provider stopped and what it produced. The handoff stays at or below <strong>2 KB</strong>, so a multi-provider run neither loses the thread nor pays to re-send the entire transcript.</p>

<h2 id="queue">axym queue</h2>
<p><code>axym queue</code> submits governed work without blocking your terminal. Priority steering is bounded by ADR-0021, each queued item keeps its own idempotency and expected sequence (ADR-0007), and approvals remain human gates — the queue never auto-approves.</p>

<h2 id="verification">Independent verification</h2>
<p>Review and security can run on a different provider than the coder. The run records whether the verifier was independent of the code author or shared its provider and model, so the result is not presented as more independent than it is. Claims are checked against real command output and exit codes, and unverified work is marked <code>UNV</code> rather than scored as perfect.</p>
<p><span class="badge badge-active">Available</span> Cross-provider verification · <span class="badge badge-active">Available</span> Evidence-grounded findings</p>

<h2 id="remote">Phone control and browser bridge</h2>
<p><span class="badge badge-active">Available</span> <code>/remote</code> (alias <code>/rc</code>) serves this live TUI session to a phone. Pair with a QR code over the same Wi-Fi or Tailscale, or use <code>/remote tunnel</code> for Cloudflare from any network. The phone sees the same transcript, sends messages and files, answers the same approval gates, and can steer or stop a turn while the terminal keeps working. <code>/remote status</code> lists connected devices; <code>/remote stop</code> revokes the link.</p>
<p><code>axym web --host 0.0.0.0 --pin 4821</code> serves a phone-friendly page over the governed runtime with live transcript, submit, steer, cancel and approval actions, protected by a PIN or per-start token. A separate read-only watch link lets observers follow without write authority. <code>/detach</code> and <code>axym attach</code> free the terminal while the session keeps running.</p>
<p><span class="badge badge-pending">Experimental</span> Wider mobile connectivity and TLS preview work is tracked separately (T-050) and is not claimed as generally available here.</p>

<h2 id="keyboard">Keyboard shortcuts</h2>
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
<p>All surfaces read the same local event and run model, the same <code>.axym.yaml</code> project configuration and the same provider registry. Approval before mutation, evidence-backed outcomes and replayable history apply everywhere: a success claim must be backed by real command output, exit codes and verification records, and unverified work is marked as such. Hash-chained events keep a run reproducible and its history tamper-evident.</p>`
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
      <tr><td>Axym TUI</td><td><code>v0.23.0</code></td><td>macOS (arm64 + x64), Linux x86_64, Windows x86_64</td><td><span class="badge badge-active">active · 2026-11-05</span></td></tr>
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
shasum -a 256 axym-0.23.0-macos.tar.gz</pre></div></div>

<h2 id="published-artifacts">Published artifacts</h2>
<p>Hashes and links below come straight from the release manifests. Copy a full SHA-256 value with the button in each row.</p>
<div id="artifacts-grid"><p class="muted small">Loading published artifacts…</p></div>

<h2 id="history">Release history</h2>
<p>Published releases, newest first.</p>
<ol class="timeline" id="release-timeline">
  <li class="timeline-item"><div class="timeline-head"><span class="timeline-version">tui-v0.23.0</span><span class="timeline-date">2026-11-05</span></div><p class="timeline-note">Terminal capability probing, inline images and terminal-state restoration.</p></li>
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
    <button type="button" class="acc-trigger" aria-expanded="false" aria-controls="acc-2">No provider detected by axym --doctor<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
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
