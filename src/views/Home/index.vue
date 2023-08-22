<template>
  <div>
    <!-- 首页轮播图的结构 -->
    <Carousel></Carousel>
    <!-- 首页搜索医院的表单区域 -->
    <Search></Search>
    <!-- 底部展示路由的结构 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel"></Level>
        <!-- 地区子组件 -->
        <Region @getRegion="getRegion"></Region>
        <!-- 展示医院结构 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card  class="item" v-for="item in hasHospitalArr" :key="item.id" :hospitalInfo="item"></Card>
        </div>
        <el-empty description="暂无数据" v-else/>
          <!-- 分页器 -->
          <div class="page">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="sizes, prev, pager, next, ->,jumper,total"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
         </div>
      </el-col>
      <el-col :span="4">
        <Tip></Tip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
// 引入轮播图组件
import Carousel from '@/views/Home/Carousel/index.vue'
// 引入搜索组件
import Search from '@/views/Home/Search/index.vue'
// 引入医院等级的组件
import Level from '@/views/Home/Level/index.vue'
// 引入地区子组件
import Region from '@/views/Home/Region/index.vue' 
// 引入医院信息
import Card from '@/views/Home/Card/index.vue'
// 引入右侧提示组件
import Tip from '@/views/Home/Tip/index.vue'
// 引入相应的接口
import { reqHospital } from '@/api/home'
// 引入组合API式函数
import { ref,onMounted } from 'vue'
// 引入数据类型
import type { Content,HospitalResponseData } from '@/api/home/type'

// 分页器需要的数据
// 分页器页码
const pageNo = ref<number>(1)
// 分页器一页展示几条数据
const pageSize = ref<number>(10)
// 存储已有的医院的数据
const hasHospitalArr = ref<Content>([])
// 存储医院总数量
const total = ref<number>(0)
// 存储医院的等级相应的数据
const hostype = ref<string>('')
// 存储医院选择的地区
const districtCode = ref<string>('')
// 组件挂载完毕要发一次请求
onMounted(() => {
  getHospitalInfo()
})
// 获取已有医院的数据
const getHospitalInfo = async () => {
  // 默认获取医院的数据：默认获取第一页数据，一页十个
 const result:HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
 if(result.code == 200) {
  // 存储已有医院的数据
  hasHospitalArr.value = result.data.content
  // 存储医院总数量
  total.value = result.data.totalElements
 }
}
// 分页器页码发生变化时的回调
const currentChange = () => {
  getHospitalInfo()
}
// 分页器下拉菜单发生变化时请求
const sizeChange = () => {
  getHospitalInfo()
} 
// 子组件自定义事件：获取子组件给父组件传递过来的等级参数
const getLevel = (level:string) => {
  // 收集等级的参数
  hostype.value = level
  // 再次发请求
  getHospitalInfo()
} 
// 子组件自定义事件：获取子组件给父组件传递过来的地区参数
const getRegion = (region:string) => {
  // 收集地区的参数
  districtCode.value = region
  // 再次发请求
  getHospitalInfo()
}
</script>

<style scoped lang='scss'>
.hospital{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 48%;
    margin: 10px 0;
  }
}
</style>