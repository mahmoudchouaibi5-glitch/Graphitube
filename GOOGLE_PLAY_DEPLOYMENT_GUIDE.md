# 🚀 دليل نشر Graphitube على Google Play Store

## 📋 المتطلبات الأساسية

### 1. حساب Google Play Developer
- **التكلفة**: $25 دفعة واحدة مدى الحياة
- **الرابط**: https://play.google.com/console/signup
- **المدة**: 1-2 يوم للموافقة

### 2. البرامج المطلوبة على جهازك
```bash
# تحقق من تثبيت Node.js
node --version  # يجب أن يكون 14.0 أو أحدث

# تثبيت Bubblewrap
npm install -g @bubblewrap/cli

# تحقق من Java
java --version  # يجب أن يكون 11 أو أحدث
```

---

## 🛠️ خطوات بناء Android App Bundle (.aab)

### الخطوة 1: إنشاء المشروع

```bash
# 1. أنشئ مجلد جديد
mkdir graphitube-android
cd graphitube-android

# 2. ابدأ Bubblewrap
bubblewrap init --manifest https://graphitube.netlify.app/manifest.json
```

### الخطوة 2: أجب على الأسئلة

```
Domain being opened in the TWA:
→ graphitube.netlify.app

Name of the application:
→ Graphitube

Short name for the application:
→ Graphitube

Display mode:
→ standalone

Status bar color:
→ #84cc16

Splash screen color:
→ #ffffff

Application ID (Package Name):
→ com.graphitube.app
⚠️ مهم جداً: لا تغير هذا أبداً!

Path to save the project:
→ ./
(اضغط Enter)

Launcher name:
→ Graphitube

Launcher short name:
→ Graphitube

Generate Android Signing key:
→ Yes
```

### الخطوة 3: بناء AAB

```bash
# بناء التطبيق
bubblewrap build

# النتيجة: app-release-signed.aab
# الموقع: ./app-release-signed.aab
```

### الخطوة 4: احفظ معلومات التوقيع

```bash
# ستجد الملف في:
android.keystore

# معلومات مهمة (احفظها!):
Keystore password: [كلمة السر التي أدخلتها]
Key alias: android
Key password: [نفس كلمة السر]

⚠️ خطر: فقدان هذا الملف = لن تستطيع تحديث التطبيق!
```

---

## 📱 خطوات الرفع على Google Play Console

### 1. تسجيل الدخول
https://play.google.com/console

### 2. إنشاء تطبيق جديد
```
- Application name: Graphitube
- Default language: العربية (ar)
- App or Game: App
- Free or Paid: Free
```

### 3. ملء معلومات التطبيق

#### أ) App details
```
- App name: Graphitube - مطابخ وصالونات مغربية
- Short description (80 chars):
  "تطبيق احترافي لطلب عروض أسعار مطابخ وصالونات مخصصة مع مصمم 3D"

- Full description (4000 chars):
  "اكتشف Graphitube - تطبيقك الموثوق لتصميم وطلب المطابخ والصالونات المغربية المخصصة!

  🎨 مصمم ثلاثي الأبعاد تفاعلي
  صمم مطبخك بنفسك باستخدام مصممنا الثلاثي الأبعاد الاحترافي المشابه لـ IKEA Kitchen Planner.
  
  ✅ نظام طلب ذكي
  - 18 خطوة مفصلة لطلب المطبخ
  - خطوات محترفة لطلب الصالون
  - حساب تلقائي للتقديرات
  
  🌐 دعم متعدد اللغات
  - العربية الفصحى
  - الفرنسية
  - الدارجة المغربية
  
  📧 تواصل فوري
  - إشعارات عبر WhatsApp
  - تأكيد عبر البريد الإلكتروني
  - متابعة الطلب
  
  🏆 لماذا Graphitube؟
  - خبرة مغربية أصيلة في النجارة الخشبية
  - تصاميم عصرية وكلاسيكية
  - خدمة شاملة من التصميم للتركيب
  - أسعار شفافة وتنافسية
  
  📱 جرب الآن مجاناً!"

- App icon: [ارفع icon-512.png]
- Feature graphic: [ارفع feature-graphic.png]
- Screenshots: [ارفع على الأقل 2 screenshots]
```

#### ب) Category & Tags
```
- Category: House & Home (أو Business)
- Tags: kitchen, design, home, furniture, morocco
```

#### ج) Contact details
```
- Email: support@graphitube.com (أو البريد الفعلي)
- Phone: [رقم الهاتف]
- Website: https://graphitube.netlify.app
- Privacy Policy URL: https://graphitube.netlify.app/privacy-policy
```

### 4. إعداد Content rating
```
- التطبيق موجه لجميع الأعمار
- لا يحتوي على محتوى حساس
- أكمل الاستبيان بصدق
```

### 5. إعداد App access
```
- التطبيق مجاني بالكامل
- لا توجد ميزات مقفلة
- كل المحتوى متاح للجميع
```

### 6. إعداد Ads
```
- هل يحتوي على إعلانات؟
  → No (إذا لم تضف إعلانات)
```

