import Vue from 'vue'
import VueRouter from 'vue-router'
import Portal from '../views/Portal.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Portal',
    component: Portal
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import(/* webpackChunkName: "main" */ '../views/Articles.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "main" */ '../views/Article.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "main" */ '../views/Profile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
