import { createApp } from 'vue'
import { Vue3Mq } from "vue3-mq";
import store from './store.js'
import App from './App.vue'
import router from './router/index.js'
import Vuex from 'vuex'

const app = createApp({App});

app.use(Vue3Mq, {
    breakpoints: { 
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400
    }
  })

createApp(App).use(router).use(store).use(Vuex).mount('#app')
