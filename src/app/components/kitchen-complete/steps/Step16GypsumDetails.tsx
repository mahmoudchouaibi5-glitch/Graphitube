import { GypsumDetails } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step16Props {
  data: GypsumDetails;
  onChange: (data: GypsumDetails) => void;
}

export function Step16GypsumDetails({ data, onChange }: Step16Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step16.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step16.subtitle}</p>
      </div>

      <div>
        <Label htmlFor="gypsumWorkType" className="text-gray-900">{t.kitchenSteps.step16.workTypeLabel}</Label>
        <Input
          id="gypsumWorkType"
          type="text"
          value={data.workType || ''}
          onChange={(e) => onChange({ ...data, workType: e.target.value })}
          placeholder={t.kitchenSteps.step16.workTypePlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="designLevel" className="text-gray-900">{t.kitchenSteps.step16.designLevelLabel}</Label>
        <Input
          id="designLevel"
          type="text"
          value={data.designLevel || ''}
          onChange={(e) => onChange({ ...data, designLevel: e.target.value })}
          placeholder={t.kitchenSteps.step16.designLevelPlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="gypsumNotes" className="text-gray-900">{t.kitchenSteps.step16.notesLabel}</Label>
        <Textarea
          id="gypsumNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t.kitchenSteps.step16.notesPlaceholder}
          rows={4}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}