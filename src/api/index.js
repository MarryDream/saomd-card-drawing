import server from './request'
import * as types from './api'

const ajax = {}

const fetChHandle = url => {
  return (params, type = 'get', config) => {
    const configObj = {
      url,
      method: type,
      ...config
    }
    if (/get|delete/.test(type)) {
      configObj.params = params
    } else if (/post|put/.test(type)) {
      configObj.data = params
    }
    return server(configObj)
  }
}

for (let key in types) {
  const apis = types[key]
  for (let api in apis) {
    ajax[api] = fetChHandle(apis[api])
  }
}

export default ajax
