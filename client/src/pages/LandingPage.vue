<template>
  <div class="landingpage">
    <div class="nav">
      <div class="leftnav-side">
        <h3 class="productname">Logio</h3>
        <img src="../assets/Logo.png" alt="" class="logo">
      </div>
      <div class="navlinks">
        <p class="navlink">About</p>
        <p class="navlink">Contact</p>
        <router-link to="/Register">
          <p class="navlink">Register</p>
        </router-link>
        <router-link to="/Login">
          <p class="navlink">Log in</p>
        </router-link>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="texthold">
          <h1 class="title">Discover, listen & share</h1>
          <h3 class="description">Browse among the latest songs, videos and artists and share your music experience with others</h3>
        </div>
        <div class="imghold">
          <img src="../assets/SoundwaveBtn.png" alt="" class="soundwave-img">
          <router-link to="/Register">
            <h3 class="getstarted">Get started</h3>
          </router-link>
        </div>
      </div>
      <div class="albumflow-wrap">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser[0];
    }
  }
}
</script>

<style scoped>

  a {
    text-decoration: none;
    color: white;
  }

  .landingpage {
    display: flex;
    flex-direction: column;
  }
  
  .imghold{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .getstarted {
    font-size: 22px;
    margin-left: 1em;
  }

  .getstarted:hover {
    opacity: 0.5;
  }

  .nav {
    background-color: rgba(43, 52, 61, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 1em;
    padding-right: 4em;
    width: 100vw;
  }

  .leftnav-side {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }

  .productname {
    font-size: 30px;
  }

  .navlinks {
    display: flex;
    gap: 2em;
  }

  .navlink {
    font-weight: 900;
    cursor: pointer;
  }

  .navlink:hover {
    opacity: 0.5;
  }

  .title {
    font-size: 48px;
  }

  .description {
    font-size: 34px;
    opacity: 0.5;
    width: 25vw;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 6em;
    
  }
  
  .left {
    display: flex;
    flex-direction: column;
    gap: 4em;
    margin-top: 8em;
  }

  .albumflow-wrap {
    align-self: flex-end;
  }
  
</style>