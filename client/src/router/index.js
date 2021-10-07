import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import ArtistPage from '../pages/ArtistPage.vue';
import AlbumPage from '../pages/AlbumPage.vue';
import VideoPage from '../pages/VideoPage.vue'
import Playlists from '../pages/Playlists.vue';
import SinglePlaylist from '../pages/SinglePlaylist.vue'
import Song from '../pages/Song.vue'
import Explore from '../pages/Explore.vue'
import LikedPage from '../pages/LikedPage.vue'

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
  {
    path: '/video/:id',
    name: 'VideoPage',
    component: VideoPage
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/playlists/:id',
    name: 'SinglePlaylist',
    component: SinglePlaylist
  },
  {
    path: '/song/:id',
    name: "Song",
    component: Song
  },
  {
    path: '/explore',
    name: "Explore",
    component: Explore
  },
  {
    path:'/liked',
    name:"LikedPage",
    component:LikedPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;