import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dedicated port 3049 for Session 4 Bài 9
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3049,
    strictPort: true,
    open: true,
  },
});
