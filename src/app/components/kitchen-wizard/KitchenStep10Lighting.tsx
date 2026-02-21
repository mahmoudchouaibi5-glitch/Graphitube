import { Lightbulb } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData, LightingType } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep10LightingProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep10Lighting({ formData, setFormData }: KitchenStep10LightingProps) {
  const { language } = useLanguage();

  const lightingTypes: { value: LightingType; label: { ar: string; fr: string }; icon: string }[] = [
    { value: 'warm-led', label: { ar: 'LED دافئ', fr: 'LED chaud' }, icon: '💡' },
    { value: 'cool-led', label: { ar: 'LED بارد', fr: 'LED froid' }, icon: '🔦' },
    { value: 'none', label: { ar: 'بدون إضاءة', fr: 'Sans éclairage' }, icon: '🚫' },
  ];

  const handleSelect = (type: LightingType) => {
    setFormData({
      ...formData,
      lighting: { type },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Lightbulb className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الإضاءة' : 'Éclairage'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر نوع الإضاءة المناسب' : 'Choisissez le type d\'éclairage'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lightingTypes.map((light) => (
          <SoundCard
            key={light.value}
            soundType="click"
            onClick={() => handleSelect(light.value)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              formData.lighting?.type === light.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">{light.icon}</div>
              <p className="font-semibold text-gray-900">
                {language === 'ar' ? light.label.ar : light.label.fr}
              </p>
              <div
                className={`w-5 h-5 mx-auto rounded-full border-2 flex items-center justify-center ${
                  formData.lighting?.type === light.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {formData.lighting?.type === light.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </SoundCard>
        ))}
      </div>
    </div>
  );
}
