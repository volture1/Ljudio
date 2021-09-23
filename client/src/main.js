import { createApp } from 'vue'
import store from './store.js'
import App from './App.vue'
import router from './router.js'
import Vuex from 'vuex'


const app = createApp(App)
app.use(Vuex)
app.use(router)
app.use(store)
app.mount('#app')
