import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Map',
    component: Map
  }
]

const router = new VueRouter({
  routes
})

export default router
