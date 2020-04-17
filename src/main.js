import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.scss'
import request from './api/index'

Vue.use(ElementUi, { size: 'mini' })

Vue.config.productionTip = false
Vue.prototype.$request = request
new Vue({
  render: h => h(App)
}).$mount('#app')
