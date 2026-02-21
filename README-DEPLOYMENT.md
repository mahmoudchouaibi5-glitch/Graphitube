# 🚀 Graphitube PWA - GitHub Pages Deployment Guide

## ✅ Your Project is Ready!

Your Vite + React PWA is **fully configured** for GitHub Pages deployment at `/Graphitube/`.

---

## 📋 Pre-Deployment Checklist

- ✅ **`vite.config.ts`**: `base: '/Graphitube/'` is set
- ✅ **`App.tsx`**: `<BrowserRouter basename={import.meta.env.BASE_URL}>` is configured
- ✅ **PWA Plugin**: `vite-plugin-pwa` configured for 100% offline support
- ✅ **Service Worker**: Auto-registers with caching strategies
- ✅ **GitHub Actions**: `.github/workflows/deploy.yml` ready
- ✅ **Icons**: PWA icons in `public/` directory
- ✅ **Offline Page**: Multilingual offline fallback

---

## 🎯 Deployment Methods

### **Method 1: GitHub Actions** (Recommended - Automatic)

#### Step 1: Push to GitHub

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Graphitube PWA ready for deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Graphitube.git

# Push to main branch
git branch -M main
git push -u origin main
```

#### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save

#### Step 3: Deploy!

The GitHub Action will **automatically**:
- ✅ Install dependencies
- ✅ Build the project (`npm run build`)
- ✅ Deploy to GitHub Pages

Your site will be live at: `https://YOUR_USERNAME.github.io/Graphitube/`

---

### **Method 2: Manual Deployment** (Using gh-pages)

```bash
# Build and deploy in one command
npm run deploy
```

This will:
- Build the project → `dist/`
- Push `dist/` to `gh-pages` branch
- Deploy automatically

**Note:** After first deploy, go to **Settings → Pages** and select:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **root**

---

## 🔍 Verify PWA Configuration

### 1. **Check Manifest**
```bash
npm run build
```

Look for: `dist/manifest.webmanifest`

Content should include:
```json
{
  "name": "Graphitube - Kitchen & Salon Design",
  "start_url": "/Graphitube/",
  "scope": "/Graphitube/",
  "icons": [...]
}
```

### 2. **Check Service Worker**
After deployment, open DevTools:

**Application → Service Workers**
- ✅ Status: "activated"
- ✅ Scope: `https://YOUR_USERNAME.github.io/Graphitube/`

**Application → Cache Storage**
- ✅ `workbox-precache-v2-https://...`
- ✅ `graphitube-pages`
- ✅ `graphitube-images`
- ✅ `graphitube-api`
- ✅ `graphitube-fonts`

### 3. **Test Offline Mode**

1. Open: `https://YOUR_USERNAME.github.io/Graphitube/`
2. Open DevTools → **Network**
3. Check **Offline**
4. Refresh page
5. ✅ Should still work! (Shows offline.html if needed)

---

## 🧪 Local Testing

### Test PWA Locally

```bash
# Build
npm run build

# Preview (with Service Worker)
npm run preview
```

Open: `http://localhost:4173/Graphitube/`

**DevTools → Application:**
- ✅ Manifest should load
- ✅ Service Worker should register
- ✅ Test offline mode

---

## 🌐 GitHub Pages Configuration

### Custom Domain (Optional)

If you have a custom domain:

1. Add `CNAME` file to `public/`:
   ```
   yourdomain.com
   ```

2. Update `vite.config.ts`:
   ```ts
   base: '/'  // Remove /Graphitube/
   ```

3. Update `manifest` in `vite.config.ts`:
   ```ts
   start_url: '/',
   scope: '/'
   ```

4. Configure DNS:
   - Add **A records** pointing to GitHub IPs
   - Or **CNAME record** pointing to `YOUR_USERNAME.github.io`

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)

1. Visit: `https://YOUR_USERNAME.github.io/Graphitube/`
2. Look for **Install** button in address bar
3. Click → **Install**
4. App opens as standalone window

