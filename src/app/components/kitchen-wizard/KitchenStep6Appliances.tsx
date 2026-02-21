import { Microwave, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep6AppliancesProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep6Appliances({ formData, setFormData }: KitchenStep6AppliancesProps) {
  const { language } = useLanguage();

  const appliances = [
    { key: 'electricOven', label: { ar: 'فرن كهربائي', fr: 'Four électrique' }, icon: '🔥' },
    { key: 'microwave', label: { ar: 'ميكروويف', fr: 'Micro-ondes' }, icon: '📻' },
    { key: 'stove', label: { ar: 'بوتاغاز', fr: 'Cuisinière' }, icon: '🔥' },
    { key: 'pizzaOven', label: { ar: 'فرن بيتزا', fr: 'Four à pizza' }, icon: '🍕' },
    { key: 'hood', label: { ar: 'شفاط', fr: 'Hotte' }, icon: '💨' },
    { key: 'fridge', label: { ar: 'ثلاجة', fr: 'Réfrigérateur' }, icon: '🧊' },
    { key: 'freezer', label: { ar: 'فريزر', fr: 'Congélateur' }, icon: '❄️' },
    { key: 'waterHeater', label: { ar: 'سخان ماء', fr: 'Chauffe-eau' }, icon: '♨️' },
    { key: 'coffeeMachine', label: { ar: 'آلة قهوة', fr: 'Machine à café' }, icon: '☕' },
    { key: 'singleSink', label: { ar: 'حوض واحد', fr: 'Évier simple' }, icon: '🚰' },
    { key: 'doubleSink', label: { ar: 'حوض مزدوج', fr: 'Évier double' }, icon: '🚿' },
    { key: 'faucet', label: { ar: 'صنبور', fr: 'Robinet' }, icon: '🚿' },
    { key: 'soapDispenser', label: { ar: 'ماكينة صابون', fr: 'Distributeur savon' }, icon: '🧴' },
  ];

  const toggleAppliance = (key: string) => {
    setFormData({
      ...formData,
      appliances: {
        ...formData.appliances!,
        [key]: !formData.appliances?.[key as keyof typeof formData.appliances],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Microwave className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الأجهزة المدمجة' : 'Appareils intégrés'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر الأجهزة التي تريد دمجها' : 'Choisissez les appareils à intégrer'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {appliances.map((appliance) => (
          <SoundCard
            key={appliance.key}
            soundType="click"
            onClick={() => toggleAppliance(appliance.key)}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              formData.appliances?.[appliance.key as keyof typeof formData.appliances]
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center space-y-1">
              <div className="text-2xl">{appliance.icon}</div>
              <p className="text-xs font-medium text-gray-900">
                {language === 'ar' ? appliance.label.ar : appliance.label.fr}
              </p>
              {formData.appliances?.[appliance.key as keyof typeof formData.appliances] && (
                <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" />
              )}
            </div>
          </SoundCard>
        ))}
      </div>
    </div>
  );
}
