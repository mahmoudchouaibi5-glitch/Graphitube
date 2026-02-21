import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages base URL - MUST match your repository name
  base: '/Graphitube/',
  
  plugins: [
    react(),
    tailwindcss(),
    
    // PWA Plugin - Complete configuration
    VitePWA({
      // Auto-register Service Worker
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      
      // Development options - ENABLE in dev mode
      devOptions: {
        enabled: true,
        type: 'module',
      },
      
      // Workbox configuration for caching
      workbox: {
        // Cache everything needed for offline
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,woff,woff2}',
          // Explicitly include Three.js chunks
          '**/three*.js',
          '**/vendor*.js'
        ],
        
        // Runtime caching strategies
        runtimeCaching: [
          {
            // Cache navigation requests (HTML)
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'graphitube-pages',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            // Cache API requests to Supabase
            urlPattern: ({ url }) => url.hostname.includes('supabase.co'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'graphitube-api',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
            },
          },
          {
            // Cache images
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'graphitube-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Cache fonts
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'graphitube-fonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
              },
            },
          },
        ],
        
        // Skip waiting to activate immediately
        skipWaiting: true,
        clientsClaim: true,
      },
      
      // Manifest configuration
      manifest: {
        name: 'Graphitube - Kitchen & Salon Design',
        short_name: 'Graphitube',
        description: 'Professional kitchen and salon design quotation system',
        theme_color: '#8B4513',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/Graphitube/',
        start_url: '/Graphitube/',
        id: '/Graphitube/',
        lang: 'ar',
        dir: 'rtl',
        icons: [
          {
            src: '/Graphitube/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/Graphitube/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [],
        categories: ['business', 'productivity'],
      }
    }),
  ],
  
  publicDir: 'public',
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['three', 'react', 'react-dom'],
  },

  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.obj', '**/*.mtl'],

  optimizeDeps: {
    include: ['three', 'three/addons/controls/OrbitControls.js'],
    exclude: [],
    esbuildOptions: {
      mainFields: ['module', 'main'],
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    manifest: true,
    commonjsOptions: {
      include: [/three/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) {
            return 'three';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})