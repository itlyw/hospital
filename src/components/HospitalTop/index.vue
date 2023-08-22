<template>
  <div class="top">
    <div class="content">
      <!-- 内容区域分为左侧和右侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p>云上医疗  统一挂号平台</p>
      </div>
      <div class="right">
        <p class="help">注册中心</p>
        <!-- 如果没有用户名字，显示登录注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
        <!-- 如果有用户信息则展示用户信息 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
// 引入用户小仓库
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore() 
// 登陆注册事件
const login = () => {
  userStore.visiable = true
}
// 创建路由器对象
const $router = useRouter()
const goHome = () => {
  $router.push({ path: '/home' })
}
// 退出登录
const logout = () => {
  // 通知仓库清除数据
  userStore.logout()
  // 跳转到首页
  $router.push({ path: '/home' })
}
const goUser = (path:string) => {
  $router.push({ path })
}
</script>

<style scoped lang='scss'>
.top{
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  .content{
    width: 1200px;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p{
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: rgb(100, 97, 97);
      .help{
        margin-right: 10px;
      }
    }
  }
}
</style>