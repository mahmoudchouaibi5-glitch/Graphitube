# ⚡ **Android Studio - دليل سريع (15 دقيقة!)**

---

## 🎯 **الهدف: AAB File في أسرع وقت!**

---

## 📥 **1. تحميل Android Studio (10 دقائق)**

```
https://developer.android.com/studio

Download → Install → Standard Setup → Finish
```

---

## 🚀 **2. مشروع جديد (2 دقيقة)**

```
File → New → New Project
→ No Activity
→ Name: Graphitube
→ Package: com.graphitube.app
→ Language: Java
→ Min SDK: API 21
→ Finish
```

---

## 📦 **3. Dependencies (1 دقيقة)**

**ملف: `app/build.gradle`**

**أضف في dependencies:**
```gradle
implementation 'androidx.browser:browser:1.7.0'
implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
```

**اضغط: Sync Now**

---

## 📱 **4. AndroidManifest.xml (نسخ ولصق!)**

**ملف: `app/src/main/AndroidManifest.xml`**

**استبدل بالكامل:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Graphitube"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">

        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE"/>
                <data android:scheme="https" android:host="graphitube.netlify.app"/>
            </intent-filter>

            <meta-data android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="https://graphitube.netlify.app" />
        </activity>
    </application>
</manifest>
```

---

## 🏗️ **5. Build AAB (2 دقيقة)**

```
Build → Generate Signed Bundle / APK

→ Android App Bundle (AAB)
→ Next

→ Create new...

Key store path: اختر مكان (Desktop مثلاً)
Password: اختر password قوي واحفظه!
Alias: graphitube
Validity: 25 years

Certificate:
Name: Graphitube
Organization: Graphitube
Country: MA

→ OK → Next → Finish

⏳ انتظر Build...

✅ AAB جاهز في: app/release/app-release.aab
```

---

## 🔑 **6. SHA256 للـ Asset Links**

**Terminal في Android Studio:**

**Windows:**
```cmd
keytool -list -v -keystore "C:\Users\YourName\Desktop\keystore.jks" -alias graphitube
```

**Mac/Linux:**
```bash
keytool -list -v -keystore ~/Desktop/keystore.jks -alias graphitube
```

**انسخ SHA256 (بدون :)**

**مثال:**
```
من: AA:BB:CC:DD:EE:FF:11:22:33:44
إلى: AABBCCDDEEFF112233
```

---

## 🌐 **7. تحديث assetlinks.json**

**في Figma Make: `/public/assetlinks.json`**

**استبدل `REPLACE_WITH...` بالـ SHA256:**

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": [
      "PASTE_YOUR_SHA256_HERE"
    ]
  }
}]
```

**رفع على GitHub:**
```bash
git add public/assetlinks.json
git commit -m "Update SHA256"
git push
```

**انتظر Netlify Deploy (2 دقيقة)**

---

## ✅ **8. تحقق من كل شيء**

```
✅ AAB file: app/release/app-release.aab
✅ Keystore: محفوظ بأمان
✅ Password: محفوظ
✅ SHA256: محدث في assetlinks.json
✅ Netlify: deployed

جاهز للرفع على Google Play! 🎉
```

---

## 📤 **9. رفع على Google Play Console**

```
https://play.google.com/console

→ Create app / Open existing app
→ Release → Production
→ Create new release
→ Upload → اختر app-release.aab
→ Fill release notes
→ Save → Review → Start rollout 🚀

⏳ Google Review: 1-7 أيام
✅ تطبيقك Live!
```

---

## ⚠️ **احفظ هذه الملفات بأمان!**

```
📁 keystore.jks (الملف الأهم!)
📝 password (كلمة السر)
📝 SHA256 fingerprint
📦 app-release.aab

⚠️ بدون keystore = لا يمكن تحديث التطبيق أبداً!

احفظها في:
✅ Google Drive
✅ Dropbox
✅ USB
```

---

## 🎯 **الخلاصة:**

```
Total Time: 15 دقيقة

1. Download Android Studio (10 min)
2. New Project (2 min)
3. Add Dependencies (1 min)
4. Manifest (copy/paste)
5. Build AAB (2 min)
6. SHA256 (1 min)
7. Update assetlinks (1 min)

= AAB جاهز! ✅
```

---

## 💡 **للتفاصيل الكاملة:**

**اقرأ: `ANDROID_STUDIO_GUIDE.md`**

فيه:
- شرح مفصل لكل خطوة
- Splash screen setup
- أيقونات مخصصة
- Testing على Emulator/Device
- Troubleshooting كامل
- 50+ صفحة documentation

---

**دابا ابدا! 15 دقيقة فقط! 🚀**

**آخر تحديث:** 13 فبراير 2026
