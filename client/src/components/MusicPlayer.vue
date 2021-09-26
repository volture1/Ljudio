<template>
  <div class="music-player-container">
    <div class="song-content-container">
      <p style="text-decoration: underline">Currently Playing</p>
      <div v-for="result in this.list" :key="result" class="result">
        <div>
          <img class="result-song-image" :src="result.thumbnails[0].url" />
        </div>
        <div>
          <p class="result-name">{{ result.name }}</p>
          <p class="result-artist-name">{{ result.artist.name }}</p>
        </div>
      </div>
    </div>
    <div class="play-pause-button">
      <div v-if="!showButton">
        <img
          src="https://i.imgur.com/RMC8qWH.png"
          height="35"
          width="35"
          @click="playVid(), (showButton = true)"
        />
      </div>
      <div v-if="showButton">
        <img
          src="https://i.imgur.com/hCwRSit.png"
          height="35"
          width="35"
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
            height="20"
            width="20"
            @click="volumeUnMute(), (show = true)"
          />
        </div>
        <div v-if="show">
          <img
            src="https://i.imgur.com/TYwXoNs.png"
            height="20"
            width="20"
            @click="volumeMute(), (show = false)"
          />
        </div>
      </div>
      <div id="slider" class="volume-slider">
        <input
          @change="setVolume(value)"
          type="range"
          min="0"
          max="100"
          step="1"
          v-model="value"
          id="volumebar"
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
      console.log(this.currentSongArray);
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
.result {
  display: flex;
}
.result-name {
  color: white;
}
.result-artist-name {
  font-size: 12px;
}
.result-song-image {
  height: 35px;
  width: 35x;
  margin-right: 10px;
}
.song-content-container {
  margin-top: 10px;
  color: darkgray;
}
.play-pause-button {
  margin-left: 20px;
  padding-top: 20px;
  text-align: center;
}
.mute-unMute-button {
  margin-right: 5px;
  margin-top: 12px;
  padding-left: 20px;
  padding-top: 20px;
}
.volume-divs {
  display: flex;
  padding-right: 40px;
}
.volume-slider {
  padding-top: 30px;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    width: 80px;
    -webkit-appearance: none;
    background-color: #1d1e1f;
    border-radius: 10px;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #4c6175;
    margin-top: -1px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 0;
    height: 0;
    border-radius: 10px;
    background: #434343;
    box-shadow: -80px 0 0 80px #43e5f7;
  }
  #slider:hover input[type="range"]::-webkit-slider-thumb {
    width: 10px;
    height: 10px;

    border-radius: 50%;
    background: #c4c4c4;
  }
  #volumebar{
    height:10px;
    width:150px;
  }
}
</style>