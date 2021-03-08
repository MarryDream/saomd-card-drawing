import Vue from 'vue'
import Vuex from 'vuex'
import draw from './modules/draw'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    draw
  },
})

export default store
