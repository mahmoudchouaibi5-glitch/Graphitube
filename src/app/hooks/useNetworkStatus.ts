import { useState, useEffect } from 'react';
import { OfflineMode } from '../utils/offlineStorage';

/**
 * Hook to detect network status (online/offline)
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(OfflineMode.isOnline());

  useEffect(() => {
    // Subscribe to network changes
    const unsubscribe = OfflineMode.subscribe(setIsOnline);

    // Cleanup on unmount
    return unsubscribe;
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
  };
}
