<template>
  <div class="video-container"></div>
</template>

<script>
export default {
  data() {
    return {
      videoId: [],
      url: 'https://yt-music-api.herokuapp.com/api/yt/song/',
    };
  },
  created() { 
    this.commitSong();
  },
   
  computed: {
    getVideoId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async fetchSong() {
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.videoId = data;
    },
    commitSong() {
    this.fetchSong();
    document.getElementById("yt-player").style.display = "inline";
    this.$store.commit("setSongId", this.$route.params.id)
    this.$store.commit("setSongList", this.videoId)
    },
  },
};
</script>
<style scoped>
.video-container {
  text-align: center;
}
</style>
