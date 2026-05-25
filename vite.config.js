import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/zgca-hackathon/',
  server: {
    proxy: {
      '/api': 'http://localhost:4173',
    },
  },
})
