# Axym

**An autonomous engineering system: give it a goal in plain English and it plans, writes, reviews, secures and tests the code — with deterministic safeguards and an audit trail for every decision.**

No account, no API keys to get started, no build tools. Download a build below.

[![Latest release](https://img.shields.io/github/v/release/irshadpc/axym-community?label=latest%20release&color=blue)](../../releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../blob/main/LICENSE)

Axym ships as two products that share one runtime:

| | **Axym TUI** — terminal agent | **Axym Desktop** — full app |
|---|---|---|
| What it is | One standalone executable: a session UI, permission gate and headless mode on top of the AI coding CLI you already use | The whole pipeline (plan → design → code → review → security → QA) with mission control, approval gates and in-app updates |
| Best for | Driving your own agent CLI (`claude`, `opencode`, `codex`, `gemini`, `cursor-agent`, `copilot`, `agy`) from a fast terminal UI | Running autonomous multi-stage engineering work end-to-end, with diffs to approve and tamper-evident run history |
| Version | [`0.22.0`](../../releases/tag/tui-v0.22.0) | [`12.17.0`](../../releases/tag/desktop-v12.17.0) |
| Every feature | [TUI catalog](FEATURES.md#axym-tui--terminal-agent) | [Desktop catalog](FEATURES.md#axym-desktop--full-app) |

## Downloads

| Platform | Axym TUI 0.22.0 | Axym Desktop 12.17.0 |
|---|---|---|
| macOS — Apple Silicon & Intel | [axym-0.22.0-macos.tar.gz](https://github.com/irshadpc/axym-community/releases/download/tui-v0.22.0/axym-0.22.0-macos.tar.gz) | [Axym_12.17.0_universal.dmg](https://github.com/irshadpc/axym-community/releases/download/desktop-v12.17.0/Axym_12.17.0_universal.dmg) |
| Linux x86_64 | [axym-0.22.0-linux-x86_64.tar.gz](https://github.com/irshadpc/axym-community/releases/download/tui-v0.22.0/axym-0.22.0-linux-x86_64.tar.gz) | [axym-12.16.0-linux-x86_64.tar.gz](https://github.com/irshadpc/axym-community/releases/download/desktop-v12.16.0/axym-12.16.0-linux-x86_64.tar.gz) ¹ |
| Windows x86_64 | [axym-0.22.0-windows-x86_64.zip](https://github.com/irshadpc/axym-community/releases/download/tui-v0.22.0/axym-0.22.0-windows-x86_64.zip) | [axym-12.16.0-windows-x86_64.zip](https://github.com/irshadpc/axym-community/releases/download/desktop-v12.16.0/axym-12.16.0-windows-x86_64.zip) ¹ |

Every release also carries `SHA256SUMS.txt`; TUI releases add a machine-readable `release-manifest.json` (version, source commit, per-file hashes). See [Verify a download](#verify-a-download).

¹ 12.17.0 ships macOS-only; the newest desktop Linux/Windows builds are the 12.16.0 ones until the next cross-platform build.

## Install

### TUI — macOS & Linux

The macOS archive contains `axym-macos-arm64` (Apple Silicon) and `axym-macos-x64` (Intel); the Linux archive contains `axym-linux-x86_64`.

```sh
tar -xzf axym-0.22.0-macos.tar.gz     # or axym-0.22.0-linux-x86_64.tar.gz
./axym-macos-arm64 --version          # Intel Mac: ./axym-macos-x64
./axym-macos-arm64 --install          # optional: copies to ~/.local/bin + man page
axym                                  # start a session in the current project
```

If macOS Gatekeeper blocks the first launch (browser downloads only), run once:
`xattr -d com.apple.quarantine axym-macos-arm64`

### TUI — Windows

Extract the zip and run `axym-windows-x86_64.exe` from PowerShell or `cmd`. `axym-windows-x86_64.exe --install` copies it to `%LOCALAPPDATA%\Axym\bin\axym.exe` and tells you if that folder isn't on your `PATH` yet.

### Desktop — macOS (one line)

```sh
curl -fsSL https://github.com/irshadpc/axym-community/releases/latest/download/install-macos.sh | bash
```

Downloads the universal `.dmg`, installs to `/Applications`, and clears the Gatekeeper quarantine flag — no Apple developer certificate needed. Prefer manual? Open the `.dmg` and drag Axym to Applications; if macOS then says the app "is damaged", run `sudo xattr -dr com.apple.quarantine /Applications/Axym.app` once (Sequoia/Tahoe: also **System Settings → Privacy & Security → Open Anyway**).

### Desktop — Linux

```sh
tar -xzf axym-12.16.0-linux-x86_64.tar.gz
./axym-linux/axym                 # or ./axym-linux/install.sh
```

Desktop Ubuntu already has the required system-tray library; minimal/server images need `sudo apt install libayatana-appindicator3-1` (Fedora: `sudo dnf install libayatana-appindicator-gtk3`). Looking for `.AppImage`/`.deb`/`.rpm` installers? The newest are on [desktop-v12.8.0](../../releases/tag/desktop-v12.8.0) (AppImage needs `sudo apt install libfuse2`).

### Desktop — Windows

Extract the zip and run `axym.exe`. It needs the WebView2 runtime, already included on Windows 10 (1803+) and Windows 11.

## First steps

**TUI** — needs at least one agent CLI on your `PATH` (`claude`, `opencode`, `codex`, `gemini`, `cursor-agent`, `copilot`, or `agy`):

```sh
axym                                      # interactive session in this project
axym --provider claude --mode plan        # pick a provider; read-only planning mode
axym -p "summarize uncommitted changes"   # headless — for scripts and CI
axym web --host 0.0.0.0 --pin 4821        # drive it from your phone: scan the QR code
axym --doctor                             # check detected providers and setup
axym --man                                # the full manual, in your pager
```

Inside the TUI, type `/` to browse every command with tab completion. The ones worth knowing first:

- `/review`, `/qa` — automated quality and test-coverage passes
- `/security` (alias `/audit`) — evidence-grounded vulnerability scanning
- `/pipeline` — watch a run stage by stage
- `/po` — turn a fuzzy request into a scoped, evidence-backed decision
- `/health`, `/intel`, `/settings` — runtime health, intelligence view, settings
- `/update` — self-update to the newest release (verifies the download first)
- `/copy`, `/vim`, `ctrl+g` — clipboard, Vim keybindings, external `$EDITOR`

**Desktop** — first launch walks you through provider discovery (Axym finds installed AI CLIs automatically; no keys needed to start). Then:

1. Type a goal ("add rate limiting to the API and tests for it").
2. Watch the pipeline DAG: Planner → Designer → Coder → Review → Security → QA.
3. Approve or reject at the gates — you inspect file diffs and tool-execution requests before anything touches your working tree.
4. Every finished run records its own outcome score (accepted? useful? defects prevented?), and QA only passes when real test and build results back it up.

Configure a project by dropping [`.axym.yaml`](https://github.com/irshadpc/axym/blob/main/.axym.yaml.example) at its root (tech stack, style guide, forbidden libs, secret names), and register private agent CLIs in `~/.axym/providers.json`.

## Features

The short version: pick the surface that fits the job. Both share the same providers, project configuration and safety model.

<!-- features:start -->
### Axym TUI — terminal agent

One standalone executable: a session UI, permission gate and headless mode built on top of the AI coding CLI you already use.

- **Sessions, providers & models** — Bring any installed agent CLI, switch models mid-session, and recover when a provider fails.
- **Chat, transcript & results** — Read the agent's work as it happens and see a structured result when the turn ends.
- **Input & editor** — A terminal composer that behaves like a real editor, with fast paths for files, history and images.
- **Modes, permissions & safety** — Decide how much the agent may do, and keep the terminal recoverable when something goes wrong.
- **Workspaces & engineering views** — Move from a conversation to the evidence, graph, health and handoff views behind it.
- **Verification, review & delivery** — Turn a change into evidence: review it, test it, scan it, and keep a reversible history.
- **Skills & customization** — Extend the agent with the same skills and project configuration the desktop app uses.
- **Multi-model, fleet & automation** — Use more than one model deliberately, watch many runs, and automate the TUI from scripts.
- **Collaboration, remote & handoff** — Keep working when you leave the terminal, and let other people follow or take over safely.
- **Runtime, recovery & operations** — Connect to the governed runtime, keep long work alive, and update safely.

### Axym Desktop — full app

The full engineering app: governed plan, design, code, security, review and QA runs with mission control, approval gates and an audit trail.

- **Pipeline & execution** — Turn a plain-English goal into a governed engineering run with the right amount of planning and parallelism.
- **Mission control & navigation** — Start, find and orient work without knowing the internal architecture.
- **Runs, approvals & review** — See exactly what the agent did, approve it with evidence, and compare outcomes.
- **Providers, models & routing** — Use the best available model for each stage and fail over without losing the run.
- **Intelligence & learning** — The system keeps evidence about what worked, what failed and what to try next.
- **Verification, security & governance** — Deterministic checks and non-bypassable policy sit between the model and your working tree.
- **Skills, plugins & customization** — Extend both apps with the same versioned skills, plugins and project context.
- **Operations, observability & assurance** — See the whole system's health, history and release readiness.
- **Collaboration, mobile & continuity** — Move work between people, devices and machines without losing the thread.

### Shared foundation

- **One runtime, three interfaces** — The same Rust/Tauri core backs Desktop, the TUI and the mobile bridge.
- **Safety and evidence** — The same fail-closed rules apply whichever surface you use.
- **Extensibility** — Skills, plugins and project context work across both products.

**[Open the complete feature catalog →](FEATURES.md)** — every command, screen and capability, grouped by what you are trying to do.
<!-- features:end -->

Everything runs on your hardware: embedded Rust/Tauri runtime, SQLite event store, crash-journaled side effects and no telemetry leaving the machine.

## What's new

**TUI 0.22.0** · [full notes](../../releases/tag/tui-v0.22.0)

- **Multi-worker fleet breakdown:** when a run fans out across workers, the TUI now shows the real per-worker fleet breakdown instead of a single opaque aggregate — which worker did what, where it is stuck, and what it costs.
- **Remote E2EE QR mint:** `/remote` QR pairing now carries a fragment-key end-to-end-encryption offer (`/api/e2ee/offer` is wired on the TUI surface), with the host keypair resolved once — no restore-vs-generate race.
- **Goldfish card:** the Elephant-Goldfish review card shows the reviewed revision stamp, so you always know which code revision a review verdict belongs to.
- **Tunnel health:** dead-edge tunnels are never handed out; connector and origin liveness is reported.

**Desktop 12.17.0** · [full notes](../../releases/tag/desktop-v12.17.0)

- **Runtime correctness:** BUG-077 — a submit racing a failing run no longer wedges the writer; BUG-076 — stage-deferring submits are accepted (E19 phone leg certified). Execution evidence is recorded on every terminal cancellation and approval path.
- **Elephant-Goldfish review:** a real fresh-context reviewer (T-040, BUG-075) with a lens panel, persisted spec revisions, revision-bound approvals, adaptive depth, and AST-grounded findings-only spec-to-code drift detection (T-042/T-044).
- **v6.5 multi-provider superagent:** orchestration and verification across providers; the ExecutionCenter surfaces a real multi-worker fleet breakdown (honest fleet data replaces the synthetic UI); unknown providers fail closed and workers are dynamically certified.
- **Remote tunnel:** fragment-key E2EE, a multi-transport manager, and a native-grade PWA for the `/remote` tunnel; `/api/e2ee/offer` wires the QR mint on the desktop surface; two E2EE races (host keypair restore-vs-generate, revoke deadlock) are fixed.
- **Plugin system (v7 bridge):** schema-2 package contract with a local MCP bridge, lifecycle registry with package-integrity enforcement, macOS seatbelt + Linux Landlock confinement, encrypted vault, per-payload disclosure grants, a developer SDK with a full validator, hostile-plugin adversarial coverage, and hardened MCP gateway protocol interop.

> This cycle's desktop build is macOS-only; Linux and Windows desktop artifacts remain at 12.16.0.

Both products now ship the same built-in skills set, and the release pipeline itself is verified by seeded-fault injection — every release gate must detect 11 deliberately planted defects before it can pass.

Full history: [all releases](../../releases).

## Requirements & updates

| | Needs | Admin rights? | How to update |
|---|---|---|---|
| TUI | One agent CLI on `PATH` | No | `/update` or `axym --update` — verifies the download, then installs |
| Desktop macOS | — | No | Download the new `.dmg` (or re-run the one-line installer) |
| Desktop Linux / Windows | System-tray lib (Linux), WebView2 (Windows) | No | Download the new archive from [Releases](../../releases) |

The first launch on any OS may show an "unknown publisher" warning you can dismiss (builds are ad-hoc signed, not notarized).

## Verify a download

Put `SHA256SUMS.txt` (from the same release) in the folder with your download and run:

```sh
shasum -a 256 -c --ignore-missing SHA256SUMS.txt
```

TUI releases also include `release-manifest.json` — version, source commit and per-file hashes.

## Help

- TUI: run `/doctor` and include its output in any bug report.
- [Open an issue](../../issues) with your OS, the file you downloaded, and what happened.
- The full engineering documentation portal (74 pages, every engine and invariant) is in the [source repo](https://github.com/irshadpc/axym).
