<template>
  <div class="landingpage">
    
    <div id="nav" class="nav">
      <div class="leftnav-side responsive desktop  ">
        <h3 class="productname">Ljudio</h3>
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
    <div class="content responsive mobilec desktop">
      <div class="left">
        <div class="texthold">
          <h3 class="productname">Ljudio</h3>
        <img src="../assets/Logo.png" alt="" class="mobileLogo">
          <h1 class="title">Discover, listen & share</h1>
          
           <h3 class="description">Browse among the oldest songs, videos and artists and share your music experience with others</h3>
        </div>
        <div class="imghold">
          <img src="../assets/SoundwaveBtn.png" alt="" class="soundwave-img responsive desktop">
          <img src="../assets/SoundwaveBtnsmall.png" alt="" class="soundwave-img responsive mobile">
          <router-link to="/Register">
            <h3 class="getstarted">Get started</h3>
          </router-link>
        </div>
      </div>
      <div class="albumflow-wrap">
        <!-- <img src="../assets/AlbumFlow.png" alt="" class="albumflow-img"> -->
      </div>
    </div>
  </div>
</template>



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
    justify-content: left;
    align-items: center;
  }

  .logo {
  position: absolute;
  top: 8px;
  left: 110px;
  font-size: 18px;
}

.mobileLogo {
  position: absolute;
  top: 105px;
  left: 180px;
  font-size: 18px;
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
    gap: 3em;
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

  .responsive{
  display: none;
}

@media screen and (max-width: 450px) {
  .mobile{
    display: block;
  }  
}

@media screen and (max-width: 450px) {
  .mobilec{
    display: block;
    padding-left: 0.5em;
  }  
}

@media screen and (max-width: 600px) {
  .topnav a {
    float: none;
    width: 100%;
  }
}


@media screen and (min-width: 451px) and (max-width: 750px) {
  .tablet{
    display: block;
  }  
}

@media screen and (min-width: 451px) and (max-width: 750px) {
  .tablet{
    display: block;
  }  
}

@media screen and (min-width: 751px) {
  .desktop{
    display: block;
  }  
}

  
</style>

<script>

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("nav").style.top = "0";
  } else {
    document.getElementById("nav").style.top = "-50px";
  }
}

</script>