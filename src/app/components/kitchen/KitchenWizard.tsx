import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, ArrowLeft, Home, Loader2 } from 'lucide-react';
import { ProgressIndicator } from '../ProgressIndicator';
import { Step1CustomerInfo } from './Step1CustomerInfo';
import { Step2KitchenDesign } from './Step2KitchenDesign';
import { Step3Dimensions } from './Step3Dimensions';
import { StepConfirmation } from './StepConfirmation';
import { KitchenFormData } from '../../types';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface KitchenWizardProps {
  onSubmit: (data: KitchenFormData) => void;
  onBack: () => void;
}

const STEP_TITLES = [
  'معلومات العميل',
  'نوع المطبخ',
  'الأبعاد',
  'التأكيد',
];

export function KitchenWizard({ onSubmit, onBack }: KitchenWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<KitchenFormData>>({
    projectType: 'kitchen',
    customerInfo: {
      fullName: '',
      phone: '',
      address: '',
      city: '',
    },
    kitchenDesign: {
      type: 'straight',
    },
  });

  const totalSteps = 4; // Simplified for now

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // Skip dimensions step if kitchen type is "other"
      if (currentStep === 2 && formData.kitchenDesign?.type === 'other') {
        setCurrentStep(4); // Jump to confirmation
      } else if (currentStep === 3 && formData.kitchenDesign?.type === 'other') {
        setCurrentStep(4); // Should not happen, but safety check
      } else {
        setCurrentStep(currentStep + 1);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      // Skip dimensions step backwards if kitchen type is "other"
      if (currentStep === 4 && formData.kitchenDesign?.type === 'other') {
        setCurrentStep(2); // Jump back to design selection
      } else {
        setCurrentStep(currentStep - 1);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    console.log('🔘 Submit button clicked!');
    setIsSubmitting(true);
    console.log('⏳ isSubmitting set to TRUE');
    
    try {
      console.log('🚀 Submitting kitchen quote...', formData);
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-273c94cc/submit-quote`;
      console.log('📡 API URL:', url);
      
      // Send to server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 Response status:', response.status);
      
      const result = await response.json();
      console.log('📦 Response data:', result);

      // Add minimum delay to show loading animation (1.5 seconds)
      console.log('⏰ Starting 1.5s delay...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('✅ Delay complete!');

      if (result.success) {
        console.log('✅ Quote submitted successfully!', result.quoteId);
        console.log('🎯 Calling onSubmit to navigate to success page...');
        // Call parent onSubmit with the data
        onSubmit(formData as KitchenFormData);
      } else {
        console.error('❌ Failed to submit quote:', result.error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('💥 Error submitting quote:', error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      console.log('🔓 Setting isSubmitting to FALSE');
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.customerInfo?.fullName && formData.customerInfo?.phone;
      case 2:
        return formData.kitchenDesign?.type;
      case 3:
        if (formData.kitchenDesign?.type === 'other') {
          return formData.kitchenDesign?.customDescription;
        }
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Graphitube</h1>
              <p className="text-xs text-gray-500">تصميم المطبخ</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onBack} className="text-gray-600">
            <Home className="w-4 h-4 ml-2" />
            الرئيسية
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={STEP_TITLES}
        />

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          {currentStep === 1 && (
            <Step1CustomerInfo
              data={formData.customerInfo!}
              onChange={(data) => setFormData({ ...formData, customerInfo: data })}
            />
          )}

          {currentStep === 2 && (
            <Step2KitchenDesign
              data={formData.kitchenDesign!}
              onChange={(data) => setFormData({ ...formData, kitchenDesign: data })}
            />
          )}

          {currentStep === 3 && (
            <Step3Dimensions
              data={formData.kitchenDesign!}
              onChange={(data) => setFormData({ ...formData, kitchenDesign: data })}
            />
          )}

          {currentStep === 4 && (
            <StepConfirmation data={formData as KitchenFormData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            السابق
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 bg-amber-600 hover:bg-amber-700"
            >
              التالي
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  جاري الإرسال...
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                </>
              ) : (
                <>
                  إرسال الطلب
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}