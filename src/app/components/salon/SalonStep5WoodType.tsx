import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { WoodType } from '../../types';
import { TreeDeciduous } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SalonStep5WoodTypeProps {
  data: { woodType?: WoodType };
  onChange: (data: { woodType: WoodType }) => void;
}

export function SalonStep5WoodType({ data, onChange }: SalonStep5WoodTypeProps) {
  const { t } = useLanguage();

  const woodTypes: { value: WoodType }[] = [
    { value: 'chene' },
    { value: 'noyer' },
    { value: 'laitre' },
  ];

  const getWoodLabel = (type: WoodType) => {
    switch (type) {
      case 'chene':
        return t.salonSteps.step5.chene;
      case 'noyer':
        return t.salonSteps.step5.noyer;
      case 'laitre':
        return t.salonSteps.step5.laitre;
      default:
        return type;
    }
  };

  const getWoodDesc = (type: WoodType) => {
    switch (type) {
      case 'chene':
        return t.salonSteps.step5.cheneDesc;
      case 'noyer':
        return t.salonSteps.step5.noyerDesc;
      case 'laitre':
        return t.salonSteps.step5.laitreDesc;
      default:
        return '';
    }
  };

  const handleTypeChange = (type: WoodType) => {
    // ✅ نحافظ على البيانات الموجودة
    onChange({ ...data, woodType: type });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step5.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step5.subtitle}</p>
      </div>

      <div>
        <Label className="text-base mb-4 block">{t.salonSteps.step5.choiceLabel}</Label>
        <div className="grid md:grid-cols-3 gap-4">
          {woodTypes.map((type) => (
            <Card
              key={type.value}
              className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.woodType === type.value
                  ? 'border-2 border-amber-500 bg-amber-50'
                  : 'border-2 border-gray-200 hover:border-amber-300'
              }`}
              onClick={() => handleTypeChange(type.value)}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TreeDeciduous className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{getWoodLabel(type.value)}</h3>
                <p className="text-xs text-gray-600">{getWoodDesc(type.value)}</p>
                {data.woodType === type.value && (
                  <div className="mt-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
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

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          {t.salonSteps.step5.note}
        </p>
      </div>
    </div>
  );
}