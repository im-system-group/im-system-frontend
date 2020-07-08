import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'


Vue.config.productionTip = false

//plugins
import globalComponents from './plugins/globalComponents'
Vue.use(globalComponents);

//css
import './css/bootstrap-reboot.css'
import './css/bootstrap-utilities.css'
import './css/bootstrap-grid.css'
import './css/main.css'
import i18n from './i18n'
import store from './store'


new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
