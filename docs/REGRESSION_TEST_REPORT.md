# Axym Digital Experience — Functional & Visual Regression Test Report

**Test Suite:** Playwright v1.65.1  
**Engines Tested:** Chromium (Desktop Chrome), Firefox (Desktop Firefox), WebKit (Desktop Safari)  
**Total Tests Executed:** 141  
**Total Passed:** 141 (100% Pass Rate)  
**Total Failed:** 0  
**Flaky Tests:** 0  
**Pre-deploy Audit (`scripts/verify-site.mjs`):** 97 checks passed, 0 failures  

---

## 1. Test Execution Summary

The regression suite validates every interaction, route transition, deep link, theme state, release archive, supply-chain URL, responsive breakpoint, and accessibility constraint across all three modern browser engines.

```
Running 141 tests using 6 workers

  ✓ Chromium:  47 passed (100%)
  ✓ Firefox:   47 passed (100%)
  ✓ WebKit:    47 passed (100%)

Execution time: 38.3s
```

---

## 2. Test Category Breakdown

### 2.1 Routing & Content Integrity (36 tests)
- **Primary Heading Uniqueness:** Asserts that every route (`#home`, `#architecture`, `#quickstart`, `#setup`, `#configuration`, `#features`, `#releases`, `#operations`) renders exactly one semantic `<h1>` element.
- **Deep-Linking:** Validates that compound hash targets like `#quickstart/install` properly resolve the parent route, update the browser URL, and scroll the targeted anchor smoothly into the viewport.
- **Unknown Hash Fallback:** Ensures unrecognized hashes (e.g., `#does-not-exist`) degrade gracefully to `#home` without console errors.
- **Layout Differentiation:** Enforces structural distinction between the expansive marketing layout (`.marketing-page`) and the structured 3-column documentation shell (`.docs-shell`).

### 2.2 Theme Persistence & System Adaptation (12 tests)
- **Explicit Theme Selection:** Tests clicking the theme menu, selecting "Light", verifying `html[data-theme="light"]`, and ensuring persistence in `localStorage` across page reloads.
- **System Theme Emulation:** Uses `page.emulateMedia({ colorScheme: 'dark' })` and `colorScheme: 'light'` to verify dynamic synchronization when `themeMode === 'system'`.
- **Legacy Storage Compatibility:** Confirms existing `axym-theme` values stored by previous visitors remain fully supported without breaking or resetting.

### 2.3 Navigation & Interactive Controls (21 tests)
- **Skip Navigation:** Verifies that pressing Tab upon page load focuses `.skip-link`, and pressing Enter shifts keyboard focus to `<main id="app">`.
- **Mobile Menu Dialog:** Asserts menu toggle opens `#mobile-nav`, traps Tab focus inside, closes via `Escape`, and restores focus to `#menu-toggle`.
- **Command Palette (Cmd+K / Ctrl+K):** Confirms shortcut activates the search dialog, filters index entries by keyword, navigates to results on Enter/click, and closes on `Escape`.
- **Code Block Copy:** Asserts clicking `.copy-btn` copies snippet text to clipboard and triggers a confirmation toast (`#toast`).
- **Provider Tabs:** Verifies accessible tab switching (`Claude`, `Codex`, `Custom`) updates `aria-selected` and displays corresponding tabpanels.
- **Keyboard-Focusable Scroll Regions:** Enforces `tabindex="0"` on code blocks so keyboard users can scroll horizontal overflows.

### 2.4 Release Data Hydration & Supply Chain Verification (9 tests)
- **Version Pill Synchronization:** Verifies `#version-pill` displays verified `TUI v0.23.0`.
- **Download Cards:** Validates that all 6 verified artifacts (macOS ARM, macOS Intel, Linux x86_64, Windows, Desktop DMG, Source) are correctly rendered with platform chips and file sizes.
- **Supply-Chain URL Safety:** Enforces that all download links point strictly to official GitHub release assets (`https://github.com/irshadpc/axym-release/releases/...`) and strictly forbids dangerous `curl | bash` piping of unpublished scripts.
- **Release Timeline:** Validates 6 verified release history entries with correct semantic tags and dates.

### 2.5 Responsive Layout & Overflow Prevention (18 tests)
- **Horizontal Overflow Zero-Tolerance:** Evaluates viewports at 320px, 390px, 768px, 1024px, and 1440px across `#home`, `#architecture`, `#quickstart`, and `#releases`. Asserts `Math.max(scrollWidth) - innerWidth <= 1px`.
- **Mobile Breakpoint Reflow:** Validates that documentation sidebars and right table-of-contents collapse at 390px into mobile navigation controls without clipping.

### 2.6 Automated WCAG 2.2 AA Axe-Core Audits (45 tests)
- Evaluates all 8 routes in both Dark and Light themes, plus mobile viewports, using `@axe-core/playwright`.
- **Result:** 0 violations recorded across all runs.

---

## 3. Visual Regression Evidence

Automated high-resolution before-and-after full-page screenshots were captured across both themes and all core viewports:

| Viewport Profile | Resolution | Before (Baseline) | After (Arctic Graphite) |
|---|---|---|---|
| Desktop (Dark) | 1440×1000 | `docs/evidence/baseline/home-dark.png` | `docs/evidence/after/home-dark.png` |
| Desktop (Light) | 1440×1000 | `docs/evidence/baseline/home-light.png` | `docs/evidence/after/home-light.png` |
| Architecture (Dark)| 1440×1000 | — | `docs/evidence/after/architecture-dark.png` |
| Architecture (Light)| 1440×1000 | — | `docs/evidence/after/architecture-light.png` |
| Quickstart Docs (Dark)| 1440×1000 | `docs/evidence/baseline/quickstart-dark.png` | `docs/evidence/after/quickstart-dark.png` |
| Quickstart Docs (Light)| 1440×1000 | `docs/evidence/baseline/quickstart-light.png` | `docs/evidence/after/quickstart-light.png` |
| Releases (Dark) | 1440×1000 | `docs/evidence/baseline/releases-dark.png` | `docs/evidence/after/releases-dark.png` |
| Tablet (Light) | 768×1024 | `docs/evidence/baseline/home-tablet.png` | `docs/evidence/after/home-tablet.png` |
| Mobile (Light) | 390×844 | `docs/evidence/baseline/home-mobile.png` | `docs/evidence/after/home-mobile.png` |
| Mobile Quickstart (Dark)| 390×844 | — | `docs/evidence/after/quickstart-mobile.png` |
