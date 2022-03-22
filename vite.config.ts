import {ConfigEnv, defineConfig, loadEnv} from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default ({mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
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
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  })
}
