import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Cấu hình Vite cho Bài 2: Importing and Exporting Components
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
