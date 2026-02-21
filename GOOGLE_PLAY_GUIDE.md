# 📱 دليل نشر Graphitube على Google Play Store

## 🎯 نظرة عامة

هذا الدليل يشرح كيفية تحويل موقع Graphitube إلى تطبيق Android ونشره على Google Play Store باستخدام **TWA (Trusted Web Activity)**.

---

## ✅ المتطلبات الأساسية

### 1. **PWA جاهز ✓**
- [x] manifest.json
- [x] Service Worker (sw.js)
- [x] HTTPS (مطلوب للإنتاج)
- [x] أيقونات بجميع المقاسات

### 2. **حساب Google Play Console**
- سجل في: https://play.google.com/console
- دفع رسوم لمرة واحدة: **$25**

### 3. **أدوات التطوير**
- Node.js مثبت (v16+)
- Android Studio (اختياري)
- Java JDK 8+

---

## 🚀 الطريقة 1: استخدام PWABuilder (الأسهل)

### الخطوة 1: رفع الموقع على HTTPS
```bash
# رفع الموقع على Vercel/Netlify/Firebase
# مثال: https://graphitube.vercel.app
```

### الخطوة 2: استخدام PWABuilder
1. افتح: **https://www.pwabuilder.com**
2. أدخل رابط الموقع: `https://your-domain.com`
3. اضغط **"Start"**
4. انتظر تحليل PWA
5. اضغط على **"Package For Stores"**
6. اختر **"Android"**
7. اضغط **"Generate Package"**

### الخطوة 3: إعدادات Android
في صفحة Android Package:

```json
{
  "packageId": "com.graphitube.app",
  "name": "Graphitube",
  "launcherName": "Graphitube",
  "themeColor": "#84cc16",
  "backgroundColor": "#ffffff",
  "startUrl": "/",
  "iconUrl": "https://your-domain.com/icon-512.png",
  "maskableIconUrl": "https://your-domain.com/icon-maskable-512.png"
}
```

### الخطوة 4: توليد Signing Key
```bash
# استخدم PWABuilder لتوليد Signing Key تلقائياً
# أو عملها يدوياً:
keytool -genkey -v -keystore graphitube.keystore \
  -alias graphitube \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**⚠️ مهم جداً:** احفظ الـ keystore و password في مكان آمن!

### الخطوة 5: تحميل APK/AAB
- PWABuilder سيولّد ملف `.aab` (Android App Bundle)
- حمّل الملف على جهازك

---

## 🔧 الطريقة 2: استخدام Bubblewrap CLI (متقدم)

### التثبيت
```bash
npm install -g @bubblewrap/cli
```

### إنشاء المشروع
```bash
bubblewrap init --manifest=https://your-domain.com/manifest.json
```

### الإعدادات
```bash
? Domain being opened in the TWA: your-domain.com
? Name of the application: Graphitube
? Package name: com.graphitube.app
? Path to the icon: ./icon-512.png
? Background color: #ffffff
? Theme color: #84cc16
? Start URL: /
? Display mode: standalone
? Orientation: portrait
? Enable Site Settings Shortcut? No
? Include app shortcuts? Yes
```

### بناء APK
```bash
cd graphitube-app
bubblewrap build
```

### التوقيع
```bash
# إنشاء keystore
keytool -genkey -v -keystore graphitube.keystore \
  -alias graphitube -keyalg RSA -keysize 2048 -validity 10000

# توقيع APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore graphitube.keystore app-release-unsigned.apk graphitube

