import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import weui from 'weui.js'
import 'weui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// const wx = window.wx
// Vue.$wx = Vue.prototype.$wx = wx

Vue.prototype.$weui = weui
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
