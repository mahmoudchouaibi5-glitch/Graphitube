import { PlumbingDetails } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step14Props {
  data: PlumbingDetails;
  onChange: (data: PlumbingDetails) => void;
}

export function Step14PlumbingDetails({ data, onChange }: Step14Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step14.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step14.subtitle}</p>
      </div>

      <div>
        <Label htmlFor="plumbingWorkType" className="text-gray-900">{t.kitchenSteps.step14.workTypeLabel}</Label>
        <Input
          id="plumbingWorkType"
          type="text"
          value={data.workType || ''}
          onChange={(e) => onChange({ ...data, workType: e.target.value })}
          placeholder={t.kitchenSteps.step14.workTypePlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="waterPoints" className="text-gray-900">{t.kitchenSteps.step14.waterPointsLabel}</Label>
        <Textarea
          id="waterPoints"
          value={data.waterPoints || ''}
          onChange={(e) => onChange({ ...data, waterPoints: e.target.value })}
          placeholder={t.kitchenSteps.step14.waterPointsPlaceholder}
          rows={3}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="drainageCondition" className="text-gray-900">{t.kitchenSteps.step14.drainageConditionLabel}</Label>
        <Input
          id="drainageCondition"
          type="text"
          value={data.drainageCondition || ''}
          onChange={(e) => onChange({ ...data, drainageCondition: e.target.value })}
          placeholder={t.kitchenSteps.step14.drainageConditionPlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="plumbingNotes" className="text-gray-900">{t.kitchenSteps.step14.notesLabel}</Label>
        <Textarea
          id="plumbingNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t.kitchenSteps.step14.notesPlaceholder}
          rows={3}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}