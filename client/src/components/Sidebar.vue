<template>
  <div class="sidebar">
    <div class="top-section">
      <router-link to='/Home' class="router-link">
      <h3 class="productname">Ljudio</h3>
      </router-link>  
      <img src="../assets/Logo.png" alt="">
    </div>
    <div class="user-section">
      <div class="avatar-name">
        <Usericon class="avatar"/>
        <h4 class="username">{{currentUser.firstname}} {{currentUser.lastname}}</h4>
      </div>
      
    </div>
    <div class="routes-section">
      <router-link to='/Home' class="router-link">
        <div class="route-container">
          <Homeicon />
          <p class="route">Home</p>
        </div>
      </router-link>  
      <router-link :to="'/Playlists'" class="router-link">
        <div class="route-container">
          <Playlistsicon />
          <p class="route">Playlists</p>
        </div>
      </router-link>
      <router-link to='/search' class='router-link'>
        <div class="route-container">
          <Searchicon />
          <p class="route">Search</p>
        </div>
      </router-link>
      <router-link :to="'/liked'" class="router-like" >
        <div class="route-container">
        <Likedicon />
        <p class="route">Liked</p>
      </div>
      </router-link>      
     
    </div>
    <hr class="break">
    <div class="musicplayer-section">
      
      <div class="musicplayer-option" @click="show()">
        <NewPlaylisticon />
        <p class="musicplayer-option-name">New playlist</p>
      </div>
      <CreatePlPopup v-if="toggle"/>
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

import CreatePlPopup from './CreatePlaylistPopup.vue'

export default {
  data() {
    return{
      chosenRoute: false,
    }
  },
  components: {
    Usericon, Homeicon, Popularicon, Genresicon, Playlistsicon, Searchicon, Likedicon, Socialicon, Addicon, NewPlaylisticon, LikeSongicon, Shareicon, Targeticon, Logouticon, CreatePlPopup},
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    loggedIn(){
      return this.$store.state.loggedIn;
    },
    toggle() {
      return this.$store.state.toggleCreatePl;
    }
  },
  methods: {
    logout() {
      if(this.currentUser) {
        this.$store.dispatch('logout');
        this.$router.push('/');
      }
    },
    show() {
      this.$store.commit('setToggleCreatePl', true);
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
  background-color: rgb(36, 37, 38);
  
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

.productname {
  font-size: 40px;
}
@media screen and (max-width: 950px) {
  .productname{
    margin-left:20%;
  }
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