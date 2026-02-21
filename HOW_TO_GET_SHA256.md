# 🔐 كيفية الحصول على SHA-256 Fingerprint

## 📋 ما هو SHA-256؟

SHA-256 fingerprint هو معرّف فريد لمفتاح التوقيع (signing key) الخاص بتطبيق Android. Google تحتاجه للتحقق من أن التطبيق الذي يفتح موقعك هو تطبيقك الرسمي فعلاً (وليس تطبيق مزيف).

---

## ⏰ متى تحتاجه؟

```
❌ الآن: لا تحتاجه بعد
✅ بعد بناء AAB: ستحتاجه فوراً
```

---

## 🛠️ الطريقة 1: من Keystore (بعد Bubblewrap)

### الخطوات:

```bash
# 1. اذهب لمجلد مشروع Android
cd graphitube-android

# 2. استخرج معلومات Keystore
keytool -list -v -keystore android.keystore -alias android

# 3. أدخل password الـ keystore
# (الباسورد اللي أدخلته عند بناء AAB)

# 4. ستظهر معلومات كثيرة، ابحث عن:
Certificate fingerprints:
         SHA1: XX:XX:XX:XX:...
         SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90
         ^^^^^^ هذا ما تحتاجه!

# 5. انسخ SHA256 كاملاً (64 حرف بالنقاط)
```

---

## 🛠️ الطريقة 2: من Play Console (الأسهل)

### بعد رفع AAB على Play Console:

```
1. اذهب لـ Play Console
2. اختر تطبيقك (Graphitube)
3. اذهب لـ: Setup → App integrity
4. تحت "App signing key certificate":
   - ستجد SHA-256 certificate fingerprint
5. انسخ القيمة
```

---

## 📝 تحديث assetlinks.json

### الملف الحالي:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": [
      "REPLACE_WITH_YOUR_SHA256_FINGERPRINT_AFTER_BUILDING_AAB"
    ]
  }
}]
```

### بعد الحصول على SHA-256:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": [
      "AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90"
    ]
  }
}]
```

---

## ✅ خطوات التحديث في Figma Make

### في Figma Make:

```
1. افتح الملف: /public/.well-known/assetlinks.json
2. استبدل "REPLACE_WITH..." بـ SHA-256 الفعلي
3. احفظ الملف
4. Figma Make سيرفعه تلقائياً على Netlify
5. انتظر 2-3 دقائق حتى ينتشر التحديث
```

---

## 🧪 التحقق من صحة assetlinks.json

### أداة Google الرسمية:

```
1. افتح: https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://graphitube.netlify.app&relation=delegate_permission/common.handle_all_urls

2. يجب أن ترى response يحتوي على:
{
  "statements": [
    {
      "source": {
        "web": {
          "site": "https://graphitube.netlify.app"
        }
      },
      "relation": "delegate_permission/common.handle_all_urls",
      "target": {
        "androidApp": {
          "packageName": "com.graphitube.app",
          "certificate": {
            "sha256Fingerprint": "YOUR_SHA256_HERE"
          }
        }
      }
    }
  ]
}

3. إذا ظهر هذا = assetlinks صحيح ✅
```

---

## 🔍 أمثلة SHA-256

### شكل صحيح:
```
✅ AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90
✅ ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890 (بدون :)
```

### شكل خطأ:
```
❌ AB:CD:EF:12:... (ناقص)
❌ SHA256: AB:CD:EF:... (لا تضع "SHA256:")
❌ ab:cd:ef:12:... (أحرف صغيرة - يجب تكون كبيرة)
```

---

## 📱 نوعان من SHA-256

### إذا استخدمت Play App Signing:

Google تعطيك **نوعين** من SHA-256:

```
1. App signing key certificate (Upload certificate)
   → هذا ما تستخدمه في assetlinks.json ✅
   
2. Upload key certificate
   → هذا للتحميل فقط، لا تستخدمه ❌
```

⚠️ استخدم دائماً: **App signing key certificate**

---

## ⏱️ Timeline

```
1. بناء AAB مع Bubblewrap
   ↓
2. الحصول على SHA-256
   ↓
3. تحديث assetlinks.json في Figma Make
   ↓
4. Deploy على Netlify
   ↓
5. انتظر 2-3 دقائق
   ↓
6. التحقق من assetlinks عبر أداة Google
   ↓
7. رفع AAB على Play Console
   ↓
8. التطبيق يفتح موقعك بدون عرض URL bar! 🎉
```

---

## 🆘 حل المشاكل

### المشكلة: "keytool: command not found"

```
السبب: Java غير مثبت أو PATH غير مضبوط

الحل (Windows):
1. تأكد من تثبيت JDK
2. أضف لـ PATH:
   C:\Program Files\Eclipse Adoptium\jdk-XX\bin

الحل (Mac/Linux):
export PATH=$PATH:$JAVA_HOME/bin
```

### المشكلة: "assetlinks.json not found"

```
السبب: الملف غير موجود على موقعك

الحل:
1. تأكد من رفع الملف على Netlify
2. اختبر الرابط:
   https://graphitube.netlify.app/.well-known/assetlinks.json
3. يجب أن يعرض محتوى JSON
```

### المشكلة: "URL bar still showing in app"

```
السبب: SHA-256 غير صحيح أو assetlinks.json غير محدث

الحل:
1. تأكد من SHA-256 صحيح
2. تأكد من deploy على Netlify
3. انتظر 5-10 دقائق
4. امسح cache التطبيق
5. أعد تثبيت التطبيق
```

---

## ✅ Checklist

```
قبل رفع AAB على Play Console:

☐ بنيت AAB بنجاح
☐ حصلت على SHA-256
☐ حدّثت assetlinks.json
☐ تأكدت من صحة package name: com.graphitube.app
☐ رفعت على Netlify
☐ اختبرت assetlinks.json بأداة Google
☐ SHA-256 صحيح (64 حرف hex)
☐ احتفظت بنسخة من keystore في مكان آمن
```

---

## 📚 مراجع

- [Digital Asset Links](https://developers.google.com/digital-asset-links/v1/getting-started)
- [TWA Quick Start Guide](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start/)
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)

---

**🔐 ملاحظة أمنية:**
SHA-256 fingerprint **ليس سراً**. يمكن مشاركته علناً. الـ keystore file نفسه هو السر اللي يجب حمايته! 🔒
