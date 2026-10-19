import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 6: Conditional Rendering
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003, // Chạy trên port 3003 độc lập
    open: true,
  },
});
