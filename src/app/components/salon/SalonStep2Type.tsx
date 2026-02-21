import { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { SalonDimensions, SalonType } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Upload } from 'lucide-react';

interface SalonStep2TypeProps {
  data: SalonDimensions;
  onChange: (data: SalonDimensions) => void;
}

// SVG Icons for each salon shape
const ShapeIcons: Record<SalonType, JSX.Element> = {
  'l-shape': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 10 L15 45 L50 45" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
    </svg>
  ),
  'u-shape': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 10 L15 45 L50 45 L50 10" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
    </svg>
  ),
  'square': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="34" height="34" stroke="currentColor" strokeWidth="3" fill="none"/>
    </svg>
  ),
  'rectangular-open': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M49 54 L49 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M41 10 L15 10 L15 54 L49 54 L49 49" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
    </svg>
  ),
  'rectangular-closed': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M49 10 L49 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M41 54 L15 54 L15 10 L49 10 L49 15" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
    </svg>
  ),
  'custom-design': (
    <Upload className="w-10 h-10" />
  ),
};

export function SalonStep2Type({ data, onChange }: SalonStep2TypeProps) {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.customDesignImage || null
  );

  const salonTypes: { value: SalonType }[] = [
    { value: 'l-shape' },
    { value: 'u-shape' },
    { value: 'rectangular-open' },
    { value: 'rectangular-closed' },
    { value: 'custom-design' },
  ];

  const getTypeLabel = (type: SalonType) => {
    switch (type) {
      case 'l-shape':
        return t.salonSteps.step2.lShape;
      case 'u-shape':
        return t.salonSteps.step2.uShape;
      case 'square':
        return t.salonSteps.step2.square;
      case 'rectangular-open':
        return t.salonSteps.step2.rectangularOpen;
      case 'rectangular-closed':
        return t.salonSteps.step2.rectangularClosed;
      case 'custom-design':
        return t.salonSteps.step2.customDesign;
    }
  };

  const handleTypeChange = (type: SalonType) => {
    // ✅ إذا كان نفس النوع، لا نعمل شيء
    if (data.type === type) {
      return;
    }
    
    // ✅ نحافظ على البيانات الموجودة ونضيف النوع الجديد فقط
    onChange({
      ...data,
      type,
      // فقط نحذف صورة التصميم المخصص إذا غيّر المستخدم من custom-design إلى نوع آخر
      customDesignImage: type === 'custom-design' ? data.customDesignImage : undefined,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onChange({
          ...data,
          customDesignImage: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step2.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step2.subtitle}</p>
      </div>

      <div>
        <Label className="text-base mb-4 block">{t.salonSteps.step2.designLabel}</Label>
        <div className="grid md:grid-cols-3 gap-4">
          {salonTypes.map((type) => (
            <Card
              key={type.value}
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.type === type.value
                  ? 'border-2 border-amber-500 bg-amber-50'
                  : 'border-2 border-gray-200 hover:border-amber-300'
              }`}
              onClick={() => handleTypeChange(type.value)}
            >
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto text-gray-700">
                  {ShapeIcons[type.value]}
                </div>
                
                {/* النص يظهر لجميع الأنواع */}
                <p className="text-base font-bold text-gray-900">
                  {getTypeLabel(type.value)}
                </p>
                
                {/* علامة الاختيار */}
                {data.type === type.value && (
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Design Image Upload Section */}
      {data.type === 'custom-design' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-sm text-blue-800">{t.salonSteps.step2.customPriceNote}</p>
            </div>
          </div>

          <div>
            <Label className="text-base mb-2 block">{t.salonSteps.step2.uploadImage}</Label>
            <p className="text-sm text-gray-600 mb-3">{t.salonSteps.step2.uploadImageDesc}</p>

            <div className="flex flex-col gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>{t.salonSteps.step2.uploadImage}</span>
                </div>
              </label>

              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Custom design preview"
                    className="w-full max-w-md rounded-lg border-2 border-gray-300"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      onChange({
                        ...data,
                        customDesignImage: undefined,
                      });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}