// 角色卡池概率数组
const charaChance = [55, 35, 4, 3, 3]
// 武器卡池概率数组
const weaponChance = [67, 29, 4]

/**
 * 根据概率获得星级
 * @param {number[]} arr 概率数组
 * @param {number} minStar 最小星级
 * @returns {number} 抽到的星级
 */
function getLotteryStar(arr, minStar = 1) {
  // 求数组和
  const sum = arr.reduce((sum, x) => sum + x)
  let star,
    random = Math.random() * sum

  for (let i = 0; i < arr.length; i++) {
    if (random < arr[i]) {
      star = i + minStar
      break
    }
    random -= arr[i]
  }

  return star
}

/**
 * 从特定星级和种类中随机获取图片信息
 * @param {*} allImageInfo 全部图片信息对象
 * @param {string} type 抽卡种类[character|weapon]
 * @param {number} star 星级
 * @returns 随机取到的图片信息
 */
function getLotteryInfo(allImageInfo = {}, type = 'character', star = 2) {
  const imageList = allImageInfo[type][star]
  const random = Math.floor(Math.random() * imageList.length)
  return imageList[random]
}

export default (allImageInfo = {}, type = 'character', time = 1) => {
  const arr = []
  // 判断抽卡种类
  const chanceArr = type === 'character' ? charaChance : weaponChance
  for (let index = 0; index < time; index++) {
    // 获取抽到的星级
    const star = getLotteryStar(chanceArr, 2)
    // 获取抽到的图片信息
    const lotteryInfo = getLotteryInfo(allImageInfo, type, star)
    arr.push(lotteryInfo)
  }
  return arr
}
