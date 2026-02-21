import { FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../../types/kitchen';

interface KitchenStep18SummaryProps {
  formData: Partial<CompleteKitchenFormData>;
  calculatePrice: () => { basePrice: number; canShowPrice: boolean; priceBlockReasons: string[] };
}

export function KitchenStep18Summary({ formData, calculatePrice }: KitchenStep18SummaryProps) {
  const { language } = useLanguage();
  const { basePrice, canShowPrice } = calculatePrice();

  const getDesignLabel = (type: string) => {
    const labels: { [key: string]: { ar: string; fr: string } } = {
      'straight': { ar: 'مطبخ مستقيم (I)', fr: 'Cuisine droite (I)' },
      'l-shape': { ar: 'مطبخ على شكل L', fr: 'Cuisine en L' },
      'u-shape': { ar: 'مطبخ على شكل U', fr: 'Cuisine en U' },
      'g-shape': { ar: 'مطبخ على شكل G', fr: 'Cuisine en G' },
      'island': { ar: 'مطبخ مع جزيرة', fr: 'Cuisine avec îlot' },
      'other': { ar: 'تصميم آخر', fr: 'Autre design' },
    };
    return labels[type] ? (language === 'ar' ? labels[type].ar : labels[type].fr) : type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-lg">
          <FileText className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'ملخص الطلب' : 'Résumé de la demande'}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? 'راجع طلبك قبل الإرسال' : 'Vérifiez votre demande avant envoi'}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        {/* معلومات العميل */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {language === 'ar' ? 'معلومات العميل' : 'Informations client'}
          </h3>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>{language === 'ar' ? 'الاسم:' : 'Nom:'}</strong> {formData.customerInfo?.fullName}</p>
            <p><strong>{language === 'ar' ? 'الهاتف:' : 'Téléphone:'}</strong> {formData.customerInfo?.phone}</p>
            {formData.customerInfo?.city && (
              <p><strong>{language === 'ar' ? 'المدينة:' : 'Ville:'}</strong> {formData.customerInfo.city}</p>
            )}
          </div>
        </div>

        {/* تصميم المطبخ */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {language === 'ar' ? 'التصميم' : 'Design'}
          </h3>
          <p className="text-sm text-gray-700">
            {getDesignLabel(formData.kitchenDesign?.type || '')}
          </p>
        </div>

        {/* نوع الخشب */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {language === 'ar' ? 'نوع الخشب' : 'Type de bois'}
          </h3>
          <p className="text-sm text-gray-700">
            {formData.woodType?.material.toUpperCase()}
          </p>
        </div>

        {/* نطاق الأعمال */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {language === 'ar' ? 'نطاق الأعمال' : 'Portée des travaux'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.workScope?.wood && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'خشب' : 'Bois'}
              </span>
            )}
            {formData.workScope?.marble && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'رخام' : 'Marbre'}
              </span>
            )}
            {formData.workScope?.tiles && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'سيراميك' : 'Carrelage'}
              </span>
            )}
            {formData.workScope?.electrical && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'كهرباء' : 'Électricité'}
              </span>
            )}
            {formData.workScope?.plumbing && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'سباكة' : 'Plomberie'}
              </span>
            )}
            {formData.workScope?.painting && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'دهان' : 'Peinture'}
              </span>
            )}
            {formData.workScope?.gypsum && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {language === 'ar' ? 'جبس' : 'Plâtre'}
              </span>
            )}
          </div>
        </div>

        {/* 3D Design */}
        {formData.design3D?.wants3D && (
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'تصميم 3D مجاني مطلوب' : 'Design 3D gratuit demandé'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Price Estimate (if applicable) */}
      {canShowPrice && basePrice > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'تقدير مبدئي للسعر' : 'Estimation préliminaire'}
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {basePrice.toLocaleString()} {language === 'ar' ? 'درهم' : 'DH'}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {language === 'ar'
              ? 'هذا تقدير مبدئي. السعر النهائي سيتم تحديده بعد الاستشارة المجانية والقياس الدقيق.'
              : 'Ceci est une estimation préliminaire. Le prix final sera déterminé après consultation et mesure précise.'}
          </p>
        </div>
      )}

      {/* Final Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          {language === 'ar'
            ? '✨ سيتم التواصل معك خلال 24 ساعة لتحديد موعد الاستشارة المجانية والقياس الدقيق.'
            : '✨ Nous vous contacterons dans les 24 heures pour planifier une consultation gratuite et des mesures précises.'}
        </p>
      </div>
    </div>
  );
}
