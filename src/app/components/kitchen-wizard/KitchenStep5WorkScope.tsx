import { Hammer, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep5WorkScopeProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep5WorkScope({ formData, setFormData }: KitchenStep5WorkScopeProps) {
  const { language } = useLanguage();

  const workTypes = [
    { key: 'wood', label: { ar: 'أعمال الخشب', fr: 'Menuiserie' }, icon: '🪵' },
    { key: 'marble', label: { ar: 'الرخام', fr: 'Marbre' }, icon: '🪨' },
    { key: 'tiles', label: { ar: 'السيراميك', fr: 'Carrelage' }, icon: '🔲' },
    { key: 'electrical', label: { ar: 'الكهرباء', fr: 'Électricité' }, icon: '⚡' },
    { key: 'plumbing', label: { ar: 'السباكة', fr: 'Plomberie' }, icon: '💧' },
    { key: 'painting', label: { ar: 'الدهان', fr: 'Peinture' }, icon: '🎨' },
    { key: 'gypsum', label: { ar: 'الجبس', fr: 'Plâtre' }, icon: '🏗️' },
    { key: 'complete', label: { ar: 'مشروع متكامل', fr: 'Projet complet' }, icon: '✨' },
  ];

  const toggleWork = (key: string) => {
    setFormData({
      ...formData,
      workScope: {
        ...formData.workScope!,
        [key]: !formData.workScope?.[key as keyof typeof formData.workScope],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Hammer className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'نطاق الأعمال' : 'Portée des travaux'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر الأعمال المطلوبة (يمكنك اختيار أكثر من واحد)' : 'Sélectionnez les travaux requis'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workTypes.map((work) => (
          <SoundCard
            key={work.key}
            soundType="click"
            onClick={() => toggleWork(work.key)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.workScope?.[work.key as keyof typeof formData.workScope]
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{work.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {language === 'ar' ? work.label.ar : work.label.fr}
                </p>
              </div>
              {formData.workScope?.[work.key as keyof typeof formData.workScope] && (
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              )}
            </div>
          </SoundCard>
        ))}
      </div>
    </div>
  );
}
