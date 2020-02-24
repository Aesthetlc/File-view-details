import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import 'echarts/map/js/china'
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import ElementUI from 'element-ui'
import go from 'gojs'
import 'element-ui/lib/theme-chalk/index.css'
// import './utils/rem.js'
// import './utils/canvas2svg.js'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
window.go = go
Vue.prototype.$http = axios
Vue.use(echarts)
Vue.use(ElementUI)
Vue.use(VueJsonp)

// 引入mock
require('./mock.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
