<template>
  <div>
    <button @click="play('DXxeOvvNNwc')">The Black Page #1 on piano</button>
    <button @click="play('CtkZxnkbjtI')">The Black Page #2 live band</button>
    <button @click="pause()">Pause</button>
    <button @click="playVid()">Play</button>'
  </div>
</template>

<script>
export default {
  methods:{
    play(id){
      // calling global variable
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