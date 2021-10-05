<template>
  <div class="sidebar">
    <nav>
      <h1 @click="$router.push('/')">Ljudio</h1>
      <router-link to="/search">Search </router-link>
    </nav>
    <Share/>
  </div>
</template>

<script>
import Share from './Share.vue'
export default {
  components:{
    Share,
  }
};
</script>

<style scoped>
</style>