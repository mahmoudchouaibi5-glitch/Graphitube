import { Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
  onStepClick?: (stepNumber: number) => void; // ✨ جديد: للرجوع للخطوات السابقة
  maxStepReached?: number; // ✨ جديد: لتتبع أعلى خطوة وصل إليها المستخدم
  validatedSteps?: { stepNumber: number; isValid: boolean }[]; // ✅ NEW: خطوات مع validation
}

export function ProgressIndicator({ currentStep, totalSteps, stepTitles, onStepClick, maxStepReached, validatedSteps }: ProgressIndicatorProps) {
  const { t, dir } = useLanguage();
  const { playSound } = useSoundEffects();
  
  // Helper: Check if a step is valid
  const isStepValidated = (stepNumber: number): boolean => {
    if (!validatedSteps) return true;
    const stepValidation = validatedSteps.find(v => v.stepNumber === stepNumber);
    return stepValidation?.isValid ?? true;
  };
  
  return (
    <div className="w-full mb-10" dir={dir}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">
          {t.progress.step} {currentStep} {t.progress.of} {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {stepTitles && stepTitles.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCurrent = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep; // قبل الحالية
            const isReached = stepNumber <= (maxStepReached || currentStep); // وصلنا ليها
            const isFuture = stepNumber > currentStep && isReached; // بعد الحالية لكن وصلنا ليها
            const isClickable = onStepClick && isReached;
            const isValid = isStepValidated(stepNumber); // ✅ NEW: هل الخطوة صحيحة؟
            
            // ✅ تحديد اللون حسب الحالة
            let colorClasses = '';
            if (isCurrent) {
              // الخطوة الحالية: أزرق
              colorClasses = 'bg-blue-100 text-blue-800 border-2 border-blue-400 shadow-md';
            } else if (isCompleted || isFuture) {
              // خطوات تم الوصول إليها
              if (isValid) {
                // بيانات صحيحة: أخضر
                colorClasses = 'bg-green-50 text-green-700 border border-green-300';
              } else {
                // بيانات خاطئة/فارغة: أحمر
                colorClasses = 'bg-red-50 text-red-700 border border-red-300';
              }
            } else {
              // خطوات لم يتم الوصول إليها: رمادي غامق
              colorClasses = 'bg-gray-200 text-gray-700 border border-gray-300';
            }
            
            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${colorClasses} ${
                  isClickable 
                    ? 'cursor-pointer hover:scale-105 hover:shadow-md active:scale-95' 
                    : 'cursor-not-allowed opacity-60'
                }`}
                onClick={() => {
                  if (isClickable) {
                    console.log('🔄 [ProgressIndicator] Navigating to step:', stepNumber);
                    onStepClick(stepNumber);
                    
                    // 🔊 صوت حسب اللون
                    if (isCurrent) {
                      playSound('blue'); // الخطوة الحالية - أزرق
                    } else if (isCompleted || isFuture) {
                      if (isValid) {
                        playSound('green'); // صحيح - أخضر
                      } else {
                        playSound('red'); // خطأ - أحمر
                      }
                    } else {
                      playSound('gray'); // لم يتم الوصول - رمادي
                    }
                  }
                }}
                title={isClickable ? `${t.progress.goTo || 'انتقل إلى'} ${title}` : undefined}
              >
                {isCurrent ? (
                  <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {stepNumber}
                  </span>
                ) : (isCompleted || isFuture) ? (
                  isValid ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <X className="w-3.5 h-3.5" />
                  )
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center text-[10px] font-semibold">
                    {stepNumber}
                  </span>
                )}
                <span className="whitespace-nowrap">{title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}