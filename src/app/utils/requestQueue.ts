import { PendingRequestsQueue, OfflineMode } from './offlineStorage';
import { projectId, publicAnonKey } from '/utils/supabase/info';

/**
 * Request Queue Manager
 * Handles sending queued requests when online
 */

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

export class RequestQueueManager {
  private isProcessing = false;

  /**
   * Add a request to queue (for offline mode)
   */
  async queueRequest(type: 'kitchen' | 'salon', data: any): Promise<string> {
    const requestId = PendingRequestsQueue.add({ type, data });
    console.log('📥 Request queued:', requestId);
    
    // Try to process immediately if online
    if (OfflineMode.isOnline()) {
      setTimeout(() => this.processQueue(), 1000);
    }
    
    return requestId;
  }

  /**
   * Send request immediately (for online mode)
   */
  async sendRequest(type: 'kitchen' | 'salon', data: any): Promise<Response> {
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-273c94cc/${type}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Server error: ${error}`);
    }

    return response;
  }

  /**
   * Process all queued requests
   */
  async processQueue(): Promise<void> {
    if (this.isProcessing) {
      console.log('⏸️ Queue already processing...');
      return;
    }

    if (!OfflineMode.isOnline()) {
      console.log('📡 Offline - queue processing postponed');
      return;
    }

    this.isProcessing = true;
    console.log('🚀 Processing request queue...');

    const pending = PendingRequestsQueue.getPending();
    
    if (pending.length === 0) {
      console.log('✅ Queue is empty');
      this.isProcessing = false;
      return;
    }

    console.log(`📋 Found ${pending.length} pending request(s)`);

    for (const request of pending) {
      await this.processRequest(request);
    }

    this.isProcessing = false;
    console.log('✅ Queue processing complete');
  }

  /**
   * Process a single request
   */
  private async processRequest(request: any): Promise<void> {
    if (request.retryCount >= MAX_RETRIES) {
      console.error('❌ Max retries reached for request:', request.id);
      PendingRequestsQueue.update(request.id, { status: 'failed' });
      return;
    }

    try {
      console.log(`📤 Sending request ${request.id}...`);
      PendingRequestsQueue.update(request.id, { status: 'sending' });

      await this.sendRequest(request.type, request.data);

      console.log(`✅ Request ${request.id} sent successfully`);
      PendingRequestsQueue.remove(request.id);

    } catch (error) {
      console.error(`❌ Failed to send request ${request.id}:`, error);
      
      PendingRequestsQueue.update(request.id, {
        status: 'pending',
        retryCount: request.retryCount + 1,
      });

      // Wait before next retry
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }

  /**
   * Get queue status
   */
  getStatus() {
    const all = PendingRequestsQueue.getAll();
    return {
      total: all.length,
      pending: all.filter(r => r.status === 'pending').length,
      sending: all.filter(r => r.status === 'sending').length,
      failed: all.filter(r => r.status === 'failed').length,
    };
  }
}

// Singleton instance
export const requestQueue = new RequestQueueManager();

// Auto-process queue when coming back online
if (typeof window !== 'undefined') {
  OfflineMode.subscribe((isOnline) => {
    if (isOnline) {
      console.log('🌐 Back online - processing queued requests...');
      setTimeout(() => requestQueue.processQueue(), 2000);
    }
  });
}
