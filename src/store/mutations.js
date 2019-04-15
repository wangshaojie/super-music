import * as types from './mutation-types'
import { type } from 'os'

const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [type.SET_PLAYING_STATE](state, list) {
    state.playList = list
  },
  [type.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [type.SET_PLAY_MODE](state, list) {
    state.mode = list
  },
  [type.SET_CURRENT_INDEX](state, index) {
    this.currentIndex = index
  }
}

export default matutaions