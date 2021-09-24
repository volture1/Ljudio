<template>
  <div class="container">
    <h1>Search</h1>

    <div class="search">
      <input type="text" class="input" />
    </div>
    <div class="submit">
      <!--<button @click="fetchArtists()">fetchArtists</button>-->
      <button
        @click="
          () => {
            fetch();
            fetchArtists();
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
        <img :src="this.artistImage" class="artist-image" id="imgId" />
        <p class="artist-name">{{ result.name }}</p>
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
      test: null,
      songArray: [],
      fiveSongs: [],
      artistArray: [],
      artistImage: "",
      testId: "",
    };
  },
  computed: {
    list() {
      return this.fiveSongs;
    },
    listArtists() {
      //return this.filteredArtistArray
      return this.artistArray;
    },
  },
  methods: {
    printVideoId(id) {
      this.$store.commit("setSongId", id);
    },

    async fetch() {
      let search = document.querySelector(".input").value;
      //document.querySelector(".input").value = "";
      let res = await fetch(this.url + search);
      let data = await res.json();

      this.songArray = [...data.content];
      this.fiveSongs = [...this.songArray];
      this.fiveSongs.splice(5, 15);
      //console.table(this.songArray);
      //console.table(this.fiveSongs);
      // for (let i = 0; i >= 4; i++) {
      //   //this.fiveSongs[i] = [...this.songArray[i]];
      // }
    },
    async fetchArtists() {
      let search = document.querySelector(".input").value;
      document.querySelector(".input").value = "";
      let res = await fetch(this.urlArtist + search);
      let data = await res.json();

      this.artistArray = [...data.content];
      //console.table(this.artistArray);
      //this.filteredArtistArray = [...this.artistArray];
      this.artistArray.splice(1, 99);
      console.log(this.artistArray[0].thumbnails[0].url);
      this.artistImage = this.artistArray[0].thumbnails[0].url;

      //console.log(this.artistArray);
      //console.log(this.artistArray[0].thumbnails[0].url);
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
  height: 100px;
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  border-radius: 25px;
  padding: 5px;
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
  height: 150px;
  width: 150px;
  padding-top: 20px;
  border-radius: 25px;
}

.thumbnail {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 60px;
}
</style>