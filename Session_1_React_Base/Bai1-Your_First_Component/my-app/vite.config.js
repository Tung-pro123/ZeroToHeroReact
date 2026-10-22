import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// File cấu hình chuẩn của dự án Vite React
// Tương đương file application.properties hoặc application.yml trong Spring Boot
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Mặc định mở port 3000 (giống frontend tiêu chuẩn)
    open: true, // Tự động mở trình duyệt khi gõ npm run dev
  },
});
