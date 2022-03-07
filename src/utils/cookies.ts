import {isJsonString} from "./validate"
import {AllImageInfo} from "@/type/ImageInfo"

export type ImageInfoResponse = AllImageInfo | string

// 卡池内图片信息
const allImgInfoKey = 'ALL_IMG_INFO'
export const setAllImageInfo = (info: AllImageInfo) => localStorage.setItem(allImgInfoKey, JSON.stringify(info))
export const getAllImageInfo = (): ImageInfoResponse => {
  const getValue = localStorage.getItem(allImgInfoKey)
  return getValue && isJsonString(getValue) ? JSON.parse(getValue) : ''
}
