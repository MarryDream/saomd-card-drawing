import Vue from 'vue'
import VueRouter from 'vue-router'
import Draw from '@/views/draw/Index'
import Test from '@/components/Test'
import Pool from '@/views/draw/components/Index'
import Result from '@/views/draw/components/Package'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/draw' },
  { path: '/draw', component: Draw },
  // { path: '/draw', redirect: '/draw/pool' },
  // {
  //   path: '/draw', component: Draw, children: [
  //     {
  //       path: '/draw/pool',
  //       name: 'pool',
  //       component: Pool,
  //     },
  //     {
  //       path: '/draw/result/:poolType',
  //       name: 'result',
  //       component: Result,
  //       props: true,
  //     }
  //   ]
  // },
  {
    path: '/test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
