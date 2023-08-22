<template>
   <div class="search">
    <el-autocomplete
     clearable
     placeholder="请输入医院名称"
     :fetch-suggestions="fetchData"
     :trigger-on-focus="false"
     @select="goDetail"
   />
   <el-button type="primary" :icon="Search" v-model="hosname">搜索</el-button>
   </div>
</template>

<script setup lang='ts'>
// 引入element-plus图标
import { Search } from '@element-plus/icons-vue'
import { reqHospitalInfo } from '@/api/home/index'
import type { HospitalInfo } from '@/api/home/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 创建路由器对象
const $router = useRouter()
// 收集搜索的关键字
const hosname = ref<string>('')
// 顶部组件的回调
const fetchData = async (keyword:string,callback:any) => {
  // 当用户输入完关键词后会立即执行一次
   const result:HospitalInfo = await reqHospitalInfo(keyword)
  //  整理数据，变成组件需要的数据模式
  const showData = result.data.map(item => {
    return {
      // 存储医院的名字
      value: item.hosname,
      // 存储医院的编码
      hoscode: item.hoscode
    }
  })
  //  给组件提供展示的数组
  callback(showData)
}

// 点击某一个推荐项
const goDetail = (item:any) => {
  // 点击推荐项，进入到医院详情页面，需要带入参数
  $router.push({ path: '/hospital/register',query: { hoscode: item.hoscode } })
} 
</script>

<style scoped lang='scss'>
// 深度选择器修改组件样式
// >>>   /deep/   ::v-deep
.search{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  ::v-deep(.el-input__wrapper){
    width: 600px;
    margin-right: 10px;
  }
}
</style>