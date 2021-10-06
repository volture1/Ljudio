<template>
    <div class="section">
        <h3 class="section-title">Recent</h3>
        <div class="info-more-p">
            <p class="details">{{recentSongs.length}} Song • {{getSongListDuration()}}</p>            
            <p class="more">More</p>
        </div>
        <div class="songlist"></div>
        <div class="song" v-for="(recent,i) in recentSongs" :key="i">
            <img :src="recent.thumbnail" alt="" class="thumbnail"> 
            <div class="titile">{{recent.title}}</div>
            <div class="artist">{{recent.artist}}</div>
            <div class="duration">{{getDuration( parseInt(recent.duration))}}</div>
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
    computed: {
        currentUser() {
        return this.$store.state.currentUser;
        },
        allSongs() {  
        return this.$store.state.allSongs;
        },  
        recentSongs() {    
        return this.$store.state.recentSongs;
        },        
    },
    async mounted(){
        console.log('this.currentUser._id',this.currentUser._id)
        await this.$store.dispatch('getRecentlyPlayeds',this.currentUser._id);   
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
    durationAllSongs(){
      return new CalculateDuration(
        this.recentSongs,
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

.section-title {
    font-size: 28px;
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
    padding: 2em 10em;
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