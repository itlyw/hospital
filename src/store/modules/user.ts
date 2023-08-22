import { defineStore } from "pinia"
import { reqCode,reqUserLogin } from '@/api/hospital/index'
import type { loginData,UserLoginResponseData } from "@/api/hospital/type"
import type { UserState } from '@/store/modules/interface/index'
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/user'

const useUserStore = defineStore('User',{
  state:():UserState => {
    return {
      // 控制对话框的显示与隐藏
      visiable: false,
      // 存储验证码
      code: '',
      // 用户信息
      userInfo: JSON.parse(GET_TOKEN() as string) || {}
    }
  },
  actions: {
    // 获取验证码方法
    async getCode(phone:string) {
      // 获取验证码
      const result = await reqCode(phone)
      if(result.code == 200) {
        this.code = result.data
        return 'OK'
      }else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户手机号码登录
    async userLogin(loginData:loginData) {
      const result:UserLoginResponseData = await reqUserLogin(loginData)
      if(result.code == 200) {
        this.userInfo = result.data
        // 本地持久化存储用户信息
        SET_TOKEN(JSON.stringify(result.data))
        // 返回一个成功的Promise
        return 'Ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    } ,
    logout() {
      // 清空仓库的数据
      this.userInfo = { name: '',token: '' }
      // 清空本地存储的数据
      REMOVE_TOKEN()
    },
    // 查询微信扫码的接口
    queryState() {
      // 开启定时器
      const timer = setInterval(() => {
        // 本地存储有数据了
        if(GET_TOKEN()) {
          // 关闭对话框
          this.visiable = false
          this.userInfo = JSON.parse(GET_TOKEN() as string)
          clearInterval(timer)
        }
      },1000)
    }
  },
  Getters: {}
})

export default useUserStore