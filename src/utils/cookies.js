import { isJsonString } from './validate'

// 卡池内图片信息
const allImgInfoKey = 'ALL_IMG_INFO'
export const setAllImageInfo = info => localStorage.setItem(allImgInfoKey, JSON.stringify(info))
export const getAllImageInfo = () => {
  const getValue = localStorage.getItem(allImgInfoKey)
  return isJsonString(getValue) ? JSON.parse(getValue) : ''
}
