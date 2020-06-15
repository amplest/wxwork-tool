import axios from 'axios'
import { baseURL } from '@/config'

const service = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    if (!config.isToken) {
      config.headers['Authorization'] = ''
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const {
      data,
      data: { code }
    } = response
    if (Number(code) !== 200) {
      console.log(response)
      if (Number(code) === 401 || Number(code) === 1 || Number(code) === 502) {
        console.log(Number(code))
      }
    }
    if (data) {
      return data
    }
    return Promise.reject(response)
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
