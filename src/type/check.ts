import type { AllImageInfo } from "@/type/ImageInfo";
import type { ImageInfoResponse } from "@/utils/cookies";

export function isAllImageInfo( obj: ImageInfoResponse ): obj is AllImageInfo {
    return typeof obj !== "string";
}
