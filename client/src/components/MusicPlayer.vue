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
    <div class="previous-button">
      <img
        @click="playNext()"
        class="previous-button-img"
        src="https://i.imgur.com/ETVl9xB.png"
        height="20"
        width="20"
      />
    </div>

    <div
      class="play-pause-button-container"
      @click="
        () => {
          if (!showButton) {
            playVid(), (showButton = true);
          } else {
            pause(), (showButton = false);
          }
        }
      "
    >
      <div class="play-pause-button">
        <div v-if="!showButton">
          <img src="https://i.imgur.com/dbNIEwh.png" height="20" width="20" />
        </div>
        <div v-if="showButton">
          <img src="https://i.imgur.com/5Jf6Api.png" height="20" width="20" />
        </div>
      </div>
    </div>
    <div class="next-button">
      <img
        @click="playNext()"
        class="next-button-img"
        src="https://i.imgur.com/8Z5NSCt.png"
        height="20"
        width="20"
      />
    </div>

    <div class="volume-divs">
      <div class="mute-unMute-button">
        <div v-if="!show">
          <!-- <button @click="volumeMute(), (show = false)">Mute</button> https://i.imgur.com/IM2EjNx.png  https://i.imgur.com/TYwXoNs.png unmute -->
          <img
            src="https://i.imgur.com/YfMCNW6.png"
            height="20"
            width="20"
            @click="volumeUnMute(), (show = true)"
          />
        </div>
        <div v-if="show">
          <img
            src="https://i.imgur.com/PeMJYZ9.png"
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
      playListVideoIds: [],
      playlist: [],
      playlistSong: {},
      testId: 0,
      increment: 0,
      song: null,
      value: 20,
      api_key: "AIzaSyDDCSvtOP78gVYp6K2EQXbWYYBe66qm6fk",
      url: "www.googleapis.com/youtube/v3/videos",
    };
  },
  computed: {
    playlistFetched() {
      return this.$store.state.playlist;
    },
    songId() {
      return this.$store.state.currentSong;
    },
    list() {
      return this.currentSongArray;
    },
  },
  watch: {
    songId(newId, oldId) {
      this.testId = 0;
      this.initPlaylist(newId);
      this.showButton = true;
    },
  },
  methods: {
    initPlaylist(id) {
      this.playlist = [...this.playlistFetched];
      this.playlistVideoIds = this.playlist.map((a) => a.videoId);

      let i = 0;
      this.playlist.forEach((element) => {
        if (element.videoId == id) {
          this.testId = i;
          this.currentSongArray[0] = element;
          window.player.loadPlaylist(this.playlistVideoIds, i, 0);
        }
        i++;
      });
      i = 0;
    },
    pause() {
      window.player.pauseVideo();

      console.log(this.testId);
    },

    playVid() {
      window.player.playVideo();
    },
    playNext() {
      this.testId = this.testId + 1;
      window.player.onNext(
        this.initPlaylist(this.playlistVideoIds[this.testId])
      );

      //player.nextVideo();
    },
    playPrevious() {
      this.testId = this.testId - 1;
      window.player.onPrevious(
        this.initPlaylist(this.playlistVideoIds[this.testId])
      );
      window.player.previous()

      //player.nextVideo();
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
  margin-top: 15px;

  text-align: center;
  align-content: center;
}
.play-pause-button-container {
  margin-top: 20px;
  height: 50px;
  width: 50px;

  border-radius: 50%;
  background-color: #c4c4c4;
}
.previous-button {
  margin-top: 20px;
  height: 35px;
  width: 35px;
  background-color: #c4c4c4;
  border-radius: 50%;
}
.previous-button-img {
  margin-top: 8px;
  margin-left: 8px;
}
.next-button {
  margin-top: 20px;
  height: 35px;
  width: 35px;
  background-color: #c4c4c4;
  border-radius: 50%;
}
.next-button-img {
  margin-top: 8px;
  margin-left: 8px;
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
    box-shadow: -82px 0 0 80px #43e5f7;
  }
  #slider:hover input[type="range"]::-webkit-slider-thumb {
    width: 10px;
    height: 10px;

    border-radius: 50%;
    background: #c4c4c4;
  }
  #volumebar {
    height: 10px;
    width: 150px;
  }
}
</style>