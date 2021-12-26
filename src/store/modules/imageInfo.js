import { setAllImageInfo, getAllImageInfo } from '@/utils/cookies'
import $http from '@/api'

const state = {
  allImageInfo: {}
}

const mutations = {
  SET_ALL_IMG_INFO(state, info) {
    state.allImageInfo = info
  }
}

const actions = {
  initImgInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // 先从localStory里面获取，若没有再请求
      const imageInfo = getAllImageInfo()
      if (imageInfo) {
        commit('SET_ALL_IMG_INFO', imageInfo)
        resolve(imageInfo)
      } else {
        $http
          .getFileList()
          .then(res => {
            const allImageInfo = {}
            const reg = /(character|weapon)_star(\d)_job(\d+)_(\w+)_(\d+)/
            for (const file of res.files) {
              const fileName = file.name
              const [, type, star, job, attr, id] = fileName.match(reg)
              // 若种类属性不存在，设置为空对象
              if (!allImageInfo[type]) {
                allImageInfo[type] = {}
              }
              const allImageInfoByType = allImageInfo[type]
              // 若星级属性不存在，设置为空数组
              if (!allImageInfoByType[star]) {
                allImageInfoByType[star] = []
              }
              allImageInfoByType[star].push({ id, star, type, job, attr })
            }
            commit('SET_ALL_IMG_INFO', allImageInfo)
            setAllImageInfo(allImageInfo)
            resolve(info)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
