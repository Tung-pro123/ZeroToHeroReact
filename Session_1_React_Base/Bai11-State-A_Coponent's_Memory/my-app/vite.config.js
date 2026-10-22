import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 11: State - A Component's Memory
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005, // Cổng 3005 độc lập
    open: true,
  },
});
