import { createStore } from 'vuex';

const state = {
  currentSong: '',
  playlist: [],
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist
  },
}
const actions = {

}
export default createStore({ state, mutations, actions })