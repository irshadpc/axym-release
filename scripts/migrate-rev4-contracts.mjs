#!/usr/bin/env node
/**
 * REV4 Contract A/B migration (one-shot, idempotent):
 *  - capabilities.manifest.json: add node_id (1..5 from story_chapter),
 *    flagship (the 12 REV4 pillars), is_new_24, REV4 tab vocabulary
 *    (core | parallel | mobile | security), surface (Contract B name),
 *    and six missing flagship-family entries.
 *  - anatomy-nodes.json: story-stages.json migrated to the Contract A
 *    schema with REV4 rail labels + node_id.
 * Run: node scripts/migrate-rev4-contracts.mjs
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = resolve(HERE, '../site/data');

/* ---- the 12 REV4 flagship pillars (exact, verified below) -------------- */
const FLAGSHIP = {
  'feat-one-session-any-agent-cli': { problem: 'Every agent CLI ships its own interface, and switching means a new conversation, new habits and new API keys.' },
  'feat-living-repo-brain-and-memory': { problem: 'Agents re-read a codebase from scratch every session, so context is stale, slow and expensive.' },
  'feat-parallel-isolated-runs': { problem: 'Parallel agents in one working tree cause branch collisions, dirty diffs and orphaned child processes.' },
  'feat-council-mode': { problem: 'One model gives one opinion; long queues of work stall while you babysit a single session.' },
  'feat-zero-trust-mcp-tool-access': { problem: 'MCP tools inherit full trust by default, so one malicious or buggy tool sees everything.' },
  'feat-anti-hang-guard': { problem: 'Silent hangs, runaway retries and blind model selection burn time and tokens while you watch.' },
  'feat-shadow-evidence': { problem: 'You cannot judge a speculative step until it commits — by then a wrong assumption is already in the tree.' },
  'tui-device-bridge': { problem: 'Mobile QA is a manual ritual of simulators, screenshots and copy-pasted logs outside the agent loop.' },
  'tui-flow-os': { problem: 'Trusted multi-step procedures live as fragile prompts, and remote surfaces get weaker, read-only tools.' },
  'feat-ship-governed-pipeline': { problem: 'End-to-end pipeline runs lose their approval trail, or land in the repo with no reversible apply.' },
  'feat-sentinel-qa': { problem: 'Green checkmarks hide adversarial gaps, misdiagnosed failures and prompts that quietly lost context.' },
  'feat-web-check': { problem: 'Web and Electron layers ship without anyone checking their security posture.' },
};

