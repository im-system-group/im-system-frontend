import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'


Vue.config.productionTip = false

//css
import './css/bootstrap-reboot.css'
import './css/bootstrap-utilities.css'
import './css/bootstrap-grid.css'
import './css/main.css'
import i18n from './i18n'


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
