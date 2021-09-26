<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MusicPlayer from "./components/MusicPlayer.vue";
import SideBar from "./components/Sidebar.vue";
</script>

<template>
  <div>
    <div class="container">
      <div class="sidebar" v-if="renderCondition">
        <SideBar />
      </div>
      <div class="music-player" v-if="renderCondition">
        <MusicPlayer />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renderCondition: true,
    };
  },
  created() {
    this.interval = setInterval(() => this.conditionalRender(), 1);
  },
  components: { MusicPlayer, SideBar },
  methods: {
    conditionalRender() {
      //console.log(this.$route.path);
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
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
.container {
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
}
.sidebar {
  background-color: #242526;
  width: 20%;
  height: 100vh;
  position: fixed;
  left: 0;
}
.music-player {
  background-color: #242526;
  width: 80%;
  height: 1vh;
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
