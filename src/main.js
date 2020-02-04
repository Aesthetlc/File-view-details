import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.use(echarts)
Vue.use(ElementUI)

// 引入mock
require('./mock.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
