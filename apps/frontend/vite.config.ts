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
        target: 'http://3.35.52.47:18080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: '0.0.0.0',
    port: 3000,
  },
});
