import { CabinetEquipment } from '../../../types/kitchen';
import { Checkbox } from '../../ui/checkbox';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step7Props {
  data: CabinetEquipment;
  onChange: (data: CabinetEquipment) => void;
}

export function Step7CabinetEquipment({ data, onChange }: Step7Props) {
  const { t, dir } = useLanguage();

  const EQUIPMENT_ITEMS = [
    { key: 'pullOutDrawers', label: t.kitchenSteps.step7.pullOutDrawers, description: t.kitchenSteps.step7.pullOutDrawersDesc },
    { key: 'softClose', label: t.kitchenSteps.step7.softClose, description: t.kitchenSteps.step7.softCloseDesc },
    { key: 'cornerSolutions', label: t.kitchenSteps.step7.cornerSolutions, description: t.kitchenSteps.step7.cornerSolutionsDesc },
    { key: 'tallUnitOrganizers', label: t.kitchenSteps.step7.tallUnitOrganizers, description: t.kitchenSteps.step7.tallUnitOrganizersDesc },
    { key: 'spiceRacks', label: t.kitchenSteps.step7.spiceRacks, description: t.kitchenSteps.step7.spiceRacksDesc },
    { key: 'binSystems', label: t.kitchenSteps.step7.binSystems, description: t.kitchenSteps.step7.binSystemsDesc },
    { key: 'cutleryTrays', label: t.kitchenSteps.step7.cutleryTrays, description: t.kitchenSteps.step7.cutleryTraysDesc },
    { key: 'plateRacks', label: t.kitchenSteps.step7.plateRacks, description: t.kitchenSteps.step7.plateRacksDesc },
  ];

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step7.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step7.subtitle}</p>
      </div>

      <div className="space-y-3">
        {EQUIPMENT_ITEMS.map((item) => (
          <label
            key={item.key}
            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              data[item.key as keyof CabinetEquipment]
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
            }`}
          >
            <Checkbox
              checked={data[item.key as keyof CabinetEquipment]}
              onCheckedChange={(checked) =>
                onChange({ ...data, [item.key]: checked as boolean })
              }
              className="mt-0.5"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{item.label}</div>
              <div className="text-sm text-gray-600 mt-0.5">{item.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}