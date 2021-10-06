<template>
  <div class="popup">
    <input type="text" placeholder="Playlist name" class="playlistname-input" v-model="this.input">
    <p @click="save()" class="save">Save</p>
    <p @click="close()" class="close">Close</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    save() {
      let date = new Date();
      date = date.toLocaleTimeString('sv-SE', {year: 'numeric', month:'numeric', day:'numeric', hour: '2-digit', minute: '2-digit'});

      let playlist = {
        name: this.input,
        userId: this.currentUser._id,
        songList: [],
        createdDate: date
      };
      this.$store.dispatch('createPlaylist', playlist);
      console.log(this.currentUser);
      this.$store.commit('setToggleCreatePl', false);
    },
    close() {
      this.$store.commit('setToggleCreatePl', false);
    }
  }
}
</script>

<style scoped>
  .popup {
    width: 20vw;
    height: 5vh;
    padding: 0.25em 1em;
    display: flex;
    gap: 0.5em;
    background-color: rgba(5, 5, 5, 0.411);
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 19.5vh;
    left: 7vw;
    backdrop-filter: blur(4px);
  }

  .playlistname-input  {
    background-color: transparent;
    outline: none;
    border: none;
    /* border-bottom: 1px solid transparent; */
    width: 100%;
    height: 90%;
    color: white;
    font-weight: 900;
    font-size: 14px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .playlistname-input:focus {
    /* border-bottom: 2px solid rgba(36, 37, 38, 0.5); */
    /* border-bottom: 1px solid rgba(7, 104, 201, 0.5); */
  }

  .save, .close {
    font-weight: 900;
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
  }

  .close {
    margin-left: 1em;
  }

  .save:hover, .close:hover {
    opacity: 0.5;
  }

</style>