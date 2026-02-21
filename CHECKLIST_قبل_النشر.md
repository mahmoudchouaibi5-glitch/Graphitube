# ✅ Checklist قبل النشر على GitHub - Graphitube PWA

<div dir="rtl">

## 📋 تأكد من هاد الأشياء قبل ما تنشر

---

## 🔧 الإعدادات الأساسية

### 1. التكوينات الصحيحة ✅

- [x] **vite.config.ts**
  - `base: '/Graphitube/'` ← يطابق اسم الـ repository
  - `VitePWA` plugin مفعّل
  - `registerType: 'autoUpdate'`
  - `devOptions.enabled: true`

- [x] **package.json**
  - Scripts موجودة: `dev`, `build`, `preview`, `deploy`
  - `gh-pages` package مثبت
  - Dependencies كاملة

- [x] **src/main.tsx**
  - `registerSW` من `virtual:pwa-register`
  - Auto-update مفعّل

- [x] **src/app/App.tsx**
  - `basename={import.meta.env.BASE_URL}`
  - Router مضبوط

---

## 📁 الملفات الضرورية

### 2. ملفات PWA ✅

- [x] **public/icon-192.png** ← أيقونة PWA
- [x] **public/icon-512.png** ← أيقونة PWA
- [x] **public/icon.svg** ← أيقونة احتياطية
- [x] **manifest.webmanifest** ← يُنشأ تلقائياً من `vite.config.ts`

### 3. ملفات Android TWA ✅

- [x] **public/assetlinks.json**
- [x] **public/.well-known/assetlinks.json** ← نسخة للتوافق
- [x] SHA256 fingerprint صحيح
- [x] Package name: `com.graphitube.app`

### 4. ملفات Git ✅

- [x] **.gitignore** ← يستثني `node_modules`, `dist`, `.env`
- [x] **.github/workflows/deploy.yml** ← GitHub Actions
- [x] **README.md** ← وصف المشروع

---

## 🌍 المتغيرات البيئية

### 5. Secrets على Supabase ✅

التالية مُعدّة مسبقاً:
- [x] `SUPABASE_URL`
- [x] `SUPABASE_ANON_KEY`
- [x] `SUPABASE_SERVICE_ROLE_KEY`
- [x] `SUPABASE_DB_URL`

### 6. Secrets إضافية ✅

- [x] `RESEND_API_KEY` ← إرسال الإيميلات
- [x] `WHATSAPP_ACCESS_TOKEN` ← WhatsApp Business
- [x] `WHATSAPP_PHONE_NUMBER_ID`
- [x] `WHATSAPP_RECIPIENT_PHONE`
- [x] `GRAPHITUBE_OWNER_EMAIL`
- [x] `GRAPHITUBE_SENDER_EMAIL`

---

## 🧪 الاختبارات المحلية

### 7. اختبار Development ✅

```bash
npm run dev
```

- [ ] التطبيق يفتح على `http://localhost:5173/`
- [ ] جميع الصفحات تعمل (Homepage, Kitchen Wizard, Salon, 3D Planner)
- [ ] تبديل اللغة يعمل (عربي، فرنسي، دارجة)
- [ ] RTL يعمل بشكل صحيح

### 8. اختبار Production ✅

```bash
npm run build
npm run preview
```

- [ ] Build ينجح بدون errors
- [ ] التطبيق يفتح على `http://localhost:4173/Graphitube/`
- [ ] Service Worker يُسجل بنجاح
- [ ] PWA Install prompt يظهر
- [ ] Offline mode يعمل (افصل الإنترنت وجرّب)

### 9. اختبار DevTools ✅

**في Chrome DevTools (F12)**:

- [ ] **Application → Manifest**:
  - Name: "Graphitube - Kitchen & Salon Design"
  - Start URL: `/Graphitube/`
  - Icons: 192x192 و 512x512

- [ ] **Application → Service Workers**:
  - Status: Activated
  - Source: `/Graphitube/sw.js`

- [ ] **Network Tab** (مع offline):
  - الصفحات تُحمّل من cache
  - Requests تُحفظ في queue

- [ ] **Lighthouse → PWA Audit**:
  - Score أكثر من 80%
  - "Installable" ← ✅

---

## 📱 الميزات الوظيفية

### 10. Kitchen Wizard ✅

- [ ] جميع الـ 18 خطوة تعمل
- [ ] التنقل بين الخطوات (Next, Previous)
- [ ] حفظ البيانات تلقائياً
- [ ] إرسال الطلب بنجاح
- [ ] إشعارات (Email + WhatsApp)

### 11. Salon Wizard ✅

