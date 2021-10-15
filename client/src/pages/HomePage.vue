<template>
  <div class="homepage">
    <div class="section">
      <h3 class="section-title section-titleMobile">My media</h3>
      <div class="info-more-p">
        <p class="details detailsMobile">{{playlists.length}} Playlist • {{userAllSongs()}} Song • {{durationAllSongs()}}</p>
        <p class="more">More</p>
      </div>
      <div class="content-preview">
        <div class="content-card" v-for="playlist in playlists" :key="playlist.id">
          <router-link :to="'/playlists/' + playlist._id" class="router">
            <div v-if="playlist.songList.length < 4">
              <div class="single-thumbnail">
                <img class="thumbnail-100x100" :src="getThumbnail(playlist.songList[0])" alt="">
              </div>
            </div>
            <div v-else class="thumbnails">
              <div class="thumbnail-pair">
                <div class="thumbnail">
                  <img class="thumbnail-50x50" :src="getThumbnail(playlist.songList[0])" alt="">
                </div>
                <div class="thumbnail">
                  <img class="thumbnail-50x50" :src="getThumbnail(playlist.songList[1])" alt="">
                </div>
              </div>
              <div class="thumbnail-pair">
                <div class="thumbnail">
                  <img class="thumbnail-50x50" :src="getThumbnail(playlist.songList[2])" alt="">
                </div>
                <div class="thumbnail">
                  <img class="thumbnail-50x50" :src="getThumbnail(playlist.songList[3])" alt="">
                </div>
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
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="section">
      <Recent />
      <!-- <h3 class="section-title">Recent</h3>
      <div class="info-more-p">
        <p class="details"></p>
        <p class="more"></p>
      </div>
      <div class="content-preview"></div>  -->
    </div>
    <div class="section">
      <Liked />
     <!--  <h3 class="section-title">Liked</h3>
      <div class="info-more-p">
        <p class="details"></p>
        <p class="more"></p>
      </div>
      <div class="content-preview"></div> -->
    </div>
  </div>
</template>

<script>
import Recent from "../components/Recent.vue"
import Liked from "../components/Liked.vue"
export default ({
  components:{Recent,Liked},
  created(){
    document.getElementById("yt-player").style.display = "none";
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    playlists() {
      return this.$store.state.playlist;
    },
    getSongs() {
      return this.$store.state.allSongs;
    }
  },
  async mounted() {
    await this.$store.dispatch('getPlaylists', this.currentUser._id);
    await this.$store.dispatch('getSongs');
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
    getThumbnail(id){
      let data = this.getSongs;
      for(let i = 0; i < data.length; i++) {
        if(id == data[i]._id) {
          return data[i].thumbnail;
        }
      }
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
    overflow-y:scroll;
  }
  @media screen and (max-width: 950px) {
  .homepage{
    margin-left: 5%;
    width: 95%;
  }
} 

  .section {
    display: flex;
    flex-direction: column;
  }

.section-title {
    font-size: 28px;
    
  }

  
@media screen and (max-width: 450px) {
  .section-titleMobile {
    font-size: 28px;
    margin-left: -8%;
  }
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

  @media screen and (max-width: 450px) {
    .detailsMobile {
    font-size: 14px;
    opacity: 0.5;
    font-weight: 900;
    margin-left: -8%;
    }
  }

 .ddetails {
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

  .thumbnail-50x50 {
    width: 50px; 
    height: 50px;
  }

  .thumbnail-100x100 {
    width: 100px; 
    height: 100px;
  }

  .single-thumbnail {
    width: 100px;
    height: 100px;
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

  .router {
    text-decoration: none;
    color: white;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }

   @media screen and (max-width: 450px) {
  .mobile{
    display: block;
  }  
}

  @media screen and (min-width: 451px) and (max-width: 750px) {
  .tablet{
    display: block;
  }  
}

@media screen and (min-width: 751px) {
  .desktop{
    display: block;
  }  
}
</style>
