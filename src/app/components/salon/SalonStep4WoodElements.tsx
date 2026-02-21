import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SalonWoodElements } from '../../types';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

interface SalonStep4WoodElementsProps {
  data: SalonWoodElements;
  onChange: (data: SalonWoodElements) => void;
}

export function SalonStep4WoodElements({ data, onChange }: SalonStep4WoodElementsProps) {
  const { t } = useLanguage();

  const handleChange = (field: keyof SalonWoodElements, value: number) => {
    onChange({ ...data, [field]: Math.max(0, value) });
  };

  const increment = (field: keyof SalonWoodElements) => {
    handleChange(field, (data[field] || 0) + 1);
  };

  const decrement = (field: keyof SalonWoodElements) => {
    handleChange(field, (data[field] || 0) - 1);
  };

  const elements = [
    { key: 'largeTables' as keyof SalonWoodElements, label: t.salonSteps.step4.largeTables, icon: '▬' },
    { key: 'sundries' as keyof SalonWoodElements, label: t.salonSteps.step4.sundries, icon: '◈' },
    { key: 'sidePanels' as keyof SalonWoodElements, label: t.salonSteps.step4.sidePanels, icon: '▯' },
    { key: 'verticalShapes' as keyof SalonWoodElements, label: t.salonSteps.step4.verticalShapes, icon: '▮' },
    { key: 'verticalCorners' as keyof SalonWoodElements, label: t.salonSteps.step4.verticalCorners, icon: '⌐' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step4.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step4.subtitle}</p>
      </div>

      <div className="space-y-4">
        {elements.map((element) => (
          <div key={element.key} className="bg-gray-50 rounded-lg p-4">
            <Label className="text-base mb-3 block flex items-center gap-2">
              <span className="text-2xl">{element.icon}</span>
              {element.label}
            </Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => decrement(element.key)}
                disabled={(data[element.key] || 0) <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="0"
                value={data[element.key] || 0}
                onChange={(e) => handleChange(element.key, parseInt(e.target.value) || 0)}
                className="text-center text-lg font-semibold w-24"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => increment(element.key)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-900">
          {t.salonSteps.step4.note}
        </p>
      </div>
    </div>
  );
}