- [ ] جميع الـ 8 خطوات تعمل
- [ ] اختيار الخشب والألوان
- [ ] ملء البيانات الشخصية
- [ ] إرسال الطلب

### 12. 3D Kitchen Planner ✅

- [ ] المشهد ثلاثي الأبعاد يعمل
- [ ] 8 كائنات في المكتبة
- [ ] سحب وإفلات الكائنات
- [ ] تغيير الألوان والأبعاد
- [ ] حفظ التصميم
- [ ] إرسال كطلب عرض سعر

### 13. Offline Mode ✅

- [ ] ملء البيانات بدون اتصال
- [ ] حفظ في IndexedDB
- [ ] OfflineIndicator يظهر عند انقطاع الاتصال
- [ ] إرسال تلقائي عند عودة الاتصال
- [ ] Request queue يعمل

---

## 🔐 الأمان

### 14. حماية البيانات الحساسة ✅

- [x] لا توجد API keys في الكود
- [x] `.env` مُستثنى من Git
- [x] `SUPABASE_SERVICE_ROLE_KEY` في السيرفر فقط
- [x] CORS مضبوط على السيرفر

---

## 📦 الملفات الإضافية

### 15. الدلائل والوثائق ✅

- [x] `/README.md` ← وصف شامل بالعربية
- [x] `/دليل_GitHub_السريع.md` ← دليل بالدارجة
- [x] `/COMMANDS_COPY_PASTE.md` ← Commands جاهزة
- [x] `/شنو_خاصني_نقاد_فـGitHub.md` ← إجابة مباشرة
- [x] `/GITHUB_PAGES_DEPLOYMENT.md` ← دليل تقني
- [x] `/GOOGLE_PLAY_DEPLOYMENT_GUIDE.md` ← للنشر على Google Play

---

## 🚀 الاستعداد للنشر

### 16. قبل الـ Push ✅

```bash
# تأكد من أن Build يعمل
npm run build

# تأكد من أن التطبيق يعمل
npm run preview

# تأكد من عدم وجود errors
npm run build 2>&1 | grep -i error
```

### 17. Commands النشر ✅

```bash
# Initialize Git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - Graphitube PWA with full offline support"

# Branch
git branch -M main

# Add remote (بدّل YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/Graphitube.git

# Push
git push -u origin main
```

### 18. تفعيل GitHub Pages ✅

على GitHub.com:
1. Settings → Pages
2. Source: **GitHub Actions** (مش Branch!)
3. Save

---

## ✅ بعد النشر

### 19. التحقق من Deployment ✅

- [ ] GitHub Actions تكتمل بنجاح (أخضر ✅)
- [ ] لا توجد errors في الـ logs
- [ ] الموقع يفتح: `https://YOUR_USERNAME.github.io/Graphitube/`
- [ ] جميع الصفحات تعمل
- [ ] الصور تُحمّل
- [ ] Service Worker يُسجل

### 20. اختبار PWA على الهاتف ✅

**على Android**:
1. افتح الموقع في Chrome
2. Menu → "إضافة إلى الشاشة الرئيسية"
3. افتح التطبيق من الشاشة الرئيسية
4. جرّب الميزات
5. افصل الإنترنت وتأكد من أنه يعمل

**على iOS**:
1. افتح الموقع في Safari
2. Share → "Add to Home Screen"
3. نفس الاختبارات

---

## 🎯 الخطوة التالية: Google Play Store

### 21. إنشاء AAB ✅

راجع:
- `/GOOGLE_PLAY_DEPLOYMENT_GUIDE.md`
- `/ANDROID_STUDIO_COMPLETE_GUIDE.md`

الخطوات الرئيسية:
1. استخدم **PWABuilder** أو **Bubblewrap**
2. حدّث `assetlinks.json` بـ SHA256 الصحيح
3. بناء AAB
4. اختبار على جهاز حقيقي
5. رفع على Google Play Console

---

## 📊 المراقبة والصيانة

### 22. بعد النشر على Google Play ✅

- [ ] إضافة Beta Testers
- [ ] جمع Feedback
- [ ] مراقبة Crash reports
- [ ] تحديث التطبيق بانتظام
- [ ] الرد على تعليقات المستخدمين

---

<div align="center">

## 🎉 Checklist كاملة!

**إذا كل شيء ✅، أنت جاهز للنشر!**

---

### 💡 نصيحة أخيرة:

**اختبر كل شيء محلياً قبل النشر**

**واحد خطأ بسيط ممكن يخرب التجربة للمستخدمين**

---

### 🚀 يلا انطلق!

</div>

</div>
