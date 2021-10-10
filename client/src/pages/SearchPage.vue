<template>
  <div>
    <Search />
  </div>
</template>

<script>
import Search from "../components/Search.vue";

export default {
  created(){
    document.getElementById("yt-player").style.display = "none";
  },
  components: { Search },
};
</script>
