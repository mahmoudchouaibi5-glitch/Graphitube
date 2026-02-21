import { Paintbrush } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';

interface KitchenStep15PaintingProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep15Painting({ formData, setFormData }: KitchenStep15PaintingProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Paintbrush className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'أعمال الدهان' : 'Travaux de peinture'}
          </h2>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'ar' ? 'ملاحظات ومتطلبات الدهان' : 'Notes et exigences de peinture'}
        </label>
        <textarea
          value={formData.paintingDetails?.notes || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              paintingDetails: { notes: e.target.value },
            })
          }
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder={language === 'ar' ? 'صف أعمال الدهان المطلوبة...' : 'Décrivez les travaux de peinture...'}
        />
      </div>
    </div>
  );
}
