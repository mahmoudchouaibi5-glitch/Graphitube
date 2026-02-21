# دليل التوسع - إضافة خطوات جديدة

هذا الدليل يشرح كيفية إضافة خطوات إضافية إلى معالجات المطبخ أو الصالون.

## 📋 خطوات إضافة خطوة جديدة للمطبخ

### 1. إضافة النوع (Type)

أولاً، أضف النوع المطلوب في `/src/app/types/index.ts`:

```typescript
export interface NewStepData {
  field1: string;
  field2: number;
  // ... المزيد من الحقول
}

// ثم أضفه إلى KitchenFormData
export interface KitchenFormData {
  // ... الحقول الموجودة
  newStep: NewStepData;
}
```

### 2. إنشاء مكون الخطوة

أنشئ ملف جديد في `/src/app/components/kitchen/`:

```typescript
// Step4NewStep.tsx
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { NewStepData } from '../../types';
import { WhatsAppHelp } from '../WhatsAppHelp';

interface Step4NewStepProps {
  data: NewStepData;
  onChange: (data: NewStepData) => void;
}

export function Step4NewStep({ data, onChange }: Step4NewStepProps) {
  const handleChange = (field: keyof NewStepData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          عنوان الخطوة الجديدة
        </h2>
        <p className="text-gray-600">
          وصف توضيحي للخطوة
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="field1" className="text-base">
            اسم الحقل
          </Label>
          <Input
            id="field1"
            value={data.field1}
            onChange={(e) => handleChange('field1', e.target.value)}
            placeholder="أدخل القيمة"
            className="mt-2 text-lg"
          />
        </div>

        {/* المزيد من الحقول */}
      </div>

      <WhatsAppHelp />
    </div>
  );
}
```

### 3. تحديث KitchenWizard.tsx

#### أ. استيراد المكون الجديد

```typescript
import { Step4NewStep } from './Step4NewStep';
```

#### ب. تحديث STEP_TITLES

```typescript
const STEP_TITLES = [
  'معلومات العميل',
  'نوع المطبخ',
  'الأبعاد',
  'الخطوة الجديدة', // <-- أضف هنا
  'التأكيد',
];
```

#### ج. تحديث totalSteps

```typescript
const totalSteps = 5; // كان 4، أصبح 5
```

#### د. إضافة القيمة الافتراضية في useState

```typescript
const [formData, setFormData] = useState<Partial<KitchenFormData>>({
  // ... البيانات الموجودة
  newStep: {
    field1: '',
    field2: 0,
  },
});
```

#### هـ. إضافة المكون في الخطوات

```typescript
{currentStep === 4 && (
  <Step4NewStep
    data={formData.newStep!}
    onChange={(data) => setFormData({ ...formData, newStep: data })}
  />
)}

{currentStep === 5 && ( // كانت 4، أصبحت 5
  <StepConfirmation data={formData as KitchenFormData} />
)}
```

#### و. تحديث canProceed()

```typescript
const canProceed = () => {
  switch (currentStep) {
    // ... الحالات الموجودة
    case 4:
      return formData.newStep?.field1; // التحقق من البيانات المطلوبة
    default:
      return true;
  }
};
```

### 4. تحديث StepConfirmation.tsx

أضف عرض البيانات الجديدة:

```typescript
{/* New Step */}
<div className="bg-gray-50 rounded-lg p-6">
  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">4</div>
    الخطوة الجديدة
  </h3>
  <dl className="space-y-2 text-sm">
    <div className="flex justify-between">
      <dt className="text-gray-600">الحقل:</dt>
      <dd className="font-medium text-gray-900">{data.newStep?.field1}</dd>
    </div>
  </dl>
</div>
```

## 📋 مثال: إضافة خطوة "الأجهزة المدمجة"

### 1. النوع

```typescript
export interface Appliances {
  electricOven: boolean;
  microwave: boolean;
  stove: boolean;
  hood: boolean;
  fridge: boolean;
}
```

### 2. المكون

