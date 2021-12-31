import axios from 'axios'
import getAuth from '@/utils/upyun'

const server = axios.create({
  baseURL: 'https://v0.api.upyun.com/drawing-marry',
  timeout: 60000,
  headers: {
    Authorization: getAuth('GET', '/drawing-marry/saomd')
  }
})

server.interceptors.request.use(config => {
  config.headers.Accept = 'application/json'
  config.headers['X-Date'] = new Date().toUTCString()
  return config
})

server.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject(new Error('出错啦'))
  }
  return response.data
})

export default server
