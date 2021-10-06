<template>
    <div class="section">
        <h3 class="section-title">Recent</h3>
        <div class="info-more-p">
            <p class="details">{{recentSongs.length}} Song</p>
            <p class="more">More</p>
        </div>
        <div class="content-preview"></div>
        <div class="content-card" v-for="(recent,i) in recentSongs" :key="i">
            <div class="titile">{{recent.title}}</div>
            <div class="artist">{{recent.artist}}</div>
            <div class="dateAdded">{{recent.dateAdded}}</div>
            <div class="duration">{{getDuration( parseInt(recent.duration))}}</div>
        </div>
        <div class="p"></div>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
        return this.$store.state.currentUser;
        },
        recentSongs() { 
        console.log('this.$store.state.recentSongs',this.$store.state.recentSongs)    
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


</style>