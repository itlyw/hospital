import { createApp } from 'vue'
// 引入默认的清除样式
import '@/style/reset.scss'
import App from './App.vue'
// 引入全局组件--顶部，底部都是全局组件
import HospitalTop from '@/components/HospitalTop/index.vue'
import HospitalBottom from '@/components/HospitalBottom/index.vue'
import Visitor from '@/components/Visitor/visitor.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
// 国际化设置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
// 引入vue-router核心插件并安装
import router from './router/index'
// 引入仓库
import pinia from '@/store/index'
// 引入登录组件
import Login from '@/components/Login/index.vue'
// 引入路由鉴权的文件
import '@/permission'
// 利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app = createApp(App)
// 挂载中文插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装pinia仓库
app.use(pinia)
// 挂载路由实例
app.use(router)
// 挂载element-plus
app.use(ElementPlus)
// 挂载全局组件
app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Visitor',Visitor)
app.component('Login',Login)
app.mount('#app')
