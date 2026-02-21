import { ChefHat } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData, KitchenDesignType } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep2DesignProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep2Design({ formData, setFormData }: KitchenStep2DesignProps) {
  const { language } = useLanguage();

  const designTypes: { value: KitchenDesignType; label: { ar: string; fr: string }; icon: string }[] = [
    { value: 'straight', label: { ar: 'مطبخ مستقيم (I)', fr: 'Cuisine droite (I)' }, icon: '━' },
    { value: 'l-shape', label: { ar: 'مطبخ على شكل L', fr: 'Cuisine en L' }, icon: '⌐' },
    { value: 'u-shape', label: { ar: 'مطبخ على شكل U', fr: 'Cuisine en U' }, icon: '⊐' },
    { value: 'g-shape', label: { ar: 'مطبخ على شكل G', fr: 'Cuisine en G' }, icon: 'Ͻ' },
    { value: 'island', label: { ar: 'مطبخ مع جزيرة', fr: 'Cuisine avec îlot' }, icon: '⊞' },
    { value: 'other', label: { ar: 'تصميم آخر', fr: 'Autre design' }, icon: '⋯' },
  ];

  const handleSelect = (type: KitchenDesignType) => {
    setFormData({
      ...formData,
      kitchenDesign: {
        type,
        customDescription: type === 'other' ? formData.kitchenDesign?.customDescription : undefined,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <ChefHat className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'نوع تصميم المطبخ' : 'Type de design de cuisine'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر شكل المطبخ المناسب' : 'Choisissez la forme de votre cuisine'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {designTypes.map((design) => (
          <SoundCard
            key={design.value}
            soundType="click"
            onClick={() => handleSelect(design.value)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              formData.kitchenDesign?.type === design.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{design.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {language === 'ar' ? design.label.ar : design.label.fr}
                </h3>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.kitchenDesign?.type === design.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {formData.kitchenDesign?.type === design.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </SoundCard>
        ))}
      </div>

      {/* Custom Description for "Other" */}
      {formData.kitchenDesign?.type === 'other' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'وصف التصميم المخصص' : 'Description du design personnalisé'}
          </label>
          <textarea
            value={formData.kitchenDesign?.customDescription || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                kitchenDesign: {
                  ...formData.kitchenDesign!,
                  customDescription: e.target.value,
                },
              })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={language === 'ar' ? 'صف التصميم الذي تريده...' : 'Décrivez votre design...'}
          />
        </div>
      )}
    </div>
  );
}
