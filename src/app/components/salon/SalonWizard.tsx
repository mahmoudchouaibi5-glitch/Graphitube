import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { ArrowRight, ArrowLeft, Home, MessageCircle, Loader2 } from 'lucide-react';
import { ProgressIndicator } from '../ProgressIndicator';
import { Step1CustomerInfo } from '../kitchen/Step1CustomerInfo';
import { SalonStep2Type } from './SalonStep2Type';
import { SalonStep3Dimensions } from './SalonStep3Dimensions';
import { SalonStep4WoodElements } from './SalonStep4WoodElements';
import { SalonStep5WoodType } from './SalonStep5WoodType';
import { SalonStep6Decoration } from './SalonStep6Decoration';
import { SalonStep7Color } from './SalonStep7Color';
import { SalonStep8Summary } from './SalonStep8Summary';
import { SalonFormData } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImage from 'figma:asset/6f91f3b908b32fa8844a582da8663295bc35c793.png';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { getStepFromPath, getUrlFromStep } from '../../utils/routeHelpers';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface SalonWizardProps {
  onSubmit: (data: SalonFormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function SalonWizard({ onSubmit, onBack, isSubmitting = false }: SalonWizardProps) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound } = useSoundEffects();
  
  // 🔍 DEBUG: Log isSubmitting changes
  console.log('🔄 SalonWizard render - isSubmitting:', isSubmitting);
  
  // 🔄 Redirect to step 1 on page refresh
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      console.log('🔄 Page reloaded - redirecting to step 1');
      navigate(getUrlFromStep(1, 'salon'), { replace: true });
    }
  }, []); // Empty dependency array - runs only once on mount
  
  // ✅ Track the maximum step reached for progress indicator coloring (NO localStorage)
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  
  // ✅ Initialize state without localStorage
  const [formData, setFormData] = useState<Partial<SalonFormData>>(() => {
    console.log('🏗️ [SalonWizard] Initializing state...');
    
    // Default initial state if no saved data
    console.log('🆕 [SalonWizard] Using default initial state');
    return {
      projectType: 'salon',
      customerInfo: {
        fullName: '',
        phone: '',
        address: '',
        city: '',
      },
      salonType: {
        type: 'l-shape',
      },
      woodElements: {
        largeTables: 0,
        sundries: 0,
        sidePanels: 0,
        verticalShapes: 0,
        verticalCorners: 0,
      },
      woodType: 'chene',
      selectedPattern: '',
      selectedColor: '',
      wallDecoration: [],
      sideFinish: {
        design: '',
        color: '',
      },
      hasPlans: false,
    };
  });
  
  // Get current step from URL (calculated on every render, but doesn't reset state)
  const currentStep = getStepFromPath(location.pathname, 'salon');
  
  console.log('🔍 [SalonWizard] Current step:', currentStep, 'Path:', location.pathname);

  const totalSteps = 8;

  // Force re-render when location changes
  useEffect(() => {
    console.log('📍 [SalonWizard] Location changed:', location.pathname);
    // This will trigger a re-render whenever the URL changes
  }, [location.pathname]);

  // 💰 حساب السعر للصالون
  const calculatePrice = () => {
    let basePrice = 0;
    let canShowPrice = true;
    const priceBlockReasons: string[] = [];

    // إذا كان تصميم مخصص، ما نقدروش نحسبو السعر
    if (formData.salonType?.type === 'custom-design') {
      canShowPrice = false;
      priceBlockReasons.push('تصميم مخصص');
      return { estimatedPrice: 0, canShowPrice, priceBlockReasons };
    }

    // السعر الأساسي حسب العناصر الخشبية
    if (formData.woodElements) {
      const elements = formData.woodElements;
      
      // طاولات كبيرة: 8000 درهم للوحدة
      if (elements.largeTables) {
        basePrice += elements.largeTables * 8000;
      }
      
      // سندرية: 6000 درهم للوحدة
      if (elements.sundries) {
        basePrice += elements.sundries * 6000;
      }
      
      // لوحات جانبية: 4000 درهم لوحدة
      if (elements.sidePanels) {
        basePrice += elements.sidePanels * 4000;
      }
      
      // أشكال عمودية: 5000 درهم للوحدة
      if (elements.verticalShapes) {
        basePrice += elements.verticalShapes * 5000;
      }
      
      // زوايا عمودية: 3500 درهم للوحدة
      if (elements.verticalCorners) {
        basePrice += elements.verticalCorners * 3500;
      }
    }

    // إضافة حسب نوع الخشب
    if (formData.woodType) {
      if (formData.woodType === 'chene') {
        basePrice *= 1.0; // خشب الشان (السعر الأساسي)
      } else if (formData.woodType === 'noyer') {
        basePrice *= 1.15; // خشب الجوز (+15%)
      } else if (formData.woodType === 'laitre') {
        basePrice *= 1.1; // خشب الليدر (+10%)
      }
    }

    // إضافة حسب نطاق العمل
    if (formData.workScope) {
      if (formData.workScope.complete) {
        basePrice *= 1.4; // مشوع كامل (+40%)
      } else {
        let extraWork = 0;
        if (formData.workScope.marble) extraWork += 0.08;
        if (formData.workScope.tiles) extraWork += 0.06;
        if (formData.workScope.painting) extraWork += 0.05;
        if (formData.workScope.gypsum) extraWork += 0.07;
        basePrice *= (1 + extraWork);
      }
    }

    // إذا ما كايش عناصر خشبية، ما نقدروش نحسبو السعر
    if (basePrice === 0) {
      canShowPrice = false;
      priceBlockReasons.push('لم يتم اختيار عناصر خشبية');
    }

    // تقريب السعر
    const estimatedPrice = Math.round(basePrice / 500) * 500;

    console.log('💰 SALON PRICE CALCULATION:', {
      woodElements: formData.woodElements,
      woodType: formData.woodType,
      workScope: formData.workScope,
      basePrice,
      estimatedPrice,
      canShowPrice,
      priceBlockReasons
    });

    return { estimatedPrice, canShowPrice, priceBlockReasons };
  };

  const handleNext = () => {
    playSound('step'); // 🔊 صوت الانتقال
    console.log('🔄 [Salon] handleNext clicked - currentStep:', currentStep, 'totalSteps:', totalSteps);
    console.log('🔍 [Salon] canProceed:', canProceed());
    console.log('🔍 [Salon] formData:', formData);
    
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      
      // ✅ Update maxStepReached when moving forward
      if (nextStep > maxStepReached) {
        setMaxStepReached(nextStep);
      }
      
      const nextUrl = getUrlFromStep(nextStep, 'salon');
      console.log('🚀 [Salon] Navigating to:', nextUrl, '(step', nextStep, ')');
      navigate(nextUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('⚠️ [Salon] Cannot proceed - already at last step');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(getUrlFromStep(currentStep - 1, 'salon'));
    }
  };

  // ✨ جديد: للرجوع لخطوة معينة من Progress Indicator
  const handleStepClick = (stepNumber: number) => {
    console.log('🔄 [SalonWizard] Jumping to step:', stepNumber);
    
    // ✅ يمكن الدخول لأي خطوة بدون قيود
    if (stepNumber >= 1 && stepNumber <= totalSteps) {
      navigate(getUrlFromStep(stepNumber, 'salon'));
    }
  };

  const handleSubmit = async () => {
    // ✅ Validate ALL required steps before submitting
    const missingSteps: string[] = [];
    
    // Step 1: معلومات العميل
    if (!formData.customerInfo?.fullName || !formData.customerInfo?.phone) {
      missingSteps.push(language === 'ar' ? 'معلومات العميل' : language === 'darija' ? 'معلومات الزبون' : 'Informations client');
    }
    
    // Step 2: نوع الصالون
    if (!formData.salonType?.type) {
      missingSteps.push(language === 'ar' ? 'نوع الصالون' : language === 'darija' ? 'نوع الصالون' : 'Type de salon');
    } else if (formData.salonType.type === 'custom-design' && !formData.salonType.customDesignImage) {
      missingSteps.push(language === 'ar' ? 'صورة التصميم المخصص' : language === 'darija' ? 'صورة التصميم المخصص' : 'Image du design personnalisé');
    }
    
    // Step 3: الأبعاد (if not custom design)
    if (formData.salonType?.type !== 'custom-design') {
      const dims = formData.salonType;
      const salonType = formData.salonType?.type;
      let dimensionsValid = false;
      
      if (salonType === 'l-shape') {
        dimensionsValid = !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0);
      } else if (salonType === 'u-shape') {
        dimensionsValid = !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0 && dims?.wallLength3 && dims.wallLength3 > 0);
      } else if (salonType === 'square' || salonType === 'rectangular-open' || salonType === 'rectangular-closed') {
        dimensionsValid = !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0 && dims?.wallLength3 && dims.wallLength3 > 0 && dims?.wallLength4 && dims.wallLength4 > 0);
      }
      
      if (!dimensionsValid) {
        missingSteps.push(language === 'ar' ? 'أبعاد الصالون' : language === 'darija' ? 'أبعاد الصالون' : 'Dimensions du salon');
      }
    }
    
    // Step 4: عناصر الخشب
    const woodElements = formData.woodElements;
    const hasWoodElements = (
      (woodElements?.largeTables !== undefined && woodElements.largeTables >= 0) &&
      (woodElements?.sundries !== undefined && woodElements.sundries >= 0) &&
      (woodElements?.sidePanels !== undefined && woodElements.sidePanels >= 0) &&
      (woodElements?.verticalShapes !== undefined && woodElements.verticalShapes >= 0) &&
      (woodElements?.verticalCorners !== undefined && woodElements.verticalCorners >= 0)
    );
    
    if (!hasWoodElements) {
      missingSteps.push(language === 'ar' ? 'عناصر الخشب' : language === 'darija' ? 'عناصر الخشب' : 'Éléments en bois');
    }
    
    // Step 5: نوع الخشب
    if (!formData.woodType) {
      missingSteps.push(language === 'ar' ? 'نوع الخشب' : language === 'darija' ? 'نوع الخشب' : 'Type de bois');
    }
    
    // 🚨 If there are missing steps, show alert and prevent submission
    if (missingSteps.length > 0) {
      const message = language === 'ar' 
        ? `يرجى إكمال الخطوات التالية:\n${missingSteps.join('\n')}`
        : language === 'darija'
        ? `خصك تكمل هاد الخطوات:\n${missingSteps.join('\n')}`
        : `Veuillez compléter les étapes suivantes:\n${missingSteps.join('\n')}`;
      
      alert(message);
      return; // ❌ Don't submit
    }
    
    try {
      console.log('🚀 Submitting salon quote...', formData);
      
      // 🔍 DEBUG: Check salonType before sending
      console.log('🛋️ SALON TYPE BEFORE SUBMIT:', formData.salonType);
      console.log('📏 wallLength1:', formData.salonType?.wallLength1);
      console.log('📏 wallLength2:', formData.salonType?.wallLength2);
      console.log('📏 wallLength3:', formData.salonType?.wallLength3);
      console.log('📏 wallLength4:', formData.salonType?.wallLength4);
      
      // 💰 حساب السعر قبل الإرسال
      const priceInfo = calculatePrice();
      const finalData = {
        ...formData,
        estimatedPrice: priceInfo.estimatedPrice,
        canShowPrice: priceInfo.canShowPrice,
        priceBlockReasons: priceInfo.priceBlockReasons
      };
      
      console.log('💰 SALON FINAL DATA WITH PRICE:', finalData);
      console.log('🛋️ SALON TYPE IN FINAL DATA:', finalData.salonType);
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-273c94cc/submit-quote`;
      console.log('📡 API URL:', url);
      
      // Send to server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(finalData),
      });

      console.log('📥 Response status:', response.status);
      
      const result = await response.json();
      console.log('📦 Response data:', result);

      if (result.success) {
        console.log('✅ Quote submitted successfully!', result.quoteId);
        
        // Call parent onSubmit with the data including price
        onSubmit(finalData as SalonFormData);
      } else {
        console.error('❌ Failed to submit quote:', result.error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('💥 Error submitting quote:', error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    }
  };

  const canProceed = () => {
    const result = (() => {
      switch (currentStep) {
        case 1: // معلومات العميل
          return !!(formData.customerInfo?.fullName && formData.customerInfo?.phone);
        
        case 2: // نوع الصالون
          if (formData.salonType?.type === 'custom-design') {
            return !!formData.salonType?.customDesignImage;
          }
          return !!formData.salonType?.type;
        
        case 3: // الأبعاد
          if (formData.salonType?.type === 'custom-design') {
            return true; // Skip dimensions for custom design
          }
          
          const dims = formData.salonType; // salonType contains both type and dimensions
          const salonType = formData.salonType?.type;
          
          if (salonType === 'l-shape') {
            return !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0);
          } else if (salonType === 'u-shape') {
            return !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0 && dims?.wallLength3 && dims.wallLength3 > 0);
          } else if (salonType === 'square' || salonType === 'rectangular-open' || salonType === 'rectangular-closed') {
            return !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0 && dims?.wallLength3 && dims.wallLength3 > 0 && dims?.wallLength4 && dims.wallLength4 > 0);
          }
          return true;
        
        case 4: // عناصر الخشب
          const woodElements = formData.woodElements;
          return !!(
            (woodElements?.largeTables !== undefined && woodElements.largeTables >= 0) &&
            (woodElements?.sundries !== undefined && woodElements.sundries >= 0) &&
            (woodElements?.sidePanels !== undefined && woodElements.sidePanels >= 0) &&
            (woodElements?.verticalShapes !== undefined && woodElements.verticalShapes >= 0) &&
            (woodElements?.verticalCorners !== undefined && woodElements.verticalCorners >= 0)
          );
        
        case 5: // نوع الخشب
          return !!formData.woodType;
        
        case 6: // الزخرفة
          return true; // الزخرفة اختيارية
        
        case 7: // اللون
          return true; // اللون اختياري
        
        case 8: // التأكيد
          return true;
        
        default:
          return true;
      }
    })();
    
    console.log(`🔍 [Salon] canProceed for step ${currentStep}:`, result, 'formData:', {
      selectedPattern: formData.selectedPattern,
      selectedColor: formData.selectedColor,
      wallDecoration: formData.wallDecoration,
      sideFinish: formData.sideFinish
    });
    
    return result;
  };

  // ✅ NEW: Check if any step is valid (has required data)
  const isStepValid = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1: // معلومات العميل
        return !!(formData.customerInfo?.fullName && formData.customerInfo?.phone);
      
      case 2: // نوع الصالون
        if (formData.salonType?.type === 'custom-design') {
          return !!formData.salonType?.customDesignImage;
        }
        return !!formData.salonType?.type;
      
      case 3: // الأبعاد
        if (formData.salonType?.type === 'custom-design') {
          return true; // Skip dimensions for custom design
        }
        
        const dims = formData.salonType;
        const salonType = formData.salonType?.type;
        
        if (salonType === 'l-shape') {
          return !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0);
        } else if (salonType === 'u-shape') {
          return !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0 && dims?.wallLength3 && dims.wallLength3 > 0);
        } else if (salonType === 'square' || salonType === 'rectangular-open' || salonType === 'rectangular-closed') {
          return !!(dims?.wallLength1 && dims.wallLength1 > 0 && dims?.wallLength2 && dims.wallLength2 > 0 && dims?.wallLength3 && dims.wallLength3 > 0 && dims?.wallLength4 && dims.wallLength4 > 0);
        }
        return false;
      
      case 4: // عناصر الخشب
        const woodElements = formData.woodElements;
        return !!(
          (woodElements?.largeTables !== undefined && woodElements.largeTables >= 0) &&
          (woodElements?.sundries !== undefined && woodElements.sundries >= 0) &&
          (woodElements?.sidePanels !== undefined && woodElements.sidePanels >= 0) &&
          (woodElements?.verticalShapes !== undefined && woodElements.verticalShapes >= 0) &&
          (woodElements?.verticalCorners !== undefined && woodElements.verticalCorners >= 0)
        );
      
      case 5: // نوع الخشب
        return !!formData.woodType;
      
      case 6: // الزخرفة
        return true; // Optional
      
      case 7: // اللون
        return true; // Optional
      
      case 8: // التأكيد
        return true;
      
      default:
        return true;
    }
  };

  // Debug: Log before rendering
  const canProceedValue = canProceed();
  console.log('🎨 [Salon] RENDER - Step:', currentStep, 'canProceed:', canProceedValue, 'isSubmitting:', isSubmitting);
  console.log('🎨 [Salon] customerInfo:', formData.customerInfo);

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' || language === 'darija' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Graphitube" className="h-6 w-auto" />
          </div>
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Home className={`w-4 h-4 ${language === 'ar' || language === 'darija' ? 'ml-2' : 'mr-2'}`} />
            {t.common.backToHome}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={t.salonSteps.titles}
          onStepClick={handleStepClick}
          maxStepReached={maxStepReached}
          validatedSteps={Array.from({ length: totalSteps }, (_, i) => ({ stepNumber: i + 1, isValid: isStepValid(i + 1) }))}
        />

        {/* Main Form */}
        <div key={currentStep} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10 mb-8">
          {currentStep === 1 && (
            <Step1CustomerInfo
              data={formData.customerInfo!}
              onChange={(data) => setFormData({ ...formData, customerInfo: data })}
            />
          )}

          {currentStep === 2 && (
            <SalonStep2Type
              data={formData.salonType!}
              onChange={(data) => setFormData({ ...formData, salonType: data })}
            />
          )}

          {currentStep === 3 && (
            <SalonStep3Dimensions
              data={formData.salonType!}
              onChange={(data) => {
                // ✅ FIX: Preserve the 'type' field when updating dimensions
                setFormData({ 
                  ...formData, 
                  salonType: { 
                    ...formData.salonType!, 
                    ...data 
                  } 
                });
              }}
            />
          )}

          {currentStep === 4 && (
            <SalonStep4WoodElements
              data={formData.woodElements!}
              onChange={(data) => setFormData({ ...formData, woodElements: data })}
            />
          )}

          {currentStep === 5 && (
            <SalonStep5WoodType
              data={formData}
              onChange={(data) => setFormData({ ...formData, ...data })}
            />
          )}

          {currentStep === 6 && (
            <SalonStep6Decoration
              data={formData as any}
              onChange={(data) => setFormData({ ...formData, ...data })}
            />
          )}

          {currentStep === 7 && (
            <SalonStep7Color
              data={formData as any}
              onChange={(data) => setFormData({ ...formData, ...data })}
            />
          )}

          {currentStep === 8 && (
            <SalonStep8Summary data={{
              ...formData,
              ...calculatePrice()
            } as SalonFormData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === 'ar' || language === 'darija' ? (
              <>
                <ArrowRight className="w-4 h-4 ml-2" />
                {t.common.back}
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.common.back}
              </>
            )}
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="px-6 bg-amber-600 hover:bg-amber-700"
            >
              {language === 'ar' || language === 'darija' ? (
                <>
                  {t.common.next}
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </>
              ) : (
                <>
                  {t.common.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="px-8 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري الإرسال...' : language === 'darija' ? 'كنصيفطو...' : 'Envoi en cours...'}
                </>
              ) : (
                <>
                  {language === 'ar' || language === 'darija' ? (
                    <>
                      {t.common.submit}
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </>
                  ) : (
                    <>
                      {t.common.submit}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help Notice - Minimalist Elegant Design */}
        <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-4">
            {/* Icon Section */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {t.common.helpText}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {language === 'ar' ? 'تواصل معنا مباشرة عبر الواتساب' : 
                 language === 'darija' ? 'واصل معانا ديريكت عبر الواتساب' :
                 'Contactez-nous directement via WhatsApp'}
              </p>
              
              <a
                href={`https://wa.me/212${t.common.whatsappNumber.substring(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <span>{t.common.whatsappNumber}</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}