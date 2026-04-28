export interface IApis {
    [fieldName: string]: string;
}

const apis: IApis = {
    GET_IMAGE_INFO: "https://s3.marrydream.top/saomd/config/drawInfo.yml"
};

export default apis;
