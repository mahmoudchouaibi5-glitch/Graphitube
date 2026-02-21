# 🚀 نشر Graphitube على Google Play - دليل سريع

## ⚡ الخطوات السريعة (30 دقيقة)

### 1️⃣ تحضير PWA (✅ مكتمل!)
```bash
✅ manifest.json موجود
✅ Service Worker مسجل
✅ الأيقونات جاهزة (يجب توليد PNG)
```

### 2️⃣ توليد الأيقونات
```bash
# خيار 1: استخدام أداة أونلاين
افتح: https://realfavicongenerator.net
ارفع: /public/icon.svg
حمّل وانسخ الملفات لـ /public/

# خيار 2: استخدام NPM tool
npm install -g pwa-asset-generator
pwa-asset-generator public/icon.svg public/ --icon-only --maskable
```

### 3️⃣ رفع الموقع على HTTPS
```bash
# باستخدام Vercel (الأسهل)
npm install -g vercel
vercel
# أو
# Netlify / Firebase Hosting
```

### 4️⃣ إنشاء APK/AAB باستخدام PWABuilder

#### A) افتح PWABuilder
🌐 https://www.pwabuilder.com

#### B) أدخل رابط موقعك
```
https://your-graphitube-site.vercel.app
```

#### C) اضغط "Start" ثم "Package For Stores"

#### D) اختر Android واملأ:
```json
{
  "packageId": "com.graphitube.app",
  "name": "Graphitube",
  "launcherName": "Graphitube",
  "themeColor": "#84cc16",
  "backgroundColor": "#ffffff",
  "startUrl": "/"
}
```

#### E) توليد Signing Key
- اختر "Generate new signing key"
- **⚠️ احفظ الملفات بأمان!**

#### F) حمّل AAB
- اضغط "Generate"
- حمّل `app-release-signed.aab`

### 5️⃣ إنشاء حساب Google Play
```
🌐 https://play.google.com/console
💰 دفع: $25 (مرة واحدة)
```

### 6️⃣ إنشاء تطبيق جديد

#### في Play Console:
1. اضغط "Create app"
2. املأ:
   - **Name**: Graphitube
   - **Language**: العربية
   - **Type**: Application
   - **Free/Paid**: Free

### 7️⃣ إعداد Store Listing

#### App details:
- **Name**: Graphitube - مطابخ وصالونات مغربية
- **Short description**:
  ```
  طلب عروض أسعار المطابخ والصالونات مع مصمم 3D احترافي
  ```
- **Full description**: (انسخ من GOOGLE_PLAY_GUIDE.md)

#### Graphics:
- **App icon**: icon-512.png
- **Feature graphic**: 1024x500 (عمل في Canva)
- **Screenshots**: 4-8 صور من التطبيق

### 8️⃣ Privacy Policy
أنشئ صفحة `/privacy.html` على موقعك:
```html
<h1>Privacy Policy - Graphitube</h1>
<p>نجمع: الاسم، الهاتف، الصور (للمشاريع فقط)</p>
<p>الاستخدام: معالجة الطلبات والتواصل عبر WhatsApp</p>
<p>لا نشارك بياناتك مع أطراف ثالثة</p>
```

URL: `https://your-site.com/privacy.html`

### 9️⃣ رفع AAB
1. اذهب لـ "Production" → "Create release"
2. ارفع `app-release-signed.aab`
3. املأ Release notes:
   ```
   🎉 النسخة الأولى
   • مصمم 3D للمطابخ
   • معالج الصالونات
   • طلب عروض فورية
   ```

### 🔟 Digital Asset Links
في PWABuilder، انسخ SHA-256 fingerprint
حدّث `/public/.well-known/assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": ["XX:XX:XX:..."]
  }
}]
```

### 1️⃣1️⃣ Submit!
1. اضغط "Review release"
2. املأ:
   - ✅ Content rating
   - ✅ Target audience
   - ✅ Privacy policy
3. اضغط "Start rollout to Production"

---

## ⏱️ Timeline

- **التحضير**: 1 ساعة
- **PWABuilder**: 15 دقيقة
- **Play Console**: 30 دقيقة
- **المراجعة**: 1-7 أيام ⏳

---

## 🎯 Checklist

### قبل البداية:
- [ ] الموقع على HTTPS
- [ ] Manifest.json صحيح
- [ ] Service Worker يعمل
- [ ] الأيقونات متوفرة

### في PWABuilder:
- [ ] APK/AAB تم توليده
- [ ] Signing key محفوظ بأمان
- [ ] SHA-256 منسوخ

### في Play Console:
- [ ] حساب مفعّل ($25)
- [ ] Store listing كامل
- [ ] Graphics مرفوعة
- [ ] Privacy policy URL
- [ ] AAB مرفوع
- [ ] Content rating
- [ ] Submitted ✅

---

## 🆘 مساعدة سريعة

### مشكلة: "PWA score too low"
**الحل:** تأكد من:
- ✅ HTTPS فعّال
- ✅ manifest.json موجود
- ✅ Service Worker مسجل
- ✅ يعمل offline

### مشكلة: "Asset links failed"
**الحل:**
```bash
# تحقق من:
curl https://your-site.com/.well-known/assetlinks.json
# يجب أن يرجع JSON صحيح
```

### مشكلة: "Invalid package name"
**الحل:**
- استخدم: `com.graphitube.app`
- فقط حروف صغيرة ونقاط
- بدون مسافات أو أحرف خاصة

---

## 📱 بعد النشر

### شارك التطبيق:
```
https://play.google.com/store/apps/details?id=com.graphitube.app
```

### أضف Badge على الموقع:
```html
<a href="https://play.google.com/store/apps/details?id=com.graphitube.app">
  <img src="google-play-badge.png" alt="Get it on Google Play">
</a>
```

---

## 🎉 تهانينا!

التطبيق الآن على Google Play! 🚀

**الدعم:** dev@graphitube.ma
