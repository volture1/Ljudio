<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MusicPlayer from "./components/MusicPlayer.vue";
import SideBar from "./components/Sidebar.vue";
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <SideBar />
    </div>
    <div class="music-player">
      <MusicPlayer />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default { components: { MusicPlayer, SideBar } };
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
.container {
  display: flex;
  justify-content: space-between;
  margin-left: 50vh;
}
.sidebar {
  background-color: blue;
  width: 20%;
  height: 100vh;
  position: fixed;
  left: 0;
}
.music-player {
  background-color: red;
  width: 75%;
  height: 10vh;
  position: fixed;
  bottom: 0;
}

* {
  margin: 0;
  box-sizing: border-box;
}

body {
  /* background: rgb(0, 0, 0, 0.8); */
  background: #18191a;
}

#app {
  /* width: 100vw;
  height: 100vh; */
  font-family: "PT Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: rgb(0, 0, 0, 0.8); */
  color: white;
}
</style>
