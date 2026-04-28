import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig
} from "axios";

export interface RequestConfig<T = unknown> extends AxiosRequestConfig {
    /** 是否直接返回原始响应 data, 默认 true */
    raw?: boolean;
    /** 是否静默处理错误 */
    silent?: boolean;
    /** 业务层可额外携带的元信息 */
    meta?: T;
}

export interface RequestErrorData {
    code?: number;
    message?: string;
    data?: unknown;
}

const server: AxiosInstance = axios.create( {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 60000,
    withCredentials: false,
    responseType: "json",
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
} );

server.interceptors.request.use( ( config: InternalAxiosRequestConfig ) => {
    return config;
}, error => {
    return Promise.reject( error );
} );

server.interceptors.response.use( response => {
    return response.data;
}, ( error: AxiosError<RequestErrorData> ) => {
    const message = error.response?.data?.message
        ?? error.message
        ?? "请求失败";

    return Promise.reject( new Error( message ) );
} );

export function request<T = unknown>( config: RequestConfig ): Promise<T> {
    return server.request<T, T>( config );
}
