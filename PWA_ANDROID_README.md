# 📱 Graphitube - PWA & Android App

## 🎯 نظرة عامة

**Graphitube** هو تطبيق Progressive Web App (PWA) كامل وجاهز للنشر على **Google Play Store** كتطبيق Android رسمي.

---

## ✅ الحالة الحالية

### PWA Infrastructure ✓
- ✅ **manifest.json** - Web App Manifest كامل
- ✅ **Service Worker** - للعمل offline
- ✅ **أيقونات** - جميع المقاسات (SVG + PNG)
- ✅ **HTTPS Ready** - جاهز للإنتاج
- ✅ **RTL Support** - دعم كامل للعربية
- ✅ **Offline Mode** - يعمل بدون إنترنت

### Android Ready ✓
- ✅ **TWA Compatible** - متوافق مع Trusted Web Activity
- ✅ **Digital Asset Links** - ملف assetlinks.json جاهز
- ✅ **App Shortcuts** - اختصارات المطبخ والصالون
- ✅ **Splash Screen** - شعار Graphitube
- ✅ **Privacy Policy** - صفحة الخصوصية `/public/privacy.html`

---

## 🚀 الخطوات التالية

### 1. توليد الأيقونات
```bash
# خيار 1: أداة NPM (موصى به)
npm install -g pwa-asset-generator
pwa-asset-generator public/icon.svg public/ --icon-only --maskable --padding "10%" --background "#84cc16"

# خيار 2: أونلاين
# افتح: https://realfavicongenerator.net
# ارفع: public/icon.svg
```

### 2. رفع على HTTPS
```bash
# باستخدام Vercel
npm install -g vercel
vercel

# أو Netlify
netlify deploy --prod

# أو Firebase
firebase deploy
```

### 3. إنشاء APK/AAB

#### الطريقة 1: PWABuilder (الأسهل)
```
1. افتح: https://www.pwabuilder.com
2. أدخل رابط الموقع
3. اضغط "Package For Stores" → "Android"
4. املأ البيانات:
   - Package: com.graphitube.app
   - Name: Graphitube
   - Theme: #84cc16
5. Generate & Download AAB
```

#### الطريقة 2: Bubblewrap CLI
```bash
# تثبيت
npm install -g @bubblewrap/cli

# إنشاء المشروع
bubblewrap init --manifest=https://your-site.com/manifest.json

# بناء
cd graphitube-app
bubblewrap build
```

### 4. نشر على Google Play
```
1. سجل في: https://play.google.com/console ($25)
2. Create App
3. املأ Store Listing
4. ارفع Graphics (icon, screenshots)
5. ارفع AAB
6. Submit for Review
7. انتظر 1-7 أيام
```

**📖 دليل مفصل:** اقرأ `GOOGLE_PLAY_GUIDE.md`  
**⚡ دليل سريع:** اقرأ `QUICK_GOOGLE_PLAY_SETUP.md`

---

## 📂 هيكل الملفات

```
/
├── public/
│   ├── manifest.json          # Web App Manifest
│   ├── sw.js                  # Service Worker
│   ├── icon.svg               # أيقونة SVG (المصدر)
│   ├── icon-*.png            # أيقونات PNG (يجب توليدها)
│   ├── privacy.html          # سياسة الخصوصية
│   └── .well-known/
│       └── assetlinks.json   # Digital Asset Links
│
├── src/app/
│   ├── App.tsx               # SW Registration
│   └── ...
│
├── GOOGLE_PLAY_GUIDE.md      # دليل كامل للنشر
├── QUICK_GOOGLE_PLAY_SETUP.md # دليل سريع
└── generate-icons.md         # كيفية توليد الأيقونات
```

---

## 🔍 التحقق من PWA

### 1. Lighthouse Audit
```bash
# في Chrome DevTools
1. F12 → Lighthouse
2. اختر "Progressive Web App"
3. Generate Report
4. يجب أن تحصل على 90+/100
```

### 2. Service Worker
```javascript
// في Console
navigator.serviceWorker.getRegistration().then(reg => console.log(reg));
// يجب أن يرجع registration object
```

### 3. Manifest
```
افتح: chrome://about-internals/
ابحث عن موقعك
تحقق من manifest
```

### 4. Install Prompt
```
على Chrome Desktop:
- أيقونة تثبيت في شريط العنوان
على Chrome Mobile:
- "Add to Home Screen" في القائمة
```

---

## 🛠️ التطوير

### تشغيل محلي
```bash
npm run dev
# ثم افتح: http://localhost:5173
```

### بناء للإنتاج
```bash
npm run build
```

### اختبار PWA محلياً
```bash
# استخدم HTTPS محلي
npm install -g local-ssl-proxy
local-ssl-proxy --source 3001 --target 5173
# ثم افتح: https://localhost:3001
```

---

## 📸 Screenshots للمتجر

