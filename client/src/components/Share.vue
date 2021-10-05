<template>
<div class="container">
  <div @click="showModal = true" class="share-container">
  <p>SHARE</p>
  </div>
  <div v-if="showModal" class="modal">
    <p @click="this.copySong()">copy song url</p>
    <p>copy artist url</p>
    <p>copy album url</p>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      showModal: false,
      currentSong: null,
    }
  },
  computed: {
    songId() {
      return this.$store.state.currentSong;
    },
  },
  // watch: {
  //   songId(newId){
  //     console.log(newId)
  //   }
  // },
  methods: {
    copySong(){
      console.log(this.songId)
      let str = 'http://localhost:3000/video/' + this.currentSong
      console.log(str)
      str = document.execCommand('copy');
    },
    copyArtist(){

    },
    copyAlbum(){

    },
  },
}
</script>
<style scoped>
  .container{
    display: flex;
    flex-direction: row;
  }
  .share-container{
    background-color: blue;
    height: 30px;
    width: 50px;
  }
  .modal{
    background-color: red;
    height: 150px;
    width: 200px;
  }
</style>