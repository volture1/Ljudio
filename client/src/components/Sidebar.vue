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
      <Useravatar class="avatar"/>
      <h3 class="username">{{currentUser[0].firstname}} {{currentUser[0].lastname}}</h3>
    </div>
    <div class="routes-section">
      <p class="route">Home</p>
      <p class="route">Explore</p>
      <p class="route">Popular</p>
      <p class="route">Genres</p>
      <p class="route">Playlist</p>
      <p class="route">Search</p>
      <p class="route">Liked</p>
      <p class="route">Social</p>
    </div>
    <div class="musicplayer-section"></div>
  </div>
</template>

<script>
import Useravatar from '../assets/icons/Useravatar.vue'
export default {
  components: {
    Useravatar
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: rgba(36, 37, 38, 0.5);
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

.productname {
  font-size: 28px;
}

.top-section {
  display: flex;
  gap: 1em;
}

.user-section {
  display: flex;
  gap: 1em;
  align-items: center;
  background-color: rgba(78, 78, 78, 0.514);
  padding: 0.5em;
  border-radius: 5px;
}

.routes-section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.route {
  font-size: 18px;
  font-weight: 900;
}

</style>