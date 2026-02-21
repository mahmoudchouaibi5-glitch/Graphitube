import { Card } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { DecorationPattern } from '../../types';

interface SalonStep6DecorationProps {
  data: { selectedPattern?: string; selectedColor?: string };
  onChange: (data: { selectedPattern: string }) => void;
}

export function SalonStep6Decoration({ data, onChange }: SalonStep6DecorationProps) {
  const { t } = useLanguage();

  // 27 مستطيل (9 صفوف × 3 أعمدة)
  const decorationPatterns: DecorationPattern[] = Array.from({ length: 27 }, (_, i) => ({
    id: `ref-${i + 1}`,
    color: getColorForPattern(i),
    selected: data.selectedPattern === `ref-${i + 1}`,
  }));

  function getColorForPattern(index: number): string {
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
    return colors[index] || '#CBD5E0';
  }

  const handlePatternSelect = (patternId: string) => {
    // ✅ نحافظ على البيانات الموجودة
    onChange({ ...data, selectedPattern: patternId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step6.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step6.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {decorationPatterns.map((pattern) => (
          <Card
            key={pattern.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              pattern.selected
                ? 'border-2 border-amber-500 shadow-md'
                : 'border border-gray-200 hover:border-amber-300'
            }`}
            onClick={() => handlePatternSelect(pattern.id)}
          >
            <div className="p-3">
              <div
                className="w-full h-24 rounded-lg mb-2 transition-transform hover:scale-105"
                style={{ backgroundColor: pattern.color }}
              />
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700">Ref</p>
                {pattern.selected && (
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

      {/* عرض اللون المختار */}
      {data.selectedColor && (
        <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
          <p className="text-sm font-semibold text-amber-900 mb-2">
            {t.salonSteps.step6.selectedColorLabel || 'اللون المختار'}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg border-2 border-amber-500 shadow-sm" style={{ backgroundColor: '#8B4513' }}>
              {/* عرض عدد الخطوط المختارة */}
              <div className="h-full flex flex-col justify-end p-1 space-y-0.5">
                {Array.from({ length: parseInt(data.selectedColor.split('-')[1]) || 1 }).map((_, i) => (
                  <div key={i} className="h-0.5 w-full bg-black opacity-20 rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-medium">{t.salonSteps.step7.title || 'اللون'}</p>
              <p className="text-xs text-gray-500">
                {data.selectedColor.split('-')[1]} {t.salonSteps.step6.linesLabel || 'خطوط'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}