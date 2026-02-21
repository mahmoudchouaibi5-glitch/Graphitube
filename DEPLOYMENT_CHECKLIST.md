# ✅ Checklist نشر Graphitube - تتبع التقدم

## 📋 المرحلة 1: التحضير المحلي

### الملفات الأساسية
- [x] `/public/manifest.json` - Web App Manifest ✅
- [x] `/public/sw.js` - Service Worker ✅
- [x] `/public/icon.svg` - الأيقونة الأساسية ✅
- [ ] `/public/icon-*.png` - الأيقونات PNG (يجب توليدها)
- [x] `/public/privacy.html` - Privacy Policy ✅
- [x] `/public/.well-known/assetlinks.json` - Digital Asset Links ✅
- [x] `/public/_headers` - Netlify Headers ✅
- [x] `/public/_redirects` - Netlify Redirects ✅

### Configuration
- [x] `/vite.config.ts` - publicDir configured ✅
- [x] `/netlify.toml` - Netlify config ✅
- [x] `/package.json` - npm scripts ✅

### Build Test
```bash
npm run build
```
- [ ] Build ينجح بدون أخطاء
- [ ] مجلد `dist/` يتكون
- [ ] `dist/manifest.json` موجود
- [ ] `dist/sw.js` موجود
- [ ] `dist/.well-known/assetlinks.json` موجود

---

## 📋 المرحلة 2: توليد الأيقونات

### خيار 1: أداة أونلاين (أسهل)
```
https://realfavicongenerator.net
```
- [ ] افتحت الموقع
- [ ] رفعت `/public/icon.svg`
- [ ] حملت package
- [ ] نسخت الملفات لـ `/public/`

### خيار 2: NPM Tool
```bash
npm install -g pwa-asset-generator
pwa-asset-generator public/icon.svg public/ --icon-only --maskable
```
- [ ] ثبت الأداة
- [ ] ولّدت الأيقونات
- [ ] تحققت من الملفات

### التحقق
```bash
ls public/icon-*.png
```
يجب أن تشوف:
- [ ] `icon-72.png`
- [ ] `icon-96.png`
- [ ] `icon-128.png`
- [ ] `icon-144.png`
- [ ] `icon-152.png`
- [ ] `icon-192.png`
- [ ] `icon-384.png`
- [ ] `icon-512.png`
- [ ] `icon-maskable-192.png`
- [ ] `icon-maskable-512.png`

---

## 📋 المرحلة 3: Netlify Deployment

### التحضير
- [ ] حساب Netlify (مجاني)
- [ ] Netlify CLI مثبت: `npm install -g netlify-cli`

### Deploy - الطريقة 1: CLI
```bash
netlify login
npm run build
netlify deploy --prod --dir=dist
```
- [ ] تسجيل دخول ناجح
- [ ] Build ناجح
- [ ] Deploy ناجح
- [ ] رابط الموقع: `https://__________.netlify.app`

### Deploy - الطريقة 2: Drag & Drop
```
https://app.netlify.com/drop
```
- [ ] Built المشروع: `npm run build`
- [ ] سحبت مجلد `dist/`
- [ ] Upload ناجح
- [ ] رابط الموقع: `https://__________.netlify.app`

### Deploy - الطريقة 3: Git
```bash
git init
git add .
git commit -m "Initial commit"
git push
```
- [ ] Repo على GitHub
- [ ] ربطت Netlify بـ GitHub
- [ ] Auto-deploy يخدم
- [ ] رابط الموقع: `https://__________.netlify.app`

---

## 📋 المرحلة 4: التحقق من PWA

### على Desktop (Chrome)
- [ ] فتحت الموقع: `https://__________.netlify.app`
- [ ] F12 → Application → Manifest
  - [ ] Manifest يظهر صحيح
  - [ ] الأيقونات كلها موجودة
- [ ] F12 → Application → Service Workers
  - [ ] SW Activated ✅
  - [ ] Status: Running ✅
