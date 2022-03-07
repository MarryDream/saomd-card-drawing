import { AllImageInfo } from "@/type/ImageInfo"
import { ImageInfoResponse } from "@/utils/cookies"

export function isAllImageInfo(obj: ImageInfoResponse): obj is AllImageInfo {
  return typeof obj !== "string"
}
