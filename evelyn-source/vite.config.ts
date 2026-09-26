import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Evelyn',
        short_name: 'Evelyn',
        description: 'Evelyn — her complete source bundle.',
        theme_color: '#0a0a14',
        background_color: '#0a0a14',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.openrouter\.ai\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'openrouter-api' },
          },
        ],
      },
    }),
  ],
  server: {
    // HMR disabled per platform requirement
    hmr: false,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': '/workspace/ea84e811-c064-4e5b-88bb-7015d749c8d2/sessions/agent_b9b7d5e5-c94e-4816-8f3a-d0368c80677e/evelyn-source/src',
    },
  },
})