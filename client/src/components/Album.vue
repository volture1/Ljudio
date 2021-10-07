<template>
  <div v-if="showPage" class="album-container">
    <div class="padding"></div>
    <div class="album-info">
      <img
        v-if="this.albumList.thumbnails.url"
        class="album-image"
        :src="this.albumList.thumbnails.url"
      />
      <img v-else class="album-image" :src="this.albumList.thumbnails[0].url" />

      <h1>{{ this.albumList.title }}</h1>
      <p>
        {{ this.albumList.year }} -
        {{ this.calculateDuration(this.albumList.duration) }}
      </p>
    </div>
    <div v-if="!showSongs" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-if="showSongs" class="album-songs">
      <div
        v-for="result in this.songs"
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
</template>

<script>
export default {
  data() {
    return {
      url: "https://yt-music-api.herokuapp.com/api/yt/album/",
      urlSongs: "https://yt-music-api.herokuapp.com/api/yt/song/",
      albumList: [],
      songVideoIds: [],
      tempSongs: [],
      songs: [],
      showPage: false,
      showSongs: false,
    };
  },
  async created() {
    this.getAlbum();
  },
  methods: {
    sendVideoId(id) {
      this.$store.commit("setSongId", id);
      this.$store.commit("setSongList", this.songs);
    },
    async getAlbum() {
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.albumList = data;
      this.showPage = true;
      this.getSongs();
    },
    async getSongs() {
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.tempSongs = [...data.tracks];
      this.sendSongs();
    },
    async sendSongs() {
      this.songVideoIds = this.tempSongs.map((a) => a.videoId);
      for (let i = 0; i < this.songVideoIds.length; i++) {
        let res = await fetch(this.urlSongs + this.songVideoIds[i]);
        let data = await res.json();
        if (data != null) {
          this.songs.push(data);
        } else {
        }
      }
      this.showSongs = true;
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
.album-container {
  margin-left: 20%;
}
@media screen and (max-width: 950px) {
  .album-container{
    margin-left: 5%;
    width: 95%;
  }
} 
.result {
margin-right: 5px;
  height: 50px;
  border-radius: 5px;
  background-color: #c4c4c421
}
.album-songs {
  display: flex;
  gap: 1em;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 15%;
  margin-top: 5%;
  
}
.padding {
  height: 50px;
}
#result-image {
  margin-right: 12%;
  margin-left: 2%;
  margin-top: 5px;
  float: left;
  display: inline;
}
#result-text {
  width: 15%;
  margin-top: 15px;
  float: left;
  display: inline;
}
.result-multiple-artists {
  
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
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-left: 100px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>