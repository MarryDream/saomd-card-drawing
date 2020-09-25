import Vue from 'vue'
import VueRouter from 'vue-router'
import Saomd from '../components/Saomd.vue'
import Test from '../components/Test.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Saomd },
  { path: '/test', component: Test }
]

const router = new VueRouter({
  routes
})

export default router
