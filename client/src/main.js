import { createApp } from 'vue'
import store from './store.js'
import App from './App.vue'
import router from './router/index.js'
import Vuex from 'vuex'

document.getElementById("yt-player").style.display = "none";
createApp(App).use(router).use(store).use(Vuex).mount('#app')
