import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.png'],
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@src', replacement: resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.16:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/payments': {
        target: 'https://api.tosspayments.com/v1/payments',
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
    host: '0.0.0.0',
    port: 3000,
  },
});
