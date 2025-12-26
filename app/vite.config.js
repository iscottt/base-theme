import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    open: true, // 是否自动在浏览器打开
    proxy: {
      '/vite-proxy': {
        target: 'http://localhost:9999/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/vite-proxy/, ''),
      },
      '/uploads': {
        target: 'http://localhost:9999/uploads',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/uploads/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
})
