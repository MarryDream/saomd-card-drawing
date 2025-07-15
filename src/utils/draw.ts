import type { ImageInfo, AllImageInfo } from "@/type/ImageInfo";

export type DrawTime = 1 | 11

// 角色卡池概率数组
const charaChance: number[] = [ 55, 35, 4, 3, 3 ];
// 武器卡池概率数组
const weaponChance: number[] = [ 67, 29, 4 ];

/**
 * 根据概率获得星级
 * @param arr 概率数组
 * @param minStar 最小星级
 * @returns 抽到的星级
 */
function getLotteryStar( arr: number[], minStar: number = 2 ): number {
    // 求数组和
    const sum = arr.reduce( ( sum: number, x: number ) => sum + x );
    let star = minStar;
    let random: number = Math.random() * sum;

    for ( let i = 0; i < arr.length; i++ ) {
        if ( random < arr[i] ) {
            star = i + minStar;
            break;
        }
        random -= arr[i];
    }

    return star;
}

/**
 * 从特定星级和种类中随机获取图片信息
 * @param allImageInfo 全部图片信息对象
 * @param type 抽卡种类
 * @param star 星级
 * @returns 随机取到的图片信息
 */
function getLotteryInfo( allImageInfo: AllImageInfo, type: ImageInfo["type"] = "character", star: number = 2 ): ImageInfo {
    const imageList: ImageInfo[] | undefined = allImageInfo[type] && allImageInfo[type]![star];
    if ( imageList ) {
        const random = Math.floor( Math.random() * imageList.length );
        return imageList[random];
    } else {
        throw new Error( "allImageInfo不能为空" );
    }
}

/**
 * 返回抽卡结果数组
 * @param allImageInfo 全部图片信息对象
 * @param type 抽卡种类
 * @param time 抽卡次数
 * @return 随机取到的抽卡结果数组
 */
function getLotteryList( allImageInfo: AllImageInfo, type: ImageInfo["type"] = "character", time: DrawTime = 1 ): ImageInfo[] {
    const arr: ImageInfo[] = [];
    // 判断抽卡种类
    const chanceArr = type === "character" ? charaChance : weaponChance;
    for ( let index = 0; index < time; index++ ) {
        // 获取抽到的星级
        const star = getLotteryStar( chanceArr, 2 );
        // 获取抽到的图片信息
        const lotteryInfo = getLotteryInfo( allImageInfo, type, star );
        arr.push( lotteryInfo );
    }
    return arr;
}

export default getLotteryList;
