import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import ArtistPage from '../pages/ArtistPage.vue';
import AlbumPage from '../pages/AlbumPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/artist/:id',
    name: 'ArtistPage',
    component: ArtistPage
  },
  {
    path: '/album/:id',
    name: 'AlbumPage',
    component: AlbumPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;