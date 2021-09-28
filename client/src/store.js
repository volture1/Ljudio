import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
  currentUser: {}
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  }
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
      store.commit('setCurrentUser', user); 
    }catch{
      console.warn("Registration error");
    }
  }
}
export default createStore({ state, mutations, actions })