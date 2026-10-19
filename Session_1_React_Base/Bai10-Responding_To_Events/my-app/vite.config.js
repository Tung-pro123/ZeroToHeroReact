import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 10: Responding to Events
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3004, // Cổng 3004 để chạy độc lập
    open: true,
  },
});
