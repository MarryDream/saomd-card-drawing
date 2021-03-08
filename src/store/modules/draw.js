const getDefaultState = () => {
  return {
    chara: [],
    weapon: []
  }
}

const state = getDefaultState()

const mutations = {
  addChara: (state, newChara) => {
    // state.chara = state.chara.concat(newChara)
    state.chara = newChara
  },
  addWeapon: (state, newWeapon) => {
    // state.weapon = state.weapon.concat(newWeapon)
    state.weapon = newWeapon
  },
}

export default {
  namespaced: true,
  state,
  mutations
}