/* ---- the six missing flagship-family entries --------------------------- */
const NEW_ENTRIES = [
  {
    id: 'feat-po-thinking', name: '/po Product Thinking', group: 'skills', icon: 'book',
    summary: 'Turns an ambiguous request into an evidence-backed decision, shaped scope and measurable outcomes.',
    commands: ['/po "<request>"', '/po discovery "<area>"'],
    search: 'po product owner thinking scope prd decision shaping ambiguous request requirements',
    maturity: 'stable', introduced_in: '0.23.0', is_new_24: false, flagship: false,
    node_id: 1, tab: 'core', surfaces: ['TUI'],
    one_liner: 'Turn an ambiguous one-liner into an evidence-backed decision before any code is written.',
    command: '/po "<request>"',
    problem: 'Vague one-liner requests produce confident but wrong implementations.',
    what_it_is: 'The bundled Product-Owner Intelligence skill (/po) turns an ambiguous request into an evidence-backed decision, shaped scope, implementation-ready requirements and measurable outcomes — with strict evidence labels and a never-fabricate rule.',
    why_it_matters: 'Scope is decided before code: the agent works from acceptance criteria instead of guessing at intent.',
    use_it: 'Start with /po and answer its evidence questions; feed the shaped scope to /ship or a plan session.',
    limitations: 'Skill output is decision support — humans still approve scope; strict evidence labels mean sparse input yields explicit unknowns, not guesses.',
  },
  {
    id: 'feat-shadow-evidence', name: 'Speculative Shadow Evidence (E14)', group: 'verification', icon: 'layers',
    summary: 'Speculative stages record the evidence they would produce, promoted only through an explicit apply.',
    commands: ['/evidence'],
    search: 'shadow evidence speculative e14 promote apply ledger reversible draft proof',
    maturity: 'stable', introduced_in: '0.24.0', is_new_24: true, flagship: true,
    node_id: 3, tab: 'security', surfaces: ['TUI', 'CLI / Runtime'],
    one_liner: 'Speculative steps leave a full evidence shadow — promoted to the ledger only when you apply.',
    command: '/evidence',
    problem: FLAGSHIP['feat-shadow-evidence'].problem,
    what_it_is: 'Speculative stages record shadow evidence — the inspection records, command outputs and proof drafts they would produce — before anything lands. On apply, shadow records are promoted into the run\u2019s hash-chained evidence; on reject, they leave no residue.',
    why_it_matters: 'Review happens with the full evidence trail visible while every speculative artifact stays reversible.',
    use_it: 'Shadow records are labelled in /evidence and the Result Ledger; promotion follows the explicit apply gate.',
    limitations: 'Shadow records certify nothing on their own; they promote to evidence only through an explicit apply, and stay marked speculative until then.',
  },
  {
    id: 'feat-sentinel-qa', name: 'Sentinel QA, AIDE & axym fitness', group: 'verification', icon: 'shield',
    summary: 'Adversarial QA, run diagnosis and a runtime context fitness check — quality is attacked, not assumed.',
    commands: ['/skill axym-break-it-qa', '/debug <run-id> inspect', 'axym fitness --json'],
    search: 'sentinel adversarial qa break-it personas seeded faults aide debug fitness context json',
    maturity: 'stable', introduced_in: '0.23.0', is_new_24: false, flagship: true,
    node_id: 5, tab: 'security', surfaces: ['TUI', 'CLI / Runtime'],
    one_liner: 'Adversarial QA attacks the change, AIDE diagnoses the run, axym fitness measures the context.',
    command: '/skill axym-break-it-qa',
    problem: FLAGSHIP['feat-sentinel-qa'].problem,
    what_it_is: 'Sentinel adversarial QA attacks a change with grounded personas, invariants and seeded-fault detection; AIDE inspects a misbehaving run\u2019s events with bounded replay; axym fitness audits the session against its declared context (repo-brain freshness, active skills, provider health) and reports fitness as JSON.',
    why_it_matters: 'Quality is attacked, diagnosed and measured — a green dot is the beginning of the review, not the end of it.',
    use_it: 'Run /skill axym-break-it-qa before review, /debug on any suspicious run, and axym fitness --require-context to gate delivery on a passing report.',
    limitations: 'Adversarial personas are grounded in the project\u2019s own documented behaviour; novel attack classes remain human review territory. Fitness reflects the runtime\u2019s own model of context.',
  },
  {
    id: 'feat-web-check', name: 'Web Check & Electron posture (ADR-0007)', group: 'verification', icon: 'globe',
    summary: 'Evidence-backed security posture checks for web and Electron surfaces, recorded in the run.',
    commands: ['/security'],
    search: 'web check electron posture csp context isolation adr-0007 security surface',
    maturity: 'experimental', introduced_in: '0.24.0', is_new_24: true, flagship: true,
    node_id: 5, tab: 'security', surfaces: ['TUI', 'Desktop'],
    one_liner: 'Web and Electron surfaces get the same evidence-backed security scrutiny as backend code.',
    command: '/security',
    problem: FLAGSHIP['feat-web-check'].problem,
    what_it_is: 'Web Check inspects the web/Electron surface — content-security posture, context isolation, navigation and permission defaults — and records findings as evidence in the run, per ADR-0007.',
    why_it_matters: 'Desktop and web layers stop being a security blind spot: their posture is checked, cited and shipped with the run\u2019s evidence.',
    use_it: 'Run /security with a web or Electron target in scope; findings land in the same ledger as code review.',
    limitations: 'Coverage follows ADR-0007\u2019s documented scope; exotic embedding hosts may still need manual review. Experimental: tracked separately from the stable core.',
  },
  {
    id: 'feat-golden-cassettes', name: 'Golden Cassettes (E12)', group: 'runtime', icon: 'play',
    summary: 'Governed runs recorded as replayable benchmarks; regressions are proven diffs against a fixed baseline.',
    commands: ['axym bench --reproduce'],
    search: 'golden cassettes e12 bench reproduce replay benchmark baseline regression recorded',
    maturity: 'experimental', introduced_in: '0.24.0', is_new_24: true, flagship: false,
    node_id: 5, tab: 'security', surfaces: ['CLI / Runtime'],
    one_liner: 'Record a governed run once, replay it forever — regressions become provable diffs.',
    command: 'axym bench --reproduce',
    problem: 'Regression benchmarks drift because each run starts from a slightly different state.',
    what_it_is: 'Golden Cassettes record governed runs as replayable benchmarks: axym bench --reproduce replays a recorded cassette against the current build and diffs the outcome against the golden baseline (E12).',
    why_it_matters: 'Performance and behaviour regressions are proven against a fixed, versioned baseline instead of re-argued from scratch.',
    use_it: 'Record a cassette for a critical flow, then bench --reproduce it in CI or before release.',
    limitations: 'Cassettes pin environment assumptions; regenerate them deliberately when the baseline intentionally changes. Experimental.',
  },
  {
    id: 'feat-axym-fitness', name: 'axym fitness: runtime context check', group: 'runtime', icon: 'activity',
    summary: 'Audits the session against its declared context and reports fitness as JSON for humans and scripts.',
    commands: ['axym fitness --json', 'axym fitness --require-context'],
    search: 'fitness context audit json require-context gate freshness health',
    maturity: 'stable', introduced_in: '0.24.0', is_new_24: true, flagship: false,
    node_id: 5, tab: 'security', surfaces: ['TUI', 'CLI / Runtime'],
    one_liner: 'Measure whether the session still holds the context it claims — before you ship.',
    command: 'axym fitness --json',
    problem: 'A long session can quietly lose the context it claims to hold.',
    what_it_is: 'axym fitness audits the running session against its declared context — repo-brain freshness, active skills, provider health — and reports a fitness result as JSON. --require-context gates delivery on a passing report.',
    why_it_matters: 'Claims about context are measured, not assumed: scripts and gates can require a passing fitness report.',
    use_it: 'Run axym fitness --json for the report; add --require-context to make a failing report block the ship.',
    limitations: 'Fitness reflects the runtime\u2019s own model of context; it is evidence about state, not a substitute for review.',
  },
];

