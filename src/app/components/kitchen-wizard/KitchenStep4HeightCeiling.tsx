import { MoveVertical } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep4HeightCeilingProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep4HeightCeiling({ formData, setFormData }: KitchenStep4HeightCeilingProps) {
  const { language } = useLanguage();

  const handleReachCeiling = (reaches: boolean) => {
    setFormData({
      ...formData,
      heightCeiling: {
        ...formData.heightCeiling!,
        reachesCeiling: reaches,
      },
    });
  };

  const handleTotalHeight = (height: string) => {
    setFormData({
      ...formData,
      heightCeiling: {
        ...formData.heightCeiling!,
        totalHeight: height ? parseFloat(height) : undefined,
      },
    });
  };

  const handleCeilingType = (type: 'flat' | 'uneven') => {
    setFormData({
      ...formData,
      heightCeiling: {
        ...formData.heightCeiling!,
        ceilingType: type,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <MoveVertical className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الارتفاع والسقف' : 'Hauteur et plafond'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'معلومات عن ارتفاع المطبخ' : 'Informations sur la hauteur'}
          </p>
        </div>
      </div>

      {/* هل يصل للسقف؟ */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'هل المطبخ يصل إلى السقف؟' : 'La cuisine atteint-elle le plafond ?'}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <SoundCard
            soundType="click"
            onClick={() => handleReachCeiling(true)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.heightCeiling?.reachesCeiling === true
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">✓</div>
              <p className="font-semibold">{language === 'ar' ? 'نعم' : 'Oui'}</p>
            </div>
          </SoundCard>
          <SoundCard
            soundType="click"
            onClick={() => handleReachCeiling(false)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.heightCeiling?.reachesCeiling === false
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">✗</div>
              <p className="font-semibold">{language === 'ar' ? 'لا' : 'Non'}</p>
            </div>
          </SoundCard>
        </div>
      </div>

      {/* إذا لا يصل للسقف */}
      {formData.heightCeiling?.reachesCeiling === false && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'الارتفاع الإجمالي (متر)' : 'Hauteur totale (m)'}
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={formData.heightCeiling?.totalHeight || ''}
            onChange={(e) => handleTotalHeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2.4"
          />
        </div>
      )}

      {/* نوع السقف */}
      {formData.heightCeiling?.reachesCeiling === true && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'نوع السقف' : 'Type de plafond'}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <SoundCard
              soundType="click"
              onClick={() => handleCeilingType('flat')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.heightCeiling?.ceilingType === 'flat'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">▬</div>
                <p className="font-semibold">{language === 'ar' ? 'سقف مستوي' : 'Plafond plat'}</p>
              </div>
            </SoundCard>
            <SoundCard
              soundType="click"
              onClick={() => handleCeilingType('uneven')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.heightCeiling?.ceilingType === 'uneven'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">⌒</div>
                <p className="font-semibold">{language === 'ar' ? 'سقف غير مستوي' : 'Plafond inégal'}</p>
              </div>
            </SoundCard>
          </div>
        </div>
      )}

      {/* إذا السقف غير مستوي */}
      {formData.heightCeiling?.ceilingType === 'uneven' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'أعلى نقطة (متر)' : 'Point le plus haut (m)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.heightCeiling?.highestPoint || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heightCeiling: {
                    ...formData.heightCeiling!,
                    highestPoint: e.target.value ? parseFloat(e.target.value) : undefined,
                  },
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2.8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'أدنى نقطة (متر)' : 'Point le plus bas (m)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.heightCeiling?.lowestPoint || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heightCeiling: {
                    ...formData.heightCeiling!,
                    lowestPoint: e.target.value ? parseFloat(e.target.value) : undefined,
                  },
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2.4"
            />
          </div>
        </div>
      )}
    </div>
  );
}
