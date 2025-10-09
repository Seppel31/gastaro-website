import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  // Hinweis: base:'./' entfernt – Netlify generiert korrekte HTTPS-Assetpfade automatisch.
})
