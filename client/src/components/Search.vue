<template>
  <div class="container">
    <h1>Search</h1>

    <div class="search">
      <input type="text" class="input" />
    </div>
    <div class="submit">
      <button @click="fetch()" class="submit-btn">Search songs</button>
    </div>

    <div class="searchlist" v-if="this.test">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: "AIzaSyDXqGC3bzyIcfV90q_V61IZaM68S6I4m9E",
      url: "https://yt-music-api.herokuapp.com/api/yt/songs/",
      test: null,
      songArray: [],
      testId: "",
    };
  },
  computed: {
    list() {
      return this.test;
    },
  },
  methods: {
    printVideoId(id) {
      console.log(id);
    },
    async fetch() {
      let search = document.querySelector(".input").value;
      document.querySelector(".input").value = "";
      /* console.log(url); */
      let res = await fetch(this.url + search);
      let data = await res.json();

      /* let isArr = data.items instanceof Array;
      console.log(isArr); */

      console.log(data.content);
      
    
      // let ids = [];
      // for(let item of data.content) {
      //   ids.push(item.id.videoId);
      // }
      // console.log(ids);
      // let idstr = this.multipleIdString(ids);
      // console.log(idstr);
      // res = await fetch(this.url2 + '?key=' + this.api_key + '&part=snippet,statistics,contentDetails&id=' + idstr);
      // data = await res.json();
      // console.log(content.items);
      this.test = data.content;
      // foreach(item in test){
      //    console.log(item.name)
      // }
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

.searchlist {
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

.thumbnail {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 60px;
}
</style>