# 🚀 دليل النشر الكامل - Graphitube PWA

## 📋 جدول المحتويات
1. [الإعداد المحلي](#local-setup)
2. [النشر على GitHub Pages](#github-pages)
3. [تحويل إلى APK Android](#android-apk)
4. [نشر على Google Play Store](#google-play)
5. [حل المشاكل الشائعة](#troubleshooting)

---

## 🏠 1. الإعداد المحلي {#local-setup}

### الخطوة 1: تنظيف المشروع
```bash
npm run clean
npm install
```

### الخطوة 2: التشغيل المحلي
```bash
npm run dev
```

### الخطوة 3: بناء Production
```bash
npm run build
```

### الخطوة 4: معاينة البناء
```bash
npm run preview
```

✅ **تأكد من:**
- عدم وجود أخطاء في Console
- عمل جميع المكونات بشكل صحيح
- تحميل Three.js بنجاح
- Service Worker يعمل بشكل صحيح

---

## 🌐 2. النشر على GitHub Pages {#github-pages}

### الخطوة 1: تحديث GitHub Repository

```bash
git add .
git commit -m "✨ Graphitube PWA v1.0 - Ready for deployment"
git push origin main
```

### الخطوة 2: النشر
```bash
npm run deploy
```

### الخطوة 3: تفعيل GitHub Pages
1. اذهب إلى Settings → Pages
2. Source: `gh-pages` branch
3. Folder: `/ (root)`
4. Save

### الخطوة 4: الوصول للموقع
```
https://[username].github.io/Graphitube/
```

⏱️ **ملاحظة:** قد يستغرق 2-5 دقائق للنشر

---

## 📱 3. تحويل إلى APK Android {#android-apk}

### الطريقة 1: باستخدام Trusted Web Activity (TWA)

#### الخطوة 1: تثبيت Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

#### الخطوة 2: تهيئة المشروع
```bash
bubblewrap init --manifest https://[username].github.io/Graphitube/manifest.json
```

#### الخطوة 3: بناء APK
```bash
bubblewrap build
```

#### الخطوة 4: تثبيت على الهاتف
```bash
bubblewrap install
```

---

### الطريقة 2: باستخدام PWABuilder

1. اذهب إلى https://www.pwabuilder.com/
2. أدخل رابط الموقع:
   ```
   https://[username].github.io/Graphitube/
   ```
3. انقر "Start" → "Package for Stores"
4. اختر "Android" → "Generate Package"
5. حمّل ملف APK

---

### الطريقة 3: باستخدام Android Studio

#### الخطوة 1: تنزيل Android Studio
من: https://developer.android.com/studio

#### الخطوة 2: إنشاء مشروع جديد
- اختر "Phone and Tablet"
- Template: "Trusted Web Activity"

#### الخطوة 3: تكوين المشروع
في `app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.graphitube.app"
        // ...
    }
}
```

في `res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">Graphitube</string>
    <string name="asset_statements">
        [{
            "relation": ["delegate_permission/common.handle_all_urls"],
            "target": {
                "namespace": "web",
                "site": "https://[username].github.io"
            }
        }]
    </string>
    <string name="host">https://[username].github.io</string>
    <string name="start_url">/Graphitube/</string>
</resources>
```

#### الخطوة 4: بناء APK
```bash
./gradlew assembleDebug
```

الملف سيكون في:
```
app/build/outputs/apk/debug/app-debug.apk
```

---

## 🏪 4. نشر على Google Play Store {#google-play}

### المتطلبات الأساسية
- حساب Google Play Developer ($25 رسوم لمرة واحدة)
- APK موقّع (signed)
- Privacy Policy URL
- Screenshots (2-8 صور)
- App Icon (512x512px)

### الخطوة 1: توقيع APK

```bash
# إنشاء Keystore
keytool -genkey -v -keystore graphitube-release.keystore \
  -alias graphitube -keyalg RSA -keysize 2048 -validity 10000

# توقيع APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore graphitube-release.keystore \
  app-release-unsigned.apk graphitube

# Optimize with zipalign
zipalign -v 4 app-release-unsigned.apk graphitube-release.apk
```

### الخطوة 2: رفع على Play Console

1. اذهب إلى https://play.google.com/console
2. Create App → Fill details:
   - **App name:** Graphitube
   - **Default language:** العربية
   - **App or game:** App
   - **Free or paid:** Free
3. Complete all sections:
   - App content
   - Privacy policy
   - Ads (إذا كان يوجد إعلانات)
   - Content rating
   - Target audience
   - Data safety

### الخطوة 3: إنشاء Release

1. Production → Create new release
2. Upload APK
3. Release name: `1.0.0`
4. Release notes (بالعربية):
   ```
   الإصدار الأول من Graphitube
   - تصميم مطابخ ثلاثي الأبعاد
   - تصميم صالونات خشبية
   - دعم كامل للعمل offline
   - طلب عروض أسعار مباشرة
   ```

### الخطوة 4: Review والنشر

انقر "Review release" → "Start rollout to Production"

⏱️ **المدة:** 1-7 أيام للمراجعة

---

## 🛠️ 5. حل المشاكل الشائعة {#troubleshooting}

### مشكلة: Three.js لا يعمل بعد النشر

**الحل:**
```bash
npm run clean
npm run build
npm run deploy
```

### مشكلة: Service Worker لا يعمل على GitHub Pages

**الحل:** تأكد من HTTPS وأن base في vite.config.ts صحيح:
```typescript
base: '/Graphitube/', // يجب أن يطابق اسم الريبو
```

### مشكلة: الأيقونات لا تظهر في PWA

**الحل:** تأكد من وجود:
- `/public/icon-192.png`
- `/public/icon-512.png`
- الأيقونات في `manifest.json`

### مشكلة: التطبيق لا يعمل Offline

**الحل:** تحقق من:
```javascript
// في vite.config.ts
globPatterns: [
  '**/*.{js,css,html,ico,png,svg,woff,woff2}',
  '**/three*.js',
  '**/vendor*.js'
],
```

### مشكلة: APK لا يعمل على الهاتف

**الحل:** تأكد من:
1. تطابق `assetlinks.json` مع package name
2. صحة `applicationId` في build.gradle
3. توقيع APK بشكل صحيح

---

## ✅ Checklist قبل النشر

- [ ] تنظيف Cache وإعادة البناء
- [ ] اختبار محلي كامل (dev + preview)
- [ ] تحديث Git والـ push
- [ ] deploy على GitHub Pages
- [ ] اختبار الموقع المنشور
- [ ] التأكد من عمل PWA (Install button)
- [ ] اختبار Offline Mode
- [ ] بناء APK
- [ ] اختبار APK على هاتف حقيقي
- [ ] تجهيز Screenshots و Privacy Policy
- [ ] رفع على Play Console

---

## 📞 الدعم

إذا واجهت أي مشكلة:
- **WhatsApp:** 0609394003
- **Email:** support@graphitube.com
- **الملفات المساعدة:**
  - `TROUBLESHOOTING.md` - حلول مفصلة
  - `QUICK_FIX.md` - حلول سريعة

---

## 📚 موارد مفيدة

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Trusted Web Activity Guide](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)
- [Three.js Docs](https://threejs.org/docs/)

---

**آخر تحديث:** 2026-02-20  
**الإصدار:** 1.0.0
