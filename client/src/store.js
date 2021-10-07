import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
  currentUser: null,
  loggedIn:false,
  playlist: [],
  duplicateEmail:'',
  allSongs: [],
  toggleCreatePl: false,
  togglePopupPl: false,
  editModePL: false,
  removeModePL: false,
  chosenSong : null,
  selectedPL: null,
  action: '',
  addToPLPopup: false,
  recentlyPlayed:[],
  recentSongs:[],
  liked:[],
  likedSongs:[]
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  setSongList(state, currentSongList) {
    state.currentSongList = currentSongList
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist;
  },
  addPlaylist(state, playlist) {
    state.playlist.push(playlist);
  },
  setRecentlyPlayed(state,recentlyPlayed){
    state.recentlyPlayed = recentlyPlayed
  },
  setRecentSongs(state,songs){
    state.recentSongs = songs
  },
  setLiked(state,liked){
    state.liked = liked
  },
  setLikedSongs(state,songs){
    state.likedSongs = songs
  },
  setLoggedIn(state,loggedIn){
    state.loggedIn = loggedIn
  },
  setDuplicateEmail(state,duplicateEmail){
    state.duplicateEmail = duplicateEmail
  },
  setSongs(state, songs) {
    state.allSongs = songs;
  },
  addSong(state, song) {
    state.allSongs.push(song);
  },
  setToggleCreatePl(state, show) {
    state.toggleCreatePl = show;
  },
  setTogglePopupPl(state) {
    state.togglePopupPl = !state.togglePopupPl;
  },
  setEditPL(state) {
    state.editModePL = !state.editModePL;
  },
  setRemovePL(state) {
    state.removeModePL = !state.removeModePL;
  },
  setChosenSong(state, choice) {
    state.chosenSong = choice;
  },
  setSelectedPL(state, playlist) {
    state.selectedPL = playlist;
  },
  setAction(state, choice) {
    state.action = choice;
  },
  setAddToPlPopup(state) {
    state.addToPLPopup = !state.addToPLPopup;
  }
}
const actions = {
  //Register
  async register(store, credentials) {
    let res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      let user = await res.json();
      console.log('user when register',user)
      if (user.error == 'Email already in use'){
        store.commit('setDuplicateEmail','Email already in use')  
        store.commit('setLoggedIn',false);        
        console.log('duplicateEmail',this.state.duplicateEmail)
        return;
      }
      store.commit('setDuplicateEmail','')  
      console.log('success');     
      store.commit('setCurrentUser', user); 
      store.commit('setLoggedIn', true);
      console.log(this.state.loggedIn);
  },
  //Login
  async login(store,credentials){
    console.log("credentials is ",credentials);
    let res = await fetch('/api/login',{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(credentials)
    })
    console.log("user0",res);
    let user = await res.json();
    await this.dispatch('getLoggedIn');
  },
  async getPlaylists(store, userId) {
    let playlists = await fetch('/rest/playlists/user/' + userId);
    playlists = await playlists.json();
    store.commit('setPlaylist', playlists);
  },
  async addSong(store, song) {
    let res = await fetch('/rest/songs', {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res = await res.json();
    store.commit('addSong', res);
    console.log("all songs ", this.state.allSongs);
  },
  async getSongs(store) {
    let songs = await fetch('/rest/songs');
    songs = await songs.json();
    store.commit('setSongs', songs);
  },
  async createPlaylist(store, playlist) {
    let playlists = await fetch('/rest/playlists', {
      method: 'POST',
      body: JSON.stringify(playlist),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    playlists = await playlists.json();
    console.log(playlists._id);
    store.commit('addPlaylist', playlists);
  },
  async addSongToPL(store, playlist, songid) {
    let res = await fetch(('/rest/playlists/' + playlist._id + '/' + songid), {
      method: 'PUT',
      body: JSON.stringify(playlist),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res = await res.json();
    console.log(res);
    store.commit('setPlaylist', res);
  },

  async getRecentlyPlayeds(store,userId) {
    let recentlyPlayeds = await fetch('/rest/recentlyPlayeds/user/' + userId);
    recentlyPlayeds = await recentlyPlayeds.json(); 
    store.commit('setRecentlyPlayed',recentlyPlayeds) 
    if (recentlyPlayeds.length > 0){    
      store.commit('setRecentSongs',this.state.recentlyPlayed[0].songList)
    } else {
      store.commit('setRecentSongs',[])
    }  
  },

  async getLikeds(store,userId) {
    let likeds = await fetch('/rest/Likeds/user/' + userId);
    likeds = await likeds.json();    
    store.commit('setLiked',likeds)
    if (likeds.length > 0) {  
      store.commit('setLikedSongs',this.state.liked[0].songList)
    } else {
      store.commit('setLikedSongs',[])
    }     
  },

  async logout(store) {
    let res = await fetch('/api/login', {
      method: "DELETE"
    });
    res = await res.json();
    store.commit('setCurrentUser', null);
    store.commit('setLoggedIn', res.email);
  },
  async getLoggedIn(store) {
    let res = await fetch('/api/login', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });
    res = await res.json();
    store.commit('setCurrentUser', res);
  },
  async deletePlaylist(store) {
    let res = await fetch(('/rest/playlists/' + this.state.selectedPL._id), {
      method: 'DELETE'
    });
    res = await res.json();
    store.dispatch('getPlaylists', this.state.currentUser._id);
    store.commit('setSelectedPL', null);
    store.commit('setAction', '');
  },
  togglePopupPl(store) {
    store.commit('setTogglePopupPl');
  },
  editmode(store) {
    store.commit('setEditPL');
  },
  removemode(store) {
    store.commit('setRemovePL');
  },
  chooseSong(store, choice) {
    store.commit('setChosenSong', choice);
  },
  selectPL(store, playlist) {
    store.commit('setSelectedPL', playlist);
  },
  chooseAction(store, choice) {
    store.commit('setAction', choice);
  },
  async toggleAddToPlPopup(store) {
    store.commit('setAddToPlPopup');
    store.commit('setLoggedIn', res.email);
    if(res.email){
      await this.dispatch('getRecentlyPlayeds',res._id)
      await this.dispatch('getLikeds',res._id)
    }
  }
}
export default createStore({ state, mutations, actions})