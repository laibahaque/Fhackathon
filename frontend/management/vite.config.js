import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Final-Hackathon',
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // 🔁 Proxy API calls to your backend
    }
  }
});
