import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import components from './components'
import router from './router'
import store from './store'
import i18n from './i18n'
// css
import './css'

Vue.config.productionTip = false
//window.axios.defaults.withCredentials = true;
Vue.use(components)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

//cookie global setting
Object.defineProperty(window, 'TOKEN', {
  get: ()=> localStorage.getItem('token'),
  set: (token) => localStorage.setItem('token', token)
});

Object.defineProperty(window, 'memberId', {
  get: ()=> localStorage.getItem('memberId'),
  set: (memberId) => localStorage.setItem('memberId', memberId)
});