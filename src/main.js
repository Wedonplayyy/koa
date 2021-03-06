import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import http from './http'
import './mock'
import VCharts from 'v-charts'
import QRCode from 'qrcode'


Vue.use(VCharts)

Vue.use(ElementUI);
Vue.prototype.$axios = http;
Vue.config.productionTip = false;

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use( config => {
  const token = store.state.token;
  token && (config.headers.Authorization = token);
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    return response
  }, error => {
    return Promise.reject(error)
  })

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
