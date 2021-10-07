<template>
  <div v-if="showPage" class="artist-container">
  <div>
    <div class="padding"></div>
    <div class="artist-profile">
      <img class="artist-image" :src="this.artistId.thumbnails[2].url" />
      <h1 class="artist-title">{{ this.artistId.name }}</h1>
      <p class="artist-title">
        {{ numberWithCommas(this.artistId.views) }} total streams
      </p>
    </div>
    <h1>Top 5 songs</h1>
    <div class="top-songs">
      <div
        v-for="result in this.topFive"
        :key="result"
        class="result"
        @click="sendVideoId(result.videoId)"
      >
       <img
            id="result-image"
            :src="result.thumbnails[1].url"
            height="40"
            width="40"
          />

          <p id="result-text">{{ result.name }}</p>
          <p id="result-text">{{ result.album.name }}</p>
          <div v-if="result.artist.name">
            <p id="result-text">{{ result.artist.name }}</p>
          </div>
          <div class="result-multiple-artists" v-else>
            <div class="result-single-artist">
              <p
                v-for="artist in result.artist"
                :key="artist"
                id="result-text-artist"
              >
                {{ artist.name }}
              </p>
            </div>
          </div>
         <p id="result-text">
            {{ calculateDuration(result.duration) }}
          </p>
        </div>
      </div>
    </div>
    <h1>Albums</h1>
    <div class="albums">
      <div
        v-for="album in this.artistId.products.albums.content"
        :key="album"
        class="result-album"
        @click="$router.push('/album/' + album.browseId)"
      >
        <div class="album-contents">
          <img
            v-if="album.thumbnails.url"
            class="album-image"
            :src="album.thumbnails.url"
          />
          <img v-else class="album-image" :src="album.thumbnails[0].url" />
          <p id="album-text">{{ album.name }}</p>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "https://yt-music-api.herokuapp.com/api/yt/artist/",
      urlSongs: "https://yt-music-api.herokuapp.com/api/yt/songs/",
      topFive: [],
      artistId: null,
      showPage: false,
    };
  },
  computed: {
    listSongs() {
      return this.artistId.products.songs.content;
    },
  },

  async created() {
    await this.getArtist();
    await this.getSongs();
  },
  mounted() {},
  methods: {
    sendVideoId(id) {
      this.$store.commit("setSongId", id);
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getSongs() {
      let res = await fetch(this.urlSongs + this.artistId.name);
      let data = await res.json();

      this.topFive = [...data.content];
      this.topFive.splice(5, 15);

      
      this.$store.commit("setSongList", this.topFive);
    },
    async getArtist() {
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();

      this.artistId = data;
      this.showPage = true;
    },
    calculateDuration(duration) {
      let time = new Date(duration);
      let newTime = time.toLocaleTimeString(navigator.language, {
        minute: "2-digit",
        second: "2-digit",
      });
      return newTime;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 25px;
  font-family: "Poppins", sans-serif;

  padding-top: 10px;

  margin-left: 5%;
}
p {
  user-select: none;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}
.artist-container {
  margin-left: 20%;
}
@media screen and (max-width: 950px) {
  .artist-container{
    margin-left: 5%;
    width: 95%;
  }
} 
.artist-profile {
  margin-left: 20%;
  height: 65vh;
  width: 100vh;
  background-color: rgb(49, 46, 46);
  border-radius: 4px;
}
@media screen and (max-width: 950px) {
  .artist-profile{
    margin-left: 10%;
    width: 75%;
    height: 60%
  }
} 
.top-songs {
  display: flex;
  gap: 1em;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 15%;
  margin-top: 5%;
}
.albums {
  display: flex;
  gap: 1em;

  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 5%;
  margin-right: 10%;
  margin-top: 5%;
}
.album-contents {
  margin-left: 10px;
  margin-top: 5px;
}
.album-image {
  margin-right: 5px;
}
#album-text {
  margin-top: 10px;
}
.result {
  margin-right: 5px;
  height: 50px;
  border-radius: 5px;
  background-color: #c4c4c421;
}
.result-album {
  width: 250px;
  height: 300px;
  background-color: #c4c4c423;
}
#result-text {
  width: 20%;
  margin-top: 15px;
  float: left;
  display: inline;
}
#result-image {
  margin-right: 12%;
  margin-left: 2%;
  margin-top: 5px;
  float: left;
  display: inline;
}
.artist-image {
  height: 45vh;
  width: 100vh;
  border-radius: 4px;
}
@media screen and (max-width: 950px) {
  .artist-image{
    
    width: 100%;
    height: 60%
  }
} 
.artist-title {
  margin-left: 10vh;
}
.padding {
  height: 50px;
}
#result-text {
  width: 15%;
  margin-top: 15px;
  float: left;
  display: inline;
}
.result-multiple-artists {
  /* position: relative; */
  width: 20%;
  margin-top: 10px;
  float: left;
  display: inline;
}
.result-single-artist {
  flex-basis: 10%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}
.result-artist {
  background-color: gray;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  color: black;
}
</style>