# 📚 دليل الوثائق - Graphitube Project

## 🎯 نظرة عامة
هذا المشروع يحتوي على نظام متكامل لطلب عروض أسعار النجارة الخشبية (مطابخ وصالونات) مع:
- ✅ مصمم مطابخ ثلاثي الأبعاد احترافي مشابه لـ IKEA
- ✅ نظام wizard كامل بـ 18 خطوة للمطابخ و 8 خطوات للصالونات
- ✅ دعم كامل للعمل offline (PWA)
- ✅ ربط مع Supabase + Resend + WhatsApp API
- ✅ دعم كامل للغة العربية مع RTL
- ✅ جاهز للنشر على GitHub Pages والتحويل إلى APK Android

---

## 📂 الملفات والوثائق

### 🔧 للمطورين

| الملف | الوصف | الاستخدام |
|------|--------|-----------|
| **QUICK_FIX.md** | حلول سريعة (30 ثانية) | عند ظهور خطأ Three.js |
| **TROUBLESHOOTING.md** | حلول مفصلة لجميع المشاكل | للمشاكل المستمرة |
| **DEPLOYMENT_GUIDE.md** | دليل النشر الكامل | للنشر على GitHub + Play Store |
| **clear-cache.sh** | سكريبت تنظيف Cache | قبل كل build مهم |

### 📝 ملفات GitHub

| الملف | الموقع | الوصف |
|------|--------|-------|
| **deploy.yml** | `.github/workflows/` | GitHub Actions للنشر التلقائي |
| **assetlinks.json** | `public/.well-known/` | للربط مع Android TWA |
| **.gitignore** | `/` | ملفات Git المستثناة |

### 🎨 ملفات PWA

| الملف | الموقع | الوصف |
|------|--------|-------|
| **manifest.json** | `public/` | PWA Manifest |
| **sw.js** | `public/` | Service Worker |
| **icon-192.png** | `public/` | App Icon 192x192 |
| **icon-512.png** | `public/` | App Icon 512x512 |

---

## 🚀 البداية السريعة

### 1️⃣ التثبيت الأول
```bash
# Clone المشروع
git clone https://github.com/[username]/Graphitube.git
cd Graphitube

# تثبيت Dependencies
npm install

# تشغيل محلي
npm run dev
```

### 2️⃣ إذا واجهت مشكلة Three.js
```bash
npm run clean
npm run dev
```
📖 **راجع:** QUICK_FIX.md

### 3️⃣ البناء للإنتاج
```bash
npm run build
npm run preview
```

### 4️⃣ النشر على GitHub Pages
```bash
git add .
git commit -m "Deploy to GitHub Pages"
npm run deploy
```
📖 **راجع:** DEPLOYMENT_GUIDE.md

---

## 🛠️ السكريبتات المتوفرة

```json
{
  "dev": "vite",                    // تشغيل محلي
  "build": "vite build",            // بناء production
  "preview": "vite preview",        // معاينة البناء
  "deploy": "gh-pages -d dist",     // نشر على GitHub Pages
  "clean": "...",                   // حذف cache فقط
  "clean:all": "...",               // حذف كل شيء
  "fresh": "..."                    // تنظيف + تثبيت + تشغيل
}
```

### استخدام السكريبتات

| الحالة | السكريبت |
|--------|----------|
| تطوير عادي | `npm run dev` |
| مشكلة Three.js | `npm run clean` → `npm run dev` |
| تنظيف شامل | `npm run fresh` |
| نشر | `npm run deploy` |

---

## 🏗️ بنية المشروع

```
Graphitube/
├── public/                          # Static files
│   ├── icon-192.png                 # PWA icon
│   ├── icon-512.png                 # PWA icon
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service Worker
│   └── .well-known/
│       └── assetlinks.json          # Android TWA
│
├── src/
│   ├── app/
│   │   ├── App.tsx                  # Main component
│   │   ├── components/
│   │   │   ├── 3d-planner/          # Kitchen 3D Planner
│   │   │   ├── kitchen-wizard/      # Kitchen Wizard (18 steps)
│   │   │   ├── salon/               # Salon Wizard (8 steps)
│   │   │   └── ...
│   │   ├── contexts/                # React Contexts
│   │   ├── hooks/                   # Custom Hooks
│   │   ├── utils/                   # Utilities
│   │   └── styles/                  # Global styles
│   │
│   ├── main.tsx                     # Entry point
│   └── ...
│
├── .github/
│   └── workflows/
│       └── deploy.yml               # Auto deployment
│
├── vite.config.ts                   # Vite configuration
├── package.json                     # Dependencies
├── tailwind.config.ts               # Tailwind CSS
├── tsconfig.json                    # TypeScript
│
├── QUICK_FIX.md                     # ⚡ حلول سريعة
├── TROUBLESHOOTING.md               # 🔧 حلول مفصلة
├── DEPLOYMENT_GUIDE.md              # 🚀 دليل النشر
├── clear-cache.sh                   # 🧹 سكريبت تنظيف
└── README-DOCS.md                   # 📚 هذا الملف
```

---