/* ---- REV4 tab vocabulary ------------------------------------------------ */
const TAB_MAP = {
  'core-workflow': 'core',
  'parallel-worktrees': 'parallel',
  'mobile-remote': 'mobile',
  'security-proof': 'security',
  'runtime-flow': 'security',
};

const manifestPath = join(DATA, 'capabilities.manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const byId = new Map(manifest.capabilities.map((c) => [c.id, c]));

/* merge the six new entries (idempotent) */
let added = 0;
for (const entry of NEW_ENTRIES) {
  if (byId.has(entry.id)) continue;
  manifest.capabilities.push(entry);
  byId.set(entry.id, entry);
  added++;
}

/* contract fields on every entry */
const GROUP_FIX = {
  'feat-po-thinking': 'skills',
  'feat-shadow-evidence': 'verification',
  'feat-sentinel-qa': 'verification',
  'feat-web-check': 'verification',
  'feat-golden-cassettes': 'runtime',
  'feat-axym-fitness': 'runtime',
};
let flagged = 0;
for (const cap of manifest.capabilities) {
  if (GROUP_FIX[cap.id]) cap.group = GROUP_FIX[cap.id];
  if (!cap.introduced_in) cap.introduced_in = '0.23.0';
  cap.node_id = cap.story_chapter || cap.node_id || 1;
  cap.story_chapter = cap.node_id;
  cap.flagship = Boolean(FLAGSHIP[cap.id]);
  if (cap.flagship) {
    flagged++;
    if (!cap.problem) cap.problem = FLAGSHIP[cap.id].problem;
    if (!cap.user_problem) cap.user_problem = cap.problem || cap.one_liner;
  }
  delete cap.featured_top12;
  delete cap.flagship_id;
  cap.is_new_24 = cap.introduced_in === '0.24.0';
  cap.tab = TAB_MAP[cap.tab] || cap.tab || 'core';
  if (!cap.surface) cap.surface = cap.surfaces || ['TUI'];
}

/* ensure flagship pillars carry complete REV4 metadata */
const REQUIRED = ['id', 'title', 'one_liner', 'command', 'tab', 'node_id', 'flagship', 'is_new_24', 'surface', 'introduced_in', 'maturity', 'user_problem'];
for (const cap of manifest.capabilities) {
  if (!cap.flagship) continue;
  if (!cap.title) cap.title = cap.name;
  if (!cap.user_problem) cap.user_problem = cap.problem || cap.one_liner;
  for (const field of REQUIRED) {
    if (cap[field] === undefined) throw new Error('flagship ' + cap.id + ' missing ' + field);
  }
}

manifest.tabs = {
  core: 'Core & Brain',
  parallel: 'Parallel & Mux',
  mobile: 'Mobile & Remote',
  security: 'Security & Proof',
};
manifest.contract = 'REV4';
manifest.generatedAt = new Date().toISOString();
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

/* ---- anatomy-nodes.json (Contract A) ----------------------------------- */
/* story-stages.json was migrated to anatomy-nodes.json; if the legacy file
   is already gone, reconcile the existing anatomy file in place. */
const storyPath = join(DATA, 'story-stages.json');
const anatomyPath = join(DATA, 'anatomy-nodes.json');
const LABELS = {
  1: '01 · CLIs & Repo Brain',
  2: '02 · Worktrees & Mux',
  3: '03 · MCP Firewall & Guard',
  4: '04 · Mobile Dev & Remote',
  5: '05 · Proof & /ship',
};
let anatomy;
if (existsSync(storyPath)) {
  const story = JSON.parse(readFileSync(storyPath, 'utf8'));
  anatomy = {
    version: 2,
    contract: 'REV4 Contract A',
    title: story.title,
    notes: story.notes,
    try_flow: story.try_flow,
    nodes: story.chapters.map((ch) => {
      const nodeId = parseInt(ch.num, 10);
      return {
        id: ch.id,
        node_id: nodeId,
        num: ch.num,
        label: LABELS[nodeId],
        title: ch.title,
        lede: ch.lede,
        capability_ids: ch.capabilities || [],
        commands: ch.commands || [],
        stage: ch.stage,
      };
    }),
  };
  if (existsSync(storyPath)) writeFileSync(storyPath, '/* moved */');
} else {
  anatomy = JSON.parse(readFileSync(anatomyPath, 'utf8'));
  anatomy.nodes.forEach((n) => { n.label = LABELS[n.node_id]; });
}
writeFileSync(anatomyPath, JSON.stringify(anatomy, null, 2) + '\n');

console.log('manifest entries:', manifest.capabilities.length,
  '| flagship:', flagged,
  '| new entries added:', added,
  '| nodes:', anatomy.nodes.length);
if (flagged !== 12) throw new Error('expected exactly 12 flagship pillars, got ' + flagged);
console.log('REV4 contract migration complete.');
