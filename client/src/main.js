import { createApp } from 'vue'
import store from './store.js'
import App from './App.vue'
import router from './router.js'
import Vuex from 'vuex'

App.use(Vuex)
App.use(store)
createApp(App).use(router).mount('#app')
