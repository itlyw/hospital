<template>
  <div class="login-container">
    <!-- v-model控制对话框的显示与隐藏 -->
    <el-dialog v-model="userStore.visiable" title="用户登录" @close="close">
      <!-- 对话框身体部分的结构 -->
      <el-row>
        <!-- 左侧结构，收集号码登录，微信扫一扫登录 -->
        <el-col :span="12">
          <div class="login">
            <div v-show="scene == 0">
              <!-- model为校验的对象，rules为校验规则 ,prop为要校验的字段-->
              <el-form :model="loginParam" :rules="rule" ref="formRef">
              <el-form-item prop="phone">
                <el-input placeholder="请输入手机号码" :prefix-icon="User" v-model="loginParam.phone"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="!isPhone || flag ? true : false">
                  <Countdown v-if="flag" :flag="flag" @getFlag="getFlag"></Countdown>
                  <span v-else  @click="getCode">获取验证码</span>
                </el-button>
              </el-form-item>
            </el-form>
            <el-button @click="login" style="width: 100%;" type="primary" size="default" :disabled="!isPhone || loginParam.code.length < 6 ? true : false">用户登录</el-button>
            <div class="bottom" @click="changeSence">
                <p>微信扫码登录</p>
                <svg t="1689836789031" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2352" width="32" height="32"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="2353"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="2354"></path></svg>
            </div>
            </div>
            <div class="webchat" v-show="scene == 1">
              <!-- 在这个容器当中显示微信扫码登录页面 -->
              <div id="login_container"></div>
              <div class="phone" @click="handler">
                <p>手机验证码登录</p>
                <svg t="1689925930351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2350" width="32" height="32"><path d="M747.35616 194.10944c0-46.44864-36.16768-84.43904-80.40448-84.43904h-330.5472c-44.2368 0-80.40448 37.9904-80.40448 84.43904v641.16736c0 12.30848 4.66944 23.6544 12.45184 32.3584 14.29504 23.6544 39.44448 39.44448 67.95264 39.44448h330.5472c28.48768 0 53.6576-15.7696 67.93216-39.424 7.7824-8.64256 12.4928-19.94752 12.4928-32.3584V194.08896z m-53.59616 0v554.10688H309.59616V194.10944c0-15.48288 12.0832-28.16 26.80832-28.16h330.5472c14.7456 0 26.80832 12.67712 26.80832 28.16zM460.14464 810.2912c0-21.56544 18.30912-39.23968 40.6528-39.23968 22.3232 0 40.63232 17.67424 40.63232 39.23968 0 21.54496-18.30912 39.2192-40.6528 39.2192-22.3232 0-40.63232-17.67424-40.63232-39.2192z" fill="#8a8a8a" p-id="2351"></path></svg>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="left-content">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="">
                <svg t="1689838291854" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2366" width="16" height="16"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#cdcdcd" p-id="2367"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#cdcdcd" p-id="2368"></path></svg>
                <p>微信扫一扫关注</p>
                <p>"快速预约挂号"</p>
              </div>
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="">
                <svg t="1689838518408" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3545" width="16" height="16"><path d="M723.765248 942.08 309.92384 942.08c-24.301568 0-39.58784-18.874368-39.58784-43.175936L270.336 130.351104C270.336 106.051584 285.620224 81.92 309.92384 81.92l413.843456 0C748.068864 81.92 755.712 106.051584 755.712 130.351104l0 768.55296c0 24.301568-8.01792 43.175936-32.323584 43.175936L723.765248 942.08zM516.440064 898.904064c16.20992 0 29.964288-13.785088 29.964288-29.964288 0-16.20992-13.754368-29.157376-29.964288-29.157376s-29.157376 12.947456-29.157376 29.157376C487.282688 885.118976 500.230144 898.904064 516.440064 898.904064L516.440064 898.904064zM729.088 167.936l-19.9168 0L324.513792 167.936 299.008 167.936l0 630.784 25.505792 0 384.657408 0L729.088 798.72 729.088 167.936z" p-id="3546" fill="#dbdbdb"></path></svg>
                <p>扫一扫下载</p>
                <p>"预约挂号APP"</p>
              </div>
            </div>
            <p class="text">云上医疗官方指定平台</p>
            <p class="text">快速挂号 安全放心</p>
          </div>
        </el-col>
      </el-row>
      <template #footer>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref,computed,watch } from 'vue'
