<template>
  <div class="container">
    <h1>Search</h1>

    <div class="search">
      <input type="text" class="input" />
    </div>
    <div class="submit">
      <button
        @click="
          () => {
            fetch();
            fetchArtists();
            fetchPlaylists();
          }
        "
        class="submit-btn"
      >
        Search songs
      </button>
    </div>

    <div class="search-list-songs">
      <div
        @click="printVideoId(result.videoId)"
        v-for="result in this.list"
        :key="result"
        class="result"
      >
        <p>{{ result.name }}</p>
        <p>{{ result.artist.name }}</p>
      </div>
    </div>
    <div class="search-list-artists">
      <div
        v-for="result in this.listArtists"
        :key="result"
        class="result-artist"
      >
        <img :src="result.thumbnails[1].url" class="artist-image" />
        <p class="artist-name">{{ result.name }}</p>
      </div>
    </div>
     <div class="search-list-playlist">
      <div
        v-for="result in this.listPlaylist"
        :key="result"
        class="result-playlist"
      >
        <img :src="result.thumbnails[1].url" class="playlist-image" />
        <p class="playlist-name">{{ result.title }}</p>
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
      test: null,
      songArray: [],
      fiveSongs: [],
      artistArray: [],
      playlistArray: [],
      testId: "",
    };
  },
  computed: {
    list() {
      return this.fiveSongs;
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
    },

    async fetch() {
      let search = document.querySelector(".input").value;
      let res = await fetch(this.url + search);
      let data = await res.json();

      this.songArray = [...data.content];
      this.fiveSongs = [...this.songArray];
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
      let search = document.querySelector(".input").value;
      document.querySelector(".input").value = "";
      let res = await fetch(this.urlPlaylist + search);
      let data = await res.json();

      this.playlistArray = [...data.content];
      this.playlistArray.splice(5, 15);
      console.log(this.playlistArray)
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");

p {
  font-family: "PT Sans", sans-serif;
  font-size: 14px;
}

.container {
  margin: 0 auto;
  width: 50vw;
  display: flex;
  flex-direction: column;
}

.input {
  padding: 1em;
  width: 25vw;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-top: 1em;
  outline: none;
}
.artist-name {
  text-align: center;
}
.artist-image {
  border-radius: 4px;
  height: 200px;
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  border-radius: 25px;
}
.playlist-image {
  height: 200px;
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
}
.submit-btn {
  outline: none;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin-top: 1em;
  color: black;
  background-color: rgba(255, 0, 0, 0.1);
  font-size: 14px;
  padding: 0.25em 2em;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: rgba(255, 0, 0, 0.25);
}

.search-list-songs {
  display: flex;
  gap: 1em;
  flex-direction: column;
}

.result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1em;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: #c4c4c421;
}
.result-artist {
  background-color: gray;
  height: 200px;
  width: 200px;
  border-radius: 25px;
}
.result-playlist {
  background-color: gray;
  height: 200px;
  width: 200px;
  border-radius: 25px;
  margin-right: 20px;
  margin-top: 40px;
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
</style>