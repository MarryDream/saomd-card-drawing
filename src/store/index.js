import Vue from 'vue'
import Vuex from 'vuex'
import draw from './modules/draw'
import imageInfo from './modules/imageInfo'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    draw,
    imageInfo
  },
  getters
})

export default store
