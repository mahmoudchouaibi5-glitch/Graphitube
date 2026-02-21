# 📱 **دليل Android Studio الكامل - Graphitube TWA**

---

## 🎯 **الهدف: إنشاء Android App Bundle (AAB) باستخدام Android Studio**

---

## 📋 **المتطلبات:**

```
✅ Android Studio (آخر إصدار)
✅ Java JDK 11+
✅ 4 GB RAM على الأقل
✅ 8 GB مساحة فارغة
```

---

## 🚀 **الخطوة 1: تحميل Android Studio**

```
1. الموقع: https://developer.android.com/studio

2. الحجم: ~1 GB

3. التثبيت:
   - Windows: تشغيل .exe واتباع المعالج
   - Mac: سحب إلى Applications
   - Linux: استخراج وتشغيل studio.sh

4. أول تشغيل:
   - Setup Wizard
   - Standard installation
   - تحميل SDK components (5-10 دقائق)
   
5. ✅ جاهز للاستخدام!
```

---

## 🛠️ **الخطوة 2: إنشاء مشروع جديد**

```
File → New → New Project

Template:
→ Phone and Tablet
→ No Activity ← (مهم جداً!)

Configure:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Graphitube

Package name: com.graphitube.app

Language: Java

Minimum SDK: API 21 (Android 5.0 Lollipop)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Finish → انتظر Gradle Sync ⏳
```

---

## 📦 **الخطوة 3: إضافة TWA Dependencies**

### **ملف: `app/build.gradle`**

**ابحث عن القسم `dependencies` وأضف:**

```gradle
plugins {
    id 'com.android.application'
}

android {
    namespace 'com.graphitube.app'
    compileSdk 34

    defaultConfig {
        applicationId "com.graphitube.app"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    
    // ✨ TWA Dependencies - مهمة جداً!
    implementation 'androidx.browser:browser:1.7.0'
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

**بعد التعديل:**
```
Sync Now (أعلى الشاشة) → انتظر Gradle Sync ⏳
```

---

## 📄 **الخطوة 4: تعديل AndroidManifest.xml**

### **ملف: `app/src/main/AndroidManifest.xml`**

**استبدل المحتوى بالكامل بهذا:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Internet permission -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Graphitube"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar"
        tools:targetApi="31">

        <!-- 🎯 TWA Launcher Activity -->
        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true"
            android:label="Graphitube">

            <!-- Main launcher intent -->
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- 🔗 Digital Asset Links - للتحقق من الملكية -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE"/>

                <data 
                    android:scheme="https"
                    android:host="graphitube.netlify.app"/>
            </intent-filter>

            <!-- 🌐 Default URL -->
            <meta-data
                android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="https://graphitube.netlify.app" />

            <!-- 🎨 Status bar color -->
            <meta-data
                android:name="android.support.customtabs.trusted.STATUS_BAR_COLOR"
                android:resource="@android:color/white" />

            <!-- 🎨 Navigation bar color -->
            <meta-data
                android:name="android.support.customtabs.trusted.NAVIGATION_BAR_COLOR"
                android:resource="@android:color/white" />

            <!-- 📱 Display mode -->
            <meta-data
                android:name="android.support.customtabs.trusted.DISPLAY_MODE"
                android:value="standalone" />

            <!-- 🔄 Screen orientation -->
            <meta-data
                android:name="android.support.customtabs.trusted.SCREEN_ORIENTATION"
                android:value="portrait" />

            <!-- 💫 Splash screen -->
            <meta-data
                android:name="android.support.customtabs.trusted.SPLASH_IMAGE_DRAWABLE"
                android:resource="@drawable/splash" />

            <meta-data
                android:name="android.support.customtabs.trusted.SPLASH_SCREEN_BACKGROUND_COLOR"
                android:resource="@android:color/white" />

            <meta-data
                android:name="android.support.customtabs.trusted.SPLASH_SCREEN_FADE_OUT_DURATION"
                android:value="300" />

            <!-- 📂 File provider authority -->
            <meta-data
                android:name="android.support.customtabs.trusted.FILE_PROVIDER_AUTHORITY"
                android:value="com.graphitube.app.fileprovider" />
        </activity>

        <!-- 📂 File Provider for sharing files -->
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="com.graphitube.app.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/filepaths" />
        </provider>

    </application>

</manifest>
```

**احفظ الملف ✅**

---

## 🎨 **الخطوة 5: إضافة Splash Screen**

### **A) إنشاء drawable للـ Splash:**

**مسار: `app/src/main/res/drawable/`**

**انقر بزر الماوس الأيمن على `drawable` → New → Drawable Resource File**

```
File name: splash
Root element: layer-list
```

**محتوى `splash.xml`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Background color -->
    <item android:drawable="@android:color/white"/>
    
    <!-- Logo centered -->
    <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/ic_launcher"/>
    </item>
</layer-list>
```

---

### **B) إنشاء File Provider Paths:**

**مسار: `app/src/main/res/xml/`**

**إنشاء مجلد xml إذا لم يكن موجوداً:**
```
انقر بزر الماوس الأيمن على res → New → Directory → xml
```

**ثم: انقر بزر الماوس الأيمن على xml → New → File → filepaths.xml**

**محتوى `filepaths.xml`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <cache-path name="cached_files" path="." />
</paths>
```

