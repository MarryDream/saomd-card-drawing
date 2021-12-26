import router from '@/router'
import store from '@/store'

router.beforeEach(async (to, from, next) => {
  await store.dispatch('imageInfo/initImgInfo')
  next()
})
