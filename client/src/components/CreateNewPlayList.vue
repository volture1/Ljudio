<template>
  <div class="popup">
      <v-dialog max-width="600px">
          <form @submit.prevent="handleSubmit">
          <div class="field">
            <input class="input" type="text" name="playListName" v-model="playListName" required  placeholder="playList Name">
            <div class="p">X</div>
            <div class="exec" @click="createNewPlayList">➔</div>
          </div>
      </form>
      </v-dialog>      
  </div>
</template>

<script>
export default {
  data:{
    playListName:"",
  },
  computed:{
    currentUser(){
      return this.$store.state.currentUser;
    }

  },
  methods: {
     createNewPlaylist() {        
        let data = {
          name: this.playListName,
          userId: this.currentUser._id,
          songList: [],
          createdDate: new Date()
        }
        console.log('data',data)
        await this.$store.dispatch('createPlaylist', data); 
      },
  }
}
</script>

<style>

</style>