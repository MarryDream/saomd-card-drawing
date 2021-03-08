import Vue from 'vue'
<<<<<<< HEAD
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
=======
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/styles/global.css'
>>>>>>> 125210c (配置vueconfig,调整路径)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