```typescript
// Step4Appliances.tsx
export function Step4Appliances({ data, onChange }: Step4AppliancesProps) {
  const toggleAppliance = (key: keyof Appliances) => {
    onChange({ ...data, [key]: !data[key] });
  };

  const appliances = [
    { key: 'electricOven', label: 'فرن كهربائي' },
    { key: 'microwave', label: 'ميكروويف' },
    { key: 'stove', label: 'بوتاغاز' },
    { key: 'hood', label: 'شفاط' },
    { key: 'fridge', label: 'ثلاجة مدمجة' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          الأجهزة المدمجة
        </h2>
        <p className="text-gray-600">
          اختر الأجهزة التي تريد دمجها في المطبخ
        </p>
      </div>

      <div className="space-y-3">
        {appliances.map((appliance) => (
          <label
            key={appliance.key}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <input
              type="checkbox"
              checked={data[appliance.key as keyof Appliances]}
              onChange={() => toggleAppliance(appliance.key as keyof Appliances)}
              className="w-5 h-5 text-amber-600 rounded"
            />
            <span className="text-base font-medium text-gray-900">
              {appliance.label}
            </span>
          </label>
        ))}
      </div>

      <WhatsAppHelp />
    </div>
  );
}
```

## 🎨 نصائح التصميم

### استخدام المكونات الموجودة

```typescript
// الأزرار
import { Button } from '../ui/button';
<Button className="bg-amber-600 hover:bg-amber-700">نص الزر</Button>

// البطاقات
import { Card } from '../ui/card';
<Card className="p-6">المحتوى</Card>

// الحقول
import { Input } from '../ui/input';
<Input type="text" placeholder="أدخل النص" />

// الـ Textarea
import { Textarea } from '../ui/textarea';
<Textarea placeholder="أدخل النص الطويل" />

// Checkboxes
import { Checkbox } from '../ui/checkbox';
<Checkbox checked={value} onCheckedChange={setValue} />

// Radio Groups
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
```

### الألوان المستخدمة

```css
/* الألوان الرئيسية */
bg-amber-50    /* خلفية فاتحة */
bg-amber-600   /* أساسي */
bg-amber-700   /* hover */

/* للمعلومات */
bg-blue-50     /* خلفية */
text-blue-900  /* نص */
border-blue-200

/* للتحذيرات */
bg-amber-50
text-amber-900
border-amber-200

/* للنجاح */
bg-green-50
text-green-900
border-green-200
```

## 🔧 خطوات خاصة بالصالون

نفس العملية تُطبق على الصالون:

1. أضف النوع في `types/index.ts`
2. أنشئ المكون في `/src/app/components/salon/`
3. حدّث `SalonWizard.tsx`
4. حدّث `SalonStepConfirmation.tsx`

## ✅ قائمة التحقق

عند إضافة خطوة جديدة:

- [ ] تم إضافة النوع في `types/index.ts`
- [ ] تم إنشاء مكون الخطوة
- [ ] تم تحديث `STEP_TITLES`
- [ ] تم تحديث `totalSteps`
- [ ] تم إضافة القيمة الافتراضية في `useState`
- [ ] تم إضافة عرض المكون في الخطوات
- [ ] تم تحديث `canProceed()`
- [ ] تم تحديث `StepConfirmation`
- [ ] تم إضافة `WhatsAppHelp` في المكون
- [ ] تم اختبار التنقل بين الخطوات

## 🚀 مثال كامل: خطوة "نطاق الأشغال"

راجع الكود الموجود في الملفات:
- `/src/app/types/index.ts` -> `WorkScope`
- الكود المعلق في المكونات لمعرفة كيفية التنفيذ

## 💡 نصائح إضافية

1. **استخدم التحقق الديناميكي**: لا تجبر المستخدم على ملء كل شيء
2. **وضّح للمستخدم**: استخدم أيقونات ونصوص واضحة
3. **أضف WhatsAppHelp**: في كل خطوة للمساعدة
4. **اجعلها بسيطة**: لا تضع أكثر من 5-7 حقول في خطوة واحدة
5. **استخدم الحقول الشرطية**: أظهر حقول إضافية عند الحاجة فقط

---

حظاً موفقاً في التطوير! 🎉