### 7. Target audience & content
```
- الفئة المستهدفة: 18+
- ليس موجه للأطفال
```

---

## 🧪 إعداد Closed Testing

### 1. إنشاء قناة اختبار
```
Play Console → Testing → Closed testing → Create new release
```

### 2. رفع AAB
```
- اضغط "Upload"
- اختر app-release-signed.aab
- انتظر التحميل والمعالجة
```

### 3. Release notes
```
Version 1.0.0 (ar):
• إطلاق التطبيق الأول
• مصمم مطبخ ثلاثي الأبعاد
• نظام طلب عروض أسعار ذكي
• دعم اللغة العربية والفرنسية
• تكامل مع WhatsApp والبريد الإلكتروني

Version 1.0.0 (fr):
• Première version de l'application
• Concepteur de cuisine 3D
• Système de devis intelligent
• Support arabe et français
• Intégration WhatsApp et email
```

### 4. إضافة المختبرين

#### الطريقة 1: Email List
```
- أضف emails مباشرة
- أرسل رابط الدعوة
```

#### الطريقة 2: Google Group
```
1. أنشئ مجموعة: https://groups.google.com/
2. اسم المجموعة: graphitube-beta-testers
3. أضف الأعضاء
4. في Play Console، ربط المجموعة
```

### 5. اختيار الدول
```
- المغرب (أساسي)
- فرنسا (اختياري)
- دول الخليج (اختياري)
```

### 6. نشر النسخة للاختبار
```
- Review → Save → Start rollout to Closed testing
- انتظر موافقة Google (1-3 أيام)
```

---

## 🚀 الانتقال إلى Production

### بعد نجاح Closed Testing:

```
1. جمع الملاحظات
2. إصلاح الأخطاء
3. بناء نسخة جديدة
4. رفع على Production track
5. ملء جميع المتطلبات:
   - Privacy Policy
   - Data safety form
   - App content declarations
6. Submit for review
7. الانتظار (2-7 أيام)
8. النشر! 🎉
```

---

## 🔐 Digital Asset Links (TWA)

### تم إعداده مسبقاً:
```
الملف: /.well-known/assetlinks.json
الموقع: https://graphitube.netlify.app/.well-known/assetlinks.json

⚠️ سيحتاج تحديث بعد إنشاء keystore
```

### بعد بناء AAB، احصل على SHA-256:
```bash
# استخرج SHA-256
keytool -list -v -keystore android.keystore -alias android

# انسخ SHA-256 fingerprint
# مثال: AB:CD:EF:12:34:...

# حدّث assetlinks.json:
"sha256_cert_fingerprints": ["AB:CD:EF:12:34:..."]
```

---

## 📊 Checklist نهائي قبل الإطلاق

### ملفات مطلوبة:
- [x] manifest.json ✅
- [x] icon-512.png ✅
- [x] icon-maskable-512.png ✅
- [ ] feature-graphic.png (1024×500)
- [ ] screenshots (على الأقل 2)
- [ ] privacy-policy.html

### إعدادات Play Console:
- [ ] App details مكتملة
- [ ] Content rating مكتمل
- [ ] Target audience محدد
- [ ] Data safety form مكتمل
- [ ] Pricing & distribution محددة

### اختبارات:
- [ ] التطبيق يعمل على Android
- [ ] Closed testing مكتمل
- [ ] لا توجد أخطاء حرجة
- [ ] Performance جيد

---

## 🆘 حل المشاكل الشائعة

### خطأ: "Invalid package name"
```
الحل: استخدم فقط:
- حروف صغيرة
- أرقام
- نقاط
مثال: com.graphitube.app ✅
```

### خطأ: "Missing SHA-256"
```
الحل:
1. استخرج SHA-256 من keystore
2. حدّث assetlinks.json
3. deploy على Netlify
4. انتظر 5 دقائق
```

### خطأ: "App not installable"
```
الأسباب المحتملة:
- Package name مكرر
- Minimum SDK version عالي جداً
- Permissions غير مصرح بها

الحل: راجع AndroidManifest.xml
```

---

## 📞 الدعم

### موارد مفيدة:
- Bubblewrap Docs: https://github.com/GoogleChromeLabs/bubblewrap
- TWA Guide: https://developer.chrome.com/docs/android/trusted-web-activity/
- Play Console Help: https://support.google.com/googleplay/android-developer

### الحصول على مساعدة:
- Google Play Console Support
- Stack Overflow (tag: android-app-bundle, trusted-web-activity)

---

## ✅ ملخص الخطوات

```
1. تثبيت Bubblewrap ✅
2. بناء AAB ⏳
3. إنشاء حساب Play Console ⏳
4. رفع AAB ⏳
5. ملء المعلومات ⏳
6. Closed Testing ⏳
7. جمع Feedback ⏳
8. إصلاح المشاكل ⏳
9. Production Release ⏳
10. النشر الرسمي! 🚀
```

---

**آخر تحديث**: فبراير 2026
**الإصدار**: 1.0
**الحالة**: Closed Testing Ready
