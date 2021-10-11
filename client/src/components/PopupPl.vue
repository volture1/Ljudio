<template>
  <div class="popup">
    <div class="closediv">
      <p @click="hide()" class="close choice">Close</p>
    </div>
    <div class="editdiv">
      <p @click="edit('edit')" class="edit choice">Edit</p>
    </div>
    <div class="removediv">
      <p @click="remove('remove')" class="remove choice">Remove</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    action() {
      return this.$store.state.action;
    },
    selectedPlaylist() {
      return this.$store.state.selectedPL;
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('togglePopupPl');
    },
    edit(action) {
      this.$store.dispatch('editmode');
      this.$store.dispatch('chooseAction', action);
      console.log(this.$store.state.action);
    },
    remove(action) {
      if(this.action === 'remove' && this.selectedPlaylist) {
        this.$store.dispatch('deletePlaylist', this.selectedPlaylist._id)
      }
      this.$store.dispatch('removemode');
      this.$store.dispatch('chooseAction', action);
      console.log(this.$store.state.action);
    }
  }
}
</script>

<style scoped>
  .popup {
    width: 10vw;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.75em;
    background-color: rgba(5, 5, 5, 0.411);
    border-radius: 5px;
    backdrop-filter: blur(4px);
    position: absolute;
    right: 1.5em;
    top: 6em;
  }

  .closediv {
    align-self: flex-end;
  }

  .choice {
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
  }

  .choice:hover {
    opacity: 0.5;
  }
</style>