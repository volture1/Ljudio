<template>
  <div>
    <button @click="pause()">Pause</button>
    <button @click="playVid()">Play</button>

    <div v-if="show">
      <button @click="volumeMute(), (show = false)">Mute</button>
    </div>
    <div v-if="show == false">
      <button @click="volumeUnMute(), (show = true)">Unmute</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  computed: {
    songId() {
      return this.$store.state.currentSong;
    },
  },
  watch: {
    songId(newId, oldId) {
      this.play(newId);
    },
  },
  methods: {
    play(id) {
      window.player.loadVideoById(id);
      window.player.playVideo();
    },
    pause() {
      window.player.pauseVideo();
    },
    playVid() {
      window.player.playVideo();
    },
    volumeMute() {
      window.player.mute();
    },
    volumeUnMute() {
      window.player.unMute();
    },
    muteToggle() {
      this.muteToggle = !this.enable;
    },
  },
};
</script>