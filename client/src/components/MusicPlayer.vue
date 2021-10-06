<template>
  <div>
    <div class="music-player-container">
      <div
        @click="$router.push('/video/' + this.playlistVideoIds[this.playlistIndex])"
                class="song-content-container"
      >
        <p style="text-decoration: underline">Currently Playing</p>
        <div v-for="result in this.list" :key="result" class="result">
          <div>
            <img class="result-song-image" :src="result.thumbnails[0].url" />
          </div>
          <div>
            <p class="result-name">{{ result.name }}</p>
            <div v-if="result.artist.name">
              <p class="result-artist-name">{{ result.artist.name }}</p>
            </div>
            <div v-else v-for="artist in result.artist" :key="artist">
              <p class="result-artist-name">{{ artist.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="song-controls">
        <div class="previous-button">
          <img
            @click="playPrevious()"
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
              if (!showPlayPauseButton) {
                playVid(), (showPlayPauseButton = true);
              } else {
                pause(), (showPlayPauseButton = false);
              }
            }
          "
        >
          <div class="play-pause-button">
            <div v-if="!showPlayPauseButton">
              <img
                src="https://i.imgur.com/dbNIEwh.png"
                height="20"
                width="20"
              />
            </div>
            <div v-if="showPlayPauseButton">
              <img
                src="https://i.imgur.com/5Jf6Api.png"
                height="20"
                width="20"
              />
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
      </div>
      <div class="volume-divs">
        <div class="mute-unMute-button">
          <div v-if="!showMuteButton">
            <img
              src="https://i.imgur.com/YfMCNW6.png"
              height="20"
              width="20"
              @click="volumeUnMute(), (showMuteButton = true)"
            />
          </div>
          <div v-if="showMuteButton">
            <img
              src="https://i.imgur.com/PeMJYZ9.png"
              height="20"
              width="20"
              @click="volumeMute(), (showMuteButton = false)"
            />
          </div>
        </div>
        <div id="slider" class="volume-slider">
          <input
            @change="setVolume(volume)"
            type="range"
            min="0"
            max="100"
            step="1"
            v-model="volume"
            id="volumebar"
          />
        </div>
      </div>
    </div>
    <div id="sliderProgressBar" class="progress-slider">
      <p id="progress-text">{{ this.formatMMSS(this.progress) }}</p>
      <input
        @change="seekTo(this.progress)"
        type="range"
        min="0"
        :max="this.sliderDuration"
        step="1"
        v-model="this.progress"
        id="seekbar"
      />
      <p id="progress-text">{{ this.duration }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMuteButton: true,
      showPlayPauseButton: false,
      currentSongArray: [],
      playListVideoIds: [],
      playlist: [],
      playlistIndex: 0,
      duration: 0,
      sliderDuration: 0,
      volume: 20,
      progress: 0,
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
    check() {
      return this.progress;
    },
  },
  watch: {
    songId(newId, oldId) {
      this.initPlaylist(newId);
      this.showPlayPauseButton = true;
    },
    check(newTime) {

      if (newTime >= this.sliderDuration) {

        this.playlistIndex += 1;
        this.initPlaylist(this.playlistVideoIds[this.playlistIndex]);
      }
      if (this.playlistIndex == 20 && newTime == this.sliderDuration) {

        this.showPlayPauseButton = false;
      }
    },
  },
  methods: {
    initPlaylist(id) {
      // this.$store.commit("setSongId", this.playListVideoIds[this.playlistIndex]);
      // this.playlist = [...this.playlistFetched];

      //console.log(this.playlistFetched.length)
      if(this.playlistFetched){
        this.playlistVideoIds = this.playlist.map((a) => a.videoId);
        console.log('this is with 1 object')
        this.playlist = this.playlistFetched;
        console.log(this.playlistFetched)
        if (element.videoId == id) {
          this.testId = i;
          this.currentSongArray[0] = element;
          window.player.loadPlaylist(this.playlistVideoIds, i, 0);
          this.duration = this.calculateDuration(element.duration);
          this.UpdateCurrentTime();
          this.sliderDuration = this.formatSeconds(this.duration);
        }
      }else{
        this.playlist = [...this.playlistFetched];
        this.playlistVideoIds = this.playlist.map((a) => a.videoId);
      let i = 0;
        console.log(this.playlistVideoIds, 'this is the video ids')
      this.playlist.forEach((element) => {
        if (element.videoId == id) {
          this.playlistIndex = i;
          this.currentSongArray[0] = element;
          window.player.loadPlaylist(this.playlistVideoIds, i, 0);
          this.duration = this.calculateDuration(element.duration);
          this.UpdateCurrentTime();
          this.sliderDuration = this.formatSeconds(this.duration);
        }
        i++;
      });
      i = 0;
      }
    },
    UpdateCurrentTime() {
      this.interval = setInterval(
        () => (this.progress = Math.round(window.player.getCurrentTime())),
        1000
      );
    },
    formatMMSS(time) {
      let newTime;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        newTime = minutes.toString() + ":0" + seconds.toString();
      } else {
        newTime = minutes.toString() + ":" + seconds.toString();
      }
      return newTime;
    },
    formatSeconds(time) {
      let a = time.split(":");
      let seconds = +a[0] * 60 + +a[1];
      return seconds;
    },
    calculateDuration(duration) {
      let time = new Date(duration);
      let newTime = time.toLocaleTimeString(navigator.language, {
        minute: "2-digit",
        second: "2-digit",
      });
      return newTime;
    },
    pause() {
      window.player.pauseVideo();
    },

    playVid() {
      window.player.playVideo();
    },
    playNext() {
      this.playlistIndex = this.playlistIndex + 1;
      this.initPlaylist(this.playlistVideoIds[this.playlistIndex]);
    },
    playPrevious() {
      this.playlistIndex = this.playlistIndex - 1;
      this.initPlaylist(this.playlistVideoIds[this.playlistIndex]);
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
    seekTo(sec) {
      window.player.seekTo(sec);
    },
  },
};
</script>

