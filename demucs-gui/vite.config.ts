import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/process': 'http://localhost:5001',
      '/health': 'http://localhost:5001',
      '/download': 'http://localhost:5001'
    }
  }
});