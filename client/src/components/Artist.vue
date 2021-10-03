<template>
  <div v-if="showPage" class="artist-container">
    <div class="padding">
    </div>
    <div class="artist-profile">
        <img class="artist-image" :src="this.artistId.thumbnails[2].url" />
      <h1 class="artist-title">{{ this.artistId.name }}       </h1>
      
    </div>
    <button @click="this.getArtist" style="margin-left: 20%">test</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "https://yt-music-api.herokuapp.com/api/yt/artist/",
      artistId: null,
      showPage: false,
    };
  },

  async created() {
    console.log("it created it");
    await this.getArtist();
  },
  mounted() {},
  methods: {
    async getArtist() {
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.artistId = data;
      console.log(this.artistId, "SUCCESSSSSSS");
      this.showPage = true;
    },
  },
};
</script>

<style scoped>
.artist-container {
  margin-left: 20%;
}

.artist-image{
  margin-left: 20%;
  
 
             
}
/* .image{
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}
.artist-image{
  width: auto;
  height: 100%;
  margin-left: -60%;
} */



</style>