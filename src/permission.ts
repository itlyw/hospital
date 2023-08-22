// 路由鉴权:决定路由能不能被访问到权限设置 -> 全局守卫
// 引入路由器
import router from '@/router/index'
import Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
// 引入用户相关的token
import pinia from '@/store/index'
const userStore =  useUserStore(pinia)
Nprogress.configure({ showSpinner: false })
// 存储用户未登录可以访问的路由路径
const whiteList = ['/home','/hospital/register','/hospital/detail','/hospital/notice','/hospital/close','/hospital/search']
// 添加相应的全局守卫
// 前置守卫
router.beforeEach((to:any,from:any,next:any) => {
  // 进度条开始
  Nprogress.start()
  // 动态设置网页左上角的标题
  document.title = `云上医疗-${ to.meta.title }`
  // 判断用户是否登录-token
  const token = userStore.userInfo.token
  if(token){
    // 用户已登录
    next()
  }else{
    // 用户未登录
    if(whiteList.includes(to.path)){
      next()
    }else{
      // 登录组件显示出来
      userStore.visiable = true
      next({ path: '/home',query: { redirect: to.fullPath } })
    }
  }
})
// 后置守卫
router.afterEach((to:any,from:any) => {
  // 进度条消失
  Nprogress.done()
})