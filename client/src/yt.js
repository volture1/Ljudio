function onYouTubeIframeAPIReady() {
  window.player = new YT.Player('yt-player', {

    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'rel': 0,
      'fs': 0,
    },

    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) return
}

function onPlayerReady(event) {
  event.target.playVideo();
}