# التحسين
zipalign -v 4 app-release-unsigned.apk graphitube-release.apk
```

---

## 📤 رفع التطبيق على Google Play

### الخطوة 1: إنشاء تطبيق جديد
1. افتح **Google Play Console**
2. اضغط **"Create app"**
3. املأ المعلومات:
   - **App name**: Graphitube
   - **Default language**: العربية (ar)
   - **App or game**: Application
   - **Free or paid**: Free

### الخطوة 2: إعداد التطبيق

#### أ) App Content
- **Privacy Policy** (مطلوب):
  ```
  https://your-domain.com/privacy
  ```
- **Target audience**: الفئة المستهدفة
- **Content rating**: تصنيف المحتوى

#### ب) Store Listing
- **App name**: Graphitube - مطابخ وصالونات مغربية
- **Short description** (80 حرف):
  ```
  طلب عروض أسعار احترافية للمطابخ والصالونات المخصصة مع مصمم 3D
  ```
- **Full description** (4000 حرف):
  ```
  🏡 Graphitube - التطبيق الأول في المغرب لتصميم المطابخ والصالونات
  
  ✨ الميزات:
  • مصمم 3D تفاعلي احترافي
  • طلب عروض أسعار فورية
  • اختيار أنواع الخشب والألوان
  • حساب دقيق للأبعاد
  • متابعة الطلب عبر WhatsApp
  
  📐 مصمم 3D متقدم:
  • تصميم المطبخ بالأبعاد الحقيقية
  • 8+ عناصر جاهزة (خزائن، ثلاجة، فرن...)
  • تخصيص الألوان والمواد
  • معاينة فورية 3D
  
  🎨 تخصيص شامل:
  • اختيار نوع الخشب (MDF، Contreplaqué...)
  • نظام الأبواب (Push-Pull، عادي...)
  • الإضاءة والرخام والبلاط
  • الكهرباء والسباكة
  
  📱 سهل الاستخدام:
  • واجهة عربية 100%
  • دعم الدارجة المغربية
  • استشارة مجانية
  • رد سريع عبر WhatsApp
  
  🏆 لماذا Graphitube؟
  ✓ خبرة 15+ سنة
  ✓ جودة عالية مضمونة
  ✓ أسعار تنافسية
  ✓ خدمة ما بعد البيع
  
  📞 اتصل بنا:
  واتساب: 0612345678
  البريد: info@graphitube.ma
  ```

#### ج) Graphics
- **App icon** (512x512 PNG)
- **Feature graphic** (1024x500 PNG)
- **Phone screenshots** (2-8 صور):
  - 16:9 أو 9:16
  - 320px - 3840px
  - PNG أو JPEG
- **7-inch tablet screenshots** (اختياري)
- **10-inch tablet screenshots** (اختياري)

### الخطوة 3: رفع AAB
1. اذهب إلى **"Production" → "Create new release"**
2. ارفع ملف `.aab`
3. املأ **"Release notes"**:
   ```
   🎉 الإصدار الأول من Graphitube!
   
   ✨ الميزات:
   • مصمم 3D احترافي للمطابخ
   • معالج ذكي للصالونات
   • طلب عروض أسعار فورية
   • دعم WhatsApp
   • واجهة عربية كاملة
   ```

### الخطوة 4: المراجعة
1. اضغط **"Review release"**
2. تأكد من كل المعلومات
3. اضغط **"Start rollout to Production"**

### الخطوة 5: الانتظار
- ⏱️ **وقت المراجعة**: 1-7 أيام
- 📧 ستصلك رسالة بالنتيجة

---

## 🔐 Digital Asset Links (مهم جداً!)

### ما هو؟
ملف يثبت ملكيتك للموقع والتطبيق معاً.

### الخطوة 1: توليد SHA-256 Fingerprint
```bash
keytool -list -v -keystore graphitube.keystore -alias graphitube
```

انسخ `SHA256: XX:XX:XX:...`

### الخطوة 2: إنشاء assetlinks.json
ضع في `/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.graphitube.app",
    "sha256_cert_fingerprints": [
      "XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX"
    ]
  }
}]
```

### الخطوة 3: رفع الملف
```bash
# تأكد أن الملف متاح على:
https://your-domain.com/.well-known/assetlinks.json
```

### الخطوة 4: التحقق
افتح: https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://your-domain.com&relation=delegate_permission/common.handle_all_urls

---

## 📸 تحضير الصور للمتجر

### App Icon (512x512)
```bash
# استخدم icon-512.png الموجود
cp public/icon-512.png google-play/app-icon.png
```

### Feature Graphic (1024x500)
يمكن إنشاؤه باستخدام Canva أو Figma:
- خلفية خضراء متدرجة
- شعار Graphitube
- نص: "مطابخ وصالونات مغربية احترافية"

### Screenshots
التقط 4-8 صور للتطبيق:
1. الشاشة الرئيسية
2. معالج المطبخ
3. مصمم 3D
4. معالج الصالون
5. صفحة النجاح

**أداة مفيدة**: Mockuphone.com

---

## 🛡️ سياسة الخصوصية (مطلوبة!)

أنشئ صفحة `/privacy` على موقعك:

```markdown
# سياسة الخصوصية - Graphitube

