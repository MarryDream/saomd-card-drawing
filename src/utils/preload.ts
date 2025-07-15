/**
 * 加载远程图片
 * @param {string} src 图片url
 * @return Promise<void>
 */
export function loadImg( src: string ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            resolve();
        };
        img.onerror = () => {
            reject( new Error( "图片加载失败" ) );
        };
    } );
}

/**
 * 批量加载远程图片，全部加载完毕后返回
 * @param {string[]} srcList 图片url数组
 * @return Promise<void>
 */
export async function loadImgAll( srcList: string[] ): Promise<void> {
    await Promise.allSettled( srcList.map( s => loadImg( s ) ) );
}
