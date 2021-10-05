<template>
  <div class="singleplaylist">
    <div class="top">
      <h3 class="playlisttitle">{{playlist.name}}</h3>
    </div>
    <div class="details-wrap">
      <p class="details">{{playlist.songList.length}} Songs • {{playlistDuration()}}</p>
    </div>
    <div class="songlist">
      <div class="song" v-for="song in songs" :key="song._id">
          <img :src="song.thumbnail" alt="" class="thumbnail">
          <p class="songtitle">{{song.title}}</p>
          <p class="artist">{{song.artist}}</p>
          <p class="duration">{{getDuration(song.duration)}}</p>
          <div class="options-btns">
            <div class="option-btn"></div>
            <div class="option-btn"></div>
            <div class="option-btn"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    playlist() {
      let playlists = this.$store.state.playlist;
      for(let i = 0; i < playlists.length; i++) {
        if(playlists[i]._id == this.$route.params.id) {
          return playlists[i];
        }
      }
    },
    songs() {
      let songs = this.$store.state.allSongs;
      let songlist = [];
      for(let i = 0; i < this.playlist.songList.length; i++) {
        for(let j = 0; j < songs.length; j++) {
          if(this.playlist.songList[i] === songs[j]._id) {
            songlist.push(songs[j]);
          }
        }
      }

      return songlist;
    }
  },
  methods: {
    getDuration(ms) {
      let minutes = Math.floor(ms/60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return (
        seconds == 60 ? 
        (minutes+1) + '00' :
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      );
    },
    playlistDuration() {
      let songs = this.$store.state.allSongs;
      let sum = 0;
      let fixedSongList = [];

      for(let i = 0; i < this.playlist.songList.length; i++) {
        for(let j = 0; j < songs.length; j++) {
          if(this.playlist.songList[i] === songs[j]._id) {
            fixedSongList.push(songs[j]);
          }
        }
      }

      for(let i = 0; i < fixedSongList.length; i++) {
        sum += parseInt(fixedSongList[i].duration);
      }

      sum = this.getDuration(sum);
      return sum;
    }
  }
}
</script>

<style scoped>
  .singleplaylist {
    width: 100vw;
    height: 90vh;
    margin-left: 20vw;
    padding: 2em;
  }

  .playlisttitle {
    font-size: 28px;
  }

  .details {
    font-size: 14px;
    opacity: 0.5;
    font-weight: 900;
  }

  .songlist {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 2em;
  }

  .song {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(196, 196, 196, 0.1);
    border-radius: 5px;
    cursor: pointer;
  }

  .song:hover {
    opacity: 0.75;
  }

  .thumbnail {
    height: 60px;
    width: 60px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .options-btns {
    display: flex;
    gap: 0.25em;
    padding-right: 1em;
    cursor: pointer;
  }

  .options-btns:hover {
    opacity: 0.75;
  }

  .option-btn {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #fff;
  }

  .songtitle {
    font-size: 16px;
    font-weight: 900;
  }

  .artist {
    font-size: 16px;
    opacity: 0.5;
  }

  .duration {
    font-size: 16px;
    font-weight: 900;
  }
</style>