## المعلومات التي نجمعها
- الاسم والهاتف (لمعالجة الطلبات)
- أبعاد المشروع (للتصميم)
- الصور (اختياري)

## كيف نستخدم المعلومات
- معالجة طلبات العروض
- التواصل عبر WhatsApp
- تحسين الخدمة

## مشاركة البيانات
لا نشارك بياناتك مع أطراف ثالثة.

## الأمان
نستخدم Supabase لتخزين البيانات بشكل آمن.

## حقوقك
يمكنك طلب حذف بياناتك في أي وقت.

## الاتصال
info@graphitube.ma
```

---

## ✅ Checklist النشر

### قبل الرفع:
- [ ] الموقع على HTTPS
- [ ] manifest.json جاهز
- [ ] Service Worker يعمل
- [ ] جميع الأيقونات موجودة
- [ ] assetlinks.json مرفوع
- [ ] Privacy Policy منشورة

### في Google Play Console:
- [ ] حساب Google Play مفعّل ($25)
- [ ] App created
- [ ] Store listing كامل
- [ ] Graphics مرفوعة
- [ ] Privacy policy URL
- [ ] Content rating
- [ ] Target audience
- [ ] AAB مرفوع
- [ ] Release notes

---

## 🐛 حل المشاكل الشائعة

### 1. "Asset links verification failed"
**الحل:**
- تحقق من assetlinks.json
- تأكد من SHA-256 صحيح
- الملف يجب أن يكون على HTTPS

### 2. "Missing required icon sizes"
**الحل:**
```bash
# استخدم tool لتوليد جميع المقاسات:
npm install -g pwa-asset-generator
pwa-asset-generator icon.svg ./public/icons
```

### 3. "Service Worker not found"
**الحل:**
- تحقق من مسار sw.js
- تأكد من التسجيل في App.tsx

### 4. "Invalid package name"
**الحل:**
- يجب أن يكون: `com.company.app`
- فقط حروف صغيرة ونقاط
- مثال: `com.graphitube.app`

---

## 🎉 بعد النشر

### مراقبة الأداء:
- **Google Play Console** → Analytics
- تتبع التحميلات
- قراءة التقييمات
- الرد على المراجعات

### التحديثات:
```bash
# زيادة version في twa-manifest.json
"versionCode": 2,
"versionName": "1.0.1"

# Build جديد
bubblewrap build

# رفع على Play Console
```

### التسويق:
- شارك رابط المتجر:
  ```
  https://play.google.com/store/apps/details?id=com.graphitube.app
  ```
- أضف badge على الموقع
- شارك على السوشيال ميديا

---

## 📚 موارد إضافية

### الوثائق الرسمية:
- **TWA**: https://developer.chrome.com/docs/android/trusted-web-activity
- **Bubblewrap**: https://github.com/GoogleChromeLabs/bubblewrap
- **PWABuilder**: https://docs.pwabuilder.com
- **Play Console**: https://support.google.com/googleplay/android-developer

### أدوات مفيدة:
- **Lighthouse** - تدقيق PWA
- **PWA Asset Generator** - توليد الأيقونات
- **Maskable.app** - تصميم أيقونات maskable
- **Canva** - تصميم graphics

---

## 💡 نصائح احترافية

1. **استخدم AAB بدل APK**
   - AAB أصغر حجماً
   - مطلوب من Google Play

2. **اختبر على أجهزة حقيقية**
   - استخدم Internal Testing في Play Console
   - جرب على Android مختلف

3. **حسّن SEO التطبيق**
   - استخدم كلمات مفتاحية في الوصف
   - صور عالية الجودة
   - فيديو تعريفي (اختياري)

4. **رد على المراجعات**
   - يحسّن الترتيب
   - يبني ثقة المستخدمين

5. **حدّث بانتظام**
   - إصلاح الأخطاء
   - ميزات جديدة
   - يحافظ على نشاط التطبيق

---

## 🎯 الخطوات التالية

1. ✅ **أكمل PWA** - manifest + SW + icons
2. 🌐 **رفع على HTTPS** - Vercel/Netlify
3. 📦 **ولّد APK/AAB** - PWABuilder أو Bubblewrap
4. 📤 **رفع على Play Store**
5. ⏱️ **انتظر الموافقة** (1-7 أيام)
6. 🎉 **التطبيق منشور!**

---

**بالتوفيق! 🚀**

إذا عندك أي أسئلة، راسلني على: dev@graphitube.ma