<style scoped>
  .music-player-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80%;
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
  height: 50px;
  width: 50x;
  margin-right: 10px;
}
.song-content-container {
  margin-top: 10px;
  width: 150px;
  height: 55px;
  color: darkgray;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play-pause-button {
  margin-top: 15px;

  text-align: center;
  align-content: center;
}
.play-pause-button-container:hover {
  background-color: #e0def798;
}
.play-pause-button-container {
  height: 50px;
  width: 50px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 50%;
  background-color: #c4c4c4;
}
.song-controls {
  display: flex;
  color: white;
  height: 70px;
  width: 150px;
}
.previous-button {
  margin-top: 20px;
  height: 35px;
  width: 35px;
  margin-right: 5%;
  background-color: #c4c4c4;
  border-radius: 50%;
}
.previous-button:hover {
  background-color: #e0def798;
}
.previous-button-img {
  margin-top: 8px;
  margin-left: 8px;
}
.next-button {
  margin-top: 20px;
  height: 35px;
  width: 35px;
  margin-left: 5%;
  background-color: #c4c4c4;
  border-radius: 50%;
}
.next-button:hover {
  background-color: #e0def798;
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
  padding-right: 10px;
}
.volume-slider {
  padding-top: 30px;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[id="volumebar"] {
    overflow: hidden;
    width: 80px;
    -webkit-appearance: none;
    background-color: #1d1e1f;
    border-radius: 10px;
  }

  input[id="volumebar"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #4c6175;
    margin-top: -1px;
  }

  input[id="volumebar"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 0;
    height: 0;
    border-radius: 10px;
    background: #434343;
    box-shadow: -82px 0 0 80px #43e5f7;
  }
  #slider:hover input[id="volumebar"]::-webkit-slider-thumb {
    width: 10px;
    height: 10px;

    border-radius: 50%;
    background: #c4c4c4;
  }
  .song-controls {
    display: flex;
    color: white;
    height: 70px;
    width: 150px;
  }
  #progress-text {
    padding-right: 10px;
    padding-left: 10px;
    margin-top: -5px;
  }
  #volumebar {
    height: 10px;
    width: 150px;
  }
  #progress-text {
    padding-right: 10px;
    padding-left: 10px;
    margin-top: -5px;
  }
  .progress-slider {
    margin-right: 90px;
    justify-content: center;
    display: flex;
  }
  #seekbar {
    width: 50vh;
    height: 10px;
  }
  .song-controls {
    display: flex;
    color: white;
    height: 70px;
    width: 150px;
  }

  input[id="seekbar"] {
    overflow: hidden;
    width: 50vh;
    -webkit-appearance: none;
    background-color: #1d1e1f;
    border-radius: 10px;
  }

  input[id="seekbar"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #4c6175;
    margin-top: -1px;
  }
  input[id="seekbar"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 0;
    height: 0;
    border-radius: 10px;
    background: #434343;
    box-shadow: -402px 0 0 400px #43e5f7;
  }
  #sliderProgressBar:hover input[id="seekbar"]::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #c4c4c4;
  }
}
</style>