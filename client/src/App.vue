<script setup>
import MusicPlayer from "./components/MusicPlayer.vue";
import SideBar from "./components/Sidebar.vue";
import LandingPage from "./pages/LandingPage.vue";
</script>

<template>
  <div>
    <div v-if="currentUser" class="container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" class="burger-menu-button" @click="this.sidebarToggle()"/>
      <div class="sidebar" v-if="renderCondition">
        <SideBar v-if="showSidebar" />
      </div>
      <router-view></router-view>
      <div class="music-player" v-if="renderCondition">
        <MusicPlayer />
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renderCondition: true,
      showSidebar: true,
    };
  },
  components: { MusicPlayer, SideBar },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  created() {
    this.interval = setInterval(() => this.conditionalRender(), 1);
    if (this.$store.state.currentUser) {
      return;
    } else {
      this.$store.dispatch("getLoggedIn");
    }
  },
  components: { MusicPlayer, SideBar },
  methods: {
    conditionalRender() {
      if (
        this.$route.path == "/Register" ||
        this.$route.path == "/" ||
        this.$route.path == "/Login"
      ) {
        this.renderCondition = false;
      } else {
        this.renderCondition = true;
      }
    },
    sidebarToggle(){
      if(this.showSidebar){
        this.showSidebar = false;
      }
      else{
        this.showSidebar = true;
      }
    }
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");

.burger-menu-button {
  display: none;
}
@media screen and (max-width: 950px) {
  .burger-menu-button {
    margin-left: 2%;
    margin-top: 2%;
    display:inline;
    width: 40px;
    height: 40px;
    z-index: 99;
    position: fixed;
    background-color:#c9d1da3b;
    border-radius: 5px;
  }
}
.sidebar {
  background-color: rgba(36, 37, 38);
  width: 20%;
  height: 100vh;
  position: fixed;
  left: 0;
  
}
@media screen and (max-width: 950px) {
  .sidebar {
    width: 50%;
    z-index: 98;
    background-color: rgba(36, 37, 38, 0);
  }
}
.music-player {
  background-color: #242526;
  width: 80%;
  height: 10vh;
  position: fixed;
  bottom: 0;
  right: 0;
}
@media screen and (max-width: 950px) {
  .music-player{
    width:100%;
  }
}
* {
  margin: 0;
  box-sizing: border-box;
}

body {
  background: #18191a;
}

#app {
  font-family: "PT Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
</style>
