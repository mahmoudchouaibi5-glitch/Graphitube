import { WoodTypeInfo, WoodMaterialType } from '../../../types/kitchen';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface Step8Props {
  data: WoodTypeInfo;
  onChange: (data: WoodTypeInfo) => void;
}

export function Step8WoodType({ data, onChange }: Step8Props) {
  const { t, dir } = useLanguage();
  const { playSound } = useSoundEffects();

  const WOOD_OPTIONS: { value: WoodMaterialType; label: string; description: string }[] = [
    { value: 'melamine', label: t.kitchenSteps.step8.melamine, description: t.kitchenSteps.step8.melamineDesc },
    { value: 'mdf', label: t.kitchenSteps.step8.mdf, description: t.kitchenSteps.step8.mdfDesc },
    { value: 'hdf', label: t.kitchenSteps.step8.hdf, description: t.kitchenSteps.step8.hdfDesc },
    { value: 'multiplex', label: t.kitchenSteps.step8.multiplex, description: t.kitchenSteps.step8.multiplexDesc },
    { value: 'natural', label: t.kitchenSteps.step8.natural, description: t.kitchenSteps.step8.naturalDesc },
  ];

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step8.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step8.subtitle}</p>
      </div>

      <div className="space-y-3">
        {WOOD_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              data.material === option.value
                ? 'border-amber-500 bg-amber-50 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
            }`}
          >
            <input
              type="radio"
              name="woodType"
              value={option.value}
              checked={data.material === option.value}
              onChange={(e) => {
                onChange({ ...data, material: e.target.value as WoodMaterialType });
                playSound('click');
              }}
              className="mt-1 w-5 h-5 text-amber-600 focus:ring-amber-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-600 mt-0.5">{option.description}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900 leading-relaxed">
          {t.kitchenSteps.step8.tip}
        </p>
      </div>
    </div>
  );
}