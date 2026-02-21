# 📋 Commands جاهزة للـ Copy-Paste

<div dir="rtl">

## 🎯 هاد الملف فيه جميع الـ Commands اللي غادي تحتاجها

**نصيحة**: بدّل `YOUR_USERNAME` بـ username ديالك على GitHub!

---

## 1️⃣ إعداد Git Repository أول مرة

```bash
# دخل لمجلد المشروع
cd graphitube-pwa

# إنشاء Git repository
git init

# إضافة جميع الملفات
git add .

# أول commit
git commit -m "Initial commit - Graphitube PWA with offline support"

# تسمية البranch الرئيسي
git branch -M main

# ربط بـ GitHub (بدّل YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/Graphitube.git

# رفع الكود لـ GitHub
git push -u origin main
```

---

## 2️⃣ تحديث المشروع (بعد كل تعديل)

```bash
# إضافة الملفات المعدلة
git add .

# Commit مع رسالة واضحة
git commit -m "وصف التعديل: مثلاً إضافة ميزة جديدة"

# رفع لـ GitHub
git push origin main
```

---

## 3️⃣ Commands للتطوير المحلي

```bash
# تثبيت الحزم (أول مرة فقط)
npm install --legacy-peer-deps

# تشغيل وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

---

## 4️⃣ اختبار PWA محلياً

```bash
# بناء المشروع
npm run build

# تشغيل المعاينة (يشتغل Service Worker)
npm run preview

# افتح المتصفح على:
# http://localhost:4173/Graphitube/
```

---

## 5️⃣ نشر يدوي على GitHub Pages (بدلاً من GitHub Actions)

```bash
# بناء + نشر
npm run deploy
```

---

## 6️⃣ التحقق من حالة Git

```bash
# شوف الملفات المعدلة
git status

# شوف سجل الـ commits
git log --oneline

# شوف البbranches
git branch -a

# شوف الـ remotes
git remote -v
```

---

## 7️⃣ إصلاح المشاكل الشائعة

### مشكلة: نسيتي تعمل commit

```bash
# إلغاء التعديلات الأخيرة
git reset --hard HEAD

# أو: إلغاء ملف معين
git checkout -- filename.tsx
```

### مشكلة: بغيتي تعدل آخر commit

```bash
# تعديل رسالة آخر commit
git commit --amend -m "رسالة جديدة"

# إضافة ملفات لآخر commit
git add forgot-file.tsx
git commit --amend --no-edit
```

### مشكلة: conflict بين local و GitHub

```bash
# جلب التحديثات + دمج
git pull origin main --rebase

# حل الـ conflicts يدوياً، ثم:
git add .
git rebase --continue

# رفع التعديلات
git push origin main
```

### مشكلة: بغيتي تحذف branch

```bash
# حذف branch محلي
git branch -d branch-name

# حذف branch على GitHub
git push origin --delete branch-name
```

---

## 8️⃣ إنشاء Branch جديد (للتطوير)

```bash
# إنشاء branch جديد
git checkout -b feature/new-feature

# رفع الـ branch لـ GitHub
git push -u origin feature/new-feature

# الرجوع لـ main
git checkout main

# دمج الـ branch فـ main
git merge feature/new-feature
```

---

## 9️⃣ Commands خاصة بـ Vite

```bash
# بناء للإنتاج مع sourcemaps
npm run build -- --mode production

# بناء مع تحليل الحجم
npm run build -- --mode production --report

# مسح الـ cache
rm -rf node_modules/.vite
rm -rf dist
```

---

## 🔟 Commands خاصة بـ Service Worker

```bash
# مسح Service Worker من المتصفح (Chrome DevTools)
# 1. افتح DevTools (F12)
# 2. Application → Service Workers
# 3. Unregister

