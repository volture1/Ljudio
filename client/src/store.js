import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
  currentUser: {},
  loggedIn:false,
  playlist: [],
  duplicateEmail:'',
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
  setDuplicateEmail(state,duplicateEmail){
    state.duplicateEmail = duplicateEmail
  },
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
        return
      }
      store.commit('setDuplicateEmail','')  
      console.log('success');     
      store.commit('setCurrentUser', user); 
      store.commit('setLoggedIn',true);
  },
  //Login
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