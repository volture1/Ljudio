import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
  loggedIn:false,
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
    let user = await fetch('/api/login',{
      method:'POST',
      body:JSON.stringify(credentials)
    })
    try{
      user = await user.json()
      store.commit('setCurrentUser',user)
    }catch{
      console.log("user",user)
      console.warn("Wrong information")
    }
  } 

}
export default createStore({ state, mutations, actions })