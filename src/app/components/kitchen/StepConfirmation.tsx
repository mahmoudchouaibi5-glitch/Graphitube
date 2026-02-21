import { KitchenFormData } from '../../types';
import { Check } from 'lucide-react';

interface StepConfirmationProps {
  data: KitchenFormData;
}

export function StepConfirmation({ data }: StepConfirmationProps) {
  const getKitchenTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'straight': 'مطبخ مستقيم (I)',
      'l-shape': 'مطبخ على شكل حرف L',
      'u-shape': 'مطبخ على شكل حرف U',
      'g-shape': 'مطبخ على شكل حرف G',
      'island': 'مطبخ مستقيم مع جزيرة',
      'other': 'تصميم آخر',
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">مراجعة المعلومات</h2>
        <p className="text-gray-600">تحقق من المعلومات قبل الإرسال</p>
      </div>

      <div className="space-y-4">
        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">1</div>
            معلومات العميل
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">الاسم:</dt>
              <dd className="font-medium text-gray-900">{data.customerInfo?.fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">الهاتف:</dt>
              <dd className="font-medium text-gray-900">{data.customerInfo?.phone}</dd>
            </div>
            {data.customerInfo?.address && (
              <div className="flex justify-between">
                <dt className="text-gray-600">العنوان:</dt>
                <dd className="font-medium text-gray-900">{data.customerInfo.address}</dd>
              </div>
            )}
            {data.customerInfo?.city && (
              <div className="flex justify-between">
                <dt className="text-gray-600">المدينة:</dt>
                <dd className="font-medium text-gray-900">{data.customerInfo.city}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Kitchen Design */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">2</div>
            تصميم المطبخ
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">النوع:</dt>
              <dd className="font-medium text-gray-900">
                {getKitchenTypeLabel(data.kitchenDesign?.type || '')}
              </dd>
            </div>
            {data.kitchenDesign?.type === 'other' && data.kitchenDesign?.customDescription && (
              <div>
                <dt className="text-gray-600 mb-1">الوصف:</dt>
                <dd className="font-medium text-gray-900 bg-white p-3 rounded">
                  {data.kitchenDesign.customDescription}
                </dd>
              </div>
            )}
            {data.kitchenDesign?.type !== 'other' && (
              <>
                {data.kitchenDesign?.side1 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">الضلع الأول:</dt>
                    <dd className="font-medium text-gray-900">{data.kitchenDesign.side1} متر</dd>
                  </div>
                )}
                {data.kitchenDesign?.side2 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">الضلع الثاني:</dt>
                    <dd className="font-medium text-gray-900">{data.kitchenDesign.side2} متر</dd>
                  </div>
                )}
                {data.kitchenDesign?.side3 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">الضلع الثالث:</dt>
                    <dd className="font-medium text-gray-900">{data.kitchenDesign.side3} متر</dd>
                  </div>
                )}
                {data.kitchenDesign?.side4 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">امتداد حرف G:</dt>
                    <dd className="font-medium text-gray-900">{data.kitchenDesign.side4} متر</dd>
                  </div>
                )}
                {data.kitchenDesign?.islandLength && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">طول الجزيرة:</dt>
                    <dd className="font-medium text-gray-900">{data.kitchenDesign.islandLength} متر</dd>
                  </div>
                )}
                {data.kitchenDesign?.islandWidth && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">عرض الجزيرة:</dt>
                    <dd className="font-medium text-gray-900">{data.kitchenDesign.islandWidth} متر</dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <p className="text-sm text-blue-900 leading-relaxed">
          بعد إرسال هذا الطلب، سيقوم فريق Graphitube بمراجعة جميع التفاصيل والتواصل معكم
          لتأكيد المعلومات وتقديم عرض الثمن النهائي.
        </p>
      </div>
    </div>
  );
}