---

## 🎨 **الخطوة 6: إضافة الأيقونات**

### **خيار 1: استخدام Image Asset Studio (الأسهل)**

```
1. انقر بزر الماوس الأيمن على res → New → Image Asset

2. Icon Type: Launcher Icons (Adaptive and Legacy)

3. Name: ic_launcher

4. Asset Type: Image

5. Path: اختر icon-512.png من مشروع Graphitube
   (حمّلها من: https://graphitube.netlify.app/icon-512.png)

6. Background Layer:
   - Asset Type: Color
   - Color: #FFFFFF

7. Options:
   ✅ Generate Legacy Icon: Yes
   ✅ Generate Round Icon: Yes

8. Next → Finish ✅
```

---

### **خيار 2: استبدال يدوياً**

**مسارات الأيقونات:**

```
app/src/main/res/mipmap-mdpi/ic_launcher.png (48x48)
app/src/main/res/mipmap-hdpi/ic_launcher.png (72x72)
app/src/main/res/mipmap-xhdpi/ic_launcher.png (96x96)
app/src/main/res/mipmap-xxhdpi/ic_launcher.png (144x144)
app/src/main/res/mipmap-xxxhdpi/ic_launcher.png (192x192)
```

**استبدلها بأيقونات Graphitube المناسبة**

---

## 🔐 **الخطوة 7: إعداد Digital Asset Links**

### **تحديث `assetlinks.json` على Netlify:**

**الملف الحالي: `/public/.well-known/assetlinks.json`**

**يجب أن يحتوي على SHA-256 fingerprint للـ signing key.**

**لكن أولاً نحتاج build التطبيق وتوقيعه!**

---

## 🏗️ **الخطوة 8: Build وتوقيع AAB**

### **A) إنشاء Signing Key:**

```
1. Build → Generate Signed Bundle / APK

2. اختر: Android App Bundle (AAB) ← مهم!

3. Next

4. Create new... (لأول مرة)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   Key store path: 
   اختر مكان آمن، مثلاً:
   C:\Users\YourName\graphitube-keystore.jks
   
   Password: 
   كلمة سر قوية (احفظها!)
   
   Confirm: 
   نفس كلمة السر
   
   Key:
   Alias: graphitube-key
   Password: نفس كلمة السر (أو مختلفة)
   Validity (years): 25
   
   Certificate:
   First and Last Name: Graphitube
   Organizational Unit: Development
   Organization: Graphitube
   City or Locality: Casablanca
   State or Province: Grand Casablanca
   Country Code (XX): MA
   
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. OK

6. Next
```

---

### **B) Build Release AAB:**

```
7. Destination Folder:
   افتراضي: app/release/
   (أو اختر مكان آخر)

8. Build Variants:
   ☑ release

9. Signature Versions:
   ☑ V1 (Jar Signature)
   ☑ V2 (Full APK Signature)

10. Finish ✅

11. انتظر Build... ⏳
    (ستظهر في الأسفل: Build progress)

12. ✅ Build successful!
    
    Locate: اضغط للفتح
    
    الملف: app-release.aab
```

---

## 🔑 **الخطوة 9: الحصول على SHA-256 Fingerprint**

### **للـ Digital Asset Links:**

```
1. افتح Terminal في Android Studio:
   View → Tool Windows → Terminal

2. نفّذ الأمر:
```

**Windows:**
```cmd
keytool -list -v -keystore C:\Users\YourName\graphitube-keystore.jks -alias graphitube-key
```

**Mac/Linux:**
```bash
keytool -list -v -keystore ~/graphitube-keystore.jks -alias graphitube-key
```

```
3. أدخل password

4. ستظهر معلومات الـ Certificate:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   Certificate fingerprints:
   SHA1: XX:XX:XX:...
   SHA256: AA:BB:CC:DD:EE:FF:... ← انسخ هذا!
   
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. انسخ SHA256 (بدون النقطتين :)
   
   مثال:
   من: AA:BB:CC:DD:EE:FF:11:22:33:44:...
   إلى: AABBCCDDEEFF1122334...
```

---

## 🌐 **الخطوة 10: تحديث assetlinks.json**

### **في مشروع Figma Make:**

**ملف: `/public/.well-known/assetlinks.json`**

**استبدل `YOUR_SHA256_FINGERPRINT` بالـ SHA256 الحقيقي:**

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00:11:22:33:44:55:66:77:88:99:00:11:22:33:44:55:66"
    ]
  }
}]
```

**احفظ ورفع على GitHub:**
```
git add public/.well-known/assetlinks.json
git commit -m "Update assetlinks.json with real SHA256"
git push
```

**انتظر Netlify Deploy (~2 دقيقة)**

**تحقق:**
```
افتح: https://graphitube.netlify.app/.well-known/assetlinks.json
يجب أن يظهر الـ SHA256 الصحيح ✅
```

---

## 🧪 **الخطوة 11: اختبار التطبيق**

### **A) تشغيل على Emulator:**

```
1. Tools → Device Manager

