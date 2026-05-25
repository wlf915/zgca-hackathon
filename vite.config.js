import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Hackson/' : '/',
  plugins: [react()],
  base: '/zgca-hackathon/',
  server: {
    proxy: {
      '/api': 'http://localhost:4173',
    },
  },
})
