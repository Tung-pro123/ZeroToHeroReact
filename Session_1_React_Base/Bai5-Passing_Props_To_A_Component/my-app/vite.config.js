import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho Bài 5: Passing Props To A Component
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Dùng port 3001 để không bị đụng với Bài 1 (port 3000) nếu chạy song song
    open: true,
  },
});
