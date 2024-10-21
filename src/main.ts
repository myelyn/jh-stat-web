import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import uviewPlus from 'uview-plus'
import App from "./App.vue";
import '@/static/font/iconfont.css'
import { formatnum } from '@/utils/format'

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.config.globalProperties.$formatnum = formatnum
  app.use(pinia).use(uviewPlus)
  return {
    app,
  }
}
