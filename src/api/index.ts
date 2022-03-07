import { AxiosRequestConfig} from 'axios'
import server from './request'
import apis from './api'

type AjaxPromise = (params?: any, method?: MethodType, config?: any) => any

export interface IAjax {
  [field: string]: AjaxPromise
}

type MethodType = 'get' | 'post' | 'put' | 'delete'

const ajax: IAjax = {}
const getRequest = ['get', 'delete']

function getServer(url: string, params: any = {}, method: MethodType = 'post', config: any = {}) {
  const paramsField = getRequest.includes(method) ? 'params' : 'data'
  const serverConfig: AxiosRequestConfig = {
    url,
    method,
    [paramsField]: params,
    ...config
  }
  return server(serverConfig)
}

for (const api in apis) {
  ajax[api] = (params: any = {}, method: MethodType = 'post', config: any = {}) => {
    return getServer(apis[api], params, method, config)
  }
}

export default ajax
