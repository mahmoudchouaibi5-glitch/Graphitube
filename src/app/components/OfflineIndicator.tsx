import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useLanguage } from '../contexts/LanguageContext';
import { Wifi, WifiOff, CloudOff, CheckCircle, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PendingRequestsQueue } from '../utils/offlineStorage';

export function OfflineIndicator() {
  const { isOnline } = useNetworkStatus();
  const { language } = useLanguage();
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Update pending count
    const updateCount = () => {
      setPendingCount(PendingRequestsQueue.getPending().length);
    };
    
    updateCount();
    const interval = setInterval(updateCount, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOnline) {
      // Show offline notification
      setShowNotification(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show back online notification
      setShowNotification(true);
      // Hide after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
        setWasOffline(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top duration-300">
      {isOnline ? (
        // Back Online
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">
              {language === 'ar' ? '✅ عدت للاتصال' : language === 'fr' ? '✅ Connexion rétablie' : '✅ Connexion rétablie'}
            </p>
            <p className="text-sm opacity-90">
              {language === 'ar' 
                ? pendingCount > 0 
                  ? `جاري إرسال ${pendingCount} طلب...`
                  : 'يمكنك الآن إرسال طلبك' 
                : pendingCount > 0
                  ? `Envoi de ${pendingCount} demande(s)...`
                  : 'Vous pouvez maintenant envoyer votre demande'}
            </p>
          </div>
        </div>
      ) : (
        // Offline
        <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
          <WifiOff className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">
              {language === 'ar' ? '📡 لا يوجد اتصال بالإنترنت' : '📡 Pas de connexion'}
            </p>
            <p className="text-sm opacity-90">
              {language === 'ar' 
                ? 'يمكنك الاستمرار - سنحفظ بياناتك محلياً' 
                : 'Continuez - vos données seront sauvegardées'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Persistent offline banner (always visible when offline)
 */
export function OfflineBanner() {
  const { isOnline } = useNetworkStatus();
  const { language } = useLanguage();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setPendingCount(PendingRequestsQueue.getPending().length);
    };
    
    updateCount();
    const interval = setInterval(updateCount, 2000);
    
    return () => clearInterval(interval);
  }, []);

  if (isOnline && pendingCount === 0) {
    return null;
  }

  return (
    <div className={`${isOnline ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-orange-50 border-orange-200 text-orange-800'} border-b px-4 py-2`}>
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Download className="w-4 h-4 animate-bounce" />
            <p className="text-sm font-medium">
              {language === 'ar' 
                ? `🚀 جاري إرسال ${pendingCount} طلب محفوظ...` 
                : `🚀 Envoi de ${pendingCount} demande(s) en attente...`}
            </p>
          </>
        ) : (
          <>
            <CloudOff className="w-4 h-4" />
            <p className="text-sm font-medium">
              {language === 'ar' 
                ? pendingCount > 0
                  ? `وضع عدم الاتصال - ${pendingCount} طلب محفوظ للإرسال لاحقاً`
                  : 'وضع عدم الاتصال - يمكنك المتابعة والإرسال سيتم عند عودة الاتصال'
                : pendingCount > 0
                  ? `Mode hors ligne - ${pendingCount} demande(s) en attente`
                  : 'Mode hors ligne - continuez, envoi automatique à la reconnexion'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}