# 📥 تحميل الكود من Figma Make

## 🎯 كيفاش تحمل المشروع؟

### الطريقة 1: من Figma Make Interface

#### في Figma Make:
```
1. شوف في الأعلى/يمين الشاشة
2. ابحث عن زر:
   - "Download" 📥
   - أو "Export"
   - أو "Download Code"
   - أو أيقونة تحميل ⬇️

3. اضغط عليه
4. سيحمل ملف ZIP
   الاسم عادة: project.zip أو graphitube.zip
```

### الطريقة 2: Export من Menu

```
1. Menu (⋮) أو (☰)
2. File → Export
3. Download as ZIP
```

---

## 📦 بعد التحميل

### 1️⃣ افتح مجلد Downloads:

```
Windows:
C:\Users\YourName\Downloads\

Mac:
/Users/YourName/Downloads/

Linux:
/home/yourname/Downloads/
```

### 2️⃣ شوف الملف:

```
📄 project.zip
أو
📄 graphitube.zip
أو
📄 my-make-file.zip
```

### 3️⃣ فك الضغط (Extract):

#### على Windows:
```
1. Right-click على الملف ZIP
2. "Extract All..."
3. اختر مكان (مثلاً Desktop)
4. Extract
```

#### على Mac:
```
1. Double-click على الملف ZIP
2. سيفك الضغط تلقائياً
```

#### على Linux:
```bash
unzip project.zip
# أو
unzip graphitube.zip
```

### 4️⃣ شوف المجلد:

```
بعد فك الضغط، غادي تلقى مجلد:

📁 project/
أو
📁 graphitube/
أو
📁 my-make-file/
```

---

## 🚀 بعد فك الضغط

### 1️⃣ افتح Terminal/CMD في المجلد:

#### على Windows:
```
1. افتح File Explorer
2. اذهب للمجلد المستخرج
3. في شريط العنوان، اكتب: cmd
4. اضغط Enter
```

#### على Mac:
```
1. افتح Terminal
2. اكتب: cd 
3. اسحب المجلد إلى Terminal
4. اضغط Enter
```

#### على Linux:
```bash
cd /path/to/extracted/folder
```

### 2️⃣ تثبيت Dependencies:

```bash
npm install
```

**انتظر...** (2-5 دقائق)

سترى:
```
added 1234 packages in 3m
```

### 3️⃣ اختبار محلي (اختياري):

```bash
npm run dev
```

سيفتح الموقع على:
```
http://localhost:5173
```

شوف كل شيء يخدم؟ زوين! اضغط `Ctrl+C` لإيقاف الخادم.

### 4️⃣ Build:

```bash
npm run build
```

سترى:
```
✓ built in 45s
```

ومجلد `dist/` سيظهر! ✅

---

## 📁 بنية المشروع المحمل

بعد فك الضغط، المجلد يحتوي على:

```
📁 graphitube/
  📁 public/               ← الأصول العامة
    📄 manifest.json
    📄 sw.js
    📄 icon.svg
    📄 privacy.html
    📁 .well-known/
    📄 _headers
    📄 _redirects
  📁 src/                  ← الكود المصدري
    📁 app/
      📄 App.tsx          ← المكون الرئيسي
      📁 components/
      📁 types/
    📁 styles/
    📄 main.tsx
  📁 supabase/            ← Backend
    📁 functions/
  📄 package.json         ← Dependencies
  📄 vite.config.ts       ← إعدادات Vite
  📄 netlify.toml         ← إعدادات Netlify
  📄 tsconfig.json
  📄 README.md
  📄 ملفات الأدلة (.md)
```

---

## ✅ Checklist بعد التحميل

- [ ] حملت ملف ZIP من Figma Make
- [ ] فككت الضغط
- [ ] فتحت Terminal في المجلد
- [ ] `npm install` نجح
- [ ] `npm run build` نجح
- [ ] مجلد `dist/` ظهر

### للتحقق:
```bash
# هل أنت في المجلد الصحيح؟
ls package.json
# يجب أن يظهر: package.json

# هل Dependencies مثبتة؟
ls node_modules
# يجب أن يظهر مجلدات كثيرة

# هل dist/ موجود؟
ls dist
# يجب أن يظهر: index.html, manifest.json, ...
```

---

## 🚀 دابا Deploy على Netlify!

### الآن عندك:
✅ الكود على جهازك  
✅ Dependencies مثبتة  
✅ مجلد `dist/` جاهز

### الخطوة التالية:

#### الطريقة الأسهل - Drag & Drop:
```
1. في Netlify (الصفحة اللي فتحتيها)
2. اسحب مجلد dist/ بالكامل
3. أفلته في المربع الأزرق
4. انتظر Upload
5. ✅ موقعك جاهز!
```

#### أو CLI:
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل دخول
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## 🐛 مشاكل محتملة

### "npm install failed"

**الحل:**
```bash
# تأكد من Node.js مثبت:
node --version
# يجب أن يظهر: v18.x.x أو أعلى

# إذا مش مثبت:
# حمّل من: https://nodejs.org
```

### "npm not found"

**الحل:**
```
1. ثبّت Node.js من:
   https://nodejs.org

2. أعد تشغيل Terminal

3. جرب مرة أخرى:
   npm install
```

### "Permission denied"

**الحل:**
```bash
# على Mac/Linux:
sudo npm install

# على Windows:
# افتح CMD as Administrator
```

### "dist/ مش موجود بعد build"

**الحل:**
```bash
# تحقق من الأخطاء:
npm run build

# شوف الأخطاء الحمراء في Terminal
# صححها وجرب مرة أخرى
```

---

## 💡 نصائح

### 1. احفظ المجلد في مكان آمن:
```
✅ Desktop/Projects/graphitube/
✅ Documents/graphitube/
❌ Downloads/ (قد يُحذف)
```

### 2. استخدم Git (اختياري):
```bash
# في مجلد المشروع:
git init
git add .
git commit -m "Initial commit from Figma Make"

# ثم push لـ GitHub
# وربط Netlify بـ GitHub للـ auto-deploy
```

### 3. احفظ نسخة احتياطية:
```
انسخ المجلد لمكان آخر
أو ارفعه على GitHub/Google Drive
```

---

## 📋 الخطوات الكاملة (ملخص)

```bash
# 1. حمّل ZIP من Figma Make
# 2. فك الضغط
# 3. افتح Terminal في المجلد
cd /path/to/project

# 4. ثبّت Dependencies
npm install

# 5. Build
npm run build

# 6. تحقق من dist/
ls dist/

# 7. Deploy على Netlify
# - Drag & Drop dist/ في Netlify
# أو
netlify deploy --prod --dir=dist

# ✅ خلاص!
```

---

## 🎯 الخطوة التالية

بعد ما تحمل الكود و تعمل Build:

```
→ اقرأ: DEPLOY_NOW.md
→ Deploy على Netlify
→ احصل على HTTPS URL
→ ثم PWABuilder لإنشاء APK
```

---

## 📞 للمساعدة

### إذا واجهتك مشكلة:

```
1. شوف الأخطاء في Terminal
2. اقرأ رسالة الخطأ
3. ابحث في Google عن الرسالة
4. أو راجع الملفات:
   - WHERE_IS_DIST.md
   - DEPLOY_NOW.md
   - NETLIFY_DEPLOYMENT_GUIDE.md
```

---

**بالتوفيق! 💪**

**بعد التحميل، ابدأ بـ `npm install` ثم `npm run build`! 🚀**
