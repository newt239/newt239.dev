import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // https://github.com/vitejs/vite/issues/832#issuecomment-767644287
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/base.scss";`
      },
    },
  },
})
