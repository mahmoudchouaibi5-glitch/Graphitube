import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import './styles/fonts.css'
import './styles/theme.css'
import './styles/tailwind.css'

console.log('═══════════════════════════════════════════════════')
console.log('🚀 Graphitube - main.tsx loaded (Simple Version)')
console.log('═══════════════════════════════════════════════════')
console.log('📍 Current URL:', window.location.href)
console.log('📁 Base URL:', import.meta.env.BASE_URL)
console.log('═══════════════════════════════════════════════════')

// Render app
const rootElement = document.getElementById('root')

if (rootElement) {
  console.log('✅ Root element found')
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log('✅ App rendered successfully')
} else {
  console.error('❌ Root element not found!')
}
