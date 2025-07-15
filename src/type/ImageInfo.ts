type Attrs = "unattributed" | "earth" | "wind" | "fire" | "water" | "light" | "dark"
type Type = "character" | "weapon"

export interface ImageInfo {
    id: string;
    attr: Attrs;
    job: number;
    star: number;
    type: Type;
}


export type StarImageData = {
    [key in number]?: ImageInfo[]
}

export type AllImageInfo = {
    [key in Type]?: StarImageData
}
