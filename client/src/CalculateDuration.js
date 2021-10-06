export default class CalculateDuration{
    constructor(songList,allSongs){    
        this.songList = songList;
        this.allSongs = allSongs
    }  
    getDuration(ms) {
        let minutes = Math.floor(ms/60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return (
          seconds == 60 ? 
          (minutes+1) + '00' :
          minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        );
      }
    songlistDuration() {
        let allSongs = this.allSongs
        let sum = 0;
        let fixedSongList = [];

        for(let i = 0; i < this.songList.length; i++) {
          for(let j = 0; j < allSongs.length; j++) {
            if(this.songList[i]._id === allSongs[j]._id) {
              fixedSongList.push(allSongs[j]);
            }
          }
        }
        
        for(let i = 0; i < fixedSongList.length; i++) {
          sum += parseInt(fixedSongList[i].duration);
        }
  
        sum = this.getDuration(sum);
        return sum;
      }
}