import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const env = loadEnv(process.env.NODE_MODE, process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/stock_trading_api': {
        target: env.VITE_API_URL + '/' + env.VITE_API_VERSION,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/stock_trading_api/, '')
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./static', import.meta.url))
    }
  },
})
