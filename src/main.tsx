import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import './styles/fonts.css'
import './styles/theme.css'
import './styles/tailwind.css'
import { registerSW } from 'virtual:pwa-register'

console.log('═══════════════════════════════════════════════════')
console.log('🚀 Graphitube PWA - main.tsx loaded')
console.log('═══════════════════════════════════════════════════')

// Register Service Worker using VitePWA
if ('serviceWorker' in navigator) {
  console.log('✅ [main.tsx] Service Worker API available')
  
  // VitePWA auto-registration with update checking
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('🔄 [PWA] New version available! Refreshing...')
      // Auto-update to latest version
      updateSW(true)
    },
    onOfflineReady() {
      console.log('✅ [PWA] App ready to work offline!')
    },
    onRegistered(registration) {
      console.log('✅ [PWA] Service Worker registered successfully!')
      console.log('📍 Scope:', registration?.scope)
      
      if (registration) {
        // Check for updates every 60 seconds
        setInterval(() => {
          registration.update()
        }, 60000)
      }
    },
    onRegisterError(error) {
      console.error('❌ [PWA] Service Worker registration failed:', error)
    },
  })
  
  // Monitor Service Worker status
  navigator.serviceWorker.ready.then((registration) => {
    console.log('🎉 [PWA] Service Worker is ready and active!')
    console.log('📍 Active SW:', registration.active?.scriptURL)
    
    if (navigator.serviceWorker.controller) {
      console.log('✅ [PWA] Page is controlled by Service Worker')
    } else {
      console.log('⏳ [PWA] Page not controlled yet (refresh may be needed)')
    }
  })
  
  // Listen for Service Worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('📨 [PWA] Message from SW:', event.data)
    
    // Handle sync messages for offline queue
    if (event.data?.type === 'SYNC_OFFLINE_ORDERS') {
      console.log('🔄 [PWA] Syncing offline orders...')
      // The app's requestQueue will handle this
    }
  })
  
} else {
  console.error('❌ [main.tsx] Service Worker NOT supported in this browser!')
}

// Render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)