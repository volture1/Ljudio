<template>
  <div class="video-container"></div>
</template>

<script>
export default {
  data() {
    return {
      videoId: [],
      playlist: [{}],
      url: 'https://yt-music-api.herokuapp.com/api/yt/song/',
    };
  },
  created() { 
    this.test2();
  },
   
  computed: {
    getVideoId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async test() {
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.videoId = data;
      console.log(data, 'data')
      console.log(this.videoId, 'videoid')
    },
    test2() {
    this.test();
    document.getElementById("yt-player").style.display = "inline";
    this.$store.commit("setSongId", this.$route.params.id)
    this.$store.commit("setSongList", this.videoId)
    console.log(this.videoId)
    },
  },
};
</script>
<style scoped>
.video-container {
  text-align: center;
}
</style>
