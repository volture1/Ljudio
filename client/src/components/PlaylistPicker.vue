<template>
  <div class="playlists">
    <div v-if="this.playlists.length == 0" class="noplaylists-wrap">
      <p class="noplaylists">No playlists created</p>
    </div>
    <div v-else class="playlists-wrap">
      <div class="upper">
        <p class="playlistowner">{{currentUser.firstname + ' ' + currentUser.lastname}}s playlists</p>
        <p @click="close()" class="close">close</p>
      </div>
      <hr>
      <div class="choice-wrap">
        <p class="song">Song: <span>{{chosenSong.name}}</span> by <span>{{chosenSong.artist.name}}</span></p>
      </div>
      <div class="playlists-wrap">
        <div @click="choose(playlist)" class="playlist" v-for="playlist in this.playlists" :key="playlist">
          <p class="playlistname">{{playlist.name}}</p>
          <p class="playlistcontent">{{playlist.songList.length}} songs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    playlists() {
      return this.$store.state.playlist;
    },
    chosenSong() {
      return this.$store.state.chosenSong;
    }
  },
  methods: {
    close() {
      this.$store.dispatch('toggleAddToPlPopup');
    },
    choose(playlist) {
      if(this.chosenSong) {
        let song = {
          link: 'https://yt-music-api.herokuapp.com/api/yt/search/2NiyrtYegso',
          title: this.chosenSong.name,
          artist: this.chosenSong.artist.name,
          duration: this.chosenSong.duration,
          onlySound: true,
          thumbnail: this.chosenSong.thumbnails[0].url,
          ytId: '2NiyrtYegso'
        }
        this.$store.dispatch('addSong', song);
        this.$store.dispatch('addSongToPL', playlist._id);
      }
    }
  }
}
</script>

<style scoped>
  hr {
    border-color: rgba(196, 196, 196, 0.25);
    margin: 0.25em 0;
  }

  .playlists {
    width: 30vw;
    margin: 0 auto;
    background-color: rgba(5, 5, 5, 0.411);
    backdrop-filter: blur(4px);
    padding: 0.5em;
    position: fixed;
    top: calc(50% - 15vw);
    left: calc(45% - 5vw);
    z-index: 1000;
    padding: 1em;
  }
  
  .playlists-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .upper {
    display: flex;
    justify-content: space-between;
    align-items: center
    /* margin-bottom: 1em; */
  }

  .playlist {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(43, 42, 42, 0.582);
    padding: 0.5em 0.75em;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .playlist:hover {
    border: 2px solid rgba(22, 96, 165);
  }

  .playlistname {
    font-weight: 900;
    font-size: 15px;
  }

  .playlistcontent {
    font-size: 13px;
    opacity: 0.5;
  }

  .playlistowner {
    font-size: 18px;
    opacity: 0.5;
  }

  .close {
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;
  }

  .close:hover {
    opacity: 0.5;
  }

  .song {
    font-size: 12px;
    opacity: 0.5;
  }

  span {
    font-weight: 900;
    font-size: 14px;
    margin: 0 0.1em;
  }

  .choice-wrap {
    margin-bottom: 0.5em;
  }
</style>