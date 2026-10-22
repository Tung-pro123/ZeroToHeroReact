import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 8: Keeping Components Pure
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002, // Cổng 3002 để chạy độc lập với Bài 1 (3000) và Bài 5 (3001)
    open: true,
  },
});
