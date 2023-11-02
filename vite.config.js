import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@contexts': fileURLToPath(new URL('./src/contexts', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@middlewares': fileURLToPath(new URL('./src/middlewares', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@providers': fileURLToPath(new URL('./src/providers', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});