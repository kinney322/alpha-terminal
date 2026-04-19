import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], base: "/alpha/",
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://kw-terminal-api.myfootballplaces.workers.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
