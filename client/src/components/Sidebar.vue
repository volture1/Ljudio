<template>
  <div class="sidebar">
    <!-- <nav>
      <h1 @click="$router.push('/')">Ljudio</h1>
      <router-link to="/search">Search </router-link>
    </nav> -->
    <div class="top-section">
      <h3 class="productname">Ljudio</h3>
      <img src="../assets/Logo.png" alt="">
    </div>
    <div class="user-section">
      <div class="avatar-name">
        <Usericon class="avatar"/>
        <h4 class="username">{{currentUser.firstname}} {{currentUser.lastname}}</h4>
      </div>
      <div class="optionbtns-section">
        <buttons class="optionbtn"></buttons>
        <buttons class="optionbtn"></buttons>
        <buttons class="optionbtn"></buttons>
      </div>
    </div>
    <div class="routes-section">
      <div class="route-container">
        <Homeicon />
        <p class="route">Home</p>
      </div>
      <div class="route-container">
        <Exploreicon />
        <p class="route">Explore</p>
      </div>
      <div class="route-container">
        <Popularicon />
        <p class="route">Popular</p>
      </div>
      <div class="route-container">
        <Genresicon />
        <p class="route">Genres</p>
      </div>
      <router-link :to="'/Playlists'" class="router-link">
        <div class="route-container">
          <Playlistsicon />
          <p class="route">Playlists</p>
        </div>
      </router-link>
      <div class="route-container">
        <Searchicon />
        <p class="route">Search</p>
      </div>
      <div class="route-container">
        <Likedicon />
        <p class="route">Liked</p>
      </div>
      <div class="route-container">
        <Socialicon />
        <p class="route">Social</p>
      </div>
    </div>
    <hr class="break">
    <div class="musicplayer-section">
      <div class="musicplayer-option">
        <Addicon />
        <p class="musicplayer-option-name">Add</p>
      </div>
      <div class="musicplayer-option">
        <NewPlaylisticon />
        <p class="musicplayer-option-name">New playlist</p>
      </div>
      <div class="musicplayer-option">
        <LikeSongicon />
        <p class="musicplayer-option-name">Like song</p>
      </div>
      <div class="musicplayer-option">
        <Shareicon />
        <p class="musicplayer-option-name">Share</p>
      </div>
      <div class="musicplayer-option">
        <Targeticon />
        <p class="musicplayer-option-name">Target</p>
      </div>
      <div @click="logout" class="musicplayer-option">
        <Logouticon />
        <p class="musicplayer-option-name">Log out</p>
      </div>
    </div>
  </div>
</template>

<script>

import Usericon from '../assets/icons/Useravatar.vue'
import Homeicon from '../assets/icons/Homeicon.vue'
import Exploreicon from '../assets/icons/Exploreicon.vue'
import Popularicon from '../assets/icons/Popularicon.vue'
import Genresicon from '../assets/icons/Genresicon.vue'
import Playlistsicon from '../assets/icons/Playlistsicon.vue'
import Searchicon from '../assets/icons/Searchicon.vue'
import Likedicon from '../assets/icons/Likedicon.vue'
import Socialicon from '../assets/icons/Socialicon.vue'

import Addicon from '../assets/icons/Addicon.vue'
import NewPlaylisticon from '../assets/icons/NewPlaylisticon.vue'
import LikeSongicon from '../assets/icons/LikeSongicon.vue'
import Shareicon from '../assets/icons/Shareicon.vue'
import Targeticon from '../assets/icons/Targeticon.vue'
import Logouticon from '../assets/icons/Logouticon.vue'

export default {
  data() {
    return{
      chosenRoute: false
    }
  },
  components: {
    Usericon, Homeicon, Exploreicon, Popularicon, Genresicon, Playlistsicon, Searchicon, Likedicon, Socialicon, Addicon, NewPlaylisticon, LikeSongicon, Shareicon, Targeticon, Logouticon},
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    loggedIn(){
      console.log("loggedIn i SideBar",this.$store.state.loggedIn)
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    logout() {
      if(this.currentUser) {
        this.$store.dispatch('logout');
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  }

.break {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 3em 0 1em 0;
}

.sidebar {
  background-color: rgba(36, 37, 38, 0.5);
  width: 20vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

.productname {
  font-size: 40px;
}

.top-section {
  display: flex;
  gap: 1em;
  justify-content: space-between;
}

.user-section {
  display: flex;
  gap: 1em;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(78, 78, 78, 0.514);
  padding: 0.5em;
  border-radius: 5px;
  margin-top: 1em;
}

.avatar-name {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

.optionbtns-section {
  display: flex;
  gap: 0.25em;
  cursor: pointer;
}

.optionbtns-section:hover {
  opacity: 0.5;
}

.optionbtn {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #fff;
}

.routes-section {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 2em;
}

.route-container {
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
}

.router-link {
  text-decoration: none;
  color: white;
}

.route-container:hover {
  opacity: 0.5
}

.route {
  font-size: 14px;
}

.musicplayer-section {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 2em;
}

.musicplayer-option {
  display: flex;
  gap: 0.5em;
  align-items: center;
  cursor: pointer;
}

.musicplayer-option:hover {
  opacity: 0.5;
}

.musicplayer-option-name {
  font-size: 14px;
}

</style>