import LoginV24 from './LoginV24/index.vue'
import LoginV30 from './LoginV30/index.vue'

export default {
    install(Vue) {
        Vue.component(LoginV24.name, LoginV24);
        Vue.component(LoginV30.name, LoginV30);
    },
}
