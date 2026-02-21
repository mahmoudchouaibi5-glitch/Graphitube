import { KitchenDesignInfo, KitchenDesignType } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface Step2Props {
  data: KitchenDesignInfo;
  onChange: (data: KitchenDesignInfo) => void;
}

export function Step2KitchenDesign({ data, onChange }: Step2Props) {
  const { t, dir } = useLanguage();
  const { playSound } = useSoundEffects();

  const DESIGN_OPTIONS: { value: KitchenDesignType; label: string; description: string }[] = [
    { value: 'straight', label: t.kitchenSteps.step2.straight, description: t.kitchenSteps.step2.straightDesc },
    { value: 'l-shape', label: t.kitchenSteps.step2.lShape, description: t.kitchenSteps.step2.lShapeDesc },
    { value: 'u-shape', label: t.kitchenSteps.step2.uShape, description: t.kitchenSteps.step2.uShapeDesc },
    { value: 'g-shape', label: t.kitchenSteps.step2.gShape, description: t.kitchenSteps.step2.gShapeDesc },
    { value: 'island', label: t.kitchenSteps.step2.island, description: t.kitchenSteps.step2.islandDesc },
    { value: 'other', label: t.kitchenSteps.step2.other, description: t.kitchenSteps.step2.otherDesc },
  ];

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step2.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step2.subtitle}</p>
      </div>

      <div className="space-y-3">
        {DESIGN_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all
              ${
                data.type === option.value
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
              }
            `}
          >
            <input
              type="radio"
              name="kitchenDesign"
              value={option.value}
              checked={data.type === option.value}
              onChange={(e) => {
                playSound('click'); // 🔊 صوت الاختيار
                onChange({
                  ...data,
                  type: e.target.value as KitchenDesignType,
                  customDescription: e.target.value === 'other' ? data.customDescription : undefined,
                });
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

      {data.type === 'other' && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Label htmlFor="customDescription" className="text-gray-900 mb-2 block">
            {t.kitchenSteps.step2.customLabel} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="customDescription"
            value={data.customDescription || ''}
            onChange={(e) => onChange({ ...data, customDescription: e.target.value })}
            placeholder={t.kitchenSteps.step2.customPlaceholder}
            rows={4}
            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="text-xs text-blue-700 mt-2">
            {t.kitchenSteps.step2.customNote}
          </p>
        </div>
      )}
    </div>
  );
}