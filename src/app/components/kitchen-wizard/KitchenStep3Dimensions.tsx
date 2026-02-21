import { Ruler } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';

interface KitchenStep3DimensionsProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep3Dimensions({ formData, setFormData }: KitchenStep3DimensionsProps) {
  const { language } = useLanguage();

  const designType = formData.kitchenDesign?.type;

  const handleDimensionChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [field]: value ? parseFloat(value) : undefined,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Ruler className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'أبعاد المطبخ' : 'Dimensions de la cuisine'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'أدخل القياسات بالمتر' : 'Entrez les mesures en mètres'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Straight Kitchen */}
        {designType === 'straight' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الطول (متر)' : 'Longueur (m)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.dimensions?.straightLength || ''}
              onChange={(e) => handleDimensionChange('straightLength', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3.5"
            />
          </div>
        )}

        {/* L-Shape Kitchen */}
        {designType === 'l-shape' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الأول (متر)' : 'Côté 1 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.lSide1 || ''}
                onChange={(e) => handleDimensionChange('lSide1', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الثاني (متر)' : 'Côté 2 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.lSide2 || ''}
                onChange={(e) => handleDimensionChange('lSide2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2.5"
              />
            </div>
          </>
        )}

        {/* U-Shape Kitchen */}
        {designType === 'u-shape' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الأول (متر)' : 'Côté 1 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.uSide1 || ''}
                onChange={(e) => handleDimensionChange('uSide1', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الثاني (متر)' : 'Côté 2 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.uSide2 || ''}
                onChange={(e) => handleDimensionChange('uSide2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الثالث (متر)' : 'Côté 3 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.uSide3 || ''}
                onChange={(e) => handleDimensionChange('uSide3', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.0"
              />
            </div>
          </>
        )}

        {/* G-Shape Kitchen */}
        {designType === 'g-shape' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الأول (متر)' : 'Côté 1 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.gSide1 || ''}
                onChange={(e) => handleDimensionChange('gSide1', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الثاني (متر)' : 'Côté 2 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.gSide2 || ''}
                onChange={(e) => handleDimensionChange('gSide2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الضلع الثالث (متر)' : 'Côté 3 (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.gSide3 || ''}
                onChange={(e) => handleDimensionChange('gSide3', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'امتداد حرف G (متر)' : 'Extension G (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.gSide4 || ''}
                onChange={(e) => handleDimensionChange('gSide4', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1.5"
              />
            </div>
          </>
        )}

        {/* Island Kitchen */}
        {designType === 'island' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'طول المطبخ الأساسي (متر)' : 'Longueur cuisine principale (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.islandKitchenLength || ''}
                onChange={(e) => handleDimensionChange('islandKitchenLength', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="4.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'طول الجزيرة (متر)' : 'Longueur îlot (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.islandLength || ''}
                onChange={(e) => handleDimensionChange('islandLength', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'عرض الجزيرة (متر)' : 'Largeur îlot (m)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions?.islandWidth || ''}
                onChange={(e) => handleDimensionChange('islandWidth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1.0"
              />
            </div>
          </>
        )}

        {/* Other */}
        {designType === 'other' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              {language === 'ar'
                ? 'سيتم مناقشة الأبعاد مع المصمم في الاستشارة المجانية'
                : 'Les dimensions seront discutées avec le designer lors de la consultation gratuite'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
