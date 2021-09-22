import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/Register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/Login',
    name: 'LoginPage',
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;