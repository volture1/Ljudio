<template>
  <div class="container">
    <div class="search">
      <input type="text" class="input" />
      <div class="submit">
        <img
          src="https://i.imgur.com/nPCknKH.png"
          height="40"
          width="40"
          @click="
            async () => {
              await fetch();
              await fetchArtists();
              await fetchPlaylists();
              this.showMore = false;
            }
          "
          class="submit-btn"
        />
      </div>
    </div>
    <div v-if="showEmpty" class="empty-container">
      <img class="empty-image" src="https://i.imgur.com/v9DnpGQ.png" />
      <h1 class="empty-text">
        Find your favorite songs, artists and playlists!
      </h1>
    </div>
    <div v-if="!doneLoading && !showEmpty" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-if="doneLoading" class="search-contents">
      <h1 v-if="showHeaders == true">Songs</h1>
      <div class="search-list-songs">
        <p v-if="this.list.length < 1">No songs found :/</p>
        <div
          v-for="result in this.list"
          :key="result"
          class="result"
          @change="
            () => {
              this.testId++;
            }
          "
          @click="
            () => {
              printVideoId(result.videoId);
              
            }
          "
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
        <div v-if="showMore == false && this.list.length > 4">
          <p
            class="show-more-button"
            @click="(showMore = true), (this.testId = 0)"
          >
            Show more
          </p>
        </div>
      </div>
      <h1 v-if="showHeaders == true">Artists</h1>
      <p v-if="this.listArtists.length < 1">No artists found :/</p>
      <div class="search-list-artists">
        <div
          v-for="result in this.listArtists"
          :key="result"
          class="result-artist"
          @click="$router.push('/artist/' + result.browseId)"
        >
          <img :src="result.thumbnails[1].url" class="artist-image" />
          <p class="artist-name">{{ result.name }}</p>
        </div>
      </div>
      <h1 v-if="showHeaders == true">Playlists</h1>
      <div class="search-list-playlist">
        <p v-if="this.listPlaylist < 1">No songs found :/</p>
        <div
          v-for="result in this.listPlaylist"
          :key="result"
          class="result-playlist"
        >
          <div v-if="result.thumbnails.url">
            <img
              id="clip"
              :src="result.thumbnails.url"
              class="playlist-image"
            />
            <p class="playlist-name">{{ result.title }}</p>
          </div>
          <div v-else>
            <img
              id="clip"
              :src="result.thumbnails[0].url"
              class="playlist-image"
            />
            <p class="playlist-name">{{ result.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: "AIzaSyDXqGC3bzyIcfV90q_V61IZaM68S6I4m9E",
      url: "https://yt-music-api.herokuapp.com/api/yt/songs/",
      urlArtist: "https://yt-music-api.herokuapp.com/api/yt/artists/",
      urlPlaylist: "https://yt-music-api.herokuapp.com/api/yt/playlists/",
      songArray: [],
      fiveSongs: [],
      artistArray: [],
      playlistArray: [],
      doneLoading: false,
      showMore: false,
      showEmpty: true,
      showHeaders: false,
      testId: 0,
    };
  },

  computed: {
    list() {
      if (!this.showMore) {
        return this.fiveSongs;
      } else {
        return this.songArray;
      }
    },
    listArtists() {
      return this.artistArray;
    },
    listPlaylist() {
      return this.playlistArray;
    },
  },
  methods: {
    printVideoId(id) {
      this.$store.commit("setSongId", id);
      this.$store.commit("setSongList", this.songArray);
    },
    calculateDuration(duration) {
      let time = new Date(duration);
      let newTime = time.toLocaleTimeString(navigator.language, {
        minute: "2-digit",
        second: "2-digit",
      });
      return newTime;
    },
    increment() {
      this.testId++;
    },
    async fetch() {
      this.doneLoading = false;
      let search = document.querySelector(".input").value;
      let str = search.replace(/\s/g, "");
      let res = await fetch(this.url + str);
      this.showEmpty = false;
      let data = await res.json();

      this.songArray = [...data.content];
      this.fiveSongs = [...this.songArray];

      this.playlist.songs = [...this.songArray];
     
      this.showHeaders = true;
      this.fiveSongs.splice(5, 15);
    },
    async fetchArtists() {
      let search = document.querySelector(".input").value;
      let res = await fetch(this.urlArtist + search);
      let data = await res.json();

      this.artistArray = [...data.content];
      this.artistArray.splice(1, 99);
    },
    async fetchPlaylists() {
      this.listPlaylistArray = [];
      let search = document.querySelector(".input").value;
      
      let res = await fetch(this.urlPlaylist + search);
      let data = await res.json();

      this.playlistArray = [...data.content];
      this.playlistArray.splice(5, 15);
      this.doneLoading = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
h1 {
  font-size: 25px;
  font-family: "Poppins", sans-serif;

  padding-top: 10px;
  padding-bottom: 10px;
}
p {
  user-select: none;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}


.container {
  width: 75%;
  display: flex;
  flex-direction: column;
  margin-left: 20vw;
  padding: 1em;
}
 @media screen and (max-width: 950px) {
  .container{
    margin-left: 5%;
    width: 95%;
  }
} 

.input {
  padding: 1em;
  width: 25vw;
  border-radius: 10px;
  background-color: black;
  margin-top: 1em;
  color: white;
}
.artist-name {
  text-align: center;
  margin-top: 5px;
  color: #ffffff;
}
.artist-image {
  border-radius: 4px;
  display: block;

  width: auto;
  height: auto;

  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  border-radius: 50%;
 
}
.playlist-image {
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.playlist-name {
  text-align: center;
  margin-top: 5px;
  color: #ffffff;
}
.submit-btn {
  margin-top: 20px;
  margin-left: 10px;
}

.submit-btn:hover {
  cursor: pointer;
}

.search-list-songs {
  display: flex;
  gap: 1em;
  flex-direction: column;
}

.result {
  height: 50px;
  border-radius: 5px;
  background-color: #c4c4c421;
}
#result-text {
  width: 15%;
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
.result:hover {
  background-image: linear-gradient(
    rgba(104, 104, 219, 0.301),
    rgb(199, 207, 247, 0.301)
  );
  
  box-shadow: 5px 5px 5px teal;
  cursor: pointer;
}
.result-artist {
  background-color: gray;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  color: black;
}
.result-playlist {
  background-color: gray;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  margin-right: 30px;

  margin-bottom: 60px;
}
.search-list-artists {
  padding-top: 20px;
  padding-bottom: 20px;
}

.thumbnail {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 60px;
}
.search-list-playlist {
  display: flex;
  flex-wrap: wrap;
}
.search {
  display: flex;
  padding-bottom: 20px;
  height: 100px;
  align-items: center;
}
.empty-container {
  display: flex;
}
.empty-image {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  height: 200px;
  margin-left: 100px;
}
.empty-text {
  margin-top: 140px;
  margin-left: 20px;
  color: gray;
}
.show-more-button {
  text-align: right;
  cursor: pointer;
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