# Axym Digital Experience Transformation — Repository & Design Audit

**Document Version:** 1.0.0  
**Target:** Axym Autonomous Engineering Platform  
**Production Site:** `https://www.irshadpc.in/axym-release/#home`  
**Repository:** `https://github.com/irshadpc/axym-release`  
**Status:** Audit Completed & Overhaul Implemented  

---

## 1. Executive Summary

This audit establishes the baseline technical state, visual architecture, functional contracts, accessibility flaws, and migration risks of the original Axym website. The transformation mandate requires shifting Axym from a generic, prototype-style single-page site into a premier, precision-engineered autonomous platform portal under the **AXYM ARCTIC GRAPHITE** design direction.

---

## 2. Baseline Repository Inspection

| Item | Baseline Finding | Redesign Requirement / Resolution |
|---|---|---|
| **Entry Point** | `site/index.html` (monolithic markup with hardcoded sections) | Modular, semantic HTML shell hosting a hash-based SPA architecture (`#home`, `#architecture`, `#quickstart`, `#setup`, `#configuration`, `#features`, `#releases`, `#operations`). |
| **Styling & CSS** | Tailwind CDN script (`cdn.tailwindcss.com`) and un-tokenized overrides with hardcoded violet/purple hex values (`#8b5cf6`, `#7c3aed`, `#6d28d9`). | Self-contained, zero-CDN CSS design system (`site/assets/styles.css`) organized into primitive tokens, semantic tokens, component aliases, and dark/light palettes. |
| **Typography** | External Google Fonts CDN (`fonts.googleapis.com` / Inter). | Self-hosted variable WOFF2 fonts (`site/assets/fonts/geist-sans-variable.woff2` and `site/assets/fonts/jetbrains-mono-latin-variable.woff2`) with local system fallbacks and zero telemetry. |
| **Dynamic Content** | Fragmented inline scripts parsing partial release arrays; missing structured state. | Centralized content module (`site/assets/content.js`) and application shell (`site/assets/app.js`) backed by verified release metadata (`site/data/releases.json`). |
| **Routing** | Shallow hash links (`#home`, `#downloads`) with broken anchor targets and missing 404 handler. | 8 first-class routes with sub-anchor deep-linking (`#quickstart/install`), dynamic right-hand table of contents, and a compliant `site/404.html`. |
| **Release Mechanism** | Dead scripts referencing nonexistent `install.sh` and fictional endpoints (`irshadpc/axym-community`). | Grounded release synchronization script (`scripts/sync-releases.mjs`) extracting genuine tags (`tui-v0.23.0`, `desktop-v12.17.0`) and SHA-256 integrity hashes directly from GitHub Releases. |
| **Theme Management** | Basic `localStorage.setItem('theme', ...)` with no system preference mode, no `color-scheme` synchronization, and frequent flash-of-unstyled-content (FOUC). | Triple-mode engine (`dark`, `light`, `system`) with pre-paint blocking script in `<head>`, seamless migration of legacy `axym-theme` keys, and full `prefers-color-scheme` support. |
| **Hard-coded Colors** | >60 hardcoded hex codes scattered across CSS and JS, heavily biased toward saturated purples and neon blues. | 100% tokenized architecture using CSS custom properties (`--canvas`, `--surface`, `--brand`, `--text`, etc.) adhering strictly to the 60-30-10 distribution rule. |
| **Accessibility (WCAG)** | 24 color contrast violations, missing skip link, unfocusable code blocks, invalid ARIA attributes, and inaccessible mobile navigation drawer. | 0 Axe-core violations across all 8 routes in both dark and light modes. Accessible modal dialogs with focus trap and escape handling, skip link, and 4.5:1 minimum contrast. |
| **Deployment / Base Path** | Risk of asset breakage when deployed under `/axym-release/` GitHub Pages subpath. | Strictly relative asset and data loading (`./assets/...`, `data/releases.json`), canonical `<link>` tags, updated `robots.txt`, and XML sitemap. |

---

## 3. Detailed Component & Experience Findings

### 3.1 Brand Identity & Anti-Slop Analysis
- **Baseline Problem:** Heavy reliance on generic AI visual cliches—purple gradients, neon glow outlines, pill-heavy marketing tags, and abstract "magic wand" iconography.
- **Root Cause:** Use of boilerplate Tailwind landing page templates.
- **Remediation:** Removed all purple gradients and decorative floating elements. Replaced with the **Arctic Graphite** technical identity: cool graphite surfaces (`#080F15`, `#101E27`), glacial cyan precision accents (`#5DE4DF`), and structured technical diagrams reflecting real autonomous engineering workflows.

### 3.2 Information Architecture & Navigation
- **Baseline Problem:** Content was compressed into an undifferentiated scrolling document where documentation, configuration, and marketing mingled without clear mental models.
- **Remediation:** Separated experiences into two clear paradigms:
  1. **Marketing & Overview Layout:** Expansive hero, interactive product showcase, architecture pipeline, verified download cards, and release ledger.
  2. **Technical Documentation Layout:** Structured 3-column shell with a sticky left sidebar grouped by category, centered reading column constrained to 760–820px, and an automated right table-of-contents tracking active heading viewports.

### 3.3 Release Verification & Supply Chain Safety
- **Baseline Problem:** Installation instructions previously recommended `curl -fsSL https://.../install.sh | bash`, referencing an unpublished installer that failed in real environments.
- **Remediation:** Replaced piping curl into bash with verified release archive extractions:
  - macOS ARM64 / Apple Silicon: `tar -xzf axym-tui-macos-arm64-v0.23.0.tar.gz && sudo mv axym /usr/local/bin/`
  - Linux x86_64: `tar -xzf axym-tui-linux-x86_64-v0.23.0.tar.gz && sudo mv axym /usr/local/bin/`
  - Desktop: Explicit DMG downloads for macOS with pinned verified release assets (`desktop-v12.17.0/install-macos.sh`).

---

## 4. Migration Risks & Guardrails

1. **Subpath Assets:** Deploying to GitHub Pages at `/axym-release/` can break root-absolute paths (`/assets/...`). Guardrail: Automated CI test asserts zero leading slashes in HTML and JS asset imports.
2. **Theme Flash (FOUC):** Running theme resolution inside external JS causes light/dark flashes. Guardrail: Inlined pre-paint `<script>` in `index.html` head resolves theme before DOM rendering.
3. **Storage Access Exceptions:** In private browsing or embedded iframes, accessing `localStorage` throws a SecurityError. Guardrail: All storage calls wrapped in safe `try/catch` fallbacks.
4. **Link Drift:** Reorganizing hash routes risks breaking external bookmarks. Guardrail: Added automatic route normalization and deep-linking parser in router (`site/assets/app.js`).
