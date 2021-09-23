<template>
  <div>
    <button @click="pause()">Pause</button>
    <button @click="playVid()">Play</button>'
  </div>
</template>

<script>
export default {
  computed: {
    songId(){
      return this.$store.state.currentSong;
    }
  },
  watch: {
    songId(newId, oldId){
      this.play(newId)
    },
  },
  methods:{
    play(id){
      window.player.loadVideoById(id)
      window.player.playVideo()
    },
    pause(){
      window.player.pauseVideo()
    },
     playVid(){
      window.player.playVideo()
    }
  }
}
</script>