# 🌐 Netlify Deployment - دليل كامل لـ Graphitube

## 📌 نظرة عامة

Netlify هو أفضل خيار لنشر PWA لأنه:
- ✅ **مجاني 100%** - لا رسوم
- ✅ **HTTPS تلقائي** - SSL مجاني
- ✅ **سريع جداً** - CDN عالمي
- ✅ **سهل الاستخدام** - 3 طرق للنشر
- ✅ **دعم PWA** - كل الميزات

---

## 🚀 الطريقة 1: Netlify CLI (موصى به)

### الخطوة 1: التثبيت
```bash
npm install -g netlify-cli
```

### الخطوة 2: تسجيل الدخول
```bash
netlify login
```
سيفتح المتصفح، اضغط **"Authorize"**

### الخطوة 3: Build المشروع
```bash
npm run build
```

سيولد مجلد `dist/` يحتوي على:
- ✅ index.html
- ✅ manifest.json
- ✅ sw.js
- ✅ .well-known/assetlinks.json
- ✅ جميع الملفات

### الخطوة 4: Deploy
```bash
netlify deploy --prod --dir=dist
```

**التفاعل:**
```
? Create & configure a new site? Yes
? Team: اختر فريقك (Personal)
? Site name: graphitube
```

### ✅ النتيجة:
```
✔ Deploy is live!

Website URL:    https://graphitube.netlify.app
Admin URL:      https://app.netlify.com/sites/graphitube
```

---

## 🎨 الطريقة 2: Netlify Drop (بدون كود)

### الخطوات:
```bash
# 1. Build المشروع
npm run build
```

```
2. افتح المتصفح:
   https://app.netlify.com/drop

3. اسحب مجلد dist/ بالكامل
   (Drag & Drop)

4. انتظر Upload (عادة 30 ثانية)

5. ✅ رابطك جاهز:
   https://random-name-12345.netlify.app
```

### تغيير الاسم:
```
Site settings → General → Change site name
graphitube → Save
```

---

## 🔗 الطريقة 3: Git Deploy (تلقائي)

### الخطوة 1: Push لـ GitHub
```bash
git init
git add .
git commit -m "Initial commit - Graphitube PWA"
git branch -M main
git remote add origin https://github.com/<username>/graphitube.git
git push -u origin main
```

### الخطوة 2: ربط Netlify بـ GitHub
```
1. افتح: https://app.netlify.com
2. اضغط "Add new site" → "Import an existing project"
3. اختر "GitHub"
4. Authorize Netlify
5. اختر repo: graphitube
```

### الخطوة 3: إعدادات Build
```
Build command:       npm run build
Publish directory:   dist
Branch to deploy:    main
```

### الخطوة 4: Deploy
```
اضغط "Deploy site"
انتظر 1-2 دقيقة
✅ الموقع منشور!
```

### الميزة:
```
كل مرة تعمل git push:
→ Netlify يبني ويرفع تلقائياً! 🎉
```

---

## ⚙️ إعدادات Netlify مهمة

### 1. Environment Variables (إذا عندك API Keys)
```
Site settings → Build & deploy → Environment

أضف:
Key:    VITE_SUPABASE_URL
Value:  https://xxxxx.supabase.co

Key:    VITE_SUPABASE_ANON_KEY
Value:  your-anon-key
```

### 2. Custom Domain (اختياري)
```
Site settings → Domain management → Add custom domain

أمثلة:
- graphitube.ma
- app.graphitube.com
- www.graphitube.ma

Netlify سيوفر HTTPS تلقائياً!
```

### 3. Redirects & Headers (مهم للـ PWA)
```
ملف netlify.toml موجود ✅
سيُطبق تلقائياً عند Deploy
```

---

## 🔍 التحقق بعد Deploy

### 1. افتح الموقع
```
https://graphitube.netlify.app
```

### 2. تحقق من PWA
```
F12 → Application

✅ Manifest: يظهر صحيح
✅ Service Worker: Activated and running
✅ Icons: كلها موجودة
```

### 3. اختبر assetlinks.json
```bash
curl https://graphitube.netlify.app/.well-known/assetlinks.json
```

