/* import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
}) */

export default {
  proxy: {
    "/rest": "http://localhost:3001",
    "/api": "http://localhost:3001",
  }
}
