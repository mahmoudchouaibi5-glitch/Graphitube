import { Grid3x3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';

interface KitchenStep12TilesProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep12Tiles({ formData, setFormData }: KitchenStep12TilesProps) {
  const { language } = useLanguage();

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      tilesDetails: {
        isCustomMaterial: false,
        isGraphitubeSelection: false,
        ...formData.tilesDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Grid3x3 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'تفاصيل السيراميك' : 'Détails du carrelage'}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'نوع السيراميك' : 'Type de carrelage'}
          </label>
          <input
            type="text"
            value={formData.tilesDetails?.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'ar' ? 'مثال: بورسلان، سيراميك...' : 'Ex: Porcelaine, céramique...'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'ملاحظات' : 'Notes'}
          </label>
          <textarea
            value={formData.tilesDetails?.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}