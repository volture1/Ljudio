import { createStore } from 'vuex';

const state = {
  currentSong: '',
  currentSongList: [],
}
const mutations = {
  setSongId(state, currentSong){
    state.currentSong = currentSong
  },
}
const actions = {

}
export default createStore({ state, mutations, actions })