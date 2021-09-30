<template>
  <div class="video-container">
    <p @click="this.setupVideoPlayer()">ShowVideoComponent</p>
    <p>{{ getVideoId }}</p>
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
    console.log("video component is created");
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
    setupVideoPlayer() {
      window.player.height = "1000";
      window.player.width = "1000";
    },
  },
};
</script>
<style scoped>
.video-container {
  text-align: center;
}
</style>
