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
    <div class="wrapper">
      <input
        @change="setVolume(value)"
        type="range"
        min="0"
        max="100"
        step="1"
        v-model="value"
      />

      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      value: 50,
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
    setVolume(volume) {
      window.player.setVolume(volume);
    },
    muteToggle() {
      this.muteToggle = !this.enable;
    },
  },
};
</script>