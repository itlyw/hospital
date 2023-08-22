// createRouter方法，用于创建路由器实例，可以管理多个路由器
import { createRouter,createWebHistory } from 'vue-router'

export default createRouter({
  // 路由模式的设置
  history:createWebHistory(),
  // 管理路由
  routes:[
    {
      path: '/wxlogin',
      component: () => import('@/views/WxLogin/index.vue')
    },
    {
      path: '/home',
      component: () => import('@/views/Home/index.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/hospital',
      component: () => import('@/views/Hospital/index.vue'),
      children: [
        { path:'register',component: () => import('@/views/Hospital/Register/index.vue'),meta: { title: '预约挂号' } },
        { path:'detail',component: () => import('@/views/Hospital/Detail/index.vue'),meta: { title: '医院详情' } },
        { path:'close',component: () => import('@/views/Hospital/Close/index.vue'),meta: { title: '停诊信息' } },
        { path:'notice',component: () => import('@/views/Hospital/Notice/index.vue'),meta: { title: '预约须知' } },
        { path:'search',component: () => import('@/views/Hospital/Search/index.vue'),meta: { title: '查询/取消' } },
        { path:'register_step1',component: () => import('@/views/Hospital/Register/register_step1.vue'),meta: { title: '预约第一步' } },
        { path:'register_step2',component: () => import('@/views/Hospital/Register/register_step2.vue'),meta: { title: '预约第二步' } }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/user',
      component: () => import('@/views/User/index.vue'),
      children: [
        { path: 'certification',component: () => import('@/views/User/Certification/index.vue'),meta: { title: '实名认证' } },
        { path: 'profile',component: () => import('@/views/User/Profile/inde.vue'),meta: { title: '挂号信息' } },
        { path: 'order',component: () => import('@/views/User/Order/index.vue'),meta: { title: '挂号订单' } },
        { path: 'patient',component: () => import('@/views/User/Patient/index.vue'),meta: { title: '就诊人管理' } },
        { path: 'feedback',component: () => import('@/views/User/Feedback/index.vue'),meta: { title: '意见反馈' } }
      ]
    }
  ],
  // 滚动行为：控制滚动条的位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
  }
 }
})
