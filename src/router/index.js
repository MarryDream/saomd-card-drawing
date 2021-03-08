import Vue from 'vue'
import VueRouter from 'vue-router'
import SaomdDraw from '@/views/draw/Index.vue'
import Test from '@/components/Test.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: SaomdDraw },
  { path: '/test', component: Test }
]

const router = new VueRouter({
  routes
})

export default router
