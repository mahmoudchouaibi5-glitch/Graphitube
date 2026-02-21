import { DoorClosed } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep9DoorSystemProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep9DoorSystem({ formData, setFormData }: KitchenStep9DoorSystemProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <DoorClosed className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'نظام الأبواب' : 'Système de portes'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر نوع التركيب والطلاء' : 'Choisissez le type d\'installation et de finition'}
          </p>
        </div>
      </div>

      {/* نوع التركيب */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'نوع التركيب' : 'Type d\'installation'}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <SoundCard
            soundType="click"
            onClick={() =>
              setFormData({
                ...formData,
                doorSystem: { ...formData.doorSystem!, installation: 'inset' },
              })
            }
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.doorSystem?.installation === 'inset'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <p className="font-semibold text-center">{language === 'ar' ? 'مدمج' : 'Encastré'}</p>
          </SoundCard>
          <SoundCard
            soundType="click"
            onClick={() =>
              setFormData({
                ...formData,
                doorSystem: { ...formData.doorSystem!, installation: 'overlay' },
              })
            }
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.doorSystem?.installation === 'overlay'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <p className="font-semibold text-center">{language === 'ar' ? 'ملصوق' : 'Superposé'}</p>
          </SoundCard>
        </div>
      </div>

      {/* نوع الطلاء */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'نوع الطلاء' : 'Type de finition'}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <SoundCard
            soundType="click"
            onClick={() =>
              setFormData({
                ...formData,
                doorSystem: { ...formData.doorSystem!, finish: 'glossy' },
              })
            }
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.doorSystem?.finish === 'glossy'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <p className="font-semibold text-center">{language === 'ar' ? 'لامع' : 'Brillant'}</p>
          </SoundCard>
          <SoundCard
            soundType="click"
            onClick={() =>
              setFormData({
                ...formData,
                doorSystem: { ...formData.doorSystem!, finish: 'matte' },
              })
            }
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.doorSystem?.finish === 'matte'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <p className="font-semibold text-center">{language === 'ar' ? 'مطفي' : 'Mat'}</p>
          </SoundCard>
        </div>
      </div>

      {/* لون المطبخ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'ar' ? 'لون المطبخ' : 'Couleur de la cuisine'}
        </label>
        <input
          type="text"
          value={formData.doorSystem?.kitchenColor || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              doorSystem: { ...formData.doorSystem!, kitchenColor: e.target.value },
            })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={language === 'ar' ? 'مثال: أبيض، رمادي، أزرق...' : 'Ex: Blanc, gris, bleu...'}
        />
      </div>

      {/* أبواب زجاج بإطار ألمنيوم (اختياري) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'ar' ? 'عدد أبواب الزجاج بإطار ألمنيوم (اختياري)' : 'Nombre de portes vitrées avec cadre alu (optionnel)'}
        </label>
        <input
          type="number"
          min="0"
          value={formData.doorSystem?.glassDoorsWithAluminum || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              doorSystem: {
                ...formData.doorSystem!,
                glassDoorsWithAluminum: e.target.value ? parseInt(e.target.value) : undefined,
              },
            })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0"
        />
      </div>
    </div>
  );
}