- [ ] أيقونة Install في address bar تظهر

### اختبارات URLs
```bash
# Manifest
curl https://__________.netlify.app/manifest.json
```
- [ ] يرجع JSON صحيح

```bash
# Service Worker
curl https://__________.netlify.app/sw.js
```
- [ ] يرجع JavaScript code

```bash
# Asset Links
curl https://__________.netlify.app/.well-known/assetlinks.json
```
- [ ] يرجع JSON صحيح

### Lighthouse Test
```
F12 → Lighthouse → PWA
```
- [ ] النتيجة: ____ / 100 (يجب 90+)

---

## 📋 المرحلة 5: اختبار على الهاتف

### Android (Chrome)
- [ ] فتحت الموقع على الهاتف
- [ ] Menu → "Install app" يظهر
- [ ] ثبّت التطبيق
- [ ] التطبيق يفتح standalone (بدون browser UI)
- [ ] يعمل offline

### iOS (Safari)
- [ ] فتحت الموقع على iPhone
- [ ] Share → "Add to Home Screen"
- [ ] التطبيق على Home Screen
- [ ] يفتح صحيح

---

## 📋 المرحلة 6: PWABuilder - إنشاء APK

### الخطوات
```
https://www.pwabuilder.com
```
- [ ] فتحت PWABuilder
- [ ] أدخلت رابط الموقع
- [ ] اضغطت "Start"
- [ ] PWA Score: ____ / 100 (يجب 90+)
- [ ] اضغطت "Package For Stores" → "Android"

### إعدادات Android Package
- [ ] Package ID: `com.graphitube.app`
- [ ] App name: `Graphitube`
- [ ] Theme color: `#84cc16`
- [ ] Start URL: `/`

### Signing Key
- [ ] ولّدت Signing Key جديد
- [ ] حفظت keystore file بأمان
- [ ] حفظت password بأمان
- [ ] نسخت SHA-256 fingerprint

### Download
- [ ] حملت `.aab` file
- [ ] الملف: `app-release-signed.aab`
- [ ] الحجم: ~____ MB

---

## 📋 المرحلة 7: تحديث Digital Asset Links

### SHA-256 Fingerprint
```
من PWABuilder أو من:
keytool -list -v -keystore graphitube.keystore
```
- [ ] نسخت SHA-256
- [ ] حدّثت `/public/.well-known/assetlinks.json`
- [ ] SHA-256 صحيح في الملف

### Re-deploy
```bash
npm run build
netlify deploy --prod --dir=dist
```
- [ ] Build جديد
- [ ] Deploy جديد
- [ ] تحققت من assetlinks.json على الموقع

---

## 📋 المرحلة 8: تحضير Google Play Assets

### Screenshots (4-8 صور)
```
المقاس: 1080x1920 أو 1080x2340
```
- [ ] Screenshot 1: الشاشة الرئيسية
- [ ] Screenshot 2: معالج المطبخ
- [ ] Screenshot 3: مصمم 3D
- [ ] Screenshot 4: معالج الصالون
- [ ] Screenshot 5: (اختياري)
- [ ] Screenshot 6: (اختياري)
- [ ] Screenshot 7: (اختياري)
- [ ] Screenshot 8: (اختياري)

### Feature Graphic
```
المقاس: 1024x500 PNG
```
- [ ] صممت في Canva/Figma
- [ ] شعار Graphitube
- [ ] نص: "مطابخ وصالونات مغربية"
- [ ] خلفية خضراء #84cc16

### App Icon
- [ ] `icon-512.png` جاهز

---

## 📋 المرحلة 9: Google Play Console

### حساب
```
https://play.google.com/console
```
- [ ] حساب Google Play Developer
- [ ] دفع $25 (مرة واحدة)
- [ ] الحساب مفعّل

### Create App
- [ ] App name: `Graphitube`
- [ ] Default language: `العربية (ar)`
- [ ] App or game: `Application`
- [ ] Free or paid: `Free`

