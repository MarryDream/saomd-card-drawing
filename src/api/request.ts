import axios, {AxiosResponse} from 'axios'

const server = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: false, // 跨域时是否携带cookies
  responseType: "json",
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

server.interceptors.response.use((response: AxiosResponse) => {
  if (response.status !== 200) {
    return Promise.reject(new Error('出错啦'))
  }
  return response.data
})

export default server
