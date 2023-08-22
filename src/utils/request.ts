// 对于axios函数库进行二次封装
// 目的1：利用axios的请求，响应拦截器
// 目的2： 请求拦截器，一般可以在请求头中携带公共参数token
// 目的3：响应拦截器，可以简化服务器返回的数据，处理http网络错误
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'

// 利用axios.create方法创建一个axios实例：可以设置基础路径，超时时间的设置
const request = axios.create({
  // 请求的基础路径的设置
  baseURL:'/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 获取用户仓库
  const userStore = useUserStore()
  // 请求头携带公共参数token
  if(userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token
  }
  // config对象：请求拦截器回调注入的对象（配置对象），配置对象身上最重要的是headers属性
  // 可以通过请求头携带公共的参数-token
  return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
  // 响应拦截器成功的回调，一般进行简化数据
  return response.data
},(error) => {
  // 处理http网络错误
  const status = error.response.status
  switch(status) {
    case 401:
      ElMessage({
        type: 'error',
        message: '参数有误~~'
      })
      break
    case 404:
      // 错误提示信息
      ElMessage({
        type: 'error',
        message: '请求路径出现错误~~'
      })
      break
    case 501|502|503|504|505:
      ElMessage({
        type: 'error',
        message: '服务器挂了~~'
      })
      break
  }
  return Promise.reject(new Error(error.message))
})

export default request