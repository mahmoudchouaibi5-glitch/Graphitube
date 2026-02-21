import { WorkScope } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Check } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface Step5Props {
  data: WorkScope;
  onChange: (data: WorkScope) => void;
}

export function Step5WorkScope({ data, onChange }: Step5Props) {
  const { t, dir } = useLanguage();
  const { playSound } = useSoundEffects();

  const WORK_ITEMS = [
    { key: 'wood' as keyof WorkScope, label: t.kitchenSteps.step5.wood },
    { key: 'marble' as keyof WorkScope, label: t.kitchenSteps.step5.marble },
    { key: 'tiles' as keyof WorkScope, label: t.kitchenSteps.step5.tiles },
    { key: 'electrical' as keyof WorkScope, label: t.kitchenSteps.step5.electrical },
    { key: 'plumbing' as keyof WorkScope, label: t.kitchenSteps.step5.plumbing },
    { key: 'painting' as keyof WorkScope, label: t.kitchenSteps.step5.painting },
    { key: 'gypsum' as keyof WorkScope, label: t.kitchenSteps.step5.gypsum },
  ];

  const handleCompleteToggle = (checked: boolean) => {
    playSound('click'); // 🔊 صوت الاختيار
    if (checked) {
      // Select all
      onChange({
        wood: true,
        marble: true,
        tiles: true,
        electrical: true,
        plumbing: true,
        painting: true,
        gypsum: true,
        complete: true,
      });
    } else {
      // Deselect all
      onChange({
        wood: false,
        marble: false,
        tiles: false,
        electrical: false,
        plumbing: false,
        painting: false,
        gypsum: false,
        complete: false,
      });
    }
  };

  const handleItemToggle = (key: keyof WorkScope, checked: boolean) => {
    playSound('click'); // 🔊 صوت الاختيار
    onChange({ ...data, [key]: checked, complete: false });
  };

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step5.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step5.subtitle}</p>
      </div>

      {/* Complete Project Option */}
      <div className="p-4 border-2 border-amber-300 bg-amber-50 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={data.complete}
            onCheckedChange={handleCompleteToggle}
            className="mt-0.5"
          />
          <div>
            <div className="font-bold text-gray-900 flex items-center gap-2">
              {t.kitchenSteps.step5.completeProject}
              {data.complete && <Check className="w-5 h-5 text-amber-600" />}
            </div>
            <p className="text-sm text-gray-700 mt-1">
              {t.kitchenSteps.step5.completeProjectDesc}
            </p>
          </div>
        </label>
      </div>

      {/* Individual Work Items */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">{t.kitchenSteps.step5.orChoose}</p>
        {WORK_ITEMS.map((item) => (
          <label
            key={item.key}
            className={`
              flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
              ${
                data[item.key]
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
              }
            `}
          >
            <Checkbox
              checked={data[item.key]}
              onCheckedChange={(checked) => handleItemToggle(item.key, checked as boolean)}
            />
            <span className="font-medium text-gray-900">{item.label}</span>
          </label>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900 leading-relaxed">
          {t.kitchenSteps.step5.completeProjectDesc}
        </p>
      </div>
    </div>
  );
}