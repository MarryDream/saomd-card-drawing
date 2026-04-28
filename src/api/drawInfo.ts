import { parse } from "yaml";
import { request } from "@/utils/request";
import type { AllImageInfo } from "@/type/ImageInfo";

export async function requestImageInfo() {
    const res = await request<string>( {
        url: "https://s3.marrydream.top/saomd/config/drawInfo.yml",
        method: "get",
        params: {
            random: Date.now()
        },
        responseType: "text"
    } );

    return parse( res ) as AllImageInfo;
}

export type {
    AllImageInfo
};
