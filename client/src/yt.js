// gets called automatically when YouTube player loads
function onYouTubeIframeAPIReady() {
  // using global variable
  window.player = new YT.Player('yt-player', {
    
    //height: '760',

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


// this function triggers when we change song in player
// can be used to update things, like counters
function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) return
}

function onPlayerReady(event) {
  event.target.playVideo();
}