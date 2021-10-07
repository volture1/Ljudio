<template>
  <div class="playlists">
    <div class="top">
      <h3 class="pagetitle">Playlists</h3>
      <div class="playlists-details">
        <p class="playlist-info">{{playlists.length}} Playlists • {{userAllSongs()}} Songs • {{durationAllSongs()}}</p>
        <div class="option-icons">
          <p class="selectedpl" v-if="selected"><span class="span-chosenpl">Chosen playlist:</span>{{selected.name}}</p>
          <RoundSearchicon class="option-icon"/>
          <Gearicon @click="toggle()" class="option-icon"/>
        </div>
        <PopupPl v-show="getTogglePopupPl"/>
      </div>
    </div>
    <div class="wrapper">
      <div class="playlist-content" v-for="playlist in playlists" :key="playlist.id">
        <div @click="open(playlist)" v-if="playlist.songList.length == 0" class="playlist-wrapper">
          <div class="upper-emptyplaylist">
            <p class="playlist-title">{{playlist.name}}</p>
          </div>
          <div class="emptyplaylist-img" :class="{'target' : editmode, 'remove': removemode}">
            <p class="emptyplaylist">Empty playlist</p>
          </div>
        </div>
        <div v-else-if="playlist.songList.length < 4" class="playlist">
          <div class="playlist-wrapper">
            <div class="upper-playlist-part">
              <p class="playlist-title">{{playlist.name}}</p>
              <!-- <div class="options-btns">
                <div class="option-btn"></div>
                <div class="option-btn"></div>
                <div class="option-btn"></div>
              </div> -->
              <p class="length-duration">{{playlist.songList.length}} songs • {{playlistDuration(playlist)}}</p>
            </div>
            <!-- <router-link :to="'/playlists/' + playlist._id">
              <div class="playlist-card">
                <img class="single-thumbnail" :src="getThumbnail(playlist.songList[0])" alt="" :class="{'target' : editmode, 'remove': removemode}">
              </div>
            </router-link> -->
            <div class="playlist-card" @click="open(playlist)">
                <img class="single-thumbnail" :src="getThumbnail(playlist.songList[0])" alt="" :class="{'target' : editmode, 'remove': removemode}">
            </div>
          </div>
        </div>
        <div v-else class="playlist">
          <div class="upper-playlist-part">
            <p class="playlist-title">{{playlist.name}}</p>
            <!-- <div class="options-btns">
              <div class="option-btn"></div>
              <div class="option-btn"></div>
              <div class="option-btn"></div>
            </div> -->
            <p class="length-duration">{{playlist.songList.length}} songs • {{playlistDuration(playlist)}}</p>
          </div>
          <!-- <router-link :to="'/playlists/' + playlist._id">
            <div class="playlist-card multiple-thumbnails" :class="{'target' : editmode, 'remove': removemode}">
              <div class="thumbnails">
                <img class="thumbnail-100x100 top-left" :src="getThumbnail(playlist.songList[0])" alt="">
              </div>
              <div class="thumbnails">
                <img class="thumbnail-100x100 top-right" :src="getThumbnail(playlist.songList[1])" alt="">
              </div>
              <div class="thumbnails">
                <img class="thumbnail-100x100 bottom-left" :src="getThumbnail(playlist.songList[2])" alt="">
              </div>
              <div class="thumbnails">
                <img class="thumbnail-100x100 bottom-right" :src="getThumbnail(playlist.songList[3])" alt="">
              </div>
            </div>
          </router-link> -->
          <div @click="open(playlist)" class="playlist-card multiple-thumbnails" :class="{'target' : editmode, 'remove': removemode}">
              <div class="thumbnails">
                <img class="thumbnail-100x100 top-left" :src="getThumbnail(playlist.songList[0])" alt="">
              </div>
              <div class="thumbnails">
                <img class="thumbnail-100x100 top-right" :src="getThumbnail(playlist.songList[1])" alt="">
              </div>
              <div class="thumbnails">
                <img class="thumbnail-100x100 bottom-left" :src="getThumbnail(playlist.songList[2])" alt="">
              </div>
              <div class="thumbnails">
                <img class="thumbnail-100x100 bottom-right" :src="getThumbnail(playlist.songList[3])" alt="">
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Gearicon from '../assets/icons/Gearicon.vue'
import RoundSearchicon from '../assets/icons/RoundSearchicon.vue'
import PopupPl from '../components/PopupPl.vue';

