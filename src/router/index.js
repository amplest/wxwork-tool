import Vue from 'vue'
import { routes } from './router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/H5',
  mode: 'history',
  routes
})

export default router
