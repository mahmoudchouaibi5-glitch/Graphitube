import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { SalonWizard } from './components/salon/SalonWizard';
import { KitchenWizard } from './components/kitchen-wizard/KitchenWizard';
import { SuccessPage } from './components/SuccessPage';
import { HomePage } from './components/HomePage';
import { LanguageProvider } from './contexts/LanguageContext';
import { CompleteKitchenFormData } from './types/kitchen';
import { SalonFormData } from './types';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { CircularProgress } from './components/CircularProgress';
import { useLanguage } from './contexts/LanguageContext';
import { runMigrations } from './utils/migrateData';
import { useSoundEffects } from './hooks/useSoundEffects';
import { Toaster } from './components/ui/sonner';
import { KitchenPlanner3D } from './components/3d-planner/KitchenPlanner3D';

type Page = 'home' | 'kitchen' | 'salon' | 'success';

export default function App() {
  // Run data migrations on app load
  useEffect(() => {
    runMigrations();
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState<CompleteKitchenFormData | SalonFormData | null>(null);
  const { language } = useLanguage();
  const { playSound } = useSoundEffects();

  const handleProjectSelect = (type: 'kitchen' | 'salon') => {
    // Navigation is handled by HomePage now
  };

  const handleKitchenSubmit = async (data: CompleteKitchenFormData) => {
    // Send to backend
    setIsSubmitting(true);
    setSubmitProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95; // Stop at 95% until request completes
        }
        return prev + 5;
      });
    }, 150); // Update every 150ms
    
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-273c94cc/submit-quote`;
      console.log('📡 Sending to API:', url);
      console.log('📤 Request Body:', JSON.stringify(data, null, 2));
      
      setSubmitProgress(10); // 10%: Starting request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });
      
      setSubmitProgress(60); // 60%: Request sent, waiting for response
      const result = await response.json();
      console.log('✅ Backend response:', result);
      
      setSubmitProgress(90); // 90%: Response received
      
      if (result.success) {
        setSubmitProgress(100);
        clearInterval(progressInterval);
        
        // 🔊 صوت النجاح
        playSound('submit');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setSubmittedData(data);
        // navigate('/تم-الارسال');
      } else {
        clearInterval(progressInterval);
        console.error('❌ Backend error:', result);
        playSound('error'); // 🔊 صوت الخطأ
        alert('حدث خطأ أناء إرسال الطلب. يرجى المحاولة مر أخرى.');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('❌ Failed to submit:', error);
      playSound('error'); // 🔊 صوت الخطأ
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
      setSubmitProgress(0);
    }
  };

  const handleSalonSubmit = async (data: SalonFormData) => {
    // Send to backend
    setIsSubmitting(true);
    setSubmitProgress(0);
    
    // Simulate progress for salon
    const progressInterval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 150);
    
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-273c94cc/submit-quote`;
      
      setSubmitProgress(10);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });
      
      setSubmitProgress(60);
      const result = await response.json();
      
      setSubmitProgress(90);
      
      if (result.success) {
        setSubmitProgress(100);
        clearInterval(progressInterval);
        
        playSound('submit');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setSubmittedData(data);
      } else {
        clearInterval(progressInterval);
        playSound('error');
        alert('حدث خطأ أناء إرسال الطلب. يرجى المحاولة مر أخرى.');
      }
    } catch (error) {
      clearInterval(progressInterval);
      playSound('error');
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
      setSubmitProgress(0);
    }
  };

  const handleBackToHome = () => {
    // navigate('/');
    setSubmittedData(null);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      {/* Full-page Circular Progress Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center pointer-events-auto">
          <CircularProgress progress={submitProgress} size={120} strokeWidth={8} language={language} />
        </div>
      )}
      
      {/* Toast Notifications */}
      <Toaster position="top-center" richColors closeButton />
      
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage onSelectProject={handleProjectSelect} />} />
        
        {/* 3D Kitchen Planner */}
        <Route path="/kitchen-planner" element={<KitchenPlanner3D />} />
        <Route path="/مصمم-المطبخ-3d" element={<KitchenPlanner3D />} />
        
        {/* Salon Routes */}
        <Route 
          path="/الصالون/*" 
          element={
            <SalonWizard 
              onSubmit={handleSalonSubmit} 
              onBack={handleBackToHome} 
              isSubmitting={isSubmitting} 
            />
          } 
        />
        
        {/* Kitchen Wizard Routes */}
        <Route 
          path="/المطبخ/*" 
          element={
            <KitchenWizard 
              onSubmit={handleKitchenSubmit} 
              onBack={handleBackToHome} 
              isSubmitting={isSubmitting} 
            />
          } 
        />
        
        {/* Success Page */}
        <Route 
          path="/تم-الارسال" 
          element={
            <SuccessPage
              submittedData={submittedData}
              handleBackToHome={handleBackToHome}
            />
          } 
        />
        
        {/* Redirect to Home if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}