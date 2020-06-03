import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGeolocation from 'vue-browser-geolocation'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false
Vue.use(VueGeolocation);
Vue.use(VueLocalStorage, {
  name: '',
  id: '',
  token: ''
});

new Vue({
  router,
  store,
  VueLocalStorage,
  render: h => h(App)
}).$mount('#app');