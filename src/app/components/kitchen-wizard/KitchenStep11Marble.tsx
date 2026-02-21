import { Square } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';

interface KitchenStep11MarbleProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep11Marble({ formData, setFormData }: KitchenStep11MarbleProps) {
  const { language } = useLanguage();

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      marbleDetails: {
        hasOpenings: false,
        isCustomMaterial: false,
        isGraphitubeSelection: false,
        ...formData.marbleDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Square className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'تفاصيل الرخام' : 'Détails du marbre'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'معلومات عن سطح العمل' : 'Informations sur le plan de travail'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'نوع السطح' : 'Type de surface'}
          </label>
          <input
            type="text"
            value={formData.marbleDetails?.surfaceType || ''}
            onChange={(e) => handleChange('surfaceType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'ar' ? 'مثال: رخام، جرانيت، كوارتز...' : 'Ex: Marbre, granit, quartz...'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'اللون' : 'Couleur'}
          </label>
          <input
            type="text"
            value={formData.marbleDetails?.color || ''}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'ar' ? 'مثال: أبيض، أسود، رمادي...' : 'Ex: Blanc, noir, gris...'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'ملاحظات إضافية' : 'Notes supplémentaires'}
          </label>
          <textarea
            value={formData.marbleDetails?.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : 'Toute note supplémentaire...'}
          />
        </div>
      </div>
    </div>
  );
}