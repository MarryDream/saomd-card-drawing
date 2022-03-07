import {ImageInfo} from "./ImageInfo";

export type Category = "all" | "chara" | "weapon"

export interface IPoolItem {
  type: ImageInfo["type"]
  name: string,
  active: boolean
}

export interface ICategoryItem {
  name: Category,
  value: string,
  num: number
}

export interface IPropState {
  category: Category
  charaPoolList: IPoolItem[]
  weaponPoolList: IPoolItem[]
  allPoolList: IPoolItem[]
  poolList: IPoolItem[]
  categoryList: ICategoryItem[]
  activeIndex: number
  isTransition: boolean
  poolType: string
}
