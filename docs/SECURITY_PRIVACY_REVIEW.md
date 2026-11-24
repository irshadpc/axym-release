# Axym Digital Experience — Security, Privacy & Supply-Chain Review

**Target:** Axym Autonomous Engineering Platform Portal  
**Deployment Context:** GitHub Pages (`https://www.irshadpc.in/axym-release/`)  
**Auditor:** Quality Assurance & Developer Experience Architects  
**Status:** Certified Production-Ready / Zero Critical Vulnerabilities  

---

## 1. Executive Summary

In keeping with Axym’s brand positioning as a governed, local-first engineering platform, the website was audited to verify that no supply-chain vectors, unverified third-party scripts, covert tracking telemetry, or unsafe DOM injection patterns exist.

| Category | Baseline Assessment | Overhaul Verification | Status |
|---|---|---|---|
| **External Script Dependencies** | Loaded `cdn.tailwindcss.com` | **Zero external runtime scripts (100% self-hosted)** | **SECURE** |
| **Telemetry & Trackers** | Potential CDN font tracking | **Zero telemetry, zero cookies, zero analytic beacons** | **SECURE** |
| **Supply-Chain Integrity** | Dead `install.sh` piped to bash | **Direct GitHub Release tarballs with verified SHA-256** | **SECURE** |
| **Cross-Site Scripting (XSS)** | Direct innerHTML injection | **Sanitized templating with strict `escapeHtml()` guards** | **SECURE** |
| **External Link Safety** | Inconsistent `rel` attributes | **Mandatory `target="_blank" rel="noopener"` on external links** | **SECURE** |
| **Local-First Boundary Claims** | Unverified privacy claims | **Grounded boundaries: local execution vs provider inference** | **SECURE** |

---

## 2. Supply-Chain & Dependency Audit

### 2.1 Elimination of External CDN Runtimes
- **Vulnerability Eliminated:** The original site loaded Tailwind CSS via `https://cdn.tailwindcss.com`. If the external CDN were compromised, poisoned, or suffered an outage, visitors' browsers could execute unauthorized arbitrary JavaScript or experience a complete site failure.
- **Remediation:** Removed the external CDN script tag completely. The entire visual system is now driven by static, self-hosted CSS in `site/assets/styles.css`.

### 2.2 Self-Hosted Typography
- **Privacy Assurance:** Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) previously transmitted visitor IP addresses and User-Agent headers to external third-party servers.
- **Remediation:** Converted to self-hosted WOFF2 variable fonts (`Geist` and `JetBrains Mono`) placed in `site/assets/fonts/`. No outbound requests are made when rendering typography.

### 2.3 Download Integrity & Verified Artifacts
- **Previous Risk:** The documentation recommended `curl -fsSL https://.../install.sh | bash` pointing to an unverified location.
- **Remediation:** All download buttons and setup instructions now point directly to verifiable GitHub release assets (`https://github.com/irshadpc/axym-release/releases/...`). Every downloadable archive in `site/data/releases.json` has a pre-computed, verified SHA-256 hash displayed in the release verification table, enabling users to independently verify archive integrity via `shasum -a 256 <file>`.

---

## 3. DOM Security & Injection Prevention

All dynamic rendering inside `site/assets/app.js` is protected against Cross-Site Scripting (XSS):

```javascript
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

- Query parameters, search inputs, and hash fragments are sanitized prior to DOM insertion or route resolution.
- The command palette (Cmd+K) parses an immutable internal catalog generated at build time, preventing runtime injection.
- Zero usage of `eval()`, `new Function()`, or untrusted script execution.

---

## 4. Local-First Boundary Demarcation

To avoid fabricated marketing claims, the website explicitly differentiates between local and external execution:
- **What Runs Locally:** Agent task decomposition, orchestration graphs, file edits, git operations, constitutional policy enforcement, and audit evidence storage.
- **What Uses External Providers:** Model inference calls routed through user-configured provider CLIs (e.g., Anthropic Claude CLI, OpenAI Codex CLI).
- **Credentials:** API keys and credentials never touch Axym servers—they reside exclusively in the developer’s local environment or OS keychain.
