import { Card } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';

interface ColorOption {
  id: string;
  patternColor: string;
  stripColor: string;
}

interface SalonStep7ColorProps {
  data: { selectedPattern?: string; selectedColor?: string };
  onChange: (data: { selectedColor: string }) => void;
}

export function SalonStep7Color({ data, onChange }: SalonStep7ColorProps) {
  const { t } = useLanguage();

  // الحصول على اللون المختار من الخطوة 6
  const selectedPatternColor = data.selectedPattern 
    ? getColorFromPattern(data.selectedPattern)
    : '#8B4513'; // لون افتراضي

  function getColorFromPattern(patternId: string): string {
    const colors = [
      '#8B4513', '#D2691E', '#CD853F', // صف 1 - بني
      '#DEB887', '#F5DEB3', '#FFE4B5', // صف 2 - بيج
      '#4A5568', '#718096', '#A0AEC0', // صف 3 - رمادي
      '#2D3748', '#1A202C', '#000000', // صف 4 - غامق
      '#F7FAFC', '#EDF2F7', '#E2E8F0', // صف 5 - فاتح
      '#742A2A', '#9B2C2C', '#C53030', // صف 6 - أحمر
      '#2C5282', '#2B6CB0', '#3182CE', // صف 7 - أزرق
      '#276749', '#2F855A', '#38A169', // صف 8 - أخضر
      '#744210', '#975A16', '#B7791F', // صف 9 - برتقالي
    ];
    const index = parseInt(patternId.split('-')[1]) - 1;
    return colors[index] || '#8B4513';
  }

  // 6 مستطيلات بنفس اللون مع خطوط مختلفة
  const colorOptions: ColorOption[] = [
    { id: 'color-1', patternColor: selectedPatternColor, stripColor: selectedPatternColor },
    { id: 'color-2', patternColor: selectedPatternColor, stripColor: selectedPatternColor },
    { id: 'color-3', patternColor: selectedPatternColor, stripColor: selectedPatternColor },
    { id: 'color-4', patternColor: selectedPatternColor, stripColor: selectedPatternColor },
    { id: 'color-5', patternColor: selectedPatternColor, stripColor: selectedPatternColor },
    { id: 'color-6', patternColor: selectedPatternColor, stripColor: selectedPatternColor },
  ];

  const handleColorSelect = (colorId: string) => {
    // ✅ نحافظ على البيانات الموجودة
    onChange({ ...data, selectedColor: colorId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step7.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step7.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {colorOptions.map((option, index) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              data.selectedColor === option.id
                ? 'border-2 border-amber-500 shadow-md'
                : 'border border-gray-200 hover:border-amber-300'
            }`}
            onClick={() => handleColorSelect(option.id)}
          >
            <div className="p-3">
              {/* المستطيل الرئيسي مع خطوط كاحل */}
              <div className="relative w-full h-40 rounded-lg mb-3 overflow-hidden transition-transform hover:scale-105"
                   style={{ backgroundColor: option.patternColor }}>
                {/* خطوط كاحل حسب الرقم */}
                <div className="absolute inset-x-0 bottom-2 space-y-1 px-2">
                  {Array.from({ length: index + 1 }).map((_, i) => (
                    <div key={i} className="h-0.5 w-full bg-black opacity-20 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              {/* الرقم */}
              <div className="text-center">
                <p className="text-lg font-bold text-gray-700">{index + 1}</p>
                {data.selectedColor === option.id && (
                  <div className="mt-1 flex justify-center">
                    <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          {t.salonSteps.step7.note}
        </p>
      </div>
    </div>
  );
}