# ⚡ مرجع سريع: Google Play Store

## 🎯 الأوامر الأساسية

```bash
# تثبيت Bubblewrap
npm install -g @bubblewrap/cli

# بناء AAB (المرة الأولى)
bubblewrap init --manifest https://graphitube.netlify.app/manifest.json
bubblewrap build

# بناء AAB (تحديث)
bubblewrap update
bubblewrap build

# استخراج SHA-256
keytool -list -v -keystore android.keystore -alias android
```

---

## 📋 معلومات التطبيق

```
Package Name: com.graphitube.app
App Name: Graphitube - مطابخ وصالونات مغربية
Version Code: 1
Version Name: 1.0.0
Start URL: https://graphitube.netlify.app
Theme Color: #84cc16
```

---

## 📁 الملفات الهامة

```
✅ /public/manifest.json          → PWA Manifest
✅ /public/privacy-policy.html    → Privacy Policy
✅ /public/.well-known/assetlinks.json → Digital Asset Links
✅ /GOOGLE_PLAY_DEPLOYMENT_GUIDE.md → الدليل الكامل
✅ /GUIDE_GOOGLE_PLAY_AR.md       → الدليل بالعربي
✅ /HOW_TO_GET_SHA256.md          → دليل SHA-256
```

---

## 🔗 روابط مهمة

```
Play Console: https://play.google.com/console
Create Account: https://play.google.com/console/signup
Asset Links Tester: https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://graphitube.netlify.app&relation=delegate_permission/common.handle_all_urls

Bubblewrap GitHub: https://github.com/GoogleChromeLabs/bubblewrap
TWA Guide: https://developer.chrome.com/docs/android/trusted-web-activity/
```

---

## 📱 أحجام الصور المطلوبة

```
App Icon: 512×512 px (PNG, no alpha)
Feature Graphic: 1024×500 px (PNG/JPG)
Screenshots: 1080×1920 px (portrait) - at least 2
Promo Video: YouTube link (optional)
```

---

## ⚠️ لا تنسى!

```
🔐 احفظ android.keystore في 3 أماكن مختلفة
🔐 احفظ keystore password و key password
📱 package name لا يمكن تغييره أبداً
📧 Privacy Policy URL مطلوب
```

---

## 🚀 الخطوات السريعة

```
1. npm install -g @bubblewrap/cli
2. bubblewrap init --manifest https://graphitube.netlify.app/manifest.json
3. bubblewrap build
4. احصل على SHA-256
5. حدّث assetlinks.json
6. افتح Play Console
7. ارفع AAB
8. ملء المعلومات
9. Closed Testing
10. Production Release
```

---

## 💰 التكاليف

```
Google Play Developer Account: $25 (one-time)
App Publishing: $0 (free)
Updates: $0 (free forever)
```

---

## ⏱️ المدة المتوقعة

```
Account Creation: 1-2 days
Building AAB: 15 minutes
Upload & Setup: 1-2 hours
Closed Testing Review: 1-3 days
Production Review: 2-7 days
Total: 1-2 weeks
```
