<template>
  <div class="songpage">
    <div class="upper">
      <div class="image-wrap">
        <img :src="song.thumbnail" alt="" class="songimg">
      </div>
      <div class="songdetails-wrap">
        <h3 class="songtitle">{{song.title}}</h3>
        <h6 class="artist"><span>by</span> {{song.artist}}</h6>
        <div class="infowrap">
          <div class="icon-p">
            <Durationicon />
            <p class="info-p">{{getDuration(song.duration)}}</p>
          </div>
          <div class="icon-p pointer">
            <Playbutton />
            <p class="info-p">Play</p>
          </div>
          <div class="icon-p pointer">
            <Hearticon />
            <p class="info-p">Like</p>
          </div>
          <div class="icon-p pointer">
            <Addbtnicon />
            <p class="info-p">Add</p>
          </div>
        </div>
      </div>
    </div>
    <div class="song">
      <div class="songpart">
        <Cdicon class="cdicon"/>
      </div>
      <div class="songpart">
        <p class="songpart-title">{{song.title}}</p>
      </div>
      <div class="songpart">
        <p class="songpart-artist">{{song.artist}}</p>
      </div>
      <div class="songpart">
        <p class="songpart-duration">{{getDuration(song.duration)}}</p>
      </div>
      <div class="songpart option-btns">
        <div class="option"></div>
        <div class="option"></div>
        <div class="option"></div>
      </div>
    </div>
    <h3 class="suggestion-title"><span>More from</span> {{song.artist}}</h3>
    <div class="suggestion-section" v-if="this.suggested">
      <div class="suggestions" v-for="suggestion in this.suggested.content" :key="suggestion">
        <div class="suggestion">
          <img :src="suggestion.thumbnails[0].url" alt="" class="suggestion-thumbnail">
          <div class="upper-suggestion">
            <p class="suggestion-songname">{{truncate(suggestion.name)}}</p>
            <p class="suggestion-album">{{suggestion.album.name}}</p>
            <p class="suggestion-duration">{{getDuration(suggestion.duration)}}</p>
            <div class="playbtn-wrap">
              <SuggestionPlaybtn  class="playbtn"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Durationicon from '../assets/icons/Durationicon.vue'
import Playbutton from '../assets/icons/Playbutton.vue'
import Hearticon from '../assets/icons/Hearticon.vue'
import Addbtnicon from '../assets/icons/Addbtnicon.vue'
import Cdicon from '../assets/icons/Cdicon.vue'
import SuggestionPlaybtn from '../assets/icons/SuggestionPlaybtn.vue'

export default {
  components: {Durationicon, Playbutton, Hearticon, Addbtnicon, Cdicon, SuggestionPlaybtn},
  data() {
    return {
      suggested: []
    }
  },
 async mounted() {
    await this.suggestions();
  },
  computed: {
    song() {
      let songs = this.$store.state.allSongs;
      for(let i = 0; i < songs.length; i++) {
        if(songs[i]._id == this.$route.params.id) {
          return songs[i];
        }
      }
    }
  },
  methods: {
    async suggestions() {
      let data = await fetch("https://yt-music-api.herokuapp.com/api/yt/songs/" + this.song.artist);
      data = await data.json();
      this.suggested = data;
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
    truncate(title) {
      if(title.length < 25) {
        return title;
      }
      
      let res = '';

      for(let i = 0; i < 30; i++) {
        res += title.charAt(i);
      }

      return res + '...';
    }
  }
}
</script>

<style scoped>
  span {
    font-weight: 100;
  }

  .songpage {
    width: 100vw;
    height: 90vh;
    margin-left: 20vw;
    padding: 2em;
  }

  .songimg {
    width: 300px;
    height: 300px;
  }

  .upper {
    display: flex;
    gap: 1em;
    margin-bottom: 2em;
  }

  .songdetails-wrap {
    align-self: flex-end;
    margin-bottom: 1em;
    margin-left: 0.5em;
  }

  .songtitle {
    font-size: 48px;
  }

  .artist {
    font-size: 18px;
    opacity: 0.5;
    margin-left: 0.5em;
  }

  .infowrap {
    display: flex;
    gap: 2em;
    margin-top: 1em;
  }

  .icon-p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }

  .pointer {
    cursor: pointer;
  }

  .pointer:hover {
    opacity: 0.75;
  }

  .info-p {
    font-weight: 900;
    font-size: 14px;
  }

  .song {
    display: flex;
    border-radius: 5px;
    justify-content: space-between;
    align-content: center;
    width: 50vw;
    background-color: rgba(196, 196, 196, 0.1);
    padding: 0.25em;
  }

  .songpart {
    display: flex;
    justify-content: center;
    align-self: center;
    height: 100%;
  }

  .cdicon {
    font-size: 25px;
  }

  .songpart-title {
    font-size: 16px;
    font-weight: 900;
  }

  .songpart-artist {
    font-size: 16px;
    opacity: 0.5;
  }

  .songpart-duration {
    font-size: 16px;
    font-weight: 900;
  }

  .option-btns {
    display: flex;
    gap: 0.25em;
    padding-right: 1em;
    cursor: pointer;
  }

  .option-btns:hover {
    opacity: 0.5;
  }

  .option {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #fff; 
  }

  .suggestion-title {
    font-size: 36px;
    margin-top: 6em;
  }

  span {
    font-size: 18px;
  }

  .suggestion-section {
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;
    align-content: center;
  }

  .suggestion-thumbnail {
    height: 120px;
    width: 120px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .suggestion {
    width: 20vw;
    display: flex;
    border-radius: 5px;
    background-color: rgba(196, 196, 196, 0.1);
    /* justify-content: space-between; */
    align-content: center;
  }

  .upper-suggestion {
    padding: 0.25em 0.5em 0.5em 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 14vw;
  }

  .suggestion-songname {
    font-weight: 900;
    font-size: 12px;
  }

  .suggestion-album {
    font-size: 12px;
    opacity: 0.5;
  }

  .suggestion-duration {
    font-size: 12px;
    font-weight: 900;
    /* margin-top: 1em; */
  }

  .playbtn-wrap {
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .playbtn {
    align-self: flex-end;
    cursor: pointer;
  }

  .playbtn:hover {
    opacity: 0.5;
  }
</style>