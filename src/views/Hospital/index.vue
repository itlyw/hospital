<template>
  <div class="hospital">
    <!-- 左侧导航栏区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span> / 医院信息</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><setting /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><InfoFilled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区：路由组件展示的位置 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Document,Menu as IconMenu,Setting,InfoFilled,Search,HomeFilled } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router'
import { onMounted } from 'vue' 
import useDetailStore from '@/store/modules/hospitalDetail'
// 获取仓库对象
const detailStore = useDetailStore()
// 获取路由器
const $router = useRouter()
// 获取当前路由的信息
const $route = useRoute()

// 定义路由跳转时的方法
const changeActive = (path:string) => {
  $router.push({ path,query:{ hoscode: $route.query.hoscode } })
}

// 组件挂载的时候，通知pinia发送请求获取医院详情的数据，存储在仓库当中
onMounted(() => {
  // 获取医院详情的数据
  detailStore.getHospital($route.query.hoscode as string)
  // 获取某一个医院科室的数据
  detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<style scoped lang='scss'>
.hospital{
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
  }
}
</style>