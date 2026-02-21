import { SalonFormData } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Check } from 'lucide-react';

interface SalonStep8SummaryProps {
  data: SalonFormData;
}

export function SalonStep8Summary({ data }: SalonStep8SummaryProps) {
  const { t, dir } = useLanguage();

  const getProjectTypeName = (type: string) => {
    const types: Record<string, string> = {
      'l-shape': t.salonSteps.step2?.lShape || 'صالون L',
      'u-shape': t.salonSteps.step2?.uShape || 'صالون U',
      'g-shape': t.salonSteps.step2?.gShape || 'صالون G',
      square: t.salonSteps.step2?.square || 'صالون مربع',
      'rectangular-open': t.salonSteps.step2?.rectangularOpen || 'صالون مستطيل مفتوح رقم 1',
      'rectangular-closed': t.salonSteps.step2?.rectangularClosed || 'صالون مستطيل مفتوح رقم 2',
      'custom-design': t.salonSteps.step2?.customDesign || 'تصميم مخصص',
    };
    return types[type] || type;
  };

  const getColorFromPattern = (patternId: string): string => {
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
  };

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step8.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step8.subtitle}</p>
      </div>

      {/* معلومات العميل */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.salonSteps.step8.customerInfo}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t.salonSteps.step8.name}</span>
            <span className="font-medium text-gray-900">{data.customerInfo.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t.salonSteps.step8.phone}</span>
            <span className="font-medium text-gray-900" dir="ltr">{data.customerInfo.phone}</span>
          </div>
          {data.customerInfo.city && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t.salonSteps.step8.city}</span>
              <span className="font-medium text-gray-900">{data.customerInfo.city}</span>
            </div>
          )}
        </div>
      </div>

      {/* نوع المشروع */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.salonSteps.step8.projectType}
        </h3>
        <p className="text-sm font-medium text-gray-900">
          {getProjectTypeName(data.salonType.type)}
        </p>
        {data.salonType.customDesignImage && (
          <p className="text-sm text-gray-600 mt-2">{t.salonSteps.step2.customDesign}</p>
        )}
      </div>

      {/* الأبعاد */}
      {data.salonType && data.salonType.type !== 'custom-design' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            {t.salonSteps.step8.dimensions}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.salonType.wallLength1 && (
              <div className="bg-gray-50 rounded p-3">
                <span className="text-gray-600 block mb-1">{t.salonSteps.step3.wall1}</span>
                <span className="font-medium text-gray-900">{data.salonType.wallLength1} {t.salonSteps.step8.meters}</span>
              </div>
            )}
            {data.salonType.wallLength2 && (
              <div className="bg-gray-50 rounded p-3">
                <span className="text-gray-600 block mb-1">
                  {data.salonType.type === 'u-shape' ? t.salonSteps.step3.wall2Middle : t.salonSteps.step3.wall2}
                </span>
                <span className="font-medium text-gray-900">{data.salonType.wallLength2} {t.salonSteps.step8.meters}</span>
              </div>
            )}
            {data.salonType.wallLength3 && (
              <div className="bg-gray-50 rounded p-3">
                <span className="text-gray-600 block mb-1">{t.salonSteps.step3.wall3}</span>
                <span className="font-medium text-gray-900">{data.salonType.wallLength3} {t.salonSteps.step8.meters}</span>
              </div>
            )}
            {data.salonType.wallLength4 && (
              <div className="bg-gray-50 rounded p-3">
                <span className="text-gray-600 block mb-1">{t.salonSteps.step3.wall4}</span>
                <span className="font-medium text-gray-900">{data.salonType.wallLength4} {t.salonSteps.step8.meters}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* عناصر الخشب */}
      {data.woodElements && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            {t.salonSteps.step4.title}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.woodElements.largeTables > 0 && (
              <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                <span className="text-gray-600">{t.salonSteps.step4.largeTables}</span>
                <span className="font-bold text-gray-900 text-lg">{data.woodElements.largeTables}</span>
              </div>
            )}
            {data.woodElements.sundries > 0 && (
              <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                <span className="text-gray-600">{t.salonSteps.step4.sundries}</span>
                <span className="font-bold text-gray-900 text-lg">{data.woodElements.sundries}</span>
              </div>
            )}
            {data.woodElements.sidePanels > 0 && (
              <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                <span className="text-gray-600">{t.salonSteps.step4.sidePanels}</span>
                <span className="font-bold text-gray-900 text-lg">{data.woodElements.sidePanels}</span>
              </div>
            )}
            {data.woodElements.verticalShapes > 0 && (
              <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                <span className="text-gray-600">{t.salonSteps.step4.verticalShapes}</span>
                <span className="font-bold text-gray-900 text-lg">{data.woodElements.verticalShapes}</span>
              </div>
            )}
            {data.woodElements.verticalCorners > 0 && (
              <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                <span className="text-gray-600">{t.salonSteps.step4.verticalCorners}</span>
                <span className="font-bold text-gray-900 text-lg">{data.woodElements.verticalCorners}</span>
              </div>
            )}
          </div>
          {/* إذا كل العناصر 0 */}
          {!data.woodElements.largeTables && 
           !data.woodElements.sundries && 
           !data.woodElements.sidePanels && 
           !data.woodElements.verticalShapes && 
           !data.woodElements.verticalCorners && (
            <p className="text-sm text-gray-500 italic">لم يتم اختيار عناصر خشبية</p>
          )}
        </div>
      )}

      {/* نطاق العمل */}
      {data.workScope && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            {t.salonSteps.step8.workScope}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.workScope.complete && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                {t.salonSteps.step8.completeProject}
              </span>
            )}
            {!data.workScope.complete && (
              <>
                {data.workScope.wood && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.salonSteps.step8?.wood || 'الخشب'}</span>}
                {data.workScope.marble && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.salonSteps.step8?.marble || 'الرخام'}</span>}
                {data.workScope.tiles && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.salonSteps.step8?.tiles || 'الزليج'}</span>}
                {data.workScope.painting && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.salonSteps.step8?.painting || 'الصباغة'}</span>}
                {data.workScope.gypsum && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.salonSteps.step8?.gypsum || 'الجبس'}</span>}
              </>
            )}
          </div>
        </div>
      )}

      {/* الزخرفة واللون */}
      {data.selectedPattern && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            {t.salonSteps.step8.decorationAndColor}
          </h3>
          <div className="space-y-3">
            {/* عرض الزخرفة */}
            <div className="flex items-center gap-3">
              <div 
                className="w-20 h-20 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: getColorFromPattern(data.selectedPattern) }}
              />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{t.salonSteps.step8.selectedPattern}</p>
                <p className="text-gray-600">{data.selectedPattern}</p>
              </div>
            </div>
            
            {/* عرض اللون مع الخطوط */}
            {data.selectedColor && (
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <div 
                  className="w-20 h-20 rounded-lg border-2 border-amber-500 shadow-sm relative"
                  style={{ backgroundColor: getColorFromPattern(data.selectedPattern) }}
                >
                  {/* عرض عدد الخطوط المختارة */}
                  <div className="absolute inset-x-0 bottom-1 px-1 space-y-0.5">
                    {Array.from({ length: parseInt(data.selectedColor.split('-')[1]) || 1 }).map((_, i) => (
                      <div key={i} className="h-0.5 w-full bg-black opacity-20 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{t.salonSteps.step8.selectedColor}</p>
                  <p className="text-gray-600">
                    {data.selectedColor.split('-')[1]} {t.salonSteps.step8.linesCount}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نوع الخشب */}
      {data.woodType && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            {t.salonSteps.step8.woodType}
          </h3>
          <p className="text-sm font-medium text-gray-900">
            {data.woodType === 'chene' && (t.salonSteps.step5?.chene || 'خشب الشان')}
            {data.woodType === 'noyer' && (t.salonSteps.step5?.noyer || 'خشب الجوز')}
            {data.woodType === 'laitre' && (t.salonSteps.step5?.laitre || 'خشب الليدر')}
          </p>
        </div>
      )}

      {/* ملاحظات إضافية */}
      {data.additionalNotes && data.additionalNotes.notes && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Check className="w-5 h-5 text-blue-600" />
            {t.salonSteps.step8.additionalNotes}
          </h3>
          <p className="text-sm text-blue-900 whitespace-pre-wrap">{data.additionalNotes.notes}</p>
        </div>
      )}

      {/* رسالة نهائية */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-3 text-center text-lg">
          {t.salonSteps.step8.readyToSendTitle}
        </h3>
        <p className="text-sm text-gray-700 text-center leading-relaxed">
          {t.salonSteps.step8.readyToSendDesc}
        </p>
      </div>
    </div>
  );
}