import { Lock,User } from '@element-plus/icons-vue'
// 引入用户小仓库
import useUserStore from '@/store/modules/user.ts'
import Countdown from '@/components/Countdown/index.vue'
import { ElMessage } from 'element-plus'
// 引入微信扫码登录参数的请求
import { reqWxLogin } from '@/api/hospital/index'
import type { WXLoginResponseData } from '@/api/hospital/type'
import { useRoute,useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

const userStore = useUserStore() 
// 代表切换左侧模块的数据
// 0代表号码收集，1代表微信扫码登录
let scene = ref<number>(0)
// 获取表单实例对象
const formRef = ref()
// 收集手机号码
const loginParam = reactive({
  phone: '',
  // 收集验证码
  code: ''
})

// 定义倒计时响应式数据的显示与隐藏
// flag为真显示倒计时，为假不显示
const flag = ref<boolean>(false)
// 计算出当前表单元素收集地内容是否是手机号码
const isPhone = computed(() => {
  // 手机号正则表达式
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
  // 返回布尔值，真即为手机号码
  return reg.test(loginParam.phone)
})
// 改变登录方式
const changeSence = async () => {
  // 切换场景，更换微信登录
  scene.value = 1
  // 发请求获取微信扫码登录二维码页面
  // 获取到服务器传来的微信登录参数，携带一个重定向参数
  const redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin')
  const result:WXLoginResponseData = await reqWxLogin(redirect_URL)
  // 生成微信登录的二维码页面
  // @ts-ignore
  new WxLogin({
    self_redirect:true, // 手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    id:"login_container", // 显示二维码的容器
    appid: result.data.appid, // 应用唯一标识
    scope: "snsapi_login", // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
    redirect_uri: result.data.redirectUri, // 填写授权回调域的路径，就是用户授权成功以后，微信服务器向公司后台推送code地址
    state: result.data.state, // 当前服务器重定向地址，携带用户信息
    style: "black",
    href: ""
  })
}
// 获取验证码的回调
const getCode = async () => {
   // 解决elementplus按钮禁用还能点击的问题
   if(!isPhone.value || flag.value) return
  // 开启倒计时模式
  flag.value = true
  // 通知仓库存储验证码
  try {
    // 获取验证码成功
    await userStore.getCode(loginParam.phone)
    loginParam.code = userStore.code
  } catch (error) {
    // 验证码请求错误
    ElMessage({
      type: 'error',
      message: '获取验证码失败~~'
    })
  }
}

// 计数器子组件自定义事件
const getFlag = (val:boolean) => {
  // 倒计时结束
  flag.value = val
}
// 用户点击登录
const login = async () => {
  // 表单校验都通过才能登录
  // 保证手机号和验证码都通过才可以往下执行
  await formRef.value.validate()
  try {
    // 用户登录成功
    await userStore.userLogin(loginParam)
    // 关闭对话框
    userStore.visiable = false
    // 获取url的query参数
    const redirect = $route.query.redirect
    if(redirect) {
      $router.push(redirect)
    }else{
      $router.push('/home')
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  }
}
// 手机号码的自定义校验规则
const validatePhone = (rule: any, value: any, callback: any) => {
  // rule为规则对象，value为表单的值，callback为回调函数
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
  if(reg.test(value)) {
    // 放行
    callback()
  }else {
    callback(new Error('请输入正确的手机号'))
  }
}
// 验证码校验规则
const validateCode = (rule: any, value: any, callback: any) => {
  if(/^\d{6}$/.test(value)) {
    callback()
  }else {
    callback(new Error('请输入正确的验证码'))
  }
}
// 表单校验的规则对徐
const rule = {
  phone: [
  { validator: validatePhone, trigger: 'change' }
  ],
  code: [
  { validator: validateCode, trigger: 'change' }
  ]
}
// 对话框关闭的回调
const close = () => {
  // 清空收集到的数据
  Object.assign(loginParam,{ phone: '',code: '' })
  // 清除所上一次校验的结果
  formRef.value.resetFields()
}
// 点击手机短信验证码盒子的回调
const handler = () => {
  scene.value = 0
}
// 监听场景的数值
watch(() => scene.value,(val:number) => {
  if(val == 1) {
    userStore.queryState()
  }
})
</script>

<style scoped lang='scss'>
.login-container{
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .login{
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    .webchat{
      display: flex;
      flex-direction: column;
      align-items: center;
      .phone{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
          margin: 5px 0;
        }
      }
    }
  }
  .bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      margin: 15px 0;
    }
  }
  .left-content{
    .text{
      line-height: 30px;
      text-align: center;
      margin: 10px 0;
      font-weight: 800;
      font-size: 20px;
    }
    .top{
      display: flex;
      justify-content: space-around;
      .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 130px;
          height: 130px;
        }
        svg{
          margin-top: 5px;
        }
        p{
          margin: 5px 0;
        }
      }
    }
  }
}
</style>