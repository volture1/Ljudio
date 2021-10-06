<template>
  <div class="popup">
    <div class="closediv">
      <p @click="hide()" class="close choice">Close</p>
    </div>
    <div class="editdiv">
      <p class="edit choice">Edit</p>
    </div>
    <div class="removediv">
      <p class="remove choice">Remove</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hide() {
      this.$store.dispatch('togglePopupPl');
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
    text-decoration: underline;
    cursor: pointer;
  }

  .choice:hover {
    opacity: 0.5;
  }
</style>