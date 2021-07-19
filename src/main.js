import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
//import components from './components'


let Vue = createApp(App)

Vue.use(store)
.use(i18n)
.use(router)
.mount('#app')
