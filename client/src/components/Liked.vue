<template>
    <div class="section">
        <h3 class="section-title">Liked</h3>
        <div class="info-more-p">
            <p class="details">{{likedSongs.length}} Song • {{getSongListDuration()}}</p>
            
        </div>
        <div class="songlist"></div>
        <div class="song" v-for="(liked,i) in likedSongs" :key="i"  @click=" () => {printVideoId(liked.ytid);}">
             <img :src="liked.thumbnail" alt="" class="thumbnail"> 
            <div class="titile">{{liked.title}}</div>
            <div class="artist">{{liked.artist}}</div>
            <div class="duration">{{getDuration( parseInt(liked.duration))}}</div>
             <div class="options-btns">
              <div class="option-btn"></div>
              <div class="option-btn"></div>
              <div class="option-btn"></div>
            </div>
        </div>
        <div class="p"></div>
    </div>
</template>

<script>
import CalculateDuration from "../CalculateDuration.js"
export default {
    data() {
      return {
        songs:[]
      }
    },
    computed: {
        currentUser() {
          return this.$store.state.currentUser;
        },
        allSongs() {  
        return this.$store.state.allSongs;
        }, 
        likedSongs() { 
          return this.$store.state.likedSongs;
        },
    },
    async mounted(){
        await this.$store.dispatch('getLikeds',this.currentUser._id); 
        await this.formatSongs()  
    },  
    methods: {
       printVideoId(id) {
        this.$store.commit("setSongId", id);
        this.$store.commit("setSongList", this.songs); 
      },
      async formatSongs() {
        let songVideoIds = []
        let url = 'https://yt-music-api.herokuapp.com/api/yt/song/'
        songVideoIds = this.likedSongs.map((a) => a.ytid);
        for (let i = 0; i < songVideoIds.length; i++) {
          let res = await fetch(url + songVideoIds[i]);
          let data = await res.json();
          if (data != null) {
            this.songs.push(data);
          } else {
          }
        }
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
     durationAllSongs(){
      return new CalculateDuration(
        this.likedSongs,
        this.allSongs
      )
    },
    getSongListDuration(){
      return this.durationAllSongs().songlistDuration();
    }
  }
}
</script>

<style>

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

  .songlist {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 1em;
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