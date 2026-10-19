import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 7: Rendering Lists
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3004, // Chạy trên port 3004 độc lập (Bai 1: 3000, Bai 5: 3001, Bai 8: 3002, Bai 6: 3003)
    open: true,
  },
});