يجب أن يرجع:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": ["..."]
  }
}]
```

### 4. اختبر Service Worker
```bash
curl https://graphitube.netlify.app/sw.js
```

يجب أن يرجع كود Service Worker

### 5. اختبر Manifest
```bash
curl https://graphitube.netlify.app/manifest.json
```

يجب أن يرجع JSON صحيح

---

## 🐛 حل المشاكل الشائعة

### المشكلة 1: "Build failed"

**الأعراض:**
```
Deploy failed
Error during build
```

**الحل:**
```bash
# جرب Build محلياً أولاً
npm run build

# إذا نجح محلياً، المشكلة في Netlify settings
# تحقق من:
Build command: npm run build ✅
Publish dir: dist ✅
Node version: 18+ ✅
```

**تحديد Node version:**
```
Site settings → Build & deploy → Environment

أضف:
NODE_VERSION = 18
```

---

### المشكلة 2: "manifest.json 404"

**الأعراض:**
```
Console: GET https://site.netlify.app/manifest.json 404
```

**الحل:**
```bash
# 1. تحقق من public/manifest.json موجود
ls public/manifest.json

# 2. تحقق من vite.config.ts
# يجب أن يحتوي:
publicDir: 'public'

# 3. Build مرة أخرى
npm run build

# 4. تحقق من dist/
ls dist/manifest.json

# 5. Deploy مرة أخرى
netlify deploy --prod --dir=dist
```

---

### المشكلة 3: ".well-known/ not accessible"

**الأعراض:**
```
GET https://site.netlify.app/.well-known/assetlinks.json 404
```

**الحل:**

ملف `netlify.toml` موجود ✅ ويحتوي على:
```toml
[[headers]]
  for = "/.well-known/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Content-Type = "application/json"
```

**إذا ما زال المشكل:**
```bash
# تحقق من وجود الملف
ls public/.well-known/assetlinks.json

# Build
npm run build

# تحقق من dist/
ls dist/.well-known/assetlinks.json

# Deploy
netlify deploy --prod --dir=dist
```

---

### المشكلة 4: "Service Worker not activating"

**الأعراض:**
```
Service Worker: Installing...
ثم يختفي
```

**الحل:**
```javascript
// في Chrome DevTools:
Application → Service Workers → "Bypass for network"

// امسح Cache:
Application → Storage → Clear site data

// Refresh:
Ctrl + Shift + R

// تحقق من Console:
يجب أن تشوف:
✅ PWA: Service Worker registered successfully
```

---

### المشكلة 5: "Page redirects to index.html"

**الأعراض:**
```
/kitchen → يرجع 404
/salon → يرجع 404
```

**الحل:**

ملف `netlify.toml` يحتوي على:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

✅ هذا صحيح للـ SPA (React Router)

---

## 📊 Netlify Dashboard

### بعد Deploy، يمكنك:

#### 1. مراقبة الزوار
```
Analytics → Traffic
```

#### 2. رؤية Deploy History
```
Deploys → History
```

#### 3. Rollback لنسخة سابقة
```
Deploys → اختر deploy قديم → "Publish deploy"
```

#### 4. Preview Deploys (قبل Production)
```bash
# Deploy للاختبار فقط
netlify deploy --dir=dist

# يعطيك رابط preview:
https://xxx--graphitube.netlify.app

# إذا كل شيء تمام:
netlify deploy --prod --dir=dist
```

---

## 🔐 الأمان

### HTTPS
✅ تلقائي من Netlify (Let's Encrypt)

### Headers الأمنية
✅ موجودة في `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Environment Variables
```
لا تضع API keys في الكود!
استخدم Netlify Environment Variables
```

---

## ⚡ تحسين الأداء

### 1. Cache Headers
✅ موجودة في `netlify.toml`:
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. Prerendering (اختياري)
```
Site settings → Build & deploy → Post processing
→ Prerender: Enable
```

### 3. Asset Optimization
```
Site settings → Build & deploy → Post processing
→ Asset optimization: Enable all
```

---

## 🎯 Checklist النشر

### قبل Deploy:
- [ ] `npm run build` ينجح محلياً
- [ ] `dist/manifest.json` موجود
- [ ] `dist/sw.js` موجود
- [ ] `dist/.well-known/assetlinks.json` موجود
- [ ] الأيقونات في `dist/` (أو PNG placeholders)

