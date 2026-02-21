# ⚡ Quick Commands Reference - Graphitube PWA

## 🚀 Deployment Commands

### **Deploy to GitHub Pages (Automatic)**

```bash
# Push to GitHub (triggers auto-deploy)
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# Check deployment status
# Go to: https://github.com/YOUR_USERNAME/Graphitube/actions
```

### **Deploy Manually**

```bash
# Build and deploy in one command
npm run deploy
```

---

## 🧪 Testing Commands

### **Development Mode**

```bash
# Start dev server with hot reload
npm run dev

# Opens: http://localhost:5173/Graphitube/
```

### **Production Preview**

```bash
# Build for production
npm run build

# Preview built version (with Service Worker)
npm run preview

# Opens: http://localhost:4173/Graphitube/
```

### **Clean Build**

```bash
# Clean cache and rebuild
npm run clean
npm run build

# Or clean everything (including node_modules)
npm run clean:all
npm install
npm run build
```

---

## 🔧 Maintenance Commands

### **Update Dependencies**

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install vite@latest
```

### **Clear All Caches**

```bash
# Clear Vite cache
rm -rf .vite

# Clear build output
rm -rf dist

# Clear node modules cache
rm -rf node_modules/.vite

# Nuclear option (clean everything)
npm run clean:all
```

---

## 🗑️ Git Commands

### **First Time Setup**

```bash
# Initialize Git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Graphitube PWA"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/Graphitube.git

# Push to main
git branch -M main
git push -u origin main
```

### **Regular Updates**

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub (triggers auto-deploy)
git push
```

### **Undo Changes**

```bash
# Discard local changes
git checkout .

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 📦 Package Management

### **Install New Package**

```bash
# Production dependency
npm install package-name

# Dev dependency
npm install -D package-name

# Specific version
npm install package-name@1.2.3
```

### **Remove Package**

```bash
npm uninstall package-name
```

### **Reinstall Everything**

```bash
# Fresh install
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Debugging Commands

### **Check Service Worker**

```bash
# Build and check SW generation
npm run build
ls -la dist/sw.js
cat dist/manifest.webmanifest
```

### **Analyze Build**

```bash
# Check bundle sizes
npm run build
du -sh dist/assets/*

# Or use browser DevTools after preview
npm run preview
# DevTools → Network → Disable cache → Reload
```

### **Check Routes**

```bash
# Verify base path in manifest
cat dist/manifest.webmanifest | grep -E '(start_url|scope)'

# Should output:
# "start_url": "/Graphitube/"
# "scope": "/Graphitube/"
```

---

## 🧹 Cleanup Commands

### **Quick Clean**

```bash
npm run clean
```

### **Deep Clean**

```bash
npm run clean:all
```

### **Manual Cleanup**

```bash
# Remove build artifacts
rm -rf dist

# Remove Vite cache
rm -rf .vite

# Remove node modules cache
rm -rf node_modules/.vite

# Remove all node modules
rm -rf node_modules

# Remove lock file
rm package-lock.json
```

---

## 🌐 GitHub Pages Commands

### **Manual Deploy via gh-pages**

```bash
# Deploy current dist/ folder
npm run deploy

# Or manually
npx gh-pages -d dist
```

### **Check Deployment Status**

```bash
# View deployment logs
# Go to: https://github.com/YOUR_USERNAME/Graphitube/deployments
```

---

## 📱 PWA Testing Commands

### **Test Manifest**

```bash
# Check manifest exists
curl https://YOUR_USERNAME.github.io/Graphitube/manifest.webmanifest

# Pretty print JSON
curl -s https://YOUR_USERNAME.github.io/Graphitube/manifest.webmanifest | python -m json.tool
```

### **Test Service Worker**

```bash
# Check SW file
curl -I https://YOUR_USERNAME.github.io/Graphitube/sw.js

# Should return: 200 OK
```

### **Test Offline Page**

```bash
curl https://YOUR_USERNAME.github.io/Graphitube/offline.html
```

---

## 🔐 Environment Variables (If Needed)