### Mobile (Android/iOS)

**Android:**
1. Open in Chrome
2. Menu → **Add to Home Screen**
3. Confirm installation

**iOS:**
1. Open in Safari
2. Share button → **Add to Home Screen**
3. Name the app → **Add**

---

## 🔧 Troubleshooting

### Issue: Routes return 404

**Solution:** Already handled!
- `public/404.html` redirects to `index.html`
- React Router handles routing client-side

### Issue: Assets not loading

**Check:**
```bash
# All asset paths should include /Graphitube/
/Graphitube/assets/index-abc123.js ✅
/assets/index-abc123.js ❌
```

**Fix:** Ensure `base: '/Graphitube/'` in `vite.config.ts`

### Issue: Service Worker not updating

**Solution:**
```bash
# Clear cache
rm -rf dist node_modules/.vite

# Rebuild
npm install
npm run build
```

**In browser:**
1. DevTools → Application → Service Workers
2. Check **Update on reload**
3. Click **Unregister**
4. Hard refresh (Ctrl+Shift+R)

### Issue: Manifest errors

**Check icon paths:**
```ts
// vite.config.ts - manifest.icons
{
  src: '/Graphitube/icon-192.png',  // ✅ Correct
  src: '/icon-192.png'              // ❌ Wrong
}
```

---

## 📊 Build Output

After `npm run build`:

```
dist/
├── index.html
├── manifest.webmanifest        # PWA manifest
├── sw.js                        # Service Worker
├── workbox-*.js                 # Workbox runtime
├── assets/
│   ├── index-[hash].js         # Main bundle
│   ├── index-[hash].css        # Styles
│   ├── vendor-[hash].js        # Dependencies
│   └── three-[hash].js         # Three.js
├── icon-192.png
├── icon-512.png
└── offline.html
```

---

## 🎯 Performance Optimization

### Already Configured:

✅ **Code Splitting**
- `vendor` chunk (React, React Router, UI libs)
- `three` chunk (Three.js)
- Route-based lazy loading (if needed)

✅ **Caching Strategies**
- **Pages**: NetworkFirst (fresh content with fallback)
- **API**: NetworkFirst with 5-min cache
- **Images**: CacheFirst (30 days)
- **Fonts**: CacheFirst (1 year)
- **Assets**: Precached for instant offline access

✅ **Offline Support**
- All static assets cached on first visit
- Offline fallback page (`/offline.html`)
- Request queueing for offline form submissions

---

## 🔐 Environment Variables

For Supabase integration, secrets are already configured:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**GitHub Actions Secrets:**
If needed, add secrets in:
**Settings → Secrets and variables → Actions**

---

## 📚 Next Steps

### 1. **Deploy to Google Play** (Android App)

Use **Bubblewrap CLI**:

```bash
# Install
npm install -g @bubblewrap/cli

# Initialize TWA
bubblewrap init --manifest https://YOUR_USERNAME.github.io/Graphitube/manifest.webmanifest

# Build APK
bubblewrap build

# Install on device
bubblewrap install
```

See: `PWA_ANDROID_README.md` for full guide

### 2. **Monitor Performance**

Use **Lighthouse** in Chrome DevTools:
- Performance score
- PWA score (should be 100)
- Accessibility
- Best Practices
- SEO

### 3. **Add Analytics** (Optional)

```bash
npm install react-ga4
```

Track:
- Page views
- Form submissions
- 3D designer usage
- Offline interactions

---

## 🎉 Congratulations!

Your **Graphitube PWA** is now:

✅ Fully offline-capable
✅ Installable on all devices
✅ Deployed to GitHub Pages
✅ Ready for Google Play Store

**Live URL:** `https://YOUR_USERNAME.github.io/Graphitube/`

---

## 🆘 Support

**Common Issues:**
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- [QUICK_FIX.md](./QUICK_FIX.md)

**Documentation:**
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [GitHub Pages](https://docs.github.com/en/pages)

---

**Made with ❤️ for Graphitube**
