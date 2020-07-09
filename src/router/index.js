import Vue from 'vue'
import VueRouter from 'vue-router'

//analytics
import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter)

    const routes = [
        {
            path: '/dev',
            name: 'dev list',
            component: () => import(/* webpackChunkName: "main" */ '../views/dev.vue'),
        },
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "main" */ '../views/home.vue'),
        },
        {
            path: '/old_interface',
            name: 'old_interface',
            component: () => import(/* webpackChunkName: "main" */ '../views/old_interface.vue'),
        },
        {
            path: '/list',
            name: 'list',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "main" */ '../views/list.vue'),
        },
        {
            path: '/post/:id',
            name: 'post',
            component: () => import(/* webpackChunkName: "main" */ '../views/post.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import(/* webpackChunkName: "main" */ '../views/settings.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "main" */ '../views/register.vue')
        },
        {
            path: '/*',
            name: '*',
            component: () => import(/* webpackChunkName: "main" */ '../views/404.vue')
        }
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
