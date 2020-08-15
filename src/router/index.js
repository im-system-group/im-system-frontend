import Vue from 'vue'
import VueRouter from 'vue-router'
import Portal from '../views/Portal.vue'
import Login from '../views/Login.vue'

//analytics
import VueAnalytics from 'vue-analytics'

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
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "main" */ '../views/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "main" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/article-create',
    name: 'ArticleCreate',
    component: () => import(/* webpackChunkName: "main" */ '../views/ArticleCreate.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //設定 scoll 位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
	}
})

//google analytics
Vue.use(VueAnalytics, {
  id: 'UA-104979875-2',
  router
})

export default router
