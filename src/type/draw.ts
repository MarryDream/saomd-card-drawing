import type { AllImageInfo, ImageInfo } from "./ImageInfo";

export type PageType = 1 | 2

export interface IDrawState {
    poolType: ImageInfo["type"];
    pageType: PageType;
    drawList: ImageInfo[];
    bgmPlayState: boolean;
    allImageInfo: AllImageInfo;
}
