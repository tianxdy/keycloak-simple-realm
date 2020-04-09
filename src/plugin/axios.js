import axios from 'axios'
import qs from 'qs'
import kec from './keycloak'
import { config } from './keycloak'
import { message } from 'antd'

const req = axios.create({
  baseURL: `/auth/admin/realms/${config.realm}`
})

// Add a request interceptor
req.interceptors.request.use(
  config => {
    if (config.method.toUpperCase() === 'GET') {
      config.paramsSerializer = params =>
        qs.stringify(params, { arrayFormat: 'repeat' })
    }

    config.headers['authorization'] = `Bearer ${kec.token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

// Add a response interceptor
req.interceptors.response.use(
  response => {
    //let { status, config } = response
    //let { code, data } = response.data
    return response.data
  },
  error => {
    // 发生错误后刷新token 重新亲求
    let { status, config } = error.response

    if (status === 401) {
      console.log(kec)
      // 进行刷新动作
      if (!isRefreshing) {
        isRefreshing = true
        return new Promise((resolve, reject) => {
          kec.updateToken().then(auth => {
            if (auth) {
              config.url = config.url.replace(config.baseURL, '')
              requests.forEach(cb => cb())
              resolve(req(config))
            }
          })
        }).finally(_ => {
          isRefreshing = false
          requests = []
        })
      } else {
        return new Promise(resolve => {
          if (config.url) {
            config.url = config.url.replace(config.baseURL, '')
          }
          requests.push(() => resolve(req(config)))
        })
      }
    } else if (status === 404) {
      message.error('该对象不存在')
    } else {
      return Promise.reject(error)
    }
  }
)

export default req
