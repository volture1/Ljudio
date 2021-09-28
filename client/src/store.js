import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
  loggedIn:false,
  currentUser:[]
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
  setCurrentUser(state,currentUser){
    state.currentUser = currentUser
  }
}
const actions = {
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
    store.commit('setCurrentUser',user)
  }
}
export default createStore({ state, mutations, actions })