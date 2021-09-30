<template>
  <div class="video-container">
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoId: null,
    };
  },
  created() {
    document.getElementById("yt-player").style.display = "inline";
    document.getElementById("yt-player").style.margin = "10% 0 0 40%";
    document.getElementById("yt-player").videoId = getVideoId();
    window.player.loadVideoById(getVideoId());
  },
  computed: {
    getVideoId() {
      return this.$route.params.id;
    },
  },
  methods: {
    test() {
      console.log(this.getVideoId());
    },
  },
};
</script>
<style scoped>
.video-container {
  text-align: center;
}
</style>
