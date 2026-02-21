import { useLanguage } from '../contexts/LanguageContext';
import { CompleteKitchenFormData } from '../types/kitchen';
import { SalonFormData } from '../types';
import { CheckCircle, Award, Shield, Star, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { RewardType } from './rewards/RewardWheel';

interface SuccessPageProps {
  submittedData: CompleteKitchenFormData | SalonFormData | null;
  handleBackToHome: () => void;
}

export function SuccessPage({ submittedData, handleBackToHome }: SuccessPageProps) {
  const { t, dir, language } = useLanguage();
  const { playSound } = useSoundEffects();
  const [appliedReward, setAppliedReward] = useState<RewardType | null>(null);
  
  // Load reward from localStorage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('success');
    
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
  }, [playSound]);
  
  const kitchenData = submittedData && 'kitchenDesign' in submittedData ? submittedData as CompleteKitchenFormData : null;
  const salonData = submittedData && 'salonType' in submittedData ? submittedData as SalonFormData : null;
  
  const canShowPrice = kitchenData?.canShowPrice || salonData?.canShowPrice || false;
  const estimatedPrice = kitchenData?.estimatedPrice || salonData?.estimatedPrice || 0;
  const customerName = kitchenData?.customerInfo?.fullName || salonData?.customerInfo?.fullName || '';
  const additionalNotes = kitchenData?.additionalInfo?.notes || salonData?.additionalNotes?.notes || '';

  // Calculate reward discount
  const getRewardDiscount = (reward: RewardType | null): number => {
    if (!reward) return 0;
    
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
      return Math.round(estimatedPrice * 0.07);
    } else if (reward === 'discount-10') {
      return Math.round(estimatedPrice * 0.10);
    }
    
    return baseDiscount;
  };

  const rewardDiscount = getRewardDiscount(appliedReward);
  const finalPrice = Math.max(0, estimatedPrice - rewardDiscount);
  
  // Check if reward is 3D kitchen study (special bonus, not a discount)
  const has3DKitchenReward = appliedReward === '3d-kitchen';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4" dir={dir}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Success Header - Modern & Professional */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-6 shadow-2xl">
                <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              {t.successPage.thankYou}
            </h1>
            
            {customerName && (
              <div className="mb-4">
                <p className="text-xl text-slate-600 mb-1">
                  {language === 'ar' ? 'السيد / السيدة' : language === 'fr' ? 'M. / Mme' : 'السيد / السيدة'}
                </p>
                <p className="text-3xl font-bold text-emerald-600">{customerName}</p>
              </div>
            )}
            
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t.successPage.thankYouMessage}
            </p>
          </div>
        </div>

        {/* Additional Notes */}
        {additionalNotes && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-slate-600" />
              </div>
              {t.successPage.yourNotes}
            </h3>
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed pl-13">
              {additionalNotes}
            </p>
          </div>
        )}

        {/* Price Section - Clean & Structured */}
        {canShowPrice && estimatedPrice > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              {t.successPage.estimatedPrice}
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Original Price */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">
                      {language === 'ar' ? 'السعر الأصلي' : language === 'fr' ? 'Prix original' : 'تمن لول'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {language === 'ar' ? 'قبل الخصم' : language === 'fr' ? 'Avant réduction' : 'قبل التخفيض'}
                    </p>
                  </div>
                  <p className="text-4xl font-bold text-slate-700" dir="ltr">
                    {estimatedPrice.toLocaleString('fr-FR')} <span className="text-xl text-slate-500">DH</span>
                  </p>
                </div>
              </div>

              {/* Reward Discount */}
              {rewardDiscount > 0 && (
                <div className="relative">
                  {/* Divider */}
                  <div className="flex items-center justify-center -my-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                      −
                    </div>
                  </div>
                  
                  {/* Reward Card */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-300 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                          <Award className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-amber-700 mb-1">
                            {language === 'ar' ? 'مكافأتك' : language === 'fr' ? 'Votre récompense' : 'l7sal ديالك'}
                          </p>
                          <p className="text-xl font-bold text-slate-900">
                            {getRewardLabel(appliedReward)}
                          </p>
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-amber-700" dir="ltr">
                        -{rewardDiscount.toLocaleString('fr-FR')} <span className="text-xl">DH</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Final Price */}
              <div className="relative">
                {rewardDiscount > 0 && (
                  <div className="flex items-center justify-center -my-3 mb-3">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                      =
                    </div>
                  </div>
                )}
                
                <div className={`rounded-2xl p-8 shadow-xl ${rewardDiscount > 0 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-slate-700 to-slate-800'}`}>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white/90 mb-2 uppercase tracking-wide">
                      {language === 'ar' ? 'السعر النهائي' : language === 'fr' ? 'Prix final' : 'تمن لخر'}
                    </p>
                    
                    <p className="text-6xl font-black text-white mb-4" dir="ltr">
                      {finalPrice.toLocaleString('fr-FR')} <span className="text-3xl">DH</span>
                    </p>
                    
                    {rewardDiscount > 0 && (
                      <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
                        <p className="text-sm font-bold text-white mb-1">
                          {language === 'ar' ? 'تم توفير' : language === 'fr' ? 'Économie réalisée' : 'ربحتي'}
                        </p>
                        <p className="text-2xl font-black text-white">
                          {rewardDiscount.toLocaleString('fr-FR')} DH
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3D Kitchen Study Bonus */}
        {has3DKitchenReward && (
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 border-2 border-indigo-400">
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-xl border border-white/30">
                <Award className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'مكافأة خاصة!' : language === 'fr' ? 'Récompense spéciale!' : 'مكافأة خاصة!'}
              </h3>
              
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-white rounded-xl px-8 py-5 inline-block mb-6">
                  <p className="text-sm font-semibold text-indigo-600 mb-2">
                    {language === 'ar' ? 'مكافأتك الإضافية' : language === 'fr' ? 'Votre bonus' : 'l7sal ديالك'}
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {getRewardLabel(appliedReward)}
                  </p>
                </div>
                
                <p className="text-lg text-white/95 leading-relaxed mb-6">
                  {language === 'ar' 
                    ? 'سيقوم فريقنا بإعداد دراسة ثلاثية الأبعاد (3D) احترافية لمطبخك المخصص مجاناً بقيمة 2,000 درهم! ستحصل على تصور واقعي لمطبخك قبل البدء في التنفيذ.' 
                    : language === 'fr' 
                    ? 'Notre équipe préparera une étude 3D professionnelle de votre cuisine personnalisée gratuitement d\'une valeur de 2 000 DH! Vous obtiendrez une visualisation réaliste de votre cuisine avant le début de la réalisation.'
                    : 'فريقنا غادي يديرلك واحد الدراسة 3D محترفة ديال كوزينة ديالك بلاش بقيمة 2,000 درهم! غاتشوف كوزينة ديالك قبل ما نبداو التنفيذ.'}
                </p>
                
                <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/30">
                  <p className="text-sm font-bold text-white/90 mb-1">
                    {language === 'ar' ? 'قيمة المكافأة' : language === 'fr' ? 'Valeur du bonus' : 'قيمة l7sal'}
                  </p>
                  <p className="text-3xl font-black text-white">
                    2,000 DH
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why Graphitube - Professional Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              {t.successPage.whyGraphitube}
            </h3>
            <p className="text-slate-600 text-lg">
              {t.successPage.whyGraphitubeSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Quality */}
            <div className="group p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">{t.successPage.quality}</h4>
              <p className="text-slate-600 leading-relaxed">{t.successPage.qualityDesc}</p>
            </div>

            {/* Experience */}
            <div className="group p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">{t.successPage.experience}</h4>
              <p className="text-slate-600 leading-relaxed">{t.successPage.experienceDesc}</p>
            </div>

            {/* Guarantee */}
            <div className="group p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">{t.successPage.guarantee}</h4>
              <p className="text-slate-600 leading-relaxed">{t.successPage.guaranteeDesc}</p>
            </div>

            {/* Team */}
            <div className="group p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">{t.successPage.team}</h4>
              <p className="text-slate-600 leading-relaxed">{t.successPage.teamDesc}</p>
            </div>

            {/* Customization */}
            <div className="group p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">{t.successPage.customization}</h4>
              <p className="text-slate-600 leading-relaxed">{t.successPage.customizationDesc}</p>
            </div>

            {/* Pricing */}
            <div className="group p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">{t.successPage.pricing}</h4>
              <p className="text-slate-600 leading-relaxed">{t.successPage.pricingDesc}</p>
            </div>

          </div>
        </div>

        {/* Back to Home - Professional Button */}
        <div className="text-center pt-6">
          <button
            onClick={handleBackToHome}
            className="bg-slate-900 text-white px-12 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t.common.backToHome}
          </button>
        </div>
        
      </div>
    </div>
  );
}
