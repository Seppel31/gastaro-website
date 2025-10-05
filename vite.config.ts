import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base: './', // 🔥 wichtig für Netlify, sonst bleibt der Bildschirm weiß
})
