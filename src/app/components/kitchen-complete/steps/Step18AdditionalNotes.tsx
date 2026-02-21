import { AdditionalInfo } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { useLanguage } from '../../../contexts/LanguageContext';
import { FileText } from 'lucide-react';

interface Step18Props {
  data: AdditionalInfo;
  onChange: (data: AdditionalInfo) => void;
}

export function Step18AdditionalNotes({ data, onChange }: Step18Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step18.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step18.subtitle}</p>
      </div>

      <div>
        <Label htmlFor="additionalNotes" className="text-gray-900 mb-2 block">
          {t.kitchenSteps.step18.title}
        </Label>
        <Textarea
          id="additionalNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t.kitchenSteps.step18.placeholder}
          rows={6}
          className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-sm text-blue-900">
          <p className="font-medium mb-1">{t.kitchenSteps.step18.note}</p>
          <p className="leading-relaxed">
            {t.kitchenSteps.step18.placeholder}
          </p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-900 leading-relaxed">
          ✅ أنت الآن على وشك إنهاء النموذج. في الخطوة التالية، ستتمكن من مراجعة جميع المعلومات قبل الإرسال النهائي.
        </p>
      </div>
    </div>
  );
}