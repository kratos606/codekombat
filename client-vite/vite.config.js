import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression(), // Enable gzip compression for assets
  ],
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173,
  },
});
