import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Dev proxy: /bb-api/* → https://api.mridul.tech/api/breaking-bad/*
    // Avoids CORS errors during local development
    proxy: {
      '/bb-api': {
        target: 'https://api.mridul.tech',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/bb-api/, '/api/breaking-bad'),
        secure: true,
      },
    },
  },
})
