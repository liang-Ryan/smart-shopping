// axios配置文件，配置请求信息
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 新的axios实例。避免污染axios的原设置
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // loading处理
  Toast.loading({
    message: '请求中...',
    forbidClick: true, // 禁用背景点击（节流）
    duration: 0 // 持续时间为0：一直存在，需手动关闭
  })

  // token验证
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 短信验证码后端接口有问题，获取不到成功响应，无法采用status统一判断
  // if (response.data.status !== 200) {
  //   Toast(response.data.message)
  //   return Promise.reject(response.data.message)
  // }

  // 关闭loading
  Toast.clear()
  return response.data // 添加".data"使返回数据少一层data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
