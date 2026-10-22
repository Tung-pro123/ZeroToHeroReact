import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 9: Understanding Your UI as a Tree
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003, // Cổng 3003 để chạy độc lập không đụng độ các bài khác
    open: true,
  },
});
