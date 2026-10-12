import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoPages from './seo-pages.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
})
