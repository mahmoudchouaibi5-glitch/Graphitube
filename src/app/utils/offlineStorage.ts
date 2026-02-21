/**
 * Offline Storage Utility
 * Manages local storage for offline functionality
 */

// Types
export interface PendingRequest {
  id: string;
  type: 'kitchen' | 'salon';
  data: any;
  timestamp: number;
  status: 'pending' | 'sending' | 'failed';
  retryCount: number;
}

export interface WizardProgress {
  type: 'kitchen' | 'salon';
  currentStep: number;
  data: any;
  timestamp: number;
}

// Storage Keys
const KEYS = {
  PENDING_REQUESTS: 'graphitube_pending_requests',
  WIZARD_PROGRESS: 'graphitube_wizard_progress',
  OFFLINE_MODE: 'graphitube_offline_mode',
} as const;

// Pending Requests Queue
export const PendingRequestsQueue = {
  getAll(): PendingRequest[] {
    try {
      const data = localStorage.getItem(KEYS.PENDING_REQUESTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading pending requests:', error);
      return [];
    }
  },

  add(request: Omit<PendingRequest, 'id' | 'timestamp' | 'status' | 'retryCount'>): string {
    const requests = this.getAll();
    const newRequest: PendingRequest = {
      ...request,
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0,
    };
    
    requests.push(newRequest);
    localStorage.setItem(KEYS.PENDING_REQUESTS, JSON.stringify(requests));
    
    console.log('✅ Offline: Request queued for later submission', newRequest.id);
    return newRequest.id;
  },

  update(id: string, updates: Partial<PendingRequest>): void {
    const requests = this.getAll();
    const index = requests.findIndex(r => r.id === id);
    
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      localStorage.setItem(KEYS.PENDING_REQUESTS, JSON.stringify(requests));
    }
  },

  remove(id: string): void {
    const requests = this.getAll();
    const filtered = requests.filter(r => r.id !== id);
    localStorage.setItem(KEYS.PENDING_REQUESTS, JSON.stringify(filtered));
    console.log('✅ Offline: Request removed from queue', id);
  },

  clear(): void {
    localStorage.removeItem(KEYS.PENDING_REQUESTS);
  },

  getPending(): PendingRequest[] {
    return this.getAll().filter(r => r.status === 'pending');
  },
};

// Wizard Progress Storage
export const WizardProgressStorage = {
  save(type: 'kitchen' | 'salon', step: number, data: any): void {
    const progress: WizardProgress = {
      type,
      currentStep: step,
      data,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(KEYS.WIZARD_PROGRESS, JSON.stringify(progress));
    console.log(`💾 Progress saved: ${type} - Step ${step}`);
  },

  load(): WizardProgress | null {
    try {
      const data = localStorage.getItem(KEYS.WIZARD_PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading wizard progress:', error);
      return null;
    }
  },

  clear(): void {
    localStorage.removeItem(KEYS.WIZARD_PROGRESS);
    console.log('🗑️ Wizard progress cleared');
  },

  hasProgress(): boolean {
    return localStorage.getItem(KEYS.WIZARD_PROGRESS) !== null;
  },
};

// Offline Mode Detection
export const OfflineMode = {
  isOnline(): boolean {
    return navigator.onLine;
  },

  subscribe(callback: (isOnline: boolean) => void): () => void {
    const handleOnline = () => {
      console.log('🌐 Network: Back online');
      callback(true);
    };
    
    const handleOffline = () => {
      console.log('📡 Network: Gone offline');
      callback(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  },
};

// Export all
export default {
  PendingRequestsQueue,
  WizardProgressStorage,
  OfflineMode,
};