### Store Listing
- [ ] App name: `Graphitube - مطابخ وصالونات مغربية`
- [ ] Short description (80 حرف)
- [ ] Full description (4000 حرف)
- [ ] App icon: `icon-512.png`
- [ ] Feature graphic: `1024x500.png`
- [ ] Screenshots: 4-8 صور

### App Content
- [ ] Privacy policy URL: `https://__________.netlify.app/privacy.html`
- [ ] Target audience
- [ ] Content rating
- [ ] App access
- [ ] Ads: `No ads`

---

## 📋 المرحلة 10: رفع AAB

### Production Release
```
Production → Create new release
```
- [ ] رفعت `app-release-signed.aab`
- [ ] Release name: `1.0.0`
- [ ] Release notes (عربي):
  ```
  🎉 الإصدار الأول
  • مصمم 3D احترافي
  • معالج ذكي للمطابخ والصالونات
  • طلب عروض أسعار فورية
  ```

### Review
- [ ] راجعت كل المعلومات
- [ ] لا أخطاء
- [ ] كل الأقسام مكتملة ✅

---

## 📋 المرحلة 11: Submit!

### Final Checklist
- [ ] Store listing كامل
- [ ] Privacy policy منشورة
- [ ] Content rating مكتمل
- [ ] Target audience محدد
- [ ] AAB مرفوع
- [ ] Release notes مكتوبة
- [ ] Screenshots مرفوعة
- [ ] Feature graphic مرفوع

### Submit
- [ ] اضغطت "Review release"
- [ ] اضغطت "Start rollout to Production"
- [ ] تأكيد Submit

### Wait
- [ ] تاريخ Submit: ___/___/2026
- [ ] Status: ⏳ Under review
- [ ] وقت المراجعة المتوقع: 1-7 أيام

---

## 📋 المرحلة 12: بعد النشر

### Approval
- [ ] استلمت email من Google Play
- [ ] Status: ✅ Published
- [ ] تاريخ النشر: ___/___/2026
- [ ] رابط المتجر: `https://play.google.com/store/apps/details?id=com.graphitube.app`

### Testing
- [ ] فتحت الرابط على Android
- [ ] Install يخدم
- [ ] التطبيق يفتح صحيح
- [ ] كل الميزات تخدم

### Marketing
- [ ] شاركت على Facebook
- [ ] شاركت على Instagram
- [ ] أضفت badge على الموقع
- [ ] أخبرت العملاء

---

## 🎯 Progress Tracker

### Overall Progress
```
[ ] المرحلة 1: التحضير المحلي          (0/3)
[ ] المرحلة 2: توليد الأيقونات         (0/1)
[ ] المرحلة 3: Netlify Deployment      (0/1)
[ ] المرحلة 4: التحقق من PWA           (0/3)
[ ] المرحلة 5: اختبار على الهاتف      (0/2)
[ ] المرحلة 6: PWABuilder              (0/4)
[ ] المرحلة 7: Digital Asset Links     (0/2)
[ ] المرحلة 8: Google Play Assets      (0/3)
[ ] المرحلة 9: Google Play Console     (0/3)
[ ] المرحلة 10: رفع AAB                (0/2)
[ ] المرحلة 11: Submit                 (0/2)
[ ] المرحلة 12: بعد النشر             (0/3)
```

### التقدم الإجمالي: ____ / 100%

---

## 📝 ملاحظات

### مشاكل واجهتها:
```
___________________________________________
___________________________________________
___________________________________________
```

### حلول:
```
___________________________________________
___________________________________________
___________________________________________
```

### تواريخ مهمة:
```
- بداية العمل: ___/___/2026
- Deploy على Netlify: ___/___/2026
- Submit لـ Google Play: ___/___/2026
- النشر: ___/___/2026
```

---

## 🎉 الخطوة الحالية

**ابدأ من هنا:**
```
المرحلة الحالية: 1 - التحضير المحلي
الخطوة التالية: Build test
الأمر: npm run build
```

**بالتوفيق! 🚀**
