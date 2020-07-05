import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//css
import './css/bootstrap-reboot.css'
import './css/bootstrap-utilities.css'
import './css/bootstrap-grid.css'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
