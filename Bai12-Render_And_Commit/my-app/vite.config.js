import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 12: Render and Commit
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3006, // Cổng 3006 độc lập
    open: true,
  },
});
