import { Trees } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData, WoodMaterialType } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep8WoodTypeProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep8WoodType({ formData, setFormData }: KitchenStep8WoodTypeProps) {
  const { language } = useLanguage();

  const woodTypes: { value: WoodMaterialType; label: { ar: string; fr: string } }[] = [
    { value: 'mdf', label: { ar: 'MDF عادي', fr: 'MDF standard' } },
    { value: 'lati-standard', label: { ar: 'LATI عادي', fr: 'LATI standard' } },
    { value: 'lati-resistant', label: { ar: 'LATI مقاوم للرطوبة والحرارة', fr: 'LATI résistant' } },
    { value: 'mdf-box-mdf-doors', label: { ar: 'صندوق MDF + أبواب MDF High Gloss', fr: 'Caisson MDF + portes MDF High Gloss' } },
    { value: 'lati-box-mdf-doors', label: { ar: 'صندوق LATI + أبواب MDF High Gloss', fr: 'Caisson LATI + portes MDF High Gloss' } },
    { value: 'lati-resistant-mdf-doors', label: { ar: 'صندوق LATI مقاوم + أبواب MDF High Gloss', fr: 'Caisson LATI résistant + portes MDF High Gloss' } },
  ];

  const handleSelect = (material: WoodMaterialType) => {
    setFormData({
      ...formData,
      woodType: { material },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Trees className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'نوع الخشب' : 'Type de bois'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر نوع المادة الخشبية' : 'Choisissez le type de matériau'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {woodTypes.map((wood) => (
          <SoundCard
            key={wood.value}
            soundType="click"
            onClick={() => handleSelect(wood.value)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.woodType?.material === wood.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.woodType?.material === wood.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {formData.woodType?.material === wood.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <p className="font-medium text-gray-900">
                {language === 'ar' ? wood.label.ar : wood.label.fr}
              </p>
            </div>
          </SoundCard>
        ))}
      </div>
    </div>
  );
}
