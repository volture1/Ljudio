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
  togglePopupPl: true
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist;
  },
  addPlaylist(state, playlist) {
    state.playlist.push(playlist);
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
  setToggleCreatePl(state, show) {
    state.toggleCreatePl = show;
  },
  setTogglePopupPl(state) {
    state.togglePopupPl = !state.togglePopupPl;
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
    console.log("user1", user);
    store.commit('setCurrentUser', user);
    store.commit('setLoggedIn', true);
  },
  async getPlaylists(store, userId) {
    console.log(userId);
    let playlists = await fetch('/rest/playlists/user/' + userId);
    playlists = await playlists.json();
    console.log(playlists);
    store.commit('setPlaylist', playlists);
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
    store.commit('addPlaylist', playlist);
  },
  async logout(store) {
    let res = await fetch('/api/login', {
      method: "DELETE"
    });
    res = await res.json();
    store.commit('setCurrentUser', null);
  },
  async getLoggedIn(store) {
    let res = await fetch('/api/login', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });
    res = await res.json();
    store.commit('setCurrentUser', res);
  },
  togglePopupPl(store) {
    store.commit('setTogglePopupPl');
  }
}
export default createStore({ state, mutations, actions})