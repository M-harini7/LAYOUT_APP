import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/LAYOUT_APP/',
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: true
    }
  }
});