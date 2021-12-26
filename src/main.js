import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import $http from '@/api';
import '@/styles/global.css';

Vue.config.productionTip = false;
Vue.prototype.$http = $http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
