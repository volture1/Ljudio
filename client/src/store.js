import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
  currentUser: {},
  loggedIn:false,
  playlist: [],
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist
  },
  setLoggedIn(state,loggedIn){
    state.loggedIn = loggedIn
  },
}
const actions = {
  async register(store, credentials) {
    let user = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    try{
      user = await user.json();
      console.log('success');
      console.log('user when register',user)
      store.commit('setCurrentUser', user); 
      store.commit('setLoggedIn',true);
    }catch{
      console.warn("Registration error");
    }
},
  async login(store,credentials){
    console.log("credentials is ",credentials);
    let res = await fetch('/api/login',{
      method:'post',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(credentials)
    })
    console.log("user0",res)
    let user = await res.json()
    console.log("user1",user)
    store.commit('setCurrentUser',user[0])
    store.commit('setLoggedIn',true)
  }
}
export default createStore({ state, mutations, actions })