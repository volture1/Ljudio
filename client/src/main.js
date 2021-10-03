import { createApp } from 'vue'
//import { Vue3Mq } from "vue3-mq";
import store from './store.js'
import App from './App.vue'
import router from './router/index.js'
import Vuex from 'vuex'
import breakpoints from './variables/breakpoints'
import * as VueMq from "vue3-mq";

  createApp(App)
  .use(VueMq, {
    breakpoints,
    defaultBreakpoint: "450"
  }).use(router).use(store).use(Vuex).mount('#app')

  