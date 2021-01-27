import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

import './style/common.less'

import './plugins/vant'

import '@/config/rem.js'

import '@/config/filters'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
