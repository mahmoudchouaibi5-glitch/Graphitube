import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { ArrowRight, ArrowLeft, Home, Loader2 } from 'lucide-react';
import { ProgressIndicator } from '../ProgressIndicator';
import { Step1CustomerInfo } from '../kitchen/Step1CustomerInfo';
import { KitchenStep2Design } from './KitchenStep2Design';
import { KitchenStep3Dimensions } from './KitchenStep3Dimensions';
import { KitchenStep4HeightCeiling } from './KitchenStep4HeightCeiling';
import { KitchenStep5WorkScope } from './KitchenStep5WorkScope';
import { KitchenStep6Appliances } from './KitchenStep6Appliances';
import { KitchenStep7CabinetEquipment } from './KitchenStep7CabinetEquipment';
import { KitchenStep8WoodType } from './KitchenStep8WoodType';
import { KitchenStep9DoorSystem } from './KitchenStep9DoorSystem';
import { KitchenStep10Lighting } from './KitchenStep10Lighting';
import { KitchenStep11Marble } from './KitchenStep11Marble';
import { KitchenStep12Tiles } from './KitchenStep12Tiles';
import { KitchenStep13Electrical } from './KitchenStep13Electrical';
import { KitchenStep14Plumbing } from './KitchenStep14Plumbing';
import { KitchenStep15Painting } from './KitchenStep15Painting';
import { KitchenStep16Gypsum } from './KitchenStep16Gypsum';
import { KitchenStep17Design3D } from './KitchenStep17Design3D';
import { KitchenStep18Summary } from './KitchenStep18Summary';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImage from 'figma:asset/6f91f3b908b32fa8844a582da8663295bc35c793.png';
import { getStepFromPath, getUrlFromStep } from '../../utils/routeHelpers';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface KitchenWizardProps {
  onSubmit: (data: CompleteKitchenFormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function KitchenWizard({ onSubmit, onBack, isSubmitting = false }: KitchenWizardProps) {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound } = useSoundEffects();
  
  // 🔄 Redirect to step 1 on page refresh
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      console.log('🔄 Page reloaded - redirecting to step 1');
      navigate(getUrlFromStep(1, 'kitchen'), { replace: true });
    }
  }, []);
  
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  
  // ✅ Initialize state
  const [formData, setFormData] = useState<Partial<CompleteKitchenFormData>>(() => {
    return {
      customerInfo: {
        fullName: '',
        phone: '',
        address: '',
        city: '',
      },
      kitchenDesign: {
        type: 'l-shape',
      },
      dimensions: {},
      heightCeiling: {
        reachesCeiling: true,
      },
      workScope: {
        wood: true,
        marble: false,
        tiles: false,
        electrical: false,
        plumbing: false,
        painting: false,
        gypsum: false,
        complete: false,
      },
      appliances: {
        electricOven: false,
        microwave: false,
        stove: false,
        pizzaOven: false,
        hood: false,
        fridge: false,
        freezer: false,
        waterHeater: false,
        coffeeMachine: false,
        singleSink: false,
        doubleSink: false,
        faucet: false,
        soapDispenser: false,
      },
      cabinetEquipment: {
        gasBottleCabinet: false,
        trashCabinet: false,
        vegetableBaskets: false,
        glassBaskets: false,
        spiceBaskets: false,
        cornerBaskets: false,
      },
      woodType: {
        material: 'mdf',
      },
      doorSystem: {
        installation: 'overlay',
        finish: 'glossy',
        kitchenColor: '',
      },
      lighting: {
        type: 'warm-led',
      },
      design3D: {
        wants3D: false,
      },
      additionalInfo: {},
    };
  });
  
  const currentStep = getStepFromPath(location.pathname, 'kitchen');
  
  // حساب عدد الخطوات الإجمالية (ديناميكي حسب الاختيارات)
  const getTotalSteps = () => {
    let total = 10; // الخطوات الأساسية (1-10)
    
    if (formData.workScope?.marble) total++; // Step 11
    if (formData.workScope?.tiles) total++; // Step 12
    if (formData.workScope?.electrical) total++; // Step 13
    if (formData.workScope?.plumbing) total++; // Step 14
    if (formData.workScope?.painting) total++; // Step 15
    if (formData.workScope?.gypsum) total++; // Step 16
    
    total += 2; // Steps 17-18 (3D + Summary)
    
    return total;
  };
  
  const totalSteps = getTotalSteps();

  // 💰 حساب السعر للمطبخ
  const calculatePrice = () => {
    let basePrice = 0;
    let canShowPrice = true;
    const priceBlockReasons: string[] = [];

    // يمكن إضافة منطق حساب السعر هنا لاحقاً
    
    return { basePrice, canShowPrice, priceBlockReasons };
  };

  const handleNext = () => {
    playSound('click');
    
    // حفظ التقدم
    if (currentStep > maxStepReached) {
      setMaxStepReached(currentStep);
    }
    
    // تحديد الخطوة التالية (تخطي الخطوات الشرطية)
    let nextStep = currentStep + 1;
    
    // تخطي الخطوات الشرطية بشكل مبسط
    while (nextStep <= 18) {
      // Steps 11-16 are conditional
      if (nextStep === 11 && !formData.workScope?.marble) {
        nextStep++;
        continue;
      }
      if (nextStep === 12 && !formData.workScope?.tiles) {
        nextStep++;
        continue;
      }
      if (nextStep === 13 && !formData.workScope?.electrical) {
        nextStep++;
        continue;
      }
      if (nextStep === 14 && !formData.workScope?.plumbing) {
        nextStep++;
        continue;
      }
      if (nextStep === 15 && !formData.workScope?.painting) {
        nextStep++;
        continue;
      }
      if (nextStep === 16 && !formData.workScope?.gypsum) {
        nextStep++;
        continue;
      }
      break;
    }
    
    navigate(getUrlFromStep(nextStep, 'kitchen'));
  };

  const handlePrevious = () => {
    playSound('click');
    
    let prevStep = currentStep - 1;
    
    // تخطي الخطوات الشرطية عند الرجوع بشكل مبسط
    while (prevStep >= 1) {
      // Steps 11-16 are conditional
      if (prevStep === 16 && !formData.workScope?.gypsum) {
        prevStep--;
        continue;
      }
      if (prevStep === 15 && !formData.workScope?.painting) {
        prevStep--;
        continue;
      }
      if (prevStep === 14 && !formData.workScope?.plumbing) {
        prevStep--;
        continue;
      }
      if (prevStep === 13 && !formData.workScope?.electrical) {
        prevStep--;
        continue;
      }
      if (prevStep === 12 && !formData.workScope?.tiles) {
        prevStep--;
        continue;
      }
      if (prevStep === 11 && !formData.workScope?.marble) {
        prevStep--;
        continue;
      }
      break;
    }
    
    navigate(getUrlFromStep(prevStep, 'kitchen'));
  };

  const handleBackToHome = () => {
    playSound('click');
    navigate('/');
  };

  const handleSubmit = () => {
    const { basePrice, canShowPrice, priceBlockReasons } = calculatePrice();
    
    const completeData: CompleteKitchenFormData = {
      ...(formData as CompleteKitchenFormData),
      submittedAt: new Date(),
      canShowPrice,
      priceBlockReasons,
      estimatedPrice: canShowPrice ? basePrice : undefined,
    };
    
    onSubmit(completeData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1CustomerInfo
            data={formData.customerInfo || { fullName: '', phone: '', address: '', city: '' }}
            onChange={(data) => setFormData({ ...formData, customerInfo: data })}
          />
        );
      case 2:
        return (
          <KitchenStep2Design
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <KitchenStep3Dimensions
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <KitchenStep4HeightCeiling
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 5:
        return (
          <KitchenStep5WorkScope
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 6:
        return (
          <KitchenStep6Appliances
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 7:
        return (
          <KitchenStep7CabinetEquipment
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 8:
        return (
          <KitchenStep8WoodType
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 9:
        return (
          <KitchenStep9DoorSystem
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 10:
        return (
          <KitchenStep10Lighting
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 11:
        return (
          <KitchenStep11Marble
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 12:
        return (
          <KitchenStep12Tiles
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 13:
        return (
          <KitchenStep13Electrical
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 14:
        return (
          <KitchenStep14Plumbing
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 15:
        return (
          <KitchenStep15Painting
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 16:
        return (
          <KitchenStep16Gypsum
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 17:
        return (
          <KitchenStep17Design3D
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 18:
        return (
          <KitchenStep18Summary
            formData={formData}
            calculatePrice={calculatePrice}
          />
        );
      default:
        return <div>خطوة غير موجودة</div>;
    }
  };

  const isLastStep = currentStep === 18;
  const isFirstStep = currentStep === 1;

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img src={logoImage} alt="Graphitube" className="h-6 w-auto" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              {language === 'ar' ? 'الرئيسية' : 'Accueil'}
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            maxStepReached={maxStepReached}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {renderStep()}
        </div>
      </main>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep || isSubmitting}
              className="gap-2"
            >
              {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {language === 'ar' ? 'السابق' : 'Précédent'}
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {language === 'ar' ? 'جاري الإرسال...' : 'Envoi...'}
                  </>
                ) : (
                  <>
                    {language === 'ar' ? 'إرسال الطلب' : 'Envoyer'}
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="gap-2"
              >
                {language === 'ar' ? 'التالي' : 'Suivant'}
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}