# أو استخدم Console:
navigator.serviceWorker.getRegistrations().then(r => r.forEach(r => r.unregister()))
```

---

## 🔐 إضافة Secrets على GitHub

**الخطوات (على الموقع، مش بالـ commands)**:

1. سير لـ Repository ديالك
2. **Settings** → **Secrets and variables** → **Actions**
3. دوز على **New repository secret**
4. زيد الأسرار التالية:

```
RESEND_API_KEY
WHATSAPP_ACCESS_TOKEN
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_RECIPIENT_PHONE
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## 📱 بعد النشر: اختبار الموقع

### اختبار PWA:

```bash
# في Chrome DevTools:
# 1. Application → Manifest
# 2. Application → Service Workers
# 3. Lighthouse → PWA Audit
```

### URLs للاختبار:

```
# الموقع الحي
https://YOUR_USERNAME.github.io/Graphitube/

# ملف Manifest
https://YOUR_USERNAME.github.io/Graphitube/manifest.webmanifest

# Service Worker
https://YOUR_USERNAME.github.io/Graphitube/sw.js

# Asset Links (للـ Android)
https://YOUR_USERNAME.github.io/Graphitube/.well-known/assetlinks.json
```

---

## ⚡ Commands سريعة مفيدة

```bash
# شوف حجم الملفات المبنية
du -sh dist/*

# شوف عدد أسطر الكود
find src -name '*.tsx' -o -name '*.ts' | xargs wc -l

# بحث فـ الكود
grep -r "searchTerm" src/

# تنظيف المشروع بالكامل
rm -rf node_modules dist .vite
npm install --legacy-peer-deps
```

---

## 🎯 Workflow كامل: من الصفر للنشر

```bash
# 1. Clone المشروع (إذا من جهاز جديد)
git clone https://github.com/YOUR_USERNAME/Graphitube.git
cd Graphitube

# 2. تثبيت
npm install --legacy-peer-deps

# 3. تطوير
npm run dev
# دير التعديلات...

# 4. اختبار محلي
npm run build
npm run preview

# 5. Commit & Push
git add .
git commit -m "Added new feature"
git push origin main

# 6. انتظر GitHub Actions
# سير لـ: https://github.com/YOUR_USERNAME/Graphitube/actions

# 7. اختبار الموقع الحي
# افتح: https://YOUR_USERNAME.github.io/Graphitube/
```

---

## 📝 قالب Commit Messages

```bash
# ميزة جديدة
git commit -m "✨ feat: إضافة مصمم ثلاثي الأبعاد للمطبخ"

# إصلاح bug
git commit -m "🐛 fix: إصلاح مشكلة التصميم على الهواتف"

# تحسين
git commit -m "⚡ perf: تحسين سرعة تحميل الصور"

# توثيق
git commit -m "📝 docs: تحديث دليل الاستخدام"

# تصميم
git commit -m "💄 style: تحسين واجهة معالج المطبخ"

# refactor
git commit -m "♻️ refactor: إعادة هيكلة مكونات Kitchen Wizard"

# اختبار
git commit -m "✅ test: إضافة اختبارات للـ offline mode"

# بناء/CI
git commit -m "👷 build: تحديث إعدادات PWA"
```

---

## 🔧 استكشاف الأخطاء

### خطأ: "fatal: not a git repository"

```bash
# الحل: إنشاء repository
git init
```

### خطأ: "Permission denied"

```bash
# الحل: استخدم HTTPS أو SSH keys
git remote set-url origin https://github.com/YOUR_USERNAME/Graphitube.git
```

### خطأ: "npm ERR! peer dependencies"

```bash
# الحل: استخدم legacy-peer-deps
npm install --legacy-peer-deps
```

### خطأ: "ENOENT: no such file"

```bash
# الحل: تأكد من المسار
pwd
ls -la
```

---

<div align="center">

## ✅ كلشي جاهز!

**Copy & Paste هاد الـ Commands ومشي غادي!**

بالتوفيق! 🚀

</div>

</div>
