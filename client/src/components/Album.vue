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
        <p>{{ this.albumList.year }} - {{ this.calculateDuration(this.albumList.duration)}}</p>
    </div>
    <div v-if="showSongs" class="album-songs">
      <div
        v-for="result in this.tempSongs"
        :key="result"
        class="result"
        @click="sendVideoId(result.videoId)"
      >
        <p id="result-text">{{ result.name }}</p>
      </div>
    </div>
   </div>
</template>

<script>
export default {
  data() {
    return{
      url: "https://yt-music-api.herokuapp.com/api/yt/album/",
      urlSongs: "https://yt-music-api.herokuapp.com/api/yt/song/",
      albumList: [],
      songVideoIds: [],
      tempSongs: [],
      songs: [],
      showPage: false,
      showSongs: true,
    }
  },
   async created(){
   this.getAlbum();
  },
  methods:{
    sendVideoId(id) {
     
           this.$store.commit("setSongId", id);
       this.$store.commit('setPlaylist', this.songs);
    },
    async getAlbum(){
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.albumList = data;
      this.showPage = true;
      await this.getSongs();
    },
    async getSongs(){
      let res = await fetch(this.url + this.$route.params.id);
      let data = await res.json();
      this.tempSongs = [...data.tracks];
      console.log(this.tempSongs)
      // this.songVideoIds = this.tempSongs.map((a) => a.videoId);
      // for(let i = 0; i < this.songVideoIds.length; i++){
      //   let res = await fetch(this.urlSongs + this.songVideoIds[i]);
      //   let data = await res.json();
      //   if(data != null){
      //     this.songs.push(data)
      //   }
      //   else{
      //     return;
      //   }
      // }
      // this.$store.commit('setPlaylist', this.songs);
      
      this.showSongs = true;
      this.sendSongs();
    },
    async sendSongs(){
       this.songVideoIds = this.tempSongs.map((a) => a.videoId);
       for(let i = 0; i < this.songVideoIds.length; i++){
         let res = await fetch(this.urlSongs + this.songVideoIds[i]);
        let data = await res.json();
         if(data != null){
           this.songs.push(data)
        }
         else{
           return;
         }
       }
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
}
</script>
<style scoped>
  .album-container{
    margin-left: 20%;
  }
  .result {
  margin-right: 5px;
  height: 50px;
  border-radius: 5px;
  background-color: #c4c4c421;
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
</style>