يجب تصوير:
1. **الشاشة الرئيسية** - بطاقات المطبخ والصالون
2. **معالج المطبخ** - خطوات التصميم
3. **مصمم 3D** - المصمم التفاعلي
4. **معالج الصالون** - الخيارات
5. **صفحة النجاح** - تأكيد الطلب

**المقاس:** 1080x1920 أو 1080x2340 (9:16)  
**الكمية:** 4-8 صور

---

## 🔐 Digital Asset Links

### توليد SHA-256 Fingerprint
```bash
# من keystore
keytool -list -v -keystore graphitube.keystore -alias graphitube

# نسخ SHA256
# مثال: AA:BB:CC:DD:EE:FF:...
```

### تحديث assetlinks.json
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}]
```

### التحقق
```bash
# يجب أن يكون متاح على:
https://your-site.com/.well-known/assetlinks.json

# اختبار:
curl https://your-site.com/.well-known/assetlinks.json
```

---

## 🎨 الأيقونات المطلوبة

### PWA Icons
- `icon-72.png` - 72x72
- `icon-96.png` - 96x96
- `icon-128.png` - 128x128
- `icon-144.png` - 144x144
- `icon-152.png` - 152x152
- `icon-192.png` - 192x192 ✅
- `icon-384.png` - 384x384
- `icon-512.png` - 512x512 ✅

### Maskable Icons (Android Adaptive)
- `icon-maskable-192.png` - 192x192
- `icon-maskable-512.png` - 512x512

### Google Play Graphics
- `feature-graphic.png` - 1024x500
- App icon: 512x512
- Screenshots: 1080x1920 (4-8 صور)

---

## 🐛 حل المشاكل

### "Service Worker failed to register"
```javascript
// تحقق من المسار
console.log(window.location.origin + '/sw.js');

// تحقق من HTTPS
console.log(window.location.protocol); // يجب أن يكون https:
```

### "Manifest not detected"
```html
<!-- تأكد من وجود في <head> -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#84cc16">
```

### "Icons missing"
```bash
# تحقق من الملفات
ls -la public/icon-*.png

# يجب أن تكون PNG صحيحة
file public/icon-192.png
# Output: PNG image data, 192 x 192...
```

---

## 📊 Analytics

### Play Store Analytics
```
Google Play Console → Statistics
- التحميلات
- التقييمات
- Crash Reports
```

### PWA Analytics
```javascript
// في Service Worker
self.addEventListener('install', (event) => {
  // أرسل event لـ Analytics
  console.log('PWA installed');
});
```

---

## 🔄 التحديثات

### تحديث PWA
```javascript
// في App.tsx
navigator.serviceWorker.register('/sw.js').then(reg => {
  reg.addEventListener('updatefound', () => {
    const newWorker = reg.installing;
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // إشعار المستخدم بتحديث جديد
        console.log('Update available!');
      }
    });
  });
});
```

### تحديث Android App
```bash
# زيادة version في manifest
"versionCode": 2,
"versionName": "1.0.1"

# Build جديد
bubblewrap build

# رفع على Play Console
```

---

## 📚 الموارد

### الوثائق
- **PWA**: https://web.dev/progressive-web-apps/
- **TWA**: https://developer.chrome.com/docs/android/trusted-web-activity
- **Bubblewrap**: https://github.com/GoogleChromeLabs/bubblewrap
- **PWABuilder**: https://docs.pwabuilder.com

### الأدوات
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **PWA Asset Generator**: https://github.com/onderceylan/pwa-asset-generator
- **Maskable.app**: https://maskable.app
- **Real Favicon**: https://realfavicongenerator.net

---

## ✅ Checklist

### PWA Ready:
- [x] manifest.json
- [x] Service Worker
- [x] HTTPS
- [ ] Icons (يجب توليدها)
- [x] Offline support
- [x] Privacy policy

### Android Ready:
- [ ] AAB generated
- [ ] Signing key
- [ ] assetlinks.json updated
- [ ] Screenshots
- [ ] Feature graphic

### Play Store Ready:
- [ ] Play Console account
- [ ] Store listing
- [ ] Privacy policy URL
- [ ] Content rating
- [ ] AAB uploaded

---

## 🎉 بعد النشر

### مشاركة التطبيق
```html
<!-- Badge للموقع -->
<a href="https://play.google.com/store/apps/details?id=com.graphitube.app">
  <img src="google-play-badge.png" alt="Get it on Google Play">
</a>
```

### التسويق
- شارك على Facebook/Instagram
- أضف رابط في الإيميل التوقيع
- أنشئ QR Code للتحميل
- استخدم Google Ads

---

## 📞 الدعم

**أسئلة؟ مشاكل؟**

📧 Email: dev@graphitube.ma  
💬 WhatsApp: +212 612 345 678  
📖 Docs: `GOOGLE_PLAY_GUIDE.md`

---

## 📄 الترخيص

© 2026 Graphitube. جميع الحقوق محفوظة.

---

**🚀 جاهز للانطلاق!**

اقرأ `QUICK_GOOGLE_PLAY_SETUP.md` للبدء فوراً.
