# Axym Digital Experience — Migration & Rollback Guide

**Branch:** `design/arctic-graphite-overhaul`  
**Base Repository:** `https://github.com/irshadpc/axym-release`  
**Production URL:** `https://www.irshadpc.in/axym-release/`  

---

## 1. Migration Strategy

The Arctic Graphite redesign preserves all URL contracts, hash navigation patterns, local storage preferences, and GitHub Pages deployment pipelines while modernizing the visual identity and underlying architecture.

### 1.1 Backward Compatibility Protections
1. **Hash Routes Preserved:**  
   Existing links to `#home`, `#architecture`, `#quickstart`, `#setup`, `#configuration`, `#features`, `#releases`, and `#operations` continue to function without interruption.
2. **Theme Key Compatibility:**  
   The site reads and writes the existing `axym-theme` key in `localStorage`. Legacy values of `"dark"` and `"light"` continue to load their respective themes seamlessly. If no preference exists, it defaults gracefully to `"system"`.
3. **Subpath Deployment:**  
   The site remains strictly configured for relative paths (`./assets/...`, `data/releases.json`) to guarantee identical behavior on custom domains (`irshadpc.in/axym-release/`) and local testing environments (`localhost:4173/axym-release/`).
4. **CI/CD Integration:**  
   The GitHub Actions workflow (`.github/workflows/deploy-docs.yml`) continues to trigger on pushes to `main`, executing `sync-releases.mjs` and `verify-site.mjs` before packaging `site/` for GitHub Pages.

---

## 2. Deployment Protocol

To deploy the overhaul to production:

```bash
# 1. Ensure all tests and pre-deploy verification scripts pass
npm run verify
npm test

# 2. Commit all staged files to the feature branch
git add .
git commit -m "feat(design): implement Arctic Graphite design system overhaul"

# 3. Push to remote origin
git push origin design/arctic-graphite-overhaul

# 4. Open Pull Request to main
gh pr create --base main --head design/arctic-graphite-overhaul --title "feat(design): Arctic Graphite World-Class Digital Experience Overhaul" --body-file docs/PULL_REQUEST.md

# 5. After PR review and merge into main, GitHub Actions automatically verifies and deploys to GitHub Pages
```

---

## 3. Rollback Protocol

Should any unanticipated regression emerge in production, a zero-downtime rollback can be executed immediately:

### Option A: Fast Git Revert (Recommended)
```bash
# Check out main and pull the latest commit
git checkout main
git pull origin main

# Revert the merge commit
git revert -m 1 HEAD

# Push revert to trigger GitHub Pages redeployment
git push origin main
```

### Option B: Immediate Redeploy of Previous Known-Good Commit
```bash
# Tag previous good commit
git checkout 7713764
git checkout -B hotfix/rollback-baseline
git push -f origin hotfix/rollback-baseline:main
```

### 3.1 Client-Side State Safety
- Since the redesign introduces no breaking database schemas or server-side cookies, rolling back requires zero client-side data cleanup.
- `localStorage.getItem('axym-theme')` values remain compatible with both baseline and new implementations.
