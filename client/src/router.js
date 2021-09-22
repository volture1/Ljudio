import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SearchPage from './pages/SearchPage.vue'

const routes = [
  {
    name: 'HomePage',
    path: '/',
    component: HomePage
  },
  {
    
    name: 'SearchPage',
    path: '/search',
    component: SearchPage
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})