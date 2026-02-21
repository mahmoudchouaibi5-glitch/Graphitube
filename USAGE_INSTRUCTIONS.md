# تعليمات الاستخدام - Graphitube Kitchen Quotation System

## للعملاء (المستخدمين)

### كيفية استخدام النظام:

#### 1. الدخول إلى الموقع
- افتح الموقع في المتصفح
- ستظهر لك الصفحة الرئيسية مع خيارين: مطبخ أو صالون

#### 2. اختيار "مطبخ"
- اضغط على بطاقة "مطبخ"
- سيبدأ النظام بعرض الخطوات

#### 3. ملء النموذج خطوة بخطوة

**نصائح مهمة:**
- ✅ املأ جميع الحقول المطلوبة (مميزة بعلامة * حمراء)
- 📏 القياسات التقريبية كافية - لا تقلق بشأن الدقة الكاملة
- 💬 إذا لم تفهم أي جزء، اضغط على رابط واتساب في أسفل كل خطوة
- 💾 بياناتك تُحفظ تلقائياً - يمكنك العودة لاحقاً

#### 4. التنقل بين الخطوات
- **زر "التالي"** → الانتقال للخطوة التالية
- **زر "السابق"** → العودة للخطوة السابقة
- **زر "إرسال الطلب"** → في الخطوة الأخيرة

#### 5. صفحة التأكيد النهائية
- راجع جميع معلوماتك بعناية
- تأكد من صحة البيانات
- إذا كل شيء صحيح، اضغط "إرسال الطلب"

#### 6. بعد الإرسال
- ستظهر صفحة الشكر
- سيتواصل معك فريق Graphitube خلال 24-48 ساعة
- تحقق من هاتفك وواتساب

---

## للمطورين

### متطلبات التشغيل:

```bash
# تثبيت المكتبات
npm install

# تشغيل الموقع محلياً
npm run dev

# بناء الموقع للنشر
npm run build
```

### البنية التقنية:

#### المكونات الرئيسية:

1. **App.tsx** - المكون الرئيسي الذي يتحكم في التنقل
2. **HomePage.tsx** - الصفحة الرئيسية
3. **CompleteKitchenWizard.tsx** - المعالج الرئيسي للمطبخ
4. **19 خطوة** في مجلد `steps/`

#### Types (الأنواع):

- **kitchen.ts** - جميع الأنواع الخاصة بالمطبخ
- **index.ts** - الأنواع العامة

#### التعديلات الشائعة:

##### 1. إضافة خطوة جديدة:

```typescript
// 1. إنشاء مكون الخطوة
export function Step20NewStep({ data, onChange }) {
  return (
    <div className="space-y-6">
      <h2>عنوان الخطوة</h2>
      {/* محتوى الخطوة */}
      <WhatsAppHelp stepName="اسم الخطوة" />
    </div>
  );
}

// 2. إضافة الخطوة في CompleteKitchenWizard.tsx
const BASE_STEP_TITLES = [
  // ... الخطوات الموجودة
  'اسم الخطوة الجديدة',
];

// 3. إضافة الخطوة في render
{actualStep === 20 && (
  <Step20NewStep
    data={formData.newStepData}
    onChange={(data) => updateFormData({ newStepData: data })}
  />
)}
```

##### 2. تعديل رقم واتساب:

في ملفات:
- `WhatsAppButton.tsx`
- `WhatsAppHelp.tsx`
- `HomePage.tsx`

غيّر:
```typescript
const WHATSAPP_NUMBER = '0609394003';
```

##### 3. تغيير الألوان:

في `tailwind.css` و `theme.css`:
- الألوان الأساسية: `amber-*`, `orange-*`
- للتغيير، استخدم ألوان Tailwind الأخرى

##### 4. إضافة خيار جديد:

مثال: إضافة نوع خشب جديد في Step8:

```typescript
const WOOD_OPTIONS = [
  // ... الخيارات الموجودة
  { 
    value: 'new-wood-type', 
    label: 'نوع خشب جديد', 
    description: 'وصف النوع الجديد' 
  },
];
```

### الربط مع Backend:

#### 1. إنشاء API Endpoint:

```typescript
// في App.tsx - handleKitchenSubmit
const handleKitchenSubmit = async (data: CompleteKitchenFormData) => {
  try {
    const response = await fetch('/api/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      setIsSubmitted(true);
      // إرسال إشعار بالبريد الإلكتروني
      await sendEmailNotification(data);
    }
  } catch (error) {
    console.error('Failed to submit:', error);
    alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
  }
};
```

