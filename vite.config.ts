import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  server: {
    port: 20715,
    open: true
  },
  plugins: [vue()],
  // 关闭charset，解决打包报错 [WARNING] "@charset" must be the first rule in the file
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  }
})