### **Local Development**

```bash
# Create .env file
cat > .env << EOF
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
EOF

# Add to .gitignore (already done)
echo ".env" >> .gitignore
```

### **GitHub Actions Secrets**

```bash
# Add secrets via GitHub UI:
# Settings → Secrets and variables → Actions → New repository secret

# Or via GitHub CLI
gh secret set SECRET_NAME -b "secret-value"
```

---

## 🚀 Android APK Commands (Bubblewrap)

### **Setup**

```bash
# Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# Verify installation
bubblewrap --version
```

### **Create Android App**

```bash
# Initialize TWA project
bubblewrap init --manifest https://YOUR_USERNAME.github.io/Graphitube/manifest.webmanifest

# Build APK
bubblewrap build

# Install on device
bubblewrap install

# Update existing APK
bubblewrap update
```

---

## 📊 Performance Analysis

### **Lighthouse Audit**

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://YOUR_USERNAME.github.io/Graphitube/ --view

# Save report
lighthouse https://YOUR_USERNAME.github.io/Graphitube/ --output html --output-path ./lighthouse-report.html
```

### **Bundle Size Analysis**

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Run build with analysis
npm run build

# View report (if configured)
open stats.html
```

---

## 🔄 Update Workflow

### **Regular Update Cycle**

```bash
# 1. Pull latest changes
git pull

# 2. Install any new dependencies
npm install

# 3. Make your changes
# ... edit files ...

# 4. Test locally
npm run dev

# 5. Build and test production
npm run build
npm run preview

# 6. Commit and push
git add .
git commit -m "Description of changes"
git push

# 7. GitHub Actions auto-deploys ✅
```

---

## 🆘 Emergency Commands

### **Site Not Loading?**

```bash
# 1. Clear all caches
npm run clean:all

# 2. Fresh install
npm install

# 3. Rebuild
npm run build

# 4. Force deploy
npm run deploy -- --force

# 5. Check GitHub Pages status
# https://www.githubstatus.com/
```

### **Service Worker Issues?**

```bash
# In browser console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister())
  location.reload(true)
})

# Or clear all caches:
caches.keys().then(names => {
  names.forEach(name => caches.delete(name))
  location.reload(true)
})
```

### **Routes Not Working?**

```bash
# Verify base path
cat vite.config.ts | grep "base:"

# Should be: base: '/Graphitube/',

# Verify router
cat src/app/App.tsx | grep "basename"

# Should be: basename={import.meta.env.BASE_URL}
```

---

## 📚 Useful Aliases (Optional)

Add to your `.bashrc` or `.zshrc`:

```bash
# Graphitube shortcuts
alias g-dev="npm run dev"
alias g-build="npm run build"
alias g-preview="npm run preview"
alias g-deploy="npm run deploy"
alias g-clean="npm run clean"
alias g-fresh="npm run clean:all && npm install && npm run dev"

# Git shortcuts
alias g-push="git add . && git commit -m 'Update' && git push"
alias g-status="git status"

# Use them:
# g-dev        # Start dev server
# g-deploy     # Deploy to GitHub Pages
# g-fresh      # Clean install and start
```

---

## 🎯 Most Common Commands

```bash
# Development
npm run dev                    # Start dev server

# Production
npm run build                  # Build for production
npm run preview                # Preview production build

# Deployment
git push                       # Auto-deploy via GitHub Actions
npm run deploy                 # Manual deploy via gh-pages

# Maintenance
npm run clean                  # Clean cache
npm install                    # Install/update dependencies
```

---

## ✅ Pre-Deployment Checklist Commands

```bash
# 1. Verify base path
grep -r "base:" vite.config.ts

# 2. Check router basename
grep -r "basename" src/app/App.tsx

# 3. Test build
npm run build && ls -la dist/

# 4. Verify manifest
cat dist/manifest.webmanifest | python -m json.tool

# 5. Check Service Worker
ls -la dist/sw.js

# 6. Test locally
npm run preview

# 7. Deploy!
git push
```

---

**Save this file for quick reference! 📌**
