// const draw = () => {
//     // let star = 0
//     // const random = Math.random()
//     // // 3 3 4 25 65  4 25 71
//     // if (random < 0.03) {
//     //     star = 6
//     // } else if (random >= 0.03 && random < 0.06) {
//     //     star = 5
//     // } else if (random >= 0.06 && random < 0.1) {
//     //     star = 4
//     // } else if (random >= 0.1 && random < 0.35) {
//     //     star = 3
//     // } else {
//     //     star = 2
//     // }
//     // return star

// }
const charaStar = [6, 5, 4, 3, 2]
const charaChance = [0.03, 0.06, 0.1, 0.35, 1]

const weaponStar = [4, 3, 2]
const weaponChance = [0.04, 0.29, 1]

function randomDraw(chanceArray, starArry) {
  const random = Math.random()
  if (random < Math.min.apply(null, chanceArray)) {
    return starArry[0]
  }

  let star = 2
  for (let i = 1; i < chanceArray.length; i++) {
    if (chanceArray[i] > random) {
      star = starArry[i]
      break
    }
  }
  return star
}

export default (time = 1, type = 'character') => {
  const arr = []
  const chanceArr = type === 'character' ? charaChance : weaponChance
  const starArr = type === 'character' ? charaStar : weaponStar
  for (let index = 0; index < time; index++) {
    arr.push(randomDraw(chanceArr, starArr))
  }
  return arr
}
