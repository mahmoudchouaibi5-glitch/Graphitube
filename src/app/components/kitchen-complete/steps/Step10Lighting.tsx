import { LightingInfo, LightingType } from '../../../types/kitchen';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Lightbulb } from 'lucide-react';

interface Step10Props {
  data: LightingInfo;
  onChange: (data: LightingInfo) => void;
}

export function Step10Lighting({ data, onChange }: Step10Props) {
  const { t, dir } = useLanguage();

  const LIGHTING_OPTIONS: { value: LightingType; label: string; description: string }[] = [
    { value: 'underCabinet', label: t.kitchenSteps.step10.underCabinet, description: t.kitchenSteps.step10.underCabinetDesc },
    { value: 'insideCabinet', label: t.kitchenSteps.step10.insideCabinet, description: t.kitchenSteps.step10.insideCabinetDesc },
    { value: 'ledStrips', label: t.kitchenSteps.step10.ledStrips, description: t.kitchenSteps.step10.ledStripsDesc },
    { value: 'spotlights', label: t.kitchenSteps.step10.spotlights, description: t.kitchenSteps.step10.spotlightsDesc },
  ];

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step10.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step10.subtitle}</p>
      </div>

      <div className="space-y-3">
        {LIGHTING_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              data.type === option.value
                ? 'border-amber-500 bg-amber-50 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
            }`}
          >
            <input
              type="radio"
              name="lighting"
              value={option.value}
              checked={data.type === option.value}
              onChange={(e) => onChange({ ...data, type: e.target.value as LightingType })}
              className="mt-1 w-5 h-5 text-amber-600 focus:ring-amber-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                {option.label}
              </div>
              <div className="text-sm text-gray-600 mt-0.5">{option.description}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900 leading-relaxed">
          {t.kitchenSteps.step10.tip}
        </p>
      </div>
    </div>
  );
}