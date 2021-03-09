const getDefaultState = () => {
  return {
    chara: [],
    weapon: [],
    poolType: '',
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
  changePoolType: (state, newType) => {
    state.poolType = newType
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

