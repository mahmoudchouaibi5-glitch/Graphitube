import { CompleteKitchenFormData } from '../../../types/kitchen';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Check, AlertTriangle, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { RewardType } from '../../rewards/RewardWheel';

interface Step19Props {
  data: CompleteKitchenFormData;
}

export function Step19Confirmation({ data }: Step19Props) {
  const { t, dir, language } = useLanguage();

  const getDesignTypeName = (type: string) => {
    const types: Record<string, string> = {
      straight: t.kitchenSteps.step2.straight,
      'l-shape': t.kitchenSteps.step2.lShape,
      'u-shape': t.kitchenSteps.step2.uShape,
      'g-shape': t.kitchenSteps.step2.gShape,
      island: t.kitchenSteps.step2.island,
      other: t.kitchenSteps.step2.other,
    };
    return types[type] || type;
  };

  const getWoodTypeName = (type: string) => {
    const types: Record<string, string> = {
      melamine: t.kitchenSteps.step8.melamine,
      mdf: t.kitchenSteps.step8.mdf,
      hdf: t.kitchenSteps.step8.hdf,
      multiplex: t.kitchenSteps.step8.multiplex,
      natural: t.kitchenSteps.step8.natural,
    };
    return types[type] || type;
  };

  const [appliedReward, setAppliedReward] = useState<RewardType | null>(null);

  // Load reward from localStorage
  useEffect(() => {
    const savedReward = localStorage.getItem('graphitube_reward');
    
    if (savedReward) {
      try {
        const { reward, timestamp } = JSON.parse(savedReward);
        const now = Date.now();
        const fortyEightHours = 48 * 60 * 60 * 1000;
        
        if (now - timestamp < fortyEightHours && reward !== 'spin-again') {
          setAppliedReward(reward);
        }
      } catch (error) {
        console.error('Error loading reward:', error);
      }
    }
  }, []);

  // Calculate reward discount
  const getRewardDiscount = (reward: RewardType | null): number => {
    if (!reward || !data.estimatedPrice) return 0;
    
    const discounts: Record<RewardType, number> = {
      'voucher-500': 500,
      'voucher-1000': 1000,
      'discount-7': 0,
      'discount-10': 0,
      '3d-kitchen': 0,
      'spin-again': 0,
    };
    
    const baseDiscount = discounts[reward] || 0;
    
    if (reward === 'discount-7') {
      return Math.round(data.estimatedPrice * 0.07);
    } else if (reward === 'discount-10') {
      return Math.round(data.estimatedPrice * 0.10);
    }
    
    return baseDiscount;
  };

  // Get reward label
  const getRewardLabel = (reward: RewardType | null): string => {
    if (!reward) return '';
    
    if (language === 'ar') {
      const labels: Record<RewardType, string> = {
        'voucher-500': 'قسيمة 500 درهم',
        'voucher-1000': 'قسيمة 1,000 درهم',
        'discount-7': 'خصم 7%',
        'discount-10': 'خصم 10%',
        '3d-kitchen': 'دراسة 3D مجانية',
        'spin-again': '',
      };
      return labels[reward] || '';
    } else if (language === 'fr') {
      const labels: Record<RewardType, string> = {
        'voucher-500': 'Bon de 500 DH',
        'voucher-1000': 'Bon de 1,000 DH',
        'discount-7': 'Réduction 7%',
        'discount-10': 'Réduction 10%',
        '3d-kitchen': 'Étude 3D gratuite',
        'spin-again': '',
      };
      return labels[reward] || '';
    } else {
      const labels: Record<RewardType, string> = {
        'voucher-500': 'بون 500 درهم',
        'voucher-1000': 'بون 1,000 درهم',
        'discount-7': 'تخفيض 7%',
        'discount-10': 'تخفيض 10%',
        '3d-kitchen': 'دراسة 3D بلاش',
        'spin-again': '',
      };
      return labels[reward] || '';
    }
  };

  const rewardDiscount = getRewardDiscount(appliedReward);
  const finalPrice = data.estimatedPrice ? Math.max(0, data.estimatedPrice - rewardDiscount) : 0;

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step19.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step19.subtitle}</p>
      </div>

      {/* Customer Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.kitchenSteps.step19.customerInfo}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t.kitchenSteps.step19.name}</span>
            <span className="font-medium text-gray-900">{data.customerInfo.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t.kitchenSteps.step19.phone}</span>
            <span className="font-medium text-gray-900" dir="ltr">{data.customerInfo.phone}</span>
          </div>
          {data.customerInfo.city && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t.kitchenSteps.step19.city}</span>
              <span className="font-medium text-gray-900">{data.customerInfo.city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Kitchen Design */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.kitchenSteps.step19.kitchenDesign}
        </h3>
        <p className="text-sm font-medium text-gray-900">
          {getDesignTypeName(data.kitchenDesign.type)}
        </p>
        {data.kitchenDesign.customDescription && (
          <p className="text-sm text-gray-600 mt-2">{data.kitchenDesign.customDescription}</p>
        )}
      </div>

      {/* Work Scope */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.kitchenSteps.step19.workScope}
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.workScope.complete && (
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {t.kitchenSteps.step19.completeProject}
            </span>
          )}
          {!data.workScope.complete && (
            <>
              {data.workScope.wood && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.wood}</span>}
              {data.workScope.marble && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.marble}</span>}
              {data.workScope.tiles && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.tiles}</span>}
              {data.workScope.electrical && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.electrical}</span>}
              {data.workScope.plumbing && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.plumbing}</span>}
              {data.workScope.painting && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.painting}</span>}
              {data.workScope.gypsum && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{t.kitchenSteps.step5.gypsum}</span>}
            </>
          )}
        </div>
      </div>

      {/* Wood Type */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.kitchenSteps.step19.woodType}
        </h3>
        <p className="text-sm font-medium text-gray-900">
          {getWoodTypeName(data.woodType.material)}
        </p>
      </div>

      {/* Door System */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {t.kitchenSteps.step19.doorSystem}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t.kitchenSteps.step19.installation}</span>
            <span className="font-medium text-gray-900">
              {data.doorSystem?.installation === 'inset' ? t.kitchenSteps.step19.insetInstallation : t.kitchenSteps.step19.overlayInstallation}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t.kitchenSteps.step19.finish}</span>
            <span className="font-medium text-gray-900">
              {data.doorSystem?.finish === 'glossy' ? t.kitchenSteps.step19.glossyFinish : t.kitchenSteps.step19.matteFinish}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t.kitchenSteps.step19.hingeType}</span>
            <span className="font-medium text-gray-900">{data.doorSystem?.hingeType || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t.kitchenSteps.step19.handleType}</span>
            <span className="font-medium text-gray-900">{data.doorSystem?.handleType || '-'}</span>
          </div>
        </div>
      </div>

      {/* 3D Design */}
      {data.design3D?.wants3D && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">{t.kitchenSteps.step19.design3DRequested}</h3>
          <p className="text-sm text-blue-800">
            {t.kitchenSteps.step19.design3DRequestedDesc}
          </p>
        </div>
      )}

      {/* Price Breakdown - عرض واضح للسعر */}
      {data.canShowPrice && data.estimatedPrice && data.estimatedPrice > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            {t.kitchenSteps.step19.estimatedPrice}
          </h3>
          
          <div className="max-w-lg mx-auto space-y-4">
            
            {/* Original Price - رمادي */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
              <div>
                <div className="text-sm font-semibold text-gray-500 mb-1">
                  {language === 'ar' ? 'السعر الأصلي' : language === 'fr' ? 'Prix original' : 'تمن لول'}
                </div>
                <div className="text-xs text-gray-400">
                  {language === 'ar' ? 'قبل الخصم' : language === 'fr' ? 'Avant réduction' : 'قبل التخفيض'}
                </div>
              </div>
              <div className="text-3xl font-black text-gray-700" dir="ltr">
                {data.estimatedPrice.toLocaleString('fr-FR')} <span className="text-xl text-gray-500">DH</span>
              </div>
            </div>

            {/* Reward Discount - برتقالي gradient */}
            {rewardDiscount > 0 && (
              <>
                {/* Minus Icon */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-black shadow-md">
                    −
                  </div>
                </div>
                
                {/* Reward Card */}
                <div className="relative overflow-hidden rounded-xl border-2 border-orange-400 shadow-lg">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-200 to-amber-100"></div>
                  
                  {/* Sparkles Effect */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(251,146,60,0.4),transparent_50%)]"></div>
                  
                  <div className="relative flex items-center justify-between p-5">
                    <div className="flex items-center gap-3">
                      {/* Award Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-orange-700 mb-1">
                          {language === 'ar' ? '🎁 مكافأتك' : language === 'fr' ? '🎁 Votre récompense' : '🎁 l7sal ديالك'}
                        </div>
                        <div className="text-lg font-black text-orange-900">
                          {getRewardLabel(appliedReward)}
                        </div>
                      </div>
                    </div>
                    <div className="text-3xl font-black text-orange-700" dir="ltr">
                      -{rewardDiscount.toLocaleString('fr-FR')} <span className="text-xl">DH</span>
                    </div>
                  </div>
                </div>

                {/* Equals Icon */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-2xl font-black shadow-md">
                    =
                  </div>
                </div>
              </>
            )}

            {/* Final Price - أخضر أو أزرق gradient */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Gradient Background */}
              <div className={`absolute inset-0 ${rewardDiscount > 0 ? 'bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100' : 'bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100'}`}></div>
              
              {/* Border Effect */}
              <div className={`absolute inset-0 border-2 ${rewardDiscount > 0 ? 'border-green-400' : 'border-blue-400'} rounded-2xl`}></div>
              
              <div className="relative p-7">
                <div className="text-center">
                  <div className={`text-sm font-black mb-3 uppercase tracking-wider ${rewardDiscount > 0 ? 'text-green-700' : 'text-blue-700'}`}>
                    {language === 'ar' ? '✨ السعر النهائي ✨' : language === 'fr' ? '✨ Prix final ✨' : '✨ تمن لخر ✨'}
                  </div>
                  
                  {/* Price with animated gradient */}
                  <div className={`text-5xl font-black mb-4 ${rewardDiscount > 0 ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-blue-600 to-indigo-700'} bg-clip-text text-transparent`} dir="ltr">
                    {finalPrice.toLocaleString('fr-FR')} <span className="text-3xl">DH</span>
                  </div>
                  
                  {/* Savings Badge */}
                  {rewardDiscount > 0 && (
                    <div className="inline-block">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-4 rounded-2xl shadow-xl">
                        <div className="text-sm font-bold mb-1">
                          {language === 'ar' ? '🎉 مبروك! وفرت' : language === 'fr' ? '🎉 Félicitations! Économie' : '🎉 مبروك! ربحتي'}
                        </div>
                        <div className="text-2xl font-black">
                          {rewardDiscount.toLocaleString('fr-FR')} DH
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800 leading-relaxed">
                {t.kitchenSteps.step19.estimatedPriceNote}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Price Notice */}
      {!data.canShowPrice && data.priceBlockReasons && data.priceBlockReasons.length > 0 && (
        <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-orange-900 mb-2">{t.kitchenSteps.step19.priceNoticeTitle}</h3>
            <p className="text-sm text-orange-900 mb-3">
              {t.kitchenSteps.step19.priceNoticeDesc}
            </p>
            <ul className="text-sm text-orange-900 space-y-1">
              {data.priceBlockReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-orange-900 mt-3 font-medium">
              {t.kitchenSteps.step19.priceNoticeContact}
            </p>
          </div>
        </div>
      )}

      {/* Why No Automatic Pricing - Explanation */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-300 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-lg mb-1">
              {t.kitchenSteps.step19.pricingExplanationTitle}
            </h3>
            <p className="text-sm text-indigo-800">
              {t.kitchenSteps.step19.pricingExplanationSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Standard Options - Auto Price */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">✅</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-green-900 mb-2 text-base">{t.kitchenSteps.step19.standardOptionsTitle}</h4>
                <p className="text-sm text-green-800 leading-relaxed">
                  {t.kitchenSteps.step19.standardOptionsDesc}
                </p>
                <div className="mt-2 bg-white/60 rounded p-2 text-xs text-green-900">
                  {t.kitchenSteps.step19.standardOptionsNote}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Options - No Auto Price */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⏸️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-orange-900 mb-2 text-base">{t.kitchenSteps.step19.customOptionsTitle}</h4>
                <p className="text-sm text-orange-800 leading-relaxed mb-2">
                  {t.kitchenSteps.step19.customOptionsDesc}
                </p>
                <ul className="text-sm text-orange-900 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">🎨</span>
                    <span>{t.kitchenSteps.step19.customOptionsMarble}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">📐</span>
                    <span>{t.kitchenSteps.step19.customOptions3D}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">🛠️</span>
                    <span>{t.kitchenSteps.step19.customOptionsMaterials}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">✨</span>
                    <span>{t.kitchenSteps.step19.customOptionsDesigns}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why This Approach */}
          <div className="bg-white/60 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t.kitchenSteps.step19.whyThisApproachTitle}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t.kitchenSteps.step19.whyThisApproachDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-white/60 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">⭐</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t.kitchenSteps.step19.qualityGuaranteeTitle}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t.kitchenSteps.step19.qualityGuaranteeDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
          <p className="text-sm leading-relaxed">
            <strong>{t.kitchenSteps.step19.nextStepTitle}</strong>
            <br />
            {!data.canShowPrice ? t.kitchenSteps.step19.nextStepCustom : t.kitchenSteps.step19.nextStepStandard}
          </p>
        </div>
      </div>

      {/* Final Message */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-3 text-center text-lg">
          {t.kitchenSteps.step19.readyToSendTitle}
        </h3>
        <p className="text-sm text-gray-700 text-center leading-relaxed">
          {t.kitchenSteps.step19.readyToSendDesc}
        </p>
      </div>
    </div>
  );
}