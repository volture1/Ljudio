<template>
  <div class="homepage">
    <div class="section">
      <h3 class="section-title">My media</h3>
      <div class="info-more-p">
        <p class="details">{{playlists.length}} Playlist • {{userAllSongs()}} Song • {{durationAllSongs()}}</p>
        <p class="more">More</p>
      </div>
      <div class="content-preview">
        <div class="content-card" v-for="playlist in playlists" :key="playlist.id">
          <div class="thumbnails">
            <div class="thumbnail-pair">
              <div class="thumbnail"></div>
              <div class="thumbnail"></div>
            </div>
            <div class="thumbnail-pair">
              <div class="thumbnail"></div>
              <div class="thumbnail"></div>
            </div>
          </div>
          <div class="playlist-details">
            <div class="upper-playlist-part">
              <p class="playlistTitle">{{playlist.name}}</p>
              <div class="options-btn-wrap">
                <div class="optionbtn"></div>
                <div class="optionbtn"></div>
                <div class="optionbtn"></div>
              </div>
            </div>
            <p class="playlist-content">{{playlist.songList.length}} songs • <!-- {{allSongsDurationPL(playlist)}} --> {{durationPL(playlist)}}</p>
            <!-- <p class="duration">{{getDuration(playlist.songList[0].duration)}}</p> -->
          </div>
        </div>
      </div>
      <!-- <p @click="createNewPlaylist">+Create new playlist</p> -->
    </div>
    <!-- {{getSongs}} -->
    <div class="section">
      <h3 class="section-title">Recent</h3>
      <div class="info-more-p">
        <p class="details" >{{recentlyPlayeds.length}} Song</p>
        <p class="more">More</p>
      </div>
      <div class="content-preview" ></div>
        <div class="content-card" v-for="(recent,i) in recentlyPlayeds" :key="i" >
          <div class="titile">{{recent.title}}</div>
          <div class="artist">{{recent.artist}}</div>
          <div class="dateAdded">{{recent.dateAdded}}</div>
          <div class="duration">{{getDuration( parseInt(recent.duration))}}</div>
        </div>
      <div class="p"></div>
    </div>
    <div class="section">
      <h3 class="section-title">Liked</h3>
      <div class="info-more-p">
        <p class="details" >{{likeds.length}} Song</p>
        <p class="more">More</p>
      </div>
      <div class="content-preview" ></div>
       <div class="content-card" v-for="liked in likeds" :key="liked.id">
          <div class="titile">{{liked.title}}</div>
          <div class="artist">{{liked.artist}}</div>
          <div class="dateAdded">{{liked.dateAdded}}</div>
          <div class="duration">{{getDuration(parseInt(liked.duration))}}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    playlists() {
      console.log('this.$store.state.playlist',this.$store.state.playlist) 
      return this.$store.state.playlist;
    },
    recentlyPlayeds() { 
      console.log('this.$store.state.recentSongs',this.$store.state.recentSongs)    
      return this.$store.state.recentSongs;
    },

    likeds() {
      console.log('this.$store.state.likedSongs',this.$store.state.likedSongs) 
      return this.$store.state.likedSongs;
    },
   
    getSongs() {
      return this.$store.state.allSongs;
    }
  },
  async mounted() {
  
    await this.$store.dispatch('getPlaylists', this.currentUser._id);  
    await this.$store.dispatch('getSongs');  
    await this.$store.dispatch('getRecentlyPlayeds',this.currentUser._id);
    await this.$store.dispatch('getLikeds',this.currentUser._id); 
    
  },
  methods: {
    async createNewPlaylist() {
      let testdata = {
        name: "Test Playlist",
        userId: this.currentUser._id,
        songList: [],
        createdDate: new Date()
      }
      await this.$store.dispatch('createPlaylist', testdata);
    },
   
    getDuration(ms) {
      let minutes = Math.floor(ms/60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return (
        seconds == 60 ? 
        (minutes+1) + '00' :
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      );
    },
    durationPL(playlist) {
      let sum = 0;
      let fixedSongList = [];
      let songs = this.getSongs;
      
      for(let i = 0; i < playlist.songList.length; i++) {
        for(let j = 0; j < songs.length; j++) {
          if(playlist.songList[i] === songs[j]._id) {
            fixedSongList.push(songs[j]);
          }
        }
      }

      for(let i = 0; i < fixedSongList.length; i++) {
        sum += parseInt(fixedSongList[i].duration);
      }

      sum = this.getDuration(sum);
      return sum;
    },
    durationAllSongs() {
      let sum = 0;
      let fixedSongList = [];
      let songs = this.getSongs;

      for(let i = 0; i < this.playlists.length; i++) {
        for(let j = 0; j < this.playlists[i].songList.length; j++) {
          for(let k = 0; k < songs.length; k++) {
            if(this.playlists[i].songList[j] === songs[k]._id) {
              fixedSongList.push(songs[k]);
            }
          }
        }
      }

      for(let i = 0; i < fixedSongList.length; i++) {
        sum += parseInt(fixedSongList[i].duration);
      }

      sum = this.getDuration(sum);
      return sum;
    },
    userAllSongs() {
      let amount = 0;

      for(let i = 0; i < this.playlists.length; i++) {
        for(let j = 0; j < this.playlists[i].songList.length; j++) {
          amount++;
        }
      }

      return amount;
    },
    async getAllSongs(){
      let songID = '61545c82936c2c6e0f3adfd2';
      let data = await fetch('/rest/songs');
      let res = await data.json();
      return res;
    }
  }
})
</script>

<style scoped>
  .homepage {
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    padding: 2em;
    gap: 2em;
    justify-content: space-between;
    margin-left: 20vw;
  }

  .section {
    display: flex;
    flex-direction: column;
  }

  .section-title {
    font-size: 28px;
  }

  .info-more-p {
    display: flex;
    justify-content: space-between;
  }

  .details {
    font-size: 14px;
    opacity: 0.5;
    font-weight: 900;
  }

  .more {
    text-decoration: underline;
    font-weight: 900;
    font-size: 12px;
    cursor: pointer;
  }
  
  .more:hover {
    opacity: 0.5;
  }

  .content-preview {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2em;
  }

  .content-card {
    width: 100%;
    background-color: rgba(196, 196, 196, 0.1);
    border-radius: 5px;
    cursor: pointer;
    margin-top: 0.5em;
    display: flex;
    
  }

  .content-card:hover {
    opacity: 0.5;
  }

  .upper-playlist-part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .options-btn-wrap {
    display: flex;
    gap: 0.25em;
  }

  .optionbtn {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #fff;
  }

  .playlistTitle {
    font-weight: 900;
  }

  .playlist-details {
    padding: 0.5em;
    width: 100%;
  }

  .thumbnails {
    display: flex;
    flex-direction: row;
  }

  .thumbnail {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.25);
  }

  .thumbnail-pair {
    display: flex;
    flex-direction: column;
  }

  .playlist-content {
    opacity: 0.5;
    font-weight: 900;
    font-size: 12px;
  }
</style>
