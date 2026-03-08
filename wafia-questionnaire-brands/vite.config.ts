import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/questionnaire-brands/',
  plugins: [react(), tailwindcss()],
  server: {
    // Ensure `http://localhost:<port>` works reliably (IPv6 + IPv4).
    host: '::',
    port: 3002,
    proxy: {
      '/api': {
        target: process.env.VITE_PLATFORM_API_URL || 'http://127.0.0.1:3000',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/recharts')) return 'vendor-charts';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('node_modules/@dnd-kit')) return 'vendor-dnd';
          if (id.includes('node_modules')) return 'vendor-core';
          return undefined;
        }
      }
    }
  }
})