2. Create Device:
   - Phone: Pixel 5
   - System Image: Android 13 (API 33)
   - Download إذا لزم
   
3. Finish

4. Run → Run 'app'

5. اختر Emulator

6. ✅ التطبيق يفتح!
```

---

### **B) تشغيل على هاتف حقيقي:**

```
1. في الهاتف: Settings → About phone
   - اضغط 7 مرات على "Build number"
   - ✅ Developer mode enabled!

2. Settings → Developer options
   - ☑ USB debugging

3. وصّل الهاتف بـ USB

4. في Android Studio:
   - Run → Run 'app'
   - اختر هاتفك
   
5. ✅ التطبيق يشتغل!
```

---

## 📤 **الخطوة 12: رفع AAB على Google Play**

### **الملفات الجاهزة:**

```
✅ app-release.aab (في app/release/)
✅ graphitube-keystore.jks (احفظه في مكان آمن!)
✅ Passwords (احفظها!)
✅ SHA256 fingerprint (محدث في assetlinks.json)
```

---

### **رفع على Play Console:**

```
1. https://play.google.com/console

2. Create app (أو افتح التطبيق الموجود)

3. Release → Production → Create new release

4. Upload → اختر app-release.aab

5. Release name: 1.0.0

6. Release notes:
   Arabic:
   الإصدار الأول من تطبيق Graphitube
   • مصمم 3D للمطابخ
   • معالج ذكي 18 خطوة
   • دعم 3 لغات
   
   French:
   Première version de l'application Graphitube
   • Designer 3D pour cuisines
   • Assistant intelligent en 18 étapes
   • Support de 3 langues

7. Save → Review release

8. Start rollout to Production 🚀

9. ✅ Submitted!
```

---

## 🎯 **Timeline الكامل:**

```
✅ تحميل Android Studio: 15 دقيقة
✅ إنشاء المشروع: 5 دقائق
✅ إضافة Dependencies: 5 دقائق
✅ تعديل Manifest: 10 دقائق
✅ إضافة Splash: 5 دقائق
✅ إضافة الأيقونات: 10 دقائق
✅ Build وتوقيع: 10 دقائق
✅ SHA256 و Asset Links: 10 دقائق
✅ اختبار: 10 دقائق
━━━━━━━━━━━━━━━━━━━━━━━━━━━
= 1 ساعة 20 دقيقة إجمالي

ثم:
⏳ Google Play Review: 1-7 أيام
✅ تطبيقك Live! 🎉
```

---

## ⚠️ **نصائح مهمة جداً:**

### **1. احفظ Signing Key في 3 أماكن:**
```
✅ Google Drive
✅ Dropbox
✅ USB آمن

❌ بلاه = لن تستطيع تحديث التطبيق أبداً!
```

### **2. احفظ كل Passwords:**
```
- Keystore password
- Key alias password
- SHA256 fingerprint

ضعها في ملف آمن ومشفر
```

### **3. Version Management:**
```
كل update:
في app/build.gradle:

versionCode 1 → 2 → 3 ...
versionName "1.0.0" → "1.0.1" → "1.1.0" ...
```

### **4. Testing قبل Production:**
```
✅ اختبر على Emulator
✅ اختبر على هاتف حقيقي
✅ تحقق من Digital Asset Links
✅ تحقق من كل المزايا

ثم ارفع على Play Store
```

---

## 🔧 **Troubleshooting:**

### **خطأ: "Manifest merger failed"**
```
Fix:
في AndroidManifest.xml أضف:
xmlns:tools="http://schemas.android.com/tools"

وأضف في <application>:
tools:replace="android:label"
```

### **خطأ: "Duplicate class found"**
```
Fix:
في app/build.gradle أضف:
configurations.all {
    exclude group: 'com.google.guava', module: 'listenablefuture'
}
```

### **خطأ: "Digital Asset Links verification failed"**
```
Fix:
1. تحقق من SHA256 صحيح
2. تحقق من package name مطابق
3. تحقق من assetlinks.json متاح على:
   https://graphitube.netlify.app/.well-known/assetlinks.json
4. انتظر 24 ساعة للـ propagation
```

---

## ✅ **Checklist النهائي:**

```
قبل الرفع على Play Store:

□ AAB file مُوقّع
□ Signing key محفوظ بأمان
□ Passwords محفوظة
□ SHA256 fingerprint صحيح
□ assetlinks.json محدث على Netlify
□ الأيقونات واضحة وجميلة
□ Splash screen يعمل
□ التطبيق مُختبر على جهاز حقيقي
□ لا أخطاء في Logcat
□ جميع المزايا تعمل بشكل صحيح
```

---

## 🎉 **النتيجة النهائية:**

```
✅ Android App Bundle جاهز
✅ موقّع احترافياً
✅ Digital Asset Links configured
✅ جاهز للرفع على Google Play Store
✅ تطبيق احترافي 100%!
```

---

**دابا نبداو التطبيق! 🚀**

**آخر تحديث:** 13 فبراير 2026  
**الحالة:** ✅ دليل كامل - جاهز للتنفيذ
