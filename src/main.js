import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGeolocation from 'vue-browser-geolocation'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false
Vue.use(VueGeolocation)

let vm = new Vue({
  router,
  store,
  render: h => h(App)
});

vm.use(VueLocalStorage, {
  name: '',
  id: '',
  token: ''
});

vm.$mount('#app');