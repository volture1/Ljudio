

<template>
 
  <div id="youtube-player"></div>

</template>

<script>
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

export default ({
  data() {
    return {
      player: null,
    };
  },
  methods:{
     initYoutube() {
      const _ = this;
      console.log("initYoutube");
      this.player = new YT.Player("youtube-player", {
        width: 600,
        height: 400,
        videoId: "Xa0Q0J5tOP0",
        events: {
          onReady: _.onPlayerReady,
          onStateChange: _.onPlayerStateChange
        }
      });
    },
    onPlayerReady(evt) {
      console.log("Player ready");
      evt.target.playVideo();
    },
    onPlayerStateChange(evt) {
      console.log("Player state changed", evt);
    }
  },

})
onYouTubeIframeAPIReady = () => {
  console.log("onYouTubeIframeAPIReady");
  this.initYoutube();
};
</script>
