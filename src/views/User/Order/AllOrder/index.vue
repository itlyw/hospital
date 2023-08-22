<template>
  <!-- 所有订单 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <!-- 提供用户选择的下拉菜单 -->
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser">
          <el-option label="请选择全部就诊人" value=""></el-option>
          <el-option :label="item.name" v-for="item in allUser" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="请选择订单状态" v-model="orderState" @change="changeOrder">
          <el-option label="全部订单" value=""></el-option>
          <el-option  v-for="(item,index) in allOrderState"  :label="item.comment" :key="index" :value="item.status"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格展示订单的数据 -->
    <el-table border style="margin-bottom: 20px;" :data="allOrderArr">
      <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
      <el-table-column label="医院" prop="hosname"></el-table-column>
      <el-table-column label="科室" prop="depname"></el-table-column>
      <el-table-column label="医生" prop="title"></el-table-column>
      <el-table-column label="服务费" prop="amount"></el-table-column>
      <el-table-column label="就诊人" prop="patientName"></el-table-column>
      <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="text" @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="getOrderInfo"
      @size-change="handleSizeChange"
    />
  </el-card>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref,onMounted } from 'vue'
import { reqUserOrderInfo,reqAllUser,reqOrderState } from '@/api/user/index'
import type { AllOrderState,UserOrderInfoResponseData,Records,AllUserResponseData,AllOrderStateResponseData,AllUser } from '@/api/user/type'
// 获取路由器对象
const $router = useRouter()
// 分页器页码
const pageNo = ref<number>(1)
// 当前页码展示几条数据
const pageSize = ref<number>(10)
// 收集就诊人的id
const patientId =ref<string>('')
// 收集订单的状态
const orderStatus = ref<string>('')
// 存储全部的订单
const allOederArr = ref<Records>([])
// 存储所有的就诊人信息
const allUser =ref<AllUser>([])
// 存储全部订单的状态
const allOrderState = ref<AllOrderState>([])
// 存储订单总数
const total = ref<number>(0)
// 组件挂载获取列表数据
onMounted(() => {
  // 获取订单的方法
  getOrderInfo()
  // 获取全部就诊人的信息以及获取全部订单的状态
  getData()
})
// 获取列表方法
const getOrderInfo = async (pager:number = 1) => {
  pageNo.value = pager
  const result:UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value,pageSize.value,patientId.value,orderStatus.value)
  if(result.code == 200) {
    allOederArr.value = result.data.records
    total.value = result.data.total
  }
}
// 获取全部就诊人信息
const getData = async () => {
  const result:AllUserResponseData = await reqAllUser()
  const result1:AllOrderStateResponseData = await reqOrderState()
  allUser.value = result.data
  allOrderState.value = result1.data
}
// 详情按钮的回调
const goDetail =(row:any) => {
  $router.push({ path: '/user/order',query: { orderId: row.id } })
}
// 页码改变
const handleSizeChange = (pageSizes:number) => {
  pageSize.value = pageSizes
  getOrderInfo()
}
// 就诊人下拉菜单回调方法
const changeUser = () => {
  getOrderInfo()
}
// 状态改变之后
const changeOrder = () => {
  getOrderInfo()
}
</script>

<style scoped lang='scss'>

</style>