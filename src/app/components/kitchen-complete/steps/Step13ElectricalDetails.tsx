import { ElectricalDetails } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step13Props {
  data: ElectricalDetails;
  onChange: (data: ElectricalDetails) => void;
}

export function Step13ElectricalDetails({ data, onChange }: Step13Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step13.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step13.subtitle}</p>
      </div>

      <div>
        <Label htmlFor="workType" className="text-gray-900">{t.kitchenSteps.step13.workType}</Label>
        <Input
          id="workType"
          type="text"
          value={data.workType || ''}
          onChange={(e) => onChange({ ...data, workType: e.target.value })}
          placeholder={t.kitchenSteps.step13.workTypePlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="estimatedPoints" className="text-gray-900">{t.kitchenSteps.step13.estimatedPoints}</Label>
        <Input
          id="estimatedPoints"
          type="text"
          value={data.estimatedPoints || ''}
          onChange={(e) => onChange({ ...data, estimatedPoints: e.target.value })}
          placeholder={t.kitchenSteps.step13.estimatedPointsPlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="specialEquipment" className="text-gray-900">{t.kitchenSteps.step13.specialEquipment}</Label>
        <Textarea
          id="specialEquipment"
          value={data.specialEquipment || ''}
          onChange={(e) => onChange({ ...data, specialEquipment: e.target.value })}
          placeholder={t.kitchenSteps.step13.specialEquipmentPlaceholder}
          rows={3}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="electricalNotes" className="text-gray-900">{t.kitchenSteps.step13.notes}</Label>
        <Textarea
          id="electricalNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t.kitchenSteps.step13.notesPlaceholder}
          rows={3}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}