## 🎯 خارطة الطريق - الخطوات القادمة

### ✅ مكتمل
- [x] نظام Kitchen Wizard كامل (18 خطوة)
- [x] نظام Salon Wizard كامل (8 خطوات)
- [x] مصمم مطابخ 3D احترافي
- [x] دعم offline كامل (PWA)
- [x] ربط Supabase + Resend + WhatsApp
- [x] دعم كامل للعربية + Darija + Français
- [x] إعداد GitHub Pages
- [x] Service Worker يعمل بنجاح

### 🔄 قيد التنفيذ
- [ ] رفع على GitHub وتفعيل GitHub Pages
- [ ] اختبار PWA على هواتف حقيقية
- [ ] بناء APK باستخدام TWA

### 📋 المخطط
- [ ] نشر APK على Google Play Store
- [ ] إضافة Google Analytics
- [ ] تحسين SEO
- [ ] إضافة المزيد من الكائنات 3D

---

## 📞 الدعم والمساعدة

### 🐛 عند ظهور مشكلة
1. **ابدأ بـ:** QUICK_FIX.md ← حلول سريعة (30 ثانية)
2. **لم يعمل؟** TROUBLESHOOTING.md ← حلول مفصلة
3. **مازالت المشكلة؟** تواصل معنا

### 📱 التواصل
- **WhatsApp:** 0609394003
- **Email:** support@graphitube.com
- **GitHub Issues:** [Create an issue](https://github.com/[username]/Graphitube/issues)

---

## 🔥 المشاكل الشائعة والحلول السريعة

### 1. Three.js Import Error
```bash
npm run clean && npm run dev
```
📖 QUICK_FIX.md → الحل 1

### 2. Service Worker لا يعمل
```bash
# امسح cache المتصفح
# DevTools → Application → Storage → Clear site data
```
📖 TROUBLESHOOTING.md → Service Worker Issues

### 3. PWA لا تظهر زر "تثبيت"
- تأكد من HTTPS (GitHub Pages يوفره تلقائياً)
- تأكد من وجود `manifest.json` و `icon-*.png`
- تأكد من تشغيل Service Worker

📖 DEPLOYMENT_GUIDE.md → PWA Setup

### 4. APK لا يعمل
- تأكد من `assetlinks.json` موجود في `public/.well-known/`
- تأكد من تطابق package name
- تأكد من توقيع APK

📖 DEPLOYMENT_GUIDE.md → Android APK

---

## ⚙️ ملفات التكوين الهامة

### vite.config.ts
```typescript
{
  base: '/Graphitube/',           // ⚠️ MUST match repo name
  optimizeDeps: {
    include: ['three', 'three/addons/controls/OrbitControls.js']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': // Split Three.js into separate chunk
        }
      }
    }
  }
}
```

### package.json - Dependencies الهامة
```json
{
  "three": "^0.182.0",           // 3D Engine
  "vite-plugin-pwa": "^0.21.2",  // PWA Support
  "workbox-window": "^7.4.0",    // Offline Support
  "react-router-dom": "^7.13.0"  // Routing
}
```

---

## 🎓 موارد تعليمية

### للمبتدئين
- [React Basics](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### للمتقدمين
- [Three.js Journey](https://threejs-journey.com/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Vite Guide](https://vitejs.dev/guide/)

### خاص بالمشروع
- `DEPLOYMENT_GUIDE.md` - النشر الكامل
- `TROUBLESHOOTING.md` - حل المشاكل
- تعليقات الكود في `/src/app/components/`

---

## 🏆 أفضل الممارسات

### قبل كل Commit
```bash
npm run clean     # تنظيف cache
npm run build     # بناء production
npm run preview   # اختبار البناء
```

### قبل كل Deploy
```bash
npm run fresh     # تنظيف شامل + اختبار
git add .
git commit -m "descriptive message"
npm run deploy
```

### الاختبار المحلي
```bash
# 1. Development mode
npm run dev

# 2. Production preview
npm run build && npm run preview

# 3. PWA testing
# Open DevTools → Application → Service Workers
# Check "Update on reload"
```

---

## 🔐 الأمان

### Environment Variables
- جميع المفاتيح السرية في `.env` (مستثناة من Git)
- استخدم `import.meta.env.VITE_*` للوصول
- لا ترفع أبداً المفاتيح السرية على Git

### API Keys المطلوبة
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RESEND_API_KEY`
- `VITE_WHATSAPP_TOKEN`

📖 راجع `.env.example` للقيم المطلوبة

---

## ✨ المساهمة

إذا أردت المساهمة في المشروع:
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 الترخيص

هذا المشروع خاص بـ **Graphitube** © 2026  
جميع الحقوق محفوظة.

---

## 🙏 شكر وتقدير

- **Three.js** - 3D Engine
- **React** - UI Library
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **Supabase** - Backend
- **Resend** - Email Service
- **WhatsApp Business API** - Notifications

---

**آخر تحديث:** 2026-02-20  
**الإصدار:** 1.0.0  
**المطور:** Graphitube Team  
**الدعم:** 0609394003 (WhatsApp)
