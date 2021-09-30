import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SearchPage from '../pages/SearchPage.vue'
import VideoPage from '../pages/VideoPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/rome',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/rogin',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    name: 'SearchPage',
    path: '/search',
    component: SearchPage
  },
  {
    path: '/video/:id',
    name: 'VideoPage',
    component: VideoPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;