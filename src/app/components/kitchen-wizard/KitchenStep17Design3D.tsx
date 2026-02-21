import { Box } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep17Design3DProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep17Design3D({ formData, setFormData }: KitchenStep17Design3DProps) {
  const { language } = useLanguage();

  const handleWants3D = (wants: boolean) => {
    setFormData({
      ...formData,
      design3D: {
        ...formData.design3D!,
        wants3D: wants,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Box className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'التصميم ثلاثي الأبعاد' : 'Design 3D'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'خدمة تصميم 3D مجانية!' : 'Service de design 3D gratuit!'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'هل تريد تصميم 3D لمطبخك؟' : 'Voulez-vous un design 3D de votre cuisine?'}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <SoundCard
            soundType="click"
            onClick={() => handleWants3D(true)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              formData.design3D?.wants3D === true
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="font-semibold text-lg">{language === 'ar' ? 'نعم' : 'Oui'}</p>
              <p className="text-xs text-gray-600 mt-1">
                {language === 'ar' ? 'مجاناً!' : 'Gratuit!'}
              </p>
            </div>
          </SoundCard>
          <SoundCard
            soundType="click"
            onClick={() => handleWants3D(false)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              formData.design3D?.wants3D === false
                ? 'border-gray-500 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">✗</div>
              <p className="font-semibold text-lg">{language === 'ar' ? 'لا' : 'Non'}</p>
            </div>
          </SoundCard>
        </div>
      </div>

      {formData.design3D?.wants3D && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-900">
            {language === 'ar'
              ? '🎉 رائع! سيقوم فريقنا بإنشاء تصميم 3D احترافي لمطبخك وإرساله إليك عبر البريد الإلكتروني أو واتساب.'
              : '🎉 Super! Notre équipe créera un design 3D professionnel de votre cuisine et vous l\'enverra par email ou WhatsApp.'}
          </p>
        </div>
      )}
    </div>
  );
}