export default {
  components: {Gearicon, RoundSearchicon, PopupPl},
  computed: {
    playlists() {
      return this.$store.state.playlist;
    },
    getSongs() {
      return this.$store.state.allSongs;
    },
    getTogglePopupPl() {
      return this.$store.state.togglePopupPl;
    },
    editmode() {
      return this.$store.state.editModePL;
    },
    removemode() {
      return this.$store.state.removeModePL;
    },
    selected() {
      return this.$store.state.selectedPL;
    },
    action() {
      return this.$store.state.action;
    }
  },
  methods: {
    open(playlist) {
      console.log("removemode ", this.removemode, ', editmode ', this.editmode);
      if(this.editmode || this.removemode) {
        this.select(playlist);
        return;
      }

      this.$router.push('/playlists/' + playlist._id);
    },
    select(playlist) {
      console.log(playlist);
      this.$store.dispatch('selectPL', playlist);
      console.log("selected playlist ", this.$store.state.selectedPL._id);
    },
    toggle() {
      this.$store.dispatch('togglePopupPl');
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
    getDuration(ms) {
      let minutes = Math.floor(ms/60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return (
        seconds == 60 ? 
        (minutes+1) + '00' :
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      );
    },
    playlistDuration(playlist) {
      let durations = [];
      let allSongs = this.getSongs;

      for(let i = 0; i < playlist.songList.length; i++) {
        for(let j = 0; j < allSongs.length; j++) {
          if(playlist.songList[i] == allSongs[j]._id) {
            durations.push(allSongs[j].duration);
          }
        }
      }

      let sum = 0;
      for(let i = 0; i < durations.length; i++) {
        sum += this.getDuration(durations[i]);
      }

      if(sum == 0) {
        return '00:00';
      }

      sum = sum.split('');
      let format = '';
      for(let i = 0; i <= 4; i++) {
        format += sum[i];
      }

      return format;
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
    getThumbnail(id){
      let data = this.getSongs;
      for(let i = 0; i < data.length; i++) {
        if(id == data[i]._id) {
          return data[i].thumbnail;
        }
      }
    }
  }
}
</script>

<style scoped>
 .playlists {
   width: 100vw;
   height: 90vh;
   margin-left: 20vw;
   padding: 2em;
 }

 .playlists-details {
   display: flex;
   justify-content: space-between;
   align-content: center;
 }

 .option-icons {
   display: flex;
   gap: 0.75em;
 }

 .option-icon {
   cursor: pointer;
 }

 .option-icon:hover {
   opacity: 0.75;
 }

 .playlist-info {
    font-size: 14px;
    opacity: 0.5;
    font-weight: 900;
 }

 .pagetitle {
   font-size: 28px;
 }

 .wrapper {
   margin-top: 2em;
   display: grid;
   grid-template-columns: repeat(4, 200px);
   gap: 4em;
 }

 .playlist-wrapper {
   display: flex;
   flex-direction: column;
   gap: 0.25em;
 }

 .upper-playlist-part {
   display: flex;
   justify-content: space-between;
   align-items: center;
 }

 .playlist-title {
   font-size: 16px;
   font-weight: 900;
 }

 .options-btns {
   display: flex;
   gap: 0.25em;
   cursor: pointer;
 }

 .options-btns:hover {
   opacity: 0.75;
 }

 .option-btn {
    width: 0.25em;
    height: 0.25em;
    border-radius: 50%;
    background-color: #fff;
 }

 .playlist-card {
   width: 200px;
   height: 200px;
   cursor: pointer;
   border: 2px solid transparent;
 }

 .playlist-card:hover {
   opacity: 0.75;
 }

 .single-thumbnail {
   height: 200px;
   width: 200px;
   border-radius: 5px;
   border: 2px solid transparent;
 }

 .thumbnail-100x100 {
   width: 100px;
   height: 100px;
   border: 2px solid transparent;
 }

 .thumbnails {
   width: 100px;
   height: 100px;
 } 

 .multiple-thumbnails {
   display: grid;
   grid-template-columns: 100px 100px;
   margin-top: 0.25em;
   border: 2px solid transparent;
   justify-content: center;
   align-content: center;
   border-radius: 5px;
 }

 .top-left {
   border-top-left-radius: 5px;
 }

 .top-right {
   border-top-right-radius: 5px;
 }

 .bottom-left {
   border-bottom-left-radius: 5px;
 }

 .bottom-right {
   border-bottom-right-radius: 5px;
 }

 .emptyplaylist-img {
   width: 200px;
   height: 200px;
   border-radius: 5px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(105, 104, 104, 0.1);
   cursor: pointer;
   border: 2px solid transparent;
 }

 .target {
   border: 2px solid rgba(196, 196, 196, 0.5);
 }

 .remove {
   border: 2px solid rgba(236, 50, 50, 0.25);
 }

 .remove:hover {
   border: 2px solid rgba(255, 0, 0, 0.5);
 }

 .target:hover {
   border: 2px solid rgba(22, 96, 165);
 }

 .emptyplaylist-img:hover {
   opacity: 0.75;
 }

 .emptyplaylist {
   font-size: 12px;
   font-weight: 900;
   opacity: 0.5;
 }

 .length-duration {
   font-size: 12px;
    opacity: 0.5;
    font-weight: 900;
 }

 .selectedpl {
   font-size: 12px;
   font-weight: 900;
   margin-right: 0.75em;
 }

  .span-chosenpl {
    font-weight: 100;
    margin-right: 0.25em;
    opacity: 0.5;
  }

</style>