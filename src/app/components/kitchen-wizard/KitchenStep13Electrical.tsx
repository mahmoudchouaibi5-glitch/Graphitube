import { Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';

interface KitchenStep13ElectricalProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep13Electrical({ formData, setFormData }: KitchenStep13ElectricalProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Zap className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الأعمال الكهربائية' : 'Travaux électriques'}
          </h2>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'ar' ? 'ملاحظات ومتطلبات كهربائية' : 'Notes et exigences électriques'}
        </label>
        <textarea
          value={formData.electricalDetails?.notes || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              electricalDetails: { notes: e.target.value },
            })
          }
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder={language === 'ar' ? 'صف الأعمال الكهربائية المطلوبة...' : 'Décrivez les travaux électriques...'}
        />
      </div>
    </div>
  );
}
