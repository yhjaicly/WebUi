import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Utils from './common/utils'
import 'element-ui/lib/theme-chalk/reset.css'
import './mock.js'


Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.prototype.$http = axios
Vue.prototype.Utils = Utils
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
