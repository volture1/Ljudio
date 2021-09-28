<template>
  <div class="homepage">
    <h1>Homepage</h1>
    {{currentUser}}
  </div>
</template>
<script>


export default ({
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
})

</script>
