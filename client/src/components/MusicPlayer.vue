<template>
  <div class="music-player-container">
    <div class="song-content-container">
      <p>Currently Playing</p>
      <div v-for="result in this.list" :key="result" class="">
        <p>{{ result.name }}</p>
      </div>
    </div>
    <div class="play-pause-button">
      <div v-if="!showButton">
        <img
          src="https://i.imgur.com/RMC8qWH.png"
          height="50"
          width="50"
          @click="playVid(), (showButton = true)"
        />
      </div>
      <div v-if="showButton">
        <img
          src="https://i.imgur.com/hCwRSit.png"
          height="50"
          width="50"
          @click="pause(), (showButton = false), test()"
        />
      </div>
    </div>
    <div class="volume-divs">
      <div class="mute-unMute-button">
        <div v-if="!show">
          <!-- <button @click="volumeMute(), (show = false)">Mute</button> https://i.imgur.com/IM2EjNx.png  https://i.imgur.com/TYwXoNs.png unmute -->
          <img
            src="https://i.imgur.com/IM2EjNx.png"
            height="50"
            width="50"
            @click="volumeUnMute(), (show = true)"
          />
        </div>
        <div v-if="show">
          <img
            src="https://i.imgur.com/TYwXoNs.png"
            height="50"
            width="50"
            @click="volumeMute(), (show = false)"
          />
        </div>
      </div>
      <div class="volume-slider">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      showButton: false,
      currentSongArray: [],
      value: 20,
      api_key: "AIzaSyDDCSvtOP78gVYp6K2EQXbWYYBe66qm6fk",
      url: "www.googleapis.com/youtube/v3/videos",
    };
  },
  computed: {
    songId() {
      return this.$store.state.currentSong;
    },
    list() {
      return this.currentSongArray;
    },
  },
  watch: {
    songId(newId, oldId) {
      this.play(newId);
      this.fetchCurrentSong(newId);
      this.showButton = true;
    },
  },
  methods: {
    async fetchCurrentSong(song) {
      let res = await fetch(
        "https://yt-music-api.herokuapp.com/api/yt/songs/" + song
      );
      let data = await res.json();
      this.currentSongArray = [...data.content];
      this.currentSongArray.splice(1, 99);
      console.log(this.currentSongArray[0]);
    },
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
  },
};
</script>

<style scoped>
.music-player-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.play-pause-button {
  margin-left: 20px;
  padding-top: 20px;
  text-align: center;
}
.mute-unMute-button {
  margin-right: 5px;
  padding-left: 20px;
  padding-top: 20px;
}
.volume-divs {
  display: flex;
  padding-right: 40px;
}
.volume-slider {
  padding-top: 40px;
}
</style>