import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyLoad from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'

import api from '@/api/index'

fastclick.attach(document.body)

Vue.prototype.$api = api
Vue.use(lazyLoad)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
