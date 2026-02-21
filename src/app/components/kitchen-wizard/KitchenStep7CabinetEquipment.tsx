import { Box, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { SoundCard } from '../SoundCard';

interface KitchenStep7CabinetEquipmentProps {
  formData: Partial<CompleteKitchenFormData>;
  setFormData: (data: Partial<CompleteKitchenFormData>) => void;
}

export function KitchenStep7CabinetEquipment({ formData, setFormData }: KitchenStep7CabinetEquipmentProps) {
  const { language } = useLanguage();

  const equipment = [
    { key: 'gasBottleCabinet', label: { ar: 'خزانة قنينة بوتاغاز', fr: 'Armoire bouteille gaz' }, icon: '🧯' },
    { key: 'trashCabinet', label: { ar: 'خزانة سلة نفايات', fr: 'Armoire poubelle' }, icon: '🗑️' },
    { key: 'vegetableBaskets', label: { ar: 'شباك للخضروات', fr: 'Paniers légumes' }, icon: '🥕' },
    { key: 'glassBaskets', label: { ar: 'شباك للأكواب', fr: 'Paniers verres' }, icon: '🥤' },
    { key: 'spiceBaskets', label: { ar: 'شباك للتوابل', fr: 'Paniers épices' }, icon: '🧂' },
    { key: 'cornerBaskets', label: { ar: 'شباك الزاوية', fr: 'Paniers d\'angle' }, icon: '📐' },
  ];

  const toggleEquipment = (key: string) => {
    setFormData({
      ...formData,
      cabinetEquipment: {
        ...formData.cabinetEquipment!,
        [key]: !formData.cabinetEquipment?.[key as keyof typeof formData.cabinetEquipment],
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
            {language === 'ar' ? 'معدات الخزانات الداخلية' : 'Équipements intérieurs'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'اختر معدات التخزين الداخلية' : 'Choisissez les équipements de rangement'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipment.map((item) => (
          <SoundCard
            key={item.key}
            soundType="click"
            onClick={() => toggleEquipment(item.key)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.cabinetEquipment?.[item.key as keyof typeof formData.cabinetEquipment]
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {language === 'ar' ? item.label.ar : item.label.fr}
                </p>
              </div>
              {formData.cabinetEquipment?.[item.key as keyof typeof formData.cabinetEquipment] && (
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              )}
            </div>
          </SoundCard>
        ))}
      </div>
    </div>
  );
}
