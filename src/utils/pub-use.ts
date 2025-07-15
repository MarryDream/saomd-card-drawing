// 获取assets静态资源
export function getAssetsFile( url: string ) {
    const dirs = url.split( "/" );
    switch ( dirs.length ) {
        case 2:
            return new URL( `../assets/images/${ dirs[0] }/${ dirs[1] }`, import.meta.url ).href;
        default:
            return new URL( `../assets/images/${ url }`, import.meta.url ).href;
    }
}