#### 2. تنسيق البيانات للإرسال:

```typescript
// helper function
function formatDataForBackend(data: CompleteKitchenFormData) {
  return {
    customer: {
      name: data.customerInfo.fullName,
      phone: data.customerInfo.phone,
      address: data.customerInfo.address,
      city: data.customerInfo.city,
    },
    kitchen: {
      design_type: data.kitchenDesign.type,
      dimensions: data.dimensions,
      // ... باقي البيانات
    },
    submitted_at: new Date().toISOString(),
    can_show_price: data.canShowPrice,
    price_block_reasons: data.priceBlockReasons,
  };
}
```

#### 3. إرسال إشعارات:

```typescript
// Email notification to admin
async function sendAdminNotification(data: CompleteKitchenFormData) {
  await fetch('/api/notifications/admin', {
    method: 'POST',
    body: JSON.stringify({
      to: 'admin@graphitube.ma',
      subject: `طلب جديد من ${data.customerInfo.fullName}`,
      body: generateEmailBody(data),
    }),
  });
}

// WhatsApp notification
async function sendWhatsAppNotification(data: CompleteKitchenFormData) {
  // استخدام WhatsApp Business API
  // أو Twilio API
}
```

### إضافة Validations:

```typescript
// في كل خطوة
const validateStep = (data: any): boolean => {
  if (!data.requiredField) {
    alert('هذا الحقل مطلوب');
    return false;
  }
  
  if (data.phone && !isValidPhone(data.phone)) {
    alert('رقم الهاتف غير صحيح');
    return false;
  }
  
  return true;
};

// استخدام في handleNext
const handleNext = () => {
  if (!validateStep(formData)) return;
  
  // متابعة...
};
```

### Performance Optimization:

#### 1. Code Splitting:

```typescript
// استخدام lazy loading
import { lazy, Suspense } from 'react';

const Step11MarbleDetails = lazy(() => import('./steps/Step11MarbleDetails'));

// في render
<Suspense fallback={<LoadingSpinner />}>
  <Step11MarbleDetails />
</Suspense>
```

#### 2. Memoization:

```typescript
import { useMemo, useCallback } from 'react';

// في CompleteKitchenWizard
const stepsToShow = useMemo(() => getStepsToShow(), [formData.workScope]);

const updateFormData = useCallback((updates) => {
  setFormData(prev => ({ ...prev, ...updates }));
}, []);
```

### Testing:

#### 1. Unit Tests:

```typescript
import { render, screen } from '@testing-library/react';
import { Step1CustomerInfo } from './Step1CustomerInfo';

test('renders customer info form', () => {
  render(<Step1CustomerInfo data={{}} onChange={() => {}} />);
  expect(screen.getByLabelText(/الاسم الكامل/i)).toBeInTheDocument();
});
```

#### 2. Integration Tests:

```typescript
test('complete kitchen wizard flow', async () => {
  const { user } = render(<CompleteKitchenWizard />);
  
  // Fill step 1
  await user.type(screen.getByLabelText(/الاسم/i), 'أحمد محمد');
  await user.click(screen.getByText(/التالي/i));
  
  // Fill step 2
  await user.click(screen.getByLabelText(/مطبخ مستقيم/i));
  await user.click(screen.getByText(/التالي/i));
  
  // ...
});
```

### Deployment:

#### 1. على Vercel:

```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر الموقع
vercel --prod
```

#### 2. على Netlify:

```bash
# إنشاء ملف netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

#### 3. على خادم خاص:

```bash
# بناء الموقع
npm run build

# نقل مجلد dist إلى الخادم
scp -r dist/* user@server:/var/www/graphitube
```

---

## الدعم الفني

### للمشاكل الشائعة:

**1. البيانات لا تُحفظ:**
- تحقق من أن localStorage مفعّل في المتصفح
- تحقق من أن المتصفح لا يحذف البيانات تلقائياً

**2. الخطوات لا تظهر:**
- تحقق من `getStepsToShow()` في CompleteKitchenWizard
- تحقق من أن `workScope` تم ملؤه بشكل صحيح

**3. واتساب لا يفتح:**
- تحقق من رقم الهاتف (يجب أن يبدأ بـ 212)
- تحقق من أن الرابط صحيح

### للاستفسارات:

- **البريد الإلكتروني:** dev@graphitube.ma
- **واتساب:** 0609394003
- **التوثيق الكامل:** راجع COMPLETE_SYSTEM_GUIDE.md

---

© 2026 Graphitube - دليل الاستخدام الشامل