### Deploy:
- [ ] `netlify deploy --prod --dir=dist`
- [ ] أو Netlify Drop
- [ ] أو Git push (إذا مربوط)

### بعد Deploy:
- [ ] الموقع يفتح: `https://graphitube.netlify.app`
- [ ] manifest.json accessible
- [ ] sw.js يتسجل
- [ ] assetlinks.json accessible
- [ ] PWA قابل للتثبيت

---

## 📱 اختبار على الهاتف

### Android (Chrome):
```
1. افتح: https://graphitube.netlify.app
2. Menu (⋮) → "Install app"
3. يجب أن يظهر prompt للتثبيت ✅
4. بعد التثبيت، افتح التطبيق
5. يجب أن يعمل standalone (بدون browser UI)
```

### iPhone (Safari):
```
1. افتح: https://graphitube.netlify.app
2. Share (⬆️) → "Add to Home Screen"
3. Add
4. افتح التطبيق من Home Screen
```

---

## 🔄 التحديثات

### تحديث الموقع:

#### إذا استخدمت CLI:
```bash
# 1. عدّل الكود
# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

#### إذا استخدمت Git:
```bash
git add .
git commit -m "Update: new feature"
git push

# Netlify سيبني ويرفع تلقائياً!
```

#### إذا استخدمت Drop:
```bash
npm run build
# ثم Drag & Drop مجلد dist/ مرة أخرى
```

---

## 🌍 Custom Domain - خطوة بخطوة

### إذا عندك Domain (مثلاً graphitube.ma):

#### 1. في Netlify:
```
Site settings → Domain management
→ Add custom domain
→ أدخل: graphitube.ma
→ Verify
```

#### 2. في مزود الـ Domain (مثلاً GoDaddy):
```
DNS Settings → Add Record

Type:  A
Name:  @
Value: 75.2.60.5 (Netlify Load Balancer)

Type:  CNAME
Name:  www
Value: graphitube.netlify.app
```

#### 3. انتظر DNS Propagation (5-48 ساعة)

#### 4. HTTPS تلقائي
```
Netlify سيوفر SSL تلقائياً من Let's Encrypt
```

---

## 📈 Analytics

### Netlify Analytics (مدفوع)
```
Site settings → Analytics → Enable
$9/شهر - بيانات دقيقة
```

### Google Analytics (مجاني)
```html
<!-- أضف في public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 💡 نصائح احترافية

### 1. استخدم Deploy Previews
```bash
# للاختبار قبل Production:
netlify deploy --dir=dist
# يعطيك رابط مؤقت

# إذا كل شيء تمام:
netlify deploy --prod --dir=dist
```

### 2. استخدم Build Hooks (للـ CI/CD)
```
Site settings → Build & deploy → Build hooks
→ Add build hook
→ انسخ الـ URL

# يمكن تشغيل Build بـ:
curl -X POST https://api.netlify.com/build_hooks/xxxxx
```

### 3. استخدم Split Testing (A/B Testing)
```
Site settings → Split Testing
→ Test branches مختلفة
```

---

## 🎉 ملخص الخطوات السريعة

```bash
# 1. ثبت CLI
npm install -g netlify-cli

# 2. سجل دخول
netlify login

# 3. Build
npm run build

# 4. Deploy
netlify deploy --prod --dir=dist

# ✅ خلاص! موقعك على:
# https://graphitube.netlify.app
```

**الوقت:** 5-10 دقائق فقط! ⚡

---

## 📞 الدعم

### Netlify Support:
- **Docs**: https://docs.netlify.com
- **Community**: https://answers.netlify.com
- **Status**: https://www.netlifystatus.com

### Graphitube:
- **Guides**: `/START_HERE.md`
- **Issues**: تحقق من Console (F12)

---

## ✅ الخطوة التالية

بعد ما ينشر الموقع على Netlify:

```
✅ عندك HTTPS
✅ PWA جاهز
✅ assetlinks.json accessible

الخطوة التالية:
→ PWABuilder لإنشاء APK
→ اقرأ: QUICK_GOOGLE_PLAY_SETUP.md
```

---

**بالتوفيق! 🚀**

موقعك سيكون على الإنترنت في دقائق!
