import { useEffect, useState } from 'react';

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  language?: 'ar' | 'fr' | 'darija';
}

export function CircularProgress({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  language = 'ar' 
}: CircularProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  // Smooth animation للنسبة المئوية
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayProgress / 100) * circumference;
  
  // رسائل التقدم
  const getProgressMessage = () => {
    if (progress < 33) {
      return language === 'ar' ? 'جاري حفظ البيانات...' : 
             language === 'darija' ? 'كنسجلو البيانات...' : 
             'Sauvegarde des données...';
    } else if (progress < 66) {
      return language === 'ar' ? 'جاري إرسال الإيميل...' : 
             language === 'darija' ? 'كنصيفطو الإيميل...' : 
             'Envoi de l\'email...';
    } else if (progress < 100) {
      return language === 'ar' ? 'جاري إرسال الإشعار...' : 
             language === 'darija' ? 'كنصيفطو الإشعار...' : 
             'Envoi de notification...';
    } else {
      return language === 'ar' ? 'تم بنجاح!' : 
             language === 'darija' ? 'كمل بنجاح!' : 
             'Terminé!';
    }
  };
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))'
          }}
        />
      </svg>
      
      {/* النسبة المئوية في الوسط */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white drop-shadow-lg">
          {Math.round(displayProgress)}%
        </span>
      </div>
      
      {/* رسالة التقدم تحت الدائرة */}
      <div className="absolute top-full mt-4 whitespace-nowrap">
        <p className="text-white text-sm font-medium drop-shadow-lg animate-pulse">
          {getProgressMessage()}
        </p>
      </div>
    </div>
  );
}
