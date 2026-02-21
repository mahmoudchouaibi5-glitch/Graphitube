// Graphitube Service Worker
// Custom SW for PWA offline support
const CACHE_VERSION = 'v1.0.3';
const CACHE_NAME = `graphitube-cache-${CACHE_VERSION}`;
const OFFLINE_CACHE = `graphitube-offline-${CACHE_VERSION}`;

// Files to cache immediately on install
const PRECACHE_URLS = [
  '/Graphitube/',
  '/Graphitube/index.html',
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching files...');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] ✅ Installation complete!');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] ❌ Installation failed:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] ✅ Activation complete!');
        // Claim all clients immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - Network First strategy with offline fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For Supabase API - try network, fallback to cache
    if (url.hostname.includes('supabase.co')) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Clone and cache successful responses
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(OFFLINE_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Return cached version if available
            return caches.match(request);
          })
      );
      return;
    }
    
    // Other cross-origin requests - network only
    return;
  }
  
  // For navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(request)
            .then((cached) => {
              if (cached) {
                return cached;
              }
              // Fallback to index.html
              return caches.match('/Graphitube/index.html');
            });
        })
    );
    return;
  }
  
  // For all other requests - Cache First with Network Fallback
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) {
          // Return cached version, but update cache in background
          fetch(request)
            .then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, response);
                });
              }
            })
            .catch(() => {
              // Network error in background update - ignore
            });
          
          return cached;
        }
        
        // Not in cache - fetch from network
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
      })
  );
});

// Message event - for communication with client
self.addEventListener('message', (event) => {
  console.log('[SW] Received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => caches.delete(key)));
      })
    );
  }
});

// Periodic sync for offline queue (if supported)
self.addEventListener('sync', (event) => {
  console.log('[SW] Sync event:', event.tag);
  
  if (event.tag === 'sync-offline-orders') {
    event.waitUntil(
      // Client will handle the actual sync
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_OFFLINE_ORDERS'
          });
        });
      })
    );
  }
});

console.log('[SW] ✅ Service Worker loaded successfully!', CACHE_VERSION);
