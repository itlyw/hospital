<template>
  <div class="user">
     <!-- 左侧显示导航栏区域 -->
     <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span> / 会员中心</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
      >
      <el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
          <el-icon><ScaleToOriginal /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeActive('/user/order')">
          <el-icon><Tickets /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
          <el-icon><Collection /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile" @click="changeActive('/user/profile')">
          <el-icon><User /></el-icon>
          <span>挂号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
          <el-icon><Tools /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
     </div>
     <!-- 右侧展示会员中心二级路由 -->
     <div class="content">
      <router-view></router-view>
     </div>
  </div>
</template>

<script setup lang='ts'>
import { User,Tickets,ScaleToOriginal,Collection,Tools,HomeFilled } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router'
// 获取路由对象
const $route = useRoute()
// 获取路由器对象
const $router = useRouter()
// 定义路由跳转时的方法
const changeActive = (path:string) => {
  $router.push({ path })
}
</script>

<style scoped lang='scss'>
.user{
  display: flex;
  .menu{
    flex: 2;
    .top{
      color: #7f7f7f;
      padding-left: 20px;
    }
  }
  .content{
    flex: 8;
    margin-left: 40px;
  }
}
</style>