import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { ArrowRight, ArrowLeft, Home, MessageCircle, Loader2 } from 'lucide-react';
import { ProgressIndicator } from '../ProgressIndicator';
import { Step1CustomerInfo } from '../kitchen/Step1CustomerInfo';
import { Step2KitchenDesign } from '../kitchen/Step2KitchenDesign';
import { Step3Dimensions } from './steps/Step3Dimensions';
import { Step4HeightCeiling } from './steps/Step4HeightCeiling';
import { Step5WorkScope } from './steps/Step5WorkScope';
import { Step8WoodType } from './steps/Step8WoodType';
import { Step6Appliances } from './steps/Step6Appliances';
import { Step7CabinetEquipment } from './steps/Step7CabinetEquipment';
import { Step9DoorSystem } from './steps/Step9DoorSystem';
import { Step11MarbleDetails } from './steps/Step11MarbleDetails';
import { Step12TilesDetails } from './steps/Step12TilesDetails';
import { Step13ElectricalDetails } from './steps/Step13ElectricalDetails';
import { Step14PlumbingDetails } from './steps/Step14PlumbingDetails';
import { Step16GypsumDetails } from './steps/Step16GypsumDetails';
import { Step19Confirmation } from './steps/Step19Confirmation';
import { CompleteKitchenFormData } from '../../types/kitchen';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImage from 'figma:asset/6f91f3b908b32fa8844a582da8663295bc35c793.png';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { getStepFromPath, getUrlFromStep } from '../../utils/routeHelpers';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface CompleteKitchenWizardProps {
  onSubmit: (data: CompleteKitchenFormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function CompleteKitchenWizard({ onSubmit, onBack, isSubmitting = false }: CompleteKitchenWizardProps) {
  const { t, dir, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound } = useSoundEffects();
  
  // 🔍 DEBUG: Log isSubmitting changes
  console.log('🔄 CompleteKitchenWizard render - isSubmitting:', isSubmitting);
  
  // 🔄 Redirect to step 1 on page refresh
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      console.log('🔄 Page reloaded - redirecting to step 1');
      navigate(getUrlFromStep(1, 'kitchen'), { replace: true });
    }
  }, []); // Empty dependency array - runs only once on mount
  
  // ✅ Track the maximum step reached for progress indicator coloring (NO localStorage)
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  
  // ✅ Initialize state without localStorage
  const [formData, setFormData] = useState<CompleteKitchenFormData>(() => {
    // Default initial state (no localStorage loading)
    return {
      customerInfo: { fullName: '', phone: '', address: '', city: '' },
      kitchenDesign: { type: 'straight' },
      dimensions: {},
      heightCeiling: { reachesCeiling: false },
      workScope: { marble: false, tiles: false, electrical: false, plumbing: false, gypsum: false },
      woodType: { material: 'mdf' },
      builtIns: {
        gasBottleCabinet: false,
        trashCabinet: false,
        vegetableBaskets: false,
        glassBaskets: false,
        spiceBaskets: false,
        cornerBaskets: false,
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
      decoration: { installation: undefined, finish: undefined, kitchenColor: '' },
      color: { kitchenColor: '', installation: undefined, finish: undefined },
      marbleDetails: { isCustomMaterial: false, isGraphitubeSelection: false, hasOpenings: false },
      marbleType: { type: 'none' },
      tilesDetails: { isCustomMaterial: false, isGraphitubeSelection: false },
      tilesType: { type: 'none' },
      electricalDetails: {},
      plumbingDetails: {},
      gypsumDetails: {},
      summary: { wants3D: false },
      additionalNotes: {},
      canShowPrice: true,
      priceBlockReasons: [],
    };
  });

  // Force re-render when location changes
  useEffect(() => {
    console.log('📍 [CompleteKitchenWizard] Location changed:', location.pathname);
    // This will trigger a re-render whenever the URL changes
  }, [location.pathname]);

  // Determine which steps to show based on work scope
  const getStepsToShow = (): number[] => {
    const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // Base steps
    
    return steps;
  };

  const stepsToShow = getStepsToShow();
  const totalSteps = stepsToShow.length;
  const currentStepIndex = stepsToShow.indexOf(getStepFromPath(location.pathname, 'kitchen'));
  const actualStep = currentStepIndex >= 0 ? stepsToShow[currentStepIndex] : 1;
  
  console.log('🔍 [CompleteKitchenWizard] actualStep:', actualStep, 'currentStepIndex:', currentStepIndex, 'Path:', location.pathname);

  const handleNext = () => {
    playSound('step'); // 🔊 صوت الانتقال
    console.log('🔄 [Kitchen] handleNext clicked - actualStep:', actualStep, 'currentStepIndex:', currentStepIndex, 'totalSteps:', totalSteps);
    console.log('🔍 [Kitchen] canProceed:', canProceed());
    console.log('🔍 [Kitchen] formData:', formData);
    
    if (currentStepIndex < totalSteps - 1) {
      const nextStep = stepsToShow[currentStepIndex + 1];
      
      // ✅ Update maxStepReached when moving forward
      if (nextStep > maxStepReached) {
        setMaxStepReached(nextStep);
      }
      
      // Skip dimensions step if design is "other"
      if (actualStep === 2 && formData.kitchenDesign?.type === 'other') {
        const jumpUrl = getUrlFromStep(4, 'kitchen');
        console.log('🚀 [Kitchen] Jumping over dimensions to:', jumpUrl, '(step 4)');
        navigate(jumpUrl);
      } else {
        const nextUrl = getUrlFromStep(nextStep, 'kitchen');
        console.log('🚀 [Kitchen] Navigating to:', nextUrl, '(step', nextStep, ')');
        navigate(nextUrl);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('⚠️ [Kitchen] Cannot proceed - already at last step');
    }
  };

  const handlePrevious = () => {
    playSound('click'); // 🔊 صوت الرجوع
    if (currentStepIndex > 0) {
      const prevStep = stepsToShow[currentStepIndex - 1];
      
      // Skip dimensions step backwards if design is "other"
      if (actualStep === 4 && formData.kitchenDesign?.type === 'other') {
        navigate(getUrlFromStep(2, 'kitchen'));
      } else {
        navigate(getUrlFromStep(prevStep, 'kitchen'));
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ✨ جديد: للرجوع لخطوة معينة من Progress Indicator
  const handleStepClick = (stepNumber: number) => {
    console.log('🔄 [CompleteKitchenWizard] Jumping to step:', stepNumber);
    
    // ✅ يمكن الدخول لأي خطوة بدون قيود
    if (stepNumber >= 1 && stepNumber <= stepsToShow.length) {
      const targetActualStep = stepsToShow[stepNumber - 1];
      navigate(getUrlFromStep(targetActualStep, 'kitchen'));
    }
  };

  const handleSubmit = async () => {
    // ✅ Validate ALL required steps before submitting
    const missingSteps: string[] = [];
    
    // Step 1: معلومات العميل
    if (!formData.customerInfo?.fullName || !formData.customerInfo?.phone) {
      missingSteps.push(language === 'ar' ? 'معلومات العميل' : language === 'darija' ? 'معلومات الزبون' : 'Informations client');
    }
    
    // Step 2: تصميم المطبخ
    if (!formData.kitchenDesign?.type) {
      missingSteps.push(language === 'ar' ? 'تصميم المطبخ' : language === 'darija' ? 'تصميم المطبخ' : 'Design de cuisine');
    }
    
    // Step 3: الأبعاد (if not custom design)
    if (formData.kitchenDesign?.type !== 'other') {
      const dims = formData.dimensions;
      const designType = formData.kitchenDesign?.type;
      let dimensionsValid = false;
      
      if (designType === 'straight') {
        dimensionsValid = !!(dims?.straightLength && dims.straightLength > 0);
      } else if (designType === 'l-shape') {
        dimensionsValid = !!(dims?.lSide1 && dims.lSide1 > 0 && dims?.lSide2 && dims.lSide2 > 0);
      } else if (designType === 'u-shape') {
        dimensionsValid = !!(dims?.uSide1 && dims.uSide1 > 0 && dims?.uSide2 && dims.uSide2 > 0 && dims?.uSide3 && dims.uSide3 > 0);
      } else if (designType === 'g-shape') {
        dimensionsValid = !!(dims?.gSide1 && dims.gSide1 > 0 && dims?.gSide2 && dims.gSide2 > 0 && dims?.gSide3 && dims.gSide3 > 0 && dims?.gSide4 && dims.gSide4 > 0);
      } else if (designType === 'island') {
        dimensionsValid = !!(dims?.islandKitchenLength && dims.islandKitchenLength > 0 && dims?.islandLength && dims.islandLength > 0 && dims?.islandWidth && dims.islandWidth > 0);
      }
      
      if (!dimensionsValid) {
        missingSteps.push(language === 'ar' ? 'أبعاد المطبخ' : language === 'darija' ? 'أبعاد المطبخ' : 'Dimensions');
      }
    }
    
    // Step 4: ارتفاع السقف
    let heightValid = false;
    if (formData.heightCeiling?.reachesCeiling === true) {
      if (formData.heightCeiling?.ceilingType === 'uneven') {
        heightValid = !!(formData.heightCeiling?.highestPoint && formData.heightCeiling?.lowestPoint);
      } else {
        heightValid = !!formData.heightCeiling?.totalHeight;
      }
    } else if (formData.heightCeiling?.reachesCeiling === false) {
      heightValid = true;
    }
    
    if (!heightValid) {
      missingSteps.push(language === 'ar' ? 'ارتفاع السقف' : language === 'darija' ? 'ارتفاع السق' : 'Hauteur du plafond');
    }
    
    // Step 6: نوع الخشب
    if (!formData.woodType?.material) {
      missingSteps.push(language === 'ar' ? 'نوع الخشب' : language === 'darija' ? 'نوع الخشب' : 'Type de bois');
    }
    
    // Step 12: الرخام (if marble selected)
    if (formData.workScope?.marble) {
      const marble = formData.marbleDetails;
      if (!marble?.isCustomMaterial && !marble?.isGraphitubeSelection) {
        missingSteps.push(language === 'ar' ? 'تفاصيل الرخام' : language === 'darija' ? 'تفاصيل الرخام' : 'Détails du marbre');
      }
      if (!formData.marbleType?.type) {
        missingSteps.push(language === 'ar' ? 'نوع الرخام' : language === 'darija' ? 'نوع الرخام' : 'Type de marbre');
      }
    }
    
    // Step 14: الزليج (if tiles selected)
    if (formData.workScope?.tiles) {
      const tiles = formData.tilesDetails;
      if (!tiles?.isCustomMaterial && !tiles?.isGraphitubeSelection) {
        missingSteps.push(language === 'ar' ? 'تفاصيل الزليج' : language === 'darija' ? 'تفاصيل الزليج' : 'Détails des carreaux');
      }
      if (!formData.tilesType?.type) {
        missingSteps.push(language === 'ar' ? 'نوع الزليج' : language === 'darija' ? 'نوع الزليج' : 'Type de carreaux');
      }
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
      console.log('🚀 ========== SUBMIT STARTED ==========');
      
      // Check conditions that block price calculation
      const blockReasons: string[] = [];
      
      if (formData.kitchenDesign?.type === 'other') {
        blockReasons.push('تصميم مخصص');
      }
      
      // Log for debugging
      console.log('🔍 Price Calculation Debug:', {
        kitchenDesignType: formData.kitchenDesign?.type,
        marbleIsCustom: formData.marbleDetails?.isCustomMaterial,
        tilesIsCustom: formData.tilesDetails?.isCustomMaterial,
        blockReasons,
        formData
      });
      
      // Calculate estimated price if showing price
      let estimatedPrice = 0;
      if (blockReasons.length === 0) {
        // Base price calculation - More realistic pricing
        let basePrice = 0; // Start from 0, will add based on selections
        console.log('💰 Base Price:', basePrice);
        
        // Add based on kitchen type (only if dimensions exist)
        const kitchenTypeBasePrice: Record<string, number> = {
          'straight': 7000,      // 7,000 DH base
          'l-shape': 9000,       // 9,000 DH base
          'u-shape': 12000,      // 12,000 DH base
          'g-shape': 15000,      // 15,000 DH base
          'island': 18000,       // 18,000 DH base
        };
        
        const kitchenType = formData.kitchenDesign?.type || 'straight';
        basePrice = kitchenTypeBasePrice[kitchenType] || 7000;
        console.log('💰 Kitchen Type Base Price:', basePrice, '(type:', kitchenType, ')');
        
        // Add based on dimensions (length)
        const length = parseFloat(formData.dimensions?.length || '0');
        console.log('📏 Length from dimensions:', length, 'Raw:', formData.dimensions?.length);
        
        // Try different dimension fields based on kitchen type
        let totalLength = 0;
        if (formData.kitchenDesign?.type === 'straight' && formData.dimensions?.straightLength) {
          totalLength = parseFloat(formData.dimensions.straightLength);
          console.log('📏 Straight Length:', totalLength);
        } else if (formData.kitchenDesign?.type === 'l-shape') {
          const lSide1 = parseFloat(formData.dimensions?.lSide1 || '0');
          const lSide2 = parseFloat(formData.dimensions?.lSide2 || '0');
          totalLength = lSide1 + lSide2;
          console.log('📏 L-Shape: Side1:', lSide1, 'Side2:', lSide2, 'Total:', totalLength);
        } else if (formData.kitchenDesign?.type === 'u-shape') {
          const uSide1 = parseFloat(formData.dimensions?.uSide1 || '0');
          const uSide2 = parseFloat(formData.dimensions?.uSide2 || '0');
          const uSide3 = parseFloat(formData.dimensions?.uSide3 || '0');
          totalLength = uSide1 + uSide2 + uSide3;
          console.log('📏 U-Shape: Side1:', uSide1, 'Side2:', uSide2, 'Side3:', uSide3, 'Total:', totalLength);
        } else if (formData.kitchenDesign?.type === 'g-shape') {
          const gSide1 = parseFloat(formData.dimensions?.gSide1 || '0');
          const gSide2 = parseFloat(formData.dimensions?.gSide2 || '0');
          const gSide3 = parseFloat(formData.dimensions?.gSide3 || '0');
          const gSide4 = parseFloat(formData.dimensions?.gSide4 || '0');
          totalLength = gSide1 + gSide2 + gSide3 + gSide4;
          console.log('📏 G-Shape: Total:', totalLength);
        } else if (formData.kitchenDesign?.type === 'island') {
          const kitchenLength = parseFloat(formData.dimensions?.islandKitchenLength || '0');
          const islandLength = parseFloat(formData.dimensions?.islandLength || '0');
          totalLength = kitchenLength + islandLength;
          console.log('📏 Island: Kitchen:', kitchenLength, 'Island:', islandLength, 'Total:', totalLength);
        }
        
        if (totalLength > 0) {
          const lengthPrice = totalLength * 800;
          basePrice += lengthPrice;
          console.log('💰 After Length Addition (+', lengthPrice, '):', basePrice);
        } else {
          console.log('⚠️ NO LENGTH DETECTED!');
        }
        
        // Add for wood type
        const woodPriceAddon: Record<string, number> = {
          'mdf': 0,
          'lati-standard': 2000,
          'lati-resistant': 3500,
          'mdf-box-mdf-doors': 2500,
          'lati-box-mdf-doors': 4000,
          'lati-resistant-mdf-doors': 5500,
        };
        const woodAddon = woodPriceAddon[formData.woodType?.material || 'mdf'] || 0;
        basePrice += woodAddon;
        console.log('💰 After Wood Type (+', woodAddon, '):', basePrice);
        
        // Add for work scope (if marble or tiles selected from catalog)
        if (formData.workScope?.marble && !formData.marbleDetails?.isCustomMaterial) {
          basePrice += 3000;
          console.log('💰 After Marble (+3000):', basePrice);
        }
        if (formData.workScope?.tiles && !formData.tilesDetails?.isCustomMaterial) {
          basePrice += 2000;
          console.log('💰 After Tiles (+2000):', basePrice);
        }
        if (formData.workScope?.electrical) {
          basePrice += 1500;
          console.log('💰 After Electrical (+1500):', basePrice);
        }
        if (formData.workScope?.plumbing) {
          basePrice += 2000;
          console.log('💰 After Plumbing (+2000):', basePrice);
        }
        if (formData.workScope?.gypsum) {
          basePrice += 2500;
          console.log('💰 After Gypsum (+2500):', basePrice);
        }
        
        // Add for 3D design
        if (formData.summary?.wants3D) {
          basePrice += 1500;
          console.log('💰 After 3D Design (+1500):', basePrice);
        }
        
        // ⚠️ VALIDATION: Check if user provided enough details for pricing
        // Block price if:
        // 1. No dimensions/length provided
        // 2. Base price hasn't increased from initial type-based price (no extras added)
        
        if (totalLength === 0) {
          console.log('⚠️ BLOCKING PRICE: No dimensions provided!');
          blockReasons.push('لم يتم إدخال الأبعاد');
        }
        
        // Check if any meaningful customization was added beyond base price and wood type
        const minimalCustomization = basePrice === kitchenTypeBasePrice[kitchenType] + woodAddon;
        if (minimalCustomization && totalLength === 0) {
          console.log('⚠️ BLOCKING PRICE: Minimal customization, no dimensions!');
          if (!blockReasons.includes('لم يتم إدخال الأبعاد')) {
            blockReasons.push('لم يتم إضافة تفاصيل كافية');
          }
        }
        
        // Round to nearest 500
        estimatedPrice = Math.round(basePrice / 500) * 500;
        console.log('💰 FINAL PRICE (rounded):', estimatedPrice);
      } else {
        console.log('❌ Price calculation BLOCKED. Reasons:', blockReasons);
      }
      
      const finalData: CompleteKitchenFormData = {
        ...formData as CompleteKitchenFormData,
        submittedAt: new Date(),
        canShowPrice: blockReasons.length === 0,
        priceBlockReasons: blockReasons,
        estimatedPrice: estimatedPrice,
      };
      
      console.log('📦 Final Data to Submit:', {
        canShowPrice: finalData.canShowPrice,
        estimatedPrice: finalData.estimatedPrice,
        priceBlockReasons: finalData.priceBlockReasons,
        dimensions: finalData.dimensions,
        kitchenDesign: finalData.kitchenDesign,
      });
      
      console.log('✅ Calling onSubmit...');
      onSubmit(finalData);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('حدث خطأ أثناء الإرسال. يرجى إعادة المحاولة.');
    }
  };

  const canProceed = (): boolean => {
    const result = (() => {
      switch (actualStep) {
        case 1: // معلومات العميل
          return !!(formData.customerInfo?.fullName && formData.customerInfo?.phone);
        
        case 2: // تصميم المطبخ
          return !!formData.kitchenDesign?.type;
        
        case 3: // الأبعاد
          if (formData.kitchenDesign?.type === 'other') {
            return true; // Skip dimensions for custom design
          }
          
          const dims = formData.dimensions;
          const designType = formData.kitchenDesign?.type;
          
          if (designType === 'straight') {
            return !!(dims?.straightLength && dims.straightLength > 0);
          } else if (designType === 'l-shape') {
            return !!(dims?.lSide1 && dims.lSide1 > 0 && dims?.lSide2 && dims.lSide2 > 0);
          } else if (designType === 'u-shape') {
            return !!(dims?.uSide1 && dims.uSide1 > 0 && dims?.uSide2 && dims.uSide2 > 0 && dims?.uSide3 && dims.uSide3 > 0);
          } else if (designType === 'g-shape') {
            return !!(dims?.gSide1 && dims.gSide1 > 0 && dims?.gSide2 && dims.gSide2 > 0 && dims?.gSide3 && dims.gSide3 > 0 && dims?.gSide4 && dims.gSide4 > 0);
          } else if (designType === 'island') {
            return !!(dims?.islandKitchenLength && dims.islandKitchenLength > 0 && dims?.islandLength && dims.islandLength > 0 && dims?.islandWidth && dims.islandWidth > 0);
          }
          return true;
        
        case 4: // ارتفاع السقف
          if (formData.heightCeiling?.reachesCeiling === true) {
            if (formData.heightCeiling?.ceilingType === 'uneven') {
              return !!(formData.heightCeiling?.highestPoint && formData.heightCeiling?.lowestPoint);
            }
            return !!formData.heightCeiling?.totalHeight;
          }
          return formData.heightCeiling?.reachesCeiling === false;
        
        case 5: // نطاق العمل
          const workScope = formData.workScope;
          // At least one option should be selected (can be all false if user wants wood only)
          return true; // This step is always valid, user can skip all if they want
        
        case 6: // نوع الخشب
          return !!formData.woodType?.material;
        
        case 7: // المكونات الداخلية
          // Built-ins are optional
          return true;
        
        case 8: // أجهزة كهربائية
          // At least one appliance should be selected, or user can skip all
          return true; // This step is always valid, appliances are optional
        
        case 9: // معدات الخزائن
          // Cabinet equipment is optional
          return true;
        
        case 10: // الزخرفة (installation & finish)
          return true; // الزخرفة اختيارية
        
        case 11: // الألوان
          return true; // اللون اختياري
        
        case 12: // الرخام
          if (formData.workScope?.marble) {
            const marble = formData.marbleDetails;
            if (marble?.isCustomMaterial || marble?.isGraphitubeSelection) {
              return marble.hasOpenings !== undefined;
            }
            return false;
          }
          return true;
        
        case 13: // نوع الرخام
          if (formData.workScope?.marble) {
            return !!formData.marbleType?.type;
          }
          return true;
        
        case 14: // الزليج
          if (formData.workScope?.tiles) {
            const tiles = formData.tilesDetails;
            return !!(tiles?.isCustomMaterial || tiles?.isGraphitubeSelection);
          }
          return true;
        
        case 15: // نوع الزليج
          if (formData.workScope?.tiles) {
            return !!formData.tilesType?.type;
          }
          return true;
        
        case 16: // الكهرباء
          return true; // Optional step
        
        case 17: // السبكة
          return true; // Optional step
        
        case 18: // الجبس
          return true; // Optional step
        
        case 19: // الملخص النهائي
          return true;
        
        default:
          return true;
      }
    })();
    
    console.log(`🔍 canProceed for step ${actualStep}:`, result, 'formData:', {
      decoration: formData.decoration,
      color: formData.color
    });
    
    return result;
  };

  const updateFormData = (updates: Partial<CompleteKitchenFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // ✅ NEW: Check if any step is valid (has required data)
  const isStepValid = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1: // معلومات العميل
        return !!(formData.customerInfo?.fullName && formData.customerInfo?.phone);
      
      case 2: // تصميم المطبخ
        return !!formData.kitchenDesign?.type;
      
      case 3: // الأبعاد
        if (formData.kitchenDesign?.type === 'other') {
          return true; // Skip dimensions for custom design
        }
        
        const dims = formData.dimensions;
        const designType = formData.kitchenDesign?.type;
        
        if (designType === 'straight') {
          return !!(dims?.straightLength && dims.straightLength > 0);
        } else if (designType === 'l-shape') {
          return !!(dims?.lSide1 && dims.lSide1 > 0 && dims?.lSide2 && dims.lSide2 > 0);
        } else if (designType === 'u-shape') {
          return !!(dims?.uSide1 && dims.uSide1 > 0 && dims?.uSide2 && dims.uSide2 > 0 && dims?.uSide3 && dims.uSide3 > 0);
        } else if (designType === 'g-shape') {
          return !!(dims?.gSide1 && dims.gSide1 > 0 && dims?.gSide2 && dims.gSide2 > 0 && dims?.gSide3 && dims.gSide3 > 0 && dims?.gSide4 && dims.gSide4 > 0);
        } else if (designType === 'island') {
          return !!(dims?.islandKitchenLength && dims.islandKitchenLength > 0 && dims?.islandLength && dims.islandLength > 0 && dims?.islandWidth && dims.islandWidth > 0);
        }
        return false;
      
      case 4: // ارتفاع السقف
        if (formData.heightCeiling?.reachesCeiling === true) {
          if (formData.heightCeiling?.ceilingType === 'uneven') {
            return !!(formData.heightCeiling?.highestPoint && formData.heightCeiling?.lowestPoint);
          }
          return !!formData.heightCeiling?.totalHeight;
        }
        return formData.heightCeiling?.reachesCeiling === false;
      
      case 5: // نطاق العمل
        return true; // Optional
      
      case 6: // نوع الخشب
        return !!formData.woodType?.material;
      
      case 7: // المكونات الداخلية
        return true; // Optional
      
      case 8: // أجهزة كهربائية
        return true; // Optional
      
      case 9: // معدات الخزائن
        return true; // Optional
      
      case 10: // الزخرفة
        return true; // Optional
      
      case 11: // الألوان
        return true; // Optional
      
      case 12: // الرخام
        if (formData.workScope?.marble) {
          const marble = formData.marbleDetails;
          if (marble?.isCustomMaterial || marble?.isGraphitubeSelection) {
            return marble.hasOpenings !== undefined;
          }
          return false;
        }
        return true;
      
      case 13: // نوع الرخام
        if (formData.workScope?.marble) {
          return !!formData.marbleType?.type;
        }
        return true;
      
      case 14: // الزليج
        if (formData.workScope?.tiles) {
          const tiles = formData.tilesDetails;
          return !!(tiles?.isCustomMaterial || tiles?.isGraphitubeSelection);
        }
        return true;
      
      case 15: // نوع الزليج
        if (formData.workScope?.tiles) {
          return !!formData.tilesType?.type;
        }
        return true;
      
      case 16: // الكهرباء
        return true; // Optional
      
      case 17: // السبكة
        return true; // Optional
      
      case 18: // الجبس
        return true; // Optional
      
      case 19: // الملخص النهائي
        return true;
      
      default:
        return true;
    }
  };

  // Debug: Log before rendering
  const canProceedValue = canProceed();
  console.log('🎨 [Kitchen] RENDER - actualStep:', actualStep, 'canProceed:', canProceedValue, 'isSubmitting:', isSubmitting);
  console.log('🎨 [Kitchen] customerInfo:', formData.customerInfo);
  console.log('🎨 [Kitchen] Button will be disabled:', !canProceedValue || isSubmitting);

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
          currentStep={actualStep}
          totalSteps={totalSteps}
          stepTitles={t.kitchenSteps.titles}
          onStepClick={handleStepClick}
          maxStepReached={maxStepReached}
          validatedSteps={stepsToShow.map(step => ({ stepNumber: step, isValid: isStepValid(step) }))}
        />

        {/* Main Form */}
        <div key={actualStep} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10 mb-8">
          {actualStep === 1 && (
            <Step1CustomerInfo
              data={formData.customerInfo!}
              onChange={(data) => updateFormData({ customerInfo: data })}
            />
          )}

          {actualStep === 2 && (
            <Step2KitchenDesign
              data={formData.kitchenDesign!}
              onChange={(data) => updateFormData({ kitchenDesign: data })}
            />
          )}

          {actualStep === 3 && formData.kitchenDesign?.type !== 'other' && (
            <Step3Dimensions
              designType={formData.kitchenDesign?.type!}
              data={formData.dimensions!}
              onChange={(data) => updateFormData({ dimensions: data })}
            />
          )}

          {actualStep === 4 && (
            <Step4HeightCeiling
              data={formData.heightCeiling!}
              onChange={(data) => updateFormData({ heightCeiling: data })}
            />
          )}

          {actualStep === 5 && (
            <Step5WorkScope
              data={formData.workScope!}
              onChange={(data) => updateFormData({ workScope: data })}
            />
          )}

          {actualStep === 6 && (
            <Step8WoodType
              data={formData.woodType!}
              onChange={(data) => updateFormData({ woodType: data })}
            />
          )}

          {actualStep === 7 && (
            <Step6Appliances
              data={formData.builtIns!}
              onChange={(data) => updateFormData({ builtIns: data })}
            />
          )}

          {actualStep === 8 && (
            <Step6Appliances
              data={formData.appliances!}
              onChange={(data) => updateFormData({ appliances: data })}
            />
          )}

          {actualStep === 9 && (
            <Step7CabinetEquipment
              data={formData.cabinetEquipment!}
              onChange={(data) => updateFormData({ cabinetEquipment: data })}
            />
          )}

          {actualStep === 10 && (
            <Step9DoorSystem
              data={formData.decoration!}
              onChange={(data) => updateFormData({ decoration: data })}
            />
          )}

          {actualStep === 11 && (
            <Step9DoorSystem
              data={formData.color!}
              onChange={(data) => updateFormData({ color: data })}
            />
          )}

          {actualStep === 12 && (
            <Step11MarbleDetails
              data={formData.marbleDetails!}
              onChange={(data) => updateFormData({ marbleDetails: data })}
            />
          )}

          {actualStep === 13 && (
            <Step11MarbleDetails
              data={formData.marbleType!}
              onChange={(data) => updateFormData({ marbleType: data })}
            />
          )}

          {actualStep === 14 && (
            <Step12TilesDetails
              data={formData.tilesDetails!}
              onChange={(data) => updateFormData({ tilesDetails: data })}
            />
          )}

          {actualStep === 15 && (
            <Step12TilesDetails
              data={formData.tilesType!}
              onChange={(data) => updateFormData({ tilesType: data })}
            />
          )}

          {actualStep === 16 && (
            <Step13ElectricalDetails
              data={formData.electricalDetails!}
              onChange={(data) => updateFormData({ electricalDetails: data })}
            />
          )}

          {actualStep === 17 && (
            <Step14PlumbingDetails
              data={formData.plumbingDetails!}
              onChange={(data) => updateFormData({ plumbingDetails: data })}
            />
          )}

          {actualStep === 18 && (
            <Step16GypsumDetails
              data={formData.gypsumDetails!}
              onChange={(data) => updateFormData({ gypsumDetails: data })}
            />
          )}

          {actualStep === 19 && (
            <Step19Confirmation data={formData as CompleteKitchenFormData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="px-6 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            {t.common.back}
          </Button>

          {currentStepIndex < totalSteps - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="px-6 bg-amber-600 hover:bg-amber-700 shadow-md"
            >
              {t.common.next}
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 bg-green-600 hover:bg-green-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري الإرسال...' : language === 'darija' ? 'كنصيفطو...' : 'Envoi en cours...'}
                </>
              ) : (
                <>
                  {t.common.submit}
                  <ArrowLeft className="w-4 h-4 mr-2" />
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
                 language === 'darija' ? 'تواصل معانا ديريكت عبر الواتساب' :
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