# 🚀 GitHub Pages Deployment Guide

## ✅ Configuration Complete!

Your Graphitube app is now configured for GitHub Pages deployment with:

- ✅ Vite with `base: '/Graphitube/'`
- ✅ React Router with `basename={import.meta.env.BASE_URL}`
- ✅ PWA support with `vite-plugin-pwa` (auto-update enabled)
- ✅ Automatic service worker registration
- ✅ Offline support after first load
- ✅ GitHub Actions workflow for automatic deployment

---

## 📋 Quick Setup (5 Steps)

### 1️⃣ Create GitHub Repository

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit for GitHub Pages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Graphitube.git
git push -u origin main
```

### 2️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Click **Save**

### 3️⃣ Deploy

**Option A: Automatic (Recommended)**
```bash
# Push to main branch - GitHub Actions will auto-deploy
git push origin main
```

**Option B: Manual**
```bash
# Deploy manually
npm run deploy
```

### 4️⃣ Access Your App

```
https://YOUR_USERNAME.github.io/Graphitube/
```

### 5️⃣ Update assetlinks.json URL

Update your Android TWA configuration to use the GitHub Pages URL:
```
https://YOUR_USERNAME.github.io/Graphitube/.well-known/assetlinks.json
```

---

## 🔧 Configuration Files Created

### 1. **vite.config.ts**
- Base URL: `/Graphitube/`
- PWA plugin with auto-update
- Workbox configuration for offline support
- Service worker with caching strategies

### 2. **index.html**
- Entry point with proper meta tags
- PWA manifest link
- RTL support for Arabic

### 3. **src/main.tsx**
- React entry point
- PWA registration handler
- Auto-update every hour
- Offline ready notification

### 4. **src/app/App.tsx**
- Updated with `basename={import.meta.env.BASE_URL}`
- Removed manual service worker registration
- Router configured for subdirectory deployment

### 5. **package.json**
- Added `dev`, `build`, `preview` scripts
- Added `deploy` script for gh-pages
- Added `gh-pages` package

### 6. **.github/workflows/deploy.yml**
- Automatic deployment on push to main
- GitHub Actions workflow
- Optimized build process

---

## 🎯 Important Notes

### ✅ DO:
- Use relative paths in your code
- Test locally with `npm run preview` after building
- Commit all changes before deploying
- Keep the `base` URL matching your repository name

### ❌ DON'T:
- Don't manually register service workers (vite-plugin-pwa handles it)
- Don't hardcode URLs (use `import.meta.env.BASE_URL`)
- Don't change the base URL without updating everywhere

---

## 🧪 Local Testing

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Visit: `http://localhost:4173/Graphitube/`

---

## 🔄 Update Deployment

```bash
# Make changes
git add .
git commit -m "Update feature X"
git push origin main

# GitHub Actions will automatically deploy
```

---

## 📱 PWA Features

### Automatic Updates
- Service worker checks for updates every hour
- Auto-updates without user intervention
- Console logs show update status

### Offline Support
- App works offline after first visit
- Caches critical assets
- Network-first strategy for API calls
- Cache-first for static assets

### Install Prompt
- Users can install app to home screen
- Works on Android, iOS, and Desktop
- Standalone app experience

---

## 🐛 Troubleshooting

### Issue: 404 on navigation
**Solution:** GitHub Actions workflow handles SPA routing automatically

### Issue: Assets not loading
**Solution:** Check that `base: '/Graphitube/'` matches your repo name exactly

### Issue: Service worker not updating
**Solution:** Clear browser cache and reload. Auto-update runs every hour.

### Issue: Build fails
**Solution:** Run `npm ci --legacy-peer-deps` to clean install dependencies

---

## 📊 Deployment Status

Check deployment status at:
```
https://github.com/YOUR_USERNAME/Graphitube/actions
```

---

## 🔗 Useful Links

- **Live App:** `https://YOUR_USERNAME.github.io/Graphitube/`
- **Repository:** `https://github.com/YOUR_USERNAME/Graphitube`
- **Actions:** `https://github.com/YOUR_USERNAME/Graphitube/actions`
- **Settings:** `https://github.com/YOUR_USERNAME/Graphitube/settings/pages`

---

## ✨ Next Steps for Android TWA

1. Update Android `strings.xml`:
   ```xml
   <string name="host">YOUR_USERNAME.github.io</string>
   <string name="asset_statements">
     [{
       "relation": ["delegate_permission/common.handle_all_urls"],
       "target": {
         "namespace": "web",
         "site": "https://YOUR_USERNAME.github.io"
       }
     }]
   </string>
   ```

2. Update `assetlinks.json` URL in Android Studio

3. Test Digital Asset Links:
   ```
   https://YOUR_USERNAME.github.io/Graphitube/.well-known/assetlinks.json
   ```

4. Build new AAB with updated configuration

5. Upload to Google Play Console

---

## 🎉 Done!

Your app is now:
- ✅ Deployed to GitHub Pages
- ✅ PWA enabled with offline support
- ✅ Auto-updating service worker
- ✅ Ready for Android TWA integration
- ✅ Automatic deployment on git push

**Need help?** Check the [GitHub Pages Documentation](https://docs.github.com/en/pages)
